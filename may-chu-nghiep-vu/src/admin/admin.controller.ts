import { Controller, Get, Post, Patch, Delete, Body, Query, Param, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/v1/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('R30')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    // ========== QUẢN LÝ TÀI KHOẢN ==========

    @Get('nguoi-dung')
    async danhSachNguoiDung(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') search?: string,
    ) {
        return this.adminService.danhSachNguoiDung(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
            search,
        );
    }

    @Patch('nguoi-dung/:maCongKhai/khoa')
    async khoaTaiKhoan(@Param('maCongKhai') maCongKhai: string) {
        return this.adminService.khoaMoKhoaTaiKhoan(maCongKhai, 'bi_khoa');
    }

    @Patch('nguoi-dung/:maCongKhai/mo-khoa')
    async moKhoaTaiKhoan(@Param('maCongKhai') maCongKhai: string) {
        return this.adminService.khoaMoKhoaTaiKhoan(maCongKhai, 'hoat_dong');
    }

    @Patch('nguoi-dung/:maCongKhai/vai-tro')
    async thayDoiVaiTro(
        @Param('maCongKhai') maCongKhai: string,
        @Body() body: { vai_tro: string },
        @Req() req: any,
    ) {
        return this.adminService.thayDoiVaiTro(maCongKhai, body.vai_tro, BigInt(req.user.ma));
    }

    @Delete('nguoi-dung/:maCongKhai')
    async xoaTaiKhoan(@Param('maCongKhai') maCongKhai: string) {
        return this.adminService.xoaMemTaiKhoan(maCongKhai);
    }

    @Patch('nguoi-dung/:maCongKhai/dieu-chinh-so-du')
    async dieuChinhSoDu(
        @Param('maCongKhai') maCongKhai: string,
        @Body() body: { so_tien: number; ghi_chu: string },
        @Req() req: any,
    ) {
        return this.adminService.dieuChinhSoDu(maCongKhai, body.so_tien, body.ghi_chu, BigInt(req.user.ma));
    }

    // ========== CẤU HÌNH ĐƠN GIÁ ==========

    @Get('goi-thoi-gian')
    async danhSachGoi() {
        return this.adminService.danhSachGoiThiGian();
    }

    @Patch('goi-thoi-gian/:maCongKhai')
    async capNhatDonGia(
        @Param('maCongKhai') maCongKhai: string,
        @Body() body: { don_gia_mua?: number; don_gia_ban?: number },
    ) {
        return this.adminService.capNhatDonGia(maCongKhai, body.don_gia_mua, body.don_gia_ban);
    }



    // ========== CẤU HÌNH HỆ THỐNG (ADMIN) ==========

    @Get('cau-hinh')
    async danhSachCauHinh() {
        return this.adminService.danhSachCauHinh();
    }

    @Patch('cau-hinh')
    async capNhatCauHinh(
        @Body() body: { khoa: string; gia_tri: string; nhom?: string; mo_ta?: string },
    ) {
        return this.adminService.capNhatCauHinh(body.khoa, body.gia_tri, body.nhom || 'tai_chinh', body.mo_ta);
    }

    @Post('cau-hinh/seed')
    async seedCauHinh() {
        return this.adminService.seedCauHinhMacDinh();
    }

    // ========== QUẢN LÝ CHIẾN DỊCH VÀ LIÊN KẾT ==========

    @Get('chien-dich')
    async danhSachChienDich(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') search?: string,
        @Query('trang_thai') trangThai?: string,
    ) {
        return this.adminService.danhSachChienDich(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
            search,
            trangThai,
        );
    }

    @Get('chien-dich/:maCongKhai')
    async chiTietChienDich(@Param('maCongKhai') maCongKhai: string) {
        return this.adminService.chiTietChienDich(maCongKhai);
    }

    @Patch('chien-dich/:maCongKhai/trang-thai')
    async thayDoiTrangThaiChienDich(
        @Param('maCongKhai') maCongKhai: string,
        @Body() body: { trang_thai: string },
    ) {
        return this.adminService.thayDoiTrangThaiChienDich(maCongKhai, body.trang_thai);
    }

    @Get('lien-ket')
    async danhSachLienKet(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') search?: string,
        @Query('trang_thai') trangThai?: string,
    ) {
        return this.adminService.danhSachLienKet(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
            search,
            trangThai,
        );
    }

    @Patch('lien-ket/:maCongKhai/trang-thai')
    async thayDoiTrangThaiLienKet(
        @Param('maCongKhai') maCongKhai: string,
        @Body() body: { trang_thai: string },
    ) {
        return this.adminService.thayDoiTrangThaiLienKet(maCongKhai, body.trang_thai);
    }
}
