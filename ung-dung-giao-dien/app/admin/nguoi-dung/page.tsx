'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import apiClient from '../../../lib/api-client';
import { Users, Search, Lock, Unlock, Trash2, ShieldCheck, Loader2, Wallet, X } from 'lucide-react';

interface UserRow {
    ma_cong_khai: string;
    thu_dien_tu: string;
    ten_hien_thi: string;
    loai_tai_khoan: string;
    trang_thai: string;
    vai_tro: string[];
    so_du: number;
    thoi_diem_tao: string;
    thoi_diem_dang_nhap_cuoi: string | null;
}

const fmtVND = (n: number) => n.toLocaleString('vi-VN') + 'đ';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('vi-VN') : '—';

const ROLES = ['R10', 'R20', 'R30'];

export default function QuanLyTaiKhoanPage() {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [tong, setTong] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    // Balance adjustment state
    const [adjUser, setAdjUser] = useState<UserRow | null>(null);
    const [adjAmount, setAdjAmount] = useState('');
    const [adjNote, setAdjNote] = useState('');
    const [adjLoading, setAdjLoading] = useState(false);
    const [adjError, setAdjError] = useState('');

    const fetchUsers = async (p = page, s = search) => {
        setLoading(true);
        try {
            const res: any = await apiClient.get(`/api/v1/admin/nguoi-dung?page=${p}&limit=20&search=${encodeURIComponent(s)}`);
            setUsers(res.danh_sach || []);
            setTong(res.tong || 0);
        } catch { }
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, [page]);

    const handleSearch = () => { setPage(1); fetchUsers(1, search); };

    const handleAction = async (ma: string, action: string, body?: any) => {
        setActionLoading(ma);
        try {
            if (action === 'khoa') await apiClient.patch(`/api/v1/admin/nguoi-dung/${ma}/khoa`);
            else if (action === 'mo-khoa') await apiClient.patch(`/api/v1/admin/nguoi-dung/${ma}/mo-khoa`);
            else if (action === 'xoa') await apiClient.delete(`/api/v1/admin/nguoi-dung/${ma}`);
            else if (action === 'vai-tro') await apiClient.patch(`/api/v1/admin/nguoi-dung/${ma}/vai-tro`, body);
            await fetchUsers();
        } catch (e: any) {
            alert(e?.response?.data?.thong_diep || 'Lỗi thao tác');
        }
        setActionLoading(null);
    };

    const handleAdjustBalance = async () => {
        if (!adjUser) return;
        const num = Number(adjAmount);
        if (!num || isNaN(num)) { setAdjError('Số tiền phải là số khác 0'); return; }
        if (!adjNote.trim()) { setAdjError('Vui lòng nhập lý do'); return; }

        setAdjLoading(true);
        setAdjError('');
        try {
            await apiClient.patch(`/api/v1/admin/nguoi-dung/${adjUser.ma_cong_khai}/dieu-chinh-so-du`, {
                so_tien: num,
                ghi_chu: adjNote.trim(),
            });
            setAdjUser(null);
            setAdjAmount('');
            setAdjNote('');
            await fetchUsers();
        } catch (e: any) {
            setAdjError(e?.thong_diep || e?.response?.data?.thong_diep || 'Lỗi điều chỉnh số dư');
        }
        setAdjLoading(false);
    };

    const statusBadge = (s: string) => {
        const map: Record<string, { text: string; cls: string }> = {
            hoat_dong: { text: 'Hoạt động', cls: 'bg-emerald-100 text-emerald-700' },
            bi_khoa: { text: 'Bị khóa', cls: 'bg-red-100 text-red-700' },
            da_xoa: { text: 'Đã xóa', cls: 'bg-gray-100 text-gray-500' },
        };
        const item = map[s] || { text: s, cls: 'bg-gray-100 text-gray-600' };
        return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.cls}`}>{item.text}</span>;
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Quản Lý Tài Khoản</h1>
                        <p className="text-sm text-text-muted">{tong} người dùng</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text" placeholder="Tìm email, tên..."
                            value={search} onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 w-64"
                        />
                    </div>
                    <button onClick={handleSearch} className="btn-primary text-sm px-4 py-2">Tìm</button>
                </div>
            </div>

            <div className="card overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-surface-hover text-left">
                                    <th className="px-4 py-3 font-medium text-text-muted">Người dùng</th>
                                    <th className="px-4 py-3 font-medium text-text-muted">Vai trò</th>
                                    <th className="px-4 py-3 font-medium text-text-muted">Trạng thái</th>
                                    <th className="px-4 py-3 font-medium text-text-muted text-right">Số dư</th>
                                    <th className="px-4 py-3 font-medium text-text-muted">Ngày tạo</th>
                                    <th className="px-4 py-3 font-medium text-text-muted text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.ma_cong_khai} className="border-t border-border hover:bg-surface-hover/50">
                                        <td className="px-4 py-3">
                                            <div className="font-semibold text-text-primary">{u.ten_hien_thi}</div>
                                            <div className="text-xs text-text-muted">{u.thu_dien_tu}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={u.vai_tro[0] || u.loai_tai_khoan}
                                                onChange={e => handleAction(u.ma_cong_khai, 'vai-tro', { vai_tro: e.target.value })}
                                                disabled={actionLoading === u.ma_cong_khai}
                                                className="text-xs border border-border rounded px-2 py-1 bg-surface"
                                            >
                                                {ROLES.map(r => <option key={r} value={r}>{r === 'R10' ? 'Người mua' : r === 'R20' ? 'Người bán' : 'Admin'}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">{statusBadge(u.trang_thai)}</td>
                                        <td className="px-4 py-3 text-right font-mono text-sm">{fmtVND(u.so_du)}</td>
                                        <td className="px-4 py-3 text-text-secondary text-xs">{fmtDate(u.thoi_diem_tao)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => { setAdjUser(u); setAdjAmount(''); setAdjNote(''); setAdjError(''); }}
                                                    className="p-1.5 rounded hover:bg-indigo-50 text-indigo-500 hover:text-indigo-600" title="Chỉnh số dư">
                                                    <Wallet className="w-4 h-4" />
                                                </button>
                                                {u.trang_thai === 'hoat_dong' ? (
                                                    <button onClick={() => handleAction(u.ma_cong_khai, 'khoa')}
                                                        disabled={actionLoading === u.ma_cong_khai}
                                                        className="p-1.5 rounded hover:bg-red-50 text-red-500 hover:text-red-600" title="Khóa">
                                                        <Lock className="w-4 h-4" />
                                                    </button>
                                                ) : u.trang_thai === 'bi_khoa' ? (
                                                    <button onClick={() => handleAction(u.ma_cong_khai, 'mo-khoa')}
                                                        disabled={actionLoading === u.ma_cong_khai}
                                                        className="p-1.5 rounded hover:bg-emerald-50 text-emerald-500 hover:text-emerald-600" title="Mở khóa">
                                                        <Unlock className="w-4 h-4" />
                                                    </button>
                                                ) : null}
                                                <button onClick={() => {
                                                    if (confirm(`Xóa tài khoản "${u.ten_hien_thi}"?`))
                                                        handleAction(u.ma_cong_khai, 'xoa');
                                                }}
                                                    disabled={actionLoading === u.ma_cong_khai}
                                                    className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500" title="Xóa">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">Không tìm thấy người dùng</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {tong > 20 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                        <span className="text-sm text-text-muted">Trang {page} / {Math.ceil(tong / 20)}</span>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                                className="px-3 py-1 text-sm border border-border rounded hover:bg-surface-hover disabled:opacity-40">
                                Trước
                            </button>
                            <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(tong / 20)}
                                className="px-3 py-1 text-sm border border-border rounded hover:bg-surface-hover disabled:opacity-40">
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Điều Chỉnh Số Dư */}
            {adjUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setAdjUser(null)}></div>
                    <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-indigo-600 px-6 py-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Wallet className="w-5 h-5" />
                                <h2 className="text-lg font-bold">Điều chỉnh số dư</h2>
                            </div>
                            <button onClick={() => setAdjUser(null)} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="bg-surface-hover rounded-xl p-4 border border-border">
                                <div className="text-sm text-text-muted">Tài khoản</div>
                                <div className="font-bold text-text-primary">{adjUser.ten_hien_thi}</div>
                                <div className="text-xs text-text-muted">{adjUser.thu_dien_tu}</div>
                                <div className="mt-2 text-sm">Số dư hiện tại: <span className="font-bold text-primary">{fmtVND(adjUser.so_du)}</span></div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-primary">Số tiền điều chỉnh (VNĐ) <span className="text-error">*</span></label>
                                <input
                                    type="number"
                                    value={adjAmount}
                                    onChange={e => { setAdjAmount(e.target.value); setAdjError(''); }}
                                    placeholder="VD: 100000 (cộng) hoặc -50000 (trừ)"
                                    className="input-field w-full font-mono text-lg"
                                />
                                <p className="text-xs text-text-muted">Số dương = cộng tiền, số âm = trừ tiền</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-primary">Lý do <span className="text-error">*</span></label>
                                <input
                                    type="text"
                                    value={adjNote}
                                    onChange={e => { setAdjNote(e.target.value); setAdjError(''); }}
                                    placeholder="VD: Hoàn tiền, thưởng, sửa lỗi..."
                                    className="input-field w-full"
                                />
                            </div>
                            {adjError && (
                                <div className="text-sm text-error bg-error-light/50 px-3 py-2 rounded-lg border border-error-light font-medium">{adjError}</div>
                            )}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleAdjustBalance}
                                    disabled={adjLoading}
                                    className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                                >
                                    {adjLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
                                    Cập nhật số dư
                                </button>
                                <button onClick={() => setAdjUser(null)} className="btn-outline px-6 py-2.5 text-sm">Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

