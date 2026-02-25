# Tài liệu 02 — Đặc tả yêu cầu nghiệp vụ tổng thể

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL02
- **Tên tài liệu:** Đặc tả yêu cầu nghiệp vụ tổng thể
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01 — Tổng quan dự án và kế hoạch bộ tài liệu kỹ thuật
- **Tài liệu đầu ra phụ thuộc:** TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL15

---

## 2. Mục tiêu tài liệu

Tài liệu này mô tả toàn bộ yêu cầu nghiệp vụ ở mức tổng thể cho nền tảng hai phía gồm:

- **khối nhà xuất bản** (rút gọn liên kết và kiếm tiền theo lượt hợp lệ),
- **khối khách hàng mua chiến dịch** (quản lý chiến dịch quảng bá hợp lệ tính theo lượt),
- **khối quản trị** (quản lý vận hành, tài chính, cấu hình, chống gian lận),
- **khối chuyển hướng trung gian** (xử lý liên kết ngắn, xác minh truy cập hợp lệ, ghi nhận sự kiện, chuyển hướng).

Tài liệu này nhằm:

1. Thống nhất ngôn ngữ nghiệp vụ giữa chủ dự án, đội phát triển và trợ lý lập trình.
2. Xác định rõ tác nhân, chức năng, luồng chính, quy tắc nghiệp vụ và ngoại lệ.
3. Làm nền cho các tài liệu chi tiết theo quy trình, dữ liệu, phân quyền và giao diện.
4. Giảm sai sót dây chuyền khi triển khai tài liệu sau.

---

## 3. Phạm vi nghiệp vụ của TL02

### 3.1 Trong phạm vi

- Quản lý tài khoản và hồ sơ ở mức nghiệp vụ.
- Nạp tiền thủ công qua chuyển khoản ngân hàng và cấu hình hiển thị phương thức USDT thủ công.
- Rút tiền thủ công cho nhà xuất bản.
- Tạo và quản lý liên kết rút gọn.
- Ghi nhận lượt truy cập và tính doanh thu theo lượt hợp lệ.
- Tạo và quản lý chiến dịch quảng bá hợp lệ tính theo lượt.
- Trừ tiền theo lượt hợp lệ cho khách hàng mua chiến dịch.
- Vai trò, quyền nghiệp vụ cấp cao.
- Trạng thái nghiệp vụ và quy tắc chuyển trạng thái.
- Báo cáo tổng quan và đối soát cấp nghiệp vụ.
- Chống gian lận ở góc độ nghiệp vụ.
- Yêu cầu song ngữ Việt và Anh ở cấp nghiệp vụ.

### 3.2 Ngoài phạm vi

- Đặc tả chi tiết từng màn hình (thuộc TL04, TL05, TL06, TL07).
- Đặc tả chi tiết từng bảng và cột dữ liệu (thuộc TL13).
- Đặc tả chi tiết giao diện lập trình (thuộc TL15).
- Thiết kế chi tiết hạ tầng triển khai.
- Cơ chế thao túng tín hiệu xếp hạng hoặc hướng dẫn tác động kết quả tìm kiếm.

---

## 4. Bối cảnh nghiệp vụ và mô hình giá trị

Nền tảng hoạt động như một hệ sinh thái hai phía và một khối quản trị trung tâm:

- **Nhà xuất bản** tạo liên kết rút gọn để phân phối nội dung, nhận doanh thu theo các lượt truy cập được hệ thống xác nhận là hợp lệ.
- **Khách hàng mua chiến dịch** nạp tiền và tạo chiến dịch quảng bá hợp lệ tính theo lượt, nhận báo cáo về kết quả và chi tiêu.
- **Quản trị viên** cấu hình giá theo lượt, duyệt giao dịch tài chính thủ công, kiểm soát gian lận và vận hành toàn hệ thống.
- **Khối chuyển hướng trung gian** là điểm xử lý truy cập tới liên kết ngắn, thực hiện kiểm tra điều kiện, ghi nhận sự kiện và chuyển hướng tới liên kết đích hoặc liên kết dự phòng.

### 4.1 Giá trị cốt lõi của sản phẩm

- Tạo trải nghiệm tự phục vụ cho hai nhóm người dùng.
- Minh bạch hóa số dư, giao dịch và trạng thái xử lý.
- Chuẩn hóa quy trình tạo chiến dịch và quản lý liên kết.
- Tính toán doanh thu và chi tiêu theo lượt hợp lệ có kiểm soát gian lận.
- Cho phép mở rộng quốc tế và song ngữ ngay từ nền tảng nghiệp vụ.

---

## 5. Tác nhân nghiệp vụ

## 5.1 Tác nhân chính

### A1 — Khách hàng mua chiến dịch
Người dùng nạp tiền và tạo chiến dịch quảng bá hợp lệ tính theo lượt.

### A2 — Nhà xuất bản
Người dùng tạo liên kết rút gọn, phân phối liên kết và nhận doanh thu theo lượt hợp lệ.

### A3 — Quản trị viên
Người vận hành có quyền duyệt nạp rút, cấu hình hệ thống, xử lý gian lận, quản lý người dùng, liên kết và chiến dịch.

### A4 — Nhân viên hỗ trợ (tùy chọn)
Người tra cứu thông tin hỗ trợ, xử lý câu hỏi và chuyển yêu cầu cho quản trị viên nếu liên quan đến tài chính hoặc gian lận.

## 5.2 Tác nhân ngoài hệ thống

### E1 — Ngân hàng Việt Nam
Kênh người dùng dùng để chuyển khoản nạp tiền hoặc nhận tiền rút thủ công.

### E2 — Hệ thống lưu trữ tệp
Nơi lưu ảnh chứng từ nạp tiền, ảnh bằng chứng xử lý rút tiền, ảnh mã ngân hàng, ảnh mã ví USDT.

### E3 — Dịch vụ xác minh truy cập
Dịch vụ xác minh truy cập hợp lệ chống máy tự động ở khối chuyển hướng trung gian.

### E4 — Kênh thông báo
Kênh gửi thông báo trong hệ thống, thư điện tử hoặc kênh khác do hệ thống hỗ trợ.

---

## 6. Thuật ngữ nghiệp vụ và định nghĩa

> Mục này nhằm khóa cách hiểu để tránh mỗi tài liệu dùng một nghĩa khác nhau.

- **Lượt:** một lần truy cập được hệ thống ghi nhận vào liên kết hoặc chiến dịch.
- **Lượt hợp lệ:** lượt đáp ứng các điều kiện hợp lệ do hệ thống quy định tại thời điểm xử lý và đối soát.
- **Lượt bị loại:** lượt không đạt điều kiện hợp lệ hoặc bị gắn cờ gian lận.
- **Nhà xuất bản:** người sở hữu hoặc quản lý liên kết rút gọn để phân phối nội dung và nhận doanh thu theo lượt.
- **Khách hàng mua chiến dịch:** người nạp tiền và tạo chiến dịch quảng bá hợp lệ, bị trừ tiền theo lượt hợp lệ.
- **Chiến dịch:** cấu hình quảng bá có ngân sách, giới hạn lượt, điều kiện nhắm mục tiêu, trạng thái vận hành.
- **Liên kết rút gọn:** liên kết ngắn ánh xạ đến liên kết đích, có thể kèm bí danh và liên kết dự phòng.
- **Liên kết dự phòng:** liên kết dùng thay thế khi liên kết đích lỗi hoặc bị chặn.
- **Số dư khả dụng:** phần số dư có thể sử dụng ngay.
- **Số dư khóa tạm:** phần số dư đã tạm giữ cho một nghiệp vụ đang chờ xử lý, ví dụ rút tiền.
- **Sổ cái giao dịch:** nhật ký bất biến dùng để ghi mọi thay đổi số dư.
- **Đối soát:** bước xác nhận và điều chỉnh số liệu tạm thời thành số liệu chốt.
- **Điểm rủi ro:** giá trị đánh giá mức bất thường của lượt truy cập.
- **Duyệt thủ công:** thao tác xác nhận của quản trị viên đối với nạp tiền, rút tiền hoặc các trường hợp gian lận.

---

## 7. Giả định nghiệp vụ và điều kiện nền

1. Hệ thống hỗ trợ ít nhất hai ngôn ngữ Việt và Anh ngay từ phiên bản đầu.
2. Hệ thống hỗ trợ ít nhất hai nhóm người dùng chính: khách hàng mua chiến dịch và nhà xuất bản.
3. Nạp và rút tiền ở giai đoạn đầu được xử lý **thủ công**, có duyệt bởi quản trị viên.
4. Giá tính tiền theo lượt là cấu hình hệ thống, có thể thay đổi theo vùng hoặc nhóm chính sách.
5. Số liệu hiển thị trên bảng điều khiển có thể là số liệu tạm thời; số liệu chốt dùng cho đối soát cuối kỳ.
6. Hệ thống có cơ chế chống gian lận ở mức nền tảng và có thể mở rộng sau.
7. Hệ thống không cung cấp tính năng vi phạm chính sách của nền tảng bên thứ ba.

---

## 8. Mục tiêu nghiệp vụ theo từng khối

## 8.1 Mục tiêu khối khách hàng mua chiến dịch

- Tạo tài khoản và quản lý hồ sơ.
- Nạp tiền vào ví hệ thống qua kênh được hỗ trợ.
- Tạo chiến dịch quảng bá hợp lệ tính theo lượt.
- Theo dõi trạng thái chiến dịch, chi tiêu và kết quả.
- Xem lịch sử hóa đơn và giao dịch số dư.

## 8.2 Mục tiêu khối nhà xuất bản

- Tạo và quản lý liên kết rút gọn.
- Theo dõi lượt hợp lệ, lượt bị loại, doanh thu theo liên kết và theo thời gian.
- Quản lý thông tin nhận tiền.
- Tạo yêu cầu rút tiền và theo dõi trạng thái xử lý.

## 8.3 Mục tiêu khối quản trị

- Vận hành tài chính thủ công minh bạch.
- Quản lý cấu hình giá, ngưỡng, khuyến mãi, phương thức thanh toán hiển thị.
- Theo dõi và xử lý gian lận.
- Quản lý người dùng, chiến dịch, liên kết và nội dung hệ thống.
- Theo dõi báo cáo tổng quan và đối soát.

## 8.4 Mục tiêu khối chuyển hướng trung gian

- Xử lý truy cập tới liên kết ngắn ổn định và nhanh.
- Kiểm tra trạng thái liên kết và điều kiện truy cập.
- Ghi nhận sự kiện phục vụ thống kê và tính tiền.
- Chuyển hướng tới liên kết đích hoặc liên kết dự phòng.
- Hiển thị trang lỗi hoặc trang báo lỗi phù hợp.

---

## 9. Danh mục chức năng nghiệp vụ tổng thể

Mỗi chức năng có mã để truy vết sang tài liệu sau.

## 9.1 Nhóm tài khoản và hồ sơ

- **NV01** — Đăng ký tài khoản
- **NV02** — Đăng nhập
- **NV03** — Quên mật khẩu và đặt lại mật khẩu
- **NV04** — Quản lý hồ sơ cá nhân
- **NV05** — Đổi mật khẩu
- **NV06** — Chọn ngôn ngữ hiển thị
- **NV07** — Quản lý thông tin nhận tiền của nhà xuất bản

## 9.2 Nhóm ví, số dư và tài chính

- **NV08** — Xem số dư và lịch sử giao dịch
- **NV09** — Tạo yêu cầu nạp tiền thủ công
- **NV10** — Tải chứng từ nạp tiền
- **NV11** — Duyệt hoặc từ chối nạp tiền
- **NV12** — Tạo yêu cầu rút tiền
- **NV13** — Duyệt hoặc từ chối rút tiền
- **NV14** — Khóa tạm và hoàn số dư theo trạng thái rút tiền
- **NV15** — Cấu hình phương thức nạp và rút hiển thị cho người dùng

## 9.3 Nhóm nhà xuất bản và liên kết rút gọn

- **NV16** — Tạo liên kết rút gọn
- **NV17** — Cập nhật liên kết rút gọn
- **NV18** — Tạm khóa hoặc mở khóa liên kết
- **NV19** — Xem danh sách liên kết và thống kê
- **NV20** — Ghi nhận sự kiện truy cập liên kết
- **NV21** — Phân loại lượt hợp lệ hoặc bị loại
- **NV22** — Tính doanh thu cho nhà xuất bản theo lượt hợp lệ
- **NV23** — Đối soát doanh thu nhà xuất bản

## 9.4 Nhóm khách hàng mua chiến dịch

- **NV24** — Tạo chiến dịch quảng bá hợp lệ tính theo lượt
- **NV25** — Cập nhật chiến dịch trước khi chạy hoặc theo quy tắc cho phép
- **NV26** — Gửi duyệt chiến dịch
- **NV27** — Tạm dừng hoặc tiếp tục chiến dịch
- **NV28** — Hủy chiến dịch theo điều kiện cho phép
- **NV29** — Ghi nhận lượt cho chiến dịch
- **NV30** — Trừ tiền theo lượt hợp lệ
- **NV31** — Theo dõi thống kê chiến dịch và chi tiêu

## 9.5 Nhóm quản trị và cấu hình hệ thống

- **NV32** — Quản lý người dùng
- **NV33** — Quản lý giá theo lượt
- **NV34** — Quản lý khuyến mãi nạp tiền
- **NV35** — Quản lý tài khoản ngân hàng hiển thị
- **NV36** — Quản lý ví USDT hiển thị
- **NV37** — Quản lý thông báo hệ thống
- **NV38** — Theo dõi cảnh báo gian lận
- **NV39** — Nhật ký quản trị
- **NV40** — Báo cáo đối soát tổng quan

## 9.6 Nhóm chuyển hướng trung gian

- **NV41** — Xử lý truy cập liên kết ngắn
- **NV42** — Xác minh truy cập hợp lệ chống máy tự động
- **NV43** — Chuyển hướng đến liên kết đích hoặc dự phòng
- **NV44** — Hiển thị lỗi liên kết hoặc trạng thái không khả dụng
- **NV45** — Nhận báo lỗi từ người dùng cuối

---

## 10. Luồng nghiệp vụ tổng thể cấp nền tảng

## 10.1 Luồng tổng thể phía nhà xuất bản

1. Nhà xuất bản đăng ký hoặc đăng nhập.
2. Cập nhật hồ sơ và thông tin nhận tiền nếu cần.
3. Tạo liên kết rút gọn (có thể kèm bí danh và liên kết dự phòng).
4. Chia sẻ liên kết rút gọn ra ngoài nền tảng.
5. Người dùng cuối truy cập liên kết ngắn.
6. Khối chuyển hướng trung gian xử lý truy cập, ghi nhận sự kiện.
7. Hệ thống phân loại lượt hợp lệ hoặc bị loại.
8. Lượt hợp lệ được ghi doanh thu tạm thời cho nhà xuất bản.
9. Nhà xuất bản theo dõi thống kê và doanh thu.
10. Nhà xuất bản tạo yêu cầu rút tiền khi đủ điều kiện.
11. Quản trị viên duyệt hoặc từ chối rút tiền.
12. Hệ thống cập nhật số dư và trạng thái rút tiền.

## 10.2 Luồng tổng thể phía khách hàng mua chiến dịch

1. Khách hàng đăng ký hoặc đăng nhập.
2. Tạo yêu cầu nạp tiền và chuyển khoản theo hướng dẫn hiển thị.
3. Tải chứng từ nạp tiền.
4. Quản trị viên duyệt nạp tiền.
5. Hệ thống cộng số dư và ghi sổ cái.
6. Khách hàng tạo chiến dịch quảng bá hợp lệ tính theo lượt.
7. Chiến dịch được lưu nháp hoặc gửi duyệt.
8. Quản trị viên duyệt chiến dịch nếu cấu hình yêu cầu duyệt.
9. Chiến dịch chuyển sang trạng thái chạy khi đủ điều kiện.
10. Hệ thống ghi nhận lượt và phân loại hợp lệ hoặc bị loại.
11. Lượt hợp lệ được trừ tiền theo đơn giá cấu hình.
12. Khách hàng theo dõi kết quả và chi tiêu, điều chỉnh hoặc dừng chiến dịch theo quyền cho phép.

## 10.3 Luồng tổng thể phía quản trị

1. Quản trị viên đăng nhập vào cổng quản trị.
2. Theo dõi tổng quan hệ thống và các cảnh báo ưu tiên cao.
3. Xử lý hàng chờ nạp tiền và rút tiền.
4. Quản lý người dùng, chiến dịch, liên kết vi phạm hoặc rủi ro cao.
5. Cấu hình giá theo lượt, ngưỡng rút, khuyến mãi, phương thức nạp rút hiển thị.
6. Theo dõi báo cáo đối soát và nhật ký quản trị.
7. Xử lý tranh chấp, khiếu nại và quyết định điều chỉnh nếu cần.

---

## 11. Đặc tả nghiệp vụ theo nhóm chức năng

## 11.1 Nhóm tài khoản và hồ sơ

### 11.1.1 Đăng ký tài khoản

**Mục tiêu:** tạo tài khoản mới cho khách hàng mua chiến dịch hoặc nhà xuất bản.

**Đầu vào nghiệp vụ tối thiểu:**
- thư điện tử
- mật khẩu
- loại tài khoản
- chấp thuận điều khoản sử dụng

**Kết quả mong đợi:**
- tài khoản được tạo thành công ở trạng thái cho phép đăng nhập, hoặc
- tài khoản ở trạng thái chờ xác minh theo cấu hình hệ thống.

**Quy tắc nghiệp vụ:**
- Thư điện tử là định danh duy nhất.
- Một tài khoản có thể mang một hoặc nhiều vai trò nếu hệ thống cho phép trong giai đoạn sau; phiên bản đầu nên tách rõ theo loại tài khoản khi đăng ký để giảm phức tạp nghiệp vụ.
- Phải ghi nhận thời điểm tạo và nguồn tạo tài khoản.

### 11.1.2 Đăng nhập và quản lý phiên

**Mục tiêu:** cho phép người dùng truy cập đúng cổng chức năng theo vai trò.

**Quy tắc nghiệp vụ:**
- Chỉ tài khoản ở trạng thái hoạt động mới được đăng nhập.
- Tài khoản bị khóa phải thấy lý do chung và hướng dẫn liên hệ hỗ trợ.
- Đăng nhập thành công phải ghi nhật ký đăng nhập.

### 11.1.3 Hồ sơ cá nhân

**Mục tiêu:** người dùng cập nhật tên hiển thị, số điện thoại, ngôn ngữ mặc định và các thông tin được phép sửa.

**Quy tắc nghiệp vụ:**
- Một số trường có thể khóa sửa sau khi xác minh hoặc sau khi phát sinh giao dịch tài chính.
- Thay đổi thông tin nhạy cảm phải ghi nhật ký.

### 11.1.4 Thông tin nhận tiền nhà xuất bản

**Mục tiêu:** lưu thông tin nhận tiền cho quy trình rút tiền.

**Quy tắc nghiệp vụ:**
- Hệ thống hỗ trợ ít nhất hai loại phương thức: ngân hàng Việt Nam và ví USDT thủ công.
- Cần lưu bản chụp thông tin nhận tiền vào yêu cầu rút tại thời điểm tạo, để tránh sai lệch khi người dùng thay đổi về sau.

---

## 11.2 Nhóm ví, số dư và sổ cái giao dịch

### 11.2.1 Số dư và lịch sử giao dịch

**Mục tiêu:** hiển thị số dư khả dụng, số dư khóa tạm và lịch sử giao dịch cho người dùng.

**Quy tắc nghiệp vụ:**
- Số dư hiển thị phải lấy từ sổ cái hoặc số dư tổng hợp đã được cập nhật từ sổ cái.
- Không cho phép chỉnh số dư trực tiếp không có bản ghi sổ cái.

### 11.2.2 Sổ cái giao dịch

**Mục tiêu:** ghi nhận mọi thay đổi số dư.

**Quy tắc nghiệp vụ bắt buộc:**
- Mỗi thay đổi số dư phải có loại giao dịch, nguồn tham chiếu và thời điểm tạo.
- Phải lưu số dư trước và số dư sau để hỗ trợ đối soát.
- Bản ghi sổ cái là bất biến; điều chỉnh sai sót phải dùng bản ghi bù trừ, không sửa xóa dấu vết.

---

## 11.3 Nhóm nạp tiền thủ công

### 11.3.1 Tạo yêu cầu nạp tiền

**Mục tiêu:** người dùng tạo hóa đơn nạp tiền để nhận hướng dẫn chuyển khoản.

**Kênh hỗ trợ giai đoạn đầu:**
- chuyển khoản ngân hàng Việt Nam
- nạp USDT thủ công theo cấu hình quản trị (nếu bật)

**Đầu vào nghiệp vụ tối thiểu:**
- số tiền yêu cầu nạp
- phương thức nạp

**Đầu ra nghiệp vụ:**
- hóa đơn nạp ở trạng thái chờ thanh toán hoặc chờ tải chứng từ
- thông tin thanh toán hiển thị (ngân hàng hoặc ví USDT)
- nội dung tham chiếu giao dịch

**Quy tắc nghiệp vụ:**
- Mỗi hóa đơn có mã duy nhất.
- Hóa đơn có thời hạn hết hiệu lực.
- Khuyến mãi nạp tiền (nếu có) phải được chụp lại vào hóa đơn tại thời điểm tạo để tránh thay đổi cấu hình làm lệch kết quả sau này.

### 11.3.2 Tải chứng từ nạp tiền

**Mục tiêu:** người dùng gửi bằng chứng thanh toán để quản trị viên duyệt.

**Quy tắc nghiệp vụ:**
- Chỉ cho tải chứng từ khi hóa đơn đang ở trạng thái cho phép.
- Hệ thống ghi thời điểm tải lên và người tải.
- Có thể cho phép cập nhật chứng từ nhiều lần trước khi duyệt theo cấu hình.

### 11.3.3 Duyệt hoặc từ chối nạp tiền

**Mục tiêu:** quản trị viên xác nhận tiền đã vào và cộng số dư.

**Quy tắc nghiệp vụ bắt buộc:**
- Chỉ duyệt một lần cho mỗi hóa đơn thành công.
- Khi duyệt thành công, hệ thống phải:
  1. cập nhật trạng thái hóa đơn,
  2. ghi sổ cái giao dịch cộng tiền,
  3. cập nhật số dư,
  4. ghi nhật ký quản trị,
  5. gửi thông báo cho người dùng.
- Từ chối phải có lý do.
- Nếu phát hiện hóa đơn bị cộng trùng, xử lý bằng nghiệp vụ điều chỉnh có dấu vết, không chỉnh tay số dư.

---

## 11.4 Nhóm rút tiền thủ công

### 11.4.1 Tạo yêu cầu rút tiền

**Mục tiêu:** nhà xuất bản gửi yêu cầu rút tiền từ số dư khả dụng.

**Đầu vào nghiệp vụ tối thiểu:**
- số tiền rút
- phương thức nhận tiền
- thông tin nhận tiền hợp lệ hoặc đã lưu trước đó

**Quy tắc nghiệp vụ bắt buộc:**
- Kiểm tra ngưỡng rút tối thiểu.
- Kiểm tra số dư khả dụng đủ.
- Kiểm tra trạng thái tài khoản đủ điều kiện rút.
- Khi tạo yêu cầu, hệ thống phải khóa tạm số dư tương ứng.
- Bản chụp thông tin nhận tiền phải được lưu cùng yêu cầu rút.

### 11.4.2 Duyệt, từ chối, hoàn tiền rút

**Mục tiêu:** quản trị viên xử lý yêu cầu rút.

**Quy tắc nghiệp vụ bắt buộc:**
- Từ chối phải hoàn lại số dư khóa tạm về số dư khả dụng.
- Duyệt và chuyển tiền phải có bằng chứng xử lý hoặc ghi chú vận hành.
- Trạng thái xử lý phải theo luồng hợp lệ, không nhảy trạng thái tùy ý.
- Mọi thao tác phải ghi nhật ký quản trị.

---

## 11.5 Nhóm liên kết rút gọn và nhà xuất bản

### 11.5.1 Tạo liên kết rút gọn

**Mục tiêu:** nhà xuất bản tạo mã liên kết ngắn để phân phối.

**Đầu vào nghiệp vụ tối thiểu:**
- liên kết đích
- bí danh (tùy chọn)
- liên kết dự phòng (tùy chọn)

**Đầu ra nghiệp vụ:**
- liên kết ngắn được tạo
- trạng thái liên kết hoạt động hoặc chờ duyệt theo cấu hình

**Quy tắc nghiệp vụ:**
- Bí danh phải duy nhất trong phạm vi hệ thống nếu được dùng.
- Liên kết đích phải qua kiểm tra định dạng và chính sách nội dung.
- Liên kết dự phòng phải độc lập với liên kết đích và hợp lệ.

### 11.5.2 Quản lý liên kết

**Mục tiêu:** nhà xuất bản theo dõi và cập nhật liên kết trong phạm vi cho phép.

**Quy tắc nghiệp vụ:**
- Một số trường không cho sửa sau khi đã có lượng truy cập lớn hoặc đã phát sinh đối soát, tùy chính sách hệ thống.
- Hệ thống cho phép tạm khóa liên kết khi phát hiện rủi ro hoặc vi phạm.

### 11.5.3 Ghi nhận truy cập và tính doanh thu

**Mục tiêu:** hệ thống xử lý truy cập tới liên kết ngắn để ghi sự kiện và tính doanh thu theo lượt hợp lệ.

**Quy tắc nghiệp vụ cấp cao:**
- Truy cập phải đi qua kiểm tra trạng thái liên kết.
- Hệ thống ghi sự kiện trước hoặc trong quá trình chuyển hướng tùy thiết kế triển khai.
- Mỗi sự kiện được phân loại hợp lệ hoặc bị loại.
- Chỉ lượt hợp lệ mới được tính doanh thu.
- Doanh thu có thể là số tạm thời và được điều chỉnh khi đối soát cuối kỳ.

---

## 11.6 Nhóm chiến dịch khách hàng mua

### 11.6.1 Tạo chiến dịch quảng bá hợp lệ tính theo lượt

**Mục tiêu:** khách hàng cấu hình chiến dịch sử dụng ngân sách để nhận lượt hợp lệ.

**Đầu vào nghiệp vụ tối thiểu:**
- tên chiến dịch
- liên kết đích hoặc nhóm liên kết đích theo quy tắc hệ thống
- ngân sách tổng
- giới hạn lượt theo ngày
- đơn giá theo lượt (nếu cho phép người dùng chọn trong khung) hoặc lấy từ cấu hình hệ thống
- điều kiện nhắm mục tiêu hợp lệ (quốc gia, thiết bị, khung giờ, nếu hệ thống hỗ trợ)

**Quy tắc nghiệp vụ:**
- Chiến dịch không được chạy nếu không đủ số dư.
- Hệ thống phải kiểm tra liên kết đích theo chính sách nội dung.
- Cấu hình chiến dịch phải được lưu phiên bản khi có thay đổi quan trọng.

### 11.6.2 Vòng đời chiến dịch

**Trạng thái chính ở mức nghiệp vụ:**
- mới tạo
- nháp
- chờ duyệt
- bị từ chối
- sẵn sàng chạy
- đang chạy
- tạm dừng
- hết ngân sách
- hoàn thành
- đã hủy
- lỗi cấu hình

**Quy tắc chuyển trạng thái cấp cao:**
- nháp có thể chuyển chờ duyệt hoặc hủy
- chờ duyệt có thể chuyển sẵn sàng chạy hoặc bị từ chối
- sẵn sàng chạy chuyển đang chạy khi đủ điều kiện vận hành
- đang chạy có thể chuyển tạm dừng, hết ngân sách, hoàn thành hoặc lỗi cấu hình
- tạm dừng có thể quay lại đang chạy nếu đủ điều kiện
- hủy là trạng thái kết thúc theo điều kiện cho phép

### 11.6.3 Ghi nhận lượt và trừ tiền theo lượt hợp lệ

**Mục tiêu:** trừ tiền minh bạch theo số lượt hợp lệ của chiến dịch.

**Quy tắc nghiệp vụ:**
- Chỉ lượt hợp lệ mới trừ tiền.
- Trừ tiền phải ghi sổ cái giao dịch từ ví khách hàng.
- Không được trừ vượt ngân sách hoặc vượt số dư khả dụng.
- Hệ thống phải có cơ chế tránh trừ trùng cho cùng một sự kiện.

---

## 11.7 Khối chuyển hướng trung gian

### 11.7.1 Xử lý truy cập liên kết ngắn

**Mục tiêu:** tiếp nhận truy cập, xác định liên kết cần mở, kiểm tra điều kiện và chuyển hướng an toàn.

**Quy tắc nghiệp vụ:**
- Nếu mã liên kết không tồn tại, hiển thị trang lỗi liên kết.
- Nếu liên kết bị khóa, hết hạn hoặc không khả dụng, hiển thị trạng thái tương ứng.
- Nếu liên kết đích lỗi và có liên kết dự phòng, có thể chuyển hướng sang liên kết dự phòng theo cấu hình.

### 11.7.2 Xác minh truy cập hợp lệ chống máy tự động

**Mục tiêu:** giảm truy cập rác và cải thiện chất lượng lượt tính tiền.

**Quy tắc nghiệp vụ cấp cao:**
- Có thể bật hoặc tắt lớp xác minh theo loại liên kết hoặc cấu hình hệ thống.
- Không ghi nhận là lượt hợp lệ nếu bước xác minh bắt buộc không hoàn tất.
- Dữ liệu xác minh phải được lưu ở mức vừa đủ để phục vụ chống gian lận và kiểm tra sau này.

### 11.7.3 Báo lỗi từ người dùng cuối

**Mục tiêu:** cho phép người dùng cuối báo lỗi khi liên kết không hoạt động hoặc nội dung không truy cập được.

**Quy tắc nghiệp vụ:**
- Báo lỗi phải gắn với mã liên kết và thời điểm.
- Hệ thống có thể gom nhóm báo lỗi tương tự để tránh nhiễu.

---

## 11.8 Khối quản trị và cấu hình hệ thống

### 11.8.1 Quản lý người dùng

**Mục tiêu:** tra cứu, khóa hoặc mở khóa tài khoản, xem lịch sử cơ bản phục vụ hỗ trợ và an toàn hệ thống.

**Quy tắc nghiệp vụ:**
- Mọi thao tác khóa hoặc mở khóa phải có lý do.
- Không cho phép nhân viên không đủ quyền can thiệp tài chính.

### 11.8.2 Cấu hình giá theo lượt

**Mục tiêu:** quy định đơn giá áp dụng cho chiến dịch và quy tắc tính doanh thu nhà xuất bản.

**Quy tắc nghiệp vụ:**
- Cấu hình giá cần có thời điểm hiệu lực.
- Thay đổi giá không làm thay đổi ngược các giao dịch đã chốt.
- Nên lưu lịch sử phiên bản cấu hình giá.

### 11.8.3 Cấu hình khuyến mãi nạp tiền

**Mục tiêu:** cho phép áp dụng chính sách khuyến mãi theo ngưỡng.

**Quy tắc nghiệp vụ:**
- Chính sách khuyến mãi có thời gian hiệu lực.
- Hóa đơn nạp phải chụp lại chính sách tại thời điểm tạo hóa đơn.

### 11.8.4 Cấu hình phương thức nạp và rút hiển thị

**Mục tiêu:** quản trị viên cấu hình tài khoản ngân hàng và ví USDT hiển thị cho người dùng.

**Yêu cầu nghiệp vụ:**
- Hỗ trợ nhiều tài khoản ngân hàng hiển thị theo thứ tự.
- Hỗ trợ bật tắt từng phương thức.
- Hỗ trợ tải ảnh mã chuyển khoản và ảnh mã ví.
- Hỗ trợ nội dung hướng dẫn song ngữ.

### 11.8.5 Nhật ký quản trị

**Mục tiêu:** truy vết thao tác nhạy cảm, đặc biệt là tài chính và chống gian lận.

**Quy tắc nghiệp vụ:**
- Nhật ký phải lưu người thao tác, hành động, đối tượng, thời điểm.
- Đối với thao tác tài chính, phải lưu trạng thái trước và sau ở mức cần thiết.

---

## 12. Quy tắc nghiệp vụ cấp nền tảng

## 12.1 Quy tắc về tài khoản

1. Thư điện tử là duy nhất trên toàn hệ thống.
2. Tài khoản bị khóa không được tạo mới nghiệp vụ tài chính hoặc chiến dịch.
3. Quyền truy cập cổng phải phù hợp với vai trò được cấp.
4. Thay đổi thông tin nhạy cảm phải ghi nhật ký.

## 12.2 Quy tắc về số dư và sổ cái

1. Không cho phép số dư âm.
2. Mọi thay đổi số dư đều phải có bản ghi sổ cái.
3. Bản ghi sổ cái là bất biến; điều chỉnh dùng bút toán bù.
4. Giao dịch số dư phải có tham chiếu nguồn nghiệp vụ.

## 12.3 Quy tắc về nạp tiền thủ công

1. Mỗi hóa đơn nạp có mã duy nhất và thời hạn hiệu lực.
2. Không cộng tiền hai lần cho cùng một hóa đơn thành công.
3. Cộng tiền chỉ sau khi có duyệt thành công.
4. Từ chối nạp tiền phải có lý do.
5. Tải chứng từ chỉ được thực hiện trong các trạng thái cho phép.

## 12.4 Quy tắc về rút tiền thủ công

1. Chỉ nhà xuất bản đủ điều kiện mới được tạo yêu cầu rút.
2. Tạo yêu cầu rút phải khóa tạm số dư.
3. Từ chối rút phải hoàn số dư khóa tạm.
4. Duyệt rút phải có ghi chú hoặc bằng chứng xử lý.
5. Không cho phép xử lý rút tiền khi tài khoản bị khóa theo chính sách an toàn.

## 12.5 Quy tắc về liên kết rút gọn

1. Bí danh không được trùng.
2. Liên kết đích và liên kết dự phòng phải hợp lệ theo chính sách hệ thống.
3. Liên kết có thể bị khóa bởi quản trị viên khi vi phạm hoặc rủi ro cao.
4. Truy cập vào liên kết phải ghi nhận sự kiện phục vụ thống kê và chống gian lận.

## 12.6 Quy tắc về chiến dịch tính theo lượt

1. Chiến dịch phải có ngân sách và giới hạn lượt hợp lệ.
2. Chiến dịch chỉ chạy khi đủ số dư và qua điều kiện duyệt nếu áp dụng.
3. Chỉ lượt hợp lệ mới được trừ tiền.
4. Không trừ tiền vượt ngân sách chiến dịch hoặc số dư khả dụng.
5. Mọi thay đổi cấu hình quan trọng phải có lưu vết phiên bản.

## 12.7 Quy tắc về lượt hợp lệ và chống gian lận

1. Một lượt chỉ được tính hợp lệ khi đáp ứng bộ điều kiện do hệ thống quy định.
2. Lượt có rủi ro cao có thể bị loại tạm thời hoặc đưa vào hàng chờ kiểm tra.
3. Hệ thống phải phân biệt số liệu tạm thời và số liệu đã đối soát.
4. Mọi quyết định điều chỉnh thủ công phải có lý do và nhật ký.

## 12.8 Quy tắc về song ngữ và quốc tế

1. Nội dung hiển thị hệ thống phải hỗ trợ Việt và Anh.
2. Thời gian lưu chuẩn thống nhất, hiển thị theo múi giờ người dùng.
3. Dữ liệu tiền tệ phải lưu bằng kiểu số chính xác và có đơn vị tiền kèm theo.

---

## 13. Trạng thái nghiệp vụ chuẩn hóa cấp tổng thể

> Mục này chốt tên trạng thái ở mức tổng thể. Mã trạng thái và quy ước hiển thị chi tiết sẽ được làm ở TL14.

## 13.1 Trạng thái tài khoản

- hoạt động
- tạm khóa
- khóa vĩnh viễn
- chờ xác minh

## 13.2 Trạng thái hóa đơn nạp tiền

- mới tạo
- chờ thanh toán
- chờ chứng từ
- chờ duyệt
- đang kiểm tra
- thành công
- từ chối
- hết hạn
- đã hủy

## 13.3 Trạng thái yêu cầu rút tiền

- mới tạo
- chờ duyệt
- đang xử lý
- đã duyệt
- đã gửi
- hoàn thành
- từ chối
- hoàn tiền

## 13.4 Trạng thái liên kết rút gọn

- hoạt động
- tạm khóa
- chờ duyệt
- hết hạn
- lỗi

## 13.5 Trạng thái chiến dịch

- nháp
- chờ duyệt
- bị từ chối
- sẵn sàng chạy
- đang chạy
- tạm dừng
- hết ngân sách
- hoàn thành
- đã hủy
- lỗi cấu hình

## 13.6 Trạng thái sự kiện lượt

- mới ghi nhận
- đang đánh giá
- hợp lệ tạm thời
- bị loại tạm thời
- hợp lệ đã chốt
- bị loại đã chốt
- cần kiểm tra thủ công

---

## 14. Ngoại lệ nghiệp vụ và cách xử lý cấp tổng thể

## 14.1 Ngoại lệ tài khoản

### Tài khoản bị khóa khi đang có yêu cầu rút tiền
- Không cho tạo yêu cầu rút mới.
- Các yêu cầu đang chờ xử lý được quản trị viên xem xét thủ công.
- Mọi quyết định phải có nhật ký.

### Người dùng quên mật khẩu khi đang đăng nhập trên thiết bị khác
- Hệ thống cho phép đặt lại mật khẩu.
- Có thể buộc đăng xuất các phiên khác theo cấu hình an toàn.

## 14.2 Ngoại lệ nạp tiền

### Chuyển khoản đúng tiền nhưng sai nội dung tham chiếu
- Quản trị viên có thể duyệt tay nếu đối chiếu được.
- Phải lưu ghi chú lý do duyệt tay.

### Người dùng tải nhầm chứng từ cho hóa đơn khác
- Cho phép thay chứng từ khi hóa đơn chưa duyệt và còn hiệu lực.
- Lưu lịch sử tải chứng từ.

### Hóa đơn hết hạn nhưng người dùng vừa chuyển khoản
- Quản trị viên xử lý theo quy trình vận hành: duyệt tay cho hóa đơn cũ hoặc hướng dẫn tạo hóa đơn mới và điều chỉnh.
- Bắt buộc có nhật ký và tham chiếu rõ.

## 14.3 Ngoại lệ rút tiền

### Rút tiền bị từ chối sau khi đã khóa số dư
- Hệ thống hoàn số dư khóa tạm về số dư khả dụng.
- Ghi sổ cái bút toán hoàn và cập nhật trạng thái.

### Quản trị viên đã duyệt nhưng chuyển khoản thất bại
- Chuyển trạng thái theo quy trình xử lý lỗi vận hành.
- Có thể dùng trạng thái hoàn tiền hoặc quay lại chờ xử lý tùy quy tắc chi tiết ở TL09.
- Bắt buộc lưu bằng chứng lỗi.

## 14.4 Ngoại lệ liên kết và truy cập

### Liên kết đích lỗi tạm thời
- Nếu có liên kết dự phòng và cấu hình cho phép, chuyển hướng sang liên kết dự phòng.
- Nếu không có, hiển thị trang lỗi liên kết.

### Lượng truy cập tăng đột biến bất thường
- Hệ thống có thể gắn cờ rủi ro, tạm giảm ghi nhận hợp lệ hoặc đưa vào kiểm tra.
- Quản trị viên được cảnh báo.

## 14.5 Ngoại lệ chiến dịch

### Chiến dịch đang chạy nhưng số dư không đủ cho lượt tiếp theo
- Hệ thống tạm dừng hoặc chuyển trạng thái hết ngân sách theo quy tắc cấu hình.

### Thay đổi cấu hình chiến dịch khi đang chạy
- Chỉ cho phép với trường được hỗ trợ.
- Có thể yêu cầu tạm dừng trước khi sửa và tạo phiên bản cấu hình mới.

---

## 15. Yêu cầu báo cáo và đối soát ở mức nghiệp vụ

## 15.1 Báo cáo cho khách hàng mua chiến dịch

Hệ thống cần cung cấp tối thiểu:
- số dư hiện tại
- chi tiêu theo ngày
- số lượt hợp lệ và bị loại theo chiến dịch
- trạng thái chiến dịch
- cảnh báo hết ngân sách hoặc rủi ro cấu hình

## 15.2 Báo cáo cho nhà xuất bản

Hệ thống cần cung cấp tối thiểu:
- số lượt hợp lệ và bị loại theo liên kết
- doanh thu tạm thời và doanh thu đã chốt
- lịch sử rút tiền và trạng thái xử lý
- thông báo về liên kết bị khóa hoặc rủi ro cao

## 15.3 Báo cáo cho quản trị viên

Hệ thống cần cung cấp tối thiểu:
- tổng số người dùng theo loại
- tổng lượt, lượt hợp lệ, lượt bị loại
- tổng chi tiêu khách hàng mua chiến dịch
- tổng doanh thu nhà xuất bản
- tình trạng hàng chờ nạp tiền và rút tiền
- cảnh báo gian lận ưu tiên cao
- số liệu đối soát theo ngày và theo kỳ

## 15.4 Phân biệt số liệu tạm thời và số liệu chốt

**Yêu cầu bắt buộc:**
- Bảng điều khiển và thống kê phải phân biệt được số liệu tạm thời và số liệu đã đối soát khi cần.
- Giao dịch tài chính đã chốt phải không bị thay đổi ngược mà không có bút toán điều chỉnh.

---

## 16. Yêu cầu nghiệp vụ về thông báo

## 16.1 Sự kiện cần thông báo cho người dùng

### Cho khách hàng mua chiến dịch
- tạo hóa đơn nạp thành công
- hóa đơn nạp được duyệt hoặc bị từ chối
- chiến dịch được duyệt hoặc bị từ chối
- chiến dịch tạm dừng, hết ngân sách, lỗi cấu hình

### Cho nhà xuất bản
- tạo liên kết thành công
- liên kết bị khóa hoặc mở lại
- tạo yêu cầu rút thành công
- yêu cầu rút được duyệt, từ chối, hoàn thành

### Cho quản trị viên
- hàng chờ nạp rút tăng cao
- cảnh báo gian lận mức cao
- lỗi hệ thống ảnh hưởng ghi nhận lượt hoặc tài chính

## 16.2 Yêu cầu thông báo song ngữ

- Thông báo hệ thống phải có nội dung Việt và Anh hoặc dùng khóa từ điển chuẩn hóa.
- Thông báo lưu lại lịch sử để tra cứu khi xử lý khiếu nại.

---

## 17. Yêu cầu nghiệp vụ về song ngữ và quốc tế

## 17.1 Song ngữ

1. Người dùng chọn ngôn ngữ hiển thị trong hồ sơ hoặc tại giao diện.
2. Các nhãn trạng thái nghiệp vụ phải có bản dịch nhất quán.
3. Nội dung cấu hình quản trị có thể cần nhập song ngữ cho các phần hiển thị ra ngoài.

## 17.2 Quốc tế

1. Hệ thống hỗ trợ lọc theo quốc gia trong chiến dịch nếu tính năng bật.
2. Hệ thống lưu mã quốc gia chuẩn cho sự kiện truy cập.
3. Thời gian hiển thị theo múi giờ người dùng; thời gian lưu chuẩn thống nhất.
4. Hệ thống lưu đơn vị tiền cho mọi giao dịch và cấu hình giá.

---

## 18. Tiêu chí chấp nhận cấp nghiệp vụ cho TL02

Tài liệu TL02 được xem là đạt khi thỏa tất cả tiêu chí sau:

1. Bao phủ đủ bốn khối nghiệp vụ: khách hàng mua chiến dịch, nhà xuất bản, quản trị, chuyển hướng trung gian.
2. Có danh mục chức năng tổng thể gắn mã truy vết.
3. Có mô tả luồng tổng thể của hai phía người dùng và quản trị.
4. Có quy tắc nghiệp vụ cấp nền tảng cho tài khoản, số dư, nạp, rút, liên kết, chiến dịch, lượt hợp lệ.
5. Có danh sách trạng thái nghiệp vụ tổng thể chuẩn hóa.
6. Có mô tả ngoại lệ nghiệp vụ chính và hướng xử lý tổng thể.
7. Có yêu cầu về báo cáo, đối soát, thông báo, song ngữ và quốc tế.
8. Không chứa nội dung hướng dẫn thao túng tín hiệu xếp hạng hoặc né chính sách nền tảng bên thứ ba.

---

## 19. Phạm vi chuyển giao sang các tài liệu tiếp theo

## 19.1 Chuyển sang TL03 — Ma trận vai trò và phân quyền

TL03 sẽ chi tiết hóa:
- quyền xem, tạo, sửa, xóa, duyệt theo từng vai trò,
- quyền theo màn hình,
- quyền theo hành động,
- quyền theo dữ liệu sở hữu và dữ liệu toàn hệ thống.

## 19.2 Chuyển sang TL08 và TL09 — Quy trình tài chính thủ công

TL08 và TL09 sẽ chi tiết hóa:
- trạng thái chi tiết,
- điều kiện chuyển trạng thái,
- thông báo lỗi,
- biểu mẫu,
- chứng từ,
- nhật ký duyệt,
- bút toán sổ cái cụ thể.

## 19.3 Chuyển sang TL10 và TL11 — Chiến dịch và liên kết

TL10 và TL11 sẽ chi tiết hóa:
- trường dữ liệu,
- ràng buộc nhập liệu,
- trạng thái chi tiết,
- quy tắc tính tiền,
- quy tắc đối soát,
- báo cáo chi tiết theo đối tượng.

## 19.4 Chuyển sang TL12 — Chống gian lận và định nghĩa lượt hợp lệ

TL12 sẽ chi tiết hóa:
- bộ điều kiện hợp lệ,
- lý do loại,
- điểm rủi ro,
- hàng chờ kiểm tra,
- quy trình duyệt lại,
- tác động tới doanh thu và chi tiêu.

## 19.5 Chuyển sang TL13 và TL15 — Dữ liệu và giao diện lập trình

TL13 và TL15 sẽ ánh xạ từ nghiệp vụ sang:
- mô hình dữ liệu,
- trạng thái và tham chiếu,
- giao diện lập trình,
- mã lỗi,
- quyền truy cập.

---

## 20. Danh sách điểm cần giữ nhất quán trong các tài liệu sau

Để tránh sai sót dây chuyền, các tài liệu từ TL03 trở đi phải dùng đúng các mục đã khóa trong TL02:

1. **Tên tác nhân**
   - khách hàng mua chiến dịch
   - nhà xuất bản
   - quản trị viên
   - nhân viên hỗ trợ (nếu dùng)

2. **Thuật ngữ tài chính**
   - số dư khả dụng
   - số dư khóa tạm
   - sổ cái giao dịch
   - duyệt thủ công
   - đối soát

3. **Thuật ngữ lượt**
   - lượt hợp lệ
   - lượt bị loại
   - điểm rủi ro

4. **Trạng thái nghiệp vụ tổng thể**
   - không tự ý đổi tên trạng thái đã khóa ở mục 13 nếu chưa cập nhật TL02 trước

5. **Ràng buộc an toàn**
   - không mô tả, thiết kế hoặc hướng dẫn các chức năng vi phạm phạm vi loại trừ

---

## 21. Tự rà soát nội bộ tài liệu TL02

### 21.1 Kiểm tra tính bao phủ
- Đã bao phủ đủ bốn khối chức năng chính.
- Đã bao phủ tài khoản, tài chính, liên kết, chiến dịch, quản trị, chuyển hướng.

### 21.2 Kiểm tra tính nhất quán với TL01
- Khớp mô hình hai phía và khối quản trị.
- Khớp phạm vi nạp rút thủ công.
- Khớp yêu cầu song ngữ Việt và Anh.
- Khớp nguyên tắc không sao chép nguyên bản và không đi vào vùng bị loại trừ.

### 21.3 Kiểm tra mức độ chi tiết
- Đủ chi tiết để làm nền cho phân quyền, dữ liệu, quy trình tài chính, chiến dịch, liên kết.
- Chưa đi quá sâu vào chi tiết màn hình và giao diện lập trình, đúng phạm vi TL02.

---

## 22. Kết luận

TL02 đã chốt bức tranh nghiệp vụ tổng thể cho nền tảng hai phía với các thành phần:

- nhà xuất bản,
- khách hàng mua chiến dịch,
- quản trị viên,
- khối chuyển hướng trung gian.

Tài liệu này là nền bắt buộc trước khi đi tiếp sang:
- phân quyền,
- quy trình tài chính thủ công,
- quy trình liên kết và chiến dịch,
- chống gian lận,
- mô hình dữ liệu,
- giao diện lập trình.

Ở vòng tiếp theo, tài liệu nên làm là **TL03 — Ma trận vai trò và phân quyền**, vì tài liệu này sẽ khóa quyền thao tác trước khi đi vào chi tiết màn hình và giao diện lập trình.


