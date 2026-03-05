import { IsString, IsNumber, IsOptional, Min, IsUrl } from 'class-validator';

export class TaoChienDichDto {
    @IsString()
    ma_goi_cong_khai: string; // ma_cong_khai của gói thời gian

    @IsString()
    ten_chien_dich: string;

    @IsString()
    lien_ket_trang_dich: string; // URL web cần traffic

    @IsString()
    tu_khoa: string; // JSON array hoặc chuỗi xuống dòng

    @IsOptional()
    @IsString()
    anh_minh_hoa_url?: string; // Link ảnh URL

    @IsOptional()
    @IsString()
    anh_minh_hoa_file?: string; // Link ảnh Upload

    @IsNumber()
    @Min(1)
    so_luot_mua: number;
}

export class CapNhatGoiDto {
    @IsOptional()
    @IsString()
    ten_goi?: string;

    @IsOptional()
    @IsNumber()
    thoi_gian_giay?: number;

    @IsOptional()
    @IsNumber()
    don_gia_mua?: number;

    @IsOptional()
    @IsNumber()
    don_gia_ban?: number;

    @IsOptional()
    @IsString()
    trang_thai?: string;
}
