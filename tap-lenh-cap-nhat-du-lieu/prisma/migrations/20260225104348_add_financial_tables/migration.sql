-- CreateTable
CREATE TABLE "hoa_don_nap" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ma_nguoi_dung" BIGINT NOT NULL,
    "so_tien_yeu_cau" DECIMAL(19,4) NOT NULL,
    "don_vi_tien" VARCHAR(10) NOT NULL,
    "phuong_thuc_nap" VARCHAR(50) NOT NULL,
    "trang_thai" VARCHAR(50) NOT NULL,
    "noi_dung_tham_chieu" VARCHAR(255) NOT NULL,
    "cau_hinh_phuong_thuc_chup" TEXT,
    "cau_hinh_khuyen_mai_chup" TEXT,
    "so_tien_khuyen_mai" DECIMAL(19,4),
    "ghi_chu_nguoi_dung" TEXT,
    "ly_do_tu_choi" TEXT,
    "ly_do_duyet_ngoai_le" TEXT,
    "ghi_chu_xu_ly" TEXT,
    "ma_nguoi_duyet" BIGINT,
    "thoi_diem_duyet" TIMESTAMPTZ,
    "thoi_diem_het_han" TIMESTAMPTZ NOT NULL,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "hoa_don_nap_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "chung_tu_nap" (
    "ma" BIGSERIAL NOT NULL,
    "ma_hoa_don_nap" BIGINT NOT NULL,
    "duong_dan_tep" VARCHAR(500) NOT NULL,
    "loai_tep" VARCHAR(50) NOT NULL,
    "ma_giao_dich_khai_bao" VARCHAR(255),
    "ghi_chu" TEXT,
    "la_ban_hien_hanh" BOOLEAN NOT NULL DEFAULT true,
    "ma_nguoi_tai" BIGINT NOT NULL,
    "thoi_diem_tai" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chung_tu_nap_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "yeu_cau_rut" (
    "ma" BIGSERIAL NOT NULL,
    "ma_cong_khai" VARCHAR(40) NOT NULL,
    "ma_nguoi_dung" BIGINT NOT NULL,
    "so_tien_yeu_cau" DECIMAL(19,4) NOT NULL,
    "don_vi_tien" VARCHAR(10) NOT NULL,
    "phuong_thuc_rut" VARCHAR(50) NOT NULL,
    "trang_thai" VARCHAR(50) NOT NULL,
    "thong_tin_nhan_tien_chup" TEXT NOT NULL,
    "ly_do_tu_choi" TEXT,
    "ly_do_hoan_tien" TEXT,
    "ghi_chu_xu_ly" TEXT,
    "ghi_chu_nguoi_dung" TEXT,
    "so_tien_thuc_chi" DECIMAL(19,4),
    "ma_tham_chieu_chi_tra" VARCHAR(255),
    "thoi_diem_chi_tra" TIMESTAMPTZ,
    "ma_nguoi_xu_ly" BIGINT,
    "thoi_diem_duyet" TIMESTAMPTZ,
    "thoi_diem_gui" TIMESTAMPTZ,
    "thoi_diem_hoan_thanh" TIMESTAMPTZ,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "yeu_cau_rut_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "bang_chung_rut" (
    "ma" BIGSERIAL NOT NULL,
    "ma_yeu_cau_rut" BIGINT NOT NULL,
    "loai_bang_chung" VARCHAR(50) NOT NULL,
    "duong_dan_tep" VARCHAR(500) NOT NULL,
    "ma_giao_dich_tham_chieu" VARCHAR(255),
    "ghi_chu" TEXT,
    "ma_nguoi_tai" BIGINT NOT NULL,
    "thoi_diem_tai" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bang_chung_rut_pkey" PRIMARY KEY ("ma")
);

-- CreateTable
CREATE TABLE "nhat_ky_quan_tri" (
    "ma" BIGSERIAL NOT NULL,
    "ma_nguoi_thao_tac" BIGINT NOT NULL,
    "hanh_dong" VARCHAR(100) NOT NULL,
    "doi_tuong" VARCHAR(100) NOT NULL,
    "ma_doi_tuong" BIGINT NOT NULL,
    "trang_thai_truoc" VARCHAR(50),
    "trang_thai_sau" VARCHAR(50),
    "ly_do" TEXT,
    "ghi_chu" TEXT,
    "dia_chi_ip" VARCHAR(50),
    "thoi_diem_thao_tac" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nhat_ky_quan_tri_pkey" PRIMARY KEY ("ma")
);

-- CreateIndex
CREATE UNIQUE INDEX "hoa_don_nap_ma_cong_khai_key" ON "hoa_don_nap"("ma_cong_khai");

-- CreateIndex
CREATE INDEX "hoa_don_nap_ma_nguoi_dung_trang_thai_idx" ON "hoa_don_nap"("ma_nguoi_dung", "trang_thai");

-- CreateIndex
CREATE INDEX "hoa_don_nap_trang_thai_idx" ON "hoa_don_nap"("trang_thai");

-- CreateIndex
CREATE INDEX "hoa_don_nap_thoi_diem_het_han_idx" ON "hoa_don_nap"("thoi_diem_het_han");

-- CreateIndex
CREATE INDEX "chung_tu_nap_ma_hoa_don_nap_idx" ON "chung_tu_nap"("ma_hoa_don_nap");

-- CreateIndex
CREATE UNIQUE INDEX "yeu_cau_rut_ma_cong_khai_key" ON "yeu_cau_rut"("ma_cong_khai");

-- CreateIndex
CREATE INDEX "yeu_cau_rut_ma_nguoi_dung_trang_thai_idx" ON "yeu_cau_rut"("ma_nguoi_dung", "trang_thai");

-- CreateIndex
CREATE INDEX "yeu_cau_rut_trang_thai_idx" ON "yeu_cau_rut"("trang_thai");

-- CreateIndex
CREATE INDEX "bang_chung_rut_ma_yeu_cau_rut_idx" ON "bang_chung_rut"("ma_yeu_cau_rut");

-- CreateIndex
CREATE INDEX "nhat_ky_quan_tri_doi_tuong_ma_doi_tuong_idx" ON "nhat_ky_quan_tri"("doi_tuong", "ma_doi_tuong");

-- CreateIndex
CREATE INDEX "nhat_ky_quan_tri_ma_nguoi_thao_tac_idx" ON "nhat_ky_quan_tri"("ma_nguoi_thao_tac");

-- CreateIndex
CREATE INDEX "nhat_ky_quan_tri_thoi_diem_thao_tac_idx" ON "nhat_ky_quan_tri"("thoi_diem_thao_tac");

-- AddForeignKey
ALTER TABLE "hoa_don_nap" ADD CONSTRAINT "hoa_don_nap_ma_nguoi_dung_fkey" FOREIGN KEY ("ma_nguoi_dung") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chung_tu_nap" ADD CONSTRAINT "chung_tu_nap_ma_hoa_don_nap_fkey" FOREIGN KEY ("ma_hoa_don_nap") REFERENCES "hoa_don_nap"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yeu_cau_rut" ADD CONSTRAINT "yeu_cau_rut_ma_nguoi_dung_fkey" FOREIGN KEY ("ma_nguoi_dung") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bang_chung_rut" ADD CONSTRAINT "bang_chung_rut_ma_yeu_cau_rut_fkey" FOREIGN KEY ("ma_yeu_cau_rut") REFERENCES "yeu_cau_rut"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nhat_ky_quan_tri" ADD CONSTRAINT "nhat_ky_quan_tri_ma_nguoi_thao_tac_fkey" FOREIGN KEY ("ma_nguoi_thao_tac") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;
