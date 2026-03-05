import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator';

export class DangKyDto {
    @IsEmail({}, { message: 'Thư điện tử không hợp lệ' })
    thu_dien_tu: string;

    @IsString()
    @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
    mat_khau: string;

    @IsString()
    @IsNotEmpty({ message: 'Tên hiển thị không được để trống' })
    ten_hien_thi: string;

    @IsString()
    @IsIn(['R10', 'R20'], { message: 'Loại tài khoản phải là R10 (Người nhấp link) hoặc R20 (Nhà xuất bản)' })
    loai_tai_khoan: string;

    @IsString()
    @IsNotEmpty({ message: 'Vui lòng xác thực bạn không phải là robot' })
    cf_turnstile_response: string;
}
