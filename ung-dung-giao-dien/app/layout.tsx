import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '../lib/i18n';
import { AuthProvider } from '../lib/auth-context';
import HeaderNav from './components/header-nav';
import Sidebar from './components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'RutGonLink',
    description: 'RutGonLink - Two-sided URL Shortener Platform',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary selection:text-white`}>
                <AuthProvider>
                    <I18nProvider>
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
                                            <a href="/" className="font-bold text-primary text-xl tracking-tight">RG Link</a>
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
                    </I18nProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
