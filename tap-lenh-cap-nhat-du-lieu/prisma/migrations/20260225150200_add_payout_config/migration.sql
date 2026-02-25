-- AlterTable
ALTER TABLE "nguoi_dung" ADD COLUMN     "cau_hinh_rut_tien" TEXT;

-- CreateTable
CREATE TABLE "lien_ket_rut_gon" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ma_nguoi_dung" BIGINT NOT NULL,
    "ma_ngan" VARCHAR(50) NOT NULL,
    "bi_danh" VARCHAR(255),
    "lien_ket_goc" TEXT NOT NULL,
    "lien_ket_du_phong" TEXT,
    "trang_thai" VARCHAR(50) NOT NULL,
    "ly_do_trang_thai" TEXT,
    "yeu_cau_xac_minh_truy_cap" BOOLEAN NOT NULL DEFAULT true,
    "cho_phep_chuyen_huong_du_phong" BOOLEAN NOT NULL DEFAULT true,
    "thoi_diem_het_han" TIMESTAMPTZ,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,
    "ma_nguoi_dung_tao" BIGINT,
    "ma_nguoi_dung_cap_nhat" BIGINT,

    CONSTRAINT "lien_ket_rut_gon_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "nhat_ky_lien_ket_rut_gon" (
    "ma" BIGSERIAL NOT NULL,
    "ma_lien_ket_rut_gon" BIGINT NOT NULL,
    "loai_su_kien" VARCHAR(50) NOT NULL,
    "du_lieu_truoc" TEXT,
    "du_lieu_sau" TEXT,
    "ly_do" TEXT,
    "nguon_tao" VARCHAR(50) NOT NULL,
    "ma_nguoi_dung_thuc_hien" BIGINT,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nhat_ky_lien_ket_rut_gon_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "su_kien_luot" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ma_lien_ket_rut_gon" BIGINT,
    "trang_thai" VARCHAR(50) NOT NULL,
    "ly_do_loai_chinh" VARCHAR(100),
    "yeu_cau_xac_minh" BOOLEAN NOT NULL DEFAULT true,
    "xac_minh_hoan_tat" BOOLEAN NOT NULL DEFAULT false,
    "thoi_luong_giay" INTEGER,
    "dia_chi_ip" VARCHAR(45),
    "quoc_gia" VARCHAR(10),
    "trinh_duyet" VARCHAR(100),
    "he_dieu_hanh" VARCHAR(100),
    "thiet_bi" VARCHAR(100),
    "nguon_truy_cap" VARCHAR(50) NOT NULL,
    "thoi_diem_nhan" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_chot" TIMESTAMPTZ,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "su_kien_luot_pkey" PRIMARY KEY ("ma")
);

-- CreateIndex
CREATE UNIQUE INDEX "lien_ket_rut_gon_ma_cong_khai_key" ON "lien_ket_rut_gon"("ma_cong_khai");

-- CreateIndex
CREATE UNIQUE INDEX "lien_ket_rut_gon_ma_ngan_key" ON "lien_ket_rut_gon"("ma_ngan");

-- CreateIndex
CREATE UNIQUE INDEX "lien_ket_rut_gon_bi_danh_key" ON "lien_ket_rut_gon"("bi_danh");

-- CreateIndex
CREATE INDEX "lien_ket_rut_gon_ma_nguoi_dung_thoi_diem_tao_idx" ON "lien_ket_rut_gon"("ma_nguoi_dung", "thoi_diem_tao");

-- CreateIndex
CREATE INDEX "lien_ket_rut_gon_trang_thai_idx" ON "lien_ket_rut_gon"("trang_thai");

-- CreateIndex
CREATE INDEX "nhat_ky_lien_ket_rut_gon_ma_lien_ket_rut_gon_thoi_diem_tao_idx" ON "nhat_ky_lien_ket_rut_gon"("ma_lien_ket_rut_gon", "thoi_diem_tao");

-- CreateIndex
CREATE UNIQUE INDEX "su_kien_luot_ma_cong_khai_key" ON "su_kien_luot"("ma_cong_khai");

-- CreateIndex
CREATE INDEX "su_kien_luot_ma_lien_ket_rut_gon_idx" ON "su_kien_luot"("ma_lien_ket_rut_gon");

-- CreateIndex
CREATE INDEX "su_kien_luot_trang_thai_thoi_diem_nhan_idx" ON "su_kien_luot"("trang_thai", "thoi_diem_nhan");

-- CreateIndex
CREATE INDEX "su_kien_luot_dia_chi_ip_thoi_diem_nhan_idx" ON "su_kien_luot"("dia_chi_ip", "thoi_diem_nhan");

-- AddForeignKey
ALTER TABLE "lien_ket_rut_gon" ADD CONSTRAINT "lien_ket_rut_gon_ma_nguoi_dung_fkey" FOREIGN KEY ("ma_nguoi_dung") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nhat_ky_lien_ket_rut_gon" ADD CONSTRAINT "nhat_ky_lien_ket_rut_gon_ma_lien_ket_rut_gon_fkey" FOREIGN KEY ("ma_lien_ket_rut_gon") REFERENCES "lien_ket_rut_gon"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "su_kien_luot" ADD CONSTRAINT "su_kien_luot_ma_lien_ket_rut_gon_fkey" FOREIGN KEY ("ma_lien_ket_rut_gon") REFERENCES "lien_ket_rut_gon"("ma") ON DELETE SET NULL ON UPDATE CASCADE;
