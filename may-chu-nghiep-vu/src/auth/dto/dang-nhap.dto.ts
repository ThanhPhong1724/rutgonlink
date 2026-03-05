import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DangNhapDto {
    @IsEmail({}, { message: 'Thư điện tử không hợp lệ' })
    thu_dien_tu: string;

    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    mat_khau: string;

    @IsString()
    @IsNotEmpty({ message: 'Vui lòng xác thực bạn không phải là robot' })
    cf_turnstile_response: string;
}
