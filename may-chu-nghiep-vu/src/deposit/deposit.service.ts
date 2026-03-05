import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DepositService {
    constructor(private prisma: PrismaService) { }

    /** QN01 — Tạo hóa đơn nạp tiền */
    async taoHoaDon(maNguoiDung: bigint, data: {
        so_tien: number;
        phuong_thuc: string;
        ghi_chu?: string;
    }) {
        if (data.so_tien <= 0) {
            throw new BadRequestException('Số tiền nạp phải lớn hơn 0');
        }

        const maHoaDon = randomUUID();
        const cfg = await this.prisma.cau_hinh_he_thong.findUnique({ where: { khoa: 'thanh_toan_noi_dung' } });
        const formatString = cfg?.gia_tri || 'NAP {ID}';
        const shortId = Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
        const noiDungThamChieu = formatString.replace('{ID}', shortId);
        const thoiDiemHetHan = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

        const hoaDon = await this.prisma.hoa_don_nap.create({
            data: {
                ma_cong_khai: maHoaDon,
                ma_nguoi_dung: maNguoiDung,
                so_tien_yeu_cau: new Decimal(data.so_tien),
                don_vi_tien: 'VND',
                phuong_thuc_nap: data.phuong_thuc,
                trang_thai: 'cho_thanh_toan',
                noi_dung_tham_chieu: noiDungThamChieu,
                ghi_chu_nguoi_dung: data.ghi_chu || null,
                thoi_diem_het_han: thoiDiemHetHan,
            },
        });

        return {
            ma_hoa_don: hoaDon.ma_cong_khai,
            trang_thai: hoaDon.trang_thai,
            so_tien: hoaDon.so_tien_yeu_cau,
            phuong_thuc: hoaDon.phuong_thuc_nap,
            noi_dung_tham_chieu: hoaDon.noi_dung_tham_chieu,
            thoi_diem_het_han: hoaDon.thoi_diem_het_han,
        };
    }

    /** Xem danh sách hóa đơn nạp của người dùng */
    async danhSachHoaDon(maNguoiDung: bigint, page = 1, limit = 20) {
        const [hoaDon, tong] = await Promise.all([
            this.prisma.hoa_don_nap.findMany({
                where: { ma_nguoi_dung: maNguoiDung },
                orderBy: { thoi_diem_tao: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.hoa_don_nap.count({ where: { ma_nguoi_dung: maNguoiDung } }),
        ]);
        return { hoa_don: hoaDon, tong };
    }

    /** R10 hủy hóa đơn nạp (QN06) */
    async huyHoaDon(maNguoiDung: bigint, maHoaDon: string) {
        const hoaDon = await this.prisma.hoa_don_nap.findFirst({
            where: { ma_cong_khai: maHoaDon, ma_nguoi_dung: maNguoiDung },
        });
        if (!hoaDon) throw new NotFoundException('Không tìm thấy hóa đơn');
        if (!['cho_thanh_toan', 'cho_chung_tu'].includes(hoaDon.trang_thai)) {
            throw new BadRequestException('Không thể hủy hóa đơn ở trạng thái này');
        }

        await this.prisma.hoa_don_nap.update({
            where: { ma: hoaDon.ma },
            data: { trang_thai: 'da_huy' },
        });
        return { thong_diep: 'Đã hủy hóa đơn' };
    }

    /** Xem danh sách hóa đơn chờ duyệt (R30) */
    async danhSachChoDuyet(page = 1, limit = 20) {
        const [hoaDon, tong] = await Promise.all([
            this.prisma.hoa_don_nap.findMany({
                where: { trang_thai: { in: ['cho_duyet', 'dang_kiem_tra'] } },
                orderBy: { thoi_diem_tao: 'asc' },
                skip: (page - 1) * limit,
                take: limit,
                include: { nguoi_dung: { select: { ten_hien_thi: true, thu_dien_tu: true } } },
            }),
            this.prisma.hoa_don_nap.count({ where: { trang_thai: { in: ['cho_duyet', 'dang_kiem_tra'] } } }),
        ]);
        return { hoa_don: hoaDon, tong };
    }

    /** R30: Lịch sử hóa đơn đã xử lý */
    async lichSuDuyet(page = 1, limit = 50) {
        const [hoaDon, tong] = await Promise.all([
            this.prisma.hoa_don_nap.findMany({
                where: { trang_thai: { in: ['thanh_cong', 'tu_choi'] } },
                orderBy: { thoi_diem_duyet: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: { nguoi_dung: { select: { ten_hien_thi: true, thu_dien_tu: true } } },
            }),
            this.prisma.hoa_don_nap.count({ where: { trang_thai: { in: ['thanh_cong', 'tu_choi'] } } }),
        ]);
        return { hoa_don: hoaDon, tong };
    }

    /** QN04 — Duyệt nạp tiền (ATOMIC: cộng tiền + ghi sổ cái + đổi trạng thái) */
    async duyetNapTien(maNguoiDuyet: bigint, maHoaDon: string, ghiChu?: string, lyDoNgoaiLe?: string) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Khóa bản ghi hóa đơn
            const hoaDon = await tx.hoa_don_nap.findFirst({
                where: { ma_cong_khai: maHoaDon },
            });
            if (!hoaDon) throw new NotFoundException('Không tìm thấy hóa đơn');
            if (!['cho_duyet', 'dang_kiem_tra'].includes(hoaDon.trang_thai)) {
                throw new BadRequestException('Hóa đơn không ở trạng thái cho phép duyệt');
            }

            // 2. Kiểm tra chống cộng trùng
            const butToanDaTonTai = await tx.so_cai_giao_dich.findFirst({
                where: {
                    nguon_phat_sinh: 'nap_tien',
                    ma_tham_chieu_nguon: hoaDon.ma,
                    trang_thai: 'thanh_cong',
                },
            });
            if (butToanDaTonTai) {
                throw new BadRequestException('Hóa đơn này đã được cộng tiền trước đó');
            }

            // 3. Tìm hoặc tạo ví người dùng
            let vi = await tx.vi_nguoi_dung.findFirst({
                where: { ma_nguoi_dung: hoaDon.ma_nguoi_dung, trang_thai: 'hoat_dong' },
            });
            if (!vi) {
                // Auto-create ví cho user cũ chưa có ví
                const nguoiDung = await tx.nguoi_dung.findUnique({ where: { ma: hoaDon.ma_nguoi_dung } });
                const loaiVi = nguoiDung?.loai_tai_khoan_mac_dinh === 'R20' ? 'vi_doanh_thu' : 'vi_chi_tieu';
                vi = await tx.vi_nguoi_dung.create({
                    data: {
                        ma_cong_khai: randomUUID(),
                        ma_nguoi_dung: hoaDon.ma_nguoi_dung,
                        loai_vi: loaiVi,
                        don_vi_tien: 'VND',
                        so_du_kha_dung: new Decimal(0),
                        so_du_khoa_tam: new Decimal(0),
                        trang_thai: 'hoat_dong',
                        thoi_diem_cap_nhat_so_du: new Date(),
                    },
                });
            }

            // 4. Tính số tiền cộng
            const soTienCong = hoaDon.so_tien_yeu_cau.add(hoaDon.so_tien_khuyen_mai || new Decimal(0));
            const soDuKhaDungMoi = vi.so_du_kha_dung.add(soTienCong);

            // 5. Tạo bút toán sổ cái
            await tx.so_cai_giao_dich.create({
                data: {
                    ma_cong_khai: randomUUID(),
                    ma_vi: vi.ma,
                    loai_giao_dich: 'nap_tien',
                    huong_bien_dong: 'tang',
                    loai_so_du_tac_dong: 'kha_dung',
                    so_tien: soTienCong,
                    don_vi_tien: vi.don_vi_tien,
                    so_du_kha_dung_truoc: vi.so_du_kha_dung,
                    so_du_kha_dung_sau: soDuKhaDungMoi,
                    so_du_khoa_tam_truoc: vi.so_du_khoa_tam,
                    so_du_khoa_tam_sau: vi.so_du_khoa_tam,
                    nguon_phat_sinh: 'nap_tien',
                    ma_tham_chieu_nguon: hoaDon.ma,
                    ma_khoa_chong_trung: `NAP_${hoaDon.ma}_${Date.now()}`,
                    trang_thai: 'thanh_cong',
                    mo_ta_hien_thi: `Nạp tiền: ${hoaDon.noi_dung_tham_chieu}`,
                    thoi_diem_phat_sinh_nghiep_vu: new Date(),
                    nguon_tao: 'he_thong',
                    ma_nguoi_dung_tao: maNguoiDuyet,
                },
            });

            // 6. Cập nhật số dư ví
            await tx.vi_nguoi_dung.update({
                where: { ma: vi.ma },
                data: {
                    so_du_kha_dung: soDuKhaDungMoi,
                    thoi_diem_cap_nhat_so_du: new Date(),
                },
            });

            // 7. Cập nhật trạng thái hóa đơn
            await tx.hoa_don_nap.update({
                where: { ma: hoaDon.ma },
                data: {
                    trang_thai: 'thanh_cong',
                    ma_nguoi_duyet: maNguoiDuyet,
                    thoi_diem_duyet: new Date(),
                    ghi_chu_xu_ly: ghiChu || null,
                    ly_do_duyet_ngoai_le: lyDoNgoaiLe || null,
                },
            });

            // 8. Ghi nhật ký quản trị
            await tx.nhat_ky_quan_tri.create({
                data: {
                    ma_nguoi_thao_tac: maNguoiDuyet,
                    hanh_dong: 'duyet_nap_tien',
                    doi_tuong: 'hoa_don_nap',
                    ma_doi_tuong: hoaDon.ma,
                    trang_thai_truoc: hoaDon.trang_thai,
                    trang_thai_sau: 'thanh_cong',
                    ghi_chu: ghiChu,
                },
            });

            return { thong_diep: 'Duyệt nạp tiền thành công', so_tien_cong: soTienCong.toString() };
        });
    }

    /** QN05 — Từ chối nạp tiền */
    async tuChoiNapTien(maNguoiDuyet: bigint, maHoaDon: string, lyDo: string) {
        if (!lyDo) throw new BadRequestException('Phải có lý do từ chối');

        const hoaDon = await this.prisma.hoa_don_nap.findFirst({
            where: { ma_cong_khai: maHoaDon },
        });
        if (!hoaDon) throw new NotFoundException('Không tìm thấy hóa đơn');
        if (!['cho_duyet', 'dang_kiem_tra'].includes(hoaDon.trang_thai)) {
            throw new BadRequestException('Hóa đơn không ở trạng thái cho phép từ chối');
        }

        await this.prisma.$transaction(async (tx) => {
            await tx.hoa_don_nap.update({
                where: { ma: hoaDon.ma },
                data: {
                    trang_thai: 'tu_choi',
                    ma_nguoi_duyet: maNguoiDuyet,
                    thoi_diem_duyet: new Date(),
                    ly_do_tu_choi: lyDo,
                },
            });

            await tx.nhat_ky_quan_tri.create({
                data: {
                    ma_nguoi_thao_tac: maNguoiDuyet,
                    hanh_dong: 'tu_choi_nap_tien',
                    doi_tuong: 'hoa_don_nap',
                    ma_doi_tuong: hoaDon.ma,
                    trang_thai_truoc: hoaDon.trang_thai,
                    trang_thai_sau: 'tu_choi',
                    ly_do: lyDo,
                },
            });
        });

        return { thong_diep: 'Đã từ chối hóa đơn nạp' };
    }

    /** Chuyển hóa đơn sang chờ duyệt khi tải chứng từ */
    async chuyenChoiDuyet(maNguoiDung: bigint, maHoaDon: string) {
        const hoaDon = await this.prisma.hoa_don_nap.findFirst({
            where: { ma_cong_khai: maHoaDon, ma_nguoi_dung: maNguoiDung },
        });
        if (!hoaDon) throw new NotFoundException('Không tìm thấy hóa đơn');
        if (!['cho_thanh_toan', 'cho_chung_tu'].includes(hoaDon.trang_thai)) {
            throw new BadRequestException('Không thể chuyển trạng thái');
        }

        await this.prisma.hoa_don_nap.update({
            where: { ma: hoaDon.ma },
            data: { trang_thai: 'cho_duyet' },
        });

        return { thong_diep: 'Hóa đơn đã chuyển sang chờ duyệt' };
    }
}
