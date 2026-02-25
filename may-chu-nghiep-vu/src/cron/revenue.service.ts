import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

@Injectable()
export class RevenueService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(RevenueService.name);
    private timer: NodeJS.Timeout;

    constructor(private prisma: PrismaService) { }

    onModuleInit() {
        // Run every minute (60000 ms)
        this.timer = setInterval(() => {
            this.processRevenue().catch(err => this.logger.error('Error processing revenue', err));
        }, 60000);
        this.logger.log('Revenue Calculation Cron Job Started (runs every 60s)');
    }

    onModuleDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    async processRevenue() {
        // 1. Fetch all 'hop_le_tam_thoi' events that haven't been finalized yet
        const pendingEvents = await this.prisma.su_kien_luot.findMany({
            where: { trang_thai: 'hop_le_tam_thoi' },
            include: { lien_ket: true }
        });

        if (pendingEvents.length === 0) return;

        this.logger.log(`Found ${pendingEvents.length} pending events to process for revenue.`);

        // For Phase 4, standard flat rate: 500 VND per valid click.
        const RATE_PER_CLICK = new Decimal(500);

        // Group events by Owner (Publisher)
        const revenueByPublisher = new Map<bigint, number>();
        const processedEventIds: bigint[] = [];

        for (const event of pendingEvents) {
            if (!event.lien_ket || !event.lien_ket.ma_nguoi_dung) continue;

            const publisherId = event.lien_ket.ma_nguoi_dung;

            if (!revenueByPublisher.has(publisherId)) {
                revenueByPublisher.set(publisherId, 0);
            }
            revenueByPublisher.set(publisherId, revenueByPublisher.get(publisherId)! + 1);
            processedEventIds.push(event.ma);
        }

        // 3. Process transactions
        await this.prisma.$transaction(async (tx) => {
            // A. Mark events as 'hop_le_da_chot'
            await tx.su_kien_luot.updateMany({
                where: { ma: { in: processedEventIds } },
                data: {
                    trang_thai: 'hop_le_da_chot',
                    thoi_diem_chot: new Date()
                }
            });

            // B. Add revenue to Publisher's wallet
            for (const [publisherId, count] of revenueByPublisher.entries()) {
                const totalRevenue = RATE_PER_CLICK.mul(count);

                // Fetch Publisher's Revenue Wallet
                let viDoanhThu = await tx.vi_nguoi_dung.findFirst({
                    where: { ma_nguoi_dung: publisherId, loai_vi: 'vi_doanh_thu', trang_thai: 'hoat_dong' }
                });

                // If no wallet exists, create one safely
                if (!viDoanhThu) {
                    viDoanhThu = await tx.vi_nguoi_dung.create({
                        data: {
                            ma_cong_khai: randomUUID(),
                            ma_nguoi_dung: publisherId,
                            loai_vi: 'vi_doanh_thu',
                            don_vi_tien: 'VND',
                            so_du_kha_dung: new Decimal(0),
                            so_du_khoa_tam: new Decimal(0),
                            trang_thai: 'hoat_dong',
                            thoi_diem_cap_nhat_so_du: new Date(),
                        }
                    });
                }

                const soDuTruoc = viDoanhThu.so_du_kha_dung;
                const soDuSau = soDuTruoc.add(totalRevenue);

                // Update Wallet Balance
                await tx.vi_nguoi_dung.update({
                    where: { ma: viDoanhThu.ma },
                    data: {
                        so_du_kha_dung: soDuSau,
                        thoi_diem_cap_nhat_so_du: new Date()
                    }
                });

                // Create Transaction Ledger Record
                await tx.so_cai_giao_dich.create({
                    data: {
                        ma_cong_khai: randomUUID(),
                        ma_vi: viDoanhThu.ma,
                        loai_giao_dich: 'doanh_thu_nha_xuat_ban_ket_chuyen',
                        huong_bien_dong: 'tang',
                        loai_so_du_tac_dong: 'kha_dung',
                        so_tien: totalRevenue,
                        don_vi_tien: 'VND',
                        so_du_kha_dung_truoc: soDuTruoc,
                        so_du_kha_dung_sau: soDuSau,
                        so_du_khoa_tam_truoc: viDoanhThu.so_du_khoa_tam,
                        so_du_khoa_tam_sau: viDoanhThu.so_du_khoa_tam,
                        nguon_phat_sinh: 'doi_soat_nxb',
                        ma_tham_chieu_nguon: publisherId, // reference to the publisher/batch
                        ma_khoa_chong_trung: `REV_${Date.now()}_${publisherId}_${randomUUID().substring(0, 8)}`,
                        trang_thai: 'thanh_cong',
                        mo_ta_hien_thi: `Cộng doanh thu cho ${count} lượt rút gọn liên kết`,
                        thoi_diem_phat_sinh_nghiep_vu: new Date(),
                        thoi_diem_ghi_so: new Date(),
                        nguon_tao: 'he_thong'
                    }
                });

                this.logger.log(`Added ${totalRevenue.toString()} VND to Publisher ${publisherId} for ${count} clicks.`);
            }
        });
    }
}
