'use client';



import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import apiClient from '../../../lib/api-client';
import { RefreshCw, CheckCircle, XCircle, Search, Clock, CheckCircle2, History, Filter, ChevronDown } from 'lucide-react';

interface HoaDon {
    ma_cong_khai: string;
    so_tien_yeu_cau: string;
    don_vi_tien: string;
    trang_thai: string;
    phuong_thuc_nap: string;
    noi_dung_tham_chieu: string;
    thoi_diem_tao: string;
    thoi_diem_duyet?: string;
    nguoi_dung?: { ten_hien_thi: string; thu_dien_tu: string };
}

const TRANG_THAI_MAP: Record<string, { label: string; color: string }> = {
    cho_thanh_toan: { label: 'Chờ thanh toán', color: '#f59e0b' },
    cho_duyet: { label: 'Chờ duyệt', color: '#f59e0b' },
    dang_kiem_tra: { label: 'Đang kiểm tra', color: '#3b82f6' },
    thanh_cong: { label: 'Thành công', color: '#22c55e' },
    tu_choi: { label: 'Từ chối', color: '#ef4444' },
    da_huy: { label: 'Đã hủy', color: '#6b7280' },
    het_han: { label: 'Hết hạn', color: '#6b7280' },
};

const PAGE_SIZE = 10;

export default function AdminNapTienPage() {
    const { nguoiDung } = useAuth();
    const [danhSach, setDanhSach] = useState<HoaDon[]>([]);
    const [lichSu, setLichSu] = useState<HoaDon[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [tab, setTab] = useState<'cho_duyet' | 'lich_su'>('cho_duyet');

    // Search & filter
    const [searchText, setSearchText] = useState('');
    const [filterPT, setFilterPT] = useState<'all' | 'ngan_hang' | 'usdt'>('all');

    // Load more
    const [showCount, setShowCount] = useState(PAGE_SIZE);

    const taiDanhSach = async () => {
        setDangTai(true);
        try {
            const [choDuyetRes, lichSuRes]: any[] = await Promise.all([
                apiClient.get('/api/v1/nap-tien/cho-duyet'),
                apiClient.get('/api/v1/nap-tien/lich-su-duyet'),
            ]);
            setDanhSach(choDuyetRes.hoa_don || []);
            setLichSu(lichSuRes.hoa_don || []);
        } catch { /* ignore */ }
        setDangTai(false);
    };

    useEffect(() => { if (nguoiDung) taiDanhSach(); }, [nguoiDung]);

    // Reset show count when switching tabs or changing filters
    useEffect(() => { setShowCount(PAGE_SIZE); }, [tab, searchText, filterPT]);

    const duyet = async (ma: string) => {
        if (!confirm('Xác nhận duyệt nạp tiền?')) return;
        try {
            await apiClient.patch(`/api/v1/nap-tien/${ma}/duyet`, {});
            taiDanhSach();
        } catch (err: any) { alert(err.thong_diep || err.chi_tiet || err.message || 'Lỗi'); }
    };

    const tuChoi = async (ma: string) => {
        const lyDo = prompt('Lý do từ chối:');
        if (!lyDo) return;
        try {
            await apiClient.patch(`/api/v1/nap-tien/${ma}/tu-choi`, { ly_do: lyDo });
            taiDanhSach();
        } catch (err: any) { alert(err.thong_diep || err.chi_tiet || err.message || 'Lỗi'); }
    };

    const formatTien = (val: string) => Number(val).toLocaleString('vi-VN');

    if (!nguoiDung) return <div className="text-center py-12">Đăng nhập để tiếp tục</div>;

    // Filtering logic
    const filterList = (list: HoaDon[]) => {
        let filtered = list;
        if (searchText.trim()) {
            const q = searchText.toLowerCase();
            filtered = filtered.filter(hd =>
                hd.noi_dung_tham_chieu?.toLowerCase().includes(q) ||
                hd.nguoi_dung?.ten_hien_thi?.toLowerCase().includes(q) ||
                hd.nguoi_dung?.thu_dien_tu?.toLowerCase().includes(q) ||
                hd.so_tien_yeu_cau?.includes(q)
            );
        }
        if (filterPT !== 'all') {
            filtered = filtered.filter(hd => hd.phuong_thuc_nap === filterPT);
        }
        return filtered;
    };

    const currentRaw = tab === 'cho_duyet' ? danhSach : lichSu;
    const currentFiltered = filterList(currentRaw);
    const currentList = currentFiltered.slice(0, showCount);
    const hasMore = currentFiltered.length > showCount;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Quản Lý Hóa Đơn Nạp</h1>
                    <p className="text-sm text-text-secondary mt-1">Duyệt và kiểm tra các yêu cầu nạp tiền từ người dùng</p>
                </div>
                <button
                    onClick={taiDanhSach}
                    disabled={dangTai}
                    className="btn-outline flex items-center gap-2 bg-surface text-sm py-2"
                >
                    <RefreshCw className={`w-4 h-4 ${dangTai ? 'animate-spin' : ''}`} /> Làm Mới
                </button>
            </div>

            <div className="card">
                {/* Tabs */}
                <div className="flex gap-6 border-b border-border px-6 pt-4">
                    <button onClick={() => setTab('cho_duyet')}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${tab === 'cho_duyet' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'}`}>
                        <Clock className="w-4 h-4" /> Chờ duyệt ({danhSach.length})
                    </button>
                    <button onClick={() => setTab('lich_su')}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${tab === 'lich_su' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'}`}>
                        <History className="w-4 h-4" /> Lịch sử đã xử lý ({lichSu.length})
                    </button>
                </div>

                {/* Search & Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 px-6 py-4 border-b border-border bg-surface-hover/30">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Tìm theo tên, email, mã tham chiếu, số tiền..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-text-muted" />
                        <select
                            value={filterPT}
                            onChange={(e) => setFilterPT(e.target.value as any)}
                            className="px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:outline-none"
                        >
                            <option value="all">Tất cả PT</option>
                            <option value="ngan_hang">Ngân hàng</option>
                            <option value="usdt">USDT</option>
                        </select>
                        {(searchText || filterPT !== 'all') && (
                            <span className="text-xs text-text-muted">{currentFiltered.length} kết quả</span>
                        )}
                    </div>
                </div>

                {dangTai ? (
                    <div className="flex flex-col items-center justify-center py-16 text-text-muted">
                        <RefreshCw className="w-8 h-8 animate-spin mb-3 text-primary/50" />
                        <p className="text-sm font-medium">Đang tải dữ liệu...</p>
                    </div>
                ) : currentList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mb-4">
                            {searchText || filterPT !== 'all' ? <Search className="w-8 h-8 text-text-muted" /> :
                                tab === 'cho_duyet' ? <CheckCircle2 className="w-8 h-8 text-success" /> : <Search className="w-8 h-8 text-text-muted" />}
                        </div>
                        <h3 className="text-lg font-medium text-text-primary mb-1">
                            {searchText || filterPT !== 'all' ? 'Không tìm thấy kết quả' :
                                tab === 'cho_duyet' ? 'Không có hóa đơn chờ duyệt' : 'Chưa có lịch sử giao dịch'}
                        </h3>
                        <p className="text-sm text-text-secondary max-w-sm">
                            {searchText || filterPT !== 'all' ? 'Thử thay đổi từ khóa hoặc bộ lọc.' :
                                tab === 'cho_duyet' ? 'Tuyệt vời! Bạn đã xử lý xong tất cả các yêu cầu nạp tiền hiện tại.' : 'Chưa có giao dịch nạp tiền nào được xử lý trong hệ thống.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="text-xs text-text-muted uppercase bg-surface-hover border-y border-border">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Người nạp</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Mã GD tham chiếu</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider text-right">Số tiền</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Phương thức</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Trạng thái</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Thời gian</th>
                                        {tab === 'cho_duyet' && <th className="px-6 py-4 font-semibold tracking-wider text-right">Thao tác</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {currentList.map((hd) => {
                                        const tt = TRANG_THAI_MAP[hd.trang_thai] || { label: hd.trang_thai, color: '#6b7280' };
                                        return (
                                            <tr key={hd.ma_cong_khai} className="hover:bg-surface-hover/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-text-primary">{hd.nguoi_dung?.ten_hien_thi}</div>
                                                    <div className="text-xs text-text-muted mt-0.5 max-w-[150px] truncate" title={hd.nguoi_dung?.thu_dien_tu}>{hd.nguoi_dung?.thu_dien_tu}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-xs bg-surface-hover px-2 py-1 rounded text-text-secondary border border-border">
                                                        {hd.noi_dung_tham_chieu}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-primary">
                                                    {formatTien(hd.so_tien_yeu_cau)}đ
                                                </td>
                                                <td className="px-6 py-4">
                                                    {hd.phuong_thuc_nap === 'ngan_hang' ? (
                                                        <span className="text-indigo-600 font-medium bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 px-2.5 py-1 rounded-md text-xs">Ngân hàng</span>
                                                    ) : (
                                                        <span className="text-teal-600 font-medium bg-teal-50 dark:bg-teal-500/10 dark:text-teal-400 px-2.5 py-1 rounded-md text-xs">USDT</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold"
                                                        style={{ backgroundColor: `${tt.color}15`, color: tt.color, border: `1px solid ${tt.color}30` }}>
                                                        {tt.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-text-secondary">
                                                    {new Date(hd.thoi_diem_tao).toLocaleString('vi-VN', {
                                                        hour: '2-digit', minute: '2-digit',
                                                        day: '2-digit', month: '2-digit', year: 'numeric'
                                                    })}
                                                </td>
                                                {tab === 'cho_duyet' && (
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => duyet(hd.ma_cong_khai)}
                                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-success hover:bg-success/90 transition-colors shadow-sm"
                                                            >
                                                                <CheckCircle className="w-3.5 h-3.5" /> Duyệt
                                                            </button>
                                                            <button
                                                                onClick={() => tuChoi(hd.ma_cong_khai)}
                                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-error bg-error-light/20 hover:bg-error-light/30 transition-colors border border-error/20"
                                                            >
                                                                <XCircle className="w-3.5 h-3.5" /> Từ chối
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Load more */}
                        {hasMore && (
                            <div className="flex justify-center py-4 border-t border-border">
                                <button
                                    onClick={() => setShowCount(c => c + PAGE_SIZE)}
                                    className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-text-secondary hover:text-primary border border-border rounded-lg hover:bg-surface-hover transition-colors"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                    Xem thêm ({currentFiltered.length - showCount} còn lại)
                                </button>
                            </div>
                        )}

                        {/* Summary */}
                        <div className="px-6 py-3 border-t border-border text-xs text-text-muted">
                            Hiển thị {currentList.length} / {currentFiltered.length} yêu cầu
                            {(searchText || filterPT !== 'all') && ` (tổng: ${currentRaw.length})`}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}



