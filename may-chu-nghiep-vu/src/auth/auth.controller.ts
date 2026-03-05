import { Controller, Post, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DangKyDto } from './dto/dang-ky.dto';
import { DangNhapDto } from './dto/dang-nhap.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('dang-ky')
    async dangKy(@Body() dto: DangKyDto, @Req() req: any) {
        const ip = req.ip;
        const userAgent = req.headers?.['user-agent'];
        return this.authService.dangKy(dto, ip, userAgent);
    }

    @Post('dang-nhap')
    @HttpCode(HttpStatus.OK)
    async dangNhap(@Body() dto: DangNhapDto, @Req() req: any) {
        const ip = req.ip;
        const userAgent = req.headers?.['user-agent'];
        return this.authService.dangNhap(dto, ip, userAgent);
    }

    @Post('google')
    @HttpCode(HttpStatus.OK)
    async dangNhapGoogle(@Body() body: { id_token: string; loai_tai_khoan?: string }, @Req() req: any) {
        const ip = req.ip;
        const userAgent = req.headers?.['user-agent'];
        return this.authService.dangNhapGoogle(body.id_token, body.loai_tai_khoan, ip, userAgent);
    }

    @Post('dang-xuat')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async dangXuat(@Req() req: any) {
        return this.authService.dangXuat(req.user.ma);
    }
}
