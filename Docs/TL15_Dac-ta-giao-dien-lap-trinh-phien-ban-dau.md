# Tài liệu 15 — Đặc tả giao diện lập trình phiên bản đầu


## 1. Thông tin tài liệu

- **Mã tài liệu:** TL15
- **Tên tài liệu:** Đặc tả giao diện lập trình phiên bản đầu
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL07, TL16, TL17, TL18, TL20, TL21

---

## 2. Mục tiêu tài liệu

TL15 chuẩn hóa lớp giao diện lập trình cho toàn hệ thống để:

- Đội phát triển máy chủ triển khai đồng nhất theo đúng quy trình nghiệp vụ đã khóa ở TL08–TL12.
- Đội giao diện và trợ lý lập trình có thể tích hợp ổn định, không đoán tên trường hoặc trạng thái.
- Giảm rủi ro lệch logic giữa:
  - nạp tiền, rút tiền, ví và sổ cái
  - chiến dịch tính theo lượt
  - liên kết rút gọn và doanh thu nhà xuất bản
  - đánh giá lượt hợp lệ và đối soát
- Tạo nền tảng cho kiểm thử tích hợp, kiểm thử chấp nhận và giám sát vận hành.

> TL15 **không thay thế** TL02 (yêu cầu nghiệp vụ), TL13 (mô hình dữ liệu), TL14 (chuẩn mã trạng thái và mã lỗi).  
> TL15 chỉ quy định cách các chức năng được công bố qua giao diện lập trình.

---

## 3. Phạm vi của TL15

### 3.1 Trong phạm vi

- Quy ước chung cho giao diện lập trình phiên bản đầu
- Khuôn dạng yêu cầu và phản hồi chuẩn
- Xác thực, phân quyền, chống xử lý trùng
- Phân trang, lọc, sắp xếp, tìm kiếm
- Đặc tả đường dẫn cho các nhóm chức năng cốt lõi:
  - tài khoản và hồ sơ
  - ví, sổ cái
  - nạp tiền thủ công
  - rút tiền thủ công
  - thông tin nhận tiền
  - liên kết rút gọn
  - cổng chuyển hướng trung gian
  - chiến dịch tính theo lượt
  - thống kê và báo cáo
  - quản trị cấu hình, người dùng, gian lận, nhật ký
- Mã lỗi và mã trạng thái áp dụng (tham chiếu TL14)
- Quy tắc tương thích phiên bản đầu

### 3.2 Ngoài phạm vi

- Thiết kế giao diện người dùng chi tiết (TL04, TL05, TL06, TL07)
- Thiết kế triển khai hạ tầng và phân tách dịch vụ (TL16)
- Đặc tả hiệu năng chi tiết theo tải thực tế (TL16, TL20)
- Giao diện lập trình cho đối tác bên ngoài ở mức thương mại đầy đủ (phiên bản sau)
- Giao diện lập trình phục vụ mục đích thao túng tín hiệu xếp hạng trên công cụ tìm kiếm

---

## 4. Ràng buộc nhất quán bắt buộc

### 4.1 Ràng buộc với TL02

- Chỉ sử dụng chức năng đã khóa trong **NV01–NV45**.
- Không tự ý thêm chức năng nghiệp vụ mới dưới dạng đường dẫn “tạm”.
- Tên trạng thái nghiệp vụ dùng đúng bộ chuẩn TL02 và mã hóa theo TL14.

### 4.2 Ràng buộc với TL03

- Mọi đường dẫn phải gắn rõ vai trò được phép:
  - **R00** Khách chưa đăng nhập
  - **R01** Khách truy cập liên kết ngắn
  - **R10** Khách hàng mua chiến dịch
  - **R20** Nhà xuất bản
  - **R30** Quản trị viên
  - **R40** Nhân viên hỗ trợ
- Không cấp quyền thay đổi trạng thái tài chính cho R40.

### 4.3 Ràng buộc với TL08 và TL09

- Nạp tiền và rút tiền phải hỗ trợ quy trình duyệt tay, nhật ký lý do, chứng từ.
- Không được cộng tiền hoặc trừ tiền trực tiếp bằng đường dẫn “sửa số dư” bỏ qua sổ cái.
- Mọi thay đổi số dư phải đi qua bút toán sổ cái.

### 4.4 Ràng buộc với TL10, TL11, TL12

- Lượt hợp lệ dùng chung một mô hình đánh giá, không tách riêng hai định nghĩa.
- Chiến dịch và doanh thu nhà xuất bản chỉ nhận số liệu theo trạng thái sự kiện lượt đã khóa.
- Đối soát và điều chỉnh phải có khả năng truy vết sự kiện gốc.

### 4.5 Ràng buộc với TL13 và TL14

- Tên trường, kiểu dữ liệu, khóa tham chiếu bám theo TL13.
- Mã trạng thái, mã lỗi, danh mục mã dùng chung lấy từ TL14.
- Phản hồi lỗi phải trả về `ma_loi` thuộc TL14, không trả chuỗi lỗi tự do làm mã máy.

---

## 5. Quy ước chung của giao diện lập trình

### 5.1 Nguyên tắc thiết kế

- Đường dẫn ổn định, có phiên bản rõ ràng.
- Tách nhóm theo cổng chức năng và miền nghiệp vụ.
- Dữ liệu phản hồi nhất quán giữa các nhóm.
- Ưu tiên thao tác an toàn, có chống xử lý trùng cho giao dịch và sự kiện.
- Cho phép mở rộng nhưng không phá vỡ tương thích của phiên bản đầu.

### 5.2 Mẫu tiền tố đường dẫn

- `/{phien_ban}/xac-thuc/...`
- `/{phien_ban}/ho-so/...`
- `/{phien_ban}/vi/...`
- `/{phien_ban}/nap-tien/...`
- `/{phien_ban}/rut-tien/...`
- `/{phien_ban}/lien-ket/...`
- `/{phien_ban}/chien-dich/...`
- `/{phien_ban}/thong-ke/...`
- `/{phien_ban}/quan-tri/...`
- `/{phien_ban}/ho-tro/...`
- `/{phien_ban}/cong-khai/...` (không cần đăng nhập)
- `/{phien_ban}/noi-bo/...` (chỉ dịch vụ nội bộ)

**Phiên bản đầu chuẩn:** `v1`

### 5.3 Quy ước tên trường

- Dùng `snake_case`, tiếng Việt không dấu.
- Tên rõ nghĩa, tránh viết tắt mơ hồ.
- Tên trường trạng thái chuẩn:
  - `ma_trang_thai`
  - `nhan_trang_thai`
- Tên trường lỗi chuẩn:
  - `ma_loi`
  - `thong_diep`
  - `chi_tiet_loi`

### 5.4 Quy ước mã định danh

- Định danh công khai trả về cho giao diện dùng trường `ma`.
- Không lộ khóa nội bộ tự tăng.
- Mọi tham chiếu chéo giữa thực thể dùng `ma_*`.

---

## 6. Xác thực, phiên làm việc và phân quyền

### 6.1 Cơ chế xác thực cho cổng đăng nhập

Phiên bản đầu sử dụng:

- **Mã truy cập ngắn hạn** để gọi giao diện lập trình thường xuyên
- **Mã làm mới phiên** để cấp lại mã truy cập
- **Phiên đăng nhập** lưu nhật ký thiết bị, địa chỉ mạng, thời điểm hoạt động

### 6.2 Kênh truyền mã xác thực

- Mã truy cập gửi trong tiêu đề `Uy-quyen`
- Định dạng giá trị:
  - `Bearer {ma_truy_cap}`

### 6.3 Phân quyền theo vai trò

Máy chủ bắt buộc kiểm tra đủ ba lớp:

1. **Đã xác thực hay chưa**
2. **Vai trò có quyền trên đường dẫn hay không**
3. **Quyền trên dữ liệu cụ thể**
   - chỉ dữ liệu của chính người dùng
   - dữ liệu thuộc quyền hỗ trợ
   - toàn hệ thống (R30)

### 6.4 Xác thực bổ sung cho thao tác nhạy cảm

Khuyến nghị bắt buộc với phiên bản đầu cho nhóm quản trị tài chính:

- Duyệt nạp tiền
- Duyệt rút tiền
- Thay đổi cấu hình giá
- Thay đổi cấu hình tài khoản nhận tiền của hệ thống
- Thao tác điều chỉnh đối soát

Cơ chế có thể là xác thực lớp hai hoặc xác nhận lại mật khẩu tùy cấu hình hệ thống.

---

## 7. Khuôn dạng phản hồi chuẩn

### 7.1 Phản hồi thành công (một đối tượng)

```json
{
  "thanh_cong": true,
  "du_lieu": {
    "ma": "abc123",
    "ma_trang_thai": "THEO_TL14",
    "nhan_trang_thai": "Hiển thị theo ngôn ngữ"
  },
  "meta": {
    "ma_yeu_cau": "rq_01H...",
    "thoi_diem_phan_hoi": "2026-02-24T10:30:00Z"
  }
}
```

### 7.2 Phản hồi thành công (danh sách)

```json
{
  "thanh_cong": true,
  "du_lieu": [
    {
      "ma": "obj_1"
    },
    {
      "ma": "obj_2"
    }
  ],
  "meta": {
    "ma_yeu_cau": "rq_01H...",
    "phan_trang": {
      "trang": 1,
      "kich_thuoc_trang": 20,
      "tong_ban_ghi": 250,
      "tong_trang": 13
    }
  }
}
```

### 7.3 Phản hồi lỗi chuẩn

> Mã lỗi cụ thể lấy từ TL14.

```json
{
  "thanh_cong": false,
  "loi": {
    "ma_loi": "THEO_TL14",
    "thong_diep": "Thông điệp theo ngôn ngữ hiện tại",
    "chi_tiet_loi": [
      {
        "truong": "so_tien",
        "ma_loi_truong": "THEO_TL14",
        "thong_diep": "Số tiền phải lớn hơn 0"
      }
    ],
    "co_the_thu_lai": false
  },
  "meta": {
    "ma_yeu_cau": "rq_01H...",
    "thoi_diem_phan_hoi": "2026-02-24T10:30:00Z"
  }
}
```

### 7.4 Phản hồi thao tác bất đồng bộ hoặc đang xử lý

Áp dụng cho thao tác có duyệt tay hoặc xử lý nền.

```json
{
  "thanh_cong": true,
  "du_lieu": {
    "ma": "req_abc",
    "ma_trang_thai": "THEO_TL14",
    "nhan_trang_thai": "Chờ duyệt"
  },
  "meta": {
    "can_theo_doi": true,
    "duong_dan_theo_doi": "/v1/nap-tien/hoa-don/req_abc"
  }
}
```

---

## 8. Quy ước yêu cầu chung

### 8.1 Phân trang

Chuẩn cho danh sách:

- `trang` mặc định `1`
- `kich_thuoc_trang` mặc định `20`
- `kich_thuoc_trang` tối đa `100`

Máy chủ phải trả về thông tin phân trang trong `meta.phan_trang`.

### 8.2 Sắp xếp

- Dùng `sap_xep_theo`
- Dùng `thu_tu` với giá trị danh mục TL14 cho tăng hoặc giảm
- Nếu không truyền, dùng sắp xếp mặc định theo thời điểm tạo giảm dần

### 8.3 Tìm kiếm và lọc

- Tìm kiếm văn bản tự do qua `tu_khoa`
- Lọc theo trạng thái qua `ma_trang_thai`
- Lọc theo khoảng thời gian:
  - `tu_ngay_gio`
  - `den_ngay_gio`
- Lọc theo loại đối tượng bằng mã danh mục theo TL14

### 8.4 Chuẩn thời gian

- Truyền và trả về thời gian theo chuẩn có múi giờ
- Máy chủ lưu chuẩn thống nhất, giao diện hiển thị theo múi giờ người dùng
- Các báo cáo theo ngày phải cho phép truyền `mui_gio`

### 8.5 Chuẩn tiền tệ và số tiền

- Không dùng số thực nhị phân trong tính toán nội bộ
- Trường số tiền truyền dưới dạng chuỗi số thập phân hoặc số nguyên đơn vị nhỏ theo quy ước hệ thống
- Trường tiền tệ dùng `ma_don_vi_tien` theo TL14

### 8.6 Song ngữ

- Có thể truyền `ngon_ngu` để ghi đè ngôn ngữ phản hồi cho yêu cầu hiện tại
- Nếu không truyền, dùng ngôn ngữ mặc định của người dùng
- Nhãn trạng thái và thông điệp lỗi hiển thị theo TL14

---

## 9. Chống xử lý trùng, khóa đồng thời và truy vết yêu cầu

### 9.1 Tiêu đề chống xử lý trùng

Bắt buộc cho các thao tác tạo hoặc duyệt có rủi ro lặp:

- `Khoa-Chong-Trung`: giá trị duy nhất do phía gọi sinh ra

Áp dụng tối thiểu cho:
- tạo hóa đơn nạp tiền
- tải chứng từ (nếu tách nhiều bước lưu)
- tạo yêu cầu rút tiền
- duyệt nạp tiền
- duyệt rút tiền
- tạo chiến dịch
- ghi nhận sự kiện lượt nội bộ
- chốt đối soát doanh thu nhà xuất bản
- điều chỉnh đối soát chiến dịch

### 9.2 Quy tắc xử lý trùng

- Cùng khóa và cùng nội dung yêu cầu: trả lại kết quả cũ
- Cùng khóa nhưng khác nội dung: trả lỗi theo TL14
- Máy chủ phải lưu ánh xạ khóa chống trùng trong thời gian đủ dài theo nghiệp vụ

### 9.3 Mã yêu cầu phục vụ truy vết

Mọi phản hồi phải trả:
- `meta.ma_yeu_cau`

Mọi nhật ký máy chủ, nhật ký nghiệp vụ, nhật ký quản trị phải lưu `ma_yeu_cau` nếu có.

### 9.4 Khóa đồng thời

Các tài nguyên sau cần cơ chế khóa hoặc phiên bản bản ghi để tránh ghi đè:

- ví và số dư
- hóa đơn nạp tiền
- yêu cầu rút tiền
- chiến dịch
- liên kết rút gọn
- bản ghi đối soát

Khuyến nghị sử dụng trường `phien_ban_ban_ghi` hoặc dấu thời gian cập nhật để kiểm tra xung đột.

---

## 10. Ma trận nhóm đường dẫn theo chức năng và vai trò

### 10.1 Bảng tổng hợp

| Nhóm | Chức năng TL02 | Vai trò chính | Ghi chú |
|---|---|---|---|
| Xác thực và tài khoản | NV01–NV06 | R00, R10, R20, R30, R40 | Cổng đăng nhập |
| Thông tin nhận tiền | NV07 | R20, R30, R40 | R40 chỉ xem theo quyền hỗ trợ |
| Ví và giao dịch | NV08 | R10, R20, R30, R40 | R40 che dữ liệu nhạy cảm |
| Nạp tiền thủ công | NV09–NV11 | R10, R30, R40 | Duyệt cuối chỉ R30 |
| Rút tiền thủ công | NV12–NV14 | R20, R30, R40 | Khóa tạm số dư theo TL09 |
| Cấu hình phương thức nạp rút | NV15 | R30 | Cấu hình hiển thị ngân hàng, USDT |
| Liên kết rút gọn | NV16–NV19 | R20, R30, R40 | R40 hạn chế thao tác trạng thái |
| Sự kiện liên kết, hợp lệ, doanh thu | NV20–NV23 | Nội bộ, R30, R40 | Ghi nhận nội bộ, đối soát quản trị |
| Chiến dịch theo lượt | NV24–NV31 | R10, R30, R40 | R40 không duyệt cuối |
| Quản trị cấu hình hệ thống | NV32–NV37 | R30, R40 | Nhiều thao tác nhạy cảm chỉ R30 |
| Gian lận, nhật ký, đối soát | NV38–NV40 | R30, R40 | R40 chủ yếu xem |
| Cổng chuyển hướng công khai | NV41–NV45 | R01, R00, nội bộ | Không cần đăng nhập để truy cập liên kết |

### 10.2 Nguyên tắc ánh xạ

- Một chức năng NV có thể tương ứng nhiều đường dẫn.
- Một đường dẫn có thể phục vụ nhiều NV nếu chỉ khác dữ liệu đầu vào, nhưng phải ghi rõ trong mô tả.
- TL15 luôn ưu tiên truy vết về NV để thuận kiểm thử chấp nhận.

---

## 11. Đặc tả chi tiết theo nhóm đường dẫn

### 11.1 Nhóm xác thực và tài khoản (NV01–NV06)

### 11.1.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-001 | POST | `/v1/xac-thuc/dang-ky` | NV01 | R00 |
| GDL-002 | POST | `/v1/xac-thuc/dang-nhap` | NV02 | R00 |
| GDL-003 | POST | `/v1/xac-thuc/quen-mat-khau` | NV03 | R00 |
| GDL-004 | POST | `/v1/xac-thuc/dat-lai-mat-khau` | NV03 | R00 |
| GDL-005 | POST | `/v1/xac-thuc/lam-moi-phien` | NV02 | R10,R20,R30,R40 |
| GDL-006 | POST | `/v1/xac-thuc/dang-xuat` | NV02 | R10,R20,R30,R40 |
| GDL-007 | GET | `/v1/ho-so/toi` | NV04 | R10,R20,R30,R40 |
| GDL-008 | PATCH | `/v1/ho-so/toi` | NV04 | R10,R20,R30,R40 |
| GDL-009 | POST | `/v1/ho-so/doi-mat-khau` | NV05 | R10,R20,R30,R40 |
| GDL-010 | PATCH | `/v1/ho-so/ngon-ngu` | NV06 | R10,R20,R30,R40 |

### 11.1.2 GDL-001 — Đăng ký tài khoản

**Mục đích:** Tạo tài khoản người dùng cho nhóm khách hàng mua chiến dịch hoặc nhà xuất bản.

**Đầu vào bắt buộc**
- `loai_tai_khoan` (mã danh mục vai trò cho R10 hoặc R20)
- `thu_dien_tu`
- `mat_khau`
- `ten_hien_thi`
- `dong_y_dieu_khoan`

**Kiểm tra hợp lệ chính**
- Thư điện tử chưa tồn tại
- Loại tài khoản thuộc nhóm được phép tự đăng ký
- Mật khẩu đạt chính sách tối thiểu
- Đồng ý điều khoản là bắt buộc

**Phản hồi thành công**
- Trả về hồ sơ cơ bản
- `ma_trang_thai` tài khoản theo TL14 (thường là trạng thái hoạt động hoặc chờ xác minh theo cấu hình)

**Mã lỗi thường gặp (tham chiếu TL14)**
- thư điện tử đã tồn tại
- dữ liệu đầu vào không hợp lệ
- loại tài khoản không hợp lệ

### 11.1.3 GDL-002 — Đăng nhập

**Đầu vào**
- `thu_dien_tu`
- `mat_khau`
- `thong_tin_thiet_bi` (khuyến nghị)

**Phản hồi**
- `ma_truy_cap`
- `ma_lam_moi_phien`
- `thoi_diem_het_han`
- thông tin hồ sơ và vai trò

**Ràng buộc**
- Lưu nhật ký đăng nhập
- Có thể trả yêu cầu xác minh bổ sung theo cấu hình an toàn

### 11.1.4 GDL-007/GDL-008/GDL-009/GDL-010

- Dùng cho hồ sơ cá nhân, đổi mật khẩu, đổi ngôn ngữ.
- Mọi trường nhạy cảm chỉnh sửa phải ghi nhật ký nghiệp vụ.
- `ngon_ngu` chỉ nhận giá trị từ danh mục ngôn ngữ TL14.

---

### 11.2 Nhóm thông tin nhận tiền nhà xuất bản (NV07)

### 11.2.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-020 | GET | `/v1/rut-tien/thong-tin-nhan-tien` | NV07 | R20,R30,R40 |
| GDL-021 | PUT | `/v1/rut-tien/thong-tin-nhan-tien` | NV07 | R20 |
| GDL-022 | GET | `/v1/quan-tri/nguoi-dung/{ma_nguoi_dung}/thong-tin-nhan-tien` | NV07,NV32 | R30,R40 |
| GDL-023 | PATCH | `/v1/quan-tri/nguoi-dung/{ma_nguoi_dung}/thong-tin-nhan-tien/xac-minh` | NV07,NV32 | R30 |

### 11.2.2 Quy tắc

- Hỗ trợ nhiều phương thức: ngân hàng Việt Nam, ví USDT thủ công (theo danh mục TL14).
- R40 chỉ xem theo phạm vi hỗ trợ và phải che bớt dữ liệu nhạy cảm.
- Mọi thay đổi thông tin nhận tiền phải lưu lịch sử thay đổi.

---

### 11.3 Nhóm ví và sổ cái giao dịch (NV08)

### 11.3.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-030 | GET | `/v1/vi/toi` | NV08 | R10,R20 |
| GDL-031 | GET | `/v1/vi/toi/giao-dich` | NV08 | R10,R20 |
| GDL-032 | GET | `/v1/vi/toi/giao-dich/{ma_giao_dich}` | NV08 | R10,R20 |
| GDL-033 | GET | `/v1/quan-tri/vi/{ma_vi}` | NV08,NV32 | R30,R40 |
| GDL-034 | GET | `/v1/quan-tri/so-cai/giao-dich` | NV08,NV39 | R30,R40 |
| GDL-035 | GET | `/v1/quan-tri/so-cai/giao-dich/{ma_giao_dich}` | NV08,NV39 | R30,R40 |

### 11.3.2 Trường phản hồi cốt lõi cho ví

- `ma_vi`
- `loai_vi`
- `ma_don_vi_tien`
- `so_du_kha_dung`
- `so_du_khoa_tam`
- `thoi_diem_cap_nhat`

### 11.3.3 Ràng buộc

- Không có đường dẫn cập nhật số dư trực tiếp.
- Số dư chỉ thay đổi qua nạp tiền, rút tiền, trừ tiền chiến dịch, ghi doanh thu nhà xuất bản, hoàn/điều chỉnh đối soát.

---

### 11.4 Nhóm nạp tiền thủ công (NV09–NV11)

### 11.4.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-040 | POST | `/v1/nap-tien/hoa-don` | NV09 | R10 |
| GDL-041 | GET | `/v1/nap-tien/hoa-don` | NV09 | R10 |
| GDL-042 | GET | `/v1/nap-tien/hoa-don/{ma_hoa_don}` | NV09 | R10 |
| GDL-043 | POST | `/v1/nap-tien/hoa-don/{ma_hoa_don}/chung-tu` | NV10 | R10 |
| GDL-044 | PATCH | `/v1/nap-tien/hoa-don/{ma_hoa_don}/huy` | NV09 | R10 |
| GDL-045 | GET | `/v1/quan-tri/nap-tien/hoa-don` | NV11 | R30,R40 |
| GDL-046 | GET | `/v1/quan-tri/nap-tien/hoa-don/{ma_hoa_don}` | NV11 | R30,R40 |
| GDL-047 | POST | `/v1/quan-tri/nap-tien/hoa-don/{ma_hoa_don}/duyet` | NV11 | R30 |
| GDL-048 | POST | `/v1/quan-tri/nap-tien/hoa-don/{ma_hoa_don}/tu-choi` | NV11 | R30 |
| GDL-049 | POST | `/v1/quan-tri/nap-tien/hoa-don/{ma_hoa_don}/chuyen-kiem-tra` | NV11 | R30,R40 |

### 11.4.2 GDL-040 — Tạo hóa đơn nạp tiền

**Đầu vào**
- `so_tien_yeu_cau`
- `ma_don_vi_tien`
- `ma_phuong_thuc_nap` (ngân hàng hoặc USDT thủ công theo cấu hình hiển thị)
- `ghi_chu_nguoi_dung` (tùy chọn)

**Tiêu đề bắt buộc**
- `Khoa-Chong-Trung`

**Phản hồi**
- `ma_hoa_don`
- `ma_trang_thai` (ban đầu theo TL02/TL14)
- `thoi_diem_het_han`
- `thong_tin_thanh_toan_hien_thi`:
  - tài khoản ngân hàng hoặc ví USDT hệ thống
  - nội dung tham chiếu
  - ảnh mã
  - cảnh báo quy tắc chuyển tiền

**Mã lỗi thường gặp**
- phương thức nạp không khả dụng
- số tiền không hợp lệ
- vượt giới hạn phiên bản đầu (nếu có cấu hình)
- lỗi chống xử lý trùng

### 11.4.3 GDL-043 — Tải chứng từ nạp tiền

**Đầu vào**
- `tep_chung_tu` (ảnh)
- `mo_ta` (tùy chọn)

**Ràng buộc**
- Chỉ cho phép khi hóa đơn còn hiệu lực và ở trạng thái cho phép theo TL08
- Kiểm tra loại tệp, kích thước, số lượng tệp tối đa
- Lưu lịch sử tải chứng từ nếu thay thế
- Chuyển trạng thái theo đúng bảng chuyển trạng thái TL08

### 11.4.4 GDL-047 — Duyệt hóa đơn nạp tiền (R30)

**Đầu vào**
- `quyet_dinh_duyet`
- `so_tien_xac_nhan` (nếu duyệt tay có điều chỉnh theo quy trình)
- `ghi_chu_noi_bo`
- `tham_chieu_doi_chieu` (tùy chọn)
- `yeu_cau_xac_thuc_bo_sung` (nếu hệ thống cấu hình)

**Tiêu đề bắt buộc**
- `Khoa-Chong-Trung`

**Ràng buộc nghiệp vụ**
- Chỉ duyệt một lần thành công cho một hóa đơn
- Nếu đã thành công thì trả kết quả cũ, không cộng trùng
- Cộng tiền phải tạo bút toán sổ cái và tham chiếu hóa đơn
- Ghi nhật ký quản trị bắt buộc

**Phản hồi**
- thông tin hóa đơn sau xử lý
- thông tin bút toán sổ cái phát sinh (nếu duyệt thành công)

### 11.4.5 GDL-048 — Từ chối hóa đơn nạp tiền (R30)

**Đầu vào**
- `ly_do_tu_choi_ma` (danh mục mã)
- `ghi_chu_noi_bo`
- `ghi_chu_hien_thi_nguoi_dung` (song ngữ hoặc khóa thông điệp)

**Ràng buộc**
- Không tạo bút toán cộng tiền
- Phải lưu lý do và người thao tác
- Nếu hóa đơn đã thành công thì không được từ chối

---

### 11.5 Nhóm rút tiền thủ công (NV12–NV14)

### 11.5.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-060 | POST | `/v1/rut-tien/yeu-cau` | NV12 | R20 |
| GDL-061 | GET | `/v1/rut-tien/yeu-cau` | NV12 | R20 |
| GDL-062 | GET | `/v1/rut-tien/yeu-cau/{ma_yeu_cau}` | NV12 | R20 |
| GDL-063 | PATCH | `/v1/rut-tien/yeu-cau/{ma_yeu_cau}/huy` | NV12 | R20 |
| GDL-064 | GET | `/v1/quan-tri/rut-tien/yeu-cau` | NV13,NV14 | R30,R40 |
| GDL-065 | GET | `/v1/quan-tri/rut-tien/yeu-cau/{ma_yeu_cau}` | NV13,NV14 | R30,R40 |
| GDL-066 | POST | `/v1/quan-tri/rut-tien/yeu-cau/{ma_yeu_cau}/duyet` | NV13 | R30 |
| GDL-067 | POST | `/v1/quan-tri/rut-tien/yeu-cau/{ma_yeu_cau}/danh-dau-da-gui` | NV13 | R30 |
| GDL-068 | POST | `/v1/quan-tri/rut-tien/yeu-cau/{ma_yeu_cau}/hoan-thanh` | NV13,NV14 | R30 |
| GDL-069 | POST | `/v1/quan-tri/rut-tien/yeu-cau/{ma_yeu_cau}/tu-choi` | NV13,NV14 | R30 |
| GDL-070 | POST | `/v1/quan-tri/rut-tien/yeu-cau/{ma_yeu_cau}/tep-xu-ly` | NV13 | R30 |
| GDL-071 | POST | `/v1/quan-tri/rut-tien/yeu-cau/{ma_yeu_cau}/chuyen-kiem-tra` | NV13 | R30,R40 |

### 11.5.2 GDL-060 — Tạo yêu cầu rút tiền

**Đầu vào**
- `so_tien`
- `ma_don_vi_tien`
- `ma_phuong_thuc_rut`
- `ma_ho_so_nhan_tien` hoặc `thong_tin_nhan_tien_chot` (bản chụp nhanh)
- `ghi_chu`

**Tiêu đề bắt buộc**
- `Khoa-Chong-Trung`

**Ràng buộc**
- Chỉ R20
- Kiểm tra ngưỡng rút tối thiểu
- Kiểm tra số dư khả dụng
- Kiểm tra trạng thái tài khoản
- Tạo khóa tạm số dư theo TL09 bằng bút toán hoặc cơ chế sổ cái khóa
- Chuyển trạng thái ban đầu theo TL02/TL14

**Phản hồi**
- `ma_yeu_cau_rut`
- `ma_trang_thai`
- số dư sau khi khóa tạm

### 11.5.3 GDL-066/GDL-067/GDL-068/GDL-069 — Xử lý rút tiền của quản trị

**GDL-066 Duyệt**
- Đầu vào: ghi chú, tham chiếu đối chiếu
- Chuyển trạng thái sang nhánh đã duyệt theo TL09
- Không chi tiền ngay nếu quy trình tách bước

**GDL-067 Đánh dấu đã gửi**
- Bắt buộc có bằng chứng hoặc tham chiếu giao dịch
- Chuyển trạng thái `đã gửi`

**GDL-068 Hoàn thành**
- Xác nhận chốt chi rút
- Mở khóa số dư và kết chuyển sang chi thực tế theo TL09/NV14
- Chống xử lý trùng bắt buộc

**GDL-069 Từ chối**
- Bắt buộc lý do
- Hoàn số dư khóa tạm về khả dụng theo TL09/NV14
- Ghi rõ khác biệt với trạng thái `hoàn tiền`

### 11.5.4 Ràng buộc che dữ liệu

Khi R40 truy cập danh sách hoặc chi tiết rút tiền:
- che bớt số tài khoản
- che bớt địa chỉ ví
- không hiển thị đủ chứng từ nếu không có quyền

---

### 11.6 Nhóm cấu hình phương thức nạp và rút hiển thị (NV15, NV35, NV36)

### 11.6.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-080 | GET | `/v1/cong-khai/cau-hinh-thanh-toan-hien-thi` | NV15 | R00,R10,R20 |
| GDL-081 | GET | `/v1/quan-tri/cau-hinh/ngan-hang-he-thong` | NV35 | R30,R40 |
| GDL-082 | POST | `/v1/quan-tri/cau-hinh/ngan-hang-he-thong` | NV35 | R30 |
| GDL-083 | PATCH | `/v1/quan-tri/cau-hinh/ngan-hang-he-thong/{ma}` | NV35 | R30 |
| GDL-084 | GET | `/v1/quan-tri/cau-hinh/vi-usdt-he-thong` | NV36 | R30,R40 |
| GDL-085 | POST | `/v1/quan-tri/cau-hinh/vi-usdt-he-thong` | NV36 | R30 |
| GDL-086 | PATCH | `/v1/quan-tri/cau-hinh/vi-usdt-he-thong/{ma}` | NV36 | R30 |

### 11.6.2 Ràng buộc

- GDL-080 chỉ trả dữ liệu cần hiển thị, không lộ cấu hình nội bộ không cần thiết.
- Cấu hình ảnh mã phải đi qua mô đun tệp, có kiểm tra loại tệp.
- Sắp xếp hiển thị theo `thu_tu_hien_thi`.

---

### 11.7 Nhóm liên kết rút gọn nhà xuất bản (NV16–NV19)

### 11.7.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-100 | POST | `/v1/lien-ket` | NV16 | R20 |
| GDL-101 | GET | `/v1/lien-ket` | NV19 | R20 |
| GDL-102 | GET | `/v1/lien-ket/{ma_lien_ket}` | NV19 | R20 |
| GDL-103 | PATCH | `/v1/lien-ket/{ma_lien_ket}` | NV17 | R20 |
| GDL-104 | POST | `/v1/lien-ket/{ma_lien_ket}/tam-khoa` | NV18 | R20,R30 |
| GDL-105 | POST | `/v1/lien-ket/{ma_lien_ket}/mo-khoa` | NV18 | R20,R30 |
| GDL-106 | GET | `/v1/lien-ket/{ma_lien_ket}/thong-ke-theo-ngay` | NV19 | R20 |
| GDL-107 | GET | `/v1/lien-ket/{ma_lien_ket}/su-kien` | NV19 | R20 |
| GDL-108 | GET | `/v1/quan-tri/lien-ket` | NV16–NV19,NV32 | R30,R40 |
| GDL-109 | GET | `/v1/quan-tri/lien-ket/{ma_lien_ket}` | NV16–NV19,NV32 | R30,R40 |
| GDL-110 | POST | `/v1/quan-tri/lien-ket/{ma_lien_ket}/doi-trang-thai` | NV18,NV32 | R30 |

### 11.7.2 GDL-100 — Tạo liên kết rút gọn

**Đầu vào**
- `lien_ket_goc`
- `bi_danh` (tùy chọn)
- `lien_ket_du_phong` (tùy chọn)
- `nhom_noi_dung` (tùy chọn phục vụ kiểm duyệt)
- `ghi_chu`

**Ràng buộc**
- Kiểm tra định dạng liên kết hợp lệ
- `bi_danh` duy nhất nếu có
- Chặn danh mục liên kết vi phạm theo chính sách
- Trạng thái ban đầu theo quy trình (có thể `chờ duyệt` hoặc `hoạt động` theo cấu hình)
- Ghi nhật ký tạo liên kết

**Phản hồi**
- `ma_lien_ket`
- `ma_ngan`
- `duong_dan_ngan`
- `ma_trang_thai`

### 11.7.3 GDL-103 — Cập nhật liên kết

- Chỉ cho phép cập nhật trường theo TL11 và theo trạng thái.
- Không cho phép sửa trường đã khóa khi liên kết đang có vấn đề đối soát nếu chính sách cấm.
- Lưu lịch sử thay đổi.

### 11.7.4 GDL-106/GDL-107 — Thống kê liên kết

- Số liệu tổng hợp theo ngày phải phân biệt:
  - tổng truy cập ghi nhận
  - lượt hợp lệ tạm thời
  - lượt bị loại tạm thời
  - lượt hợp lệ đã chốt
  - lượt bị loại đã chốt
- Nếu hiển thị doanh thu, phải nêu rõ là tạm thời hay đã chốt.

---

### 11.8 Nhóm cổng chuyển hướng công khai và ghi nhận sự kiện (NV41–NV45, NV20–NV22)

> Nhóm này là lõi kỹ thuật nối giữa liên kết rút gọn, đánh giá lượt hợp lệ và doanh thu/chi phí.  
> Không triển khai nội dung hướng dẫn thao túng tín hiệu tìm kiếm.

### 11.8.1 Danh sách đường dẫn công khai

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-120 | GET | `/v1/cong-khai/l/{ma_ngan}` | NV41,NV44 | R01 |
| GDL-121 | POST | `/v1/cong-khai/l/{ma_ngan}/xac-minh` | NV42 | R01 |
| GDL-122 | POST | `/v1/cong-khai/l/{ma_ngan}/hoan-tat` | NV43,NV20 | R01 |
| GDL-123 | POST | `/v1/cong-khai/l/{ma_ngan}/bao-loi` | NV45 | R00,R01 |
| GDL-124 | GET | `/v1/cong-khai/l/{ma_ngan}/trang-thai` | NV44 | R00,R01 |

### 11.8.2 Danh sách đường dẫn nội bộ xử lý sự kiện lượt

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-130 | POST | `/v1/noi-bo/su-kien-luot` | NV20,NV21 | Nội bộ |
| GDL-131 | POST | `/v1/noi-bo/su-kien-luot/{ma_su_kien}/danh-gia` | NV21 | Nội bộ |
| GDL-132 | POST | `/v1/noi-bo/su-kien-luot/{ma_su_kien}/ghi-nhan-doanh-thu` | NV22 | Nội bộ |
| GDL-133 | POST | `/v1/noi-bo/su-kien-luot/{ma_su_kien}/ghi-nhan-chi-phi-chien-dich` | NV29,NV30 | Nội bộ |
| GDL-134 | GET | `/v1/quan-tri/su-kien-luot` | NV38 | R30,R40 |
| GDL-135 | GET | `/v1/quan-tri/su-kien-luot/{ma_su_kien}` | NV38 | R30,R40 |
| GDL-136 | POST | `/v1/quan-tri/su-kien-luot/{ma_su_kien}/quyet-dinh-thu-cong` | NV38 | R30 |

### 11.8.3 GDL-120 — Mở liên kết ngắn (công khai)

**Mục đích**
- Kiểm tra liên kết tồn tại và trạng thái
- Hiển thị trang trung gian hợp lệ hoặc trang lỗi
- Tạo phiên truy cập tạm để theo dõi các bước tiếp theo

**Phản hồi**
- Nếu khả dụng:
  - thông tin hiển thị an toàn
  - yêu cầu xác minh (nếu bật)
  - `ma_phien_truy_cap_tam`
- Nếu không khả dụng:
  - trạng thái liên kết và thông điệp lỗi theo TL14/TL02

### 11.8.4 GDL-121 — Xác minh truy cập hợp lệ chống máy tự động

**Đầu vào**
- `ma_phien_truy_cap_tam`
- dữ liệu xác minh từ dịch vụ xác minh người dùng thật (nếu dùng)
- `thong_tin_moi_truong_truy_cap` (tùy mức triển khai)

**Ràng buộc**
- Không chấp nhận dùng lại phiên truy cập tạm đã hoàn tất
- Lưu kết quả xác minh vào dấu vết sự kiện
- Không quyết định hợp lệ cuối cùng tại bước này; chỉ là một lớp trong TL12

### 11.8.5 GDL-122 — Hoàn tất và chuyển hướng

**Đầu vào**
- `ma_phien_truy_cap_tam`
- `thoi_luong_tuong_tac` (nếu giao diện đo được)
- `du_lieu_bo_sung` (tùy chọn)

**Xử lý**
1. Ghi nhận sự kiện truy cập (NV20)
2. Đưa vào đánh giá nhiều lớp (NV21)
3. Tạo tác vụ nội bộ ghi doanh thu/chi phí nếu đạt điều kiện tạm thời (NV22, NV30)
4. Trả về:
   - `lien_ket_dich` hoặc `lien_ket_du_phong`
   - trạng thái xử lý

**Ràng buộc**
- Chống xử lý lặp theo phiên truy cập tạm và khóa chống trùng
- Không trả thông tin nhạy cảm của nhà xuất bản hoặc khách hàng chiến dịch

### 11.8.6 GDL-130 — Ghi nhận sự kiện lượt (nội bộ)

**Bảo vệ**
- Chỉ chấp nhận từ dịch vụ nội bộ đã xác thực dịch vụ
- Bắt buộc `Khoa-Chong-Trung`

**Đầu vào cốt lõi**
- `nguon_su_kien` (liên kết, chiến dịch, kết hợp)
- `ma_lien_ket` (nếu có)
- `ma_chien_dich` (nếu có)
- `dau_vet_thiet_bi`
- `dia_chi_mang_bam`
- `thoi_diem_su_kien`
- `thong_tin_trinh_duyet`
- `thong_tin_he_dieu_hanh`
- `quoc_gia`
- `thoi_luong`
- `ket_qua_xac_minh`
- `du_lieu_bo_sung`

**Phản hồi**
- `ma_su_kien`
- `ma_trang_thai` ban đầu (`mới ghi nhận`)

### 11.8.7 GDL-136 — Quyết định thủ công sự kiện lượt (R30)

**Đầu vào**
- `quyet_dinh_thu_cong_ma` (danh mục TL14)
- `ghi_chu_noi_bo`
- `anh_huong_doi_soat` (nếu có)
- `yeu_cau_dieu_chinh_tai_chinh` (nếu quyết định sau chốt)

**Ràng buộc**
- Chỉ R30
- Bắt buộc nhật ký
- Nếu ảnh hưởng tới số liệu đã chốt, phải phát sinh quy trình điều chỉnh theo TL10/TL11/TL12, không sửa trực tiếp bản ghi tổng hợp

---

### 11.9 Nhóm chiến dịch tính theo lượt (NV24–NV31)

### 11.9.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-150 | POST | `/v1/chien-dich` | NV24 | R10 |
| GDL-151 | GET | `/v1/chien-dich` | NV31 | R10 |
| GDL-152 | GET | `/v1/chien-dich/{ma_chien_dich}` | NV31 | R10 |
| GDL-153 | PATCH | `/v1/chien-dich/{ma_chien_dich}` | NV25 | R10 |
| GDL-154 | POST | `/v1/chien-dich/{ma_chien_dich}/gui-duyet` | NV26 | R10 |
| GDL-155 | POST | `/v1/chien-dich/{ma_chien_dich}/tam-dung` | NV27 | R10,R30 |
| GDL-156 | POST | `/v1/chien-dich/{ma_chien_dich}/tiep-tuc` | NV27 | R10,R30 |
| GDL-157 | POST | `/v1/chien-dich/{ma_chien_dich}/huy` | NV28 | R10,R30 |
| GDL-158 | GET | `/v1/chien-dich/{ma_chien_dich}/thong-ke-theo-ngay` | NV31 | R10 |
| GDL-159 | GET | `/v1/chien-dich/{ma_chien_dich}/su-kien` | NV31 | R10 |
| GDL-160 | GET | `/v1/quan-tri/chien-dich` | NV24–NV31,NV32 | R30,R40 |
| GDL-161 | GET | `/v1/quan-tri/chien-dich/{ma_chien_dich}` | NV24–NV31,NV32 | R30,R40 |
| GDL-162 | POST | `/v1/quan-tri/chien-dich/{ma_chien_dich}/duyet` | NV26 | R30 |
| GDL-163 | POST | `/v1/quan-tri/chien-dich/{ma_chien_dich}/tu-choi` | NV26 | R30 |
| GDL-164 | POST | `/v1/quan-tri/chien-dich/{ma_chien_dich}/doi-trang-thai` | NV27,NV28 | R30 |

### 11.9.2 GDL-150 — Tạo chiến dịch

**Đầu vào**
- `ten_chien_dich`
- `duong_dan_dich`
- `mo_ta`
- `don_gia_moi_luot`
- `ma_don_vi_tien`
- `ngan_sach_tong`
- `gioi_han_luot_moi_ngay`
- `thoi_diem_bat_dau`
- `thoi_diem_ket_thuc`
- `cau_hinh_nham_muc_tieu`
  - quốc gia
  - thiết bị
  - trình duyệt
  - khung giờ
- `cai_dat_bo_sung` (tùy chọn)

**Tiêu đề bắt buộc**
- `Khoa-Chong-Trung`

**Ràng buộc**
- Chỉ R10
- Kiểm tra số dư tối thiểu nếu chính sách yêu cầu ngay khi tạo
- Kiểm tra tính hợp lệ của cấu hình nhắm mục tiêu
- Trạng thái ban đầu là `nháp`
- Lưu phiên bản cấu hình ban đầu

### 11.9.3 GDL-153 — Cập nhật chiến dịch

- Chỉ cho phép sửa trong các trạng thái được phép theo TL10.
- Nếu sửa trường quan trọng, tạo phiên bản cấu hình mới.
- Không cho phép cập nhật khi `đang chạy` nếu không thuộc danh sách cho phép.

### 11.9.4 GDL-154 — Gửi duyệt chiến dịch

**Ràng buộc trước khi gửi duyệt**
- Đầy đủ trường bắt buộc
- Không vi phạm cấu hình cấm
- Còn khả năng tài chính tối thiểu theo quy tắc phiên bản đầu

**Phản hồi**
- trả trạng thái mới `chờ duyệt`

### 11.9.5 GDL-162/GDL-163 — Duyệt hoặc từ chối chiến dịch (R30)

- `duyet`: chuyển sang `sẵn sàng chạy` hoặc trạng thái tương ứng theo TL10
- `tu_choi`: chuyển `bị từ chối`, bắt buộc lý do
- Ghi nhật ký quản trị bắt buộc
- R40 không có quyền quyết định cuối

### 11.9.6 GDL-155/GDL-156/GDL-157 — Thay đổi trạng thái vận hành chiến dịch

- `tam-dung`: chỉ khi đang ở trạng thái cho phép
- `tiep-tuc`: chỉ khi `tạm dừng` và còn đủ điều kiện
- `huy`: theo điều kiện TL10, không hủy bừa sau khi hoàn thành

### 11.9.7 GDL-158/GDL-159 — Thống kê và sự kiện chiến dịch

Phải phân tách rõ:
- số liệu tạm thời
- số liệu đã chốt
- chi tiêu tạm thời
- chi tiêu đã chốt
- số lượt hợp lệ/bị loại theo trạng thái sự kiện lượt

---

### 11.10 Nhóm thống kê và báo cáo (NV19, NV23, NV31, NV40)

### 11.10.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-180 | GET | `/v1/thong-ke/tong-quan-khach-hang` | NV31 | R10 |
| GDL-181 | GET | `/v1/thong-ke/tong-quan-nha-xuat-ban` | NV19,NV23 | R20 |
| GDL-182 | GET | `/v1/thong-ke/bieu-do-theo-ngay` | NV19,NV31 | R10,R20 |
| GDL-183 | GET | `/v1/quan-tri/bao-cao/doi-soat-tong-quan` | NV40 | R30,R40 |
| GDL-184 | GET | `/v1/quan-tri/bao-cao/doi-soat-nha-xuat-ban` | NV23,NV40 | R30,R40 |
| GDL-185 | GET | `/v1/quan-tri/bao-cao/doi-soat-chien-dich` | NV31,NV40 | R30,R40 |
| GDL-186 | POST | `/v1/quan-tri/doi-soat/nha-xuat-ban/chot-ky` | NV23,NV40 | R30 |
| GDL-187 | POST | `/v1/quan-tri/doi-soat/chien-dich/chot-ky` | NV40 | R30 |
| GDL-188 | POST | `/v1/quan-tri/doi-soat/dieu-chinh` | NV40 | R30 |

### 11.10.2 GDL-186/GDL-187 — Chốt kỳ đối soát

**Tiêu đề bắt buộc**
- `Khoa-Chong-Trung`

**Đầu vào**
- `ky_doi_soat`
- `pham_vi`
- `mui_gio_chot`
- `ghi_chu`

**Ràng buộc**
- Không chốt trùng cùng kỳ cùng phạm vi
- Sự kiện đến trễ sau chốt xử lý qua quy trình điều chỉnh
- Ghi nhật ký và lưu bản chụp số liệu trước/sau chốt

### 11.10.3 GDL-188 — Điều chỉnh đối soát

- Chỉ R30
- Bắt buộc lý do, tham chiếu sự kiện/bản ghi gốc
- Phát sinh bút toán điều chỉnh, không sửa số dư trực tiếp
- Ghi nhật ký quản trị và nhật ký nghiệp vụ đầy đủ

---

### 11.11 Nhóm quản trị người dùng và cấu hình hệ thống (NV32–NV37)

### 11.11.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-200 | GET | `/v1/quan-tri/nguoi-dung` | NV32 | R30,R40 |
| GDL-201 | GET | `/v1/quan-tri/nguoi-dung/{ma_nguoi_dung}` | NV32 | R30,R40 |
| GDL-202 | PATCH | `/v1/quan-tri/nguoi-dung/{ma_nguoi_dung}` | NV32 | R30 |
| GDL-203 | POST | `/v1/quan-tri/nguoi-dung/{ma_nguoi_dung}/doi-trang-thai` | NV32 | R30 |
| GDL-204 | GET | `/v1/quan-tri/gia-theo-luot` | NV33 | R30,R40 |
| GDL-205 | POST | `/v1/quan-tri/gia-theo-luot` | NV33 | R30 |
| GDL-206 | PATCH | `/v1/quan-tri/gia-theo-luot/{ma}` | NV33 | R30 |
| GDL-207 | GET | `/v1/quan-tri/khuyen-mai-nap-tien` | NV34 | R30,R40 |
| GDL-208 | POST | `/v1/quan-tri/khuyen-mai-nap-tien` | NV34 | R30 |
| GDL-209 | PATCH | `/v1/quan-tri/khuyen-mai-nap-tien/{ma}` | NV34 | R30 |
| GDL-210 | GET | `/v1/quan-tri/thong-bao-he-thong` | NV37 | R30,R40 |
| GDL-211 | POST | `/v1/quan-tri/thong-bao-he-thong` | NV37 | R30 |
| GDL-212 | PATCH | `/v1/quan-tri/thong-bao-he-thong/{ma}` | NV37 | R30 |
| GDL-213 | POST | `/v1/quan-tri/thong-bao-he-thong/{ma}/phat-hanh` | NV37 | R30 |

### 11.11.2 Ràng buộc chung

- Mọi thao tác thay đổi cấu hình phải có nhật ký quản trị (NV39).
- Cấu hình giá theo lượt chỉ có hiệu lực theo mốc thời gian, không sửa đè lịch sử.
- Thông báo hệ thống hỗ trợ nội dung song ngữ theo TL14.

---

### 11.12 Nhóm chống gian lận và sự kiện lượt (NV38, NV21)

### 11.12.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-230 | GET | `/v1/quan-tri/gian-lan/canh-bao` | NV38 | R30,R40 |
| GDL-231 | GET | `/v1/quan-tri/gian-lan/canh-bao/{ma_canh_bao}` | NV38 | R30,R40 |
| GDL-232 | POST | `/v1/quan-tri/gian-lan/canh-bao/{ma_canh_bao}/gan-xu-ly` | NV38 | R30,R40 |
| GDL-233 | POST | `/v1/quan-tri/gian-lan/canh-bao/{ma_canh_bao}/dong` | NV38 | R30 |
| GDL-234 | GET | `/v1/quan-tri/gian-lan/quy-tac` | NV38 | R30,R40 |
| GDL-235 | POST | `/v1/quan-tri/gian-lan/quy-tac` | NV38 | R30 |
| GDL-236 | PATCH | `/v1/quan-tri/gian-lan/quy-tac/{ma}` | NV38 | R30 |

### 11.12.2 Lưu ý triển khai

- Phiên bản đầu có thể chỉ công bố giao diện lập trình xem cảnh báo và quyết định thủ công; quy tắc tự động nâng cao có thể làm tối thiểu.
- Không cung cấp ra ngoài logic chấm điểm chi tiết nếu gây lộ chiến lược phòng thủ.

---

### 11.13 Nhóm nhật ký quản trị và hỗ trợ (NV39, một phần NV37)

### 11.13.1 Danh sách đường dẫn

| Mã đường dẫn | Phương thức | Đường dẫn | Chức năng | Vai trò |
|---|---|---|---|---|
| GDL-250 | GET | `/v1/quan-tri/nhat-ky` | NV39 | R30,R40 |
| GDL-251 | GET | `/v1/quan-tri/nhat-ky/{ma_nhat_ky}` | NV39 | R30,R40 |
| GDL-252 | GET | `/v1/ho-tro/phieu` | Hỗ trợ vận hành | R40,R30 |
| GDL-253 | POST | `/v1/ho-tro/phieu` | Hỗ trợ vận hành | R40,R30 |
| GDL-254 | PATCH | `/v1/ho-tro/phieu/{ma_phieu}` | Hỗ trợ vận hành | R40,R30 |
| GDL-255 | POST | `/v1/ho-tro/phieu/{ma_phieu}/binh-luan` | Hỗ trợ vận hành | R40,R30 |

### 11.13.2 Ràng buộc

- R40 có thể tạo và cập nhật phiếu hỗ trợ nhưng không được thay người quyết định cuối cho giao dịch tài chính.
- Nhật ký quản trị phải lọc được theo:
  - người thao tác
  - hành động
  - đối tượng
  - thời gian
  - mã yêu cầu
- Hành động nhật ký dùng mã hành động theo TL14.

---

## 12. Quy tắc dữ liệu đầu vào và đầu ra cho các trường dùng chung

### 12.1 Trường trạng thái

- Trường máy đọc: `ma_trang_thai`
- Trường hiển thị: `nhan_trang_thai`
- Giá trị `ma_trang_thai` phải thuộc danh mục mã trạng thái TL14 theo từng thực thể
- Không dùng nhãn hiển thị để suy luận logic nghiệp vụ

### 12.2 Trường lỗi

- `ma_loi` theo TL14
- `thong_diep` theo ngôn ngữ phản hồi
- `chi_tiet_loi` là danh sách, có thể rỗng
- `co_the_thu_lai` dùng cho điều phối giao diện và tác vụ nền

### 12.3 Trường số tiền

- Trường số tiền chuẩn:
  - `so_tien`
  - `so_tien_yeu_cau`
  - `so_tien_xac_nhan`
  - `so_du_kha_dung`
  - `so_du_khoa_tam`
- Bắt buộc đi kèm `ma_don_vi_tien`
- Định dạng hiển thị do giao diện xử lý, không để máy chủ trả chuỗi đã định dạng kiểu giao diện

### 12.4 Trường thời gian

- Tên trường kết thúc bằng:
  - `_thoi_diem`
  - `_tu_ngay_gio`
  - `_den_ngay_gio`
- Trả về chuẩn có múi giờ
- Không trả chuỗi ngày giờ theo ngôn ngữ tự do

---

## 13. Quy tắc an toàn cho giao diện lập trình

### 13.1 Giới hạn tần suất

Áp dụng tối thiểu cho:
- đăng nhập
- quên mật khẩu
- tạo hóa đơn nạp
- tạo yêu cầu rút
- tạo liên kết
- tạo chiến dịch
- cổng chuyển hướng công khai
- báo lỗi liên kết
- các đường dẫn quản trị nhạy cảm

Phản hồi lỗi giới hạn tần suất dùng mã lỗi TL14, không trả chi tiết thừa.

### 13.2 Tải tệp

Áp dụng cho:
- chứng từ nạp tiền
- bằng chứng xử lý rút tiền
- ảnh cấu hình ngân hàng và USDT
- tệp hỗ trợ (nếu cho phép)

Ràng buộc:
- giới hạn loại tệp
- giới hạn kích thước
- quét an toàn nếu hạ tầng có hỗ trợ
- lưu metadata phục vụ truy vết
- phân quyền truy cập tệp theo vai trò

### 13.3 Nhật ký và dấu vết

- Mọi thao tác ghi dữ liệu có `ma_yeu_cau`
- Mọi thao tác quản trị có nhật ký hành động theo TL14
- Mọi quyết định thủ công trong tài chính và gian lận bắt buộc có `ghi_chu_noi_bo`

### 13.4 Dữ liệu nhạy cảm

- Che hoặc ẩn:
  - số tài khoản
  - tên chủ tài khoản trong một số ngữ cảnh hỗ trợ
  - địa chỉ ví
  - thông tin chứng từ
- Không trả đầy đủ dữ liệu nhạy cảm trong danh sách; chỉ trả đầy đủ trong chi tiết khi đủ quyền

---

## 14. Quy tắc tương thích phiên bản và thay đổi giao diện lập trình

### 14.1 Thay đổi không phá vỡ tương thích

Được phép:
- thêm trường mới không bắt buộc trong phản hồi
- thêm giá trị danh mục mới nếu đã cập nhật TL14
- thêm đường dẫn mới trong cùng phiên bản nếu không thay nghĩa đường dẫn cũ

### 14.2 Thay đổi phá vỡ tương thích

Phải tăng phiên bản:
- đổi tên trường đang dùng
- đổi kiểu dữ liệu trường
- đổi hành vi mặc định ảnh hưởng nghiệp vụ
- đổi mã lỗi hoặc mã trạng thái đã công bố
- đổi luồng trạng thái trái TL02/TL14

### 14.3 Quy trình quản trị thay đổi

1. Đề xuất thay đổi
2. Đối chiếu TL02, TL13, TL14
3. Cập nhật TL15
4. Cập nhật kiểm thử
5. Thông báo đội giao diện và trợ lý lập trình
6. Mới triển khai

---

## 15. Ma trận truy vết từ chức năng nghiệp vụ sang đường dẫn chính

> Bảng này dùng để kiểm thử chấp nhận và phân công công việc.

| Chức năng | Mô tả | Đường dẫn chính |
|---|---|---|
| NV01 | Đăng ký tài khoản | GDL-001 |
| NV02 | Đăng nhập và phiên | GDL-002, GDL-005, GDL-006 |
| NV03 | Quên / đặt lại mật khẩu | GDL-003, GDL-004 |
| NV04 | Hồ sơ cá nhân | GDL-007, GDL-008 |
| NV05 | Đổi mật khẩu | GDL-009 |
| NV06 | Chọn ngôn ngữ | GDL-010 |
| NV07 | Thông tin nhận tiền nhà xuất bản | GDL-020, GDL-021, GDL-023 |
| NV08 | Ví và lịch sử giao dịch | GDL-030 đến GDL-035 |
| NV09 | Tạo / theo dõi hóa đơn nạp | GDL-040 đến GDL-044 |
| NV10 | Tải chứng từ nạp | GDL-043 |
| NV11 | Duyệt / từ chối nạp | GDL-045 đến GDL-049 |
| NV12 | Tạo / theo dõi rút tiền | GDL-060 đến GDL-063 |
| NV13 | Duyệt / từ chối / xử lý rút | GDL-064 đến GDL-071 |
| NV14 | Khóa tạm và hoàn số dư theo rút | GDL-060, GDL-066 đến GDL-069 |
| NV15 | Cấu hình phương thức nạp/rút hiển thị | GDL-080 đến GDL-086 |
| NV16 | Tạo liên kết rút gọn | GDL-100 |
| NV17 | Cập nhật liên kết | GDL-103 |
| NV18 | Tạm khóa / mở khóa liên kết | GDL-104, GDL-105, GDL-110 |
| NV19 | Danh sách liên kết và thống kê | GDL-101, GDL-102, GDL-106, GDL-107 |
| NV20 | Ghi nhận sự kiện truy cập liên kết | GDL-122, GDL-130 |
| NV21 | Phân loại lượt hợp lệ / bị loại | GDL-131, GDL-136 |
| NV22 | Tính doanh thu nhà xuất bản theo lượt hợp lệ | GDL-132 |
| NV23 | Đối soát doanh thu nhà xuất bản | GDL-184, GDL-186, GDL-188 |
| NV24 | Tạo chiến dịch | GDL-150 |
| NV25 | Cập nhật chiến dịch | GDL-153 |
| NV26 | Gửi duyệt / duyệt chiến dịch | GDL-154, GDL-162, GDL-163 |
| NV27 | Tạm dừng / tiếp tục chiến dịch | GDL-155, GDL-156, GDL-164 |
| NV28 | Hủy chiến dịch | GDL-157, GDL-164 |
| NV29 | Ghi nhận lượt cho chiến dịch | GDL-133 |
| NV30 | Trừ tiền theo lượt hợp lệ | GDL-133 |
| NV31 | Thống kê chiến dịch và chi tiêu | GDL-151, GDL-152, GDL-158, GDL-159, GDL-180 |
| NV32 | Quản lý người dùng | GDL-200 đến GDL-203 |
| NV33 | Quản lý giá theo lượt | GDL-204 đến GDL-206 |
| NV34 | Quản lý khuyến mãi nạp tiền | GDL-207 đến GDL-209 |
| NV35 | Quản lý tài khoản ngân hàng hiển thị | GDL-081 đến GDL-083 |
| NV36 | Quản lý ví USDT hiển thị | GDL-084 đến GDL-086 |
| NV37 | Quản lý thông báo hệ thống | GDL-210 đến GDL-213 |
| NV38 | Theo dõi cảnh báo gian lận | GDL-134, GDL-135, GDL-230 đến GDL-236 |
| NV39 | Nhật ký quản trị | GDL-034, GDL-035, GDL-250, GDL-251 |
| NV40 | Báo cáo đối soát tổng quan | GDL-183 đến GDL-188 |
| NV41 | Xử lý truy cập liên kết ngắn | GDL-120 |
| NV42 | Xác minh truy cập hợp lệ chống máy tự động | GDL-121 |
| NV43 | Chuyển hướng đến liên kết đích hoặc dự phòng | GDL-122 |
| NV44 | Hiển thị lỗi liên kết / trạng thái không khả dụng | GDL-120, GDL-124 |
| NV45 | Nhận báo lỗi từ người dùng cuối | GDL-123 |

---

## 16. Tiêu chí chấp nhận TL15

### 16.1 Tiêu chí về tính nhất quán

- Tất cả chức năng NV01–NV45 có ánh xạ đường dẫn hoặc ghi chú rõ phạm vi thực hiện trong phiên bản đầu.
- Không xuất hiện trạng thái nghiệp vụ trái TL02.
- Không xuất hiện vai trò trái TL03.
- Mã trạng thái và mã lỗi đều tham chiếu TL14.

### 16.2 Tiêu chí về tính triển khai được

- Có đủ đường dẫn cho:
  - nạp tiền thủ công
  - rút tiền thủ công
  - liên kết rút gọn
  - cổng chuyển hướng
  - chiến dịch theo lượt
  - đối soát
- Có quy tắc phản hồi chuẩn, phân trang, lọc, chống xử lý trùng.
- Có quy tắc bảo mật và phân quyền tối thiểu.

### 16.3 Tiêu chí về tính hỗ trợ kiểm thử

- Có mã đường dẫn duy nhất để đội kiểm thử lập bộ ca kiểm thử.
- Có ma trận truy vết NV ↔ GDL.
- Có nêu rõ các đường dẫn nhạy cảm cần kiểm thử chống xử lý trùng và phân quyền.

---

## 17. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không thêm chức năng ngoài NV01–NV45
- [x] Dùng đúng vai trò R00, R01, R10, R20, R30, R40
- [x] Dùng đúng khái niệm trạng thái chiến dịch, liên kết, hóa đơn nạp, yêu cầu rút, sự kiện lượt
- [x] Không có đường dẫn “sửa số dư trực tiếp”
- [x] Có chống xử lý trùng cho giao dịch và sự kiện
- [x] Có phân tách đường dẫn công khai, người dùng, quản trị, nội bộ
- [x] Có quy tắc song ngữ ở lớp phản hồi
- [x] Có truy vết đến TL02/TL03/TL14
- [x] Không mô tả tính năng vượt rào hoặc thao túng hệ thống tìm kiếm

---

## 18. Đầu vào cho các tài liệu tiếp theo

### 18.1 Đầu vào cho TL04, TL05, TL06, TL07 (đặc tả màn hình)

- Danh sách đường dẫn theo nhóm chức năng
- Quy tắc phân trang, lọc, sắp xếp
- Trường phản hồi cốt lõi
- Quyền theo vai trò
- Mã lỗi và trạng thái trả về cho giao diện

### 18.2 Đầu vào cho TL16 (kiến trúc kỹ thuật)

- Phân nhóm đường dẫn công khai / nội bộ / quản trị
- Nhu cầu chống xử lý trùng
- Nhu cầu xác thực dịch vụ nội bộ
- Nhu cầu xử lý bất đồng bộ và đối soát

### 18.3 Đầu vào cho TL20 (kiểm thử tích hợp và chấp nhận)

- Ma trận truy vết NV ↔ GDL
- Danh sách đường dẫn nhạy cảm
- Quy tắc phản hồi lỗi chuẩn
- Điều kiện chấp nhận cho giao dịch tài chính và tính tiền theo lượt

---

## 19. Kết luận và đề xuất tài liệu ưu tiên tiếp theo

TL15 đã khóa lớp giao diện lập trình phiên bản đầu cho toàn bộ các luồng cốt lõi của hệ thống, bám sát:

- nghiệp vụ (TL02)
- phân quyền (TL03)
- tài chính nạp/rút (TL08, TL09)
- chiến dịch và liên kết (TL10, TL11)
- chống gian lận và lượt hợp lệ (TL12)
- dữ liệu và mã chuẩn (TL13, TL14)

### Đề xuất tài liệu ưu tiên tiếp theo

**TL16 — Kiến trúc kỹ thuật tổng thể và phân rã dịch vụ**

Lý do ưu tiên:
- Sau khi đã khóa nghiệp vụ, dữ liệu và giao diện lập trình, TL16 sẽ giúp chốt cách triển khai thực tế cho dev và trợ lý lập trình.
- TL16 là nền tảng để viết tiếp tài liệu triển khai, giám sát, hiệu năng, và kế hoạch phát hành.
