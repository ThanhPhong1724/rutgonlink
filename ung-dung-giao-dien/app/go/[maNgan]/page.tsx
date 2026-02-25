'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '../../../lib/api-client';

export default function RedirectPage() {
    const params = useParams();
    const maNgan = params.maNgan as string;

    const [trangThai, setTrangThai] = useState<'dang_tai' | 'cho_xac_minh' | 'hoan_tat' | 'loi'>('dang_tai');
    const [thongDiepLoi, setThongDiepLoi] = useState('');
    const [thoiGianCho, setThoiGianCho] = useState(0);
    const [trackingId, setTrackingId] = useState('');

    useEffect(() => {
        if (!maNgan) return;

        apiClient.get(`/api/v1/redirect/info/${maNgan}`)
            .then((res: any) => {
                if (!res.yeu_cau_xac_minh) {
                    window.location.href = res.lien_ket_goc;
                } else {
                    setTrangThai('cho_xac_minh');
                    setThoiGianCho(res.thoi_gian_cho || 5);
                    setTrackingId(res.tracking_id);
                }
            })
            .catch((err) => {
                setTrangThai('loi');
                setThongDiepLoi(err.thong_diep || 'Liên kết không tồn tại hoặc đã bị khóa');
            });
    }, [maNgan]);

    useEffect(() => {
        if (trangThai === 'cho_xac_minh' && thoiGianCho > 0) {
            const timer = setTimeout(() => {
                setThoiGianCho(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [trangThai, thoiGianCho]);

    const xuLyLayLink = async () => {
        try {
            setTrangThai('dang_tai');
            const res: any = await apiClient.post(`/api/v1/redirect/verify/${trackingId}`);
            window.location.href = res.lien_ket_goc;
        } catch (err: any) {
            setTrangThai('loi');
            setThongDiepLoi(err.thong_diep || 'Xác minh thất bại');
        }
    };

    if (trangThai === 'dang_tai') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-secondary flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                    <p>Đang tải thông tin liên kết...</p>
                </div>
            </div>
        );
    }

    if (trangThai === 'loi') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="card max-w-md w-full text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h1 className="text-xl font-bold mb-2">Không thể truy cập</h1>
                    <p className="text-secondary mb-6">{thongDiepLoi}</p>
                    <button onClick={() => window.location.href = '/'} className="btn-primary">
                        Về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="max-w-xl w-full">
                {/* Giả lập khung quảng cáo */}
                <div className="w-full h-64 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-8 text-gray-500">
                    [ Vị trí Quảng cáo (Banner 728x90 / 300x250) ]
                </div>

                <div className="card text-center p-8 shadow-xl">
                    <h1 className="text-2xl font-bold mb-4">Vui lòng chờ để lấy Link</h1>

                    {thoiGianCho > 0 ? (
                        <div className="my-8">
                            <div className="text-6xl font-black text-primary mb-2 animate-pulse">
                                {thoiGianCho}
                            </div>
                            <p className="text-secondary">giây...</p>
                        </div>
                    ) : (
                        <div className="my-8">
                            <button
                                onClick={xuLyLayLink}
                                className="btn-primary text-lg w-full py-4 uppercase font-bold tracking-wider animate-bounce"
                            >
                                Lấy Link Ngay
                            </button>
                        </div>
                    )}

                    <p className="text-sm text-secondary mt-4">
                        Bằng việc bấm Lấy Link, bạn đồng ý với Điều khoản sử dụng của chúng tôi.
                    </p>
                </div>

                {/* Khung quảng cáo dưới */}
                <div className="w-full h-32 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mt-8 text-gray-500">
                    [ Vị trí Quảng cáo phụ ]
                </div>
            </div>
        </div>
    );
}
