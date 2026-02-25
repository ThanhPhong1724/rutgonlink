import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/nguoi-dung')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('ho-so')
    async layHoSo(@Req() req: any) {
        return this.usersService.layHoSo(req.user.ma);
    }

    @Patch('ho-so')
    async capNhatHoSo(
        @Req() req: any,
        @Body() body: { ten_hien_thi?: string; so_dien_thoai?: string; ngon_ngu_mac_dinh?: string; cau_hinh_rut_tien?: any },
    ) {
        return this.usersService.capNhatHoSo(req.user.ma, body);
    }

    @Patch('doi-mat-khau')
    async doiMatKhau(
        @Req() req: any,
        @Body() body: { mat_khau_cu: string; mat_khau_moi: string },
    ) {
        return this.usersService.doiMatKhau(req.user.ma, body.mat_khau_cu, body.mat_khau_moi);
    }
}
