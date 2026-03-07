import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

export interface JwtPayload {
    sub: string;
    email: string;
    loai_tai_khoan: string;
    vai_tro: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const nguoiDung = await this.prisma.nguoi_dung.findFirst({
            where: {
                ma: BigInt(payload.sub),
                trang_thai: 'hoat_dong',
            },
        });

        if (!nguoiDung) {
            throw new UnauthorizedException('Tài khoản không tồn tại hoặc đã bị khóa');
        }

        return {
            ma: nguoiDung.ma,
            ma_cong_khai: nguoiDung.ma_cong_khai,
            thu_dien_tu: nguoiDung.thu_dien_tu,
            loai_tai_khoan: payload.loai_tai_khoan,
            vai_tro: payload.vai_tro,
        };
    }
}
