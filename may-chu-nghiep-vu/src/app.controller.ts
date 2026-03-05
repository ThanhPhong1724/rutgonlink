import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminService } from './admin/admin.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly adminService: AdminService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/v1/public/cau-hinh')
  @UseGuards(JwtAuthGuard)
  async publicCauHinh() {
    return this.adminService.danhSachCauHinh();
  }
}
