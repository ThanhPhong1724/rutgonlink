'use client';



import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import apiClient from '../../../lib/api-client';
import { RefreshCw, CheckCircle, XCircle, Search, Clock, ListTodo, History, ChevronDown, Filter } from 'lucide-react';

interface YeuCau {
    ma_cong_khai: string;
    so_tien_yeu_cau: string;
    don_vi_tien: string;
    trang_thai: string;
    phuong_thuc_rut: string;
    thoi_diem_tao: string;
    nguoi_dung?: { ten_hien_thi: string; thu_dien_tu: string };
}

const TRANG_THAI_LABEL: Record<string, { text: string; cls: string }> = {
    cho_duyet: { text: 'Chờ duyệt', cls: 'bg-warning-light/20 text-warning-dark border-warning/20' },
    dang_xu_ly: { text: 'Đang xử lý', cls: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    da_duyet: { text: 'Đã duyệt', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    da_gui: { text: 'Đã gửi tiền', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
    hoan_thanh: { text: 'Hoàn thành', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    tu_choi: { text: 'Từ chối', cls: 'bg-red-100 text-red-700 border-red-200' },
};

const PAGE_SIZE = 10;

export default function AdminRutTienPage() {
    const { nguoiDung } = useAuth();
    const [danhSach, setDanhSach] = useState<YeuCau[]>([]);
    const [lichSu, setLichSu] = useState<YeuCau[]>([]);
    const [tongLichSu, setTongLichSu] = useState(0);
    const [dangTai, setDangTai] = useState(true);
    const [tab, setTab] = useState<'cho_xu_ly' | 'lich_su'>('cho_xu_ly');

    // Search & filter
    const [searchText, setSearchText] = useState('');
    const [filterPT, setFilterPT] = useState<'all' | 'ngan_hang' | 'usdt'>('all');
    const [filterTT, setFilterTT] = useState<string>('all');

    // Load more
    const [showCount, setShowCount] = useState(PAGE_SIZE);
    const [pageLS, setPageLS] = useState(1);

    const taiDanhSach = async () => {
        try {
            const res: any = await apiClient.get('/api/v1/rut-tien/cho-duyet');
            setDanhSach(res.yeu_cau || []);
        } catch { /* ignore */ }
        setDangTai(false);
    };

    const taiLichSu = async (p = 1) => {
        try {
            const res: any = await apiClient.get(`/api/v1/rut-tien/lich-su?page=${p}&limit=50`);
            setLichSu(res.yeu_cau || []);
            setTongLichSu(res.tong || 0);
        } catch { }
    };

    useEffect(() => { if (nguoiDung) { taiDanhSach(); taiLichSu(1); } }, [nguoiDung]);

    // Reset show count when switching tabs or changing filters
    useEffect(() => { setShowCount(PAGE_SIZE); }, [tab, searchText, filterPT, filterTT]);

    const duyet = async (ma: string) => {
        if (!confirm('Xác nhận duyệt yêu cầu rút?')) return;
        try {
            await apiClient.patch(`/api/v1/rut-tien/${ma}/duyet`);
            taiDanhSach(); taiLichSu(pageLS);
        } catch (err: any) { alert(err.thong_diep || err.message || 'Lỗi'); }
    };

    const tuChoi = async (ma: string) => {
        const lyDo = prompt('Lý do từ chối:');
        if (!lyDo) return;
        try {
            await apiClient.patch(`/api/v1/rut-tien/${ma}/tu-choi`, { ly_do: lyDo });
            taiDanhSach(); taiLichSu(pageLS);
        } catch (err: any) { alert(err.thong_diep || err.message || 'Lỗi'); }
    };

    const formatTien = (val: string) => Number(val).toLocaleString('vi-VN');
    const formatDate = (d: string) => new Date(d).toLocaleString('vi-VN', {
        hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
    });

    if (!nguoiDung) return <div className="text-center py-12">Đăng nhập để tiếp tục</div>;

    // Filtering logic
    const filterList = (list: YeuCau[]) => {
        let filtered = list;
        if (searchText.trim()) {
            const q = searchText.toLowerCase();
            filtered = filtered.filter(yc =>
                yc.nguoi_dung?.ten_hien_thi?.toLowerCase().includes(q) ||
                yc.nguoi_dung?.thu_dien_tu?.toLowerCase().includes(q) ||
                yc.so_tien_yeu_cau?.includes(q) ||
                yc.ma_cong_khai?.toLowerCase().includes(q)
            );
        }
        if (filterPT !== 'all') {
            filtered = filtered.filter(yc => yc.phuong_thuc_rut === filterPT);
        }
        if (filterTT !== 'all') {
            filtered = filtered.filter(yc => yc.trang_thai === filterTT);
        }
        return filtered;
    };

    const currentRaw = tab === 'cho_xu_ly' ? danhSach : lichSu;
    const currentFiltered = filterList(currentRaw);
    const currentList = currentFiltered.slice(0, showCount);
    const hasMore = currentFiltered.length > showCount;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Duyệt Yêu Cầu Rút Tiền</h1>
                    <p className="text-sm text-text-secondary mt-1">Quản lý và xử lý các yêu cầu rút doanh thu của đối tác</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-warning-light/50 text-warning-dark border border-warning-light">
                        <ListTodo className="w-4 h-4" />
                        <span className="hidden sm:inline">Chờ xử lý:</span>
                        <span className="font-bold">{danhSach.length}</span>
                    </span>
                    <button onClick={() => { taiDanhSach(); taiLichSu(pageLS); }} disabled={dangTai}
                        className="btn-outline flex items-center gap-2 bg-surface text-sm py-2">
                        <RefreshCw className={`w-4 h-4 ${dangTai ? 'animate-spin' : ''}`} /> Làm Mới
                    </button>
                </div>
            </div>

            <div className="card">
                {/* Tabs */}
                <div className="flex gap-6 border-b border-border px-6 pt-4">
                    <button onClick={() => setTab('cho_xu_ly')}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${tab === 'cho_xu_ly' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'}`}>
                        <Clock className="w-4 h-4" /> Chờ xử lý ({danhSach.length})
                    </button>
                    <button onClick={() => setTab('lich_su')}
                        className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${tab === 'lich_su' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'}`}>
                        <History className="w-4 h-4" /> Lịch sử ({tongLichSu})
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
                            placeholder="Tìm theo tên, email, số tiền..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-text-muted" />
                        <select value={filterPT} onChange={(e) => setFilterPT(e.target.value as any)}
                            className="px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:outline-none">
                            <option value="all">Tất cả PT</option>
                            <option value="ngan_hang">Ngân hàng</option>
                            <option value="usdt">USDT</option>
                        </select>
                        {tab === 'lich_su' && (
                            <select value={filterTT} onChange={(e) => setFilterTT(e.target.value)}
                                className="px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:outline-none">
                                <option value="all">Tất cả TT</option>
                                <option value="da_duyet">Đã duyệt</option>
                                <option value="hoan_thanh">Hoàn thành</option>
                                <option value="tu_choi">Từ chối</option>
                                <option value="da_gui">Đã gửi</option>
                            </select>
                        )}
                        {(searchText || filterPT !== 'all' || filterTT !== 'all') && (
                            <span className="text-xs text-text-muted">{currentFiltered.length} kết quả</span>
                        )}
                    </div>
                </div>

                {/* Content */}
                {dangTai ? (
                    <div className="flex flex-col items-center justify-center py-16 text-text-muted">
                        <RefreshCw className="w-8 h-8 animate-spin mb-3 text-primary/50" />
                        <p className="text-sm font-medium">Đang tải dữ liệu...</p>
                    </div>
                ) : currentList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mb-4">
                            {searchText || filterPT !== 'all' || filterTT !== 'all' ? <Search className="w-8 h-8 text-text-muted" /> :
                                <CheckCircle className="w-8 h-8 text-success" />}
                        </div>
                        <h3 className="text-lg font-medium text-text-primary mb-1">
                            {searchText || filterPT !== 'all' || filterTT !== 'all' ? 'Không tìm thấy kết quả' :
                                tab === 'cho_xu_ly' ? 'Không có yêu cầu rút chờ xử lý' : 'Chưa có lịch sử'}
                        </h3>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="text-xs text-text-muted uppercase bg-surface-hover border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Người rút</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider text-right">Số tiền</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Phương thức</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Trạng thái</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Thời gian</th>
                                        {tab === 'cho_xu_ly' && <th className="px-6 py-4 font-semibold tracking-wider text-right">Thao tác</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {currentList.map((yc) => {
                                        const tt = TRANG_THAI_LABEL[yc.trang_thai] || { text: yc.trang_thai, cls: 'bg-gray-100 text-gray-600' };
                                        return (
                                            <tr key={yc.ma_cong_khai} className="hover:bg-surface-hover/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-text-primary">{yc.nguoi_dung?.ten_hien_thi}</div>
                                                    <div className="text-xs text-text-muted mt-0.5 max-w-[150px] truncate" title={yc.nguoi_dung?.thu_dien_tu}>{yc.nguoi_dung?.thu_dien_tu}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-error">
                                                    {formatTien(yc.so_tien_yeu_cau)}đ
                                                </td>
                                                <td className="px-6 py-4">
                                                    {yc.phuong_thuc_rut === 'ngan_hang' ? (
                                                        <span className="text-indigo-600 font-medium bg-indigo-50 px-2.5 py-1 rounded-md text-xs">Ngân hàng</span>
                                                    ) : (
                                                        <span className="text-teal-600 font-medium bg-teal-50 px-2.5 py-1 rounded-md text-xs">USDT</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${tt.cls}`}>
                                                        {tt.text}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-text-secondary">{formatDate(yc.thoi_diem_tao)}</td>
                                                {tab === 'cho_xu_ly' && (
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2 flex-wrap">
                                                            {['cho_duyet', 'dang_xu_ly'].includes(yc.trang_thai) && (
                                                                <>
                                                                    <button onClick={() => duyet(yc.ma_cong_khai)}
                                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-success hover:bg-success/90 transition-colors shadow-sm">
                                                                        <CheckCircle className="w-3.5 h-3.5" /> Duyệt
                                                                    </button>
                                                                    <button onClick={() => tuChoi(yc.ma_cong_khai)}
                                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-error bg-error-light/20 hover:bg-error-light/30 transition-colors border border-error/20">
                                                                        <XCircle className="w-3.5 h-3.5" /> Từ chối
                                                                    </button>
                                                                </>
                                                            )}
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
                            {tab === 'lich_su' && ` (tổng server: ${tongLichSu})`}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


