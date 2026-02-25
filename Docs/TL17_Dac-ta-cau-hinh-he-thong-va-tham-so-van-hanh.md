# Tài liệu 17 — Đặc tả cấu hình hệ thống và tham số vận hành

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL17
- **Tên tài liệu:** Đặc tả cấu hình hệ thống và tham số vận hành
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL07, TL18, TL19, TL20, TL21, TL22, TL23

---

## 2. Mục tiêu tài liệu

TL17 khóa cách quản trị và vận hành **toàn bộ cấu hình hệ thống** để tránh tình trạng:

- mỗi mô đun tự giữ tham số riêng không kiểm soát được,
- thay đổi cấu hình làm lệch kết quả tài chính hoặc thống kê,
- dev và vận hành “đoán” ngưỡng xử lý,
- không truy vết được ai đã đổi cấu hình, đổi lúc nào, ảnh hưởng gì.

TL17 đặc tả:

1. **Nhóm cấu hình nào được phép tồn tại** trong hệ thống.
2. **Quyền ai được xem / sửa / duyệt / xuất bản cấu hình**.
3. **Cách phiên bản hóa, hiệu lực theo thời gian, hoàn tác**.
4. **Quy tắc áp dụng cấu hình** cho:
   - nạp tiền thủ công (TL08)
   - rút tiền thủ công (TL09)
   - chiến dịch tính theo lượt (TL10)
   - liên kết rút gọn & doanh thu nhà xuất bản (TL11)
   - chống gian lận & lượt hợp lệ (TL12)
   - ghi nhận sự kiện & tổng hợp thống kê (TL16)
5. **Ràng buộc đồng nhất** với mô hình dữ liệu (TL13), mã chuẩn (TL14), giao diện lập trình (TL15).

> TL17 **không thay thế** quy trình nghiệp vụ của TL08–TL12, và **không thay thế** yêu cầu bảo mật tổng thể (TL20). TL17 chỉ khóa **lớp cấu hình và tham số vận hành**.

---

## 3. Phạm vi của TL17

### 3.1 Trong phạm vi

- Cấu hình giá theo lượt
- Cấu hình ngưỡng rút tiền
- Cấu hình khuyến mãi nạp tiền
- Cấu hình tài khoản ngân hàng hiển thị
- Cấu hình ví USDT hiển thị
- Cấu hình nội dung thông báo hệ thống (song ngữ)
- Cấu hình tham số chống gian lận (ngưỡng, điểm, cửa sổ thời gian)
- Cấu hình tham số xử lý sự kiện và tổng hợp (lịch chạy, dữ liệu đến trễ, thử lại, hàng lỗi)
- Cấu hình giới hạn vận hành (tần suất, tải tệp, phân trang, thời gian giữ dữ liệu)
- Quy trình thay đổi cấu hình, duyệt, xuất bản, hoàn tác
- Nhật ký thay đổi cấu hình và truy vết ảnh hưởng

### 3.2 Ngoài phạm vi

- Thiết kế hạ tầng triển khai chi tiết theo môi trường (thuộc TL22/TL20)
- Giao diện màn hình chi tiết (thuộc TL04–TL07)
- Đặc tả từng đường dẫn giao diện lập trình chi tiết (thuộc TL15)
- Kịch bản kiểm thử chi tiết (thuộc TL21)
- Chính sách an toàn thông tin tổng thể, mã hóa, sao lưu, quản lý khóa (thuộc TL20)

---

## 4. Nguyên tắc cấu hình bắt buộc

## 4.1 Một nguồn chuẩn cho mỗi loại cấu hình

- Mỗi nhóm cấu hình chỉ có **một nguồn chuẩn duy nhất**.
- Không giữ cấu hình nghiệp vụ quan trọng rải rác trong:
  - mã nguồn cứng,
  - biến môi trường,
  - bảng tạm,
  - tệp cấu hình cục bộ máy chủ.
- Nếu bắt buộc dùng biến môi trường cho bí mật kỹ thuật (ví dụ khóa dịch vụ), TL17 chỉ tham chiếu, **không** dùng để chứa tham số nghiệp vụ thay đổi thường xuyên.

## 4.2 Tách cấu hình nghiệp vụ và bí mật hệ thống

- **Cấu hình nghiệp vụ** (giá, ngưỡng, khuyến mãi, lịch chạy, thông báo) quản trị qua cổng quản trị.
- **Bí mật kỹ thuật** (khóa ký, khóa dịch vụ ngoài) thuộc quản trị hạ tầng/bảo mật, không hiển thị toàn phần trong cổng quản trị nghiệp vụ.
- TL17 chỉ mô tả điểm giao nhau cần biết (ví dụ tên biến tham chiếu), không lưu bí mật.

## 4.3 Mọi thay đổi cấu hình phải truy vết

Mọi thay đổi cấu hình phải có tối thiểu:

- ai tạo thay đổi
- ai duyệt (nếu cần duyệt)
- thời điểm hiệu lực
- giá trị trước / sau (có che nếu nhạy cảm)
- lý do thay đổi
- mã tác động hoặc phạm vi ảnh hưởng
- nhật ký phát hành / hoàn tác

## 4.4 Tách cấu hình “hiển thị” và cấu hình “tính toán”

Ví dụ:

- **Ngân hàng/USDT hiển thị**: cấu hình cho giao diện nạp/rút
- **Giá theo lượt / ngưỡng chống gian lận / lịch chốt**: cấu hình ảnh hưởng tính toán và tài chính

Cấu hình ảnh hưởng tính toán phải có cơ chế:
- phiên bản hóa,
- hiệu lực theo thời gian,
- chụp cấu hình áp dụng (bản chụp cấu hình) khi ghi nhận kết quả quan trọng.

## 4.5 Không đổi hồi tố kết quả đã chốt

- Thay đổi cấu hình mới **không được tự động sửa lại**:
  - số dư đã chốt,
  - đối soát đã chốt,
  - sự kiện đã chốt,
  - doanh thu đã kết chuyển.
- Nếu cần điều chỉnh hồi tố phải đi qua quy trình điều chỉnh có nhật ký (liên hệ TL16, TL19).

---

## 5. Phân loại cấu hình trong hệ thống

## 5.1 Nhóm A — Cấu hình tài chính hiển thị và giao dịch

Dùng cho TL08 và TL09:

- tài khoản ngân hàng hệ thống hiển thị cho nạp thủ công
- ví USDT hệ thống hiển thị cho nạp/rút thủ công
- nội dung hướng dẫn thanh toán song ngữ
- ngưỡng nạp tối thiểu / tối đa (nếu áp dụng)
- ngưỡng rút tối thiểu / tối đa
- số lần yêu cầu rút tối đa trong một khoảng thời gian
- thời gian xử lý dự kiến hiển thị (chỉ dùng hiển thị, không cam kết pháp lý nếu chưa quy định)

## 5.2 Nhóm B — Cấu hình giá và khuyến mãi

Dùng cho TL08, TL10, TL11, TL16:

- giá theo lượt cho chiến dịch khách hàng mua
- giá doanh thu theo lượt cho nhà xuất bản
- phạm vi giá (toàn hệ thống / theo quốc gia / theo nhóm)
- ưu tiên áp dụng giá
- khuyến mãi nạp tiền theo ngưỡng
- thời gian hiệu lực chương trình
- quy tắc chồng nhiều chương trình (nếu cho phép)

## 5.3 Nhóm C — Cấu hình chống gian lận và lượt hợp lệ

Dùng cho TL12 và TL16:

- cửa sổ thời gian chống trùng
- giới hạn tần suất theo địa chỉ mạng / dấu vết thiết bị
- ngưỡng điểm rủi ro
- quy tắc chuyển kiểm tra thủ công
- danh sách cho phép / chặn
- ngưỡng theo quốc gia / thiết bị (nếu có)
- ngưỡng bảo vệ tải tệp chứng từ

## 5.4 Nhóm D — Cấu hình xử lý nền, tổng hợp và đối soát

Dùng cho TL16:

- lịch chạy tổng hợp gần thực
- lịch chạy chốt đối soát
- thời gian chờ dữ liệu đến trễ
- số lần thử lại tối đa
- ngưỡng chuyển hàng lỗi
- lịch xử lý lại theo lô
- chiến lược khóa công việc và chống chạy trùng
- giới hạn khối lượng mỗi lô

## 5.5 Nhóm E — Cấu hình trải nghiệm và nội dung hệ thống

Dùng cho TL04–TL07, TL15, TL19:

- thông báo hệ thống song ngữ
- nội dung hướng dẫn ngắn hiển thị trên trang nạp/rút
- kênh thông báo bật / tắt
- ngôn ngữ mặc định
- danh sách quốc gia hỗ trợ hiển thị
- giới hạn phân trang mặc định

## 5.6 Nhóm F — Cấu hình kỹ thuật vận hành an toàn (tham số mức ứng dụng)

Dùng cho TL15, TL18, TL20:

- giới hạn tốc độ gọi giao diện lập trình theo nhóm đường dẫn
- thời gian hết hạn mã truy cập và mã làm mới (tham chiếu TL20)
- giới hạn kích thước tệp tải lên
- loại tệp được phép
- thời gian giữ nhật ký và dữ liệu tổng hợp
- ngưỡng cảnh báo hiệu năng ở mức ứng dụng (tham chiếu TL18)

> Cấu hình bí mật hạ tầng như mật khẩu cơ sở dữ liệu, khóa ký, khóa truy cập kho tệp nằm ngoài TL17.

---

## 6. Vai trò và phân quyền đối với cấu hình

TL17 bám vai trò đã khóa ở TL03: **R10, R20, R30, R40** và các vai trò công khai nếu có.

## 6.1 Nguyên tắc phân quyền cấu hình

- **R30 (Quản trị viên)**: quyền đầy đủ, bao gồm tạo/sửa/duyệt/xuất bản/hoàn tác cấu hình theo chính sách.
- **R40 (Nhân viên hỗ trợ)**: chỉ xem một phần cấu hình phục vụ hỗ trợ; không xem toàn bộ dữ liệu nhạy cảm; không sửa cấu hình tính toán.
- **R10, R20**: chỉ xem cấu hình đã công bố liên quan trực tiếp (ví dụ ngân hàng hiển thị, ví USDT hiển thị, khuyến mãi nạp hiển thị, đơn giá hiển thị nếu sản phẩm cho phép hiển thị).

## 6.2 Ma trận quyền theo nhóm cấu hình

| Nhóm cấu hình | R10 | R20 | R40 | R30 |
|---|---|---|---|---|
| Ngân hàng hiển thị nạp tiền | xem công khai theo màn hình | xem công khai theo màn hình | xem (che một phần nếu màn hình nội bộ) | tạo/sửa/bật tắt/xuất bản |
| Ví USDT hiển thị | xem công khai theo màn hình | xem công khai theo màn hình | xem (che một phần nếu cần) | tạo/sửa/bật tắt/xuất bản |
| Ngưỡng rút tiền | xem khi tạo yêu cầu rút | không bắt buộc | xem | tạo/sửa/xuất bản |
| Khuyến mãi nạp | xem công khai theo màn hình nạp | không bắt buộc | xem | tạo/sửa/xuất bản |
| Giá theo lượt chiến dịch | xem nếu sản phẩm hiển thị | không bắt buộc | xem | tạo/sửa/xuất bản |
| Giá doanh thu nhà xuất bản | không bắt buộc | xem nếu sản phẩm hiển thị | xem | tạo/sửa/xuất bản |
| Tham số chống gian lận | không | không | xem hạn chế (không đầy đủ công thức) | tạo/sửa/xuất bản |
| Lịch đối soát, thử lại, dữ liệu đến trễ | không | không | xem | tạo/sửa/xuất bản |
| Thông báo hệ thống song ngữ | xem thông báo đã phát hành | xem thông báo đã phát hành | tạo nháp/đề xuất (nếu được cấp) | duyệt/xuất bản |
| Cấu hình giới hạn tệp / tần suất | không | không | xem | tạo/sửa/xuất bản |

> Với cấu hình nhạy cảm (đặc biệt tham số chống gian lận), TL20 có thể yêu cầu thêm xác thực tăng cường cho thao tác xuất bản.

---

## 7. Mô hình quản trị cấu hình và vòng đời cấu hình

## 7.1 Hai mô hình cấu hình cần hỗ trợ

### Mô hình 1 — Bản ghi cấu hình trực tiếp (dạng trực tiếp)
Phù hợp cho:
- ngân hàng hiển thị
- ví USDT hiển thị
- danh sách quốc gia hỗ trợ
- thông báo nội dung không ảnh hưởng tài chính đã chốt

Đặc điểm:
- sửa trực tiếp trên bản ghi
- có nhật ký thay đổi
- dùng cờ bật/tắt
- có thể có thời gian hiệu lực

### Mô hình 2 — Cấu hình phiên bản hóa (dạng phiên bản hóa)
Bắt buộc cho cấu hình ảnh hưởng tính toán/tài chính:
- giá theo lượt
- khuyến mãi nạp
- ngưỡng rút
- tham số chống gian lận
- lịch chốt và dữ liệu đến trễ
- tham số tổng hợp/đối soát

Đặc điểm:
- tạo phiên bản mới
- duyệt trước khi xuất bản (nếu cấu hình thuộc danh mục nhạy cảm)
- có thời điểm hiệu lực
- không sửa phiên bản đã hết hiệu lực hoặc đã được dùng để chốt (trừ đánh dấu vô hiệu cho tương lai)
- hỗ trợ hoàn tác bằng cách xuất bản lại phiên bản cũ hoặc tạo phiên bản mới tương đương

## 7.2 Trạng thái vòng đời cấu hình phiên bản hóa (đề xuất)

TL14 chưa khóa trạng thái cấu hình, TL17 chuẩn hóa bộ tối thiểu cho lớp vận hành (mã kỹ thuật cụ thể sẽ cập nhật TL14 khi cần):

- **Nháp**
- **Chờ duyệt**
- **Đã duyệt**
- **Đã xuất bản**
- **Hết hiệu lực**
- **Đã hủy**
- **Bị từ chối**

### Quy tắc tối thiểu
- Không xuất bản trực tiếp từ trạng thái **Nháp** với cấu hình nhạy cảm nếu chính sách yêu cầu duyệt.
- Chỉ **R30** mới được duyệt/xuất bản.
- Bản ghi đã **Đã xuất bản** nhưng còn hiệu lực chỉ được thay bằng phiên bản mới; không sửa tay nội dung gây hồi tố.

## 7.3 Các trường truy vết bắt buộc cho cấu hình phiên bản hóa

- mã cấu hình
- nhóm cấu hình
- phiên bản
- trạng thái vòng đời
- dữ liệu cấu hình
- lý do thay đổi
- người tạo
- người duyệt
- người xuất bản
- thời điểm tạo
- thời điểm duyệt
- thời điểm xuất bản
- thời điểm hiệu lực từ
- thời điểm hiệu lực đến
- tham chiếu phiên bản trước
- ghi chú rủi ro / phạm vi ảnh hưởng

---

## 8. Quy tắc hiệu lực, ưu tiên và kế thừa cấu hình

## 8.1 Quy tắc hiệu lực theo thời gian

- Mọi cấu hình có thể ảnh hưởng kết quả tính toán nên có:
  - `thoi_diem_hieu_luc_tu`
  - `thoi_diem_hieu_luc_den` (nếu có)
- Nếu không có thời điểm kết thúc, cấu hình hiệu lực đến khi bị thay thế hoặc tắt.
- Không cho phép hai cấu hình **cùng phạm vi + cùng loại + cùng ưu tiên** chồng thời gian hiệu lực gây mơ hồ.

## 8.2 Quy tắc ưu tiên áp dụng (thứ tự ưu tiên áp dụng)

Khi có nhiều cấu hình cùng loại cùng có hiệu lực, áp dụng theo thứ tự:

1. **Phạm vi cụ thể hơn** thắng phạm vi tổng quát hơn  
   (ví dụ: theo quốc gia thắng toàn hệ thống)
2. **Ưu tiên cao hơn** thắng ưu tiên thấp hơn
3. **Thời điểm hiệu lực gần hơn** (phiên bản mới hơn) thắng nếu vẫn hòa
4. Nếu vẫn hòa → **lỗi cấu hình**, không tự chọn ngẫu nhiên

### Ví dụ áp dụng cho giá theo lượt
- Giá theo quốc gia VN có hiệu lực và ưu tiên 10
- Giá toàn hệ thống có hiệu lực và ưu tiên 1  
→ chiến dịch nhắm VN dùng giá theo quốc gia VN.

## 8.3 Cấu hình chụp nhanh (bản chụp cấu hình) tại thời điểm nghiệp vụ

Bắt buộc chụp cấu hình hoặc tham chiếu cấu hình cho các điểm sau:

- **Hóa đơn nạp tiền**: chụp cấu hình tài khoản ngân hàng / ví USDT hiển thị tại thời điểm tạo hóa đơn (TL13 đã có `du_lieu_cau_hinh_chup`)
- **Yêu cầu rút tiền**: chụp thông tin nhận tiền của người dùng tại thời điểm tạo yêu cầu
- **Sự kiện doanh thu nhà xuất bản**: lưu `ma_cau_hinh_gia_ap_dung`
- **Sự kiện chiến dịch tính phí**: lưu tham chiếu đơn giá / cấu hình áp dụng
- **Đối soát chốt kỳ**: lưu mã phiên bản cấu hình chống gian lận / lịch chốt liên quan (ở bảng nhật ký đối soát hoặc nhật ký xử lý)

---

## 9. Đặc tả từng nhóm cấu hình trọng yếu

## 9.1 Cấu hình giá theo lượt

### 9.1.1 Mục đích
Quản lý đơn giá áp dụng cho:
- chi phí phía khách hàng mua chiến dịch
- doanh thu phía nhà xuất bản

Bám bảng `cau_hinh_gia_theo_luot` trong TL13.

### 9.1.2 Trường cốt lõi (tham chiếu TL13)
- `loai_ap_dung`
- `pham_vi`
- `du_lieu_pham_vi`
- `don_vi_tien`
- `muc_gia`
- `trang_thai`
- `thoi_diem_hieu_luc_tu`
- `thoi_diem_hieu_luc_den`
- `thu_tu_uu_tien`

### 9.1.3 Quy tắc bắt buộc
- `muc_gia` không âm
- không chồng chéo gây mơ hồ theo mục 8
- chỉ dùng cấu hình ở trạng thái hoạt động và trong hiệu lực
- thay đổi giá chỉ áp dụng cho sự kiện phát sinh sau thời điểm hiệu lực (trừ khi có quy trình điều chỉnh riêng)
- mỗi sự kiện tính tiền phải lưu tham chiếu cấu hình giá áp dụng

### 9.1.4 Ràng buộc vận hành
- Khi xuất bản giá mới, hệ thống phải:
  - làm mới bộ nhớ đệm cấu hình
  - ghi nhật ký thay đổi
  - không làm gián đoạn xử lý sự kiện
- Nếu giá bị cấu hình sai gây lỗi áp dụng:
  - chặn xuất bản nếu phát hiện được
  - hoặc chuyển cảnh báo cho R30 và tạm dùng cấu hình trước (nếu chính sách cho phép)

## 9.2 Cấu hình ngưỡng rút tiền

> TL13 hiện khóa bảng cho yêu cầu rút và hồ sơ nhận tiền; TL17 bổ sung **nhóm cấu hình ngưỡng rút** ở lớp tham số vận hành. Nếu TL13 chưa có bảng riêng, sẽ bổ sung ở vòng cập nhật TL13/TL24.

### 9.2.1 Nội dung cấu hình tối thiểu
- ngưỡng rút tối thiểu theo đơn vị tiền
- ngưỡng rút tối đa mỗi yêu cầu (nếu áp dụng)
- số lần rút tối đa trong ngày
- số lần rút tối đa trong tuần
- yêu cầu xác minh bổ sung với khoản rút lớn
- thời gian chờ tối thiểu giữa hai yêu cầu rút
- danh sách phương thức rút được bật (ngân hàng, USDT)

### 9.2.2 Quy tắc áp dụng
- Kiểm tra khi tạo yêu cầu rút (TL09)
- Nếu thay đổi ngưỡng sau khi yêu cầu đã tạo:
  - không ảnh hưởng yêu cầu đang chờ xử lý trừ khi có chính sách khóa lại kiểm tra
- Các ngưỡng nhạy cảm phải có duyệt trước khi xuất bản

## 9.3 Cấu hình khuyến mãi nạp tiền

Bám bảng `cau_hinh_khuyen_mai_nap` trong TL13.

### 9.3.1 Nội dung cấu hình
- tên chương trình
- loại áp dụng (`theo_nguong_phan_tram`, `theo_nguong_tien_co_dinh`)
- ngưỡng tối thiểu
- đơn vị tiền
- tỷ lệ tăng thêm hoặc số tiền tăng thêm
- trạng thái
- thời gian hiệu lực
- ưu tiên

### 9.3.2 Quy tắc áp dụng
- Chỉ áp dụng khi hóa đơn nạp được duyệt thành công
- Chụp cấu hình khuyến mãi đã áp dụng vào nhật ký/bút toán hoặc bản ghi hóa đơn
- Nếu có nhiều chương trình cùng áp dụng:
  - mặc định **không cộng dồn** trừ khi bật cấu hình “cho phép cộng dồn”
  - nếu không cộng dồn, chọn chương trình theo ưu tiên cao nhất
- Không hồi tố khuyến mãi cho hóa đơn đã duyệt trước thời gian hiệu lực

### 9.3.3 Quy tắc hiển thị
- Chỉ hiển thị chương trình đang hoạt động và còn hiệu lực
- Hiển thị song ngữ Việt/Anh
- Trường hợp nhiều đơn vị tiền, hiển thị theo đơn vị tiền hóa đơn hoặc theo cấu hình màn hình

## 9.4 Cấu hình tài khoản ngân hàng hệ thống (nạp thủ công)

Bám bảng `cau_hinh_ngan_hang_he_thong` trong TL13.

### 9.4.1 Mục đích
Hiển thị thông tin nhận chuyển khoản ngân hàng Việt Nam cho người dùng tạo hóa đơn nạp thủ công (TL08).

### 9.4.2 Trường cốt lõi
- `ten_hien_thi`
- `ten_ngan_hang`
- `so_tai_khoan`
- `chu_tai_khoan`
- `noi_dung_mau`
- `ma_tep_anh_ma`
- `thu_tu_hien_thi`
- `dang_hoat_dong`
- `ap_dung_cho_loai_vi`

### 9.4.3 Quy tắc vận hành
- Cho phép nhiều tài khoản ngân hàng cùng hoạt động
- Thứ tự hiển thị theo `thu_tu_hien_thi`
- Cho phép bật/tắt nhanh từng tài khoản khi có sự cố
- Không xóa cứng bản ghi đã từng được tham chiếu trong hóa đơn nạp
- Khi sửa thông tin tài khoản đang dùng:
  - chỉ áp dụng cho hóa đơn tạo mới
  - hóa đơn cũ giữ `du_lieu_cau_hinh_chup` để đối soát

### 9.4.4 Che dữ liệu và hiển thị
- R40 xem nội bộ có thể bị che một phần số tài khoản theo TL03/TL20
- R10 chỉ xem trên màn hình nạp, không có quyền đọc toàn danh sách cấu hình nội bộ qua đường dẫn quản trị

## 9.5 Cấu hình ví USDT hệ thống (nạp/rút thủ công)

Bám bảng `cau_hinh_vi_usdt_he_thong` trong TL13.

### 9.5.1 Nội dung cấu hình
- tên hiển thị
- mạng chuỗi khối (dùng mã danh mục TL14)
- địa chỉ ví
- ảnh mã
- hướng dẫn song ngữ
- trạng thái hoạt động
- thứ tự hiển thị

### 9.5.2 Quy tắc bắt buộc
- Phải hiển thị rõ mạng chuỗi khối
- Hướng dẫn phải có cảnh báo “sai mạng có thể mất tiền”
- Không xóa cứng bản ghi đã được dùng cho nạp/rút
- Nếu đổi địa chỉ ví:
  - tạo bản ghi mới hoặc phiên bản mới (khuyến nghị)
  - bản ghi cũ tắt hoạt động, vẫn lưu để đối soát

### 9.5.3 Ràng buộc hiển thị cho nạp/rút
- Với nạp: hiển thị ví đang bật cho nạp
- Với rút: hiển thị ví hoặc phương thức USDT được phép rút nếu nền tảng hỗ trợ
- Nếu USDT tạm dừng:
  - ẩn khỏi màn hình tạo yêu cầu mới
  - yêu cầu đang chờ xử lý vẫn xử lý theo chính sách TL09/TL19

## 9.6 Cấu hình nội dung thông báo hệ thống (song ngữ)

> TL13 có nhóm nội dung/hỗ trợ; TL17 khóa yêu cầu vận hành cho lớp cấu hình thông báo.

### 9.6.1 Phân loại thông báo
- thông báo hệ thống chung
- thông báo tài chính (nạp/rút)
- thông báo chiến dịch
- thông báo liên kết/nhà xuất bản
- thông báo cảnh báo bảo trì
- thông báo pháp lý/chính sách

### 9.6.2 Trường cấu hình tối thiểu
- mã thông báo
- nhóm thông báo
- tiêu đề tiếng Việt
- tiêu đề tiếng Anh
- nội dung tiếng Việt
- nội dung tiếng Anh
- mức độ ưu tiên hiển thị
- kênh áp dụng (trong ứng dụng, thư điện tử, kênh khác nếu có)
- trạng thái
- thời điểm hiệu lực
- đối tượng áp dụng (R10/R20/tất cả/người dùng cụ thể)
- người tạo / duyệt / xuất bản

### 9.6.3 Quy tắc nội dung
- Không chèn dữ liệu nhạy cảm tĩnh vào mẫu thông báo
- Nội dung có biến động phải dùng tham số mẫu an toàn (ví dụ mã hóa đơn, số tiền)
- Bản Việt và bản Anh phải cùng nghĩa; không để một ngôn ngữ thiếu nội dung khi thông báo bật công khai
- Thông báo pháp lý hoặc thay đổi ảnh hưởng tài chính nên có duyệt trước khi xuất bản

## 9.7 Cấu hình chống gian lận và lượt hợp lệ

TL17 không định nghĩa lại logic của TL12; TL17 chỉ khóa **tham số vận hành** dùng trong logic đó.

### 9.7.1 Nhóm tham số chính
- cửa sổ thời gian chống trùng theo địa chỉ mạng
- cửa sổ thời gian chống trùng theo dấu vết thiết bị
- giới hạn số lượt tối đa theo địa chỉ mạng trong khoảng thời gian
- giới hạn số lượt tối đa theo dấu vết thiết bị trong khoảng thời gian
- ngưỡng điểm rủi ro chuyển loại tạm thời
- ngưỡng điểm rủi ro bắt buộc kiểm tra thủ công
- danh sách lý do mặc định để đưa vào kiểm tra thủ công
- cấu hình trọng số điểm rủi ro theo tín hiệu (nếu hệ thống dùng mô hình điểm)

### 9.7.2 Nguyên tắc thay đổi
- Thay đổi tham số chống gian lận có thể ảnh hưởng trực tiếp:
  - số lượt hợp lệ
  - chi phí chiến dịch
  - doanh thu nhà xuất bản
- Do đó bắt buộc:
  - phiên bản hóa
  - duyệt trước khi xuất bản
  - ghi phạm vi ảnh hưởng dự kiến
  - theo dõi sau phát hành (liên hệ TL18)

### 9.7.3 Quy tắc không hồi tố
- Tham số mới chỉ áp dụng cho đánh giá mới sau thời điểm hiệu lực
- Muốn áp dụng lại cho dữ liệu quá khứ phải đi qua quy trình xử lý lại/điều chỉnh của TL16 và có quyền R30

## 9.8 Cấu hình xử lý sự kiện, tổng hợp và đối soát (TL16)

### 9.8.1 Nhóm lịch chạy
- chu kỳ tổng hợp gần thực (ví dụ theo phút)
- chu kỳ chốt đối soát theo ngày
- thời điểm chốt ngày theo múi giờ hệ thống
- lịch xử lý lại hàng lỗi
- lịch dọn dẹp dữ liệu tạm

### 9.8.2 Nhóm tham số xử lý
- số lần thử lại tối đa cho từng bước
- khoảng chờ giữa các lần thử lại
- kích thước lô xử lý tối đa
- ngưỡng chuyển hàng lỗi
- thời gian chờ khóa công việc
- chiến lược chống chạy trùng công việc
- cửa sổ chấp nhận dữ liệu đến trễ
- chính sách xử lý quyết định kiểm tra thủ công đến trễ

### 9.8.3 Nguyên tắc xuất bản
- Thay đổi lịch chốt và cửa sổ dữ liệu đến trễ phải được duyệt
- Không đổi tham số đang khiến công việc đang chạy mất khóa hoặc chạy trùng
- Cần đánh dấu “cần khởi động lại tiến trình” nếu có tham số không hỗ trợ tải nóng

## 9.9 Cấu hình giới hạn tải tệp và đầu vào người dùng

Áp dụng cho:
- ảnh chứng từ nạp tiền (TL08)
- bằng chứng xử lý rút (TL09)
- ảnh mã ngân hàng/USDT (quản trị)
- tệp nội dung hướng dẫn (nếu có)

### 9.9.1 Tham số tối thiểu
- loại tệp được phép
- kích thước tối đa mỗi tệp
- số lượng tệp tối đa mỗi yêu cầu
- giới hạn tốc độ tải lên
- quy tắc đặt tên tệp
- thời gian lưu giữ tối thiểu
- chính sách xóa mềm / ẩn tệp

### 9.9.2 Ràng buộc an toàn
- Không cho R40 hoặc R10 tải tệp thực thi
- Kiểm tra loại tệp cả theo phần mở rộng và thông tin thực
- Tệp có liên quan đối soát tài chính không được xóa cứng trước khi hết thời hạn lưu giữ

## 9.10 Cấu hình giới hạn giao diện lập trình và phiên làm việc (tham chiếu TL15/TL20)

### 9.10.1 Tham số tối thiểu
- giới hạn tốc độ gọi theo nhóm đường dẫn
- giới hạn tốc độ theo địa chỉ mạng / người dùng / khóa truy cập
- thời gian hết hạn mã truy cập
- thời gian hết hạn mã làm mới
- số phiên đồng thời tối đa (nếu áp dụng)
- giới hạn phân trang tối đa
- thời gian chờ yêu cầu tối đa cho từng nhóm đường dẫn

### 9.10.2 Nguyên tắc
- Tham số này không thay thế yêu cầu bảo mật TL20
- Thay đổi tham số phải được ghi log và có thể cần thông báo cho đội hỗ trợ nếu ảnh hưởng trải nghiệm đăng nhập

---

## 10. Mô hình dữ liệu và lưu trữ cấu hình

## 10.1 Cấu hình đã có bảng khóa trong TL13 (tham chiếu trực tiếp)

- `cau_hinh_ngan_hang_he_thong`
- `cau_hinh_vi_usdt_he_thong`
- `cau_hinh_khuyen_mai_nap`
- `cau_hinh_gia_theo_luot`

## 10.2 Cấu hình TL17 cần bổ sung bảng (nếu chưa có trong TL13)

Để giảm “đoán cấu hình” trong giai đoạn triển khai, TL17 đề xuất bổ sung (nếu chưa tồn tại trong TL13/TL24):

1. `cau_hinh_tham_so_he_thong`
   - lưu giá trị tham số theo khóa (cặp khóa–giá trị có kiểu dữ liệu)
   - phù hợp cho tham số giới hạn, lịch, ngưỡng vận hành

2. `cau_hinh_tham_so_he_thong_phien_ban`
   - phiên bản hóa nhóm tham số nhạy cảm

3. `nhom_cau_hinh_he_thong`
   - danh mục nhóm cấu hình

4. `lich_su_thay_doi_cau_hinh`
   - nhật ký thay đổi chuẩn hóa (ngoài nhật ký quản trị tổng quát)

5. `cau_hinh_thong_bao_he_thong`
   - nội dung song ngữ + hiệu lực + đối tượng áp dụng

6. `cau_hinh_nguong_rut`
   - nếu muốn tách riêng khỏi bảng tham số chung để dễ truy vết nghiệp vụ

> Nếu đội dev muốn giảm số bảng phiên bản đầu, có thể dùng mô hình `cau_hinh_tham_so_he_thong` + `lich_su_thay_doi_cau_hinh`, nhưng phải đảm bảo truy vết và hiệu lực theo thời gian.

## 10.3 Chuẩn khóa cấu hình (khóa) đề xuất

Để tránh đặt tên tự phát, chuẩn khóa theo mẫu:

- `CFG_<NHOM>_<TEN_THAM_SO>`

Ví dụ:
- `CFG_RUT_TIEN_NGUONG_TOI_THIEU_VND`
- `CFG_NAP_TIEN_SO_TIEN_TOI_THIEU_VND`
- `CFG_GIAN_LAN_CUA_SO_CHONG_TRUNG_GIAY`
- `CFG_GIAN_LAN_NGUONG_DIEM_KIEM_TRA_THU_CONG`
- `CFG_TONG_HOP_CHU_KY_GAN_THUC_PHUT`
- `CFG_DOI_SOAT_CUA_SO_DU_LIEU_DEN_TRE_GIO`
- `CFG_API_GIOI_HAN_PHAN_TRANG_TOI_DA`

## 10.4 Kiểu dữ liệu tham số chuẩn

Mỗi tham số phải khai báo kiểu rõ ràng:
- số nguyên
- số thập phân tiền
- chuỗi
- logic đúng/sai
- danh sách
- mốc thời gian
- khoảng thời gian
- văn bản cấu trúc

Không lưu tất cả dưới dạng chuỗi mà không có kiểu, vì sẽ gây lỗi kiểm tra và khó kiểm thử.

---

## 11. Quy trình thay đổi cấu hình (chuẩn vận hành)

## 11.1 Luồng thay đổi cấu hình chuẩn

1. Tạo yêu cầu thay đổi cấu hình
2. Chọn nhóm cấu hình và phạm vi ảnh hưởng
3. Nhập giá trị mới + lý do thay đổi
4. Kiểm tra hợp lệ tự động
5. Lưu nháp
6. Gửi duyệt (nếu nhóm cấu hình yêu cầu)
7. Duyệt / từ chối
8. Xuất bản với thời điểm hiệu lực
9. Ghi nhật ký thay đổi
10. Làm mới bộ nhớ đệm / phát tín hiệu cấu hình mới
11. Theo dõi sau phát hành
12. Hoàn tác nếu cần

## 11.2 Kiểm tra hợp lệ trước khi lưu / xuất bản

### Kiểm tra cú pháp
- đúng kiểu dữ liệu
- đúng danh mục mã (TL14)
- đủ trường bắt buộc
- định dạng thời gian hợp lệ

### Kiểm tra nghiệp vụ
- ngưỡng tối thiểu không lớn hơn ngưỡng tối đa
- hiệu lực từ không lớn hơn hiệu lực đến
- không chồng chéo cấu hình gây mơ hồ
- không để “vô hiệu hóa toàn bộ” vô tình nếu chưa có cấu hình thay thế
- cấu hình giá theo lượt không âm

### Kiểm tra phụ thuộc
- nếu bật phương thức USDT phải có ít nhất một ví USDT đang hoạt động
- nếu bật nạp ngân hàng phải có ít nhất một tài khoản ngân hàng hoạt động
- nếu thay đổi lịch chốt đối soát phải không xung đột với cửa sổ dữ liệu đến trễ
- nếu giảm ngưỡng giới hạn tệp phải kiểm tra tác động tới quy trình tải chứng từ hiện tại

## 11.3 Chính sách duyệt theo nhóm cấu hình

### Bắt buộc duyệt trước khi xuất bản
- giá theo lượt
- khuyến mãi nạp tiền
- ngưỡng rút tiền
- tham số chống gian lận
- lịch chốt/đối soát
- giới hạn phiên/tốc độ có thể ảnh hưởng diện rộng

### Có thể xuất bản trực tiếp bởi R30 (nếu chính sách cho phép)
- sửa thứ tự hiển thị ngân hàng
- cập nhật nội dung hướng dẫn nhỏ không ảnh hưởng tính toán
- bật/tắt thông báo bảo trì ngắn hạn

> Dù xuất bản trực tiếp, vẫn phải có nhật ký và khả năng hoàn tác.

## 11.4 Hoàn tác cấu hình

### Trường hợp dùng lại phiên bản cũ
Phù hợp khi:
- cấu hình mới gây lỗi ngay sau phát hành
- cần quay lại trạng thái đã biết ổn định

### Trường hợp tạo phiên bản điều chỉnh mới
Phù hợp khi:
- chỉ cần sửa một phần nhỏ
- đã có dữ liệu phát sinh dưới cấu hình mới, cần giữ lịch sử rõ

### Ràng buộc hoàn tác
- Không xóa nhật ký phát hành cũ
- Không chỉnh lại dữ liệu đã chốt nếu không có quy trình điều chỉnh riêng
- Phải ghi lý do hoàn tác và phạm vi ảnh hưởng

---

## 12. Tải nóng cấu hình, bộ nhớ đệm và đồng bộ giữa dịch vụ

## 12.1 Nguyên tắc tải nóng cấu hình

Mỗi tham số phải được phân loại:
- **Tải nóng được**: đổi xong áp dụng ngay
- **Cần làm mới bộ nhớ đệm**: áp dụng sau khi xóa bộ nhớ đệm hoặc phát tín hiệu
- **Cần khởi động lại tiến trình**: không áp dụng ngay được
- **Chỉ áp dụng cho lô xử lý mới**: công việc đang chạy giữ cấu hình cũ đến khi xong

## 12.2 Bộ nhớ đệm cấu hình

Để tránh truy vấn cấu hình quá nhiều, cho phép bộ nhớ đệm theo nhóm:
- giá theo lượt đang hiệu lực
- khuyến mãi nạp đang hiệu lực
- ngân hàng/USDT hiển thị đang hoạt động
- tham số chống gian lận
- lịch xử lý nền

### Ràng buộc bộ nhớ đệm
- bộ nhớ đệm phải có thời gian sống
- hỗ trợ xóa bộ nhớ đệm chủ động khi xuất bản cấu hình
- ghi nhật ký lần làm mới bộ nhớ đệm thất bại
- không dùng bộ nhớ đệm làm nguồn chuẩn duy nhất

## 12.3 Đồng bộ đa dịch vụ

Với kiến trúc có nhiều tiến trình/dịch vụ:
- sau khi xuất bản cấu hình, phát sự kiện nội bộ “cấu hình đã đổi”
- dịch vụ nhận sự kiện và làm mới cấu hình theo nhóm liên quan
- nếu dịch vụ không làm mới được, ghi cảnh báo (TL18)

---

## 13. Cấu hình theo môi trường và tách biệt môi trường

## 13.1 Môi trường tối thiểu
- phát triển
- kiểm thử tích hợp
- tiền sản xuất (nếu có)
- sản xuất

## 13.2 Nguyên tắc tách cấu hình
- Không dùng chung cấu hình tài chính thật giữa môi trường kiểm thử và sản xuất
- Dữ liệu ngân hàng/USDT môi trường kiểm thử phải là dữ liệu giả hoặc dữ liệu nội bộ không dùng thật
- Khóa cấu hình theo môi trường để tránh xuất bản nhầm vào sản xuất

## 13.3 Nhập/xuất cấu hình giữa môi trường
Cho phép xuất/nhập cấu hình nhưng phải:
- bỏ hoặc thay dữ liệu nhạy cảm
- đổi mã định danh theo môi trường nếu cần
- có bước xem trước trước khi nhập
- ghi nhật ký ai nhập, từ đâu, lúc nào

---

## 14. Ràng buộc song ngữ, quốc tế và tiền tệ trong cấu hình

## 14.1 Song ngữ Việt và Anh
Mọi cấu hình hiển thị cho người dùng phải hỗ trợ:
- nhãn tiếng Việt
- nhãn tiếng Anh
- mô tả hoặc hướng dẫn tiếng Việt
- mô tả hoặc hướng dẫn tiếng Anh (nếu có hiển thị công khai)

Không cho xuất bản thông báo hoặc nội dung hiển thị công khai nếu thiếu một ngôn ngữ bắt buộc.

## 14.2 Đơn vị tiền và hiển thị
- Tham số giá / ngưỡng phải có đơn vị tiền rõ ràng
- Không dùng “ngầm hiểu” VND nếu hệ thống hỗ trợ quốc tế
- Nếu có quy đổi, phải lưu tỷ giá tham chiếu ở nơi phù hợp (tham chiếu TL13/TL16), không lưu trong cấu hình giá gốc trừ khi có nhu cầu riêng

## 14.3 Múi giờ
- Cấu hình lịch chạy và hiệu lực phải ghi rõ múi giờ áp dụng
- Mặc định múi giờ hệ thống phải được khóa trong tham số nền tảng
- Giao diện có thể hiển thị theo múi giờ người dùng nhưng xử lý chốt ngày phải theo quy tắc đã công bố

---

## 15. Yêu cầu nhật ký, giám sát và cảnh báo cho cấu hình (đầu vào cho TL18)

## 15.1 Nhật ký thay đổi cấu hình bắt buộc

Mỗi thay đổi cấu hình phải ghi:
- mã thay đổi
- nhóm cấu hình
- khóa / bản ghi cấu hình
- giá trị trước
- giá trị sau
- người thao tác
- người duyệt (nếu có)
- loại thao tác (tạo, sửa, duyệt, xuất bản, hoàn tác, bật/tắt)
- lý do
- thời điểm
- địa chỉ mạng / thiết bị quản trị (nếu chính sách yêu cầu)
- kết quả thành công/thất bại

## 15.2 Chỉ số giám sát tối thiểu
- số lần thay đổi cấu hình theo ngày
- số lần xuất bản thất bại
- độ trễ đồng bộ cấu hình tới các dịch vụ
- số lần phát hiện cấu hình mơ hồ/chồng chéo
- số lần hoàn tác
- số lần lỗi áp dụng cấu hình tại thời gian chạy
- tỷ lệ đọc bộ nhớ đệm cấu hình / đọc nguồn chuẩn

## 15.3 Cảnh báo nên có
- xuất bản cấu hình nhạy cảm ngoài khung giờ cho phép (nếu chính sách quy định)
- thiếu cấu hình bắt buộc (ví dụ không có ngân hàng hoạt động nhưng vẫn bật nạp ngân hàng)
- cấu hình chồng chéo gây mơ hồ
- lịch chốt xung đột cửa sổ dữ liệu đến trễ
- giá theo lượt bằng 0 ngoài chủ đích
- thông báo công khai thiếu một ngôn ngữ

---

## 16. Liên kết với TL15 (giao diện lập trình) và TL04–TL07 (màn hình)

## 16.1 Nguyên tắc với giao diện lập trình TL15
- TL15 phải cung cấp nhóm đường dẫn quản trị cấu hình tách theo:
  - cấu hình tài chính hiển thị
  - cấu hình giá/khuyến mãi
  - cấu hình tham số vận hành
  - cấu hình thông báo
- Các đường dẫn thay đổi cấu hình phải:
  - yêu cầu quyền R30
  - trả mã lỗi chuẩn theo TL14
  - hỗ trợ truy vết thay đổi / xem lịch sử
  - hỗ trợ kiểm tra hợp lệ trước khi xuất bản (nếu thiết kế tách bước)

## 16.2 Nguyên tắc với màn hình quản trị TL06/TL07
Màn hình cấu hình phải có tối thiểu:
- danh sách cấu hình
- lọc theo nhóm / trạng thái / hiệu lực
- xem chi tiết
- tạo/sửa nháp
- so sánh bản trước và bản sau
- gửi duyệt
- duyệt/từ chối
- xuất bản
- hoàn tác
- lịch sử thay đổi
- cảnh báo tác động (nếu cấu hình nhạy cảm)

---

## 17. Kịch bản ngoại lệ và xử lý vận hành

## 17.1 Xuất bản cấu hình thành công nhưng một dịch vụ chưa tải được
- Ghi nhật ký phát hành thành công ở nguồn chuẩn
- Ghi cảnh báo đồng bộ thất bại
- Dịch vụ lỗi tiếp tục thử làm mới cấu hình theo cơ chế thử lại
- Nếu cấu hình thuộc nhóm nhạy cảm:
  - cảnh báo vận hành ngay (TL18)
  - cho phép xác minh trạng thái đồng bộ theo dịch vụ

## 17.2 Cấu hình giá chồng chéo gây mơ hồ
- Chặn lưu/duyệt/xuất bản nếu phát hiện ở bước kiểm tra hợp lệ
- Nếu phát hiện sau khi xuất bản:
  - đánh dấu cảnh báo nghiêm trọng
  - tạm dùng quy tắc ưu tiên an toàn đã công bố
  - yêu cầu R30 xử lý ngay bằng phiên bản mới hoặc hoàn tác

## 17.3 Tắt hết ngân hàng hoạt động trong khi vẫn cho nạp ngân hàng
- Chặn xuất bản cấu hình nếu sẽ tạo trạng thái không vận hành được
- Hoặc tự chuyển “ẩn phương thức nạp ngân hàng” nếu thiết kế hỗ trợ (phải có nhật ký)

## 17.4 Đổi tham số chống gian lận làm số lượt hợp lệ biến động mạnh
- Không tự điều chỉnh hồi tố
- Ghi nhận mốc thời điểm đổi tham số
- Theo dõi chênh lệch trước/sau đổi (TL18)
- Nếu cần xử lý lại dữ liệu quá khứ phải theo quy trình TL16 + TL19 và quyền R30

## 17.5 Hoàn tác cấu hình sau khi đã có dữ liệu phát sinh
- Cho phép hoàn tác để dừng ảnh hưởng tiếp theo
- Dữ liệu phát sinh dưới cấu hình mới vẫn giữ lịch sử
- Điều chỉnh tài chính/thống kê nếu cần phải dùng quy trình điều chỉnh, không sửa trực tiếp cấu hình để “che” lịch sử

---

## 18. Tiêu chí chấp nhận TL17

TL17 được coi là đủ chất lượng để chuyển sang TL18, TL19, TL21, TL22 khi đáp ứng tối thiểu:

1. Có danh mục nhóm cấu hình đầy đủ, không trùng/không mâu thuẫn.
2. Có quy tắc quyền theo vai trò bám TL03.
3. Có quy tắc hiệu lực, ưu tiên, snapshot bám TL08–TL16.
4. Có quy trình thay đổi cấu hình, duyệt, xuất bản, hoàn tác rõ ràng.
5. Có quy định cho các nhóm cấu hình trọng yếu:
   - giá theo lượt
   - ngưỡng rút
   - khuyến mãi nạp
   - ngân hàng
   - ví USDT
   - thông báo song ngữ
   - chống gian lận
   - tổng hợp/đối soát
6. Có ràng buộc đồng bộ đa dịch vụ và bộ nhớ đệm cấu hình.
7. Có yêu cầu nhật ký/giám sát/cảnh báo làm đầu vào cho TL18.
8. Không mâu thuẫn với TL13 (bảng cấu hình) và TL14 (mã chuẩn).

---

## 19. Checklist tự rà soát đồng nhất (đã khóa cho vòng này)

- [x] Dùng đúng vai trò R10, R20, R30, R40 theo TL03
- [x] Không đổi nghĩa các quy trình TL08–TL12
- [x] Không tự tạo logic lượt hợp lệ trái TL12
- [x] Bám bảng cấu hình đã có trong TL13 (`cau_hinh_ngan_hang_he_thong`, `cau_hinh_vi_usdt_he_thong`, `cau_hinh_khuyen_mai_nap`, `cau_hinh_gia_theo_luot`)
- [x] Bám nguyên tắc mã chuẩn và danh mục theo TL14
- [x] Tương thích hướng triển khai giao diện lập trình TL15
- [x] Tương thích tham số xử lý nền và đối soát TL16
- [x] Không mô tả nội dung vượt rào hoặc thao túng hệ thống bên thứ ba

---

## 20. Đầu vào cho các tài liệu tiếp theo

## 20.1 Đầu vào cho TL18 — Đặc tả nhật ký, giám sát và cảnh báo vận hành
TL17 cung cấp:
- danh sách sự kiện thay đổi cấu hình cần log
- chỉ số giám sát liên quan cấu hình
- danh sách cảnh báo cấu hình và đồng bộ cấu hình
- phân loại cấu hình nhạy cảm để tăng mức cảnh báo

## 20.2 Đầu vào cho TL19 — Quy trình vận hành và hỗ trợ khách hàng
TL17 cung cấp:
- quy trình đổi cấu hình / hoàn tác
- cách xử lý ngoại lệ khi cấu hình gây ảnh hưởng vận hành
- quy tắc bật/tắt phương thức nạp/rút
- quy tắc xuất bản thông báo hệ thống song ngữ

## 20.3 Đầu vào cho TL21 — Kế hoạch kiểm thử chấp nhận
TL17 cung cấp:
- tập tham số cần kiểm thử biên
- kịch bản chồng chéo cấu hình
- kịch bản đổi cấu hình và hiệu lực theo thời gian
- kịch bản đồng bộ bộ nhớ đệm và đa dịch vụ

## 20.4 Đầu vào cho TL22 — Kế hoạch triển khai và nghiệm thu
TL17 cung cấp:
- phân loại tham số cần nạp trước khi mở dịch vụ
- danh sách cấu hình bắt buộc theo môi trường
- tiêu chí “cấu hình sẵn sàng vận hành” trước nghiệm thu

---

## 21. Tóm tắt chốt phạm vi vòng này

TL17 đã khóa **lớp cấu hình và tham số vận hành** cho hệ thống theo hướng:

- có **phân loại rõ** nhóm cấu hình,
- có **quyền và vòng đời cấu hình**,
- có **hiệu lực theo thời gian + ưu tiên + snapshot**,
- có **quy trình đổi/duyệt/xuất bản/hoàn tác**,
- có **ràng buộc vận hành đa dịch vụ + bộ nhớ đệm**,
- có **đầu vào đầy đủ** cho TL18, TL19, TL21, TL22.

Tài liệu tiếp theo nên ưu tiên là:

**TL18 — Đặc tả nhật ký, giám sát và cảnh báo vận hành**
