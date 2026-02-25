import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RedirectService {
    constructor(private prisma: PrismaService) { }

    async getLinkInfoAndTrack(maNgan: string, clientInfo: { ip?: string; userAgent?: string }) {
        const lienKet = await this.prisma.lien_ket_rut_gon.findUnique({ where: { ma_ngan: maNgan } });

        if (!lienKet) {
            throw new NotFoundException('Liên kết không tồn tại');
        }

        if (lienKet.trang_thai !== 'hoat_dong') {
            throw new ForbiddenException('Liên kết hiện không khả dụng');
        }

        // Tạo sự kiện truy cập ban đầu
        const trackingId = randomUUID();
        const suKien = await this.prisma.su_kien_luot.create({
            data: {
                ma_cong_khai: trackingId,
                ma_lien_ket_rut_gon: lienKet.ma,
                trang_thai: lienKet.yeu_cau_xac_minh_truy_cap ? 'moi_ghi_nhan' : 'hop_le_tam_thoi',
                yeu_cau_xac_minh: lienKet.yeu_cau_xac_minh_truy_cap,
                xac_minh_hoan_tat: !lienKet.yeu_cau_xac_minh_truy_cap,
                dia_chi_ip: clientInfo.ip || null,
                trinh_duyet: clientInfo.userAgent ? clientInfo.userAgent.substring(0, 100) : null,
                nguon_truy_cap: 'lien_ket_ngan',
            }
        });

        // Nếu không yêu cầu xác minh, trả về link gốc ngay
        if (!lienKet.yeu_cau_xac_minh_truy_cap) {
            return {
                yeu_cau_xac_minh: false,
                lien_ket_goc: lienKet.lien_ket_goc
            };
        }

        // Nếu có yêu cầu xác minh (ví dụ chờ 5s)
        return {
            yeu_cau_xac_minh: true,
            tracking_id: trackingId,
            thoi_gian_cho: 5 // 5 seconds
        };
    }

    async verifyAndGetLink(trackingId: string) {
        const suKien = await this.prisma.su_kien_luot.findUnique({
            where: { ma_cong_khai: trackingId },
            include: { lien_ket: true }
        });

        if (!suKien || !suKien.lien_ket) {
            throw new NotFoundException('Phiên truy cập không tồn tại hoặc đã hết hạn');
        }

        if (suKien.xac_minh_hoan_tat) {
            // Đã xác minh rồi thì cứ trả về link
            return { lien_ket_goc: suKien.lien_ket.lien_ket_goc };
        }

        const now = new Date();
        const timeDiffSeconds = Math.floor((now.getTime() - suKien.thoi_diem_nhan.getTime()) / 1000);

        if (timeDiffSeconds < 5) {
            throw new BadRequestException('Vui lòng đợi đủ thời gian yêu cầu để tiếp tục');
        }

        // Cập nhật sự kiện thành hợp lệ
        await this.prisma.su_kien_luot.update({
            where: { ma: suKien.ma },
            data: {
                trang_thai: 'hop_le_tam_thoi',
                xac_minh_hoan_tat: true,
                thoi_luong_giay: timeDiffSeconds
            }
        });

        return {
            lien_ket_goc: suKien.lien_ket.lien_ket_goc
        };
    }
}
