import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Định nghĩa chuẩn hóa cấu trúc lỗi từ TL15
export interface ApiError {
    ma_loi: string;
    thong_diep: string;
    chi_tiet?: any;
    ma_truy_vet?: string;
}

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor request (Thêm token hoặc headers nếu cần)
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor response (Xử lý dữ liệu trả về và ánh xạ lỗi chuẩn TL15)
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Trả về dữ liệu trực tiếp thay vì bọc toàn bộ axios response
        return response.data;
    },
    (error: AxiosError) => {
        let standardError: ApiError = {
            ma_loi: 'L_CHUNG_001',
            thong_diep: 'Không thể kết nối tới máy chủ',
        };

        if (error.response && error.response.data) {
            // Backend (NestJS filter) đã trả lời format chuẩn của TL15
            const data = error.response.data as ApiError;
            standardError = {
                ma_loi: data.ma_loi || 'L_CHUNG_001',
                thong_diep: data.thong_diep || 'Lỗi không xác định từ hệ thống',
                chi_tiet: data.chi_tiet || null,
                ma_truy_vet: data.ma_truy_vet || '',
            };

            // NV-FE-CORE-001 yêu cầu: Chưa chuyển hướng tự động 401 về trang đăng nhập
            if (error.response.status === 401) {
                console.warn('Lỗi 401: Vui lòng đăng nhập (chưa chuyển hướng)');
            }
        }

        // Ném ra cấu trúc lỗi chuẩn để các component UI xử lý (hiển thị notification, form error...)
        return Promise.reject(standardError);
    }
);

export default apiClient;
