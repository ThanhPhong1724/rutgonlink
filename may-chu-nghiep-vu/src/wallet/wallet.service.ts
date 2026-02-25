import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService) { }

    /** Tạo ví mặc định cho người dùng mới */
    async taoViMacDinh(maNguoiDung: bigint, loaiTaiKhoan: string) {
        const loaiVi = loaiTaiKhoan === 'R10' ? 'vi_chi_tieu' : 'vi_doanh_thu';
        return this.prisma.vi_nguoi_dung.create({
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

    /** Xem số dư */
    async xemSoDu(maNguoiDung: bigint) {
        const viList = await this.prisma.vi_nguoi_dung.findMany({
            where: { ma_nguoi_dung: maNguoiDung, trang_thai: 'hoat_dong' },
            select: {
                ma_cong_khai: true,
                loai_vi: true,
                don_vi_tien: true,
                so_du_kha_dung: true,
                so_du_khoa_tam: true,
                thoi_diem_cap_nhat_so_du: true,
            },
        });
        return { vi: viList };
    }

    /** Xem lịch sử giao dịch */
    async xemLichSu(maNguoiDung: bigint, page = 1, limit = 20) {
        const vi = await this.prisma.vi_nguoi_dung.findFirst({
            where: { ma_nguoi_dung: maNguoiDung, trang_thai: 'hoat_dong' },
        });
        if (!vi) return { giao_dich: [], tong: 0 };

        const [giao_dich, tong] = await Promise.all([
            this.prisma.so_cai_giao_dich.findMany({
                where: { ma_vi: vi.ma },
                orderBy: { thoi_diem_ghi_so: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    ma_cong_khai: true,
                    loai_giao_dich: true,
                    huong_bien_dong: true,
                    so_tien: true,
                    don_vi_tien: true,
                    so_du_kha_dung_sau: true,
                    mo_ta_hien_thi: true,
                    thoi_diem_ghi_so: true,
                },
            }),
            this.prisma.so_cai_giao_dich.count({ where: { ma_vi: vi.ma } }),
        ]);

        return { giao_dich, tong };
    }
}
