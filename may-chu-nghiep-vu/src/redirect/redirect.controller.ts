import { Controller, Get, Post, Param, Req, Body } from '@nestjs/common';
import { RedirectService } from './redirect.service';

@Controller('api/v1/redirect')
// Chú ý: Không dùng AuthGuard ở đây vì API này dành cho public (R01 - khách vô danh)
export class RedirectController {
    constructor(private readonly redirectService: RedirectService) { }

    @Post('info/:maNgan')
    async getInfo(
        @Param('maNgan') maNgan: string,
        @Req() req: any,
        @Body() body: { cf_turnstile_response?: string }
    ) {
        const ip = req.ip || req.connection?.remoteAddress;
        const userAgent = req.headers['user-agent'];

        return this.redirectService.getLinkInfoAndTrack(maNgan, { ip, userAgent }, body?.cf_turnstile_response);
    }

    @Post('verify/:trackingId')
    async verify(@Param('trackingId') trackingId: string) {
        return this.redirectService.verifyAndGetLink(trackingId);
    }
}
