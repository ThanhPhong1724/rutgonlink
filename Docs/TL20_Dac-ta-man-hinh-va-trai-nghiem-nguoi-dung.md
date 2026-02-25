# TL20 — Đặc tả màn hình và trải nghiệm người dùng

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL20
- **Tên tài liệu:** Đặc tả màn hình và trải nghiệm người dùng
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL21
- **Tài liệu đầu ra phụ thuộc:** TL22, TL23, bộ thiết kế giao diện chi tiết, backlog phát triển giao diện người dùng

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL20 đặc tả đầy đủ lớp giao diện người dùng cho nền tảng hai phía (khách hàng mua chiến dịch và nhà xuất bản) cùng cổng quản trị và cổng công khai chuyển hướng, nhằm bảo đảm:

- các màn hình phản ánh đúng nghiệp vụ đã chốt trong TL02
- quyền hiển thị và thao tác đúng TL03
- trạng thái hiển thị đúng TL14
- hành vi giao diện bám TL15 (giao diện lập trình phiên bản đầu)
- luồng nhập liệu, cảnh báo, xác nhận, thông báo rõ ràng và nhất quán
- hỗ trợ song ngữ Việt/Anh và vận hành cho Việt Nam + quốc tế
- hỗ trợ kiểm thử chấp nhận theo TL21

## 2.2 Phạm vi

Trong phạm vi TL20:

- danh sách màn hình theo cổng
- quy chuẩn trải nghiệm dùng chung
- hành vi điều hướng và quyền truy cập
- đặc tả màn hình mức chi tiết cho các luồng lõi
- đặc tả trạng thái hiển thị, lỗi hiển thị, thông báo
- yêu cầu responsive tối thiểu
- yêu cầu song ngữ và khả năng truy cập cơ bản

Ngoài phạm vi TL20:

- thiết kế đồ họa chi tiết từng thành phần ở mức pixel hoàn toàn cố định
- đặc tả thư viện giao diện cụ thể của đội triển khai
- mã giao diện
- mẫu nội dung tiếp thị chi tiết
- hình ảnh thương hiệu cuối cùng

## 2.3 Nguyên tắc xuyên suốt

- **Ưu tiên đúng nghiệp vụ và dữ liệu trước thẩm mỹ.**
- Không cho phép giao diện hiển thị thao tác vượt quyền dù giao diện lập trình đã chặn.
- Không hiển thị trạng thái tự đặt tên ngoài TL14.
- Không hiển thị số liệu “đã chốt” lẫn với số liệu “tạm thời” mà không có nhãn rõ.
- Các thao tác nhạy cảm phải có bước xác nhận và hiển thị tác động.
- Tất cả nhãn phải hỗ trợ song ngữ qua khóa từ điển, không chèn cứng chuỗi trong mã.

---

## 3. Bản đồ cổng và cấu trúc điều hướng tổng thể

## 3.1 Các cổng giao diện

### Cổng khách hàng mua chiến dịch
Dành cho vai trò **R10** (theo TL03), gồm:

- bảng điều khiển
- quản lý chiến dịch
- nạp tiền
- lịch sử giao dịch
- thông báo
- hồ sơ cá nhân
- hỗ trợ

### Cổng nhà xuất bản
Dành cho vai trò **R20**, gồm:

- bảng điều khiển
- quản lý liên kết rút gọn
- thống kê liên kết và doanh thu
- rút tiền
- khu nhà phát triển
- thông báo
- hồ sơ cá nhân
- hỗ trợ

### Cổng quản trị
Dành cho vai trò **R30** và một phần **R40**, gồm:

- tổng quan hệ thống
- quản lý người dùng
- duyệt nạp tiền
- duyệt rút tiền
- quản lý chiến dịch
- quản lý liên kết
- chống gian lận
- đối soát và kết chuyển
- cấu hình hệ thống
- nhật ký / giám sát / cảnh báo
- hỗ trợ khách hàng
- quản lý nội dung hệ thống

### Cổng công khai chuyển hướng
Dành cho **R01** (không đăng nhập), gồm:

- trang xác minh truy cập hợp lệ
- trang thông tin trung gian
- trang chuyển hướng thành công
- trang lỗi liên kết
- trang liên kết bị khóa / hết hạn
- trang báo lỗi liên kết

## 3.2 Nguyên tắc tách cổng

- Tách điều hướng theo vai trò để giảm nhầm lẫn.
- Không trộn mục của R10 và R20 trong cùng một thanh điều hướng nếu không có chế độ đổi vai trò rõ ràng.
- Cổng quản trị phải có nhận diện khác biệt rõ để tránh thao tác nhầm trên cổng người dùng.
- Cổng công khai tối giản, tập trung vào hoàn tất luồng truy cập an toàn và minh bạch.

---

## 4. Chuẩn trải nghiệm dùng chung cho toàn hệ thống

## 4.1 Cấu trúc bố cục chuẩn

Mỗi cổng đăng nhập (R10, R20, R30/R40) dùng bố cục chuẩn:

- **Thanh trên cùng**
  - tên sản phẩm/cổng
  - chọn ngôn ngữ
  - thông báo
  - hồ sơ nhanh / đăng xuất
- **Thanh điều hướng bên trái**
  - nhóm mục chức năng theo vai trò
  - trạng thái mục đang chọn
- **Vùng nội dung chính**
  - tiêu đề trang
  - breadcrumb (nếu có)
  - thanh thao tác
  - khối lọc / tìm kiếm
  - nội dung bảng / biểu đồ / biểu mẫu
- **Vùng phản hồi hệ thống**
  - thông báo thành công / cảnh báo / lỗi
  - trạng thái tải
  - trạng thái trống

## 4.2 Mẫu thành phần hiển thị dùng chung

### Thành phần bắt buộc dùng thống nhất
- bảng dữ liệu có phân trang
- bộ lọc
- ô tìm kiếm
- thẻ thống kê tổng quan
- biểu đồ có chú giải
- hộp thoại xác nhận
- khối trạng thái
- nhãn trạng thái
- khung tải tệp
- khung hiển thị lỗi biểu mẫu
- khối thông báo hệ thống
- khung giúp đỡ nhanh (hướng dẫn ngắn)

### Quy tắc trạng thái thành phần
Mỗi thành phần phải có các trạng thái tối thiểu:

- mặc định
- đang tải
- không có dữ liệu
- lỗi tải dữ liệu
- bị vô hiệu (nếu không đủ quyền hoặc không đủ điều kiện)
- đang gửi (đối với biểu mẫu)

## 4.3 Quy tắc nhãn trạng thái

- Dùng mã trạng thái TL14 làm nguồn, giao diện chỉ hiển thị nhãn đã ánh xạ.
- Không hiển thị trực tiếp mã kỹ thuật cho người dùng phổ thông trừ khi là mã tham chiếu hỗ trợ.
- Với trạng thái quan trọng (nạp tiền, rút tiền, chiến dịch, sự kiện lượt), phải có:
  - nhãn ngắn
  - mô tả phụ (nếu cần)
  - màu nhận diện thống nhất
  - chú giải ở trang danh sách

## 4.4 Quy tắc thao tác nhạy cảm

Các thao tác sau được xem là nhạy cảm và phải có xác nhận rõ:

- duyệt / từ chối hóa đơn nạp
- duyệt / từ chối / hoàn tiền yêu cầu rút
- duyệt / từ chối chiến dịch
- khóa / mở khóa liên kết
- quyết định kiểm tra thủ công sự kiện lượt
- xuất bản / hoàn tác cấu hình
- chạy chốt đối soát / kết chuyển
- thao tác tài khoản người dùng ảnh hưởng trạng thái

Hộp thoại xác nhận phải hiển thị:

- thực thể liên quan
- tác động chính
- cảnh báo không thể hoàn tác (nếu có)
- yêu cầu nhập lý do (nếu tài liệu nghiệp vụ yêu cầu)

## 4.5 Quy tắc thông báo phản hồi

### Mức thông báo
- thành công
- thông tin
- cảnh báo
- lỗi

### Quy tắc nội dung
- ngắn gọn, chỉ rõ đối tượng
- nêu bước tiếp theo nếu có
- không lộ chi tiết nội bộ nhạy cảm
- nếu là lỗi thao tác quan trọng, hiển thị mã lỗi theo TL14 và mã yêu cầu để hỗ trợ tra cứu

---

## 5. Chuẩn song ngữ Việt/Anh và hiển thị quốc tế

## 5.1 Yêu cầu song ngữ

- Mọi nhãn giao diện phải qua khóa từ điển.
- Mọi trạng thái hiển thị và thông báo nghiệp vụ phải có bản Việt và Anh.
- Nội dung do quản trị cấu hình (ví dụ hướng dẫn nạp tiền, nội dung thông báo) phải hỗ trợ nhập song ngữ.
- Nếu một bản dịch thiếu, hệ thống hiển thị ngôn ngữ dự phòng theo cấu hình, đồng thời ghi nhận cảnh báo nội bộ.

## 5.2 Định dạng ngày giờ và tiền tệ

- Hiển thị ngày giờ theo múi giờ người dùng (TL17, TL21).
- Hiển thị tiền theo đơn vị tiền tệ của ngữ cảnh:
  - ví nội bộ
  - hóa đơn
  - yêu cầu rút
  - báo cáo
- Nếu có quy đổi, phải hiển thị:
  - số gốc
  - đơn vị gốc
  - tỷ giá tham chiếu (nếu nghiệp vụ yêu cầu)
  - thời điểm tham chiếu

## 5.3 Nội dung cảnh báo cho USDT

- Hiển thị rõ mạng chuỗi khối (ví dụ theo danh mục TL14).
- Cảnh báo “chuyển sai mạng có thể mất tiền” phải hiển thị nổi bật.
- Nội dung cảnh báo phải có cả Việt/Anh.

---

## 6. Yêu cầu khả năng truy cập và responsive tối thiểu

## 6.1 Khả năng truy cập tối thiểu

- Điều hướng được bằng bàn phím cho luồng chính.
- Nhãn biểu mẫu rõ ràng và liên kết đúng với trường nhập.
- Thông báo lỗi biểu mẫu gắn đúng trường.
- Màu sắc không là kênh duy nhất để truyền đạt trạng thái (cần kèm nhãn chữ).
- Hộp thoại xác nhận có tiêu điểm rõ ràng và thoát được.
- Trạng thái tải / lỗi / trống có mô tả văn bản.

## 6.2 Responsive tối thiểu

### Máy tính để bàn
- Hỗ trợ đầy đủ chức năng
- Bảng dữ liệu nhiều cột có thể cuộn ngang nếu cần

### Máy tính bảng
- Hỗ trợ thao tác chính
- Có thể thu gọn thanh điều hướng

### Điện thoại
- Ưu tiên hỗ trợ đầy đủ cho:
  - đăng nhập
  - nạp tiền (tạo hóa đơn, tải chứng từ, theo dõi trạng thái)
  - rút tiền (tạo yêu cầu, theo dõi trạng thái)
  - tạo liên kết rút gọn
  - theo dõi bảng điều khiển cơ bản
  - trang chuyển hướng công khai
- Với bảng dữ liệu rộng, dùng:
  - thẻ danh sách
  - cuộn ngang có nhãn
  - màn hình chi tiết thay cho chỉnh sửa trực tiếp trên bảng

---

## 7. Bản đồ màn hình chi tiết theo cổng

## 7.1 Cổng khách hàng mua chiến dịch (R10)

### Nhóm xác thực và hồ sơ
- M20-01 Đăng nhập
- M20-02 Đăng ký
- M20-03 Quên mật khẩu
- M20-04 Đặt lại mật khẩu
- M20-05 Hồ sơ cá nhân
- M20-06 Đổi mật khẩu
- M20-07 Cài đặt ngôn ngữ và múi giờ

### Nhóm tổng quan và thông báo
- M20-10 Bảng điều khiển khách hàng
- M20-11 Trung tâm thông báo
- M20-12 Danh sách giao dịch ví / sổ cái (chỉ phần được phép hiển thị cho R10)

### Nhóm nạp tiền
- M20-20 Tạo hóa đơn nạp tiền
- M20-21 Chi tiết hóa đơn nạp tiền
- M20-22 Danh sách hóa đơn nạp tiền
- M20-23 Tải / cập nhật chứng từ nạp tiền

### Nhóm chiến dịch
- M20-30 Danh sách chiến dịch
- M20-31 Tạo chiến dịch mới
- M20-32 Chi tiết chiến dịch
- M20-33 Chỉnh sửa chiến dịch (trạng thái cho phép)
- M20-34 Nhật ký chiến dịch
- M20-35 Báo cáo chiến dịch theo ngày

### Nhóm hỗ trợ
- M20-40 Danh sách phiếu hỗ trợ
- M20-41 Tạo phiếu hỗ trợ
- M20-42 Chi tiết phiếu hỗ trợ

## 7.2 Cổng nhà xuất bản (R20)

### Nhóm xác thực và hồ sơ
- M21-01 Đăng nhập
- M21-02 Đăng ký
- M21-03 Quên mật khẩu
- M21-04 Hồ sơ cá nhân
- M21-05 Đổi mật khẩu
- M21-06 Cấu hình nhận tiền
- M21-07 Cài đặt ngôn ngữ và múi giờ

### Nhóm tổng quan và doanh thu
- M21-10 Bảng điều khiển nhà xuất bản
- M21-11 Danh sách giao dịch ví / sổ cái (phần được phép hiển thị)
- M21-12 Báo cáo doanh thu theo ngày
- M21-13 Báo cáo đối soát kỳ

### Nhóm liên kết rút gọn
- M21-20 Danh sách liên kết rút gọn
- M21-21 Tạo liên kết rút gọn
- M21-22 Chi tiết liên kết
- M21-23 Chỉnh sửa liên kết (trường cho phép)
- M21-24 Thống kê liên kết theo thời gian
- M21-25 Danh sách báo lỗi liên kết nhận được

### Nhóm rút tiền
- M21-30 Tạo yêu cầu rút tiền
- M21-31 Danh sách yêu cầu rút tiền
- M21-32 Chi tiết yêu cầu rút tiền

### Nhóm nhà phát triển
- M21-40 Khu nhà phát triển (tổng quan)
- M21-41 Quản lý khóa truy cập (nếu bật)
- M21-42 Tài liệu tích hợp rút gọn (tham chiếu TL15)
- M21-43 Nhật ký gọi giao diện lập trình cơ bản (nếu bật)

### Nhóm hỗ trợ
- M21-50 Danh sách phiếu hỗ trợ
- M21-51 Tạo phiếu hỗ trợ
- M21-52 Chi tiết phiếu hỗ trợ

## 7.3 Cổng quản trị (R30, R40)

### Nhóm tổng quan
- M30-01 Đăng nhập quản trị
- M30-02 Bảng điều khiển tổng quan hệ thống
- M30-03 Trung tâm thông báo nội bộ / cảnh báo ưu tiên

### Nhóm người dùng và hỗ trợ
- M30-10 Danh sách người dùng
- M30-11 Chi tiết người dùng
- M30-12 Thay đổi trạng thái người dùng (R30)
- M30-13 Danh sách phiếu hỗ trợ
- M30-14 Chi tiết phiếu hỗ trợ
- M30-15 Công cụ hỗ trợ tra cứu lịch sử thao tác (R40 giới hạn)

### Nhóm nạp tiền
- M30-20 Danh sách hóa đơn nạp tiền
- M30-21 Chi tiết hóa đơn nạp tiền
- M30-22 Duyệt / từ chối hóa đơn nạp
- M30-23 Hàng xử lý ngoại lệ nạp tiền

### Nhóm rút tiền
- M30-30 Danh sách yêu cầu rút tiền
- M30-31 Chi tiết yêu cầu rút tiền
- M30-32 Duyệt / từ chối / hoàn tiền theo quy trình
- M30-33 Hàng xử lý ngoại lệ rút tiền

### Nhóm chiến dịch
- M30-40 Danh sách chiến dịch
- M30-41 Chi tiết chiến dịch
- M30-42 Duyệt / từ chối chiến dịch
- M30-43 Nhật ký chiến dịch
- M30-44 Báo cáo chiến dịch hệ thống

### Nhóm liên kết và nhà xuất bản
- M30-50 Danh sách liên kết rút gọn toàn hệ thống
- M30-51 Chi tiết liên kết
- M30-52 Khóa / mở khóa liên kết
- M30-53 Báo cáo liên kết và doanh thu hệ thống

### Nhóm chống gian lận và sự kiện lượt
- M30-60 Danh sách sự kiện lượt
- M30-61 Hàng cần kiểm tra thủ công
- M30-62 Chi tiết sự kiện lượt
- M30-63 Quyết định kiểm tra thủ công (R30)
- M30-64 Tra cứu và ghi chú sự kiện (R40 có quyền hạn chế)

### Nhóm đối soát và kết chuyển
- M30-70 Bảng tổng hợp và đối soát kỳ
- M30-71 Chạy chốt đối soát
- M30-72 Kết chuyển doanh thu
- M30-73 Điều chỉnh sau chốt
- M30-74 Nhật ký đối soát

### Nhóm cấu hình hệ thống
- M30-80 Danh sách cấu hình
- M30-81 Chi tiết cấu hình
- M30-82 Tạo / sửa cấu hình nháp
- M30-83 Duyệt / xuất bản cấu hình
- M30-84 Hoàn tác cấu hình
- M30-85 Cấu hình ngân hàng
- M30-86 Cấu hình ví USDT
- M30-87 Cấu hình giá theo lượt
- M30-88 Cấu hình khuyến mãi nạp
- M30-89 Cấu hình thông báo song ngữ

### Nhóm nhật ký, giám sát, cảnh báo
- M30-90 Bảng giám sát hệ thống
- M30-91 Danh sách cảnh báo
- M30-92 Chi tiết cảnh báo
- M30-93 Nhật ký kiểm toán
- M30-94 Nhật ký ứng dụng / truy vết yêu cầu
- M30-95 Báo cáo sức khỏe xử lý nền

## 7.4 Cổng công khai chuyển hướng (R01)

- M01-01 Trang xác minh truy cập hợp lệ
- M01-02 Trang thông tin trung gian
- M01-03 Trang chuyển hướng thành công / đang chuyển hướng
- M01-04 Trang lỗi liên kết
- M01-05 Trang liên kết bị khóa hoặc hết hạn
- M01-06 Trang báo lỗi liên kết

---

## 8. Ma trận quyền hiển thị và điều hướng theo vai trò

## 8.1 Nguyên tắc chung

- Điều hướng chỉ hiển thị mục vai trò được phép.
- URL bị gõ trực tiếp vẫn phải bị chặn ở lớp kiểm tra quyền.
- Nút thao tác bị vô hiệu và ẩn tùy mức độ:
  - **Ẩn** nếu vai trò không bao giờ có quyền
  - **Vô hiệu + giải thích** nếu vai trò có quyền nhưng trạng thái chưa cho phép
- Với R40, mặc định chỉ hiển thị dữ liệu che bớt thông tin nhạy cảm theo TL03.

## 8.2 Quy tắc điều hướng sau đăng nhập

- R10 → cổng khách hàng, màn hình mặc định M20-10
- R20 → cổng nhà xuất bản, màn hình mặc định M21-10
- R30 → cổng quản trị, màn hình mặc định M30-02
- R40 → cổng quản trị (phân hệ hỗ trợ/tra cứu), màn hình mặc định M30-13 hoặc M30-15 theo cấu hình
- Nếu tài khoản có nhiều vai trò (nếu được phép trong triển khai), phải có màn hình chọn vai trò hoặc công tắc đổi cổng rõ ràng và có nhật ký

---

## 9. Đặc tả màn hình lõi — Cổng khách hàng mua chiến dịch (R10)

## 9.1 M20-10 — Bảng điều khiển khách hàng

### Mục tiêu
Cho R10 nhìn nhanh trạng thái tài khoản, số dư, chiến dịch, chi tiêu và cảnh báo quan trọng.

### Thành phần chính
- thẻ số dư khả dụng
- thẻ số dư khóa tạm (nếu áp dụng cho R10, nếu không thì ẩn)
- thẻ số chiến dịch đang chạy
- thẻ chi tiêu hôm nay / kỳ hiện tại
- biểu đồ chi tiêu theo ngày (tạm thời / đã chốt)
- bảng chiến dịch gần đây
- khối cảnh báo:
  - chiến dịch hết ngân sách
  - chiến dịch bị từ chối
  - hóa đơn nạp chờ xử lý
- nút tạo chiến dịch
- nút tạo hóa đơn nạp

### Quy tắc dữ liệu
- Số liệu phải ghi rõ nhãn “tạm thời” hoặc “đã chốt” khi áp dụng.
- Dữ liệu chi tiết chỉ trong phạm vi tài khoản R10 hiện tại.
- Nếu không có dữ liệu, hiển thị trạng thái trống kèm gợi ý hành động đầu tiên.

### Ngoại lệ hiển thị
- Lỗi tải biểu đồ: giữ thẻ tổng quan, hiển thị khung lỗi riêng cho biểu đồ.
- Mất quyền phiên: điều hướng về đăng nhập và hiển thị thông báo phù hợp.

## 9.2 M20-20 — Tạo hóa đơn nạp tiền

### Mục tiêu
Cho R10 tạo hóa đơn nạp tiền thủ công theo TL08.

### Trường dữ liệu
- số tiền muốn nạp (bắt buộc)
- phương thức nạp:
  - chuyển khoản ngân hàng
  - USDT thủ công (nếu bật)
- ghi chú (tùy chọn)

### Thành phần hiển thị sau khi tạo thành công
- mã hóa đơn
- trạng thái ban đầu
- số tiền
- thông tin thanh toán (ngân hàng hoặc ví USDT)
- nội dung tham chiếu
- ảnh mã (ngân hàng hoặc USDT)
- cảnh báo sai mạng (USDT)
- nút tải chứng từ
- nút xem chi tiết hóa đơn

### Kiểm tra hợp lệ
- số tiền > 0 và trong giới hạn cấu hình (TL17 nếu có)
- phương thức nạp đang bật
- ngôn ngữ hiển thị đúng bản dịch

### Hành vi lỗi
- Phương thức vừa bị tắt do thay đổi cấu hình: báo lỗi và yêu cầu tải lại thông tin.
- Cấu hình thanh toán thiếu ảnh mã hoặc dữ liệu bắt buộc: hiển thị thông báo lỗi hệ thống có mã tham chiếu.

## 9.3 M20-21 — Chi tiết hóa đơn nạp tiền

### Mục tiêu
Theo dõi trạng thái hóa đơn và thực hiện tải/cập nhật chứng từ.

### Thành phần chính
- khối thông tin hóa đơn:
  - mã
  - trạng thái
  - thời gian tạo
  - thời gian hết hạn
  - số tiền
  - phương thức
- khối thông tin thanh toán
- khối chứng từ:
  - danh sách tệp đã tải
  - nút tải thêm hoặc thay thế (nếu trạng thái cho phép)
- tiến trình trạng thái (dựa trên TL08/TL14)
- khối lịch sử xử lý
- nút hủy hóa đơn (nếu trạng thái cho phép theo TL08)

### Quy tắc theo trạng thái
- `chờ thanh toán`: cho tải chứng từ / cập nhật chứng từ / hủy
- `đang xác minh`: khóa biểu mẫu nhưng cho xem
- `thành công`: khóa tải chứng từ
- `thất bại` / `từ chối`: khóa theo quy tắc, hiển thị lý do
- `hết hạn`: chỉ cho xem, có thể hướng dẫn tạo hóa đơn mới

## 9.4 M20-30 — Danh sách chiến dịch

### Mục tiêu
Quản lý danh sách chiến dịch của R10 với lọc, tìm kiếm, thao tác theo trạng thái.

### Bộ lọc tối thiểu
- trạng thái chiến dịch (theo TL14)
- khoảng thời gian tạo
- loại chiến dịch
- từ khóa tìm kiếm theo tên chiến dịch
- nhãn số liệu tạm thời/đã chốt (ở phần báo cáo nếu cùng trang)

### Cột dữ liệu tối thiểu
- mã chiến dịch
- tên chiến dịch
- trạng thái
- ngân sách tổng
- ngân sách đã dùng
- đơn giá theo lượt
- giới hạn lượt/ngày
- thời gian tạo
- cập nhật gần nhất
- thao tác

### Thao tác theo trạng thái (bám TL10 + TL03)
- xem chi tiết
- sửa (nếu trạng thái cho phép)
- gửi duyệt
- tạm dừng
- tiếp tục
- hủy

### Quy tắc hiển thị thao tác
- Nếu không đủ quyền: ẩn.
- Nếu quyền có nhưng trạng thái không cho phép: vô hiệu + chú giải ngắn.

## 9.5 M20-31 / M20-33 — Tạo mới và chỉnh sửa chiến dịch

### Mục tiêu
Tạo hoặc chỉnh sửa chiến dịch tính theo lượt đúng TL10.

### Bố cục đề xuất theo bước
- Bước 1: Thông tin cơ bản
- Bước 2: Cấu hình ngân sách và tính theo lượt
- Bước 3: Nhắm mục tiêu (quốc gia, thiết bị, trình duyệt, khung giờ)
- Bước 4: Xem lại và lưu nháp / gửi duyệt

### Trường dữ liệu cốt lõi
- tên chiến dịch
- đường dẫn đích
- mô tả (tùy chọn)
- ngân sách tổng
- giới hạn lượt/ngày
- đơn giá theo lượt (hiển thị theo cấu hình giá, có thể chỉ đọc)
- thời gian bắt đầu / kết thúc
- danh sách quốc gia mục tiêu
- thiết bị
- trình duyệt
- khung giờ
- tùy chọn cấu hình khác theo TL10/TL17 (nếu bật)

### Kiểm tra hợp lệ biểu mẫu
- trường bắt buộc không rỗng
- định dạng đường dẫn hợp lệ
- ngân sách và giới hạn không âm
- thời gian bắt đầu trước thời gian kết thúc
- cấu hình nhắm mục tiêu không mâu thuẫn
- đơn giá hiển thị khớp cấu hình hiệu lực

### Hiển thị tính toán ước tính
- hiển thị chi phí ước tính theo cấu hình hiện hành
- gắn nhãn “ước tính”
- lưu dấu thời điểm tham chiếu cấu hình để giảm hiểu nhầm nếu cấu hình đổi sau đó

### Lưu nháp và gửi duyệt
- **Lưu nháp**: cho phép khi thỏa mức tối thiểu
- **Gửi duyệt**: bắt buộc kiểm tra đầy đủ
- Sau gửi duyệt, hiển thị trạng thái và hướng dẫn bước tiếp theo

## 9.6 M20-32 — Chi tiết chiến dịch

### Mục tiêu
Cho R10 xem đầy đủ cấu hình, trạng thái, thống kê, nhật ký chiến dịch.

### Thành phần chính
- khối tóm tắt trạng thái
- khối cấu hình chiến dịch (chỉ đọc)
- khối số liệu:
  - lượt hợp lệ tạm thời
  - lượt bị loại
  - chi tiêu tạm thời
  - số liệu đã chốt (nếu có)
- biểu đồ theo ngày
- bảng sự kiện / nhật ký chiến dịch (mức phù hợp cho R10)
- khối lỗi / cảnh báo chiến dịch
- cụm nút thao tác theo trạng thái

### Ràng buộc hiển thị
- Không hiển thị dữ liệu chống gian lận nhạy cảm vượt mức cho R10.
- Lý do loại lượt hiển thị ở mức nhóm lý do, không hiển thị quá chi tiết nếu TL03/TL12 giới hạn.
- Phân biệt rõ “đang xử lý” với “đã chốt”.

---

## 10. Đặc tả màn hình lõi — Cổng nhà xuất bản (R20)

## 10.1 M21-10 — Bảng điều khiển nhà xuất bản

### Mục tiêu
Cho R20 theo dõi liên kết, lượt hợp lệ, doanh thu, đối soát, rút tiền.

### Thành phần chính
- thẻ số dư khả dụng
- thẻ số dư khóa tạm
- thẻ doanh thu tạm thời hôm nay / kỳ
- thẻ doanh thu đã chốt
- thẻ yêu cầu rút chờ xử lý
- biểu đồ lượt hợp lệ và doanh thu theo ngày
- bảng liên kết hiệu quả cao
- khối cảnh báo:
  - liên kết bị khóa
  - yêu cầu rút bị từ chối
  - đối soát có điều chỉnh

### Quy tắc hiển thị
- Doanh thu tạm thời và đã chốt phải hiển thị tách biệt.
- Nếu có điều chỉnh sau chốt, hiển thị nhãn và giải thích ngắn.

## 10.2 M21-20 — Danh sách liên kết rút gọn

### Mục tiêu
Quản lý liên kết của R20 và truy cập nhanh vào thống kê.

### Bộ lọc tối thiểu
- trạng thái liên kết
- thời gian tạo
- tìm kiếm theo mã ngắn / bí danh / liên kết gốc
- lọc theo có doanh thu / không doanh thu (tùy chọn)

### Cột dữ liệu tối thiểu
- mã liên kết
- mã ngắn / bí danh
- trạng thái
- liên kết gốc (rút gọn hiển thị)
- liên kết dự phòng (chỉ báo có/không)
- lượt hợp lệ
- doanh thu tạm thời
- doanh thu đã chốt
- thời gian tạo
- thao tác

### Thao tác
- xem chi tiết
- sửa (trường cho phép)
- sao chép liên kết
- vô hiệu hóa yêu cầu (nếu R20 được phép theo quy định)
- tạo mới

## 10.3 M21-21 / M21-23 — Tạo và chỉnh sửa liên kết rút gọn

### Mục tiêu
Tạo/chỉnh sửa liên kết đúng TL11.

### Trường dữ liệu
- liên kết gốc (bắt buộc)
- bí danh (tùy chọn, duy nhất)
- liên kết dự phòng (tùy chọn)
- ghi chú (tùy chọn)
- tùy chọn hiển thị trung gian (nếu cho phép cấu hình)
- tùy chọn báo lỗi hiển thị (nếu có)

### Kiểm tra hợp lệ
- liên kết gốc đúng định dạng
- bí danh không trùng
- liên kết dự phòng đúng định dạng
- liên kết gốc không thuộc danh mục chặn theo chính sách
- trường được sửa phải theo trạng thái liên kết

### Hành vi khi lỗi
- Bí danh trùng: báo lỗi trường cụ thể.
- Liên kết bị chặn: báo lý do ở mức phù hợp, không lộ chi tiết danh sách chặn nội bộ.
- Thay đổi bị từ chối do liên kết đang bị khóa: hiển thị trạng thái và hướng dẫn liên hệ hỗ trợ.

## 10.4 M21-22 — Chi tiết liên kết

### Mục tiêu
Xem đầy đủ cấu hình, trạng thái, thống kê, báo lỗi, lịch sử liên kết.

### Thành phần chính
- tóm tắt liên kết:
  - mã liên kết
  - mã ngắn
  - trạng thái
  - liên kết gốc
  - liên kết dự phòng
- khối thống kê:
  - lượt truy cập
  - lượt hợp lệ tạm thời
  - lượt bị loại
  - doanh thu tạm thời
  - doanh thu đã chốt
- biểu đồ theo ngày / theo quốc gia / theo thiết bị (mức phù hợp)
- bảng báo lỗi từ người dùng R01
- nhật ký thay đổi liên kết
- thao tác nhanh: sao chép, chỉnh sửa (nếu được phép)

### Ràng buộc hiển thị
- Không hiển thị chi tiết chống gian lận nội bộ vượt quyền R20.
- Nếu liên kết bị khóa, hiển thị lý do ở mức tóm tắt và hướng dẫn liên hệ.

## 10.5 M21-30 — Tạo yêu cầu rút tiền

### Mục tiêu
Tạo yêu cầu rút đúng TL09 với UX rõ ràng, tránh nhầm.

### Thành phần chính
- số dư khả dụng
- số dư khóa tạm
- ngưỡng rút tối thiểu
- phương thức rút:
  - ngân hàng
  - USDT (nếu bật)
- thông tin nhận tiền (lấy từ cấu hình hồ sơ nhận tiền)
- số tiền rút
- cảnh báo phí / quy tắc (nếu có)
- nút xác nhận tạo yêu cầu rút

### Kiểm tra hợp lệ
- đủ ngưỡng
- không vượt số dư khả dụng
- hồ sơ nhận tiền hợp lệ
- phương thức đang bật
- nếu USDT: có mạng chuỗi khối và cảnh báo rõ

### Sau khi tạo thành công
- hiển thị mã yêu cầu rút
- trạng thái ban đầu
- tác động tới số dư:
  - tăng khóa tạm
  - giảm khả dụng (nếu áp dụng mô hình hiển thị này)
- hướng dẫn theo dõi trạng thái ở danh sách/chi tiết

## 10.6 M21-31 / M21-32 — Danh sách và chi tiết yêu cầu rút tiền

### Mục tiêu
Theo dõi trạng thái và lịch sử xử lý rút tiền.

### Cột danh sách tối thiểu
- mã yêu cầu
- thời gian tạo
- số tiền
- phương thức
- trạng thái
- thời gian cập nhật
- thao tác xem chi tiết

### Chi tiết yêu cầu rút
- thông tin yêu cầu
- tiến trình trạng thái
- lý do từ chối (nếu có)
- thông tin nhận tiền chụp nhanh
- bằng chứng xử lý (nếu hiển thị cho R20 theo chính sách)
- lịch sử xử lý

### Quy tắc hiển thị
- Phân biệt rõ “từ chối” và “hoàn tiền” (TL09).
- Không hiển thị dữ liệu nhạy cảm nội bộ quản trị nếu không được phép.

---

## 11. Đặc tả màn hình lõi — Cổng quản trị (R30, R40)

## 11.1 Nguyên tắc UX riêng cho cổng quản trị

- Tập trung vào tốc độ tra cứu, thao tác theo hàng đợi và kiểm soát rủi ro.
- Các màn hình danh sách phải hỗ trợ lọc mạnh và lưu bộ lọc (nếu có).
- Các thao tác nhạy cảm phải có xác nhận + lý do + nhật ký.
- R40 nhìn thấy dữ liệu đã che theo TL03, không nhìn thấy thao tác không được phép.
- Các trang quản trị phải hiển thị mã thực thể rõ để truy vết với TL15, TL18.

## 11.2 M30-20 — Danh sách hóa đơn nạp tiền (duyệt nạp)

### Mục tiêu
Quản lý hàng chờ nạp tiền thủ công theo TL08.

### Bộ lọc tối thiểu
- trạng thái hóa đơn
- phương thức nạp (ngân hàng / USDT)
- khoảng thời gian tạo
- khoảng thời gian cập nhật
- người dùng
- số tiền
- có chứng từ / không có chứng từ
- hàng ngoại lệ

### Cột dữ liệu tối thiểu
- mã hóa đơn
- người dùng
- số tiền
- phương thức
- trạng thái
- thời gian tạo
- hết hạn
- số lượng chứng từ
- người xử lý
- thao tác

### Thao tác
- xem chi tiết
- duyệt
- từ chối
- chuyển hàng ngoại lệ
- ghi chú (R40 có thể được phép theo TL03/TL08)

### Quy tắc hiển thị
- Hóa đơn hết hạn phải có nhãn rõ.
- Hóa đơn đã xử lý xong không hiển thị nút duyệt/từ chối.

## 11.3 M30-21 / M30-22 — Chi tiết và xử lý hóa đơn nạp

### Mục tiêu
Thực hiện duyệt hoặc từ chối hóa đơn với đầy đủ thông tin đối chiếu.

### Thành phần chi tiết
- thông tin hóa đơn
- thông tin người dùng
- thông tin thanh toán mục tiêu
- nội dung tham chiếu
- trạng thái, thời gian
- danh sách chứng từ (xem trước)
- lịch sử xử lý
- số dư ví hiện tại (mức hiển thị phù hợp cho R30)
- sổ cái liên quan (nếu đã xử lý)

### Cụm thao tác xử lý (R30)
- nút duyệt
- nút từ chối
- nhập lý do bắt buộc
- xác nhận lần cuối

### Ràng buộc UX chống sai sót
- Hiển thị cảnh báo “duyệt sẽ cộng số dư” rõ ràng.
- Nếu hóa đơn có dấu hiệu đã xử lý bởi tiến trình khác, khóa màn hình thao tác và yêu cầu tải lại.
- Nếu phát hiện nguy cơ xử lý trùng, hiển thị cảnh báo nổi bật và không cho bấm tiếp theo TL08/TL15.

## 11.4 M30-30 / M30-31 / M30-32 — Danh sách, chi tiết và xử lý yêu cầu rút

### Mục tiêu
Thực hiện quy trình rút tiền thủ công đúng TL09.

### Thành phần chi tiết bắt buộc
- thông tin yêu cầu rút
- trạng thái hiện tại
- số tiền
- thông tin nhận tiền chụp nhanh
- số dư khả dụng và khóa tạm liên quan
- lịch sử xử lý
- bằng chứng xử lý (nếu có)
- sổ cái liên quan

### Thao tác theo trạng thái (R30)
- duyệt
- từ chối
- đánh dấu đã gửi (nếu quy trình tách bước)
- hoàn thành
- hoàn tiền (ngoại lệ theo TL09)
- tải bằng chứng xử lý

### Ràng buộc UX
- Phân biệt rõ nút “từ chối” và “hoàn tiền” bằng nhãn + mô tả.
- Với hoàn tiền, hiển thị tác động mở khóa / hoàn số dư.
- Yêu cầu lý do bắt buộc cho từ chối và hoàn tiền.

## 11.5 M30-40 / M30-42 — Danh sách chiến dịch và duyệt chiến dịch

### Mục tiêu
Quản lý hàng chờ duyệt chiến dịch, giám sát trạng thái chiến dịch toàn hệ thống.

### Bộ lọc
- trạng thái chiến dịch (10 trạng thái)
- thời gian tạo
- người dùng
- loại chiến dịch
- ngân sách
- có cảnh báo cấu hình / lỗi cấu hình

### Chi tiết duyệt chiến dịch
- cấu hình chiến dịch
- nhắm mục tiêu
- ngân sách, đơn giá, giới hạn
- kiểm tra hợp lệ hệ thống
- cảnh báo cấu hình
- lịch sử chỉnh sửa
- thao tác duyệt / từ chối (R30)

### Ràng buộc UX
- Hiển thị rõ các trường “khóa sau khi chạy”.
- Từ chối bắt buộc nhập lý do.
- Nếu lỗi cấu hình hệ thống, không cho duyệt và hiển thị mã lỗi TL14.

## 11.6 M30-60 / M30-61 / M30-63 — Chống gian lận và kiểm tra thủ công sự kiện

### Mục tiêu
Cho R30 quyết định sự kiện cần kiểm tra thủ công; R40 tra cứu và ghi chú.

### Danh sách hàng kiểm tra thủ công
- bộ lọc theo trạng thái sự kiện lượt
- nhóm lý do gắn cờ
- điểm rủi ro
- thời gian sự kiện
- liên kết / chiến dịch
- người dùng sở hữu liên quan
- quyết định hiện tại
- người xử lý

### Chi tiết sự kiện lượt
- mã sự kiện
- trạng thái hiện tại (7 trạng thái)
- dữ liệu truy vết cơ bản
- lý do bị gắn cờ
- dữ liệu liên quan:
  - chiến dịch (nếu có)
  - liên kết (nếu có)
- ảnh hưởng dự kiến đến:
  - chi tiêu chiến dịch
  - doanh thu nhà xuất bản
- nhật ký quyết định trước đó
- ghi chú hỗ trợ (R40)

### Thao tác
- R40:
  - xem
  - ghi chú
  - chuyển hàng xử lý (nếu được phép)
- R30:
  - quyết định hợp lệ / bị loại / giữ cần xử lý thêm theo TL12
  - nhập lý do quyết định
  - xác nhận thao tác

### Ràng buộc UX
- Phải hiển thị rõ vai trò đang thao tác (R30 hay R40).
- Với quyết định ảnh hưởng tài chính, hiển thị cảnh báo tác động.
- Không cho R40 thấy nút quyết định cuối.

## 11.7 M30-70 / M30-71 / M30-72 / M30-73 — Đối soát và kết chuyển

### Mục tiêu
Cho R30 chốt kỳ, kết chuyển doanh thu, điều chỉnh sau chốt đúng TL16.

### M30-70 Bảng tổng hợp và đối soát kỳ
- chọn kỳ / khoảng thời gian
- chỉ số tạm thời / đã chốt
- số sự kiện chờ xử lý thủ công
- số sự kiện đến trễ
- cảnh báo dữ liệu chưa ổn định
- trạng thái đối soát kỳ
- nút chạy chốt (nếu đủ điều kiện)

### M30-71 Chạy chốt đối soát
- màn hình xác nhận tham số kỳ
- hiển thị kiểm tra trước chạy:
  - số lượng hàng chờ
  - cấu hình hiệu lực
  - trạng thái hàng đợi
- xác nhận chạy
- hiển thị tiến trình / kết quả chạy
- khóa tránh bấm trùng

### M30-72 Kết chuyển doanh thu
- danh sách kỳ đã chốt đủ điều kiện
- số lượng bút toán dự kiến
- kiểm tra chống kết chuyển trùng
- xác nhận kết chuyển
- xem kết quả / lỗi theo lô

### M30-73 Điều chỉnh sau chốt
- tạo yêu cầu điều chỉnh
- mô tả lý do
- chọn thực thể ảnh hưởng
- xem trước tác động
- xác nhận thao tác
- nhật ký điều chỉnh

### Ràng buộc UX
- Phải có nhãn **tác vụ nặng / tác vụ nền**.
- Có mã chạy / mã tác vụ để truy vết TL18.
- Nút thao tác bị khóa khi tác vụ cùng loại đang chạy.

## 11.8 M30-80 đến M30-89 — Cấu hình hệ thống

### Mục tiêu
Quản lý cấu hình theo vòng đời TL17.

### Yêu cầu chung cho các màn hình cấu hình
- phân biệt bản nháp / chờ duyệt / đã xuất bản / hết hiệu lực
- hiển thị thời gian hiệu lực
- hiển thị phạm vi áp dụng
- cảnh báo chồng chéo hiệu lực
- so sánh phiên bản cấu hình
- xem lịch sử thay đổi
- thao tác duyệt/xuất bản/hoàn tác theo quyền R30

### Màn hình cấu hình thanh toán (ngân hàng, USDT)
- biểu mẫu có:
  - tên hiển thị
  - trường bắt buộc theo loại
  - ảnh mã
  - trạng thái bật/tắt
  - thứ tự hiển thị
  - nội dung hướng dẫn song ngữ
- xem trước giao diện hiển thị phía người dùng (nếu triển khai)

### Màn hình cấu hình giá theo lượt
- phạm vi áp dụng
- mức giá
- đơn vị tiền
- hiệu lực từ ngày
- quy tắc ưu tiên
- cảnh báo chồng chéo

### Màn hình cấu hình khuyến mãi nạp
- ngưỡng nạp
- giá trị khuyến mãi
- hiệu lực
- điều kiện áp dụng
- cảnh báo xung đột

## 11.9 M30-90 đến M30-95 — Nhật ký, giám sát, cảnh báo

### Mục tiêu
Hỗ trợ vận hành và điều tra sự cố theo TL18.

### Bảng giám sát hệ thống (M30-90)
- thẻ sức khỏe dịch vụ
- tình trạng hàng đợi
- chỉ số xử lý lõi (nạp, rút, chiến dịch, liên kết, chống gian lận, đối soát)
- trạng thái tác vụ nền
- liên kết nhanh tới cảnh báo và nhật ký

### Danh sách cảnh báo (M30-91)
- bộ lọc:
  - mức độ
  - trạng thái cảnh báo
  - nhóm hệ thống
  - thời gian
- cột:
  - mã cảnh báo
  - mức độ
  - nhóm
  - trạng thái
  - thời gian bắt đầu
  - người nhận xử lý
  - thao tác

### Chi tiết cảnh báo (M30-92)
- thông tin cảnh báo
- chỉ số liên quan
- lịch sử trạng thái cảnh báo
- hành động:
  - xác nhận
  - chuyển cấp
  - đóng
- liên kết truy vết tới nhật ký liên quan

### Nhật ký kiểm toán / ứng dụng (M30-93, M30-94)
- tra cứu theo:
  - mã yêu cầu
  - người dùng
  - thực thể
  - mã chức năng NV
  - mã lỗi
  - khoảng thời gian
- hiển thị dữ liệu đã che theo chính sách TL18/TL19

---

## 12. Đặc tả màn hình cổng công khai chuyển hướng (R01)

## 12.1 Nguyên tắc UX cổng công khai

- Tối giản, rõ ràng, minh bạch.
- Không gây hiểu nhầm rằng đây là trang đích cuối cùng.
- Hiển thị đủ thông tin để người dùng hiểu trạng thái liên kết.
- Không tiết lộ thông tin nội bộ về chống gian lận hay danh sách chặn.
- Hỗ trợ ngôn ngữ theo:
  - tham số ngôn ngữ
  - cấu hình mặc định
  - hoặc trình duyệt (nếu triển khai)

## 12.2 M01-01 — Trang xác minh truy cập hợp lệ

### Mục tiêu
Xác minh truy cập ở mức hợp lệ để bảo vệ nền tảng (không phục vụ mục tiêu lách hệ thống bên thứ ba).

### Thành phần chính
- tiêu đề ngắn giải thích bước xác minh
- nội dung giải thích lý do xác minh
- thành phần xác minh người dùng (theo giải pháp được chọn)
- nút tiếp tục (nếu cần)
- liên kết trợ giúp / báo lỗi
- chính sách quyền riêng tư ngắn hoặc liên kết

### Hành vi theo trạng thái
- đang tải xác minh
- xác minh thành công
- xác minh thất bại
- hết thời gian
- lỗi hệ thống

### Ràng buộc
- Không nêu chi tiết thuật toán chống gian lận nội bộ.
- Không hiển thị thông tin kỹ thuật nhạy cảm.
- Nếu thất bại nhiều lần, hiển thị hướng dẫn hỗ trợ thay vì chỉ báo lỗi chung.

## 12.3 M01-02 — Trang thông tin trung gian

### Mục tiêu
Hiển thị thông tin trung gian trước khi chuyển hướng và ghi nhận sự kiện theo TL11/TL12/TL16.

### Thành phần chính
- thông báo đang chuẩn bị chuyển hướng
- tên hoặc mô tả ngắn liên kết (nếu được phép hiển thị)
- đếm ngược (nếu thiết kế có dùng)
- nút tiếp tục
- nút báo lỗi liên kết
- ghi chú an toàn / minh bạch

### Ràng buộc UX
- Không dùng ngôn ngữ gây hiểu nhầm hoặc ép buộc.
- Không chứa hướng dẫn thao túng hành vi trên nền tảng tìm kiếm.
- Đảm bảo rõ ràng đây là bước trung gian của liên kết rút gọn.

## 12.4 M01-04 / M01-05 — Trang lỗi liên kết / bị khóa / hết hạn

### Mục tiêu
Thông báo lỗi rõ ràng, hỗ trợ người dùng R01 báo lỗi hoặc quay lại.

### Trạng thái lỗi cần hỗ trợ hiển thị
- liên kết không tồn tại
- liên kết bị khóa
- liên kết hết hạn
- liên kết tạm lỗi
- đích không truy cập được
- yêu cầu không hợp lệ

### Thành phần chính
- tiêu đề lỗi rõ ràng
- mô tả ngắn
- mã lỗi hiển thị (nếu phù hợp)
- nút thử lại (nếu hợp lý)
- nút báo lỗi liên kết
- liên kết quay lại trang trước

## 12.5 M01-06 — Trang báo lỗi liên kết

### Mục tiêu
Cho người dùng công khai gửi báo lỗi đơn giản, giúp R20/R30 xử lý.

### Trường tối thiểu
- loại lỗi gặp phải
- mô tả thêm (tùy chọn)
- địa chỉ liên hệ (tùy chọn)
- mã liên kết (tự điền nếu có)

### Kiểm tra hợp lệ
- chống gửi lặp / chống lạm dụng ở mức cơ bản
- giới hạn độ dài mô tả
- hiển thị thông báo gửi thành công hoặc thất bại rõ ràng

---

## 13. Đặc tả trạng thái hiển thị và thông báo theo nghiệp vụ

## 13.1 Hóa đơn nạp tiền (TL08 + TL14)

### Yêu cầu hiển thị bắt buộc
- nhãn trạng thái
- tiến trình trạng thái
- hành động khả dụng theo trạng thái
- thời điểm cập nhật gần nhất
- lý do từ chối / thất bại (nếu có)
- cảnh báo hết hạn (nếu sắp hết hạn)

### Ví dụ hành vi UI
- `chờ thanh toán`: hiển thị thông tin thanh toán + tải chứng từ
- `đang xác minh`: khóa chỉnh sửa, hiển thị thông báo đang xử lý
- `thành công`: nhấn mạnh số dư đã được cộng
- `thất bại` / `từ chối`: hiển thị lý do và gợi ý tạo hóa đơn mới
- `hết hạn`: ẩn nút tải chứng từ, hiển thị nút tạo mới

## 13.2 Yêu cầu rút tiền (TL09 + TL14)

### Yêu cầu hiển thị bắt buộc
- nhãn trạng thái
- tiến trình trạng thái
- tác động số dư (khả dụng / khóa tạm)
- lý do từ chối hoặc hoàn tiền
- bằng chứng xử lý (nếu quyền cho phép)

### UX cần tránh
- Không dùng cùng một nhãn cho “từ chối” và “hoàn tiền”.
- Không hiển thị số dư cập nhật chậm mà không có nhãn “đang đồng bộ”.

## 13.3 Chiến dịch (TL10 + TL14)

### Yêu cầu hiển thị bắt buộc
- hiển thị đủ 10 trạng thái
- hành động theo trạng thái
- cảnh báo ngân sách
- cảnh báo lỗi cấu hình
- phân biệt số liệu tạm thời / đã chốt

### Trạng thái đặc biệt cần giải thích
- `lỗi cấu hình`
- `hết ngân sách`
- `bị từ chối`

## 13.4 Liên kết rút gọn (TL11 + TL14)

### Yêu cầu hiển thị bắt buộc
- trạng thái liên kết
- trạng thái hoạt động công khai
- lượt hợp lệ / bị loại
- doanh thu tạm thời / đã chốt
- lý do khóa (ở mức phù hợp quyền)

## 13.5 Sự kiện lượt (TL12 + TL14)

Dành cho cổng quản trị:

- hiển thị đủ 7 trạng thái
- nhóm lý do loại hoặc gắn cờ
- điểm rủi ro (nếu được hiển thị)
- quyết định kiểm tra thủ công
- tác động tài chính dự kiến (nếu có)

---

## 14. Đặc tả lỗi giao diện và xử lý ngoại lệ UX

## 14.1 Nhóm lỗi biểu mẫu

### Quy tắc chung
- Hiển thị lỗi ngay dưới trường.
- Trường lỗi được đánh dấu rõ.
- Khi gửi biểu mẫu thất bại, cuộn đến lỗi đầu tiên.
- Không xóa dữ liệu người dùng đã nhập nếu lỗi xác thực.

### Ví dụ
- số tiền không hợp lệ
- đường dẫn không hợp lệ
- bí danh trùng
- thời gian không hợp lệ
- thiếu trường bắt buộc

## 14.2 Nhóm lỗi giao diện lập trình và tải dữ liệu

### Quy tắc chung
- Hiển thị thông báo tổng quan cho người dùng
- Nếu thao tác quan trọng: hiển thị mã lỗi + mã yêu cầu
- Cho phép thử lại ở mức thành phần
- Tránh tải lại toàn trang nếu không cần

### Trường hợp bắt buộc có UI rõ
- lỗi tải danh sách
- lỗi tải biểu đồ
- lỗi gửi duyệt
- lỗi duyệt tài chính
- lỗi chạy đối soát / kết chuyển
- lỗi tải tệp chứng từ

## 14.3 Nhóm ngoại lệ cạnh tranh thao tác

Các tình huống điển hình:
- thực thể đã được người khác xử lý
- trạng thái thay đổi trong lúc đang mở màn hình
- cấu hình thay đổi trước khi bấm xác nhận
- tác vụ nền đang chạy, không cho chạy trùng

### UX bắt buộc
- thông báo “dữ liệu đã thay đổi”
- nút tải lại dữ liệu
- hiển thị trạng thái mới
- ngăn thao tác tiếp nếu không còn hợp lệ

---

## 15. Đặc tả hành vi bảng dữ liệu, lọc, phân trang, xuất dữ liệu

## 15.1 Quy tắc chung cho bảng dữ liệu

- Bảng phải có phân trang phía máy chủ cho danh sách lớn.
- Hỗ trợ sắp xếp theo cột phù hợp.
- Bộ lọc phải có nút:
  - áp dụng
  - đặt lại
- Có hiển thị số kết quả tổng.
- Lưu trạng thái lọc trong URL (khuyến nghị) để thuận tiện chia sẻ và hỗ trợ.

## 15.2 Bộ lọc thời gian

- Hỗ trợ chọn khoảng thời gian
- Hiển thị múi giờ áp dụng
- Với báo cáo đã chốt: hiển thị rõ kỳ đối soát
- Với số liệu tạm thời: hiển thị cảnh báo số liệu có thể thay đổi

## 15.3 Xuất dữ liệu (nếu phiên bản đầu có hỗ trợ)

Nếu hỗ trợ xuất dữ liệu:

- chỉ vai trò được phép mới thấy nút xuất
- hiển thị phạm vi dữ liệu xuất
- gắn dấu thời gian và múi giờ trong tệp xuất
- ghi nhật ký thao tác xuất theo TL18/TL19
- che trường nhạy cảm theo vai trò

---

## 16. Đặc tả biểu mẫu tải tệp (chứng từ nạp/rút, ảnh cấu hình)

## 16.1 Thành phần tải tệp dùng chung

### Tính năng tối thiểu
- kéo thả hoặc chọn tệp
- hiển thị tiến trình tải
- xem trước tệp hình ảnh
- xóa tệp đã chọn trước khi gửi
- hiển thị lỗi định dạng / kích thước
- hiển thị trạng thái tải thành công / thất bại

## 16.2 Ràng buộc giao diện theo TL19

- Hiển thị rõ định dạng tệp cho phép
- Hiển thị giới hạn kích thước
- Không hiển thị đường dẫn tệp nội bộ
- Không tự động thực thi hay nhúng nội dung nguy hiểm
- Nếu tải thất bại do kiểm tra an toàn, thông báo ở mức phù hợp, không lộ chi tiết nội bộ

## 16.3 Màn hình áp dụng
- M20-23 (chứng từ nạp)
- M30-22 (xử lý nạp, xem chứng từ)
- M30-32 (xử lý rút, tải bằng chứng)
- M30-85 / M30-86 (ảnh mã ngân hàng / USDT)
- M30-89 (nếu có tệp nội dung thông báo, tùy triển khai)

---

## 17. Đặc tả trung tâm thông báo và trải nghiệm hỗ trợ

## 17.1 Trung tâm thông báo người dùng (R10, R20)

### Mục tiêu
Hiển thị thông báo quan trọng theo nghiệp vụ, hỗ trợ người dùng theo dõi trạng thái thay đổi.

### Loại thông báo tối thiểu
- nạp tiền được duyệt / từ chối
- yêu cầu rút thay đổi trạng thái
- chiến dịch được duyệt / từ chối / hết ngân sách / lỗi cấu hình
- liên kết bị khóa / mở khóa
- đối soát có điều chỉnh
- thông báo hệ thống

### Chức năng tối thiểu
- danh sách thông báo
- đánh dấu đã đọc / chưa đọc
- lọc theo loại
- điều hướng tới màn hình liên quan

### Ràng buộc UX
- Nội dung thông báo song ngữ.
- Không đưa toàn bộ dữ liệu nhạy cảm vào thông báo.
- Nếu thông báo liên quan thao tác nhạy cảm, hiển thị mã tham chiếu để hỗ trợ tra cứu.

## 17.2 Phiếu hỗ trợ (R10, R20, R40, R30)

### Mục tiêu
Tạo kênh hỗ trợ có cấu trúc, truy vết được.

### Trường tạo phiếu tối thiểu
- chủ đề
- nhóm vấn đề
- mô tả
- thực thể liên quan (hóa đơn / yêu cầu rút / chiến dịch / liên kết) nếu có
- tệp đính kèm (tùy chọn, theo chính sách)

### Màn hình chi tiết phiếu
- tiến trình trạng thái phiếu
- lịch sử trao đổi
- thông tin người phụ trách
- nhãn ưu tiên (nếu có)
- liên kết nhanh sang thực thể liên quan (theo quyền)

### Quyền hiển thị
- R10/R20 chỉ thấy phiếu của mình
- R40 thấy phiếu được phân công hoặc phạm vi cho phép
- R30 thấy theo phạm vi quản trị

---

## 18. Đặc tả trải nghiệm khu nhà phát triển (R20)

## 18.1 Mục tiêu

Cung cấp tài liệu và công cụ ở mức vừa đủ cho R20 tích hợp tính năng rút gọn liên kết và theo dõi, nhưng không thay thế TL15.

## 18.2 M21-40 — Khu nhà phát triển (tổng quan)

### Thành phần chính
- giới thiệu ngắn
- trạng thái dịch vụ giao diện lập trình
- liên kết tới tài liệu tích hợp
- liên kết quản lý khóa truy cập (nếu bật)
- lưu ý về giới hạn gọi và bảo mật

## 18.3 M21-41 — Quản lý khóa truy cập (nếu bật)

### Thành phần chính
- danh sách khóa
- trạng thái khóa
- thời gian tạo
- quyền phạm vi khóa (nếu có)
- thao tác:
  - tạo khóa mới
  - vô hiệu hóa
  - đổi tên nhãn
  - xem lần dùng gần nhất

### Ràng buộc UX bảo mật
- Chỉ hiển thị đầy đủ khóa tại thời điểm tạo.
- Sau đó chỉ hiển thị che một phần.
- Thao tác tạo/vô hiệu hóa phải có xác nhận và ghi nhật ký.

## 18.4 M21-42 — Tài liệu tích hợp rút gọn

### Nội dung hiển thị
- đường dẫn cơ sở giao diện lập trình
- quy tắc xác thực
- ví dụ tạo liên kết
- ví dụ đọc danh sách liên kết
- mã lỗi thường gặp
- liên kết tới tài liệu TL15 (bản dành cho nhà xuất bản nếu tách riêng)

---

## 19. Ma trận ưu tiên màn hình theo mức độ quan trọng

## 19.1 Mức P0 — Bắt buộc cho phát hành phiên bản đầu

### Cổng R10
- M20-01, M20-10, M20-20, M20-21, M20-22, M20-30, M20-31, M20-32

### Cổng R20
- M21-01, M21-10, M21-20, M21-21, M21-22, M21-30, M21-31, M21-32, M21-06

### Cổng R30/R40
- M30-01, M30-02
- M30-20, M30-21, M30-22
- M30-30, M30-31, M30-32
- M30-40, M30-41, M30-42
- M30-60, M30-61, M30-62, M30-63
- M30-70, M30-71, M30-72
- M30-80, M30-81, M30-83
- M30-90, M30-91, M30-92, M30-93

### Cổng công khai
- M01-01, M01-02, M01-04, M01-05, M01-06

## 19.2 Mức P1 — Nên có trong phiên bản đầu nếu đủ nguồn lực

- M20-11, M20-12, M20-34, M20-35
- M21-11, M21-12, M21-13, M21-24, M21-25, M21-40, M21-42
- M30-23, M30-33, M30-43, M30-44, M30-53, M30-64, M30-73, M30-74, M30-84, M30-85, M30-86, M30-87, M30-88, M30-94, M30-95

## 19.3 Mức P2 — Có thể dời sau

- Các màn hình tiện ích nâng cao, xuất dữ liệu nâng cao, nhật ký gọi giao diện lập trình chi tiết cho R20 (M21-43), so sánh cấu hình nâng cao, tùy biến dashboard nâng cao

---

## 20. Truy vết TL20 với tài liệu trước

## 20.1 Truy vết theo nghiệp vụ (TL02)

- NV01–NV08: màn hình xác thực, hồ sơ, thông báo
- NV09–NV15: M20-20..23, M30-20..23 (nạp tiền)
- NV16–NV23: M21-20..25, M30-50..53, M01-01..06 (liên kết và doanh thu)
- NV24–NV32: M20-30..35, M30-40..44 (chiến dịch)
- NV33–NV40: M21-30..32, M30-30..33 (rút tiền)
- NV41–NV45: M01-01..06, M30-60..64 (sự kiện truy cập, kiểm tra, báo lỗi)

## 20.2 Truy vết theo phân quyền (TL03)

- R10 ↔ nhóm M20-xx
- R20 ↔ nhóm M21-xx
- R30 ↔ nhóm M30-xx (đầy đủ)
- R40 ↔ tập con M30-xx theo ma trận TL03
- R01 ↔ nhóm M01-xx

## 20.3 Truy vết theo mã trạng thái và mã lỗi (TL14)

TL20 quy định:

- Mọi nhãn trạng thái hiển thị phải ánh xạ từ TL14.
- Mọi lỗi người dùng nhìn thấy từ giao diện lập trình phải dùng khuôn lỗi TL15 và mã lỗi TL14.
- Không tạo thêm trạng thái “giao diện” mâu thuẫn trạng thái nghiệp vụ.

## 20.4 Truy vết với kế hoạch kiểm thử chấp nhận (TL21)

- Các màn hình P0 phải được ưu tiên kiểm thử thủ công trong TL21.
- Các ca E2E trong TL21 phải có đường dẫn UI rõ qua các màn hình:
  - E2E-001: M21-21 → M01-01/02 → M21-10/22 → M21-30 → M30-32
  - E2E-002: M20-20/21 → M30-22 → M20-31/32 → M30-42 → M20-32
  - E2E-003: M30-61/62/63 + M30-64 + M30-70/73

---

## 21. Tiêu chí chấp nhận tài liệu TL20

TL20 được xem là đạt khi:

- Bao phủ đủ màn hình lõi của 4 cổng (R10, R20, R30/R40, R01)
- Phản ánh đúng nghiệp vụ và quyền theo TL02, TL03
- Không mâu thuẫn trạng thái và mã lỗi với TL14
- Không mâu thuẫn hành vi giao diện lập trình với TL15
- Hỗ trợ song ngữ Việt/Anh
- Có quy tắc rõ cho:
  - trạng thái hiển thị
  - lỗi hiển thị
  - thao tác nhạy cảm
  - responsive tối thiểu
  - thông báo và hỗ trợ
- Có ưu tiên màn hình P0/P1/P2 phục vụ triển khai và kiểm thử

---

## 22. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Nhất quán phạm vi hợp lệ theo TL01 và TL02
- [x] Không mô tả tính năng thao túng hệ thống tìm kiếm
- [x] Bám vai trò R01, R10, R20, R30, R40 theo TL03
- [x] Bám quy trình nạp tiền theo TL08
- [x] Bám quy trình rút tiền theo TL09
- [x] Bám vòng đời chiến dịch theo TL10
- [x] Bám quy trình liên kết và doanh thu nhà xuất bản theo TL11
- [x] Bám định nghĩa lượt hợp lệ và kiểm tra thủ công theo TL12
- [x] Không mâu thuẫn với mô hình dữ liệu mức khái niệm trong TL13
- [x] Dùng đúng chuẩn trạng thái / mã lỗi / danh mục mã theo TL14
- [x] Không mâu thuẫn với khuôn giao diện lập trình TL15
- [x] Bám cách tổng hợp / đối soát và tác vụ nền theo TL16
- [x] Bám vòng đời cấu hình theo TL17
- [x] Bám nhật ký / giám sát / cảnh báo theo TL18
- [x] Bám ràng buộc bảo mật và che dữ liệu theo TL19
- [x] Hỗ trợ truy vết cho kiểm thử chấp nhận theo TL21

---

## 23. Đầu vào cho tài liệu tiếp theo

- **TL22 — Đặc tả vận hành, triển khai và ứng cứu sự cố**
  - sử dụng TL20 để xác định:
    - luồng thao tác vận hành cần hướng dẫn
    - màn hình vận hành bắt buộc
    - quy trình xử lý sự cố có liên quan UI quản trị
- **TL23 — Điều khoản sử dụng, chính sách nội bộ và tuân thủ hiển thị**
  - sử dụng TL20 để xác định vị trí hiển thị:
    - điều khoản
    - cảnh báo thanh toán
    - cảnh báo USDT
    - quyền riêng tư
    - nội dung công khai trên cổng chuyển hướng

---

## 24. Ghi chú cuối tài liệu

- TL20 là đặc tả màn hình và trải nghiệm người dùng ở mức **đủ chi tiết để triển khai và kiểm thử**, không phải là bộ thiết kế đồ họa khóa chặt theo pixel.
- Đội giao diện và trợ lý lập trình có thể linh hoạt màu sắc, tiểu tiết hình ảnh và bố cục vi mô, nhưng **không được thay đổi**:
  - luồng nghiệp vụ
  - quyền thao tác
  - trạng thái hiển thị
  - nội dung cảnh báo bắt buộc
  - nguyên tắc song ngữ và bảo mật
- Nếu thay đổi TL02, TL03, TL08–TL19 hoặc TL21, phải rà soát cập nhật TL20 tương ứng.
