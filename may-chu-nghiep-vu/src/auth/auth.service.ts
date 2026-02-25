import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { DangKyDto } from './dto/dang-ky.dto';
import { DangNhapDto } from './dto/dang-nhap.dto';
import { randomUUID } from 'crypto';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private walletService: WalletService,
    ) { }

    async dangKy(dto: DangKyDto) {
        // Kiểm tra email đã tồn tại chưa
        const existing = await this.prisma.nguoi_dung.findUnique({
            where: { thu_dien_tu: dto.thu_dien_tu },
        });
        if (existing) {
            throw new ConflictException('Thư điện tử đã được đăng ký');
        }

        // Hash mật khẩu
        const mat_khau_bam = await bcrypt.hash(dto.mat_khau, 12);

        // Tạo người dùng
        const nguoiDung = await this.prisma.nguoi_dung.create({
            data: {
                ma_cong_khai: randomUUID(),
                loai_tai_khoan_mac_dinh: dto.loai_tai_khoan,
                thu_dien_tu: dto.thu_dien_tu,
                mat_khau_bam,
                ten_hien_thi: dto.ten_hien_thi,
                ngon_ngu_mac_dinh: 'vi',
                mui_gio_mac_dinh: 'Asia/Ho_Chi_Minh',
                trang_thai: 'hoat_dong',
            },
        });

        // Gán vai trò mặc định
        const vaiTro = await this.prisma.vai_tro.findUnique({
            where: { ma_vai_tro: dto.loai_tai_khoan },
        });
        if (vaiTro) {
            await this.prisma.gan_vai_tro_nguoi_dung.create({
                data: {
                    ma_nguoi_dung: nguoiDung.ma,
                    ma_vai_tro: vaiTro.ma,
                    trang_thai: 'hoat_dong',
                    thoi_diem_hieu_luc_tu: new Date(),
                    ma_nguoi_dung_tao: nguoiDung.ma,
                },
            });
        }

        // Tạo ví mặc định
        await this.walletService.taoViMacDinh(nguoiDung.ma, dto.loai_tai_khoan);

        // Tạo tokens
        const tokens = await this.taoCapToken(nguoiDung.ma, nguoiDung.thu_dien_tu, dto.loai_tai_khoan);

        return {
            nguoi_dung: {
                ma_cong_khai: nguoiDung.ma_cong_khai,
                thu_dien_tu: nguoiDung.thu_dien_tu,
                ten_hien_thi: nguoiDung.ten_hien_thi,
                loai_tai_khoan: nguoiDung.loai_tai_khoan_mac_dinh,
                so_du_kha_dung: 0,
                cau_hinh_rut_tien: null,
            },
            ...tokens,
        };
    }

    async dangNhap(dto: DangNhapDto, ip?: string, userAgent?: string) {
        const nguoiDung = await this.prisma.nguoi_dung.findUnique({
            where: { thu_dien_tu: dto.thu_dien_tu },
            include: {
                vai_tro_duoc_gan: {
                    include: { vai_tro: true },
                    where: { trang_thai: 'hoat_dong' },
                },
                vi_nguoi_dung: true,
            },
        });

        if (!nguoiDung) {
            throw new UnauthorizedException('Thư điện tử hoặc mật khẩu không đúng');
        }

        if (nguoiDung.trang_thai !== 'hoat_dong') {
            throw new UnauthorizedException('Tài khoản đã bị khóa hoặc chưa kích hoạt');
        }

        const matKhauDung = await bcrypt.compare(dto.mat_khau, nguoiDung.mat_khau_bam);
        if (!matKhauDung) {
            throw new UnauthorizedException('Thư điện tử hoặc mật khẩu không đúng');
        }

        // Cập nhật thời điểm đăng nhập cuối
        await this.prisma.nguoi_dung.update({
            where: { ma: nguoiDung.ma },
            data: { thoi_diem_dang_nhap_cuoi: new Date() },
        });

        const danhSachVaiTro = nguoiDung.vai_tro_duoc_gan.map(g => g.vai_tro.ma_vai_tro);
        const tokens = await this.taoCapToken(nguoiDung.ma, nguoiDung.thu_dien_tu, nguoiDung.loai_tai_khoan_mac_dinh, danhSachVaiTro);

        // Lưu refresh token vào bảng phien_dang_nhap
        const refreshTokenBam = await bcrypt.hash(tokens.refresh_token, 10);
        await this.prisma.phien_dang_nhap.create({
            data: {
                ma_nguoi_dung: nguoiDung.ma,
                refresh_token_bam: refreshTokenBam,
                dia_chi_ip: ip || null,
                user_agent: userAgent || null,
                thoi_diem_het_han: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
            },
        });

        const viKhaDung = nguoiDung.vi_nguoi_dung?.[0]?.so_du_kha_dung || 0;

        return {
            nguoi_dung: {
                ma_cong_khai: nguoiDung.ma_cong_khai,
                thu_dien_tu: nguoiDung.thu_dien_tu,
                ten_hien_thi: nguoiDung.ten_hien_thi,
                loai_tai_khoan: nguoiDung.loai_tai_khoan_mac_dinh,
                vai_tro: danhSachVaiTro,
                so_du_kha_dung: viKhaDung,
                cau_hinh_rut_tien: nguoiDung.cau_hinh_rut_tien ? JSON.parse(nguoiDung.cau_hinh_rut_tien) : null,
            },
            ...tokens,
        };
    }

    async dangXuat(maNguoiDung: bigint) {
        // Vô hiệu hóa tất cả phiên đăng nhập
        await this.prisma.phien_dang_nhap.updateMany({
            where: { ma_nguoi_dung: maNguoiDung, dang_hoat_dong: true },
            data: { dang_hoat_dong: false },
        });
        return { thong_diep: 'Đăng xuất thành công' };
    }

    private async taoCapToken(
        maNguoiDung: bigint,
        thuDienTu: string,
        loaiTaiKhoan: string,
        vaiTro: string[] = [],
    ) {
        const payload = {
            sub: maNguoiDung.toString(),
            email: thuDienTu,
            loai_tai_khoan: loaiTaiKhoan,
            vai_tro: vaiTro,
        };

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET', 'dev-secret-key-change-in-production'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET', 'dev-refresh-secret-key'),
                expiresIn: '7d',
            }),
        ]);

        return { access_token, refresh_token };
    }
}
