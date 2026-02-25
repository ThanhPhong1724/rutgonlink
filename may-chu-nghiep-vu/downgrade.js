const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const adminUser = await prisma.nguoi_dung.findUnique({ where: { thu_dien_tu: 'admin@rutgonlink.local' } });
    const r30Role = await prisma.vai_tro.findUnique({ where: { ma_vai_tro: 'R30' } });

    // Update default role
    await prisma.nguoi_dung.update({
        where: { ma: adminUser.ma },
        data: { loai_tai_khoan_mac_dinh: 'R30' }
    });

    // Delete existing R40 role assignment
    await prisma.gan_vai_tro_nguoi_dung.deleteMany({
        where: { ma_nguoi_dung: adminUser.ma }
    });

    // Add R30 role assignment
    await prisma.gan_vai_tro_nguoi_dung.create({
        data: {
            ma_nguoi_dung: adminUser.ma,
            ma_vai_tro: r30Role.ma,
            trang_thai: 'hoat_dong',
            thoi_diem_hieu_luc_tu: new Date(),
            ma_nguoi_dung_tao: adminUser.ma
        }
    });
    console.log('Successfully downgraded admin to R30');
}
main().catch(console.error).finally(() => prisma.$disconnect());
