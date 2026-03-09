import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RedisCacheModule } from './redis/redis.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { ShortLinkModule } from './short-link/short-link.module';
import { RedirectModule } from './redirect/redirect.module';
import { CampaignModule } from './campaign/campaign.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';
import { RevenueService } from './cron/revenue.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    PrismaModule,
    RedisCacheModule,
    AuthModule,
    WalletModule,
    DepositModule,
    WithdrawalModule,
    ShortLinkModule,
    RedirectModule,
    CampaignModule,
    DashboardModule,
    AdminModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    RevenueService,
  ],
})
export class AppModule { }
