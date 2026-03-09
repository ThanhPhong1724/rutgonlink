'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import Sidebar from './sidebar';
import HeaderNav from './header-nav';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import { useEffect, useState } from 'react';
import '../../public/homepage.css'; // Import the homepage styles

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { nguoiDung } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Routes that use the specific trafficseo.online public layout
    const publicPaths = ['/traffic-user-la-gi', '/huong-dan', '/cau-hoi-thuong-gap'];

    // Routes that need no layout at all (auth pages have their own full screen design)
    const barePaths = ['/dang-nhap', '/dang-ky', '/quen-mat-khau'];

    // We only know if they are a guest after mounting (to avoid hydration mismatch)
    // But actually, we need to return something consistent. For `/`, if !nguoiDung, we show public landing.
    const isPublicPath = publicPaths.includes(pathname);
    const isHomePage = pathname === '/';
    const isBarePath = barePaths.includes(pathname) || pathname.startsWith('/go');
    const isPublicLanding = isPublicPath || (isHomePage && !nguoiDung);

    if (isBarePath) {
        return <>{children}</>;
    }
    // For `/`, it depends on client-side state. Let's wait for mount.
    if (!mounted && isHomePage) {
        return null; // Or a simple loading spinner if preferred, but null prevents flash.
    }

    if (isPublicLanding) {
        return (
            <div className="public-layout-root text-ink-muted bg-[var(--cream)] w-full antialiased font-[var(--font-b)]">
                <PublicHeader />
                <main id="content" role="main" className="pt-[68px]">
                    {children}
                </main>
                <PublicFooter />
            </div>
        );
    }

    // Default Dashboard / Auth layout (existing)
    return (
        <div className="flex min-h-screen bg-surface-hover">
            {/* Khối Sidebar (Menu trái) */}
            <Sidebar />

            {/* Khối Nội dung chính */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header / Top Nav */}
                <header className="sticky top-0 z-40 w-full bg-surface border-b border-border shadow-sm">
                    <div className="flex h-16 items-center justify-between px-6">

                        {/* Mobile menu toggle button placeholder */}
                        <div className="flex items-center md:hidden">
                            <button className="text-text-secondary hover:text-text-primary">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                            </button>
                        </div>

                        {/* Logo on mobile only, since Sidebar handles it on Desktop */}
                        <div className="md:hidden flex items-center">
                            <a href="/" className="font-bold text-primary text-xl tracking-tight">TS Link</a>
                        </div>

                        <div className="flex-1"></div> {/* Spacer */}

                        {/* User Nav (Profile, Balance, Logout) */}
                        <div className="flex items-center space-x-4">
                            <HeaderNav />
                        </div>
                    </div>
                </header>

                {/* Main Content Canvas */}
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden overflow-y-auto w-full">
                    <div className="mx-auto max-w-6xl w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
