# TL30 — Mẫu đặc tả nhiệm vụ cho trợ lý lập trình theo từng mô-đun

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL30
- **Tên tài liệu:** Mẫu đặc tả nhiệm vụ cho trợ lý lập trình theo từng mô-đun
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22, TL23, TL24, TL25, TL26, TL27, TL28, TL29
- **Tài liệu đầu ra phụ thuộc:** bộ mẫu giao việc cho trợ lý lập trình (máy chủ / giao diện / tác vụ nền / kiểm thử / dữ liệu), quy trình tự kiểm trước bàn giao, mẫu rà soát mã, chuẩn truy vết tài liệu nguồn cho từng nhiệm vụ

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL30 chuẩn hóa cách giao nhiệm vụ cho trợ lý lập trình theo từng mô-đun để:

- giảm lệch giữa các lần sinh mã
- buộc đầu ra bám tài liệu nguồn (TL14, TL15, TL26, TL29 và các tài liệu nghiệp vụ liên quan)
- giảm lỗi “đúng cú pháp nhưng sai nghiệp vụ”
- tăng khả năng kiểm tra, truy vết và bàn giao giữa người quản lý dự án, dev và trợ lý lập trình
- giúp chia việc theo mô-đun rõ ràng, làm từng phần nhưng vẫn đồng nhất toàn hệ thống

## 2.2 Phạm vi TL30

Trong phạm vi:

- mẫu giao việc cho trợ lý lập trình theo loại nhiệm vụ
- quy tắc mô tả đầu vào / đầu ra / tiêu chí chấp nhận
- quy tắc bắt buộc truy vết tài liệu nguồn
- checklist tự kiểm của trợ lý lập trình trước khi trả kết quả
- mẫu rà soát đầu ra do trợ lý lập trình sinh
- quy tắc chia nhỏ nhiệm vụ và trình tự ưu tiên
- mẫu yêu cầu cho các nhóm:
  - máy chủ
  - giao diện
  - tác vụ nền
  - kiểm thử
  - dữ liệu mẫu / dữ liệu kiểm thử
  - nhật ký / giám sát / cảnh báo
  - tài liệu kỹ thuật đi kèm mã

Ngoài phạm vi:

- thay thế đặc tả nghiệp vụ (TL08–TL17)
- thay thế quy ước mã nguồn (TL26)
- thay thế quy chuẩn giao diện (TL29)
- thay thế kế hoạch kiểm thử chấp nhận (TL21)
- sinh mã cụ thể cho từng mô-đun (thuộc thực thi từng nhiệm vụ)

## 2.3 Nguyên tắc giao việc cho trợ lý lập trình

- **Mỗi nhiệm vụ chỉ có một mục tiêu chính rõ ràng.**
- **Một nhiệm vụ phải chỉ rõ tài liệu nguồn bắt buộc.**
- **Không giao việc mơ hồ kiểu “làm giúp toàn bộ mô-đun”.**
- **Luôn chốt tiêu chí chấp nhận trước khi yêu cầu sinh mã.**
- **Bắt buộc yêu cầu trợ lý lập trình tự kiểm và báo cáo phần chưa chắc chắn.**
- **Ưu tiên mô-đun lõi nghiệp vụ trước, tối ưu sau.**
- **Không cho trợ lý lập trình tự suy diễn quy tắc nghiệp vụ ngoài tài liệu nguồn.**

---

## 3. Vai trò của TL30 trong bộ tài liệu

## 3.1 TL30 dùng để làm gì

TL30 là “lớp điều phối giao việc” nằm giữa:
- bộ tài liệu đặc tả (TL02, TL08–TL17, TL20, TL23, TL25, TL26, TL29)
- đội phát triển / người giao việc
- trợ lý lập trình sinh mã và kiểm thử

TL30 giúp biến tài liệu lớn thành các yêu cầu nhỏ, rõ, đo được, có thể giao lặp lại.

## 3.2 Mối liên hệ với các tài liệu quan trọng

- **TL14:** trạng thái, mã lỗi, danh mục mã dùng chung → bắt buộc viện dẫn trong hầu hết mô-đun
- **TL15:** giao diện lập trình và hợp đồng dữ liệu → bắt buộc cho mô-đun máy chủ / giao diện / tác vụ nền
- **TL20:** màn hình và luồng thao tác → bắt buộc cho nhiệm vụ giao diện
- **TL21:** tiêu chí kiểm thử chấp nhận → dùng để viết kiểm thử và kiểm tra đầu ra
- **TL23:** nội dung hiển thị, chính sách, tuân thủ → bắt buộc cho thông điệp hiển thị / nội dung người dùng
- **TL26:** quy ước mã nguồn, cấu trúc kho mã, tiêu chuẩn lập trình → bắt buộc cho mọi nhiệm vụ sinh mã
- **TL29:** quy chuẩn giao diện và thư viện thành phần → bắt buộc cho mọi nhiệm vụ giao diện
- **TL28:** dữ liệu kiểm thử và kịch bản diễn tập → dùng cho nhiệm vụ kiểm thử / dữ liệu mẫu

## 3.3 Quy tắc xử lý mâu thuẫn

Nếu mẫu nhiệm vụ trong TL30 mâu thuẫn tài liệu lõi:
1. Ưu tiên tài liệu nghiệp vụ và dữ liệu (TL08–TL17, TL13)
2. Ưu tiên TL14, TL15
3. Ưu tiên TL20, TL23, TL29
4. Ưu tiên TL26
5. Cập nhật mẫu nhiệm vụ trong TL30 để đồng bộ

---

## 4. Quy trình chuẩn giao một nhiệm vụ cho trợ lý lập trình

## 4.1 Chu trình 7 bước

1. **Chọn mô-đun và phạm vi nhỏ**
2. **Chỉ định tài liệu nguồn bắt buộc**
3. **Mô tả đầu vào / đầu ra mong muốn**
4. **Chốt tiêu chí chấp nhận**
5. **Yêu cầu trợ lý lập trình sinh kết quả**
6. **Yêu cầu trợ lý lập trình tự kiểm + báo cáo rủi ro**
7. **Rà soát, phản hồi, lặp lại vòng sau**

## 4.2 Quy tắc chia nhỏ nhiệm vụ

Một nhiệm vụ được coi là “đủ nhỏ” khi:
- có thể hoàn thành trong một lần làm việc tập trung
- có tiêu chí chấp nhận rõ ràng
- chỉ chạm một nhóm trách nhiệm chính (ví dụ: lớp xử lý máy chủ hoặc màn hình danh sách giao diện)
- dễ kiểm tra kết quả bằng checklist

Không nên giao trong một nhiệm vụ:
- vừa thiết kế dữ liệu + viết máy chủ + viết giao diện + viết kiểm thử tích hợp toàn hệ thống
- nhiều luồng nghiệp vụ nhạy cảm khác nhau chưa có ưu tiên rõ

## 4.3 Quy tắc đầu ra bắt buộc của trợ lý lập trình

Mỗi nhiệm vụ khi trả kết quả phải có:
- phần tóm tắt đã làm
- danh sách tệp đã tạo / sửa
- truy vết tài liệu nguồn đã dùng
- các giả định đã áp dụng
- checklist tự kiểm
- rủi ro / phần chưa chắc chắn
- đề xuất nhiệm vụ kế tiếp

---

## 5. Cấu trúc chuẩn của một nhiệm vụ giao cho trợ lý lập trình

## 5.1 Khung nhiệm vụ chuẩn (dùng chung)

Mọi nhiệm vụ giao cho trợ lý lập trình nên có cấu trúc sau:

1. **Mã nhiệm vụ**
2. **Tên nhiệm vụ**
3. **Mục tiêu**
4. **Phạm vi**
5. **Ngoài phạm vi**
6. **Tài liệu nguồn bắt buộc**
7. **Đầu vào đã có**
8. **Đầu ra yêu cầu**
9. **Ràng buộc kỹ thuật / quy ước**
10. **Tiêu chí chấp nhận**
11. **Yêu cầu tự kiểm**
12. **Định dạng báo cáo kết quả**
13. **Gợi ý nhiệm vụ tiếp theo**

## 5.2 Mẫu biểu điền nhiệm vụ chuẩn (khung tổng quát)

```text
[Mã nhiệm vụ]: <NV-...>

[Tên nhiệm vụ]:
<ngắn gọn, mô tả đúng 1 mục tiêu chính>

[Mục tiêu]:
- ...

[Phạm vi]:
- ...
- ...

[Ngoài phạm vi]:
- ...
- ...

[Tài liệu nguồn bắt buộc]:
- TL...
- TL...
- TL...

[Đầu vào đã có]:
- Tệp / thư mục / mô-đun hiện có:
- Dữ liệu mẫu / dữ liệu kiểm thử:
- Màn hình / giao diện lập trình liên quan:

[Đầu ra yêu cầu]:
- Tệp cần tạo:
- Tệp cần sửa:
- Kết quả chạy / kiểm thử mong muốn:
- Tài liệu ghi chú đi kèm (nếu có):

[Ràng buộc kỹ thuật / quy ước]:
- Bám TL26 (cấu trúc kho mã, quy ước đặt tên, tách lớp)
- Bám TL14 (trạng thái, mã lỗi)
- Bám TL15 (hợp đồng dữ liệu / giao diện lập trình)
- Không tự thêm trường dữ liệu ngoài đặc tả
- Không nhúng nội dung hiển thị trái TL23
- ...

[Tiêu chí chấp nhận]:
- [ ] ...
- [ ] ...
- [ ] ...

[Yêu cầu tự kiểm]:
- Liệt kê các trường hợp đã tự kiểm
- Liệt kê các trường hợp chưa kiểm được
- Nêu giả định nếu thiếu thông tin

[Định dạng báo cáo kết quả]:
1. Tóm tắt đã làm
2. Danh sách tệp thay đổi
3. Truy vết tài liệu nguồn
4. Kết quả tự kiểm
5. Rủi ro / tồn đọng
6. Đề xuất nhiệm vụ tiếp theo
```

---

## 6. Quy chuẩn đặt mã nhiệm vụ và phân loại nhiệm vụ

## 6.1 Mục tiêu của mã nhiệm vụ

Mã nhiệm vụ giúp:
- quản lý thứ tự triển khai
- phân nhóm theo mô-đun
- dễ truy vết trong trao đổi với trợ lý lập trình
- liên kết với kiểm thử, lỗi, yêu cầu thay đổi

## 6.2 Quy ước mã nhiệm vụ đề xuất

```text
NV-<nhom>-<mang>-<so_thu_tu>
```

Trong đó:
- `nhom`: `BE` (máy chủ), `FE` (giao diện), `BG` (tác vụ nền), `KT` (kiểm thử), `DL` (dữ liệu), `GS` (giám sát), `TL` (tài liệu)
- `mang`: mô-đun nghiệp vụ (`NAP`, `RUT`, `CD`, `LK`, `DS`, `CF`, `ND`, `AUTH`, `LOG`, ...)
- `so_thu_tu`: số tăng dần 3 chữ số

Ví dụ:
- `NV-BE-NAP-001`
- `NV-FE-RUT-003`
- `NV-BG-DS-002`
- `NV-KT-LK-004`

## 6.3 Quy tắc đặt tên nhiệm vụ

Tên nhiệm vụ phải:
- mô tả đúng đầu việc
- không quá dài
- có động từ hành động
- tránh từ mơ hồ như “xử lý phần đó”, “làm luồng”, “hoàn thiện”

Ví dụ tốt:
- “Tạo lớp xử lý duyệt nạp tiền thủ công”
- “Xây màn hình danh sách yêu cầu rút cho R30”
- “Viết kiểm thử cho chuyển trạng thái rút tiền”
- “Tạo dữ liệu mẫu cho kịch bản rút treo”

---

## 7. Bộ mẫu nhiệm vụ cho mô-đun máy chủ

## 7.1 Khi dùng mẫu này

Dùng khi giao cho trợ lý lập trình thực hiện:
- lớp xử lý nghiệp vụ
- điểm cuối giao diện lập trình
- xác thực dữ liệu vào / ra
- ánh xạ trạng thái / mã lỗi
- lớp truy cập dữ liệu
- nhật ký kiểm toán ở tầng máy chủ

## 7.2 Mẫu nhiệm vụ máy chủ — Khung chuẩn

```text
[Mã nhiệm vụ]: NV-BE-<mang>-<so>

[Tên nhiệm vụ]:
<ví dụ: Tạo điểm cuối giao diện lập trình duyệt nạp tiền thủ công>

[Mục tiêu]:
- Xây dựng / cập nhật mô-đun máy chủ cho <nghiệp vụ cụ thể>.
- Bảo đảm bám trạng thái và mã lỗi chuẩn theo TL14.
- Bảo đảm dữ liệu vào/ra đúng hợp đồng theo TL15.

[Phạm vi]:
- Tạo / sửa lớp nhận yêu cầu
- Tạo / sửa lớp xử lý nghiệp vụ
- Ánh xạ lỗi nghiệp vụ → mã lỗi chuẩn
- Ghi nhật ký kiểm toán cho thao tác nhạy cảm
- Trả phản hồi đúng cấu trúc

[Ngoài phạm vi]:
- Giao diện người dùng
- Tác vụ nền không đồng bộ (nếu chưa giao)
- Tối ưu hiệu năng nâng cao
- Thay đổi cấu trúc dữ liệu ngoài yêu cầu

[Tài liệu nguồn bắt buộc]:
- TL08/TL09/TL10/TL11/TL16 (tùy nghiệp vụ)
- TL14
- TL15
- TL13 (nếu liên quan dữ liệu tài chính / sổ cái)
- TL19 (an toàn thao tác / che dữ liệu)
- TL26

[Đầu vào đã có]:
- Cấu trúc thư mục máy chủ hiện tại
- Mô-đun xác thực dùng chung
- Bộ mã lỗi dùng chung
- Bảng dữ liệu liên quan (tham chiếu TL13)

[Đầu ra yêu cầu]:
- Tệp lớp nhận yêu cầu / lớp xử lý / lớp dữ liệu được tạo hoặc cập nhật
- Tệp kiểm thử đơn vị tối thiểu (nếu có trong nhiệm vụ)
- Ghi chú ánh xạ trạng thái và mã lỗi
- Danh sách tình huống lỗi đã xử lý

[Ràng buộc kỹ thuật / quy ước]:
- Không bỏ qua kiểm tra trạng thái hiện tại trước chuyển trạng thái
- Không trả chuỗi trạng thái tự tạo ngoài TL14
- Không tự thêm trường phản hồi ngoài TL15
- Bắt buộc ghi nhật ký kiểm toán cho thao tác nhạy cảm
- Tách lớp rõ: nhận yêu cầu / xử lý nghiệp vụ / truy cập dữ liệu
- Không viết logic nghiệp vụ trong lớp nhận yêu cầu

[Tiêu chí chấp nhận]:
- [ ] Phản hồi đúng cấu trúc theo TL15
- [ ] Ánh xạ trạng thái và mã lỗi đúng TL14
- [ ] Kiểm tra quyền / trạng thái trước thao tác
- [ ] Có nhật ký kiểm toán cho thao tác nhạy cảm
- [ ] Không lộ dữ liệu nhạy cảm trái TL19
- [ ] Mã bám quy ước TL26

[Yêu cầu tự kiểm]:
- Tự kiểm đường đi thành công
- Tự kiểm ít nhất 3 lỗi nghiệp vụ chính
- Tự kiểm lỗi trạng thái không hợp lệ
- Nêu trường hợp chưa kiểm được và lý do

[Định dạng báo cáo kết quả]:
1. Tóm tắt mô-đun đã tạo / sửa
2. Danh sách tệp thay đổi
3. Trạng thái / mã lỗi đã ánh xạ
4. Kết quả tự kiểm
5. Rủi ro / giới hạn
6. Nhiệm vụ tiếp theo đề xuất
```

## 7.3 Mẫu nhiệm vụ máy chủ — Ví dụ điền sẵn (nạp tiền thủ công)

```text
[Mã nhiệm vụ]: NV-BE-NAP-001

[Tên nhiệm vụ]:
Tạo lớp xử lý duyệt và từ chối yêu cầu nạp tiền thủ công

[Mục tiêu]:
- Hiện thực xử lý chuyển trạng thái yêu cầu nạp tiền thủ công cho R30.
- Ghi nhật ký kiểm toán và trả mã lỗi chuẩn.

[Phạm vi]:
- Xử lý duyệt yêu cầu nạp
- Xử lý từ chối yêu cầu nạp
- Kiểm tra trạng thái hiện tại hợp lệ
- Ghi nhận lý do từ chối (nếu có)
- Trả phản hồi đúng hợp đồng dữ liệu

[Ngoài phạm vi]:
- Màn hình giao diện R30
- Tải lên / xem chứng từ
- Tính toán thống kê tổng hợp

[Tài liệu nguồn bắt buộc]:
- TL08
- TL13
- TL14
- TL15
- TL19
- TL26

[Đầu vào đã có]:
- Bảng yêu cầu nạp
- Bảng nhật ký kiểm toán
- Hệ thống xác thực vai trò cơ bản

[Đầu ra yêu cầu]:
- Lớp xử lý duyệt/từ chối nạp
- Điểm cuối giao diện lập trình tương ứng
- Kiểm thử đơn vị cho các tình huống chính
- Ghi chú ánh xạ mã lỗi

[Ràng buộc kỹ thuật / quy ước]:
- Chỉ cho phép chuyển trạng thái theo TL08 và TL14
- Bắt buộc kiểm tra quyền R30 trước thao tác
- Bắt buộc ghi người thao tác, thời điểm, hành động, kết quả
- Không cập nhật số dư trực tiếp nếu luồng quy định qua lớp/bút toán khác

[Tiêu chí chấp nhận]:
- [ ] Duyệt thành công cập nhật đúng trạng thái và nhật ký
- [ ] Từ chối thành công lưu lý do và nhật ký
- [ ] Trạng thái không hợp lệ trả mã lỗi chuẩn
- [ ] Không đủ quyền trả mã lỗi chuẩn
- [ ] Phản hồi đúng hợp đồng TL15
- [ ] Mã theo quy ước TL26

[Yêu cầu tự kiểm]:
- Tự kiểm duyệt thành công
- Tự kiểm từ chối thành công
- Tự kiểm trạng thái không hợp lệ
- Tự kiểm không đủ quyền
- Tự kiểm dữ liệu thiếu lý do từ chối (nếu bắt buộc)
```

---

## 8. Bộ mẫu nhiệm vụ cho mô-đun giao diện

## 8.1 Khi dùng mẫu này

Dùng khi giao trợ lý lập trình xây:
- màn hình danh sách / chi tiết / biểu mẫu
- thành phần nghiệp vụ
- hộp thoại xác nhận thao tác nhạy cảm
- bảng dữ liệu, lọc, phân trang
- hiển thị trạng thái, mã lỗi, thông báo
- kết nối với lớp gọi giao diện lập trình

## 8.2 Mẫu nhiệm vụ giao diện — Khung chuẩn

```text
[Mã nhiệm vụ]: NV-FE-<mang>-<so>

[Tên nhiệm vụ]:
<ví dụ: Xây màn hình danh sách yêu cầu rút tiền cho R30>

[Mục tiêu]:
- Xây dựng màn hình / thành phần giao diện bám TL20 và TL29.
- Hiển thị trạng thái, mã lỗi, thông báo đúng TL14 và TL23.

[Phạm vi]:
- Bố cục màn hình
- Bộ lọc / tìm kiếm / phân trang (nếu có)
- Bảng dữ liệu hoặc biểu mẫu
- Trạng thái tải / lỗi / trống
- Hộp thoại xác nhận thao tác (nếu có)
- Kết nối lớp gọi giao diện lập trình (không viết lại hợp đồng dữ liệu)

[Ngoài phạm vi]:
- Xử lý nghiệp vụ máy chủ
- Tối ưu giao diện nâng cao ngoài quy chuẩn
- Chỉnh sửa thư viện thành phần nền (nếu chưa giao riêng)

[Tài liệu nguồn bắt buộc]:
- TL20
- TL29
- TL14
- TL15
- TL23
- TL03 (hiển thị theo quyền)
- TL26

[Đầu vào đã có]:
- Thư viện thành phần dùng chung
- Lớp gọi giao diện lập trình / kiểu dữ liệu hiện có
- Khóa nội dung hiển thị song ngữ hiện có (nếu có)

[Đầu ra yêu cầu]:
- Tệp màn hình / thành phần giao diện
- Tệp cấu hình cột bảng / bộ lọc (nếu tách riêng)
- Tệp kiểm thử giao diện cơ bản (nếu phạm vi yêu cầu)
- Ghi chú các khóa nội dung mới cần thêm (nếu có)

[Ràng buộc kỹ thuật / quy ước]:
- Dùng thư viện thành phần chung theo TL29 trước khi tạo mới
- Không nhúng chuỗi hiển thị trái TL23
- Không tự đặt nhãn trạng thái ngoài ánh xạ TL14
- Bắt buộc có trạng thái tải / lỗi / trống
- Thao tác nhạy cảm phải qua hộp thoại xác nhận chuẩn
- Không gọi giao diện lập trình trực tiếp trong thành phần trình bày (bám TL26)

[Tiêu chí chấp nhận]:
- [ ] Bố cục bám TL20 và TL29
- [ ] Trạng thái / mã lỗi hiển thị đúng TL14, TL23
- [ ] Hỗ trợ tải / lỗi / trống
- [ ] Hộp thoại xác nhận đủ thông tin (nếu có)
- [ ] Ẩn/khóa thao tác theo quyền bám TL03
- [ ] Mã theo cấu trúc và quy ước TL26

[Yêu cầu tự kiểm]:
- Tự kiểm luồng hiển thị dữ liệu bình thường
- Tự kiểm trạng thái trống
- Tự kiểm trạng thái lỗi tải dữ liệu
- Tự kiểm thao tác nhạy cảm và khóa bấm lặp
- Nêu phần chưa kiểm được (nếu thiếu đầu vào máy chủ thật)

[Định dạng báo cáo kết quả]:
1. Màn hình / thành phần đã tạo
2. Tệp thay đổi
3. Thành phần dùng lại từ thư viện chung
4. Trạng thái đã xử lý
5. Khóa nội dung mới (nếu có)
6. Rủi ro / tồn đọng
7. Nhiệm vụ tiếp theo
```

## 8.3 Mẫu nhiệm vụ giao diện — Ví dụ điền sẵn (màn hình danh sách rút tiền R30)

```text
[Mã nhiệm vụ]: NV-FE-RUT-001

[Tên nhiệm vụ]:
Xây màn hình danh sách yêu cầu rút tiền thủ công cho R30

[Mục tiêu]:
- Tạo màn hình danh sách yêu cầu rút cho R30 với bộ lọc trạng thái, thời gian và bảng dữ liệu.
- Hỗ trợ trạng thái tải / lỗi / trống và điều hướng vào màn hình chi tiết.

[Phạm vi]:
- Khung trang, tiêu đề, bộ lọc
- Bảng dữ liệu yêu cầu rút
- Nhãn trạng thái chuẩn
- Phân trang
- Thao tác xem chi tiết
- Thông báo lỗi tải dữ liệu

[Ngoài phạm vi]:
- Màn hình chi tiết rút tiền
- Hộp thoại duyệt / từ chối / hoàn thành
- Xử lý máy chủ

[Tài liệu nguồn bắt buộc]:
- TL09
- TL14
- TL15
- TL20
- TL23
- TL29
- TL26

[Đầu vào đã có]:
- Điểm cuối giao diện lập trình lấy danh sách yêu cầu rút
- Thư viện thành phần bảng, bộ lọc, nhãn trạng thái
- Ánh xạ trạng thái rút tiền

[Đầu ra yêu cầu]:
- Tệp màn hình danh sách R30
- Tệp cấu hình cột và bộ lọc
- Ghi chú khóa nội dung bổ sung (nếu có)

[Ràng buộc kỹ thuật / quy ước]:
- Bảng phải có trạng thái tải / lỗi / trống
- Trạng thái rút dùng nhãn chuẩn theo TL14
- Không hiển thị thao tác vượt quyền
- Giữ điều kiện lọc khi phân trang

[Tiêu chí chấp nhận]:
- [ ] Hiển thị danh sách và phân trang đúng
- [ ] Lọc theo trạng thái và thời gian hoạt động
- [ ] Trạng thái tải / lỗi / trống rõ ràng
- [ ] Nhãn trạng thái đúng ánh xạ chuẩn
- [ ] Điều hướng chi tiết hoạt động
- [ ] Bám quy chuẩn TL29
```

---

## 9. Bộ mẫu nhiệm vụ cho tác vụ nền và xử lý không đồng bộ

## 9.1 Khi dùng mẫu này

Dùng cho:
- tác vụ tổng hợp số liệu
- xử lý hàng đợi
- đối soát / kết chuyển
- công việc nền liên quan trạng thái xử lý
- công việc làm mới / đồng bộ dữ liệu hiển thị

## 9.2 Mẫu nhiệm vụ tác vụ nền — Khung chuẩn

```text
[Mã nhiệm vụ]: NV-BG-<mang>-<so>

[Tên nhiệm vụ]:
<ví dụ: Tạo tác vụ nền tổng hợp số liệu lượt tạm thời>

[Mục tiêu]:
- Xây dựng tác vụ nền phục vụ <mục tiêu cụ thể>, bám TL16 và các tài liệu nghiệp vụ liên quan.
- Bảo đảm trạng thái tác vụ, nhật ký và khả năng truy vết.

[Phạm vi]:
- Tạo / sửa tác vụ nền
- Trạng thái chạy tác vụ
- Ghi nhật ký / mã truy vết
- Xử lý lỗi và thử lại (mức cơ bản nếu phạm vi yêu cầu)
- Cập nhật dữ liệu đích theo quy tắc nghiệp vụ

[Ngoài phạm vi]:
- Giao diện quản trị tác vụ nền (nếu chưa giao)
- Tối ưu lịch chạy nâng cao
- Ứng cứu sự cố hạ tầng

[Tài liệu nguồn bắt buộc]:
- TL16
- TL18
- TL22
- TL14 (nếu có mã trạng thái / lỗi liên quan)
- TL15 (nếu có giao diện lập trình gọi kích hoạt / xem trạng thái)
- TL26

[Đầu vào đã có]:
- Hệ thống thực thi tác vụ nền / hàng đợi
- Bảng trạng thái tác vụ / nhật ký
- Dữ liệu nguồn liên quan

[Đầu ra yêu cầu]:
- Tệp tác vụ nền
- Ghi nhận trạng thái chạy và lỗi
- Kiểm thử / mô phỏng tối thiểu
- Hướng dẫn chạy thử cục bộ (nếu cần)

[Ràng buộc kỹ thuật / quy ước]:
- Không cập nhật dữ liệu đích theo cách phá tính lặp lại an toàn (nếu nhiệm vụ yêu cầu an toàn chạy lại)
- Bắt buộc ghi nhật ký và mã truy vết
- Phân biệt lỗi tạm thời và lỗi dừng tác vụ (nếu phạm vi yêu cầu)
- Không ghi đè dữ liệu đã chốt trái TL16

[Tiêu chí chấp nhận]:
- [ ] Tác vụ chạy được theo đầu vào mẫu
- [ ] Có nhật ký và trạng thái chạy rõ
- [ ] Lỗi được ghi nhận và trả thông tin truy vết
- [ ] Kết quả cập nhật dữ liệu đúng quy tắc
- [ ] Mã bám TL26

[Yêu cầu tự kiểm]:
- Tự kiểm chạy thành công
- Tự kiểm lỗi đầu vào tối thiểu
- Tự kiểm hành vi chạy lặp (nếu áp dụng)
- Nêu giới hạn chưa kiểm được
```

## 9.3 Mẫu nhiệm vụ tác vụ nền — Ví dụ điền sẵn (tổng hợp số liệu tạm thời)

```text
[Mã nhiệm vụ]: NV-BG-DS-001

[Tên nhiệm vụ]:
Tạo tác vụ nền tổng hợp số liệu tạm thời cho bảng thống kê chiến dịch

[Mục tiêu]:
- Tổng hợp số liệu tạm thời phục vụ màn hình thống kê chiến dịch, phân biệt với số liệu đã chốt theo TL16.

[Phạm vi]:
- Đọc dữ liệu nguồn sự kiện / lượt hợp lệ
- Tổng hợp theo khóa yêu cầu
- Ghi dữ liệu tạm thời
- Ghi trạng thái tác vụ và nhật ký lỗi

[Ngoài phạm vi]:
- Đối soát và kết chuyển số liệu đã chốt
- Giao diện biểu đồ thống kê
- Tối ưu hiệu năng rất lớn

[Tài liệu nguồn bắt buộc]:
- TL10
- TL11
- TL16
- TL18
- TL26
```

---

## 10. Bộ mẫu nhiệm vụ cho kiểm thử

## 10.1 Khi dùng mẫu này

Dùng để giao trợ lý lập trình viết:
- kiểm thử đơn vị
- kiểm thử tích hợp mô-đun
- kiểm thử giao diện
- dữ liệu kiểm thử và kịch bản kiểm thử kỹ thuật
- kiểm thử hồi quy cho lỗi đã sửa

## 10.2 Mẫu nhiệm vụ kiểm thử — Khung chuẩn

```text
[Mã nhiệm vụ]: NV-KT-<mang>-<so>

[Tên nhiệm vụ]:
<ví dụ: Viết kiểm thử chuyển trạng thái rút tiền thủ công>

[Mục tiêu]:
- Viết bộ kiểm thử cho <mô-đun / luồng cụ thể> bám TL21 và đặc tả liên quan.

[Phạm vi]:
- Tạo / cập nhật tệp kiểm thử
- Dữ liệu đầu vào kiểm thử
- Các trường hợp thành công / lỗi chính
- Kiểm tra mã lỗi / trạng thái / thông báo (tùy loại kiểm thử)

[Ngoài phạm vi]:
- Sửa logic nghiệp vụ chính (trừ khi được giao riêng)
- Kiểm thử hiệu năng
- Kiểm thử bảo mật chuyên sâu

[Tài liệu nguồn bắt buộc]:
- TL21
- TL14
- TL15 (nếu kiểm thử giao diện lập trình)
- TL28
- TL29 (nếu kiểm thử giao diện)
- TL08–TL17 (tùy luồng)
- TL26

[Đầu vào đã có]:
- Mô-đun đích cần kiểm thử
- Dữ liệu mẫu / bộ dữ liệu TL28
- Môi trường chạy kiểm thử

[Đầu ra yêu cầu]:
- Tệp kiểm thử
- Dữ liệu giả / dữ liệu kiểm thử bổ sung (nếu cần)
- Báo cáo phạm vi trường hợp đã bao phủ
- Danh sách trường hợp chưa bao phủ

[Ràng buộc kỹ thuật / quy ước]:
- Tên ca kiểm thử phản ánh đúng hành vi kiểm
- Có đủ trường hợp thành công và lỗi chính
- Kiểm tra đúng mã lỗi / trạng thái chuẩn theo TL14
- Không viết kiểm thử phụ thuộc thời gian / môi trường thiếu ổn định nếu không kiểm soát được

[Tiêu chí chấp nhận]:
- [ ] Chạy được bộ kiểm thử mới
- [ ] Bao phủ trường hợp thành công và lỗi chính
- [ ] Bám trạng thái / mã lỗi chuẩn
- [ ] Dữ liệu kiểm thử rõ ràng, dễ đọc
- [ ] Mã bám TL26

[Yêu cầu tự kiểm]:
- Báo kết quả chạy kiểm thử
- Nêu trường hợp bỏ qua và lý do
- Nêu rủi ro hồi quy còn lại
```

## 10.3 Mẫu nhiệm vụ kiểm thử — Ví dụ điền sẵn (rút tiền)

```text
[Mã nhiệm vụ]: NV-KT-RUT-001

[Tên nhiệm vụ]:
Viết kiểm thử cho chuyển trạng thái duyệt / từ chối / hoàn thành yêu cầu rút tiền

[Mục tiêu]:
- Bảo đảm mô-đun xử lý rút tiền tuân thủ trạng thái và mã lỗi chuẩn.

[Phạm vi]:
- Kiểm thử duyệt thành công
- Kiểm thử từ chối thành công
- Kiểm thử hoàn thành thành công
- Kiểm thử trạng thái không hợp lệ
- Kiểm thử không đủ quyền
- Kiểm thử dữ liệu thiếu bắt buộc (nếu có)

[Tài liệu nguồn bắt buộc]:
- TL09
- TL14
- TL15
- TL21
- TL28
- TL26
```

---

## 11. Bộ mẫu nhiệm vụ cho dữ liệu mẫu và dữ liệu kiểm thử

## 11.1 Khi dùng mẫu này

Dùng cho nhiệm vụ:
- tạo dữ liệu giả phục vụ phát triển
- tạo bộ dữ liệu kiểm thử kỹ thuật
- tạo dữ liệu đào tạo R30/R40
- tạo dữ liệu tái hiện lỗi
- cập nhật dữ liệu khi thay đổi trạng thái / mã / hợp đồng dữ liệu

## 11.2 Mẫu nhiệm vụ dữ liệu — Khung chuẩn

```text
[Mã nhiệm vụ]: NV-DL-<mang>-<so>

[Tên nhiệm vụ]:
<ví dụ: Tạo dữ liệu kiểm thử cho luồng rút tiền treo>

[Mục tiêu]:
- Tạo / cập nhật bộ dữ liệu phục vụ <mục tiêu cụ thể>, bám TL13, TL14, TL15, TL28.

[Phạm vi]:
- Tệp dữ liệu mẫu / dữ liệu kiểm thử
- Mô tả dữ liệu và cách nạp
- Ánh xạ với kịch bản kiểm thử / đào tạo
- Gắn phiên bản dữ liệu

[Ngoài phạm vi]:
- Sửa logic nghiệp vụ
- Tạo dữ liệu thật từ vận hành thực tế
- Tối ưu dữ liệu khối lượng lớn (nếu chưa yêu cầu)

[Tài liệu nguồn bắt buộc]:
- TL13
- TL14
- TL15
- TL28
- TL26
- (TL08–TL17 tùy nghiệp vụ)

[Đầu vào đã có]:
- Cấu trúc dữ liệu mục tiêu
- Bộ dữ liệu hiện có (nếu cập nhật)
- Kịch bản kiểm thử / đào tạo cần dùng

[Đầu ra yêu cầu]:
- Tệp dữ liệu mới hoặc cập nhật
- Tài liệu mô tả dữ liệu
- Bảng ánh xạ dữ liệu ↔ kịch bản
- Ghi chú khác biệt so với bộ trước

[Ràng buộc kỹ thuật / quy ước]:
- Không dùng dữ liệu thật
- Dùng mã trạng thái / mã lỗi đúng TL14
- Không tạo trường ngoài TL13/TL15
- Tên tệp và vị trí lưu bám TL26/TL28
- Dữ liệu phải tái tạo được

[Tiêu chí chấp nhận]:
- [ ] Dữ liệu nạp được (hoặc đọc được) theo định dạng yêu cầu
- [ ] Bao phủ tình huống mục tiêu
- [ ] Bám trạng thái / mã / cấu trúc chuẩn
- [ ] Có mô tả và ánh xạ kịch bản rõ ràng
- [ ] Không chứa dữ liệu nhạy cảm thật

[Yêu cầu tự kiểm]:
- Báo cách tự kiểm dữ liệu
- Nêu số bản ghi theo nhóm tình huống
- Nêu trường hợp chưa bao phủ
```

---

## 12. Bộ mẫu nhiệm vụ cho nhật ký, giám sát và cảnh báo

## 12.1 Khi dùng mẫu này

Dùng cho:
- hiển thị / ghi nhật ký vận hành
- chuẩn hóa mã truy vết
- cảnh báo ngưỡng
- bảng điều khiển giám sát nội bộ
- kết nối dữ liệu nhật ký với màn hình R30/R40

## 12.2 Mẫu nhiệm vụ giám sát — Khung chuẩn

```text
[Mã nhiệm vụ]: NV-GS-<mang>-<so>

[Tên nhiệm vụ]:
<ví dụ: Bổ sung mã truy vết cho thao tác duyệt rút tiền>

[Mục tiêu]:
- Tăng khả năng truy vết / giám sát cho <luồng cụ thể>, bám TL18 và TL22.

[Phạm vi]:
- Ghi mã truy vết / nhật ký
- Ánh xạ hiển thị trên giao diện (nếu thuộc phạm vi)
- Cảnh báo hoặc chỉ số cơ bản (nếu được giao)

[Ngoài phạm vi]:
- Hạ tầng giám sát toàn hệ thống chuyên sâu
- Phân tích nhật ký nâng cao
- Ứng cứu sự cố

[Tài liệu nguồn bắt buộc]:
- TL18
- TL22
- TL14 (nếu liên quan mã lỗi)
- TL29 (nếu có giao diện hiển thị)
- TL26

[Tiêu chí chấp nhận]:
- [ ] Có mã truy vết / nhật ký theo luồng yêu cầu
- [ ] Ghi nhận được thông tin tối thiểu phục vụ chuyển tuyến
- [ ] Không lộ dữ liệu nhạy cảm trái TL19
- [ ] Bám quy ước TL26
```

---

## 13. Bộ mẫu nhiệm vụ cho tài liệu kỹ thuật đi kèm mã

## 13.1 Khi dùng mẫu này

Dùng cho nhiệm vụ yêu cầu trợ lý lập trình viết thêm:
- tài liệu mô-đun
- hướng dẫn chạy cục bộ
- hướng dẫn cấu hình
- ghi chú tích hợp
- ghi chú giới hạn / giả định kỹ thuật

## 13.2 Mẫu nhiệm vụ tài liệu kỹ thuật — Khung chuẩn

```text
[Mã nhiệm vụ]: NV-TL-<mang>-<so>

[Tên nhiệm vụ]:
<ví dụ: Viết tài liệu mô-đun xử lý duyệt rút tiền>

[Mục tiêu]:
- Tạo tài liệu kỹ thuật ngắn gọn, đủ dùng để dev khác tiếp quản mô-đun.

[Phạm vi]:
- Mô tả mục đích mô-đun
- Luồng vào / ra
- Tệp chính và trách nhiệm
- Cách chạy / kiểm thử cơ bản
- Ràng buộc / giả định / giới hạn

[Ngoài phạm vi]:
- Tài liệu nghiệp vụ tổng thể
- Tài liệu vận hành hạ tầng

[Tài liệu nguồn bắt buộc]:
- TL26
- Tài liệu nghiệp vụ tương ứng
- TL15 (nếu mô-đun có giao diện lập trình)
- TL29 (nếu mô-đun giao diện)
```

---

## 14. Mẫu yêu cầu tự kiểm bắt buộc cho trợ lý lập trình

## 14.1 Mục tiêu

Giảm tình trạng trợ lý lập trình trả kết quả mà không kiểm tra logic hoặc không nêu rõ giới hạn.

## 14.2 Khung yêu cầu tự kiểm chuẩn (dùng chung)

```text
[Yêu cầu tự kiểm bắt buộc]
Trước khi trả kết quả, hãy tự kiểm và báo cáo theo đúng cấu trúc sau:
1. Đã tạo / sửa những tệp nào
2. Đã bám những tài liệu nào (liệt kê cụ thể)
3. Các trường hợp đã tự kiểm (thành công / lỗi)
4. Các ràng buộc đã tuân thủ (TL14, TL15, TL26, TL29...)
5. Những điểm chưa chắc chắn / giả định
6. Những phần chưa làm và vì sao
7. Rủi ro có thể phát sinh ở vòng tích hợp
```

## 14.3 Mẫu yêu cầu tự kiểm theo loại nhiệm vụ

### Với máy chủ
- kiểm tra chuyển trạng thái hợp lệ / không hợp lệ
- kiểm tra quyền
- kiểm tra mã lỗi
- kiểm tra nhật ký kiểm toán

### Với giao diện
- kiểm tra tải / lỗi / trống
- kiểm tra hiển thị trạng thái chuẩn
- kiểm tra hộp thoại xác nhận
- kiểm tra ẩn/khóa thao tác theo quyền

### Với tác vụ nền
- kiểm tra chạy thành công
- kiểm tra lỗi và nhật ký
- kiểm tra chạy lặp (nếu áp dụng)

### Với kiểm thử
- báo số ca kiểm thử mới
- báo phạm vi bao phủ
- báo ca chưa bao phủ

---

## 15. Mẫu rà soát đầu ra do trợ lý lập trình sinh (dùng cho người giao việc / dev chính)

## 15.1 Mục tiêu

Bảo đảm đầu ra của trợ lý lập trình được kiểm tra có hệ thống, tránh tin tưởng mù quáng.

## 15.2 Phiếu rà soát nhanh 10 điểm

- [ ] Nhiệm vụ có đúng phạm vi đã giao không
- [ ] Có bám đúng tài liệu nguồn bắt buộc không
- [ ] Có tự thêm logic nghiệp vụ ngoài đặc tả không
- [ ] Trạng thái và mã lỗi có đúng TL14 không
- [ ] Hợp đồng dữ liệu có đúng TL15 không
- [ ] Mã có đúng quy ước TL26 không
- [ ] Giao diện có bám TL29/TL20/TL23 không (nếu là nhiệm vụ giao diện)
- [ ] Có tự kiểm và báo rủi ro rõ ràng không
- [ ] Có phần chưa làm nhưng không nói rõ không
- [ ] Có thể tách nhiệm vụ tiếp theo rõ ràng không

## 15.3 Phiếu rà soát chi tiết theo loại nhiệm vụ

### Rà soát nhiệm vụ máy chủ
- [ ] Kiểm tra trạng thái trước thao tác
- [ ] Kiểm tra quyền trước thao tác
- [ ] Ánh xạ lỗi chuẩn
- [ ] Có nhật ký kiểm toán
- [ ] Không lộ dữ liệu nhạy cảm
- [ ] Tách lớp hợp lý

### Rà soát nhiệm vụ giao diện
- [ ] Có trạng thái tải / lỗi / trống
- [ ] Dùng thành phần chung
- [ ] Không nhúng chuỗi hiển thị trái chuẩn
- [ ] Hộp thoại xác nhận đúng quy chuẩn
- [ ] Hiển thị theo quyền

### Rà soát nhiệm vụ tác vụ nền
- [ ] Có trạng thái chạy và lỗi
- [ ] Có nhật ký / mã truy vết
- [ ] Có xử lý lỗi cơ bản
- [ ] Không phá dữ liệu đã chốt

### Rà soát nhiệm vụ kiểm thử
- [ ] Có ca thành công
- [ ] Có ca lỗi chính
- [ ] Kiểm tra mã lỗi / trạng thái đúng chuẩn
- [ ] Dễ đọc, dễ bảo trì

---

## 16. Quy tắc truy vết tài liệu nguồn trong từng nhiệm vụ

## 16.1 Mục tiêu

Mỗi kết quả sinh ra phải trả lời được câu hỏi:
- sinh theo tài liệu nào?
- nếu sai thì sửa ở đâu?
- ai kiểm tra theo tiêu chí nào?

## 16.2 Mẫu bảng truy vết trong nhiệm vụ

```text
[Truy vết tài liệu nguồn]
- TL08 mục ...  → Quy tắc chuyển trạng thái nạp
- TL14 mục ...  → Mã trạng thái / mã lỗi dùng chung
- TL15 mục ...  → Cấu trúc yêu cầu / phản hồi
- TL26 mục ...  → Quy ước đặt tên tệp / tách lớp
- TL29 mục ...  → Hộp thoại xác nhận / bảng dữ liệu (nếu giao diện)
```

## 16.3 Quy tắc tối thiểu

- Mỗi nhiệm vụ phải viện dẫn ít nhất 3 tài liệu nguồn (trừ nhiệm vụ rất nhỏ)
- Nếu có thao tác nhạy cảm: bắt buộc có TL14 + TL15 + TL26 + tài liệu nghiệp vụ liên quan
- Nếu là giao diện: bắt buộc có TL20 + TL23 + TL29 + TL15 + TL14 + TL26
- Nếu là kiểm thử: bắt buộc có TL21 + TL28 + đặc tả liên quan

---

## 17. Chiến lược chia việc theo giai đoạn để giao cho trợ lý lập trình

## 17.1 Giai đoạn 1 — Khung nền và chuẩn dùng chung

Ưu tiên nhiệm vụ:
- khung kho mã theo TL26
- bộ mã trạng thái / mã lỗi dùng chung (bám TL14)
- lớp gọi giao diện lập trình / kiểu dữ liệu cơ sở (bám TL15)
- thư viện thành phần giao diện nền (bám TL29)
- cơ chế nội dung hiển thị và khóa nội dung (bám TL23)

## 17.2 Giai đoạn 2 — Luồng tài chính lõi

Ưu tiên nhiệm vụ:
- nạp tiền thủ công (máy chủ + giao diện + kiểm thử)
- rút tiền thủ công (máy chủ + giao diện + kiểm thử)
- nhật ký kiểm toán và mã truy vết liên quan
- dữ liệu kiểm thử cho các tình huống chuẩn và lỗi chính

## 17.3 Giai đoạn 3 — Chiến dịch, liên kết, số liệu

Ưu tiên nhiệm vụ:
- quản lý chiến dịch
- liên kết rút gọn
- hiển thị trạng thái công khai R01
- tổng hợp số liệu tạm thời / hiển thị thống kê
- hàng kiểm tra thủ công mức giao diện và nhật ký

## 17.4 Giai đoạn 4 — Đối soát, kết chuyển, vận hành nội bộ

Ưu tiên nhiệm vụ:
- tác vụ nền đối soát / kết chuyển
- màn hình giám sát / cảnh báo / nhật ký
- hỗ trợ R30/R40 theo TL27
- dữ liệu diễn tập kỹ thuật theo TL28

## 17.5 Giai đoạn 5 — Hoàn thiện và hồi quy

Ưu tiên nhiệm vụ:
- kiểm thử hồi quy trọng yếu
- chuẩn hóa thông báo / nội dung hiển thị
- dọn mã theo TL26
- tài liệu kỹ thuật bàn giao
- hoàn thiện kịch bản đào tạo và kiểm thử chấp nhận

---

## 18. Thư viện mẫu lệnh giao việc sẵn dùng (có thể sao chép)

## 18.1 Mẫu lệnh giao việc cho máy chủ

```text
Hãy thực hiện nhiệm vụ theo mẫu sau và bám chặt tài liệu nguồn, không tự suy diễn nghiệp vụ.

[Mã nhiệm vụ]: NV-BE-<mang>-<so>
[Tên nhiệm vụ]: <...>

[Mục tiêu]:
- ...

[Phạm vi]:
- ...

[Ngoài phạm vi]:
- ...

[Tài liệu nguồn bắt buộc]:
- ...
- ...
- ...

[Đầu vào đã có]:
- ...

[Đầu ra yêu cầu]:
- ...

[Ràng buộc kỹ thuật / quy ước]:
- Bám TL14, TL15, TL26
- Không tự thêm trạng thái, mã lỗi, trường dữ liệu
- Có nhật ký kiểm toán nếu là thao tác nhạy cảm

[Tiêu chí chấp nhận]:
- [ ] ...
- [ ] ...

[Yêu cầu tự kiểm]:
- Báo cáo theo 7 mục tự kiểm chuẩn trong TL30
```

## 18.2 Mẫu lệnh giao việc cho giao diện

```text
Hãy xây đúng phạm vi giao diện, dùng thành phần chung trước, bám TL20 và TL29, không đổi nghiệp vụ.

[Mã nhiệm vụ]: NV-FE-<mang>-<so>
[Tên nhiệm vụ]: <...>

[Mục tiêu]:
- ...

[Phạm vi]:
- ...

[Tài liệu nguồn bắt buộc]:
- TL20
- TL29
- TL14
- TL15
- TL23
- TL26
- (TL03 nếu có ẩn/khóa thao tác theo quyền)

[Ràng buộc]:
- Có trạng thái tải / lỗi / trống
- Dùng nhãn trạng thái chuẩn
- Thao tác nhạy cảm qua hộp thoại xác nhận chuẩn
- Không nhúng chuỗi hiển thị trái chuẩn

[Tiêu chí chấp nhận]:
- [ ] ...
- [ ] ...

[Yêu cầu tự kiểm]:
- Báo đầy đủ trạng thái đã tự kiểm
```

## 18.3 Mẫu lệnh giao việc cho kiểm thử

```text
Hãy viết kiểm thử cho đúng luồng và mã lỗi chuẩn, không sửa logic nghiệp vụ ngoài phạm vi.

[Mã nhiệm vụ]: NV-KT-<mang>-<so>
[Tên nhiệm vụ]: <...>

[Tài liệu nguồn bắt buộc]:
- TL21
- TL28
- TL14
- TL15 (nếu kiểm thử giao diện lập trình)
- tài liệu nghiệp vụ liên quan
- TL26

[Tiêu chí chấp nhận]:
- [ ] Có ca thành công
- [ ] Có ca lỗi chính
- [ ] Kiểm đúng trạng thái / mã lỗi
- [ ] Báo phạm vi bao phủ và phần chưa bao phủ
```

---

## 19. Mẫu đặc tả nhiệm vụ mẫu theo các mô-đun trọng yếu (điền sẵn, sẵn dùng)

## 19.1 Nhóm nạp tiền thủ công

### NV-BE-NAP-001
- Tạo lớp xử lý duyệt / từ chối yêu cầu nạp (máy chủ)

### NV-FE-NAP-001
- Xây màn hình danh sách yêu cầu nạp cho R30

### NV-FE-NAP-002
- Xây màn hình chi tiết yêu cầu nạp + hộp thoại duyệt / từ chối

### NV-KT-NAP-001
- Viết kiểm thử chuyển trạng thái nạp và mã lỗi

### NV-DL-NAP-001
- Tạo dữ liệu kiểm thử nạp tiền (thành công / từ chối / lỗi trạng thái)

## 19.2 Nhóm rút tiền thủ công

### NV-BE-RUT-001
- Tạo lớp xử lý duyệt / từ chối / hoàn trả / hoàn thành yêu cầu rút

### NV-FE-RUT-001
- Xây màn hình danh sách yêu cầu rút cho R30

### NV-FE-RUT-002
- Xây màn hình chi tiết rút + hộp thoại thao tác nhạy cảm

### NV-KT-RUT-001
- Viết kiểm thử chuyển trạng thái rút và mã lỗi

### NV-DL-RUT-001
- Tạo dữ liệu kiểm thử rút treo / lỗi / xử lý thành công

## 19.3 Nhóm chiến dịch và liên kết

### NV-BE-CD-001
- Tạo xử lý duyệt / từ chối chiến dịch

### NV-FE-CD-001
- Xây màn hình danh sách chiến dịch cho R30

### NV-BE-LK-001
- Tạo xử lý khóa / mở khóa liên kết theo quyền

### NV-FE-LK-001
- Xây màn hình quản lý liên kết và trạng thái

### NV-KT-CD-001
- Kiểm thử trạng thái chiến dịch / liên kết

## 19.4 Nhóm số liệu và tác vụ nền

### NV-BG-DS-001
- Tạo tác vụ nền tổng hợp số liệu tạm thời

### NV-BG-DS-002
- Tạo ghi nhật ký và trạng thái tác vụ tổng hợp

### NV-FE-DS-001
- Xây khối hiển thị số liệu tạm thời / đã chốt

### NV-KT-DS-001
- Kiểm thử dữ liệu tạm thời / đã chốt hiển thị đúng

## 19.5 Nhóm đối soát, kết chuyển, giám sát

### NV-BG-DS-010
- Tạo tác vụ chốt đối soát (mức cơ bản)

### NV-BE-DS-011
- Tạo điểm cuối xem trạng thái kỳ đối soát và lịch sử

### NV-FE-DS-010
- Xây màn hình chi tiết kỳ đối soát cho R30

### NV-GS-LOG-001
- Bổ sung mã truy vết cho luồng thao tác nhạy cảm

### NV-KT-DS-010
- Viết kiểm thử chuyển trạng thái kỳ đối soát

---

## 20. Mẫu báo cáo kết quả chuẩn mà trợ lý lập trình phải trả về

## 20.1 Khuôn báo cáo kết quả chuẩn

```text
[1] Tóm tắt đã làm
- ...

[2] Danh sách tệp đã tạo / sửa
- ...
- ...

[3] Truy vết tài liệu nguồn đã dùng
- TL...
- TL...
- ...

[4] Kết quả tự kiểm
- Trường hợp thành công:
- Trường hợp lỗi:
- Phần chưa kiểm được:

[5] Rủi ro / giả định / tồn đọng
- ...

[6] Đề xuất nhiệm vụ tiếp theo
- NV-...: ...
```

## 20.2 Dấu hiệu báo cáo kết quả không đạt

- không liệt kê tệp thay đổi
- không nêu tài liệu nguồn
- nói “đã xong” nhưng không có tự kiểm
- không nêu giả định dù rõ ràng có chỗ thiếu thông tin
- sửa ngoài phạm vi mà không nói
- không đề xuất vòng kế tiếp khiến khó điều phối

---

## 21. Ma trận truy vết TL30 với bộ tài liệu

## 21.1 Truy vết theo chủ đề

- **TL01** → định hướng tổng thể bộ tài liệu và kế hoạch triển khai
- **TL02** → thuật ngữ và yêu cầu nghiệp vụ tổng thể làm nền cho mô tả nhiệm vụ
- **TL03** → phân quyền để giao nhiệm vụ có điều kiện quyền đúng vai trò
- **TL08** → nhiệm vụ nạp tiền thủ công
- **TL09** → nhiệm vụ rút tiền thủ công
- **TL10** → nhiệm vụ chiến dịch
- **TL11** → nhiệm vụ liên kết rút gọn và R01
- **TL12** → nhiệm vụ hàng kiểm tra thủ công / cờ rủi ro (tránh lộ nội bộ)
- **TL13** → nhiệm vụ dữ liệu và mô-đun tài chính / sổ cái
- **TL14** → trạng thái, mã lỗi bắt buộc trong hầu hết nhiệm vụ
- **TL15** → hợp đồng dữ liệu / giao diện lập trình cho máy chủ, giao diện, tác vụ nền
- **TL16** → nhiệm vụ số liệu tạm thời / đã chốt, tác vụ nền, đối soát
- **TL17** → nhiệm vụ cấu hình hiệu lực
- **TL18** → nhiệm vụ nhật ký, giám sát, cảnh báo, mã truy vết
- **TL19** → ràng buộc an toàn hiển thị và dữ liệu nhạy cảm
- **TL20** → nhiệm vụ giao diện màn hình và luồng thao tác
- **TL21** → nhiệm vụ kiểm thử và tiêu chí chấp nhận
- **TL22** → nhiệm vụ liên quan ứng cứu sự cố / chuyển tuyến kỹ thuật
- **TL23** → nhiệm vụ nội dung hiển thị, chính sách, thông điệp
- **TL24** → ưu tiên giai đoạn và bàn giao
- **TL25** → kiến trúc kỹ thuật và phân lớp triển khai
- **TL26** → quy ước mã nguồn và tổ chức kho mã cho mọi nhiệm vụ
- **TL27** → nhiệm vụ hỗ trợ màn hình / nhật ký phục vụ R30, R40
- **TL28** → dữ liệu kiểm thử và diễn tập dùng cho nhiệm vụ kiểm thử / dữ liệu
- **TL29** → quy chuẩn giao diện và thư viện thành phần cho nhiệm vụ giao diện

## 21.2 Truy vết theo loại nhiệm vụ

- **Mẫu nhiệm vụ máy chủ** ↔ TL14, TL15, TL26 + tài liệu nghiệp vụ tương ứng
- **Mẫu nhiệm vụ giao diện** ↔ TL20, TL23, TL29, TL14, TL15, TL26
- **Mẫu nhiệm vụ tác vụ nền** ↔ TL16, TL18, TL22, TL26
- **Mẫu nhiệm vụ kiểm thử** ↔ TL21, TL28, TL14, TL15, TL26
- **Mẫu nhiệm vụ dữ liệu** ↔ TL13, TL14, TL15, TL28, TL26
- **Mẫu nhiệm vụ giám sát / nhật ký** ↔ TL18, TL22, TL29, TL26

---

## 22. Tiêu chí chấp nhận tài liệu TL30

TL30 được xem là đạt khi:

- Có khung chuẩn nhiệm vụ dùng chung, đầy đủ mục tiêu / phạm vi / ràng buộc / tiêu chí chấp nhận
- Có quy tắc đặt mã nhiệm vụ và phân loại nhiệm vụ
- Có mẫu riêng cho các nhóm nhiệm vụ chính:
  - máy chủ
  - giao diện
  - tác vụ nền
  - kiểm thử
  - dữ liệu
  - giám sát / nhật ký
  - tài liệu kỹ thuật
- Có mẫu yêu cầu tự kiểm bắt buộc cho trợ lý lập trình
- Có mẫu rà soát đầu ra cho người giao việc / dev chính
- Có quy tắc truy vết tài liệu nguồn trong từng nhiệm vụ
- Có chiến lược chia việc theo giai đoạn để triển khai thực tế
- Có thư viện mẫu lệnh giao việc sẵn dùng và danh sách nhiệm vụ mẫu theo mô-đun trọng yếu
- Bám nhất quán TL14, TL15, TL26, TL29 và các tài liệu nghiệp vụ liên quan

---

## 23. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không thay thế đặc tả nghiệp vụ lõi (TL08–TL17)
- [x] Bắt buộc viện dẫn TL14, TL15, TL26 trong các mẫu phù hợp
- [x] Bắt buộc viện dẫn TL20, TL23, TL29 cho nhiệm vụ giao diện
- [x] Bắt buộc viện dẫn TL21, TL28 cho nhiệm vụ kiểm thử / dữ liệu
- [x] Có khung nhiệm vụ chuẩn dùng chung và mẫu điền sẵn
- [x] Có mẫu tự kiểm và mẫu rà soát đầu ra
- [x] Có chiến lược chia việc theo giai đoạn
- [x] Có danh sách nhiệm vụ mẫu cho các mô-đun trọng yếu
- [x] Giữ cách viết nhất quán với bộ tài liệu trước (mục tiêu, phạm vi, truy vết, checklist, tiêu chí chấp nhận)
- [x] Hỗ trợ trực tiếp cho dev và trợ lý lập trình triển khai thực tế

---

## 24. Gợi ý tài liệu / phụ lục tiếp theo (nếu cần mở rộng sau TL30)

Sau TL30, bộ tài liệu đã đủ mạnh để triển khai và giao việc theo vòng. Nếu cần mở rộng thêm cho hiệu quả thực thi, có thể bổ sung **phụ lục** (không bắt buộc ngay):

### PL01 — Bảng điều phối nhiệm vụ triển khai phiên bản đầu
- danh sách nhiệm vụ NV-...
- độ ưu tiên
- phụ thuộc
- người phụ trách
- trạng thái
- kết quả rà soát

### PL02 — Bộ mẫu nhiệm vụ đã điền sẵn cho 20 nhiệm vụ đầu tiên
- dùng trực tiếp để giao cho trợ lý lập trình theo từng vòng

### PL03 — Bộ mẫu phản hồi rà soát đầu ra trợ lý lập trình
- mẫu phản hồi “chấp nhận”
- mẫu phản hồi “cần sửa”
- mẫu phản hồi “sai phạm vi / sai đặc tả”

---

## 25. Ghi chú cuối tài liệu

- TL30 là tài liệu thực thi để chuyển bộ đặc tả lớn thành các nhiệm vụ nhỏ, rõ, đo được và dễ giao cho trợ lý lập trình.
- TL30 không thay thế vai trò của dev chính trong việc rà soát và quyết định kỹ thuật cuối cùng; TL30 chỉ chuẩn hóa cách giao việc và kiểm tra đầu ra.
- Khi dự án bắt đầu triển khai thực tế, nên dùng TL30 cùng TL24 (lộ trình bàn giao), TL26 (quy ước mã), TL29 (quy chuẩn giao diện) và TL27 (hướng dẫn vận hành) để tạo vòng làm việc ổn định: **giao nhiệm vụ → sinh mã → tự kiểm → rà soát → tích hợp → kiểm thử → bàn giao**.
