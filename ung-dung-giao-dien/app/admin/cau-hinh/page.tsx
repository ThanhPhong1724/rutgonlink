'use client';

import { useEffect, useState } from 'react';
import apiClient from '../../../lib/api-client';
import { Sliders, Save, Loader2, RefreshCw, DollarSign, Percent, Wallet, Building, Image as ImageIcon, Phone, FileText, Send, UploadCloud } from 'lucide-react';
import { BACKEND_URL } from '../../../lib/api-client';

interface ConfigItem {
    khoa: string;
    gia_tri: string;
    nhom: string;
    mo_ta: string | null;
    thoi_diem_cap_nhat: string;
}

const CONFIG_ICONS: Record<string, any> = {
    ty_gia_vnd_usdt: DollarSign,
    rut_tien_toi_thieu_vnd: Wallet,
    rut_tien_toi_thieu_usdt: Wallet,
    phi_rut_tien_phan_tram: Percent,
    nap_tien_toi_thieu_vnd: Wallet,
    thanh_toan_ngan_hang_ten: Building,
    thanh_toan_ngan_hang_stk: FileText,
    thanh_toan_ngan_hang_chu_tk: FileText,
    thanh_toan_ngan_hang_qr: ImageIcon,
    thanh_toan_usdt_vi: FileText,
    thanh_toan_usdt_mang: FileText,
    thanh_toan_usdt_qr: ImageIcon,
    thanh_toan_paypal_email: FileText,
    thanh_toan_paypal_ten: FileText,
    thanh_toan_paypal_qr: ImageIcon,
    thanh_toan_noi_dung: FileText,
    link_ho_tro_telegram: Send,
};

const CONFIG_LABELS: Record<string, string> = {
    ty_gia_vnd_usdt: 'Tỷ giá VND/USDT',
    rut_tien_toi_thieu_vnd: 'Rút tối thiểu (VND)',
    rut_tien_toi_thieu_usdt: 'Rút tối thiểu (USDT)',
    phi_rut_tien_phan_tram: 'Phí rút tiền (%)',
    nap_tien_toi_thieu_vnd: 'Nạp tối thiểu (VND)',
    thanh_toan_ngan_hang_ten: 'Tên Ngân Hàng',
    thanh_toan_ngan_hang_stk: 'STK Ngân Hàng',
    thanh_toan_ngan_hang_chu_tk: 'Tên Chủ Thẻ',
    thanh_toan_ngan_hang_qr: 'Link Ảnh QR Ngân Hàng',
    thanh_toan_usdt_vi: 'Địa Chỉ Ví USDT',
    thanh_toan_usdt_mang: 'Mạng Lưới USDT',
    thanh_toan_usdt_qr: 'Link Ảnh QR USDT',
    thanh_toan_paypal_email: 'Email PayPal',
    thanh_toan_paypal_ten: 'Tên TK PayPal',
    thanh_toan_paypal_qr: 'Link Ảnh QR PayPal',
    thanh_toan_noi_dung: 'Nội dung CK Nạp',
    link_ho_tro_telegram: 'Link Hỗ Trợ (Telegram)',
};

export default function CauHinhPage() {
    const [configs, setConfigs] = useState<ConfigItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [uploadingKhoa, setUploadingKhoa] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Record<string, string>>({});

    const fetchConfigs = async () => {
        setLoading(true);
        try {
            const res: any = await apiClient.get('/api/v1/admin/cau-hinh');
            const list = Array.isArray(res) ? res : [];
            setConfigs(list);
            const vals: Record<string, string> = {};
            list.forEach((c: ConfigItem) => { vals[c.khoa] = c.gia_tri; });
            setEditValues(vals);
        } catch { }
        setLoading(false);
    };

    useEffect(() => { fetchConfigs(); }, []);

    const seedDefaults = async () => {
        setLoading(true);
        try {
            await apiClient.post('/api/v1/admin/cau-hinh/seed');
            await fetchConfigs();
        } catch { }
    };

    const saveConfig = async (khoa: string) => {
        setSaving(khoa);
        try {
            const config = configs.find(c => c.khoa === khoa);
            await apiClient.patch('/api/v1/admin/cau-hinh', {
                khoa,
                gia_tri: editValues[khoa],
                nhom: config?.nhom || 'tai_chinh',
            });
            await fetchConfigs();
        } catch (e: any) {
            alert(e?.response?.data?.thong_diep || 'Lỗi lưu cấu hình');
        }
        setSaving(null);
    };

    const handleUploadImage = async (khoa: string, file: File) => {
        setUploadingKhoa(khoa);
        try {
            const formData = new FormData();
            formData.append('file', file);
            // Gửi key để ghi đè (ví dụ: qr-bank, qr-usdt)
            const mapKeys: any = { thanh_toan_ngan_hang_qr: 'qr-bank', thanh_toan_usdt_qr: 'qr-usdt', thanh_toan_paypal_qr: 'qr-paypal' };
            formData.append('key', mapKeys[khoa] || khoa);

            const res: any = await apiClient.post('/api/v1/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.thanh_cong) {
                const imgPath = res.filePath;
                setEditValues(v => ({ ...v, [khoa]: imgPath }));
                // Tự động lưu luôn
                const config = configs.find(c => c.khoa === khoa);
                await apiClient.patch('/api/v1/admin/cau-hinh', {
                    khoa,
                    gia_tri: imgPath,
                    nhom: config?.nhom || 'tai_chinh',
                });
                await fetchConfigs();
            }
        } catch (e: any) {
            alert('Lỗi tải ảnh');
        }
        setUploadingKhoa(null);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                        <Sliders className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Cấu Hình Hệ Thống</h1>
                        <p className="text-sm text-text-muted">Tỷ giá, phí, giới hạn rút tiền</p>
                    </div>
                </div>
                <button onClick={seedDefaults} className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-surface-hover">
                    <RefreshCw className="w-4 h-4" /> Seed mặc định
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
                </div>
            ) : (
                <div className="grid gap-4">
                    {configs.map(c => {
                        const Icon = CONFIG_ICONS[c.khoa] || Sliders;
                        const label = CONFIG_LABELS[c.khoa] || c.khoa;
                        const changed = editValues[c.khoa] !== c.gia_tri;

                        return (
                            <div key={c.khoa} className="card p-5">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-violet-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-text-primary">{label}</div>
                                            <div className="text-xs text-text-muted truncate">{c.mo_ta || c.khoa}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {c.khoa.endsWith('_qr') ? (
                                            <div className="flex items-center gap-2">
                                                {editValues[c.khoa] && (
                                                    <img
                                                        src={editValues[c.khoa].startsWith('/') ? `${BACKEND_URL}${editValues[c.khoa]}` : editValues[c.khoa]}
                                                        alt="QR"
                                                        className="w-8 h-8 object-cover rounded border cursor-pointer hover:opacity-80"
                                                        onClick={() => window.open(editValues[c.khoa].startsWith('/') ? `${BACKEND_URL}${editValues[c.khoa]}` : editValues[c.khoa], '_blank')}
                                                        title="Bấm để xem ảnh lớn"
                                                    />
                                                )}
                                                <label className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg cursor-pointer ${uploadingKhoa === c.khoa ? 'bg-gray-100 text-gray-400' : 'bg-violet-100 text-violet-700 hover:bg-violet-200'} transition-colors`}>
                                                    {uploadingKhoa === c.khoa ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                                                    Tải ảnh
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        disabled={uploadingKhoa === c.khoa}
                                                        onChange={(e) => {
                                                            if (e.target.files?.[0]) {
                                                                handleUploadImage(c.khoa, e.target.files[0]);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={editValues[c.khoa] || ''}
                                                onChange={e => setEditValues(v => ({ ...v, [c.khoa]: e.target.value }))}
                                                className={`w-40 px-3 py-2 text-sm border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 text-right font-mono ${changed ? 'border-violet-400 bg-violet-50' : 'border-border'}`}
                                            />
                                        )}
                                        {/* Nút Save chỉ hiển thị nếu không phải nút Upload (vì Upload tự save) */}
                                        {!c.khoa.endsWith('_qr') && (
                                            <button
                                                onClick={() => saveConfig(c.khoa)}
                                                disabled={!changed || saving === c.khoa}
                                                className={`px-3 py-2 text-sm rounded-lg font-medium transition-all ${changed ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                            >
                                                {saving === c.khoa ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-2 text-[10px] text-text-muted">
                                    Nhóm: <span className="font-medium">{c.nhom}</span> · Cập nhật: {new Date(c.thoi_diem_cap_nhat).toLocaleString('vi-VN')}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
