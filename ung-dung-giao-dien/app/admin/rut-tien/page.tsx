'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import apiClient from '../../../lib/api-client';
import { RefreshCw, CheckCircle, XCircle, Search, Clock, ListTodo } from 'lucide-react';

interface YeuCau {
    ma_cong_khai: string;
    so_tien_yeu_cau: string;
    don_vi_tien: string;
    trang_thai: string;
    phuong_thuc_rut: string;
    thoi_diem_tao: string;
    nguoi_dung?: { ten_hien_thi: string; thu_dien_tu: string };
}

export default function AdminRutTienPage() {
    const { nguoiDung } = useAuth();
    const [danhSach, setDanhSach] = useState<YeuCau[]>([]);
    const [dangTai, setDangTai] = useState(true);

    const taiDanhSach = async () => {
        try {
            const res: any = await apiClient.get('/api/v1/rut-tien/cho-duyet');
            setDanhSach(res.yeu_cau || []);
        } catch { /* ignore */ }
        setDangTai(false);
    };

    useEffect(() => { if (nguoiDung) taiDanhSach(); }, [nguoiDung]);

    const duyet = async (ma: string) => {
        if (!confirm('Xác nhận duyệt yêu cầu rút?')) return;
        try {
            await apiClient.patch(`/api/v1/rut-tien/${ma}/duyet`);
            taiDanhSach();
        } catch (err: any) { alert(err.message || 'Lỗi'); }
    };

    const tuChoi = async (ma: string) => {
        const lyDo = prompt('Lý do từ chối:');
        if (!lyDo) return;
        try {
            await apiClient.patch(`/api/v1/rut-tien/${ma}/tu-choi`, { ly_do: lyDo });
            taiDanhSach();
        } catch (err: any) { alert(err.message || 'Lỗi'); }
    };

    const daGui = async (ma: string) => {
        const soTienThucChi = prompt('Số tiền thực chi:');
        if (!soTienThucChi) return;
        try {
            await apiClient.patch(`/api/v1/rut-tien/${ma}/da-gui`, { so_tien_thuc_chi: Number(soTienThucChi) });
            taiDanhSach();
        } catch (err: any) { alert(err.message || 'Lỗi'); }
    };

    const hoanThanh = async (ma: string) => {
        if (!confirm('Xác nhận hoàn thành chi rút?')) return;
        try {
            await apiClient.patch(`/api/v1/rut-tien/${ma}/hoan-thanh`, {});
            taiDanhSach();
        } catch (err: any) { alert(err.message || 'Lỗi'); }
    };

    const formatTien = (val: string) => Number(val).toLocaleString('vi-VN');

    if (!nguoiDung) return <div className="text-center py-12">Đăng nhập để tiếp tục</div>;

    return (
        <div>
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
                    <button
                        onClick={taiDanhSach}
                        disabled={dangTai}
                        className="btn-outline flex items-center gap-2 bg-surface text-sm py-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${dangTai ? 'animate-spin' : ''}`} /> Làm Mới
                    </button>
                </div>
            </div>

            <div className="card">
                {dangTai ? (
                    <div className="flex flex-col items-center justify-center py-16 text-text-muted">
                        <RefreshCw className="w-8 h-8 animate-spin mb-3 text-primary/50" />
                        <p className="text-sm font-medium">Đang tải dữ liệu...</p>
                    </div>
                ) : danhSach.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-success" />
                        </div>
                        <h3 className="text-lg font-medium text-text-primary mb-1">Không có yêu cầu rút chờ xử lý</h3>
                        <p className="text-sm text-text-secondary max-w-sm">Tất cả các yêu cầu rút tiền của đối tác đã được giải quyết.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="text-xs text-text-muted uppercase bg-surface-hover border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Người rút</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Số tiền</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Phương thức</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Thời gian</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {danhSach.map((yc) => (
                                    <tr key={yc.ma_cong_khai} className="hover:bg-surface-hover/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-text-primary">{yc.nguoi_dung?.ten_hien_thi}</div>
                                            <div className="text-xs text-text-muted mt-0.5 max-w-[150px] truncate" title={yc.nguoi_dung?.thu_dien_tu}>{yc.nguoi_dung?.thu_dien_tu}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-error">
                                            {formatTien(yc.so_tien_yeu_cau)}đ
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-text-secondary">
                                                {yc.phuong_thuc_rut === 'ngan_hang' ? (
                                                    <span className="text-indigo-600 font-medium bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 px-2.5 py-1 rounded-md text-xs">Ngân hàng</span>
                                                ) : (
                                                    <span className="text-teal-600 font-medium bg-teal-50 dark:bg-teal-500/10 dark:text-teal-400 px-2.5 py-1 rounded-md text-xs">USDT</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-light/20 text-warning-dark border border-warning/20">
                                                <Clock className="w-3.5 h-3.5" />
                                                {yc.trang_thai === 'cho_duyet' ? 'Chờ duyệt' : 'Đang xử lý'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-text-secondary">
                                            {new Date(yc.thoi_diem_tao).toLocaleString('vi-VN', {
                                                hour: '2-digit', minute: '2-digit',
                                                day: '2-digit', month: '2-digit', year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 flex-wrap">
                                                {['cho_duyet', 'dang_xu_ly'].includes(yc.trang_thai) && (
                                                    <>
                                                        <button
                                                            onClick={() => duyet(yc.ma_cong_khai)}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-success hover:bg-success/90 transition-colors shadow-sm"
                                                        >
                                                            <CheckCircle className="w-3.5 h-3.5" /> Duyệt
                                                        </button>
                                                        <button
                                                            onClick={() => tuChoi(yc.ma_cong_khai)}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-error bg-error-light/20 hover:bg-error-light/30 transition-colors border border-error/20"
                                                        >
                                                            <XCircle className="w-3.5 h-3.5" /> Từ chối
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
