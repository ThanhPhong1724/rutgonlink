import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { TaoChienDichDto, CapNhatGoiDto } from './campaign.dto';

// In-memory rate limit tracker for code generation
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return true;
    }
    if (entry.count >= RATE_LIMIT_MAX) return false;
    entry.count++;
    return true;
}

@Injectable()
export class CampaignService {
    constructor(private prisma: PrismaService) { }

    // ========================================================================
    // GÓI THỜI GIAN (Admin CRUD)
    // ========================================================================

    async danhSachGoi() {
        return this.prisma.goi_thoi_gian.findMany({
            orderBy: { thu_tu: 'asc' },
        });
    }

    async danhSachGoiHoatDong() {
        return this.prisma.goi_thoi_gian.findMany({
            where: { trang_thai: 'hoat_dong' },
            orderBy: { thu_tu: 'asc' },
        });
    }

    async capNhatGoi(maCongKhai: string, dto: CapNhatGoiDto) {
        const goi = await this.prisma.goi_thoi_gian.findUnique({
            where: { ma_cong_khai: maCongKhai },
        });
        if (!goi) throw new NotFoundException('Gói thời gian không tồn tại');

        return this.prisma.goi_thoi_gian.update({
            where: { ma: goi.ma },
            data: dto,
        });
    }

    // ========================================================================
    // CHIẾN DỊCH (R10 - Người Mua Traffic)
    // ========================================================================

    async taoChienDich(maNguoiMua: bigint, dto: TaoChienDichDto) {
        // 1. Tìm gói thời gian
        const goi = await this.prisma.goi_thoi_gian.findUnique({
            where: { ma_cong_khai: dto.ma_goi_cong_khai },
        });
        if (!goi || goi.trang_thai !== 'hoat_dong') {
            throw new BadRequestException('Gói thời gian không hợp lệ hoặc đã ngừng');
        }

        // 2. Tính ngân sách
        const nganSachTong = Number(goi.don_gia_mua) * dto.so_luot_mua;

        // 3. Kiểm tra số dư ví
        const vi = await this.prisma.vi_nguoi_dung.findFirst({
            where: { ma_nguoi_dung: maNguoiMua, trang_thai: 'hoat_dong' },
        });
        if (!vi) {
            throw new BadRequestException('Bạn chưa có ví. Vui lòng liên hệ quản trị.');
        }

        const soDuKhaDung = Number(vi.so_du_kha_dung);
        if (soDuKhaDung < nganSachTong) {
            throw new BadRequestException(
                `Số dư không đủ. Cần ${nganSachTong.toLocaleString('vi-VN')}đ, hiện có ${soDuKhaDung.toLocaleString('vi-VN')}đ. Thiếu ${(nganSachTong - soDuKhaDung).toLocaleString('vi-VN')}đ.`,
            );
        }

        // 4. Parse từ khóa
        let tuKhoaJson: string;
        try {
            // Thử parse JSON trước
            JSON.parse(dto.tu_khoa);
            tuKhoaJson = dto.tu_khoa;
        } catch {
            // Nếu không phải JSON, split theo dòng
            const arr = dto.tu_khoa
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean);
            tuKhoaJson = JSON.stringify(arr);
        }

        // 5. Thực hiện transaction: phong tỏa ngân sách + tạo chiến dịch
        const maCongKhai = randomUUID().substring(0, 36);
        const now = new Date();

        const result = await this.prisma.$transaction(async (tx) => {
            // Phong tỏa số dư
            const viUpdated = await tx.vi_nguoi_dung.update({
                where: { ma: vi.ma },
                data: {
                    so_du_kha_dung: { decrement: nganSachTong },
                    so_du_khoa_tam: { increment: nganSachTong },
                    thoi_diem_cap_nhat_so_du: now,
                },
            });

            // Tạo bút toán sổ cái: phong tỏa
            await tx.so_cai_giao_dich.create({
                data: {
                    ma_cong_khai: randomUUID(),
                    ma_vi: vi.ma,
                    loai_giao_dich: 'phong_toa_chien_dich',
                    huong_bien_dong: 'giam',
                    loai_so_du_tac_dong: 'kha_dung',
                    so_tien: nganSachTong,
                    don_vi_tien: 'VND',
                    so_du_kha_dung_truoc: soDuKhaDung,
                    so_du_kha_dung_sau: Number(viUpdated.so_du_kha_dung),
                    so_du_khoa_tam_truoc: Number(vi.so_du_khoa_tam),
                    so_du_khoa_tam_sau: Number(viUpdated.so_du_khoa_tam),
                    nguon_phat_sinh: 'chien_dich',
                    ma_tham_chieu_nguon: BigInt(0), // Sẽ update sau
                    ma_khoa_chong_trung: `phong_toa_cd_${maCongKhai}`,
                    trang_thai: 'hoan_thanh',
                    mo_ta_hien_thi: `Phong tỏa ngân sách chiến dịch: ${dto.ten_chien_dich}`,
                    thoi_diem_phat_sinh_nghiep_vu: now,
                    nguon_tao: 'he_thong',
                },
            });

            // Tạo chiến dịch
            const chienDich = await tx.chien_dich.create({
                data: {
                    ma_cong_khai: maCongKhai,
                    ma_nguoi_mua: maNguoiMua,
                    ma_goi: goi.ma,
                    ten_chien_dich: dto.ten_chien_dich,
                    lien_ket_trang_dich: dto.lien_ket_trang_dich,
                    tu_khoa: tuKhoaJson,
                    anh_minh_hoa_url: dto.anh_minh_hoa_url || null,
                    anh_minh_hoa_file: dto.anh_minh_hoa_file || null,
                    so_luot_mua: dto.so_luot_mua,
                    ngan_sach_tong: nganSachTong,
                    trang_thai: 'hoat_dong',
                    thoi_diem_bat_dau: now,
                },
            });

            return chienDich;
        });

        return {
            ...result,
            ma: undefined, // không trả id nội bộ
            ma_goi: undefined,
            ma_nguoi_mua: undefined,
            ngan_sach_tong: Number(result.ngan_sach_tong),
            ngan_sach_da_dung: Number(result.ngan_sach_da_dung),
            thoi_gian_giay: goi.thoi_gian_giay,
        };
    }

    async danhSachChienDich(maNguoiMua: bigint) {
        const ds = await this.prisma.chien_dich.findMany({
            where: { ma_nguoi_mua: maNguoiMua },
            include: { goi: true },
            orderBy: { thoi_diem_tao: 'desc' },
        });
        return ds.map((cd) => ({
            ma_cong_khai: cd.ma_cong_khai,
            ten_chien_dich: cd.ten_chien_dich,
            lien_ket_trang_dich: cd.lien_ket_trang_dich,
            tu_khoa: cd.tu_khoa,
            anh_minh_hoa_url: cd.anh_minh_hoa_url,
            anh_minh_hoa_file: cd.anh_minh_hoa_file,
            so_luot_mua: cd.so_luot_mua,
            so_luot_da_chay: cd.so_luot_da_chay,
            ngan_sach_tong: Number(cd.ngan_sach_tong),
            ngan_sach_da_dung: Number(cd.ngan_sach_da_dung),
            trang_thai: cd.trang_thai,
            ten_goi: cd.goi.ten_goi,
            thoi_gian_giay: cd.goi.thoi_gian_giay,
            don_gia_mua: Number(cd.goi.don_gia_mua),
            thoi_diem_bat_dau: cd.thoi_diem_bat_dau,
            thoi_diem_ket_thuc: cd.thoi_diem_ket_thuc,
            thoi_diem_tao: cd.thoi_diem_tao,
        }));
    }

    async tamDungChienDich(maCongKhai: string, maNguoiMua: bigint) {
        const cd = await this._timChienDichCuaNguoiMua(maCongKhai, maNguoiMua);
        if (cd.trang_thai !== 'hoat_dong') {
            throw new BadRequestException('Chỉ có thể tạm dừng chiến dịch đang hoạt động');
        }
        return this.prisma.chien_dich.update({
            where: { ma: cd.ma },
            data: { trang_thai: 'tam_dung' },
        });
    }

    async tiepTucChienDich(maCongKhai: string, maNguoiMua: bigint) {
        const cd = await this._timChienDichCuaNguoiMua(maCongKhai, maNguoiMua);
        if (cd.trang_thai !== 'tam_dung') {
            throw new BadRequestException('Chỉ có thể tiếp tục chiến dịch đang tạm dừng');
        }
        return this.prisma.chien_dich.update({
            where: { ma: cd.ma },
            data: { trang_thai: 'hoat_dong' },
        });
    }

    async ketThucChienDich(maCongKhai: string, maNguoiMua: bigint) {
        const cd = await this._timChienDichCuaNguoiMua(maCongKhai, maNguoiMua);
        if (!['hoat_dong', 'tam_dung'].includes(cd.trang_thai)) {
            throw new BadRequestException('Chiến dịch này không thể kết thúc');
        }

        const nganSachConLai =
            Number(cd.ngan_sach_tong) - Number(cd.ngan_sach_da_dung);
        const now = new Date();

        await this.prisma.$transaction(async (tx) => {
            // Hoàn ngân sách chưa dùng
            if (nganSachConLai > 0) {
                const vi = await tx.vi_nguoi_dung.findFirst({
                    where: {
                        ma_nguoi_dung: maNguoiMua,
                        trang_thai: 'hoat_dong',
                    },
                });
                if (vi) {
                    await tx.vi_nguoi_dung.update({
                        where: { ma: vi.ma },
                        data: {
                            so_du_kha_dung: { increment: nganSachConLai },
                            so_du_khoa_tam: { decrement: nganSachConLai },
                            thoi_diem_cap_nhat_so_du: now,
                        },
                    });

                    await tx.so_cai_giao_dich.create({
                        data: {
                            ma_cong_khai: randomUUID(),
                            ma_vi: vi.ma,
                            loai_giao_dich: 'hoan_ngan_sach_chien_dich',
                            huong_bien_dong: 'tang',
                            loai_so_du_tac_dong: 'kha_dung',
                            so_tien: nganSachConLai,
                            don_vi_tien: 'VND',
                            so_du_kha_dung_truoc: Number(vi.so_du_kha_dung),
                            so_du_kha_dung_sau:
                                Number(vi.so_du_kha_dung) + nganSachConLai,
                            so_du_khoa_tam_truoc: Number(vi.so_du_khoa_tam),
                            so_du_khoa_tam_sau:
                                Number(vi.so_du_khoa_tam) - nganSachConLai,
                            nguon_phat_sinh: 'chien_dich',
                            ma_tham_chieu_nguon: cd.ma,
                            ma_khoa_chong_trung: `hoan_cd_${maCongKhai}_${Date.now()}`,
                            trang_thai: 'hoan_thanh',
                            mo_ta_hien_thi: `Hoàn ngân sách chiến dịch: ${cd.ten_chien_dich}`,
                            thoi_diem_phat_sinh_nghiep_vu: now,
                            nguon_tao: 'he_thong',
                        },
                    });
                }
            }

            await tx.chien_dich.update({
                where: { ma: cd.ma },
                data: {
                    trang_thai: 'hoan_thanh',
                    thoi_diem_ket_thuc: now,
                },
            });
        });

        return { thong_bao: 'Đã kết thúc chiến dịch và hoàn ngân sách chưa sử dụng' };
    }

    // ========================================================================
    // PHÂN PHỐI CHIẾN DỊCH (Weighted Random)
    // ========================================================================

    async phanPhoiChienDich(): Promise<{
        ma_chien_dich: bigint;
        ma_cong_khai: string;
        tu_khoa: string[];
        lien_ket_trang_dich: string;
        anh_minh_hoa: string | null;
        thoi_gian_giay: number;
        don_gia_ban: number;
    } | null> {
        // Lấy tất cả chiến dịch đang hoạt động còn ngân sách
        const danhSach = await this.prisma.chien_dich.findMany({
            where: {
                trang_thai: 'hoat_dong',
            },
            include: { goi: true },
        });

        // Lọc những chiến dịch còn lượt
        const conLuot = danhSach.filter(
            (cd) => cd.so_luot_da_chay < cd.so_luot_mua,
        );

        if (conLuot.length === 0) return null;

        // Weighted random: trọng số = lượt còn lại
        const tongTrongSo = conLuot.reduce(
            (sum, cd) => sum + (cd.so_luot_mua - cd.so_luot_da_chay),
            0,
        );
        let random = Math.random() * tongTrongSo;

        for (const cd of conLuot) {
            const trongSo = cd.so_luot_mua - cd.so_luot_da_chay;
            random -= trongSo;
            if (random <= 0) {
                let tuKhoaArr: string[];
                try {
                    tuKhoaArr = JSON.parse(cd.tu_khoa);
                } catch {
                    tuKhoaArr = [cd.tu_khoa];
                }
                return {
                    ma_chien_dich: cd.ma,
                    ma_cong_khai: cd.ma_cong_khai,
                    tu_khoa: tuKhoaArr,
                    lien_ket_trang_dich: cd.lien_ket_trang_dich,
                    anh_minh_hoa: cd.anh_minh_hoa_url || cd.anh_minh_hoa_file || null,
                    thoi_gian_giay: cd.goi.thoi_gian_giay,
                    don_gia_ban: Number(cd.goi.don_gia_ban),
                };
            }
        }

        // Fallback: trả chiến dịch đầu tiên
        const cd = conLuot[0];
        let tuKhoaArr: string[];
        try {
            tuKhoaArr = JSON.parse(cd.tu_khoa);
        } catch {
            tuKhoaArr = [cd.tu_khoa];
        }
        return {
            ma_chien_dich: cd.ma,
            ma_cong_khai: cd.ma_cong_khai,
            tu_khoa: tuKhoaArr,
            lien_ket_trang_dich: cd.lien_ket_trang_dich,
            anh_minh_hoa: cd.anh_minh_hoa_url || cd.anh_minh_hoa_file || null,
            thoi_gian_giay: cd.goi.thoi_gian_giay,
            don_gia_ban: Number(cd.goi.don_gia_ban),
        };
    }

    // ========================================================================
    // MÃ XÁC NHẬN
    // ========================================================================

    /** Sinh mã 6 ký tự ngẫu nhiên cho một chiến dịch (được gọi từ embed.js) */
    async taoMaXacNhan(maChienDichCongKhai: string, ip?: string) {
        // ===== B. RATE LIMIT sinh mã =====
        if (ip) {
            const allowed = checkRateLimit(`code:${ip}`);
            if (!allowed) {
                throw new BadRequestException('Bạn đã yêu cầu quá nhiều mã. Vui lòng thử lại sau 10 phút.');
            }
        }

        const cd = await this.prisma.chien_dich.findUnique({
            where: { ma_cong_khai: maChienDichCongKhai },
            include: { goi: true },
        });

        if (!cd || cd.trang_thai !== 'hoat_dong') {
            throw new BadRequestException('Chiến dịch không hợp lệ hoặc đã dừng');
        }

        if (cd.so_luot_da_chay >= cd.so_luot_mua) {
            throw new BadRequestException('Chiến dịch đã hết lượt');
        }

        // Sinh mã 6 ký tự uppercase alphanumeric
        const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Bỏ O, 0, I, 1 để tránh nhầm lẫn
        let ma = '';
        for (let i = 0; i < 6; i++) {
            ma += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        const hetHan = new Date();
        hetHan.setMinutes(hetHan.getMinutes() + 10); // Mã hết hạn sau 10 phút

        const maXacNhan = await this.prisma.ma_xac_nhan.create({
            data: {
                ma_cong_khai: ma,
                ma_chien_dich: cd.ma,
                dia_chi_ip: ip || null,
                thoi_diem_het_han: hetHan,
            },
        });

        return {
            ma_xac_nhan: ma,
            het_han: hetHan.toISOString(),
            thoi_gian_giay: cd.goi.thoi_gian_giay,
        };
    }

    /** Xác minh mã xác nhận + ghi lượt hợp lệ + cập nhật tài chính */
    async xacMinhMa(maXacNhan: string, trackingId: string, ip?: string) {
        const now = new Date();

        // 1. Tìm mã xác nhận
        const mxn = await this.prisma.ma_xac_nhan.findUnique({
            where: { ma_cong_khai: maXacNhan.toUpperCase() },
            include: {
                chien_dich: { include: { goi: true, nguoi_mua: true } },
            },
        });

        if (!mxn) {
            throw new BadRequestException('Mã xác nhận không tồn tại');
        }
        if (mxn.da_su_dung) {
            throw new BadRequestException('Mã xác nhận đã được sử dụng');
        }
        if (mxn.thoi_diem_het_han < now) {
            throw new BadRequestException('Mã xác nhận đã hết hạn');
        }

        // ===== C. IP MATCH: sinh mã ↔ xác minh =====
        if (ip && mxn.dia_chi_ip && ip !== mxn.dia_chi_ip) {
            throw new BadRequestException('Phiên không hợp lệ. IP không khớp với lúc nhận mã.');
        }

        const cd = mxn.chien_dich;
        if (cd.trang_thai !== 'hoat_dong') {
            throw new BadRequestException('Chiến dịch không còn hoạt động');
        }
        if (cd.so_luot_da_chay >= cd.so_luot_mua) {
            throw new BadRequestException('Chiến dịch đã hết lượt');
        }

        // 2. Tìm sự kiện lượt (tracking)
        const suKien = await this.prisma.su_kien_luot.findUnique({
            where: { ma_cong_khai: trackingId },
            include: { lien_ket: true },
        });

        if (!suKien || !suKien.lien_ket) {
            throw new NotFoundException('Phiên truy cập không tồn tại');
        }

        // ===== D. IP MATCH: click ↔ verify =====
        if (ip && suKien.dia_chi_ip && ip !== suKien.dia_chi_ip) {
            // Đánh dấu sự kiện bị loại
            await this.prisma.su_kien_luot.update({
                where: { ma: suKien.ma },
                data: { trang_thai: 'bi_loai', ly_do_loai_chinh: 'ip_mismatch_verify' },
            });
            throw new BadRequestException('Phiên không hợp lệ. IP xác minh không khớp.');
        }

        // 3. Transaction: cập nhật mã + chiến dịch + tài chính
        const donGiaMua = Number(cd.goi.don_gia_mua);
        const donGiaBan = Number(cd.goi.don_gia_ban);

        const result = await this.prisma.$transaction(async (tx) => {
            // Đánh dấu mã đã dùng
            await tx.ma_xac_nhan.update({
                where: { ma: mxn.ma },
                data: {
                    da_su_dung: true,
                    thoi_diem_su_dung: now,
                    ma_su_kien_luot: suKien.ma,
                },
            });

            // Cập nhật chiến dịch: +1 lượt, +ngân sách đã dùng
            await tx.chien_dich.update({
                where: { ma: cd.ma },
                data: {
                    so_luot_da_chay: { increment: 1 },
                    ngan_sach_da_dung: { increment: donGiaMua },
                },
            });

            // Cập nhật sự kiện lượt thành hợp lệ
            await tx.su_kien_luot.update({
                where: { ma: suKien.ma },
                data: {
                    trang_thai: 'hop_le_da_chot',
                    xac_minh_hoan_tat: true,
                    thoi_diem_chot: now,
                    thoi_luong_giay: cd.goi.thoi_gian_giay,
                },
            });

            // Giảm số dư khóa tạm của người mua (phần đã dùng)
            const viNguoiMua = await tx.vi_nguoi_dung.findFirst({
                where: {
                    ma_nguoi_dung: cd.ma_nguoi_mua,
                    trang_thai: 'hoat_dong',
                },
            });
            if (viNguoiMua) {
                await tx.vi_nguoi_dung.update({
                    where: { ma: viNguoiMua.ma },
                    data: {
                        so_du_khoa_tam: { decrement: donGiaMua },
                        thoi_diem_cap_nhat_so_du: now,
                    },
                });

                // Bút toán: trừ khóa tạm người mua
                await tx.so_cai_giao_dich.create({
                    data: {
                        ma_cong_khai: randomUUID(),
                        ma_vi: viNguoiMua.ma,
                        loai_giao_dich: 'chi_phi_chien_dich',
                        huong_bien_dong: 'giam',
                        loai_so_du_tac_dong: 'khoa_tam',
                        so_tien: donGiaMua,
                        don_vi_tien: 'VND',
                        so_du_kha_dung_truoc: Number(viNguoiMua.so_du_kha_dung),
                        so_du_kha_dung_sau: Number(viNguoiMua.so_du_kha_dung),
                        so_du_khoa_tam_truoc: Number(viNguoiMua.so_du_khoa_tam),
                        so_du_khoa_tam_sau: Number(viNguoiMua.so_du_khoa_tam) - donGiaMua,
                        nguon_phat_sinh: 'luot_hop_le',
                        ma_tham_chieu_nguon: suKien.ma,
                        ma_tham_chieu_phu: cd.ma,
                        ma_khoa_chong_trung: `chi_cd_${cd.ma_cong_khai}_${suKien.ma_cong_khai}`,
                        trang_thai: 'hoan_thanh',
                        mo_ta_hien_thi: `Chi phí lượt traffic: ${cd.ten_chien_dich}`,
                        thoi_diem_phat_sinh_nghiep_vu: now,
                        nguon_tao: 'he_thong',
                    },
                });
            }

            // Cộng doanh thu cho người bán (chủ link rút gọn)
            const maLienKet = suKien.lien_ket!;
            const viNguoiBan = await tx.vi_nguoi_dung.findFirst({
                where: {
                    ma_nguoi_dung: maLienKet.ma_nguoi_dung,
                    trang_thai: 'hoat_dong',
                },
            });
            if (viNguoiBan) {
                await tx.vi_nguoi_dung.update({
                    where: { ma: viNguoiBan.ma },
                    data: {
                        so_du_kha_dung: { increment: donGiaBan },
                        thoi_diem_cap_nhat_so_du: now,
                    },
                });

                // Bút toán: cộng doanh thu người bán
                await tx.so_cai_giao_dich.create({
                    data: {
                        ma_cong_khai: randomUUID(),
                        ma_vi: viNguoiBan.ma,
                        loai_giao_dich: 'doanh_thu_traffic',
                        huong_bien_dong: 'tang',
                        loai_so_du_tac_dong: 'kha_dung',
                        so_tien: donGiaBan,
                        don_vi_tien: 'VND',
                        so_du_kha_dung_truoc: Number(viNguoiBan.so_du_kha_dung),
                        so_du_kha_dung_sau: Number(viNguoiBan.so_du_kha_dung) + donGiaBan,
                        so_du_khoa_tam_truoc: Number(viNguoiBan.so_du_khoa_tam),
                        so_du_khoa_tam_sau: Number(viNguoiBan.so_du_khoa_tam),
                        nguon_phat_sinh: 'luot_hop_le',
                        ma_tham_chieu_nguon: suKien.ma,
                        ma_tham_chieu_phu: cd.ma,
                        ma_khoa_chong_trung: `dt_ban_${maLienKet.ma_cong_khai}_${suKien.ma_cong_khai}`,
                        trang_thai: 'hoan_thanh',
                        mo_ta_hien_thi: `Doanh thu lượt traffic từ link: ${maLienKet.ma_ngan}`,
                        thoi_diem_phat_sinh_nghiep_vu: now,
                        nguon_tao: 'he_thong',
                    },
                });
            }

            return { lien_ket_goc: suKien.lien_ket!.lien_ket_goc };
        });

        return result;
    }

    async chiTiet(maCongKhai: string, maNguoiMua: bigint) {
        const cd = await this._timChienDichCuaNguoiMua(maCongKhai, maNguoiMua);

        const goi = await this.prisma.goi_thoi_gian.findUnique({
            where: { ma: cd.ma_goi }
        });

        return {
            ma_cong_khai: cd.ma_cong_khai,
            ten_chien_dich: cd.ten_chien_dich,
            lien_ket_trang_dich: cd.lien_ket_trang_dich,
            tu_khoa: cd.tu_khoa,
            so_luot_mua: cd.so_luot_mua,
            so_luot_da_chay: cd.so_luot_da_chay,
            ngan_sach_tong: Number(cd.ngan_sach_tong),
            anh_minh_hoa_url: cd.anh_minh_hoa_url,
            anh_minh_hoa_file: cd.anh_minh_hoa_file,
            trang_thai: cd.trang_thai,
            thoi_diem_tao: cd.thoi_diem_tao,
            goi: {
                ten_goi: goi?.ten_goi,
                thoi_gian_cho: goi?.thoi_gian_giay,
                don_gia_mua: Number(goi?.don_gia_mua)
            }
        };
    }

    // ========================================================================
    // HELPERS
    // ========================================================================

    private async _timChienDichCuaNguoiMua(
        maCongKhai: string,
        maNguoiMua: bigint,
    ) {
        const cd = await this.prisma.chien_dich.findUnique({
            where: { ma_cong_khai: maCongKhai },
        });
        if (!cd) throw new NotFoundException('Chiến dịch không tồn tại');
        if (cd.ma_nguoi_mua !== maNguoiMua) {
            throw new ForbiddenException('Bạn không có quyền thao tác chiến dịch này');
        }
        return cd;
    }
}
