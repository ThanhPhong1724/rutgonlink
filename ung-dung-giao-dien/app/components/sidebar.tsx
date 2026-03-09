'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
    LayoutDashboard,
    WalletCards,
    ArrowDownToLine,
    ArrowUpFromLine,
    User,
    Users,
    Settings,
    Sliders,
    CheckSquare,
    Link as LinkIcon,
    Megaphone,
    Package
} from 'lucide-react';

const menuR10 = [
    { href: '/', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { href: '/chien-dich', label: 'Chiến Dịch Traffic', icon: Megaphone },
    { href: '/nap-tien', label: 'Nạp số dư', icon: ArrowDownToLine },
    { href: '/ho-so', label: 'Thông tin cá nhân', icon: User },
];

const menuR20 = [
    { href: '/', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { href: '/quan-ly-link', label: 'Quản lý Liên kết', icon: LinkIcon },
    { href: '/rut-tien', label: 'Rút tiền doanh thu', icon: ArrowUpFromLine },
    { href: '/ho-so', label: 'Hồ sơ & Thanh toán', icon: User },
];

const menuR30 = [
    { href: '/', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { href: '/admin/nguoi-dung', label: 'Quản lý tài khoản', icon: Users },
    { href: '/admin/chien-dich', label: 'Quản lý chiến dịch', icon: Megaphone },
    { href: '/admin/lien-ket', label: 'Quản lý link rút gọn', icon: LinkIcon },
    { href: '/admin/nap-tien', label: 'Duyệt nạp tiền', icon: CheckSquare },
    { href: '/admin/rut-tien', label: 'Duyệt rút tiền', icon: CheckSquare },
    { href: '/admin/goi-thoi-gian', label: 'Cấu Hình Gói', icon: Package },
    { href: '/admin/cau-hinh', label: 'Cấu hình hệ thống', icon: Sliders },
    { href: '/ho-so', label: 'Cấu hình Admin', icon: Settings },
];

export default function Sidebar() {
    const { nguoiDung } = useAuth();
    const pathname = usePathname();

    if (!nguoiDung) return null;

    const loai = nguoiDung.loai_tai_khoan;
    const menu = ['R30', 'R40'].includes(loai) ? menuR30 : loai === 'R20' ? menuR20 : menuR10;

    return (
        <aside className="w-64 max-w-xs shrink-0 bg-surface border-r border-border hidden md:flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-border">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-sm">
                        TS
                    </div>
                    <span className="font-bold text-lg tracking-tight text-foreground">Traffict SEO</span>
                </Link>
            </div>

            {/* Navigation Menus */}
            <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
                <div className="px-3 pb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Menu Chính
                </div>
                {menu.map((item) => {
                    // Cải tiến logic active (strict hơn với trang chủ '/')
                    const active = item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${active
                                ? 'bg-primary-light text-primary'
                                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-text-muted'}`} strokeWidth={active ? 2.5 : 2} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-border mt-auto">
                <div className="bg-surface-hover rounded-lg p-3 text-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {nguoiDung.ten_hien_thi.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="truncate font-semibold text-text-primary">{nguoiDung.ten_hien_thi}</p>
                        <p className="truncate text-xs text-text-muted">{nguoiDung.loai_tai_khoan}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

