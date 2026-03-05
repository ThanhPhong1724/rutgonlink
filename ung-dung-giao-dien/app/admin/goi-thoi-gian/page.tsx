'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../../lib/api-client';
import {
    Package,
    Clock,
    DollarSign,
    Save,
    Loader2,
    CheckCircle2,
    PauseCircle,
    PlayCircle,
} from 'lucide-react';

interface GoiThoiGian {
    ma: string;
    ma_cong_khai: string;
    ten_goi: string;
    thoi_gian_giay: number;
    don_gia_mua: string;
    don_gia_ban: string;
    don_vi_tien: string;
    trang_thai: string;
    thu_tu: number;
}

export default function AdminGoiThoiGianPage() {
    const [goiList, setGoiList] = useState<GoiThoiGian[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [dangLuu, setDangLuu] = useState<string | null>(null);
    const [thanhCong, setThanhCong] = useState<string | null>(null);

    // Dữ liệu chỉnh sửa tạm
    const [editData, setEditData] = useState<Record<string, { don_gia_mua: string; don_gia_ban: string; trang_thai: string }>>({});

    const taiDanhSach = async () => {
        try {
            setDangTai(true);
            const res: any = await apiClient.get('/api/v1/admin/goi-thoi-gian');
            const list = res.goi || [];
            setGoiList(list);
            const ed: any = {};
            list.forEach((g: GoiThoiGian) => {
                ed[g.ma_cong_khai] = {
                    don_gia_mua: g.don_gia_mua,
                    don_gia_ban: g.don_gia_ban,
                    trang_thai: g.trang_thai,
                };
            });
            setEditData(ed);
        } catch (err) {
            console.error(err);
        } finally {
            setDangTai(false);
        }
    };

    useEffect(() => { taiDanhSach(); }, []);

    const luuGoi = async (maCongKhai: string) => {
        const data = editData[maCongKhai];
        if (!data) return;
        try {
            setDangLuu(maCongKhai);
            await apiClient.patch(`/api/v1/admin/goi-thoi-gian/${maCongKhai}`, {
                don_gia_mua: Number(data.don_gia_mua),
                don_gia_ban: Number(data.don_gia_ban),
                trang_thai: data.trang_thai,
            });
            setThanhCong(maCongKhai);
            setTimeout(() => setThanhCong(null), 2000);
            await taiDanhSach();
        } catch (err: any) {
            alert(err?.response?.data?.message || 'Lỗi khi lưu');
        } finally {
            setDangLuu(null);
        }
    };

    const updateField = (ma: string, field: string, value: string) => {
        setEditData(prev => ({
            ...prev,
            [ma]: { ...prev[ma], [field]: value },
        }));
    };

    if (dangTai) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                    <Package className="w-7 h-7 text-primary" />
                    Cấu hình Gói Thời Gian
                </h1>
                <p className="text-sm text-text-muted mt-1">Quản lý giá và trạng thái các gói tương tác traffic</p>
            </div>

            <div className="grid gap-4">
                {goiList.map((goi) => {
                    const ed = editData[goi.ma_cong_khai] || ({} as any);
                    const isActive = ed.trang_thai === 'hoat_dong';

                    return (
                        <div key={goi.ma_cong_khai} className={`bg-surface rounded-xl border p-5 transition-all ${isActive ? 'border-primary/30' : 'border-border opacity-60'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-primary-light text-primary' : 'bg-surface-hover text-text-muted'}`}>
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">{goi.ten_goi}</h3>
                                        <p className="text-xs text-text-muted">{goi.thoi_gian_giay} giây tương tác</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateField(goi.ma_cong_khai, 'trang_thai', isActive ? 'tam_ngung' : 'hoat_dong')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-success-light text-success hover:bg-success-light/80' : 'bg-surface-hover text-text-muted hover:bg-surface-hover/80'}`}
                                >
                                    {isActive ? <><PlayCircle className="w-4 h-4" /> Hoạt động</> : <><PauseCircle className="w-4 h-4" /> Tạm ngưng</>}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-text-muted mb-1">
                                        <DollarSign className="w-3.5 h-3.5 inline" /> Giá mua (R10 trả) — VND/lượt
                                    </label>
                                    <input
                                        type="number"
                                        value={ed.don_gia_mua || ''}
                                        onChange={(e) => updateField(goi.ma_cong_khai, 'don_gia_mua', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-muted mb-1">
                                        <DollarSign className="w-3.5 h-3.5 inline" /> Giá bán (R20 nhận) — VND/lượt
                                    </label>
                                    <input
                                        type="number"
                                        value={ed.don_gia_ban || ''}
                                        onChange={(e) => updateField(goi.ma_cong_khai, 'don_gia_ban', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => luuGoi(goi.ma_cong_khai)}
                                    disabled={dangLuu === goi.ma_cong_khai}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors"
                                >
                                    {dangLuu === goi.ma_cong_khai ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : thanhCong === goi.ma_cong_khai ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    {thanhCong === goi.ma_cong_khai ? 'Đã lưu!' : 'Lưu thay đổi'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
