'use client';



import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import apiClient from '../../lib/api-client';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Copy,
    ExternalLink,
    Link as LinkIcon,
    AlertCircle,
    Activity,
    CheckCircle2,
    XCircle,
    X
} from 'lucide-react';

interface ShortLink {
    ma_cong_khai: string;
    ma_ngan: string;
    lien_ket_goc: string;
    trang_thai: string;
    thoi_diem_tao: string;
    tong_luot_nhap: number;
}

export default function QuanLyLinkPage() {
    const { nguoiDung } = useAuth();
    const router = useRouter();
    const [danhSach, setDanhSach] = useState<ShortLink[]>([]);
    const [tong, setTong] = useState(0);
    const [dangTai, setDangTai] = useState(true);

    // Modal state
    const [moModalTao, setMoModalTao] = useState(false);
    const [lienKetGoc, setLienKetGoc] = useState('');
    const [biDanh, setBiDanh] = useState('');
    const [dangXuLy, setDangXuLy] = useState(false);
    const [loiModal, setLoiModal] = useState('');

    useEffect(() => {
        if (nguoiDung && (nguoiDung.loai_tai_khoan === 'R20' || nguoiDung.vai_tro?.includes('R20'))) {
            taiDanhSach();
        } else if (nguoiDung) {
            router.push('/');
        }
    }, [nguoiDung]);

    const taiDanhSach = async () => {
        setDangTai(true);
        try {
            const res: any = await apiClient.get('/api/v1/short-link/danh-sach');
            setDanhSach(res.danh_sach || []);
            setTong(res.tong || 0);
        } catch (err: any) {
            console.error(err);
        }
        setDangTai(false);
    };

    const xuLyTaoMoi = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoiModal('');
        setDangXuLy(true);
        try {
            await apiClient.post('/api/v1/short-link/tao-moi', {
                lien_ket_goc: lienKetGoc,
                bi_danh: biDanh || undefined,
            });
            setMoModalTao(false);
            setLienKetGoc('');
            setBiDanh('');
            taiDanhSach();
        } catch (err: any) {
            setLoiModal(err.thong_diep || 'Đã có lỗi xảy ra');
        }
        setDangXuLy(false);
    };

    const copyToClipboard = (maNgan: string) => {
        const url = `${window.location.origin}/go/${maNgan}`;
        navigator.clipboard.writeText(url);
        alert('Đã sao chép link: ' + url);
    };

    if (!nguoiDung) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Quản lý Liên Kết</h1>
                    <p className="text-text-secondary mt-1">
                        Tổng cộng có <span className="font-semibold text-text-primary">{tong}</span> liên kết đang hoạt động
                    </p>
                </div>
                <button
                    onClick={() => setMoModalTao(true)}
                    className="btn-primary whitespace-nowrap"
                >
                    <Plus className="w-4 h-4 mr-2" /> Tạo Liên Kết Mới
                </button>
            </div>

            <div className="card overflow-hidden">
                {dangTai ? (
                    <div className="flex flex-col items-center justify-center py-20 text-text-muted">
                        <Activity className="w-8 h-8 animate-pulse mb-3" />
                        <p>Đang tải dữ liệu liên kết...</p>
                    </div>
                ) : danhSach.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-text-muted text-center px-4">
                        <LinkIcon className="w-12 h-12 mb-4 text-border" strokeWidth={1.5} />
                        <h3 className="text-lg font-medium text-text-primary mb-1">Chưa có liên kết nào</h3>
                        <p>Bạn chưa tạo liên kết rút gọn nào. Hãy bấm "Tạo Liên Kết Mới" để bắt đầu.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-border bg-surface-hover/50 text-xs uppercase tracking-wider text-text-muted font-semibold">
                                    <th className="py-4 px-6">Mã Ngắn</th>
                                    <th className="py-4 px-6 w-1/3">Liên Kết Gốc</th>
                                    <th className="py-4 px-6 text-center">Lượt Click</th>
                                    <th className="py-4 px-6">Ngày Tạo</th>
                                    <th className="py-4 px-6 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {danhSach.map((lk) => (
                                    <tr key={lk.ma_cong_khai} className="hover:bg-surface-hover transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col gap-1.5">
                                                <a
                                                    href={`/go/${lk.ma_ngan}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-semibold text-primary hover:text-primary-hover flex items-center gap-1.5 w-fit"
                                                >
                                                    /{lk.ma_ngan}
                                                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </a>
                                                {lk.trang_thai === 'hoat_dong' ? (
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success bg-success-light px-2 py-0.5 rounded-full w-fit">
                                                        <CheckCircle2 className="w-3 h-3" /> Hoạt động
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-error bg-error-light px-2 py-0.5 rounded-full w-fit">
                                                        <XCircle className="w-3 h-3" /> Đã khóa
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div
                                                className="max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-xl truncate text-sm text-text-secondary group-hover:text-text-primary transition-colors cursor-help"
                                                title={lk.lien_ket_goc}
                                            >
                                                {lk.lien_ket_goc}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-center">
                                                <span className="inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded bg-surface border border-border text-sm font-semibold">
                                                    {lk.tong_luot_nhap.toLocaleString('vi-VN')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-text-secondary">
                                            {new Date(lk.thoi_diem_tao).toLocaleDateString('vi-VN', {
                                                day: '2-digit', month: '2-digit', year: 'numeric'
                                            })}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => copyToClipboard(lk.ma_ngan)}
                                                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-surface border border-border rounded-md hover:bg-surface-hover hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20"
                                                title="Sao chép liên kết rút gọn"
                                            >
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal Tạo Link (Styled) */}
            {moModalTao && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => !dangXuLy && setMoModalTao(false)}></div>
                    <div className="relative bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-hover/50">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <LinkIcon className="w-5 h-5 text-primary" />
                                Rút gọn liên kết
                            </h3>
                            <button
                                onClick={() => setMoModalTao(false)}
                                disabled={dangXuLy}
                                className="text-text-muted hover:text-foreground transition-colors p-1 rounded-md hover:bg-surface"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {loiModal && (
                                <div className="mb-5 p-3.5 rounded-lg bg-error-light/50 border border-error-light flex items-start gap-2.5 text-error text-sm font-medium">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <p>{loiModal}</p>
                                </div>
                            )}

                            <form onSubmit={xuLyTaoMoi} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-text-primary">Liên kết gốc <span className="text-error">*</span></label>
                                    <input
                                        type="url"
                                        required
                                        value={lienKetGoc}
                                        onChange={(e) => setLienKetGoc(e.target.value)}
                                        className="input-field"
                                        placeholder="https://example.com/very/long/url..."
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-semibold text-text-primary">Mã URL tùy chỉnh</label>
                                        <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted bg-surface-hover px-1.5 py-0.5 rounded">Tùy chọn</span>
                                    </div>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-surface-hover text-text-muted sm:text-sm font-medium">
                                            rutgon.link/go/
                                        </span>
                                        <input
                                            type="text"
                                            value={biDanh}
                                            onChange={(e) => setBiDanh(e.target.value)}
                                            className="input-field rounded-l-none"
                                            placeholder="my-alias"
                                        />
                                    </div>
                                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                                        Thường là tên dễ nhớ để tăng tỷ lệ click.
                                    </p>
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setMoModalTao(false)}
                                        disabled={dangXuLy}
                                        className="btn-outline flex-1 py-2.5"
                                    >
                                        Hủy Khước
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={dangXuLy}
                                        className="btn-primary flex-1 py-2.5"
                                    >
                                        {dangXuLy ? 'Đang tạo...' : 'Tạo Rút Gọn'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



