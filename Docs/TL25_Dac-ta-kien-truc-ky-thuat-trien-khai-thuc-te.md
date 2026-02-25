# TL25 — Đặc tả kiến trúc kỹ thuật triển khai thực tế

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL25
- **Tên tài liệu:** Đặc tả kiến trúc kỹ thuật triển khai thực tế
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22, TL23, TL24
- **Tài liệu đầu ra phụ thuộc:** tài liệu khởi tạo dự án kỹ thuật, cấu hình môi trường, hướng dẫn dựng hệ thống, kế hoạch triển khai hạ tầng, mẫu cấu hình giám sát, hướng dẫn cho trợ lý lập trình

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL25 chốt kiến trúc kỹ thuật thực tế cho phiên bản đầu của nền tảng theo hướng hợp lệ đã khóa trong TL01, TL02, làm cơ sở để:

- đội phát triển giao diện, máy chủ, xử lý nền và dữ liệu triển khai đồng nhất
- đội vận hành kỹ thuật triển khai môi trường theo TL22
- đội kiểm thử chuẩn bị môi trường kiểm thử theo TL21 và TL24
- trợ lý lập trình có tài liệu tham chiếu đủ rõ để sinh mã không lệch cấu trúc
- giảm rủi ro thay đổi kiến trúc giữa chừng gây đứt luồng nghiệp vụ, dữ liệu và vận hành

## 2.2 Phạm vi TL25

Trong phạm vi:

- lựa chọn công nghệ khuyến nghị cho phiên bản đầu
- kiến trúc logic và phân rã dịch vụ
- mô hình triển khai theo môi trường
- luồng xử lý đồng bộ và bất đồng bộ
- thiết kế lưu trữ dữ liệu, tệp và nhật ký
- cơ chế bảo mật kỹ thuật ở mức triển khai thực tế
- giám sát, cảnh báo, sao lưu, khôi phục ở tầng kỹ thuật
- chiến lược mở rộng sau phiên bản đầu ở mức kiến trúc

Ngoài phạm vi:

- mã nguồn chi tiết từng màn hình hoặc từng giao diện lập trình
- cấu hình nhà cung cấp hạ tầng cụ thể theo nhà mạng hoặc nhà cung cấp dịch vụ
- dự toán chi phí vận hành chi tiết
- tối ưu hiệu năng chuyên sâu theo tải lớn sau khi có dữ liệu thực tế

## 2.3 Nguyên tắc kiến trúc

- **Ưu tiên tính đúng nghiệp vụ và tính truy vết trước tối ưu sớm.**
- **Tách rõ đường dữ liệu tài chính, dữ liệu sự kiện và dữ liệu hiển thị.**
- **Thiết kế hướng mô-đun để có thể tách dịch vụ dần sau phiên bản đầu.**
- **Mọi thao tác nhạy cảm phải có truy vết, nhật ký kiểm toán và kiểm soát quyền.**
- **Tối thiểu hóa phức tạp triển khai ở phiên bản đầu nhưng không khóa đường mở rộng.**
- **Không phụ thuộc vào một công nghệ khó thay thế nếu chưa thật sự cần thiết.**

---

## 3. Giả định triển khai và quyết định kỹ thuật nền

## 3.1 Giả định kế thừa từ bộ tài liệu trước

- Nền tảng gồm 2 phía chính:
  - **R10**: khách hàng mua chiến dịch theo lượt
  - **R20**: nhà xuất bản tạo liên kết rút gọn và nhận doanh thu
- Có **R01** cổng công khai chuyển hướng liên kết
- Nạp và rút tiền thủ công trong phiên bản đầu theo TL08, TL09
- Tính tiền theo lượt hợp lệ theo TL10, TL11, TL12
- Hỗ trợ song ngữ Việt và Anh theo TL23
- Cần giám sát, vận hành, ứng cứu sự cố rõ ràng theo TL22

## 3.2 Quyết định kiến trúc tổng thể cho phiên bản đầu

TL25 chốt kiến trúc cho phiên bản đầu theo hướng:

- **Một hệ thống máy chủ chính theo mô-đun** cho nghiệp vụ lõi
- **Một dịch vụ cổng công khai tách riêng** để xử lý chuyển hướng và ghi nhận sự kiện
- **Một nhóm tiến trình xử lý nền** để xử lý hàng đợi, tổng hợp số liệu, đối soát
- **Một cơ sở dữ liệu quan hệ chính** cho nghiệp vụ, ví, sổ cái, đối soát
- **Một kho lưu trữ tệp** cho chứng từ nạp, bằng chứng xử lý, tệp hỗ trợ
- **Một hàng đợi thông điệp** cho tác vụ nền và luồng sự kiện
- **Một bộ nhớ đệm** cho phiên đăng nhập, dữ liệu tạm và chống lặp ngắn hạn
- **Một lớp giám sát và nhật ký tập trung**

Cách này đủ đơn giản để triển khai nhanh phiên bản đầu nhưng vẫn cho phép tách dần khi tải tăng.

## 3.3 Lựa chọn công nghệ khuyến nghị cho phiên bản đầu

### Giao diện
- **Khung giao diện:** Next.js
- **Ngôn ngữ:** TypeScript
- **Thư viện giao diện:** bộ thành phần tùy biến theo thiết kế dự án, ưu tiên cấu trúc dễ mở rộng
- **Quản lý biểu mẫu:** thư viện biểu mẫu phổ biến hỗ trợ kiểm tra dữ liệu tốt
- **Quản lý dữ liệu phía giao diện:** thư viện truy vấn dữ liệu có bộ nhớ đệm theo yêu cầu

### Máy chủ nghiệp vụ và giao diện lập trình
- **Khung máy chủ:** NestJS
- **Ngôn ngữ:** TypeScript
- **Giao tiếp:** giao diện lập trình dạng JSON theo TL15
- **Tài liệu kỹ thuật nội bộ:** mô tả giao diện lập trình sinh tự động và bản khóa theo phiên bản

### Dịch vụ cổng công khai chuyển hướng
- **Khung máy chủ:** NestJS hoặc Fastify độc lập
- **Mục tiêu:** phản hồi nhanh, ghi nhận sự kiện gọn, chuyển hướng đúng trạng thái

### Xử lý nền
- **Tiến trình xử lý nền:** nhóm tiến trình Node.js dùng cùng cơ sở mã với máy chủ
- **Hàng đợi tác vụ:** Redis với cơ chế hàng đợi công việc ở phiên bản đầu
- **Tách tiến trình:** mỗi nhóm tác vụ trọng yếu chạy riêng tiến trình

### Cơ sở dữ liệu
- **Cơ sở dữ liệu quan hệ:** PostgreSQL
- **Lý do:** phù hợp giao dịch, ràng buộc dữ liệu, truy vấn tổng hợp, chỉ mục, truy vết

### Bộ nhớ đệm và hàng đợi
- **Redis**
  - dùng cho phiên đăng nhập, khóa ngắn hạn, hàng đợi, chống xử lý trùng ngắn hạn, giới hạn tần suất

### Lưu trữ tệp
- **Kho tệp tương thích giao diện lưu trữ đối tượng**
  - có thể là dịch vụ đám mây hoặc lưu trữ nội bộ tương thích
  - dùng cho chứng từ nạp, bằng chứng rút, tệp hỗ trợ

### Giám sát và nhật ký
- **Chỉ số hệ thống và ứng dụng:** Prometheus
- **Bảng theo dõi:** Grafana
- **Nhật ký tập trung:** Loki hoặc hệ thống nhật ký tập trung tương đương
- **Theo dõi lỗi ứng dụng:** công cụ theo dõi lỗi có cảnh báo theo môi trường

### Triển khai
- **Đóng gói:** Docker
- **Điều phối phiên bản đầu:** Docker Compose hoặc điều phối cụm nhỏ tương đương
- **Tự động hóa phát hành:** quy trình xây dựng và phát hành qua kho mã nguồn

> Ghi chú: TL25 chốt hướng công nghệ khuyến nghị để triển khai nhanh và ổn định phiên bản đầu. Nếu đội dự án chọn công nghệ khác, phải lập phụ lục thay thế và đối chiếu không làm mâu thuẫn TL08 đến TL24.

---

## 4. Kiến trúc logic tổng thể

## 4.1 Các lớp chính của hệ thống

1. **Lớp trình bày**
   - cổng R10
   - cổng R20
   - cổng quản trị R30, R40
   - cổng công khai R01
2. **Lớp giao diện lập trình nghiệp vụ**
   - xác thực, phân quyền
   - ví, sổ cái, nạp, rút
   - chiến dịch, liên kết, thống kê
   - chống gian lận, kiểm tra thủ công
   - đối soát, kết chuyển
   - cấu hình, nhật ký, giám sát
   - nội dung tuân thủ
3. **Lớp xử lý nền**
   - ghi nhận sự kiện
   - tổng hợp số liệu tạm thời
   - đánh giá hợp lệ
   - tạo hàng kiểm tra thủ công
   - đối soát theo kỳ
   - kết chuyển doanh thu
   - tác vụ định kỳ
4. **Lớp dữ liệu**
   - dữ liệu nghiệp vụ giao dịch
   - dữ liệu sự kiện
   - dữ liệu cấu hình
   - dữ liệu nhật ký kiểm toán
   - kho tệp
5. **Lớp giám sát và vận hành**
   - chỉ số
   - nhật ký
   - cảnh báo
   - sao lưu, khôi phục
   - quản lý bí mật hệ thống

## 4.2 Sơ đồ khối mức cao

```text
Người dùng R10/R20/R30/R40
        |
     Giao diện web
        |
   Máy chủ nghiệp vụ
    |      |       \\
    |      |        \\--> Redis (phiên, khóa ngắn, hàng đợi)
    |      |
    |      --> PostgreSQL (nghiệp vụ, sổ cái, cấu hình, nhật ký kiểm toán)
    |
    --> Kho tệp (chứng từ, bằng chứng)

Người truy cập R01
        |
  Cổng công khai chuyển hướng
        |  \\
        |   \\--> Redis / hàng đợi sự kiện
        |    
        --> PostgreSQL (tra cứu liên kết tối thiểu, ghi truy vết cần thiết)

Tiến trình xử lý nền
   |     |      |      \\
   |     |      |       \\--> PostgreSQL
   |     |      \\----------> Redis / hàng đợi
   |     \\-----------------> Kho tệp (nếu cần)
   \\-----------------------> Chỉ số / Nhật ký / Cảnh báo
```

## 4.3 Lý do tách riêng cổng công khai R01

Cổng công khai chuyển hướng là đường nóng nhất, có đặc tính khác với cổng người dùng:

- cần phản hồi nhanh
- không nên phụ thuộc đầy đủ toàn bộ mô-đun quản trị
- cần giới hạn ảnh hưởng khi giao diện quản trị hoặc luồng tài chính gặp sự cố
- dễ mở rộng ngang độc lập khi lưu lượng tăng

Do đó TL25 chốt tách thành dịch vụ riêng, vẫn dùng chung một số thành phần hạ tầng.

---

## 5. Phân rã mô-đun máy chủ nghiệp vụ

## 5.1 Nguyên tắc phân rã mô-đun

- Bám ranh giới nghiệp vụ của TL08 đến TL12 và TL16, TL17
- Tách mô-đun theo trách nhiệm dữ liệu và quy trình
- Dùng sự kiện nội bộ hoặc hàng đợi cho tác vụ nền, tránh xử lý nặng ngay trong yêu cầu đồng bộ
- Mỗi mô-đun có lớp:
  - giao tiếp vào
  - dịch vụ nghiệp vụ
  - truy cập dữ liệu
  - ánh xạ trạng thái, mã lỗi theo TL14
  - nhật ký kiểm toán khi cần

## 5.2 Danh sách mô-đun phiên bản đầu

### Mô-đun xác thực và phiên đăng nhập
- đăng ký, đăng nhập, làm mới phiên, đăng xuất
- quản lý phiên và thu hồi phiên
- chính sách đăng nhập an toàn cơ bản theo TL19

### Mô-đun người dùng, hồ sơ và phân quyền
- hồ sơ người dùng
- vai trò và quyền theo TL03
- kiểm tra quyền ở lớp giao diện lập trình và thao tác nhạy cảm

### Mô-đun ví và sổ cái
- số dư khả dụng, số dư khóa tạm
- bút toán sổ cái
- quy tắc cân bằng dữ liệu tài chính
- đối chiếu sau thao tác nhạy cảm

### Mô-đun nạp tiền thủ công
- tạo hóa đơn nạp
- tải chứng từ
- duyệt, từ chối
- cập nhật ví và sổ cái theo TL08
- truy vết người duyệt và bằng chứng

### Mô-đun rút tiền thủ công
- tạo yêu cầu rút
- khóa tạm số dư
- duyệt, từ chối, hoàn tiền, hoàn thành theo TL09
- cập nhật ví, sổ cái, bằng chứng xử lý

### Mô-đun chiến dịch
- tạo, sửa, gửi duyệt
- duyệt, từ chối
- ngân sách theo lượt
- trạng thái chiến dịch theo TL10, TL14

### Mô-đun liên kết rút gọn và nhà xuất bản
- tạo liên kết rút gọn
- quản lý trạng thái liên kết
- ánh xạ liên kết sang cổng công khai
- cấu hình hiển thị liên kết trung gian

### Mô-đun ghi nhận sự kiện và lượt
- ghi nhận sự kiện truy cập từ cổng công khai
- chuẩn hóa sự kiện
- chống trùng ngắn hạn
- đưa vào hàng xử lý đánh giá hợp lệ

### Mô-đun đánh giá hợp lệ và chống gian lận
- áp dụng quy tắc TL12
- gắn cờ, phân loại kết quả
- tạo hàng kiểm tra thủ công
- ghi nhận tác động lên số liệu tạm thời

### Mô-đun thống kê và tổng hợp
- tổng hợp gần thực theo cửa sổ thời gian
- số liệu cho R10, R20, R30
- phân biệt tạm thời và đã chốt theo TL16

### Mô-đun đối soát và kết chuyển
- chốt đối soát theo kỳ
- kết chuyển doanh thu
- điều chỉnh sau chốt
- chống chạy trùng
- tạo nhật ký tác vụ và biên bản dữ liệu

### Mô-đun cấu hình hệ thống
- tham số nghiệp vụ
- hiệu lực cấu hình theo TL17
- khóa mở tính năng theo giai đoạn TL24

### Mô-đun nội dung tuân thủ
- quản lý nội dung song ngữ
- phiên bản, hiệu lực
- ghi nhận chấp nhận điều khoản theo TL23

### Mô-đun nhật ký, giám sát và tra cứu vận hành
- truy vấn nhật ký kiểm toán theo quyền
- chỉ số nghiệp vụ nền
- cảnh báo và mã cảnh báo theo TL18

### Mô-đun hỗ trợ tra cứu
- tra cứu hóa đơn, yêu cầu rút, chiến dịch, liên kết
- phục vụ R40 với giới hạn quyền

---

## 6. Kiến trúc cổng công khai chuyển hướng R01

## 6.1 Mục tiêu kỹ thuật

Cổng công khai R01 xử lý:

- nhận mã liên kết
- tra cứu trạng thái liên kết
- hiển thị trang trung gian hoặc chuyển hướng
- ghi nhận sự kiện tối thiểu
- trả trang lỗi phù hợp theo TL20, TL23

## 6.2 Nguyên tắc thiết kế

- Đường xử lý ngắn và ít phụ thuộc nhất có thể
- Không thực hiện tính toán nặng tại yêu cầu công khai
- Ghi sự kiện theo cơ chế nhanh, đẩy xử lý nặng xuống xử lý nền
- Có cơ chế suy giảm an toàn khi hàng đợi chậm nhưng vẫn kiểm soát được
- Không lộ chi tiết nội bộ về chống gian lận

## 6.3 Thành phần nội bộ của cổng công khai

- **Bộ giải mã và kiểm tra mã liên kết**
- **Bộ tra cứu trạng thái liên kết**
- **Bộ hiển thị trang trung gian**
- **Bộ chuyển hướng**
- **Bộ ghi nhận sự kiện**
- **Bộ giới hạn tần suất theo khóa**
- **Bộ nhật ký truy cập tối thiểu**
- **Bộ trang lỗi và thông báo bảo trì**

## 6.4 Luồng xử lý điển hình

### Luồng liên kết hợp lệ
1. Nhận yêu cầu với mã liên kết
2. Kiểm tra định dạng mã
3. Tra cứu liên kết và trạng thái
4. Kiểm tra trạng thái công khai cho phép
5. Ghi sự kiện thô vào hàng đợi
6. Hiển thị trang trung gian hoặc chuyển hướng
7. Ghi nhật ký truy cập tối thiểu và chỉ số

### Luồng liên kết không hợp lệ hoặc bị khóa
1. Nhận yêu cầu
2. Tra cứu không thấy hoặc trạng thái không cho phép
3. Trả trang lỗi công khai đúng loại
4. Cung cấp cơ chế báo lỗi liên kết nếu áp dụng
5. Ghi nhật ký mức phù hợp

## 6.5 Chiến lược hiệu năng phiên bản đầu cho R01

- Dùng bộ nhớ đệm tra cứu liên kết ngắn hạn
- Giới hạn truy vấn nặng trên mỗi yêu cầu
- Ghi sự kiện vào hàng đợi thay vì ghi toàn bộ tính toán trực tiếp
- Đặt giới hạn tần suất theo khóa để giảm lạm dụng thô
- Theo dõi độ trễ và tỷ lệ lỗi riêng cho R01 theo TL18

---

## 7. Kiến trúc xử lý nền và hàng đợi

## 7.1 Vai trò của xử lý nền

Theo TL16 và TL22, xử lý nền chịu trách nhiệm:

- tiêu thụ sự kiện truy cập
- đánh giá hợp lệ và chống gian lận
- tổng hợp số liệu tạm thời
- tác vụ định kỳ đối soát, kết chuyển
- xử lý tác vụ chậm, chạy lại có kiểm soát
- sinh cảnh báo nền theo ngưỡng

## 7.2 Nhóm tiến trình xử lý nền phiên bản đầu

TL25 khuyến nghị tách tối thiểu các nhóm tiến trình sau:

1. **Tiến trình tiêu thụ sự kiện truy cập**
2. **Tiến trình đánh giá hợp lệ và gắn cờ**
3. **Tiến trình tổng hợp số liệu gần thực**
4. **Tiến trình tác vụ tài chính và đối chiếu**
5. **Tiến trình đối soát, kết chuyển theo kỳ**
6. **Tiến trình tác vụ định kỳ hệ thống**
7. **Tiến trình dọn dẹp dữ liệu tạm và khóa ngắn hạn**

## 7.3 Nguyên tắc hàng đợi

- Mỗi loại tác vụ trọng yếu dùng hàng riêng hoặc khóa xử lý riêng
- Tác vụ tài chính và đối soát cần cơ chế chống chạy song song sai phạm vi
- Tác vụ phải có:
  - mã tác vụ
  - loại tác vụ
  - tham số
  - thời điểm tạo
  - số lần thử lại
  - trạng thái
  - nhật ký lỗi
- Không thử lại vô hạn với tác vụ có nguy cơ gây trùng bút toán

## 7.4 Tính đúng và chống xử lý trùng

- Dùng khóa theo thực thể hoặc theo kỳ đối soát
- Dùng mã định danh nghiệp vụ để chống tạo bút toán trùng
- Tác vụ tài chính phải kiểm tra điều kiện trước khi ghi dữ liệu
- Khi thử lại, phải kiểm tra dấu vết lần xử lý trước
- Tất cả quyết định xử lý lại phải ghi nhật ký theo TL18, TL22

## 7.5 Xử lý tác vụ kẹt

- Phân loại tác vụ kẹt:
  - kẹt do lỗi dữ liệu
  - kẹt do lỗi tạm thời hạ tầng
  - kẹt do xung đột khóa
- Có công cụ quản trị để:
  - xem trạng thái
  - thử lại có kiểm soát
  - hủy
  - chuyển hàng kiểm tra thủ công
- Thao tác quản trị tác vụ kẹt phải có quyền và truy vết theo TL03, TL22

---

## 8. Thiết kế dữ liệu và chiến lược lưu trữ

## 8.1 Nguyên tắc lưu trữ dữ liệu

- Dữ liệu nghiệp vụ và tài chính lưu trong cơ sở dữ liệu quan hệ
- Dữ liệu sự kiện thô vẫn có thể lưu vào bảng sự kiện trong phiên bản đầu, nhưng tách bảng và chỉ mục rõ
- Dữ liệu tệp lưu ngoài cơ sở dữ liệu
- Dữ liệu nhật ký kỹ thuật không lưu trộn với dữ liệu nghiệp vụ
- Tối ưu truy vấn báo cáo bằng bảng tổng hợp và chỉ mục phù hợp, không đọc trực tiếp toàn bộ sự kiện thô

## 8.2 Nhóm dữ liệu chính trong PostgreSQL

Theo TL13, TL25 áp dụng các nhóm bảng chính:

### Nhóm nhận diện và quyền
- người dùng
- vai trò
- quyền
- phiên đăng nhập
- nhật ký đăng nhập

### Nhóm tài chính
- ví
- bút toán sổ cái
- hóa đơn nạp
- chứng từ nạp
- yêu cầu rút
- bằng chứng xử lý rút
- đối chiếu sau thao tác nhạy cảm

### Nhóm chiến dịch và liên kết
- chiến dịch
- cấu hình chiến dịch
- liên kết rút gọn
- trạng thái liên kết
- ánh xạ trang đích
- lịch sử thay đổi trạng thái

### Nhóm sự kiện và hợp lệ
- sự kiện truy cập thô
- kết quả đánh giá hợp lệ
- cờ rủi ro
- hàng kiểm tra thủ công
- quyết định kiểm tra thủ công

### Nhóm thống kê và đối soát
- bảng tổng hợp gần thực
- kỳ đối soát
- chi tiết đối soát
- kết chuyển doanh thu
- điều chỉnh sau chốt

### Nhóm cấu hình và nội dung
- cấu hình hệ thống
- phiên bản cấu hình
- nội dung tuân thủ song ngữ
- lịch sử xuất bản nội dung
- ghi nhận chấp nhận điều khoản

### Nhóm nhật ký kiểm toán nghiệp vụ
- nhật ký thao tác nhạy cảm
- nhật ký thay đổi cấu hình
- nhật ký quyết định quản trị

## 8.3 Chiến lược chỉ mục và phân vùng dữ liệu

### Chỉ mục bắt buộc
- khóa ngoại và trường tra cứu theo mã thực thể
- trạng thái + thời gian tạo cho hàng chờ nạp, rút
- mã liên kết và trạng thái liên kết
- mã chiến dịch và trạng thái chiến dịch
- người dùng + thời gian cho nhật ký thao tác
- thời gian + loại cho sự kiện và tác vụ nền

### Phân vùng dữ liệu khuyến nghị
- bảng sự kiện truy cập thô theo tháng hoặc theo khoảng thời gian phù hợp
- bảng nhật ký lớn theo tháng
- bảng tổng hợp giữ riêng theo kỳ

Mục tiêu:
- dễ dọn dẹp
- tăng tốc truy vấn theo thời gian
- giảm ảnh hưởng khi bảng tăng nhanh

## 8.4 Chính sách lưu tệp

### Loại tệp
- chứng từ nạp
- bằng chứng xử lý rút
- tệp hỗ trợ do người dùng hoặc quản trị tải lên
- tệp xuất báo cáo nếu có

### Nguyên tắc
- lưu tệp trong kho tệp, cơ sở dữ liệu chỉ lưu siêu dữ liệu
- tên tệp vật lý không dùng trực tiếp tên người dùng để tránh lộ thông tin
- có kiểm tra loại tệp và kích thước
- có quét an toàn cơ bản trước khi cho tải xuống nội bộ nếu khả thi
- đường dẫn tải xuống phải có kiểm tra quyền

---

## 9. Thiết kế giao tiếp giữa các thành phần

## 9.1 Giao tiếp đồng bộ

Áp dụng cho:

- giao diện web gọi máy chủ nghiệp vụ
- quản trị thao tác duyệt nạp, rút, chiến dịch
- tra cứu dữ liệu hiển thị
- cấu hình, nội dung tuân thủ

Nguyên tắc:
- phản hồi theo chuẩn TL15
- mã trạng thái, mã lỗi dùng chung theo TL14
- không xử lý nặng trong yêu cầu đồng bộ nếu có thể đẩy nền

## 9.2 Giao tiếp bất đồng bộ

Áp dụng cho:

- ghi nhận sự kiện truy cập
- đánh giá hợp lệ
- tổng hợp thống kê
- tác vụ đối soát, kết chuyển
- cảnh báo nền

Nguyên tắc:
- thông điệp có mã loại, phiên bản, mã truy vết
- có cơ chế thử lại và xử lý lỗi
- có ghi nhận trạng thái tác vụ để vận hành theo TL22

## 9.3 Mã truy vết xuyên thành phần

TL25 yêu cầu mỗi yêu cầu và tác vụ nền phải có **mã truy vết** để nối:

- nhật ký giao diện
- nhật ký máy chủ
- nhật ký cổng công khai
- nhật ký tiến trình nền
- cảnh báo và sự cố

Mục tiêu:
- điều tra nhanh
- đối chiếu chính xác
- phục vụ TL18 và TL22

---

## 10. Thiết kế xác thực, phân quyền và an toàn truy cập

## 10.1 Mô hình xác thực phiên bản đầu

TL25 khuyến nghị:

- xác thực bằng tài khoản và mật khẩu
- phiên đăng nhập dạng mã phiên có thời hạn
- lưu phiên và trạng thái thu hồi trong Redis hoặc bảng phiên
- làm mới phiên có kiểm soát
- hủy phiên khi đăng xuất hoặc quản trị cưỡng chế

## 10.2 Chính sách mật khẩu và đăng nhập an toàn cơ bản

- độ dài tối thiểu và độ phức tạp tối thiểu theo TL19
- giới hạn tần suất đăng nhập sai
- khóa tạm ngắn hạn khi vượt ngưỡng
- nhật ký đăng nhập và đăng nhập thất bại
- cảnh báo khi có dấu hiệu đăng nhập bất thường theo ngưỡng cấu hình

## 10.3 Phân quyền ở tầng kỹ thuật

Phân quyền phải được kiểm tra ở nhiều lớp:

1. **Lớp định tuyến giao diện**
2. **Lớp giao diện lập trình**
3. **Lớp dịch vụ nghiệp vụ cho thao tác nhạy cảm**
4. **Lớp truy vấn dữ liệu với bộ lọc theo quyền**
5. **Lớp tải tệp và xem bằng chứng**

Nguyên tắc:
- không chỉ ẩn nút ở giao diện
- luôn kiểm tra quyền ở máy chủ

## 10.4 Kiểm soát thao tác nhạy cảm

Áp dụng cho duyệt nạp, duyệt rút, hoàn tiền, chốt đối soát, kết chuyển, thay đổi cấu hình, xuất bản nội dung tuân thủ:

- kiểm tra quyền chi tiết
- ghi nhật ký kiểm toán bắt buộc
- yêu cầu lý do nếu quy trình yêu cầu
- xác nhận thao tác ở giao diện theo TL20, TL23
- chống bấm lặp gây xử lý trùng

---

## 11. Bảo mật ứng dụng và bảo mật hạ tầng tối thiểu

## 11.1 Bảo mật ứng dụng

- kiểm tra dữ liệu vào ở cả giao diện và máy chủ
- lọc nội dung hiển thị và chống chèn mã độc nội dung
- kiểm soát tải tệp, loại tệp, kích thước
- chống lạm dụng giao diện lập trình bằng giới hạn tần suất
- bảo vệ đường dẫn quản trị
- che dữ liệu nhạy cảm trong phản hồi và nhật ký theo TL19
- quản lý phiên và quyền chặt chẽ

## 11.2 Bảo mật hạ tầng tối thiểu phiên bản đầu

- tách môi trường phát triển, kiểm thử, phát hành
- quản lý bí mật hệ thống bằng kho bí mật hoặc tệp bí mật an toàn theo môi trường
- không ghi bí mật vào kho mã nguồn
- dùng kết nối mã hóa cho đường công khai
- giới hạn truy cập mạng tới cơ sở dữ liệu, Redis, kho tệp
- chỉ mở cổng cần thiết
- nhật ký truy cập quản trị và máy chủ
- sao lưu có kiểm soát quyền truy cập

## 11.3 Quản lý bí mật hệ thống

- bí mật gồm:
  - khóa phiên
  - thông tin kết nối cơ sở dữ liệu
  - thông tin Redis
  - khóa ký nội bộ
  - khóa dịch vụ lưu trữ tệp
  - cấu hình công cụ cảnh báo
- quy tắc:
  - theo môi trường
  - có lịch xoay khóa định kỳ hoặc khi nghi ngờ lộ
  - truy cập theo nguyên tắc tối thiểu cần dùng
  - ghi nhận thay đổi bí mật ở mức vận hành, không lộ giá trị

## 11.4 Bảo mật nội dung tuân thủ và thông báo công khai

Theo TL23:
- tách nội dung công khai khỏi bí mật kỹ thuật
- không nhúng chi tiết chống gian lận vào nội dung hiển thị
- có quy trình phê duyệt trước xuất bản nội dung rủi ro cao

---

## 12. Giám sát, nhật ký, cảnh báo và khả năng quan sát

## 12.1 Mục tiêu khả năng quan sát

Bám TL18 và TL22, hệ thống phải cho phép trả lời nhanh các câu hỏi vận hành:

- hệ thống đang lỗi ở đâu
- luồng nào bị chậm
- hàng đợi nào đang kẹt
- thao tác nhạy cảm nào vừa chạy
- dữ liệu tài chính có dấu hiệu sai lệch không
- cổng công khai có suy giảm không

## 12.2 Chỉ số kỹ thuật tối thiểu cần thu thập

### Cho giao diện và máy chủ nghiệp vụ
- số yêu cầu theo tuyến
- thời gian phản hồi
- tỷ lệ lỗi
- số kết nối cơ sở dữ liệu
- lỗi truy vấn và thời gian truy vấn chậm
- số phiên đăng nhập hoạt động

### Cho cổng công khai R01
- số yêu cầu chuyển hướng
- tỷ lệ lỗi theo loại
- thời gian tra cứu liên kết
- thời gian phản hồi tổng
- tỷ lệ ghi sự kiện thất bại hoặc chậm

### Cho xử lý nền
- độ dài hàng đợi
- độ trễ xử lý hàng đợi
- số tác vụ thất bại
- số lần thử lại
- tác vụ kẹt theo loại
- thời gian chạy tác vụ đối soát, kết chuyển

### Cho dữ liệu và tài chính
- sai lệch đối chiếu ví và sổ cái
- số lượng giao dịch nạp, rút theo trạng thái
- số lượng điều chỉnh sau chốt
- số lượng sự kiện bị gắn cờ bất thường

## 12.3 Nhật ký và mức nhật ký

- **Nhật ký kỹ thuật**
  - lỗi hệ thống
  - cảnh báo hệ thống
  - truy vết yêu cầu
- **Nhật ký nghiệp vụ**
  - thay đổi trạng thái nạp, rút, chiến dịch, liên kết
  - quyết định kiểm tra thủ công
  - chốt đối soát, kết chuyển
- **Nhật ký kiểm toán**
  - thao tác nhạy cảm
  - thay đổi cấu hình
  - thay đổi quyền
  - xuất bản nội dung tuân thủ

Mọi nhật ký phải che dữ liệu nhạy cảm theo TL19.

## 12.4 Cảnh báo và ngưỡng khởi tạo

Ngưỡng cụ thể cấu hình trong TL17, nhưng TL25 yêu cầu có cảnh báo tối thiểu cho:

- cổng công khai lỗi tăng đột biến
- độ trễ hàng đợi sự kiện tăng
- tác vụ đối soát thất bại
- sai lệch đối chiếu ví và sổ cái
- lỗi đăng nhập bất thường
- lỗi cơ sở dữ liệu hoặc thiếu dung lượng
- lỗi lưu trữ tệp
- số yêu cầu rút bị treo quá ngưỡng vận hành

## 12.5 Khả năng truy vết sự cố

- tìm kiếm nhật ký theo mã truy vết
- nối được từ yêu cầu người dùng tới tác vụ nền liên quan
- nối được từ tác vụ đối soát tới biên bản dữ liệu và nhật ký vận hành
- giữ dữ liệu đủ lâu theo chính sách TL19, TL22, TL23

---

## 13. Mô hình triển khai theo môi trường

## 13.1 Danh sách môi trường tối thiểu

Theo TL22 và TL24, phiên bản đầu dùng tối thiểu:

- **Môi trường phát triển nội bộ**
- **Môi trường kiểm thử tích hợp**
- **Môi trường kiểm thử chấp nhận**
- **Môi trường phát hành**

## 13.2 Nguyên tắc tách biệt môi trường

- cơ sở dữ liệu riêng
- Redis riêng
- kho tệp riêng hoặc vùng lưu trữ riêng
- bí mật hệ thống riêng
- tên miền hoặc miền phụ riêng
- nhật ký và cảnh báo phân tách được
- không dùng dữ liệu thật ở môi trường không phải phát hành

## 13.3 Sơ đồ triển khai khuyến nghị cho phiên bản đầu

### Mỗi môi trường có các thành phần
- dịch vụ giao diện
- máy chủ nghiệp vụ
- cổng công khai
- tiến trình xử lý nền
- PostgreSQL
- Redis
- kho tệp
- bộ giám sát và nhật ký
- bộ cân bằng hoặc cổng vào phù hợp

### Ghi chú triển khai
- Ở môi trường phát triển nội bộ và kiểm thử tích hợp, có thể dùng cấu hình tối giản
- Ở môi trường phát hành, khuyến nghị tách tiến trình:
  - máy chủ nghiệp vụ
  - cổng công khai
  - xử lý nền
- Cơ sở dữ liệu phát hành phải có sao lưu định kỳ và giám sát riêng

## 13.4 Tách lưu lượng công khai và lưu lượng quản trị

- Cổng công khai R01 đi qua đường vào riêng nếu khả thi
- Cổng quản trị và giao diện người dùng đi qua đường vào có kiểm soát truy cập phù hợp
- Hạn chế tác động chéo khi lưu lượng công khai tăng cao

---

## 14. Cơ chế phát hành, quay lui và tương thích phiên bản

## 14.1 Nguyên tắc phát hành

Bám TL22:
- phát hành theo lô nhỏ nếu có thể
- có danh sách kiểm tra trước và sau phát hành
- có phương án quay lui
- không triển khai đồng thời nhiều thay đổi rủi ro cao nếu chưa cần

## 14.2 Quy trình phát hành kỹ thuật khuyến nghị

1. Khóa phiên bản mã nguồn
2. Chạy kiểm tra tự động và kiểm tra gói phát hành
3. Xây dựng ảnh triển khai
4. Cập nhật cấu hình môi trường
5. Chạy cập nhật dữ liệu nếu có
6. Triển khai máy chủ nghiệp vụ và tiến trình nền
7. Triển khai cổng công khai
8. Kiểm tra sức khỏe dịch vụ
9. Chạy bộ kiểm tra sau phát hành rút gọn
10. Bật giám sát tăng cường và xác nhận bàn giao cho vận hành

## 14.3 Chiến lược cập nhật cấu trúc dữ liệu

- dùng tập lệnh cập nhật cấu trúc dữ liệu có phiên bản
- tách bước:
  - thêm cấu trúc mới
  - triển khai mã dùng được cả cũ và mới nếu cần
  - di chuyển dữ liệu nền
  - loại bỏ cấu trúc cũ ở bản sau
- tránh thay đổi phá vỡ ngay trong phát hành nếu không bắt buộc
- mọi cập nhật cấu trúc dữ liệu phải có phương án quay lui hoặc dừng an toàn

## 14.4 Quay lui

- Quay lui mã ứng dụng phải xét tương thích cấu trúc dữ liệu
- Nếu không thể quay lui hoàn toàn, phải có phương án:
  - khóa tính năng
  - tạm dừng luồng bị ảnh hưởng
  - sửa nóng cấu hình
- Quay lui và xử lý sự cố phải ghi biên bản theo TL22

---

## 15. Sao lưu, khôi phục và liên tục dịch vụ

## 15.1 Nguyên tắc chung

- Bám TL22 nhưng chốt cụ thể lớp kỹ thuật:
  - cơ sở dữ liệu
  - kho tệp
  - cấu hình
  - nội dung tuân thủ
  - nhật ký quan trọng
- Có kiểm tra khôi phục thử định kỳ, không chỉ sao lưu trên lý thuyết

## 15.2 Thành phần cần sao lưu

### Bắt buộc
- PostgreSQL
- kho tệp chứng từ và bằng chứng
- cấu hình hiệu lực phiên bản đầu
- nội dung tuân thủ song ngữ và lịch sử phiên bản
- tập lệnh triển khai và cấu hình dịch vụ

### Khuyến nghị
- bản chụp cấu hình giám sát và bảng theo dõi
- bản chụp cấu hình cảnh báo
- danh sách người dùng vận hành và quyền

## 15.3 Khôi phục thử

- khôi phục cơ sở dữ liệu vào môi trường thử
- kiểm tra tính toàn vẹn dữ liệu tài chính, đối soát, nội dung tuân thủ
- kiểm tra tải tệp chứng từ và bằng chứng
- kiểm tra khởi động lại tiến trình nền sau khôi phục
- ghi biên bản khôi phục thử theo TL22

## 15.4 Mức ưu tiên khôi phục theo thành phần

1. cổng công khai R01
2. máy chủ nghiệp vụ lõi
3. PostgreSQL
4. Redis
5. tiến trình xử lý nền
6. kho tệp
7. công cụ giám sát và nhật ký

> Ghi chú: thứ tự thực tế có thể điều chỉnh theo kịch bản sự cố, nhưng phải có lý do và biên bản.

---

## 16. Chiến lược hiệu năng và mở rộng sau phiên bản đầu

## 16.1 Mục tiêu phiên bản đầu

Phiên bản đầu không tối ưu cực hạn nhưng phải:
- ổn định luồng lõi
- đo được điểm nghẽn
- có đường mở rộng không phá kiến trúc

## 16.2 Điểm nóng dự kiến

- cổng công khai chuyển hướng R01
- ghi nhận và tiêu thụ sự kiện truy cập
- truy vấn thống kê gần thực
- hàng chờ nạp, rút và đối soát khi tăng lượng tác vụ
- nhật ký và truy vấn tra cứu quản trị

## 16.3 Chiến lược mở rộng theo pha

### Pha 1 — Mở rộng ngang dịch vụ
- tăng số bản chạy cổng công khai
- tăng số tiến trình xử lý nền theo loại tác vụ
- tăng số bản chạy máy chủ nghiệp vụ nếu cần
- tối ưu Redis và kết nối cơ sở dữ liệu

### Pha 2 — Tách dữ liệu và truy vấn
- tách kho truy vấn thống kê đọc nhiều
- tách bảng sự kiện theo phân vùng rõ hơn
- tăng cường bảng tổng hợp
- thêm cơ chế lưu trữ sự kiện dài hạn nếu tải lớn

### Pha 3 — Tách dịch vụ chuyên biệt
- tách riêng dịch vụ sự kiện
- tách riêng dịch vụ thống kê
- tách riêng dịch vụ đối soát nếu quy mô tăng
- giữ giao tiếp theo chuẩn thông điệp và mã truy vết

## 16.4 Chỉ tiêu cần đo trước khi mở rộng

- số yêu cầu mỗi giây ở R01
- độ trễ trung bình và độ trễ cao
- độ dài hàng đợi và thời gian tiêu thụ
- tải cơ sở dữ liệu và truy vấn chậm
- tỷ lệ lỗi ứng dụng
- thời gian chạy tác vụ đối soát và kết chuyển

Không mở rộng theo cảm tính nếu chưa có số đo.

---

## 17. Định hướng triển khai cho trợ lý lập trình và đội phát triển

## 17.1 Cấu trúc kho mã nguồn khuyến nghị

TL25 khuyến nghị cấu trúc kho mã theo dạng một kho chính nhiều gói:

- `ung-dung-giao-dien`
- `may-chu-nghiep-vu`
- `cong-khai-chuyen-huong`
- `xu-ly-nen`
- `goi-dung-chung`
  - kiểu dữ liệu chung
  - mã trạng thái và mã lỗi theo TL14
  - thư viện ghi nhật ký
  - thư viện truy vết
- `tap-lenh-cap-nhat-du-lieu`
- `tai-lieu-ky-thuat`
- `cau-hinh-trien-khai`

Mục tiêu:
- dùng chung kiểu dữ liệu
- giảm lệch mã trạng thái và hợp đồng giao tiếp
- dễ phát hành theo từng thành phần

## 17.2 Quy ước triển khai mã theo mô-đun nghiệp vụ

Mỗi mô-đun nên có:
- lớp tiếp nhận yêu cầu
- lớp dịch vụ nghiệp vụ
- lớp truy cập dữ liệu
- lớp chuyển đổi dữ liệu hiển thị
- kiểm tra quyền
- ghi nhật ký kiểm toán khi có thao tác nhạy cảm
- kiểm thử đơn vị và kiểm thử tích hợp tối thiểu

## 17.3 Quy tắc bắt buộc cho trợ lý lập trình khi sinh mã

- Không tự tạo trạng thái ngoài TL14
- Không bỏ qua nhật ký kiểm toán cho thao tác nhạy cảm
- Không ghi trực tiếp số dư mà không tạo bút toán sổ cái theo TL13
- Không xử lý tác vụ nặng trong yêu cầu đồng bộ nếu đã có thiết kế xử lý nền
- Không trả thông tin nhạy cảm trong lỗi hoặc nhật ký theo TL19
- Mọi giao diện lập trình phải bám TL15
- Mọi nội dung hiển thị phải bám TL23 và mã màn hình TL20

## 17.4 Trình tự ưu tiên để đội phát triển bắt đầu

1. khởi tạo kho mã và nền tảng kỹ thuật chung
2. mô-đun xác thực, phân quyền
3. mô-đun ví, sổ cái
4. nạp thủ công và rút thủ công
5. chiến dịch và liên kết
6. cổng công khai và ghi nhận sự kiện
7. xử lý nền đánh giá hợp lệ, thống kê
8. đối soát, kết chuyển
9. cấu hình, nội dung tuân thủ, giám sát, nhật ký
10. hoàn thiện hồi quy và vận hành

---

## 18. Ma trận ánh xạ kiến trúc với các tài liệu đã có

## 18.1 Ánh xạ theo mô-đun kỹ thuật

- **TL02** → ranh giới nghiệp vụ toàn hệ thống
- **TL03** → xác thực, phân quyền, giới hạn truy cập
- **TL08** → mô-đun nạp tiền thủ công, hóa đơn, chứng từ
- **TL09** → mô-đun rút tiền thủ công, số dư khóa tạm, bằng chứng xử lý
- **TL10** → mô-đun chiến dịch, ngân sách theo lượt, trạng thái chiến dịch
- **TL11** → mô-đun liên kết rút gọn, cổng công khai, doanh thu nhà xuất bản
- **TL12** → mô-đun đánh giá hợp lệ, chống gian lận, kiểm tra thủ công
- **TL13** → thiết kế dữ liệu, sổ cái, ràng buộc, truy vết
- **TL14** → mã trạng thái, mã lỗi dùng chung toàn hệ thống
- **TL15** → hợp đồng giao diện lập trình và phản hồi chuẩn
- **TL16** → xử lý nền, sự kiện, tổng hợp, đối soát, kết chuyển
- **TL17** → cấu hình hiệu lực và khóa mở tính năng
- **TL18** → nhật ký, chỉ số, cảnh báo, mã truy vết
- **TL19** → bảo mật, che dữ liệu, an toàn hạ tầng và ứng dụng
- **TL20** → màn hình và luồng giao diện, vị trí cảnh báo, xác nhận
- **TL21** → kiểm thử chấp nhận và ca kiểm thử kỹ thuật liên thông
- **TL22** → triển khai môi trường, phát hành, quay lui, sự cố
- **TL23** → nội dung tuân thủ, quản lý phiên bản nội dung song ngữ
- **TL24** → lộ trình triển khai và bàn giao theo giai đoạn

## 18.2 Ánh xạ theo thành phần vận hành

- **PostgreSQL** ↔ TL13, TL16, TL22
- **Redis và hàng đợi** ↔ TL16, TL17, TL18, TL22
- **Kho tệp** ↔ TL08, TL09, TL19, TL22
- **Giám sát và nhật ký** ↔ TL18, TL19, TL22
- **Nội dung tuân thủ** ↔ TL17, TL23
- **Phát hành và khôi phục** ↔ TL22, TL24

---

## 19. Tiêu chí chấp nhận tài liệu TL25

TL25 được xem là đạt khi:

- Chốt được kiến trúc tổng thể cho phiên bản đầu theo mô-đun và thành phần
- Chốt được bộ công nghệ khuyến nghị đủ để triển khai thực tế
- Có thiết kế cổng công khai R01 tách riêng và lý do kỹ thuật rõ
- Có kiến trúc xử lý nền, hàng đợi, chống xử lý trùng và xử lý tác vụ kẹt
- Có chiến lược lưu trữ dữ liệu, tệp, chỉ mục, phân vùng dữ liệu
- Có mô hình xác thực, phân quyền và bảo mật kỹ thuật tối thiểu
- Có lớp giám sát, nhật ký, cảnh báo và mã truy vết xuyên thành phần
- Có mô hình triển khai theo môi trường và nguyên tắc tách biệt môi trường
- Có nguyên tắc phát hành, quay lui, sao lưu, khôi phục bám TL22
- Có định hướng mở rộng sau phiên bản đầu mà không phá kiến trúc
- Có quy tắc rõ cho đội phát triển và trợ lý lập trình để sinh mã nhất quán
- Truy vết nhất quán với TL01 đến TL24

---

## 20. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không làm thay đổi phạm vi nghiệp vụ đã chốt trong TL02
- [x] Tôn trọng phân quyền và vai trò theo TL03
- [x] Bảo toàn nguyên tắc tài chính, ví, sổ cái theo TL08, TL09, TL13
- [x] Bám trạng thái, mã lỗi và giao diện lập trình theo TL14, TL15
- [x] Bám xử lý nền, tổng hợp, đối soát theo TL16
- [x] Bám cấu hình hiệu lực và khóa mở tính năng theo TL17
- [x] Bám giám sát, nhật ký, cảnh báo theo TL18
- [x] Bám yêu cầu an toàn hệ thống và che dữ liệu theo TL19
- [x] Tương thích với màn hình và nội dung hiển thị theo TL20, TL23
- [x] Tương thích kế hoạch kiểm thử chấp nhận TL21
- [x] Tương thích quy trình vận hành, phát hành, ứng cứu sự cố TL22
- [x] Tương thích lộ trình triển khai và bàn giao theo TL24

---

## 21. Gợi ý tài liệu tiếp theo để đẩy nhanh triển khai

Sau TL25, để đội phát triển và trợ lý lập trình bắt tay làm nhanh hơn mà vẫn ít lệch, nên ưu tiên một trong các tài liệu sau:

### TL26 — Quy ước mã nguồn, cấu trúc kho mã và tiêu chuẩn lập trình
- quy ước thư mục, tên tệp, tên lớp, tên mô-đun
- quy ước kiểm tra dữ liệu vào, trả lỗi, ghi nhật ký
- quy ước giao diện lập trình và ánh xạ mã lỗi
- quy ước kiểm thử đơn vị, kiểm thử tích hợp

### TL27 — Hướng dẫn thao tác theo vai trò cho R30 và R40
- thao tác từng màn hình quản trị
- xử lý tình huống lỗi thường gặp
- mẫu phản hồi hỗ trợ bám TL23
- danh sách kiểm tra trước và sau thao tác nhạy cảm

### TL28 — Bộ dữ liệu kiểm thử và kịch bản diễn tập kỹ thuật
- dữ liệu mẫu cho nạp, rút, chiến dịch, liên kết, đối soát
- kịch bản sự cố cổng công khai
- kịch bản kẹt hàng đợi, sai lệch số liệu, quay lui phiên bản
- dữ liệu và ca kiểm thử cho đào tạo vận hành

---

## 22. Ghi chú cuối tài liệu

- TL25 là tài liệu kiến trúc kỹ thuật triển khai thực tế cho phiên bản đầu, đủ để đội kỹ thuật chốt hướng xây dựng và triển khai môi trường.
- Nếu đội dự án thay đổi công nghệ, phải cập nhật phụ lục thay thế và đối chiếu không mâu thuẫn các tài liệu từ TL08 đến TL24.
- Khi hệ thống có dữ liệu thật sau giai đoạn phát hành giới hạn, nên cập nhật TL25 bằng phụ lục hiệu năng và mở rộng dựa trên số đo thực tế.
