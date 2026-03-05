'use client';

import { useAuth } from '../lib/auth-context';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import apiClient from '../lib/api-client';
import PublicHome from './components/PublicHome';
import {
    Link as LinkIcon,
    TrendingUp,
    Users,
    ArrowRight,
    MousePointerClick,
    CheckCircle2,
    Wallet,
    ArrowDownCircle,
    Megaphone,
    Play,
    Target,
    PiggyBank,
    Loader2,
    BarChart3,
    Globe,
    ShieldCheck,
    CircleDollarSign,
    Lock,
    WalletCards,
    LayoutDashboard,
} from 'lucide-react';

// ===================== TYPES =====================
interface LinkRow {
    ma_ngan: string;
    lien_ket_goc: string;
    trang_thai: string;
    tong_click: number;
    luot_hop_le: number;
    doanh_thu: number;
}

interface R20Data {
    tong_link: number;
    tong_click: number;
    luot_hop_le: number;
    so_du_kha_dung: number;
    so_du_khoa_tam: number;
    tong_doanh_thu: number;
    doanh_thu_hom_nay: number;
    doanh_thu_thang_nay: number;
    tong_da_rut: number;
    dang_cho_rut: number;
    loi_nhuan_thuc: number;
    bang_link: LinkRow[];
}

interface ChienDichRow {
    ma_cong_khai: string;
    ten_chien_dich: string;
    trang_thai: string;
    so_luot_mua: number;
    so_luot_da_chay: number;
    ngan_sach_tong: number;
    ngan_sach_da_dung: number;
    ten_goi: string;
}

interface R10Data {
    tong_chien_dich: number;
    dang_chay: number;
    tong_luot_mua: number;
    tong_luot_da_chay: number;
    tong_ngan_sach: number;
    tong_da_dung: number;
    so_du_kha_dung: number;
    so_du_khoa_tam: number;
    bang_chien_dich: ChienDichRow[];
}

interface R30Data {
    tong_nguoi_dung: number;
    so_r10: number;
    so_r20: number;
    tong_link: number;
    tong_chien_dich: number;
    chien_dich_dang_chay: number;
    click_hom_nay: number;
    click_tuan_nay: number;
    click_thang_nay: number;
    tong_click_hop_le: number;
    tong_tien_he_thong: number;
    doanh_thu_san: number;
}

const fmt = (n: number) => n.toLocaleString('vi-VN');
const fmtVND = (n: number) => n.toLocaleString('vi-VN') + 'đ';

// ===================== STAT CARD =====================
function StatCard({ icon: Icon, label, value, color = 'indigo', subtext }: {
    icon: any; label: string; value: string; color?: string; subtext?: string;
}) {
    const colorMap: Record<string, string> = {
        indigo: 'bg-indigo-50 text-indigo-600',
        green: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        purple: 'bg-purple-50 text-purple-600',
        rose: 'bg-rose-50 text-rose-600',
        sky: 'bg-sky-50 text-sky-600',
    };
    return (
        <div className="card p-5 flex items-start justify-between card-hover">
            <div>
                <p className="text-sm font-medium text-text-muted mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
                {subtext && <p className="text-xs text-text-secondary mt-1">{subtext}</p>}
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color] || colorMap.indigo}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
    );
}

// ===================== MINI BAR CHART =====================
function MiniBarChart({ data }: { data: { ngay: string; click: number; hop_le: number }[] }) {
    const maxClick = Math.max(...data.map((d) => d.click), 1);
    return (
        <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-text-primary">Lượt click 7 ngày qua</h3>
            </div>
            <div className="flex items-end gap-2 h-32">
                {data.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex flex-col items-center gap-0.5" style={{ height: '100px' }}>
                            <div className="w-full rounded-t bg-indigo-200 relative" style={{ height: `${(d.click / maxClick) * 100}%`, minHeight: d.click > 0 ? '4px' : '0' }}>
                                <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t" style={{ height: d.click > 0 ? `${(d.hop_le / d.click) * 100}%` : '0' }}></div>
                            </div>
                        </div>
                        <span className="text-[10px] text-text-muted">{d.ngay}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-indigo-200"></span>Tổng click</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-indigo-500"></span>Hợp lệ</span>
            </div>
        </div>
    );
}

// ===================== TRANG THÁI BADGE =====================
function TrangThaiBadge({ status }: { status: string }) {
    const map: Record<string, { text: string; cls: string }> = {
        hoat_dong: { text: 'Đang chạy', cls: 'bg-emerald-100 text-emerald-700' },
        tam_dung: { text: 'Tạm dừng', cls: 'bg-amber-100 text-amber-700' },
        hoan_thanh: { text: 'Hoàn thành', cls: 'bg-gray-100 text-gray-600' },
    };
    const item = map[status] || { text: status, cls: 'bg-gray-100 text-gray-600' };
    return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.cls}`}>{item.text}</span>;
}
// ===================== EARNINGS LINE CHART =====================
interface ChartPoint { nhan: string; so_tien: number }
interface ChartData { du_lieu: ChartPoint[]; tong: number; khoang: string; nhom: string }

const KHOANG_OPTIONS = [
    { key: '7_ngay', label: '7 ngày' },
    { key: '30_ngay', label: '30 ngày' },
    { key: '90_ngay', label: '3 tháng' },
    { key: '1_nam', label: '1 năm' },
    { key: 'tat_ca', label: 'Tất cả' },
];

function EarningsLineChart() {
    const [khoang, setKhoang] = useState('30_ngay');
    const [data, setData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [hoverIdx, setHoverIdx] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        apiClient.get(`/api/v1/dashboard/r20/bieu-do?khoang=${khoang}`)
            .then((res: any) => setData(res))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [khoang]);

    const W = 720, H = 260, PX = 50, PY = 30, PB = 40;
    const chartW = W - PX - 16, chartH = H - PY - PB;

    const points = data?.du_lieu || [];
    const maxVal = Math.max(...points.map(p => p.so_tien), 1);
    const yTicks = 5;

    const getX = (i: number) => PX + (points.length > 1 ? (i / (points.length - 1)) * chartW : chartW / 2);
    const getY = (v: number) => PY + chartH - (v / maxVal) * chartH;

    // Smooth bezier path
    const buildPath = () => {
        if (points.length === 0) return '';
        if (points.length === 1) {
            const x = getX(0), y = getY(points[0].so_tien);
            return `M${x},${y}`;
        }
        let d = `M${getX(0)},${getY(points[0].so_tien)}`;
        for (let i = 1; i < points.length; i++) {
            const x0 = getX(i - 1), y0 = getY(points[i - 1].so_tien);
            const x1 = getX(i), y1 = getY(points[i].so_tien);
            const cpx = (x0 + x1) / 2;
            d += ` C${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
        }
        return d;
    };

    const buildAreaPath = () => {
        const linePath = buildPath();
        if (!linePath || points.length === 0) return '';
        const lastX = getX(points.length - 1);
        const firstX = getX(0);
        const bottom = PY + chartH;
        return `${linePath} L${lastX},${bottom} L${firstX},${bottom} Z`;
    };

    // Labels for X axis — show ~8 ticks max
    const xStep = Math.max(1, Math.floor(points.length / 8));

    return (
        <div className="card overflow-hidden">
            <div className="px-5 pt-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-semibold text-text-primary">Doanh thu theo thời gian</h3>
                    {data && <span className="text-sm text-text-muted ml-2">Tổng: <span className="font-semibold text-indigo-600">{fmtVND(data.tong)}</span></span>}
                </div>
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    {KHOANG_OPTIONS.map(opt => (
                        <button key={opt.key}
                            onClick={() => setKhoang(opt.key)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${khoang === opt.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-3 pb-4">
                {loading ? (
                    <div className="flex items-center justify-center" style={{ height: H }}>
                        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                    </div>
                ) : points.length === 0 ? (
                    <div className="flex items-center justify-center text-text-muted text-sm" style={{ height: H }}>
                        Chưa có dữ liệu doanh thu
                    </div>
                ) : (
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}
                        onMouseLeave={() => setHoverIdx(null)}>
                        <defs>
                            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgb(99,102,241)" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0.02" />
                            </linearGradient>
                        </defs>

                        {/* Y grid lines + labels */}
                        {Array.from({ length: yTicks + 1 }).map((_, i) => {
                            const val = (maxVal / yTicks) * i;
                            const y = getY(val);
                            return (
                                <g key={i}>
                                    <line x1={PX} y1={y} x2={PX + chartW} y2={y} stroke="#e5e7eb" strokeWidth={1} strokeDasharray={i === 0 ? '0' : '4,4'} />
                                    <text x={PX - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
                                        {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Area fill */}
                        <path d={buildAreaPath()} fill="url(#areaGrad)" />

                        {/* Line */}
                        <path d={buildPath()} fill="none" stroke="rgb(99,102,241)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                        {/* X labels */}
                        {points.map((p, i) => (
                            i % xStep === 0 || i === points.length - 1 ? (
                                <text key={i} x={getX(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#9ca3af">{p.nhan}</text>
                            ) : null
                        ))}

                        {/* Hover hitboxes */}
                        {points.map((p, i) => {
                            const x = getX(i), y = getY(p.so_tien);
                            const w = points.length > 1 ? chartW / (points.length - 1) : chartW;
                            return (
                                <g key={`h-${i}`} onMouseEnter={() => setHoverIdx(i)}>
                                    <rect x={x - w / 2} y={PY} width={w} height={chartH + PB} fill="transparent" />
                                    {hoverIdx === i && (
                                        <>
                                            <line x1={x} y1={PY} x2={x} y2={PY + chartH} stroke="rgb(99,102,241)" strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
                                            <circle cx={x} cy={y} r={5} fill="white" stroke="rgb(99,102,241)" strokeWidth={2.5} />
                                            <rect x={x - 46} y={y - 32} width={92} height={22} rx={6} fill="rgb(49,46,129)" />
                                            <text x={x} y={y - 17} textAnchor="middle" fontSize="11" fill="white" fontWeight="600">{fmtVND(p.so_tien)}</text>
                                        </>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                )}
            </div>
        </div>
    );
}

// ===================== R20 DASHBOARD CONTENT =====================
function R20DashboardContent({ nguoiDung, r20 }: { nguoiDung: any; r20: R20Data }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Bảng Điều Khiển R20</h1>
                    <p className="text-text-secondary mt-1">
                        Xin chào, <span className="font-semibold text-text-primary">{nguoiDung.ten_hien_thi}</span>! Dưới đây là thống kê link của bạn.
                    </p>
                </div>
                <Link href="/quan-ly-link" className="btn-primary"><LinkIcon className="w-4 h-4 mr-2" /> Tạo Link Mới</Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard icon={MousePointerClick} label="Tổng click" value={fmt(r20.tong_click)} color="indigo" subtext={`${fmt(r20.tong_link)} link`} />
                <StatCard icon={CheckCircle2} label="Lượt hợp lệ" value={fmt(r20.luot_hop_le)} color="green" subtext={r20.tong_click > 0 ? `${((r20.luot_hop_le / r20.tong_click) * 100).toFixed(1)}% tỷ lệ hợp lệ` : undefined} />
                <StatCard icon={TrendingUp} label="Tổng doanh thu" value={fmtVND(r20.tong_doanh_thu)} color="purple" subtext={`Hôm nay: ${fmtVND(r20.doanh_thu_hom_nay)}`} />
                <StatCard icon={Wallet} label="Số dư khả dụng" value={fmtVND(r20.so_du_kha_dung)} color="amber" subtext={r20.so_du_khoa_tam > 0 ? `Đang xử lý: ${fmtVND(r20.so_du_khoa_tam)}` : undefined} />
            </div>

            {/* Earnings Line Chart */}
            <EarningsLineChart />

            {/* Per-link Performance Table */}
            {r20.bang_link && r20.bang_link.length > 0 && (
                <div className="card overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-indigo-500" />
                        <h3 className="font-semibold text-text-primary">Hiệu suất từng link</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-surface-hover text-left">
                                    <th className="px-5 py-3 font-medium text-text-muted">Mã ngắn</th>
                                    <th className="px-5 py-3 font-medium text-text-muted">Link gốc</th>
                                    <th className="px-5 py-3 font-medium text-text-muted text-center">Click</th>
                                    <th className="px-5 py-3 font-medium text-text-muted text-center">Hợp lệ</th>
                                    <th className="px-5 py-3 font-medium text-text-muted text-right">Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {r20.bang_link.map((link) => (
                                    <tr key={link.ma_ngan} className="border-t border-border hover:bg-surface-hover/50">
                                        <td className="px-5 py-3"><span className="font-mono text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{link.ma_ngan}</span></td>
                                        <td className="px-5 py-3 text-text-secondary text-xs max-w-[200px] truncate">{link.lien_ket_goc}</td>
                                        <td className="px-5 py-3 text-center font-medium">{fmt(link.tong_click)}</td>
                                        <td className="px-5 py-3 text-center">
                                            <span className="text-emerald-600 font-semibold">{fmt(link.luot_hop_le)}</span>
                                            {link.tong_click > 0 && <span className="text-[10px] text-text-muted ml-1">({((link.luot_hop_le / link.tong_click) * 100).toFixed(0)}%)</span>}
                                        </td>
                                        <td className="px-5 py-3 text-right font-semibold text-purple-600">{fmtVND(link.doanh_thu)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-border bg-surface-hover/30">
                                    <td className="px-5 py-3 font-semibold text-text-primary" colSpan={2}>Tổng cộng</td>
                                    <td className="px-5 py-3 text-center font-bold">{fmt(r20.tong_click)}</td>
                                    <td className="px-5 py-3 text-center font-bold text-emerald-600">{fmt(r20.luot_hop_le)}</td>
                                    <td className="px-5 py-3 text-right font-bold text-purple-600">{fmtVND(r20.tong_doanh_thu)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// ===================== MAIN PAGE =====================
export default function Home() {
    const { nguoiDung } = useAuth();
    const [dangTai, setDangTai] = useState(true);
    const [r20, setR20] = useState<R20Data | null>(null);
    const [r10, setR10] = useState<R10Data | null>(null);
    const [r30, setR30] = useState<R30Data | null>(null);

    const isR20 = nguoiDung?.loai_tai_khoan === 'R20';
    const isAdmin = nguoiDung && ['R30', 'R40'].includes(nguoiDung.loai_tai_khoan);
    const isR10 = nguoiDung && !isR20 && !isAdmin;

    useEffect(() => {
        if (!nguoiDung) return;
        setDangTai(true);
        const endpoint = isAdmin ? '/api/v1/dashboard/r30' : isR20 ? '/api/v1/dashboard/r20' : '/api/v1/dashboard/r10';
        apiClient.get(endpoint)
            .then((res: any) => {
                if (isAdmin) setR30(res);
                else if (isR20) setR20(res);
                else setR10(res);
            })
            .catch(() => { })
            .finally(() => setDangTai(false));
    }, [nguoiDung]);

    // ========== GUEST ==========
    if (!nguoiDung) {
        return <PublicHome />;
    }

    // ========== LOADING ==========
    if (dangTai) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-text-secondary">Đang tải dữ liệu thống kê...</p>
            </div>
        );
    }

    // ========== R20 DASHBOARD ==========
    if (isR20 && r20) {
        return <R20DashboardContent nguoiDung={nguoiDung} r20={r20} />;
    }

    // ========== R10 DASHBOARD ==========
    if (isR10 && r10) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Bảng Điều Khiển R10</h1>
                        <p className="text-text-secondary mt-1">
                            Xin chào, <span className="font-semibold text-text-primary">{nguoiDung.ten_hien_thi}</span>! Tổng quan chiến dịch mua traffic.
                        </p>
                    </div>
                    <Link href="/chien-dich/tao-moi" className="btn-primary"><Megaphone className="w-4 h-4 mr-2" /> Tạo chiến dịch</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard icon={Megaphone} label="Chiến dịch" value={`${r10.dang_chay} đang chạy`} color="indigo" subtext={`Tổng: ${r10.tong_chien_dich}`} />
                    <StatCard icon={Target} label="Lượt đã chạy" value={`${fmt(r10.tong_luot_da_chay)} / ${fmt(r10.tong_luot_mua)}`} color="green" subtext={r10.tong_luot_mua > 0 ? `${((r10.tong_luot_da_chay / r10.tong_luot_mua) * 100).toFixed(1)}%` : undefined} />
                    <StatCard icon={PiggyBank} label="Ngân sách đã dùng" value={fmtVND(r10.tong_da_dung)} color="purple" subtext={`Tổng: ${fmtVND(r10.tong_ngan_sach)}`} />
                    <StatCard icon={Wallet} label="Số dư khả dụng" value={fmtVND(r10.so_du_kha_dung)} color="amber" subtext={`Đang phong tỏa: ${fmtVND(r10.so_du_khoa_tam)}`} />
                </div>

                {/* Campaign table */}
                {r10.bang_chien_dich.length > 0 && (
                    <div className="card overflow-hidden">
                        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                            <Play className="w-4 h-4 text-indigo-500" />
                            <h3 className="font-semibold text-text-primary">Danh sách chiến dịch</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-surface-hover text-left">
                                        <th className="px-5 py-3 font-medium text-text-muted">Tên chiến dịch</th>
                                        <th className="px-5 py-3 font-medium text-text-muted">Gói</th>
                                        <th className="px-5 py-3 font-medium text-text-muted">Trạng thái</th>
                                        <th className="px-5 py-3 font-medium text-text-muted">Tiến độ</th>
                                        <th className="px-5 py-3 font-medium text-text-muted text-right">Ngân sách</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {r10.bang_chien_dich.map((cd) => {
                                        const pct = cd.so_luot_mua > 0 ? (cd.so_luot_da_chay / cd.so_luot_mua) * 100 : 0;
                                        return (
                                            <tr key={cd.ma_cong_khai} className="border-t border-border hover:bg-surface-hover/50">
                                                <td className="px-5 py-3 font-medium text-text-primary">{cd.ten_chien_dich}</td>
                                                <td className="px-5 py-3 text-text-secondary">{cd.ten_goi}</td>
                                                <td className="px-5 py-3"><TrangThaiBadge status={cd.trang_thai} /></td>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }}></div>
                                                        </div>
                                                        <span className="text-xs text-text-muted w-16 text-right">{cd.so_luot_da_chay}/{cd.so_luot_mua}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-right text-text-secondary">{fmtVND(cd.ngan_sach_da_dung)} / {fmtVND(cd.ngan_sach_tong)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/chien-dich" className="card p-5 flex items-center gap-4 hover:border-primary/40 hover:bg-surface-hover transition-colors group">
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform"><Megaphone className="w-5 h-5" /></div>
                        <div className="flex-1"><h4 className="font-semibold text-text-primary">Chiến dịch của tôi</h4><p className="text-xs text-text-secondary">Quản lý chiến dịch traffic</p></div>
                        <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary" />
                    </Link>
                    <Link href="/nap-tien" className="card p-5 flex items-center gap-4 hover:border-primary/40 hover:bg-surface-hover transition-colors group">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform"><WalletCards className="w-5 h-5" /></div>
                        <div className="flex-1"><h4 className="font-semibold text-text-primary">Nạp tiền</h4><p className="text-xs text-text-secondary">Thêm tiền vào ví giao dịch</p></div>
                        <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-emerald-600" />
                    </Link>
                </div>
            </div>
        );
    }

    // ========== R30 ADMIN DASHBOARD ==========
    if (isAdmin && r30) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Tổng Quan Hệ Thống</h1>
                    <p className="text-text-secondary mt-1">Bảng điều khiển quản trị viên R30</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <StatCard icon={Users} label="Tổng người dùng" value={fmt(r30.tong_nguoi_dung)} color="indigo" subtext={`R10: ${r30.so_r10} · R20: ${r30.so_r20}`} />
                    <StatCard icon={LinkIcon} label="Tổng link rút gọn" value={fmt(r30.tong_link)} color="sky" />
                    <StatCard icon={Megaphone} label="Chiến dịch" value={`${r30.chien_dich_dang_chay} đang chạy`} color="purple" subtext={`Tổng: ${r30.tong_chien_dich}`} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard icon={MousePointerClick} label="Click hôm nay" value={fmt(r30.click_hom_nay)} color="green" />
                    <StatCard icon={BarChart3} label="Click tuần này" value={fmt(r30.click_tuan_nay)} color="indigo" />
                    <StatCard icon={Globe} label="Click tháng này" value={fmt(r30.click_thang_nay)} color="sky" />
                    <StatCard icon={ShieldCheck} label="Tổng click hợp lệ" value={fmt(r30.tong_click_hop_le)} color="green" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatCard icon={CircleDollarSign} label="Tổng tiền trong hệ thống" value={fmtVND(r30.tong_tien_he_thong)} color="amber" subtext="Tổng số dư tất cả ví" />
                    <StatCard icon={TrendingUp} label="Doanh thu sàn" value={fmtVND(r30.doanh_thu_san)} color="rose" subtext="Chênh lệch mua - bán" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/admin/goi-thoi-gian" className="card p-5 flex items-center gap-4 hover:border-primary/40 hover:bg-surface-hover transition-colors group">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform"><LayoutDashboard className="w-5 h-5" /></div>
                        <div className="flex-1"><h4 className="font-semibold text-text-primary">Quản lý gói thời gian</h4><p className="text-xs text-text-secondary">Cấu hình gói và đơn giá</p></div>
                        <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-purple-600" />
                    </Link>
                </div>
            </div>
        );
    }

    // Fallback (loading / no data)
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-text-secondary">Đang tải...</p>
        </div>
    );
}
