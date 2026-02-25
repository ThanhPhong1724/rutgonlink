# Tài liệu 13 — Mô hình dữ liệu chi tiết cấp cột và ràng buộc dữ liệu

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL13
- **Tên tài liệu:** Mô hình dữ liệu chi tiết cấp cột và ràng buộc dữ liệu
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL07, TL14, TL15, TL16, TL18, TL19, TL20, TL21, TL24

---

## 2. Mục tiêu tài liệu

TL13 là tài liệu khóa **mô hình dữ liệu nghiệp vụ** của toàn hệ thống ở mức đủ sâu để đội phát triển và trợ lý lập trình có thể:

1. Tạo cấu trúc cơ sở dữ liệu nhất quán với TL02 đến TL12.
2. Sinh bảng, chỉ mục, khóa chính, khóa ngoài, ràng buộc duy nhất và ràng buộc kiểm tra dữ liệu.
3. Tránh mâu thuẫn giữa dữ liệu tài chính, dữ liệu chiến dịch, dữ liệu liên kết và dữ liệu chống gian lận.
4. Chuẩn bị đầu vào chắc chắn cho:
   - TL14 về mã trạng thái và mã lỗi chuẩn hóa
   - TL15 về giao diện lập trình
   - TL16 về ghi nhận sự kiện và tổng hợp thống kê
   - TL20 về an toàn kỹ thuật và vận hành
5. Giảm rủi ro “mỗi mô đun tự tạo bảng theo cách khác nhau”.

> TL13 tập trung vào mô hình dữ liệu và ràng buộc dữ liệu ở mức nghiệp vụ triển khai. Tài liệu này không thay thế tài liệu tối ưu hiệu năng chi tiết, không thay thế tài liệu sao lưu, và không đi sâu thiết kế hạ tầng.

---

## 3. Phạm vi của TL13

### 3.1 Trong phạm vi

- Quy ước đặt tên bảng và cột dùng chung.
- Chuẩn kiểu dữ liệu dùng chung cho dự án.
- Danh sách bảng dữ liệu cốt lõi theo nhóm chức năng.
- Đặc tả cấp cột cho các bảng quan trọng.
- Khóa chính, khóa ngoài, ràng buộc duy nhất, ràng buộc kiểm tra.
- Ràng buộc trạng thái bám TL02.
- Ràng buộc dữ liệu tài chính bám TL08 và TL09.
- Ràng buộc dữ liệu chiến dịch bám TL10.
- Ràng buộc dữ liệu liên kết và doanh thu bám TL11.
- Ràng buộc dữ liệu sự kiện lượt và chống gian lận bám TL12.
- Chỉ mục tối thiểu cho các truy vấn lõi.
- Quy tắc lưu lịch sử, xóa mềm, lưu dấu vết thay đổi.
- Dữ liệu khởi tạo tối thiểu cho môi trường triển khai đầu.

### 3.2 Ngoài phạm vi

- Mã trạng thái chi tiết và mã lỗi chuẩn hóa dạng mã hiển thị cho giao diện lập trình và giao diện người dùng, thuộc TL14.
- Đặc tả từng đường dẫn giao diện lập trình, thuộc TL15.
- Thiết kế chi tiết luồng hàng đợi và lịch xử lý nền, thuộc TL16.
- Tối ưu chuyên sâu theo tải thực tế như phân vùng bảng nâng cao, chỉ mục đặc thù theo số đo thật, thuộc TL20 và tài liệu vận hành.
- Mô hình học máy hoặc thuật toán chấm điểm rủi ro chi tiết, thuộc phạm vi sau.
- Hướng dẫn thao túng nền tảng bên thứ ba.

---

## 4. Truy vết sang tài liệu trước để đảm bảo nhất quán

## 4.1 Truy vết sang TL02

TL13 cụ thể hóa dữ liệu cho các nhóm chức năng và trạng thái đã khóa trong TL02:

- Nhóm tài khoản và hồ sơ
- Nhóm ví, số dư, sổ cái giao dịch
- Nhóm nạp tiền thủ công
- Nhóm rút tiền thủ công
- Nhóm liên kết rút gọn và nhà xuất bản
- Nhóm chiến dịch tính theo lượt
- Khối chuyển hướng trung gian
- Khối quản trị, cấu hình hệ thống
- Trạng thái hóa đơn nạp, yêu cầu rút, liên kết, chiến dịch, sự kiện lượt

## 4.2 Truy vết sang TL03

TL13 phải hỗ trợ phân quyền theo vai trò và phạm vi dữ liệu đã khóa trong TL03:

- R00, R01, R10, R20, R30, R40
- Phân biệt dữ liệu sở hữu cá nhân và dữ liệu toàn hệ thống
- Che dữ liệu nhạy cảm cho R40
- Nhật ký thao tác quản trị nhạy cảm
- Truy vết người tạo, người cập nhật, người duyệt

## 4.3 Truy vết sang TL08 và TL09

TL13 phải hỗ trợ:

- Hóa đơn nạp tiền thủ công và chứng từ nạp
- Yêu cầu rút tiền thủ công và chứng từ xử lý rút
- Sổ cái giao dịch không sửa tay
- Khóa tạm số dư khi rút tiền
- Chống cộng tiền trùng và chống xử lý rút trùng
- Bút toán bù thay cho sửa trực tiếp số dư

## 4.4 Truy vết sang TL10

TL13 phải hỗ trợ:

- Vòng đời chiến dịch 10 trạng thái
- Phiên bản cấu hình chiến dịch
- Ghi nhận sự kiện lượt gắn chiến dịch
- Trừ tiền theo lượt hợp lệ
- Phân biệt chi tiêu tạm thời và chi tiêu đã chốt
- Tránh trừ trùng theo sự kiện

## 4.5 Truy vết sang TL11

TL13 phải hỗ trợ:

- Liên kết rút gọn và trạng thái liên kết
- Ghi nhận truy cập liên kết ngắn
- Sự kiện lượt gắn liên kết
- Doanh thu nhà xuất bản theo lượt hợp lệ
- Đối soát doanh thu theo kỳ
- Kết chuyển vào ví nhà xuất bản không trùng

## 4.6 Truy vết sang TL12

TL13 phải hỗ trợ:

- Bảy trạng thái sự kiện lượt dùng chung
- Lý do loại lượt, lý do kiểm tra thủ công
- Hàng kiểm tra thủ công và quyết định xử lý
- Dấu vết thiết bị, chấm điểm rủi ro, danh sách chặn
- Nhật ký và truy vết quyết định gian lận

---

## 5. Giả định công nghệ và phạm vi triển khai dữ liệu

### 5.1 Giả định công nghệ dữ liệu của phiên bản hiện tại

Tài liệu TL13 được viết theo giả định triển khai chính:

- **Cơ sở dữ liệu nghiệp vụ chính:** PostgreSQL
- **Bộ nhớ đệm và giới hạn tần suất nhanh:** Redis
- **Lưu tệp chứng từ, ảnh mã thanh toán, tệp hỗ trợ:** kho tệp tương thích S3 hoặc tương đương

Nếu dự án đổi sang hệ quản trị khác, phần quy tắc nghiệp vụ và cấu trúc logic vẫn giữ nguyên; chỉ cần ánh xạ lại kiểu dữ liệu và cú pháp ràng buộc.

### 5.2 Nguyên tắc phân vai dữ liệu giữa PostgreSQL và Redis

- PostgreSQL là nguồn dữ liệu chuẩn cho:
  - tài khoản
  - ví và sổ cái
  - chiến dịch
  - liên kết
  - doanh thu
  - rút và nạp tiền
  - sự kiện lượt đã ghi nhận chính thức
  - nhật ký quản trị
- Redis dùng cho dữ liệu ngắn hạn:
  - khóa giới hạn tần suất
  - chống xử lý trùng trong thời gian ngắn
  - hàng đợi tạm
  - dữ liệu phiên có thời hạn
- Không lưu dữ liệu tài chính cuối cùng chỉ ở Redis.

---

## 6. Nguyên tắc mô hình dữ liệu áp dụng thống nhất

### 6.1 Nguyên tắc đặt tên

1. **Tên bảng và cột dùng chữ thường, gạch dưới**
   - Ví dụ: `nguoi_dung`, `hoa_don_nap`, `trang_thai`, `thoi_diem_tao`

2. **Tên bảng là danh từ số ít theo thực thể**
   - Ví dụ: `chien_dich`, `lien_ket_rut_gon`
   - Bảng dòng chi tiết có thể dùng hậu tố mô tả như `dong_doi_soat_nha_xuat_ban`

3. **Mã khóa ngoài đặt theo mẫu `ma_...`**
   - Ví dụ: `ma_nguoi_dung`, `ma_vi`, `ma_chien_dich`

4. **Cột thời gian chuẩn hóa**
   - `thoi_diem_tao`
   - `thoi_diem_cap_nhat`
   - `thoi_diem_xoa_mem` nếu có
   - `thoi_diem_duyet`, `thoi_diem_hoan_thanh` cho quy trình riêng

### 6.2 Nguyên tắc khóa chính

- Mỗi bảng nghiệp vụ có khóa chính nội bộ `ma` kiểu số nguyên lớn tăng dần.
- Thực thể cần chia sẻ ra ngoài giao diện lập trình có thêm `ma_cong_khai` dạng chuỗi duy nhất.
- Không dùng chuỗi ngẫu nhiên làm khóa chính nội bộ.

### 6.3 Nguyên tắc không sửa lịch sử tài chính

- Không sửa trực tiếp số dư để “sửa cho đúng”.
- Mọi điều chỉnh dùng bút toán sổ cái mới.
- Bảng sổ cái là nguồn truy vết chính cho biến động tiền.

### 6.4 Nguyên tắc chụp nhanh cấu hình tại thời điểm phát sinh

Để tránh dữ liệu quá khứ thay đổi theo cấu hình hiện tại, các bảng giao dịch và sự kiện cần lưu chụp nhanh các trường quan trọng:

- đơn giá tại thời điểm áp dụng
- đơn vị tiền
- cấu hình thanh toán hiển thị cho hóa đơn nạp
- thông tin nhận tiền đã chụp khi yêu cầu rút
- phiên bản cấu hình chiến dịch
- quy tắc tính doanh thu hiệu lực

### 6.5 Nguyên tắc trạng thái

- Cột `trang_thai` lưu đúng **tên trạng thái nghiệp vụ** đã khóa ở TL02.
- Không đổi tên trạng thái trong TL13.
- Mã hóa trạng thái dạng mã kỹ thuật sẽ chuẩn hóa ở TL14.
- Các bảng quan trọng có cột `ly_do_trang_thai` hoặc `ghi_chu_xu_ly` khi cần giải thích chuyển trạng thái.

### 6.6 Nguyên tắc xóa mềm

- Bảng tài chính, sổ cái, sự kiện, doanh thu, đối soát, nhật ký quản trị: **không xóa mềm, không xóa cứng trong vận hành thường**.
- Bảng cấu hình và nội dung có thể dùng xóa mềm:
  - `thoi_diem_xoa_mem`
  - `ma_nguoi_dung_xoa`
- Bảng liên kết và chiến dịch ưu tiên dùng trạng thái thay vì xóa.

### 6.7 Nguyên tắc chống xử lý trùng

Các quy trình có rủi ro xử lý trùng phải có khóa duy nhất nghiệp vụ:

- nạp tiền thành công theo hóa đơn
- rút tiền ghi nhận bút toán theo yêu cầu rút
- ghi nhận chi tiêu chiến dịch theo sự kiện lượt
- ghi nhận doanh thu nhà xuất bản theo sự kiện lượt
- kết chuyển đối soát theo kỳ và lô đối soát

### 6.8 Nguyên tắc truy vết người thao tác

Các bảng có xử lý duyệt hoặc thao tác nhạy cảm cần có:

- `ma_nguoi_dung_tao`
- `ma_nguoi_dung_cap_nhat` nếu phù hợp
- `ma_quan_tri_duyet` hoặc `ma_quan_tri_xu_ly`
- `ly_do_xu_ly` hoặc `ghi_chu_xu_ly`

---

## 7. Chuẩn kiểu dữ liệu dùng chung

Bảng dưới đây là chuẩn logic. Khi triển khai trên PostgreSQL, đội phát triển ánh xạ sang kiểu cụ thể phù hợp.

| Nhóm kiểu | Tên dùng trong TL13 | Gợi ý triển khai | Ghi chú |
|---|---|---|---|
| Khóa chính nội bộ | số nguyên lớn | số nguyên lớn tự tăng | Dùng cho cột `ma` |
| Mã công khai | chuỗi ngắn duy nhất | chuỗi độ dài 20 đến 40 | Không đoán tuần tự |
| Chuỗi ngắn | chuỗi ngắn | chuỗi độ dài 50 đến 255 | Tên, trạng thái, mã tham chiếu |
| Chuỗi trung bình | chuỗi vừa | chuỗi độ dài 500 đến 2000 | Liên kết, mô tả ngắn |
| Văn bản dài | văn bản dài | văn bản | Ghi chú, lý do, nội dung |
| Số tiền | số thập phân tiền | số thập phân chính xác | Không dùng số thực thường |
| Tỷ lệ | số thập phân tỷ lệ | số thập phân chính xác | Ví dụ tỷ lệ khuyến mãi |
| Đếm số lượng | số nguyên | số nguyên | Lượt, số lần |
| Thời gian | thời gian chuẩn | thời gian kèm múi giờ | Lưu chuẩn, hiển thị theo người dùng |
| Ngày | ngày | kiểu ngày | Đối soát, thống kê ngày |
| Cờ bật tắt | đúng sai | giá trị logic | `dung` hoặc `sai` |
| Dữ liệu cấu trúc | văn bản cấu trúc | kiểu cấu trúc hoặc văn bản | Cho cấu hình linh hoạt |
| Dấu vết băm | chuỗi băm | chuỗi cố định | Không lưu thô địa chỉ nhạy cảm nếu không cần |

### 7.1 Chuẩn tiền tệ

- Mọi cột tiền phải có cột đi kèm `don_vi_tien`.
- Mọi phép tính tiền phải theo số thập phân chính xác.
- Nếu có quy đổi:
  - lưu `ty_gia_tham_chieu`
  - lưu `thoi_diem_chot_ty_gia`

### 7.2 Chuẩn thời gian

- Lưu thời gian theo chuẩn thống nhất.
- Hiển thị theo múi giờ người dùng.
- Bảng tổng hợp theo ngày cần cột ngày chốt rõ ràng theo múi giờ hệ thống hoặc theo cấu hình.

---

## 8. Từ điển cột dùng chung áp dụng cho nhiều bảng

### 8.1 Cột nhận diện và truy vết

| Cột | Ý nghĩa | Ghi chú |
|---|---|---|
| `ma` | khóa chính nội bộ | Bắt buộc ở gần như mọi bảng |
| `ma_cong_khai` | mã hiển thị ngoài hệ thống | Dùng cho giao diện lập trình và giao diện người dùng |
| `ma_nguoi_dung_tao` | người tạo bản ghi | Khóa ngoài đến `nguoi_dung` |
| `ma_nguoi_dung_cap_nhat` | người cập nhật gần nhất | Khóa ngoài, có thể rỗng |
| `ma_quan_tri_duyet` | quản trị viên duyệt | Chỉ dùng cho bảng cần duyệt |
| `ma_quan_tri_xu_ly` | quản trị viên xử lý | Dùng khi không phải duyệt chính thức |

### 8.2 Cột thời gian chuẩn

| Cột | Ý nghĩa |
|---|---|
| `thoi_diem_tao` | thời điểm tạo bản ghi |
| `thoi_diem_cap_nhat` | thời điểm cập nhật gần nhất |
| `thoi_diem_xoa_mem` | thời điểm xóa mềm |
| `thoi_diem_duyet` | thời điểm duyệt |
| `thoi_diem_hoan_thanh` | thời điểm hoàn tất quy trình |
| `thoi_diem_het_han` | thời điểm hết hạn |
| `thoi_diem_khoa_so` | thời điểm chốt kỳ hoặc khóa sổ |

### 8.3 Cột trạng thái và giải thích

| Cột | Ý nghĩa |
|---|---|
| `trang_thai` | trạng thái nghiệp vụ hiện tại |
| `ly_do_trang_thai` | giải thích ngắn khi cần |
| `ghi_chu_xu_ly` | ghi chú xử lý chi tiết hơn |
| `nguon_thay_doi_trang_thai` | người dùng, quản trị, hệ thống, đối soát |

---

## 9. Bức tranh tổng thể nhóm bảng dữ liệu

TL13 chia dữ liệu thành các nhóm chính:

1. **Nhóm tài khoản và phân quyền**
2. **Nhóm tài chính, ví và sổ cái**
3. **Nhóm nạp tiền thủ công**
4. **Nhóm rút tiền thủ công**
5. **Nhóm liên kết rút gọn và nhà xuất bản**
6. **Nhóm chiến dịch khách hàng mua**
7. **Nhóm sự kiện lượt dùng chung**
8. **Nhóm chống gian lận**
9. **Nhóm báo cáo tổng hợp**
10. **Nhóm cấu hình hệ thống và thanh toán**
11. **Nhóm nhật ký quản trị, thông báo, hỗ trợ**

> TL13 ưu tiên mô tả rất sâu cho các bảng lõi liên quan đến tiền, lượt, chiến dịch, liên kết, doanh thu và chống gian lận.

---

# 10. Nhóm tài khoản và phân quyền

## 10.1 Bảng `nguoi_dung`

### Mục đích
Lưu tài khoản người dùng cho R10, R20, R30, R40. R00 và R01 không có bản ghi tài khoản bắt buộc.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính | Mã nội bộ |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất | Mã dùng ngoài hệ thống |
| `loai_tai_khoan_mac_dinh` | chuỗi ngắn | Có | thuộc tập vai trò người dùng | Loại chính khi đăng ký |
| `thu_dien_tu` | chuỗi ngắn | Có | duy nhất theo chuẩn chuẩn hóa chữ thường | Tên đăng nhập chính |
| `thu_dien_tu_da_xac_minh` | đúng sai | Có | mặc định sai | Trạng thái xác minh thư |
| `mat_khau_bam` | chuỗi vừa | Có | không lưu thô | Mật khẩu đã băm |
| `ten_hien_thi` | chuỗi ngắn | Có | không rỗng | Tên hiển thị |
| `so_dien_thoai` | chuỗi ngắn | Không | chuẩn hóa | Có thể rỗng |
| `ngon_ngu_mac_dinh` | chuỗi ngắn | Có | `vi` hoặc `en` | Song ngữ hệ thống |
| `mui_gio_mac_dinh` | chuỗi ngắn | Có | không rỗng | Múi giờ hiển thị |
| `trang_thai` | chuỗi ngắn | Có | theo TL02 mục 13.1 | hoạt động, tạm khóa... |
| `thoi_diem_dang_nhap_cuoi` | thời gian chuẩn | Không |  | Theo dõi bảo mật |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |
| `thoi_diem_xoa_mem` | thời gian chuẩn | Không |  | Chỉ dùng khi cần vô hiệu mềm |
| `ma_nguoi_dung_tao` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` | Tạo bởi R30 nếu tạo tay |
| `ma_nguoi_dung_cap_nhat` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |

### Chỉ mục và ràng buộc chính
- Chỉ mục duy nhất `thu_dien_tu`.
- Chỉ mục `trang_thai`.
- Chỉ mục `loai_tai_khoan_mac_dinh`.
- Ràng buộc kiểm tra `ngon_ngu_mac_dinh` thuộc tập cho phép.
- Ràng buộc kiểm tra `thu_dien_tu` không chứa khoảng trắng đầu cuối.

---

## 10.2 Bảng `vai_tro`

### Mục đích
Danh mục vai trò chuẩn hóa để bám TL03.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_vai_tro` | chuỗi ngắn | Có | duy nhất | `R10`, `R20`, `R30`, `R40`... |
| `ten_vai_tro` | chuỗi ngắn | Có | duy nhất | Tên hiển thị |
| `mo_ta` | văn bản dài | Không |  |  |
| `la_vai_tro_he_thong` | đúng sai | Có | mặc định đúng | Vai trò chuẩn của nền tảng |
| `dang_hoat_dong` | đúng sai | Có | mặc định đúng |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |

### Dữ liệu khởi tạo bắt buộc
- R00
- R01
- R10
- R20
- R30
- R40

---

## 10.3 Bảng `gan_vai_tro_nguoi_dung`

### Mục đích
Gán nhiều vai trò cho một tài khoản khi cần.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` |  |
| `ma_vai_tro` | số nguyên lớn | Có | khóa ngoài `vai_tro.ma` |  |
| `trang_thai` | chuỗi ngắn | Có | hoạt động hoặc tạm dừng | Trạng thái gán vai trò |
| `thoi_diem_hieu_luc_tu` | thời gian chuẩn | Có |  |  |
| `thoi_diem_hieu_luc_den` | thời gian chuẩn | Không |  |  |
| `ma_nguoi_dung_tao` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Ai gán vai trò |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |

### Ràng buộc
- Duy nhất theo cặp `ma_nguoi_dung`, `ma_vai_tro`, `thoi_diem_hieu_luc_tu`.
- Chỉ mục theo `ma_nguoi_dung`.
- Chỉ mục theo `ma_vai_tro`, `trang_thai`.

---

## 10.4 Bảng `phien_dang_nhap`

### Mục đích
Quản lý phiên đăng nhập để hỗ trợ bảo mật, đăng xuất và làm mới phiên.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất | Mã phiên công khai |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` |  |
| `ma_phien_lam_moi_bam` | chuỗi vừa | Có | duy nhất | Không lưu thô |
| `dau_vet_thiet_bi_tom_tat` | chuỗi vừa | Không |  | Thông tin rút gọn |
| `dia_chi_mang_bam` | chuỗi băm | Không |  | Không lưu thô nếu không cần |
| `trang_thai` | chuỗi ngắn | Có | hoạt động, thu hồi, hết hạn |  |
| `thoi_diem_het_han` | thời gian chuẩn | Có |  |  |
| `thoi_diem_dang_nhap` | thời gian chuẩn | Có |  |  |
| `thoi_diem_dang_xuat` | thời gian chuẩn | Không |  |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |

### Chỉ mục
- `ma_nguoi_dung`, `trang_thai`
- `thoi_diem_het_han`

---

## 10.5 Bảng `nhat_ky_dang_nhap`

### Mục đích
Lưu sự kiện đăng nhập thành công và thất bại phục vụ hỗ trợ và an toàn.

### Cột chính
- `ma`
- `ma_nguoi_dung` có thể rỗng nếu không tìm thấy tài khoản
- `thu_dien_tu_thu`
- `ket_qua`
- `ly_do_that_bai`
- `dia_chi_mang_bam`
- `dau_vet_thiet_bi_tom_tat`
- `nguon` như giao diện người dùng hoặc giao diện lập trình
- `thoi_diem_tao`

### Ràng buộc chính
- Chỉ mục `thu_dien_tu_thu`, `thoi_diem_tao`
- Chỉ mục `ma_nguoi_dung`, `thoi_diem_tao`

---

## 10.6 Bảng `yeu_cau_dat_lai_mat_khau`

### Mục đích
Lưu yêu cầu đặt lại mật khẩu theo mã một lần dùng.

### Cột chính
- `ma`
- `ma_nguoi_dung`
- `ma_yeu_cau_cong_khai`
- `ma_xac_nhan_bam`
- `trang_thai` gồm mới tạo, đã dùng, hết hạn, hủy
- `thoi_diem_het_han`
- `thoi_diem_su_dung`
- `thoi_diem_tao`

### Ràng buộc
- Duy nhất `ma_xac_nhan_bam`
- Chỉ mục `ma_nguoi_dung`, `trang_thai`

---

## 10.7 Bảng `ho_so_nhan_tien`

### Mục đích
Lưu thông tin nhận tiền của nhà xuất bản dùng cho quy trình rút tiền TL09.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất |  |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Chủ sở hữu, thường là R20 |
| `loai_phuong_thuc` | chuỗi ngắn | Có | ngân_hang_vn hoặc usdt |  |
| `ten_hien_thi` | chuỗi ngắn | Có |  | Tên gợi nhớ của người dùng |
| `ten_ngan_hang` | chuỗi ngắn | Không | bắt buộc nếu là ngân_hang_vn |  |
| `so_tai_khoan` | chuỗi ngắn | Không | bắt buộc nếu là ngân_hang_vn | Dữ liệu nhạy cảm |
| `chu_tai_khoan` | chuỗi ngắn | Không | bắt buộc nếu là ngân_hang_vn |  |
| `dia_chi_vi` | chuỗi vừa | Không | bắt buộc nếu là usdt | Dữ liệu nhạy cảm |
| `mang_chuoi_khoi` | chuỗi ngắn | Không | bắt buộc nếu là usdt |  |
| `trang_thai_xac_minh` | chuỗi ngắn | Có | chưa_xac_minh, đã_xac_minh, tạm_khóa |  |
| `la_mac_dinh` | đúng sai | Có | mặc định sai | Hồ sơ mặc định |
| `ghi_chu_noi_bo` | văn bản dài | Không | chỉ R30, R40 |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |
| `ma_nguoi_dung_tao` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` |  |
| `ma_nguoi_dung_cap_nhat` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |

### Ràng buộc và chỉ mục
- Chỉ mục `ma_nguoi_dung`, `la_mac_dinh`
- Chỉ mục `ma_nguoi_dung`, `loai_phuong_thuc`
- Ràng buộc duy nhất có điều kiện: mỗi người dùng chỉ một hồ sơ mặc định đang hoạt động cho mỗi loại phương thức
- Dữ liệu nhạy cảm phải được che khi truy vấn cho R40 theo TL03

---

# 11. Nhóm ví, số dư và sổ cái

## 11.1 Bảng `vi_nguoi_dung`

### Mục đích
Lưu số dư khả dụng và số dư khóa tạm cho từng người dùng và từng loại ví.

### Ghi chú thiết kế quan trọng
- Có thể dùng một ví cho mỗi người dùng mỗi đơn vị tiền trong phiên bản đầu.
- Tách `so_du_kha_dung` và `so_du_khoa_tam` để hỗ trợ TL09.
- Số dư là giá trị tổng hợp; nguồn chuẩn để truy vết biến động vẫn là `so_cai_giao_dich`.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất |  |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` |  |
| `loai_vi` | chuỗi ngắn | Có | `vi_chi_tieu`, `vi_doanh_thu` | Khớp vai trò sử dụng |
| `don_vi_tien` | chuỗi ngắn | Có | không rỗng | Ví dụ VND, USDT |
| `so_du_kha_dung` | số thập phân tiền | Có | không âm |  |
| `so_du_khoa_tam` | số thập phân tiền | Có | không âm |  |
| `trang_thai` | chuỗi ngắn | Có | hoạt động, tạm_khóa |  |
| `thoi_diem_cap_nhat_so_du` | thời gian chuẩn | Có |  |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |

### Ràng buộc bắt buộc
- Duy nhất theo `ma_nguoi_dung`, `loai_vi`, `don_vi_tien`.
- Kiểm tra `so_du_kha_dung >= 0`.
- Kiểm tra `so_du_khoa_tam >= 0`.
- Chỉ mục `ma_nguoi_dung`.
- Chỉ mục `trang_thai`.

---

## 11.2 Bảng `so_cai_giao_dich`

### Mục đích
Sổ cái ghi tất cả biến động số dư. Đây là bảng cốt lõi cho TL08, TL09, TL10, TL11.

### Nguyên tắc bắt buộc
- Không cập nhật sửa tiền sau khi bút toán thành công, chỉ cho phép thêm bút toán mới.
- Có khóa duy nhất nghiệp vụ để chống ghi trùng theo tham chiếu.
- Có liên kết tới ví và nguồn phát sinh.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất | Mã giao dịch công khai |
| `ma_vi` | số nguyên lớn | Có | khóa ngoài `vi_nguoi_dung.ma` | Ví bị ảnh hưởng |
| `loai_giao_dich` | chuỗi ngắn | Có | theo danh mục chuẩn | nạp, khóa tạm, mở khóa, chi tiêu... |
| `huong_bien_dong` | chuỗi ngắn | Có | tang hoặc giam | Hướng biến động số dư mục tiêu |
| `loai_so_du_tac_dong` | chuỗi ngắn | Có | kha_dung hoặc khoa_tam | Tác động cột nào |
| `so_tien` | số thập phân tiền | Có | dương | Giá trị tuyệt đối |
| `don_vi_tien` | chuỗi ngắn | Có | khớp ví |  |
| `so_du_kha_dung_truoc` | số thập phân tiền | Có | không âm |  |
| `so_du_kha_dung_sau` | số thập phân tiền | Có | không âm |  |
| `so_du_khoa_tam_truoc` | số thập phân tiền | Có | không âm |  |
| `so_du_khoa_tam_sau` | số thập phân tiền | Có | không âm |  |
| `nguon_phat_sinh` | chuỗi ngắn | Có | hoa_don_nap, yeu_cau_rut, chien_dich, doi_soat_nxb, dieu_chinh... |  |
| `ma_tham_chieu_nguon` | số nguyên lớn | Có |  | Mã nội bộ nguồn |
| `ma_tham_chieu_phu` | số nguyên lớn | Không |  | Ví dụ mã sự kiện lượt |
| `ma_khoa_chong_trung` | chuỗi vừa | Có | duy nhất | Khóa nghiệp vụ chống ghi trùng |
| `trang_thai` | chuỗi ngắn | Có | thanh_cong, da_huy, that_bai_ghi_so | Bảng sổ cái chủ yếu lưu thành công |
| `mo_ta_hien_thi` | chuỗi vừa | Không |  | Dùng hiển thị lịch sử |
| `ghi_chu_noi_bo` | văn bản dài | Không |  |  |
| `thoi_diem_phat_sinh_nghiep_vu` | thời gian chuẩn | Có |  | Thời điểm nghiệp vụ |
| `thoi_diem_ghi_so` | thời gian chuẩn | Có |  | Thời điểm chèn bút toán |
| `ma_nguoi_dung_tao` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` | R30 hoặc hệ thống |
| `nguon_tao` | chuỗi ngắn | Có | he_thong hoặc quan_tri |  |

### Ràng buộc kiểm tra dữ liệu
- `so_tien > 0`
- `don_vi_tien` khớp `vi_nguoi_dung.don_vi_tien`
- `so_du_*_sau >= 0`
- Ràng buộc tính nhất quán hướng biến động và số dư trước sau cần kiểm tra ở lớp dịch vụ và có thể bổ sung bằng ràng buộc hoặc thủ tục ghi sổ.

### Chỉ mục bắt buộc
- `ma_vi`, `thoi_diem_ghi_so`
- `nguon_phat_sinh`, `ma_tham_chieu_nguon`
- `ma_tham_chieu_phu`
- `trang_thai`
- `ma_khoa_chong_trung` duy nhất

### Danh mục `loai_giao_dich` tối thiểu phiên bản đầu
- `nap_tien_thanh_cong`
- `nap_tien_dieu_chinh_bu`
- `rut_tien_khoa_tam`
- `rut_tien_mo_khoa_hoan_tra`
- `rut_tien_chot_chi`
- `chi_tieu_chien_dich_tam_thoi`
- `chi_tieu_chien_dich_dieu_chinh_bu`
- `doanh_thu_nha_xuat_ban_ket_chuyen`
- `doanh_thu_nha_xuat_ban_dieu_chinh_bu`

> Mã chuẩn cho danh mục này sẽ được chuẩn hóa tiếp ở TL14.

---

# 12. Nhóm nạp tiền thủ công

## 12.1 Bảng `hoa_don_nap`

### Mục đích
Lưu hóa đơn nạp tiền thủ công cho R10 và có thể mở rộng cho R20.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất | Mã hóa đơn hiển thị |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Người nạp |
| `loai_vi_dich` | chuỗi ngắn | Có | `vi_chi_tieu` | Ví được cộng |
| `so_tien_yeu_cau` | số thập phân tiền | Có | lớn hơn 0 | Số tiền người dùng muốn nạp |
| `so_tien_duyet` | số thập phân tiền | Không | lớn hơn hoặc bằng 0 | Số tiền thực duyệt |
| `don_vi_tien` | chuỗi ngắn | Có | không rỗng |  |
| `phuong_thuc_nap` | chuỗi ngắn | Có | `chuyen_khoan_ngan_hang_vn` hoặc `usdt_thu_cong` |  |
| `trang_thai` | chuỗi ngắn | Có | theo TL02 mục 13.2 |  |
| `noi_dung_tham_chieu` | chuỗi ngắn | Có | duy nhất theo hóa đơn đang hiệu lực | Nội dung chuyển khoản |
| `thoi_diem_het_han` | thời gian chuẩn | Có |  |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_gui_chung_tu` | thời gian chuẩn | Không |  |  |
| `thoi_diem_duyet` | thời gian chuẩn | Không |  |  |
| `ma_quan_tri_duyet` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` | R30 duyệt |
| `ly_do_tu_choi` | văn bản dài | Không | bắt buộc khi từ chối |  |
| `ghi_chu_xu_ly` | văn bản dài | Không |  |  |
| `ma_cau_hinh_thanh_toan_chup` | số nguyên lớn | Không | tham chiếu cấu hình ngân hàng hoặc ví | Chụp cấu hình hiển thị |
| `du_lieu_cau_hinh_chup` | văn bản cấu trúc | Có | không rỗng | Chụp nhanh thông tin hiển thị tại thời điểm tạo |
| `ma_but_toan_nap_thanh_cong` | số nguyên lớn | Không | khóa ngoài `so_cai_giao_dich.ma` | Ghi một bút toán thành công duy nhất |
| `nguon_tao` | chuỗi ngắn | Có | giao_dien_nguoi_dung hoặc quan_tri |  |

### Ràng buộc bắt buộc
- Duy nhất `ma_cong_khai`
- Duy nhất `noi_dung_tham_chieu` trong khoảng hóa đơn chưa kết thúc theo chính sách vận hành
- Chỉ một bút toán nạp thành công cho mỗi hóa đơn:
  - `ma_but_toan_nap_thanh_cong` duy nhất không rỗng
- Kiểm tra `so_tien_yeu_cau > 0`
- Kiểm tra `so_tien_duyet >= 0` nếu có

### Chỉ mục bắt buộc
- `ma_nguoi_dung`, `thoi_diem_tao`
- `trang_thai`
- `noi_dung_tham_chieu`
- `ma_quan_tri_duyet`, `thoi_diem_duyet`

---

## 12.2 Bảng `chung_tu_nap`

### Mục đích
Lưu thông tin tệp chứng từ nạp gắn với `hoa_don_nap`.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_hoa_don_nap` | số nguyên lớn | Có | khóa ngoài `hoa_don_nap.ma` |  |
| `ma_tep` | số nguyên lớn | Có | khóa ngoài `tep_luu_tru.ma` | Tệp vật lý |
| `loai_chung_tu` | chuỗi ngắn | Có | anh_chuyen_khoan, anh_giao_dich_chuoi_khoi... |  |
| `trang_thai` | chuỗi ngắn | Có | hop_le, khong_hop_le, cho_xac_minh |  |
| `ghi_chu` | văn bản dài | Không |  |  |
| `ma_nguoi_dung_tai_len` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Thường là R10 |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |

### Ràng buộc
- Chỉ mục `ma_hoa_don_nap`
- Chỉ mục `thoi_diem_tao`
- Không xóa cứng khi hóa đơn đã kết thúc

---

## 12.3 Bảng `nhat_ky_xu_ly_hoa_don_nap`

### Mục đích
Lưu lịch sử chuyển trạng thái và xử lý từng bước của hóa đơn nạp.

### Cột chính
- `ma`
- `ma_hoa_don_nap`
- `trang_thai_cu`
- `trang_thai_moi`
- `hanh_dong`
- `ly_do`
- `ghi_chu`
- `nguon_tao` gồm người dùng, quản trị, hệ thống
- `ma_nguoi_dung_thuc_hien` có thể rỗng nếu hệ thống
- `thoi_diem_tao`

### Ràng buộc
- Chỉ mục `ma_hoa_don_nap`, `thoi_diem_tao`
- Chỉ mục `ma_nguoi_dung_thuc_hien`, `thoi_diem_tao`

---

# 13. Nhóm rút tiền thủ công

## 13.1 Bảng `yeu_cau_rut`

### Mục đích
Lưu yêu cầu rút tiền của nhà xuất bản theo TL09.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất |  |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Người yêu cầu, thường là R20 |
| `ma_vi_nguon` | số nguyên lớn | Có | khóa ngoài `vi_nguoi_dung.ma` | Ví doanh thu |
| `so_tien_yeu_cau` | số thập phân tiền | Có | lớn hơn 0 |  |
| `so_tien_duyet` | số thập phân tiền | Không | lớn hơn hoặc bằng 0 | Có thể khác nếu xử lý ngoại lệ |
| `don_vi_tien` | chuỗi ngắn | Có | khớp ví nguồn |  |
| `phuong_thuc_rut` | chuỗi ngắn | Có | `ngan_hang_vn` hoặc `usdt` |  |
| `ma_ho_so_nhan_tien` | số nguyên lớn | Có | khóa ngoài `ho_so_nhan_tien.ma` | Hồ sơ được chọn |
| `du_lieu_nhan_tien_chup` | văn bản cấu trúc | Có | không rỗng | Chụp nhanh để tránh thay đổi về sau |
| `trang_thai` | chuỗi ngắn | Có | theo TL02 mục 13.3 |  |
| `ly_do_tu_choi` | văn bản dài | Không | bắt buộc khi từ chối |  |
| `ghi_chu_xu_ly` | văn bản dài | Không |  |  |
| `ma_but_toan_khoa_tam` | số nguyên lớn | Không | khóa ngoài `so_cai_giao_dich.ma` | Bút toán khóa tạm |
| `ma_but_toan_mo_khoa_hoan_tra` | số nguyên lớn | Không | khóa ngoài `so_cai_giao_dich.ma` | Nếu từ chối |
| `ma_but_toan_chot_chi` | số nguyên lớn | Không | khóa ngoài `so_cai_giao_dich.ma` | Khi hoàn thành chi |
| `ma_quan_tri_duyet` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_duyet` | thời gian chuẩn | Không |  |  |
| `thoi_diem_gui_tien` | thời gian chuẩn | Không |  |  |
| `thoi_diem_hoan_thanh` | thời gian chuẩn | Không |  |  |

### Ràng buộc bắt buộc
- Kiểm tra `so_tien_yeu_cau > 0`
- Nếu có `ma_but_toan_khoa_tam` thì không được gắn lại cho yêu cầu khác
- Chỉ một bút toán chốt chi cho một yêu cầu rút
- Chỉ mục `ma_nguoi_dung`, `thoi_diem_tao`
- Chỉ mục `trang_thai`
- Chỉ mục `ma_quan_tri_duyet`, `thoi_diem_duyet`

### Ghi chú nghiệp vụ
- `ma_but_toan_khoa_tam` được tạo sớm theo TL09.
- `ma_but_toan_mo_khoa_hoan_tra` dùng khi từ chối hoặc hoàn tiền.
- `ma_but_toan_chot_chi` dùng khi hoàn thành chi trả.

---

## 13.2 Bảng `chung_tu_xu_ly_rut`

### Mục đích
Lưu bằng chứng xử lý rút tiền do R30 tải lên hoặc đính kèm.

### Cột chính
- `ma`
- `ma_yeu_cau_rut`
- `ma_tep`
- `loai_chung_tu` như ảnh_chuyen_khoan, biên_nhận, ảnh_giao_dich_chuoi_khoi
- `ghi_chu`
- `ma_quan_tri_tai_len`
- `thoi_diem_tao`

### Ràng buộc
- Chỉ mục `ma_yeu_cau_rut`
- Chỉ mục `thoi_diem_tao`

---

## 13.3 Bảng `nhat_ky_xu_ly_yeu_cau_rut`

### Mục đích
Lưu lịch sử chuyển trạng thái của yêu cầu rút và các hành động xử lý.

### Cột chính
- `ma`
- `ma_yeu_cau_rut`
- `trang_thai_cu`
- `trang_thai_moi`
- `hanh_dong`
- `ly_do`
- `ghi_chu`
- `nguon_tao`
- `ma_nguoi_dung_thuc_hien`
- `thoi_diem_tao`

### Ràng buộc
- Chỉ mục `ma_yeu_cau_rut`, `thoi_diem_tao`

---

# 14. Nhóm liên kết rút gọn và nhà xuất bản

## 14.1 Bảng `lien_ket_rut_gon`

### Mục đích
Lưu liên kết rút gọn, trạng thái và cấu hình cơ bản của nhà xuất bản.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất |  |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Chủ liên kết, thường là R20 |
| `ma_ngan` | chuỗi ngắn | Có | duy nhất | Mã dùng trong đường dẫn ngắn |
| `bi_danh` | chuỗi ngắn | Không | duy nhất có điều kiện | Bí danh tùy chọn |
| `lien_ket_goc` | chuỗi vừa | Có | không rỗng | Đường dẫn đích |
| `lien_ket_du_phong` | chuỗi vừa | Không |  | Dùng khi đích lỗi |
| `trang_thai` | chuỗi ngắn | Có | theo TL02 mục 13.4 | hoạt động, tạm khóa... |
| `ly_do_trang_thai` | văn bản dài | Không |  |  |
| `yeu_cau_xac_minh_truy_cap` | đúng sai | Có | mặc định theo cấu hình hệ thống |  |
| `cho_phep_chuyen_huong_du_phong` | đúng sai | Có | mặc định đúng |  |
| `thoi_diem_het_han` | thời gian chuẩn | Không |  | Nếu có hạn |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |
| `ma_nguoi_dung_tao` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` |  |
| `ma_nguoi_dung_cap_nhat` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |

### Ràng buộc bắt buộc
- Duy nhất `ma_ngan`
- Duy nhất `bi_danh` nếu không rỗng
- Chỉ mục `ma_nguoi_dung`, `thoi_diem_tao`
- Chỉ mục `trang_thai`
- Ràng buộc kiểm tra `lien_ket_goc` khác `lien_ket_du_phong` nếu có

---

## 14.2 Bảng `nhat_ky_lien_ket_rut_gon`

### Mục đích
Lưu thay đổi cấu hình và trạng thái liên kết rút gọn.

### Cột chính
- `ma`
- `ma_lien_ket_rut_gon`
- `loai_su_kien` như tao_moi, cap_nhat, doi_trang_thai
- `du_lieu_truoc` văn bản cấu trúc
- `du_lieu_sau` văn bản cấu trúc
- `ly_do`
- `nguon_tao`
- `ma_nguoi_dung_thuc_hien`
- `thoi_diem_tao`

### Ràng buộc
- Chỉ mục `ma_lien_ket_rut_gon`, `thoi_diem_tao`

---

## 14.3 Bảng `bao_loi_lien_ket`

### Mục đích
Lưu báo lỗi từ R01 theo TL11 mục NV45.

### Cột dữ liệu
- `ma`
- `ma_lien_ket_rut_gon` có thể rỗng nếu không tìm thấy mã ngắn
- `ma_ngan_goc` chuỗi
- `loai_loi_bao_cao`
- `mo_ta_them`
- `dia_chi_mang_bam`
- `dau_vet_thiet_bi_tom_tat`
- `trang_thai_xu_ly` gồm mới_tạo, đang_xử_lý, đã_đóng
- `ma_nhan_vien_ho_tro_xu_ly` có thể là R40
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`

### Chỉ mục
- `ma_lien_ket_rut_gon`
- `trang_thai_xu_ly`
- `thoi_diem_tao`

---

# 15. Nhóm chiến dịch khách hàng mua

## 15.1 Bảng `chien_dich`

### Mục đích
Thực thể chính của chiến dịch tính theo lượt.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất |  |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Chủ chiến dịch, thường là R10 |
| `ten_chien_dich` | chuỗi ngắn | Có | không rỗng |  |
| `mo_ta` | văn bản dài | Không |  |  |
| `trang_thai` | chuỗi ngắn | Có | theo TL02 mục 13.5 | 10 trạng thái |
| `ly_do_trang_thai` | văn bản dài | Không |  | Dùng khi bị từ chối, lỗi cấu hình... |
| `ma_phien_ban_cau_hinh_hien_tai` | số nguyên lớn | Không | khóa ngoài `chien_dich_phien_ban_cau_hinh.ma` |  |
| `ma_phien_ban_cau_hinh_duoc_duyet` | số nguyên lớn | Không | khóa ngoài `chien_dich_phien_ban_cau_hinh.ma` |  |
| `ngan_sach_tong` | số thập phân tiền | Có | lớn hơn 0 |  |
| `ngan_sach_da_dung_tam_thoi` | số thập phân tiền | Có | không âm |  |
| `ngan_sach_da_dung_da_chot` | số thập phân tiền | Có | không âm |  |
| `gioi_han_luot_ngay` | số nguyên | Có | lớn hơn 0 |  |
| `so_luot_hop_le_tam_thoi_hom_nay` | số nguyên | Có | không âm | Có thể đồng bộ từ tổng hợp |
| `so_luot_hop_le_da_chot_hom_nay` | số nguyên | Có | không âm |  |
| `don_vi_tien` | chuỗi ngắn | Có | không rỗng |  |
| `thoi_diem_bat_dau` | thời gian chuẩn | Không |  |  |
| `thoi_diem_ket_thuc` | thời gian chuẩn | Không |  |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |
| `ma_nguoi_dung_tao` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` |  |
| `ma_nguoi_dung_cap_nhat` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |
| `ma_quan_tri_duyet` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` | Duyệt hoặc từ chối |
| `thoi_diem_duyet` | thời gian chuẩn | Không |  |  |

### Ràng buộc
- Chỉ mục `ma_nguoi_dung`, `thoi_diem_tao`
- Chỉ mục `trang_thai`
- Kiểm tra `ngan_sach_tong > 0`
- Kiểm tra `ngan_sach_da_dung_tam_thoi >= 0`
- Kiểm tra `ngan_sach_da_dung_da_chot >= 0`
- Kiểm tra `ngan_sach_da_dung_da_chot <= ngan_sach_da_dung_tam_thoi` chỉ mang tính khuyến nghị nếu xử lý đối soát có độ trễ; có thể thay bằng kiểm tra ở lớp dịch vụ

---

## 15.2 Bảng `chien_dich_phien_ban_cau_hinh`

### Mục đích
Lưu phiên bản cấu hình chiến dịch để bảo toàn lịch sử theo TL10.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_chien_dich` | số nguyên lớn | Có | khóa ngoài `chien_dich.ma` |  |
| `so_phien_ban` | số nguyên | Có | lớn hơn 0 | Tăng dần theo chiến dịch |
| `trang_thai_phien_ban` | chuỗi ngắn | Có | nhap, cho_duyet, duoc_duyet, bi_tu_choi, het_hieu_luc | Trạng thái phiên bản |
| `la_phien_ban_hien_tai` | đúng sai | Có | mặc định sai |  |
| `la_phien_ban_duoc_duyet` | đúng sai | Có | mặc định sai |  |
| `lien_ket_dich` | chuỗi vừa | Có | không rỗng |  |
| `ngan_sach_tong` | số thập phân tiền | Có | lớn hơn 0 | Chụp tại phiên bản |
| `gioi_han_luot_ngay` | số nguyên | Có | lớn hơn 0 |  |
| `don_gia_moi_luot` | số thập phân tiền | Có | lớn hơn 0 | Chụp nhanh để truy vết |
| `don_vi_tien` | chuỗi ngắn | Có | không rỗng |  |
| `du_lieu_nham_muc_tieu` | văn bản cấu trúc | Có | không rỗng | Quốc gia, thiết bị, trình duyệt, khung giờ |
| `du_lieu_tuy_chon` | văn bản cấu trúc | Không |  | Mở rộng sau |
| `ly_do_tu_choi` | văn bản dài | Không | bắt buộc nếu bị_tu_choi |  |
| `ghi_chu_xu_ly` | văn bản dài | Không |  |  |
| `ma_nguoi_dung_tao` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | R10 hoặc R30 |
| `ma_quan_tri_duyet` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_duyet` | thời gian chuẩn | Không |  |  |

### Ràng buộc bắt buộc
- Duy nhất `ma_chien_dich`, `so_phien_ban`
- Duy nhất có điều kiện: một `ma_chien_dich` chỉ có một `la_phien_ban_hien_tai = dung`
- Duy nhất có điều kiện: một `ma_chien_dich` chỉ có một `la_phien_ban_duoc_duyet = dung`
- Chỉ mục `ma_chien_dich`, `trang_thai_phien_ban`
- Chỉ mục `ma_quan_tri_duyet`, `thoi_diem_duyet`

---

## 15.3 Bảng `nhat_ky_chien_dich`

### Mục đích
Lưu lịch sử hành động và chuyển trạng thái chiến dịch.

### Cột chính
- `ma`
- `ma_chien_dich`
- `trang_thai_cu`
- `trang_thai_moi`
- `hanh_dong`
- `ly_do`
- `ghi_chu`
- `du_lieu_tom_tat`
- `nguon_tao`
- `ma_nguoi_dung_thuc_hien`
- `thoi_diem_tao`

### Chỉ mục
- `ma_chien_dich`, `thoi_diem_tao`
- `ma_nguoi_dung_thuc_hien`, `thoi_diem_tao`

---

## 15.4 Bảng `chi_tieu_chien_dich_theo_su_kien`

### Mục đích
Liên kết sự kiện lượt với chi tiêu chiến dịch để chống trừ trùng và hỗ trợ điều chỉnh.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_chien_dich` | số nguyên lớn | Có | khóa ngoài `chien_dich.ma` |  |
| `ma_su_kien_luot` | số nguyên lớn | Có | khóa ngoài `su_kien_luot.ma` |  |
| `trang_thai_chi_tieu` | chuỗi ngắn | Có | tam_thoi, da_chot, da_dieu_chinh |  |
| `so_tien_ap_dung` | số thập phân tiền | Có | lớn hơn hoặc bằng 0 |  |
| `don_vi_tien` | chuỗi ngắn | Có | khớp chiến dịch |  |
| `ma_but_toan_so_cai` | số nguyên lớn | Không | khóa ngoài `so_cai_giao_dich.ma` | Bút toán đã ghi |
| `ma_khoa_chong_trung` | chuỗi vừa | Có | duy nhất | Ví dụ theo cặp chiến dịch và sự kiện |
| `ly_do_dieu_chinh` | văn bản dài | Không |  |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |

### Ràng buộc
- Duy nhất `ma_chien_dich`, `ma_su_kien_luot`, `trang_thai_chi_tieu` theo chính sách
- Khuyến nghị:
  - duy nhất một dòng `tam_thoi` cho mỗi cặp chiến dịch và sự kiện
  - duy nhất một dòng `da_chot` cho mỗi cặp chiến dịch và sự kiện
- Chỉ mục `ma_chien_dich`, `trang_thai_chi_tieu`
- Chỉ mục `ma_su_kien_luot`

---

# 16. Nhóm sự kiện lượt dùng chung

> TL12 đã khóa khái niệm và trạng thái sự kiện lượt dùng chung cho cả chiến dịch và liên kết. TL13 triển khai một bảng lõi `su_kien_luot` và các bảng liên kết chuyên biệt.

## 16.1 Bảng `su_kien_luot`

### Mục đích
Lưu sự kiện lượt chuẩn hóa dùng chung cho phân loại hợp lệ, chống gian lận và đối soát.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất | Có thể dùng cho truy vết nội bộ |
| `ma_su_kien_ngoai` | chuỗi vừa | Không | duy nhất có điều kiện | Nếu cổng ghi nhận cung cấp mã riêng |
| `trang_thai` | chuỗi ngắn | Có | theo TL02 mục 13.6 | 7 trạng thái |
| `ly_do_loai_chinh` | chuỗi ngắn | Không | theo danh mục TL12 | Chỉ khi bị loại |
| `ly_do_kiem_tra_thu_cong` | chuỗi ngắn | Không | theo danh mục TL12 | Khi cần kiểm tra |
| `diem_rui_ro` | số thập phân tỷ lệ | Không | lớn hơn hoặc bằng 0 |  |
| `muc_rui_ro` | chuỗi ngắn | Không | thap, trung_binh, cao, rat_cao | Từ điểm rủi ro |
| `yeu_cau_xac_minh` | đúng sai | Có |  | Có bật xác minh không |
| `xac_minh_hoan_tat` | đúng sai | Có |  | Kết quả xác minh |
| `thoi_luong_giay` | số nguyên | Không | không âm | Thời lượng quan sát được |
| `dia_chi_mang_bam` | chuỗi băm | Không |  |  |
| `ma_dau_vet_thiet_bi` | số nguyên lớn | Không | khóa ngoài `dau_vet_thiet_bi.ma` |  |
| `quoc_gia` | chuỗi ngắn | Không | mã quốc gia |  |
| `trinh_duyet` | chuỗi ngắn | Không |  |  |
| `he_dieu_hanh` | chuỗi ngắn | Không |  |  |
| `thiet_bi` | chuỗi ngắn | Không |  |  |
| `nguon_truy_cap` | chuỗi ngắn | Có | lien_ket_ngan, chien_dich, khac | Nguồn ghi nhận |
| `ma_nguon_chinh` | số nguyên lớn | Không |  | Mã thực thể chính nếu có |
| `tham_chieu_gioi_thieu` | chuỗi vừa | Không |  | Nguồn giới thiệu |
| `du_lieu_tho_tom_tat` | văn bản cấu trúc | Không |  | Tóm tắt dữ liệu kỹ thuật tối thiểu |
| `thoi_diem_nhan` | thời gian chuẩn | Có |  | Khi hệ thống nhận sự kiện |
| `thoi_diem_xay_ra` | thời gian chuẩn | Không |  | Nếu khác thời điểm nhận |
| `thoi_diem_danh_gia` | thời gian chuẩn | Không |  | Khi hoàn tất quyết định tạm thời |
| `thoi_diem_chot` | thời gian chuẩn | Không |  | Khi chuyển đã chốt |
| `phien_ban_quy_tac_gian_lan` | chuỗi ngắn | Không |  | Truy vết cấu hình |
| `nguon_quyet_dinh_cuoi` | chuỗi ngắn | Không | he_thong hoặc quan_tri |  |
| `ma_quan_tri_quyet_dinh` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` | Nếu quyết định thủ công |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |

### Ràng buộc bắt buộc
- `trang_thai` thuộc đúng bảy trạng thái TL02 mục 13.6
- `thoi_luong_giay >= 0` nếu có
- `diem_rui_ro >= 0` nếu có
- Nếu `trang_thai` là `bị loại tạm thời` hoặc `bị loại đã chốt` thì `ly_do_loai_chinh` không được rỗng
- Nếu `trang_thai` là `cần kiểm tra thủ công` thì `ly_do_kiem_tra_thu_cong` không được rỗng

### Chỉ mục tối thiểu
- `trang_thai`, `thoi_diem_nhan`
- `ma_dau_vet_thiet_bi`, `thoi_diem_nhan`
- `dia_chi_mang_bam`, `thoi_diem_nhan`
- `nguon_truy_cap`, `ma_nguon_chinh`
- `thoi_diem_chot`
- `thoi_diem_nhan` cho phân vùng và truy vấn theo thời gian

---

## 16.2 Bảng `gan_su_kien_luot_vao_lien_ket`

### Mục đích
Liên kết sự kiện lượt với liên kết rút gọn và dữ liệu xử lý chuyển hướng.

### Cột chính
- `ma`
- `ma_su_kien_luot`
- `ma_lien_ket_rut_gon`
- `ket_qua_xu_ly_truy_cap` như chuyen_huong_goc, chuyen_huong_du_phong, loi_khong_tim_thay, bi_chan
- `ma_tep_noi_dung_trung_gian` nếu có tham chiếu nội dung hiển thị
- `thoi_diem_tao`

### Ràng buộc
- Duy nhất `ma_su_kien_luot`, `ma_lien_ket_rut_gon`
- Chỉ mục `ma_lien_ket_rut_gon`, `thoi_diem_tao`

---

## 16.3 Bảng `gan_su_kien_luot_vao_chien_dich`

### Mục đích
Liên kết sự kiện lượt với chiến dịch áp dụng để phục vụ TL10.

### Cột dữ liệu
- `ma`
- `ma_su_kien_luot`
- `ma_chien_dich`
- `ma_phien_ban_cau_hinh_ap_dung`
- `don_gia_moi_luot_ap_dung`
- `don_vi_tien`
- `ket_qua_ap_dung` như duoc_tinh, khong_tinh, cho_doi_soat
- `ly_do_khong_ap_dung`
- `thoi_diem_tao`

### Ràng buộc
- Duy nhất `ma_su_kien_luot`, `ma_chien_dich`
- Chỉ mục `ma_chien_dich`, `thoi_diem_tao`
- Chỉ mục `ma_phien_ban_cau_hinh_ap_dung`

---

## 16.4 Bảng `nhat_ky_danh_gia_su_kien_luot`

### Mục đích
Lưu các bước đánh giá nhiều lớp theo TL12 để giải thích được quyết định.

### Cột chính
- `ma`
- `ma_su_kien_luot`
- `thu_tu_buoc`
- `ten_buoc` như kiem_tra_du_lieu, kiem_tra_trang_thai, gioi_han_tan_suat, chong_trung, cham_diem_rui_ro...
- `ket_qua_buoc`
- `ly_do`
- `du_lieu_tom_tat`
- `thoi_diem_tao`

### Ràng buộc
- Chỉ mục `ma_su_kien_luot`, `thu_tu_buoc`
- Chỉ mục `ten_buoc`, `thoi_diem_tao`

---

# 17. Nhóm doanh thu nhà xuất bản và đối soát

## 17.1 Bảng `doanh_thu_nha_xuat_ban_theo_su_kien`

### Mục đích
Gắn sự kiện lượt với doanh thu nhà xuất bản để chống cộng trùng và hỗ trợ đối soát.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_nguoi_dung` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | Chủ liên kết, thường là R20 |
| `ma_lien_ket_rut_gon` | số nguyên lớn | Có | khóa ngoài `lien_ket_rut_gon.ma` |  |
| `ma_su_kien_luot` | số nguyên lớn | Có | khóa ngoài `su_kien_luot.ma` |  |
| `trang_thai_doanh_thu` | chuỗi ngắn | Có | tam_thoi, da_chot, da_dieu_chinh, huy_bo |  |
| `so_tien_doanh_thu` | số thập phân tiền | Có | lớn hơn hoặc bằng 0 |  |
| `don_vi_tien` | chuỗi ngắn | Có | không rỗng |  |
| `ma_cau_hinh_gia_ap_dung` | số nguyên lớn | Không | khóa ngoài `cau_hinh_gia_theo_luot.ma` |  |
| `ma_lo_doi_soat` | số nguyên lớn | Không | khóa ngoài `lo_doi_soat_nha_xuat_ban.ma` | Khi đã chốt |
| `ma_but_toan_ket_chuyen` | số nguyên lớn | Không | khóa ngoài `so_cai_giao_dich.ma` | Khi đã kết chuyển |
| `ma_khoa_chong_trung` | chuỗi vừa | Có | duy nhất | Theo cặp liên kết và sự kiện và trạng thái |
| `ly_do_dieu_chinh` | văn bản dài | Không |  |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |

### Ràng buộc
- Duy nhất `ma_lien_ket_rut_gon`, `ma_su_kien_luot`, `trang_thai_doanh_thu` theo chính sách
- Chỉ mục `ma_nguoi_dung`, `trang_thai_doanh_thu`
- Chỉ mục `ma_lien_ket_rut_gon`, `thoi_diem_tao`
- Chỉ mục `ma_su_kien_luot`
- Chỉ mục `ma_lo_doi_soat`

---

## 17.2 Bảng `lo_doi_soat_nha_xuat_ban`

### Mục đích
Lưu thông tin lô đối soát doanh thu nhà xuất bản theo kỳ.

### Cột dữ liệu
- `ma`
- `ma_cong_khai`
- `ky_doi_soat_tu_ngay`
- `ky_doi_soat_den_ngay`
- `don_vi_tien`
- `trang_thai` gồm mới_tạo, đang_chạy, hoàn_thành, lỗi, hủy
- `tong_so_su_kien_xet`
- `tong_so_dong_doanh_thu_da_chot`
- `tong_so_tien_ket_chuyen`
- `ma_khoa_chong_trung_lo`
- `thoi_diem_bat_dau`
- `thoi_diem_ket_thuc`
- `ghi_chu`
- `ma_quan_tri_xu_ly`
- `thoi_diem_tao`

### Ràng buộc
- Duy nhất `ma_khoa_chong_trung_lo`
- Có thể bổ sung duy nhất theo kỳ và đơn vị tiền nếu chính sách không cho chạy trùng
- Chỉ mục `trang_thai`
- Chỉ mục `ky_doi_soat_tu_ngay`, `ky_doi_soat_den_ngay`

---

## 17.3 Bảng `dong_doi_soat_nha_xuat_ban`

### Mục đích
Lưu kết quả đối soát theo từng nhà xuất bản trong một lô.

### Cột chính
- `ma`
- `ma_lo_doi_soat`
- `ma_nguoi_dung`
- `don_vi_tien`
- `tong_so_dong_doanh_thu`
- `tong_so_tien_ket_chuyen`
- `ma_vi_dich`
- `ma_but_toan_ket_chuyen` có thể một bút toán tổng theo nhà xuất bản
- `trang_thai` gồm cho_xu_ly, da_ket_chuyen, loi
- `ly_do_loi`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`

### Ràng buộc
- Duy nhất `ma_lo_doi_soat`, `ma_nguoi_dung`, `don_vi_tien`
- Chỉ mục `ma_nguoi_dung`
- Chỉ mục `trang_thai`

---

# 18. Nhóm chống gian lận

## 18.1 Bảng `dau_vet_thiet_bi`

### Mục đích
Lưu định danh thiết bị ở mức nền tảng phục vụ TL12.

### Cột dữ liệu
- `ma`
- `ma_cong_khai`
- `dau_vet_bam`
- `muc_do_tin_cay`
- `trang_thai` gồm hoạt_động, nghi_ngờ, chặn
- `thoi_diem_gap_dau`
- `thoi_diem_gap_cuoi`
- `so_su_kien_da_ghi_nhan`
- `du_lieu_tom_tat`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`

### Ràng buộc
- Duy nhất `dau_vet_bam`
- Chỉ mục `trang_thai`
- Chỉ mục `thoi_diem_gap_cuoi`

---

## 18.2 Bảng `danh_sach_chan`

### Mục đích
Danh sách chặn dùng cho địa chỉ mạng băm, dấu vết thiết bị, mẫu truy cập, người dùng hoặc liên kết.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `loai_doi_tuong_chan` | chuỗi ngắn | Có | dia_chi_mang_bam, dau_vet_thiet_bi, ma_nguoi_dung, ma_lien_ket, mau_khac |  |
| `gia_tri_chan` | chuỗi vừa | Có | không rỗng | Giá trị mục tiêu |
| `pham_vi_ap_dung` | chuỗi ngắn | Có | toan_he_thong, theo_mo_dun |  |
| `ly_do_chan` | chuỗi vừa | Có | không rỗng |  |
| `muc_do_nghiem_trong` | chuỗi ngắn | Có | thap, trung_binh, cao |  |
| `trang_thai` | chuỗi ngắn | Có | hoạt_động, hết_hiệu_lực, hủy |  |
| `thoi_diem_hieu_luc_tu` | thời gian chuẩn | Có |  |  |
| `thoi_diem_hieu_luc_den` | thời gian chuẩn | Không |  |  |
| `ma_quan_tri_tao` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | R30 |
| `ma_quan_tri_cap_nhat` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |

### Ràng buộc
- Chỉ mục `loai_doi_tuong_chan`, `gia_tri_chan`, `trang_thai`
- Chỉ mục `thoi_diem_hieu_luc_tu`, `thoi_diem_hieu_luc_den`

---

## 18.3 Bảng `canh_bao_gian_lan`

### Mục đích
Lưu cảnh báo phát sinh từ hệ thống hoặc do hỗ trợ chuyển lên.

### Cột chính
- `ma`
- `ma_cong_khai`
- `loai_canh_bao`
- `muc_do`
- `trang_thai_xu_ly` gồm mới_tạo, đang_xử_lý, chờ_quyết_định, đã_đóng
- `ma_su_kien_luot` có thể rỗng
- `ma_chien_dich` có thể rỗng
- `ma_lien_ket_rut_gon` có thể rỗng
- `ma_nguoi_dung_lien_quan` có thể rỗng
- `du_lieu_tom_tat`
- `ly_do_khoi_tao`
- `ma_nhan_vien_ho_tro_tiep_nhan`
- `ma_quan_tri_phu_trach`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`
- `thoi_diem_dong`

### Chỉ mục
- `trang_thai_xu_ly`, `muc_do`
- `ma_su_kien_luot`
- `ma_chien_dich`
- `ma_lien_ket_rut_gon`
- `ma_nguoi_dung_lien_quan`

---

## 18.4 Bảng `hang_kiem_tra_thu_cong_su_kien`

### Mục đích
Danh sách sự kiện lượt cần kiểm tra thủ công theo TL12.

### Cột dữ liệu
- `ma`
- `ma_su_kien_luot`
- `ly_do_dua_vao_hang`
- `muc_uu_tien`
- `trang_thai_hang` gồm chờ_xử_lý, đang_xử_lý, chờ_bổ_sung, đã_quyết_định
- `ma_nhan_vien_ho_tro_xu_ly` có thể là R40
- `ma_quan_tri_quyet_dinh` có thể là R30
- `thoi_diem_tiep_nhan`
- `thoi_diem_quyet_dinh`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`

### Ràng buộc
- Duy nhất có điều kiện: một `ma_su_kien_luot` chỉ có một dòng đang mở trong hàng kiểm tra
- Chỉ mục `trang_thai_hang`, `muc_uu_tien`, `thoi_diem_tao`
- Chỉ mục `ma_su_kien_luot`

---

## 18.5 Bảng `quyet_dinh_kiem_tra_su_kien`

### Mục đích
Lưu quyết định cuối cùng hoặc quyết định tạm của R30 đối với sự kiện trong hàng kiểm tra.

### Cột dữ liệu
- `ma`
- `ma_hang_kiem_tra_thu_cong`
- `ma_su_kien_luot`
- `quyet_dinh` gồm hop_le_tam_thoi, bi_loai_tam_thoi, hop_le_da_chot, bi_loai_da_chot, giu_nguyen
- `ly_do_quyet_dinh`
- `ly_do_loai_chinh`
- `ghi_chu`
- `thay_doi_diem_rui_ro` có thể rỗng
- `ma_quan_tri_quyet_dinh`
- `thoi_diem_tao`

### Ràng buộc
- Chỉ mục `ma_su_kien_luot`, `thoi_diem_tao`
- Chỉ mục `ma_quan_tri_quyet_dinh`, `thoi_diem_tao`

---

# 19. Nhóm báo cáo tổng hợp theo ngày

> Các bảng tổng hợp không thay thế dữ liệu gốc. Chúng dùng để tăng tốc bảng điều khiển và báo cáo.

## 19.1 Bảng `tong_hop_chien_dich_ngay`

### Mục đích
Tổng hợp số liệu chiến dịch theo ngày để phục vụ TL10 và TL02 mục báo cáo.

### Cột chính
- `ma`
- `ngay_thong_ke`
- `ma_chien_dich`
- `ma_nguoi_dung`
- `don_vi_tien`
- `so_luot_hop_le_tam_thoi`
- `so_luot_hop_le_da_chot`
- `so_luot_bi_loai`
- `chi_tieu_tam_thoi`
- `chi_tieu_da_chot`
- `so_su_kien_can_kiem_tra_thu_cong`
- `thoi_diem_cap_nhat`

### Ràng buộc
- Duy nhất `ngay_thong_ke`, `ma_chien_dich`
- Chỉ mục `ma_nguoi_dung`, `ngay_thong_ke`

---

## 19.2 Bảng `tong_hop_lien_ket_ngay`

### Mục đích
Tổng hợp số liệu liên kết và doanh thu nhà xuất bản theo ngày.

### Cột chính
- `ma`
- `ngay_thong_ke`
- `ma_lien_ket_rut_gon`
- `ma_nguoi_dung`
- `don_vi_tien`
- `so_luot_hop_le_tam_thoi`
- `so_luot_hop_le_da_chot`
- `so_luot_bi_loai`
- `doanh_thu_tam_thoi`
- `doanh_thu_da_chot`
- `thoi_diem_cap_nhat`

### Ràng buộc
- Duy nhất `ngay_thong_ke`, `ma_lien_ket_rut_gon`
- Chỉ mục `ma_nguoi_dung`, `ngay_thong_ke`

---

## 19.3 Bảng `tong_hop_tai_chinh_nguoi_dung_ngay`

### Mục đích
Tổng hợp nạp, rút, chi tiêu, doanh thu theo người dùng và ngày phục vụ quản trị và bảng điều khiển.

### Cột chính
- `ma`
- `ngay_thong_ke`
- `ma_nguoi_dung`
- `don_vi_tien`
- `tong_nap_thanh_cong`
- `tong_rut_hoan_thanh`
- `tong_chi_tieu_da_chot`
- `tong_doanh_thu_da_chot`
- `thoi_diem_cap_nhat`

### Ràng buộc
- Duy nhất `ngay_thong_ke`, `ma_nguoi_dung`, `don_vi_tien`

---

# 20. Nhóm cấu hình hệ thống và thanh toán

## 20.1 Bảng `cau_hinh_ngan_hang_he_thong`

### Mục đích
Lưu thông tin tài khoản ngân hàng hiển thị cho nạp tiền thủ công.

### Cột dữ liệu
- `ma`
- `ma_cong_khai`
- `ten_hien_thi`
- `ten_ngan_hang`
- `so_tai_khoan`
- `chu_tai_khoan`
- `noi_dung_mau`
- `ma_tep_anh_ma`
- `thu_tu_hien_thi`
- `dang_hoat_dong`
- `ap_dung_cho_loai_vi`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`
- `ma_quan_tri_tao`
- `ma_quan_tri_cap_nhat`

### Ràng buộc
- Chỉ mục `dang_hoat_dong`, `thu_tu_hien_thi`
- Dữ liệu nhạy cảm phải che khi hiển thị cho R40 tùy màn hình

---

## 20.2 Bảng `cau_hinh_vi_usdt_he_thong`

### Mục đích
Lưu địa chỉ ví và ảnh mã phục vụ nạp và rút USDT thủ công.

### Cột dữ liệu
- `ma`
- `ma_cong_khai`
- `ten_hien_thi`
- `mang_chuoi_khoi`
- `dia_chi_vi`
- `ma_tep_anh_ma`
- `huong_dan_song_ngu`
- `dang_hoat_dong`
- `thu_tu_hien_thi`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`
- `ma_quan_tri_tao`
- `ma_quan_tri_cap_nhat`

### Ràng buộc
- Có thể duy nhất theo `mang_chuoi_khoi`, `dia_chi_vi`
- Chỉ mục `dang_hoat_dong`, `thu_tu_hien_thi`

---

## 20.3 Bảng `cau_hinh_khuyen_mai_nap`

### Mục đích
Lưu cấu hình khuyến mãi theo ngưỡng nạp tiền.

### Cột dữ liệu
- `ma`
- `ten_chuong_trinh`
- `loai_ap_dung` như theo_nguong_phan_tram, theo_nguong_tien_co_dinh
- `nguong_toi_thieu`
- `don_vi_tien`
- `ty_le_tang_them`
- `so_tien_tang_them`
- `trang_thai`
- `thoi_diem_hieu_luc_tu`
- `thoi_diem_hieu_luc_den`
- `thu_tu_uu_tien`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`

### Ràng buộc
- Kiểm tra ít nhất một trong `ty_le_tang_them`, `so_tien_tang_them` phải có giá trị dương
- Chỉ mục `trang_thai`, `thoi_diem_hieu_luc_tu`, `thoi_diem_hieu_luc_den`

---

## 20.4 Bảng `cau_hinh_gia_theo_luot`

### Mục đích
Lưu cấu hình giá dùng cho:
- chiến dịch khách hàng mua
- doanh thu nhà xuất bản
- đối soát và truy vết đơn giá hiệu lực

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất |  |
| `loai_ap_dung` | chuỗi ngắn | Có | `gia_chien_dich`, `gia_doanh_thu_nha_xuat_ban` |  |
| `pham_vi` | chuỗi ngắn | Có | toan_he_thong, theo_quoc_gia, theo_nguon, theo_nhom |  |
| `du_lieu_pham_vi` | văn bản cấu trúc | Không |  | Mã quốc gia, nhóm áp dụng... |
| `don_vi_tien` | chuỗi ngắn | Có | không rỗng |  |
| `muc_gia` | số thập phân tiền | Có | lớn hơn hoặc bằng 0 |  |
| `trang_thai` | chuỗi ngắn | Có | hoạt_động, tạm_dừng, hết_hiệu_lực |  |
| `thoi_diem_hieu_luc_tu` | thời gian chuẩn | Có |  |  |
| `thoi_diem_hieu_luc_den` | thời gian chuẩn | Không |  |  |
| `thu_tu_uu_tien` | số nguyên | Có | không âm |  |
| `ghi_chu` | văn bản dài | Không |  |  |
| `ma_quan_tri_tao` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` |  |
| `ma_quan_tri_cap_nhat` | số nguyên lớn | Không | khóa ngoài `nguoi_dung.ma` |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |
| `thoi_diem_cap_nhat` | thời gian chuẩn | Có |  |  |

### Chỉ mục
- `loai_ap_dung`, `trang_thai`
- `thoi_diem_hieu_luc_tu`, `thoi_diem_hieu_luc_den`
- `thu_tu_uu_tien`

---

# 21. Nhóm tệp lưu trữ, nhật ký quản trị, thông báo và hỗ trợ

## 21.1 Bảng `tep_luu_tru`

### Mục đích
Kho siêu dữ liệu tệp dùng chung cho chứng từ, ảnh mã thanh toán, ảnh hướng dẫn, tệp hỗ trợ.

### Cột dữ liệu
- `ma`
- `ma_cong_khai`
- `ten_tap_tin_goc`
- `duong_dan_luu_tru`
- `loai_noi_dung`
- `kich_thuoc_byte`
- `ma_bam_tap_tin`
- `trang_thai`
- `ma_nguoi_dung_tai_len`
- `thoi_diem_tao`
- `thoi_diem_xoa_mem`

### Ràng buộc
- Duy nhất `ma_bam_tap_tin`, `kich_thuoc_byte` có thể dùng phát hiện trùng tệp
- Chỉ mục `ma_nguoi_dung_tai_len`
- Chỉ mục `thoi_diem_tao`

---

## 21.2 Bảng `nhat_ky_quan_tri`

### Mục đích
Nhật ký thao tác nhạy cảm của R30 và một phần thao tác hỗ trợ của R40 theo TL03.

### Cột dữ liệu

| Cột | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
|---|---|---|---|---|
| `ma` | số nguyên lớn | Có | khóa chính |  |
| `ma_cong_khai` | chuỗi ngắn | Có | duy nhất |  |
| `ma_nguoi_dung_thuc_hien` | số nguyên lớn | Có | khóa ngoài `nguoi_dung.ma` | R30 hoặc R40 |
| `vai_tro_luc_thuc_hien` | chuỗi ngắn | Có | R30 hoặc R40 | Chụp tại thời điểm thao tác |
| `hanh_dong` | chuỗi ngắn | Có | không rỗng | Ví dụ duyet_hoa_don_nap |
| `doi_tuong_loai` | chuỗi ngắn | Có | không rỗng | Bảng hoặc thực thể |
| `doi_tuong_ma` | số nguyên lớn | Không |  | Mã nội bộ đối tượng |
| `doi_tuong_ma_cong_khai` | chuỗi ngắn | Không |  | Mã hiển thị |
| `ket_qua` | chuỗi ngắn | Có | thanh_cong, tu_choi, that_bai |  |
| `ly_do` | văn bản dài | Không | bắt buộc với thao tác yêu cầu lý do |  |
| `du_lieu_tom_tat` | văn bản cấu trúc | Không |  | Không chứa dữ liệu nhạy cảm thô |
| `dia_chi_mang_bam` | chuỗi băm | Không |  |  |
| `thoi_diem_tao` | thời gian chuẩn | Có |  |  |

### Chỉ mục
- `ma_nguoi_dung_thuc_hien`, `thoi_diem_tao`
- `hanh_dong`, `thoi_diem_tao`
- `doi_tuong_loai`, `doi_tuong_ma`
- `ket_qua`

---

## 21.3 Bảng `thong_bao_he_thong`

### Mục đích
Lưu bản ghi thông báo cho người dùng với hỗ trợ song ngữ.

### Cột dữ liệu
- `ma`
- `ma_cong_khai`
- `ma_nguoi_dung` có thể rỗng nếu thông báo toàn hệ thống
- `nhom_thong_bao`
- `muc_do`
- `tieu_de_vi`
- `tieu_de_en`
- `noi_dung_vi`
- `noi_dung_en`
- `du_lieu_them`
- `trang_thai_doc` hoặc tách bảng đọc nếu cần mở rộng
- `thoi_diem_tao`
- `thoi_diem_doc`

### Ràng buộc
- Chỉ mục `ma_nguoi_dung`, `thoi_diem_tao`
- Chỉ mục `trang_thai_doc`

---

## 21.4 Bảng `phieu_ho_tro`

### Mục đích
Quản lý phiếu hỗ trợ nội bộ giữa người dùng và đội vận hành.

### Cột chính
- `ma`
- `ma_cong_khai`
- `ma_nguoi_dung_gui`
- `nhom_van_de`
- `muc_do_uu_tien`
- `tieu_de`
- `noi_dung_mo_ta`
- `trang_thai` gồm mới_tạo, đang_xử_lý, chờ_người_dùng, đã_đóng
- `ma_nhan_vien_ho_tro_phu_trach`
- `thoi_diem_tao`
- `thoi_diem_cap_nhat`
- `thoi_diem_dong`

### Chỉ mục
- `ma_nguoi_dung_gui`, `thoi_diem_tao`
- `trang_thai`, `muc_do_uu_tien`
- `ma_nhan_vien_ho_tro_phu_trach`

---

## 21.5 Bảng `phan_hoi_phieu_ho_tro`

### Mục đích
Lưu trao đổi trong phiếu hỗ trợ.

### Cột chính
- `ma`
- `ma_phieu_ho_tro`
- `ma_nguoi_dung_gui`
- `vai_tro_luc_gui`
- `noi_dung`
- `co_noi_dung_noi_bo`
- `ma_tep_dinh_kem` có thể rỗng
- `thoi_diem_tao`

### Ràng buộc
- Chỉ mục `ma_phieu_ho_tro`, `thoi_diem_tao`

---

# 22. Ma trận quan hệ khóa ngoài trọng yếu

Phần này chốt những quan hệ quan trọng để tránh tạo bảng “đứng riêng” không gắn được truy vết.

## 22.1 Quan hệ tài khoản và tài chính

- `vi_nguoi_dung.ma_nguoi_dung` → `nguoi_dung.ma`
- `so_cai_giao_dich.ma_vi` → `vi_nguoi_dung.ma`
- `hoa_don_nap.ma_nguoi_dung` → `nguoi_dung.ma`
- `yeu_cau_rut.ma_nguoi_dung` → `nguoi_dung.ma`
- `yeu_cau_rut.ma_vi_nguon` → `vi_nguoi_dung.ma`
- `yeu_cau_rut.ma_ho_so_nhan_tien` → `ho_so_nhan_tien.ma`

## 22.2 Quan hệ chiến dịch

- `chien_dich.ma_nguoi_dung` → `nguoi_dung.ma`
- `chien_dich_phien_ban_cau_hinh.ma_chien_dich` → `chien_dich.ma`
- `chi_tieu_chien_dich_theo_su_kien.ma_chien_dich` → `chien_dich.ma`
- `gan_su_kien_luot_vao_chien_dich.ma_chien_dich` → `chien_dich.ma`

## 22.3 Quan hệ liên kết và doanh thu

- `lien_ket_rut_gon.ma_nguoi_dung` → `nguoi_dung.ma`
- `gan_su_kien_luot_vao_lien_ket.ma_lien_ket_rut_gon` → `lien_ket_rut_gon.ma`
- `doanh_thu_nha_xuat_ban_theo_su_kien.ma_lien_ket_rut_gon` → `lien_ket_rut_gon.ma`
- `doanh_thu_nha_xuat_ban_theo_su_kien.ma_nguoi_dung` → `nguoi_dung.ma`

## 22.4 Quan hệ sự kiện lượt và chống gian lận

- `su_kien_luot.ma_dau_vet_thiet_bi` → `dau_vet_thiet_bi.ma`
- `nhat_ky_danh_gia_su_kien_luot.ma_su_kien_luot` → `su_kien_luot.ma`
- `hang_kiem_tra_thu_cong_su_kien.ma_su_kien_luot` → `su_kien_luot.ma`
- `quyet_dinh_kiem_tra_su_kien.ma_su_kien_luot` → `su_kien_luot.ma`
- `canh_bao_gian_lan.ma_su_kien_luot` → `su_kien_luot.ma` khi có

---

# 23. Ràng buộc dữ liệu liên bảng quan trọng

Phần này không phải lúc nào cũng thực hiện hoàn toàn bằng ràng buộc cơ sở dữ liệu, nhưng phải được khóa để triển khai ở lớp dịch vụ và kiểm thử.

## 23.1 Ràng buộc tiền và ví

1. `so_cai_giao_dich.don_vi_tien` phải khớp `vi_nguoi_dung.don_vi_tien`.
2. Bút toán `nap_tien_thanh_cong` phải tham chiếu đến một `hoa_don_nap` ở trạng thái cho phép chuyển thành công.
3. Bút toán `rut_tien_khoa_tam`, `rut_tien_mo_khoa_hoan_tra`, `rut_tien_chot_chi` phải tham chiếu `yeu_cau_rut`.
4. Không được có hai bút toán `nap_tien_thanh_cong` cùng tham chiếu một `hoa_don_nap`.
5. Không được có hai bút toán `rut_tien_chot_chi` cùng tham chiếu một `yeu_cau_rut`.

## 23.2 Ràng buộc chiến dịch và chi tiêu

1. `chi_tieu_chien_dich_theo_su_kien` chỉ được ghi khi `su_kien_luot` ở trạng thái phù hợp.
2. Một cặp `chien_dich` và `su_kien_luot` không được ghi chi tiêu trùng cùng trạng thái chi tiêu.
3. `gan_su_kien_luot_vao_chien_dich.don_gia_moi_luot_ap_dung` phải khớp phiên bản cấu hình hoặc cấu hình giá hiệu lực.

## 23.3 Ràng buộc liên kết và doanh thu

1. `doanh_thu_nha_xuat_ban_theo_su_kien` chỉ được ghi cho sự kiện gắn với liên kết của đúng nhà xuất bản.
2. Một cặp `lien_ket_rut_gon` và `su_kien_luot` không được cộng doanh thu trùng cùng trạng thái doanh thu.
3. Kết chuyển vào ví nhà xuất bản chỉ thực hiện cho dòng doanh thu ở trạng thái đã chốt.

## 23.4 Ràng buộc sự kiện và kiểm tra thủ công

1. Sự kiện ở trạng thái `cần kiểm tra thủ công` phải có dòng trong `hang_kiem_tra_thu_cong_su_kien` đang mở hoặc đã có quyết định gần nhất.
2. Quyết định của R30 phải được ghi vào `quyet_dinh_kiem_tra_su_kien` trước khi đổi trạng thái đã chốt nếu thay đổi từ hàng kiểm tra.
3. `nhat_ky_danh_gia_su_kien_luot` phải lưu đủ tối thiểu các bước theo TL12.

---

# 24. Chỉ mục và tối ưu truy vấn tối thiểu cho phiên bản đầu

## 24.1 Truy vấn bảng điều khiển người dùng

### Khối khách hàng mua chiến dịch
- `chien_dich` theo `ma_nguoi_dung`, `trang_thai`, `thoi_diem_tao`
- `tong_hop_chien_dich_ngay` theo `ma_nguoi_dung`, `ngay_thong_ke`
- `hoa_don_nap` theo `ma_nguoi_dung`, `thoi_diem_tao`
- `so_cai_giao_dich` theo `ma_vi`, `thoi_diem_ghi_so`

### Khối nhà xuất bản
- `lien_ket_rut_gon` theo `ma_nguoi_dung`, `trang_thai`, `thoi_diem_tao`
- `tong_hop_lien_ket_ngay` theo `ma_nguoi_dung`, `ngay_thong_ke`
- `yeu_cau_rut` theo `ma_nguoi_dung`, `thoi_diem_tao`
- `doanh_thu_nha_xuat_ban_theo_su_kien` theo `ma_nguoi_dung`, `trang_thai_doanh_thu`

## 24.2 Truy vấn quản trị vận hành

- `hoa_don_nap` theo `trang_thai`, `thoi_diem_tao`
- `yeu_cau_rut` theo `trang_thai`, `thoi_diem_tao`
- `canh_bao_gian_lan` theo `trang_thai_xu_ly`, `muc_do`
- `hang_kiem_tra_thu_cong_su_kien` theo `trang_thai_hang`, `muc_uu_tien`, `thoi_diem_tao`
- `nhat_ky_quan_tri` theo `thoi_diem_tao`, `ma_nguoi_dung_thuc_hien`

## 24.3 Truy vấn xử lý sự kiện và đối soát

- `su_kien_luot` theo `trang_thai`, `thoi_diem_nhan`
- `su_kien_luot` theo `dia_chi_mang_bam`, `thoi_diem_nhan`
- `su_kien_luot` theo `ma_dau_vet_thiet_bi`, `thoi_diem_nhan`
- `doanh_thu_nha_xuat_ban_theo_su_kien` theo `ma_lo_doi_soat`, `trang_thai_doanh_thu`
- `chi_tieu_chien_dich_theo_su_kien` theo `ma_chien_dich`, `trang_thai_chi_tieu`

### Ghi chú
- Sau giai đoạn đầu, cần đo truy vấn thật để tinh chỉnh chỉ mục.
- Tránh thêm quá nhiều chỉ mục làm chậm ghi sự kiện lượt.

---

# 25. Chiến lược lưu lịch sử, giữ dữ liệu và xóa dữ liệu

## 25.1 Dữ liệu không được xóa trong vận hành thường

- `so_cai_giao_dich`
- `hoa_don_nap`
- `yeu_cau_rut`
- `su_kien_luot`
- `doanh_thu_nha_xuat_ban_theo_su_kien`
- `lo_doi_soat_nha_xuat_ban`
- `nhat_ky_quan_tri`

Nếu cần ẩn khỏi giao diện, dùng trạng thái hoặc bộ lọc, không xóa cứng.

## 25.2 Dữ liệu cho phép xóa mềm

- `cau_hinh_ngan_hang_he_thong`
- `cau_hinh_vi_usdt_he_thong`
- `cau_hinh_khuyen_mai_nap`
- một số nội dung hỗ trợ, thông báo, tệp không còn dùng

## 25.3 Dữ liệu cần lưu chụp nhanh để giữ lịch sử đúng

- `hoa_don_nap.du_lieu_cau_hinh_chup`
- `yeu_cau_rut.du_lieu_nhan_tien_chup`
- `chien_dich_phien_ban_cau_hinh`
- `gan_su_kien_luot_vao_chien_dich.don_gia_moi_luot_ap_dung`
- `doanh_thu_nha_xuat_ban_theo_su_kien.ma_cau_hinh_gia_ap_dung`

---

# 26. Dữ liệu khởi tạo tối thiểu cho môi trường phát triển và kiểm thử

## 26.1 Danh mục bắt buộc

- Vai trò: R00, R01, R10, R20, R30, R40
- Trạng thái mặc định và danh mục mã trạng thái ở mức dữ liệu nếu tách bảng danh mục
- Cấu hình ngôn ngữ hỗ trợ `vi` và `en`
- Ít nhất một cấu hình ngân hàng hệ thống đang hoạt động
- Ít nhất một cấu hình ví USDT đang hoạt động
- Một cấu hình giá theo lượt cho chiến dịch
- Một cấu hình giá theo lượt cho doanh thu nhà xuất bản

## 26.2 Tài khoản mẫu tối thiểu

- 1 tài khoản R30
- 1 tài khoản R40
- 1 tài khoản R10 có ví chi tiêu
- 1 tài khoản R20 có ví doanh thu và hồ sơ nhận tiền

## 26.3 Dữ liệu kiểm thử nghiệp vụ tối thiểu

- 1 hóa đơn nạp ở trạng thái chờ duyệt
- 1 hóa đơn nạp thành công có bút toán
- 1 yêu cầu rút chờ duyệt có bút toán khóa tạm
- 1 yêu cầu rút hoàn thành có bút toán chốt chi
- 1 chiến dịch đang chạy
- 1 liên kết rút gọn hoạt động
- 1 lô sự kiện lượt gồm đủ các trạng thái chính
- 1 cảnh báo gian lận và 1 dòng hàng kiểm tra thủ công

---

# 27. Yêu cầu đầu vào cho TL14, TL15, TL16, TL20

## 27.1 Đầu vào cho TL14

TL14 cần chuẩn hóa tiếp từ TL13:

- mã trạng thái cho:
  - hóa đơn nạp
  - yêu cầu rút
  - liên kết
  - chiến dịch
  - sự kiện lượt
- mã loại giao dịch sổ cái
- mã lý do loại lượt
- mã lý do kiểm tra thủ công
- mã lỗi dữ liệu và lỗi nghiệp vụ theo từng mô đun

## 27.2 Đầu vào cho TL15

TL15 sẽ dựa trực tiếp vào TL13 để định nghĩa:

- tên tài nguyên giao diện lập trình
- cấu trúc dữ liệu trả về
- bộ lọc truy vấn
- phân trang
- ràng buộc đầu vào
- trường nào trả về cho R10, R20, R30, R40
- trường nào phải che dữ liệu nhạy cảm

## 27.3 Đầu vào cho TL16

TL16 sẽ dùng TL13 để thiết kế:

- luồng ghi nhận `su_kien_luot`
- thứ tự cập nhật `nhat_ky_danh_gia_su_kien_luot`
- cập nhật bảng ánh xạ chiến dịch hoặc liên kết
- cập nhật doanh thu và chi tiêu theo sự kiện
- cập nhật bảng tổng hợp theo ngày
- xử lý sự kiện đến trễ và xử lý lặp

## 27.4 Đầu vào cho TL20

TL20 sẽ dùng TL13 để chốt:

- phân quyền truy cập bảng dữ liệu nhạy cảm
- sao lưu và phục hồi theo nhóm bảng
- chiến lược lưu trữ lâu dài cho `su_kien_luot`
- chính sách che dữ liệu nhạy cảm trong nhật ký
- tách quyền quản trị cơ sở dữ liệu và quyền vận hành ứng dụng

---

# 28. Tiêu chí chấp nhận tài liệu TL13

Tài liệu TL13 được xem là đạt khi đồng thời thỏa:

1. Không mâu thuẫn với trạng thái và quy trình đã khóa trong TL02 đến TL12.
2. Mô tả được các bảng lõi cho tài chính, chiến dịch, liên kết, sự kiện, doanh thu, chống gian lận.
3. Có ràng buộc chống xử lý trùng cho các luồng tài chính và tính tiền theo lượt.
4. Có phân biệt rõ dữ liệu tạm thời và dữ liệu đã chốt.
5. Có hỗ trợ truy vết người thao tác, quản trị viên duyệt, nhật ký và lý do xử lý.
6. Có chỉ mục tối thiểu đủ cho bảng điều khiển và xử lý vận hành cơ bản.
7. Có đầu vào rõ cho TL14, TL15, TL16 và TL20.

---

# 29. Checklist tự rà soát nhất quán vòng hiện tại

## 29.1 Kiểm tra với TL02

- [x] Dùng đúng bộ trạng thái TL02 cho hóa đơn nạp, yêu cầu rút, liên kết, chiến dịch, sự kiện lượt
- [x] Bao phủ các nhóm chức năng chính trong TL02
- [x] Không thêm tính năng ngoài phạm vi đã loại trừ

## 29.2 Kiểm tra với TL03

- [x] Có trường truy vết người tạo, người duyệt, người xử lý cho các bảng nhạy cảm
- [x] Có lưu dữ liệu đủ để che dữ liệu nhạy cảm cho R40 ở lớp hiển thị
- [x] Có bảng `nhat_ky_quan_tri` phục vụ truy vết thao tác quản trị

## 29.3 Kiểm tra với TL08 và TL09

- [x] `hoa_don_nap` có khóa chống cộng trùng qua liên kết bút toán
- [x] `yeu_cau_rut` có bút toán khóa tạm, mở khóa hoàn trả, chốt chi
- [x] `so_cai_giao_dich` là nguồn chuẩn cho biến động số dư

## 29.4 Kiểm tra với TL10 và TL11

- [x] Có bảng chiến dịch và phiên bản cấu hình chiến dịch
- [x] Có bảng liên kết rút gọn và doanh thu theo sự kiện
- [x] Có bảng chi tiêu chiến dịch theo sự kiện và chống trừ trùng
- [x] Có hỗ trợ đối soát doanh thu nhà xuất bản

## 29.5 Kiểm tra với TL12

- [x] `su_kien_luot` dùng đúng 7 trạng thái
- [x] Có hàng kiểm tra thủ công và quyết định xử lý
- [x] Có nhật ký đánh giá nhiều lớp
- [x] Có danh sách chặn và dấu vết thiết bị

---

# 30. Đề xuất tài liệu tiếp theo ưu tiên cao

**TL14 — Chuẩn mã trạng thái, mã lỗi và danh mục mã dùng chung**

Lý do ưu tiên:
- Sau TL13, cấu trúc dữ liệu đã khá chắc.
- Cần TL14 để khóa mã hóa thống nhất trước khi viết TL15 về giao diện lập trình.
- TL14 giúp tránh tình trạng mỗi mô đun tự đặt mã lỗi, tên hành động, tên loại giao dịch khác nhau.

---

# 31. Kết luận

TL13 đã khóa mô hình dữ liệu cốt lõi của nền tảng theo hướng:

- nhất quán với lõi nghiệp vụ tài chính, chiến dịch, liên kết và chống gian lận
- đủ chi tiết để bắt đầu sinh bảng và ràng buộc dữ liệu
- đủ rõ để trợ lý lập trình tạo mã mô hình, kho dữ liệu và lớp truy cập dữ liệu
- tạo nền ổn định cho TL14, TL15 và TL16

Từ sau TL13, rủi ro lệch nhau giữa “nghiệp vụ nói một kiểu” và “dữ liệu lưu một kiểu” đã giảm đáng kể.
