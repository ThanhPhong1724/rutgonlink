'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../lib/api-client';
import { useAuth } from '../../lib/auth-context';
import apiClient from '../../lib/api-client';
import Link from 'next/link';
import {
    WalletCards,
    Landmark,
    Coins,
    Bitcoin,
    CreditCard,
    RefreshCcw,
    History,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Copy,
    ChevronRight,
    ArrowRight,
    Activity
} from 'lucide-react';

interface HoaDon {
    ma_cong_khai: string;
    so_tien_yeu_cau: string;
    don_vi_tien: string;
    trang_thai: string;
    phuong_thuc_nap: string;
    noi_dung_tham_chieu: string;
    thoi_diem_tao: string;
}

const TRANG_THAI_MAP: Record<string, { label: string; color: string; icon: any }> = {
    cho_thanh_toan: { label: 'Chờ thanh toán', color: 'text-warning bg-warning-light', icon: RefreshCcw },
    cho_duyet: { label: 'Chờ duyệt', color: 'text-info bg-indigo-100', icon: History },
    thanh_cong: { label: 'Thành công', color: 'text-success bg-success-light', icon: CheckCircle2 },
    tu_choi: { label: 'Từ chối', color: 'text-error bg-error-light', icon: XCircle },
    da_huy: { label: 'Đã hủy', color: 'text-text-muted bg-surface-hover', icon: XCircle },
    het_han: { label: 'Hết hạn', color: 'text-text-muted bg-surface-hover', icon: AlertCircle },
};

export default function NapTienPage() {
    const { nguoiDung } = useAuth();
    const [soTien, setSoTien] = useState('');
    const [phuongThuc, setPhuongThuc] = useState('ngan_hang');
    const [dangXuLy, setDangXuLy] = useState(false);
    const [loi, setLoi] = useState('');
    const [danhSach, setDanhSach] = useState<HoaDon[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [modalHoaDon, setModalHoaDon] = useState<HoaDon | null>(null);
    const [tabThanhToan, setTabThanhToan] = useState<'ngan_hang' | 'usdt' | 'paypal'>('ngan_hang');
    const [cauHinh, setCauHinh] = useState<Record<string, string>>({});
    const [minNap, setMinNap] = useState(100000);

    const taiDanhSach = async () => {
        setDangTai(true);
        try {
            const res: any = await apiClient.get('/api/v1/nap-tien/danh-sach');
            setDanhSach(res.hoa_don || []);
        } catch { /* ignore */ }
        setDangTai(false);
    };

    useEffect(() => {
        if (nguoiDung) {
            taiDanhSach();
            apiClient.get('/api/v1/public/cau-hinh').then((res: any) => {
                const configs = Array.isArray(res) ? res : [];
                const parsed: Record<string, string> = {};
                configs.forEach((c: any) => {
                    if (c.khoa === 'nap_tien_toi_thieu_vnd') setMinNap(Number(c.gia_tri) || 100000);
                    parsed[c.khoa] = c.gia_tri;
                });
                setCauHinh(parsed);
            }).catch(() => { });
        }
    }, [nguoiDung]);

    if (!nguoiDung) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <WalletCards className="w-12 h-12 text-border mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">Yêu cầu đăng nhập</h3>
                <p className="text-text-secondary mb-4">Vui lòng đăng nhập để nạp tiền vào ví.</p>
                <Link href="/dang-nhap" className="btn-primary">Đăng nhập ngay</Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoi('');

        const soTienNum = Number(soTien);
        if (!soTien || soTienNum <= 0) {
            setLoi('Vui lòng nhập số tiền muốn nạp.');
            return;
        }
        if (soTienNum < minNap) {
            setLoi(`Số tiền nạp tối thiểu là ${formatTien(minNap)}đ. Bạn đang nhập ${formatTien(soTienNum)}đ.`);
            return;
        }

        setDangXuLy(true);
        try {
            const res: any = await apiClient.post('/api/v1/nap-tien/tao-hoa-don', {
                so_tien: Number(soTien),
                phuong_thuc: phuongThuc,
            });
            // Mở modal hiện hoá đơn
            setModalHoaDon({
                ma_cong_khai: res.ma_hoa_don,
                so_tien_yeu_cau: String(res.so_tien),
                don_vi_tien: 'VND',
                trang_thai: res.trang_thai,
                phuong_thuc_nap: res.phuong_thuc,
                noi_dung_tham_chieu: res.noi_dung_tham_chieu,
                thoi_diem_tao: new Date().toISOString(),
            });
            setSoTien('');
            taiDanhSach();
        } catch (err: any) {
            setLoi(err.thong_diep || err.message || 'Lỗi tạo hóa đơn');
        } finally {
            setDangXuLy(false);
        }
    };

    const moModalThanhToan = (hd: HoaDon) => {
        setTabThanhToan(hd.phuong_thuc_nap === 'usdt' ? 'usdt' : hd.phuong_thuc_nap === 'paypal' ? 'paypal' : 'ngan_hang');
        setModalHoaDon(hd);
    };

    const xacNhanThanhToan = async (ma: string) => {
        try {
            await apiClient.patch(`/api/v1/nap-tien/${ma}/xac-nhan-thanh-toan`);
            setModalHoaDon(null);
            taiDanhSach();
        } catch { /* ignore */ }
    };

    const huyHoaDon = async (ma: string) => {
        try {
            await apiClient.patch(`/api/v1/nap-tien/${ma}/huy`);
            taiDanhSach();
        } catch { /* ignore */ }
    };

    const copyToClipboard = (text: string, title: string) => {
        navigator.clipboard.writeText(text);
        alert(`Đã sao chép ${title}: ${text}`);
    };

    const formatTien = (val: string | number) => Number(val).toLocaleString('vi-VN');

    const khuyenMaiPct = Number(soTien) >= 50000000 ? 10 : Number(soTien) >= 25000000 ? 5 : 0;
    const soTienKhuyenMai = Number(soTien) * (khuyenMaiPct / 100);
    const soTienNhanDuoc = Number(soTien) + soTienKhuyenMai;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Nạp Tiền Giao Dịch</h1>
                <p className="text-text-secondary mt-1">
                    Thêm số dư vào ví để thanh toán các chiến dịch hoặc mua dung lượng
                </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* Form Nạp Tiền (Bên trái) */}
                <div className="xl:w-[400px] shrink-0 space-y-6">
                    <div className="card p-6">
                        <div className="flex items-center gap-2 mb-6 text-primary border-b border-border pb-4">
                            <WalletCards className="w-6 h-6" />
                            <h2 className="font-bold text-lg text-foreground">Tạo đơn nạp mới</h2>
                        </div>

                        {/* Bảng khuyến mãi */}
                        <div className="mb-6 bg-surface-hover rounded-xl p-4 border border-border">
                            <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                                🎁 Ưu đãi nạp tiền (Khuyến mãi)
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center py-1.5 border-b border-border border-dashed">
                                    <span className="text-text-secondary">Từ 25,000,000đ</span>
                                    <span className="font-bold text-success bg-success-light px-2 py-0.5 rounded">+5%</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5">
                                    <span className="text-text-secondary">Từ 50,000,000đ</span>
                                    <span className="font-bold text-success bg-success-light px-2 py-0.5 rounded">+10%</span>
                                </div>
                            </div>
                        </div>

                        {loi && (
                            <div className="mb-5 p-3.5 rounded-lg bg-error-light/50 border border-error-light flex items-start gap-2 text-error text-sm font-medium">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>{loi}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-text-primary">
                                    Số tiền nạp (VNĐ) <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={soTien}
                                        onChange={(e) => { setLoi(''); setSoTien(e.target.value); }}
                                        className="input-field text-lg font-bold py-3"
                                        placeholder="Nhập số tiền muốn nạp"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted font-bold text-sm">
                                        VNĐ
                                    </div>
                                </div>
                                <p className="text-xs text-text-muted text-right">Tối thiểu: {formatTien(minNap)}đ</p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-text-primary">
                                    Phương thức thanh toán <span className="text-error">*</span>
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPhuongThuc('ngan_hang')}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 transition-all ${phuongThuc === 'ngan_hang' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-surface hover:bg-surface-hover text-text-secondary'}`}
                                    >
                                        <Landmark className="w-4 h-4" />
                                        <span className="font-semibold text-sm">Ngân hàng</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPhuongThuc('usdt')}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 transition-all ${phuongThuc === 'usdt' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-surface hover:bg-surface-hover text-text-secondary'}`}
                                    >
                                        <Bitcoin className="w-4 h-4" />
                                        <span className="font-semibold text-sm">USDT</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPhuongThuc('paypal')}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 transition-all ${phuongThuc === 'paypal' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-surface hover:bg-surface-hover text-text-secondary'}`}
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        <span className="font-semibold text-sm">PayPal</span>
                                    </button>
                                </div>
                            </div>

                            {/* Ticket Summary */}
                            <div className="bg-surface-hover rounded-lg border border-border p-4 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-secondary">Số tiền nạp:</span>
                                    <span className="font-semibold">{soTien ? formatTien(soTien) + ' đ' : '0 đ'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-secondary">Khuyến mãi ({khuyenMaiPct}%):</span>
                                    <span className="font-semibold text-success">+{formatTien(soTienKhuyenMai)} đ</span>
                                </div>
                                <div className="h-px w-full bg-border my-2"></div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-text-primary">Thực nhận:</span>
                                    <span className="text-lg font-bold text-primary">{soTien ? formatTien(soTienNhanDuoc) + ' đ' : '0 đ'}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={dangXuLy}
                                className="btn-primary w-full py-3 text-base"
                            >
                                {dangXuLy ? 'Đang tạo đơn...' : 'Tiến Hành Nạp Tiền'}
                            </button>
                        </form>

                        <div className="mt-6 flex items-start gap-2 p-3 bg-warning-light/30 rounded-lg border border-warning-light">
                            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                            <p className="text-xs text-warning-dark leading-relaxed">
                                Đơn nạp sẽ được duyệt tự động. Nếu sau 5 phút ví chưa được cộng tiền, vui lòng bấm nút "Đã thanh toán" hoặc liên hệ Admin.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Danh sách Hoá đơn (Bên phải) */}
                <div className="flex-1 min-w-0">
                    <div className="card overflow-hidden h-full flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-border bg-surface-hover/30">
                            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
                                <History className="w-5 h-5 text-text-muted" />
                                Lịch sử Nạp tiền
                            </h2>
                            <button
                                onClick={taiDanhSach}
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-surface border border-border rounded-md hover:bg-surface-hover hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20"
                            >
                                <RefreshCcw className="w-3.5 h-3.5" />
                                Làm mới
                            </button>
                        </div>

                        {dangTai ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-20 text-text-muted">
                                <Activity className="w-8 h-8 animate-pulse mb-3" />
                                <p>Đang tải lịch sử...</p>
                            </div>
                        ) : danhSach.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-20 text-text-muted px-4 text-center">
                                <Coins className="w-12 h-12 mb-4 text-border" strokeWidth={1.5} />
                                <h3 className="text-lg font-medium text-text-primary mb-1">Chưa có giao dịch nào</h3>
                                <p>Bạn chưa tạo đơn nạp tiền nào. Các đơn nạp sẽ hiển thị tại đây.</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-x-auto">
                                <table className="w-full text-left whitespace-nowrap">
                                    <thead>
                                        <tr className="border-b border-border bg-surface-hover/50 text-xs uppercase tracking-wider text-text-muted font-semibold">
                                            <th className="py-4 px-6">Mã Tham Chiếu</th>
                                            <th className="py-4 px-6">Số Tiền (VNĐ)</th>
                                            <th className="py-4 px-6">Phương Thức</th>
                                            <th className="py-4 px-6">Trạng Thái</th>
                                            <th className="py-4 px-6 text-right">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {danhSach.map((hd) => {
                                            const tt = TRANG_THAI_MAP[hd.trang_thai] || { label: hd.trang_thai, color: 'text-text-muted bg-surface-hover', icon: AlertCircle };
                                            const StatusIcon = tt.icon;

                                            return (
                                                <tr key={hd.ma_cong_khai} className="hover:bg-surface-hover transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col">
                                                            <span className="font-mono text-sm font-bold text-primary">
                                                                {hd.noi_dung_tham_chieu}
                                                            </span>
                                                            <span className="text-[11px] text-text-secondary mt-0.5">
                                                                {new Date(hd.thoi_diem_tao).toLocaleString('vi-VN', {
                                                                    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 font-semibold text-text-primary">
                                                        {formatTien(hd.so_tien_yeu_cau)} đ
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {hd.phuong_thuc_nap === 'ngan_hang' ? (
                                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                                                                <Landmark className="w-4 h-4 text-indigo-500" /> Ngân hàng
                                                            </span>
                                                        ) : hd.phuong_thuc_nap === 'paypal' ? (
                                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                                                                <CreditCard className="w-4 h-4 text-blue-500" /> PayPal
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                                                                <Bitcoin className="w-4 h-4 text-warning" /> USDT
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${tt.color}`}>
                                                            <StatusIcon className="w-3.5 h-3.5" />
                                                            {tt.label}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        {['cho_thanh_toan', 'cho_chung_tu'].includes(hd.trang_thai) ? (
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => huyHoaDon(hd.ma_cong_khai)}
                                                                    className="px-3 py-1.5 rounded-md text-xs font-semibold text-error hover:bg-error-light transition-colors"
                                                                >
                                                                    Hủy
                                                                </button>
                                                                <button
                                                                    onClick={() => moModalThanhToan(hd)}
                                                                    className="btn-primary px-3 py-1.5 text-xs inline-flex items-center gap-1"
                                                                >
                                                                    Thanh toán <ChevronRight className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => moModalThanhToan(hd)}
                                                                className="px-3 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-surface transition-colors"
                                                            >
                                                                Xem chi tiết
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL Hoá đơn thanh toán (Premium Design) */}
            {modalHoaDon && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setModalHoaDon(null)}></div>
                    <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header của Modal */}
                        <div className="bg-primary px-6 py-5 text-white flex justify-between items-start">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <WalletCards className="w-6 h-6 opacity-90" />
                                    Thanh toán hoá đơn
                                </h2>
                                <p className="text-primary-light text-sm font-medium opacity-90">
                                    Mã tham chiếu: {modalHoaDon.noi_dung_tham_chieu}
                                </p>
                            </div>
                            <button
                                onClick={() => setModalHoaDon(null)}
                                className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Summary Box */}
                            <div className="bg-surface-hover rounded-xl border border-border p-5 mb-6">
                                <div className="text-center mb-4 text-text-secondary text-sm font-medium">Số tiền cần thanh toán</div>
                                <div className="text-4xl font-extrabold text-center text-primary tracking-tight">
                                    {formatTien(modalHoaDon.so_tien_yeu_cau)} <span className="text-xl text-text-muted font-bold">VNĐ</span>
                                </div>
                            </div>

                            {/* Tabs Phương Thức Thay Đổi */}
                            {['cho_thanh_toan', 'cho_chung_tu'].includes(modalHoaDon.trang_thai) && (
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 p-1 bg-surface-hover rounded-lg border border-border">
                                        <button
                                            onClick={() => setTabThanhToan('ngan_hang')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${tabThanhToan === 'ngan_hang' ? 'bg-surface shadow-sm text-primary border border-border/50' : 'text-text-secondary hover:text-foreground'
                                                }`}
                                        >
                                            <Landmark className="w-4 h-4" /> Ngân hàng
                                        </button>
                                        <button
                                            onClick={() => setTabThanhToan('usdt')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${tabThanhToan === 'usdt' ? 'bg-surface shadow-sm text-primary border border-border/50' : 'text-text-secondary hover:text-foreground'
                                                }`}
                                        >
                                            <Bitcoin className="w-4 h-4" /> USDT
                                        </button>
                                        <button
                                            onClick={() => setTabThanhToan('paypal')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${tabThanhToan === 'paypal' ? 'bg-surface shadow-sm text-primary border border-border/50' : 'text-text-secondary hover:text-foreground'
                                                }`}
                                        >
                                            <CreditCard className="w-4 h-4" /> PayPal
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Chi tiết quét QR và Copy Thông Tin */}
                            <div className="flex flex-col sm:flex-row gap-6 items-center">
                                {/* Phía TRÁI - QR Code */}
                                <div className="shrink-0 flex flex-col items-center">
                                    <div className="p-3 bg-white rounded-xl border-2 border-border shadow-sm mb-3 relative group">
                                        {tabThanhToan === 'ngan_hang' ? (
                                            <img
                                                src={cauHinh.thanh_toan_ngan_hang_qr ? (cauHinh.thanh_toan_ngan_hang_qr.startsWith('/') ? `${BACKEND_URL}${cauHinh.thanh_toan_ngan_hang_qr}` : cauHinh.thanh_toan_ngan_hang_qr) : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${cauHinh.thanh_toan_ngan_hang_stk || 'Loading'} ${modalHoaDon.noi_dung_tham_chieu}`)}`}
                                                alt="QR Ngân Hàng"
                                                className="w-40 h-auto"
                                                onError={(e) => { (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${cauHinh.thanh_toan_ngan_hang_stk || 'Loading'} ${modalHoaDon.noi_dung_tham_chieu}`)}`; }}
                                            />
                                        ) : tabThanhToan === 'usdt' ? (
                                            <img
                                                src={cauHinh.thanh_toan_usdt_qr ? (cauHinh.thanh_toan_usdt_qr.startsWith('/') ? `${BACKEND_URL}${cauHinh.thanh_toan_usdt_qr}` : cauHinh.thanh_toan_usdt_qr) : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cauHinh.thanh_toan_usdt_vi || 'Loading')}`}
                                                alt="QR USDT"
                                                className="w-40 h-auto"
                                                onError={(e) => { (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cauHinh.thanh_toan_usdt_vi || 'Loading')}`; }}
                                            />
                                        ) : (
                                            <img
                                                src={cauHinh.thanh_toan_paypal_qr ? (cauHinh.thanh_toan_paypal_qr.startsWith('/') ? `${BACKEND_URL}${cauHinh.thanh_toan_paypal_qr}` : cauHinh.thanh_toan_paypal_qr) : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cauHinh.thanh_toan_paypal_email || 'Loading')}`}
                                                alt="QR PayPal"
                                                className="w-40 h-auto"
                                                onError={(e) => { (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cauHinh.thanh_toan_paypal_email || 'Loading')}`; }}
                                            />
                                        )}
                                        {['cho_thanh_toan', 'cho_chung_tu'].includes(modalHoaDon.trang_thai) === false && (
                                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                                                <div className="px-3 py-1 bg-surface border border-border rounded-full font-bold text-xs">
                                                    Không thể thanh toán
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">Quét mã để trả nhanh</p>
                                </div>

                                {/* Phía PHẢI - Text Details */}
                                <div className="w-full flex-1 space-y-4">
                                    {tabThanhToan === 'ngan_hang' ? (
                                        <>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Ngân hàng hưởng thụ</div>
                                                <div className="font-bold text-sm bg-surface-hover px-3 py-2 border border-border rounded-md">
                                                    {cauHinh.thanh_toan_ngan_hang_ten || 'Đang tải...'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Chủ tài khoản</div>
                                                <div className="font-bold text-sm bg-surface-hover px-3 py-2 border border-border rounded-md">
                                                    {cauHinh.thanh_toan_ngan_hang_chu_tk || 'Đang tải...'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Số tài khoản</div>
                                                <div className="flex">
                                                    <div className="font-mono font-bold text-sm bg-surface-hover border border-border border-r-0 rounded-l-md px-3 py-2 flex-1">
                                                        {cauHinh.thanh_toan_ngan_hang_stk || 'Đang tải...'}
                                                    </div>
                                                    <button onClick={() => copyToClipboard(cauHinh.thanh_toan_ngan_hang_stk, 'Số Tài Khoản')} className="px-3 bg-surface border border-border rounded-r-md hover:bg-surface-hover text-text-muted transition-colors">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Nội dung chuyển khoản (Bắt buộc)</div>
                                                <div className="flex">
                                                    <div className="font-mono font-bold text-sm bg-primary/5 text-primary border border-primary/30 border-r-0 rounded-l-md px-3 py-2 flex-1">
                                                        {modalHoaDon.noi_dung_tham_chieu}
                                                    </div>
                                                    <button onClick={() => copyToClipboard(modalHoaDon.noi_dung_tham_chieu, 'Nội dung')} className="px-3 bg-primary border border-primary rounded-r-md hover:bg-primary-hover text-white transition-colors">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : tabThanhToan === 'usdt' ? (
                                        <>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Mạng lưới USDT</div>
                                                <div className="font-bold text-sm bg-surface-hover px-3 py-2 border border-border rounded-md">
                                                    {cauHinh.thanh_toan_usdt_mang || 'TRC20'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Địa chỉ ví</div>
                                                <div className="flex">
                                                    <div className="font-mono font-bold text-xs bg-surface-hover border border-border border-r-0 rounded-l-md px-3 py-2 flex-1 break-all">
                                                        {cauHinh.thanh_toan_usdt_vi || 'Đang tải...'}
                                                    </div>
                                                    <button onClick={() => copyToClipboard(cauHinh.thanh_toan_usdt_vi, 'Địa chỉ ví USDT')} className="px-3 bg-surface border border-border rounded-r-md hover:bg-surface-hover text-text-muted transition-colors">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Số USDT cần nạp (Tham khảo)</div>
                                                <div className="flex">
                                                    <div className="font-mono font-bold text-sm bg-primary/5 text-primary border border-primary/30 border-r-0 rounded-l-md px-3 py-2 flex-1">
                                                        {(Number(modalHoaDon.so_tien_yeu_cau) / Number(cauHinh.ty_gia_vnd_usdt || 25000)).toFixed(2)} USDT
                                                    </div>
                                                    <button onClick={() => copyToClipboard((Number(modalHoaDon.so_tien_yeu_cau) / Number(cauHinh.ty_gia_vnd_usdt || 25000)).toFixed(2), 'Số lượng USDT')} className="px-3 bg-primary border border-primary rounded-r-md hover:bg-primary-hover text-white transition-colors">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-text-muted mt-1">Tỷ giá: 1 USDT = {formatTien(cauHinh.ty_gia_vnd_usdt || 25000)} VNĐ</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Tên tài khoản PayPal</div>
                                                <div className="font-bold text-sm bg-surface-hover px-3 py-2 border border-border rounded-md">
                                                    {cauHinh.thanh_toan_paypal_ten || 'Đang tải...'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Email PayPal</div>
                                                <div className="flex">
                                                    <div className="font-mono font-bold text-sm bg-surface-hover border border-border border-r-0 rounded-l-md px-3 py-2 flex-1 break-all">
                                                        {cauHinh.thanh_toan_paypal_email || 'Đang tải...'}
                                                    </div>
                                                    <button onClick={() => copyToClipboard(cauHinh.thanh_toan_paypal_email, 'Email PayPal')} className="px-3 bg-surface border border-border rounded-r-md hover:bg-surface-hover text-text-muted transition-colors">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Nội dung chuyển khoản (Bắt buộc)</div>
                                                <div className="flex">
                                                    <div className="font-mono font-bold text-sm bg-primary/5 text-primary border border-primary/30 border-r-0 rounded-l-md px-3 py-2 flex-1">
                                                        {modalHoaDon.noi_dung_tham_chieu}
                                                    </div>
                                                    <button onClick={() => copyToClipboard(modalHoaDon.noi_dung_tham_chieu, 'Nội dung')} className="px-3 bg-primary border border-primary rounded-r-md hover:bg-primary-hover text-white transition-colors">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-text-muted font-medium mb-1">Số USD tham khảo</div>
                                                <div className="font-mono font-bold text-sm bg-primary/5 text-primary border border-primary/30 rounded-md px-3 py-2">
                                                    {(Number(modalHoaDon.so_tien_yeu_cau) / Number(cauHinh.ty_gia_vnd_usdt || 25000)).toFixed(2)} USD
                                                </div>
                                                <p className="text-[10px] text-text-muted mt-1">Tỷ giá tham khảo: 1 USD ≈ {formatTien(cauHinh.ty_gia_vnd_usdt || 25000)} VNĐ</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Buttons Hành Động */}
                            <div className="mt-8 pt-6 border-t border-border flex gap-3">
                                {['cho_thanh_toan', 'cho_chung_tu'].includes(modalHoaDon.trang_thai) ? (
                                    <>
                                        <button
                                            onClick={() => xacNhanThanhToan(modalHoaDon.ma_cong_khai)}
                                            className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 className="w-5 h-5" /> Đã Thanh Toán Xong
                                        </button>
                                        <button
                                            onClick={() => setModalHoaDon(null)}
                                            className="btn-outline px-6 py-3 text-sm"
                                        >
                                            Đóng Lại
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setModalHoaDon(null)}
                                        className="btn-outline w-full py-3 text-sm"
                                    >
                                        Đóng Cửa Sổ
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

