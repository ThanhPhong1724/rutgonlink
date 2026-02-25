import { GlobalExceptionFilter } from './global-exception.filter';
import { ArgumentsHost, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '@rutgonlink/core-constants';

describe('GlobalExceptionFilter', () => {
    let filter: GlobalExceptionFilter;

    beforeEach(() => {
        filter = new GlobalExceptionFilter();
    });

    it('should format HttpException (e.g. BadRequest) according to TL15', () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
        const mockGetResponse = jest.fn().mockImplementation(() => ({ status: mockStatus }));
        const mockGetRequest = jest.fn().mockImplementation(() => ({
            url: '/test',
            headers: { 'x-request-id': 'test-trace-123' }
        }));

        const mockHost = {
            switchToHttp: jest.fn().mockImplementation(() => ({
                getResponse: mockGetResponse,
                getRequest: mockGetRequest,
            })),
        } as unknown as ArgumentsHost;

        const exception = new BadRequestException(['Username is required']);

        filter.catch(exception, mockHost);

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(mockJson).toHaveBeenCalledWith({
            ma_loi: ERROR_CODES.VALIDATION_ERROR,
            thong_diep: 'Dữ liệu đầu vào không hợp lệ',
            chi_tiet: ['Username is required'],
            ma_truy_vet: 'test-trace-123',
        });
    });

    it('should fallback to 500 for unhandled exceptions with sanitized output', () => {
        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
        const mockGetResponse = jest.fn().mockImplementation(() => ({ status: mockStatus }));
        const mockGetRequest = jest.fn().mockImplementation(() => ({
            url: '/test',
            headers: {}
        }));

        const mockHost = {
            switchToHttp: jest.fn().mockImplementation(() => ({
                getResponse: mockGetResponse,
                getRequest: mockGetRequest,
            })),
        } as unknown as ArgumentsHost;

        const exception = new Error('Database connection failed secretly');

        // Silence logger temporarily
        jest.spyOn(filter['logger'], 'error').mockImplementation(() => { });

        filter.catch(exception, mockHost);

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(mockJson).toHaveBeenCalledWith({
            ma_loi: ERROR_CODES.INTERNAL_SERVER_ERROR,
            thong_diep: 'Đã có lỗi không xác định xảy ra trên hệ thống',
            chi_tiet: null,
            ma_truy_vet: 'no-trace-id',
        });
    });
});
