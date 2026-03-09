import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Chuyển Hướng Liên Kết',
    description: 'Hệ thống chuyển hướng an toàn và tin cậy.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={`${inter.className} bg-background text-foreground antialiased`}>
                <main className="flex min-h-screen flex-col items-center justify-center p-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
