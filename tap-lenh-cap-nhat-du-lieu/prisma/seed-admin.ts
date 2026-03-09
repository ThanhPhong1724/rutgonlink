import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding admin account...');

    // Tạo admin R30
    const matKhauBam = await bcrypt.hash('Admin@123', 12);
    const admin = await prisma.nguoi_dung.upsert({
        where: { thu_dien_tu: 'admin@trafficseo.online' },
        update: {},
        create: {
            ma_cong_khai: randomUUID(),
            loai_tai_khoan_mac_dinh: 'R30',
            thu_dien_tu: 'admin@trafficseo.online',
            mat_khau_bam: matKhauBam,
            ten_hien_thi: 'Quản trị viên',
            ngon_ngu_mac_dinh: 'vi',
            mui_gio_mac_dinh: 'Asia/Ho_Chi_Minh',
            trang_thai: 'hoat_dong',
        },
    });

    // Đảm bảo vai trò R30 tồn tại
    const vaiTroR30 = await prisma.vai_tro.upsert({
        where: { ma_vai_tro: 'R30' },
        update: {},
        create: {
            ma_vai_tro: 'R30',
            ten_vai_tro: 'Quản trị viên',
            mo_ta: 'Quản trị viên hệ thống - duyệt nạp/rút tiền',
            la_vai_tro_he_thong: true,
            dang_hoat_dong: true,
        },
    });

    // Gán vai trò R30 cho admin
    await prisma.gan_vai_tro_nguoi_dung.upsert({
        where: {
            ma_nguoi_dung_ma_vai_tro_thoi_diem_hieu_luc_tu: {
                ma_nguoi_dung: admin.ma,
                ma_vai_tro: vaiTroR30.ma,
                thoi_diem_hieu_luc_tu: new Date('2024-01-01'),
            },
        },
        update: {},
        create: {
            ma_nguoi_dung: admin.ma,
            ma_vai_tro: vaiTroR30.ma,
            trang_thai: 'hoat_dong',
            thoi_diem_hieu_luc_tu: new Date('2024-01-01'),
            ma_nguoi_dung_tao: admin.ma,
        },
    });

    console.log('✅ Admin created:');
    console.log('   Email: admin@trafficseo.online');
    console.log('   Password: Admin@123');
    console.log('   Role: R30 (Quản trị viên)');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
