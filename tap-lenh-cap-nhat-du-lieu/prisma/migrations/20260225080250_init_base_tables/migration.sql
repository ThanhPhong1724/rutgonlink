-- CreateTable
CREATE TABLE "nguoi_dung" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "loai_tai_khoan_mac_dinh" VARCHAR(50) NOT NULL,
    "thu_dien_tu" VARCHAR(255) NOT NULL,
    "thu_dien_tu_da_xac_minh" BOOLEAN NOT NULL DEFAULT false,
    "mat_khau_bam" VARCHAR(500) NOT NULL,
    "ten_hien_thi" VARCHAR(255) NOT NULL,
    "so_dien_thoai" VARCHAR(50),
    "ngon_ngu_mac_dinh" VARCHAR(5) NOT NULL,
    "mui_gio_mac_dinh" VARCHAR(50) NOT NULL,
    "trang_thai" VARCHAR(50) NOT NULL,
    "thoi_diem_dang_nhap_cuoi" TIMESTAMPTZ,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,
    "thoi_diem_xoa_mem" TIMESTAMPTZ,
    "ma_nguoi_dung_tao" BIGINT,
    "ma_nguoi_dung_cap_nhat" BIGINT,

    CONSTRAINT "nguoi_dung_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "vai_tro" (
    "ma" BIGSERIAL NOT NULL,
    "ma_vai_tro" VARCHAR(50) NOT NULL,
    "ten_vai_tro" VARCHAR(255) NOT NULL,
    "mo_ta" TEXT,
    "la_vai_tro_he_thong" BOOLEAN NOT NULL DEFAULT true,
    "dang_hoat_dong" BOOLEAN NOT NULL DEFAULT true,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vai_tro_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "gan_vai_tro_nguoi_dung" (
    "ma" BIGSERIAL NOT NULL,
    "ma_nguoi_dung" BIGINT NOT NULL,
    "ma_vai_tro" BIGINT NOT NULL,
    "trang_thai" VARCHAR(50) NOT NULL,
    "thoi_diem_hieu_luc_tu" TIMESTAMPTZ NOT NULL,
    "thoi_diem_hieu_luc_den" TIMESTAMPTZ,
    "ma_nguoi_dung_tao" BIGINT NOT NULL,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gan_vai_tro_nguoi_dung_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "quyen" (
    "ma" BIGSERIAL NOT NULL,
    "ma_quyen" VARCHAR(100) NOT NULL,
    "ten_quyen" VARCHAR(255) NOT NULL,
    "nhom_quyen" VARCHAR(100) NOT NULL,
    "mo_ta" TEXT,
    "dang_hoat_dong" BOOLEAN NOT NULL DEFAULT true,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quyen_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "gan_quyen_vai_tro" (
    "ma" BIGSERIAL NOT NULL,
    "ma_quyen" BIGINT NOT NULL,
    "ma_vai_tro" BIGINT NOT NULL,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gan_quyen_vai_tro_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "vi_nguoi_dung" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ma_nguoi_dung" BIGINT NOT NULL,
    "loai_vi" VARCHAR(50) NOT NULL,
    "don_vi_tien" VARCHAR(10) NOT NULL,
    "so_du_kha_dung" DECIMAL(19,4) NOT NULL,
    "so_du_khoa_tam" DECIMAL(19,4) NOT NULL,
    "trang_thai" VARCHAR(50) NOT NULL,
    "thoi_diem_cap_nhat_so_du" TIMESTAMPTZ NOT NULL,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "vi_nguoi_dung_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "so_cai_giao_dich" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ma_vi" BIGINT NOT NULL,
    "loai_giao_dich" VARCHAR(50) NOT NULL,
    "huong_bien_dong" VARCHAR(10) NOT NULL,
    "loai_so_du_tac_dong" VARCHAR(20) NOT NULL,
    "so_tien" DECIMAL(19,4) NOT NULL,
    "don_vi_tien" VARCHAR(10) NOT NULL,
    "so_du_kha_dung_truoc" DECIMAL(19,4) NOT NULL,
    "so_du_kha_dung_sau" DECIMAL(19,4) NOT NULL,
    "so_du_khoa_tam_truoc" DECIMAL(19,4) NOT NULL,
    "so_du_khoa_tam_sau" DECIMAL(19,4) NOT NULL,
    "nguon_phat_sinh" VARCHAR(50) NOT NULL,
    "ma_tham_chieu_nguon" BIGINT NOT NULL,
    "ma_tham_chieu_phu" BIGINT,
    "ma_khoa_chong_trung" VARCHAR(255) NOT NULL,
    "trang_thai" VARCHAR(50) NOT NULL,
    "mo_ta_hien_thi" VARCHAR(500),
    "ghi_chu_noi_bo" TEXT,
    "thoi_diem_phat_sinh_nghiep_vu" TIMESTAMPTZ NOT NULL,
    "thoi_diem_ghi_so" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ma_nguoi_dung_tao" BIGINT,
    "nguon_tao" VARCHAR(50) NOT NULL,

    CONSTRAINT "so_cai_giao_dich_pkey" PRIMARY KEY ("ma")
);

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_ma_cong_khai_key" ON "nguoi_dung"("ma_cong_khai");

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_thu_dien_tu_key" ON "nguoi_dung"("thu_dien_tu");

-- CreateIndex
CREATE INDEX "nguoi_dung_trang_thai_idx" ON "nguoi_dung"("trang_thai");

-- CreateIndex
CREATE INDEX "nguoi_dung_loai_tai_khoan_mac_dinh_idx" ON "nguoi_dung"("loai_tai_khoan_mac_dinh");

-- CreateIndex
CREATE UNIQUE INDEX "vai_tro_ma_vai_tro_key" ON "vai_tro"("ma_vai_tro");

-- CreateIndex
CREATE UNIQUE INDEX "vai_tro_ten_vai_tro_key" ON "vai_tro"("ten_vai_tro");

-- CreateIndex
CREATE INDEX "gan_vai_tro_nguoi_dung_ma_nguoi_dung_idx" ON "gan_vai_tro_nguoi_dung"("ma_nguoi_dung");

-- CreateIndex
CREATE INDEX "gan_vai_tro_nguoi_dung_ma_vai_tro_trang_thai_idx" ON "gan_vai_tro_nguoi_dung"("ma_vai_tro", "trang_thai");

-- CreateIndex
CREATE UNIQUE INDEX "gan_vai_tro_nguoi_dung_ma_nguoi_dung_ma_vai_tro_thoi_diem_h_key" ON "gan_vai_tro_nguoi_dung"("ma_nguoi_dung", "ma_vai_tro", "thoi_diem_hieu_luc_tu");

-- CreateIndex
CREATE UNIQUE INDEX "quyen_ma_quyen_key" ON "quyen"("ma_quyen");

-- CreateIndex
CREATE INDEX "gan_quyen_vai_tro_ma_vai_tro_idx" ON "gan_quyen_vai_tro"("ma_vai_tro");

-- CreateIndex
CREATE UNIQUE INDEX "gan_quyen_vai_tro_ma_quyen_ma_vai_tro_key" ON "gan_quyen_vai_tro"("ma_quyen", "ma_vai_tro");

-- CreateIndex
CREATE UNIQUE INDEX "vi_nguoi_dung_ma_cong_khai_key" ON "vi_nguoi_dung"("ma_cong_khai");

-- CreateIndex
CREATE INDEX "vi_nguoi_dung_ma_nguoi_dung_idx" ON "vi_nguoi_dung"("ma_nguoi_dung");

-- CreateIndex
CREATE INDEX "vi_nguoi_dung_trang_thai_idx" ON "vi_nguoi_dung"("trang_thai");

-- CreateIndex
CREATE UNIQUE INDEX "vi_nguoi_dung_ma_nguoi_dung_loai_vi_don_vi_tien_key" ON "vi_nguoi_dung"("ma_nguoi_dung", "loai_vi", "don_vi_tien");

-- CreateIndex
CREATE UNIQUE INDEX "so_cai_giao_dich_ma_cong_khai_key" ON "so_cai_giao_dich"("ma_cong_khai");

-- CreateIndex
CREATE UNIQUE INDEX "so_cai_giao_dich_ma_khoa_chong_trung_key" ON "so_cai_giao_dich"("ma_khoa_chong_trung");

-- CreateIndex
CREATE INDEX "so_cai_giao_dich_ma_vi_thoi_diem_ghi_so_idx" ON "so_cai_giao_dich"("ma_vi", "thoi_diem_ghi_so");

-- CreateIndex
CREATE INDEX "so_cai_giao_dich_nguon_phat_sinh_ma_tham_chieu_nguon_idx" ON "so_cai_giao_dich"("nguon_phat_sinh", "ma_tham_chieu_nguon");

-- CreateIndex
CREATE INDEX "so_cai_giao_dich_ma_tham_chieu_phu_idx" ON "so_cai_giao_dich"("ma_tham_chieu_phu");

-- CreateIndex
CREATE INDEX "so_cai_giao_dich_trang_thai_idx" ON "so_cai_giao_dich"("trang_thai");

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_ma_nguoi_dung_tao_fkey" FOREIGN KEY ("ma_nguoi_dung_tao") REFERENCES "nguoi_dung"("ma") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_ma_nguoi_dung_cap_nhat_fkey" FOREIGN KEY ("ma_nguoi_dung_cap_nhat") REFERENCES "nguoi_dung"("ma") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gan_vai_tro_nguoi_dung" ADD CONSTRAINT "gan_vai_tro_nguoi_dung_ma_nguoi_dung_fkey" FOREIGN KEY ("ma_nguoi_dung") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gan_vai_tro_nguoi_dung" ADD CONSTRAINT "gan_vai_tro_nguoi_dung_ma_vai_tro_fkey" FOREIGN KEY ("ma_vai_tro") REFERENCES "vai_tro"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gan_quyen_vai_tro" ADD CONSTRAINT "gan_quyen_vai_tro_ma_quyen_fkey" FOREIGN KEY ("ma_quyen") REFERENCES "quyen"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gan_quyen_vai_tro" ADD CONSTRAINT "gan_quyen_vai_tro_ma_vai_tro_fkey" FOREIGN KEY ("ma_vai_tro") REFERENCES "vai_tro"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vi_nguoi_dung" ADD CONSTRAINT "vi_nguoi_dung_ma_nguoi_dung_fkey" FOREIGN KEY ("ma_nguoi_dung") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "so_cai_giao_dich" ADD CONSTRAINT "so_cai_giao_dich_ma_vi_fkey" FOREIGN KEY ("ma_vi") REFERENCES "vi_nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "so_cai_giao_dich" ADD CONSTRAINT "so_cai_giao_dich_ma_nguoi_dung_tao_fkey" FOREIGN KEY ("ma_nguoi_dung_tao") REFERENCES "nguoi_dung"("ma") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddCheckConstraints (NV-DL-FIN-001)
ALTER TABLE "vi_nguoi_dung" ADD CONSTRAINT "vi_nguoi_dung_so_du_kha_dung_check" CHECK ("so_du_kha_dung" >= 0);
ALTER TABLE "vi_nguoi_dung" ADD CONSTRAINT "vi_nguoi_dung_so_du_khoa_tam_check" CHECK ("so_du_khoa_tam" >= 0);

ALTER TABLE "so_cai_giao_dich" ADD CONSTRAINT "so_cai_giao_dich_so_tien_check" CHECK ("so_tien" > 0);
ALTER TABLE "so_cai_giao_dich" ADD CONSTRAINT "so_cai_giao_dich_so_du_kha_dung_truoc_check" CHECK ("so_du_kha_dung_truoc" >= 0);
ALTER TABLE "so_cai_giao_dich" ADD CONSTRAINT "so_cai_giao_dich_so_du_kha_dung_sau_check" CHECK ("so_du_kha_dung_sau" >= 0);
ALTER TABLE "so_cai_giao_dich" ADD CONSTRAINT "so_cai_giao_dich_so_du_khoa_tam_truoc_check" CHECK ("so_du_khoa_tam_truoc" >= 0);
ALTER TABLE "so_cai_giao_dich" ADD CONSTRAINT "so_cai_giao_dich_so_du_khoa_tam_sau_check" CHECK ("so_du_khoa_tam_sau" >= 0);
