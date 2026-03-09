'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PublicHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
            <header className="hd">
                <div className="w">
                    <Link href="/" className="brand">
                        <div style={{
                            width: '34px', height: '34px', borderRadius: '8px',
                            background: '#7c3aed', color: 'white', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                        }}>
                            TS
                        </div>
                        <span className="brand-name" style={{ color: '#be63f9', fontSize: '1.25rem', fontWeight: 600 }}>Traffict SEO</span>
                    </Link>
                    <nav className="hd-nav" aria-label="Menu chính">
                        <Link href="/traffic-user-la-gi">Giới thiệu</Link>
                        <Link href="/#dichvu">Dịch vụ</Link>
                        <Link href="/#banggia">Bảng giá</Link>
                        <Link href="/huong-dan">Hướng dẫn</Link>
                        <Link href="/cau-hoi-thuong-gap">FAQ</Link>
                    </nav>
                    <div className="hd-acts">
                        <Link href="/dang-nhap" className="btn btn-o">Đăng nhập</Link>
                        <Link href="/dang-ky" className="btn btn-p">Đăng ký miễn phí</Link>
                    </div>
                    <button
                        className="mob-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </header>

            <div className={`mob-menu ${menuOpen ? 'open' : ''}`} id="mm">
                <Link href="/traffic-user-la-gi" onClick={() => setMenuOpen(false)}>Giới thiệu</Link>
                <Link href="/#dichvu" onClick={() => setMenuOpen(false)}>Dịch vụ</Link>
                <Link href="/#banggia" onClick={() => setMenuOpen(false)}>Bảng giá</Link>
                <Link href="/huong-dan" onClick={() => setMenuOpen(false)}>Hướng dẫn</Link>
                <Link href="/cau-hoi-thuong-gap" onClick={() => setMenuOpen(false)}>FAQ</Link>
                <div className="ma">
                    <Link href="/dang-nhap" className="btn btn-o" style={{ width: '100%' }}>Đăng nhập</Link>
                    <Link href="/dang-ky" className="btn btn-p" style={{ width: '100%' }}>Đăng ký miễn phí</Link>
                </div>
            </div>
        </>
    );
}
