# TL22 — Đặc tả vận hành, triển khai và ứng cứu sự cố

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL22
- **Tên tài liệu:** Đặc tả vận hành, triển khai và ứng cứu sự cố
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21
- **Tài liệu đầu ra phụ thuộc:** TL23, sổ tay vận hành theo môi trường, kế hoạch phát hành phiên bản đầu, biên bản diễn tập sự cố

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL22 đặc tả cách triển khai và vận hành hệ thống ở mức đủ chi tiết để đội phát triển, đội vận hành và trợ lý lập trình có thể:

- triển khai phiên bản đầu đúng kiến trúc và ràng buộc đã chốt
- vận hành hằng ngày an toàn, truy vết được
- xử lý tác vụ nền, đối soát, kết chuyển đúng quy trình
- giám sát và phản ứng sự cố theo TL18 và TL19
- khôi phục dịch vụ và dữ liệu khi có lỗi ở mức tối thiểu chấp nhận được
- hỗ trợ kiểm thử chấp nhận và phát hành theo TL21

## 2.2 Phạm vi TL22

Trong phạm vi:

- mô hình môi trường triển khai
- cấu phần hệ thống và phân rã vận hành
- quy trình phát hành phiên bản
- quy trình thay đổi cấu hình trong vận hành
- vận hành hằng ngày, theo ca, theo chu kỳ
- xử lý tác vụ nền và đối soát định kỳ
- sao lưu, khôi phục, diễn tập
- ứng cứu sự cố theo mức độ
- ma trận vai trò vận hành
- nhật ký vận hành và biên bản bắt buộc

Ngoài phạm vi:

- đặc tả hạ tầng của nhà cung cấp cụ thể ở mức lệnh chi tiết
- tối ưu hiệu năng quy mô lớn sau phiên bản đầu
- quy trình pháp lý ngoài phạm vi kỹ thuật
- tích hợp cổng thanh toán tự động (phiên bản đầu vẫn thủ công)

## 2.3 Nguyên tắc xuyên suốt

- **Ưu tiên an toàn tiền và an toàn dữ liệu trước tốc độ xử lý.**
- **Không chạy tác vụ rủi ro cao thủ công nếu chưa có xác nhận và nhật ký.**
- **Mọi thao tác vận hành nhạy cảm phải truy vết được người thực hiện, thời điểm, lý do.**
- **Tách rõ môi trường, dữ liệu và cấu hình theo mục đích sử dụng.**
- **Ưu tiên khôi phục dịch vụ ổn định trước, điều chỉnh số liệu sau bằng quy trình chuẩn.**
- **Không sửa trực tiếp dữ liệu lõi trong cơ sở dữ liệu khi chưa có biên bản và phương án đối soát.**

---

## 3. Chuẩn hóa tên gọi và mối liên hệ với các tài liệu trước

## 3.1 Tên chuẩn TL22

- **TL22:** Đặc tả vận hành, triển khai và ứng cứu sự cố

TL22 là tài liệu tập trung vào lớp vận hành thực tế sau khi đã có:

- nghiệp vụ lõi (TL02, TL08–TL12)
- dữ liệu (TL13)
- mã trạng thái và mã lỗi (TL14)
- giao diện lập trình (TL15)
- ghi nhận sự kiện và tổng hợp (TL16)
- cấu hình và tham số vận hành (TL17)
- nhật ký, giám sát, cảnh báo (TL18)
- bảo mật và an toàn hệ thống (TL19)
- giao diện người dùng (TL20)
- kiểm thử chấp nhận (TL21)

## 3.2 Quy tắc xử lý mâu thuẫn tham chiếu

Nếu phát hiện mâu thuẫn giữa TL22 và tài liệu trước:

1. Ưu tiên tài liệu nghiệp vụ và dữ liệu gốc:
   - TL02, TL08–TL13
2. Sau đó ưu tiên lớp chuẩn hóa:
   - TL14, TL15
3. Sau đó ưu tiên lớp vận hành và an toàn:
   - TL16–TL19
4. Cuối cùng rà soát lại TL20, TL21 để cập nhật quy trình vận hành tương ứng

---

## 4. Kiến trúc vận hành tổng thể

## 4.1 Cấu phần vận hành chính

Theo TL16 và TL18, hệ thống phiên bản đầu được vận hành với các nhóm cấu phần tối thiểu:

- **Lớp giao diện người dùng**
  - cổng khách hàng mua chiến dịch
  - cổng nhà xuất bản
  - cổng quản trị và hỗ trợ
  - cổng công khai chuyển hướng
- **Lớp giao diện lập trình**
  - đường dẫn nghiệp vụ
  - đường dẫn nội bộ phục vụ tác vụ nền
- **Lớp xử lý nghiệp vụ**
  - tài khoản, quyền, hồ sơ
  - ví và sổ cái
  - nạp tiền thủ công
  - rút tiền thủ công
  - chiến dịch
  - liên kết rút gọn
  - chống gian lận
  - đối soát, kết chuyển
- **Lớp ghi nhận sự kiện và tổng hợp**
  - tiếp nhận sự kiện
  - chuẩn hóa
  - đánh giá tạm thời
  - tổng hợp gần thực
  - chốt đối soát
  - điều chỉnh sau chốt
- **Lớp xử lý nền**
  - hàng đợi tác vụ
  - tiến trình xử lý
  - tiến trình thử lại
  - hàng lỗi
- **Lớp dữ liệu**
  - cơ sở dữ liệu quan hệ
  - bộ nhớ đệm
  - kho tệp
- **Lớp quan sát vận hành**
  - nhật ký tập trung
  - chỉ số giám sát
  - cảnh báo
- **Lớp bảo mật và bí mật hệ thống**
  - kho bí mật
  - chứng thư và khóa mã hóa
  - chính sách truy cập và kiểm soát thay đổi

## 4.2 Luồng vận hành trọng yếu cần luôn sẵn sàng

Phiên bản đầu phải ưu tiên khả dụng cho các luồng sau:

1. đăng nhập và phân quyền
2. tạo hóa đơn nạp, tải chứng từ, duyệt nạp
3. tạo yêu cầu rút, duyệt rút
4. tạo liên kết rút gọn và truy cập cổng công khai
5. ghi nhận sự kiện lượt
6. đánh giá lượt hợp lệ và chống gian lận
7. tạo chiến dịch và duyệt chiến dịch
8. tổng hợp thống kê gần thực
9. chốt đối soát và kết chuyển doanh thu
10. xem nhật ký và cảnh báo vận hành

## 4.3 Nguyên tắc cô lập lỗi

- Lỗi ở biểu đồ hoặc báo cáo không được làm ngừng các luồng tài chính lõi.
- Lỗi tổng hợp gần thực không được làm dừng hoàn toàn ghi nhận sự kiện.
- Lỗi cổng công khai không được làm ảnh hưởng cổng quản trị nếu tách cấu phần đúng.
- Tác vụ nặng như chốt đối soát và kết chuyển phải chạy nền, tránh chặn thao tác giao diện.

---

## 5. Mô hình môi trường và dữ liệu theo môi trường

## 5.1 Môi trường tối thiểu

### Môi trường phát triển nội bộ
Dùng cho phát triển và thử nhanh chức năng.

- dữ liệu giả lập
- cấu hình linh hoạt
- không dùng dữ liệu thật
- không dùng khóa bí mật thật của môi trường phát hành

### Môi trường kiểm thử tích hợp
Dùng cho kiểm thử liên thông và kiểm thử kỹ thuật.

- mô phỏng gần đủ các cấu phần
- dữ liệu thử có thể nạp lại
- dùng để kiểm tra tương thích giữa các dịch vụ

### Môi trường kiểm thử chấp nhận
Dùng cho TL21.

- cấu trúc gần giống môi trường phát hành
- cấu hình chuẩn hóa theo TL17
- bật nhật ký, giám sát, cảnh báo theo TL18
- áp dụng ràng buộc bảo mật tối thiểu theo TL19

### Môi trường phát hành
Dùng cho vận hành thật.

- tách biệt hoàn toàn dữ liệu
- quyền truy cập chặt chẽ
- ghi nhật ký đầy đủ
- có sao lưu và khôi phục định kỳ

## 5.2 Quy tắc tách dữ liệu theo môi trường

- Không sao chép dữ liệu thật sang môi trường phát triển.
- Nếu cần dữ liệu gần thật cho kiểm thử:
  - phải ẩn hoặc thay thế dữ liệu nhạy cảm
  - phải có biên bản và phê duyệt nội bộ
- Tệp chứng từ thật không được dùng lại ở môi trường khác.
- Khóa truy cập và bí mật hệ thống phải tách riêng theo môi trường.

## 5.3 Quy tắc tên, biến cấu hình và nhận diện môi trường

Mỗi môi trường phải có nhận diện rõ trong:

- giao diện quản trị
- nhật ký
- cảnh báo
- tên kết nối cơ sở dữ liệu
- tên kho tệp
- tên hàng đợi

Mục tiêu là tránh thao tác nhầm môi trường, đặc biệt với:

- duyệt tài chính
- chạy chốt đối soát
- kết chuyển doanh thu
- thao tác khôi phục dữ liệu

---

## 6. Vai trò vận hành và phân tách nhiệm vụ

## 6.1 Vai trò vận hành kỹ thuật

TL22 dùng các vai trò vận hành kỹ thuật sau (khác với vai trò người dùng nghiệp vụ trong TL03):

- **VH01 — Quản lý vận hành**
- **VH02 — Kỹ sư phát hành**
- **VH03 — Kỹ sư hạ tầng**
- **VH04 — Kỹ sư cơ sở dữ liệu**
- **VH05 — Kỹ sư ứng dụng và xử lý nền**
- **VH06 — Kỹ sư an toàn hệ thống**
- **VH07 — Trực vận hành và hỗ trợ sự cố**
- **VH08 — Người xác nhận nghiệp vụ sau sự cố**
- **VH09 — Người phê duyệt thay đổi khẩn**

## 6.2 Liên hệ với vai trò nghiệp vụ TL03

- **R30** có thể là người xác nhận nghiệp vụ đối với:
  - nạp tiền
  - rút tiền
  - chiến dịch
  - đối soát
- **R40** hỗ trợ tra cứu giao diện và khách hàng, không thay thế vai trò kỹ thuật xử lý hạ tầng
- TL22 không thay đổi quyền nghiệp vụ TL03; chỉ bổ sung lớp vai trò vận hành kỹ thuật

## 6.3 Phân tách nhiệm vụ bắt buộc

Các tác vụ sau không nên do một người tự thực hiện toàn bộ từ đầu đến cuối:

- phát hành phiên bản và phê duyệt phát hành
- thay đổi cấu hình rủi ro cao và xác nhận hiệu lực
- chốt đối soát và xác nhận số liệu sau chốt
- khôi phục dữ liệu và xác nhận nghiệp vụ sau khôi phục
- can thiệp sự cố liên quan tài chính và đóng sự cố

## 6.4 Nhật ký bắt buộc cho vai trò vận hành

Mọi thao tác nhạy cảm phải ghi nhận tối thiểu:

- người thực hiện
- vai trò vận hành
- môi trường
- thời gian bắt đầu và kết thúc
- lý do thao tác
- kết quả
- mã yêu cầu hoặc mã tác vụ liên quan
- liên kết sự cố hoặc phiếu thay đổi nếu có

---

## 7. Danh mục tác vụ vận hành định kỳ

## 7.1 Tác vụ theo ca trực

Mỗi ca trực vận hành phải thực hiện:

- kiểm tra bảng giám sát tổng quan
- kiểm tra cảnh báo chưa xử lý
- kiểm tra hàng đợi và hàng lỗi
- kiểm tra dịch vụ cổng công khai chuyển hướng
- kiểm tra tốc độ xử lý tác vụ nền chính
- kiểm tra nhật ký lỗi tăng bất thường
- ghi sổ bàn giao ca

## 7.2 Tác vụ hằng ngày

- đối chiếu trạng thái tác vụ nền quan trọng
- rà soát hóa đơn nạp và yêu cầu rút bị treo bất thường
- rà soát cảnh báo lặp lại nhiều lần
- kiểm tra dung lượng cơ sở dữ liệu, kho tệp, nhật ký
- kiểm tra sao lưu hằng ngày thành công
- kiểm tra đồng bộ thời gian hệ thống
- rà soát thay đổi cấu hình trong ngày theo TL17
- tạo báo cáo vận hành ngày

## 7.3 Tác vụ theo kỳ đối soát

Theo TL16 và TL17:

- kiểm tra điều kiện trước chốt
- xác nhận hàng chờ kiểm tra thủ công
- xác nhận cấu hình hiệu lực của kỳ
- chạy chốt đối soát
- kiểm tra kết quả chốt
- chạy kết chuyển doanh thu
- đối chiếu ví, sổ cái, doanh thu
- ghi biên bản đối soát và kết chuyển
- xử lý điều chỉnh sau chốt nếu có theo quy trình

## 7.4 Tác vụ hằng tuần

- rà soát xu hướng lỗi và cảnh báo
- rà soát hiệu quả tham số chống gian lận
- kiểm tra dung lượng tăng trưởng dữ liệu sự kiện
- kiểm tra chất lượng dữ liệu tổng hợp
- kiểm tra trạng thái chứng thư và bí mật sắp hết hạn
- rà soát tài khoản vận hành và quyền truy cập
- kiểm tra khôi phục thử trên dữ liệu mẫu nhỏ

## 7.5 Tác vụ hằng tháng

- diễn tập sự cố tối thiểu một kịch bản
- rà soát quy trình ứng cứu sự cố
- rà soát nhật ký kiểm toán thao tác nhạy cảm
- rà soát cấu hình cảnh báo và ngưỡng
- rà soát chiến lược lưu trữ, lưu trữ lạnh và dọn dẹp dữ liệu theo chính sách
- tổng hợp báo cáo vận hành tháng

---

## 8. Quy trình phát hành phiên bản

## 8.1 Mục tiêu

Bảo đảm việc đưa phiên bản mới vào môi trường phát hành không làm sai lệch:

- luồng tài chính
- trạng thái nghiệp vụ
- xử lý sự kiện
- đối soát
- quyền truy cập
- nhật ký và giám sát

## 8.2 Điều kiện đầu vào trước phát hành

Bắt buộc thỏa mãn:

- Hoàn thành kiểm thử chấp nhận theo TL21 hoặc có phê duyệt ngoại lệ.
- Không còn lỗi mức rất cao hoặc cao chưa xử lý.
- Có kế hoạch phát hành và kế hoạch quay lui phiên bản.
- Có bản sao lưu trước phát hành.
- Có danh sách thay đổi:
  - thay đổi giao diện
  - thay đổi giao diện lập trình
  - thay đổi cơ sở dữ liệu
  - thay đổi tác vụ nền
  - thay đổi cấu hình cần xuất bản
- Có lịch phát hành được thông báo cho bên liên quan.
- Có người trực vận hành sau phát hành.

## 8.3 Quy trình phát hành chuẩn

### Bước 1 — Khóa phiên bản phát hành
- chốt mã nguồn
- chốt tập tin cấu hình theo môi trường
- chốt kế hoạch chuyển đổi dữ liệu nếu có

### Bước 2 — Sao lưu trước phát hành
- sao lưu cơ sở dữ liệu
- sao lưu cấu hình hệ thống
- sao lưu tệp cấu hình quan trọng
- xác nhận khả năng khôi phục

### Bước 3 — Triển khai phiên bản
- triển khai theo thứ tự cấu phần an toàn:
  1. cấu phần không ảnh hưởng dữ liệu
  2. thay đổi cơ sở dữ liệu
  3. dịch vụ ứng dụng
  4. tiến trình xử lý nền
  5. giao diện người dùng
- theo dõi nhật ký và chỉ số ngay trong lúc triển khai

### Bước 4 — Kiểm tra sau triển khai
- kiểm tra sức khỏe dịch vụ
- kiểm tra đăng nhập
- kiểm tra một số đường dẫn giao diện lập trình lõi
- kiểm tra tạo bản ghi thử không ảnh hưởng tiền
- kiểm tra hàng đợi xử lý nền
- kiểm tra nhật ký và cảnh báo

### Bước 5 — Kiểm tra nghiệp vụ rút gọn sau phát hành
Tối thiểu chạy các ca hồi quy trọng yếu trong TL21 ở mức rút gọn:

- xác thực và phân quyền
- nạp tiền không duyệt thật hoặc mô phỏng an toàn
- tạo liên kết rút gọn
- tạo chiến dịch nháp
- xem bảng giám sát

### Bước 6 — Mở phiên bản và theo dõi tăng cường
- theo dõi tăng cường trong khoảng thời gian sau phát hành
- ghi biên bản kết quả phát hành

## 8.4 Quy trình quay lui phiên bản

Thực hiện khi:

- phát hiện lỗi mức rất cao hoặc cao ảnh hưởng vận hành
- lỗi bảo mật nghiêm trọng
- sai lệch dữ liệu không kiểm soát được
- không đáp ứng tiêu chí ổn định sau phát hành

Nguyên tắc:

- Ưu tiên dừng tác động mới trước
- Đánh giá ảnh hưởng dữ liệu phát sinh sau phát hành
- Quay lui ứng dụng theo kế hoạch chuẩn
- Với thay đổi cơ sở dữ liệu, chỉ quay lui khi có phương án dữ liệu rõ ràng
- Ghi biên bản quay lui và mở sự cố tương ứng

---

## 9. Quy trình thay đổi cấu hình trong vận hành

## 9.1 Nguyên tắc chung

- Thay đổi cấu hình nghiệp vụ phải theo TL17, không sửa tắt trực tiếp.
- Mọi thay đổi cấu hình ảnh hưởng tiền, chống gian lận, đối soát phải có phê duyệt R30 và nhật ký.
- Phân biệt:
  - thay đổi cấu hình nghiệp vụ qua giao diện quản trị
  - thay đổi cấu hình hệ thống hạ tầng qua quy trình vận hành kỹ thuật

## 9.2 Phân loại thay đổi cấu hình

### Thay đổi rủi ro thấp
Ví dụ:

- nội dung thông báo
- nhãn hiển thị
- thứ tự hiển thị cấu hình thanh toán không đổi bản chất nghiệp vụ

### Thay đổi rủi ro trung bình
Ví dụ:

- bật tắt phương thức nạp hoặc rút
- thay đổi ngưỡng rút
- thay đổi thời gian hiệu lực cấu hình

### Thay đổi rủi ro cao
Ví dụ:

- thay đổi giá theo lượt
- thay đổi tham số chống gian lận
- thay đổi tham số chốt đối soát
- thay đổi cấu hình ảnh hưởng kết chuyển doanh thu
- thay đổi bí mật hệ thống hoặc khóa mã hóa

## 9.3 Quy trình thay đổi rủi ro cao

1. Tạo phiếu thay đổi và nêu rõ lý do
2. Đánh giá ảnh hưởng:
   - chiến dịch đang chạy
   - liên kết đang hoạt động
   - đối soát kỳ hiện tại
   - nạp rút đang chờ xử lý
3. Chuẩn bị kế hoạch áp dụng và kế hoạch khôi phục
4. Phê duyệt bởi người có thẩm quyền
5. Áp dụng trong khung giờ phù hợp
6. Kiểm tra sau áp dụng
7. Theo dõi tăng cường
8. Ghi biên bản đóng thay đổi

## 9.4 Chụp cấu hình áp dụng và truy vết

Theo TL17, sau mỗi giao dịch hoặc quyết định quan trọng phải lưu dấu cấu hình áp dụng. Vận hành phải bảo đảm:

- không xóa bản cấu hình lịch sử đang được tham chiếu
- có thể tra cứu nhanh phiên bản cấu hình theo thời điểm
- khi xử lý sự cố, luôn xác định cấu hình áp dụng trước khi kết luận lỗi nghiệp vụ

---

## 10. Vận hành xử lý nền, hàng đợi và tác vụ định kỳ

## 10.1 Mục tiêu

Bảo đảm các tác vụ nền trong TL16 hoạt động ổn định, không xử lý trùng, không mất truy vết.

## 10.2 Nhóm tác vụ nền trọng yếu

- tiếp nhận và chuẩn hóa sự kiện
- đánh giá lượt hợp lệ tạm thời
- chuyển hàng kiểm tra thủ công
- tổng hợp gần thực
- chốt đối soát
- kết chuyển doanh thu
- gửi thông báo
- dọn dẹp dữ liệu tạm
- thử lại tác vụ thất bại có kiểm soát

## 10.3 Quy tắc vận hành hàng đợi

- Mỗi loại tác vụ có hàng chờ riêng hoặc phân nhóm rõ.
- Tác vụ rủi ro cao phải có khóa chống chạy trùng.
- Tác vụ thất bại phải vào hàng lỗi cùng thông tin nguyên nhân.
- Hạn chế thử lại mù quáng; số lần thử lại theo cấu hình TL17.
- Có khả năng xử lý lại có kiểm soát từ hàng lỗi, kèm lý do và người thực hiện.

## 10.4 Chỉ số vận hành bắt buộc cho tác vụ nền

- số tác vụ chờ
- số tác vụ đang chạy
- độ trễ hàng đợi
- tỷ lệ lỗi
- số lần thử lại
- tuổi bản ghi lâu nhất trong hàng chờ
- thời gian chạy trung vị và cao bất thường
- số tác vụ bị chặn vì khóa chống chạy trùng

## 10.5 Xử lý tác vụ bị kẹt

Dấu hiệu:

- độ trễ hàng đợi tăng liên tục
- số tác vụ chờ tăng nhưng không tiêu thụ
- tác vụ ở trạng thái đang chạy quá lâu
- cảnh báo từ TL18

Quy trình xử lý:

1. Xác định loại tác vụ bị kẹt
2. Kiểm tra tiến trình xử lý nền và nhật ký lỗi
3. Kiểm tra khóa chạy trùng còn treo
4. Đánh giá có thể khởi động lại tiến trình hay không
5. Nếu khởi động lại:
   - ghi biên bản thao tác
   - theo dõi tác vụ phục hồi
6. Xử lý hàng lỗi và tác vụ lặp lại nếu phát sinh
7. Kiểm tra đối chiếu dữ liệu sau sự cố nếu liên quan tài chính hoặc đối soát

---

## 11. Vận hành quy trình tài chính thủ công

## 11.1 Mục tiêu

Chuẩn hóa thao tác vận hành hỗ trợ các quy trình tài chính thủ công theo TL08 và TL09, giảm sai sót do thao tác thủ công.

## 11.2 Hàng chờ nạp tiền thủ công

Trực vận hành và quản trị cần theo dõi:

- số hóa đơn chờ xử lý
- hóa đơn sắp hết hạn
- hóa đơn thiếu chứng từ
- hóa đơn bị trả về hoặc ngoại lệ
- thời gian chờ trung bình

Quy tắc vận hành:

- không duyệt hàng loạt nếu chưa có đối chiếu đủ chứng cứ
- ưu tiên hóa đơn sắp hết hạn theo quy trình
- không bỏ qua cảnh báo xử lý trùng
- mọi từ chối phải có lý do chuẩn theo TL14 hoặc nội dung phù hợp chính sách

## 11.3 Hàng chờ rút tiền thủ công

Theo dõi:

- số yêu cầu chờ xử lý
- số dư khóa tạm liên quan
- yêu cầu gần chạm thời hạn cam kết nội bộ
- yêu cầu có dấu hiệu ngoại lệ
- yêu cầu hoàn tiền

Quy tắc vận hành:

- phân biệt rõ các bước trong quy trình rút
- không dùng thao tác hoàn tiền thay cho từ chối
- luôn kiểm tra tác động số dư trước khi xác nhận
- lưu bằng chứng xử lý khi quy trình yêu cầu

## 11.4 Đối chiếu tài chính sau thao tác nhạy cảm

Sau các thao tác sau phải đối chiếu nhanh:

- duyệt nạp
- từ chối nạp
- tạo yêu cầu rút
- từ chối rút
- hoàn tiền rút
- kết chuyển doanh thu
- điều chỉnh sau chốt

Đối chiếu tối thiểu:

- trạng thái thực thể
- ví
- sổ cái
- nhật ký kiểm toán

---

## 12. Vận hành cổng công khai chuyển hướng và ghi nhận sự kiện

## 12.1 Mục tiêu

Bảo đảm trải nghiệm công khai ổn định, đồng thời không làm sai lệch ghi nhận sự kiện và đánh giá lượt.

## 12.2 Chỉ số trọng yếu cần theo dõi

- tỷ lệ thành công chuyển hướng
- tỷ lệ lỗi theo loại lỗi liên kết
- thời gian phản hồi cổng công khai
- tỷ lệ xác minh thất bại
- số sự kiện ghi nhận mỗi khoảng thời gian
- tỷ lệ sự kiện bị loại tạm thời tăng bất thường
- tỷ lệ sự kiện vào hàng kiểm tra thủ công tăng bất thường

## 12.3 Tình huống vận hành thường gặp

### Tăng đột biến truy cập
- xác định nguồn tăng
- kiểm tra năng lực cổng công khai
- kiểm tra hàng đợi ghi nhận sự kiện
- bật giám sát tăng cường
- tránh thay đổi tham số chống gian lận nóng nếu chưa đánh giá tác động

### Tăng đột biến lỗi liên kết
- phân loại lỗi:
  - liên kết không tồn tại
  - liên kết bị khóa
  - đích lỗi
  - lỗi hệ thống
- xác định phạm vi ảnh hưởng
- nếu do cấu hình hoặc dịch vụ:
  - mở sự cố
  - thông báo nội bộ
  - xử lý theo quy trình ứng cứu

### Tăng đột biến sự kiện bị gắn cờ
- kiểm tra thay đổi cấu hình gần nhất
- kiểm tra lỗi dữ liệu đầu vào
- kiểm tra bất thường ở cổng công khai
- nếu cần, chuyển chế độ theo dõi tăng cường và tạm dừng thay đổi cấu hình liên quan

---

## 13. Vận hành đối soát và kết chuyển theo kỳ

## 13.1 Mục tiêu

Chuẩn hóa thao tác đối soát theo TL16 để đảm bảo số liệu chốt và kết chuyển doanh thu chính xác, chống xử lý trùng.

## 13.2 Điều kiện trước khi chạy chốt đối soát

Bắt buộc xác nhận:

- không có sự cố nghiêm trọng đang mở ở lớp ghi nhận sự kiện hoặc xử lý nền
- hàng kiểm tra thủ công trong ngưỡng chấp nhận theo cấu hình TL17 hoặc đã có quyết định xử lý
- cấu hình áp dụng của kỳ đã rõ và truy vết được
- hàng đợi xử lý nền ở trạng thái ổn định
- không có tác vụ chốt đối soát cùng kỳ đang chạy hoặc treo
- có bản sao lưu trước tác vụ nếu chính sách yêu cầu

## 13.3 Quy trình vận hành chốt đối soát

1. Mở màn hình và chọn kỳ đối soát
2. Chạy kiểm tra trước chốt
3. Rà soát cảnh báo và điều kiện chưa đạt
4. Xác nhận bởi người có quyền
5. Chạy tác vụ chốt
6. Theo dõi tiến trình và nhật ký tác vụ
7. Kiểm tra kết quả sau chốt:
   - số lượng sự kiện
   - số liệu chốt
   - sai lệch bất thường
8. Lập biên bản chốt kỳ

## 13.4 Quy trình vận hành kết chuyển doanh thu

1. Chọn kỳ đã chốt đủ điều kiện
2. Kiểm tra chống kết chuyển trùng
3. Xác nhận số lượng bút toán dự kiến
4. Chạy tác vụ kết chuyển
5. Theo dõi lỗi theo lô
6. Đối chiếu ví và sổ cái sau kết chuyển
7. Lập biên bản kết chuyển

## 13.5 Xử lý điều chỉnh sau chốt

Nguyên tắc:

- không sửa tay số liệu chốt
- tạo bản ghi điều chỉnh theo TL16
- có lý do và người phê duyệt
- đối chiếu lại sau điều chỉnh
- cập nhật biên bản đối soát

---

## 14. Sao lưu, khôi phục và diễn tập

## 14.1 Mục tiêu

Đảm bảo có thể khôi phục hệ thống và dữ liệu ở mức đủ để tiếp tục vận hành an toàn.

## 14.2 Thành phần phải sao lưu tối thiểu

- cơ sở dữ liệu
- cấu hình hệ thống và tham số vận hành
- kho tệp chứng từ và ảnh cấu hình
- bí mật hệ thống theo chính sách an toàn phù hợp
- định nghĩa tác vụ định kỳ và thông số triển khai quan trọng
- nhật ký kiểm toán ở mức cần lưu theo chính sách

## 14.3 Tần suất sao lưu tối thiểu

Tần suất cụ thể do đội vận hành chốt theo tải thực tế, nhưng tối thiểu phải có:

- sao lưu định kỳ hằng ngày cho cơ sở dữ liệu
- sao lưu trước phát hành
- sao lưu trước thay đổi rủi ro cao
- sao lưu định kỳ kho tệp
- kiểm tra thành công của sao lưu mỗi ngày

## 14.4 Quy tắc khôi phục

- Khôi phục phải thực hiện trên môi trường thử trước nếu tình huống cho phép.
- Phải xác định mốc thời gian khôi phục rõ ràng.
- Phải đánh giá dữ liệu phát sinh sau mốc khôi phục:
  - tiền
  - rút tiền
  - sự kiện
  - đối soát
- Sau khôi phục phải đối chiếu nghiệp vụ tối thiểu:
  - ví
  - sổ cái
  - trạng thái tài chính
  - trạng thái tác vụ nền
- Có xác nhận của người phụ trách nghiệp vụ trước khi mở lại đầy đủ dịch vụ.

## 14.5 Diễn tập khôi phục

Ít nhất định kỳ theo kế hoạch tháng phải diễn tập:

- khôi phục cơ sở dữ liệu trên dữ liệu mẫu
- khôi phục tệp chứng từ mẫu
- kiểm tra đăng nhập và các luồng lõi
- ghi biên bản thời gian khôi phục và khó khăn phát sinh

---

## 15. Quản lý sự cố và ứng cứu sự cố

## 15.1 Mục tiêu

Chuẩn hóa toàn bộ vòng đời sự cố từ phát hiện đến đóng sự cố, bám TL18 và TL19.

## 15.2 Định nghĩa sự cố

Sự cố là bất kỳ tình huống nào làm:

- gián đoạn hoặc suy giảm đáng kể luồng nghiệp vụ lõi
- sai lệch tiền hoặc sổ cái
- rò dữ liệu hoặc nguy cơ rò dữ liệu
- mất khả năng chốt đối soát đúng hạn
- mất khả năng truy cập cổng công khai hoặc cổng quản trị diện rộng
- mất truy vết nhật ký quan trọng

## 15.3 Phân mức sự cố

### Mức S1 — Rất nghiêm trọng
Ví dụ:

- sai lệch tiền diện rộng
- rò dữ liệu nhạy cảm
- ngừng toàn bộ dịch vụ lõi
- mất khả năng chốt đối soát và có nguy cơ sai dữ liệu lớn

Yêu cầu:

- kích hoạt ứng cứu ngay
- huy động liên vai trò
- cập nhật tình hình thường xuyên
- ưu tiên giảm tác động trước rồi mới xử lý triệt để

### Mức S2 — Nghiêm trọng
Ví dụ:

- ngừng một luồng lõi quan trọng như nạp hoặc rút
- cổng công khai lỗi diện rộng nhưng cổng quản trị còn hoạt động
- hàng đợi sự kiện kẹt kéo dài
- cảnh báo bảo mật nghiêm trọng nhưng chưa xác nhận rò dữ liệu

### Mức S3 — Trung bình
Ví dụ:

- lỗi báo cáo, biểu đồ, thống kê phụ
- tăng lỗi cục bộ ở một phân hệ
- hàng lỗi tăng nhưng có đường xử lý thay thế

### Mức S4 — Thấp
Ví dụ:

- lỗi hiển thị nhỏ
- cảnh báo nhiễu
- chậm nhẹ không ảnh hưởng nghiệp vụ lõi

## 15.4 Vai trò trong ứng cứu sự cố

- **Người chỉ huy sự cố:** điều phối tổng thể
- **Người ghi biên bản sự cố:** ghi mốc thời gian, quyết định, hành động
- **Người xử lý kỹ thuật chính:** xử lý nguyên nhân trực tiếp
- **Người đánh giá tác động nghiệp vụ:** xác định ảnh hưởng tài chính, đối soát, khách hàng
- **Người truyền thông nội bộ:** cập nhật tình hình cho các bên liên quan
- **Người xác nhận khôi phục:** xác nhận dịch vụ ổn định sau xử lý

## 15.5 Quy trình ứng cứu sự cố chuẩn

### Giai đoạn 1 — Phát hiện và xác nhận
- nhận cảnh báo hoặc báo lỗi
- xác thực sự cố có thật
- phân mức tạm thời
- mở mã sự cố

### Giai đoạn 2 — Cô lập và giảm tác động
- xác định phạm vi ảnh hưởng
- chặn tác động lan rộng nếu cần:
  - tạm dừng tác vụ nền
  - khóa thao tác nhạy cảm
  - tạm tắt phân hệ không ổn định
- giữ nhật ký và bằng chứng

### Giai đoạn 3 — Điều tra và xử lý
- đọc nhật ký, chỉ số, cảnh báo liên quan
- kiểm tra thay đổi gần nhất:
  - phát hành
  - cấu hình
  - hạ tầng
- áp dụng phương án xử lý:
  - khởi động lại cấu phần
  - quay lui phiên bản
  - điều chỉnh cấu hình
  - khôi phục dữ liệu
  - xử lý hàng lỗi

### Giai đoạn 4 — Xác nhận khôi phục
- xác nhận kỹ thuật
- xác nhận nghiệp vụ:
  - tài chính
  - sự kiện
  - đối soát
  - giao diện quản trị
- theo dõi tăng cường

### Giai đoạn 5 — Đóng sự cố và rút kinh nghiệm
- chốt nguyên nhân gốc nếu xác định được
- ghi tác động cuối cùng
- ghi hành động phòng ngừa
- tạo nhiệm vụ khắc phục lâu dài
- cập nhật TL22 hoặc sổ tay vận hành nếu cần

## 15.6 Quy tắc truyền thông trong sự cố

- Không công bố nguyên nhân khi chưa xác thực.
- Luôn nêu:
  - phạm vi ảnh hưởng
  - trạng thái xử lý
  - bước tiếp theo
- Với sự cố liên quan tiền hoặc dữ liệu nhạy cảm, truyền thông phải qua người được phân quyền.
- Mọi mốc truyền thông quan trọng phải được lưu vào biên bản sự cố.

---

## 16. Kịch bản ứng cứu sự cố trọng yếu

## 16.1 Kịch bản SC-01 — Sai lệch số dư sau duyệt nạp

### Dấu hiệu
- phản ánh từ người dùng
- cảnh báo đối chiếu sổ cái
- nhật ký cho thấy thao tác duyệt nạp lặp

### Mục tiêu ứng cứu
- ngăn phát sinh sai lệch thêm
- xác định phạm vi hóa đơn ảnh hưởng
- khôi phục số dư đúng bằng bút toán điều chỉnh hợp lệ

### Quy trình xử lý
1. Tạm dừng duyệt nạp nếu nghi ngờ lỗi diện rộng
2. Xác định hóa đơn và giao dịch sổ cái liên quan
3. Kiểm tra cơ chế chống xử lý trùng ở TL08/TL15/TL16
4. Khóa thao tác trên thực thể bị ảnh hưởng
5. Lập danh sách chênh lệch
6. Xử lý điều chỉnh theo quy trình tài chính chuẩn
7. Kiểm tra đối chiếu lại
8. Mở lại luồng duyệt nạp khi an toàn

### Kiểm tra sau khôi phục
- số dư ví
- sổ cái
- trạng thái hóa đơn
- nhật ký kiểm toán
- cảnh báo liên quan

## 16.2 Kịch bản SC-02 — Hàng đợi ghi nhận sự kiện bị kẹt

### Dấu hiệu
- độ trễ hàng đợi tăng mạnh
- số sự kiện chưa xử lý tăng nhanh
- cảnh báo xử lý nền từ TL18

### Mục tiêu ứng cứu
- khôi phục tiêu thụ hàng đợi
- tránh mất sự kiện hoặc xử lý trùng
- đánh giá ảnh hưởng tới tổng hợp và đối soát

### Quy trình xử lý
1. Kiểm tra tiến trình xử lý nền
2. Kiểm tra khóa chống chạy trùng và kết nối dữ liệu
3. Khởi động lại tiến trình theo quy trình nếu cần
4. Theo dõi tốc độ tiêu thụ
5. Kiểm tra hàng lỗi
6. Đánh giá ảnh hưởng tới số liệu tạm thời
7. Nếu gần kỳ đối soát, báo người phụ trách đối soát để cân nhắc lùi lịch

## 16.3 Kịch bản SC-03 — Không chạy được chốt đối soát

### Dấu hiệu
- tác vụ chốt không khởi chạy hoặc thất bại
- cảnh báo điều kiện trước chốt không đạt
- lỗi khóa tác vụ treo

### Mục tiêu ứng cứu
- xác định nguyên nhân
- chốt kỳ an toàn hoặc quyết định lùi kỳ có kiểm soát
- bảo toàn tính đúng của số liệu

### Quy trình xử lý
1. Kiểm tra điều kiện trước chốt
2. Kiểm tra tác vụ chốt đang chạy hoặc treo
3. Kiểm tra trạng thái hàng kiểm tra thủ công
4. Kiểm tra cấu hình hiệu lực và dữ liệu kỳ
5. Nếu cần xóa khóa treo:
   - có phê duyệt
   - ghi biên bản
6. Chạy lại chốt hoặc dời lịch có thông báo
7. Đối chiếu kết quả sau khi thành công

## 16.4 Kịch bản SC-04 — Cảnh báo bảo mật nghiêm trọng

### Dấu hiệu
- cảnh báo đăng nhập bất thường diện rộng
- truy cập trái phép đường dẫn nhạy cảm
- nghi ngờ lộ bí mật hệ thống

### Mục tiêu ứng cứu
- giảm nguy cơ tiếp diễn
- bảo toàn bằng chứng
- thay bí mật và khóa nếu cần
- đánh giá tác động tới dữ liệu và tài chính

### Quy trình xử lý
1. Kích hoạt quy trình an toàn hệ thống theo TL19
2. Tăng mức giám sát và lưu bằng chứng
3. Hạn chế truy cập hoặc tạm khóa phân hệ liên quan
4. Rà soát nhật ký truy cập, nhật ký kiểm toán
5. Xoay vòng bí mật hệ thống bị nghi ngờ
6. Kiểm tra tác động dữ liệu
7. Xác nhận khôi phục và theo dõi tăng cường
8. Lập biên bản và kế hoạch phòng ngừa

## 16.5 Kịch bản SC-05 — Tăng đột biến lỗi cổng công khai chuyển hướng

### Dấu hiệu
- tỷ lệ lỗi chuyển hướng tăng
- nhiều báo lỗi liên kết từ R01
- giảm mạnh số sự kiện hợp lệ

### Mục tiêu ứng cứu
- khôi phục trải nghiệm truy cập công khai
- xác định lỗi do cổng công khai, dịch vụ đích hay cấu hình liên kết
- hạn chế tác động đến ghi nhận sự kiện và doanh thu

### Quy trình xử lý
1. Kiểm tra cổng công khai và dịch vụ xác minh
2. Kiểm tra thay đổi gần nhất ở cổng công khai
3. Kiểm tra lỗi theo nhóm mã lỗi TL14
4. Đối chiếu nhật ký và chỉ số sự kiện
5. Khắc phục hoặc quay lui phân hệ công khai nếu cần
6. Theo dõi tỷ lệ lỗi và số sự kiện phục hồi
7. Thông báo nội bộ cho bộ phận hỗ trợ khách hàng

---

## 17. Quy trình khôi phục sau sự cố và xác nhận nghiệp vụ

## 17.1 Kiểm tra kỹ thuật sau khôi phục

Tối thiểu xác nhận:

- dịch vụ chính đã hoạt động
- kết nối cơ sở dữ liệu ổn định
- hàng đợi xử lý nền hoạt động
- nhật ký và cảnh báo hoạt động
- cổng công khai phản hồi bình thường
- cổng quản trị đăng nhập được

## 17.2 Kiểm tra nghiệp vụ sau khôi phục

Theo loại sự cố, phải kiểm tra nhanh các luồng liên quan. Với sự cố ảnh hưởng lõi, tối thiểu:

- đăng nhập và phân quyền
- tạo liên kết rút gọn
- tạo chiến dịch nháp
- xem hàng chờ nạp/rút
- đối chiếu ví và sổ cái mẫu
- xem bảng giám sát và nhật ký truy vết

## 17.3 Xác nhận số liệu sau sự cố

Nếu sự cố ảnh hưởng dữ liệu sự kiện, tài chính hoặc đối soát, phải lập biên bản xác nhận:

- khoảng thời gian ảnh hưởng
- loại dữ liệu ảnh hưởng
- số bản ghi ước tính
- phương án khôi phục hoặc điều chỉnh
- kết quả đối chiếu sau xử lý
- phần tồn đọng nếu còn

---

## 18. Nhật ký vận hành, biên bản và bằng chứng bắt buộc

## 18.1 Nhật ký vận hành hằng ngày

Các trường tối thiểu:

- ngày, ca trực
- người trực
- tình trạng dịch vụ
- cảnh báo chính
- sự cố phát sinh
- tác vụ vận hành đã thực hiện
- bàn giao ca
- rủi ro tồn đọng

## 18.2 Biên bản phát hành

Các mục tối thiểu:

- mã phát hành
- phạm vi thay đổi
- thời gian bắt đầu và kết thúc
- người thực hiện và người phê duyệt
- bản sao lưu trước phát hành
- kiểm tra sau triển khai
- lỗi phát sinh
- quyết định mở hoặc quay lui
- ghi chú theo dõi sau phát hành

## 18.3 Biên bản thay đổi cấu hình rủi ro cao

- mã thay đổi
- cấu hình liên quan
- lý do
- đánh giá ảnh hưởng
- kế hoạch áp dụng
- kế hoạch khôi phục
- phê duyệt
- kết quả sau áp dụng
- nhật ký liên quan

## 18.4 Biên bản sự cố

- mã sự cố
- mức sự cố
- thời gian phát hiện
- thời gian khống chế
- thời gian khôi phục
- phạm vi ảnh hưởng
- nguyên nhân tạm thời và nguyên nhân gốc
- hành động đã làm
- dữ liệu ảnh hưởng
- biện pháp phòng ngừa
- người đóng sự cố

## 18.5 Bằng chứng lưu trữ

Bằng chứng phục vụ kiểm toán nội bộ tối thiểu gồm:

- ảnh chụp màn hình thao tác quan trọng
- bản ghi nhật ký truy vết theo mã yêu cầu
- bản ghi chỉ số và cảnh báo
- biên bản đối chiếu dữ liệu
- kết quả kiểm tra sau khôi phục
- biên bản phê duyệt thay đổi

---

## 19. Chỉ tiêu vận hành và ngưỡng theo dõi

## 19.1 Nguyên tắc đặt chỉ tiêu

- Chỉ tiêu phải đo được bằng hệ thống giám sát TL18.
- Chỉ tiêu phải phân biệt:
  - khả dụng dịch vụ
  - độ trễ xử lý
  - lỗi tác vụ nền
  - an toàn dữ liệu
- Ngưỡng cụ thể do TL17 quản lý; TL22 chỉ quy định nhóm chỉ tiêu và cách phản ứng.

## 19.2 Nhóm chỉ tiêu tối thiểu

### Khả dụng dịch vụ
- cổng đăng nhập
- cổng quản trị
- cổng công khai chuyển hướng
- giao diện lập trình lõi

### Xử lý nền
- độ trễ hàng đợi
- tỷ lệ lỗi tác vụ
- số tác vụ treo
- tốc độ xử lý sự kiện

### Tài chính
- số hóa đơn nạp chờ xử lý quá hạn nội bộ
- số yêu cầu rút chờ xử lý quá hạn nội bộ
- số cảnh báo đối chiếu sổ cái

### Đối soát
- thời gian hoàn thành chốt kỳ
- số lỗi kết chuyển
- số điều chỉnh sau chốt bất thường

### Bảo mật
- số cảnh báo đăng nhập bất thường
- số lần truy cập bị từ chối trên đường dẫn nhạy cảm
- số thay đổi bí mật hệ thống

## 19.3 Phản ứng theo ngưỡng

- **Mức theo dõi:** ghi nhận và theo dõi xu hướng
- **Mức cảnh báo:** phân công người xử lý, kiểm tra trong thời gian ngắn
- **Mức khẩn cấp:** mở sự cố, kích hoạt quy trình ứng cứu

---

## 20. Quy trình dừng có kiểm soát và bảo trì

## 20.1 Khi nào cần dừng có kiểm soát

- phát hành thay đổi lớn
- xử lý sự cố hạ tầng
- bảo trì cơ sở dữ liệu
- thay đổi bí mật hệ thống
- rủi ro mất dữ liệu nếu tiếp tục ghi mới

## 20.2 Nguyên tắc dừng có kiểm soát

- thông báo nội bộ và bên liên quan trước khi dừng (nếu tình huống cho phép)
- ưu tiên dừng tác vụ nền rủi ro cao trước
- tránh dừng giữa tác vụ chốt đối soát hoặc kết chuyển nếu chưa có phương án
- ghi trạng thái hệ thống trước khi dừng
- xác nhận khởi động lại theo thứ tự an toàn

## 20.3 Trình tự khởi động lại sau bảo trì

1. cơ sở dữ liệu
2. kho bí mật và cấu hình cần thiết
3. hàng đợi và bộ nhớ đệm
4. dịch vụ ứng dụng
5. tiến trình xử lý nền
6. giao diện người dùng
7. hệ thống giám sát và xác nhận chỉ số
8. kiểm tra nghiệp vụ rút gọn

---

## 21. Tương thích với kiểm thử chấp nhận và màn hình vận hành

## 21.1 Liên kết với TL21

TL22 sử dụng kết quả và nguyên tắc từ TL21 để vận hành sau phát hành:

- danh sách hồi quy trọng yếu làm bộ kiểm tra sau phát hành và sau khôi phục
- kịch bản liên thông đầu cuối làm cơ sở kiểm tra sức khỏe nghiệp vụ
- mẫu biên bản đối chiếu tài chính dùng lại cho sự cố và phát hành

## 21.2 Liên kết với TL20

Các màn hình quản trị vận hành ưu tiên trong TL20 là công cụ chính để thực thi TL22:

- M30-90 đến M30-95 cho giám sát và cảnh báo
- M30-70 đến M30-74 cho đối soát và kết chuyển
- M30-20 đến M30-23 và M30-30 đến M30-33 cho hàng chờ tài chính
- M30-60 đến M30-64 cho xử lý kiểm tra thủ công và tra cứu sự kiện

TL22 không thay thế TL20; TL22 quy định cách vận hành các màn hình này theo quy trình và mức sự cố.

---

## 22. Ma trận truy vết TL22 với các tài liệu trước

## 22.1 Truy vết nghiệp vụ và dữ liệu

- **TL02** → xác định luồng nghiệp vụ lõi cần đảm bảo trong phát hành và sự cố
- **TL08** → vận hành hàng nạp, đối chiếu sau duyệt nạp
- **TL09** → vận hành hàng rút, xử lý hoàn tiền và đối chiếu
- **TL10** → vận hành chiến dịch, lỗi trạng thái, lỗi ngân sách
- **TL11** → vận hành liên kết rút gọn và doanh thu nhà xuất bản
- **TL12** → vận hành sự kiện bị gắn cờ, kiểm tra thủ công, tác động tài chính
- **TL13** → đối chiếu dữ liệu, khóa ngoại, chỉ mục và truy vấn kiểm tra
- **TL14** → mã trạng thái, mã lỗi dùng trong cảnh báo và điều tra
- **TL15** → kiểm tra đường dẫn giao diện lập trình sau phát hành và trong sự cố
- **TL16** → tác vụ nền, ghi nhận sự kiện, tổng hợp, chốt đối soát, kết chuyển
- **TL17** → tham số vận hành, ngưỡng cảnh báo, vòng đời cấu hình
- **TL18** → nhật ký, chỉ số, cảnh báo, quy trình phản ứng
- **TL19** → kiểm soát an toàn, bí mật hệ thống, sao lưu, ứng cứu sự cố an toàn
- **TL20** → màn hình quản trị vận hành
- **TL21** → điều kiện vào ra kiểm thử, hồi quy trọng yếu, mẫu đối chiếu

## 22.2 Truy vết theo nhóm vận hành

- phát hành phiên bản ↔ TL21, TL15, TL18, TL19
- vận hành tài chính thủ công ↔ TL08, TL09, TL13, TL14
- vận hành sự kiện và tổng hợp ↔ TL12, TL16, TL17, TL18
- ứng cứu sự cố ↔ TL18, TL19, TL21
- bảo trì và khôi phục ↔ TL19, TL13, TL16

---

## 23. Tiêu chí chấp nhận tài liệu TL22

TL22 được xem là đạt khi:

- Có mô hình môi trường và quy tắc tách dữ liệu rõ ràng
- Có vai trò vận hành và phân tách nhiệm vụ
- Có quy trình phát hành và quay lui phiên bản
- Có quy trình vận hành tác vụ nền, tài chính thủ công, đối soát
- Có quy trình sao lưu, khôi phục và diễn tập
- Có quy trình ứng cứu sự cố và kịch bản sự cố trọng yếu
- Có biên bản và nhật ký vận hành bắt buộc
- Truy vết được tới TL16, TL17, TL18, TL19, TL20, TL21
- Không mâu thuẫn nghiệp vụ lõi trong TL08–TL12 và dữ liệu TL13

---

## 24. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không mâu thuẫn phạm vi hợp lệ trong TL01 và TL02
- [x] Không thay đổi quyền nghiệp vụ TL03
- [x] Bám quy trình nạp tiền TL08 và rút tiền TL09 trong vận hành hàng chờ
- [x] Bám vòng đời chiến dịch TL10 và liên kết TL11 ở góc nhìn vận hành
- [x] Bám định nghĩa lượt hợp lệ và kiểm tra thủ công TL12
- [x] Không mâu thuẫn nguyên tắc dữ liệu và sổ cái TL13
- [x] Dùng đúng khái niệm trạng thái và mã lỗi TL14 trong cảnh báo và sự cố
- [x] Bám giao diện lập trình TL15 khi mô tả kiểm tra sau phát hành
- [x] Bám tác vụ nền và đối soát TL16
- [x] Bám vòng đời cấu hình và tham số TL17
- [x] Bám nhật ký, giám sát, cảnh báo TL18
- [x] Bám ràng buộc bảo mật và an toàn hệ thống TL19
- [x] Tương thích với màn hình quản trị trong TL20
- [x] Tận dụng hồi quy trọng yếu và mẫu đối chiếu từ TL21

---

## 25. Đầu vào cho tài liệu tiếp theo

- **TL23 — Điều khoản sử dụng, chính sách nội bộ và tuân thủ hiển thị**
  - dùng TL22 để xác định:
    - nội dung cần hiển thị khi bảo trì
    - thông báo gián đoạn dịch vụ
    - cảnh báo trong sự cố và truyền thông nội bộ
    - quy trình cập nhật nội dung tuân thủ khi thay đổi cấu hình hoặc phát hành

---

## 26. Ghi chú cuối tài liệu

- TL22 là tài liệu đặc tả vận hành ở mức chuẩn hóa quy trình, không phải sổ tay lệnh chi tiết cho từng công nghệ.
- Đội triển khai có thể cụ thể hóa TL22 thành:
  - sổ tay phát hành
  - sổ tay đối soát
  - sổ tay ứng cứu sự cố
  - sổ tay khôi phục
  theo từng môi trường và công cụ thực tế.
- Mọi thay đổi ảnh hưởng luồng nghiệp vụ, dữ liệu, cảnh báo hoặc an toàn hệ thống đều phải rà soát cập nhật TL22 tương ứng.
