import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async layHoSo(maNguoiDung: bigint) {
        const nguoiDung = await this.prisma.nguoi_dung.findUnique({
            where: { ma: maNguoiDung },
            include: {
                vai_tro_duoc_gan: {
                    include: { vai_tro: true },
                    where: { trang_thai: 'hoat_dong' },
                },
                vi_nguoi_dung: true,
            },
        });

        if (!nguoiDung) {
            throw new NotFoundException('Không tìm thấy tài khoản');
        }

        // Lấy ví khả dụng đầu tiên (thường mỗi người có 1 ví doanh thu)
        const viKhaDung = nguoiDung.vi_nguoi_dung?.[0]?.so_du_kha_dung || 0;

        return {
            ma_cong_khai: nguoiDung.ma_cong_khai,
            thu_dien_tu: nguoiDung.thu_dien_tu,
            ten_hien_thi: nguoiDung.ten_hien_thi,
            so_dien_thoai: nguoiDung.so_dien_thoai,
            ngon_ngu_mac_dinh: nguoiDung.ngon_ngu_mac_dinh,
            mui_gio_mac_dinh: nguoiDung.mui_gio_mac_dinh,
            cau_hinh_rut_tien: nguoiDung.cau_hinh_rut_tien ? JSON.parse(nguoiDung.cau_hinh_rut_tien) : null,
            loai_tai_khoan: nguoiDung.loai_tai_khoan_mac_dinh,
            trang_thai: nguoiDung.trang_thai,
            vai_tro: nguoiDung.vai_tro_duoc_gan.map(g => g.vai_tro.ma_vai_tro),
            thoi_diem_tao: nguoiDung.thoi_diem_tao,
            so_du_kha_dung: viKhaDung,
        };
    }

    async capNhatHoSo(maNguoiDung: bigint, data: { ten_hien_thi?: string; so_dien_thoai?: string; ngon_ngu_mac_dinh?: string; cau_hinh_rut_tien?: any }) {
        await this.prisma.nguoi_dung.update({
            where: { ma: maNguoiDung },
            data: {
                ...(data.ten_hien_thi && { ten_hien_thi: data.ten_hien_thi }),
                ...(data.so_dien_thoai !== undefined && { so_dien_thoai: data.so_dien_thoai }),
                ...(data.ngon_ngu_mac_dinh && { ngon_ngu_mac_dinh: data.ngon_ngu_mac_dinh }),
                ...(data.cau_hinh_rut_tien !== undefined && { cau_hinh_rut_tien: data.cau_hinh_rut_tien ? JSON.stringify(data.cau_hinh_rut_tien) : null }),
                ma_nguoi_dung_cap_nhat: maNguoiDung,
            },
        });

        return this.layHoSo(maNguoiDung);
    }

    async doiMatKhau(maNguoiDung: bigint, matKhauCu: string, matKhauMoi: string) {
        const nguoiDung = await this.prisma.nguoi_dung.findUnique({
            where: { ma: maNguoiDung },
        });

        if (!nguoiDung) {
            throw new NotFoundException('Không tìm thấy tài khoản');
        }

        const matKhauDung = await bcrypt.compare(matKhauCu, nguoiDung.mat_khau_bam);
        if (!matKhauDung) {
            throw new BadRequestException('Mật khẩu hiện tại không đúng');
        }

        const matKhauBamMoi = await bcrypt.hash(matKhauMoi, 12);
        await this.prisma.nguoi_dung.update({
            where: { ma: maNguoiDung },
            data: { mat_khau_bam: matKhauBamMoi },
        });

        return { thong_diep: 'Đổi mật khẩu thành công' };
    }
}
