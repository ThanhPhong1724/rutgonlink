-- CreateTable
CREATE TABLE "phien_dang_nhap" (
    "ma" BIGSERIAL NOT NULL,
    "ma_nguoi_dung" BIGINT NOT NULL,
    "refresh_token_bam" VARCHAR(500) NOT NULL,
    "dia_chi_ip" VARCHAR(50),
    "user_agent" VARCHAR(500),
    "dang_hoat_dong" BOOLEAN NOT NULL DEFAULT true,
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_het_han" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "phien_dang_nhap_pkey" PRIMARY KEY ("ma")
);

-- CreateIndex
CREATE INDEX "phien_dang_nhap_ma_nguoi_dung_dang_hoat_dong_idx" ON "phien_dang_nhap"("ma_nguoi_dung", "dang_hoat_dong");

-- CreateIndex
CREATE INDEX "phien_dang_nhap_refresh_token_bam_idx" ON "phien_dang_nhap"("refresh_token_bam");

-- AddForeignKey
ALTER TABLE "phien_dang_nhap" ADD CONSTRAINT "phien_dang_nhap_ma_nguoi_dung_fkey" FOREIGN KEY ("ma_nguoi_dung") REFERENCES "nguoi_dung"("ma") ON DELETE RESTRICT ON UPDATE CASCADE;
