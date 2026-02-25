import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WithdrawalService {
    constructor(private prisma: PrismaService) { }

    /** QR01 — Tạo yêu cầu rút + khóa tạm số dư (ATOMIC) */
    async taoYeuCauRut(maNguoiDung: bigint, data: {
        so_tien: number;
        phuong_thuc: string;
        thong_tin_nhan_tien: any;
        ghi_chu?: string;
    }) {
        if (data.so_tien <= 0) throw new BadRequestException('Số tiền rút phải lớn hơn 0');

        return this.prisma.$transaction(async (tx) => {
            let vi = await tx.vi_nguoi_dung.findFirst({
                where: { ma_nguoi_dung: maNguoiDung, trang_thai: 'hoat_dong' },
            });
            if (!vi) {
                // Auto-create ví cho user cũ chưa có ví
                const nguoiDung = await tx.nguoi_dung.findUnique({ where: { ma: maNguoiDung } });
                const loaiVi = nguoiDung?.loai_tai_khoan_mac_dinh === 'R20' ? 'vi_doanh_thu' : 'vi_chi_tieu';
                vi = await tx.vi_nguoi_dung.create({
                    data: {
                        ma_cong_khai: randomUUID(),
                        ma_nguoi_dung: maNguoiDung,
                        loai_vi: loaiVi,
                        don_vi_tien: 'VND',
                        so_du_kha_dung: new Decimal(0),
                        so_du_khoa_tam: new Decimal(0),
                        trang_thai: 'hoat_dong',
                        thoi_diem_cap_nhat_so_du: new Date(),
                    },
                });
            }

            const soTienRut = new Decimal(data.so_tien);
            if (vi.so_du_kha_dung.lessThan(soTienRut)) {
                throw new BadRequestException('Số dư khả dụng không đủ');
            }

            // Khóa tạm: giảm khả dụng, tăng khóa tạm
            const soDuKhaDungMoi = vi.so_du_kha_dung.sub(soTienRut);
            const soDuKhoaTamMoi = vi.so_du_khoa_tam.add(soTienRut);

            // Tạo yêu cầu rút
            const yeuCau = await tx.yeu_cau_rut.create({
                data: {
                    ma_cong_khai: randomUUID(),
                    ma_nguoi_dung: maNguoiDung,
                    so_tien_yeu_cau: soTienRut,
                    don_vi_tien: 'VND',
                    phuong_thuc_rut: data.phuong_thuc,
                    trang_thai: 'cho_duyet',
                    thong_tin_nhan_tien_chup: JSON.stringify(data.thong_tin_nhan_tien),
                    ghi_chu_nguoi_dung: data.ghi_chu || null,
                },
            });

            // Ghi sổ cái khóa tạm
            await tx.so_cai_giao_dich.create({
                data: {
                    ma_cong_khai: randomUUID(),
                    ma_vi: vi.ma,
                    loai_giao_dich: 'khoa_tam_rut',
                    huong_bien_dong: 'giam',
                    loai_so_du_tac_dong: 'kha_dung',
                    so_tien: soTienRut,
                    don_vi_tien: vi.don_vi_tien,
                    so_du_kha_dung_truoc: vi.so_du_kha_dung,
                    so_du_kha_dung_sau: soDuKhaDungMoi,
                    so_du_khoa_tam_truoc: vi.so_du_khoa_tam,
                    so_du_khoa_tam_sau: soDuKhoaTamMoi,
                    nguon_phat_sinh: 'rut_tien',
                    ma_tham_chieu_nguon: yeuCau.ma,
                    ma_khoa_chong_trung: `KHOA_${yeuCau.ma}_${Date.now()}`,
                    trang_thai: 'thanh_cong',
                    mo_ta_hien_thi: 'Khóa tạm số dư cho yêu cầu rút tiền',
                    thoi_diem_phat_sinh_nghiep_vu: new Date(),
                    nguon_tao: 'he_thong',
                },
            });

            // Cập nhật ví
            await tx.vi_nguoi_dung.update({
                where: { ma: vi.ma },
                data: {
                    so_du_kha_dung: soDuKhaDungMoi,
                    so_du_khoa_tam: soDuKhoaTamMoi,
                    thoi_diem_cap_nhat_so_du: new Date(),
                },
            });

            return {
                ma_yeu_cau: yeuCau.ma_cong_khai,
                so_tien: yeuCau.so_tien_yeu_cau,
                trang_thai: yeuCau.trang_thai,
                so_du_kha_dung_con_lai: soDuKhaDungMoi.toString(),
            };
        });
    }

    /** Danh sách yêu cầu rút của người dùng */
    async danhSachYeuCau(maNguoiDung: bigint, page = 1, limit = 20) {
        const [yeuCau, tong] = await Promise.all([
            this.prisma.yeu_cau_rut.findMany({
                where: { ma_nguoi_dung: maNguoiDung },
                orderBy: { thoi_diem_tao: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.yeu_cau_rut.count({ where: { ma_nguoi_dung: maNguoiDung } }),
        ]);
        return { yeu_cau: yeuCau, tong };
    }

    /** R30: Danh sách yêu cầu rút chờ duyệt */
    async danhSachChoDuyet(page = 1, limit = 20) {
        const [yeuCau, tong] = await Promise.all([
            this.prisma.yeu_cau_rut.findMany({
                where: { trang_thai: { in: ['cho_duyet', 'dang_xu_ly'] } },
                orderBy: { thoi_diem_tao: 'asc' },
                skip: (page - 1) * limit,
                take: limit,
                include: { nguoi_dung: { select: { ten_hien_thi: true, thu_dien_tu: true } } },
            }),
            this.prisma.yeu_cau_rut.count({ where: { trang_thai: { in: ['cho_duyet', 'dang_xu_ly'] } } }),
        ]);
        return { yeu_cau: yeuCau, tong };
    }

    /** QR06 — Từ chối + hoàn số dư (ATOMIC) */
    async tuChoiRutTien(maNguoiXuLy: bigint, maYeuCau: string, lyDo: string) {
        if (!lyDo) throw new BadRequestException('Phải có lý do từ chối');

        return this.prisma.$transaction(async (tx) => {
            const yeuCau = await tx.yeu_cau_rut.findFirst({ where: { ma_cong_khai: maYeuCau } });
            if (!yeuCau) throw new NotFoundException('Không tìm thấy yêu cầu rút');
            if (!['cho_duyet', 'dang_xu_ly'].includes(yeuCau.trang_thai)) {
                throw new BadRequestException('Yêu cầu không ở trạng thái cho phép từ chối');
            }

            const vi = await tx.vi_nguoi_dung.findFirst({
                where: { ma_nguoi_dung: yeuCau.ma_nguoi_dung, trang_thai: 'hoat_dong' },
            });
            if (!vi) throw new BadRequestException('Không tìm thấy ví');

            // Hoàn số dư: tăng khả dụng, giảm khóa tạm
            const soDuKhaDungMoi = vi.so_du_kha_dung.add(yeuCau.so_tien_yeu_cau);
            const soDuKhoaTamMoi = vi.so_du_khoa_tam.sub(yeuCau.so_tien_yeu_cau);

            await tx.so_cai_giao_dich.create({
                data: {
                    ma_cong_khai: randomUUID(),
                    ma_vi: vi.ma,
                    loai_giao_dich: 'hoan_khoa_tam',
                    huong_bien_dong: 'tang',
                    loai_so_du_tac_dong: 'kha_dung',
                    so_tien: yeuCau.so_tien_yeu_cau,
                    don_vi_tien: vi.don_vi_tien,
                    so_du_kha_dung_truoc: vi.so_du_kha_dung,
                    so_du_kha_dung_sau: soDuKhaDungMoi,
                    so_du_khoa_tam_truoc: vi.so_du_khoa_tam,
                    so_du_khoa_tam_sau: soDuKhoaTamMoi,
                    nguon_phat_sinh: 'rut_tien',
                    ma_tham_chieu_nguon: yeuCau.ma,
                    ma_khoa_chong_trung: `HOAN_${yeuCau.ma}_${Date.now()}`,
                    trang_thai: 'thanh_cong',
                    mo_ta_hien_thi: 'Hoàn số dư do từ chối yêu cầu rút',
                    thoi_diem_phat_sinh_nghiep_vu: new Date(),
                    nguon_tao: 'he_thong',
                    ma_nguoi_dung_tao: maNguoiXuLy,
                },
            });

            await tx.vi_nguoi_dung.update({
                where: { ma: vi.ma },
                data: {
                    so_du_kha_dung: soDuKhaDungMoi,
                    so_du_khoa_tam: soDuKhoaTamMoi,
                    thoi_diem_cap_nhat_so_du: new Date(),
                },
            });

            await tx.yeu_cau_rut.update({
                where: { ma: yeuCau.ma },
                data: {
                    trang_thai: 'tu_choi',
                    ma_nguoi_xu_ly: maNguoiXuLy,
                    ly_do_tu_choi: lyDo,
                },
            });

            await tx.nhat_ky_quan_tri.create({
                data: {
                    ma_nguoi_thao_tac: maNguoiXuLy,
                    hanh_dong: 'tu_choi_rut_tien',
                    doi_tuong: 'yeu_cau_rut',
                    ma_doi_tuong: yeuCau.ma,
                    trang_thai_truoc: yeuCau.trang_thai,
                    trang_thai_sau: 'tu_choi',
                    ly_do: lyDo,
                },
            });

            return { thong_diep: 'Đã từ chối yêu cầu rút, số dư đã hoàn lại' };
        });
    }

    /** QR05 — Xác nhận hoàn thành chi rút (ATOMIC) */
    async xacNhanHoanThanh(maNguoiXuLy: bigint, maYeuCau: string, ghiChu?: string) {
        return this.prisma.$transaction(async (tx) => {
            const yeuCau = await tx.yeu_cau_rut.findFirst({ where: { ma_cong_khai: maYeuCau } });
            if (!yeuCau) throw new NotFoundException('Không tìm thấy yêu cầu rút');
            if (yeuCau.trang_thai !== 'da_gui') {
                throw new BadRequestException('Yêu cầu phải ở trạng thái "đã gửi" mới được xác nhận hoàn thành');
            }

            const vi = await tx.vi_nguoi_dung.findFirst({
                where: { ma_nguoi_dung: yeuCau.ma_nguoi_dung, trang_thai: 'hoat_dong' },
            });
            if (!vi) throw new BadRequestException('Không tìm thấy ví');

            // Chốt chi rút: giảm khóa tạm vĩnh viễn
            const soDuKhoaTamMoi = vi.so_du_khoa_tam.sub(yeuCau.so_tien_yeu_cau);

            await tx.so_cai_giao_dich.create({
                data: {
                    ma_cong_khai: randomUUID(),
                    ma_vi: vi.ma,
                    loai_giao_dich: 'chi_rut',
                    huong_bien_dong: 'giam',
                    loai_so_du_tac_dong: 'khoa_tam',
                    so_tien: yeuCau.so_tien_yeu_cau,
                    don_vi_tien: vi.don_vi_tien,
                    so_du_kha_dung_truoc: vi.so_du_kha_dung,
                    so_du_kha_dung_sau: vi.so_du_kha_dung,
                    so_du_khoa_tam_truoc: vi.so_du_khoa_tam,
                    so_du_khoa_tam_sau: soDuKhoaTamMoi,
                    nguon_phat_sinh: 'rut_tien',
                    ma_tham_chieu_nguon: yeuCau.ma,
                    ma_khoa_chong_trung: `CHIRUT_${yeuCau.ma}_${Date.now()}`,
                    trang_thai: 'thanh_cong',
                    mo_ta_hien_thi: 'Chi rút tiền thành công',
                    thoi_diem_phat_sinh_nghiep_vu: new Date(),
                    nguon_tao: 'he_thong',
                    ma_nguoi_dung_tao: maNguoiXuLy,
                },
            });

            await tx.vi_nguoi_dung.update({
                where: { ma: vi.ma },
                data: {
                    so_du_khoa_tam: soDuKhoaTamMoi,
                    thoi_diem_cap_nhat_so_du: new Date(),
                },
            });

            await tx.yeu_cau_rut.update({
                where: { ma: yeuCau.ma },
                data: {
                    trang_thai: 'hoan_thanh',
                    thoi_diem_hoan_thanh: new Date(),
                    ghi_chu_xu_ly: ghiChu,
                },
            });

            await tx.nhat_ky_quan_tri.create({
                data: {
                    ma_nguoi_thao_tac: maNguoiXuLy,
                    hanh_dong: 'hoan_thanh_rut_tien',
                    doi_tuong: 'yeu_cau_rut',
                    ma_doi_tuong: yeuCau.ma,
                    trang_thai_truoc: 'da_gui',
                    trang_thai_sau: 'hoan_thanh',
                    ghi_chu: ghiChu,
                },
            });

            return { thong_diep: 'Xác nhận hoàn thành chi rút thành công' };
        });
    }

    /** QR03 — Duyệt yêu cầu rút (chỉ đổi trạng thái, chưa chi trả) */
    async duyetYeuCau(maNguoiXuLy: bigint, maYeuCau: string) {
        const yeuCau = await this.prisma.yeu_cau_rut.findFirst({ where: { ma_cong_khai: maYeuCau } });
        if (!yeuCau) throw new NotFoundException('Không tìm thấy yêu cầu rút');
        if (!['cho_duyet', 'dang_xu_ly'].includes(yeuCau.trang_thai)) {
            throw new BadRequestException('Yêu cầu không ở trạng thái cho phép duyệt');
        }

        await this.prisma.yeu_cau_rut.update({
            where: { ma: yeuCau.ma },
            data: {
                trang_thai: 'da_duyet',
                ma_nguoi_xu_ly: maNguoiXuLy,
                thoi_diem_duyet: new Date(),
            },
        });

        return { thong_diep: 'Đã duyệt yêu cầu rút, vui lòng chi trả ngoài hệ thống' };
    }

    /** QR04 — Cập nhật đã gửi */
    async capNhatDaGui(maNguoiXuLy: bigint, maYeuCau: string, data: {
        so_tien_thuc_chi: number;
        ma_tham_chieu?: string;
        ghi_chu?: string;
    }) {
        const yeuCau = await this.prisma.yeu_cau_rut.findFirst({ where: { ma_cong_khai: maYeuCau } });
        if (!yeuCau) throw new NotFoundException('Không tìm thấy yêu cầu rút');
        if (yeuCau.trang_thai !== 'da_duyet') {
            throw new BadRequestException('Yêu cầu phải ở trạng thái "đã duyệt"');
        }

        await this.prisma.yeu_cau_rut.update({
            where: { ma: yeuCau.ma },
            data: {
                trang_thai: 'da_gui',
                so_tien_thuc_chi: new Decimal(data.so_tien_thuc_chi),
                ma_tham_chieu_chi_tra: data.ma_tham_chieu || null,
                thoi_diem_gui: new Date(),
                thoi_diem_chi_tra: new Date(),
                ghi_chu_xu_ly: data.ghi_chu || null,
            },
        });

        return { thong_diep: 'Đã cập nhật trạng thái đã gửi' };
    }
}
