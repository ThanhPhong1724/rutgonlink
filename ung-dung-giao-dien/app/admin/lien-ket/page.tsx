'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { useRouter } from 'next/navigation';
import apiClient from '../../../lib/api-client';
import { RefreshCw, Search, Filter, Lock, Unlock, MoreVertical } from 'lucide-react';



export default function AdminLienKet() {
    const { nguoiDung, dangDangNhap: isLoading } = useAuth();
    const router = useRouter();

    const [danhSach, setDanhSach] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [tongTrang, setTongTrang] = useState(1);
    const [search, setSearch] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        if (!isLoading && (!nguoiDung || !['R30', 'R40'].includes(nguoiDung.loai_tai_khoan))) {
            router.push('/');
        }
    }, [nguoiDung, isLoading, router]);

    const taiDanhSach = async () => {
        setIsFetching(true);
        try {
            const res: any = await apiClient.get('/api/v1/admin/lien-ket', {
                params: { page, limit: 10, search, trang_thai: trangThai }
            });
            setDanhSach(res.danh_sach);
            setTongTrang(res.tong_trang);
        } catch (error) {
            console.error('Lỗi tải danh sách liên kết:', error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (nguoiDung && ['R30', 'R40'].includes(nguoiDung.loai_tai_khoan)) {
            taiDanhSach();
        }
    }, [page, nguoiDung, search, trangThai]);

    const thayDoiTrangThai = async (maCongKhai: string, newStatus: string) => {
        if (!confirm(`Bạn có chắc muốn chuyển trạng thái liên kết thành '${newStatus}'?`)) return;

        try {
            await apiClient.patch(`/api/v1/admin/lien-ket/${maCongKhai}/trang-thai`, { trang_thai: newStatus });
            taiDanhSach();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'hoat_dong': return <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded text-xs select-none">Hoạt động</span>;
            case 'tam_khoa': return <span className="bg-red-100 text-red-700 font-medium px-2 py-1 rounded text-xs select-none">Bị khóa</span>;
            case 'cho_duyet': return <span className="bg-yellow-100 text-yellow-700 font-medium px-2 py-1 rounded text-xs select-none">Chờ duyệt</span>;
            default: return <span className="bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded text-xs select-none">{status}</span>;
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Đã sao chép!');
    };

    if (isLoading || !nguoiDung) return null;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">Quản Lý Liên Kết</h1>
                    <p className="text-text-secondary text-sm mt-1">Quản lý và kiểm duyệt các liên kết rút gọn trong hệ thống</p>
                </div>
                <button
                    onClick={taiDanhSach}
                    className="flex items-center gap-2 bg-white border border-border text-text-primary px-4 py-2 rounded-lg hover:bg-surface-hover transition-colors shadow-sm text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                    disabled={isFetching}
                >
                    <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                    Làm mới
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden flex flex-col">
                <div className="p-4 border-b border-border bg-surface/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Tìm URL, mã ngắn..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-4 h-4 text-text-muted hidden md:block" />
                        <select
                            className="w-full md:w-auto px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm cursor-pointer"
                            value={trangThai}
                            onChange={(e) => setTrangThai(e.target.value)}
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="hoat_dong">Hoạt động</option>
                            <option value="tam_khoa">Bị khóa</option>
                            <option value="cho_duyet">Chờ duyệt</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-surface border-b border-border text-text-muted text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Mã ngắn</th>
                                <th className="px-6 py-4">Liên kết gốc</th>
                                <th className="px-6 py-4">Người tạo</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 text-text-primary">
                            {isFetching ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-text-muted">Đang tải dữ liệu...</td>
                                </tr>
                            ) : danhSach.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-text-muted">Không tìm thấy liên kết nào</td>
                                </tr>
                            ) : (
                                danhSach.map((lk) => (
                                    <tr key={lk.ma_cong_khai} className="hover:bg-surface-hover/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-text-primary">{lk.ma_ngan}</div>
                                            {lk.bi_danh && <div className="text-xs text-text-muted mt-0.5">{lk.bi_danh}</div>}
                                        </td>
                                        <td className="px-6 py-4 cursor-pointer hover:bg-gray-50" onClick={() => copyToClipboard(lk.lien_ket_goc)}>
                                            <div className="max-w-[300px] truncate text-primary" title={lk.lien_ket_goc}>{lk.lien_ket_goc}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{lk.nguoi_tao}</div>
                                            <div className="text-xs text-text-muted">{lk.thu_dien_tu}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(lk.trang_thai)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {lk.trang_thai === 'hoat_dong' ? (
                                                    <button onClick={() => thayDoiTrangThai(lk.ma_cong_khai, 'tam_khoa')} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Khóa liên kết">
                                                        <Lock className="w-4 h-4" />
                                                    </button>
                                                ) : lk.trang_thai === 'tam_khoa' ? (
                                                    <button onClick={() => thayDoiTrangThai(lk.ma_cong_khai, 'hoat_dong')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Mở khóa liên kết">
                                                        <Unlock className="w-4 h-4" />
                                                    </button>
                                                ) : null}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {tongTrang > 1 && (
                    <div className="p-4 border-t border-border flex justify-between items-center bg-surface/30">
                        <span className="text-sm text-text-muted">
                            Trang {page} / {tongTrang}
                        </span>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className="px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-surface-hover disabled:opacity-50 transition-colors"
                            >
                                Trước
                            </button>
                            <button
                                disabled={page === tongTrang}
                                onClick={() => setPage(p => Math.min(tongTrang, p + 1))}
                                className="px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-surface-hover disabled:opacity-50 transition-colors"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

