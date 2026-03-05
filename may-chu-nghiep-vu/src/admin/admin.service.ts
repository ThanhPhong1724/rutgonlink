import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    // ========================================================================
    // 1. QUẢN LÝ TÀI KHOẢN
    // ========================================================================

    /** Danh sách người dùng (admin) */
    async danhSachNguoiDung(page = 1, limit = 20, search?: string) {
        const skip = (page - 1) * limit;
        const where: any = {};
        if (search) {
            where.OR = [
                { thu_dien_tu: { contains: search, mode: 'insensitive' } },
                { ten_hien_thi: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [danh_sach, tong] = await Promise.all([
            this.prisma.nguoi_dung.findMany({
                where,
                skip,
                take: limit,
                orderBy: { thoi_diem_tao: 'desc' },
                select: {
                    ma: true,
                    ma_cong_khai: true,
                    thu_dien_tu: true,
                    ten_hien_thi: true,
                    loai_tai_khoan_mac_dinh: true,
                    trang_thai: true,
                    thoi_diem_tao: true,
                    thoi_diem_dang_nhap_cuoi: true,
                    vai_tro_duoc_gan: {
                        include: { vai_tro: { select: { ma_vai_tro: true, ten_vai_tro: true } } },
                        where: { trang_thai: 'hoat_dong' },
                    },
                    vi_nguoi_dung: {
                        select: { so_du_kha_dung: true, so_du_khoa_tam: true },
                        where: { trang_thai: 'hoat_dong' },
                        take: 1,
                    },
                },
            }),
            this.prisma.nguoi_dung.count({ where }),
        ]);

        return {
            danh_sach: danh_sach.map(u => ({
                ma_cong_khai: u.ma_cong_khai,
                thu_dien_tu: u.thu_dien_tu,
                ten_hien_thi: u.ten_hien_thi,
                loai_tai_khoan: u.loai_tai_khoan_mac_dinh,
                trang_thai: u.trang_thai,
                vai_tro: u.vai_tro_duoc_gan.map(v => v.vai_tro.ma_vai_tro),
                so_du: u.vi_nguoi_dung[0] ? Number(u.vi_nguoi_dung[0].so_du_kha_dung) : 0,
                thoi_diem_tao: u.thoi_diem_tao,
                thoi_diem_dang_nhap_cuoi: u.thoi_diem_dang_nhap_cuoi,
            })),
            tong,
            trang: page,
            tong_trang: Math.ceil(tong / limit),
        };
    }

    /** Khóa / Mở khóa tài khoản */
    async khoaMoKhoaTaiKhoan(maCongKhai: string, trangThai: 'hoat_dong' | 'bi_khoa') {
        const user = await this.prisma.nguoi_dung.findUnique({ where: { ma_cong_khai: maCongKhai } });
        if (!user) throw new NotFoundException('Tài khoản không tồn tại');

        await this.prisma.nguoi_dung.update({
            where: { ma_cong_khai: maCongKhai },
            data: { trang_thai: trangThai },
        });

        return { thanh_cong: true, trang_thai: trangThai };
    }

    /** Thay đổi vai trò */
    async thayDoiVaiTro(maCongKhai: string, vaiTroMoi: string, adminMa: bigint) {
        const user = await this.prisma.nguoi_dung.findUnique({
            where: { ma_cong_khai: maCongKhai },
            include: { vai_tro_duoc_gan: { where: { trang_thai: 'hoat_dong' } } },
        });
        if (!user) throw new NotFoundException('Tài khoản không tồn tại');

        const vaiTro = await this.prisma.vai_tro.findUnique({ where: { ma_vai_tro: vaiTroMoi } });
        if (!vaiTro) throw new BadRequestException(`Vai trò '${vaiTroMoi}' không tồn tại`);

        // Hủy vai trò cũ
        for (const gvt of user.vai_tro_duoc_gan) {
            await this.prisma.gan_vai_tro_nguoi_dung.update({
                where: { ma: gvt.ma },
                data: { trang_thai: 'da_huy', thoi_diem_hieu_luc_den: new Date() },
            });
        }

        // Gán vai trò mới
        await this.prisma.gan_vai_tro_nguoi_dung.create({
            data: {
                ma_nguoi_dung: user.ma,
                ma_vai_tro: vaiTro.ma,
                trang_thai: 'hoat_dong',
                thoi_diem_hieu_luc_tu: new Date(),
                ma_nguoi_dung_tao: adminMa,
            },
        });

        // Cập nhật loại tài khoản mặc định
        await this.prisma.nguoi_dung.update({
            where: { ma: user.ma },
            data: { loai_tai_khoan_mac_dinh: vaiTroMoi },
        });

        return { thanh_cong: true, vai_tro_moi: vaiTroMoi };
    }

    /** Xóa mềm tài khoản */
    async xoaMemTaiKhoan(maCongKhai: string) {
        const user = await this.prisma.nguoi_dung.findUnique({ where: { ma_cong_khai: maCongKhai } });
        if (!user) throw new NotFoundException('Tài khoản không tồn tại');

        await this.prisma.nguoi_dung.update({
            where: { ma_cong_khai: maCongKhai },
            data: { trang_thai: 'da_xoa', thoi_diem_xoa_mem: new Date() },
        });

        return { thanh_cong: true };
    }

    // ========================================================================
    // 2. CẤU HÌNH ĐƠN GIÁ GÓI THỜI GIAN
    // ========================================================================

    /** Danh sách gói + cập nhật đơn giá */
    async danhSachGoiThiGian() {
        return this.prisma.goi_thoi_gian.findMany({
            orderBy: { thu_tu: 'asc' },
        });
    }

    async capNhatDonGia(maCongKhai: string, donGiaMua?: number, donGiaBan?: number) {
        const goi = await this.prisma.goi_thoi_gian.findUnique({ where: { ma_cong_khai: maCongKhai } });
        if (!goi) throw new NotFoundException('Gói không tồn tại');

        const data: any = {};
        if (donGiaMua !== undefined) data.don_gia_mua = donGiaMua;
        if (donGiaBan !== undefined) data.don_gia_ban = donGiaBan;

        if (Object.keys(data).length === 0) {
            throw new BadRequestException('Cần ít nhất 1 trường đơn giá để cập nhật');
        }

        const updated = await this.prisma.goi_thoi_gian.update({
            where: { ma_cong_khai: maCongKhai },
            data,
        });

        return {
            thanh_cong: true,
            goi: {
                ma_cong_khai: updated.ma_cong_khai,
                ten_goi: updated.ten_goi,
                don_gia_mua: Number(updated.don_gia_mua),
                don_gia_ban: Number(updated.don_gia_ban),
            },
        };
    }

    // ========================================================================
    // 3. CẤU HÌNH HỆ THỐNG (tỷ giá, v.v.)
    // ========================================================================

    /** Lấy tất cả cấu hình */
    async danhSachCauHinh() {
        const configs = await this.prisma.cau_hinh_he_thong.findMany({ orderBy: { nhom: 'asc' } });
        return configs.map(c => ({
            khoa: c.khoa,
            gia_tri: c.gia_tri,
            nhom: c.nhom,
            mo_ta: c.mo_ta,
            thoi_diem_cap_nhat: c.thoi_diem_cap_nhat,
        }));
    }

    /** Lấy 1 cấu hình theo khóa */
    async layCauHinh(khoa: string) {
        const c = await this.prisma.cau_hinh_he_thong.findUnique({ where: { khoa } });
        return c ? c.gia_tri : null;
    }

    /** Cập nhật / tạo mới cấu hình */
    async capNhatCauHinh(khoa: string, giaTri: string, nhom: string, moTa?: string) {
        const result = await this.prisma.cau_hinh_he_thong.upsert({
            where: { khoa },
            update: { gia_tri: giaTri, nhom, mo_ta: moTa || undefined },
            create: { khoa, gia_tri: giaTri, nhom, mo_ta: moTa || '' },
        });

        return { thanh_cong: true, khoa: result.khoa, gia_tri: result.gia_tri };
    }

    /** Seed cấu hình mặc định nếu chưa có */
    async seedCauHinhMacDinh() {
        const defaults = [
            { khoa: 'ty_gia_vnd_usdt', gia_tri: '25000', nhom: 'tai_chinh', mo_ta: 'Tỷ giá VND/USDT (1 USDT = ? VND)' },
            { khoa: 'rut_tien_toi_thieu_vnd', gia_tri: '50000', nhom: 'tai_chinh', mo_ta: 'Số tiền rút tối thiểu (VND)' },
            { khoa: 'rut_tien_toi_thieu_usdt', gia_tri: '2', nhom: 'tai_chinh', mo_ta: 'Số tiền rút tối thiểu (USDT)' },
            { khoa: 'phi_rut_tien_phan_tram', gia_tri: '0', nhom: 'tai_chinh', mo_ta: 'Phí rút tiền (% trên số tiền rút)' },
            { khoa: 'nap_tien_toi_thieu_vnd', gia_tri: '100000', nhom: 'tai_chinh', mo_ta: 'Số tiền nạp tối thiểu (VND)' },
            { khoa: 'thanh_toan_ngan_hang_ten', gia_tri: 'MB Bank', nhom: 'thanh_toan', mo_ta: 'Tên Ngân Hàng' },
            { khoa: 'thanh_toan_ngan_hang_stk', gia_tri: '0123456789', nhom: 'thanh_toan', mo_ta: 'Số tài khoản Ngân Hàng' },
            { khoa: 'thanh_toan_ngan_hang_chu_tk', gia_tri: 'NGUYEN VAN A', nhom: 'thanh_toan', mo_ta: 'Tên chủ TK Ngân Hàng' },
            { khoa: 'thanh_toan_ngan_hang_qr', gia_tri: '', nhom: 'thanh_toan', mo_ta: 'Link ảnh QR Ngân Hàng' },
            { khoa: 'thanh_toan_usdt_vi', gia_tri: 'TXYZ...1234', nhom: 'thanh_toan', mo_ta: 'Địa chỉ ví USDT' },
            { khoa: 'thanh_toan_usdt_mang', gia_tri: 'TRC20', nhom: 'thanh_toan', mo_ta: 'Mạng lưới USDT (VD: TRC20)' },
            { khoa: 'thanh_toan_usdt_qr', gia_tri: '', nhom: 'thanh_toan', mo_ta: 'Link ảnh QR USDT' },
            { khoa: 'thanh_toan_paypal_email', gia_tri: 'admin@paypal.com', nhom: 'thanh_toan', mo_ta: 'Email nhận tiền PayPal' },
            { khoa: 'thanh_toan_paypal_ten', gia_tri: 'NGUYEN VAN A', nhom: 'thanh_toan', mo_ta: 'Tên tài khoản PayPal' },
            { khoa: 'thanh_toan_paypal_qr', gia_tri: '', nhom: 'thanh_toan', mo_ta: 'Link ảnh QR PayPal' },
            { khoa: 'thanh_toan_noi_dung', gia_tri: 'NAP {ID}', nhom: 'thanh_toan', mo_ta: 'Cú pháp nạp tiền (Mặc định: NAP {ID})' },
            { khoa: 'link_ho_tro_telegram', gia_tri: 'https://t.me/admin', nhom: 'he_thong', mo_ta: 'Trang liên hệ hỗ trợ (VD: Telegram)' },
        ];

        let created = 0;
        for (const d of defaults) {
            const exists = await this.prisma.cau_hinh_he_thong.findUnique({ where: { khoa: d.khoa } });
            if (!exists) {
                await this.prisma.cau_hinh_he_thong.create({ data: d });
                created++;
            }
        }

        return { thanh_cong: true, so_cau_hinh_tao_moi: created };
    }

    // ========================================================================
    // 4. QUẢN LÝ CHIẾN DỊCH VÀ LINK RÚT GỌN
    // ========================================================================

    /** Danh sách chiến dịch */
    async danhSachChienDich(page = 1, limit = 20, search?: string, trangThai?: string) {
        const skip = (page - 1) * limit;
        const where: any = {};
        if (search) {
            where.OR = [
                { ten_chien_dich: { contains: search, mode: 'insensitive' } },
                { lien_ket_trang_dich: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (trangThai) {
            where.trang_thai = trangThai;
        }

        const [danh_sach, tong] = await Promise.all([
            this.prisma.chien_dich.findMany({
                where,
                skip,
                take: limit,
                orderBy: { thoi_diem_tao: 'desc' },
                include: {
                    nguoi_mua: { select: { ten_hien_thi: true, thu_dien_tu: true } },
                    goi: { select: { ten_goi: true } }
                }
            }),
            this.prisma.chien_dich.count({ where }),
        ]);

        return {
            danh_sach: danh_sach.map(c => ({
                ma_cong_khai: c.ma_cong_khai,
                ten_chien_dich: c.ten_chien_dich,
                nguoi_mua: c.nguoi_mua.ten_hien_thi,
                thu_dien_tu: c.nguoi_mua.thu_dien_tu,
                ten_goi: c.goi.ten_goi,
                so_luot_mua: c.so_luot_mua,
                so_luot_da_chay: c.so_luot_da_chay,
                ngan_sach_tong: Number(c.ngan_sach_tong),
                trang_thai: c.trang_thai,
                thoi_diem_tao: c.thoi_diem_tao,
            })),
            tong,
            trang: page,
            tong_trang: Math.ceil(tong / limit),
        };
    }

    /** Chi tiết chiến dịch (Dành cho Admin) */
    async chiTietChienDich(maCongKhai: string) {
        const chienDich = await this.prisma.chien_dich.findUnique({
            where: { ma_cong_khai: maCongKhai },
            include: {
                nguoi_mua: true,
                goi: true,
            }
        });

        if (!chienDich) throw new NotFoundException('Chiến dịch không tồn tại');

        return {
            ma_cong_khai: chienDich.ma_cong_khai,
            ten_chien_dich: chienDich.ten_chien_dich,
            lien_ket_trang_dich: chienDich.lien_ket_trang_dich,
            tu_khoa: chienDich.tu_khoa,
            so_luot_mua: chienDich.so_luot_mua,
            so_luot_da_chay: chienDich.so_luot_da_chay,
            ngan_sach_tong: Number(chienDich.ngan_sach_tong),
            anh_minh_hoa_url: chienDich.anh_minh_hoa_url,
            anh_minh_hoa_file: chienDich.anh_minh_hoa_file,
            trang_thai: chienDich.trang_thai,
            thoi_diem_tao: chienDich.thoi_diem_tao,
            nguoi_mua: {
                ten_hien_thi: chienDich.nguoi_mua.ten_hien_thi,
                thu_dien_tu: chienDich.nguoi_mua.thu_dien_tu,
            },
            goi: {
                ten_goi: chienDich.goi.ten_goi,
                thoi_gian_cho: chienDich.goi.thoi_gian_giay,
                don_gia_ban: Number(chienDich.goi.don_gia_ban)
            }
        };
    }

    /** Thay đổi trạng thái chiến dịch */
    async thayDoiTrangThaiChienDich(maCongKhai: string, trangThai: string) {
        const chienDich = await this.prisma.chien_dich.findUnique({ where: { ma_cong_khai: maCongKhai } });
        if (!chienDich) throw new NotFoundException('Chiến dịch không tồn tại');

        await this.prisma.chien_dich.update({
            where: { ma_cong_khai: maCongKhai },
            data: { trang_thai: trangThai }
        });

        return { thanh_cong: true, trang_thai: trangThai };
    }

    /** Danh sách liên kết rút gọn */
    async danhSachLienKet(page = 1, limit = 20, search?: string, trangThai?: string) {
        const skip = (page - 1) * limit;
        const where: any = {};
        if (search) {
            where.OR = [
                { ma_ngan: { contains: search, mode: 'insensitive' } },
                { bi_danh: { contains: search, mode: 'insensitive' } },
                { lien_ket_goc: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (trangThai) {
            where.trang_thai = trangThai;
        }

        const [danh_sach, tong] = await Promise.all([
            this.prisma.lien_ket_rut_gon.findMany({
                where,
                skip,
                take: limit,
                orderBy: { thoi_diem_tao: 'desc' },
                include: {
                    nguoi_dung: { select: { ten_hien_thi: true, thu_dien_tu: true } },
                }
            }),
            this.prisma.lien_ket_rut_gon.count({ where }),
        ]);

        return {
            danh_sach: danh_sach.map(l => ({
                ma_cong_khai: l.ma_cong_khai,
                ma_ngan: l.ma_ngan,
                bi_danh: l.bi_danh,
                lien_ket_goc: l.lien_ket_goc,
                nguoi_tao: l.nguoi_dung.ten_hien_thi,
                thu_dien_tu: l.nguoi_dung.thu_dien_tu,
                trang_thai: l.trang_thai,
                thoi_diem_tao: l.thoi_diem_tao,
            })),
            tong,
            trang: page,
            tong_trang: Math.ceil(tong / limit),
        };
    }

    /** Thay đổi trạng thái liên kết */
    async thayDoiTrangThaiLienKet(maCongKhai: string, trangThai: string) {
        const lienKet = await this.prisma.lien_ket_rut_gon.findUnique({ where: { ma_cong_khai: maCongKhai } });
        if (!lienKet) throw new NotFoundException('Liên kết không tồn tại');

        await this.prisma.lien_ket_rut_gon.update({
            where: { ma_cong_khai: maCongKhai },
            data: { trang_thai: trangThai }
        });

        return { thanh_cong: true, trang_thai: trangThai };
    }

    /** Điều chỉnh số dư user (Admin) */
    async dieuChinhSoDu(maCongKhaiUser: string, soTien: number, ghiChu: string, maNguoiDuyet: bigint) {
        if (!soTien || soTien === 0) throw new BadRequestException('Số tiền phải khác 0');
        if (!ghiChu?.trim()) throw new BadRequestException('Vui lòng nhập ghi chú lý do');

        const nguoiDung = await this.prisma.nguoi_dung.findUnique({ where: { ma_cong_khai: maCongKhaiUser } });
        if (!nguoiDung) throw new NotFoundException('Không tìm thấy người dùng');

        return this.prisma.$transaction(async (tx) => {
            let vi = await tx.vi_nguoi_dung.findFirst({
                where: { ma_nguoi_dung: nguoiDung.ma, trang_thai: 'hoat_dong' },
            });
            if (!vi) {
                const { randomUUID } = await import('crypto');
                const loaiVi = nguoiDung.loai_tai_khoan_mac_dinh === 'R20' ? 'vi_doanh_thu' : 'vi_chi_tieu';
                vi = await tx.vi_nguoi_dung.create({
                    data: {
                        ma_cong_khai: randomUUID(),
                        ma_nguoi_dung: nguoiDung.ma,
                        loai_vi: loaiVi,
                        don_vi_tien: 'VND',
                        so_du_kha_dung: 0,
                        so_du_khoa_tam: 0,
                        trang_thai: 'hoat_dong',
                        thoi_diem_cap_nhat_so_du: new Date(),
                    },
                });
            }

            const soDuMoi = Number(vi.so_du_kha_dung) + soTien;
            if (soDuMoi < 0) throw new BadRequestException(`Số dư không đủ để trừ. Hiện tại: ${Number(vi.so_du_kha_dung)}`);

            const { randomUUID } = await import('crypto');
            await tx.so_cai_giao_dich.create({
                data: {
                    ma_cong_khai: randomUUID(),
                    ma_vi: vi.ma,
                    loai_giao_dich: 'dieu_chinh_admin',
                    huong_bien_dong: soTien > 0 ? 'tang' : 'giam',
                    loai_so_du_tac_dong: 'kha_dung',
                    so_tien: Math.abs(soTien),
                    don_vi_tien: 'VND',
                    so_du_kha_dung_truoc: vi.so_du_kha_dung,
                    so_du_kha_dung_sau: soDuMoi,
                    so_du_khoa_tam_truoc: vi.so_du_khoa_tam,
                    so_du_khoa_tam_sau: vi.so_du_khoa_tam,
                    nguon_phat_sinh: 'dieu_chinh_admin',
                    ma_tham_chieu_nguon: vi.ma,
                    ma_khoa_chong_trung: `ADJ_${vi.ma}_${Date.now()}`,
                    trang_thai: 'thanh_cong',
                    mo_ta_hien_thi: `Admin điều chỉnh: ${ghiChu}`,
                    thoi_diem_phat_sinh_nghiep_vu: new Date(),
                    nguon_tao: 'admin',
                    ma_nguoi_dung_tao: maNguoiDuyet,
                },
            });

            await tx.vi_nguoi_dung.update({
                where: { ma: vi.ma },
                data: {
                    so_du_kha_dung: soDuMoi,
                    thoi_diem_cap_nhat_so_du: new Date(),
                },
            });

            await tx.nhat_ky_quan_tri.create({
                data: {
                    ma_nguoi_thao_tac: maNguoiDuyet,
                    hanh_dong: 'dieu_chinh_so_du',
                    doi_tuong: 'vi_nguoi_dung',
                    ma_doi_tuong: vi.ma,
                    ghi_chu: `${soTien > 0 ? '+' : ''}${soTien} VND — ${ghiChu}`,
                },
            });

            return { thanh_cong: true, so_du_moi: soDuMoi };
        });
    }
}
