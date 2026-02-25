import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ShortLinkService {
    constructor(private prisma: PrismaService) { }

    private generateShortCode(length = 6): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async taoLienKet(maNguoiDung: bigint, data: { lien_ket_goc: string; bi_danh?: string; lien_ket_du_phong?: string }) {
        if (!data.lien_ket_goc) throw new BadRequestException('Vui lòng nhập liên kết gốc');

        // Basic URL validation
        try { new URL(data.lien_ket_goc); } catch { throw new BadRequestException('Liên kết gốc không hợp lệ (cần có http:// hoặc https://)'); }

        let maNgan = data.bi_danh;
        if (maNgan) {
            // Check alias uniqueness
            const exist = await this.prisma.lien_ket_rut_gon.findUnique({ where: { ma_ngan: maNgan } });
            if (exist) throw new BadRequestException('Mã bí danh này đã có người sử dụng, vui lòng chọn mã khác');

            // Validate alias format (no special chars like spaces, slashes)
            if (!/^[a-zA-Z0-9\-_]+$/.test(maNgan)) {
                throw new BadRequestException('Bí danh chỉ được chứa chữ cái, số, gạch nối (-) và gạch dưới (_)');
            }
        } else {
            // Generate random unique short code
            let isUnique = false;
            while (!isUnique) {
                maNgan = this.generateShortCode(6);
                const exist = await this.prisma.lien_ket_rut_gon.findUnique({ where: { ma_ngan: maNgan } });
                if (!exist) isUnique = true;
            }
        }

        const lienKet = await this.prisma.lien_ket_rut_gon.create({
            data: {
                ma_cong_khai: randomUUID(),
                ma_nguoi_dung: maNguoiDung,
                ma_ngan: maNgan as string,
                bi_danh: data.bi_danh || null,
                lien_ket_goc: data.lien_ket_goc,
                lien_ket_du_phong: data.lien_ket_du_phong || null,
                trang_thai: 'hoat_dong',
                ma_nguoi_dung_tao: maNguoiDung,
            }
        });

        // Log
        await this.prisma.nhat_ky_lien_ket_rut_gon.create({
            data: {
                ma_lien_ket_rut_gon: lienKet.ma,
                loai_su_kien: 'tao_moi',
                nguon_tao: 'giao_dien_nguoi_dung',
                ma_nguoi_dung_thuc_hien: maNguoiDung,
            }
        });

        return {
            ma_cong_khai: lienKet.ma_cong_khai,
            ma_ngan: lienKet.ma_ngan,
            lien_ket_goc: lienKet.lien_ket_goc,
            trang_thai: lienKet.trang_thai,
            thoi_diem_tao: lienKet.thoi_diem_tao
        };
    }

    async danhSachLienKet(maNguoiDung: bigint, page = 1, limit = 20) {
        const [danh_sach, tong] = await Promise.all([
            this.prisma.lien_ket_rut_gon.findMany({
                where: { ma_nguoi_dung: maNguoiDung },
                orderBy: { thoi_diem_tao: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                // Include luot click count here ideally, but for now just return the link data
                include: {
                    _count: {
                        select: { su_kien_luot: true } // simple clicks counter
                    }
                }
            }),
            this.prisma.lien_ket_rut_gon.count({
                where: { ma_nguoi_dung: maNguoiDung }
            })
        ]);

        return {
            danh_sach: danh_sach.map(lk => ({
                ma_cong_khai: lk.ma_cong_khai,
                ma_ngan: lk.ma_ngan,
                lien_ket_goc: lk.lien_ket_goc,
                trang_thai: lk.trang_thai,
                thoi_diem_tao: lk.thoi_diem_tao,
                tong_luot_nhap: lk._count.su_kien_luot
            })),
            tong
        };
    }

    async capNhatLienKet(maNguoiDung: bigint, maNgan: string, data: { trang_thai?: string; lien_ket_goc?: string; lien_ket_du_phong?: string }) {
        const lk = await this.prisma.lien_ket_rut_gon.findUnique({ where: { ma_ngan: maNgan } });
        if (!lk) throw new BadRequestException('Không tìm thấy liên kết rút gọn này');
        if (lk.ma_nguoi_dung !== maNguoiDung) throw new BadRequestException('Bạn không có quyền thao tác trên liên kết này');

        if (data.lien_ket_goc) {
            try { new URL(data.lien_ket_goc); } catch { throw new BadRequestException('Liên kết gốc không hợp lệ (cần có http:// hoặc https://)'); }
        }

        const updated = await this.prisma.lien_ket_rut_gon.update({
            where: { ma_ngan: maNgan },
            data: {
                trang_thai: data.trang_thai !== undefined ? data.trang_thai : undefined,
                lien_ket_goc: data.lien_ket_goc !== undefined ? data.lien_ket_goc : undefined,
                lien_ket_du_phong: data.lien_ket_du_phong !== undefined ? data.lien_ket_du_phong : undefined,
                ma_nguoi_dung_cap_nhat: maNguoiDung,
            }
        });

        // Log update
        await this.prisma.nhat_ky_lien_ket_rut_gon.create({
            data: {
                ma_lien_ket_rut_gon: lk.ma,
                loai_su_kien: 'cap_nhat',
                du_lieu_truoc: JSON.stringify({ trang_thai: lk.trang_thai, lien_ket_goc: lk.lien_ket_goc }),
                du_lieu_sau: JSON.stringify({ trang_thai: updated.trang_thai, lien_ket_goc: updated.lien_ket_goc }),
                nguon_tao: 'giao_dien_nguoi_dung',
                ma_nguoi_dung_thuc_hien: maNguoiDung,
            }
        });

        return { message: 'Cập nhật thành công', trang_thai: updated.trang_thai };
    }
}
