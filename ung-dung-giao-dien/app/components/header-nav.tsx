'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import apiClient from '../../lib/api-client';
import { LogOut, Wallet } from 'lucide-react';

export default function HeaderNav() {
    const { nguoiDung, dangXuat } = useAuth();
    const [soDu, setSoDu] = useState<string | null>(null);

    useEffect(() => {
        if (!nguoiDung) {
            setSoDu(null);
            return;
        }
        setSoDu(null); // Clear previous balance
        apiClient.get('/api/v1/vi/so-du').then((res: any) => {
            const vi = res.vi?.[0]; // Lấy ví chính hoặc ví doanh thu tùy policy
            // Nếu là R20, có thể có 2 ví, ưu tiên hiểm thị tổng hoặc ví chính/doanh thu
            // Ở đây tạm lấy ví đầu tiên để demo
            if (vi) setSoDu(Number(vi.so_du_kha_dung).toLocaleString('vi-VN'));
        }).catch(() => { });
    }, [nguoiDung]);

    if (!nguoiDung) {
        return (
            <nav className="flex items-center space-x-4">
                <Link href="/dang-nhap" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                    Đăng Nhập
                </Link>
                <Link href="/dang-ky" className="btn-primary text-sm shadow-sm">
                    Đăng Ký
                </Link>
            </nav>
        );
    }

    return (
        <div className="flex items-center gap-4">
            {/* Wallet Balance Badge */}
            {soDu !== null && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-success-light text-success font-semibold text-sm rounded-full border border-success/30 shadow-sm">
                    <Wallet className="w-4 h-4" />
                    <span>{soDu} đ</span>
                </div>
            )}

            <div className="h-6 w-px bg-border hidden sm:block mx-1"></div>

            <button
                onClick={dangXuat}
                title="Đăng xuất"
                className="flex items-center justify-center p-2 text-text-muted hover:text-error hover:bg-error-light rounded-full transition-colors"
            >
                <LogOut className="w-5 h-5" />
            </button>
        </div>
    );
}

