'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import apiClient from '../../lib/api-client';
import Link from 'next/link';
import {
    Banknote,
    Landmark,
    Bitcoin,
    RefreshCcw,
    History,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Copy,
    ChevronRight,
    HandCoins,
    Activity,
    CreditCard
} from 'lucide-react';

interface YeuCau {
    ma_cong_khai: string;
    so_tien_yeu_cau: string;
    don_vi_tien: string;
    trang_thai: string;
    phuong_thuc_rut: string;
    thoi_diem_tao: string;
}

const TRANG_THAI_MAP: Record<string, { label: string; color: string; icon: any }> = {
    cho_duyet: { label: 'Chờ duyệt', color: 'text-warning bg-warning-light', icon: RefreshCcw },
    dang_xu_ly: { label: 'Đang xử lý', color: 'text-info bg-indigo-100', icon: Activity },
    da_duyet: { label: 'Đã duyệt', color: 'text-success bg-emerald-100', icon: CheckCircle2 },
    da_gui: { label: 'Đã gửi tiền', color: 'text-primary bg-primary/10', icon: CheckCircle2 },
    hoan_thanh: { label: 'Hoàn thành', color: 'text-success bg-success-light', icon: CheckCircle2 },
    tu_choi: { label: 'Từ chối', color: 'text-error bg-error-light', icon: XCircle },
};

export default function RutTienPage() {
    const { nguoiDung } = useAuth();
    const [soTien, setSoTien] = useState('');
    const [phuongThuc, setPhuongThuc] = useState('ngan_hang');
    const [tenNganHang, setTenNganHang] = useState('');
    const [soTaiKhoan, setSoTaiKhoan] = useState('');
    const [tenChuTK, setTenChuTK] = useState('');
    const [dangXuLy, setDangXuLy] = useState(false);
    const [loi, setLoi] = useState('');
    const [thanhCong, setThanhCong] = useState('');
    const [danhSach, setDanhSach] = useState<YeuCau[]>([]);
    const [dangTai, setDangTai] = useState(true);

    const taiDanhSach = async () => {
        setDangTai(true);
        try {
            const res: any = await apiClient.get('/api/v1/rut-tien/danh-sach');
            setDanhSach(res.yeu_cau || []);
        } catch { /* ignore */ }
        setDangTai(false);
    };

    useEffect(() => {
        if (nguoiDung) taiDanhSach();
    }, [nguoiDung]);

    useEffect(() => {
        if (nguoiDung?.cau_hinh_rut_tien) {
            const config = nguoiDung.cau_hinh_rut_tien;
            if (phuongThuc === 'ngan_hang') {
                setTenNganHang(config.ngan_hang || '');
                setSoTaiKhoan(config.so_tai_khoan || '');
                setTenChuTK(config.ten_chu_tai_khoan || '');
            } else if (phuongThuc === 'usdt') {
                setTenNganHang(config.mang_usdt || 'TRC20');
                setSoTaiKhoan(config.vi_usdt || '');
                setTenChuTK('');
            }
        }
    }, [phuongThuc, nguoiDung]);

    if (!nguoiDung) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <HandCoins className="w-12 h-12 text-border mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">Yêu cầu đăng nhập</h3>
                <p className="text-text-secondary mb-4">Vui lòng đăng nhập để rút tiền doanh thu.</p>
                <Link href="/dang-nhap" className="btn-primary">Đăng nhập ngay</Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoi('');
        setThanhCong('');

        if (Number(soTien) < 200000) {
            setLoi('Số tiền rút tối thiểu là 200,000 VNĐ');
            return;
        }

        if (Number(soTien) > Number(nguoiDung?.so_du_kha_dung || 0)) {
            setLoi('Số dư không đủ để thực hiện yêu cầu này');
            return;
        }

        setDangXuLy(true);
        try {
            const thongTinNhanTien = phuongThuc === 'ngan_hang'
                ? { ten_ngan_hang: tenNganHang, so_tai_khoan: soTaiKhoan, ten_chu_tai_khoan: tenChuTK }
                : { dia_chi_vi: soTaiKhoan, mang: tenNganHang };

            await apiClient.post('/api/v1/rut-tien/tao-yeu-cau', {
                so_tien: Number(soTien),
                phuong_thuc: phuongThuc,
                thong_tin_nhan_tien: thongTinNhanTien,
            });

            setSoTien('');
            setThanhCong('Tạo yêu cầu rút tiền thành công. Vui lòng chờ admin xử lý.');
            taiDanhSach();
        } catch (err: any) {
            setLoi(err.thong_diep || err.message || 'Lỗi tạo yêu cầu rút tiền');
        } finally {
            setDangXuLy(false);
        }
    };

    const formatTien = (val: string | number) => Number(val).toLocaleString('vi-VN');

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Rút Tiền Doanh Thu</h1>
                <p className="text-text-secondary mt-1">
                    Chuyển đổi doanh thu rút gọn liên kết về tài khoản ngân hàng hoặc ví USDT của bạn.
                </p>
            </div>

            {/* Thẻ hiển thị số dư khả dụng */}
            <div className="card p-5 sm:p-6 bg-gradient-to-br from-primary to-primary-dark text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute left-0 bottom-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-sm border border-white/10">
                            <Banknote className="w-8 h-8 text-white drop-shadow-sm" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-white/80 text-sm font-medium tracking-wide uppercase mb-0.5">Số dư khả dụng</p>
                            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm">
                                {formatTien(nguoiDung.so_du_kha_dung || 0)} <span className="text-xl sm:text-2xl text-white/80 font-bold ml-1">VNĐ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* Form Yêu Cầu Rút Tiền (Bên trái) */}
                <div className="xl:w-[420px] shrink-0 space-y-6">
                    <div className="card p-6">
                        <div className="flex items-center gap-2 mb-6 text-primary border-b border-border pb-4">
                            <HandCoins className="w-6 h-6" />
                            <h2 className="font-bold text-lg text-foreground">Tạo lệnh rút tiền</h2>
                        </div>

                        {loi && (
                            <div className="mb-5 p-3.5 rounded-lg bg-error-light/50 border border-error-light flex items-start gap-2 text-error text-sm font-medium">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>{loi}</p>
                            </div>
                        )}

                        {thanhCong && (
                            <div className="mb-5 p-3.5 rounded-lg bg-success-light/50 border border-success-light flex items-start gap-2 text-success text-sm font-medium">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <p>{thanhCong}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-text-primary">
                                    Số tiền rút (VNĐ) <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={soTien}
                                        onChange={(e) => setSoTien(e.target.value)}
                                        className="input-field text-lg font-bold py-3 pr-14"
                                        placeholder="Tối thiểu 200,000"
                                        min="200000"
                                        max={nguoiDung?.so_du_kha_dung || 0}
                                        required
                                    />
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3">
                                        <button
                                            type="button"
                                            onClick={() => setSoTien(String(nguoiDung?.so_du_kha_dung || '0'))}
                                            className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                                        >
                                            MAX
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs mt-1">
                                    <span className="text-text-muted">Tối thiểu: 200,000đ</span>
                                    {soTien && (
                                        <span className={`font-medium ${Number(soTien) > Number(nguoiDung.so_du_kha_dung || 0) ? 'text-error' : 'text-success'}`}>
                                            Còn lại: {formatTien(Math.max(0, Number(nguoiDung.so_du_kha_dung || 0) - Number(soTien)))}đ
                                        </span>
                                    )}
                                </div>
                                {phuongThuc === 'usdt' && soTien && Number(soTien) > 0 && (
                                    <div className="mt-2 p-2 bg-warning-light/20 rounded border border-warning-light text-warning-dark text-xs flex justify-between items-center">
                                        <span>Ước tính quy đổi USDT:</span>
                                        <span className="font-bold">~ {(Number(soTien) / 25500).toFixed(2)} USDT</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-text-primary mb-2">Phương thức nhận tiền</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPhuongThuc('ngan_hang')}
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${phuongThuc === 'ngan_hang'
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-border bg-surface hover:bg-surface-hover text-text-secondary'
                                            }`}
                                    >
                                        <Landmark className={`w-6 h-6 mb-2 ${phuongThuc === 'ngan_hang' ? 'text-primary' : 'text-text-muted'}`} />
                                        <span className="text-sm font-semibold">Ngân hàng VN</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPhuongThuc('usdt')}
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${phuongThuc === 'usdt'
                                            ? 'border-warning bg-warning-light/30 text-warning-dark'
                                            : 'border-border bg-surface hover:bg-surface-hover text-text-secondary'
                                            }`}
                                    >
                                        <Bitcoin className={`w-6 h-6 mb-2 ${phuongThuc === 'usdt' ? 'text-warning-dark' : 'text-text-muted'}`} />
                                        <span className="text-sm font-semibold">Ví USDT</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-surface-hover rounded-xl p-4 border border-border space-y-4">
                                {phuongThuc === 'ngan_hang' ? (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-medium text-text-secondary">Tên ngân hàng <span className="text-error">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                                    <Landmark className="w-4 h-4" />
                                                </div>
                                                <input type="text" value={tenNganHang} onChange={(e) => setTenNganHang(e.target.value)}
                                                    className="input-field pl-9 text-sm"
                                                    placeholder="Ví dụ: Vietcombank, MB Bank..." required />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-medium text-text-secondary">Số tài khoản <span className="text-error">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                                    <CreditCard className="w-4 h-4" />
                                                </div>
                                                <input type="text" value={soTaiKhoan} onChange={(e) => setSoTaiKhoan(e.target.value)}
                                                    className="input-field pl-9 text-sm font-mono"
                                                    placeholder="0123456789" required />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-medium text-text-secondary">Tên chủ tài khoản <span className="text-error">*</span></label>
                                            <input type="text" value={tenChuTK} onChange={(e) => setTenChuTK(e.target.value.toUpperCase())}
                                                className="input-field text-sm font-semibold"
                                                placeholder="NGUYEN VAN A" required />
                                            <p className="text-[10px] text-text-muted">Nhập IN HOA KHÔNG DẤU</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-medium text-text-secondary">Mạng (Network) <span className="text-error">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                                    <Activity className="w-4 h-4" />
                                                </div>
                                                <input type="text" value={tenNganHang} onChange={(e) => setTenNganHang(e.target.value.toUpperCase())}
                                                    className="input-field pl-9 text-sm font-mono font-bold text-warning-dark"
                                                    placeholder="TRC20, BEP20, ERC20..." required />
                                            </div>
                                            <p className="text-[10px] text-warning-dark font-medium">Quy đổi tỷ giá tham khảo: 1 USDT = 25,500 VNĐ</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-medium text-text-secondary">Địa chỉ ví USDT <span className="text-error">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                                                    <Bitcoin className="w-4 h-4" />
                                                </div>
                                                <input type="text" value={soTaiKhoan} onChange={(e) => setSoTaiKhoan(e.target.value)}
                                                    className="input-field pl-9 text-sm font-mono"
                                                    placeholder="T..." required />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={dangXuLy || !soTien || Number(soTien) < 200000 || Number(soTien) > Number(nguoiDung?.so_du_kha_dung || 0)}
                                className="btn-primary w-full py-3 text-base flex justify-center items-center gap-2"
                            >
                                {dangXuLy ? (
                                    <>
                                        <RefreshCcw className="w-5 h-5 animate-spin" />
                                        Đang tạo lệnh rút...
                                    </>
                                ) : (
                                    <>Gửi Yêu Cầu Rút Tiền <ChevronRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Danh sách Lịch sử rút tiền (Bên phải) */}
                <div className="flex-1 min-w-0">
                    <div className="card overflow-hidden h-full flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-border bg-surface-hover/30">
                            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
                                <History className="w-5 h-5 text-text-muted" />
                                Lịch sử rút tiền
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
                                <Banknote className="w-12 h-12 mb-4 text-border" strokeWidth={1.5} />
                                <h3 className="text-lg font-medium text-text-primary mb-1">Chưa có giao dịch rút tiền nào</h3>
                                <p>Khi bạn tạo lệnh rút tiền, thông tin sẽ hiển thị tại đây.</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-x-auto">
                                <table className="w-full text-left whitespace-nowrap">
                                    <thead>
                                        <tr className="border-b border-border bg-surface-hover/50 text-xs uppercase tracking-wider text-text-muted font-semibold">
                                            <th className="py-4 px-6">Mã Yêu Cầu</th>
                                            <th className="py-4 px-6">Số Tiền (VNĐ)</th>
                                            <th className="py-4 px-6">Phương Thức</th>
                                            <th className="py-4 px-6">Trạng Thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {danhSach.map((yc) => {
                                            const tt = TRANG_THAI_MAP[yc.trang_thai] || { label: yc.trang_thai, color: 'text-text-muted bg-surface-hover', icon: AlertCircle };
                                            const StatusIcon = tt.icon;

                                            return (
                                                <tr key={yc.ma_cong_khai} className="hover:bg-surface-hover transition-colors">
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col">
                                                            <span className="font-mono text-sm font-bold text-text-primary">
                                                                #{yc.ma_cong_khai.substring(0, 8)}
                                                            </span>
                                                            <span className="text-[11px] text-text-secondary mt-0.5">
                                                                {new Date(yc.thoi_diem_tao).toLocaleString('vi-VN', {
                                                                    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 font-semibold text-error">
                                                        - {formatTien(yc.so_tien_yeu_cau)} đ
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {yc.phuong_thuc_rut === 'ngan_hang' ? (
                                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                                                                <Landmark className="w-4 h-4 text-indigo-500" /> Ngân hàng
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
        </div>
    );
}
