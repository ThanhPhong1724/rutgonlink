# Tài liệu 03 — Ma trận vai trò và phân quyền

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL03
- **Tên tài liệu:** Ma trận vai trò và phân quyền
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:**
  - TL01 — Tổng quan dự án và kế hoạch bộ tài liệu kỹ thuật
  - TL02 — Đặc tả yêu cầu nghiệp vụ tổng thể
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL07, TL08, TL09, TL10, TL11, TL13, TL15, TL20

---

## 2. Mục tiêu tài liệu

Tài liệu này chốt **ai được làm gì, ở đâu, trên dữ liệu nào, trong điều kiện nào** cho toàn bộ nền tảng.

Mục tiêu chính:

1. Khóa phạm vi quyền giữa các vai trò để tránh chồng chéo khi làm màn hình và giao diện lập trình.
2. Chuẩn hóa cách kiểm tra quyền cho đội phát triển và trợ lý lập trình.
3. Xác định rõ các thao tác nhạy cảm cần nhật ký, lý do thao tác, hoặc xác thực bổ sung.
4. Giảm rủi ro sai sót ở các mô đun tài chính, chiến dịch, liên kết, chống gian lận.

Tài liệu này là bản chuẩn về **phân quyền nghiệp vụ**. Phần mã trạng thái và mã lỗi chi tiết hơn sẽ được chuẩn hóa tiếp ở TL14.

---

## 3. Phạm vi của TL03

### 3.1 Trong phạm vi

- Vai trò người dùng và vai trò vận hành
- Quyền truy cập theo cổng và theo màn hình
- Quyền theo chức năng nghiệp vụ đã định nghĩa ở TL02 (NV01 đến NV45)
- Phạm vi dữ liệu theo vai trò
- Quyền theo trạng thái nghiệp vụ cho các thực thể chính
- Quy định phân tách nhiệm vụ đối với nghiệp vụ tài chính và gian lận
- Yêu cầu nhật ký cho thao tác nhạy cảm

### 3.2 Ngoài phạm vi

- Thiết kế giao diện chi tiết từng nút và bố cục từng màn hình (TL04 đến TL07)
- Đặc tả giao diện lập trình chi tiết từng đường dẫn (TL15)
- Thiết kế kỹ thuật xác thực ở mức hạ tầng, mã hóa khóa, phiên đăng nhập (TL20)
- Mô hình dữ liệu chi tiết cấp cột (TL13)

---

## 4. Nguyên tắc phân quyền áp dụng thống nhất

> Mục này là phần quan trọng nhất để giữ đồng nhất giữa các tài liệu sau.

### 4.1 Nguyên tắc chung

1. **Mặc định không có quyền**
   - Vai trò chỉ được cấp đúng những gì cần cho nghiệp vụ của mình.
   - Mọi quyền không khai báo trong tài liệu này mặc định là không được phép.

2. **Phân quyền theo vai trò kết hợp điều kiện nghiệp vụ**
   - Có quyền chức năng chưa đủ để thao tác thành công.
   - Hệ thống phải kiểm tra thêm trạng thái, số dư, quyền sở hữu dữ liệu, và ràng buộc nghiệp vụ.

3. **Kiểm tra quyền ở cả giao diện và máy chủ**
   - Ẩn nút ở giao diện chỉ là hỗ trợ trải nghiệm.
   - Quyền thực sự bắt buộc kiểm tra ở máy chủ.

4. **Quyền dữ liệu theo phạm vi**
   - Người dùng thường chỉ được xem và sửa dữ liệu của chính mình.
   - Quản trị viên được xem toàn hệ thống theo đúng chức năng.
   - Nhân viên hỗ trợ chỉ được xem dữ liệu phục vụ hỗ trợ, có che thông tin nhạy cảm theo quy định.

5. **Tài chính phải có dấu vết**
   - Mọi thao tác ảnh hưởng số dư, trạng thái nạp, trạng thái rút, hoặc quyết định gian lận phải ghi nhật ký quản trị.

6. **Không bỏ qua sổ cái**
   - Không vai trò nào được phép chỉnh số dư trực tiếp ngoài quy trình có ghi sổ cái theo TL02.

### 4.2 Nguyên tắc phân tách nhiệm vụ

1. **Người dùng cuối không tự duyệt giao dịch của mình**.
2. **Nhân viên hỗ trợ không được duyệt nạp hoặc rút** trong phiên bản đầu.
3. **Quản trị viên duyệt tài chính** phải để lại lý do và ghi chú khi duyệt tay trong trường hợp ngoại lệ.
4. **Không cho phép sửa xóa nhật ký quản trị** từ bất kỳ vai trò nào trong phạm vi phiên bản đầu.

### 4.3 Nguyên tắc che dữ liệu nhạy cảm

- Nhân viên hỗ trợ chỉ xem được dữ liệu che một phần đối với:
  - số tài khoản ngân hàng
  - địa chỉ ví
  - ảnh chứng từ tài chính
  - thư điện tử trong một số ngữ cảnh hỗ trợ
- Quản trị viên xem đầy đủ khi cần xử lý nghiệp vụ.
- Người dùng chỉ xem dữ liệu của chính mình.

---

## 5. Danh mục vai trò chuẩn hóa

Tài liệu này dùng mã vai trò để truy vết sang màn hình, dữ liệu và giao diện lập trình.

### 5.1 Vai trò bên ngoài và người dùng cuối

#### R00 — Khách chưa đăng nhập
- Truy cập trang đăng ký, đăng nhập, quên mật khẩu
- Truy cập trang công khai nếu có
- Không truy cập được cổng người dùng và cổng quản trị

#### R01 — Khách truy cập liên kết ngắn
- Là người dùng cuối truy cập liên kết rút gọn qua khối chuyển hướng trung gian
- Không cần tài khoản
- Chỉ được tương tác với trang chuyển hướng, xác minh truy cập, báo lỗi

### 5.2 Vai trò người dùng hệ thống

#### R10 — Khách hàng mua chiến dịch
- Tương ứng tác nhân **A1** trong TL02
- Quản lý chiến dịch và nạp tiền
- Chỉ thao tác trên dữ liệu thuộc chính tài khoản của mình

#### R20 — Nhà xuất bản
- Tương ứng tác nhân **A2** trong TL02
- Quản lý liên kết rút gọn, theo dõi doanh thu, gửi yêu cầu rút tiền
- Chỉ thao tác trên dữ liệu thuộc chính tài khoản của mình

### 5.3 Vai trò vận hành hệ thống

#### R30 — Quản trị viên
- Tương ứng tác nhân **A3** trong TL02
- Quản trị vận hành, tài chính, cấu hình, gian lận, báo cáo toàn hệ thống
- Có quyền rộng nhưng vẫn bị ràng buộc bởi quy trình và nhật ký

#### R40 — Nhân viên hỗ trợ
- Tương ứng tác nhân **A4** trong TL02
- Tra cứu thông tin hỗ trợ, xem trạng thái, tiếp nhận báo lỗi, hỗ trợ người dùng
- Không có quyền duyệt nạp tiền, duyệt rút tiền, chỉnh số dư, cấu hình giá, xử lý gian lận ở mức quyết định cuối

> Ghi chú: Nếu sau này phát sinh tách vai trò quản trị thành nhiều nhóm nhỏ, tài liệu này sẽ là nền để mở rộng mà không đổi thuật ngữ cốt lõi.

---

## 6. Mô hình phân quyền áp dụng cho dự án

### 6.1 Mô hình sử dụng

Dự án áp dụng mô hình phân quyền theo **vai trò + điều kiện nghiệp vụ + phạm vi dữ liệu**.

Nghĩa là một thao tác thành công khi đồng thời thỏa:

1. Vai trò có quyền chức năng.
2. Đúng cổng truy cập.
3. Đúng phạm vi dữ liệu.
4. Trạng thái thực thể cho phép thao tác.
5. Thỏa các điều kiện nghiệp vụ bổ sung.

### 6.2 Công thức kiểm tra quyền chuẩn hóa

Một yêu cầu thao tác được phép khi:

- `Vai trò hợp lệ`
- `Hành động được cấp`
- `Phạm vi dữ liệu hợp lệ`
- `Trạng thái hợp lệ`
- `Điều kiện nghiệp vụ hợp lệ`

Nếu thiếu một trong các điều kiện trên thì từ chối thao tác.

### 6.3 Cấp kiểm tra bắt buộc

- **Cấp điều hướng giao diện:** có thể vào màn hình hay không
- **Cấp thao tác giao diện:** nút có hiển thị, có bấm được hay không
- **Cấp giao diện lập trình máy chủ:** kiểm tra quyền thực sự
- **Cấp dịch vụ nghiệp vụ:** kiểm tra trạng thái và quy tắc TL02
- **Cấp dữ liệu:** chỉ cho phép truy cập bản ghi thuộc phạm vi dữ liệu được cấp

---

## 7. Từ điển hành động và phạm vi dữ liệu

## 7.1 Từ điển hành động chuẩn

Các hành động dưới đây sẽ được dùng thống nhất trong TL04 đến TL07, TL15 và TL20.

| Mã hành động | Tên hành động | Mô tả |
|---|---|---|
| H01 | Xem danh sách | Xem danh sách bản ghi có phân trang, lọc, tìm kiếm |
| H02 | Xem chi tiết | Xem chi tiết một bản ghi |
| H03 | Tạo mới | Tạo bản ghi mới |
| H04 | Cập nhật | Sửa bản ghi trong phạm vi cho phép |
| H05 | Xóa mềm | Ẩn hoặc hủy bản ghi theo quy tắc, không xóa vật lý |
| H06 | Gửi duyệt | Chuyển trạng thái sang chờ duyệt |
| H07 | Duyệt | Quyết định chấp thuận ở bước duyệt |
| H08 | Từ chối | Quyết định từ chối ở bước duyệt |
| H09 | Tạm dừng | Tạm ngưng thực thể đang hoạt động |
| H10 | Tiếp tục | Khôi phục sau tạm dừng |
| H11 | Khóa | Khóa tài khoản hoặc liên kết |
| H12 | Mở khóa | Mở khóa tài khoản hoặc liên kết |
| H13 | Tải tệp | Tải tệp lên hệ thống |
| H14 | Xem tệp | Xem hoặc tải tệp đã lưu |
| H15 | Xuất dữ liệu | Xuất báo cáo hoặc danh sách theo quyền |
| H16 | Cấu hình | Thay đổi tham số hoặc cấu hình hệ thống |
| H17 | Chuyển trạng thái | Thao tác đổi trạng thái không thuộc các nhóm trên |
| H18 | Ghi nhận | Hệ thống ghi sự kiện hoặc nhật ký |
| H19 | Gán xử lý | Gán ticket hoặc trường hợp hỗ trợ cho người xử lý |
| H20 | Đánh dấu gian lận | Đánh dấu nghi ngờ, đưa vào hàng kiểm tra |
| H21 | Duyệt lại gian lận | Xác nhận lại quyết định hợp lệ hoặc bị loại |

## 7.2 Từ điển phạm vi dữ liệu

| Mã phạm vi | Tên phạm vi | Mô tả |
|---|---|---|
| P0 | Không có | Không được truy cập dữ liệu |
| P1 | Bản thân | Dữ liệu hồ sơ, phiên đăng nhập, thiết lập của chính tài khoản |
| P2 | Sở hữu | Dữ liệu nghiệp vụ thuộc tài khoản người dùng tạo ra |
| P3 | Được gán | Dữ liệu hỗ trợ được giao hoặc thuộc phạm vi hỗ trợ cho phép |
| P4 | Toàn hệ thống đọc | Đọc được toàn hệ thống nhưng không được quyết định hoặc sửa |
| P5 | Toàn hệ thống thao tác | Đọc và thao tác trên toàn hệ thống theo chức năng được cấp |
| P6 | Hệ thống nội bộ | Chỉ dịch vụ nền sử dụng, không gán cho người dùng |

### 7.3 Quy định ưu tiên khi nhiều vai trò cùng tồn tại

Trong phiên bản đầu, mỗi tài khoản người dùng cuối nên chỉ mang một vai trò chính là **R10** hoặc **R20** để giảm phức tạp.

Nếu sau này một tài khoản mang nhiều vai trò:

- Hệ thống áp dụng **hợp quyền theo cổng** nhưng vẫn phải tách rõ menu và dữ liệu theo ngữ cảnh cổng.
- Không được vì có vai trò quản trị mà bỏ qua nhật ký tài chính hoặc quy tắc nghiệp vụ.

---

## 8. Ma trận truy cập theo cổng và màn hình

> Mục này khóa quyền vào màn hình trước khi làm đặc tả chi tiết TL04 đến TL07.

### 8.1 Chú giải ký hiệu

- **✔**: được truy cập
- **△**: được truy cập có điều kiện hoặc chỉ xem một phần
- **✖**: không được truy cập

### 8.2 Cổng công khai và xác thực

| Màn hình | R00 | R01 | R10 | R20 | R30 | R40 | Ghi chú |
|---|---:|---:|---:|---:|---:|---:|---|
| Đăng ký | ✔ | ✖ | △ | △ | △ | △ | Người đã đăng nhập có thể bị chuyển hướng khỏi trang này |
| Đăng nhập | ✔ | ✖ | △ | △ | △ | △ | Tùy trạng thái phiên đăng nhập |
| Quên mật khẩu | ✔ | ✖ | ✔ | ✔ | ✔ | ✔ | Áp dụng cho mọi tài khoản có email |
| Trang thông báo công khai | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | Nếu hệ thống có trang công khai |

### 8.3 Khối khách hàng mua chiến dịch

| Màn hình | R00 | R01 | R10 | R20 | R30 | R40 | Ghi chú |
|---|---:|---:|---:|---:|---:|---:|---|
| Bảng điều khiển khách hàng mua | ✖ | ✖ | ✔ | ✖ | ✔ | △ | R40 chỉ xem phục vụ hỗ trợ nếu được cấp |
| Danh sách chiến dịch | ✖ | ✖ | ✔ | ✖ | ✔ | △ | R40 đọc có che một số dữ liệu nếu cần |
| Tạo chiến dịch | ✖ | ✖ | ✔ | ✖ | ✔ | ✖ | R30 có thể tạo thay người dùng nếu có quy trình nội bộ, mặc định không bật ở phiên bản đầu |
| Chi tiết chiến dịch | ✖ | ✖ | ✔ | ✖ | ✔ | △ | R10 chỉ dữ liệu của mình |
| Nạp tiền | ✖ | ✖ | ✔ | ✖ | ✔ | △ | R40 chỉ xem trạng thái hóa đơn, không duyệt |
| Lịch sử hóa đơn nạp | ✖ | ✖ | ✔ | ✖ | ✔ | △ | |
| Hồ sơ cá nhân khách hàng mua | ✖ | ✖ | ✔ | ✖ | ✔ | △ | R40 không được sửa thay |
| Đổi mật khẩu | ✖ | ✖ | ✔ | ✖ | ✔ | ✔ | Chỉ tài khoản đang đăng nhập |
| Thông báo hệ thống | ✖ | ✖ | ✔ | ✖ | ✔ | ✔ | |

### 8.4 Khối nhà xuất bản

| Màn hình | R00 | R01 | R10 | R20 | R30 | R40 | Ghi chú |
|---|---:|---:|---:|---:|---:|---:|---|
| Bảng điều khiển nhà xuất bản | ✖ | ✖ | ✖ | ✔ | ✔ | △ | R40 chỉ xem phục vụ hỗ trợ |
| Quản lý liên kết rút gọn | ✖ | ✖ | ✖ | ✔ | ✔ | △ | |
| Tạo liên kết mới | ✖ | ✖ | ✖ | ✔ | ✔ | ✖ | Mặc định R30 không tạo thay ở phiên bản đầu |
| Chi tiết liên kết | ✖ | ✖ | ✖ | ✔ | ✔ | △ | |
| Khu nhà phát triển | ✖ | ✖ | ✖ | ✔ | ✔ | △ | R40 đọc tài liệu, không cấp khóa nếu có khóa tích hợp |
| Rút tiền | ✖ | ✖ | ✖ | ✔ | ✔ | △ | R40 chỉ xem trạng thái yêu cầu |
| Lịch sử rút tiền | ✖ | ✖ | ✖ | ✔ | ✔ | △ | |
| Cấu hình nhận tiền | ✖ | ✖ | ✖ | ✔ | ✔ | ✖ | Chỉ chủ tài khoản hoặc R30 |
| Hồ sơ cá nhân nhà xuất bản | ✖ | ✖ | ✖ | ✔ | ✔ | △ | |
| Đổi mật khẩu | ✖ | ✖ | ✖ | ✔ | ✔ | ✔ | |
| Thông báo hệ thống | ✖ | ✖ | ✖ | ✔ | ✔ | ✔ | |

### 8.5 Khối quản trị

| Màn hình | R00 | R01 | R10 | R20 | R30 | R40 | Ghi chú |
|---|---:|---:|---:|---:|---:|---:|---|
| Đăng nhập quản trị | ✖ | ✖ | ✖ | ✖ | ✔ | ✔ | Tùy thiết kế có dùng chung đăng nhập nhưng khác cổng |
| Tổng quan hệ thống | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 chỉ xem các chỉ số hỗ trợ được phép |
| Quản lý người dùng | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 xem, không khóa hoặc mở khóa |
| Quản lý liên kết | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 xem để tiếp nhận phản ánh |
| Quản lý chiến dịch | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 xem trạng thái, không duyệt |
| Duyệt nạp tiền | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ | Chỉ R30 |
| Duyệt rút tiền | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ | Chỉ R30 |
| Cấu hình giá theo lượt | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ | Chỉ R30 |
| Cấu hình khuyến mãi nạp tiền | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ | Chỉ R30 |
| Cấu hình tài khoản ngân hàng | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ | Chỉ R30 |
| Cấu hình ví USDT | ✖ | ✖ | ✖ | ✖ | ✔ | ✖ | Chỉ R30 |
| Quản lý thông báo | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 có thể soạn nháp nếu sau này tách quyền, phiên bản đầu mặc định chỉ đọc |
| Cảnh báo gian lận | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 xem, không quyết định cuối |
| Nhật ký quản trị | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 chỉ đọc phần hỗ trợ nếu được cấu hình |
| Báo cáo đối soát | ✖ | ✖ | ✖ | ✖ | ✔ | △ | R40 chỉ xem báo cáo tổng quan không nhạy cảm |

### 8.6 Khối chuyển hướng trung gian

| Màn hình | R00 | R01 | R10 | R20 | R30 | R40 | Ghi chú |
|---|---:|---:|---:|---:|---:|---:|---|
| Trang xác minh truy cập hợp lệ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | Dành cho mọi đối tượng truy cập liên kết ngắn |
| Trang trung gian hiển thị thông tin | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | |
| Trang lỗi liên kết | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | |
| Trang liên kết hết hạn hoặc bị khóa | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | |
| Trang báo lỗi từ người dùng | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | Thao tác gửi báo lỗi không yêu cầu đăng nhập |

---

## 9. Ma trận quyền theo chức năng nghiệp vụ TL02

> Mục này là bản truy vết trực tiếp tới các mã chức năng NV01 đến NV45 của TL02.

### 9.1 Chú giải ký hiệu trong bảng

- **✖**: không có quyền
- **X1**: thao tác trên dữ liệu bản thân hoặc hồ sơ của mình
- **X2**: thao tác trên dữ liệu sở hữu của mình
- **X3**: chỉ xem dữ liệu được gán hoặc phạm vi hỗ trợ
- **AĐ**: quản trị toàn hệ thống, được thao tác theo quy trình
- **AĐ-X**: quản trị đọc toàn hệ thống nhưng không được thao tác quyết định
- **HT**: hệ thống nội bộ tự ghi nhận theo xử lý nền, không phải thao tác người dùng

### 9.2 Ma trận chức năng

| Mã NV | Tên chức năng theo TL02 | R00 | R01 | R10 | R20 | R30 | R40 | Ghi chú kiểm soát |
|---|---|---:|---:|---:|---:|---:|---:|---|
| NV01 | Đăng ký tài khoản | X1 | ✖ | △ | △ | △ | △ | Người đã đăng nhập có thể bị chặn truy cập trang đăng ký |
| NV02 | Đăng nhập | X1 | ✖ | X1 | X1 | X1 | X1 | Theo trạng thái tài khoản |
| NV03 | Quên mật khẩu và đặt lại mật khẩu | X1 | ✖ | X1 | X1 | X1 | X1 | Chỉ tác động tài khoản của chính mình |
| NV04 | Quản lý hồ sơ cá nhân | ✖ | ✖ | X1 | X1 | X1 | X1 | Không cho R40 sửa hồ sơ người khác |
| NV05 | Đổi mật khẩu | ✖ | ✖ | X1 | X1 | X1 | X1 | Chỉ đổi mật khẩu của chính tài khoản đang đăng nhập |
| NV06 | Chọn ngôn ngữ hiển thị | ✖ | ✖ | X1 | X1 | X1 | X1 | Thiết lập cá nhân |
| NV07 | Quản lý thông tin nhận tiền của nhà xuất bản | ✖ | ✖ | ✖ | X1 | AĐ | AĐ-X | R40 chỉ xem phục vụ hỗ trợ nếu được cấp |
| NV08 | Xem số dư và lịch sử giao dịch | ✖ | ✖ | X2 | X2 | AĐ | AĐ-X | R40 che dữ liệu nhạy cảm |
| NV09 | Tạo yêu cầu nạp tiền thủ công | ✖ | ✖ | X2 | ✖ | AĐ | ✖ | Mặc định chỉ khách hàng mua chiến dịch dùng |
| NV10 | Tải chứng từ nạp tiền | ✖ | ✖ | X2 | ✖ | AĐ | ✖ | Theo trạng thái hóa đơn nạp |
| NV11 | Duyệt hoặc từ chối nạp tiền | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Chỉ R30, bắt buộc nhật ký |
| NV12 | Tạo yêu cầu rút tiền | ✖ | ✖ | ✖ | X2 | AĐ | ✖ | Theo ngưỡng rút và số dư khả dụng |
| NV13 | Duyệt hoặc từ chối rút tiền | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Chỉ R30, bắt buộc nhật ký và bằng chứng xử lý |
| NV14 | Khóa tạm và hoàn số dư theo trạng thái rút tiền | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Do dịch vụ nghiệp vụ thực hiện theo quyết định R30 |
| NV15 | Cấu hình phương thức nạp và rút hiển thị cho người dùng | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Chỉ R30 |
| NV16 | Tạo liên kết rút gọn | ✖ | ✖ | ✖ | X2 | AĐ | ✖ | Mặc định R30 chỉ xử lý quản trị, không tạo thay |
| NV17 | Cập nhật liên kết rút gọn | ✖ | ✖ | ✖ | X2 | AĐ | AĐ-X | Phụ thuộc trạng thái liên kết và quy tắc sửa |
| NV18 | Tạm khóa hoặc mở khóa liên kết | ✖ | ✖ | ✖ | △ | AĐ | ✖ | R20 chỉ tạm khóa liên kết của mình nếu cho phép; mở khóa theo chính sách |
| NV19 | Xem danh sách liên kết và thống kê | ✖ | ✖ | ✖ | X2 | AĐ | AĐ-X | |
| NV20 | Ghi nhận sự kiện truy cập liên kết | ✖ | HT | ✖ | ✖ | HT | ✖ | Thực hiện bởi hệ thống khi có truy cập |
| NV21 | Phân loại lượt hợp lệ hoặc bị loại | ✖ | HT | ✖ | ✖ | AĐ | AĐ-X | Tự động + có thể duyệt lại bởi R30 |
| NV22 | Tính doanh thu cho nhà xuất bản theo lượt hợp lệ | ✖ | HT | ✖ | ✖ | HT | ✖ | Do dịch vụ nền và đối soát thực hiện |
| NV23 | Đối soát doanh thu nhà xuất bản | ✖ | ✖ | ✖ | ✖ | AĐ | AĐ-X | Chỉ R30 quyết định chốt |
| NV24 | Tạo chiến dịch quảng bá hợp lệ tính theo lượt | ✖ | ✖ | X2 | ✖ | AĐ | ✖ | Theo chính sách nội dung và số dư |
| NV25 | Cập nhật chiến dịch trước khi chạy hoặc theo quy tắc cho phép | ✖ | ✖ | X2 | ✖ | AĐ | AĐ-X | Phụ thuộc trạng thái chiến dịch |
| NV26 | Gửi duyệt chiến dịch | ✖ | ✖ | X2 | ✖ | AĐ | ✖ | Chỉ chủ chiến dịch hoặc R30 |
| NV27 | Tạm dừng hoặc tiếp tục chiến dịch | ✖ | ✖ | X2 | ✖ | AĐ | AĐ-X | Phụ thuộc trạng thái chiến dịch |
| NV28 | Hủy chiến dịch theo điều kiện cho phép | ✖ | ✖ | X2 | ✖ | AĐ | ✖ | Phụ thuộc trạng thái chiến dịch |
| NV29 | Ghi nhận lượt cho chiến dịch | ✖ | HT | ✖ | ✖ | HT | ✖ | Do hệ thống ghi nhận |
| NV30 | Trừ tiền theo lượt hợp lệ | ✖ | HT | ✖ | ✖ | HT | ✖ | Do dịch vụ nghiệp vụ thực hiện, không thao tác tay |
| NV31 | Theo dõi thống kê chiến dịch và chi tiêu | ✖ | ✖ | X2 | ✖ | AĐ | AĐ-X | |
| NV32 | Quản lý người dùng | ✖ | ✖ | ✖ | ✖ | AĐ | AĐ-X | R40 chỉ đọc, không khóa mở khóa |
| NV33 | Quản lý giá theo lượt | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Chỉ R30 |
| NV34 | Quản lý khuyến mãi nạp tiền | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Chỉ R30 |
| NV35 | Quản lý tài khoản ngân hàng hiển thị | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Chỉ R30 |
| NV36 | Quản lý ví USDT hiển thị | ✖ | ✖ | ✖ | ✖ | AĐ | ✖ | Chỉ R30 |
| NV37 | Quản lý thông báo hệ thống | ✖ | ✖ | ✖ | ✖ | AĐ | AĐ-X | R40 mặc định chỉ đọc ở phiên bản đầu |
| NV38 | Theo dõi cảnh báo gian lận | ✖ | ✖ | ✖ | ✖ | AĐ | AĐ-X | R40 chỉ theo dõi, không quyết định cuối |
| NV39 | Nhật ký quản trị | ✖ | ✖ | ✖ | ✖ | AĐ | AĐ-X | Không vai trò nào được sửa xóa |
| NV40 | Báo cáo đối soát tổng quan | ✖ | ✖ | ✖ | ✖ | AĐ | AĐ-X | |
| NV41 | Xử lý truy cập liên kết ngắn | ✖ | HT | ✖ | ✖ | HT | ✖ | Do hệ thống phục vụ người truy cập |
| NV42 | Xác minh truy cập hợp lệ chống máy tự động | ✖ | X1 | ✖ | ✖ | HT | ✖ | Người truy cập thực hiện xác minh, hệ thống kiểm tra |
| NV43 | Chuyển hướng đến liên kết đích hoặc dự phòng | ✖ | HT | ✖ | ✖ | HT | ✖ | Dịch vụ chuyển hướng thực hiện |
| NV44 | Hiển thị lỗi liên kết hoặc trạng thái không khả dụng | ✖ | HT | ✖ | ✖ | HT | ✖ | Dịch vụ chuyển hướng thực hiện |
| NV45 | Nhận báo lỗi từ người dùng cuối | ✖ | X1 | ✖ | ✖ | AĐ | AĐ-X | R01 gửi báo lỗi; R30/R40 xử lý tra cứu |

### 9.3 Giải thích các dòng có ký hiệu điều kiện

- **NV01**: R10, R20, R30, R40 có thể thấy trang đăng ký hoặc không tùy trạng thái đăng nhập; quyền thực tế tạo tài khoản mới vẫn là hành vi của khách chưa đăng nhập.
- **NV18**: quyền của R20 đối với khóa hoặc mở khóa liên kết cần tách rõ ở TL11. Phiên bản đầu khuyến nghị chỉ cho **tạm khóa liên kết của chính mình**, không tự mở khóa nếu liên kết đã bị quản trị viên khóa do rủi ro.
- **NV42**: đây là chức năng có cả phần hành vi của người truy cập và phần xử lý hệ thống. Bảng ghi đồng thời để tránh bỏ sót khi làm TL07 và TL15.

---

## 10. Quyền chi tiết theo nhóm tài nguyên và hành động

> Mục này dùng để dev và trợ lý lập trình triển khai kiểm tra quyền ở mức thao tác cụ thể.

## 10.1 Tài nguyên hồ sơ và tài khoản

### 10.1.1 Hồ sơ cá nhân

| Tài nguyên | Hành động | R10 | R20 | R30 | R40 | Điều kiện |
|---|---|---:|---:|---:|---:|---|
| Hồ sơ cá nhân | H02 Xem chi tiết | P1 | P1 | P1 | P1 | Chỉ hồ sơ của chính tài khoản đang đăng nhập |
| Hồ sơ cá nhân | H04 Cập nhật | P1 | P1 | P1 | P1 | Một số trường khóa theo quy tắc TL02 |
| Hồ sơ cá nhân | H05 Xóa mềm | P0 | P0 | P0 | P0 | Không hỗ trợ ở phiên bản đầu |

### 10.1.2 Quản lý tài khoản người dùng (cổng quản trị)

| Tài nguyên | Hành động | R30 | R40 | Điều kiện |
|---|---|---:|---:|---|
| Tài khoản người dùng | H01 Xem danh sách | P5 | P4 | R40 che dữ liệu nhạy cảm |
| Tài khoản người dùng | H02 Xem chi tiết | P5 | P4 | |
| Tài khoản người dùng | H11 Khóa | P5 | P0 | Cần ghi lý do và nhật ký |
| Tài khoản người dùng | H12 Mở khóa | P5 | P0 | Cần nhật ký |
| Tài khoản người dùng | H04 Cập nhật trạng thái | P5 | P0 | Không được sửa trực tiếp số dư |

## 10.2 Tài nguyên ví, số dư và giao dịch

| Tài nguyên | Hành động | R10 | R20 | R30 | R40 | Điều kiện |
|---|---|---:|---:|---:|---:|---|
| Ví của người dùng | H02 Xem chi tiết | P2 | P2 | P5 | P4 | R40 che số dư chi tiết nếu chính sách yêu cầu |
| Sổ cái giao dịch | H01 Xem danh sách | P2 | P2 | P5 | P4 | R40 chỉ đọc phục vụ tra cứu |
| Sổ cái giao dịch | H02 Xem chi tiết | P2 | P2 | P5 | P4 | |
| Sổ cái giao dịch | H03 Tạo mới | P0 | P0 | P0 | P0 | Chỉ dịch vụ nghiệp vụ tạo qua quy trình |
| Sổ cái giao dịch | H04 Cập nhật | P0 | P0 | P0 | P0 | Cấm sửa bản ghi sổ cái |
| Sổ cái giao dịch | H05 Xóa mềm | P0 | P0 | P0 | P0 | Cấm xóa bản ghi sổ cái |

## 10.3 Tài nguyên hóa đơn nạp tiền

| Tài nguyên | Hành động | R10 | R20 | R30 | R40 | Điều kiện |
|---|---|---:|---:|---:|---:|---|
| Hóa đơn nạp tiền | H03 Tạo mới | P2 | P0 | P5 | P0 | Phiên bản đầu nạp chủ yếu cho R10 |
| Hóa đơn nạp tiền | H01 Xem danh sách | P2 | P0 | P5 | P4 | |
| Hóa đơn nạp tiền | H02 Xem chi tiết | P2 | P0 | P5 | P4 | |
| Hóa đơn nạp tiền | H13 Tải tệp chứng từ | P2 | P0 | P5 | P0 | Chỉ khi trạng thái cho phép |
| Hóa đơn nạp tiền | H06 Gửi duyệt | P2 | P0 | P5 | P0 | Nếu hệ thống dùng bước gửi duyệt riêng |
| Hóa đơn nạp tiền | H07 Duyệt | P0 | P0 | P5 | P0 | Chỉ R30 |
| Hóa đơn nạp tiền | H08 Từ chối | P0 | P0 | P5 | P0 | Chỉ R30, cần lý do |
| Hóa đơn nạp tiền | H17 Chuyển trạng thái | P2 | P0 | P5 | P0 | R10 chỉ chuyển trong phạm vi hủy hoặc gửi chứng từ |

## 10.4 Tài nguyên yêu cầu rút tiền

| Tài nguyên | Hành động | R10 | R20 | R30 | R40 | Điều kiện |
|---|---|---:|---:|---:|---:|---|
| Yêu cầu rút tiền | H03 Tạo mới | P0 | P2 | P5 | P0 | R20 phải đủ điều kiện ngưỡng và số dư |
| Yêu cầu rút tiền | H01 Xem danh sách | P0 | P2 | P5 | P4 | |
| Yêu cầu rút tiền | H02 Xem chi tiết | P0 | P2 | P5 | P4 | R40 che thông tin nhận tiền |
| Yêu cầu rút tiền | H07 Duyệt | P0 | P0 | P5 | P0 | Chỉ R30 |
| Yêu cầu rút tiền | H08 Từ chối | P0 | P0 | P5 | P0 | Chỉ R30, bắt buộc lý do |
| Yêu cầu rút tiền | H13 Tải bằng chứng xử lý | P0 | P0 | P5 | P0 | Chỉ R30 tải lên bằng chứng |
| Yêu cầu rút tiền | H14 Xem bằng chứng xử lý | P0 | P2 | P5 | P4 | R20 xem phạm vi cho phép, R40 che dữ liệu |

## 10.5 Tài nguyên liên kết rút gọn

| Tài nguyên | Hành động | R10 | R20 | R30 | R40 | Điều kiện |
|---|---|---:|---:|---:|---:|---|
| Liên kết rút gọn | H03 Tạo mới | P0 | P2 | P5 | P0 | R30 mặc định không tạo thay ở phiên bản đầu |
| Liên kết rút gọn | H01 Xem danh sách | P0 | P2 | P5 | P4 | |
| Liên kết rút gọn | H02 Xem chi tiết | P0 | P2 | P5 | P4 | |
| Liên kết rút gọn | H04 Cập nhật | P0 | P2 | P5 | P0 | Phụ thuộc trạng thái và quy tắc sửa |
| Liên kết rút gọn | H09 Tạm dừng hoặc tạm khóa | P0 | P2 | P5 | P0 | R20 chỉ với liên kết của mình và chưa bị khóa bởi quản trị do rủi ro |
| Liên kết rút gọn | H12 Mở khóa | P0 | △ | P5 | P0 | R20 chỉ mở lại liên kết do chính mình tạm khóa nếu hệ thống cho phép |
| Liên kết rút gọn | H11 Khóa | P0 | P0 | P5 | P0 | R30 khóa vì vi phạm hoặc rủi ro |

## 10.6 Tài nguyên chiến dịch khách hàng mua

| Tài nguyên | Hành động | R10 | R20 | R30 | R40 | Điều kiện |
|---|---|---:|---:|---:|---:|---|
| Chiến dịch | H03 Tạo mới | P2 | P0 | P5 | P0 | R10 tạo cho chính mình |
| Chiến dịch | H01 Xem danh sách | P2 | P0 | P5 | P4 | |
| Chiến dịch | H02 Xem chi tiết | P2 | P0 | P5 | P4 | |
| Chiến dịch | H04 Cập nhật | P2 | P0 | P5 | P0 | Phụ thuộc trạng thái chiến dịch |
| Chiến dịch | H06 Gửi duyệt | P2 | P0 | P5 | P0 | Chỉ chủ chiến dịch hoặc R30 |
| Chiến dịch | H07 Duyệt | P0 | P0 | P5 | P0 | Chỉ R30 khi quy trình yêu cầu duyệt |
| Chiến dịch | H08 Từ chối | P0 | P0 | P5 | P0 | Chỉ R30, cần lý do |
| Chiến dịch | H09 Tạm dừng | P2 | P0 | P5 | P0 | Theo trạng thái |
| Chiến dịch | H10 Tiếp tục | P2 | P0 | P5 | P0 | Theo trạng thái và số dư |
| Chiến dịch | H05 Hủy | P2 | P0 | P5 | P0 | Theo trạng thái cho phép |

## 10.7 Tài nguyên cấu hình hệ thống

| Tài nguyên | Hành động | R30 | R40 | Ghi chú |
|---|---|---:|---:|---|
| Giá theo lượt | H16 Cấu hình | P5 | P0 | Chỉ R30 |
| Khuyến mãi nạp tiền | H16 Cấu hình | P5 | P0 | Chỉ R30 |
| Tài khoản ngân hàng hiển thị | H16 Cấu hình | P5 | P0 | Chỉ R30 |
| Ví USDT hiển thị | H16 Cấu hình | P5 | P0 | Chỉ R30 |
| Thông báo hệ thống | H16 Cấu hình | P5 | P4 | R40 mặc định chỉ đọc |

## 10.8 Tài nguyên gian lận và nhật ký quản trị

| Tài nguyên | Hành động | R30 | R40 | Điều kiện |
|---|---|---:|---:|---|
| Cảnh báo gian lận | H01 Xem danh sách | P5 | P4 | |
| Cảnh báo gian lận | H02 Xem chi tiết | P5 | P4 | |
| Cảnh báo gian lận | H20 Đánh dấu gian lận | P5 | P0 | Chỉ R30 |
| Cảnh báo gian lận | H21 Duyệt lại gian lận | P5 | P0 | Chỉ R30, phải có nhật ký |
| Nhật ký quản trị | H01 Xem danh sách | P5 | P4 | R40 chỉ xem loại nhật ký được phép |
| Nhật ký quản trị | H02 Xem chi tiết | P5 | P4 | |
| Nhật ký quản trị | H04 Cập nhật | P0 | P0 | Cấm sửa |
| Nhật ký quản trị | H05 Xóa mềm | P0 | P0 | Cấm xóa |

---

## 11. Ma trận quyền theo trạng thái nghiệp vụ

> Phần này giúp tránh sai sót khi dev cấp quyền chỉ theo vai trò mà quên trạng thái.

## 11.1 Hóa đơn nạp tiền theo trạng thái

Trạng thái chuẩn tham chiếu TL02 mục 13.2.

| Trạng thái hóa đơn nạp | R10 tạo/chỉnh | R10 tải chứng từ | R10 hủy | R30 duyệt/từ chối | Ghi chú |
|---|---:|---:|---:|---:|---|
| mới tạo | ✔ | ✖ | ✔ | ✖ | Nếu quy trình có bước sinh thông tin thanh toán sau khi tạo |
| chờ thanh toán | ✖ | △ | ✔ | ✖ | Tùy quy trình cho phép tải chứng từ ngay |
| chờ chứng từ | ✖ | ✔ | ✔ | ✖ | |
| chờ duyệt | ✖ | △ | ✖ | ✔ | Có thể cho thay chứng từ theo cấu hình trước khi quản trị mở hồ sơ xử lý |
| đang kiểm tra | ✖ | ✖ | ✖ | ✔ | Chỉ R30 thao tác |
| thành công | ✖ | ✖ | ✖ | ✖ | Trạng thái chốt, không sửa |
| từ chối | ✖ | ✖ | ✖ | ✖ | Có thể tạo hóa đơn mới thay vì sửa hóa đơn cũ |
| hết hạn | ✖ | ✖ | ✖ | ✖ | Không thao tác tiếp |
| đã hủy | ✖ | ✖ | ✖ | ✖ | Không thao tác tiếp |

## 11.2 Yêu cầu rút tiền theo trạng thái

Trạng thái chuẩn tham chiếu TL02 mục 13.3.

| Trạng thái rút tiền | R20 tạo | R20 hủy yêu cầu | R30 duyệt | R30 từ chối | R30 cập nhật xử lý | Ghi chú |
|---|---:|---:|---:|---:|---:|---|
| mới tạo | ✔ | △ | ✖ | ✖ | ✖ | Tùy thiết kế có tách bước tạo và gửi duyệt |
| chờ duyệt | ✖ | △ | ✔ | ✔ | ✖ | Nếu cho phép R20 hủy trước khi R30 nhận xử lý |
| đang xử lý | ✖ | ✖ | △ | ✔ | ✔ | R30 có thể cập nhật tiến độ |
| đã duyệt | ✖ | ✖ | ✖ | △ | ✔ | Tùy quy trình, có thể cho hoàn tác có kiểm soát trước khi đã gửi |
| đã gửi | ✖ | ✖ | ✖ | ✖ | ✔ | R30 cập nhật hoàn thành hoặc sự cố |
| hoàn thành | ✖ | ✖ | ✖ | ✖ | ✖ | Trạng thái chốt |
| từ chối | ✖ | ✖ | ✖ | ✖ | ✖ | Hệ thống đã hoàn số dư nếu cần |
| hoàn tiền | ✖ | ✖ | ✖ | ✖ | ✖ | Trạng thái chốt sau xử lý lỗi |

## 11.3 Liên kết rút gọn theo trạng thái

Trạng thái chuẩn tham chiếu TL02 mục 13.4.

| Trạng thái liên kết | R20 cập nhật | R20 tạm khóa | R20 mở lại | R30 khóa/mở khóa | Ghi chú |
|---|---:|---:|---:|---:|---|
| hoạt động | ✔ | ✔ | ✖ | ✔ | |
| tạm khóa | △ | ✖ | △ | ✔ | R20 chỉ mở lại nếu chính mình tạm khóa và không có cờ rủi ro |
| chờ duyệt | △ | ✔ | ✖ | ✔ | Phụ thuộc chính sách duyệt liên kết |
| hết hạn | ✖ | ✖ | ✖ | △ | R30 có thể gia hạn theo chính sách sau này |
| lỗi | △ | ✔ | ✖ | ✔ | Chỉ cho sửa trường cho phép để khắc phục |

## 11.4 Chiến dịch theo trạng thái

Trạng thái chuẩn tham chiếu TL02 mục 13.5.

| Trạng thái chiến dịch | R10 cập nhật | R10 gửi duyệt | R10 tạm dừng | R10 tiếp tục | R10 hủy | R30 duyệt/từ chối | Ghi chú |
|---|---:|---:|---:|---:|---:|---:|---|
| nháp | ✔ | ✔ | ✖ | ✖ | ✔ | ✖ | |
| chờ duyệt | ✖ | ✖ | ✖ | ✖ | △ | ✔ | R10 hủy tùy chính sách |
| bị từ chối | ✔ | ✔ | ✖ | ✖ | ✔ | ✖ | Sửa rồi gửi duyệt lại |
| sẵn sàng chạy | △ | ✖ | ✖ | △ | △ | ✔ | Phụ thuộc kiểm tra số dư và lịch chạy |
| đang chạy | △ | ✖ | ✔ | ✖ | ✖ | ✔ | R10 chỉ sửa trường cho phép nếu hệ thống hỗ trợ |
| tạm dừng | △ | ✖ | ✖ | ✔ | ✔ | ✔ | |
| hết ngân sách | △ | ✖ | ✖ | △ | ✔ | ✔ | Cần nạp tiền hoặc tăng ngân sách mới tiếp tục |
| hoàn thành | ✖ | ✖ | ✖ | ✖ | ✖ | △ | R30 xử lý ngoại lệ nếu có |
| đã hủy | ✖ | ✖ | ✖ | ✖ | ✖ | △ | Không khôi phục mặc định ở phiên bản đầu |
| lỗi cấu hình | ✔ | ✔ | ✖ | ✖ | ✔ | ✔ | Cần sửa lỗi trước khi chạy |

---

## 12. Quy định về dữ liệu nhạy cảm và che dữ liệu theo vai trò

## 12.1 Danh mục dữ liệu nhạy cảm

- số tài khoản ngân hàng
- tên chủ tài khoản
- địa chỉ ví USDT
- ảnh chứng từ nạp tiền
- ảnh bằng chứng xử lý rút tiền
- số dư chi tiết và lịch sử giao dịch tài chính
- địa chỉ mạng và dấu vết thiết bị trong sự kiện truy cập
- nhật ký gian lận chi tiết

## 12.2 Ma trận hiển thị dữ liệu nhạy cảm

| Nhóm dữ liệu | R10 | R20 | R30 | R40 | Quy định |
|---|---:|---:|---:|---:|---|
| Dữ liệu tài khoản của chính mình | Đầy đủ | Đầy đủ | Đầy đủ của tài khoản đang xem | Che một phần | R40 chỉ đủ để hỗ trợ |
| Dữ liệu tài chính của chính mình | Đầy đủ | Đầy đủ | Đầy đủ | Che một phần | |
| Dữ liệu tài chính người khác | ✖ | ✖ | Đầy đủ | Che một phần | |
| Ảnh chứng từ nạp tiền | ✖ | ✖ | Đầy đủ | Che hoặc ẩn | R40 mặc định không xem ảnh chứng từ |
| Bằng chứng xử lý rút tiền | ✖ | Chỉ bản ghi của mình theo chính sách | Đầy đủ | Che hoặc ẩn | |
| Dữ liệu truy cập và điểm rủi ro chi tiết | ✖ | Chỉ dữ liệu tổng hợp của mình | Đầy đủ | Chỉ tổng quan hỗ trợ | Tránh lộ quy tắc chống gian lận |

### 12.3 Quy tắc che dữ liệu tối thiểu

- Số tài khoản ngân hàng: chỉ hiển thị 3 số đầu và 3 số cuối với vai trò R40.
- Địa chỉ ví: chỉ hiển thị đoạn đầu và đoạn cuối với vai trò R40.
- Thư điện tử: có thể che một phần tên hộp thư ở màn hình tra cứu hỗ trợ nếu không cần xem đầy đủ.
- Ảnh chứng từ: mặc định không cho R40 xem; nếu sau này cần mở thì phải tạo quyền riêng, không dùng chung với quyền hỗ trợ cơ bản.

---

## 13. Quy định nhật ký, lý do thao tác và xác thực bổ sung

## 13.1 Thao tác bắt buộc ghi nhật ký quản trị

Các thao tác sau phải tạo nhật ký quản trị với đầy đủ người thao tác, thời gian, dữ liệu trước và sau, lý do hoặc ghi chú:

1. Duyệt hoặc từ chối nạp tiền
2. Duyệt hoặc từ chối rút tiền
3. Khóa hoặc mở khóa tài khoản
4. Khóa hoặc mở khóa liên kết do vi phạm hoặc rủi ro
5. Cấu hình giá theo lượt
6. Cấu hình khuyến mãi nạp tiền
7. Cấu hình tài khoản ngân hàng và ví USDT hiển thị
8. Duyệt lại quyết định gian lận
9. Điều chỉnh trạng thái chiến dịch hoặc liên kết theo xử lý ngoại lệ

## 13.2 Thao tác bắt buộc có lý do

| Thao tác | Vai trò | Bắt buộc lý do | Ghi chú |
|---|---|---:|---|
| Từ chối hóa đơn nạp | R30 | ✔ | Ghi rõ nguyên nhân không duyệt |
| Duyệt tay hóa đơn nạp ngoại lệ | R30 | ✔ | Ví dụ sai nội dung tham chiếu nhưng đối chiếu được |
| Từ chối yêu cầu rút tiền | R30 | ✔ | |
| Khóa tài khoản | R30 | ✔ | |
| Khóa liên kết | R30 | ✔ | |
| Duyệt lại gian lận | R30 | ✔ | Ghi rõ căn cứ |

## 13.3 Xác thực bổ sung cho thao tác nhạy cảm

Phiên bản đầu khuyến nghị áp dụng xác thực bổ sung cho R30 khi thực hiện các thao tác sau:

- duyệt nạp tiền
- duyệt rút tiền
- thay đổi cấu hình giá theo lượt
- thay đổi cấu hình tài khoản nhận tiền của hệ thống

Nếu chưa triển khai xác thực bổ sung ngay, phải tăng cường nhật ký và giới hạn truy cập cổng quản trị theo mạng nội bộ hoặc danh sách cho phép.

---

## 14. Quy tắc triển khai cho đội phát triển và trợ lý lập trình

## 14.1 Quy tắc kiểm tra quyền ở giao diện lập trình máy chủ

Mỗi đường dẫn giao diện lập trình phải kiểm tra theo thứ tự:

1. Xác thực phiên đăng nhập
2. Vai trò được phép truy cập cổng
3. Quyền hành động trên tài nguyên
4. Phạm vi dữ liệu
5. Trạng thái thực thể
6. Quy tắc nghiệp vụ TL02

Không được gộp chung thành một kiểm tra mơ hồ kiểu “nếu là quản trị thì cho qua tất cả”.

## 14.2 Quy tắc kiểm tra quyền ở lớp dịch vụ nghiệp vụ

- Lớp dịch vụ phải kiểm tra lại trạng thái dù giao diện đã ẩn nút.
- Lớp dịch vụ phải kiểm tra quyền sở hữu dữ liệu theo mã người dùng trong phiên.
- Lớp dịch vụ phải từ chối các thao tác đổi trạng thái không hợp lệ.

## 14.3 Quy tắc triển khai ẩn hoặc hiện nút trên giao diện

- Chỉ hiển thị nút khi vai trò có quyền **và** trạng thái hiện tại cho phép thao tác.
- Nếu người dùng không có quyền, ẩn nút thay vì để bấm rồi báo lỗi ở các màn hình thường gặp.
- Với thao tác bị chặn theo trạng thái, có thể hiển thị nút ở trạng thái vô hiệu kèm chú thích lý do để tăng minh bạch.

## 14.4 Quy tắc đặt tên quyền trong mã nguồn

Khuyến nghị một quy ước thống nhất để trợ lý lập trình sinh mã dễ truy vết:

- `tai_khoan.xem`
- `tai_khoan.khoa`
- `hoa_don_nap.duyet`
- `rut_tien.tu_choi`
- `chien_dich.tam_dung`
- `lien_ket.khoa`
- `gian_lan.duyet_lai`

Mỗi quyền trong mã nên có ánh xạ về:
- mã vai trò
- tài nguyên
- hành động
- phạm vi dữ liệu
- tham chiếu mục tương ứng trong TL03

---

## 15. Truy vết sang các tài liệu tiếp theo

### 15.1 Truy vết sang đặc tả màn hình

- **TL04** phải dùng ma trận này để quyết định menu, nút, trạng thái vô hiệu cho khối khách hàng mua chiến dịch.
- **TL05** phải dùng ma trận này cho khối nhà xuất bản.
- **TL06** phải dùng ma trận này cho khối quản trị và hỗ trợ.
- **TL07** phải dùng ma trận này cho trang chuyển hướng trung gian và gửi báo lỗi.

### 15.2 Truy vết sang quy trình nghiệp vụ

- **TL08** và **TL09** bắt buộc bám các quyền duyệt tài chính và yêu cầu nhật ký trong TL03.
- **TL10** và **TL11** bắt buộc bám quyền theo trạng thái chiến dịch và liên kết trong TL03.
- **TL12** bắt buộc bám quyền xem, đánh dấu, duyệt lại gian lận giữa R30 và R40.

### 15.3 Truy vết sang dữ liệu và giao diện lập trình

- **TL13** phải có trường hỗ trợ quyền sở hữu dữ liệu, người tạo, người duyệt, nhật ký thời gian.
- **TL15** phải gắn quyền cho từng đường dẫn và mô tả lỗi thiếu quyền hoặc sai phạm vi dữ liệu.
- **TL20** phải cụ thể hóa yêu cầu xác thực bổ sung và kiểm soát truy cập đã nêu.

---

## 16. Tiêu chí chấp nhận tài liệu TL03

Tài liệu TL03 được xem là đạt khi thỏa toàn bộ điều kiện sau:

1. Có đầy đủ vai trò cốt lõi theo TL02: A1, A2, A3, A4 và vai trò truy cập liên kết ngắn.
2. Có ma trận truy cập theo cổng và màn hình cấp cao.
3. Có ma trận quyền truy vết đủ NV01 đến NV45.
4. Có quy định phạm vi dữ liệu rõ ràng, không mơ hồ.
5. Có ràng buộc quyền theo trạng thái cho ít nhất: hóa đơn nạp, yêu cầu rút, liên kết, chiến dịch.
6. Có quy định che dữ liệu nhạy cảm cho vai trò hỗ trợ.
7. Có quy định nhật ký và lý do thao tác cho nghiệp vụ tài chính và thao tác nhạy cảm.
8. Không mâu thuẫn với thuật ngữ, vai trò, trạng thái đã chốt ở TL01 và TL02.

---

## 17. Ghi chú rà soát tính nhất quán vòng hiện tại

Đã rà soát chéo với TL01 và TL02 theo các điểm sau:

- **Vai trò:** giữ đúng bốn tác nhân chính A1 đến A4 trong TL02, bổ sung vai trò khách truy cập liên kết ngắn để bao phủ TL02 mục NV41 đến NV45.
- **Chức năng:** truy vết đủ từ NV01 đến NV45, không thêm mã nghiệp vụ mới gây lệch tài liệu.
- **Trạng thái:** dùng đúng tên trạng thái chuẩn từ TL02 mục 13 cho hóa đơn nạp, rút tiền, liên kết, chiến dịch.
- **Tài chính:** giữ nguyên nguyên tắc không chỉnh số dư trực tiếp và không sửa xóa sổ cái.
- **Phạm vi:** không mở rộng sang cơ chế vi phạm ràng buộc an toàn đã chốt trong TL01.

---

## 18. Đề xuất tài liệu ưu tiên tiếp theo

Để giữ nhịp làm tài liệu quan trọng trước và tránh mâu thuẫn về hành vi giao diện, tài liệu nên làm tiếp là:

- **TL08 — Đặc tả quy trình nạp tiền thủ công**

Lý do ưu tiên:

1. Liên quan trực tiếp đến tiền và số dư.
2. Phụ thuộc mạnh vào phân quyền TL03 đã chốt.
3. Ảnh hưởng đến dữ liệu, nhật ký, giao diện quản trị và trải nghiệm người dùng.

