import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Req,
  Res,
  Header,
  UseGuards,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { TaoChienDichDto, CapNhatGoiDto } from './campaign.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response } from 'express';

@Controller('api/v1')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) { }

  // ============================
  // PUBLIC - Danh sách gói (cho form tạo chiến dịch)
  // ============================

  @Get('goi-thoi-gian')
  async danhSachGoiHoatDong() {
    return { goi: await this.campaignService.danhSachGoiHoatDong() };
  }

  // ============================
  // R10 - Quản lý chiến dịch
  // ============================

  @UseGuards(JwtAuthGuard)
  @Post('chien-dich')
  async taoChienDich(@Body() dto: TaoChienDichDto, @Req() req: any) {
    const maNguoiDung = BigInt(req.user.ma);
    return this.campaignService.taoChienDich(maNguoiDung, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('chien-dich')
  async danhSachChienDich(@Req() req: any) {
    const maNguoiDung = BigInt(req.user.ma);
    return { chien_dich: await this.campaignService.danhSachChienDich(maNguoiDung) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('chien-dich/:ma')
  async chiTietChienDich(@Param('ma') ma: string, @Req() req: any) {
    return this.campaignService.chiTiet(ma, BigInt(req.user.ma));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('chien-dich/:ma/tam-dung')
  async tamDung(@Param('ma') ma: string, @Req() req: any) {
    return this.campaignService.tamDungChienDich(ma, BigInt(req.user.ma));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('chien-dich/:ma/tiep-tuc')
  async tiepTuc(@Param('ma') ma: string, @Req() req: any) {
    return this.campaignService.tiepTucChienDich(ma, BigInt(req.user.ma));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('chien-dich/:ma/ket-thuc')
  async ketThuc(@Param('ma') ma: string, @Req() req: any) {
    return this.campaignService.ketThucChienDich(ma, BigInt(req.user.ma));
  }

  // ============================
  // PUBLIC - Embed script: sinh mã xác nhận
  // ============================

  @Post('embed/:maChienDich/tao-ma')
  async taoMaXacNhan(
    @Param('maChienDich') maChienDich: string,
    @Req() req: any,
  ) {
    const ip = req.ip || req.connection?.remoteAddress;
    return this.campaignService.taoMaXacNhan(maChienDich, ip);
  }

  @Get('embed/:maChienDich/embed.js')
  async serveEmbedScript(
    @Param('maChienDich') maChienDich: string,
    @Res() res: Response,
  ) {
    const protocol = res.req.headers['x-forwarded-proto'] || res.req.protocol;
    const host = res.req.headers['x-forwarded-host'] || res.req.get('host');
    const apiBase = `${protocol}://${host}/api/v1`;

    const script = `(function(){
var API="${apiBase}";
var CD="${maChienDich}";
var el=document.getElementById("rgl-embed");
if(!el)return;
el.style.cssText="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:320px;";

var iKey='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>';
var iOk='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
var iClk='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
var iErr='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
var iCp='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

var btn=document.createElement("button");
btn.innerHTML=iKey+' <span>Nh\\u1EADn m\\u00E3</span>';
btn.style.cssText="display:inline-flex;align-items:center;gap:6px;padding:7px 16px;background:#6366f1;color:#fff;border:none;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 8px rgba(99,102,241,0.25);";
btn.onmouseenter=function(){btn.style.background="#4f46e5";};
btn.onmouseleave=function(){btn.style.background="#6366f1";};
el.appendChild(btn);

var box=document.createElement("div");
box.style.cssText="display:none;margin-top:8px;border-radius:10px;border:1px solid #e5e7eb;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.05);";
el.appendChild(box);

btn.onclick=function(){
  btn.disabled=true;btn.style.opacity="0.6";btn.style.cursor="default";
  btn.innerHTML=iClk+' \\u0110ang t\\u1EA1o...';
  box.style.display="block";
  box.innerHTML='<div style="padding:10px 14px;text-align:center;color:#9ca3af;font-size:12px;">\\u0110ang k\\u1EBFt n\\u1ED1i...</div>';

  fetch(API+"/embed/"+CD+"/tao-ma",{method:"POST",headers:{"Content-Type":"application/json"}})
  .then(function(r){return r.json();})
  .then(function(d){
    if(d.ma_xac_nhan){
      var t=d.thoi_gian_giay||70,l=t;
      box.innerHTML='<div style="padding:10px 14px;"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;"><span style="font-size:11px;color:#9ca3af;display:flex;align-items:center;gap:4px;">'+iClk+' Ch\\u1EDD nh\\u1EADn m\\u00E3</span><span id="rgl-t" style="font-size:11px;font-weight:700;color:#6366f1;">'+l+'s</span></div><div style="width:100%;height:3px;background:#f3f4f6;border-radius:2px;overflow:hidden;"><div id="rgl-b" style="height:100%;background:#6366f1;border-radius:2px;width:100%;transition:width 1s linear;"></div></div></div>';
      btn.innerHTML=iClk+' '+l+'s';
      var te=document.getElementById("rgl-t"),be=document.getElementById("rgl-b");
      var iv=setInterval(function(){
        l--;if(te)te.textContent=l+"s";if(be)be.style.width=(l/t*100)+"%";
        btn.innerHTML=iClk+' '+l+'s';
        if(l<=0){
          clearInterval(iv);
          btn.style.display="none";
          box.innerHTML='<div style="padding:10px 14px;"><div style="display:flex;align-items:center;gap:5px;margin-bottom:6px;color:#16a34a;font-size:11px;font-weight:600;">'+iOk+' M\\u00E3 c\\u1EE7a b\\u1EA1n</div><div style="display:flex;align-items:center;gap:6px;"><div style="flex:1;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:6px 10px;text-align:center;"><span style="font-size:18px;font-weight:800;letter-spacing:3px;color:#16a34a;">'+d.ma_xac_nhan+'</span></div><button id="rgl-cp" style="padding:5px 8px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;cursor:pointer;color:#16a34a;display:flex;align-items:center;gap:3px;font-size:10px;font-weight:600;">'+iCp+'</button></div><p style="margin:5px 0 0;font-size:10px;color:#9ca3af;">Nh\\u1EADp m\\u00E3 v\\u00E0o trang l\\u1EA5y link</p></div>';
          var cb=document.getElementById("rgl-cp");
          if(cb){cb.onclick=function(){navigator.clipboard.writeText(d.ma_xac_nhan);cb.innerHTML=iOk;setTimeout(function(){cb.innerHTML=iCp;},1500);};}
        }
      },1000);
    }else{
      btn.innerHTML=iErr+' Th\\u1EED l\\u1EA1i';btn.disabled=false;btn.style.opacity="1";btn.style.cursor="pointer";
      box.innerHTML='<div style="padding:8px 14px;color:#dc2626;font-size:11px;display:flex;align-items:center;gap:5px;">'+iErr+' '+(d.message||"L\\u1ED7i")+'</div>';
    }
  })
  .catch(function(){
    btn.innerHTML=iErr+' Th\\u1EED l\\u1EA1i';btn.disabled=false;btn.style.opacity="1";btn.style.cursor="pointer";
    box.innerHTML='<div style="padding:8px 14px;color:#dc2626;font-size:11px;display:flex;align-items:center;gap:5px;">'+iErr+' L\\u1ED7i k\\u1EBFt n\\u1ED1i</div>';
  });
};
})();`;

    res.type('application/javascript').send(script);
  }

  // ============================
  // PUBLIC - Xác minh mã (từ trang redirect)
  // ============================

  @Post('redirect/xac-minh-ma')
  async xacMinhMa(@Body() body: { ma_xac_nhan: string; tracking_id: string }, @Req() req: any) {
    const ip = req.ip || req.connection?.remoteAddress;
    return this.campaignService.xacMinhMa(body.ma_xac_nhan, body.tracking_id, ip);
  }

  // ============================
  // ADMIN R30 - Quản lý gói thời gian
  // ============================

  @UseGuards(JwtAuthGuard)
  @Get('admin/goi-thoi-gian')
  async adminDanhSachGoi() {
    return { goi: await this.campaignService.danhSachGoi() };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/goi-thoi-gian/:ma')
  async adminCapNhatGoi(
    @Param('ma') ma: string,
    @Body() dto: CapNhatGoiDto,
  ) {
    return this.campaignService.capNhatGoi(ma, dto);
  }
}
