# Tài liệu 14 — Chuẩn mã trạng thái, mã lỗi và danh mục mã dùng chung

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL14
- **Tên tài liệu:** Chuẩn mã trạng thái, mã lỗi và danh mục mã dùng chung
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL07, TL15, TL16, TL18, TL19, TL20, TL21, TL24

---

## 2. Mục tiêu tài liệu

TL14 khóa bộ chuẩn mã dùng chung cho toàn hệ thống nhằm đảm bảo:

1. **Không đổi tên trạng thái tùy tiện** giữa giao diện, máy chủ, cơ sở dữ liệu và báo cáo.
2. **Mã lỗi thống nhất** để dev, trợ lý lập trình, kiểm thử và vận hành nói cùng một ngôn ngữ.
3. **Danh mục mã dùng chung** có nguồn chuẩn duy nhất, tránh mỗi mô đun tự tạo một bộ giá trị khác nhau.
4. Hỗ trợ trực tiếp cho:
   - **TL15** về giao diện lập trình
   - **TL04, TL05, TL06, TL07** về đặc tả màn hình
   - **TL16** về ghi nhận sự kiện và tổng hợp
   - **TL18** về kiểm thử chấp nhận
   - **TL20** về an toàn kỹ thuật và vận hành

> TL14 **không thay thế** quy trình nghiệp vụ trong TL08 đến TL12 và **không thay thế** mô hình dữ liệu trong TL13. TL14 chỉ chuẩn hóa lớp mã và danh mục dùng chung.

---

## 3. Phạm vi của TL14

### 3.1 Trong phạm vi

- Quy tắc đặt mã trạng thái
- Quy tắc đặt mã lỗi
- Bộ mã trạng thái chuẩn cho các thực thể cốt lõi
- Bộ mã lỗi chuẩn dùng cho giao diện lập trình và giao diện người dùng
- Bộ danh mục mã dùng chung
- Quy tắc song ngữ cho nhãn hiển thị
- Quy tắc ánh xạ giữa:
  - tên trạng thái nghiệp vụ ở TL02
  - cột dữ liệu ở TL13
  - mã trạng thái kỹ thuật ở TL14
- Quy tắc quản trị thay đổi danh mục mã

### 3.2 Ngoài phạm vi

- Đặc tả chi tiết từng đường dẫn giao diện lập trình và mã phản hồi cụ thể từng đường dẫn, thuộc TL15
- Luồng nghiệp vụ chi tiết của từng quy trình, thuộc TL08 đến TL12
- Thiết kế bảng dữ liệu chi tiết, thuộc TL13
- Tối ưu hiệu năng, hạ tầng triển khai
- Hướng dẫn thao túng nền tảng bên thứ ba

---

## 4. Nguyên tắc chuẩn hóa bắt buộc

## 4.1 Một nguồn chuẩn duy nhất

- Mỗi trạng thái và mã lỗi chỉ có **một mã chuẩn** trong hệ thống.
- Không tạo mã mới ở từng mô đun khi chưa cập nhật TL14.
- Nếu cần thêm mã mới, phải theo quy trình thay đổi tại mục 16.

## 4.2 Tách rõ ba lớp

1. **Tên trạng thái nghiệp vụ**
   - Dùng trong tài liệu nghiệp vụ TL02, TL08 đến TL12
   - Ví dụ: `chờ duyệt`, `đang chạy`, `hợp lệ đã chốt`

2. **Mã trạng thái kỹ thuật**
   - Dùng trong giao diện lập trình, cấu hình và xử lý trong máy chủ
   - Ví dụ: `ST_HOA_DON_NAP_CHO_DUYET`

3. **Nhãn hiển thị**
   - Dùng trên giao diện người dùng
   - Có bản Việt và bản Anh
   - Ví dụ:
     - Việt: `Chờ duyệt`
     - Anh: `Pending review`

## 4.3 Không đổi tên trạng thái nghiệp vụ đã khóa ở TL02

- TL14 **không được đổi nghĩa hoặc đổi tên** các trạng thái đã được khóa trong TL02.
- TL14 chỉ bổ sung **mã kỹ thuật** và **nhãn hiển thị chuẩn**.

## 4.4 Mã phải ổn định theo thời gian

- Khi thay đổi nhãn hiển thị, **không đổi mã**.
- Chỉ tạo mã mới nếu thay đổi **nghĩa nghiệp vụ** hoặc tách trạng thái mới.

## 4.5 Quy tắc song ngữ

- Mỗi mã trạng thái và mã lỗi phải có:
  - `nhãn_tieng_viet`
  - `nhãn_tieng_anh`
  - `mo_ta_tieng_viet`
  - `mo_ta_tieng_anh`
- Giao diện lấy nhãn theo ngôn ngữ người dùng.
- Nhật ký kỹ thuật và truy vết nội bộ ưu tiên lưu **mã**, không lưu nhãn.

---

## 5. Quy ước đặt mã

## 5.1 Quy ước chung

- Chỉ dùng chữ in hoa, số và gạch dưới
- Không dùng dấu tiếng Việt trong mã
- Không dùng khoảng trắng
- Mã phải phản ánh được **nhóm** và **thực thể**
- Không dùng mã quá ngắn gây mơ hồ

## 5.2 Quy ước mã trạng thái

Mẫu chung:

- `ST_<THUC_THE>_<TEN_TRANG_THAI>`

Ví dụ:

- `ST_HOA_DON_NAP_CHO_DUYET`
- `ST_YEU_CAU_RUT_DA_DUYET`
- `ST_CHIEN_DICH_DANG_CHAY`
- `ST_SU_KIEN_LUOT_HOP_LE_DA_CHOT`

## 5.3 Quy ước mã lỗi

Mẫu chung:

- `ERR_<NHOM>_<MO_TA_NGAN>`

Ví dụ:

- `ERR_XAC_THUC_CHUA_DANG_NHAP`
- `ERR_PHAN_QUYEN_KHONG_DU_QUYEN`
- `ERR_HOA_DON_NAP_DA_DUOC_DUYET`
- `ERR_CHIEN_DICH_KHONG_DU_SO_DU`

## 5.4 Quy ước mã danh mục

Mẫu chung:

- `CAT_<NHOM>_<GIA_TRI>`
- hoặc mã ngắn đã chuẩn hóa nếu là danh mục chuẩn quốc tế

Ví dụ:

- `CAT_NGON_NGU_VI`
- `CAT_NGON_NGU_EN`
- `CAT_KENH_THONG_BAO_HE_THONG`

## 5.5 Quy ước mã hành động nhật ký

Mẫu chung:

- `ACT_<NHOM>_<HANH_DONG>`

Ví dụ:

- `ACT_NAP_TIEN_DUYET`
- `ACT_RUT_TIEN_TU_CHOI`
- `ACT_CHIEN_DICH_TAM_DUNG`
- `ACT_LIEN_KET_TAM_KHOA`

---

## 6. Mô hình dữ liệu chuẩn cho danh mục mã

TL14 đề xuất mọi bộ mã quan trọng được quản lý qua một mô hình dữ liệu danh mục chuẩn trong TL13 hoặc bảng cấu hình tương đương.

### 6.1 Cấu trúc logic tối thiểu cho một danh mục mã

- `ma_nhom_danh_muc`
- `ma_gia_tri`
- `nhan_tieng_viet`
- `nhan_tieng_anh`
- `mo_ta_tieng_viet`
- `mo_ta_tieng_anh`
- `thu_tu_hien_thi`
- `bat_hoac_tat`
- `cho_phep_sua`
- `thoi_diem_hieu_luc_tu`
- `thoi_diem_hieu_luc_den`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`

### 6.2 Nguyên tắc dùng danh mục động và danh mục tĩnh

- **Danh mục tĩnh trong mã nguồn**
  - vai trò cốt lõi
  - mã trạng thái cốt lõi
  - mã lỗi cốt lõi
  - loại bút toán sổ cái
- **Danh mục động trong cơ sở dữ liệu**
  - ngân hàng hiển thị
  - ví USDT hiển thị
  - danh sách quốc gia hỗ trợ
  - cấu hình giá theo lượt
  - nội dung thông báo và nhãn hiển thị mở rộng

---

## 7. Chuẩn mã trạng thái dùng chung cho các thực thể cốt lõi

## 7.1 Trạng thái tài khoản người dùng

> TL02 chưa khóa bộ trạng thái tài khoản chi tiết, TL14 chuẩn hóa bộ tối thiểu để dùng thống nhất cho TL04, TL05, TL06, TL15, TL20.

| Mã trạng thái | Tên trạng thái nghiệp vụ | Nhãn tiếng Việt | Nhãn tiếng Anh | Mô tả ngắn |
|---|---|---|---|---|
| `ST_NGUOI_DUNG_HOAT_DONG` | hoạt động | Hoạt động | Active | Tài khoản dùng bình thường |
| `ST_NGUOI_DUNG_TAM_KHOA` | tạm khóa | Tạm khóa | Temporarily locked | Bị khóa tạm thời do quản trị |
| `ST_NGUOI_DUNG_KHOA_VINH_VIEN` | khóa vĩnh viễn | Khóa vĩnh viễn | Permanently locked | Không cho phép dùng tiếp |
| `ST_NGUOI_DUNG_CHO_XAC_MINH` | chờ xác minh | Chờ xác minh | Pending verification | Chưa hoàn tất xác minh bắt buộc |

### Quy tắc dùng
- Tài khoản `tạm khóa` hoặc `khóa vĩnh viễn` không được tạo chiến dịch, tạo yêu cầu rút, tạo hóa đơn nạp mới.
- Tài khoản `chờ xác minh` có thể bị giới hạn một số chức năng theo TL03 và TL15.

---

## 7.2 Trạng thái hóa đơn nạp tiền

> Bộ trạng thái này **phải giữ đúng nghĩa** theo TL02 và TL08.

| Mã trạng thái | Tên trạng thái nghiệp vụ | Nhãn tiếng Việt | Nhãn tiếng Anh | Mô tả ngắn |
|---|---|---|---|---|
| `ST_HOA_DON_NAP_MOI_TAO` | mới tạo | Mới tạo | Created | Vừa tạo hóa đơn, chưa thanh toán |
| `ST_HOA_DON_NAP_CHO_THANH_TOAN` | chờ thanh toán | Chờ thanh toán | Waiting payment | Hóa đơn đang chờ người dùng chuyển khoản |
| `ST_HOA_DON_NAP_DANG_XAC_MINH` | đang xác minh | Đang xác minh | Verifying | Đã có chứng từ hoặc đang kiểm tra |
| `ST_HOA_DON_NAP_THANH_CONG` | thành công | Thành công | Success | Đã cộng tiền thành công |
| `ST_HOA_DON_NAP_THAT_BAI` | thất bại | Thất bại | Failed | Không thể xử lý thành công |
| `ST_HOA_DON_NAP_HET_HAN` | hết hạn | Hết hạn | Expired | Quá hạn thanh toán/duyệt theo quy tắc |
| `ST_HOA_DON_NAP_HUY` | hủy | Hủy | Cancelled | Người dùng hoặc hệ thống hủy trước khi hoàn tất |

### Ghi chú nhất quán
- `thành công` là trạng thái duy nhất cho phép tạo bút toán cộng số dư.
- `đang xác minh` không đồng nghĩa đã cộng tiền.

---

## 7.3 Trạng thái yêu cầu rút tiền

> Bộ trạng thái này **phải giữ đúng nghĩa** theo TL02 và TL09.

| Mã trạng thái | Tên trạng thái nghiệp vụ | Nhãn tiếng Việt | Nhãn tiếng Anh | Mô tả ngắn |
|---|---|---|---|---|
| `ST_YEU_CAU_RUT_CHO_XU_LY` | chờ xử lý | Chờ xử lý | Waiting processing | Mới tạo, chờ hàng xử lý |
| `ST_YEU_CAU_RUT_DANG_KIEM_TRA` | đang kiểm tra | Đang kiểm tra | Under review | Quản trị viên đang kiểm tra |
| `ST_YEU_CAU_RUT_DA_DUYET` | đã duyệt | Đã duyệt | Approved | Đã duyệt chi trả |
| `ST_YEU_CAU_RUT_DA_GUI` | đã gửi | Đã gửi | Sent | Đã thực hiện gửi tiền, chờ xác nhận hoàn tất |
| `ST_YEU_CAU_RUT_HOAN_THANH` | hoàn thành | Hoàn thành | Completed | Chi trả xong và đã chốt |
| `ST_YEU_CAU_RUT_TU_CHOI` | từ chối | Từ chối | Rejected | Bị từ chối, cần mở khóa số dư theo quy tắc |
| `ST_YEU_CAU_RUT_HOAN_TIEN_VAO_SO_DU` | hoàn tiền vào số dư | Hoàn tiền vào số dư | Refunded to balance | Đã hoàn số dư về ví do không chi trả được |

### Ghi chú nhất quán
- `từ chối` và `hoàn tiền vào số dư` **không phải một nghĩa**.
- `hoàn tiền vào số dư` là trạng thái nghiệp vụ cuối trong trường hợp có chi trả dở dang hoặc xử lý bù.

---

## 7.4 Trạng thái liên kết rút gọn

> Bộ trạng thái này **phải giữ đúng nghĩa** theo TL02 và TL11.

| Mã trạng thái | Tên trạng thái nghiệp vụ | Nhãn tiếng Việt | Nhãn tiếng Anh | Mô tả ngắn |
|---|---|---|---|---|
| `ST_LIEN_KET_HOAT_DONG` | hoạt động | Hoạt động | Active | Dùng được và nhận truy cập |
| `ST_LIEN_KET_TAM_KHOA` | tạm khóa | Tạm khóa | Temporarily suspended | Tạm thời không phục vụ chuyển hướng |
| `ST_LIEN_KET_CHO_DUYET` | chờ duyệt | Chờ duyệt | Pending review | Chưa được phép hoạt động |
| `ST_LIEN_KET_HET_HAN` | hết hạn | Hết hạn | Expired | Hết thời gian hiệu lực |
| `ST_LIEN_KET_LOI` | lỗi | Lỗi | Error | Gặp lỗi cấu hình hoặc lỗi đích nghiêm trọng |

### Ghi chú nhất quán
- `tạm khóa` có thể do quản trị hoặc hệ thống chống gian lận.
- `lỗi` dùng cho lỗi thực thể; không dùng để thay thế lỗi truy cập tạm thời từng lần.

---

## 7.5 Trạng thái chiến dịch

> Bộ trạng thái này **phải giữ đúng nghĩa** theo TL02 và TL10. Đây là bộ gồm **10 trạng thái**.

| Mã trạng thái | Tên trạng thái nghiệp vụ | Nhãn tiếng Việt | Nhãn tiếng Anh | Mô tả ngắn |
|---|---|---|---|---|
| `ST_CHIEN_DICH_MOI_TAO` | mới tạo | Mới tạo | Created | Vừa tạo, có thể còn thiếu cấu hình |
| `ST_CHIEN_DICH_CHO_CAU_HINH_HOAN_TAT` | chờ cấu hình hoàn tất | Chờ cấu hình hoàn tất | Waiting configuration completion | Cấu hình chưa đủ điều kiện |
| `ST_CHIEN_DICH_CHO_DUYET` | chờ duyệt | Chờ duyệt | Pending review | Chờ quản trị duyệt |
| `ST_CHIEN_DICH_DANG_CHAY` | đang chạy | Đang chạy | Running | Đang ghi nhận lượt và trừ tiền theo lượt hợp lệ |
| `ST_CHIEN_DICH_TAM_DUNG` | tạm dừng | Tạm dừng | Paused | Tạm thời dừng ghi nhận chi tiêu |
| `ST_CHIEN_DICH_HOAN_THANH` | hoàn thành | Hoàn thành | Completed | Đã đạt mục tiêu hoặc kết thúc hợp lệ |
| `ST_CHIEN_DICH_HET_NGAN_SACH` | hết ngân sách | Hết ngân sách | Budget exhausted | Dừng do hết ngân sách hoặc không đủ tiền |
| `ST_CHIEN_DICH_LOI_CAU_HINH` | lỗi cấu hình | Lỗi cấu hình | Configuration error | Không thể chạy do lỗi cấu hình |
| `ST_CHIEN_DICH_BI_TU_CHOI` | bị từ chối | Bị từ chối | Rejected | Không được phép chạy |
| `ST_CHIEN_DICH_DA_HUY` | đã hủy | Đã hủy | Cancelled | Người dùng hủy hoặc hệ thống hủy theo điều kiện |

### Ghi chú nhất quán
- Không tạo trạng thái `nháp` riêng nếu chưa được TL02 khóa.
- Dùng `mới tạo` và `chờ cấu hình hoàn tất` để biểu diễn trạng thái khởi tạo.

---

## 7.6 Trạng thái sự kiện lượt dùng chung

> Bộ trạng thái này **phải giữ đúng 7 trạng thái** theo TL02 và TL12, dùng chung cho cả phía chiến dịch và phía liên kết.

| Mã trạng thái | Tên trạng thái nghiệp vụ | Nhãn tiếng Việt | Nhãn tiếng Anh | Mô tả ngắn |
|---|---|---|---|---|
| `ST_SU_KIEN_LUOT_MOI_GHI_NHAN` | mới ghi nhận | Mới ghi nhận | Captured | Đã vào hệ thống, chưa đánh giá |
| `ST_SU_KIEN_LUOT_DANG_DANH_GIA` | đang đánh giá | Đang đánh giá | Evaluating | Đang qua các lớp kiểm tra |
| `ST_SU_KIEN_LUOT_HOP_LE_TAM_THOI` | hợp lệ tạm thời | Hợp lệ tạm thời | Temporarily valid | Tạm tính vào số liệu thời gian thực |
| `ST_SU_KIEN_LUOT_BI_LOAI_TAM_THOI` | bị loại tạm thời | Bị loại tạm thời | Temporarily invalid | Tạm thời chưa được tính |
| `ST_SU_KIEN_LUOT_HOP_LE_DA_CHOT` | hợp lệ đã chốt | Hợp lệ đã chốt | Final valid | Dùng cho chi tiêu/doanh thu đã chốt |
| `ST_SU_KIEN_LUOT_BI_LOAI_DA_CHOT` | bị loại đã chốt | Bị loại đã chốt | Final invalid | Loại khỏi số liệu chốt |
| `ST_SU_KIEN_LUOT_CAN_KIEM_TRA_THU_CONG` | cần kiểm tra thủ công | Cần kiểm tra thủ công | Requires manual review | Chuyển hàng kiểm tra thủ công |

### Ghi chú nhất quán
- `hợp lệ tạm thời` và `hợp lệ đã chốt` phải được phân biệt rõ trong báo cáo.
- Không dùng trạng thái sự kiện lượt để biểu diễn trạng thái chiến dịch hoặc liên kết.

---

## 7.7 Trạng thái bút toán sổ cái giao dịch

> TL02 và TL13 khóa nguyên tắc sổ cái, TL14 chuẩn hóa bộ trạng thái kỹ thuật tối thiểu.

| Mã trạng thái | Tên trạng thái nghiệp vụ | Nhãn tiếng Việt | Nhãn tiếng Anh | Mô tả ngắn |
|---|---|---|---|---|
| `ST_SO_CAI_CHO_GHI_NHAN` | chờ ghi nhận | Chờ ghi nhận | Pending posting | Chưa chốt vào sổ cái |
| `ST_SO_CAI_DA_GHI_NHAN` | đã ghi nhận | Đã ghi nhận | Posted | Đã ghi vào sổ cái |
| `ST_SO_CAI_HUY` | hủy | Hủy | Cancelled | Không áp dụng bút toán |
| `ST_SO_CAI_BU_DIEU_CHINH` | bù điều chỉnh | Bù điều chỉnh | Adjustment offset | Bút toán bù cho sai lệch trước đó |

### Ghi chú nhất quán
- Bảng sổ cái không sửa trực tiếp bản ghi `đã ghi nhận`.
- Điều chỉnh dùng bản ghi mới với loại bút toán phù hợp.

---

## 8. Chuẩn mã lỗi dùng chung

## 8.1 Nguyên tắc thiết kế mã lỗi

1. Mã lỗi phản ánh **nguyên nhân nghiệp vụ hoặc kỹ thuật**, không phản ánh giao diện.
2. Một lỗi chỉ có một nghĩa chính.
3. Thông điệp hiển thị cho người dùng lấy từ từ điển theo ngôn ngữ.
4. Giao diện lập trình trả về:
   - `ma_loi`
   - `nhan_tieng_viet` hoặc khóa nhãn
   - `nhan_tieng_anh` hoặc khóa nhãn
   - `chi_tiet` có thể có hoặc không tùy môi trường
   - `ma_yeu_cau` để truy vết
5. Không trả chi tiết nội bộ nhạy cảm ra ngoài cho người dùng.

## 8.2 Cấu trúc phản hồi lỗi chuẩn cho giao diện lập trình

```json
{
  "thanh_cong": false,
  "ma_loi": "ERR_PHAN_QUYEN_KHONG_DU_QUYEN",
  "nhan_hien_thi": "Bạn không có quyền thực hiện thao tác này",
  "ma_truy_vet_yeu_cau": "REQ_20260224_ABC123",
  "du_lieu": null,
  "chi_tiet": [
    {
      "truong": "trang_thai",
      "ma_loi_truong": "ERR_QUY_TAC_CHUYEN_TRANG_THAI_KHONG_HOP_LE"
    }
  ]
}
```

> Mẫu trên là chuẩn logic. TL15 sẽ khóa chi tiết hơn theo từng nhóm giao diện lập trình.

---

## 8.3 Danh mục mã lỗi cốt lõi theo nhóm

### A. Nhóm xác thực và phiên đăng nhập

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_XAC_THUC_CHUA_DANG_NHAP` | Chưa đăng nhập | Not authenticated | Thiếu phiên hợp lệ |
| `ERR_XAC_THUC_PHIEN_HET_HAN` | Phiên đăng nhập đã hết hạn | Session expired | Phiên hết hạn |
| `ERR_XAC_THUC_THONG_TIN_DANG_NHAP_SAI` | Thông tin đăng nhập không đúng | Invalid credentials | Sai tài khoản hoặc mật khẩu |
| `ERR_XAC_THUC_TAI_KHOAN_TAM_KHOA` | Tài khoản đang bị tạm khóa | Account temporarily locked | Tài khoản bị khóa tạm |
| `ERR_XAC_THUC_TAI_KHOAN_KHOA_VINH_VIEN` | Tài khoản đã bị khóa | Account permanently locked | Tài khoản khóa vĩnh viễn |
| `ERR_XAC_THUC_CAN_XAC_MINH_BO_SUNG` | Cần xác minh bổ sung | Additional verification required | Cần bước xác minh thêm |
| `ERR_XAC_THUC_MAT_KHAU_CU_KHONG_DUNG` | Mật khẩu hiện tại không đúng | Current password is incorrect | Sai mật khẩu hiện tại khi đổi mật khẩu |

### B. Nhóm phân quyền và phạm vi dữ liệu

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_PHAN_QUYEN_KHONG_DU_QUYEN` | Không đủ quyền thực hiện thao tác | Insufficient permission | Vai trò không có quyền |
| `ERR_PHAN_QUYEN_SAI_PHAM_VI_DU_LIEU` | Không được thao tác trên dữ liệu này | Data scope violation | Truy cập dữ liệu ngoài phạm vi |
| `ERR_PHAN_QUYEN_CAN_XAC_THUC_BO_SUNG` | Cần xác thực bổ sung cho thao tác nhạy cảm | Additional verification required for sensitive action | Thiếu xác thực bổ sung |
| `ERR_PHAN_QUYEN_CHI_DOC` | Chỉ có quyền xem, không có quyền sửa | Read-only access | Vai trò chỉ được đọc |

### C. Nhóm kiểm tra dữ liệu đầu vào

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_DU_LIEU_THIEU_TRUONG_BAT_BUOC` | Thiếu trường bắt buộc | Missing required field | Thiếu trường bắt buộc |
| `ERR_DU_LIEU_DINH_DANG_KHONG_HOP_LE` | Dữ liệu sai định dạng | Invalid format | Sai định dạng |
| `ERR_DU_LIEU_GIA_TRI_KHONG_HOP_LE` | Giá trị không hợp lệ | Invalid value | Ngoài miền giá trị |
| `ERR_DU_LIEU_VUOT_GIOI_HAN_DO_DAI` | Dữ liệu vượt giới hạn độ dài | Length exceeded | Quá dài |
| `ERR_DU_LIEU_TRUNG_GIA_TRI_DUY_NHAT` | Giá trị đã tồn tại | Duplicate unique value | Trùng khóa duy nhất |
| `ERR_DU_LIEU_TEP_KHONG_HO_TRO` | Loại tệp không được hỗ trợ | Unsupported file type | Tệp không hợp lệ |
| `ERR_DU_LIEU_TEP_VUOT_KICH_THUOC` | Tệp vượt kích thước cho phép | File too large | Tệp quá lớn |

### D. Nhóm hóa đơn nạp tiền

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_HOA_DON_NAP_KHONG_TIM_THAY` | Không tìm thấy hóa đơn nạp | Top-up invoice not found | Sai mã hóa đơn |
| `ERR_HOA_DON_NAP_KHONG_THUOC_SO_HUU` | Hóa đơn không thuộc tài khoản của bạn | Invoice does not belong to your account | Sai phạm vi dữ liệu |
| `ERR_HOA_DON_NAP_TRANG_THAI_KHONG_CHO_PHEP` | Trạng thái hóa đơn không cho phép thao tác này | Invoice status does not allow this action | Sai trạng thái |
| `ERR_HOA_DON_NAP_DA_DUOC_DUYET` | Hóa đơn đã được duyệt | Invoice already approved | Chống duyệt trùng |
| `ERR_HOA_DON_NAP_DA_HET_HAN` | Hóa đơn đã hết hạn | Invoice expired | Hết hạn |
| `ERR_HOA_DON_NAP_CHUA_CO_CHUNG_TU` | Chưa có chứng từ thanh toán | Payment proof is missing | Thiếu chứng từ |
| `ERR_HOA_DON_NAP_SO_TIEN_KHONG_HOP_LE` | Số tiền nạp không hợp lệ | Invalid top-up amount | Sai số tiền |
| `ERR_HOA_DON_NAP_XU_LY_TRUNG` | Hóa đơn đang được xử lý ở phiên khác | Invoice is being processed elsewhere | Chống xử lý trùng |
| `ERR_HOA_DON_NAP_KHONG_THE_HUY` | Không thể hủy hóa đơn ở trạng thái hiện tại | Cannot cancel invoice in current status | Sai quy tắc hủy |

### E. Nhóm yêu cầu rút tiền

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_RUT_TIEN_KHONG_TIM_THAY` | Không tìm thấy yêu cầu rút tiền | Payout request not found | Sai mã yêu cầu |
| `ERR_RUT_TIEN_KHONG_THUOC_SO_HUU` | Yêu cầu rút không thuộc tài khoản của bạn | Payout request does not belong to your account | Sai phạm vi dữ liệu |
| `ERR_RUT_TIEN_SO_DU_KHA_DUNG_KHONG_DU` | Số dư khả dụng không đủ | Insufficient available balance | Không đủ số dư |
| `ERR_RUT_TIEN_DUOI_NGUONG_TOI_THIEU` | Số tiền rút dưới ngưỡng tối thiểu | Amount below minimum payout threshold | Dưới ngưỡng |
| `ERR_RUT_TIEN_THIEU_THONG_TIN_NHAN_TIEN` | Thiếu thông tin nhận tiền | Missing payout information | Chưa cấu hình nhận tiền |
| `ERR_RUT_TIEN_TRANG_THAI_KHONG_CHO_PHEP` | Trạng thái yêu cầu rút không cho phép thao tác này | Payout request status does not allow this action | Sai trạng thái |
| `ERR_RUT_TIEN_DA_DUOC_XU_LY` | Yêu cầu rút đã được xử lý | Payout request already processed | Chống xử lý trùng |
| `ERR_RUT_TIEN_KHONG_THE_HOAN_TIEN` | Không thể hoàn tiền ở trạng thái hiện tại | Cannot refund in current status | Sai quy tắc hoàn |
| `ERR_RUT_TIEN_XU_LY_TRUNG` | Yêu cầu rút đang được xử lý ở phiên khác | Payout request is being processed elsewhere | Chống xử lý trùng |

### F. Nhóm ví và sổ cái

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_VI_KHONG_TIM_THAY` | Không tìm thấy ví | Wallet not found | Thiếu ví |
| `ERR_VI_KHONG_DUNG_LOAI` | Loại ví không phù hợp | Invalid wallet type | Sai loại ví |
| `ERR_VI_SO_DU_AM_KHONG_HOP_LE` | Số dư âm không hợp lệ | Negative balance is not allowed | Vi phạm ràng buộc |
| `ERR_SO_CAI_GHI_TRUNG_BUT_TOAN` | Bút toán đã được ghi nhận trước đó | Ledger entry already posted | Chống ghi trùng |
| `ERR_SO_CAI_THAM_CHIEU_KHONG_HOP_LE` | Tham chiếu bút toán không hợp lệ | Invalid ledger reference | Sai tham chiếu |
| `ERR_SO_CAI_KHONG_CHO_PHEP_SUA_TRUC_TIEP` | Không được sửa trực tiếp sổ cái | Direct ledger modification is not allowed | Vi phạm nguyên tắc bất biến |

### G. Nhóm chiến dịch

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_CHIEN_DICH_KHONG_TIM_THAY` | Không tìm thấy chiến dịch | Campaign not found | Sai mã chiến dịch |
| `ERR_CHIEN_DICH_KHONG_THUOC_SO_HUU` | Chiến dịch không thuộc tài khoản của bạn | Campaign does not belong to your account | Sai phạm vi dữ liệu |
| `ERR_CHIEN_DICH_TRANG_THAI_KHONG_CHO_PHEP` | Trạng thái chiến dịch không cho phép thao tác này | Campaign status does not allow this action | Sai trạng thái |
| `ERR_CHIEN_DICH_CAU_HINH_CHUA_HOAN_TAT` | Cấu hình chiến dịch chưa hoàn tất | Campaign configuration is incomplete | Thiếu cấu hình |
| `ERR_CHIEN_DICH_KHONG_DU_SO_DU` | Không đủ số dư để chạy chiến dịch | Insufficient balance for campaign | Không đủ tiền |
| `ERR_CHIEN_DICH_VUOT_NGAN_SACH` | Vượt ngân sách chiến dịch | Campaign budget exceeded | Sai ngân sách |
| `ERR_CHIEN_DICH_GIOI_HAN_NGAY_KHONG_HOP_LE` | Giới hạn lượt mỗi ngày không hợp lệ | Invalid daily limit | Sai cấu hình |
| `ERR_CHIEN_DICH_DA_BI_TU_CHOI` | Chiến dịch đã bị từ chối | Campaign has been rejected | Trạng thái từ chối |
| `ERR_CHIEN_DICH_XU_LY_TRUNG` | Chiến dịch đang được xử lý ở phiên khác | Campaign is being processed elsewhere | Chống xử lý trùng |

### H. Nhóm liên kết rút gọn

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_LIEN_KET_KHONG_TIM_THAY` | Không tìm thấy liên kết | Short link not found | Sai mã liên kết |
| `ERR_LIEN_KET_KHONG_THUOC_SO_HUU` | Liên kết không thuộc tài khoản của bạn | Short link does not belong to your account | Sai phạm vi dữ liệu |
| `ERR_LIEN_KET_BI_DUNG_BI_DANH_DAU_TRUNG` | Bí danh liên kết đã tồn tại | Alias already exists | Trùng bí danh |
| `ERR_LIEN_KET_DICH_KHONG_HOP_LE` | Liên kết đích không hợp lệ | Invalid destination link | Sai liên kết gốc |
| `ERR_LIEN_KET_TRANG_THAI_KHONG_CHO_PHEP` | Trạng thái liên kết không cho phép thao tác này | Link status does not allow this action | Sai trạng thái |
| `ERR_LIEN_KET_BI_TAM_KHOA` | Liên kết đang bị tạm khóa | Link is temporarily suspended | Bị khóa |
| `ERR_LIEN_KET_HET_HAN` | Liên kết đã hết hạn | Link expired | Hết hạn |
| `ERR_LIEN_KET_LOI_CAU_HINH` | Liên kết lỗi cấu hình | Link configuration error | Cấu hình lỗi |

### I. Nhóm truy cập liên kết ngắn và chuyển hướng

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_CHUYEN_HUONG_MA_LIEN_KET_KHONG_TON_TAI` | Mã liên kết không tồn tại | Short code not found | Truy cập mã sai |
| `ERR_CHUYEN_HUONG_LIEN_KET_KHONG_SAN_SANG` | Liên kết chưa sẵn sàng phục vụ | Link is not ready | Liên kết chưa thể dùng |
| `ERR_CHUYEN_HUONG_XAC_MINH_THAT_BAI` | Xác minh truy cập không thành công | Verification failed | Không qua xác minh |
| `ERR_CHUYEN_HUONG_VUOT_GIOI_HAN_TAN_SUAT` | Truy cập quá nhanh, vui lòng thử lại | Rate limit exceeded, please retry | Bị giới hạn tần suất |
| `ERR_CHUYEN_HUONG_KHONG_CO_DICH_HOP_LE` | Không có liên kết đích hợp lệ | No valid destination link | Đích và dự phòng đều lỗi |
| `ERR_CHUYEN_HUONG_DICH_TAM_THOI_KHONG_KHA_DUNG` | Liên kết đích tạm thời không khả dụng | Destination temporarily unavailable | Lỗi truy cập đích |

### J. Nhóm sự kiện lượt và chống gian lận

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_LUOT_SU_KIEN_THIEU_DU_LIEU_BAT_BUOC` | Sự kiện lượt thiếu dữ liệu bắt buộc | Event is missing required data | Thiếu trường |
| `ERR_LUOT_SU_KIEN_TRUNG_DINH_DANH` | Sự kiện lượt bị trùng | Duplicate event detected | Chống trùng |
| `ERR_LUOT_SU_KIEN_TRANG_THAI_KHONG_CHO_PHEP_CHOT` | Trạng thái sự kiện lượt không cho phép chốt | Event status cannot be finalized | Sai trạng thái |
| `ERR_GIAN_LAN_DIEM_RUI_RO_VUOT_NGUONG` | Điểm rủi ro vượt ngưỡng | Risk score exceeds threshold | Bị loại do rủi ro |
| `ERR_GIAN_LAN_CAN_KIEM_TRA_THU_CONG` | Cần kiểm tra thủ công | Manual review required | Chuyển hàng kiểm tra |
| `ERR_GIAN_LAN_QUYET_DINH_THU_CONG_DA_TON_TAI` | Đã có quyết định kiểm tra thủ công | Manual review decision already exists | Chống xử lý trùng |
| `ERR_GIAN_LAN_DANH_SACH_CHAN` | Truy cập thuộc danh sách chặn | Access is on block list | Thuộc danh sách chặn |

### K. Nhóm báo cáo và đối soát

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_BAO_CAO_THAM_SO_THOI_GIAN_KHONG_HOP_LE` | Khoảng thời gian báo cáo không hợp lệ | Invalid report time range | Sai thời gian |
| `ERR_BAO_CAO_KHOANG_THOI_GIAN_QUA_LON` | Khoảng thời gian báo cáo quá lớn | Report time range too large | Giới hạn truy vấn |
| `ERR_DOI_SOAT_KY_DA_CHOT` | Kỳ đối soát đã chốt | Reconciliation period already finalized | Chống chốt lại |
| `ERR_DOI_SOAT_DU_LIEU_CHUA_SAN_SANG` | Dữ liệu chưa sẵn sàng để đối soát | Data is not ready for reconciliation | Chưa đủ dữ liệu |
| `ERR_DOI_SOAT_KET_CHUYEN_TRUNG` | Đã kết chuyển cho kỳ này | Duplicate settlement posting | Chống kết chuyển trùng |

### L. Nhóm cấu hình quản trị và hệ thống

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_CAU_HINH_KHONG_TIM_THAY` | Không tìm thấy cấu hình | Configuration not found | Thiếu cấu hình |
| `ERR_CAU_HINH_GIA_THEO_LUOT_KHONG_HOP_LE` | Cấu hình giá theo lượt không hợp lệ | Invalid per-visit pricing configuration | Sai giá |
| `ERR_CAU_HINH_PHUONG_THUC_THANH_TOAN_KHONG_HOP_LE` | Cấu hình phương thức thanh toán không hợp lệ | Invalid payment method configuration | Sai cấu hình thanh toán |
| `ERR_CAU_HINH_TAI_KHOAN_NGAN_HANG_KHONG_SAN_SANG` | Tài khoản ngân hàng nhận tiền chưa sẵn sàng | Bank receiving account is not ready | Thiếu cấu hình |
| `ERR_CAU_HINH_VI_USDT_KHONG_SAN_SANG` | Ví USDT chưa sẵn sàng | USDT wallet is not ready | Thiếu cấu hình |
| `ERR_CAU_HINH_DANH_MUC_MA_BI_KHOA` | Danh mục mã đang bị khóa chỉnh sửa | Code catalog is locked for editing | Danh mục khóa |

### M. Nhóm lỗi hệ thống và tích hợp

| Mã lỗi | Nhãn tiếng Việt | Nhãn tiếng Anh | Khi nào dùng |
|---|---|---|---|
| `ERR_HE_THONG_LOI_KHONG_XAC_DINH` | Hệ thống gặp lỗi không xác định | Unknown system error | Lỗi chung |
| `ERR_HE_THONG_DICH_VU_TAM_THOI_KHONG_KHA_DUNG` | Dịch vụ tạm thời không khả dụng | Service temporarily unavailable | Quá tải hoặc bảo trì |
| `ERR_HE_THONG_HET_THOI_GIAN_XU_LY` | Hết thời gian xử lý | Request timeout | Quá thời gian |
| `ERR_TICH_HOP_LUU_TEP_THAT_BAI` | Lưu tệp thất bại | File storage failed | Lỗi kho tệp |
| `ERR_TICH_HOP_GUI_THONG_BAO_THAT_BAI` | Gửi thông báo thất bại | Notification delivery failed | Lỗi gửi thông báo |

---

## 9. Chuẩn danh mục mã dùng chung

## 9.1 Danh mục vai trò hệ thống

> Bám TL03.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_VAI_TRO_KHACH_CHUA_DANG_NHAP` | Khách chưa đăng nhập | Guest | Không có phiên |
| `CAT_VAI_TRO_NGUOI_TRUY_CAP_LIEN_KET` | Người truy cập liên kết | Link visitor | Vai trò ở cổng chuyển hướng |
| `CAT_VAI_TRO_KHACH_HANG_MUA_CHIEN_DICH` | Khách hàng mua chiến dịch | Campaign buyer | Tương ứng R10 |
| `CAT_VAI_TRO_NHA_XUAT_BAN` | Nhà xuất bản | Publisher | Tương ứng R20 |
| `CAT_VAI_TRO_QUAN_TRI_VIEN` | Quản trị viên | Administrator | Tương ứng R30 |
| `CAT_VAI_TRO_NHAN_VIEN_HO_TRO` | Nhân viên hỗ trợ | Support staff | Tương ứng R40 |

## 9.2 Danh mục ngôn ngữ hỗ trợ

> Bám phạm vi dự án đã khóa ở TL01 và TL02.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_NGON_NGU_VI` | Tiếng Việt | Vietnamese | Mặc định cho người dùng Việt Nam |
| `CAT_NGON_NGU_EN` | Tiếng Anh | English | Hỗ trợ quốc tế |

## 9.3 Danh mục đơn vị tiền

> Bộ tối thiểu cho phiên bản đầu, có thể mở rộng.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_DON_VI_TIEN_VND` | Đồng Việt Nam | Vietnamese Dong | Dùng cho chuyển khoản ngân hàng Việt Nam |
| `CAT_DON_VI_TIEN_USDT` | USDT | USDT | Dùng cho cấu hình ví USDT thủ công |

## 9.4 Danh mục phương thức nạp và rút hiển thị

> Bám TL08, TL09, TL10, TL11.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_PHUONG_THUC_THANH_TOAN_CHUYEN_KHOAN_NGAN_HANG` | Chuyển khoản ngân hàng | Bank transfer | Nạp tiền thủ công |
| `CAT_PHUONG_THUC_THANH_TOAN_USDT_THU_CONG` | USDT thủ công | Manual USDT | Nạp hoặc rút thủ công |
| `CAT_PHUONG_THUC_RUT_TIEN_CHUYEN_KHOAN_NGAN_HANG` | Rút qua ngân hàng | Bank payout | Nhà xuất bản rút tiền |
| `CAT_PHUONG_THUC_RUT_TIEN_USDT_THU_CONG` | Rút bằng USDT thủ công | Manual USDT payout | Nhà xuất bản rút tiền |

## 9.5 Danh mục mạng chuỗi khối cho USDT

> Chỉ là danh mục hiển thị và đối soát thủ công, không suy diễn tự động khi chưa có TL15 và TL20.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_MANG_USDT_TRC20` | TRC20 | TRC20 | Phải cảnh báo gửi đúng mạng |
| `CAT_MANG_USDT_ERC20` | ERC20 | ERC20 | Tùy cấu hình bật hoặc tắt |
| `CAT_MANG_USDT_BEP20` | BEP20 | BEP20 | Tùy cấu hình bật hoặc tắt |

## 9.6 Danh mục loại ví nội bộ

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_LOAI_VI_KHACH_HANG_MUA` | Ví khách hàng mua chiến dịch | Buyer wallet | Dùng cho chi tiêu chiến dịch |
| `CAT_LOAI_VI_NHA_XUAT_BAN` | Ví nhà xuất bản | Publisher wallet | Dùng cho doanh thu và rút tiền |

## 9.7 Danh mục loại giao dịch sổ cái

> Bám nguyên tắc tài chính ở TL08, TL09, TL10, TL11, TL13.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_SO_CAI_CONG_NAP_TIEN` | Cộng tiền nạp | Top-up credit | Cộng vào ví sau duyệt nạp |
| `CAT_SO_CAI_KHOA_TAM_RUT_TIEN` | Khóa tạm rút tiền | Payout hold | Chuyển khả dụng sang khóa tạm |
| `CAT_SO_CAI_MO_KHOA_RUT_TIEN` | Mở khóa rút tiền | Payout hold release | Trả lại khả dụng khi từ chối |
| `CAT_SO_CAI_TRU_CHI_RUT_TIEN` | Trừ chi rút tiền | Payout debit | Chốt chi trả |
| `CAT_SO_CAI_CONG_DOANH_THU_NHA_XUAT_BAN` | Cộng doanh thu nhà xuất bản | Publisher earnings credit | Kết chuyển doanh thu đã chốt |
| `CAT_SO_CAI_TRU_CHI_PHI_CHIEN_DICH` | Trừ chi phí chiến dịch | Campaign spend debit | Trừ tiền theo lượt hợp lệ |
| `CAT_SO_CAI_BU_DIEU_CHINH_CONG` | Bù điều chỉnh cộng | Adjustment credit | Điều chỉnh tăng |
| `CAT_SO_CAI_BU_DIEU_CHINH_TRU` | Bù điều chỉnh trừ | Adjustment debit | Điều chỉnh giảm |

## 9.8 Danh mục loại sự kiện lượt

> Tách loại sự kiện khỏi trạng thái sự kiện.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_LOAI_SU_KIEN_LUOT_LIEN_KET` | Lượt của liên kết rút gọn | Short link visit event | Dùng cho nhà xuất bản |
| `CAT_LOAI_SU_KIEN_LUOT_CHIEN_DICH` | Lượt của chiến dịch | Campaign visit event | Dùng cho khách hàng mua chiến dịch |

## 9.9 Danh mục nhóm lý do loại lượt

> Bám TL12 để báo cáo và lọc quản trị.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_LY_DO_LOAI_LUOT_THIEU_DU_LIEU` | Thiếu dữ liệu | Missing data | Thiếu trường bắt buộc |
| `CAT_LY_DO_LOAI_LUOT_KHONG_QUA_XAC_MINH` | Không qua xác minh | Verification failed | Không qua xác minh truy cập |
| `CAT_LY_DO_LOAI_LUOT_VUOT_TAN_SUAT` | Vượt tần suất | Rate limit exceeded | Vượt giới hạn |
| `CAT_LY_DO_LOAI_LUOT_TRUNG_LAP` | Trùng lặp | Duplicate | Trùng dấu vết theo quy tắc |
| `CAT_LY_DO_LOAI_LUOT_DIEM_RUI_RO_CAO` | Điểm rủi ro cao | High risk score | Bị loại do chấm điểm |
| `CAT_LY_DO_LOAI_LUOT_DANH_SACH_CHAN` | Thuộc danh sách chặn | Block list | Chặn cứng |
| `CAT_LY_DO_LOAI_LUOT_THUC_THE_KHONG_SAN_SANG` | Thực thể không sẵn sàng | Entity not ready | Liên kết hoặc chiến dịch không hoạt động |

## 9.10 Danh mục lý do chuyển kiểm tra thủ công

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_LY_DO_KIEM_TRA_THU_CONG_XUNG_DOT_QUY_TAC` | Xung đột quy tắc | Rule conflict | Kết quả kiểm tra mâu thuẫn |
| `CAT_LY_DO_KIEM_TRA_THU_CONG_DIEM_RUI_RO_TRUNG_GIAN` | Điểm rủi ro trung gian | Medium risk score | Không đủ loại tự động |
| `CAT_LY_DO_KIEM_TRA_THU_CONG_MAU_BAT_THUONG` | Mẫu bất thường | Anomalous pattern | Mẫu truy cập bất thường |
| `CAT_LY_DO_KIEM_TRA_THU_CONG_KHIEU_NAI` | Khiếu nại | Complaint | Có yêu cầu kiểm tra lại |
| `CAT_LY_DO_KIEM_TRA_THU_CONG_NGHI_NGO_GIAN_LAN_MOI` | Nghi ngờ gian lận mới | New suspected fraud pattern | Cần đánh giá thủ công |

## 9.11 Danh mục quyết định kiểm tra thủ công

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_QUYET_DINH_KIEM_TRA_THU_CONG_HOP_LE` | Xác nhận hợp lệ | Mark as valid | Chuyển sang hợp lệ đã chốt hoặc hợp lệ tạm thời theo quy trình |
| `CAT_QUYET_DINH_KIEM_TRA_THU_CONG_BI_LOAI` | Xác nhận bị loại | Mark as invalid | Chuyển sang bị loại đã chốt hoặc bị loại tạm thời theo quy trình |
| `CAT_QUYET_DINH_KIEM_TRA_THU_CONG_CAN_THEM_DU_LIEU` | Cần thêm dữ liệu | Need more data | Tạm giữ để bổ sung |
| `CAT_QUYET_DINH_KIEM_TRA_THU_CONG_NANG_CAP_QUAN_TRI` | Chuyển quản trị cao hơn | Escalate | Cần xử lý cấp cao |

## 9.12 Danh mục thiết bị và nền tảng hiển thị

> Dùng cho chiến dịch, thống kê và lọc báo cáo. Bộ tối thiểu phiên bản đầu.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_THIET_BI_MAY_TINH` | Máy tính | Desktop | Thiết bị bàn hoặc xách tay |
| `CAT_THIET_BI_DI_DONG` | Di động | Mobile | Điện thoại |
| `CAT_THIET_BI_MAY_TINH_BANG` | Máy tính bảng | Tablet | Máy tính bảng |
| `CAT_THIET_BI_KHAC` | Khác | Other | Không phân loại rõ |

## 9.13 Danh mục trình duyệt

> Bộ tối thiểu phục vụ lọc chiến dịch và báo cáo.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_TRINH_DUYET_CHROME` | Chrome | Chrome |  |
| `CAT_TRINH_DUYET_FIREFOX` | Firefox | Firefox |  |
| `CAT_TRINH_DUYET_SAFARI` | Safari | Safari |  |
| `CAT_TRINH_DUYET_EDGE` | Edge | Edge |  |
| `CAT_TRINH_DUYET_KHAC` | Khác | Other |  |

## 9.14 Danh mục kênh thông báo

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_KENH_THONG_BAO_HE_THONG` | Thông báo trong hệ thống | In-app notification | Kênh mặc định |
| `CAT_KENH_THONG_BAO_THU_DIEN_TU` | Thư điện tử | Email | Bật theo cấu hình |
| `CAT_KENH_THONG_BAO_WEBHOOK` | Webhook | Webhook | Dành cho khu nhà phát triển giai đoạn sau |

## 9.15 Danh mục loại tệp tải lên

> Dùng cho chứng từ nạp, chứng từ rút, ảnh mã ngân hàng, ảnh ví USDT.

| Mã danh mục | Nhãn tiếng Việt | Nhãn tiếng Anh | Ghi chú |
|---|---|---|---|
| `CAT_TEP_ANH_PNG` | Ảnh PNG | PNG image |  |
| `CAT_TEP_ANH_JPG` | Ảnh JPG | JPG image |  |
| `CAT_TEP_ANH_JPEG` | Ảnh JPEG | JPEG image |  |
| `CAT_TEP_ANH_WEBP` | Ảnh WEBP | WEBP image |  |
| `CAT_TEP_TAI_LIEU_PDF` | Tài liệu PDF | PDF document | Chỉ bật nếu quy trình cho phép |

---

## 10. Chuẩn ánh xạ giữa TL02, TL13 và TL14

## 10.1 Nguyên tắc ánh xạ

Mỗi trạng thái quan trọng phải có:

1. **Tên trạng thái nghiệp vụ** trong TL02 hoặc TL08 đến TL12
2. **Cột dữ liệu** trong TL13, thường là `trang_thai`
3. **Mã trạng thái kỹ thuật** trong TL14
4. **Nhãn hiển thị song ngữ** trong TL14 hoặc kho từ điển giao diện

### Ví dụ ánh xạ chuẩn

- TL02 và TL08: `chờ thanh toán`
- TL13: `hoa_don_nap.trang_thai`
- TL14: `ST_HOA_DON_NAP_CHO_THANH_TOAN`
- Giao diện:
  - Việt: `Chờ thanh toán`
  - Anh: `Waiting payment`

## 10.2 Quy tắc không dùng trực tiếp nhãn để so sánh logic

- Máy chủ và cơ sở dữ liệu xử lý bằng **mã** hoặc **giá trị chuẩn hóa**
- Không dùng nhãn hiển thị để:
  - lọc dữ liệu
  - so sánh trạng thái
  - quyết định luồng nghiệp vụ

---

## 11. Chuẩn mã lỗi theo ngữ cảnh trả về

## 11.1 Lỗi hiển thị cho người dùng cuối

- Dùng nhãn thân thiện, không lộ chi tiết nội bộ
- Ví dụ:
  - `ERR_HE_THONG_LOI_KHONG_XAC_DINH`
  - hiển thị: `Có lỗi xảy ra, vui lòng thử lại sau`

## 11.2 Lỗi cho giao diện quản trị

- Có thể hiển thị chi tiết hơn nhưng vẫn không lộ bí mật hệ thống
- Có thể kèm:
  - mã trạng thái hiện tại
  - hành động yêu cầu
  - lý do chặn

## 11.3 Lỗi cho nhật ký kỹ thuật và giám sát

- Ghi **mã lỗi chuẩn** + **mã truy vết yêu cầu**
- Có thể kèm ngữ cảnh kỹ thuật nội bộ:
  - tên dịch vụ
  - mô đun
  - thời gian xử lý
  - mã sự kiện liên quan

---

## 12. Chuẩn mã hành động nhật ký quản trị và nghiệp vụ

> Bổ sung lớp mã hành động để TL20 và TL21 dễ chuẩn hóa nhật ký.

### 12.1 Nhóm tài chính

- `ACT_NAP_TIEN_TAO_HOA_DON`
- `ACT_NAP_TIEN_TAI_CHUNG_TU`
- `ACT_NAP_TIEN_DUYET`
- `ACT_NAP_TIEN_TU_CHOI`
- `ACT_NAP_TIEN_HUY`
- `ACT_RUT_TIEN_TAO_YEU_CAU`
- `ACT_RUT_TIEN_DUYET`
- `ACT_RUT_TIEN_TU_CHOI`
- `ACT_RUT_TIEN_DANH_DAU_DA_GUI`
- `ACT_RUT_TIEN_HOAN_THANH`
- `ACT_RUT_TIEN_HOAN_TIEN_VAO_SO_DU`

### 12.2 Nhóm chiến dịch

- `ACT_CHIEN_DICH_TAO`
- `ACT_CHIEN_DICH_CAP_NHAT`
- `ACT_CHIEN_DICH_GUI_DUYET`
- `ACT_CHIEN_DICH_DUYET`
- `ACT_CHIEN_DICH_TU_CHOI`
- `ACT_CHIEN_DICH_BAT_DAU_CHAY`
- `ACT_CHIEN_DICH_TAM_DUNG`
- `ACT_CHIEN_DICH_TIEP_TUC`
- `ACT_CHIEN_DICH_HUY`
- `ACT_CHIEN_DICH_DANH_DAU_HET_NGAN_SACH`

### 12.3 Nhóm liên kết rút gọn

- `ACT_LIEN_KET_TAO`
- `ACT_LIEN_KET_CAP_NHAT`
- `ACT_LIEN_KET_TAM_KHOA`
- `ACT_LIEN_KET_MO_KHOA`
- `ACT_LIEN_KET_DANH_DAU_LOI`
- `ACT_LIEN_KET_DANH_DAU_HET_HAN`

### 12.4 Nhóm chống gian lận và sự kiện lượt

- `ACT_LUOT_GHI_NHAN`
- `ACT_LUOT_CHUYEN_DANG_DANH_GIA`
- `ACT_LUOT_DANH_DAU_HOP_LE_TAM_THOI`
- `ACT_LUOT_DANH_DAU_BI_LOAI_TAM_THOI`
- `ACT_LUOT_CHUYEN_KIEM_TRA_THU_CONG`
- `ACT_LUOT_CHOT_HOP_LE`
- `ACT_LUOT_CHOT_BI_LOAI`
- `ACT_GIAN_LAN_CAP_NHAT_DANH_SACH_CHAN`
- `ACT_GIAN_LAN_QUYET_DINH_THU_CONG`

### 12.5 Nhóm cấu hình và quản trị hệ thống

- `ACT_CAU_HINH_GIA_THEO_LUOT_CAP_NHAT`
- `ACT_CAU_HINH_NGAN_HANG_THEM`
- `ACT_CAU_HINH_NGAN_HANG_CAP_NHAT`
- `ACT_CAU_HINH_NGAN_HANG_BAT_TAT`
- `ACT_CAU_HINH_VI_USDT_THEM`
- `ACT_CAU_HINH_VI_USDT_CAP_NHAT`
- `ACT_CAU_HINH_VI_USDT_BAT_TAT`
- `ACT_DANH_MUC_MA_CAP_NHAT`
- `ACT_NGUOI_DUNG_TAM_KHOA`
- `ACT_NGUOI_DUNG_MO_KHOA`

---

## 13. Chuẩn song ngữ cho mã trạng thái và mã lỗi

## 13.1 Quy tắc hiển thị trên giao diện

- Giao diện luôn ưu tiên lấy nhãn theo ngôn ngữ người dùng.
- Nếu thiếu nhãn tiếng Anh hoặc tiếng Việt:
  - dùng nhãn của ngôn ngữ còn lại
  - đồng thời ghi nhật ký lỗi cấu hình từ điển

## 13.2 Quy tắc cho thông báo hệ thống

- Thông báo gửi người dùng không hiển thị trực tiếp `ma_loi` trừ khi:
  - màn hình quản trị
  - khu nhà phát triển
  - chế độ hỗ trợ kỹ thuật
- Nhật ký hỗ trợ nên lưu cả:
  - `ma_loi`
  - `nhan_hien_thi_tai_thoi_diem_gui`

## 13.3 Quy tắc cho báo cáo và xuất dữ liệu

- Báo cáo nội bộ nên xuất:
  - `ma`
  - `nhan_tieng_viet`
  - `nhan_tieng_anh`
- Không chỉ xuất nhãn, để tránh mơ hồ khi đổi cách viết nhãn sau này.

---

## 14. Ràng buộc nhất quán với các tài liệu đã khóa

## 14.1 Ràng buộc với TL02

- Không đổi tên và không thêm bớt trạng thái cốt lõi đã được TL02 khóa cho:
  - hóa đơn nạp
  - yêu cầu rút
  - liên kết
  - chiến dịch
  - sự kiện lượt

## 14.2 Ràng buộc với TL03

- Danh mục vai trò trong TL14 phải ánh xạ đúng vai trò và phạm vi quyền của TL03.
- Không tự ý tạo vai trò vận hành mới trong TL14 nếu chưa cập nhật TL03.

## 14.3 Ràng buộc với TL08 và TL09

- Mã lỗi và mã trạng thái tài chính phải bám đúng luồng duyệt, chống xử lý trùng, khóa tạm số dư.
- Không dùng mã lỗi chung chung thay thế các lỗi nghiệp vụ quan trọng như:
  - duyệt trùng
  - sai trạng thái
  - không đủ số dư
  - thiếu chứng từ

## 14.4 Ràng buộc với TL10 và TL11

- Mã trạng thái chiến dịch và liên kết là nguồn chuẩn cho cả giao diện và máy chủ.
- Mã lỗi phải đủ để biểu diễn:
  - sai trạng thái
  - thiếu cấu hình
  - không đủ số dư
  - lỗi cấu hình liên kết
  - xử lý trùng

## 14.5 Ràng buộc với TL12

- Mã trạng thái sự kiện lượt giữ đúng 7 trạng thái.
- Danh mục lý do loại và lý do kiểm tra thủ công phải bám nhóm lý do trong TL12.

## 14.6 Ràng buộc với TL13

- TL14 không thay đổi thiết kế cột dữ liệu của TL13.
- Mọi mã trạng thái chuẩn hóa trong TL14 phải ánh xạ được vào cột trạng thái tương ứng của TL13.
- Mã danh mục được khuyến nghị lưu theo bảng danh mục chuẩn hoặc bảng cấu hình tương ứng trong TL13.

---

## 15. Hướng dẫn áp dụng cho dev và trợ lý lập trình

## 15.1 Khi viết máy chủ

- Dùng mã trạng thái kỹ thuật và mã lỗi chuẩn từ TL14
- Không tạo chuỗi trạng thái mới trong mã nguồn
- Không trả thông điệp lỗi viết tay phân tán ở nhiều nơi
- Tạo lớp ánh xạ tập trung:
  - mã lỗi → nhãn hiển thị theo ngôn ngữ
  - mã trạng thái → nhãn hiển thị theo ngôn ngữ

## 15.2 Khi viết giao diện

- Không so sánh logic bằng nhãn hiển thị
- Dùng mã trạng thái để quyết định:
  - nút nào bật
  - nút nào tắt
  - nhãn màu trạng thái
- Dùng `ma_loi` để hiển thị thông điệp theo từ điển giao diện

## 15.3 Khi viết kiểm thử

- Kiểm thử phải so khớp:
  - `ma_loi`
  - `ma_trang_thai`
- Không chỉ kiểm thử bằng văn bản tiếng Việt vì có thể đổi nhãn mà không đổi logic

## 15.4 Khi vận hành và hỗ trợ

- Dùng `ma_loi` và `ma_truy_vet_yeu_cau` để tra nhật ký
- Không yêu cầu người dùng chụp màn hình nếu đã có mã lỗi và mã truy vết

---

## 16. Quy trình quản trị thay đổi mã trạng thái, mã lỗi và danh mục mã

## 16.1 Trường hợp được phép thay đổi nhãn nhưng không đổi mã

- Chỉnh câu chữ cho dễ hiểu hơn
- Chuẩn hóa cách viết tiếng Việt hoặc tiếng Anh
- Điều chỉnh thứ tự hiển thị
- Bổ sung mô tả

## 16.2 Trường hợp bắt buộc tạo mã mới

- Thay đổi nghĩa nghiệp vụ
- Tách một trạng thái thành hai trạng thái
- Thêm một loại lỗi mới có ý nghĩa khác rõ rệt
- Thêm danh mục mới phục vụ tính năng mới

## 16.3 Quy trình thay đổi đề xuất

1. Ghi đề xuất thay đổi
2. Chỉ rõ tài liệu bị ảnh hưởng
3. Kiểm tra tác động tới:
   - TL02 đến TL13
   - TL15
   - giao diện
   - báo cáo
   - kiểm thử
4. Cập nhật TL14
5. Cập nhật dữ liệu danh mục nếu là danh mục động
6. Cập nhật kiểm thử hồi quy

---

## 17. Tiêu chí chấp nhận TL14

TL14 được xem là đạt khi:

1. Có đầy đủ bộ mã trạng thái cho các thực thể cốt lõi theo TL02:
   - hóa đơn nạp
   - yêu cầu rút
   - liên kết
   - chiến dịch
   - sự kiện lượt
2. Không mâu thuẫn với TL08 đến TL12
3. Có bộ mã lỗi cốt lõi đủ dùng cho:
   - tài khoản
   - phân quyền
   - dữ liệu đầu vào
   - tài chính
   - chiến dịch
   - liên kết
   - chuyển hướng
   - chống gian lận
   - đối soát
   - cấu hình
   - hệ thống
4. Có danh mục mã dùng chung tối thiểu cho:
   - vai trò
   - ngôn ngữ
   - đơn vị tiền
   - phương thức thanh toán
   - mạng USDT
   - loại ví
   - loại giao dịch sổ cái
   - nhóm lý do loại lượt
   - quyết định kiểm tra thủ công
5. Có quy tắc áp dụng cho dev, trợ lý lập trình và kiểm thử
6. Có quy trình thay đổi để tránh phát sinh mã tự phát

---

## 18. Checklist tự rà soát trước khi chuyển sang TL15

- [x] Giữ nguyên tên trạng thái nghiệp vụ đã khóa ở TL02
- [x] Chuẩn hóa đủ 10 trạng thái chiến dịch theo TL10
- [x] Chuẩn hóa đủ 7 trạng thái sự kiện lượt theo TL12
- [x] Phân biệt rõ `từ chối` và `hoàn tiền vào số dư` trong rút tiền theo TL09
- [x] Không trộn trạng thái thực thể với lý do loại lượt
- [x] Có mã lỗi chống xử lý trùng cho nạp, rút, chiến dịch, sự kiện, đối soát
- [x] Có danh mục song ngữ Việt và Anh
- [x] Có hướng dẫn áp dụng cho giao diện, máy chủ, kiểm thử
- [x] Có quy trình quản trị thay đổi mã

---

## 19. Đầu vào và đầu ra cho tài liệu tiếp theo

## 19.1 Đầu vào TL15

TL15 sẽ dùng trực tiếp TL14 để khóa:

- mã trạng thái trong phản hồi giao diện lập trình
- mã lỗi trả về theo từng đường dẫn
- danh mục mã trả cho màn hình cấu hình và màn hình nhập liệu
- quy tắc hiển thị nhãn song ngữ

## 19.2 Đầu vào TL04, TL05, TL06, TL07

Các tài liệu màn hình sẽ dùng TL14 để chuẩn hóa:

- nhãn trạng thái trên bảng
- điều kiện bật tắt nút theo mã trạng thái
- thông báo lỗi theo mã lỗi
- danh sách lựa chọn theo danh mục mã

## 19.3 Đầu vào TL18 và TL21

- TL18 kiểm thử chấp nhận cần đối chiếu `ma_loi` và `ma_trang_thai`
- TL21 tài liệu vận hành và hỗ trợ cần tra cứu theo `ma_loi`, `ma_hanh_dong`, `ma_truy_vet_yeu_cau`

---

## 20. Kết luận

TL14 là lớp chuẩn hóa quan trọng để tránh tình trạng:

- cùng một trạng thái nhưng nhiều tên khác nhau,
- cùng một lỗi nhưng nhiều thông điệp khác nhau,
- cùng một danh mục nhưng mỗi mô đun dùng một mã riêng.

Sau TL14, việc soạn **TL15 — Đặc tả giao diện lập trình** sẽ chắc hơn, ít mâu thuẫn hơn vì đã có:

- chuẩn trạng thái,
- chuẩn lỗi,
- chuẩn danh mục mã dùng chung,
- quy tắc song ngữ và áp dụng thống nhất.
