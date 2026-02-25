import { Controller, Post, Get, Patch, Body, Query, Param, UseGuards, Req } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/v1/short-link')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('R20') // Chỉ nhà xuất bản mới được thao tác quản lý link
export class ShortLinkController {
    constructor(private readonly shortLinkService: ShortLinkService) { }

    @Post('tao-moi')
    async taoLienKet(
        @Req() req: any,
        @Body() body: { lien_ket_goc: string; bi_danh?: string; lien_ket_du_phong?: string }
    ) {
        return this.shortLinkService.taoLienKet(req.user.ma, body);
    }

    @Get('danh-sach')
    async danhSach(
        @Req() req: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string
    ) {
        return this.shortLinkService.danhSachLienKet(
            req.user.ma,
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20
        );
    }

    @Patch(':maNgan')
    async capNhat(
        @Req() req: any,
        @Param('maNgan') maNgan: string,
        @Body() body: { trang_thai?: string; lien_ket_goc?: string; lien_ket_du_phong?: string }
    ) {
        return this.shortLinkService.capNhatLienKet(req.user.ma, maNgan, body);
    }
}
