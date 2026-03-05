import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('r20')
    async thongKeR20(@Req() req: any) {
        return this.dashboardService.thongKeR20(BigInt(req.user.ma));
    }

    @Get('r20/bieu-do')
    async bieuDoDoanhThu(@Req() req: any, @Query('khoang') khoang: string) {
        return this.dashboardService.bieuDoDoanhThu(BigInt(req.user.ma), khoang || '30_ngay');
    }

    @Get('r10')
    async thongKeR10(@Req() req: any) {
        return this.dashboardService.thongKeR10(BigInt(req.user.ma));
    }

    @Get('r30')
    async thongKeR30() {
        return this.dashboardService.thongKeR30();
    }
}
