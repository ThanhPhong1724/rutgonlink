import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial roles...');

    const rolesToSeed = [
        { ma_vai_tro: 'R10', ten_vai_tro: 'Người Nhấp Link', mo_ta: 'Tài khoản người tương tác, truy cập hoặc mua hàng từ liên kết rút gọn', la_vai_tro_he_thong: true },
        { ma_vai_tro: 'R20', ten_vai_tro: 'Nhà Xuất Bản', mo_ta: 'Nhà xuất bản tạo ra liên kết và nhận tiền từ lượt khách hàng mua', la_vai_tro_he_thong: true },
        { ma_vai_tro: 'R30', ten_vai_tro: 'Quản Trị Viên', mo_ta: 'Quản trị viên vận hành hệ thống', la_vai_tro_he_thong: true },
        { ma_vai_tro: 'R40', ten_vai_tro: 'Quản Trị Cấp Cao', mo_ta: 'Super Admin, thấy được toàn bộ dữ liệu, thiết lập hệ thống', la_vai_tro_he_thong: true },
    ];

    const rolesMap = new Map();
    for (const role of rolesToSeed) {
        const createdRole = await prisma.vai_tro.upsert({
            where: { ma_vai_tro: role.ma_vai_tro },
            update: {},
            create: role,
        });
        rolesMap.set(role.ma_vai_tro, createdRole.ma);
    }

    console.log('Seeding admin user...');
    const adminEmail = 'admin@rutgonlink.local';

    const adminUser = await prisma.nguoi_dung.upsert({
        where: { thu_dien_tu: adminEmail },
        update: {},
        create: {
            ma_cong_khai: 'admin_sys_001',
            loai_tai_khoan_mac_dinh: 'R40',
            thu_dien_tu: adminEmail,
            thu_dien_tu_da_xac_minh: true,
            mat_khau_bam: 'hashed_password_for_admin_123!@#', // In real system, this should be actually hashed
            ten_hien_thi: 'System Administrator',
            ngon_ngu_mac_dinh: 'vi',
            mui_gio_mac_dinh: 'Asia/Ho_Chi_Minh',
            trang_thai: 'hoat_dong',
        },
    });

    // Gán vai trò R40 cho admin
    const adminRoleId = rolesMap.get('R40');
    if (adminRoleId) {
        await prisma.gan_vai_tro_nguoi_dung.upsert({
            where: {
                ma_nguoi_dung_ma_vai_tro_thoi_diem_hieu_luc_tu: {
                    ma_nguoi_dung: adminUser.ma,
                    ma_vai_tro: adminRoleId,
                    thoi_diem_hieu_luc_tu: new Date('2025-01-01T00:00:00.000Z'),
                },
            },
            update: {},
            create: {
                ma_nguoi_dung: adminUser.ma,
                ma_vai_tro: adminRoleId,
                trang_thai: 'hoat_dong',
                thoi_diem_hieu_luc_tu: new Date('2025-01-01T00:00:00.000Z'),
                ma_nguoi_dung_tao: adminUser.ma, // Admin tự gán vai trò của chính mình cho việc seed này
            },
        });
    }

    console.log('Seeding successfully completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
