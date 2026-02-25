import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Database Constraints Integration Test (NV-KT-DL-001)', () => {
    let mockUser: any;

    beforeAll(async () => {
        // NV-DL-TEST-001: Tạo dữ liệu kiểm thử giả lập
        mockUser = await prisma.nguoi_dung.create({
            data: {
                ma_cong_khai: `test_user_${Date.now()}`,
                loai_tai_khoan_mac_dinh: 'R10',
                thu_dien_tu: `test_${Date.now()}@example.com`,
                mat_khau_bam: 'hashed',
                ten_hien_thi: 'Test User',
                ngon_ngu_mac_dinh: 'vi',
                mui_gio_mac_dinh: 'Asia/Ho_Chi_Minh',
                trang_thai: 'hoat_dong',
            },
        });
    });

    afterAll(async () => {
        // Cleanup mock data
        await prisma.vi_nguoi_dung.deleteMany({
            where: { ma_nguoi_dung: mockUser.ma },
        });
        await prisma.nguoi_dung.delete({
            where: { ma: mockUser.ma },
        });
        await prisma.$disconnect();
    });

    it('should prevent inserting a negative so_du_kha_dung (Constraint chk_so_du_kha_dung)', async () => {
        await expect(
            prisma.vi_nguoi_dung.create({
                data: {
                    ma_cong_khai: `test_vi_${Date.now()}`,
                    ma_nguoi_dung: mockUser.ma,
                    loai_vi: 'vi_chi_tieu',
                    don_vi_tien: 'VND',
                    so_du_kha_dung: -1000, // Negative amount - should throw!
                    so_du_khoa_tam: 0,
                    trang_thai: 'hoat_dong',
                    thoi_diem_cap_nhat_so_du: new Date(),
                },
            })
        ).rejects.toThrow();
    });

    it('should allow inserting a positive so_du_kha_dung', async () => {
        const vi = await prisma.vi_nguoi_dung.create({
            data: {
                ma_cong_khai: `test_vi_ok_${Date.now()}`,
                ma_nguoi_dung: mockUser.ma,
                loai_vi: 'vi_chi_tieu_ok',
                don_vi_tien: 'VND',
                so_du_kha_dung: 1000,
                so_du_khoa_tam: 0,
                trang_thai: 'hoat_dong',
                thoi_diem_cap_nhat_so_du: new Date(),
            },
        });

        expect(Number(vi.so_du_kha_dung)).toBe(1000);
    });
});
