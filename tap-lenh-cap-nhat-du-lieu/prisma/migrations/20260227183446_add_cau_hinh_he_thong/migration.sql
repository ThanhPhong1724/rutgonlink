-- CreateTable
CREATE TABLE "cau_hinh_he_thong" (
    "ma" BIGSERIAL NOT NULL,
    "khoa" VARCHAR(100) NOT NULL,
    "gia_tri" TEXT NOT NULL,
    "nhom" VARCHAR(50) NOT NULL,
    "mo_ta" VARCHAR(500),
    "thoi_diem_tao" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thoi_diem_cap_nhat" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "cau_hinh_he_thong_pkey" PRIMARY KEY ("ma")
);

-- CreateIndex
CREATE UNIQUE INDEX "cau_hinh_he_thong_khoa_key" ON "cau_hinh_he_thong"("khoa");
