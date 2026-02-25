# Tài liệu 11 — Đặc tả quy trình rút gọn liên kết và tính doanh thu nhà xuất bản

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL11
- **Tên tài liệu:** Đặc tả quy trình rút gọn liên kết và tính doanh thu nhà xuất bản
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10
- **Tài liệu đầu ra phụ thuộc:** TL05, TL06, TL07, TL12, TL13, TL15, TL16, TL17, TL18, TL19, TL21, TL24

---

## 2. Mục tiêu tài liệu

TL11 đặc tả đầy đủ quy trình nghiệp vụ cho khối **nhà xuất bản** và khối **chuyển hướng trung gian** liên quan đến:

- tạo và quản lý liên kết rút gọn,
- xử lý truy cập mã ngắn,
- ghi nhận sự kiện truy cập,
- phân loại lượt hợp lệ hoặc bị loại,
- tính doanh thu theo lượt hợp lệ,
- đối soát doanh thu nhà xuất bản.

Mục tiêu của TL11 là:

1. Khóa chặt vòng đời **liên kết rút gọn** và quy tắc chuyển trạng thái.
2. Thống nhất định nghĩa giữa các khái niệm: **lượt truy cập**, **sự kiện lượt**, **lượt hợp lệ tạm thời**, **lượt hợp lệ đã chốt**, **doanh thu tạm thời**, **doanh thu đã chốt**.
3. Bảo đảm nhất quán với:
   - TL02 về mã chức năng và trạng thái chuẩn,
   - TL03 về vai trò và phân quyền,
   - TL08 và TL09 về nguyên tắc ví, sổ cái, khóa tạm số dư,
   - TL10 về tư duy phân biệt số liệu tạm thời và số liệu đã chốt.
4. Tạo đầu vào rõ ràng cho:
   - TL12 về chống gian lận và định nghĩa lượt hợp lệ,
   - TL13 về mô hình dữ liệu chi tiết,
   - TL15 về giao diện lập trình phiên bản đầu,
   - TL16 về ghi nhận sự kiện và tổng hợp thống kê.

---

## 3. Phạm vi của TL11

### 3.1 Trong phạm vi

- Quy trình tạo liên kết rút gọn cho nhà xuất bản.
- Cập nhật liên kết rút gọn theo điều kiện cho phép.
- Tạm khóa hoặc mở khóa liên kết theo vai trò và trạng thái.
- Xử lý truy cập mã ngắn qua cổng chuyển hướng trung gian.
- Ghi nhận sự kiện truy cập liên kết.
- Phân loại lượt hợp lệ hoặc bị loại ở mức nghiệp vụ.
- Tính doanh thu nhà xuất bản theo lượt hợp lệ.
- Đối soát doanh thu nhà xuất bản theo kỳ.
- Nhật ký, thông báo, báo cáo và truy vết nghiệp vụ.
- Ràng buộc dữ liệu và đầu vào cho tài liệu giao diện lập trình, mô hình dữ liệu.

### 3.2 Ngoài phạm vi

- Quy trình rút tiền thủ công (đã đặc tả trong TL09).
- Quy trình nạp tiền thủ công (đã đặc tả trong TL08).
- Quy trình chiến dịch khách hàng mua tính theo lượt (đã đặc tả trong TL10).
- Đặc tả sâu thuật toán chấm điểm rủi ro và chống gian lận (sẽ đặc tả trong TL12).
- Thiết kế giao diện màn hình chi tiết (sẽ đặc tả trong TL05, TL06, TL07).
- Đặc tả chi tiết cấu trúc bảng dữ liệu cấp cột và chỉ mục (sẽ đặc tả trong TL13).

---

## 4. Truy vết sang tài liệu trước để đảm bảo nhất quán

## 4.1 Truy vết chức năng nghiệp vụ từ TL02

TL11 chi tiết hóa các chức năng nghiệp vụ sau trong TL02:

- **NV16** — Tạo liên kết rút gọn
- **NV17** — Cập nhật liên kết rút gọn
- **NV18** — Tạm khóa hoặc mở khóa liên kết
- **NV19** — Xem danh sách liên kết và thống kê
- **NV20** — Ghi nhận sự kiện truy cập liên kết
- **NV21** — Phân loại lượt hợp lệ hoặc bị loại
- **NV22** — Tính doanh thu cho nhà xuất bản theo lượt hợp lệ
- **NV23** — Đối soát doanh thu nhà xuất bản
- **NV41** — Xử lý truy cập liên kết ngắn
- **NV42** — Xác minh truy cập hợp lệ chống máy tự động
- **NV43** — Chuyển hướng đến liên kết đích hoặc dự phòng
- **NV44** — Hiển thị lỗi liên kết hoặc trạng thái không khả dụng
- **NV45** — Nhận báo lỗi từ người dùng cuối

## 4.2 Truy vết vai trò và phân quyền từ TL03

TL11 sử dụng các vai trò sau theo TL03:

- **R01** — Khách truy cập liên kết ngắn
- **R20** — Nhà xuất bản
- **R30** — Quản trị viên
- **R40** — Nhân viên hỗ trợ

Nguyên tắc áp dụng từ TL03:

- R20 chỉ thao tác trên liên kết thuộc sở hữu của mình.
- R30 có quyền xử lý toàn hệ thống nhưng bị ràng buộc bởi nhật ký và lý do thao tác.
- R40 chủ yếu tra cứu, tiếp nhận báo lỗi, hỗ trợ; không có quyền quyết định cuối về tài chính hoặc gian lận.
- Dữ liệu nhạy cảm phải được che bớt theo vai trò.

## 4.3 Truy vết nguyên tắc tài chính từ TL08 và TL09

Các nguyên tắc tài chính bắt buộc được kế thừa:

- Không chỉnh tay số dư; mọi thay đổi phải qua **sổ cái giao dịch**.
- Phân biệt số dư khả dụng và số dư khóa tạm.
- Mọi điều chỉnh doanh thu sau đối soát phải có bút toán đối ứng và dấu vết.
- Quy trình rút tiền chỉ sử dụng số dư khả dụng theo TL09.

## 4.4 Truy vết khái niệm lượt từ TL10

TL11 đồng nhất với TL10 ở các nguyên tắc sau:

- Phân biệt số liệu **tạm thời** và **đã chốt**.
- Không tính hoặc cộng trùng khi xử lý sự kiện lặp.
- Xử lý sự kiện đến trễ phải có quy tắc đối soát và điều chỉnh rõ ràng.
- Mọi quyết định thay đổi trạng thái hoặc doanh thu phải truy vết được.

---

## 5. Tác nhân tham gia quy trình

### 5.1 R01 — Khách truy cập liên kết ngắn

- Truy cập mã liên kết rút gọn.
- Xem trang trung gian xác minh hoặc thông báo lỗi.
- Được chuyển hướng tới liên kết đích hoặc liên kết dự phòng nếu đủ điều kiện.
- Có thể gửi báo lỗi liên kết.

### 5.2 R20 — Nhà xuất bản

- Tạo, cập nhật, theo dõi liên kết rút gọn thuộc sở hữu.
- Xem thống kê lượt và doanh thu.
- Theo dõi các lượt bị loại theo nhóm lý do ở mức cho phép.
- Sử dụng doanh thu đã chốt làm nguồn cho quy trình rút tiền theo TL09.

### 5.3 R30 — Quản trị viên

- Duyệt hoặc xử lý liên kết có rủi ro.
- Tạm khóa hoặc mở khóa liên kết toàn hệ thống.
- Theo dõi sự kiện, lượt hợp lệ hoặc bị loại, doanh thu và đối soát.
- Điều chỉnh theo quy trình có nhật ký và lý do.

### 5.4 R40 — Nhân viên hỗ trợ

- Tra cứu trạng thái liên kết và sự kiện ở mức hỗ trợ.
- Tiếp nhận báo lỗi từ người dùng cuối.
- Chuyển tiếp vụ việc cho R30 khi vượt quyền.

### 5.5 Dịch vụ nền hệ thống

- Dịch vụ rút gọn liên kết và sinh mã ngắn.
- Dịch vụ xử lý truy cập và chuyển hướng trung gian.
- Dịch vụ ghi nhận sự kiện.
- Dịch vụ phân loại lượt và đánh giá rủi ro.
- Dịch vụ tính doanh thu.
- Dịch vụ đối soát theo kỳ.
- Dịch vụ thông báo và nhật ký.

---

## 6. Thuật ngữ và định nghĩa dùng trong TL11

- **Liên kết rút gọn:** bản ghi ánh xạ từ mã ngắn sang liên kết gốc, có thể có liên kết dự phòng và trạng thái riêng.
- **Mã ngắn:** chuỗi dùng trong đường dẫn ngắn để tra cứu liên kết đích.
- **Bí danh:** mã ngắn do R20 tự nhập, phải duy nhất nếu được chấp nhận.
- **Liên kết gốc:** liên kết đích chính mà người dùng sẽ được chuyển hướng đến khi liên kết hoạt động bình thường.
- **Liên kết dự phòng:** liên kết thay thế khi liên kết gốc lỗi hoặc không khả dụng theo quy tắc hệ thống.
- **Sự kiện truy cập liên kết:** bản ghi sự kiện được tạo khi có yêu cầu truy cập mã ngắn đi qua cổng chuyển hướng.
- **Lượt:** đơn vị nghiệp vụ được dùng cho thống kê và tính doanh thu sau khi sự kiện được phân loại.
- **Lượt hợp lệ tạm thời:** lượt đạt điều kiện ban đầu, có thể còn bị điều chỉnh trong đối soát.
- **Lượt bị loại tạm thời:** lượt bị loại theo đánh giá ban đầu nhưng có thể được xét lại nếu có kiểm tra thủ công.
- **Lượt hợp lệ đã chốt:** lượt hợp lệ sau đối soát, được dùng làm cơ sở doanh thu cuối cùng.
- **Lượt bị loại đã chốt:** lượt bị loại sau đối soát, không tạo doanh thu.
- **Doanh thu tạm thời:** doanh thu tính từ lượt hợp lệ tạm thời, chỉ dùng cho theo dõi và dự báo.
- **Doanh thu đã chốt:** doanh thu sau đối soát, đủ điều kiện ghi nhận vào số dư khả dụng.
- **Kỳ đối soát:** khoảng thời gian hệ thống chốt doanh thu, ví dụ theo ngày hoặc theo cấu hình.
- **Nhật ký quyết định:** nhật ký ghi lại các thao tác nhạy cảm như tạm khóa liên kết, mở khóa, điều chỉnh doanh thu.

---

## 7. Tiền điều kiện để liên kết và quy trình doanh thu có thể vận hành

## 7.1 Tiền điều kiện cấp tài khoản và hồ sơ

- R20 có tài khoản ở trạng thái hoạt động.
- R20 đã hoàn tất thông tin hồ sơ tối thiểu.
- Nếu hệ thống yêu cầu, R20 đã cấu hình phương thức nhận tiền trước khi được rút tiền theo TL09.

## 7.2 Tiền điều kiện cấp hệ thống

- Cổng chuyển hướng trung gian hoạt động.
- Dịch vụ ghi nhận sự kiện sẵn sàng.
- Cấu hình giá theo lượt cho nhà xuất bản đang có hiệu lực.
- Dịch vụ đồng bộ quốc gia, thiết bị, trình duyệt hoặc bộ phân loại tương đương sẵn sàng.
- Cấu hình danh mục liên kết bị cấm đang có hiệu lực.

## 7.3 Tiền điều kiện cấp liên kết

- Liên kết rút gọn tồn tại và ở trạng thái cho phép xử lý truy cập.
- Liên kết gốc hợp lệ theo quy tắc hệ thống.
- Nếu có liên kết dự phòng, liên kết dự phòng cũng hợp lệ và không trùng liên kết gốc theo chính sách.
- Liên kết không bị đánh dấu vi phạm hoặc bị khóa hành chính.

---

## 8. Dữ liệu đầu vào và đầu ra nghiệp vụ của liên kết rút gọn

## 8.1 Đầu vào tối thiểu khi tạo liên kết rút gọn

Bắt buộc:

- mã người dùng R20
- liên kết gốc
- tùy chọn sinh mã tự động hoặc dùng bí danh
- ngôn ngữ giao diện của người dùng

Tùy chọn:

- bí danh
- liên kết dự phòng
- mô tả ghi nhớ nội bộ
- nhãn phân loại nội bộ

## 8.2 Đầu ra sau khi tạo liên kết

- mã liên kết nội bộ
- mã ngắn
- đường dẫn rút gọn đầy đủ
- trạng thái liên kết ban đầu
- thời điểm tạo
- cảnh báo nghiệp vụ nếu có

## 8.3 Đầu vào khi cập nhật liên kết

- mã liên kết
- trường cần sửa
- giá trị mới
- lý do sửa nếu hệ thống yêu cầu
- thông tin người thao tác

Các trường có thể cho phép cập nhật tùy trạng thái:

- liên kết gốc
- liên kết dự phòng
- mô tả nội bộ
- nhãn nội bộ
- trạng thái bật hoặc tắt theo quyền

## 8.4 Đầu ra khi cập nhật liên kết

- trạng thái thao tác thành công hoặc thất bại
- bản chụp trước và sau của các trường thay đổi
- trạng thái liên kết hiện tại
- cảnh báo nếu thay đổi làm phát sinh duyệt lại

## 8.5 Đầu vào khi xử lý truy cập mã ngắn

- mã ngắn
- thời điểm truy cập
- thông tin yêu cầu kỹ thuật tối thiểu phục vụ phân loại và chống lạm dụng
- thông tin xác minh người dùng thật nếu cấu hình đang bật

## 8.6 Đầu ra khi xử lý truy cập mã ngắn

Một trong các kết quả sau:

- cho phép chuyển hướng đến liên kết gốc
- cho phép chuyển hướng đến liên kết dự phòng
- hiển thị trang xác minh hoặc trang trung gian
- hiển thị trang lỗi liên kết
- hiển thị trang liên kết không khả dụng

Đồng thời hệ thống phải ghi:

- sự kiện truy cập
- trạng thái phân loại tạm thời hoặc hàng đợi đánh giá
- nhật ký kỹ thuật tối thiểu

## 8.7 Đầu vào khi báo lỗi liên kết bởi R01

- mã ngắn hoặc thông tin liên kết
- loại lỗi người dùng chọn
- mô tả bổ sung
- thông tin liên hệ tùy chọn
- dấu vết phiên truy cập tối thiểu

## 8.8 Đầu ra khi tiếp nhận báo lỗi

- mã báo lỗi
- trạng thái tiếp nhận
- thông báo cho người gửi nếu giao diện hỗ trợ
- bản ghi trong hàng chờ hỗ trợ cho R40 hoặc R30

---

## 9. Trạng thái liên kết rút gọn và quy tắc chuyển trạng thái

## 9.1 Danh sách trạng thái chuẩn hóa của liên kết rút gọn

Theo TL02, TL11 chỉ sử dụng đúng các trạng thái sau:

- **hoạt động**
- **tạm khóa**
- **chờ duyệt**
- **hết hạn**
- **lỗi**

> Không tự ý tạo thêm trạng thái mới trong mã nguồn nếu chưa cập nhật TL02 và TL14.

## 9.2 Trạng thái khởi tạo mặc định

Quy tắc khởi tạo đề xuất phiên bản đầu:

- Liên kết mới tạo bởi R20 vào trạng thái:
  - **hoạt động** nếu thỏa toàn bộ kiểm tra tự động và không rơi vào diện cần duyệt.
  - **chờ duyệt** nếu rơi vào danh mục cần kiểm tra thủ công hoặc có cảnh báo rủi ro.
  - **lỗi** nếu dữ liệu tạo liên kết không hợp lệ và không thể hoàn tất bản ghi.

## 9.3 Bảng quy tắc chuyển trạng thái liên kết

| Trạng thái hiện tại | Sự kiện hoặc hành động | Vai trò được phép | Trạng thái tiếp theo | Ghi chú |
|---|---|---|---|---|
| chờ duyệt | quản trị viên duyệt | R30 | hoạt động | Phải có nhật ký quyết định |
| chờ duyệt | quản trị viên từ chối hoặc khóa | R30 | tạm khóa | Ghi rõ lý do |
| hoạt động | tạm khóa liên kết | R20 hoặc R30 theo quyền | tạm khóa | R20 chỉ khóa liên kết của mình |
| tạm khóa | mở khóa liên kết | R20 hoặc R30 theo quyền | hoạt động hoặc chờ duyệt | Có thể quay về chờ duyệt nếu hệ thống yêu cầu duyệt lại |
| hoạt động | hết hạn theo chính sách | Dịch vụ nền | hết hạn | Theo thời gian hoặc quy tắc cấu hình |
| tạm khóa | hết hạn theo chính sách | Dịch vụ nền | hết hạn | Không tự mở lại nếu đã hết hạn |
| hoạt động | lỗi kỹ thuật kéo dài | Dịch vụ nền hoặc R30 | lỗi | Dùng khi không thể xử lý an toàn |
| lỗi | sửa cấu hình và duyệt lại | R20, R30 | chờ duyệt hoặc hoạt động | Tùy mức độ lỗi |
| bất kỳ | khóa hành chính do vi phạm | R30 | tạm khóa | Luôn ghi lý do và nhật ký |

## 9.4 Quy tắc chung khi chuyển trạng thái

- Mọi chuyển trạng thái phải đi theo bảng quy tắc; không được nhảy trạng thái trực tiếp ngoài luồng.
- Với thao tác của R30, bắt buộc lưu:
  - người thao tác,
  - thời điểm,
  - trạng thái trước,
  - trạng thái sau,
  - lý do.
- Với thao tác của R20 trên liên kết của mình, hệ thống vẫn phải lưu nhật ký nhưng không bắt buộc ghi lý do với thao tác thông thường.
- Trạng thái **hết hạn** và **lỗi** không được dùng để che giấu xử lý vi phạm; nếu là vi phạm phải ghi rõ cờ vi phạm và quyết định riêng trong nhật ký.

---

## 10. Quy trình nghiệp vụ chi tiết

## 10.1 Quy trình tạo liên kết rút gọn (NV16)

### Mục tiêu

Cho phép R20 tạo liên kết rút gọn hợp lệ và nhận mã ngắn để sử dụng.

### Luồng chính

1. R20 mở màn hình tạo liên kết.
2. Nhập liên kết gốc và các thông tin tùy chọn.
3. Hệ thống kiểm tra định dạng liên kết.
4. Nếu có bí danh:
   - kiểm tra trùng,
   - kiểm tra ký tự hợp lệ,
   - kiểm tra độ dài.
5. Nếu có liên kết dự phòng:
   - kiểm tra định dạng,
   - kiểm tra không trùng liên kết gốc theo chính sách.
6. Hệ thống kiểm tra danh mục bị cấm và rủi ro cơ bản.
7. Hệ thống sinh mã ngắn hoặc chấp nhận bí danh.
8. Hệ thống tạo bản ghi liên kết với trạng thái phù hợp.
9. Hệ thống trả về đường dẫn rút gọn và thông tin trạng thái.
10. Ghi nhật ký tạo liên kết.

### Kết quả đầu ra

- Thành công và có mã ngắn.
- Hoặc thất bại kèm lý do rõ ràng, không tạo bản ghi lỗi mồ côi.

### Quy tắc bắt buộc

- Không được tạo hai liên kết có cùng mã ngắn tại cùng một miền rút gọn đang hoạt động.
- Nếu xảy ra xung đột mã ngắn do đồng thời nhiều yêu cầu, hệ thống phải thử lại theo cơ chế an toàn hoặc trả lỗi phù hợp.
- Không lưu liên kết gốc vi phạm danh mục cấm.

## 10.2 Quy trình cập nhật liên kết rút gọn (NV17)

### Mục tiêu

Cho phép R20 chỉnh sửa liên kết thuộc sở hữu trong phạm vi cho phép, đồng thời giữ dấu vết thay đổi.

### Luồng chính

1. R20 chọn liên kết cần cập nhật.
2. Hệ thống kiểm tra quyền sở hữu và trạng thái hiện tại.
3. R20 cập nhật các trường cho phép.
4. Hệ thống kiểm tra hợp lệ các trường thay đổi.
5. Nếu thay đổi chạm ngưỡng rủi ro hoặc chính sách:
   - chuyển về **chờ duyệt**.
6. Hệ thống lưu thay đổi.
7. Ghi nhật ký trước và sau thay đổi.
8. Trả kết quả cho R20.

### Trường hợp không cho phép

- Liên kết đã **hết hạn** nhưng chính sách không cho sửa.
- Liên kết đang bị khóa hành chính mà R20 không có quyền mở.
- Trường thuộc diện chỉ R30 mới được sửa.

## 10.3 Quy trình tạm khóa hoặc mở khóa liên kết (NV18)

### Mục tiêu

Cho phép khóa hoặc mở lại liên kết theo đúng phân quyền và trạng thái.

### Luồng chính cho R20

1. R20 chọn liên kết của mình.
2. Hệ thống kiểm tra quyền và trạng thái.
3. Nếu đang **hoạt động**, cho phép chuyển sang **tạm khóa**.
4. Nếu đang **tạm khóa**, cho phép mở lại theo chính sách:
   - về **hoạt động** hoặc
   - về **chờ duyệt**.
5. Ghi nhật ký thao tác.
6. Cập nhật thông báo liên quan nếu có.

### Luồng chính cho R30

- Tương tự R20 nhưng có thể thao tác trên mọi liên kết.
- Bắt buộc nhập lý do với thao tác khóa hoặc mở khóa mang tính quản trị.

## 10.4 Quy trình xem danh sách liên kết và thống kê (NV19)

### Mục tiêu

Cho phép R20, R30, R40 tra cứu liên kết và xem số liệu phù hợp với quyền.

### Luồng chính

1. Người dùng mở danh sách liên kết.
2. Hệ thống áp dụng bộ lọc:
   - trạng thái,
   - thời gian tạo,
   - tìm theo mã ngắn hoặc bí danh,
   - người sở hữu (với R30, R40).
3. Hệ thống trả danh sách phân trang.
4. Khi mở chi tiết:
   - hiển thị thông tin liên kết,
   - số liệu lượt,
   - số liệu doanh thu,
   - nhóm lý do lượt bị loại ở mức cho phép.

### Ràng buộc hiển thị

- R20 chỉ thấy liên kết và số liệu của mình.
- R40 không thấy đầy đủ dữ liệu nhạy cảm nếu không cần cho hỗ trợ.
- R30 thấy toàn hệ thống và có bộ lọc nâng cao.

## 10.5 Quy trình xử lý truy cập liên kết ngắn và chuyển hướng (NV41, NV42, NV43, NV44)

### Mục tiêu

Xử lý an toàn truy cập mã ngắn, ghi nhận sự kiện và trả về kết quả chuyển hướng hoặc lỗi phù hợp.

### Luồng chính tổng quát

1. R01 truy cập đường dẫn có mã ngắn.
2. Hệ thống tra cứu liên kết theo mã ngắn.
3. Nếu không tìm thấy:
   - hiển thị trang lỗi liên kết.
4. Nếu tìm thấy nhưng trạng thái không cho phép:
   - hiển thị trang không khả dụng hoặc lỗi theo quy tắc.
5. Nếu trạng thái cho phép:
   - thực hiện lớp xác minh chống máy tự động nếu cấu hình bật,
   - ghi nhận sự kiện truy cập,
   - đánh giá tạm thời hoặc đưa vào hàng đợi đánh giá,
   - quyết định chuyển hướng.
6. Hệ thống chuyển hướng đến:
   - liên kết gốc nếu khả dụng,
   - hoặc liên kết dự phòng nếu liên kết gốc lỗi và có dự phòng.
7. Ghi nhật ký kỹ thuật và nghiệp vụ tối thiểu.

### Quy tắc bắt buộc

- Dù chuyển hướng thất bại hay thành công, nếu đã qua các bước xử lý chính thì phải có bản ghi sự kiện tối thiểu để phục vụ chẩn đoán.
- Không được bỏ qua bước ghi sự kiện chỉ vì truy cập xảy ra rất nhanh.
- Nếu cổng xác minh lỗi, hệ thống phải có chế độ thoái lui an toàn theo cấu hình:
  - tạm hiển thị trang lỗi xác minh, hoặc
  - đưa vào hàng đợi cần kiểm tra thủ công.

## 10.6 Quy trình nhận báo lỗi từ người dùng cuối (NV45)

### Mục tiêu

Cho phép R01 báo lỗi liên kết để hỗ trợ vận hành và cải thiện chất lượng.

### Luồng chính

1. R01 mở chức năng báo lỗi từ trang liên kết hoặc trang lỗi.
2. Chọn loại lỗi và nhập mô tả.
3. Hệ thống ghi nhận báo lỗi, gắn với mã liên kết hoặc phiên truy cập.
4. Hệ thống tạo bản ghi hỗ trợ cho R40.
5. R40 tra cứu và xử lý ở mức hỗ trợ; chuyển R30 nếu cần.
6. Kết quả xử lý được lưu nhật ký.

### Loại lỗi gợi ý

- liên kết không mở được
- chuyển sai trang
- trang đích lỗi
- nghi ngờ liên kết nguy hiểm
- lỗi xác minh truy cập
- lỗi khác

---

## 11. Ghi nhận sự kiện truy cập và phân loại lượt (NV20, NV21)

## 11.1 Nguyên tắc ghi nhận sự kiện

- Mỗi truy cập đi qua cổng chuyển hướng tạo tối thiểu **một sự kiện truy cập**.
- Sự kiện phải có mã duy nhất để chống xử lý trùng.
- Nếu cùng một truy cập trải qua nhiều bước, có thể có nhật ký kỹ thuật bổ sung, nhưng **sự kiện nghiệp vụ chính** chỉ nên có một bản ghi gốc.
- Mọi cập nhật trạng thái phân loại phải lưu lịch sử hoặc nhật ký thay đổi.

## 11.2 Trạng thái sự kiện lượt sử dụng trong TL11

Theo TL02, trạng thái sự kiện lượt gồm:

- mới ghi nhận
- đang đánh giá
- hợp lệ tạm thời
- bị loại tạm thời
- hợp lệ đã chốt
- bị loại đã chốt
- cần kiểm tra thủ công

## 11.3 Luồng phân loại lượt ở mức nghiệp vụ

1. Sự kiện được tạo ở trạng thái **mới ghi nhận**.
2. Hệ thống chuyển sang **đang đánh giá**.
3. Dựa trên quy tắc nghiệp vụ và rủi ro:
   - chuyển **hợp lệ tạm thời**, hoặc
   - chuyển **bị loại tạm thời**, hoặc
   - chuyển **cần kiểm tra thủ công**.
4. Trong kỳ đối soát, hệ thống hoặc R30 chốt:
   - **hợp lệ đã chốt**, hoặc
   - **bị loại đã chốt**.
5. Việc chốt phải liên kết với bản ghi đối soát.

## 11.4 Quy tắc chống đếm trùng ở mức nghiệp vụ

TL11 quy định nguyên tắc nghiệp vụ; chi tiết kỹ thuật sẽ đặc tả trong TL12 và TL16.

Nguyên tắc bắt buộc:

- Một sự kiện đã được chốt không được tạo doanh thu lần hai.
- Nếu phát hiện trùng sau khi ghi nhận tạm thời:
  - chuyển sự kiện về nhánh bị loại theo quy trình,
  - tạo điều chỉnh doanh thu nếu trước đó đã tính tạm.
- Hệ thống phải có khóa nhận diện nghiệp vụ để phục vụ đối chiếu trùng lặp.

## 11.5 Lý do loại lượt tối thiểu cần chuẩn hóa

TL14 sẽ chốt mã lỗi chuẩn. TL11 khóa trước nhóm lý do tối thiểu:

- không vượt qua xác minh truy cập
- vượt giới hạn tần suất
- truy cập trùng bất thường
- trạng thái liên kết không hợp lệ
- dữ liệu sự kiện thiếu trường bắt buộc
- rủi ro cao cần loại
- hết hiệu lực theo đối soát
- lỗi kỹ thuật không đủ điều kiện ghi nhận

## 11.6 Tương tác với chống gian lận

- TL11 chỉ quy định **điểm giao nhau nghiệp vụ**.
- TL12 sẽ đặc tả:
  - chấm điểm rủi ro,
  - quy tắc giới hạn tần suất,
  - danh sách chặn,
  - tiêu chí chuyển vào kiểm tra thủ công,
  - cơ chế duyệt lại.

---

## 12. Quy tắc tính doanh thu nhà xuất bản theo lượt hợp lệ (NV22)

## 12.1 Nguyên tắc chung

- Doanh thu chỉ được tính từ **lượt hợp lệ**.
- Phân biệt:
  - **doanh thu tạm thời** dùng cho theo dõi,
  - **doanh thu đã chốt** dùng cho ghi nhận tài chính cuối cùng.
- Không được cộng trực tiếp vào số dư khả dụng từ lượt chưa chốt trong phiên bản đầu, trừ khi có tài liệu chính sách riêng được ban hành sau.

## 12.2 Công thức nghiệp vụ mức tổng quát

Doanh thu của một lượt hợp lệ = **đơn giá hiệu lực** x **hệ số điều chỉnh** theo chính sách (nếu có)

Trong đó:

- **đơn giá hiệu lực** lấy từ cấu hình giá theo lượt đang áp dụng tại thời điểm sự kiện hoặc theo quy tắc chốt kỳ.
- **hệ số điều chỉnh** là phần mở rộng tùy chính sách, ví dụ theo khu vực, chất lượng lượt, loại liên kết. Nếu chưa dùng thì mặc định bằng 1.

> TL11 chỉ khóa khái niệm và quy tắc chọn phiên bản cấu hình. Chi tiết bảng giá, khóa tra cứu, ưu tiên cấu hình sẽ đặc tả trong TL17 và TL13.

## 12.3 Quy tắc chọn đơn giá hiệu lực

Phiên bản đầu đề xuất:

1. Ưu tiên cấu hình giá đặc thù nếu có và còn hiệu lực.
2. Nếu không có, dùng cấu hình giá mặc định theo hệ thống.
3. Nếu không tìm thấy giá hợp lệ:
   - không tạo doanh thu,
   - đưa sự kiện vào diện cần kiểm tra thủ công hoặc lỗi cấu hình theo quy tắc.

## 12.4 Quy trình ghi doanh thu tạm thời

1. Khi sự kiện chuyển sang **hợp lệ tạm thời**, hệ thống tính doanh thu tạm thời.
2. Tạo bản ghi doanh thu tạm thời gắn với:
   - sự kiện,
   - liên kết,
   - nhà xuất bản,
   - phiên bản giá.
3. Cập nhật số liệu thống kê tạm thời.
4. Không tạo bút toán cộng ví khả dụng ở bước này trong phiên bản đầu.

## 12.5 Quy trình ghi doanh thu đã chốt

1. Trong kỳ đối soát, sự kiện được chốt thành **hợp lệ đã chốt**.
2. Hệ thống xác nhận hoặc điều chỉnh bản ghi doanh thu.
3. Tổng doanh thu đã chốt theo kỳ được kết chuyển sang **ví nhà xuất bản** bằng bút toán sổ cái.
4. Bút toán phải tham chiếu:
   - kỳ đối soát,
   - nhà xuất bản,
   - tập sự kiện chốt hoặc mã lô đối soát.

## 12.6 Quy tắc điều chỉnh doanh thu

Nếu phát hiện sai lệch sau khi đã có doanh thu tạm thời hoặc đã chốt:

- Điều chỉnh phải tạo bản ghi điều chỉnh riêng.
- Không sửa trực tiếp số tiền của bản ghi đã chốt mà không lưu lịch sử.
- Nếu đã kết chuyển vào ví:
  - tạo bút toán điều chỉnh đối ứng theo quy trình tài chính,
  - bảo đảm không phá vỡ lịch sử sổ cái.

## 12.7 Quy tắc minh bạch hiển thị cho R20

R20 phải nhìn thấy tối thiểu:

- lượt hợp lệ tạm thời
- lượt hợp lệ đã chốt
- lượt bị loại
- doanh thu tạm thời
- doanh thu đã chốt
- phần đang chờ đối soát
- nhóm lý do loại phổ biến

---

## 13. Đối soát doanh thu nhà xuất bản (NV23)

## 13.1 Mục tiêu đối soát

- Chốt số liệu doanh thu từ trạng thái tạm thời sang đã chốt.
- Loại bỏ hoặc điều chỉnh các lượt bị phát hiện rủi ro hoặc trùng lặp muộn.
- Tạo cơ sở tài chính đáng tin cậy cho rút tiền theo TL09.

## 13.2 Kỳ đối soát phiên bản đầu

Đề xuất phiên bản đầu:

- Đối soát theo ngày.
- Có thể cấu hình giờ chốt theo múi giờ hệ thống.
- Sự kiện đến trễ sau giờ chốt xử lý theo quy tắc của kỳ hiện tại hoặc kỳ kế tiếp, nhưng phải nhất quán và có nhật ký.

## 13.3 Luồng đối soát tổng quát

1. Dịch vụ đối soát lấy tập sự kiện trong kỳ.
2. Loại trừ sự kiện chưa đủ dữ liệu hoặc đang cần kiểm tra thủ công.
3. Chốt trạng thái sự kiện:
   - hợp lệ đã chốt hoặc
   - bị loại đã chốt.
4. Tính lại hoặc xác nhận doanh thu theo cấu hình giá.
5. Lập lô đối soát cho từng nhà xuất bản.
6. Kết chuyển doanh thu đã chốt vào ví nhà xuất bản bằng bút toán.
7. Ghi nhật ký và tạo báo cáo đối soát.
8. Thông báo cho R20 nếu cấu hình thông báo đang bật.

## 13.4 Xử lý sự kiện cần kiểm tra thủ công

- Sự kiện ở trạng thái **cần kiểm tra thủ công** không được chốt tự động thành doanh thu nếu chưa có quyết định.
- R30 quyết định hướng xử lý:
  - chốt hợp lệ,
  - chốt bị loại,
  - giữ lại chờ thêm thông tin.
- Mọi quyết định phải có lý do và nhật ký.

## 13.5 Xử lý sự kiện đến trễ

- Sự kiện đến trễ nhưng thuộc kỳ đã chốt phải được gắn cờ.
- Hệ thống áp dụng một trong hai chính sách và phải thống nhất:
  1. đưa vào kỳ kế tiếp với cờ đến trễ,
  2. mở bút toán điều chỉnh cho kỳ đã chốt.
- TL11 khóa nguyên tắc: **không sửa lặng im số liệu kỳ đã công bố**.

## 13.6 Đầu ra tối thiểu của một lô đối soát

- mã lô đối soát
- kỳ đối soát
- mã nhà xuất bản
- tổng lượt hợp lệ đã chốt
- tổng lượt bị loại đã chốt
- tổng doanh thu đã chốt
- tổng điều chỉnh tăng hoặc giảm
- mã bút toán kết chuyển
- thời điểm chốt
- người hoặc dịch vụ thực hiện

---

## 14. Ngoại lệ và xử lý lỗi vận hành

## 14.1 Ngoại lệ khi tạo hoặc cập nhật liên kết

### Trùng bí danh

- Hệ thống trả lỗi rõ ràng.
- Không tạo bản ghi mới.
- Gợi ý sinh mã tự động hoặc bí danh khác.

### Liên kết gốc hoặc dự phòng không hợp lệ

- Từ chối lưu.
- Trả thông báo chỉ ra trường lỗi.
- Ghi nhật ký lỗi ở mức hệ thống nếu cần.

### Liên kết thuộc danh mục bị cấm

- Từ chối tạo hoặc cập nhật.
- Ghi cờ vi phạm và nhật ký quản trị nếu cần.
- Có thể chuyển vào hàng chờ kiểm tra tùy chính sách.

## 14.2 Ngoại lệ khi xử lý truy cập mã ngắn

### Không tìm thấy mã ngắn

- Hiển thị trang lỗi liên kết.
- Ghi sự kiện lỗi tối thiểu cho chẩn đoán.
- Không tạo doanh thu.

### Liên kết ở trạng thái không cho phép truy cập

- Hiển thị trang không khả dụng.
- Ghi sự kiện và trạng thái loại phù hợp.
- Không tạo doanh thu.

### Liên kết gốc lỗi nhưng có dự phòng

- Cho phép chuyển hướng tới liên kết dự phòng nếu chính sách cho phép.
- Gắn cờ sự kiện dùng liên kết dự phòng để thống kê.
- Cách tính doanh thu của lượt này phải theo chính sách nhất quán.

### Dịch vụ xác minh người dùng thật bị lỗi

- Kích hoạt chế độ thoái lui an toàn theo cấu hình.
- Không được tự động bỏ qua xác minh nếu chính sách yêu cầu bắt buộc.
- Ghi cảnh báo vận hành.

## 14.3 Ngoại lệ khi ghi nhận sự kiện và tính doanh thu

### Sự kiện bị ghi trùng

- Chỉ một sự kiện được giữ là bản ghi hợp lệ theo khóa nghiệp vụ.
- Sự kiện còn lại chuyển hướng xử lý trùng và không tạo doanh thu.
- Ghi nhật ký chống trùng.

### Thiếu dữ liệu để phân loại

- Chuyển trạng thái **cần kiểm tra thủ công** hoặc **bị loại tạm thời** theo chính sách.
- Không chốt doanh thu tự động.

### Không tìm thấy cấu hình giá

- Không tính doanh thu tự động.
- Gắn cờ lỗi cấu hình.
- Đưa vào hàng chờ kiểm tra thủ công hoặc báo quản trị viên.

## 14.4 Ngoại lệ khi đối soát

### Chạy đối soát lặp cho cùng kỳ

- Phải có cơ chế khóa lô đối soát hoặc đánh dấu phiên chạy.
- Không kết chuyển doanh thu trùng vào ví.
- Nếu chạy lại hợp lệ, phải là chế độ khôi phục có bút toán đảo hoặc điều chỉnh rõ ràng.

### Mất kết nối sau khi tạo một phần bút toán

- Hệ thống phải có cơ chế an toàn để tránh kết chuyển nửa chừng.
- Khi khôi phục, phải dựa vào dấu vết giao dịch để tiếp tục hoặc đảo trạng thái đúng cách.

---

## 15. Nhật ký, thông báo và truy vết bắt buộc

## 15.1 Nhật ký cho R20

Phải ghi tối thiểu:

- tạo liên kết
- cập nhật liên kết
- tạm khóa hoặc mở khóa liên kết
- xem chi tiết liên kết nếu có thao tác nhạy cảm
- yêu cầu hỗ trợ liên quan liên kết

## 15.2 Nhật ký cho R30

Phải ghi đầy đủ và bắt buộc có lý do với các thao tác:

- duyệt liên kết từ chờ duyệt sang hoạt động
- tạm khóa liên kết vì vi phạm hoặc rủi ro
- mở khóa liên kết
- quyết định chốt thủ công sự kiện cần kiểm tra
- điều chỉnh doanh thu hoặc đối soát

## 15.3 Nhật ký hệ thống

- truy cập mã ngắn
- kết quả chuyển hướng
- trạng thái xác minh
- tạo và cập nhật sự kiện truy cập
- thay đổi trạng thái sự kiện lượt
- tính doanh thu tạm thời
- lập lô đối soát
- kết chuyển doanh thu vào ví

## 15.4 Thông báo cho R20

Thông báo tối thiểu nên có:

- liên kết được tạo thành công
- liên kết chuyển sang chờ duyệt
- liên kết bị tạm khóa
- liên kết được mở lại
- đối soát kỳ hoàn tất
- doanh thu đã chốt được kết chuyển
- phát hiện bất thường cần R20 kiểm tra

## 15.5 Truy vết nghiệp vụ bắt buộc

Từ một con số doanh thu hiển thị cho R20, phải truy ngược được tới:

- lô đối soát
- tập sự kiện đã chốt
- liên kết rút gọn
- phiên bản giá áp dụng
- bút toán kết chuyển vào ví

---

## 16. Báo cáo và số liệu đầu ra từ quy trình liên kết và doanh thu

## 16.1 Số liệu tối thiểu cho R20

- tổng số liên kết
- số liên kết theo trạng thái
- tổng lượt
- lượt hợp lệ tạm thời
- lượt hợp lệ đã chốt
- lượt bị loại
- doanh thu tạm thời
- doanh thu đã chốt
- doanh thu chờ đối soát
- doanh thu theo ngày
- top liên kết theo lượt
- top liên kết theo doanh thu

## 16.2 Số liệu tối thiểu cho R30

- tổng lượt toàn hệ thống
- tỷ lệ lượt hợp lệ hoặc bị loại
- phân bố lý do loại
- số liên kết chờ duyệt
- số liên kết bị khóa
- lô đối soát theo ngày
- tổng doanh thu đã chốt theo ngày
- tổng điều chỉnh tăng hoặc giảm
- cảnh báo lỗi cấu hình giá
- cảnh báo sự kiện đến trễ

## 16.3 Số liệu tối thiểu cho R40

- trạng thái liên kết
- số lượt gần đây ở mức hỗ trợ
- nhóm lỗi người dùng báo
- tình trạng xử lý báo lỗi
- ghi chú hỗ trợ

## 16.4 Ràng buộc hiển thị số liệu

- Phân biệt rõ số liệu tạm thời và số liệu đã chốt.
- Hiển thị thời điểm cập nhật gần nhất.
- Khi số liệu đang chờ đối soát, phải có nhãn rõ ràng tránh hiểu nhầm là số dư rút được.
- Số liệu doanh thu trong bảng điều khiển không được thay thế sổ cái tài chính.

---

## 17. Quan hệ với quy trình tài chính và rút tiền

## 17.1 Nguyên tắc kết nối với TL09

- TL11 tạo ra **doanh thu đã chốt** và bút toán kết chuyển vào ví nhà xuất bản.
- TL09 sử dụng **số dư khả dụng** của ví làm đầu vào cho quy trình rút tiền.
- TL11 không xử lý trực tiếp chi trả ra ngân hàng hoặc ví USDT.

## 17.2 Ràng buộc khóa tạm số dư khi có yêu cầu rút

- Khi R20 tạo yêu cầu rút theo TL09, phần số dư tương ứng bị khóa tạm.
- Nếu TL11 có điều chỉnh doanh thu phát sinh sau đó, hệ thống phải xử lý theo thứ tự:
  - ưu tiên không làm âm số dư khả dụng,
  - ghi bút toán điều chỉnh và cờ cần kiểm tra nếu ảnh hưởng số dư khóa.
- Quy tắc chi tiết sẽ bám TL09 và TL13.

## 17.3 Nguyên tắc tránh mâu thuẫn số liệu

- Doanh thu bảng điều khiển của TL11 có thể khác số dư khả dụng do:
  - doanh thu chưa chốt,
  - số dư đang khóa tạm để rút,
  - điều chỉnh đối soát,
  - khoản rút đã hoàn thành.
- Giao diện phải hiển thị giải thích ngắn để tránh hiểu nhầm.

---

## 18. Yêu cầu giao diện lập trình và dữ liệu liên quan (đầu vào cho TL13 và TL15)

## 18.1 Nhóm giao diện lập trình cần có trong TL15

### Cho R20

- tạo liên kết rút gọn
- cập nhật liên kết rút gọn
- tạm khóa hoặc mở khóa liên kết của mình
- xem danh sách liên kết
- xem chi tiết liên kết
- xem thống kê liên kết theo ngày
- xem doanh thu theo ngày và theo kỳ đối soát
- xem danh sách báo lỗi liên quan liên kết của mình nếu được phép

### Cho R30

- duyệt liên kết chờ duyệt
- tạm khóa hoặc mở khóa liên kết toàn hệ thống
- tra cứu sự kiện truy cập và trạng thái phân loại
- chốt thủ công sự kiện cần kiểm tra
- chạy hoặc xem kết quả đối soát
- điều chỉnh doanh thu theo quy trình
- xem cảnh báo lỗi cấu hình giá và sự kiện đến trễ

### Cho R40

- tra cứu liên kết ở mức hỗ trợ
- tra cứu báo lỗi từ người dùng cuối
- cập nhật trạng thái xử lý hỗ trợ
- chuyển vụ việc cho R30

### Cho cổng chuyển hướng trung gian

- xử lý truy cập mã ngắn
- xác minh truy cập chống máy tự động
- ghi sự kiện truy cập
- trả kết quả chuyển hướng hoặc trang lỗi
- nhận báo lỗi từ người dùng cuối

## 18.2 Nhóm bảng dữ liệu và nhật ký liên quan trong TL13

TL13 tối thiểu phải đặc tả các nhóm bảng hoặc bản ghi sau:

- liên kết rút gọn
- lịch sử thay đổi liên kết
- sự kiện truy cập liên kết
- lịch sử trạng thái sự kiện lượt
- doanh thu tạm thời nhà xuất bản
- lô đối soát doanh thu
- chi tiết lô đối soát
- bút toán kết chuyển doanh thu vào ví
- báo lỗi từ người dùng cuối
- nhật ký quản trị liên quan liên kết và doanh thu
- cấu hình giá theo lượt cho nhà xuất bản
- cấu hình chính sách liên kết bị cấm hoặc cờ kiểm duyệt

---

## 19. Tiêu chí chấp nhận tài liệu TL11

TL11 được xem là đạt khi thỏa tất cả tiêu chí sau:

1. **Đủ phạm vi nghiệp vụ**
   - Có đầy đủ quy trình tạo, cập nhật, khóa hoặc mở khóa liên kết.
   - Có đầy đủ luồng xử lý truy cập mã ngắn và chuyển hướng.
   - Có quy tắc ghi nhận sự kiện, phân loại lượt, tính doanh thu, đối soát doanh thu.

2. **Đúng và nhất quán với tài liệu trước**
   - Dùng đúng mã chức năng NV16–NV23 và NV41–NV45 của TL02.
   - Dùng đúng vai trò R01, R20, R30, R40 theo TL03.
   - Không mâu thuẫn nguyên tắc sổ cái và số dư của TL08, TL09.
   - Phân biệt rõ số liệu tạm thời và đã chốt đồng nhất với TL10.

3. **Không mơ hồ ở phần tài chính**
   - Chốt rõ thời điểm tạo doanh thu tạm thời.
   - Chốt rõ thời điểm kết chuyển doanh thu đã chốt vào ví.
   - Chốt rõ quy tắc điều chỉnh và chống kết chuyển trùng.

4. **Có khả năng triển khai**
   - Có đầu vào và đầu ra nghiệp vụ đủ để làm màn hình, dữ liệu và giao diện lập trình.
   - Có danh sách ngoại lệ và hướng xử lý vận hành tối thiểu.
   - Có nhật ký và truy vết phục vụ đối soát và kiểm tra sau này.

5. **Có khả năng kiểm thử**
   - Các luồng chính và ngoại lệ đều có thể chuyển hóa thành kịch bản kiểm thử chấp nhận trong TL21.

---

## 20. Tự rà soát nhất quán (vòng hiện tại)

### 20.1 Kiểm tra tên trạng thái

- Trạng thái liên kết dùng đúng TL02: hoạt động, tạm khóa, chờ duyệt, hết hạn, lỗi.
- Trạng thái sự kiện lượt dùng đúng TL02.
- Không thêm trạng thái mới ngoài TL02.

### 20.2 Kiểm tra vai trò

- Chỉ dùng R01, R20, R30, R40 và dịch vụ nền.
- Quyền thao tác bám TL03, đặc biệt với thao tác khóa hoặc mở khóa và điều chỉnh doanh thu.

### 20.3 Kiểm tra nguyên tắc tài chính

- Không chỉnh tay số dư.
- Doanh thu đã chốt mới kết chuyển vào ví.
- Điều chỉnh sau chốt phải qua bút toán đối ứng và nhật ký.

### 20.4 Kiểm tra tính nhất quán khái niệm lượt

- Có phân biệt số liệu tạm thời và đã chốt.
- Có quy tắc chống đếm trùng.
- Có quy tắc xử lý sự kiện đến trễ.

### 20.5 Kiểm tra truy vết tài liệu

- Có truy vết ngược về TL02, TL03, TL08, TL09, TL10.
- Có đầu vào rõ cho TL12, TL13, TL15, TL16.

---

## 21. Đề xuất tài liệu tiếp theo (ưu tiên cao)

### TL12 — Đặc tả chống gian lận và định nghĩa lượt hợp lệ

Lý do ưu tiên:

- TL10 và TL11 đều phụ thuộc trực tiếp vào định nghĩa **lượt hợp lệ**.
- Nếu chưa khóa TL12, các tài liệu TL13, TL15, TL16 dễ bị lệch logic phân loại lượt và chống trùng.
- TL12 sẽ là cầu nối quan trọng để chuẩn hóa:
  - lý do loại lượt,
  - tiêu chí kiểm tra thủ công,
  - chấm điểm rủi ro,
  - giới hạn tần suất,
  - cờ gian lận dùng chung cho cả phía chiến dịch và phía nhà xuất bản.

---

## 22. Kết luận

TL11 đã khóa phần lõi nghiệp vụ phía **nhà xuất bản** và **cổng chuyển hướng trung gian** ở mức đủ chi tiết để:

- triển khai màn hình quản lý liên kết và doanh thu,
- triển khai xử lý truy cập mã ngắn,
- ghi nhận sự kiện và phân loại lượt,
- tính doanh thu và đối soát doanh thu,
- kết nối an toàn với quy trình rút tiền trong TL09.

Tài liệu này giữ nguyên các ràng buộc nhất quán với TL02, TL03, TL08, TL09, TL10 và tạo nền cho các tài liệu kỹ thuật sâu hơn ở các vòng tiếp theo.
