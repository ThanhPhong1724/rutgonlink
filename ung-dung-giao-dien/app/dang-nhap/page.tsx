'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

declare global {
    interface Window { google: any; }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export default function DangNhapPage() {
    const { dangNhap, dangNhapGoogle } = useAuth();
    const router = useRouter();
    const [thuDienTu, setThuDienTu] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [loi, setLoi] = useState('');
    const [dangXuLy, setDangXuLy] = useState(false);
    const [googleReady, setGoogleReady] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');

    const handleGoogleCallback = useCallback(async (response: any) => {
        if (!response?.credential) {
            setLoi('Không nhận được thông tin xác thực từ Google. Vui lòng thử lại.');
            return;
        }
        setLoi('');
        setDangXuLy(true);
        try {
            await dangNhapGoogle(response.credential);
            router.push('/');
        } catch (err: any) {
            const msg = err?.thong_diep || err?.message || '';
            if (msg.includes('phương thức khác') || msg.includes('email/mật khẩu')) {
                setLoi('Email này được đăng ký bằng mật khẩu. Vui lòng dùng form đăng nhập bên dưới.');
            } else if (msg.includes('chưa có tài khoản') || msg.includes('chọn loại') || msg.includes('loại tài khoản')) {
                setLoi('Bạn chưa có tài khoản. Vui lòng đăng ký trước.');
            } else if (msg.includes('bị khóa') || msg.includes('kích hoạt')) {
                setLoi('Tài khoản đã bị khóa hoặc chưa kích hoạt. Liên hệ admin để hỗ trợ.');
            } else if (msg.includes('Token') || msg.includes('hết hạn')) {
                setLoi('Phiên xác thực Google đã hết hạn. Vui lòng thử lại.');
            } else {
                setLoi(msg || 'Đã có lỗi xảy ra khi đăng nhập bằng Google.');
            }
        } finally {
            setDangXuLy(false);
        }
    }, [dangNhapGoogle, router]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleGoogleCallback,
                });
                setGoogleReady(true);
            }
        };
        document.body.appendChild(script);
        return () => {
            try { document.body.removeChild(script); } catch { }
        };
    }, [handleGoogleCallback]);

    const handleGoogleClick = () => {
        if (!googleReady) {
            setLoi('Đang tải Google Sign-In, vui lòng đợi...');
            return;
        }
        if (window.google) {
            window.google.accounts.id.prompt();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoi('');

        if (!thuDienTu.trim()) {
            setLoi('Vui lòng nhập thư điện tử.');
            return;
        }
        if (!matKhau) {
            setLoi('Vui lòng nhập mật khẩu.');
            return;
        }
        if (!turnstileToken) {
            setLoi('Vui lòng xác minh CAPTCHA.');
            return;
        }

        setDangXuLy(true);
        try {
            await dangNhap(thuDienTu, matKhau, turnstileToken);
            router.push('/');
        } catch (err: any) {
            const msg = err?.thong_diep || err?.message || '';
            if (msg.includes('Google') || msg.includes('nút')) {
                setLoi('Tài khoản này được đăng ký bằng Google. Vui lòng sử dụng nút "Đăng nhập bằng Google" ở trên.');
            } else if (msg.includes('mật khẩu không đúng') || msg.includes('thư điện tử')) {
                setLoi('Thư điện tử hoặc mật khẩu không đúng. Vui lòng thử lại.');
            } else if (msg.includes('bị khóa') || msg.includes('kích hoạt')) {
                setLoi('Tài khoản đã bị khóa hoặc chưa kích hoạt. Liên hệ admin để hỗ trợ.');
            } else {
                setLoi(msg || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        } finally {
            setDangXuLy(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[420px]">
                {/* Header branding */}
                <div className="text-center mb-8 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 shadow-lg shadow-primary/10">
                        <LogIn className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Chào mừng trở lại</h1>
                    <p className="text-text-secondary mt-2 flex items-center justify-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-warning" />
                        Đăng nhập để vào hệ thống Traffict SEO
                    </p>
                </div>

                <div className="card p-6 sm:p-8 shadow-xl border border-border/50">
                    {loi && (
                        <div className="mb-6 p-4 rounded-xl bg-error-light/50 border border-error-light flex items-start gap-3 text-error animate-slideDown">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{loi}</p>
                        </div>
                    )}

                    {/* Google Login Button */}
                    <button
                        type="button"
                        onClick={handleGoogleClick}
                        disabled={dangXuLy}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-border bg-surface hover:bg-surface-hover hover:border-primary/30 hover:shadow-sm transition-all duration-200 text-text-primary font-semibold text-sm mb-6 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" className="transition-transform duration-200 group-hover:scale-110">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        {dangXuLy ? 'Đang xử lý...' : 'Đăng nhập bằng Google'}
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-surface px-3 text-text-muted font-medium tracking-wider">hoặc đăng nhập bằng email</span>
                        </div>
                    </div>

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
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-text-primary">Mật khẩu</label>
                                <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
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
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-2">
                            <Turnstile
                                siteKey={TURNSTILE_SITE_KEY}
                                onSuccess={setTurnstileToken}
                                onError={() => setLoi('Lỗi khi tải mã xác thực CAPTCHA. Vui lòng tải lại trang.')}
                                options={{
                                    size: 'normal',
                                    theme: 'light',
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={dangXuLy || !turnstileToken}
                            className="btn-primary w-full py-2.5 text-base mt-2 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                        >
                            {dangXuLy ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Đang xác thực...
                                </span>
                            ) : 'Đăng Nhập'}
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

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-slideDown { animation: slideDown 0.3s ease-out; }
            `}</style>
        </div>
    );
}

