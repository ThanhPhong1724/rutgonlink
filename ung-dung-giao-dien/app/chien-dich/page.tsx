'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import apiClient from '../../lib/api-client';
import Link from 'next/link';
import {
    Megaphone,
    Plus,
    Play,
    Pause,
    StopCircle,
    Clock,
    Target,
    DollarSign,
    Code,
    Copy,
    CheckCircle2,
    XCircle,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Eye,
    Loader2,
} from 'lucide-react';
import ChiTietChienDichModal from '../components/ChiTietChienDichModal';
import { BACKEND_URL } from '../../lib/api-client';

interface ChienDich {
    ma_cong_khai: string;
    ten_chien_dich: string;
    lien_ket_trang_dich: string;
    tu_khoa: string;
    anh_minh_hoa_url: string | null;
    anh_minh_hoa_file: string | null;
    so_luot_mua: number;
    so_luot_da_chay: number;
    ngan_sach_tong: number;
    ngan_sach_da_dung: number;
    trang_thai: string;
    ten_goi: string;
    thoi_gian_giay: number;
    don_gia_mua: number;
    thoi_diem_bat_dau: string;
    thoi_diem_ket_thuc: string | null;
    thoi_diem_tao: string;
}

const TRANG_THAI_MAP: Record<string, { label: string; color: string; bg: string }> = {
    hoat_dong: { label: 'Đang chạy', color: 'text-success', bg: 'bg-success-light' },
    tam_dung: { label: 'Tạm dừng', color: 'text-warning-dark', bg: 'bg-warning-light' },
    hoan_thanh: { label: 'Hoàn thành', color: 'text-info', bg: 'bg-indigo-50' },
    da_huy: { label: 'Đã hủy', color: 'text-text-muted', bg: 'bg-surface-hover' },
};

export default function ChienDichPage() {
    const { nguoiDung } = useAuth();
    const [danhSach, setDanhSach] = useState<ChienDich[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [expandedCode, setExpandedCode] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [dangXuLy, setDangXuLy] = useState<string | null>(null);
    const [chiTietMa, setChiTietMa] = useState<string | null>(null);

    const taiDanhSach = async () => {
        try {
            setDangTai(true);
            const res: any = await apiClient.get('/api/v1/chien-dich');
            setDanhSach(res.chien_dich || []);
        } catch (err) {
            console.error(err);
        } finally {
            setDangTai(false);
        }
    };

    useEffect(() => { taiDanhSach(); }, []);

    const thaoTac = async (ma: string, hanhDong: string) => {
        try {
            setDangXuLy(ma);
            await apiClient.patch(`/api/v1/chien-dich/${ma}/${hanhDong}`);
            await taiDanhSach();
        } catch (err: any) {
            alert(err?.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setDangXuLy(null);
        }
    };

    const copyEmbedCode = (maCongKhai: string) => {
        const baseUrl = BACKEND_URL;
        const code = `<div style="display:flex;justify-content:center;">\n<div id="rgl-embed"></div>\n<script src="${baseUrl}/api/v1/embed/${maCongKhai}/embed.js"></script>\n</div>`;
        navigator.clipboard.writeText(code);
        setCopied(maCongKhai);
        setTimeout(() => setCopied(null), 2000);
    };

    const tongLuot = danhSach.reduce((s, cd) => s + cd.so_luot_da_chay, 0);
    const tongNganSach = danhSach.reduce((s, cd) => s + cd.ngan_sach_tong, 0);
    const tongDaDung = danhSach.reduce((s, cd) => s + cd.ngan_sach_da_dung, 0);
    const dangChay = danhSach.filter(cd => cd.trang_thai === 'hoat_dong').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                        <Megaphone className="w-7 h-7 text-primary" />
                        Chiến Dịch Traffic
                    </h1>
                    <p className="text-sm text-text-muted mt-1">Quản lý chiến dịch mua traffic cho website của bạn</p>
                </div>
                <Link
                    href="/chien-dich/tao-moi"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Tạo chiến dịch
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">Đang chạy</span>
                        <Play className="w-4 h-4 text-success" />
                    </div>
                    <p className="text-2xl font-bold text-text-primary mt-1">{dangChay}</p>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">Tổng lượt</span>
                        <Target className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-text-primary mt-1">{tongLuot.toLocaleString('vi-VN')}</p>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">Ngân sách</span>
                        <DollarSign className="w-4 h-4 text-warning" />
                    </div>
                    <p className="text-2xl font-bold text-text-primary mt-1">{tongNganSach.toLocaleString('vi-VN')}đ</p>
                </div>
                <div className="bg-surface rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">Đã dùng</span>
                        <DollarSign className="w-4 h-4 text-error" />
                    </div>
                    <p className="text-2xl font-bold text-text-primary mt-1">{tongDaDung.toLocaleString('vi-VN')}đ</p>
                </div>
            </div>

            {/* Campaign List */}
            {dangTai ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : danhSach.length === 0 ? (
                <div className="text-center py-16 bg-surface rounded-xl border border-border">
                    <Megaphone className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-muted">Chưa có chiến dịch nào</p>
                    <Link href="/chien-dich/tao-moi" className="text-primary hover:underline text-sm mt-2 inline-block">
                        Tạo chiến dịch đầu tiên →
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {danhSach.map((cd) => {
                        const tt = TRANG_THAI_MAP[cd.trang_thai] || { label: cd.trang_thai, color: 'text-text-muted', bg: 'bg-surface-hover' };
                        const phanTram = cd.so_luot_mua > 0 ? Math.round((cd.so_luot_da_chay / cd.so_luot_mua) * 100) : 0;
                        const isExpanded = expandedCode === cd.ma_cong_khai;
                        const baseUrl = BACKEND_URL;

                        return (
                            <div key={cd.ma_cong_khai} className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-text-primary truncate">{cd.ten_chien_dich}</h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tt.color} ${tt.bg}`}>
                                                    {tt.label}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                                                <span className="flex items-center gap-1">
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                    <a href={cd.lien_ket_trang_dich} target="_blank" rel="noopener" className="hover:text-primary truncate max-w-[200px]">
                                                        {cd.lien_ket_trang_dich}
                                                    </a>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" /> {cd.ten_goi} ({cd.don_gia_mua.toLocaleString('vi-VN')}đ/lượt)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => setChiTietMa(cd.ma_cong_khai)}
                                                className="p-2 rounded-lg text-primary bg-primary-light/30 hover:bg-primary-light/60 transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {cd.trang_thai === 'hoat_dong' && (
                                                <button
                                                    onClick={() => thaoTac(cd.ma_cong_khai, 'tam-dung')}
                                                    disabled={dangXuLy === cd.ma_cong_khai}
                                                    className="p-2 rounded-lg text-warning-dark bg-warning-light/50 hover:bg-warning-light transition-colors"
                                                    title="Tạm dừng"
                                                >
                                                    <Pause className="w-4 h-4" />
                                                </button>
                                            )}
                                            {cd.trang_thai === 'tam_dung' && (
                                                <button
                                                    onClick={() => thaoTac(cd.ma_cong_khai, 'tiep-tuc')}
                                                    disabled={dangXuLy === cd.ma_cong_khai}
                                                    className="p-2 rounded-lg text-success bg-success-light/50 hover:bg-success-light transition-colors"
                                                    title="Tiếp tục"
                                                >
                                                    <Play className="w-4 h-4" />
                                                </button>
                                            )}
                                            {['hoat_dong', 'tam_dung'].includes(cd.trang_thai) && (
                                                <button
                                                    onClick={() => { if (confirm('Bạn chắc chắn muốn kết thúc chiến dịch? Ngân sách chưa dùng sẽ được hoàn lại.')) thaoTac(cd.ma_cong_khai, 'ket-thuc'); }}
                                                    disabled={dangXuLy === cd.ma_cong_khai}
                                                    className="p-2 rounded-lg text-error bg-error-light/20 hover:bg-error-light/40 transition-colors"
                                                    title="Kết thúc"
                                                >
                                                    <StopCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-sm mb-1.5">
                                            <span className="text-text-muted">Tiến độ: {cd.so_luot_da_chay}/{cd.so_luot_mua} lượt</span>
                                            <span className="font-semibold text-text-primary">{phanTram}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min(phanTram, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-text-muted mt-1.5">
                                            <span>Ngân sách: {cd.ngan_sach_da_dung.toLocaleString('vi-VN')}đ / {cd.ngan_sach_tong.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    </div>

                                    {/* Embed Code Toggle */}
                                    {cd.trang_thai === 'hoat_dong' && (
                                        <div className="mt-4 pt-4 border-t border-border">
                                            <button
                                                onClick={() => setExpandedCode(isExpanded ? null : cd.ma_cong_khai)}
                                                className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium"
                                            >
                                                <Code className="w-4 h-4" />
                                                Mã nhúng website
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                            {isExpanded && (
                                                <div className="mt-3 relative">
                                                    <pre className="bg-gray-900 text-gray-100 text-xs p-4 rounded-lg overflow-x-auto">
                                                        {`<div style="display:flex;justify-content:center;">
<div id="rgl-embed"></div>
<script src="${baseUrl}/api/v1/embed/${cd.ma_cong_khai}/embed.js"></script>
</div>`}
                                                    </pre>
                                                    <button
                                                        onClick={() => copyEmbedCode(cd.ma_cong_khai)}
                                                        className="absolute top-2 right-2 p-1.5 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                                                        title="Sao chép"
                                                    >
                                                        {copied === cd.ma_cong_khai ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                    <p className="text-xs text-text-muted mt-2">
                                                        Dán đoạn mã trên vào footer website của bạn. Khi người dùng bấm nút, hệ thống sẽ đếm ngược {cd.thoi_gian_giay} giây rồi hiển thị mã xác nhận.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <ChiTietChienDichModal
                isOpen={!!chiTietMa}
                onClose={() => setChiTietMa(null)}
                maCongKhai={chiTietMa}
            />
        </div>
    );
}

