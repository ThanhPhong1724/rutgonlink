/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `nguoi_dung` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "nguoi_dung" ADD COLUMN     "google_id" VARCHAR(255),
ADD COLUMN     "phuong_thuc_dang_ky" VARCHAR(20) NOT NULL DEFAULT 'email',
ALTER COLUMN "mat_khau_bam" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_google_id_key" ON "nguoi_dung"("google_id");
