'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '../../../lib/api-client';
import { Turnstile } from '@marsidev/react-turnstile';
import {
    ShieldAlert,
    ShieldOff,
    EyeOff,
    Search,
    Globe,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    ArrowRight,
    Image as ImageIcon,
    MousePointerClick,
    Home,
    KeyRound,
    RefreshCw,
    MessageSquareWarning,
    Banknote
} from 'lucide-react';
import Link from 'next/link';
import { BACKEND_URL } from '../../../lib/api-client';

interface ChienDichData {
    ma_cong_khai: string;
    tu_khoa: string[];
    lien_ket_trang_dich: string;
    anh_minh_hoa: string | null;
    thoi_gian_giay: number;
}

export default function RedirectPage() {
    const params = useParams();
    const maNgan = params.maNgan as string;

    const [trangThai, setTrangThai] = useState<'kiem_tra' | 'huong_dan' | 'hoan_tat' | 'loi'>('kiem_tra');
    const [thongDiepLoi, setThongDiepLoi] = useState('');
    const [trackingId, setTrackingId] = useState('');
    const [chienDich, setChienDich] = useState<ChienDichData | null>(null);
    const [tuKhoaHienTai, setTuKhoaHienTai] = useState('');
    const [phanThuong, setPhanThuong] = useState<{ don_gia_ban: number, rut_tien_toi_thieu_vnd: number } | null>(null);
    const [lienHeHoTro, setLienHeHoTro] = useState('');

    const [maXacNhan, setMaXacNhan] = useState('');
    const [dangXacMinh, setDangXacMinh] = useState(false);
    const [loiMa, setLoiMa] = useState('');
    const [dangXacMinhTurnstile, setDangXacMinhTurnstile] = useState(false);

    const formatTien = (val: number) => val.toLocaleString('vi-VN');

    const xacMinhTurnstile = async (token: string) => {
        setDangXacMinhTurnstile(true);
        try {
            const res: any = await apiClient.post(`/api/v1/redirect/info/${maNgan}`, {
                cf_turnstile_response: token
            });
            if (!res.yeu_cau_xac_minh) {
                window.location.href = res.lien_ket_goc;
                return;
            }
            setTrackingId(res.tracking_id);
            setChienDich(res.chien_dich);
            if (res.chien_dich && res.chien_dich.tu_khoa.length > 0) {
                const randomIndex = Math.floor(Math.random() * res.chien_dich.tu_khoa.length);
                setTuKhoaHienTai(res.chien_dich.tu_khoa[randomIndex]);
            }
            setPhanThuong(res.phan_thuong || null);
            setLienHeHoTro(res.lien_he_ho_tro || '');
            setTrangThai('huong_dan');
        } catch (err: any) {
            setTrangThai('loi');
            setThongDiepLoi(err.thong_diep || 'Liên kết không tồn tại hoặc lỗi bảo mật');
        } finally {
            setDangXacMinhTurnstile(false);
        }
    };

    const doiTuKhoa = () => {
        if (!chienDich || chienDich.tu_khoa.length <= 1) return;
        const available = chienDich.tu_khoa.filter(k => k !== tuKhoaHienTai);
        if (available.length > 0) {
            const randomIndex = Math.floor(Math.random() * available.length);
            setTuKhoaHienTai(available[randomIndex]);
        }
    };

    const xuLyXacMinh = async () => {
        if (!maXacNhan.trim()) {
            setLoiMa('Vui lòng nhập mã xác nhận');
            return;
        }
        try {
            setDangXacMinh(true);
            setLoiMa('');
            const res: any = await apiClient.post('/api/v1/redirect/xac-minh-ma', {
                ma_xac_nhan: maXacNhan.trim().toUpperCase(),
                tracking_id: trackingId,
            });
            setTrangThai('hoan_tat');
            setTimeout(() => {
                window.location.href = res.lien_ket_goc;
            }, 1000);
        } catch (err: any) {
            setLoiMa(err.thong_diep || 'Mã xác nhận không đúng hoặc đã hết hạn');
        } finally {
            setDangXacMinh(false);
        }
    };

    // ======== LỖI ========
    if (trangThai === 'loi') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full text-center p-8 border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Không thể truy cập</h1>
                    <p className="text-gray-500 mb-6">{thongDiepLoi}</p>
                    <button onClick={() => window.location.href = '/'} className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                        <Home className="w-4 h-4" /> Về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    // ======== HOÀN TẤT ========
    if (trangThai === 'hoan_tat') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full text-center p-8 border border-green-100 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Xác minh thành công!</h1>
                    <p className="text-gray-500">Đang chuyển hướng đến trang đích...</p>
                    <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto mt-4" />
                </div>
            </div>
        );
    }

    // CẢNH BÁO COMPONENT
    const RulesAlert = () => (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                <h3 className="font-bold text-red-700 text-sm uppercase tracking-wide">Quy tắc bắt buộc</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex items-center gap-2 text-xs font-medium text-red-700 bg-red-100/80 px-3 py-2.5 rounded-lg border border-red-200">
                    <ShieldOff className="w-4 h-4 shrink-0 text-red-500" />
                    <span>Không dùng VPN, Proxy</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-red-700 bg-red-100/80 px-3 py-2.5 rounded-lg border border-red-200">
                    <MousePointerClick className="w-4 h-4 shrink-0 text-red-500" />
                    <span>Không click &quot;Được tài trợ&quot;</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-red-700 bg-red-100/80 px-3 py-2.5 rounded-lg border border-red-200">
                    <EyeOff className="w-4 h-4 shrink-0 text-red-500" />
                    <span>Không dùng tab ẩn danh</span>
                </div>
            </div>
        </div>
    );

    // ======== BƯỚC 1: KIỂM TRA BOT (TURNSTILE) ========
    if (trangThai === 'kiem_tra') {
        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                <div className="max-w-xl w-full">
                    <RulesAlert />
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center">
                        <KeyRound className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                        <h1 className="text-xl font-bold mb-2">Xác minh bảo mật</h1>
                        <p className="text-gray-500 mb-6 text-sm">Vui lòng hoàn thành xác minh để tiếp tục xem hướng dẫn.</p>

                        <div className="flex justify-center min-h-[65px]">
                            {dangXacMinhTurnstile ? (
                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                            ) : (
                                <Turnstile
                                    siteKey={siteKey}
                                    onSuccess={xacMinhTurnstile}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ======== BƯỚC 2: HƯỚNG DẪN TÌM KIẾM ========
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8">
            <div className="max-w-xl w-full space-y-4">

                <RulesAlert />

                {/* === CARD CHÍNH === */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                                    <KeyRound className="w-5 h-5" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold">Hướng dẫn lấy mã PIN</h1>
                                    <p className="text-indigo-100 text-sm">Làm theo 4 bước để xác minh</p>
                                </div>
                            </div>
                            {lienHeHoTro && (
                                <a href={lienHeHoTro} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 font-medium transition-colors">
                                    <MessageSquareWarning className="w-3.5 h-3.5" /> Báo lỗi ngay!
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Ô NHẬP MÃ */}
                    <div className="px-6 pt-5 pb-5 border-b border-gray-100 bg-gradient-to-b from-indigo-50/50 to-white">
                        <div className="flex items-center gap-2 mb-3">
                            <KeyRound className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">Nhập mã xác nhận (Bước cuối)</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={maXacNhan}
                                onChange={(e) => { setMaXacNhan(e.target.value.toUpperCase()); setLoiMa(''); }}
                                placeholder="Nhập mã PIN ở đây..."
                                maxLength={10}
                                className="flex-1 text-center text-lg font-bold tracking-[0.1em] py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-gray-900 placeholder:text-gray-400 placeholder:tracking-normal placeholder:text-sm placeholder:font-medium"
                                onKeyDown={(e) => { if (e.key === 'Enter') xuLyXacMinh(); }}
                            />
                            <button
                                onClick={xuLyXacMinh}
                                disabled={dangXacMinh || !maXacNhan.trim()}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200/50 flex items-center gap-2 shrink-0"
                            >
                                {dangXacMinh ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="hidden sm:inline">Xác nhận</span>
                                    </>
                                )}
                            </button>
                        </div>
                        {loiMa && (
                            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg mt-3 border border-red-100 font-medium">
                                <AlertTriangle className="w-4 h-4 shrink-0" /> {loiMa}
                            </div>
                        )}
                    </div>

                    {/* HƯỚNG DẪN*/}
                    {chienDich && (
                        <div className="px-6 py-6 space-y-6">

                            {/* Bước 1 */}
                            <div className="flex gap-3.5">
                                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                                        Mở tab mới, truy cập thư mục gốc của Google: <a href="http://google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex items-center gap-1">Google.com <Globe className="w-3.5 h-3.5" /></a>
                                    </h3>
                                    <p className="text-xs text-text-muted mb-2">Tìm kiếm chính xác từ khoá sau:</p>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div
                                            onClick={() => {
                                                navigator.clipboard.writeText(tuKhoaHienTai);
                                                window.open(`https://www.google.com/search?q=${encodeURIComponent(tuKhoaHienTai)}`, '_blank');
                                            }}
                                            className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-indigo-50 border border-indigo-200 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors group"
                                        >
                                            <Search className="w-4 h-4 text-indigo-500 shrink-0" />
                                            <span className="font-bold text-indigo-800 text-base flex-1">{tuKhoaHienTai}</span>
                                            <span className="text-[10px] uppercase font-bold text-indigo-400 bg-white px-1.5 py-0.5 rounded border border-indigo-100 group-hover:text-indigo-600 transition-colors">Copy</span>
                                        </div>
                                        {chienDich.tu_khoa.length > 1 && (
                                            <button
                                                onClick={doiTuKhoa}
                                                className="shrink-0 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                            >
                                                <RefreshCw className="w-3.5 h-3.5" /> Đổi từ khác
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="h-px w-full bg-border/50"></div>

                            {/* Bước 2 */}
                            <div className="flex gap-3.5">
                                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-2 text-sm">Tìm và nhấn vào kết quả giống ảnh dưới đây</h3>
                                    {chienDich.anh_minh_hoa && (
                                        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                            <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-200">
                                                <ImageIcon className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs font-medium text-gray-600">Hình ảnh trang web cần tìm</span>
                                            </div>
                                            <img src={chienDich.anh_minh_hoa.startsWith('/') ? `${BACKEND_URL}${chienDich.anh_minh_hoa}` : chienDich.anh_minh_hoa} alt="Minh họa kết quả tìm kiếm" className="w-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="h-px w-full bg-border/50"></div>

                            {/* Bước 3 */}
                            <div className="flex gap-3.5">
                                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-1 text-sm">
                                        Cuộn xuống cuối bài viết, đợi <span className="text-indigo-600 text-base">{chienDich.thoi_gian_giay}s</span>
                                    </h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        Bấm vào nút <span className="text-indigo-600 font-medium">&quot;Nhận mã xác nhận&quot;</span> trên trang web, chờ đếm ngược xong sẽ hiển thị mã.
                                    </p>
                                </div>
                            </div>

                            {/* Bước 4: Nhập mã */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">4</div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Quay lại đây và nhập mã ở ô phía trên</h3>
                                    <p className="text-gray-500 text-xs">Nhập mã xác nhận vào ô bên trên rồi bấm xác nhận để lấy link.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* KHỐI QUẢNG CÁO ĐĂNG KÝ */}
                {phanThuong && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 shadow-sm relative overflow-hidden">
                        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-indigo-600 shrink-0">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-indigo-900 text-sm mb-1">Kiếm tiền cùng RutGonLink!</h4>
                                <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                                    Đăng ký để rút gọn link và kiếm <strong className="font-bold text-indigo-800">{formatTien(phanThuong.don_gia_ban)}đ</strong> mỗi lượt xem. Hỗ trợ rút tiền tức thì khi đủ <strong className="font-bold text-indigo-800">{formatTien(phanThuong.rut_tien_toi_thieu_vnd)}đ</strong>.
                                </p>
                            </div>
                            <Link href="/dang-ky" className="shrink-0 font-bold text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md whitespace-nowrap">
                                Đăng ký ngay
                            </Link>
                        </div>
                        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-xs font-medium text-gray-400">
                    Bằng việc lấy mã, bạn xác nhận đã đọc và tuân thủ các quy tắc trên.
                </p>
            </div>
        </div>
    );
}
