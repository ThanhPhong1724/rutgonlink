'use client';



import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import apiClient from '../../../lib/api-client';
import { BACKEND_URL } from '../../../lib/api-client';
import {
    Megaphone,
    ArrowLeft,
    Clock,
    DollarSign,
    Globe,
    Search,
    ImageIcon,
    Hash,
    AlertCircle,
    Loader2,
    CheckCircle2,
    UploadCloud,
} from 'lucide-react';

interface GoiThoiGian {
    ma_cong_khai: string;
    ten_goi: string;
    thoi_gian_giay: number;
    don_gia_mua: string;
    don_gia_ban: string;
    don_vi_tien: string;
    trang_thai: string;
}

export default function TaoChienDichPage() {
    const { nguoiDung } = useAuth();
    const router = useRouter();

    const [goiList, setGoiList] = useState<GoiThoiGian[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [dangGui, setDangGui] = useState(false);
    const [loiChung, setLoiChung] = useState('');
    const [soDuVi, setSoDuVi] = useState(0);

    // Form state
    const [selectedGoi, setSelectedGoi] = useState('');
    const [tenChienDich, setTenChienDich] = useState('');
    const [lienKet, setLienKet] = useState('');
    const [tuKhoa, setTuKhoa] = useState('');
    const [anhMinhHoaUrl, setAnhMinhHoaUrl] = useState('');
    const [anhMinhHoaFile, setAnhMinhHoaFile] = useState('');
    const [dangUploadAnh, setDangUploadAnh] = useState(false);
    const [soLuotMua, setSoLuotMua] = useState(50);

    useEffect(() => {
        const taiDuLieu = async () => {
            try {
                const [goiRes, viRes]: any[] = await Promise.all([
                    apiClient.get('/api/v1/goi-thoi-gian'),
                    apiClient.get('/api/v1/vi/so-du'),
                ]);
                const goi = goiRes.goi || [];
                setGoiList(goi);
                if (goi.length > 0) setSelectedGoi(goi[0].ma_cong_khai);
                // vi is an array: [{so_du_kha_dung, so_du_khoa_tam, ...}]
                const viArr = viRes.vi || [];
                if (viArr.length > 0) {
                    setSoDuVi(Number(viArr[0].so_du_kha_dung || 0));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setDangTai(false);
            }
        };
        taiDuLieu();
    }, []);

    const goiDaChon = goiList.find(g => g.ma_cong_khai === selectedGoi);
    const donGia = goiDaChon ? Number(goiDaChon.don_gia_mua) : 0;
    const nganSach = donGia * soLuotMua;
    const soDuHienTai = soDuVi;
    const duSoDu = soDuHienTai >= nganSach;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoiChung('');

        if (!selectedGoi || !tenChienDich.trim() || !lienKet.trim() || !tuKhoa.trim() || soLuotMua < 1) {
            setLoiChung('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (!duSoDu) {
            setLoiChung(`Số dư không đủ. Cần ${nganSach.toLocaleString('vi-VN')}đ, hiện có ${soDuHienTai.toLocaleString('vi-VN')}đ.`);
            return;
        }

        try {
            setDangGui(true);
            await apiClient.post('/api/v1/chien-dich', {
                ma_goi_cong_khai: selectedGoi,
                ten_chien_dich: tenChienDich.trim(),
                lien_ket_trang_dich: lienKet.trim(),
                tu_khoa: tuKhoa.trim(),
                anh_minh_hoa_url: anhMinhHoaUrl.trim() || undefined,
                anh_minh_hoa_file: anhMinhHoaFile.trim() || undefined,
                so_luot_mua: soLuotMua,
            });
            router.push('/chien-dich');
        } catch (err: any) {
            setLoiChung(err?.response?.data?.message || 'Có lỗi xảy ra khi tạo chiến dịch');
        } finally {
            setDangGui(false);
        }
    };

    if (dangTai) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-surface-hover transition-colors">
                    <ArrowLeft className="w-5 h-5 text-text-muted" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                        <Megaphone className="w-6 h-6 text-primary" />
                        Tạo Chiến Dịch Mới
                    </h1>
                    <p className="text-sm text-text-muted mt-0.5">Tạo chiến dịch mua traffic cho website của bạn</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Chọn Gói */}
                <div className="bg-surface rounded-xl border border-border p-5">
                    <h2 className="font-semibold text-text-primary flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-primary" /> Chọn gói thời gian tương tác
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {goiList.map((goi) => (
                            <button
                                key={goi.ma_cong_khai}
                                type="button"
                                onClick={() => setSelectedGoi(goi.ma_cong_khai)}
                                className={`p-4 rounded-xl border-2 text-center transition-all ${selectedGoi === goi.ma_cong_khai
                                    ? 'border-primary bg-primary-light shadow-sm'
                                    : 'border-border hover:border-primary/40 bg-surface'
                                    }`}
                            >
                                <p className="text-lg font-bold text-text-primary">{goi.thoi_gian_giay}s</p>
                                <p className="text-xs text-text-muted mt-1">{Number(goi.don_gia_mua).toLocaleString('vi-VN')}đ/lượt</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Thông tin chiến dịch */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
                    <h2 className="font-semibold text-text-primary flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" /> Thông tin chiến dịch
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">Tên chiến dịch</label>
                        <input
                            type="text"
                            value={tenChienDich}
                            onChange={(e) => setTenChienDich(e.target.value)}
                            placeholder="VD: Tăng traffic trang chủ BinhBun.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">
                            <Globe className="w-4 h-4 inline mr-1" /> Link website cần traffic
                        </label>
                        <input
                            type="url"
                            value={lienKet}
                            onChange={(e) => setLienKet(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">
                            <Search className="w-4 h-4 inline mr-1" /> Từ khóa (mỗi dòng 1 từ khóa)
                        </label>
                        <textarea
                            value={tuKhoa}
                            onChange={(e) => setTuKhoa(e.target.value)}
                            placeholder="Nhập từ khóa của bạn vào đây&#10;VD: mua hàng online&#10;shop thời trang"
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">
                            <Hash className="w-4 h-4 inline mr-1" /> Số lượt traffic cần mua
                        </label>
                        <input
                            type="number"
                            value={soLuotMua}
                            onChange={(e) => setSoLuotMua(Math.max(1, parseInt(e.target.value) || 1))}
                            min={1}
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">
                            <ImageIcon className="w-4 h-4 inline mr-1" /> Ảnh minh họa kết quả Google (Tải lên)
                        </label>
                        <div className="flex gap-2 items-center">
                            <label className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors text-sm font-medium">
                                <UploadCloud className="w-4 h-4" />
                                {dangUploadAnh ? 'Đang tải lên...' : 'Chọn ảnh'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={dangUploadAnh}
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setDangUploadAnh(true);
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        try {
                                            const res: any = await apiClient.post('/api/v1/upload', formData, {
                                                headers: { 'Content-Type': 'multipart/form-data' }
                                            });
                                            if (res.thanh_cong) {
                                                setAnhMinhHoaFile(res.filePath);
                                                setAnhMinhHoaUrl(''); // Xóa URL cũ nếu tải ảnh lên
                                            }
                                        } catch (error) {
                                            alert('Lỗi tải ảnh');
                                        } finally {
                                            setDangUploadAnh(false);
                                        }
                                    }}
                                />
                            </label>
                            {anhMinhHoaFile && (
                                <span className="text-sm text-green-600 font-medium">Đã tải lên!</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="text-xs text-text-muted">HOẶC NHẬP LINK</span>
                        <div className="h-px bg-border flex-1"></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5">
                            Link ảnh minh họa kết quả Google
                        </label>
                        <input
                            type="url"
                            value={anhMinhHoaUrl}
                            onChange={(e) => {
                                setAnhMinhHoaUrl(e.target.value);
                                if (e.target.value) setAnhMinhHoaFile(''); // Ưu tiên URL nếu người dùng nhập
                            }}
                            placeholder="https://example.com/anh-google-search.png"
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                        <p className="text-xs text-text-muted mt-1.5">
                            Ảnh screenshot kết quả hiển thị trên Google tìm kiếm (giúp người cày dễ tìm hơn)
                        </p>

                        {/* Preview Image */}
                        {(anhMinhHoaFile || anhMinhHoaUrl) && (
                            <div className="mt-3 border border-border bg-surface-hover rounded-lg overflow-hidden flex justify-center p-2 relative">
                                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">Preview</span>
                                <img
                                    src={anhMinhHoaFile ? `${BACKEND_URL}${anhMinhHoaFile}` : anhMinhHoaUrl}
                                    alt="Preview"
                                    className="max-h-48 object-contain rounded shadow-sm"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Tóm tắt ngân sách */}
                <div className={`rounded-xl border p-5 ${duSoDu ? 'bg-success-light/30 border-success/30' : 'bg-error-light/30 border-error/30'}`}>
                    <h2 className="font-semibold text-text-primary flex items-center gap-2 mb-3">
                        <DollarSign className="w-5 h-5" /> Tóm tắt ngân sách
                    </h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-text-muted">Gói:</span>
                            <span className="font-medium">{goiDaChon?.ten_goi || '—'} ({donGia.toLocaleString('vi-VN')}đ/lượt)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-muted">Số lượt:</span>
                            <span className="font-medium">{soLuotMua.toLocaleString('vi-VN')} lượt</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2">
                            <span className="font-semibold">Tổng ngân sách:</span>
                            <span className="font-bold text-lg">{nganSach.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-muted">Số dư hiện tại:</span>
                            <span className={`font-medium ${duSoDu ? 'text-success' : 'text-error'}`}>
                                {soDuHienTai.toLocaleString('vi-VN')}đ
                            </span>
                        </div>
                        {!duSoDu && (
                            <div className="flex items-center gap-2 text-error mt-2 p-2 bg-error-light/30 rounded-lg">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span className="text-xs">Thiếu {(nganSach - soDuHienTai).toLocaleString('vi-VN')}đ. Vui lòng nạp thêm tiền.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Error */}
                {loiChung && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-error-light/30 text-error text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {loiChung}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={dangGui || !duSoDu}
                    className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    {dangGui ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Đang tạo chiến dịch...</>
                    ) : (
                        <><CheckCircle2 className="w-5 h-5" /> Tạo chiến dịch ({nganSach.toLocaleString('vi-VN')}đ)</>
                    )}
                </button>
            </form>
        </div>
    );
}



