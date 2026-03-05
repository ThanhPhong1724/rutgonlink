import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '../lib/i18n';
import { AuthProvider } from '../lib/auth-context';
import AppShell from './components/app-shell';

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
                        <AppShell>
                            {children}
                        </AppShell>
                    </I18nProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
