import { Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';

@Module({
  providers: [ShortLinkService],
  controllers: [ShortLinkController]
})
export class ShortLinkModule {}
