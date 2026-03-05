import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { CampaignModule } from '../campaign/campaign.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CampaignModule, AuthModule],
  providers: [RedirectService],
  controllers: [RedirectController]
})
export class RedirectModule { }
