import { useEffect, useState } from 'react';
import { X, Globe, DollarSign, LayoutList, Calendar, Hash, Image as ImageIcon, CheckCircle, Package, Search } from 'lucide-react';
import apiClient from '../../lib/api-client';

interface ChiTietChienDichModalProps {
    isOpen: boolean;
    onClose: () => void;
    maCongKhai: string | null;
    isAdmin?: boolean;
}

export default function ChiTietChienDichModal({ isOpen, onClose, maCongKhai, isAdmin = false }: ChiTietChienDichModalProps) {
    const [chiTiet, setChiTiet] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen || !maCongKhai) return;

        const fetchDetails = async () => {
            setLoading(true);
            setError('');
            try {
                const endpoint = isAdmin
                    ? `/api/v1/admin/chien-dich/${maCongKhai}`
                    : `/api/v1/chien-dich/${maCongKhai}`;
                const res: any = await apiClient.get(endpoint);
                setChiTiet(res);
            } catch (err: any) {
                setError(err?.response?.data?.message || 'Không thể tải thông tin chiến dịch');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [isOpen, maCongKhai, isAdmin]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface sticky top-0 z-10">
                    <h2 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                        <LayoutList className="w-5 h-5 text-primary" />
                        Chi Tiết Chiến Dịch
                    </h2>
                    <button onClick={onClose} className="p-2 -mr-2 text-text-muted hover:text-text-primary hover:bg-surface-hover rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16 text-text-muted">
                            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
                            <p>Đang tải thông tin...</p>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-error-light/20 text-error rounded-xl border border-error/20 flex items-center justify-center py-12">
                            {error}
                        </div>
                    ) : chiTiet ? (
                        <div className="space-y-6">
                            {/* General Info & Traffic */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-surface-hover rounded-xl border border-border">
                                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Globe className="w-4 h-4" /> Thông Tin Cơ Bản</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">Tên chiến dịch:</span>
                                            <span className="font-semibold text-text-primary text-right">{chiTiet.ten_chien_dich}</span>
                                        </div>
                                        {isAdmin && chiTiet.nguoi_mua && (
                                            <div className="flex justify-between">
                                                <span className="text-text-secondary">Người mua:</span>
                                                <span className="font-medium text-text-primary text-right">{chiTiet.nguoi_mua.ten_hien_thi} <br /><span className="text-xs text-text-muted">{chiTiet.nguoi_mua.thu_dien_tu}</span></span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">Trạng thái:</span>
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                                {chiTiet.trang_thai}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-text-secondary">Ngày tạo:</span>
                                            <span className="text-text-primary flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5 text-text-muted" />
                                                {new Date(chiTiet.thoi_diem_tao).toLocaleDateString('vi-VN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-surface-hover rounded-xl border border-border">
                                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Package className="w-4 h-4" /> Thông Tin Gói & Traffic</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">Tên gói:</span>
                                            <span className="font-medium text-primary text-right">{chiTiet.goi?.ten_goi} ({chiTiet.goi?.thoi_gian_cho}s)</span>
                                        </div>
                                        {isAdmin ? (
                                            <div className="flex justify-between items-center text-green-600">
                                                <span className="text-text-secondary">Giá bán traffic:</span>
                                                <span className="font-semibold flex items-center gap-1">
                                                    <DollarSign className="w-3.5 h-3.5" />
                                                    {chiTiet.goi?.don_gia_ban?.toLocaleString('vi-VN')} đ/lượt
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center text-text-primary">
                                                <span className="text-text-secondary">Đơn giá (mua):</span>
                                                <span className="font-semibold flex items-center gap-1">
                                                    <DollarSign className="w-3.5 h-3.5 text-primary" />
                                                    {chiTiet.goi?.don_gia_mua?.toLocaleString('vi-VN')} đ/lượt
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between pt-2 border-t border-border mt-2">
                                            <span className="text-text-secondary">Lượt đã chạy:</span>
                                            <span className="font-medium text-text-primary">
                                                {chiTiet.so_luot_da_chay?.toLocaleString('vi-VN')} / {chiTiet.so_luot_mua?.toLocaleString('vi-VN')} lượt
                                            </span>
                                        </div>

                                        <div className="w-full bg-border rounded-full h-1.5 mt-2">
                                            <div
                                                className="bg-primary h-1.5 rounded-full"
                                                style={{ width: `${Math.min((chiTiet.so_luot_da_chay / chiTiet.so_luot_mua) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Link & Keywords */}
                            <div className="p-4 bg-surface rounded-xl border border-border">
                                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Search className="w-4 h-4" /> Yêu Cầu Tìm Kiếm</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-text-secondary mb-1">Link Cần Traffic (Đích đến)</p>
                                        <a href={chiTiet.lien_ket_trang_dich} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline break-all bg-primary/5 p-2 rounded block">
                                            {chiTiet.lien_ket_trang_dich}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-secondary mb-1">Từ Khóa</p>
                                        <div className="flex flex-wrap gap-2">
                                            {(() => {
                                                try {
                                                    const keys = JSON.parse(chiTiet.tu_khoa);
                                                    if (Array.isArray(keys)) return keys.map((k: string, i: number) => (
                                                        <span key={i} className="px-2 py-1 bg-surface-hover border border-border rounded text-sm text-text-primary flex items-center gap-1"><Hash className="w-3 h-3 text-text-muted" /> {k}</span>
                                                    ));
                                                    return chiTiet.tu_khoa;
                                                } catch (e) {
                                                    return <span className="text-sm text-text-primary">{chiTiet.tu_khoa}</span>;
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Image Show */}
                            {(chiTiet.anh_minh_hoa_file || chiTiet.anh_minh_hoa_url) && (
                                <div className="p-4 bg-surface rounded-xl border border-border">
                                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> Hình Ảnh Minh Họa Kết Quả</h3>
                                    <div className="flex justify-center bg-surface-hover rounded-xl border border-border p-2">
                                        <img
                                            src={chiTiet.anh_minh_hoa_file ? `http://localhost:3001${chiTiet.anh_minh_hoa_file}` : chiTiet.anh_minh_hoa_url}
                                            alt="Minh họa"
                                            className="max-h-64 object-contain rounded"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
