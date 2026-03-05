import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { DangKyDto } from './dto/dang-ky.dto';
import { DangNhapDto } from './dto/dang-nhap.dto';
import { randomUUID } from 'crypto';
import { WalletService } from '../wallet/wallet.service';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private walletService: WalletService,
    ) {
        this.googleClient = new OAuth2Client(
            this.configService.get('GOOGLE_CLIENT_ID', '298818615984-jnb56bh25gnq297e7bnlonbtqmcht2ij.apps.googleusercontent.com'),
        );
    }

    async verifyTurnstile(token: string, ip?: string) {
        // Use testing secret key by default or from env
        const secret = this.configService.get<string>('TURNSTILE_SECRET_KEY') || '1x0000000000000000000000000000000AA';
        const formData = new URLSearchParams();
        formData.append('secret', secret);
        formData.append('response', token);
        if (ip) {
            formData.append('remoteip', ip);
        }

        try {
            const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (!data.success) {
                throw new BadRequestException('Mã xác thực không hợp lệ. Vui lòng tải lại trang và thử lại.');
            }
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new BadRequestException('Không thể xác thực Anti-Bot, vui lòng thử lại sau.');
        }
    }

    async dangKy(dto: DangKyDto, ip?: string, userAgent?: string) {
        await this.verifyTurnstile(dto.cf_turnstile_response, ip);

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
        await this.verifyTurnstile(dto.cf_turnstile_response, ip);

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

        // Tài khoản Google không có password → không thể đăng nhập bằng form
        if (!nguoiDung.mat_khau_bam) {
            throw new UnauthorizedException('Tài khoản này được đăng ký bằng Google. Vui lòng sử dụng nút "Đăng nhập bằng Google".');
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

    /** Đăng nhập / đăng ký bằng Google */
    async dangNhapGoogle(idToken: string, loaiTaiKhoan?: string, ip?: string, userAgent?: string) {
        // 1. Verify Google ID token
        let payload: any;
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken,
                audience: this.configService.get('GOOGLE_CLIENT_ID', '298818615984-jnb56bh25gnq297e7bnlonbtqmcht2ij.apps.googleusercontent.com'),
            });
            payload = ticket.getPayload();
        } catch {
            throw new UnauthorizedException('Token Google không hợp lệ hoặc đã hết hạn');
        }

        if (!payload || !payload.email) {
            throw new UnauthorizedException('Không lấy được thông tin từ Google');
        }

        const googleId = payload.sub;
        const email = payload.email;
        const tenHienThi = payload.name || email.split('@')[0];

        // 2. Tìm user theo google_id
        let nguoiDung = await this.prisma.nguoi_dung.findFirst({
            where: { google_id: googleId },
            include: {
                vai_tro_duoc_gan: { include: { vai_tro: true }, where: { trang_thai: 'hoat_dong' } },
                vi_nguoi_dung: true,
            },
        });

        if (nguoiDung) {
            // Đã có tài khoản Google → đăng nhập
            if (nguoiDung.trang_thai !== 'hoat_dong') {
                throw new UnauthorizedException('Tài khoản đã bị khóa hoặc chưa kích hoạt');
            }

            await this.prisma.nguoi_dung.update({
                where: { ma: nguoiDung.ma },
                data: { thoi_diem_dang_nhap_cuoi: new Date() },
            });

            const danhSachVaiTro = nguoiDung.vai_tro_duoc_gan.map(g => g.vai_tro.ma_vai_tro);
            const tokens = await this.taoCapToken(nguoiDung.ma, nguoiDung.thu_dien_tu, nguoiDung.loai_tai_khoan_mac_dinh, danhSachVaiTro);

            const refreshTokenBam = await bcrypt.hash(tokens.refresh_token, 10);
            await this.prisma.phien_dang_nhap.create({
                data: {
                    ma_nguoi_dung: nguoiDung.ma,
                    refresh_token_bam: refreshTokenBam,
                    dia_chi_ip: ip || null,
                    user_agent: userAgent || null,
                    thoi_diem_het_han: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });

            const viKhaDung = nguoiDung.vi_nguoi_dung?.[0]?.so_du_kha_dung || 0;

            return {
                nguoi_dung: {
                    ma_cong_khai: nguoiDung.ma_cong_khai,
                    thu_dien_tu: nguoiDung.thu_dien_tu,
                    ten_hien_thi: nguoiDung.ten_hien_thi,
                    loai_tai_khoan: nguoiDung.loai_tai_khoan_mac_dinh,
                    phuong_thuc_dang_ky: 'google',
                    vai_tro: danhSachVaiTro,
                    so_du_kha_dung: viKhaDung,
                    cau_hinh_rut_tien: nguoiDung.cau_hinh_rut_tien ? JSON.parse(nguoiDung.cau_hinh_rut_tien) : null,
                },
                ...tokens,
            };
        }

        // 3. Kiểm tra email đã tồn tại (tài khoản password)
        const existingByEmail = await this.prisma.nguoi_dung.findUnique({
            where: { thu_dien_tu: email },
        });
        if (existingByEmail) {
            throw new ConflictException('Email này đã được đăng ký bằng phương thức khác. Vui lòng đăng nhập bằng email/mật khẩu.');
        }

        // 4. Tạo tài khoản mới
        if (!loaiTaiKhoan || !['R10', 'R20'].includes(loaiTaiKhoan)) {
            throw new BadRequestException('Vui lòng chọn loại tài khoản (Người mua hoặc Người bán) trước khi đăng ký bằng Google.');
        }

        const newUser = await this.prisma.nguoi_dung.create({
            data: {
                ma_cong_khai: randomUUID(),
                loai_tai_khoan_mac_dinh: loaiTaiKhoan,
                thu_dien_tu: email,
                thu_dien_tu_da_xac_minh: true, // Google đã xác minh email
                ten_hien_thi: tenHienThi,
                google_id: googleId,
                phuong_thuc_dang_ky: 'google',
                ngon_ngu_mac_dinh: 'vi',
                mui_gio_mac_dinh: 'Asia/Ho_Chi_Minh',
                trang_thai: 'hoat_dong',
            },
        });

        // Gán vai trò
        const vaiTro = await this.prisma.vai_tro.findUnique({ where: { ma_vai_tro: loaiTaiKhoan } });
        if (vaiTro) {
            await this.prisma.gan_vai_tro_nguoi_dung.create({
                data: {
                    ma_nguoi_dung: newUser.ma,
                    ma_vai_tro: vaiTro.ma,
                    trang_thai: 'hoat_dong',
                    thoi_diem_hieu_luc_tu: new Date(),
                    ma_nguoi_dung_tao: newUser.ma,
                },
            });
        }

        // Tạo ví mặc định
        await this.walletService.taoViMacDinh(newUser.ma, loaiTaiKhoan);

        // Tạo tokens
        const tokens = await this.taoCapToken(newUser.ma, newUser.thu_dien_tu, loaiTaiKhoan);

        return {
            nguoi_dung: {
                ma_cong_khai: newUser.ma_cong_khai,
                thu_dien_tu: newUser.thu_dien_tu,
                ten_hien_thi: newUser.ten_hien_thi,
                loai_tai_khoan: loaiTaiKhoan,
                phuong_thuc_dang_ky: 'google',
                so_du_kha_dung: 0,
                cau_hinh_rut_tien: null,
            },
            ...tokens,
        };
    }
}
