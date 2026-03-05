import { Controller, Post, Get, Patch, Body, Query, Param, UseGuards, Req } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/v1/rut-tien')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WithdrawalController {
    constructor(private withdrawalService: WithdrawalService) { }

    /** R20: Tạo yêu cầu rút tiền */
    @Post('tao-yeu-cau')
    @Roles('R20')
    async taoYeuCau(
        @Req() req: any,
        @Body() body: { so_tien: number; phuong_thuc: string; thong_tin_nhan_tien: any; ghi_chu?: string },
    ) {
        return this.withdrawalService.taoYeuCauRut(req.user.ma, body);
    }

    /** R20: Xem danh sách yêu cầu rút */
    @Get('danh-sach')
    @Roles('R20')
    async danhSach(
        @Req() req: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.withdrawalService.danhSachYeuCau(
            req.user.ma,
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
        );
    }

    /** R30: Danh sách yêu cầu rút chờ duyệt */
    @Get('cho-duyet')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async danhSachChoDuyet(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.withdrawalService.danhSachChoDuyet(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
        );
    }

    /** R30: Lịch sử yêu cầu rút đã xử lý */
    @Get('lich-su')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async lichSuDaXuLy(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.withdrawalService.lichSuDaXuLy(
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
        );
    }

    /** R30: Duyệt yêu cầu rút */
    @Patch(':ma/duyet')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async duyetYeuCau(@Req() req: any, @Param('ma') ma: string) {
        return this.withdrawalService.duyetYeuCau(req.user.ma, ma);
    }

    /** R30: Từ chối + hoàn số dư */
    @Patch(':ma/tu-choi')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async tuChoi(
        @Req() req: any,
        @Param('ma') ma: string,
        @Body() body: { ly_do: string },
    ) {
        return this.withdrawalService.tuChoiRutTien(req.user.ma, ma, body.ly_do);
    }

    /** R30: Cập nhật đã gửi */
    @Patch(':ma/da-gui')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async capNhatDaGui(
        @Req() req: any,
        @Param('ma') ma: string,
        @Body() body: { so_tien_thuc_chi: number; ma_tham_chieu?: string; ghi_chu?: string },
    ) {
        return this.withdrawalService.capNhatDaGui(req.user.ma, ma, body);
    }

    /** R30: Xác nhận hoàn thành */
    @Patch(':ma/hoan-thanh')
    @UseGuards(RolesGuard)
    @Roles('R30')
    async hoanThanh(
        @Req() req: any,
        @Param('ma') ma: string,
        @Body() body: { ghi_chu?: string },
    ) {
        return this.withdrawalService.xacNhanHoanThanh(req.user.ma, ma, body.ghi_chu);
    }
}
