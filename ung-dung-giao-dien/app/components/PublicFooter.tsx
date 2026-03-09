import Link from 'next/link';

export default function PublicFooter() {
    return (
        <footer className="ft-area" role="contentinfo">
            <div className="w">
                <div className="ft-grid">
                    <div className="ft-brand">
                        <Link href="/" className="brand">
                            <div style={{
                                width: '34px', height: '34px', borderRadius: '8px',
                                background: '#7c3aed', color: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                            }}>
                                TS
                            </div>
                            <span className="brand-name" style={{ color: '#be63f9', fontSize: '1.1rem', fontWeight: 600 }}>Traffict SEO</span>
                        </Link>
                        <p>Nền tảng quản lý liên kết rút gọn và phân phối chiến dịch quảng cáo ưu việt. Tối ưu thu nhập, đo lường chính xác.</p>
                    </div>
                    <nav className="ft-cols" aria-label="Footer navigation">
                        <div className="ft-col">
                            <h4>Dịch vụ</h4>
                            <ul>
                                <li><Link href="/#dichvu">Traffic Keyword</Link></li>
                                <li><Link href="/#dichvu">Traffic Direct</Link></li>
                                <li><Link href="/#dichvu">Traffic Social</Link></li>
                                <li><Link href="/#banggia">Bảng giá</Link></li>
                            </ul>
                        </div>
                        <div className="ft-col">
                            <h4>Hỗ trợ</h4>
                            <ul>
                                <li><Link href="/traffic-user-la-gi">Giới thiệu</Link></li>
                                <li><Link href="/huong-dan">Hướng dẫn</Link></li>
                                <li><Link href="/cau-hoi-thuong-gap">FAQ</Link></li>
                                <li><a href="#">Điều khoản</a></li>
                            </ul>
                        </div>
                        <div className="ft-col">
                            <h4>Tài khoản</h4>
                            <ul>
                                <li><Link href="/dang-nhap">Đăng nhập</Link></li>
                                <li><Link href="/dang-ky">Đăng ký</Link></li>
                                <li><a href="#">Affiliate</a></li>
                                <li><a href="https://t.me/DevVipIT1" target="_blank" rel="noopener noreferrer">Liên hệ</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="ft-bottom">
                    <p>&copy; {new Date().getFullYear()} Traffict SEO. All rights reserved.</p>
                    <div className="ft-social" role="navigation" aria-label="Mạng xã hội">
                        <a href="https://t.me/DevVipIT1" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><i className="fab fa-telegram"></i></a>
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
