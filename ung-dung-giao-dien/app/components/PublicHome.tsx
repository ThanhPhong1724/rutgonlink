import Link from "next/link";

export default function PublicHome() {
    return (
        <>


            {/*  HERO  */}
            <section className="hero" aria-label="Giới thiệu Traffic SEO">
                <div className="hero-deco hero-deco-1"></div>
                <div className="hero-deco hero-deco-2"></div>
                <div className="w">
                    <div className="hero-grid">
                        <div>
                            <div className="hero-pill"><span className="dot"></span> Đang phục vụ 2,500+ chiến dịch</div>
                            <h1><span className="hl-p">Traffic SEO</span> — Tăng Lượt Truy Cập Thật Cho Website Của Bạn</h1>
                            <p className="hero-sub">Traffic SEO sử dụng người dùng thật tìm từ khóa trên Google, click vào website, ở lại đọc nội dung. <strong>Tăng CTR, giảm bounce rate, đẩy thứ hạng SEO</strong> một cách tự nhiên nhất.</p>
                            <div className="hero-btns">
                                <a href="https://trafficseo.online/dang-ky" className="btn btn-p btn-lg"><i className="fas fa-rocket"></i> Đăng ký miễn phí</a>
                                <a href="#banggia" className="btn btn-o btn-lg"><i className="fas fa-tags"></i> Xem bảng giá</a>
                            </div>
                            <div className="hero-checks">
                                <span className="hero-check"><i className="fas fa-check"></i> 100% người thật</span>
                                <span className="hero-check"><i className="fas fa-check"></i> An toàn cho SEO</span>
                                <span className="hero-check"><i className="fas fa-check"></i> Hoàn tiền 7 ngày</span>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className="globe-wrap">
                                {/*  Rings  */}
                                <div className="globe-ring globe-ring-1"></div>
                                <div className="globe-ring globe-ring-2"></div>
                                <div className="globe-ring globe-ring-3"></div>
                                {/*  Center  */}
                                <div className="globe-center"><i className="fas fa-globe-asia"></i><span>WEBSITE</span></div>
                                {/*  Orbiting nodes  */}
                                <div className="orb-node orb-node-1"><div className="orb-dot c1"></div></div>
                                <div className="orb-node orb-node-2"><div className="orb-dot c2"></div></div>
                                <div className="orb-node orb-node-3"><div className="orb-dot c3"></div></div>
                                <div className="orb-node orb-node-4"><div className="orb-dot c1"></div></div>
                                <div className="orb-node orb-node-5"><div className="orb-dot c4"></div></div>
                                <div className="orb-node orb-node-6"><div className="orb-dot c2"></div></div>
                                {/*  Connection lines  */}
                                <svg className="globe-lines" viewBox="0 0 460 460" role="img" aria-label="Minh họa mạng lưới traffic SEO kết nối người dùng thật đến website">
                                    <title>Traffic SEO Network - Kết nối người dùng thật đến website của bạn</title>
                                    <line x1="230" y1="37" x2="230" y2="145" /><line x1="420" y1="130" x2="290" y2="200" />
                                    <line x1="400" y1="330" x2="290" y2="260" /><line x1="230" y1="423" x2="230" y2="315" />
                                    <line x1="60" y1="330" x2="170" y2="260" /><line x1="40" y1="130" x2="170" y2="200" />
                                </svg>
                                {/*  Info cards  */}
                                <div className="gi-card gi-1"><div className="gi-row"><div className="gi-ico gp"><i className="fas fa-arrow-trend-up"></i></div><div><strong>+45% CTR</strong><small>Tháng này</small></div></div></div>
                                <div className="gi-card gi-2"><div className="gi-row"><div className="gi-ico gt"><i className="fas fa-shield-halved"></i></div><div><strong>Safe SEO</strong><small>0 penalty</small></div></div></div>
                                <div className="gi-card gi-3"><div className="gi-row"><div className="gi-ico gg"><i className="fas fa-users"></i></div><div><strong>12,859</strong><small>Lượt hôm nay</small></div></div></div>
                                {/*  Live ticker  */}
                                <div className="live-ticker"><span className="lt-dot"></span><span>Đang chạy <em>2,500+</em> chiến dịch</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  TRUST  */}
            <section className="trust-bar">
                <div className="w">
                    <div className="trust-row">
                        <div className="trust-item"><span className="trust-val">1,500,000+</span><span className="trust-label">Lượt traffic đã gửi</span></div>
                        <div className="trust-item"><span className="trust-val">2,500+</span><span className="trust-label">Chiến dịch thành công</span></div>
                        <div className="trust-item"><span className="trust-val">99.8%</span><span className="trust-label">Khách hài lòng</span></div>
                        <div className="trust-item"><span className="trust-val">24/7</span><span className="trust-label">Hỗ trợ nhanh chóng</span></div>
                    </div>
                </div>
            </section>

            {/*  PROBLEM / SOLUTION  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-lightbulb"></i> Vấn đề & Giải pháp</span>
                        <h2>Website thiếu traffic <span className="hl">thật</span>? Traffic SEO giúp bạn!</h2>
                        <p>Nội dung tốt nhưng không ai tìm thấy? CTR thấp khiến Google đánh giá website không hấp dẫn? Chúng tôi có giải pháp.</p>
                    </div>
                    <div className="ps-grid">
                        <div className="ps-card problem">
                            <h4><i className="fas fa-exclamation-triangle"></i> Vấn đề bạn đang gặp</h4>
                            <ul className="ps-list">
                                <li><i className="fas fa-times-circle"></i> Website có nội dung tốt nhưng ít người truy cập</li>
                                <li><i className="fas fa-times-circle"></i> Thứ hạng từ khóa mãi không cải thiện dù đã tối ưu SEO</li>
                                <li><i className="fas fa-times-circle"></i> CTR (tỷ lệ click) thấp, Google hạ ranking</li>
                                <li><i className="fas fa-times-circle"></i> Bounce rate cao vì traffic bot không tương tác</li>
                                <li><i className="fas fa-times-circle"></i> Đối thủ vượt lên nhờ nhiều tín hiệu người dùng hơn</li>
                            </ul>
                        </div>
                        <div className="ps-card solution">
                            <h4><i className="fas fa-check-circle"></i> TrafficUser giải quyết</h4>
                            <ul className="ps-list">
                                <li><i className="fas fa-check-circle"></i> Người thật tìm từ khóa, click vào website từ Google</li>
                                <li><i className="fas fa-check-circle"></i> Tăng CTR tự nhiên → Google nâng thứ hạng</li>
                                <li><i className="fas fa-check-circle"></i> Dwell time 60-180s → giảm bounce rate hiệu quả</li>
                                <li><i className="fas fa-check-circle"></i> IP đa dạng toàn quốc, hành vi hoàn toàn tự nhiên</li>
                                <li><i className="fas fa-check-circle"></i> Theo dõi real-time, kiểm soát hoàn toàn chiến dịch</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/*  FEATURES  */}
            <section className="sec">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-sparkles"></i> Điểm mạnh</span>
                        <h2>Vì sao <span className="hl">TrafficUser</span> hiệu quả?</h2>
                    </div>
                    <div className="ft-grid">
                        <div className="ft-card"><div className="ft-icon ip"><i className="fas fa-users"></i></div><h4>Người dùng thật 100%</h4><p>Mọi lượt truy cập đều từ người thật, có hành vi tự nhiên — tìm kiếm, click, cuộn trang, đọc nội dung.</p></div>
                        <div className="ft-card"><div className="ft-icon it"><i className="fas fa-chart-line"></i></div><h4>Tăng CTR từ SERP</h4><p>Người thật click vào website từ kết quả Google, tạo tín hiệu CTR mạnh giúp đẩy ranking tự nhiên.</p></div>
                        <div className="ft-card"><div className="ft-icon ig"><i className="fas fa-stopwatch"></i></div><h4>Dwell Time cao</h4><p>Thời gian ở lại trang 60-180 giây, gửi tín hiệu tích cực đến thuật toán xếp hạng của Google.</p></div>
                        <div className="ft-card"><div className="ft-icon ic"><i className="fas fa-shield-halved"></i></div><h4>An toàn tuyệt đối</h4><p>Không bot, không proxy. Hành vi tự nhiên 100% nên Google không thể phân biệt với traffic organic.</p></div>
                        <div className="ft-card"><div className="ft-icon ip"><i className="fas fa-gauge-high"></i></div><h4>Dashboard trực quan</h4><p>Theo dõi mọi chiến dịch real-time: số lượt, thời gian ở lại, trạng thái — tất cả trên một màn hình.</p></div>
                        <div className="ft-card"><div className="ft-icon it"><i className="fas fa-headset"></i></div><h4>Hỗ trợ mọi lúc</h4><p>Đội ngũ chuyên gia sẵn sàng tư vấn chiến lược traffic qua Telegram, Zalo — phản hồi trong 5 phút.</p></div>
                    </div>
                </div>
            </section>

            {/*  USE CASES  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-bullseye"></i> Ai nên dùng?</span>
                        <h3 className="h2-style">Ai nên dùng <span className="hl">Traffic SEO</span>?</h3>
                        <p>Bất kỳ website nào cần tăng traffic tự nhiên và cải thiện SEO đều có thể sử dụng Traffic SEO.</p>
                    </div>
                    <div className="uc-grid">
                        <div className="uc-card">
                            <span className="uc-emoji">🛒</span>
                            <h4>E-commerce</h4>
                            <p>Đẩy thứ hạng trang sản phẩm, tăng traffic organic miễn phí thay vì chạy ads liên tục.</p>
                        </div>
                        <div className="uc-card">
                            <span className="uc-emoji">🏠</span>
                            <h4>Bất động sản</h4>
                            <p>Ranking top cho từ khóa "mua nhà", "chung cư" tại khu vực — nơi giá click ads rất cao.</p>
                        </div>
                        <div className="uc-card">
                            <span className="uc-emoji">📰</span>
                            <h4>Blog & Tin tức</h4>
                            <p>Tăng pageviews tự nhiên, cải thiện chỉ số cho Google AdSense và quảng cáo display.</p>
                        </div>
                        <div className="uc-card">
                            <span className="uc-emoji">🏥</span>
                            <h4>Y tế & Sức khỏe</h4>
                            <p>Xây dựng authority cho website phòng khám, bệnh viện với traffic tìm kiếm ổn định.</p>
                        </div>
                        <div className="uc-card">
                            <span className="uc-emoji">📚</span>
                            <h4>Giáo dục</h4>
                            <p>Trung tâm, trường học tăng khả năng hiển thị khi phụ huynh tìm kiếm dịch vụ.</p>
                        </div>
                        <div className="uc-card">
                            <span className="uc-emoji">💻</span>
                            <h4>Agency & SEO</h4>
                            <p>Công cụ bổ trợ cho chiến dịch SEO khách hàng — tăng CTR nhanh, tiết kiệm thời gian.</p>
                        </div>
                        <div className="uc-card">
                            <span className="uc-emoji">🎮</span>
                            <h4>Game & App</h4>
                            <p>Tăng traffic landing page, boost tín hiệu cho app store SEO (ASO).</p>
                        </div>
                        <div className="uc-card">
                            <span className="uc-emoji">✈️</span>
                            <h4>Du lịch & Khách sạn</h4>
                            <p>Đẩy ranking từ khóa "tour", "khách sạn" mùa cao điểm hiệu quả gấp 3 lần.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*  HOW TRAFFIC FLOWS  */}
            <section className="sec">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-diagram-project"></i> Quy trình</span>
                        <h3 className="h2-style">Traffic SEO hoạt động <span className="hl">như thế nào?</span></h3>
                        <p>Mô phỏng chính xác hành vi người dùng thật khi tìm kiếm trên Google.</p>
                    </div>
                    <div className="flow-track">
                        <div className="flow-step">
                            <div className="flow-box"><i className="flow-ico fas fa-user"></i><h4>Người thật</h4><p>Mở trình duyệt</p></div>
                            <span className="flow-arrow"><i className="fas fa-chevron-right"></i></span>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box"><i className="flow-ico fab fa-google"></i><h4>Tìm kiếm Google</h4><p>Nhập từ khóa của bạn</p></div>
                            <span className="flow-arrow"><i className="fas fa-chevron-right"></i></span>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box"><i className="flow-ico fas fa-mouse-pointer"></i><h4>Click vào website</h4><p>Từ kết quả SERP</p></div>
                            <span className="flow-arrow"><i className="fas fa-chevron-right"></i></span>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box"><i className="flow-ico fas fa-book-reader"></i><h4>Đọc nội dung</h4><p>Ở lại 60-180 giây</p></div>
                            <span className="flow-arrow"><i className="fas fa-chevron-right"></i></span>
                        </div>
                        <div className="flow-step">
                            <div className="flow-box" style={{ borderColor: 'var(--teal)' }}><i className="flow-ico fas fa-chart-line" style={{ color: 'var(--teal)' }}></i><h4>Google ghi nhận</h4><p>CTR & Dwell Time tăng</p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  SERVICES  */}
            <section className="sec sec-w" id="dichvu" aria-label="Dịch vụ Traffic SEO">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-layer-group"></i> Dịch vụ</span>
                        <h2>3 loại traffic của <span className="hl">Traffic SEO</span> phù hợp mọi mục tiêu</h2>
                        <p>Chọn loại traffic phù hợp chiến lược SEO của bạn. Có thể kết hợp để tạo nguồn traffic đa dạng, tự nhiên nhất.</p>
                    </div>
                    <div className="sv-grid">
                        <div className="sv-card ft">
                            <span className="sv-pop">Phổ biến nhất</span>
                            <div className="sv-top"><div className="sv-ico ck"><i className="fas fa-magnifying-glass"></i></div></div>
                            <h4>Traffic Keyword</h4>
                            <div className="sv-desc">Người thật search Google → Click vào website</div>
                            <ul className="sv-list">
                                <li><i className="fas fa-check"></i> Tìm kiếm từ khóa thực trên Google</li>
                                <li><i className="fas fa-check"></i> Click vào website từ kết quả SERP</li>
                                <li><i className="fas fa-check"></i> Tăng CTR và ranking tự nhiên</li>
                                <li><i className="fas fa-check"></i> Dwell time 60-180 giây</li>
                            </ul>
                            <div className="sv-price">
                                <div className="sv-price-from">Giá từ</div>
                                <div className="sv-price-val">1,200đ <small>/lượt</small></div>
                            </div>
                            <a href="https://trafficseo.online/dang-ky" className="btn btn-p" style={{ width: '100%' }}><i className="fas fa-rocket"></i> Đăng ký ngay</a>
                        </div>
                        <div className="sv-card">
                            <div className="sv-top"><div className="sv-ico cd"><i className="fas fa-link"></i></div></div>
                            <h4>Traffic Direct</h4>
                            <div className="sv-desc">Người thật truy cập trực tiếp URL website</div>
                            <ul className="sv-list">
                                <li><i className="fas fa-check"></i> Truy cập URL website trực tiếp</li>
                                <li><i className="fas fa-check"></i> Chi phí thấp nhất, traffic nhanh</li>
                                <li><i className="fas fa-check"></i> Giảm bounce rate hiệu quả</li>
                                <li><i className="fas fa-check"></i> Phù hợp mọi loại website</li>
                            </ul>
                            <div className="sv-price">
                                <div className="sv-price-from">Giá từ</div>
                                <div className="sv-price-val">1,200đ <small>/lượt</small></div>
                            </div>
                            <a href="https://trafficseo.online/dang-ky" className="btn btn-o" style={{ width: '100%' }}><i className="fas fa-arrow-right"></i> Đăng ký ngay</a>
                        </div>
                        <div className="sv-card">
                            <div className="sv-top"><div className="sv-ico cs"><i className="fas fa-share-nodes"></i></div></div>
                            <h4>Traffic Social</h4>
                            <div className="sv-desc">Referral traffic từ Facebook, TikTok, Twitter</div>
                            <ul className="sv-list">
                                <li><i className="fas fa-check"></i> Referral từ mạng xã hội thật</li>
                                <li><i className="fas fa-check"></i> Đa dạng hóa nguồn traffic</li>
                                <li><i className="fas fa-check"></i> Tự nhiên trên Google Analytics</li>
                                <li><i className="fas fa-check"></i> Tăng social signals</li>
                            </ul>
                            <div className="sv-price">
                                <div className="sv-price-from">Giá từ</div>
                                <div className="sv-price-val">1,200đ <small>/lượt</small></div>
                            </div>
                            <a href="https://trafficseo.online/dang-ky" className="btn btn-o" style={{ width: '100%' }}><i className="fas fa-arrow-right"></i> Đăng ký ngay</a>
                        </div>
                    </div>
                </div>
            </section>

            {/*  PRICING  */}
            <section className="sec" id="banggia" aria-label="Bảng giá dịch vụ">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-wallet"></i> Bảng giá</span>
                        <h2>Chi phí <span className="hl">minh bạch</span>, không phí ẩn</h2>
                        <p>Giá được tính theo lượt truy cập. Mua càng nhiều, giá càng tốt.</p>
                    </div>
                    <div className="pr-wrap">
                        <table>
                            <thead><tr><th>Loại dịch vụ</th><th>Mã 1 bước</th><th>Mã 2 bước</th><th>Mã cố định</th></tr></thead>
                            <tbody>
                                <tr>
                                    <td><i className="fas fa-magnifying-glass" style={{ color: 'var(--purple)', marginRight: '6px' }}></i> Traffic Keyword</td>
                                    <td><span className="pr-v">1,200đ</span></td>
                                    <td><span className="pr-v">1,500đ</span></td>
                                    <td><span className="pr-v">1,200đ</span></td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-link" style={{ color: '#EC4899', marginRight: '6px' }}></i> Traffic Direct</td>
                                    <td><span className="pr-v">1,200đ</span></td>
                                    <td><span className="pr-v">1,500đ</span></td>
                                    <td><span className="pr-v">1,000đ</span></td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-share-nodes" style={{ color: 'var(--teal)', marginRight: '6px' }}></i> Traffic Social</td>
                                    <td><span className="pr-v">1,200đ</span></td>
                                    <td><span className="pr-v">1,200đ</span></td>
                                    <td><span className="pr-v">1,000đ</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: 'var(--ink-light)', fontSize: '.82rem', marginBottom: '1.5rem' }}><strong>Mã 1 bước:</strong> Xác thực nhanh &nbsp;|&nbsp; <strong>Mã 2 bước:</strong> Bảo mật cao &nbsp;|&nbsp; <strong>Mã cố định:</strong> Tự động hoàn toàn</p>
                        <a href="https://trafficseo.online/dang-ky" className="btn btn-p btn-lg"><i className="fas fa-wallet"></i> Nạp tiền & Bắt đầu</a>
                    </div>
                </div>
            </section>

            {/*  PACKAGES  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-cubes"></i> Gói dịch vụ</span>
                        <h3 className="h2-style">Chọn gói phù hợp <span className="hl">ngân sách</span> của bạn</h3>
                        <p>Từ cá nhân đến doanh nghiệp, chúng tôi có gói phù hợp cho mọi nhu cầu.</p>
                    </div>
                    <div className="pkg-grid">
                        <div className="pkg-card">
                            <div className="pkg-name">🌱 Starter</div>
                            <div className="pkg-desc">Dành cho cá nhân, blog, website mới</div>
                            <div className="pkg-price">
                                <div className="pkg-amount">2.5 triệu<small>/tháng</small></div>
                                <div className="pkg-note">~2.500 lượt keyword traffic</div>
                            </div>
                            <ul className="pkg-list">
                                <li><i className="fas fa-check"></i> 2.500 lượt traffic/tháng</li>
                                <li><i className="fas fa-check"></i> 1 loại traffic</li>
                                <li><i className="fas fa-check"></i> Dashboard basic</li>
                                <li><i className="fas fa-check"></i> Hỗ trợ qua Telegram</li>
                                <li><i className="fas fa-check"></i> Báo cáo chi tiết</li>
                                <li><i className="fas fa-check"></i> Account manager</li>
                            </ul>
                            <a href="https://trafficseo.online/dang-ky" className="btn btn-o" style={{ width: '100%' }}>Chọn Starter</a>
                        </div>
                        <div className="pkg-card pkg-pop">
                            <div className="pkg-pop-label">🔥 Được chọn nhiều nhất</div>
                            <div className="pkg-name">🚀 Growth</div>
                            <div className="pkg-desc">Dành cho SME, shop online, agency</div>
                            <div className="pkg-price">
                                <div className="pkg-amount">10 triệu<small>/tháng</small></div>
                                <div className="pkg-note">~10.000 lượt keyword traffic</div>
                            </div>
                            <ul className="pkg-list">
                                <li><i className="fas fa-check"></i> 10.000 lượt traffic/tháng</li>
                                <li><i className="fas fa-check"></i> 3 loại traffic kết hợp</li>
                                <li><i className="fas fa-check"></i> Dashboard nâng cao</li>
                                <li><i className="fas fa-check"></i> Hỗ trợ ưu tiên 24/7</li>
                                <li><i className="fas fa-check"></i> Báo cáo hàng tuần</li>
                                <li><i className="fas fa-check"></i> Account manager</li>
                            </ul>
                            <a href="https://trafficseo.online/dang-ky" className="btn btn-p" style={{ width: '100%' }}><i className="fas fa-rocket"></i> Chọn Growth</a>
                        </div>
                        <div className="pkg-card">
                            <div className="pkg-name">🏢 Enterprise</div>
                            <div className="pkg-desc">Dành cho doanh nghiệp lớn, agency chuyên nghiệp</div>
                            <div className="pkg-price">
                                <div className="pkg-amount">20 triệu<small>/tháng</small></div>
                                <div className="pkg-note">~20.000 lượt keyword traffic</div>
                            </div>
                            <ul className="pkg-list">
                                <li><i className="fas fa-check"></i> 20.000+ lượt traffic/tháng</li>
                                <li><i className="fas fa-check"></i> 3 loại traffic kết hợp</li>
                                <li><i className="fas fa-check"></i> API tích hợp</li>
                                <li><i className="fas fa-check"></i> Account manager riêng</li>
                                <li><i className="fas fa-check"></i> Báo cáo hàng ngày</li>
                                <li><i className="fas fa-check"></i> Tư vấn chiến lược SEO</li>
                            </ul>
                            <a href="https://t.me/DevVipIT1" target="_blank" rel="noopener" className="btn btn-o" style={{ width: '100%' }}><i className="fab fa-telegram"></i> Liên hệ tư vấn</a>
                        </div>
                    </div>
                </div>
            </section>

            {/*  CASE STUDY NUMBERS  */}
            <section className="sec">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-flask"></i> Case Study</span>
                        <h2>Kết quả thực tế từ <span className="hl">khách hàng</span></h2>
                        <p>Số liệu trước và sau khi sử dụng TrafficUser trong 30 ngày.</p>
                    </div>
                    <div className="cs-grid">
                        <div className="cs-card">
                            <div className="cs-label"><i className="fas fa-shopping-bag"></i> Shop thời trang online</div>
                            <div className="cs-row">
                                <div className="cs-metric"><span className="num up">+187%</span><span className="lbl">Organic Traffic</span></div>
                                <div className="cs-metric"><span className="num up">+62%</span><span className="lbl">CTR tăng</span></div>
                                <div className="cs-metric"><span className="num dn">-45%</span><span className="lbl">Bounce Rate</span></div>
                                <div className="cs-metric"><span className="num purple">Top 3</span><span className="lbl">Ranking 5 từ khóa</span></div>
                            </div>
                            <p className="cs-quote">"Từ trang 3 lên top 3 trong 3 tuần. ROI gấp 8 lần so với chạy Google Ads."</p>
                        </div>
                        <div className="cs-card">
                            <div className="cs-label"><i className="fas fa-building"></i> Website bất động sản</div>
                            <div className="cs-row">
                                <div className="cs-metric"><span className="num up">+150%</span><span className="lbl">Organic Traffic</span></div>
                                <div className="cs-metric"><span className="num up">+38%</span><span className="lbl">CTR tăng</span></div>
                                <div className="cs-metric"><span className="num dn">-52%</span><span className="lbl">Bounce Rate</span></div>
                                <div className="cs-metric"><span className="num purple">Top 5</span><span className="lbl">Ranking 12 từ khóa</span></div>
                            </div>
                            <p className="cs-quote">"Traffic keyword thật sự hiệu quả. Website từ 200 lên 3.000 visits/ngày."</p>
                        </div>
                        <div className="cs-card">
                            <div className="cs-label"><i className="fas fa-laptop-code"></i> Agency SEO — 15 clients</div>
                            <div className="cs-row">
                                <div className="cs-metric"><span className="num up">+210%</span><span className="lbl">Avg. Traffic tăng</span></div>
                                <div className="cs-metric"><span className="num up">+55%</span><span className="lbl">CTR trung bình</span></div>
                                <div className="cs-metric"><span className="num dn">-40%</span><span className="lbl">Bounce Rate</span></div>
                                <div className="cs-metric"><span className="num purple">93%</span><span className="lbl">Client hài lòng</span></div>
                            </div>
                            <p className="cs-quote">"Dùng cho toàn bộ danh mục khách hàng. TrafficUser là tool không thể thiếu."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*  INTEGRATIONS  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-puzzle-piece"></i> Tương thích</span>
                        <h3 className="h2-style">Hoạt động với <span className="hl">mọi nền tảng</span></h3>
                        <p>TrafficUser tương thích với tất cả website, CMS và công cụ analytics phổ biến.</p>
                    </div>
                    <div className="intg-row">
                        <div className="intg-item"><div className="intg-ico"><i className="fab fa-google ga"></i></div><span>Google Analytics</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fab fa-google gsc"></i></div><span>Search Console</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fab fa-wordpress wp"></i></div><span>WordPress</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fab fa-shopify sh"></i></div><span>Shopify</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fas fa-code gsc"></i></div><span>Custom HTML</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fab fa-laravel" style={{ color: '#FF2D20' }}></i></div><span>Laravel</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fab fa-wix" style={{ color: '#000' }}></i></div><span>Wix</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fas fa-chart-bar" style={{ color: '#FF6D00' }}></i></div><span>Ahrefs</span></div>
                        <div className="intg-item"><div className="intg-ico"><i className="fas fa-chart-pie" style={{ color: '#5C2D91' }}></i></div><span>SEMrush</span></div>
                    </div>
                </div>
            </section>

            {/*  STEPS  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-route"></i> Cách sử dụng</span>
                        <h3 className="h2-style">Bắt đầu chỉ trong <span className="hl">5 phút</span></h3>
                    </div>
                    <div className="st-grid">
                        <div className="st-card"><div className="st-num"><i className="fas fa-user-plus"></i></div><h4>Tạo tài khoản</h4><p>Đăng ký miễn phí, chỉ cần email</p></div>
                        <div className="st-card"><div className="st-num"><i className="fas fa-wallet"></i></div><h4>Nạp tiền</h4><p>Bank, Momo, VNPAY — cộng tiền tự động</p></div>
                        <div className="st-card"><div className="st-num"><i className="fas fa-bullseye"></i></div><h4>Tạo chiến dịch</h4><p>Nhập URL, từ khóa, chọn gói</p></div>
                        <div className="st-card"><div className="st-num"><i className="fas fa-chart-simple"></i></div><h4>Theo dõi</h4><p>Real-time dashboard, báo cáo chi tiết</p></div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <a href="https://trafficseo.online/dang-ky" className="btn btn-p btn-lg"><i className="fas fa-play-circle"></i> Tạo tài khoản miễn phí</a>
                    </div>
                </div>
            </section>

            {/*  COMPARISON  */}
            <section className="sec">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-scale-balanced"></i> So sánh</span>
                        <h3 className="h2-style">TrafficUser vs Giải pháp khác</h3>
                    </div>
                    <div className="cm-wrap">
                        <table>
                            <thead><tr><th>Tiêu chí</th><th className="hl">✦ TrafficUser</th><th>Traffic Bot</th><th>Google Ads</th></tr></thead>
                            <tbody>
                                <tr><td>Người dùng thật</td><td className="hl"><i className="fas fa-check-circle cm-y"></i></td><td><i className="fas fa-times-circle cm-n"></i></td><td><i className="fas fa-check-circle cm-y"></i></td></tr>
                                <tr><td>An toàn cho SEO</td><td className="hl"><i className="fas fa-check-circle cm-y"></i></td><td><i className="fas fa-times-circle cm-n"></i></td><td><i className="fas fa-check-circle cm-y"></i></td></tr>
                                <tr><td>Tăng CTR tự nhiên</td><td className="hl"><i className="fas fa-check-circle cm-y"></i></td><td><i className="fas fa-times-circle cm-n"></i></td><td><i className="fas fa-times-circle cm-n"></i></td></tr>
                                <tr><td>Chi phí thấp</td><td className="hl"><i className="fas fa-check-circle cm-y"></i></td><td><i className="fas fa-check-circle cm-y"></i></td><td><i className="fas fa-times-circle cm-n"></i></td></tr>
                                <tr><td>Cải thiện ranking</td><td className="hl"><i className="fas fa-check-circle cm-y"></i></td><td><i className="fas fa-times-circle cm-n"></i></td><td><i className="fas fa-times-circle cm-n"></i></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/*  TESTIMONIALS  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-quote-left"></i> Phản hồi</span>
                        <h3 className="h2-style">Khách hàng <span className="hl">tin tưởng</span> sử dụng</h3>
                    </div>
                    <div className="te-grid">
                        <div className="te-card">
                            <div className="te-stars">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>                                            </div>
                            <p className="te-text">"Từ khóa chính lên top 3 sau 2 tuần. Bounce rate giảm rõ rệt. Từ khoá lên top nhanh chóng. Dịch vụ đúng như cam kết."</p>
                            <div className="te-who">
                                <div className="te-av">
                                    <img src="https://trafficseo.online/wp-content/uploads/2026/02/traffic-user-minh-ngoc.jpg" alt="Minh Ngọc" />
                                </div>
                                <div className="te-info"><strong>Minh Ngọc</strong><span>Chủ shop mỹ phẩm</span></div>
                            </div>
                        </div>
                        <div className="te-card">
                            <div className="te-stars">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>                                            </div>
                            <p className="te-text">"Làm SEO 5 năm, đã thử nhiều dịch vụ. TrafficUser cho kết quả tốt nhất, dashboard dễ dùng, support nhanh."</p>
                            <div className="te-who">
                                <div className="te-av">
                                    <img src="https://trafficseo.online/wp-content/uploads/2026/02/linh-chi-traffic-download.jpg" alt="Linh Chi" />
                                </div>
                                <div className="te-info"><strong>Linh Chi</strong><span>SEO Specialist</span></div>
                            </div>
                        </div>
                        <div className="te-card">
                            <div className="te-stars">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>                <i className="fas fa-star-half-alt"></i>                            </div>
                            <p className="te-text">"Organic traffic tăng 150% sau 1 tháng sử dụng cho website bất động sản. Giá hợp lý, hiệu quả vượt kỳ vọng."</p>
                            <div className="te-who">
                                <div className="te-av">
                                    <img src="https://trafficseo.online/wp-content/uploads/2026/02/traffic-download-thanh-tung.jpg" alt="Thanh Tùng" />
                                </div>
                                <div className="te-info"><strong>Thanh Tùng</strong><span>SEO Manager</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  DASHBOARD PREVIEW  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="dash-layout">
                        {/*  Left: mockup  */}
                        <div className="dash-mockup">
                            <div className="dash-chrome">
                                <div className="dash-dots"><span></span><span></span><span></span></div>
                                <div className="dash-url"><i className="fas fa-lock"></i> app.trafficseo.online/dashboard</div>
                            </div>
                            <div className="dash-body">
                                <div className="dash-sidebar">
                                    <div className="dash-logo"><i className="fas fa-bolt"></i> TU</div>
                                    <div className="dash-nav-item active"><i className="fas fa-chart-pie"></i><span>Tổng quan</span></div>
                                    <div className="dash-nav-item"><i className="fas fa-bullseye"></i><span>Chiến dịch</span></div>
                                    <div className="dash-nav-item"><i className="fas fa-wallet"></i><span>Nạp tiền</span></div>
                                    <div className="dash-nav-item"><i className="fas fa-clock-rotate-left"></i><span>Lịch sử</span></div>
                                    <div className="dash-nav-item"><i className="fas fa-cog"></i><span>Cài đặt</span></div>
                                </div>
                                <div className="dash-main">
                                    <div className="dash-stats">
                                        <div className="ds-card"><div className="ds-ico" style={{ background: '#EEF2FF', color: '#6366F1' }}><i className="fas fa-key"></i></div><div className="ds-text"><div className="ds-label">Từ khóa/URL</div><div className="ds-val">3 / 16</div></div></div>
                                        <div className="ds-card"><div className="ds-ico" style={{ background: '#FEF3C7', color: '#D97706' }}><i className="fas fa-bullhorn"></i></div><div className="ds-text"><div className="ds-label">Chiến dịch</div><div className="ds-val">3 / 16</div></div></div>
                                        <div className="ds-card"><div className="ds-ico" style={{ background: '#FFEDD5', color: '#EA580C' }}><i className="fas fa-calendar-check"></i></div><div className="ds-text"><div className="ds-label">Đã chạy hôm nay</div><div className="ds-val">20 / 70</div></div></div>
                                        <div className="ds-card"><div className="ds-ico" style={{ background: '#D1FAE5', color: '#059669' }}><i className="fas fa-chart-line"></i></div><div className="ds-text"><div className="ds-label">Tổng đã chạy</div><div className="ds-val">235</div></div></div>
                                    </div>
                                    <div className="dash-chart-area">
                                        <div className="dca-head"><span className="dca-title"><i className="fas fa-chart-area" style={{ color: 'var(--purple)' }}></i> Traffic 7 ngày</span></div>
                                        <div className="dca-bars">
                                            <div className="dca-bar-group"><div className="dca-bar" style={{ height: '45%' }}></div><span>T2</span></div>
                                            <div className="dca-bar-group"><div className="dca-bar" style={{ height: '62%' }}></div><span>T3</span></div>
                                            <div className="dca-bar-group"><div className="dca-bar" style={{ height: '55%' }}></div><span>T4</span></div>
                                            <div className="dca-bar-group"><div className="dca-bar" style={{ height: '78%' }}></div><span>T5</span></div>
                                            <div className="dca-bar-group"><div className="dca-bar" style={{ height: '88%' }}></div><span>T6</span></div>
                                            <div className="dca-bar-group"><div className="dca-bar hl" style={{ height: '92%' }}></div><span>T7</span></div>
                                        </div>
                                    </div>
                                    <div className="dash-campaigns">
                                        <div className="dc-head"><span><i className="fas fa-bullseye" style={{ color: 'var(--purple)' }}></i> Đang chạy</span><span className="dc-badge">3 active</span></div>
                                        <div className="dc-row"><div className="dc-status on"></div><div className="dc-info"><strong>seo-keyword-hanoi</strong><small>Keyword · 500/ngày</small></div><div className="dc-progress"><div className="dc-bar" style={{ width: '72%' }}></div></div><span className="dc-pct">72%</span></div>
                                        <div className="dc-row"><div className="dc-status on"></div><div className="dc-info"><strong>landing-page-bds</strong><small>Direct · 200/ngày</small></div><div className="dc-progress"><div className="dc-bar" style={{ width: '45%', background: 'var(--teal)' }}></div></div><span className="dc-pct">45%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Right: info  */}
                        <div className="dash-info">
                            <span className="sec-badge"><i className="fas fa-desktop"></i> Dashboard</span>
                            <h3 className="h2-style">Dashboard <span className="hl">Traffic SEO</span> trực quan, kết quả rõ ràng</h3>
                            <p>Mọi thứ bạn cần đều nằm trên một màn hình — không cần kinh nghiệm kỹ thuật.</p>
                            <div className="dash-info-list">
                                <div className="dil-item"><div className="dil-icon"><i className="fas fa-chart-pie"></i></div><div><strong>Thống kê real-time</strong><span>Traffic chạy/ngày, Tổng đã chạy cập nhật liên tục</span></div></div>
                                <div className="dil-item"><div className="dil-icon"><i className="fas fa-bullseye"></i></div><div><strong>Quản lý chiến dịch</strong><span>Tạo, tạm dừng, điều chỉnh bất kỳ lúc nào</span></div></div>
                                <div className="dil-item"><div className="dil-icon"><i className="fas fa-wallet"></i></div><div><strong>Nạp tiền nhanh 24/7</strong><span>Bank, USDT — cộng tiền ngay</span></div></div>
                                <div className="dil-item"><div className="dil-icon"><i className="fas fa-clock-rotate-left"></i></div><div><strong>Báo cáo chi tiết</strong><span>Lịch sử chi tiết từng lượt truy cập</span></div></div>
                            </div>
                            <a href="https://trafficseo.online/dang-ky" className="btn btn-p btn-lg" style={{ marginTop: '1.5rem' }}><i className="fas fa-rocket"></i> Đăng ký miễn phí</a>
                        </div>
                    </div>
                </div>
            </section>

            {/*  TIPS / BLOG  */}
            <section className="sec">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-lightbulb"></i> Kiến thức SEO</span>
                        <h3 className="h2-style">Mẹo tối ưu <span className="hl">hiệu quả traffic</span></h3>
                        <p>Những bài viết hữu ích giúp bạn khai thác tối đa dịch vụ TrafficUser và cải thiện SEO.</p>
                    </div>
                    <div className="tips-grid">
                        <div className="tip-card">
                            <div className="tip-thumb" style={{ background: 'linear-gradient(135deg,var(--purple-soft),#DBEAFE)' }}>
                                <span className="tip-cat">SEO</span>
                                📊
                            </div>
                            <div className="tip-body">
                                <h4>CTR là gì? Tại sao CTR quan trọng cho SEO?</h4>
                                <p>Click-Through Rate (CTR) là tỷ lệ click từ kết quả tìm kiếm. Google sử dụng CTR như một yếu tố xếp hạng gián tiếp — website có CTR cao hơn thường được đẩy lên vị trí tốt hơn.</p>
                                <a href="https://trafficseo.online/traffic-user-la-gi/" className="tip-link">Đọc thêm <i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="tip-card">
                            <div className="tip-thumb" style={{ background: 'linear-gradient(135deg,var(--teal-soft),var(--purple-soft))' }}>
                                <span className="tip-cat" style={{ background: 'var(--teal)' }}>Hướng dẫn</span>
                                🎯
                            </div>
                            <div className="tip-body">
                                <h4>Cách kết hợp 3 loại traffic để SEO hiệu quả nhất</h4>
                                <p>Tỷ lệ vàng 60% Keyword - 20% Direct - 20% Social giúp tạo nguồn traffic đa dạng, tự nhiên nhất trong mắt Google, tránh tình trạng bất thường.</p>
                                <a href="https://trafficseo.online/huong-dan/" className="tip-link">Đọc thêm <i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="tip-card">
                            <div className="tip-thumb" style={{ background: 'linear-gradient(135deg,var(--gold-soft),var(--coral-soft))' }}>
                                <span className="tip-cat" style={{ background: 'var(--gold)' }}>Tips</span>
                                💡
                            </div>
                            <div className="tip-body">
                                <h4>5 sai lầm phổ biến khi mua traffic và cách tránh</h4>
                                <p>Nhiều người mua traffic bot giá rẻ, không kiểm soát tốc độ, thiếu đa dạng nguồn — dẫn đến bị Google phạt. Đây là cách làm đúng từ đầu.</p>
                                <a href="https://trafficseo.online/cau-hoi-thuong-gap/" className="tip-link">Đọc thêm <i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  PRICING CALCULATOR  */}
            <section className="sec sec-w">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-calculator"></i> Tính chi phí</span>
                        <h3 className="h2-style">Ước tính <span className="hl">ngân sách</span> của bạn</h3>
                        <p>Chọn loại traffic, nhập số lượng — xem ngay chi phí dự kiến.</p>
                    </div>
                    <div className="calc-wrap">
                        <div className="calc-form">
                            <div className="calc-row">
                                <label><i className="fas fa-layer-group" style={{ color: 'var(--purple)', marginRight: '6px' }}></i> Loại traffic</label>
                                <select id="calcType" >
                                    <option value="keyword">Traffic Keyword (tìm kiếm Google)</option>
                                    <option value="direct">Traffic Direct (truy cập trực tiếp)</option>
                                    <option value="social">Traffic Social (mạng xã hội)</option>
                                </select>
                            </div>
                            <div className="calc-row">
                                <label><i className="fas fa-hashtag" style={{ color: 'var(--purple)', marginRight: '6px' }}></i> Số lượt mỗi ngày</label>
                                <input type="number" id="calcDaily" defaultValue="100" min="10" max="10000" />
                            </div>
                            <div className="calc-row">
                                <label><i className="fas fa-calendar" style={{ color: 'var(--purple)', marginRight: '6px' }}></i> Số ngày chạy</label>
                                <select id="calcDays" defaultValue="30">
                                    <option value="7">7 ngày (1 tuần)</option>
                                    <option value="14">14 ngày (2 tuần)</option>
                                    <option value="30">30 ngày (1 tháng)</option>
                                    <option value="60">60 ngày (2 tháng)</option>
                                    <option value="90">90 ngày (3 tháng)</option>
                                </select>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                <a href="https://trafficseo.online/dang-ky" className="btn btn-p btn-lg" style={{ width: '100%' }}><i className="fas fa-rocket"></i> Bắt đầu với ngân sách này</a>
                            </div>
                        </div>
                        <div className="calc-result">
                            <div className="cr-label">Tổng chi phí ước tính</div>
                            <div className="cr-val" id="calcTotal">3.600.000đ</div>
                            <div className="cr-unit">cho <span id="calcTotalVisits">3,000</span> lượt truy cập</div>
                            <div className="cr-breakdown">
                                <div className="cr-line"><span>Đơn giá</span><strong id="calcPrice">1,200đ/lượt</strong></div>
                                <div className="cr-line"><span>Số lượt/ngày</span><strong id="calcDailyShow">100 lượt</strong></div>
                                <div className="cr-line"><span>Thời gian</span><strong id="calcDaysShow">30 ngày</strong></div>
                                <div className="cr-line"><span>Tổng lượt</span><strong id="calcTotalShow">3,000 lượt</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  PARTNER LOGOS  */}
            <section className="logo-strip">
                <div className="w">
                    <div className="ls-title">Tương thích với các nền tảng phổ biến</div>
                    <div className="logo-row">
                        <div className="logo-item"><i className="fab fa-google"></i> Google</div>
                        <div className="logo-item"><i className="fab fa-wordpress"></i> WordPress</div>
                        <div className="logo-item"><i className="fas fa-chart-bar"></i> Analytics</div>
                        <div className="logo-item"><i className="fab fa-shopify"></i> Shopify</div>
                        <div className="logo-item"><i className="fab fa-laravel"></i> Laravel</div>
                        <div className="logo-item"><i className="fas fa-search"></i> Search Console</div>
                        <div className="logo-item"><i className="fab fa-facebook-f"></i> Facebook</div>
                    </div>
                </div>
            </section>

            {/*  TIMELINE / MILESTONES  */}
            <section className="sec">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-route"></i> Lộ trình</span>
                        <h3 className="h2-style">Kết quả bạn sẽ thấy <span className="hl">theo thời gian</span></h3>
                        <p>Timeline thực tế khi sử dụng TrafficUser cho chiến dịch SEO.</p>
                    </div>
                    <div className="tl-wrap">
                        <div className="tl-item">
                            <div className="tl-dot"><i className="fas fa-play"></i></div>
                            <div className="tl-content">
                                <div className="tl-date">Ngày 1-2</div>
                                <h4>Traffic bắt đầu chạy</h4>
                                <p>Chiến dịch được kích hoạt, lượt truy cập đầu tiên xuất hiện trên Google Analytics. Dashboard cập nhật real-time.</p>
                            </div>
                        </div>
                        <div className="tl-item">
                            <div className="tl-dot"><i className="fas fa-chart-line"></i></div>
                            <div className="tl-content">
                                <div className="tl-date">Tuần 1</div>
                                <h4>Google ghi nhận tín hiệu CTR</h4>
                                <p>CTR từ SERP tăng lên, Google bắt đầu ghi nhận website có mức tương tác cao hơn so với đối thủ cùng vị trí.</p>
                            </div>
                        </div>
                        <div className="tl-item">
                            <div className="tl-dot"><i className="fas fa-arrow-up"></i></div>
                            <div className="tl-content">
                                <div className="tl-date">Tuần 2-3</div>
                                <h4>Thứ hạng bắt đầu cải thiện</h4>
                                <p>Từ khóa mục tiêu nhích dần lên. Bounce rate giảm, Dwell Time tăng — các chỉ số quan trọng đều cải thiện.</p>
                            </div>
                        </div>
                        <div className="tl-item">
                            <div className="tl-dot"><i className="fas fa-trophy"></i></div>
                            <div className="tl-content">
                                <div className="tl-date">Tháng 1-2</div>
                                <h4>Ranking ổn định trong TOP</h4>
                                <p>Từ khóa đạt top 1-5 và giữ vững. Organic traffic tự nhiên cũng tăng theo nhờ vị trí tốt hơn. ROI rõ ràng.</p>
                            </div>
                        </div>
                        <div className="tl-item">
                            <div className="tl-dot" style={{ borderColor: 'var(--teal)' }}><i className="fas fa-rocket" style={{ color: 'var(--teal)' }}></i></div>
                            <div className="tl-content">
                                <div className="tl-date" style={{ color: 'var(--teal)' }}>Tháng 3+</div>
                                <h4>Tăng trưởng bền vững</h4>
                                <p>Website xây dựng được authority, traffic organic thật tăng tự nhiên. Giảm dần phụ thuộc vào dịch vụ, tiết kiệm chi phí dài hạn.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  FAQ  */}
            <section className="sec" id="faq" aria-label="Câu hỏi thường gặp">
                <div className="w">
                    <div className="sec-head">
                        <span className="sec-badge"><i className="fas fa-circle-question"></i> FAQ</span>
                        <h2>Câu hỏi <span className="hl">thường gặp</span></h2>
                    </div>
                    <div className="fq-list">
                        <div className="fq-item"><div className="fq-q" ><span>Traffic SEO là gì? Hoạt động như thế nào?</span><i className="fas fa-chevron-down"></i></div><div className="fq-a"><div className="fq-a-in"><p>Traffic SEO là nền tảng giúp website nhận lượt truy cập từ người dùng thật. Người thật tìm kiếm từ khóa trên Google, click vào website của bạn, ở lại đọc nội dung 60-180 giây — giúp cải thiện CTR, Dwell Time và thứ hạng SEO. <a href="https://trafficseo.online/traffic-user-la-gi/">Tìm hiểu thêm về Traffic SEO →</a></p></div></div></div>
                        <div className="fq-item"><div className="fq-q" ><span>Có an toàn cho website và SEO không?</span><i className="fas fa-chevron-down"></i></div><div className="fq-a"><div className="fq-a-in"><p>Hoàn toàn an toàn. Tất cả traffic đều từ người thật với IP đa dạng, hành vi tự nhiên. Google chỉ phạt traffic bot — traffic từ người thật giống hệt organic traffic nên không vi phạm bất kỳ chính sách nào.</p></div></div></div>
                        <div className="fq-item"><div className="fq-q" ><span>Chi phí sử dụng bao nhiêu?</span><i className="fas fa-chevron-down"></i></div><div className="fq-a"><div className="fq-a-in"><p>Giá rất cạnh tranh: Traffic Direct từ 1,200đ/lượt, Traffic Keyword từ 1,200đ/lượt. Không phí ẩn, thanh toán theo lượt sử dụng. <a href="#banggia">Xem bảng giá →</a></p></div></div></div>
                        <div className="fq-item"><div className="fq-q" ><span>Bao lâu thì thấy kết quả?</span><i className="fas fa-chevron-down"></i></div><div className="fq-a"><div className="fq-a-in"><p>Traffic bắt đầu chạy trong 24-48 giờ sau khi tạo chiến dịch. Hiệu quả SEO (tăng ranking, CTR) thường thấy rõ sau 2-4 tuần, tùy độ cạnh tranh từ khóa.</p></div></div></div>
                        <div className="fq-item"><div className="fq-q" ><span>Nên chọn loại traffic nào?</span><i className="fas fa-chevron-down"></i></div><div className="fq-a"><div className="fq-a-in"><p>Muốn <strong>đẩy ranking từ khóa</strong> → chọn Traffic Keyword. Cần <strong>tăng traffic nhanh, chi phí thấp</strong> → chọn Traffic Direct. Lời khuyên: kết hợp cả 3 loại với tỷ lệ 60% Keyword - 20% Direct - 20% Social để tạo nguồn traffic đa dạng, tự nhiên nhất.</p></div></div></div>
                        <div className="fq-item"><div className="fq-q" ><span>Thanh toán bằng hình thức nào?</span><i className="fas fa-chevron-down"></i></div><div className="fq-a"><div className="fq-a-in"><p>Hỗ trợ: <strong>Chuyển khoản ngân hàng</strong> (tự động cộng tiền 24/7), <strong>Momo, VNPAY</strong>, và <strong>USDT</strong> (TRC20). Tiền được cộng vào tài khoản ngay sau khi xác nhận.</p></div></div></div>
                    </div>
                </div>
            </section>

            {/*  SILO  */}
            <section className="silo" aria-label="Bài viết liên quan"><div className="w"><div className="sec-head" style={{ marginBottom: '2rem' }}><h2>Tìm hiểu thêm</h2></div><div className="silo-grid"><a href="https://trafficseo.online/traffic-user-la-gi/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--purple)' }}><i className="fas fa-book-open"></i></div><div><h4>Traffic SEO là gì?</h4><p>Khoa học đằng sau tín hiệu người dùng</p></div></a><a href="https://trafficseo.online/dich-vu-tang-traffic-user/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--purple)' }}><i className="fas fa-bolt"></i></div><div><h4>Dịch vụ tăng Traffic SEO</h4><p>Traffic thật 100%, SEO TOP hiệu quả</p></div></a><a href="https://trafficseo.online/mua-traffic-user/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--purple)' }}><i className="fas fa-cart-shopping"></i></div><div><h4>Mua Traffic SEO</h4><p>Hướng dẫn chọn nguồn chất lượng</p></div></a><a href="https://trafficseo.online/traffic-user-co-hieu-qua-khong/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--teal)' }}><i className="fas fa-chart-column"></i></div><div><h4>Traffic SEO có hiệu quả không?</h4><p>Bằng chứng &amp; dữ liệu thực tế</p></div></a><a href="https://trafficseo.online/traffic-user-that-vs-bot/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--coral)' }}><i className="fas fa-shield-halved"></i></div><div><h4>Traffic thật vs Bot</h4><p>Phân biệt, tránh mất tiền &amp; penalty</p></div></a><a href="https://trafficseo.online/traffic-user-download/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--purple-dark)' }}><i className="fas fa-download"></i></div><div><h4>Traffic SEO Download</h4><p>Nguồn traffic chất lượng cao nhất</p></div></a><a href="https://trafficseo.online/cach-tang-traffic-website/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--gold)' }}><i className="fas fa-rocket"></i></div><div><h4>12 cách tăng traffic website</h4><p>Từ miễn phí đến trả phí</p></div></a><a href="https://trafficseo.online/bang-gia/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--gold)' }}><i className="fas fa-wallet"></i></div><div><h4>Bảng giá Traffic SEO</h4><p>So sánh chi phí, chọn gói phù hợp</p></div></a><a href="https://trafficseo.online/cau-hoi-thuong-gap/" className="silo-card"><div className="silo-ico" style={{ background: 'var(--purple-light)' }}><i className="fas fa-circle-question"></i></div><div><h4>Câu hỏi thường gặp</h4><p>Giải đáp chi tiết A-Z</p></div></a></div></div></section>
            {/*  CTA  */}
            <section className="cta">
                <div className="cta-deco"></div>
                <div className="w">
                    <div className="cta-in">
                        <h3 className="h2-style">Sẵn sàng dùng Traffic SEO tăng traffic thật?</h3>
                        <p>Tạo tài khoản miễn phí ngay hôm nay. Ưu đãi 10% cho lần nạp đầu tiên.</p>
                        <div className="cta-btns">
                            <a href="https://trafficseo.online/dang-ky" className="btn btn-w btn-lg"><i className="fas fa-rocket"></i> Tạo tài khoản miễn phí</a>
                            <a href="https://t.me/DevVipIT1" target="_blank" rel="noopener" className="btn btn-o btn-lg" style={{ borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}><i className="fab fa-telegram"></i> Chat Telegram</a>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}
