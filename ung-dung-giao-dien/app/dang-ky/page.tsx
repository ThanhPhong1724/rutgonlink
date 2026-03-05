'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, AlertCircle, MousePointerClick, Wallet, CheckCircle2, Sparkles } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

declare global {
    interface Window { google: any; }
}

const GOOGLE_CLIENT_ID = '298818615984-jnb56bh25gnq297e7bnlonbtqmcht2ij.apps.googleusercontent.com';
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

export default function DangKyPage() {
    const { dangKy, dangNhapGoogle } = useAuth();
    const router = useRouter();
    const [tenHienThi, setTenHienThi] = useState('');
    const [thuDienTu, setThuDienTu] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [loaiTaiKhoan, setLoaiTaiKhoan] = useState('R10');
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
            await dangNhapGoogle(response.credential, loaiTaiKhoan);
            router.push('/');
        } catch (err: any) {
            const msg = err?.thong_diep || err?.message || '';
            if (msg.includes('đã được đăng ký') || msg.includes('phương thức khác')) {
                setLoi('Email Google này đã được sử dụng. Vui lòng đăng nhập bằng email/mật khẩu.');
            } else if (msg.includes('loại tài khoản') || msg.includes('chọn')) {
                setLoi('Vui lòng chọn loại tài khoản trước khi đăng ký bằng Google.');
            } else if (msg.includes('Token') || msg.includes('hết hạn')) {
                setLoi('Phiên xác thực Google đã hết hạn. Vui lòng thử lại.');
            } else {
                setLoi(msg || 'Đã có lỗi xảy ra khi đăng ký bằng Google. Vui lòng thử lại.');
            }
        } finally {
            setDangXuLy(false);
        }
    }, [dangNhapGoogle, loaiTaiKhoan, router]);

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

        if (!tenHienThi.trim()) {
            setLoi('Vui lòng nhập tên hiển thị.');
            return;
        }
        if (!thuDienTu.trim()) {
            setLoi('Vui lòng nhập thư điện tử.');
            return;
        }
        if (matKhau.length < 8) {
            setLoi('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }
        if (!turnstileToken) {
            setLoi('Vui lòng xác minh CAPTCHA.');
            return;
        }

        setDangXuLy(true);
        try {
            await dangKy({
                thu_dien_tu: thuDienTu,
                mat_khau: matKhau,
                ten_hien_thi: tenHienThi,
                loai_tai_khoan: loaiTaiKhoan,
                cf_turnstile_response: turnstileToken,
            });
            router.push('/');
        } catch (err: any) {
            const msg = err?.thong_diep || err?.message || '';
            if (msg.includes('đã được đăng ký') || msg.includes('tồn tại')) {
                setLoi('Thư điện tử này đã được đăng ký. Vui lòng dùng email khác hoặc đăng nhập.');
            } else {
                setLoi(msg || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        } finally {
            setDangXuLy(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[520px]">
                {/* Header branding */}
                <div className="text-center mb-8 animate-fadeIn">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-success-light mb-4 shadow-lg shadow-primary/10">
                        <UserPlus className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Tạo tài khoản mới</h1>
                    <p className="text-text-secondary mt-2 flex items-center justify-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-warning" />
                        Bắt đầu kiếm tiền và quản lý liên kết ngay hôm nay
                    </p>
                </div>

                <div className="card p-6 sm:p-8 shadow-xl border border-border/50">
                    {loi && (
                        <div className="mb-6 p-4 rounded-xl bg-error-light/50 border border-error-light flex items-start gap-3 text-error animate-slideDown">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{loi}</p>
                        </div>
                    )}

                    {/* Role selection — prominent cards */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-text-primary mb-3">Chọn mục đích sử dụng</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setLoaiTaiKhoan('R10')}
                                className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-300 overflow-hidden ${loaiTaiKhoan === 'R10'
                                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]'
                                    : 'border-border hover:border-primary/40 hover:bg-surface-hover hover:shadow-sm'
                                    }`}
                            >
                                {loaiTaiKhoan === 'R10' && (
                                    <div className="absolute top-2.5 right-2.5">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 ${loaiTaiKhoan === 'R10' ? 'bg-primary/15' : 'bg-surface-hover group-hover:bg-primary/10'}`}>
                                    <MousePointerClick className={`w-5 h-5 transition-colors duration-300 ${loaiTaiKhoan === 'R10' ? 'text-primary' : 'text-text-muted group-hover:text-primary/70'}`} />
                                </div>
                                <div className="text-sm font-bold text-text-primary">Người mua</div>
                                <div className="text-[11px] text-text-muted mt-0.5 leading-relaxed">Khách quảng cáo</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoaiTaiKhoan('R20')}
                                className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-300 overflow-hidden ${loaiTaiKhoan === 'R20'
                                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]'
                                    : 'border-border hover:border-primary/40 hover:bg-surface-hover hover:shadow-sm'
                                    }`}
                            >
                                {loaiTaiKhoan === 'R20' && (
                                    <div className="absolute top-2.5 right-2.5">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 ${loaiTaiKhoan === 'R20' ? 'bg-primary/15' : 'bg-surface-hover group-hover:bg-primary/10'}`}>
                                    <Wallet className={`w-5 h-5 transition-colors duration-300 ${loaiTaiKhoan === 'R20' ? 'text-primary' : 'text-text-muted group-hover:text-primary/70'}`} />
                                </div>
                                <div className="text-sm font-bold text-text-primary">Nhà xuất bản</div>
                                <div className="text-[11px] text-text-muted mt-0.5 leading-relaxed">Tạo link & Kiếm tiền</div>
                            </button>
                        </div>
                    </div>

                    {/* Google Register Button */}
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
                        {dangXuLy ? 'Đang xử lý...' : 'Đăng ký bằng Google'}
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-surface px-3 text-text-muted font-medium tracking-wider">hoặc đăng ký bằng email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-text-primary">Tên hiển thị</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-text-muted" />
                                </div>
                                <input
                                    type="text"
                                    value={tenHienThi}
                                    onChange={(e) => setTenHienThi(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="Tên của bạn..."
                                />
                            </div>
                        </div>

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
                                    placeholder="email@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-text-primary">Mật khẩu</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-text-muted" />
                                </div>
                                <input
                                    type="password"
                                    value={matKhau}
                                    onChange={(e) => setMatKhau(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="•••••••• (Tối thiểu 8 ký tự)"
                                    minLength={8}
                                />
                            </div>
                            {matKhau && matKhau.length < 8 && (
                                <p className="text-xs text-warning-dark flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-3 h-3" /> Cần thêm {8 - matKhau.length} ký tự nữa
                                </p>
                            )}
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
                            className="btn-primary w-full py-2.5 text-base mt-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                        >
                            {dangXuLy ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Đang tạo tài khoản...
                                </span>
                            ) : 'Hoàn Tất Đăng Ký'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border text-center">
                        <p className="text-sm text-text-secondary">
                            Đã có tài khoản?{' '}
                            <Link href="/dang-nhap" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                                Đăng nhập tại đây
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
