'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { useRouter } from 'next/navigation';
import apiClient from '../../../lib/api-client';
import { RefreshCw, Search, Filter, Play, Pause, Ban, MoreVertical, Eye } from 'lucide-react';
import ChiTietChienDichModal from '../../components/ChiTietChienDichModal';

export default function AdminChienDich() {
    const { nguoiDung, dangDangNhap: isLoading } = useAuth();
    const router = useRouter();

    const [danhSach, setDanhSach] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [tongTrang, setTongTrang] = useState(1);
    const [search, setSearch] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const [chiTietMa, setChiTietMa] = useState<string | null>(null);

    // Kiem tra quyen
    useEffect(() => {
        if (!isLoading && (!nguoiDung || !['R30', 'R40'].includes(nguoiDung.loai_tai_khoan))) {
            router.push('/');
        }
    }, [nguoiDung, isLoading, router]);

    const taiDanhSach = async () => {
        setIsFetching(true);
        try {
            const res: any = await apiClient.get('/api/v1/admin/chien-dich', {
                params: { page, limit: 10, search, trang_thai: trangThai }
            });
            setDanhSach(res.danh_sach);
            setTongTrang(res.tong_trang);
        } catch (error) {
            console.error('Lỗi tải danh sách chiến dịch:', error);
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
        if (!confirm(`Bạn có chắc muốn chuyển trạng thái thành '${newStatus}'?`)) return;

        try {
            await apiClient.patch(`/api/v1/admin/chien-dich/${maCongKhai}/trang-thai`, { trang_thai: newStatus });
            taiDanhSach();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'hoat_dong': return <span className="bg-green-100 text-green-700 font-medium px-2 py-1 rounded text-xs select-none">Hoạt động</span>;
            case 'tam_dung': return <span className="bg-yellow-100 text-yellow-700 font-medium px-2 py-1 rounded text-xs select-none">Tạm dừng</span>;
            case 'hoan_thanh': return <span className="bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded text-xs select-none">Hoàn thành</span>;
            case 'da_huy': return <span className="bg-red-100 text-red-700 font-medium px-2 py-1 rounded text-xs select-none">Đã hủy</span>;
            default: return <span className="bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded text-xs select-none">{status}</span>;
        }
    };

    if (isLoading || !nguoiDung) return null;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary">Quản Lý Chiến Dịch</h1>
                    <p className="text-text-secondary text-sm mt-1">Giám sát và kiếm soát các chiến dịch traffic toàn hệ thống</p>
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
                            placeholder="Tìm tên hoặc URL..."
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
                            <option value="tam_dung">Tạm dừng</option>
                            <option value="hoan_thanh">Hoàn thành</option>
                            <option value="da_huy">Đã hủy</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-surface border-b border-border text-text-muted text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Chiến dịch & Gói</th>
                                <th className="px-6 py-4">Người mua</th>
                                <th className="px-6 py-4">Tiến độ</th>
                                <th className="px-6 py-4">Ngân sách</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 text-text-primary">
                            {isFetching ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">Đang tải dữ liệu...</td>
                                </tr>
                            ) : danhSach.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">Không tìm thấy chiến dịch nào</td>
                                </tr>
                            ) : (
                                danhSach.map((cd) => (
                                    <tr key={cd.ma_cong_khai} className="hover:bg-surface-hover/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-text-primary max-w-[200px] truncate" title={cd.ten_chien_dich}>{cd.ten_chien_dich}</div>
                                            <div className="text-xs text-text-muted mt-0.5">{cd.ten_goi}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{cd.nguoi_mua}</div>
                                            <div className="text-xs text-text-muted">{cd.thu_dien_tu}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-surface border border-border rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary"
                                                        style={{ width: `${Math.min(100, (cd.so_luot_da_chay / cd.so_luot_mua) * 100)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-medium text-text-secondary">{cd.so_luot_da_chay}/{cd.so_luot_mua}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium font-mono text-primary">
                                            {cd.ngan_sach_tong.toLocaleString('vi-VN')} đ
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(cd.trang_thai)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setChiTietMa(cd.ma_cong_khai)} className="p-1.5 text-primary hover:bg-primary-light/30 rounded-md transition-colors" title="Xem chi tiết">
                                                    <Eye className="w-4 h-4" />
                                                </button>

                                                {cd.trang_thai === 'hoat_dong' ? (
                                                    <button onClick={() => thayDoiTrangThai(cd.ma_cong_khai, 'tam_dung')} className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors" title="Tạm dừng">
                                                        <Pause className="w-4 h-4" />
                                                    </button>
                                                ) : cd.trang_thai === 'tam_dung' ? (
                                                    <button onClick={() => thayDoiTrangThai(cd.ma_cong_khai, 'hoat_dong')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Tiếp tục">
                                                        <Play className="w-4 h-4" />
                                                    </button>
                                                ) : null}

                                                {cd.trang_thai !== 'da_huy' && cd.trang_thai !== 'hoan_thanh' && (
                                                    <button onClick={() => thayDoiTrangThai(cd.ma_cong_khai, 'da_huy')} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hủy bỏ">
                                                        <Ban className="w-4 h-4" />
                                                    </button>
                                                )}
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

            <ChiTietChienDichModal
                isOpen={!!chiTietMa}
                onClose={() => setChiTietMa(null)}
                maCongKhai={chiTietMa}
                isAdmin={true}
            />
        </div>
    );
}
