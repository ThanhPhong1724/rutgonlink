-- CreateTable
CREATE TABLE "goi_thoi_gian" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ten_goi" VARCHAR(100) NOT NULL,
    "thoi_gian_giay" INTEGER NOT NULL,
    "don_gia_mua" DECIMAL(19,4) NOT NULL,
    "don_gia_ban" DECIMAL(19,4) NOT NULL,
    "don_vi_tien" VARCHAR(10) NOT NULL,
    "trang_thai" VARCHAR(50) NOT NULL,
    "thu_tu" INTEGER NOT NULL DEFAULT 0,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "goi_thoi_gian_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "chien_dich" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ma_nguoi_mua" BIGINT NOT NULL,
    "ma_goi" BIGINT NOT NULL,
    "ten_chien_dich" VARCHAR(255) NOT NULL,
    "lien_ket_trang_dich" TEXT NOT NULL,
    "tu_khoa" TEXT NOT NULL,
    "anh_minh_hoa_url" TEXT,
    "anh_minh_hoa_file" VARCHAR(500),
    "so_luot_mua" INTEGER NOT NULL,
    "so_luot_da_chay" INTEGER NOT NULL DEFAULT 0,
    "ngan_sach_tong" DECIMAL(19,4) NOT NULL,
    "ngan_sach_da_dung" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "trang_thai" VARCHAR(50) NOT NULL,
    "thoi_diem_bat_dau" TIMESTAMPTZ NOT NULL,
    "thoi_diem_ket_thuc" TIMESTAMPTZ,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "chien_dich_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "ma_xac_nhan" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(20) NOT NULL,
    "ma_chien_dich" BIGINT NOT NULL,
    "dia_chi_ip" VARCHAR(45),
    "da_su_dung" BOOLEAN NOT NULL DEFAULT false,
    "thoi_diem_het_han" TIMESTAMPTZ NOT NULL,
    "thoi_diem_su_dung" TIMESTAMPTZ,
    "ma_su_kien_luot" BIGINT,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ma_xac_nhan_pkey" PRIMARY KEY ("ma")
);

-- CreateIndex
CREATE UNIQUE INDEX "goi_thoi_gian_ma_cong_khai_key" ON "goi_thoi_gian"("ma_cong_khai");

-- CreateIndex
CREATE INDEX "goi_thoi_gian_trang_thai_thu_tu_idx" ON "goi_thoi_gian"("trang_thai", "thu_tu");

-- CreateIndex
CREATE UNIQUE INDEX "chien_dich_ma_cong_khai_key" ON "chien_dich"("ma_cong_khai");

-- CreateIndex
CREATE INDEX "chien_dich_ma_nguoi_mua_trang_thai_idx" ON "chien_dich"("ma_nguoi_mua", "trang_thai");

-- CreateIndex
CREATE INDEX "chien_dich_trang_thai_so_luot_da_chay_idx" ON "chien_dich"("trang_thai", "so_luot_da_chay");

-- CreateIndex
CREATE UNIQUE INDEX "ma_xac_nhan_ma_cong_khai_key" ON "ma_xac_nhan"("ma_cong_khai");

-- CreateIndex
CREATE UNIQUE INDEX "ma_xac_nhan_ma_su_kien_luot_key" ON "ma_xac_nhan"("ma_su_kien_luot");

-- CreateIndex
CREATE INDEX "ma_xac_nhan_ma_chien_dich_da_su_dung_idx" ON "ma_xac_nhan"("ma_chien_dich", "da_su_dung");

-- CreateIndex
CREATE INDEX "ma_xac_nhan_thoi_diem_het_han_idx" ON "ma_xac_nhan"("thoi_diem_het_han");

-- AddForeignKey
ALTER TABLE "chien_dich" ADD CONSTRAINT "chien_dich_ma_nguoi_mua_fkey" FOREIGN KEY ("ma_nguoi_mua") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chien_dich" ADD CONSTRAINT "chien_dich_ma_goi_fkey" FOREIGN KEY ("ma_goi") REFERENCES "goi_thoi_gian"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ma_xac_nhan" ADD CONSTRAINT "ma_xac_nhan_ma_chien_dich_fkey" FOREIGN KEY ("ma_chien_dich") REFERENCES "chien_dich"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ma_xac_nhan" ADD CONSTRAINT "ma_xac_nhan_ma_su_kien_luot_fkey" FOREIGN KEY ("ma_su_kien_luot") REFERENCES "su_kien_luot"("ma") ON DELETE SET NULL ON UPDATE CASCADE;
