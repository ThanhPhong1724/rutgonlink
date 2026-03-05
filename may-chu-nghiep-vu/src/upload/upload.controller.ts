import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Body, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Response } from 'express';
import * as fs from 'fs';

// Tạo thư mục nếu chưa tồn tại
const uploadDir = join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

@Controller('api/v1/upload')
export class UploadController {

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: uploadDir,
            filename: (req, file, cb) => {
                // Lấy key được gửi kèm (ví dụ: qr-bank, qr-usdt, campaign-1234)
                const uploadKey = req.body.key;

                if (!uploadKey) {
                    // Nếu không có key, tạo ra tên unique để tránh ghi đè nhầm
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    return cb(null, `file-${uniqueSuffix}${extname(file.originalname)}`);
                }

                // Nếu có key, dùng luôn key đó làm tên file (sẽ TỰ ĐỘNG GHI ĐÈ file cũ có cùng tên)
                // Ép thêm đuôi mở rộng của file thật để trình duyệt hiểu format
                const ext = extname(file.originalname);
                // Xoá file cũ nếu tồn tại khác đuôi (Mở rộng: Cẩn thận hơn)
                // ... logic đơn giản: Cứ lưu với đuôi tĩnh hoặc giữ nguyên đuôi gốc.
                cb(null, `${uploadKey}${ext}`);
            }
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
        fileFilter: (req, file, cb) => {
            // Chỉ nhận ảnh
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new BadRequestException('Chỉ cho phép tải lên file ảnh (jpg, png, gif, webp)'), false);
            }
            cb(null, true);
        }
    }))
    uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { key?: string }
    ) {
        if (!file) {
            throw new BadRequestException('Không tìm thấy file tải lên');
        }

        // Trả về URL để truy cập file
        return {
            thanh_cong: true,
            filePath: `/api/v1/upload/${file.filename}`,
            fileName: file.filename
        };
    }

    /** 
     * Endpoint công khai để lấy ảnh
     */
    @Get(':filename')
    serveImage(@Param('filename') filename: string, @Res() res: Response) {
        return res.sendFile(filename, { root: uploadDir });
    }
}
