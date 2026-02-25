import { Controller, Post, Get, Patch, Body, Query, Param, UseGuards, Req } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/v1/nap-tien')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DepositController {
    constructor(private depositService: DepositService) { }

    /** R10: Tạo hóa đơn nạp */
    @Post('tao-hoa-don')
    @Roles('R10')
    async taoHoaDon(
        @Req() req: any,
        @Body() body: { so_tien: number; phuong_thuc: string; ghi_chu?: string },
    ) {
        return this.depositService.taoHoaDon(req.user.ma, body);
    }

    /** R10: Danh sách hóa đơn nạp của tôi */
    @Get('danh-sach')
    @Roles('R10')
    async danhSach(
        @Req() req: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.depositService.danhSachHoaDon(
            req.user.ma,
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
        );
    }

    /** R10: Hủy hóa đơn */
    @Patch(':ma/huy')
    @Roles('R10')
    async huyHoaDon(@Req() req: any, @Param('ma') ma: string) {
        return this.depositService.huyHoaDon(req.user.ma, ma);
    }

    /** R10: Xác nhận đã thanh toán (chuyển sang chờ duyệt) */
    @Patch(':ma/xac-nhan-thanh-toan')
    @Roles('R10')
    async xacNhanThanhToan(@Req() req: any, @Param('ma') ma: string) {
        return this.depositService.chuyenChoiDuyet(req.user.ma, ma);
    }

    /** R30: Danh sách hóa đơn chờ duyệt */
    @Get('cho-duyet')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async danhSachChoDuyet(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.depositService.danhSachChoDuyet(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
        );
    }

    /** R30: Lịch sử đã duyệt/từ chối */
    @Get('lich-su-duyet')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async lichSuDuyet(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.depositService.lichSuDuyet(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 50,
        );
    }

    /** R30: Duyệt nạp tiền */
    @Patch(':ma/duyet')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async duyetNapTien(
        @Req() req: any,
        @Param('ma') ma: string,
        @Body() body: { ghi_chu?: string; ly_do_ngoai_le?: string },
    ) {
        return this.depositService.duyetNapTien(req.user.ma, ma, body.ghi_chu, body.ly_do_ngoai_le);
    }

    /** R30: Từ chối nạp tiền */
    @Patch(':ma/tu-choi')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async tuChoiNapTien(
        @Req() req: any,
        @Param('ma') ma: string,
        @Body() body: { ly_do: string },
    ) {
        return this.depositService.tuChoiNapTien(req.user.ma, ma, body.ly_do);
    }
}
