'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from './api-client';

interface NguoiDung {
    ma_cong_khai: string;
    thu_dien_tu: string;
    ten_hien_thi: string;
    loai_tai_khoan: string;
    vai_tro?: string[];
    so_dien_thoai?: string;
    so_du_kha_dung?: number;
    cau_hinh_rut_tien?: any;
    phuong_thuc_dang_ky?: string;
}

interface AuthContextType {
    nguoiDung: NguoiDung | null;
    dangDangNhap: boolean;
    dangNhap: (thuDienTu: string, matKhau: string, turnstileToken: string) => Promise<void>;
    dangKy: (data: { thu_dien_tu: string; mat_khau: string; ten_hien_thi: string; loai_tai_khoan: string; cf_turnstile_response: string }) => Promise<void>;
    dangNhapGoogle: (idToken: string, loaiTaiKhoan?: string) => Promise<void>;
    dangXuat: () => void;
    capNhatNguoiDungContext: (data: Partial<NguoiDung>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(null);
    const [dangDangNhap, setDangDangNhap] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const savedUser = localStorage.getItem('nguoi_dung');
        if (token && savedUser) {
            try {
                setNguoiDung(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('access_token');
                localStorage.removeItem('nguoi_dung');
            }

            // Xac thuc & fetch ho so moi nhat o background 
            apiClient.get('/api/v1/nguoi-dung/ho-so')
                .then((res: any) => {
                    if (res && res.ma_cong_khai) {
                        setNguoiDung(prev => {
                            const updated = { ...prev, ...res };
                            localStorage.setItem('nguoi_dung', JSON.stringify(updated));
                            return updated;
                        });
                    }
                }).catch(() => { });
        }
        setDangDangNhap(false);
    }, []);

    const dangNhap = useCallback(async (thuDienTu: string, matKhau: string, turnstileToken: string) => {
        const response: any = await apiClient.post('/api/v1/auth/dang-nhap', {
            thu_dien_tu: thuDienTu,
            mat_khau: matKhau,
            cf_turnstile_response: turnstileToken,
        });
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('nguoi_dung', JSON.stringify(response.nguoi_dung));
        setNguoiDung(response.nguoi_dung);
    }, []);

    const dangKy = useCallback(async (data: { thu_dien_tu: string; mat_khau: string; ten_hien_thi: string; loai_tai_khoan: string; cf_turnstile_response: string }) => {
        const response: any = await apiClient.post('/api/v1/auth/dang-ky', data);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('nguoi_dung', JSON.stringify(response.nguoi_dung));
        setNguoiDung(response.nguoi_dung);
    }, []);

    const dangNhapGoogle = useCallback(async (idToken: string, loaiTaiKhoan?: string) => {
        const response: any = await apiClient.post('/api/v1/auth/google', {
            id_token: idToken,
            loai_tai_khoan: loaiTaiKhoan,
        });
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('nguoi_dung', JSON.stringify(response.nguoi_dung));
        setNguoiDung(response.nguoi_dung);
    }, []);

    const dangXuat = useCallback(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            apiClient.post('/api/v1/auth/dang-xuat').catch(() => { });
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('nguoi_dung');
        setNguoiDung(null);
        window.location.href = '/dang-nhap'; // Force full reload to clear all React state
    }, []);

    const capNhatNguoiDungContext = useCallback((data: Partial<NguoiDung>) => {
        setNguoiDung(prev => {
            if (!prev) return null;
            const updated = { ...prev, ...data };
            localStorage.setItem('nguoi_dung', JSON.stringify(updated));
            return updated;
        });
    }, []);

    return (
        <AuthContext.Provider value={{ nguoiDung, dangDangNhap, dangNhap, dangKy, dangNhapGoogle, dangXuat, capNhatNguoiDungContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        // Tránh lỗi prerender trên Next.js khi Server-Side Rendering chưa bọc AuthProvider
        if (typeof window === 'undefined') {
            return {
                nguoiDung: null,
                dangDangNhap: true,
                dangNhap: async () => { },
                dangKy: async () => { },
                dangNhapGoogle: async () => { },
                dangXuat: () => { },
                capNhatNguoiDungContext: () => { }
            };
        }
        throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
    }
    return context;
};
