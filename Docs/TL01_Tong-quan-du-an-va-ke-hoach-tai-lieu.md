# Tài liệu 01 — Tổng quan dự án và kế hoạch bộ tài liệu kỹ thuật

## 1. Mục đích tài liệu

Tài liệu này là bản chốt nền tảng cho toàn bộ bộ hồ sơ kỹ thuật của dự án. Mục tiêu là:

- Khóa phạm vi sản phẩm để các tài liệu sau không lệch hướng.
- Thống nhất cách hiểu giữa chủ dự án, đội phát triển và trợ lý lập trình.
- Xác định danh sách tài liệu cần biên soạn, thứ tự thực hiện và đầu ra mong đợi cho từng tài liệu.
- Ghi rõ các ràng buộc pháp lý, vận hành và chất lượng ngay từ đầu.

Tài liệu này **không thay thế** các tài liệu chi tiết về nghiệp vụ, dữ liệu, giao diện lập trình, kiểm thử, vận hành. Nó là tài liệu gốc để tham chiếu xuyên suốt.

---

## 2. Bối cảnh dự án

Dự án hướng đến xây dựng một nền tảng hai phía có cấu trúc chức năng tương đương mô hình mà chủ dự án đã nghiên cứu:

- **Phía nhà xuất bản**: tạo liên kết rút gọn, theo dõi lượt truy cập hợp lệ, nhận doanh thu theo lượt, gửi yêu cầu rút tiền.
- **Phía khách hàng mua chiến dịch**: tạo chiến dịch quảng bá hợp lệ, nạp tiền, cấu hình ngân sách và giới hạn lượt, theo dõi chi tiêu và kết quả.
- **Phía quản trị**: quản lý người dùng, duyệt nạp rút thủ công, cấu hình giá theo lượt, cấu hình thanh toán ngân hàng và ví USDT, kiểm soát gian lận, theo dõi báo cáo tổng hợp.

Mức độ tương đương mong muốn:

- Tương đương về **bố cục tổng thể**
- Tương đương về **luồng nghiệp vụ chính**
- Tương đương về **danh sách màn hình chức năng**
- **Không sao chép nguyên bản** nhận diện, tiểu tiết giao diện, nhãn hiệu, nội dung thương hiệu của bên khác

---

## 3. Phạm vi đã chốt

### 3.1 Phạm vi chức năng chính

#### Khối nhà xuất bản
- Đăng ký, đăng nhập, hồ sơ cá nhân
- Quản lý liên kết rút gọn
- Bí danh liên kết
- Liên kết dự phòng
- Thống kê lượt truy cập
- Thống kê doanh thu theo lượt
- Gửi yêu cầu rút tiền
- Lịch sử rút tiền
- Khu nhà phát triển để tích hợp giao diện lập trình trong giai đoạn sau

#### Khối khách hàng mua chiến dịch
- Đăng ký, đăng nhập, hồ sơ cá nhân
- Nạp tiền thủ công
- Tạo chiến dịch quảng bá hợp lệ tính theo lượt
- Quản lý chiến dịch
- Theo dõi trạng thái chiến dịch
- Theo dõi chi tiêu và thống kê kết quả

#### Khối quản trị
- Quản lý người dùng
- Duyệt nạp tiền thủ công
- Duyệt rút tiền thủ công
- Cấu hình giá theo lượt
- Cấu hình khuyến mãi nạp tiền
- Cấu hình tài khoản ngân hàng nhận tiền
- Cấu hình ví USDT và ảnh mã
- Quản lý thông báo hệ thống
- Báo cáo tổng quan
- Nhật ký quản trị
- Kiểm soát gian lận mức nền tảng

#### Khối chuyển hướng trung gian
- Nhận mã liên kết ngắn
- Kiểm tra trạng thái liên kết
- Xác minh truy cập hợp lệ chống máy tự động cơ bản
- Ghi nhận sự kiện truy cập
- Chuyển đến liên kết đích hoặc liên kết dự phòng
- Trang lỗi, trang báo cáo lỗi

### 3.2 Phạm vi quốc gia và ngôn ngữ
- Phục vụ người dùng Việt Nam và quốc tế
- Hỗ trợ song ngữ Việt và Anh ngay từ đầu ở cấp thiết kế dữ liệu và giao diện

### 3.3 Thanh toán và rút tiền
- Nạp tiền thủ công qua chuyển khoản ngân hàng Việt Nam
- Hỗ trợ cấu hình khu hiển thị ảnh mã chuyển khoản
- Có chỗ cấu hình nạp và rút thủ công bằng USDT qua ảnh mã ví
- Quy trình duyệt tay qua quản trị ở giai đoạn đầu

### 3.4 Mô hình tính phí
- Tính theo lượt hợp lệ
- Có thể mở rộng gói tháng ở giai đoạn sau nhưng không nằm trong lõi phiên bản đầu

---

## 4. Ràng buộc bắt buộc về an toàn và pháp lý

### 4.1 Ràng buộc không triển khai
Dự án **không** triển khai hoặc đặc tả các tính năng sau:

- Hướng dẫn người dùng thao tác tìm kiếm từ khóa để tác động thứ hạng kết quả tìm kiếm
- Cơ chế né phát hiện của nền tảng bên thứ ba
- Cơ chế vượt xác minh người thật
- Cơ chế tạo hoặc mô phỏng hành vi truy cập giả để thao túng hệ thống xếp hạng

### 4.2 Ràng buộc sao chép giao diện và thương hiệu
- Không sao chép tên thương hiệu, biểu trưng, câu chữ đặc trưng của bên khác
- Không sao chép nguyên bản bảng màu và chi tiết nhận diện
- Chỉ tham chiếu ở mức cấu trúc màn hình, luồng và phạm vi chức năng

### 4.3 Ràng buộc dữ liệu và tài chính
- Mọi thay đổi số dư phải đi qua sổ cái giao dịch
- Không được cộng hoặc trừ tiền trực tiếp không có dấu vết
- Duyệt thủ công phải lưu người duyệt, thời gian duyệt, lý do và bằng chứng xử lý
- Lưu ảnh chứng từ phải có kiểm soát truy cập và nhật ký tải lên

---

## 5. Mục tiêu chất lượng của bộ tài liệu

Để tránh tình trạng tài liệu sơ sài hoặc sai sót khi đội phát triển và trợ lý lập trình đọc, bộ tài liệu này áp dụng các nguyên tắc sau:

1. **Mỗi lần hoàn thành một tài liệu**
   - Chỉ bàn giao một tệp mỗi vòng làm việc.
   - Mỗi tệp phải được rà soát tính nhất quán với các tài liệu trước.

2. **Tài liệu có thể triển khai được**
   - Không dừng ở mô tả ý tưởng chung.
   - Phải có trường dữ liệu, trạng thái, ràng buộc, quyền, điều kiện lỗi khi cần.

3. **Truy vết được**
   - Mỗi tài liệu phải tham chiếu rõ đầu vào và đầu ra của tài liệu đó.
   - Dùng mã tài liệu thống nhất để liên kết chéo.

4. **Dùng được cho trợ lý lập trình**
   - Cấu trúc rõ ràng
   - Thuật ngữ thống nhất
   - Danh sách việc và tiêu chí nghiệm thu cụ thể

5. **Ưu tiên đúng trước nhanh**
   - Hoàn thành từng phần có chiều sâu, tránh đẩy nhiều tệp nhưng thiếu kiểm tra.

---

## 6. Kiến trúc sản phẩm cấp cao

### 6.1 Các cổng chính

#### Cổng nhà xuất bản
- Bảng điều khiển thống kê
- Quản lý liên kết rút gọn
- Khu nhà phát triển
- Rút tiền
- Hồ sơ cá nhân

#### Cổng khách hàng mua chiến dịch
- Bảng điều khiển thống kê
- Quản lý chiến dịch
- Nạp tiền
- Hồ sơ cá nhân

#### Cổng quản trị
- Tổng quan hệ thống
- Người dùng
- Liên kết
- Chiến dịch
- Nạp tiền
- Rút tiền
- Giá và khuyến mãi
- Thanh toán
- Gian lận
- Nhật ký

#### Cổng chuyển hướng trung gian
- Xử lý mã liên kết ngắn
- Kiểm tra điều kiện hợp lệ
- Ghi nhận sự kiện
- Chuyển hướng
- Hiển thị lỗi

### 6.2 Tách miền triển khai đề xuất
- Miền giới thiệu sản phẩm
- Miền cổng người dùng
- Miền cổng quản trị
- Miền chuyển hướng liên kết ngắn

Việc tách miền giúp dễ mở rộng, dễ quản trị bảo mật và giảm ảnh hưởng chéo khi có lưu lượng lớn ở cổng chuyển hướng.

---

## 7. Vai trò người dùng và quyền cấp cao

### 7.1 Khách hàng mua chiến dịch
Quyền chính:
- Quản lý hồ sơ
- Xem số dư và giao dịch
- Tạo và quản lý chiến dịch của chính mình
- Nạp tiền và theo dõi hóa đơn nạp
- Xem báo cáo chiến dịch

### 7.2 Nhà xuất bản
Quyền chính:
- Quản lý hồ sơ và cấu hình nhận tiền
- Tạo và quản lý liên kết rút gọn của chính mình
- Xem thống kê lượt và doanh thu
- Tạo yêu cầu rút tiền
- Xem lịch sử rút

### 7.3 Quản trị viên
Quyền chính:
- Quản lý người dùng, liên kết, chiến dịch
- Duyệt nạp tiền và rút tiền
- Cấu hình giá theo lượt và ngưỡng
- Cấu hình tài khoản ngân hàng và ví USDT hiển thị cho người dùng
- Theo dõi cảnh báo gian lận và nhật ký hệ thống

### 7.4 Nhân viên hỗ trợ (nếu có ở giai đoạn sau)
Quyền chính:
- Xem thông tin hỗ trợ và tra cứu tài khoản
- Không có quyền can thiệp số dư hoặc duyệt tài chính trừ khi được cấp riêng

---

## 8. Danh sách màn hình cấp cao đã chốt

### 8.1 Khối khách hàng mua chiến dịch
1. Đăng nhập
2. Đăng ký
3. Quên mật khẩu
4. Bảng điều khiển
5. Danh sách chiến dịch
6. Tạo chiến dịch
7. Chi tiết chiến dịch
8. Nạp tiền
9. Lịch sử hóa đơn nạp
10. Hồ sơ cá nhân
11. Đổi mật khẩu
12. Thông báo hệ thống

### 8.2 Khối nhà xuất bản
1. Đăng nhập
2. Đăng ký
3. Bảng điều khiển
4. Quản lý liên kết rút gọn
5. Tạo liên kết mới
6. Chi tiết liên kết
7. Khu nhà phát triển
8. Rút tiền
9. Lịch sử rút tiền
10. Hồ sơ cá nhân
11. Cấu hình nhận tiền
12. Đổi mật khẩu
13. Thông báo hệ thống

### 8.3 Khối quản trị
1. Đăng nhập quản trị
2. Tổng quan hệ thống
3. Quản lý người dùng
4. Quản lý liên kết
5. Quản lý chiến dịch
6. Duyệt nạp tiền
7. Duyệt rút tiền
8. Cấu hình giá theo lượt
9. Cấu hình khuyến mãi nạp tiền
10. Cấu hình tài khoản ngân hàng
11. Cấu hình ví USDT
12. Quản lý thông báo
13. Cảnh báo gian lận
14. Nhật ký quản trị
15. Báo cáo đối soát

### 8.4 Khối chuyển hướng trung gian
1. Trang xác minh truy cập hợp lệ
2. Trang trung gian hiển thị thông tin
3. Trang lỗi liên kết
4. Trang liên kết hết hạn hoặc bị khóa
5. Trang báo lỗi từ người dùng

---

## 9. Đề xuất công nghệ mặc định để làm chuẩn cho các tài liệu tiếp theo

Do chủ dự án chưa chốt cụ thể bộ công nghệ, các tài liệu tiếp theo sẽ mặc định theo phương án sau để đảm bảo tính nhất quán:

### 9.1 Giao diện
- Next.js
- React
- Tailwind
- Thư viện biểu đồ
- Thư viện quản lý biểu mẫu
- Thư viện đa ngôn ngữ

### 9.2 Máy chủ
- NestJS
- Xác thực bằng mã truy cập và mã làm mới
- Hàng đợi xử lý nền cho ghi nhận sự kiện và tổng hợp thống kê

### 9.3 Dữ liệu và hạ tầng hỗ trợ
- PostgreSQL cho dữ liệu nghiệp vụ
- Redis cho bộ nhớ đệm, giới hạn tần suất và tác vụ nhanh
- Kho tệp tương thích S3 cho ảnh chứng từ, ảnh mã ngân hàng, ảnh mã ví USDT

> Ghi chú: Nếu chủ dự án đổi bộ công nghệ, các tài liệu nghiệp vụ vẫn giữ nguyên phần lớn nội dung. Chỉ tài liệu triển khai, giao diện lập trình và cấu trúc kho mã cần điều chỉnh.

---

## 10. Danh sách bộ tài liệu cần biên soạn đầy đủ

Bên dưới là danh sách tài liệu đề xuất theo mã, mục tiêu và mức ưu tiên. Mỗi vòng sẽ hoàn thành **một** tài liệu.

### Nhóm nền tảng và phạm vi

#### TL01 — Tổng quan dự án và kế hoạch bộ tài liệu kỹ thuật
- Mục tiêu: Khóa phạm vi, mục tiêu, nguyên tắc, thứ tự biên soạn
- Trạng thái: Hoàn thành trong vòng hiện tại

#### TL02 — Đặc tả yêu cầu nghiệp vụ tổng thể
- Mục tiêu: Mô tả toàn bộ chức năng theo góc nhìn nghiệp vụ
- Nội dung chính: tác nhân, chức năng, quy tắc nghiệp vụ cấp cao, luồng chính

#### TL03 — Ma trận vai trò và phân quyền
- Mục tiêu: Xác định chi tiết quyền theo màn hình, thao tác, dữ liệu
- Nội dung chính: vai trò, hành động, điều kiện, ngoại lệ

### Nhóm trải nghiệm và màn hình

#### TL04 — Đặc tả màn hình khối khách hàng mua chiến dịch
- Nội dung: từng màn hình, trường nhập, trạng thái, kiểm tra hợp lệ, thông báo

#### TL05 — Đặc tả màn hình khối nhà xuất bản
- Nội dung: từng màn hình, trường nhập, thống kê, trạng thái, cảnh báo

#### TL06 — Đặc tả màn hình khối quản trị
- Nội dung: duyệt nạp rút, cấu hình giá, cấu hình thanh toán, nhật ký, gian lận

#### TL07 — Đặc tả màn hình khối chuyển hướng trung gian
- Nội dung: trạng thái liên kết, xác minh truy cập, lỗi, báo lỗi, ghi nhận sự kiện

### Nhóm nghiệp vụ chi tiết theo quy trình

#### TL08 — Đặc tả quy trình nạp tiền thủ công
- Nội dung: tạo hóa đơn, hiển thị thông tin chuyển khoản, tải chứng từ, duyệt, chống cộng trùng

#### TL09 — Đặc tả quy trình rút tiền thủ công
- Nội dung: tạo yêu cầu, khóa số dư, duyệt, từ chối, hoàn số dư, bằng chứng xử lý

#### TL10 — Đặc tả quy trình quản lý chiến dịch tính theo lượt
- Nội dung: tạo, chỉnh sửa, gửi duyệt, chạy, tạm dừng, hoàn thành, hết ngân sách

#### TL11 — Đặc tả quy trình rút gọn liên kết và tính doanh thu nhà xuất bản
- Nội dung: tạo liên kết, ghi nhận lượt, phân loại hợp lệ, cộng doanh thu, đối soát

#### TL12 — Đặc tả chống gian lận và định nghĩa lượt hợp lệ
- Nội dung: điều kiện hợp lệ, điều kiện loại, điểm rủi ro, quy trình duyệt lại, nhật ký quyết định

### Nhóm dữ liệu và giao diện lập trình

#### TL13 — Mô hình dữ liệu chi tiết cấp bảng và cột
- Nội dung: danh sách bảng, cột, kiểu dữ liệu, khóa, chỉ mục, ràng buộc, lịch sử

#### TL14 — Quy ước dữ liệu, trạng thái và mã lỗi chuẩn hóa
- Nội dung: mã trạng thái nghiệp vụ, mã lỗi, quy tắc thời gian, tiền tệ, múi giờ, đa ngôn ngữ

#### TL15 — Đặc tả giao diện lập trình phiên bản đầu
- Nội dung: danh sách đường dẫn, đầu vào, đầu ra, quyền, mã lỗi, ví dụ dữ liệu

#### TL16 — Đặc tả ghi nhận sự kiện và tổng hợp thống kê
- Nội dung: sự kiện truy cập, hàng đợi, tổng hợp theo ngày, đối soát tạm và cuối kỳ

### Nhóm quản trị vận hành và an toàn

#### TL17 — Đặc tả cấu hình hệ thống và tham số vận hành
- Nội dung: giá theo lượt, ngưỡng rút, khuyến mãi nạp, tài khoản ngân hàng, ví USDT, nội dung thông báo

#### TL18 — Đặc tả nhật ký, giám sát và cảnh báo vận hành
- Nội dung: nhật ký hệ thống, nhật ký quản trị, theo dõi chỉ số, cảnh báo lỗi

#### TL19 — Quy trình vận hành và hỗ trợ khách hàng
- Nội dung: xử lý sự cố, duyệt nạp rút, xử lý tranh chấp, kênh hỗ trợ, thời gian phản hồi

#### TL20 — Yêu cầu bảo mật và kiểm soát truy cập
- Nội dung: bảo vệ tài khoản, bảo vệ tệp, xác thực hai lớp, nguyên tắc phân quyền, sao lưu

### Nhóm kiểm thử và triển khai

#### TL21 — Kế hoạch kiểm thử chấp nhận
- Nội dung: kịch bản chuẩn, lỗi, tài chính, gian lận, phân quyền

#### TL22 — Kế hoạch triển khai theo giai đoạn và tiêu chí nghiệm thu
- Nội dung: phạm vi từng giai đoạn, đầu ra kỹ thuật, điều kiện nghiệm thu

#### TL23 — Tài liệu bàn giao cho trợ lý lập trình
- Nội dung: thứ tự sinh mã, quy chuẩn kho mã, tiêu chuẩn đặt tên, danh sách việc theo mô đun

### Nhóm pháp lý và chính sách nội bộ

#### TL24 — Điều khoản sử dụng và chính sách nội dung bị cấm (bản nháp kỹ thuật)
- Nội dung: hành vi cấm, quy tắc liên kết cấm, quy tắc thanh toán, tranh chấp, khóa tài khoản

#### TL25 — Chính sách quyền riêng tư và lưu trữ dữ liệu (bản nháp kỹ thuật)
- Nội dung: dữ liệu nào thu thập, mục đích, thời gian lưu, quyền người dùng, truy cập nội bộ

---

## 11. Thứ tự biên soạn đề xuất từng vòng (mỗi vòng một tệp)

Để giảm sai sót dây chuyền, thứ tự biên soạn nên theo phụ thuộc như sau:

1. TL01 — Tổng quan và kế hoạch bộ tài liệu  ✅
2. TL02 — Đặc tả yêu cầu nghiệp vụ tổng thể
3. TL03 — Ma trận vai trò và phân quyền
4. TL08 — Quy trình nạp tiền thủ công
5. TL09 — Quy trình rút tiền thủ công
6. TL11 — Quy trình rút gọn liên kết và tính doanh thu
7. TL10 — Quy trình quản lý chiến dịch tính theo lượt
8. TL12 — Chống gian lận và định nghĩa lượt hợp lệ
9. TL13 — Mô hình dữ liệu chi tiết
10. TL14 — Quy ước dữ liệu, trạng thái, mã lỗi
11. TL15 — Đặc tả giao diện lập trình phiên bản đầu
12. TL16 — Ghi nhận sự kiện và tổng hợp thống kê
13. TL04 — Màn hình khối khách hàng mua chiến dịch
14. TL05 — Màn hình khối nhà xuất bản
15. TL06 — Màn hình khối quản trị
16. TL07 — Màn hình khối chuyển hướng trung gian
17. TL17 — Cấu hình hệ thống và tham số vận hành
18. TL20 — Bảo mật và kiểm soát truy cập
19. TL18 — Nhật ký, giám sát và cảnh báo vận hành
20. TL19 — Quy trình vận hành và hỗ trợ khách hàng
21. TL21 — Kế hoạch kiểm thử chấp nhận
22. TL22 — Kế hoạch triển khai và nghiệm thu
23. TL23 — Tài liệu bàn giao cho trợ lý lập trình
24. TL24 — Điều khoản sử dụng và chính sách nội dung bị cấm
25. TL25 — Chính sách quyền riêng tư và lưu trữ dữ liệu

> Lý do sắp xếp: ưu tiên khóa nghiệp vụ và dữ liệu trước, rồi mới đặc tả giao diện chi tiết, sau cùng là vận hành, kiểm thử và chính sách.

---

## 12. Tiêu chuẩn chất lượng áp dụng cho từng tài liệu ở các vòng sau

Mỗi tài liệu bàn giao từ TL02 trở đi phải đạt tối thiểu các tiêu chí sau:

### 12.1 Tính đầy đủ
- Có mục tiêu, phạm vi, đầu vào, đầu ra
- Có danh sách giả định và ràng buộc
- Có xử lý trường hợp lỗi và ngoại lệ (nếu là tài liệu nghiệp vụ hoặc giao diện)

### 12.2 Tính nhất quán
- Dùng đúng tên vai trò, tên trạng thái, tên mô đun đã chốt
- Không tự ý thêm thuật ngữ gây trùng nghĩa
- Nếu thay đổi quyết định cũ phải ghi mục thay đổi và ảnh hưởng

### 12.3 Tính triển khai được
- Đội phát triển đọc xong biết phải làm gì
- Trợ lý lập trình đọc xong sinh được khung mã hoặc mô hình dữ liệu tương ứng

### 12.4 Tính kiểm thử được
- Các quy tắc chính phải mô tả theo cách có thể kiểm tra
- Có điều kiện chấp nhận rõ ràng cho thao tác trọng yếu

---

## 13. Danh sách quyết định đã chốt đến thời điểm hiện tại

### 13.1 Đã chốt
- Mô hình hai phía gồm nhà xuất bản và khách hàng mua chiến dịch
- Có cổng quản trị riêng
- Nạp tiền thủ công qua chuyển khoản ngân hàng Việt Nam
- Có chỗ cấu hình ảnh mã ví USDT cho nạp và rút thủ công
- Tính tiền theo lượt
- Phạm vi phục vụ Việt Nam và quốc tế
- Hỗ trợ song ngữ Việt và Anh
- Mức tương đương theo bố cục, luồng, danh sách màn hình; không sao chép nguyên bản tiểu tiết

### 13.2 Chưa chốt hoàn toàn (tạm dùng mặc định)
- Bộ công nghệ chính thức cho giao diện, máy chủ, cơ sở dữ liệu
- Chính sách ngưỡng rút tối thiểu cụ thể
- Cách tính đơn giá theo quốc gia hoặc nhóm quốc gia
- Thời lượng tối thiểu để xác nhận lượt hợp lệ
- Chiến lược đối soát cuối kỳ chi tiết

Các mục chưa chốt này sẽ được làm rõ dần trong các tài liệu chuyên sâu tương ứng.

---

## 14. Rủi ro chính của dự án và hướng giảm rủi ro ở cấp tài liệu

### 14.1 Rủi ro sai phạm vi
- **Nguy cơ**: trôi sang tính năng không hợp lệ hoặc vượt mục tiêu phiên bản đầu
- **Giảm rủi ro**: bám TL01 và chỉ mở rộng khi có quyết định mới bằng văn bản

### 14.2 Rủi ro sai dữ liệu tài chính
- **Nguy cơ**: cộng trừ tiền sai, thiếu dấu vết, khó đối soát
- **Giảm rủi ro**: ưu tiên tài liệu nạp rút, sổ cái, trạng thái, mã lỗi trước giao diện đẹp

### 14.3 Rủi ro gian lận làm sai kết quả tính tiền theo lượt
- **Nguy cơ**: doanh thu và chi tiêu không phản ánh truy cập hợp lệ
- **Giảm rủi ro**: có tài liệu định nghĩa lượt hợp lệ và chống gian lận riêng trước khi chốt giao diện lập trình

### 14.4 Rủi ro song ngữ và quốc tế hóa bị làm muộn
- **Nguy cơ**: phải sửa lại nhiều màn hình và dữ liệu
- **Giảm rủi ro**: chốt quy ước dữ liệu và trạng thái chuẩn hóa trước khi làm giao diện hàng loạt

### 14.5 Rủi ro tài liệu không dùng được cho trợ lý lập trình
- **Nguy cơ**: mô tả chung chung, thiếu trường dữ liệu, thiếu trạng thái
- **Giảm rủi ro**: mỗi tài liệu phải có phần ràng buộc, điều kiện lỗi, tiêu chí nghiệm thu tối thiểu

---

## 15. Cách sử dụng bộ tài liệu trong quá trình làm việc

### 15.1 Với chủ dự án
- Dùng TL01 để kiểm tra phạm vi và thứ tự làm việc
- Mỗi vòng chỉ xem và xác nhận một tài liệu
- Khi cần thay đổi phạm vi, cập nhật quyết định trước khi làm tài liệu tiếp theo

### 15.2 Với đội phát triển
- Đọc TL01 để nắm toàn cảnh và quy tắc đặt tên tài liệu
- Triển khai theo mô đun bám thứ tự tài liệu đã sắp
- Không tự suy diễn các phần chưa có tài liệu chi tiết

### 15.3 Với trợ lý lập trình
- Chỉ sinh mã cho mô đun đã có tài liệu chi tiết tương ứng
- Bám đúng trạng thái, trường dữ liệu, mã lỗi, quyền hạn đã chốt
- Ghi rõ giả định nếu phát hiện thiếu thông tin

---

## 16. Kết luận và đầu ra của vòng hiện tại

Tài liệu TL01 đã hoàn thành các việc sau:

- Chốt phạm vi sản phẩm và ràng buộc chính
- Chốt định hướng tương đương chức năng nhưng không sao chép nguyên bản
- Chốt mô hình thanh toán và rút tiền thủ công giai đoạn đầu
- Chốt danh sách **25 tài liệu** cần biên soạn
- Chốt thứ tự biên soạn từng vòng, mỗi vòng một tệp
- Đặt tiêu chuẩn chất lượng để tránh sơ sài và sai sót

### Đề xuất tài liệu tiếp theo cho vòng kế tiếp
**TL02 — Đặc tả yêu cầu nghiệp vụ tổng thể**

Tài liệu này sẽ đi sâu vào:
- tác nhân nghiệp vụ
- chức năng theo từng khối
- luồng chính và luồng ngoại lệ cấp cao
- quy tắc nghiệp vụ tổng thể
- tiêu chí chấp nhận cấp nghiệp vụ

