'use client';

import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, ShieldAlert, AlertCircle } from 'lucide-react';

export default function DangKyPage() {
    const { dangKy } = useAuth();
    const router = useRouter();
    const [tenHienThi, setTenHienThi] = useState('');
    const [thuDienTu, setThuDienTu] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [loaiTaiKhoan, setLoaiTaiKhoan] = useState('R10');
    const [loi, setLoi] = useState('');
    const [dangXuLy, setDangXuLy] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoi('');
        setDangXuLy(true);
        try {
            await dangKy({
                thu_dien_tu: thuDienTu,
                mat_khau: matKhau,
                ten_hien_thi: tenHienThi,
                loai_tai_khoan: loaiTaiKhoan,
            });
            router.push('/');
        } catch (err: any) {
            setLoi(err.thong_diep || 'Đã có lỗi xảy ra');
        } finally {
            setDangXuLy(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[480px]">
                {/* Header branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success-light mb-4">
                        <UserPlus className="w-8 h-8 text-success" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Tạo tài khoản mới</h1>
                    <p className="text-text-secondary mt-2">Bắt đầu kiếm tiền và quản lý liên kết ngay hôm nay</p>
                </div>

                <div className="card p-6 sm:p-8">
                    {loi && (
                        <div className="mb-6 p-4 rounded-lg bg-error-light/50 border border-error-light flex items-start gap-3 text-error">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{loi}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2 space-y-1.5">
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 space-y-1.5">
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 space-y-1.5">
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 space-y-1.5">
                                <label className="block text-sm font-semibold text-text-primary">Mục đích sử dụng</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ShieldAlert className="h-5 w-5 text-text-muted" />
                                    </div>
                                    <select
                                        value={loaiTaiKhoan}
                                        onChange={(e) => setLoaiTaiKhoan(e.target.value)}
                                        className="input-field pl-10 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_12px_center]"
                                    >
                                        <option value="R10">Người nhấp link (Khách quảng cáo)</option>
                                        <option value="R20">Nhà xuất bản (Tạo link & Kiếm tiền)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={dangXuLy}
                            className="btn-primary w-full py-2.5 text-base mt-4"
                        >
                            {dangXuLy ? 'Đang tạo tài khoản...' : 'Hoàn Tất Đăng Ký'}
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
        </div>
    );
}
