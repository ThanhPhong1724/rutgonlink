'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth-context';
import apiClient from '../../lib/api-client';
import {
    User,
    Mail,
    Phone,
    Lock,
    KeyRound,
    ShieldCheck,
    Save,
    CheckCircle2,
    AlertCircle,
    UserCircle2,
    Landmark
} from 'lucide-react';

export default function HoSoPage() {
    const { nguoiDung, capNhatNguoiDungContext } = useAuth();
    const [tenHienThi, setTenHienThi] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [matKhauCu, setMatKhauCu] = useState('');
    const [matKhauMoi, setMatKhauMoi] = useState('');
    const [nhacLaiMatKhau, setNhacLaiMatKhau] = useState('');

    // Payment config states
    const [nganHang, setNganHang] = useState('');
    const [soTaiKhoan, setSoTaiKhoan] = useState('');
    const [tenChuTk, setTenChuTk] = useState('');
    const [viUsdt, setViUsdt] = useState('');
    const [mangUsdt, setMangUsdt] = useState('TRC20');

    // Status states
    const [trangThaiHS, setTrangThaiHS] = useState<{ loai: 'thanhCung' | 'loi' | '', text: string }>({ loai: '', text: '' });
    const [trangThaiMK, setTrangThaiMK] = useState<{ loai: 'thanhCung' | 'loi' | '', text: string }>({ loai: '', text: '' });

    const [dangCapNhat, setDangCapNhat] = useState(false);
    const [dangDoiMK, setDangDoiMK] = useState(false);

    useEffect(() => {
        if (nguoiDung) {
            setTenHienThi(nguoiDung.ten_hien_thi || '');
            setSoDienThoai(nguoiDung.so_dien_thoai || '');
            if (nguoiDung.cau_hinh_rut_tien) {
                setNganHang(nguoiDung.cau_hinh_rut_tien.ngan_hang || '');
                setSoTaiKhoan(nguoiDung.cau_hinh_rut_tien.so_tai_khoan || '');
                setTenChuTk(nguoiDung.cau_hinh_rut_tien.ten_chu_tai_khoan || '');
                setViUsdt(nguoiDung.cau_hinh_rut_tien.vi_usdt || '');
                setMangUsdt(nguoiDung.cau_hinh_rut_tien.mang_usdt || 'TRC20');
            }
        }
    }, [nguoiDung]);

    if (!nguoiDung) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <UserCircle2 className="w-12 h-12 text-border mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">Yêu cầu đăng nhập</h3>
                <p className="text-text-secondary mb-4">Vui lòng đăng nhập để xem thông tin hồ sơ.</p>
                <a href="/dang-nhap" className="btn-primary">Đăng nhập ngay</a>
            </div>
        );
    }

    const capNhatThongTin = async (e: React.FormEvent) => {
        e.preventDefault();
        setDangCapNhat(true);
        setTrangThaiHS({ loai: '', text: '' });
        try {
            const payload: any = {
                ten_hien_thi: tenHienThi,
                so_dien_thoai: soDienThoai || undefined,
            };

            if (nguoiDung?.loai_tai_khoan === 'R20') {
                payload.cau_hinh_rut_tien = {
                    ngan_hang: nganHang,
                    so_tai_khoan: soTaiKhoan,
                    ten_chu_tai_khoan: tenChuTk,
                    vi_usdt: viUsdt,
                    mang_usdt: mangUsdt,
                };
            }

            const response: any = await apiClient.patch('/api/v1/nguoi-dung/ho-so', payload);
            if (response && response.ma_cong_khai) {
                // Update React context directly
                capNhatNguoiDungContext(response);
            }

            setTrangThaiHS({ loai: 'thanhCung', text: 'Cập nhật thông tin thành công!' });
        } catch (err: any) {
            setTrangThaiHS({ loai: 'loi', text: err.thong_diep || 'Có lỗi xảy ra khi cập nhật' });
        } finally {
            setDangCapNhat(false);
        }
    };

    const doiMatKhau = async (e: React.FormEvent) => {
        e.preventDefault();
        if (matKhauMoi !== nhacLaiMatKhau) {
            setTrangThaiMK({ loai: 'loi', text: 'Mật khẩu mới không khớp' });
            return;
        }
        if (matKhauMoi.length < 6) {
            setTrangThaiMK({ loai: 'loi', text: 'Mật khẩu phải có ít nhất 6 ký tự' });
            return;
        }

        setDangDoiMK(true);
        setTrangThaiMK({ loai: '', text: '' });
        try {
            await apiClient.patch('/api/v1/nguoi-dung/doi-mat-khau', {
                mat_khau_cu: matKhauCu,
                mat_khau_moi: matKhauMoi,
            });
            setTrangThaiMK({ loai: 'thanhCung', text: 'Đổi mật khẩu thành công!' });
            setMatKhauCu('');
            setMatKhauMoi('');
            setNhacLaiMatKhau('');
        } catch (err: any) {
            setTrangThaiMK({ loai: 'loi', text: err.thong_diep || 'Lỗi đổi mật khẩu' });
        } finally {
            setDangDoiMK(false);
        }
    };

    const renderThongBao = (trangThai: { loai: 'thanhCung' | 'loi' | '', text: string }) => {
        if (!trangThai.text) return null;
        const isError = trangThai.loai === 'loi';
        return (
            <div className={`mb-5 p-3.5 rounded-lg flex items-start gap-2 text-sm font-medium ${isError
                ? 'bg-error-light/50 border border-error-light text-error'
                : 'bg-success-light/50 border border-success-light text-success'
                }`}>
                {isError ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
                <p>{trangThai.text}</p>
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Hồ Sơ Của Tôi</h1>
                <p className="text-text-secondary mt-1">
                    Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cập Nhật Thông Tin */}
                <div className="flex-1 space-y-6">
                    <div className="card p-6">
                        <div className="flex items-center gap-2 mb-6 text-primary border-b border-border pb-4">
                            <User className="w-6 h-6" />
                            <h2 className="font-bold text-lg text-foreground">Thông tin cá nhân</h2>
                        </div>

                        {renderThongBao(trangThaiHS)}

                        <form onSubmit={capNhatThongTin} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-text-primary">Tên hiển thị</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={tenHienThi}
                                        onChange={(e) => setTenHienThi(e.target.value)}
                                        className="input-field pl-9"
                                        placeholder="Nhập tên hiển thị của bạn"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-text-primary">Địa chỉ Email</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="email"
                                        value={nguoiDung.thu_dien_tu}
                                        disabled
                                        className="input-field pl-9 bg-surface-hover opacity-80 cursor-not-allowed text-text-secondary border-border"
                                    />
                                </div>
                                <p className="text-xs text-text-muted mt-1">Email không thể thay đổi sau khi đăng ký.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-text-primary">Số điện thoại</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={soDienThoai}
                                        onChange={(e) => setSoDienThoai(e.target.value)}
                                        className="input-field pl-9 font-mono"
                                        placeholder="Nhập số điện thoại liên hệ"
                                    />
                                </div>
                            </div>

                            {nguoiDung.loai_tai_khoan === 'R20' && (
                                <div className="mt-8">
                                    <div className="pt-4 pb-2">
                                        <hr className="border-border" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 mb-4 text-success border-border pb-2">
                                        <Landmark className="w-5 h-5" />
                                        <h3 className="font-bold text-base text-foreground">Tài khoản & Ví nhận tiền</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-text-primary">Ngân hàng thụ hưởng</label>
                                            <input
                                                type="text"
                                                value={nganHang}
                                                onChange={(e) => setNganHang(e.target.value)}
                                                className="input-field"
                                                placeholder="VD: Vietcombank, MBBank..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-semibold text-text-primary">Số tài khoản</label>
                                                <input
                                                    type="text"
                                                    value={soTaiKhoan}
                                                    onChange={(e) => setSoTaiKhoan(e.target.value)}
                                                    className="input-field font-mono"
                                                    placeholder="Nhập STK"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-semibold text-text-primary">Tên chủ tài khoản</label>
                                                <input
                                                    type="text"
                                                    value={tenChuTk}
                                                    onChange={(e) => setTenChuTk(e.target.value)}
                                                    className="input-field uppercase"
                                                    placeholder="VD: NGUYEN VAN A"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-text-primary">Ví USDT nhận tiền</label>
                                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                                <select
                                                    className="input-field w-full sm:w-32 shrink-0 bg-surface-hover cursor-pointer"
                                                    value={mangUsdt}
                                                    onChange={(e) => setMangUsdt(e.target.value)}
                                                >
                                                    <option value="TRC20">TRC20</option>
                                                    <option value="BEP20">BEP20</option>
                                                    <option value="ERC20">ERC20</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    value={viUsdt}
                                                    onChange={(e) => setViUsdt(e.target.value)}
                                                    className="input-field font-mono flex-1"
                                                    placeholder="Nhập địa chỉ ví USDT..."
                                                />
                                            </div>
                                            <p className="text-xs text-text-muted mt-1 leading-relaxed">Chỉ hỗ trợ chuyển tiền cho các mạng được liệt kê ở trên.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={dangCapNhat}
                                    className="btn-primary w-full py-2.5 flex justify-center items-center gap-2"
                                >
                                    {dangCapNhat ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Save className="w-5 h-5" />
                                    )}
                                    {dangCapNhat ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Đổi Mật Khẩu — ẩn nếu tài khoản Google */}
                <div className="flex-1 space-y-6">
                    {nguoiDung?.phuong_thuc_dang_ky === 'google' ? (
                        <div className="card p-6 border-l-4 border-l-primary">
                            <div className="flex items-center gap-2 mb-4 text-primary">
                                <ShieldCheck className="w-6 h-6" />
                                <h2 className="font-bold text-lg text-foreground">Bảo Mật Tài Khoản</h2>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-surface-hover rounded-lg border border-border">
                                <svg width="24" height="24" viewBox="0 0 24 24" className="shrink-0">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">Đăng nhập bằng Google</p>
                                    <p className="text-xs text-text-muted mt-0.5">Tài khoản của bạn được bảo mật qua Google. Không cần mật khẩu riêng.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card p-6 border-l-4 border-l-warning-dark">
                            <div className="flex items-center gap-2 mb-6 text-warning-dark border-b border-border pb-4">
                                <ShieldCheck className="w-6 h-6" />
                                <h2 className="font-bold text-lg text-foreground">Bảo Mật & Mật Khẩu</h2>
                            </div>

                            {renderThongBao(trangThaiMK)}

                            <form onSubmit={doiMatKhau} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-text-primary">Mật khẩu hiện tại <span className="text-error">*</span></label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="password"
                                            value={matKhauCu}
                                            onChange={(e) => setMatKhauCu(e.target.value)}
                                            className="input-field pl-9"
                                            placeholder="Nhập mật khẩu cũ để xác thực"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <label className="block text-sm font-semibold text-text-primary">Mật khẩu mới <span className="text-error">*</span></label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                            <KeyRound className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="password"
                                            value={matKhauMoi}
                                            onChange={(e) => setMatKhauMoi(e.target.value)}
                                            className="input-field pl-9"
                                            placeholder="Ít nhất 6 ký tự"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-text-primary">Xác nhận mật khẩu mới <span className="text-error">*</span></label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                            <KeyRound className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="password"
                                            value={nhacLaiMatKhau}
                                            onChange={(e) => setNhacLaiMatKhau(e.target.value)}
                                            className={`input-field pl-9 ${nhacLaiMatKhau && matKhauMoi !== nhacLaiMatKhau ? 'border-error focus:ring-error/20 bg-error-light/10' : ''}`}
                                            placeholder="Nhập lại mật khẩu mới"
                                            required
                                        />
                                    </div>
                                    {nhacLaiMatKhau && matKhauMoi !== nhacLaiMatKhau && (
                                        <p className="text-xs text-error mt-1">Mật khẩu không khớp.</p>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={dangDoiMK || (matKhauMoi !== nhacLaiMatKhau && nhacLaiMatKhau !== '')}
                                        className="btn-primary bg-warning-dark hover:bg-warning-dark/90 text-white w-full py-2.5 flex justify-center items-center gap-2 border-transparent disabled:bg-surface-hover disabled:text-text-muted"
                                    >
                                        {dangDoiMK ? (
                                            <div className="w-5 h-5 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Lock className="w-5 h-5" />
                                        )}
                                        {dangDoiMK ? 'Đang xử lý...' : 'Đổi Mật Khẩu'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

