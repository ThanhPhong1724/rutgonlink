'use client';

import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export default function DangNhapPage() {
    const { dangNhap } = useAuth();
    const router = useRouter();
    const [thuDienTu, setThuDienTu] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [loi, setLoi] = useState('');
    const [dangXuLy, setDangXuLy] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoi('');
        setDangXuLy(true);
        try {
            await dangNhap(thuDienTu, matKhau);
            router.push('/');
        } catch (err: any) {
            setLoi(err.thong_diep || 'Đã có lỗi xảy ra');
        } finally {
            setDangXuLy(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[420px]">
                {/* Header branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                        <LogIn className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Chào mừng trở lại</h1>
                    <p className="text-text-secondary mt-2">Đăng nhập để vào hệ thống RutGonLink</p>
                </div>

                <div className="card p-6 sm:p-8">
                    {loi && (
                        <div className="mb-6 p-4 rounded-lg bg-error-light/50 border border-error-light flex items-start gap-3 text-error">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{loi}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-text-primary">Thư điện tử</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-text-muted" />
                                </div>
                                <input
                                    type="email"
                                    value={thuDienTu}
                                    onChange={(e) => setThuDienTu(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-text-primary">Mật khẩu</label>
                                <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover">
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-text-muted" />
                                </div>
                                <input
                                    type="password"
                                    value={matKhau}
                                    onChange={(e) => setMatKhau(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={dangXuLy}
                            className="btn-primary w-full py-2.5 text-base mt-2"
                        >
                            {dangXuLy ? 'Đang xác thực...' : 'Đăng Nhập'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border text-center">
                        <p className="text-sm text-text-secondary">
                            Chưa có tài khoản?{' '}
                            <Link href="/dang-ky" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                                Tạo tài khoản mới
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
