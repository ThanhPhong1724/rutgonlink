import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/vi')
@UseGuards(JwtAuthGuard)
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Get('so-du')
    async xemSoDu(@Req() req: any) {
        return this.walletService.xemSoDu(req.user.ma);
    }

    @Get('lich-su')
    async xemLichSu(
        @Req() req: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.walletService.xemLichSu(
            req.user.ma,
            page ? parseInt(page) : 1,
            limit ? parseInt(limit) : 20,
        );
    }
}
