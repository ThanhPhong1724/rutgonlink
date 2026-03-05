import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignService } from '../campaign/campaign.service';
import { AuthService } from '../auth/auth.service';
import { randomUUID } from 'crypto';

// Bot / crawler user-agent patterns
const BOT_UA_PATTERNS = [
    /bot/i, /crawler/i, /spider/i, /headless/i, /phantom/i,
    /selenium/i, /puppeteer/i, /playwright/i, /wget/i, /curl/i,
    /scrapy/i, /httpclient/i, /python-requests/i, /go-http/i,
];

function isBot(ua?: string): boolean {
    if (!ua) return false;
    return BOT_UA_PATTERNS.some(p => p.test(ua));
}

@Injectable()
export class RedirectService {
    constructor(
        private prisma: PrismaService,
        private campaignService: CampaignService,
        private authService: AuthService,
    ) { }

    async getLinkInfoAndTrack(maNgan: string, clientInfo: { ip?: string; userAgent?: string }, turnstileToken?: string) {
        const lienKet = await this.prisma.lien_ket_rut_gon.findUnique({ where: { ma_ngan: maNgan } });

        if (!lienKet) {
            throw new NotFoundException('Liên kết không tồn tại');
        }

        if (lienKet.trang_thai !== 'hoat_dong') {
            throw new ForbiddenException('Liên kết hiện không khả dụng');
        }

        const ip = clientInfo.ip || null;
        const ua = clientInfo.userAgent || null;

        // ===================== F. TRUNSTILE VERIFICATION =====================
        if (lienKet.yeu_cau_xac_minh_truy_cap) {
            if (!turnstileToken) {
                throw new BadRequestException('Vui lòng xác minh CAPTCHA trước khi lấy link');
            }
            await this.authService.verifyTurnstile(turnstileToken, ip || undefined);
        }

        // ===================== E. BOT UA FILTER =====================
        if (isBot(ua || undefined)) {
            const trackingId = randomUUID();
            await this.prisma.su_kien_luot.create({
                data: {
                    ma_cong_khai: trackingId,
                    ma_lien_ket_rut_gon: lienKet.ma,
                    trang_thai: 'bi_loai',
                    ly_do_loai_chinh: 'bot_ua',
                    yeu_cau_xac_minh: false,
                    xac_minh_hoan_tat: false,
                    dia_chi_ip: ip,
                    trinh_duyet: ua ? ua.substring(0, 100) : null,
                    nguon_truy_cap: 'lien_ket_ngan',
                },
            });
            // Vẫn cho xem link gốc nhưng không tính lượt
            return { yeu_cau_xac_minh: false, lien_ket_goc: lienKet.lien_ket_goc };
        }

        // ===================== A. IP + LINK DEDUP 24h =====================
        if (ip) {
            const oneDayAgo = new Date();
            oneDayAgo.setHours(oneDayAgo.getHours() - 24);

            // 1. Check cùng IP + cùng link trong 24h
            const existing = await this.prisma.su_kien_luot.findFirst({
                where: {
                    ma_lien_ket_rut_gon: lienKet.ma,
                    dia_chi_ip: ip,
                    thoi_diem_nhan: { gte: oneDayAgo },
                    trang_thai: { not: 'bi_loai' },
                },
                orderBy: { thoi_diem_nhan: 'desc' },
            });

            if (existing) {
                // Reuse tracking — không tạo sự kiện mới
                if (!lienKet.yeu_cau_xac_minh_truy_cap) {
                    return { yeu_cau_xac_minh: false, lien_ket_goc: lienKet.lien_ket_goc };
                }
                const chienDich = await this.campaignService.phanPhoiChienDich();

                const configs = await this.prisma.cau_hinh_he_thong.findMany({
                    where: { khoa: { in: ['rut_tien_toi_thieu_vnd', 'link_ho_tro_telegram'] } }
                });
                const rutTienMin = configs.find(c => c.khoa === 'rut_tien_toi_thieu_vnd')?.gia_tri || '50000';
                const linkHoTro = configs.find(c => c.khoa === 'link_ho_tro_telegram')?.gia_tri || '';

                return {
                    yeu_cau_xac_minh: true,
                    tracking_id: existing.ma_cong_khai,
                    chien_dich: chienDich ? {
                        ma_cong_khai: chienDich.ma_cong_khai,
                        tu_khoa: chienDich.tu_khoa,
                        lien_ket_trang_dich: chienDich.lien_ket_trang_dich,
                        anh_minh_hoa: chienDich.anh_minh_hoa,
                        thoi_gian_giay: chienDich.thoi_gian_giay,
                    } : null,
                    phan_thuong: chienDich ? {
                        don_gia_ban: Number(chienDich.don_gia_ban),
                        rut_tien_toi_thieu_vnd: Number(rutTienMin)
                    } : null,
                    lien_he_ho_tro: linkHoTro,
                };
            }

            // 2. IP spam cap: > 50 sự kiện / 24h => bi_loai
            const totalFromIp = await this.prisma.su_kien_luot.count({
                where: { dia_chi_ip: ip, thoi_diem_nhan: { gte: oneDayAgo } },
            });

            if (totalFromIp > 50) {
                const trackingId = randomUUID();
                await this.prisma.su_kien_luot.create({
                    data: {
                        ma_cong_khai: trackingId,
                        ma_lien_ket_rut_gon: lienKet.ma,
                        trang_thai: 'bi_loai',
                        ly_do_loai_chinh: 'ip_spam',
                        yeu_cau_xac_minh: false,
                        xac_minh_hoan_tat: false,
                        dia_chi_ip: ip,
                        trinh_duyet: ua ? ua.substring(0, 100) : null,
                        nguon_truy_cap: 'lien_ket_ngan',
                    },
                });
                return { yeu_cau_xac_minh: false, lien_ket_goc: lienKet.lien_ket_goc };
            }
        }

        // ===================== NORMAL FLOW =====================
        const trackingId = randomUUID();
        await this.prisma.su_kien_luot.create({
            data: {
                ma_cong_khai: trackingId,
                ma_lien_ket_rut_gon: lienKet.ma,
                trang_thai: lienKet.yeu_cau_xac_minh_truy_cap ? 'moi_ghi_nhan' : 'hop_le_tam_thoi',
                yeu_cau_xac_minh: lienKet.yeu_cau_xac_minh_truy_cap,
                xac_minh_hoan_tat: !lienKet.yeu_cau_xac_minh_truy_cap,
                dia_chi_ip: ip,
                trinh_duyet: ua ? ua.substring(0, 100) : null,
                nguon_truy_cap: 'lien_ket_ngan',
            }
        });

        if (!lienKet.yeu_cau_xac_minh_truy_cap) {
            return { yeu_cau_xac_minh: false, lien_ket_goc: lienKet.lien_ket_goc };
        }

        const chienDich = await this.campaignService.phanPhoiChienDich();

        const configs = await this.prisma.cau_hinh_he_thong.findMany({
            where: { khoa: { in: ['rut_tien_toi_thieu_vnd', 'link_ho_tro_telegram'] } }
        });
        const rutTienMin = configs.find(c => c.khoa === 'rut_tien_toi_thieu_vnd')?.gia_tri || '50000';
        const linkHoTro = configs.find(c => c.khoa === 'link_ho_tro_telegram')?.gia_tri || '';

        return {
            yeu_cau_xac_minh: true,
            tracking_id: trackingId,
            chien_dich: chienDich ? {
                ma_cong_khai: chienDich.ma_cong_khai,
                tu_khoa: chienDich.tu_khoa,
                lien_ket_trang_dich: chienDich.lien_ket_trang_dich,
                anh_minh_hoa: chienDich.anh_minh_hoa,
                thoi_gian_giay: chienDich.thoi_gian_giay,
            } : null,
            phan_thuong: chienDich ? {
                don_gia_ban: Number(chienDich.don_gia_ban),
                rut_tien_toi_thieu_vnd: Number(rutTienMin)
            } : null,
            lien_he_ho_tro: linkHoTro,
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
            return { lien_ket_goc: suKien.lien_ket.lien_ket_goc };
        }

        const now = new Date();
        const timeDiffSeconds = Math.floor((now.getTime() - suKien.thoi_diem_nhan.getTime()) / 1000);

        if (timeDiffSeconds < 5) {
            throw new BadRequestException('Vui lòng đợi đủ thời gian yêu cầu để tiếp tục');
        }

        await this.prisma.su_kien_luot.update({
            where: { ma: suKien.ma },
            data: {
                trang_thai: 'hop_le_tam_thoi',
                xac_minh_hoan_tat: true,
                thoi_luong_giay: timeDiffSeconds
            }
        });

        return { lien_ket_goc: suKien.lien_ket.lien_ket_goc };
    }
}
