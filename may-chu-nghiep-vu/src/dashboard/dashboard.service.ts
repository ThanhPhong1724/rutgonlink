import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    // ========================================================================
    // R20 — Nhà xuất bản (Bán Traffic)
    // ========================================================================
    async thongKeR20(maNguoiDung: bigint) {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // 1. Danh sách link chi tiết
        const danhSachLink = await this.prisma.lien_ket_rut_gon.findMany({
            where: { ma_nguoi_dung: maNguoiDung },
            select: { ma: true, ma_ngan: true, lien_ket_goc: true, trang_thai: true, thoi_diem_tao: true },
            orderBy: { thoi_diem_tao: 'desc' },
        });
        const linkIds = danhSachLink.map((l) => l.ma);

        // 2. Tổng lượt click & hợp lệ
        const tongClick = linkIds.length > 0
            ? await this.prisma.su_kien_luot.count({ where: { ma_lien_ket_rut_gon: { in: linkIds } } })
            : 0;
        const luotHopLe = linkIds.length > 0
            ? await this.prisma.su_kien_luot.count({ where: { ma_lien_ket_rut_gon: { in: linkIds }, trang_thai: 'hop_le_da_chot' } })
            : 0;

        // 3. Ví
        const vi = await this.prisma.vi_nguoi_dung.findFirst({
            where: { ma_nguoi_dung: maNguoiDung, trang_thai: 'hoat_dong' },
        });
        const soDuKhaDung = vi ? Number(vi.so_du_kha_dung) : 0;
        const soDuKhoaTam = vi ? Number(vi.so_du_khoa_tam) : 0;

        // 4. Tổng doanh thu
        const doanhThuAgg = await this.prisma.so_cai_giao_dich.aggregate({
            where: { ma_vi: vi?.ma, loai_giao_dich: 'doanh_thu_traffic', trang_thai: 'hoan_thanh' },
            _sum: { so_tien: true },
        });
        const tongDoanhThu = doanhThuAgg._sum.so_tien ? Number(doanhThuAgg._sum.so_tien) : 0;

        // 5. Doanh thu hôm nay
        const doanhThuHomNay = await this.prisma.so_cai_giao_dich.aggregate({
            where: { ma_vi: vi?.ma, loai_giao_dich: 'doanh_thu_traffic', trang_thai: 'hoan_thanh', thoi_diem_phat_sinh_nghiep_vu: { gte: startOfDay } },
            _sum: { so_tien: true },
        });
        const tongDoanhThuHomNay = doanhThuHomNay._sum.so_tien ? Number(doanhThuHomNay._sum.so_tien) : 0;

        // 6. Doanh thu tháng này
        const doanhThuThangNay = await this.prisma.so_cai_giao_dich.aggregate({
            where: { ma_vi: vi?.ma, loai_giao_dich: 'doanh_thu_traffic', trang_thai: 'hoan_thanh', thoi_diem_phat_sinh_nghiep_vu: { gte: startOfMonth } },
            _sum: { so_tien: true },
        });
        const tongDoanhThuThangNay = doanhThuThangNay._sum.so_tien ? Number(doanhThuThangNay._sum.so_tien) : 0;

        // 7. Tổng đã rút
        const rutTienAgg = await this.prisma.so_cai_giao_dich.aggregate({
            where: { ma_vi: vi?.ma, loai_giao_dich: 'rut_tien', trang_thai: 'hoan_thanh' },
            _sum: { so_tien: true },
        });
        const tongDaRut = rutTienAgg._sum.so_tien ? Number(rutTienAgg._sum.so_tien) : 0;

        // 8. Đang chờ rút
        const choRutAgg = await this.prisma.so_cai_giao_dich.aggregate({
            where: { ma_vi: vi?.ma, loai_giao_dich: 'rut_tien', trang_thai: { in: ['cho_duyet', 'dang_xu_ly'] } },
            _sum: { so_tien: true },
        });
        const dangChoRut = choRutAgg._sum.so_tien ? Number(choRutAgg._sum.so_tien) : 0;

        // 9. Bảng thống kê từng link
        const bangLink: any[] = [];
        for (const link of danhSachLink) {
            const clickLink = await this.prisma.su_kien_luot.count({ where: { ma_lien_ket_rut_gon: link.ma } });
            const hopLeLink = await this.prisma.su_kien_luot.count({ where: { ma_lien_ket_rut_gon: link.ma, trang_thai: 'hop_le_da_chot' } });

            bangLink.push({
                ma_ngan: link.ma_ngan,
                lien_ket_goc: link.lien_ket_goc.length > 50 ? link.lien_ket_goc.substring(0, 50) + '...' : link.lien_ket_goc,
                trang_thai: link.trang_thai,
                tong_click: clickLink,
                luot_hop_le: hopLeLink,
                doanh_thu: hopLeLink * 200, // TODO: lấy đơn giá bán thực tế từ gói
            });
        }

        // 10. Biểu đồ 7 ngày
        const bieuDo7Ngay = await this._bieuDo7NgayClick(linkIds);

        return {
            tong_link: danhSachLink.length,
            tong_click: tongClick,
            luot_hop_le: luotHopLe,
            so_du_kha_dung: soDuKhaDung,
            so_du_khoa_tam: soDuKhoaTam,
            tong_doanh_thu: tongDoanhThu,
            doanh_thu_hom_nay: tongDoanhThuHomNay,
            doanh_thu_thang_nay: tongDoanhThuThangNay,
            tong_da_rut: tongDaRut,
            dang_cho_rut: dangChoRut,
            loi_nhuan_thuc: soDuKhaDung + tongDaRut, // tiền thực sự đã nhận
            bang_link: bangLink,
        };
    }

    // ========================================================================
    // R20 — Biểu đồ doanh thu theo thời gian
    // ========================================================================
    async bieuDoDoanhThu(maNguoiDung: bigint, khoang: string) {
        const vi = await this.prisma.vi_nguoi_dung.findFirst({
            where: { ma_nguoi_dung: maNguoiDung, trang_thai: 'hoat_dong' },
        });
        if (!vi) return { du_lieu: [], tong: 0 };

        // Tính ngày bắt đầu dựa trên khoảng thời gian
        const now = new Date();
        let startDate: Date;
        let groupBy: 'day' | 'week' | 'month' = 'day';

        switch (khoang) {
            case '7_ngay':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
                groupBy = 'day';
                break;
            case '30_ngay':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29);
                groupBy = 'day';
                break;
            case '90_ngay':
                startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                groupBy = 'week';
                break;
            case '1_nam':
                startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                groupBy = 'month';
                break;
            default: // tat_ca
                const nguoiDung = await this.prisma.nguoi_dung.findUnique({
                    where: { ma: maNguoiDung },
                    select: { thoi_diem_tao: true },
                });
                startDate = nguoiDung?.thoi_diem_tao || new Date(now.getFullYear(), now.getMonth() - 6, 1);
                const daysDiff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                if (daysDiff <= 31) groupBy = 'day';
                else if (daysDiff <= 180) groupBy = 'week';
                else groupBy = 'month';
                break;
        }

        // Lấy tất cả giao dịch doanh thu trong khoảng
        const gdList = await this.prisma.so_cai_giao_dich.findMany({
            where: {
                ma_vi: vi.ma,
                loai_giao_dich: 'doanh_thu_traffic',
                trang_thai: 'hoan_thanh',
                thoi_diem_phat_sinh_nghiep_vu: { gte: startDate },
            },
            select: { so_tien: true, thoi_diem_phat_sinh_nghiep_vu: true },
            orderBy: { thoi_diem_phat_sinh_nghiep_vu: 'asc' },
        });

        // Nhóm theo ngày/tuần/tháng
        const grouped = new Map<string, number>();

        // Tạo khung thời gian trước
        const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const cursor = new Date(startDate);
        while (cursor < endDate) {
            const key = this._getGroupKey(cursor, groupBy);
            if (!grouped.has(key)) grouped.set(key, 0);
            if (groupBy === 'day') cursor.setDate(cursor.getDate() + 1);
            else if (groupBy === 'week') cursor.setDate(cursor.getDate() + 7);
            else cursor.setMonth(cursor.getMonth() + 1);
        }

        // Cộng dồn
        for (const gd of gdList) {
            const key = this._getGroupKey(gd.thoi_diem_phat_sinh_nghiep_vu, groupBy);
            grouped.set(key, (grouped.get(key) || 0) + Number(gd.so_tien));
        }

        const duLieu = Array.from(grouped.entries()).map(([nhan, so_tien]) => ({ nhan, so_tien }));
        const tong = gdList.reduce((s, gd) => s + Number(gd.so_tien), 0);

        return { du_lieu: duLieu, tong, khoang, nhom: groupBy };
    }

    private _getGroupKey(date: Date, groupBy: 'day' | 'week' | 'month'): string {
        if (groupBy === 'day') {
            return `${date.getDate()}/${date.getMonth() + 1}`;
        } else if (groupBy === 'week') {
            // Lấy thứ 2 của tuần
            const d = new Date(date);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            d.setDate(diff);
            return `${d.getDate()}/${d.getMonth() + 1}`;
        } else {
            return `T${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
        }
    }

    // ========================================================================
    // R10 — Người mua traffic
    // ========================================================================
    async thongKeR10(maNguoiDung: bigint) {
        // 1. Chiến dịch
        const danhSachCD = await this.prisma.chien_dich.findMany({
            where: { ma_nguoi_mua: maNguoiDung },
            include: { goi: true },
            orderBy: { thoi_diem_tao: 'desc' },
        });

        const tongChienDich = danhSachCD.length;
        const dangChay = danhSachCD.filter((cd) => cd.trang_thai === 'hoat_dong').length;
        const tongLuotMua = danhSachCD.reduce((s, cd) => s + cd.so_luot_mua, 0);
        const tongLuotDaChay = danhSachCD.reduce((s, cd) => s + cd.so_luot_da_chay, 0);
        const tongNganSach = danhSachCD.reduce((s, cd) => s + Number(cd.ngan_sach_tong), 0);
        const tongDaDung = danhSachCD.reduce((s, cd) => s + Number(cd.ngan_sach_da_dung), 0);

        // 2. Ví
        const vi = await this.prisma.vi_nguoi_dung.findFirst({
            where: { ma_nguoi_dung: maNguoiDung, trang_thai: 'hoat_dong' },
        });
        const soDuKhaDung = vi ? Number(vi.so_du_kha_dung) : 0;
        const soDuKhoaTam = vi ? Number(vi.so_du_khoa_tam) : 0;

        // 3. Bảng chiến dịch
        const bangChienDich = danhSachCD.map((cd) => ({
            ma_cong_khai: cd.ma_cong_khai,
            ten_chien_dich: cd.ten_chien_dich,
            trang_thai: cd.trang_thai,
            so_luot_mua: cd.so_luot_mua,
            so_luot_da_chay: cd.so_luot_da_chay,
            ngan_sach_tong: Number(cd.ngan_sach_tong),
            ngan_sach_da_dung: Number(cd.ngan_sach_da_dung),
            ten_goi: cd.goi.ten_goi,
        }));

        return {
            tong_chien_dich: tongChienDich,
            dang_chay: dangChay,
            tong_luot_mua: tongLuotMua,
            tong_luot_da_chay: tongLuotDaChay,
            tong_ngan_sach: tongNganSach,
            tong_da_dung: tongDaDung,
            so_du_kha_dung: soDuKhaDung,
            so_du_khoa_tam: soDuKhoaTam,
            bang_chien_dich: bangChienDich,
        };
    }

    // ========================================================================
    // R30 — Admin
    // ========================================================================
    async thongKeR30() {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek = new Date(startOfDay);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Monday
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // 1. Người dùng
        const tongNguoiDung = await this.prisma.nguoi_dung.count();
        const soR10 = await this.prisma.nguoi_dung.count({ where: { loai_tai_khoan_mac_dinh: 'R10' } });
        const soR20 = await this.prisma.nguoi_dung.count({ where: { loai_tai_khoan_mac_dinh: 'R20' } });

        // 2. Links & Campaigns
        const tongLink = await this.prisma.lien_ket_rut_gon.count();
        const tongChienDich = await this.prisma.chien_dich.count();
        const chienDichDangChay = await this.prisma.chien_dich.count({ where: { trang_thai: 'hoat_dong' } });

        // 3. Clicks
        const clickHomNay = await this.prisma.su_kien_luot.count({
            where: { thoi_diem_nhan: { gte: startOfDay } },
        });
        const clickTuanNay = await this.prisma.su_kien_luot.count({
            where: { thoi_diem_nhan: { gte: startOfWeek } },
        });
        const clickThangNay = await this.prisma.su_kien_luot.count({
            where: { thoi_diem_nhan: { gte: startOfMonth } },
        });
        const tongClickHopLe = await this.prisma.su_kien_luot.count({
            where: { trang_thai: 'hop_le_da_chot' },
        });

        // 4. Tài chính tổng hệ thống
        const tongViAgg = await this.prisma.vi_nguoi_dung.aggregate({
            _sum: {
                so_du_kha_dung: true,
                so_du_khoa_tam: true,
            },
        });
        const tongTienHeThong = (tongViAgg._sum.so_du_kha_dung ? Number(tongViAgg._sum.so_du_kha_dung) : 0)
            + (tongViAgg._sum.so_du_khoa_tam ? Number(tongViAgg._sum.so_du_khoa_tam) : 0);

        // 5. Doanh thu sàn (chênh lệch mua - bán)
        const doanhThuMua = await this.prisma.so_cai_giao_dich.aggregate({
            where: { loai_giao_dich: 'chi_phi_chien_dich', trang_thai: 'hoan_thanh' },
            _sum: { so_tien: true },
        });
        const doanhThuBan = await this.prisma.so_cai_giao_dich.aggregate({
            where: { loai_giao_dich: 'doanh_thu_traffic', trang_thai: 'hoan_thanh' },
            _sum: { so_tien: true },
        });
        const doanhThuSan = (doanhThuMua._sum.so_tien ? Number(doanhThuMua._sum.so_tien) : 0)
            - (doanhThuBan._sum.so_tien ? Number(doanhThuBan._sum.so_tien) : 0);

        return {
            tong_nguoi_dung: tongNguoiDung,
            so_r10: soR10,
            so_r20: soR20,
            tong_link: tongLink,
            tong_chien_dich: tongChienDich,
            chien_dich_dang_chay: chienDichDangChay,
            click_hom_nay: clickHomNay,
            click_tuan_nay: clickTuanNay,
            click_thang_nay: clickThangNay,
            tong_click_hop_le: tongClickHopLe,
            tong_tien_he_thong: tongTienHeThong,
            doanh_thu_san: doanhThuSan,
        };
    }

    // ========================================================================
    // HELPERS
    // ========================================================================
    private async _bieuDo7NgayClick(linkIds: bigint[]) {
        const result: { ngay: string; click: number; hop_le: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

            const click = linkIds.length > 0
                ? await this.prisma.su_kien_luot.count({
                    where: {
                        ma_lien_ket_rut_gon: { in: linkIds },
                        thoi_diem_nhan: { gte: start, lt: end },
                    },
                })
                : 0;

            const hopLe = linkIds.length > 0
                ? await this.prisma.su_kien_luot.count({
                    where: {
                        ma_lien_ket_rut_gon: { in: linkIds },
                        trang_thai: 'hop_le_da_chot',
                        thoi_diem_nhan: { gte: start, lt: end },
                    },
                })
                : 0;

            result.push({
                ngay: `${d.getDate()}/${d.getMonth() + 1}`,
                click,
                hop_le: hopLe,
            });
        }
        return result;
    }
}
