# TL29 — Quy chuẩn giao diện chi tiết và thư viện thành phần dùng chung

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL29
- **Tên tài liệu:** Quy chuẩn giao diện chi tiết và thư viện thành phần dùng chung
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22, TL23, TL24, TL25, TL26, TL28
- **Tài liệu đầu ra phụ thuộc:** thư viện thành phần giao diện, bộ mã dùng chung giao diện, hướng dẫn triển khai màn hình, quy chuẩn hiển thị trạng thái/mã lỗi, tiêu chuẩn kiểm thử giao diện, mẫu màn hình cho trợ lý lập trình và đội giao diện

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL29 chốt quy chuẩn giao diện chi tiết để đội giao diện và trợ lý lập trình triển khai đồng nhất toàn bộ màn hình R10, R20, R30, R40 và trang công khai liên quan, bảo đảm:

- bố cục, điều hướng, hành vi hiển thị nhất quán
- trạng thái nghiệp vụ và mã lỗi hiển thị đúng theo TL14, TL23
- thao tác nhạy cảm có xác nhận và cảnh báo đúng theo TL20
- hỗ trợ song ngữ Việt / Anh nhất quán
- giảm lệch khi nhiều người cùng phát triển giao diện
- tăng tốc xây dựng màn hình nhờ thư viện thành phần dùng chung

## 2.2 Phạm vi TL29

Trong phạm vi:

- quy chuẩn bố cục, lưới, khoảng cách, vùng chức năng giao diện
- quy chuẩn hệ thống thành phần giao diện dùng chung
- quy chuẩn biểu mẫu, bảng dữ liệu, lọc, tìm kiếm, phân trang
- quy chuẩn hiển thị trạng thái, nhãn, cảnh báo, lỗi, xác nhận
- quy chuẩn hiển thị số liệu, tiền, thời gian, trạng thái tạm thời / đã chốt
- quy chuẩn điều hướng theo vai trò
- quy chuẩn nội dung hiển thị song ngữ, điều khoản, thông báo theo TL23
- quy chuẩn khả năng tiếp cận cơ bản và hiệu năng giao diện
- quy chuẩn tổ chức thư mục giao diện và cách dùng thư viện thành phần (phần giao diện)
- quy chuẩn kiểm thử giao diện và nghiệm thu hình thức

Ngoài phạm vi:

- thiết kế nhận diện thương hiệu cuối cùng (logo chi tiết, hình minh họa cuối)
- đặc tả nghiệp vụ chi tiết từng luồng (TL08 đến TL12)
- hợp đồng giao diện lập trình chi tiết (TL15)
- kiến trúc máy chủ và triển khai hạ tầng (TL25, TL22)
- mã nguồn cụ thể cho từng màn hình (thuộc triển khai)

## 2.3 Nguyên tắc giao diện

- **Rõ ràng trước đẹp mắt.**
- **Nhất quán trước sáng tạo cục bộ.**
- **Một mẫu thành phần dùng lại thay vì nhiều biến thể tự phát.**
- **Hiển thị đúng trạng thái nghiệp vụ, không “làm đẹp” sai sự thật.**
- **Ưu tiên thao tác an toàn cho luồng tài chính và thao tác nhạy cảm.**
- **Tách nội dung hiển thị khỏi mã để hỗ trợ song ngữ và tuân thủ.**
- **Không để giao diện tự suy luận nghiệp vụ ngoài TL14, TL15, TL16, TL23.**

---

## 3. Mối liên hệ TL29 với TL20, TL23, TL25, TL26

## 3.1 Vai trò của TL29 trong bộ tài liệu

- **TL20**: đặc tả màn hình và luồng thao tác
- **TL23**: điều khoản, chính sách nội bộ, nội dung hiển thị tuân thủ
- **TL25**: kiến trúc kỹ thuật (trong đó chốt hướng giao diện)
- **TL26**: quy ước mã nguồn, cấu trúc giao diện và tiêu chuẩn lập trình
- **TL29**: quy chuẩn hiển thị và thư viện thành phần để hiện thực hóa nhất quán các màn hình

## 3.2 Quy tắc xử lý mâu thuẫn

Nếu có mâu thuẫn:
1. Ưu tiên TL02, TL08 đến TL13 (nghiệp vụ và dữ liệu)
2. Ưu tiên TL14, TL15, TL16 (trạng thái, mã lỗi, hợp đồng, số liệu tạm thời/đã chốt)
3. Ưu tiên TL20, TL23 (màn hình, nội dung hiển thị)
4. Ưu tiên TL25, TL26 (kiến trúc và tiêu chuẩn mã)
5. TL29 phải cập nhật để đồng bộ lại, không giữ quy chuẩn hiển thị sai

---

## 4. Phạm vi áp dụng theo vai trò và khu vực giao diện

## 4.1 Vai trò áp dụng

- **R10**: người mua traffic / quản lý chiến dịch
- **R20**: nhà xuất bản / quản lý liên kết rút gọn / doanh thu
- **R30**: vận hành quản trị (duyệt nạp, rút, chiến dịch, cấu hình theo quyền)
- **R40**: hỗ trợ / tra cứu / xử lý theo quyền hạn được cấp
- **R01**: trang công khai chuyển hướng và trang lỗi công khai (áp dụng phần quy chuẩn công khai)

## 4.2 Khu vực giao diện áp dụng

- trang đăng nhập / xác thực
- khung làm việc sau đăng nhập (điều hướng, tiêu đề trang, vùng nội dung)
- màn hình danh sách
- màn hình chi tiết
- biểu mẫu tạo / sửa
- màn hình duyệt / từ chối / hoàn / hoàn thành
- hộp thoại xác nhận thao tác nhạy cảm
- bảng số liệu / thống kê
- trang lỗi / trạng thái hệ thống
- trang nội dung tuân thủ / điều khoản / xác nhận chấp nhận
- trang công khai R01 (mức hiển thị cơ bản)

---

## 5. Hệ thống lưới, bố cục và khoảng cách

## 5.1 Quy chuẩn khung trang tổng thể (sau đăng nhập)

Mỗi trang sau đăng nhập dùng bố cục 4 vùng chuẩn:

1. **Vùng điều hướng chính**
2. **Vùng tiêu đề trang + thao tác nhanh**
3. **Vùng bộ lọc / cảnh báo ngữ cảnh / trạng thái trang**
4. **Vùng nội dung chính** (bảng, biểu mẫu, thẻ số liệu, nhật ký, chi tiết)

Mục tiêu:
- người dùng luôn định vị được “đang ở đâu”
- biết trạng thái dữ liệu (đang tải / lỗi / đã cập nhật)
- thao tác chính nằm ở vị trí ổn định

## 5.2 Quy chuẩn lưới

TL29 chốt lưới giao diện theo hướng linh hoạt nhưng thống nhất:

- **Lưới cơ sở:** 12 cột cho màn hình lớn
- **Khoảng cách cơ sở:** theo bội số nhất quán (ví dụ 4/8 đơn vị)
- **Bề rộng vùng nội dung:** giới hạn tối đa để tránh đọc khó trên màn hình quá rộng
- **Bố cục biểu mẫu:** ưu tiên 1 cột với màn hình hẹp, 2 cột với màn hình đủ rộng cho biểu mẫu dài

### Quy tắc áp dụng
- Không trộn nhiều hệ khoảng cách trong cùng màn hình
- Không dùng canh tay theo pixel rời rạc cho từng thành phần
- Thành phần cùng cấp phải thẳng hàng theo lưới

## 5.3 Quy chuẩn khoảng cách

Áp dụng nhất quán cho:
- khoảng cách giữa tiêu đề trang và nội dung
- khoảng cách giữa các khối chức năng
- khoảng cách trong thẻ, bảng, biểu mẫu
- khoảng cách giữa nhãn và trường nhập

Nguyên tắc:
- khoảng cách lớn hơn cho khối khác nhóm chức năng
- khoảng cách nhỏ hơn cho phần tử cùng nhóm
- không tạo cảm giác “nén chặt” ở màn hình thao tác tài chính / quản trị

## 5.4 Quy chuẩn bố cục theo loại màn hình

### Màn hình danh sách
- tiêu đề + bộ lọc + bảng + phân trang
- thao tác hàng loạt (nếu có) nằm cùng vùng với bảng, không tách xa
- tổng số bản ghi và trạng thái lọc hiển thị rõ

### Màn hình chi tiết
- khối thông tin tóm tắt đầu trang
- thẻ trạng thái nổi bật
- các tab hoặc khối nội dung phân nhóm
- nhật ký / lịch sử xử lý đặt ở nửa sau trang hoặc tab riêng

### Màn hình biểu mẫu
- nhóm trường theo chủ đề
- trường bắt buộc và mô tả hỗ trợ rõ
- nút hành động chính / phụ đặt ổn định cuối biểu mẫu
- thao tác hủy không đặt quá gần thao tác xác nhận với kiểu hiển thị giống nhau

---

## 6. Hệ thống thiết kế giao diện dùng chung

## 6.1 Phạm vi thư viện thành phần dùng chung

Thư viện thành phần dùng chung là lớp chuẩn để đội giao diện và trợ lý lập trình triển khai nhanh, thống nhất và giảm lỗi. Gồm:

- thành phần nền (nút, nhập liệu, nhãn, thẻ, bảng, phân trang…)
- thành phần nghiệp vụ dùng chung (thẻ trạng thái, dòng thời gian xử lý, khối xác nhận thao tác nhạy cảm…)
- mẫu bố cục (khung trang, khối bộ lọc, khối hành động)
- hàm hiển thị chuẩn (tiền, thời gian, mã trạng thái, thông báo lỗi)
- mẫu nội dung hiển thị song ngữ

## 6.2 Phân lớp thư viện thành phần

### Lớp 1 — Thành phần nền
- nút
- ô nhập văn bản
- ô chọn
- hộp đánh dấu
- chuyển trạng thái
- vùng tải tệp
- nhãn
- biểu tượng
- thẻ
- bảng
- thanh phân trang
- hộp thoại
- thông báo

### Lớp 2 — Thành phần tổ hợp dùng chung
- thanh bộ lọc danh sách
- khối hành động đầu trang
- thẻ thông tin tóm tắt
- bảng có chọn dòng
- khối hiển thị trạng thái và lịch sử xử lý
- hộp thoại xác nhận thao tác nhạy cảm
- khối tải lên và xem tệp bằng chứng
- khối hiển thị số liệu tạm thời / đã chốt

### Lớp 3 — Thành phần nghiệp vụ tái sử dụng
- thẻ trạng thái nạp tiền thủ công
- thẻ trạng thái rút tiền thủ công
- thẻ trạng thái chiến dịch
- thẻ trạng thái liên kết
- khối hiển thị ví và sổ cái tóm tắt
- bảng sự kiện / lượt hợp lệ / cờ rủi ro
- khối trạng thái kỳ đối soát và kết chuyển
- khối nội dung tuân thủ song ngữ và lịch sử xuất bản

## 6.3 Nguyên tắc mở rộng thư viện

Chỉ thêm thành phần mới khi:
- không ghép hợp lý từ thành phần sẵn có
- có ít nhất 2 màn hình cùng nhu cầu
- đã xác định rõ hành vi, trạng thái, đầu vào / đầu ra giao diện
- có tài liệu mô tả và ví dụ dùng

Không thêm thành phần mới chỉ để:
- đổi tiểu tiết màu sắc cá nhân
- khác tên nhưng hành vi giống thành phần cũ
- phục vụ một trường hợp tạm thời chưa được duyệt

---

## 7. Quy chuẩn hệ thống hiển thị trực quan (màu, chữ, biểu tượng, trạng thái)

## 7.1 Nguyên tắc chung

TL29 không khóa tuyệt đối bộ nhận diện thương hiệu cuối cùng, nhưng khóa **vai trò ngữ nghĩa** của màu, chữ và biểu tượng để không sai ý nghĩa nghiệp vụ.

## 7.2 Màu theo ngữ nghĩa (khóa vai trò, không khóa mã màu cụ thể)

### Nhóm màu bắt buộc
- **Màu chính:** hành động chính, điểm nhấn điều hướng
- **Màu phụ:** thao tác phụ, hỗ trợ nhận diện nhóm
- **Màu thành công:** trạng thái hoàn thành / hợp lệ
- **Màu cảnh báo:** trạng thái cần chú ý / chờ xử lý / có rủi ro
- **Màu lỗi:** thất bại / bị từ chối / không hợp lệ
- **Màu thông tin:** trạng thái trung tính / gợi ý / nhật ký
- **Màu nền và đường viền:** phân tầng nội dung
- **Màu chữ:** tiêu đề, nội dung, chữ phụ, chữ vô hiệu

### Quy tắc bắt buộc
- Không dùng cùng một màu ngữ nghĩa cho hai trạng thái đối nghịch
- Không chỉ dựa vào màu để truyền trạng thái (phải có chữ / biểu tượng)
- Màu trạng thái tài chính và duyệt phải nhất quán giữa R30/R40 và màn hình liên quan

## 7.3 Chữ và cấp bậc chữ

### Cấp bậc chữ tối thiểu
- tiêu đề trang
- tiêu đề khối
- tiêu đề bảng / biểu mẫu
- nội dung chính
- nội dung phụ / mô tả
- chú thích / trạng thái nhỏ

### Quy tắc dùng chữ
- không dùng quá nhiều cỡ chữ trong một trang
- tiêu đề cùng cấp dùng cùng kiểu chữ / độ đậm
- số liệu quan trọng (ví, doanh thu, số liệu đối soát) có kiểu hiển thị nổi bật nhưng không lẫn với tiêu đề trang

## 7.4 Biểu tượng

Biểu tượng dùng để:
- hỗ trợ nhận diện hành động
- hỗ trợ nhận diện trạng thái
- hỗ trợ điều hướng

Quy tắc:
- biểu tượng chỉ là hỗ trợ, không thay thế hoàn toàn nhãn chữ với thao tác quan trọng
- cùng hành động dùng cùng biểu tượng xuyên suốt hệ thống
- biểu tượng thao tác nguy hiểm (xóa, từ chối, khóa) phải đi cùng cảnh báo ngữ nghĩa rõ

## 7.5 Trạng thái thành phần (nền tảng)

Mọi thành phần tương tác phải có mô tả ít nhất các trạng thái:
- mặc định
- rê chuột (nếu có)
- được chọn / đang hoạt động
- đang tải
- lỗi
- vô hiệu hóa
- chỉ đọc (nếu áp dụng)

---

## 8. Quy chuẩn điều hướng và kiến trúc thông tin giao diện

## 8.1 Mục tiêu điều hướng

- dễ học cho người mới
- nhanh thao tác cho người dùng thường xuyên
- giảm nhầm lẫn giữa các khu vực nghiệp vụ có tên gần nhau
- phản ánh phân quyền theo TL03

## 8.2 Điều hướng chính theo nhóm chức năng (không khóa nhãn cuối)

TL29 chốt cấu trúc nhóm chức năng mức cao như sau:

### Nhóm chung
- Bảng điều khiển
- Thông báo / cảnh báo cá nhân (nếu có)
- Hồ sơ tài khoản
- Điều khoản / chính sách / nội dung tuân thủ (theo ngữ cảnh)

### Nhóm R10
- Chiến dịch
- Ngân sách / ví
- Nạp tiền
- Thống kê chiến dịch
- Nhật ký thao tác / lịch sử

### Nhóm R20
- Liên kết rút gọn
- Doanh thu / ví
- Rút tiền
- Thống kê lượt / doanh thu
- Nhật ký thao tác / lịch sử

### Nhóm R30
- Duyệt nạp tiền
- Duyệt rút tiền
- Duyệt chiến dịch
- Quản lý liên kết / trạng thái công khai
- Chống gian lận / kiểm tra thủ công
- Đối soát / kết chuyển
- Cấu hình hệ thống
- Nội dung tuân thủ
- Giám sát / nhật ký / cảnh báo

### Nhóm R40
- Tra cứu nạp/rút/chiến dịch/liên kết
- Hỗ trợ xử lý / ghi chú (nếu có trong phạm vi)
- Nhật ký tra cứu / hỗ trợ theo quyền
- Chuyển tiếp vấn đề cho R30 / vận hành kỹ thuật

## 8.3 Quy tắc hiển thị điều hướng theo quyền

- Chỉ hiển thị mục người dùng có quyền tối thiểu để truy cập
- Nếu người dùng mất quyền trong phiên:
  - ẩn / khóa mục không còn quyền
  - khi truy cập trực tiếp phải hiển thị trang không đủ quyền theo TL23
- Không chỉ ẩn ở giao diện; máy chủ vẫn phải kiểm soát (theo TL26)

## 8.4 Dấu vết điều hướng và ngữ cảnh

Mỗi màn hình nên có:
- tiêu đề trang rõ ràng
- mô tả ngắn (nếu màn hình phức tạp)
- dấu vết điều hướng (nếu màn hình chi tiết sâu)
- trạng thái dữ liệu cập nhật lần cuối (với số liệu / bảng lớn)
- cảnh báo ngữ cảnh nếu dữ liệu là tạm thời / đang xử lý

---

## 9. Quy chuẩn biểu mẫu nhập liệu và xác thực dữ liệu phía giao diện

## 9.1 Mục tiêu

Giảm lỗi nhập liệu, tăng tốc thao tác và giảm yêu cầu hỗ trợ, đồng thời không thay thế kiểm tra ở máy chủ.

## 9.2 Cấu trúc biểu mẫu chuẩn

Mỗi biểu mẫu chuẩn gồm:
1. tiêu đề biểu mẫu / mục tiêu
2. mô tả hoặc điều kiện áp dụng
3. nhóm trường dữ liệu
4. trường bắt buộc / tùy chọn
5. gợi ý định dạng hoặc ví dụ
6. cảnh báo trước thao tác (nếu nhạy cảm)
7. nhóm nút hành động
8. vùng hiển thị lỗi tổng hợp (nếu có nhiều lỗi)

## 9.3 Quy tắc hiển thị trường nhập

- Nhãn trường luôn hiển thị (không chỉ dùng chữ gợi ý trong ô nhập)
- Trường bắt buộc phải có dấu hiệu nhất quán
- Mô tả hỗ trợ đặt ngay gần trường
- Lỗi trường hiển thị ngay tại trường và rõ lý do
- Trường chỉ đọc phải hiển thị khác rõ với trường có thể sửa
- Trường tiền / số lượng / số lượt phải hiển thị đơn vị

## 9.4 Quy tắc xác thực dữ liệu ở giao diện

Giao diện được phép kiểm:
- bắt buộc
- định dạng
- miền giá trị cơ bản
- ràng buộc trực tiếp dễ kiểm (ví dụ giá trị > 0)
- giới hạn kích thước tệp

Giao diện không được tự kết luận:
- quyền thao tác
- trạng thái nghiệp vụ cuối cùng
- tính hợp lệ tài chính / chống gian lận
- đối soát dữ liệu

## 9.5 Quy tắc thao tác nhạy cảm trong biểu mẫu

Áp dụng cho duyệt nạp, duyệt rút, từ chối, hoàn trả, chốt đối soát, kết chuyển, thay đổi cấu hình, xuất bản nội dung:
- cần hộp thoại xác nhận
- hiển thị rõ đối tượng bị tác động
- hiển thị trạng thái hiện tại và trạng thái dự kiến
- yêu cầu nhập lý do nếu tài liệu nghiệp vụ yêu cầu
- nút hành động nguy hiểm dùng ngữ nghĩa cảnh báo / lỗi rõ ràng
- chống bấm lặp trong lúc chờ phản hồi

---

## 10. Quy chuẩn bảng dữ liệu, tìm kiếm, lọc, sắp xếp và phân trang

## 10.1 Vai trò của bảng dữ liệu trong hệ thống

Hệ thống có nhiều màn hình quản trị và tra cứu, do đó bảng dữ liệu là thành phần trọng tâm. TL29 khóa chuẩn để tránh mỗi màn hình một kiểu.

## 10.2 Cấu trúc bảng chuẩn

Bảng dữ liệu chuẩn gồm:
- thanh công cụ bảng (tìm kiếm, lọc, hành động)
- vùng trạng thái dữ liệu (đang tải / lỗi / trống)
- bảng cột / dòng
- phân trang
- tổng số bản ghi và trạng thái lọc
- thời điểm cập nhật (nếu dữ liệu thay đổi theo thời gian)

## 10.3 Quy tắc cột bảng

- Tên cột ngắn gọn, đúng thuật ngữ nghiệp vụ
- Cột trạng thái dùng nhãn trạng thái chuẩn (không ghi chuỗi trần nhiều nơi)
- Cột tiền / số lượng / thời gian dùng bộ hiển thị chuẩn
- Cột thao tác đặt cuối bảng và dùng biểu tượng + nhãn phù hợp
- Không nhồi quá nhiều thông tin vào một cột khiến khó đọc

## 10.4 Tìm kiếm và lọc

### Tìm kiếm
- hỗ trợ từ khóa cơ bản
- giữ lại từ khóa khi đổi trang / sắp xếp
- có nút xóa nhanh điều kiện tìm kiếm

### Lọc
- lọc theo trạng thái là bắt buộc với các bảng nghiệp vụ chính
- lọc theo thời gian áp dụng cho nạp/rút/sự kiện/đối soát
- hiển thị điều kiện lọc đang áp dụng rõ ràng
- có thao tác đặt lại bộ lọc

### Sắp xếp
- chỉ bật ở cột thực sự có ý nghĩa sắp xếp
- hiển thị hướng sắp xếp rõ
- giữ trạng thái sắp xếp khi phân trang

## 10.5 Trạng thái bảng bắt buộc

- đang tải
- lỗi tải dữ liệu
- không có dữ liệu
- có dữ liệu nhưng bị lọc hết
- đang làm mới
- dữ liệu có thể chưa cập nhật hoàn toàn (nếu bám TL16)

## 10.6 Hành động hàng loạt (nếu áp dụng)

- chỉ bật khi người dùng có quyền phù hợp
- hiển thị số dòng đã chọn
- xác nhận trước thao tác hàng loạt nhạy cảm
- hiển thị kết quả thành công / thất bại theo từng dòng hoặc theo nhóm
- không làm mất lựa chọn không cần thiết nếu chưa hoàn tất thao tác

---

## 11. Quy chuẩn hiển thị trạng thái nghiệp vụ, mã lỗi và thông báo

## 11.1 Nguyên tắc cốt lõi

- Trạng thái hiển thị phải bám **TL14**
- Thông điệp hiển thị phải bám **TL23**
- Không để mỗi màn hình tự đặt tên trạng thái khác nhau cho cùng một giá trị nghiệp vụ

## 11.2 Thành phần hiển thị trạng thái chuẩn

TL29 yêu cầu có thành phần dùng chung cho:
- trạng thái nạp tiền
- trạng thái rút tiền
- trạng thái chiến dịch
- trạng thái liên kết
- trạng thái lượt / kết quả đánh giá hợp lệ (mức hiển thị theo quyền)
- trạng thái kỳ đối soát / kết chuyển
- trạng thái tác vụ nền (màn hình vận hành)

Thành phần này phải:
- nhận mã trạng thái chuẩn
- ánh xạ ra nhãn hiển thị song ngữ
- ánh xạ màu ngữ nghĩa nhất quán
- hỗ trợ biểu tượng trạng thái (nếu có)

## 11.3 Quy chuẩn thông báo hệ thống (toast / banner / inline)

### Thông báo ngắn sau thao tác
Dùng cho:
- tạo thành công
- cập nhật thành công
- thao tác thất bại có thể thử lại
- cảnh báo nhẹ

### Banner ngữ cảnh
Dùng cho:
- dữ liệu tạm thời / đang tổng hợp
- hệ thống bảo trì một phần
- quyền hạn bị giới hạn
- cảnh báo cần chú ý kéo dài trong một màn hình

### Lỗi tại trường / lỗi nội tuyến
Dùng cho:
- biểu mẫu
- tải tệp
- bộ lọc không hợp lệ
- thao tác nhỏ trong bảng

## 11.4 Quy tắc hiển thị mã lỗi

- Với R10, R20: ưu tiên thông điệp dễ hiểu, có thể kèm mã lỗi ngắn nếu cần hỗ trợ
- Với R30, R40: hiển thị mã lỗi rõ hơn để tra cứu
- Với màn hình vận hành kỹ thuật: hiển thị mã lỗi + mã truy vết + đường dẫn tra cứu nhật ký (theo quyền)

## 11.5 Quy tắc “không thành công giả”

Không được:
- hiển thị thông báo thành công khi máy chủ chưa xác nhận
- tự cập nhật trạng thái “đã duyệt” trước khi phản hồi thật
- ẩn lỗi và giữ nguyên dữ liệu cũ mà không cảnh báo người dùng

---

## 12. Quy chuẩn hiển thị số liệu, tiền, thời gian và dữ liệu thống kê

## 12.1 Nguyên tắc chung

Hệ thống có nhiều số liệu liên quan tài chính và lượt. Giao diện phải hiển thị nhất quán để tránh hiểu sai.

## 12.2 Hiển thị tiền và số lượng

- Dùng bộ hiển thị tiền thống nhất
- Hiển thị đơn vị tiền rõ ràng theo ngữ cảnh
- Tách số âm / dương bằng dấu và/hoặc màu ngữ nghĩa (không chỉ dựa màu)
- Dùng định dạng nhóm số dễ đọc
- Số liệu ví cần phân biệt:
  - số dư khả dụng
  - số dư khóa tạm
  - doanh thu chờ chốt (nếu áp dụng)
  - doanh thu đã chốt / có thể rút

## 12.3 Hiển thị thời gian

- Dùng múi giờ hiển thị nhất quán theo cấu hình hệ thống / người dùng
- Cùng một màn hình không trộn nhiều định dạng ngày giờ
- Hiển thị cả thời điểm tuyệt đối cho dữ liệu nghiệp vụ quan trọng
- Với dữ liệu gần thời gian thực có thể hiển thị “cập nhật x phút trước”, nhưng nên có tooltip / chi tiết thời gian tuyệt đối

## 12.4 Hiển thị số liệu tạm thời và đã chốt (bám TL16)

Bắt buộc phân biệt bằng nhãn / chú thích rõ:
- **Tạm thời / đang tổng hợp**
- **Đã chốt / đối soát xong**

Không được hiển thị chung một kiểu dễ khiến người dùng tưởng là số liệu đã chốt.

## 12.5 Quy chuẩn biểu đồ và khối thống kê (nếu dùng)

- tiêu đề biểu đồ rõ nguồn số liệu
- nhãn đơn vị rõ
- hiển thị trạng thái dữ liệu (tạm thời / đã chốt)
- không dùng quá nhiều màu gây nhiễu
- có trạng thái không dữ liệu / lỗi tải
- dữ liệu quan trọng phải có bảng số kèm khi cần đối chiếu

---

## 13. Quy chuẩn hộp thoại, xác nhận và thao tác nhạy cảm

## 13.1 Mục tiêu

Giảm thao tác nhầm và tăng khả năng truy vết khi xử lý luồng tài chính / cấu hình / đối soát.

## 13.2 Phân loại hộp thoại

### Hộp thoại thông tin
- thông báo kết quả
- giải thích ngắn
- không thay đổi dữ liệu

### Hộp thoại xác nhận thao tác thường
- xóa bộ lọc
- đóng biểu mẫu chưa lưu (nếu có)
- thao tác có thể hoàn tác

### Hộp thoại xác nhận thao tác nhạy cảm
- duyệt / từ chối nạp
- duyệt / từ chối / hoàn trả rút
- tạm khóa / mở khóa liên kết
- duyệt / từ chối chiến dịch
- chốt đối soát / kết chuyển
- thay đổi cấu hình hiệu lực
- xuất bản nội dung tuân thủ

## 13.3 Nội dung bắt buộc của hộp thoại thao tác nhạy cảm

- tên thao tác
- thực thể bị tác động (mã + thông tin nhận diện tối thiểu)
- trạng thái hiện tại
- trạng thái dự kiến sau thao tác
- cảnh báo tác động (nếu có)
- trường nhập lý do / ghi chú (nếu tài liệu yêu cầu)
- nút xác nhận / hủy với ngữ nghĩa rõ ràng

## 13.4 Quy tắc nút hành động trong hộp thoại

- nút chính là hành động được xác nhận
- nút hủy luôn rõ và an toàn
- nút nguy hiểm phải dùng ngữ nghĩa cảnh báo / lỗi
- khi đang gửi yêu cầu:
  - khóa bấm lặp
  - hiển thị trạng thái đang xử lý
  - không cho đóng hộp thoại nếu dễ gây hiểu lầm (tùy luồng)

## 13.5 Kết quả sau thao tác

Sau thao tác nhạy cảm, giao diện phải:
- hiển thị kết quả rõ ràng
- cập nhật trạng thái thực thể theo phản hồi máy chủ
- ghi nhận mã lỗi / mã truy vết để hỗ trợ nếu lỗi
- làm mới các khối liên quan (danh sách, chi tiết, lịch sử) ở mức cần thiết

---

## 14. Quy chuẩn tải tệp, xem tệp và hiển thị bằng chứng

## 14.1 Phạm vi áp dụng

- chứng từ nạp tiền thủ công
- bằng chứng xử lý rút tiền
- tệp hỗ trợ nội bộ (nếu có)
- tệp đính kèm trong một số luồng kiểm tra thủ công

## 14.2 Thành phần tải tệp chuẩn

Thành phần tải tệp dùng chung phải hỗ trợ:
- chọn tệp
- kéo thả (nếu triển khai)
- hiển thị tên tệp và kích thước
- kiểm tra loại / kích thước ở giao diện
- trạng thái tải lên (chờ / đang tải / thành công / lỗi)
- xóa tệp khỏi danh sách trước khi gửi
- hiển thị thông báo lỗi tại tệp

## 14.3 Quy tắc hiển thị tệp và quyền xem

- chỉ hiển thị nút xem / tải khi người dùng có quyền
- không lộ đường dẫn nội bộ kho tệp
- hiển thị siêu dữ liệu tệp cần thiết (tên, thời gian, người tải nếu phù hợp quyền)
- tệp lỗi / hỏng phải có thông báo rõ, không gây treo giao diện

## 14.4 Quy tắc trải nghiệm cho tệp trong luồng nhạy cảm

- nếu tệp là bắt buộc, hiển thị rõ trước khi xác nhận
- với duyệt nạp / rút, bằng chứng phải đặt gần khu vực quyết định thao tác
- hỗ trợ mở xem nhanh nếu định dạng cho phép
- không để thao tác duyệt ở xa khu vực bằng chứng dẫn tới dễ duyệt nhầm

---

## 15. Quy chuẩn nội dung hiển thị song ngữ và tuân thủ

## 15.1 Nguyên tắc chung

Bám TL23:
- nội dung hiển thị phải tách khỏi mã
- quản lý theo khóa nội dung
- hỗ trợ Việt / Anh nhất quán
- có cơ chế fallback rõ ràng
- không nhúng chi tiết nội bộ chống gian lận vào giao diện công khai

## 15.2 Phân loại nội dung hiển thị

### Nội dung tĩnh
- nhãn thành phần
- tiêu đề trang
- mô tả ngắn
- nhãn nút
- trạng thái chuẩn

### Nội dung động từ hệ thống
- thông báo lỗi
- cảnh báo theo ngữ cảnh
- nội dung xác nhận thao tác
- mô tả kết quả thao tác

### Nội dung tuân thủ có phiên bản
- điều khoản sử dụng
- chính sách nội bộ hiển thị cho người dùng
- thông báo thay đổi chính sách
- nội dung cần ghi nhận chấp nhận

## 15.3 Quy tắc fallback ngôn ngữ

- Nếu thiếu bản dịch cho khóa nội dung:
  - dùng ngôn ngữ mặc định của hệ thống
  - ghi nhận cảnh báo nội bộ để bổ sung dịch
- Không hiển thị khóa kỹ thuật thô ra giao diện người dùng
- Không trộn Việt / Anh trong cùng câu nếu không bắt buộc

## 15.4 Quy tắc hiển thị điều khoản và chấp nhận điều khoản

- hiển thị rõ phiên bản nội dung
- hiển thị thời điểm hiệu lực
- hiển thị ngôn ngữ đang xem
- nếu cần chấp nhận:
  - nêu rõ điều gì sẽ bị hạn chế nếu chưa chấp nhận
  - nút chấp nhận / từ chối rõ ràng
  - liên kết xem nội dung đầy đủ rõ ràng

---

## 16. Quy chuẩn trang công khai R01 (mức giao diện)

## 16.1 Mục tiêu giao diện R01

- nhẹ, rõ, tải nhanh
- hiển thị đúng thông điệp công khai
- không lộ thông tin nội bộ
- hỗ trợ song ngữ mức cơ bản nếu áp dụng
- phản ánh đúng trạng thái liên kết / chiến dịch theo TL11, TL23

## 16.2 Nhóm trang công khai bắt buộc

- trang chuyển hướng / trang trung gian
- trang liên kết không hợp lệ
- trang liên kết tạm khóa / không khả dụng
- trang bảo trì / tạm dừng dịch vụ công khai
- trang lỗi công khai chung

## 16.3 Quy tắc nội dung và hiển thị R01

- thông điệp ngắn gọn, dễ hiểu
- không hiển thị mã nội bộ chống gian lận
- nếu hiển thị mã lỗi công khai, dùng mã công khai an toàn
- hỗ trợ thử lại / quay lại / liên hệ hỗ trợ (nếu có)
- không hiển thị thông tin nhạy cảm về chiến dịch, nhà xuất bản, người mua traffic

## 16.4 Quy tắc hiệu năng giao diện R01

- tối giản tài nguyên tải ban đầu
- hạn chế thành phần nặng không cần thiết
- ưu tiên hiển thị thông điệp và điều hướng đích nhanh
- trạng thái lỗi phải hiển thị được ngay cả khi một số tài nguyên phụ tải chậm

---

## 17. Quy chuẩn khả năng tiếp cận và hỗ trợ sử dụng

## 17.1 Mục tiêu

Tăng khả năng sử dụng thực tế, giảm lỗi thao tác, hỗ trợ người dùng trong nhiều điều kiện thiết bị và môi trường làm việc.

## 17.2 Yêu cầu khả năng tiếp cận cơ bản (mức phiên bản đầu)

- thành phần có thể thao tác bằng bàn phím ở các luồng chính
- nhãn trường nhập rõ ràng
- thứ tự di chuyển hợp lý trong biểu mẫu
- trạng thái tập trung hiển thị rõ
- thông báo lỗi liên kết được với trường nhập khi phù hợp
- không truyền đạt thông tin chỉ bằng màu

## 17.3 Hỗ trợ sử dụng cho màn hình thao tác dày dữ liệu

- cột bảng quan trọng cố định khi cần (nếu triển khai)
- nhắc điều kiện lọc đang bật
- giữ trạng thái bộ lọc khi quay lại danh sách
- giữ vị trí cuộn / ngữ cảnh khi từ danh sách vào chi tiết rồi quay lại (nếu khả thi)
- hỗ trợ sao chép mã thực thể và mã truy vết ở màn hình quản trị theo quyền

## 17.4 Thông điệp trợ giúp trong giao diện

- mô tả ngắn ở trường khó hiểu
- gợi ý định dạng nhập
- giải thích chênh lệch số liệu tạm thời / đã chốt
- giải thích ngắn cho thao tác nhạy cảm và hậu quả cơ bản

---

## 18. Quy chuẩn hiệu năng giao diện và xử lý trạng thái tải

## 18.1 Mục tiêu

Tạo trải nghiệm ổn định, tránh cảm giác “đơ” hoặc “thành công giả”, đặc biệt ở các màn hình bảng lớn và thao tác nhạy cảm.

## 18.2 Quy tắc trạng thái tải

Mỗi màn hình / thành phần dữ liệu chính phải có:
- trạng thái tải lần đầu
- trạng thái đang làm mới
- trạng thái lỗi
- trạng thái trống
- trạng thái dữ liệu cũ nhưng đang cập nhật (nếu áp dụng)

## 18.3 Quy tắc tải dữ liệu theo ưu tiên hiển thị

- tải trước dữ liệu cần cho thao tác chính
- tải sau dữ liệu phụ (nhật ký dài, lịch sử chi tiết sâu, thống kê phụ)
- không khóa toàn trang nếu chỉ một khối phụ lỗi
- hiển thị lỗi cục bộ cho khối lỗi

## 18.4 Quy tắc tối ưu cảm nhận người dùng

- phản hồi nhấn nút ngay (trạng thái đang xử lý)
- tránh nhấp nháy bố cục khi tải dữ liệu
- giữ kích thước vùng hiển thị hợp lý để tránh giật
- không tự làm mới phá thao tác đang nhập liệu
- với thao tác mất thời gian, hiển thị tiến trình hoặc thông báo “đang xử lý”

---

## 19. Quy chuẩn kiểm thử giao diện và nghiệm thu hình thức

## 19.1 Mục tiêu

Bổ sung cho TL21 và TL26 ở mức giao diện:
- đảm bảo thành phần dùng chung hoạt động ổn định
- giảm lệch hiển thị giữa màn hình cùng loại
- bảo đảm thông báo / trạng thái / xác nhận đúng tài liệu

## 19.2 Phân lớp kiểm thử giao diện

### Kiểm thử thành phần dùng chung
- nút, hộp thoại, bảng, biểu mẫu, nhãn trạng thái, thông báo
- kiểm tra các trạng thái thành phần (tải, lỗi, vô hiệu hóa, đang xử lý)

### Kiểm thử màn hình
- bố cục
- điều hướng
- bộ lọc
- bảng dữ liệu
- biểu mẫu
- thông báo lỗi / thành công
- hộp thoại xác nhận

### Kiểm thử luồng liên thông giao diện
- tạo / duyệt / từ chối / hoàn thành
- xử lý lỗi và thử lại
- thay đổi ngôn ngữ
- phân quyền hiển thị theo vai trò

## 19.3 Danh sách kiểm tra nghiệm thu hình thức giao diện (UI checklist)

- [ ] Bố cục đúng mẫu màn hình trong TL20
- [ ] Nhãn / trạng thái hiển thị đúng TL14 và TL23
- [ ] Thành phần dùng đúng thư viện chung, không tự chế không cần thiết
- [ ] Màu ngữ nghĩa trạng thái nhất quán
- [ ] Có trạng thái tải / lỗi / trống cho khối dữ liệu chính
- [ ] Hộp thoại xác nhận thao tác nhạy cảm đủ thông tin bắt buộc
- [ ] Không hiển thị thông tin nội bộ nhạy cảm không đúng quyền
- [ ] Hỗ trợ song ngữ đúng và không vỡ bố cục nghiêm trọng
- [ ] Không có chữ kỹ thuật thô / khóa nội dung lộ ra ngoài
- [ ] Điều hướng theo quyền đúng vai trò
- [ ] Không có hành vi “thành công giả” hoặc cập nhật trạng thái sai

## 19.4 Kiểm thử đặc biệt cho luồng tài chính và đối soát

- xác nhận hiển thị đúng trạng thái trước / sau thao tác
- không cho bấm lặp khi đang gửi yêu cầu
- lỗi trả về phải hiển thị đúng ngữ cảnh
- số liệu ví / sổ cái / đối soát hiển thị rõ đơn vị và trạng thái tạm thời / đã chốt
- nhật ký / lịch sử hiển thị đúng thứ tự và thông tin nhận diện tối thiểu

---

## 20. Quy chuẩn tổ chức mã giao diện và thư viện thành phần (bám TL26)

## 20.1 Cấu trúc thư mục khuyến nghị cho thư viện thành phần

```text
ung-dung-giao-dien/
├─ thanh-phan/
│  ├─ nen-tang/
│  ├─ to-hop-dung-chung/
│  ├─ nghiep-vu/
│  └─ mau-bo-cuc/
├─ tinh-nang/
│  ├─ nap-tien/
│  ├─ rut-tien/
│  ├─ chien-dich/
│  ├─ lien-ket/
│  ├─ doi-soat/
│  ├─ cau-hinh/
│  ├─ noi-dung-tuan-thu/
│  └─ giam-sat-va-nhat-ky/
├─ bo-chuyen-doi-du-lieu/
├─ quan-ly-ngon-ngu/
├─ hang-so-trang-thai-va-ma-loi/
├─ ham-hien-thi-chuan/
├─ lop-goi-giao-dien-lap-trinh/
└─ kiem-thu-giao-dien/
```

## 20.2 Quy tắc tách thành phần giao diện

- Thành phần **nền tảng** không chứa logic nghiệp vụ đặc thù
- Thành phần **nghiệp vụ** được phép hiểu trạng thái / trường dữ liệu nghiệp vụ nhưng vẫn không gọi máy chủ trực tiếp
- Lớp gọi máy chủ đặt riêng theo TL26
- Bộ chuyển đổi dữ liệu hiển thị đặt riêng, không rải trong thành phần

## 20.3 Quy tắc thêm thành phần mới vào thư viện

Bắt buộc kèm:
- mô tả mục đích
- ví dụ sử dụng
- trạng thái hỗ trợ
- quy tắc dữ liệu vào
- kiểm thử thành phần tối thiểu
- ghi chú khả năng tiếp cận (nếu là thành phần tương tác)

## 20.4 Quy tắc cho trợ lý lập trình khi sinh giao diện

- Dùng thành phần từ thư viện chung trước khi tạo mới
- Dùng nhãn trạng thái và thông báo từ lớp ánh xạ chuẩn
- Không nhúng chuỗi hiển thị trực tiếp nếu thuộc nội dung quản lý theo TL23
- Không tự tạo màu / kiểu trạng thái ngoài ngữ nghĩa đã chốt
- Không gọi giao diện lập trình trực tiếp trong thành phần trình bày
- Luôn sinh trạng thái tải / lỗi / trống cho khối dữ liệu chính

---

## 21. Ma trận truy vết TL29 với các tài liệu đã có

## 21.1 Truy vết theo chủ đề

- **TL02** → thuật ngữ nghiệp vụ dùng trong nhãn màn hình và nhóm chức năng
- **TL03** → hiển thị điều hướng theo quyền, ẩn/khóa thao tác theo vai trò
- **TL08** → màn hình nạp tiền thủ công, chứng từ, duyệt nạp
- **TL09** → màn hình rút tiền thủ công, bằng chứng, hoàn trả, hoàn thành
- **TL10** → màn hình chiến dịch, trạng thái chiến dịch, ngân sách theo lượt
- **TL11** → màn hình liên kết rút gọn, thống kê nhà xuất bản, trang công khai R01
- **TL12** → hiển thị cờ rủi ro, hàng kiểm tra thủ công (mức hiển thị theo quyền)
- **TL13** → hiển thị dữ liệu tài chính, sổ cái, đối soát theo cấu trúc đúng
- **TL14** → nhãn trạng thái và mã lỗi hiển thị chuẩn
- **TL15** → dữ liệu vào/ra giao diện, ánh xạ phản hồi, không tự chế trường
- **TL16** → hiển thị số liệu tạm thời / đã chốt, trạng thái tác vụ nền
- **TL17** → màn hình cấu hình hiệu lực và khóa mở tính năng
- **TL18** → hiển thị cảnh báo, nhật ký, mã truy vết, màn hình giám sát
- **TL19** → che dữ liệu nhạy cảm, an toàn hiển thị, không lộ nội bộ
- **TL20** → khung màn hình, luồng thao tác, vị trí cảnh báo và xác nhận
- **TL21** → kiểm thử và nghiệm thu giao diện
- **TL22** → màn hình hỗ trợ vận hành, ứng cứu sự cố, thông điệp bảo trì
- **TL23** → nội dung song ngữ, điều khoản, chính sách, thông báo người dùng
- **TL24** → lộ trình triển khai màn hình và bàn giao theo giai đoạn
- **TL25** → hướng công nghệ giao diện và vai trò R01 / R10 / R20 / R30 / R40
- **TL26** → cấu trúc mã giao diện, tiêu chuẩn lập trình, thư viện dùng chung
- **TL28** → dữ liệu và kịch bản dùng để kiểm thử / nghiệm thu giao diện

## 21.2 Truy vết theo thành phần giao diện

- **Thư viện thành phần nền** ↔ TL26, TL21
- **Thư viện thành phần nghiệp vụ** ↔ TL08–TL12, TL16, TL20
- **Lớp ánh xạ trạng thái và lỗi** ↔ TL14, TL15, TL23
- **Quản lý ngôn ngữ và nội dung** ↔ TL23, TL17
- **Màn hình vận hành / giám sát** ↔ TL18, TL22
- **Trang công khai R01** ↔ TL11, TL23, TL25

---

## 22. Tiêu chí chấp nhận tài liệu TL29

TL29 được xem là đạt khi:

- Chốt được quy chuẩn bố cục, lưới, khoảng cách và cấu trúc màn hình cho các nhóm màn hình chính
- Chốt được cấu trúc thư viện thành phần dùng chung và nguyên tắc mở rộng
- Có quy chuẩn biểu mẫu, bảng dữ liệu, lọc, tìm kiếm, phân trang và trạng thái bảng
- Có quy chuẩn hiển thị trạng thái nghiệp vụ, mã lỗi, thông báo bám TL14, TL23
- Có quy chuẩn hiển thị số liệu tài chính, thời gian, số liệu tạm thời / đã chốt bám TL16
- Có quy chuẩn hộp thoại xác nhận cho thao tác nhạy cảm
- Có quy chuẩn tải tệp / xem tệp cho chứng từ và bằng chứng
- Có quy chuẩn nội dung song ngữ và điều khoản tuân thủ bám TL23
- Có quy chuẩn giao diện công khai R01 mức cơ bản, không lộ thông tin nội bộ
- Có yêu cầu khả năng tiếp cận và hiệu năng giao diện mức phiên bản đầu
- Có checklist kiểm thử / nghiệm thu giao diện và quy tắc dùng thư viện thành phần
- Truy vết nhất quán với TL20, TL23, TL25, TL26 và các tài liệu nghiệp vụ liên quan

---

## 23. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Bám màn hình và luồng thao tác theo TL20
- [x] Bám điều khoản, chính sách và nội dung hiển thị theo TL23
- [x] Không thay đổi nghiệp vụ lõi trong TL08 đến TL12
- [x] Dùng đúng trạng thái / mã lỗi theo TL14
- [x] Không mâu thuẫn hợp đồng dữ liệu TL15
- [x] Phân biệt số liệu tạm thời / đã chốt theo TL16
- [x] Bám phân quyền hiển thị theo TL03
- [x] Bám che dữ liệu nhạy cảm và an toàn hiển thị theo TL19
- [x] Tương thích kiến trúc giao diện và công nghệ trong TL25
- [x] Tương thích quy ước mã và cấu trúc thư mục giao diện trong TL26
- [x] Hỗ trợ kiểm thử / nghiệm thu theo TL21 và dữ liệu TL28
- [x] Hỗ trợ đào tạo và bàn giao theo TL24

---

## 24. Gợi ý tài liệu tiếp theo để hoàn thiện vòng tài liệu vận hành - giao diện

Sau TL29, bộ tài liệu triển khai đã khá đầy đủ cho dev và trợ lý lập trình. Để hoàn thiện thêm cho vận hành thực tế, nên ưu tiên:

### TL27 — Hướng dẫn thao tác theo vai trò cho R30 và R40
- thao tác từng màn hình theo TL20 + TL29
- checklist trước / sau thao tác nhạy cảm
- mẫu phản hồi hỗ trợ bám TL23
- xử lý tình huống lỗi thường gặp theo mã lỗi TL14

### TL30 — Mẫu đặc tả nhiệm vụ cho trợ lý lập trình theo từng mô-đun
- mẫu giao việc sinh mã backend / frontend / xử lý nền
- mẫu yêu cầu kiểm thử kèm theo
- mẫu yêu cầu tự kiểm tra theo TL26 và TL29
- mẫu biên bản rà soát mã do trợ lý lập trình sinh

---

## 25. Ghi chú cuối tài liệu

- TL29 là tài liệu quy chuẩn giao diện và thư viện thành phần dùng chung để triển khai nhất quán các màn hình trong hệ thống.
- TL29 không thay thế TL20 (màn hình/luồng), TL23 (nội dung hiển thị), TL26 (quy ước mã), mà là lớp chuẩn hiển thị và tái sử dụng thành phần nằm giữa các tài liệu đó.
- Khi triển khai giao diện thực tế, nên bổ sung phụ lục minh họa ảnh màn hình mẫu và thư viện thành phần sau khi nhóm thiết kế / phát triển chốt phiên bản đầu.
