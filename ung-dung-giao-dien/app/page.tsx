'use client';

import { useAuth } from '../lib/auth-context';
import Link from 'next/link';
import {
    LayoutDashboard,
    Link as LinkIcon,
    WalletCards,
    TrendingUp,
    Users,
    ArrowRight
} from 'lucide-react';

export default function Home() {
    const { nguoiDung } = useAuth();

    if (!nguoiDung) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center px-4">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <LinkIcon className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    RutGonLink <span className="text-primary">Platform</span>
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                    Nền tảng quản lý liên kết rút gọn và phân phối chiến dịch quảng cáo ưu việt. Tối ưu thu nhập, đo lường chính xác.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <Link href="/dang-nhap" className="btn-primary w-full sm:w-auto px-8 py-3 text-base">
                        Đăng nhập hệ thống
                    </Link>
                    <Link href="/dang-ky" className="btn-outline w-full sm:w-auto px-8 py-3 text-base bg-surface">
                        Mở tài khoản ngay
                    </Link>
                </div>
            </div>
        );
    }

    // Role-based quick stats & links
    const isPublisher = nguoiDung.loai_tai_khoan === 'R20';
    const isAdmin = ['R30', 'R40'].includes(nguoiDung.loai_tai_khoan);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Bảng Điều Khiển</h1>
                    <p className="text-text-secondary mt-1">
                        Xin chào trở lại, <span className="font-semibold text-text-primary">{nguoiDung.ten_hien_thi}</span>!
                    </p>
                </div>
                {isPublisher && (
                    <Link href="/quan-ly-link" className="btn-primary">
                        <LinkIcon className="w-4 h-4 mr-2" /> Tạo Link Mới
                    </Link>
                )}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="card p-5 flex items-start justify-between card-hover cursor-default">
                    <div>
                        <p className="text-sm font-medium text-text-muted mb-1">Loại Tài Khoản</p>
                        <h3 className="text-lg font-bold text-text-primary">
                            {isAdmin ? 'Quản Trị Viên' : isPublisher ? 'Nhà Xuất Bản R20' : 'Người Dùng Tự Do R10'}
                        </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
                        <Users className="w-5 h-5" />
                    </div>
                </div>

                <div className="card p-5 flex items-start justify-between card-hover cursor-default">
                    <div>
                        <p className="text-sm font-medium text-text-muted mb-1">Trạng thái định danh</p>
                        <h3 className="text-lg font-bold text-success flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-success"></span> Đã hoạt động
                        </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center text-success">
                        <LayoutDashboard className="w-5 h-5" />
                    </div>
                </div>

                {isPublisher && (
                    <div className="card p-5 flex items-start justify-between card-hover cursor-default">
                        <div>
                            <p className="text-sm font-medium text-text-muted mb-1">Liên Kết Thu Nhập</p>
                            <h3 className="text-2xl font-bold text-text-primary">Khả dụng</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center text-warning">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions / Shortcuts */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">Lối tắt chức năng</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isPublisher && (
                        <Link href="/quan-ly-link" className="card p-6 flex items-center gap-4 hover:border-primary/40 hover:bg-surface-hover transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <LinkIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-text-primary">Quản lý Liên Kết</h4>
                                <p className="text-sm text-text-secondary mt-0.5">Tạo và theo dõi link rút gọn</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                        </Link>
                    )}

                    {!isPublisher && !isAdmin && (
                        <Link href="/nap-tien" className="card p-6 flex items-center gap-4 hover:border-primary/40 hover:bg-surface-hover transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-success-light flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                                <WalletCards className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-text-primary">Nạp Số Dư</h4>
                                <p className="text-sm text-text-secondary mt-0.5">Thêm tiền vào ví giao dịch</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-success transition-colors" />
                        </Link>
                    )}

                    {isPublisher && (
                        <Link href="/rut-tien" className="card p-6 flex items-center gap-4 hover:border-primary/40 hover:bg-surface-hover transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center text-warning group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-text-primary">Rút Tiền Doanh Thu</h4>
                                <p className="text-sm text-text-secondary mt-0.5">Quy đổi doanh thu link</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-warning transition-colors" />
                        </Link>
                    )}

                    <Link href="/ho-so" className="card p-6 flex items-center gap-4 hover:border-primary/40 hover:bg-surface-hover transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-text-primary">Thông Tin Cá Nhân</h4>
                            <p className="text-sm text-text-secondary mt-0.5">Quản lý tài khoản & Mật khẩu</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-indigo-600 transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
