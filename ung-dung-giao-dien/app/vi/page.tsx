'use client';



import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import apiClient from '../../lib/api-client';
import Link from 'next/link';

interface Vi {
    ma_cong_khai: string;
    loai_vi: string;
    don_vi_tien: string;
    so_du_kha_dung: string;
    so_du_khoa_tam: string;
}

interface GiaoDich {
    ma_cong_khai: string;
    loai_giao_dich: string;
    huong_bien_dong: string;
    so_tien: string;
    don_vi_tien: string;
    so_du_kha_dung_sau: string;
    mo_ta_hien_thi: string;
    thoi_diem_ghi_so: string;
}

export default function ViPage() {
    const { nguoiDung, dangDangNhap } = useAuth();
    const [vi, setVi] = useState<Vi[]>([]);
    const [giaoDich, setGiaoDich] = useState<GiaoDich[]>([]);
    const [dangTai, setDangTai] = useState(true);

    useEffect(() => {
        if (!nguoiDung) return;
        const taiDuLieu = async () => {
            try {
                const [soDuRes, lichSuRes] = await Promise.all([
                    apiClient.get('/api/v1/vi/so-du'),
                    apiClient.get('/api/v1/vi/lich-su'),
                ]);
                setVi((soDuRes as any).vi || []);
                setGiaoDich((lichSuRes as any).giao_dich || []);
            } catch { /* ignore */ }
            setDangTai(false);
        };
        taiDuLieu();
    }, [nguoiDung]);

    if (dangDangNhap || dangTai) {
        return <div className="text-center py-12">Đang tải...</div>;
    }

    if (!nguoiDung) {
        return (
            <div className="text-center py-12">
                <p>Vui lòng <Link href="/dang-nhap" style={{ color: 'var(--primary)' }}>đăng nhập</Link> để xem ví.</p>
            </div>
        );
    }

    const formatTien = (val: string) => {
        return Number(val).toLocaleString('vi-VN');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Ví của tôi</h1>
                <div className="flex gap-2">
                    <Link href="/nap-tien" className="btn-primary text-sm">Nạp tiền</Link>
                    <Link href="/rut-tien" className="btn-primary text-sm" style={{ backgroundColor: 'var(--secondary)' }}>Rút tiền</Link>
                </div>
            </div>

            {/* Cards số dư */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vi.map((v) => (
                    <div key={v.ma_cong_khai} className="card">
                        <div className="text-sm" style={{ color: 'var(--secondary)' }}>
                            {v.loai_vi === 'vi_chi_tieu' ? '💰 Ví chi tiêu' : '📊 Ví doanh thu'}
                        </div>
                        <div className="text-3xl font-bold mt-2" style={{ color: 'var(--primary)' }}>
                            {formatTien(v.so_du_kha_dung)} <span className="text-sm font-normal">{v.don_vi_tien}</span>
                        </div>
                        {Number(v.so_du_khoa_tam) > 0 && (
                            <div className="text-sm mt-1" style={{ color: 'var(--warning, #f59e0b)' }}>
                                🔒 Khóa tạm: {formatTien(v.so_du_khoa_tam)} {v.don_vi_tien}
                            </div>
                        )}
                    </div>
                ))}
                {vi.length === 0 && (
                    <div className="card col-span-full text-center" style={{ color: 'var(--secondary)' }}>
                        Chưa có ví nào. Ví sẽ được tạo tự động khi đăng ký.
                    </div>
                )}
            </div>

            {/* Lịch sử giao dịch */}
            <div className="card">
                <h2 className="text-lg font-semibold mb-4">Lịch sử giao dịch</h2>
                {giaoDich.length === 0 ? (
                    <p className="text-center py-4" style={{ color: 'var(--secondary)' }}>Chưa có giao dịch nào</p>
                ) : (
                    <div className="space-y-3">
                        {giaoDich.map((gd) => (
                            <div key={gd.ma_cong_khai} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <div className="font-medium text-sm">{gd.mo_ta_hien_thi || gd.loai_giao_dich}</div>
                                    <div className="text-xs" style={{ color: 'var(--secondary)' }}>
                                        {new Date(gd.thoi_diem_ghi_so).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                                <div className={`font-semibold ${gd.huong_bien_dong === 'tang' ? 'text-green-500' : 'text-red-500'}`}>
                                    {gd.huong_bien_dong === 'tang' ? '+' : '-'}{formatTien(gd.so_tien)} {gd.don_vi_tien}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


