import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_CODES, ErrorCode } from '@rutgonlink/core-constants';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Default to internal server error
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let ma_loi: ErrorCode | string = ERROR_CODES.INTERNAL_SERVER_ERROR;
        let thong_diep = 'Đã có lỗi không xác định xảy ra trên hệ thống';
        let chi_tiet: any = null;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse() as any;

            // Handle Validation pipes and bad requests
            if (status === HttpStatus.BAD_REQUEST) {
                ma_loi = ERROR_CODES.VALIDATION_ERROR;
                thong_diep = 'Dữ liệu đầu vào không hợp lệ';
                chi_tiet = exceptionResponse.message || exceptionResponse;
            } else if (status === HttpStatus.UNAUTHORIZED) {
                ma_loi = ERROR_CODES.UNAUTHORIZED;
                thong_diep = 'Vui lòng đăng nhập để tiếp tục';
            } else if (status === HttpStatus.FORBIDDEN) {
                ma_loi = ERROR_CODES.FORBIDDEN;
                thong_diep = 'Bạn không có quyền thực hiện hành động này';
            } else if (status === HttpStatus.NOT_FOUND) {
                ma_loi = ERROR_CODES.NOT_FOUND;
                thong_diep = 'Tài nguyên không tồn tại';
            } else {
                ma_loi = ERROR_CODES.BAD_REQUEST;
                thong_diep = exception.message || 'Lỗi xử lý yêu cầu';
            }
        } else {
            // Prisma ORM or other unhandled errors logic can go here. For now log it to prevent leaks.
            this.logger.error(`Exception in ${request.url}:`, exception);
        }

        const errorResponse = {
            ma_loi,
            thong_diep,
            chi_tiet,
            ma_truy_vet: request.headers['x-request-id'] || 'no-trace-id', // Ideally generated per request
        };

        response.status(status).json(errorResponse);
    }
}
