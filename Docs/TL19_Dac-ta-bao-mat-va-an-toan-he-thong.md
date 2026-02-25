# TL19 — Đặc tả bảo mật và an toàn hệ thống

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL19
- **Tên tài liệu:** Đặc tả bảo mật và an toàn hệ thống
- **Phiên bản:** 1.0
- **Trạng thái:** Bản soạn chính thức cho vòng hiện tại
- **Phạm vi áp dụng:** Toàn bộ nền tảng hai phía (khách hàng mua chiến dịch, nhà xuất bản, quản trị, hỗ trợ, cổng chuyển hướng công khai, dịch vụ xử lý nền)
- **Tài liệu liên quan (phụ thuộc):**
  - TL01 — Tổng quan dự án và kế hoạch bộ tài liệu kỹ thuật
  - TL02 — Đặc tả yêu cầu nghiệp vụ tổng thể
  - TL03 — Ma trận vai trò và phân quyền
  - TL08 — Đặc tả quy trình nạp tiền thủ công
  - TL09 — Đặc tả quy trình rút tiền thủ công
  - TL10 — Đặc tả quy trình quản lý chiến dịch tính theo lượt
  - TL11 — Đặc tả quy trình rút gọn liên kết và tính doanh thu nhà xuất bản
  - TL12 — Đặc tả chống gian lận và định nghĩa lượt hợp lệ
  - TL13 — Mô hình dữ liệu chi tiết cấp cột và ràng buộc dữ liệu
  - TL14 — Chuẩn mã trạng thái, mã lỗi và danh mục mã dùng chung
  - TL15 — Đặc tả giao diện lập trình phiên bản đầu
  - TL16 — Đặc tả ghi nhận sự kiện và tổng hợp thống kê
  - TL17 — Đặc tả cấu hình hệ thống và tham số vận hành
  - TL18 — Đặc tả nhật ký, giám sát và cảnh báo vận hành

---

## 2. Mục tiêu và nguyên tắc

## 2.1 Mục tiêu

Tài liệu này khóa các yêu cầu bảo mật và an toàn hệ thống để đội phát triển, vận hành và trợ lý lập trình triển khai nhất quán, đặc biệt với các phần rủi ro cao:

- tài khoản và phân quyền
- số dư, sổ cái, nạp tiền, rút tiền
- cấu hình thanh toán ngân hàng và ví USDT
- cổng quản trị và thao tác nhạy cảm
- cổng chuyển hướng công khai và ghi nhận sự kiện lượt
- nhật ký kiểm toán, giám sát và cảnh báo
- dữ liệu chống gian lận, dữ liệu truy cập và thông tin nhạy cảm

## 2.2 Nguyên tắc xuyên suốt

1. **Ít quyền nhất**
   - Mỗi vai trò chỉ có quyền đúng phạm vi cần thiết theo TL03.

2. **Phòng thủ nhiều lớp**
   - Không dựa vào một biện pháp duy nhất cho tài khoản, dữ liệu, mạng, ứng dụng, vận hành.

3. **Mọi thay đổi nhạy cảm đều truy vết**
   - Bắt buộc ghi nhật ký kiểm toán bất biến theo TL18.

4. **Không sửa tay dữ liệu tài chính**
   - Mọi điều chỉnh phải đi qua sổ cái và có lý do, người thao tác, tham chiếu.

5. **Tách biệt dữ liệu tạm thời và dữ liệu đã chốt**
   - Đặc biệt với sự kiện lượt, doanh thu và chi tiêu theo TL10, TL11, TL12, TL16.

6. **Mã hóa dữ liệu nhạy cảm và che dữ liệu khi hiển thị**
   - Áp dụng cho người dùng cuối, hỗ trợ và cả nhật ký.

7. **Thay đổi cấu hình có kiểm duyệt**
   - Dùng quy trình và vòng đời cấu hình theo TL17.

---

## 3. Phạm vi bảo mật và ranh giới hệ thống

## 3.1 Thành phần trong phạm vi

- Cổng người dùng phía khách hàng mua chiến dịch
- Cổng người dùng phía nhà xuất bản
- Cổng quản trị
- Cổng chuyển hướng công khai
- Dịch vụ giao diện lập trình nội bộ và công khai
- Dịch vụ xử lý nền, hàng đợi, tổng hợp, đối soát
- Cơ sở dữ liệu nghiệp vụ
- Bộ nhớ đệm, giới hạn tần suất
- Kho lưu tệp chứng từ và ảnh cấu hình
- Hệ thống nhật ký, giám sát, cảnh báo
- Cấu hình hệ thống và tham số vận hành

## 3.2 Thành phần ngoài phạm vi trực tiếp nhưng có ràng buộc kết nối

- Hạ tầng máy chủ, mạng, tường lửa, cân bằng tải
- Dịch vụ xác minh truy cập người dùng thật
- Dịch vụ thư điện tử và thông báo
- Hệ thống lưu trữ tệp
- Cổng thanh toán hoặc quy trình thanh toán thủ công qua ngân hàng và USDT

## 3.3 Ranh giới tin cậy

Hệ thống phải tách ít nhất các ranh giới sau:

- **Vùng công khai**
  - cổng chuyển hướng, một số đường dẫn công khai giới thiệu, xác minh truy cập

- **Vùng ứng dụng người dùng**
  - cổng khách hàng mua, cổng nhà xuất bản

- **Vùng quản trị**
  - cổng quản trị, không dùng chung miền đăng nhập với cổng công khai

- **Vùng dịch vụ nền**
  - xử lý tổng hợp, đối soát, chấm điểm rủi ro

- **Vùng dữ liệu**
  - cơ sở dữ liệu, bộ nhớ đệm, kho tệp

---

## 4. Tài sản cần bảo vệ và phân loại dữ liệu

## 4.1 Tài sản cốt lõi

1. **Tài khoản người dùng**
2. **Phiên đăng nhập**
3. **Số dư ví và sổ cái giao dịch**
4. **Hóa đơn nạp tiền và chứng từ nạp**
5. **Yêu cầu rút tiền và chứng từ xử lý rút**
6. **Cấu hình tài khoản ngân hàng hệ thống**
7. **Cấu hình ví USDT hệ thống**
8. **Chiến dịch, cấu hình chiến dịch, số liệu chi tiêu**
9. **Liên kết rút gọn, số liệu lượt và doanh thu**
10. **Sự kiện lượt, điểm rủi ro, quyết định kiểm tra thủ công**
11. **Nhật ký kiểm toán**
12. **Khóa bí mật hệ thống, khóa ký, thông tin cấu hình nhạy cảm**

## 4.2 Phân loại dữ liệu

### Mức A — Rất nhạy cảm
- mật khẩu băm
- khóa bí mật, khóa ký
- mã truy cập phiên, mã làm mới
- dữ liệu xác thực hai lớp
- số dư ví, sổ cái
- chứng từ nạp và rút
- địa chỉ ví USDT hệ thống nếu dùng cho nhận tiền
- nhật ký kiểm toán thao tác tài chính
- dữ liệu chấm điểm rủi ro chi tiết

### Mức B — Nhạy cảm
- thư điện tử, số điện thoại người dùng
- thông tin nhận tiền của người dùng
- nội dung hỗ trợ có chứa thông tin giao dịch
- địa chỉ mạng băm, dấu vết thiết bị
- cấu hình chống gian lận
- cấu hình giá theo lượt chưa công khai

### Mức C — Nội bộ
- cấu hình giao diện, nội dung hướng dẫn, thông báo hệ thống
- tổng hợp báo cáo nội bộ chưa công khai
- nhật ký ứng dụng không chứa dữ liệu nhạy cảm

### Mức D — Công khai
- trang giới thiệu
- một số trang lỗi công khai
- cổng chuyển hướng công khai ở mức tối thiểu thông tin

## 4.3 Quy tắc xử lý theo mức dữ liệu

- **Mức A**
  - mã hóa khi lưu
  - che dữ liệu khi hiển thị
  - hạn chế truy cập rất chặt
  - bắt buộc nhật ký kiểm toán
  - không ghi vào nhật ký ứng dụng dạng thô

- **Mức B**
  - che dữ liệu khi hiển thị
  - ghi nhật ký có kiểm soát
  - chỉ vai trò phù hợp mới đọc được

- **Mức C**
  - ghi nhật ký thay đổi
  - kiểm soát quyền sửa

- **Mức D**
  - không chứa dữ liệu cá nhân, dữ liệu tài chính

---

## 5. Mối đe dọa trọng yếu và yêu cầu phòng thủ

## 5.1 Nhóm mối đe dọa tài khoản

- dò mật khẩu
- nhồi thông tin đăng nhập
- chiếm phiên
- lừa người dùng lấy mã xác thực
- leo thang quyền từ hỗ trợ lên quản trị

### Yêu cầu phòng thủ
- giới hạn tần suất đăng nhập
- khóa tạm theo rủi ro
- xác thực hai lớp bắt buộc cho quản trị viên
- cảnh báo đăng nhập bất thường
- làm mới phiên có kiểm soát
- vô hiệu hóa phiên cũ khi đổi mật khẩu
- phân tách quyền rõ theo TL03

## 5.2 Nhóm mối đe dọa tài chính

- cộng tiền trùng
- duyệt nạp hoặc rút sai người
- sửa số dư trực tiếp ngoài sổ cái
- tạo giao dịch giả bằng đường dẫn nội bộ
- xử lý rút tiền hai lần

### Yêu cầu phòng thủ
- chống xử lý trùng theo khóa nghiệp vụ
- sổ cái bất biến theo TL13
- quyền duyệt tài chính tách biệt
- bắt buộc lý do thao tác và nhật ký kiểm toán
- xác nhận bổ sung cho thao tác nhạy cảm
- khóa tạm số dư khi tạo yêu cầu rút theo TL09

## 5.3 Nhóm mối đe dọa cổng chuyển hướng và sự kiện lượt

- lạm dụng tạo lượt rác
- gửi sự kiện giả trực tiếp vào giao diện lập trình nội bộ
- tấn công làm nghẽn cổng công khai
- làm sai lệch doanh thu hoặc chi tiêu bằng sự kiện lặp

### Yêu cầu phòng thủ
- giới hạn tần suất và chấm điểm rủi ro theo TL12
- tách đường dẫn công khai và đường dẫn nội bộ
- chống xử lý trùng sự kiện theo TL16
- xác minh truy cập ở mức phù hợp
- giám sát bùng nổ sự kiện theo TL18

## 5.4 Nhóm mối đe dọa quản trị và cấu hình

- thay đổi giá theo lượt sai phạm vi
- thay đổi cấu hình thanh toán gây thất thoát
- thay đổi ngưỡng rút hoặc tham số chống gian lận không kiểm duyệt
- xóa dấu vết nhật ký

### Yêu cầu phòng thủ
- quy trình cấu hình theo TL17 (nháp, chờ duyệt, xuất bản)
- nhật ký kiểm toán bất biến theo TL18
- phân quyền hai lớp cho cấu hình nhạy cảm
- cảnh báo thay đổi cấu hình quan trọng
- không cho xóa cứng nhật ký kiểm toán

---

## 6. Yêu cầu kiểm soát truy cập và phân quyền

## 6.1 Nguồn chân lý phân quyền

- **TL03** là tài liệu chuẩn về vai trò và phân quyền.
- TL19 không thay đổi ma trận TL03, chỉ bổ sung ràng buộc bảo mật khi triển khai.

## 6.2 Yêu cầu bắt buộc khi triển khai phân quyền

1. **Kiểm tra quyền ở máy chủ**
   - Không dựa vào ẩn nút trên giao diện.

2. **Kiểm tra phạm vi dữ liệu**
   - Vai trò người dùng chỉ đọc và sửa dữ liệu thuộc sở hữu hoặc phạm vi được giao.

3. **Kiểm tra quyền theo trạng thái**
   - Ví dụ nạp tiền, rút tiền, chiến dịch, liên kết phải xét cả trạng thái hiện tại.

4. **Kiểm tra quyền theo hành động nhạy cảm**
   - Duyệt nạp, duyệt rút, thay đổi cấu hình thanh toán, thay đổi giá, quyết định kiểm tra thủ công phải có lớp xác thực bổ sung nếu được cấu hình.

5. **Không dùng mã vai trò rải rác**
   - Dùng danh mục mã chuẩn theo TL14.

## 6.3 Phân tách nhiệm vụ tối thiểu

Để giảm rủi ro nội bộ, hệ thống phải hỗ trợ phân tách tối thiểu:

- người tạo cấu hình ≠ người duyệt cấu hình nhạy cảm
- người xử lý rút tiền ≠ người tạo yêu cầu rút
- người xử lý khiếu nại tài chính ≠ người đã duyệt giao dịch gốc nếu có thể
- hỗ trợ không được thấy đầy đủ dữ liệu nhạy cảm tài chính nếu không có quyền mở rộng

---

## 7. Yêu cầu xác thực, phiên và quản lý bí mật

## 7.1 Mật khẩu và xác thực cơ bản

- Mật khẩu phải được băm bằng thuật toán chuyên dụng cho mật khẩu.
- Không lưu mật khẩu dạng rõ.
- Có chính sách độ dài tối thiểu và độ mạnh tối thiểu.
- Không trả về thông báo phân biệt quá chi tiết giữa “không tồn tại tài khoản” và “sai mật khẩu”.
- Đổi mật khẩu phải vô hiệu hóa các phiên cũ theo cấu hình.

## 7.2 Xác thực hai lớp

### Bắt buộc
- quản trị viên
- tài khoản có quyền tài chính nhạy cảm nếu được gán theo chính sách

### Khuyến nghị mạnh
- nhân viên hỗ trợ có quyền tra cứu giao dịch
- tài khoản người dùng có số dư lớn hoặc hoạt động bất thường

## 7.3 Phiên đăng nhập

- Phiên phải có thời hạn sống và thời hạn không hoạt động.
- Mã phiên và mã làm mới lưu an toàn, không lộ qua nhật ký.
- Hỗ trợ thu hồi phiên theo người dùng, theo thiết bị, theo sự kiện bảo mật.
- Hệ thống phải ghi nhật ký:
  - đăng nhập thành công
  - đăng nhập thất bại
  - đăng xuất
  - thu hồi phiên
  - hết hạn phiên

## 7.4 Quản lý bí mật hệ thống

Bao gồm:
- khóa ký mã truy cập
- khóa mã hóa dữ liệu nhạy cảm
- khóa dịch vụ thứ ba
- thông tin kết nối cơ sở dữ liệu
- khóa xác minh webhook nếu có

### Yêu cầu
- Không đưa khóa bí mật vào mã nguồn.
- Không ghi khóa bí mật vào nhật ký.
- Có cơ chế xoay khóa theo kế hoạch.
- Thay đổi khóa phải có quy trình và khả năng hoàn tác.
- Phân quyền đọc khóa theo môi trường và vai trò vận hành.

---

## 8. Yêu cầu bảo vệ dữ liệu và quyền riêng tư vận hành

## 8.1 Mã hóa dữ liệu

### Mã hóa trên đường truyền
- Bắt buộc dùng kết nối an toàn cho toàn bộ cổng và giao diện lập trình.
- Không cho gửi chứng từ và thông tin nhạy cảm qua kết nối không an toàn.

### Mã hóa khi lưu
Áp dụng tối thiểu cho:
- thông tin nhận tiền
- địa chỉ ví và dữ liệu cấu hình thanh toán nhạy cảm
- dữ liệu chứng từ nếu lưu trực tiếp
- khóa bí mật
- trường nhạy cảm theo phân loại Mức A

## 8.2 Che dữ liệu khi hiển thị

### Ví dụ bắt buộc che
- số tài khoản ngân hàng
- địa chỉ ví USDT
- thư điện tử
- số điện thoại
- địa chỉ mạng
- mã giao dịch bên ngoài nếu có quy định nội bộ

### Ràng buộc
- Màn hình hỗ trợ mặc định chỉ xem dữ liệu đã che.
- Hành động mở rộng xem dữ liệu nhạy cảm phải có quyền riêng và ghi nhật ký.

## 8.3 Giảm thiểu dữ liệu trong nhật ký

- Không ghi chứng từ dạng nhị phân vào nhật ký ứng dụng.
- Không ghi đầy đủ số tài khoản hoặc địa chỉ ví trong nhật ký.
- Không ghi mã truy cập, mã làm mới, mã xác thực một lần.
- Nhật ký lỗi chỉ ghi dữ liệu đủ để chẩn đoán.

## 8.4 Thời hạn lưu và xóa dữ liệu

- Thời hạn lưu từng nhóm dữ liệu phải được cấu hình và quản lý theo TL17.
- Dữ liệu tài chính, sổ cái, nhật ký kiểm toán tuân theo thời hạn lưu dài hơn.
- Xóa dữ liệu phải là xóa mềm hoặc ẩn truy cập nếu còn ràng buộc pháp lý và đối soát.
- Xóa cứng chỉ dùng cho dữ liệu phụ, có quy trình và nhật ký.

---

## 9. Yêu cầu bảo mật giao diện lập trình và dịch vụ

## 9.1 Nguồn chân lý đặc tả giao diện lập trình

- **TL15** là tài liệu chuẩn cho đường dẫn, đầu vào, đầu ra.
- TL19 bổ sung các yêu cầu bảo mật bắt buộc khi triển khai.

## 9.2 Yêu cầu bảo mật chung cho mọi đường dẫn

- xác thực và phân quyền ở máy chủ
- kiểm tra dữ liệu đầu vào
- giới hạn tần suất theo loại đường dẫn
- chống xử lý trùng cho đường dẫn tạo giao dịch
- trả mã lỗi chuẩn theo TL14
- gắn mã yêu cầu để truy vết nhật ký theo TL18

## 9.3 Nhóm đường dẫn tài chính

Áp dụng cho:
- tạo hóa đơn nạp
- tải chứng từ nạp
- duyệt hóa đơn nạp
- tạo yêu cầu rút
- duyệt hoặc từ chối rút
- tải chứng từ xử lý rút
- truy vấn sổ cái và số dư

### Yêu cầu bổ sung
- chống gửi lại nhiều lần
- chốt quyền theo trạng thái
- kiểm tra phạm vi dữ liệu
- ghi nhật ký kiểm toán bắt buộc
- có xác thực bổ sung với thao tác duyệt nếu cấu hình bật

## 9.4 Nhóm đường dẫn liên kết và chiến dịch

- kiểm tra quyền sở hữu
- kiểm tra trạng thái thực thể
- kiểm tra đầu vào danh mục mã theo TL14
- giới hạn tần suất tạo mới và cập nhật
- ghi nhật ký thay đổi cấu hình quan trọng

## 9.5 Đường dẫn công khai cổng chuyển hướng

- tách miền hoặc tách không gian đường dẫn khỏi quản trị
- giới hạn tần suất theo địa chỉ mạng và dấu vết thiết bị
- không tiết lộ chi tiết nội bộ khi lỗi
- ghi nhật ký sự kiện tối thiểu và chuyển xử lý nền theo TL16
- chống chèn dữ liệu đầu vào vào phản hồi

---

## 10. Yêu cầu bảo vệ tải tệp và kho tệp

## 10.1 Loại tệp trong phạm vi

- ảnh chứng từ nạp tiền
- ảnh chứng từ xử lý rút tiền
- ảnh mã ngân hàng
- ảnh mã ví USDT
- tệp hỗ trợ hoặc minh chứng khiếu nại

## 10.2 Kiểm tra tệp bắt buộc

- kiểm tra loại tệp cho phép
- kiểm tra kích thước tối đa
- kiểm tra phần mở rộng và định dạng thực tế
- đổi tên tệp lưu trữ theo mã nội bộ, không dùng tên người dùng gửi lên
- lưu tách biệt với đường dẫn công khai trực tiếp nếu là chứng từ nhạy cảm

## 10.3 Quyền truy cập tệp

- chứng từ nạp và rút chỉ vai trò có quyền mới xem được
- ảnh cấu hình thanh toán hiển thị theo cấu hình và phạm vi
- tải xuống tệp phải ghi nhật ký với dữ liệu nhạy cảm
- đường dẫn tạm thời có thời hạn cho tệp nhạy cảm nếu dùng kho tệp ngoài

## 10.4 Quét an toàn tệp

- khuyến nghị có hàng đợi quét an toàn tệp sau tải lên
- tệp chưa qua quét có thể đặt trạng thái chờ xác minh
- nếu không dùng quét tự động ở phiên bản đầu, phải có ràng buộc loại tệp chặt và quy trình duyệt thủ công

---

## 11. Yêu cầu bảo mật cơ sở dữ liệu và dữ liệu nền

## 11.1 Quyền truy cập cơ sở dữ liệu

- Tài khoản ứng dụng không dùng quyền tối cao.
- Tách tài khoản đọc và ghi nếu kiến trúc cho phép.
- Dịch vụ báo cáo chỉ đọc dùng tài khoản chỉ đọc.
- Công cụ quản trị cơ sở dữ liệu chỉ cho người vận hành được ủy quyền.

## 11.2 Ràng buộc dữ liệu hỗ trợ an toàn

Bám TL13 và bổ sung yêu cầu triển khai:
- khóa chính và khóa ngoài đầy đủ
- ràng buộc duy nhất cho khóa nghiệp vụ chống trùng
- kiểm tra miền giá trị theo danh mục mã TL14
- trường thời gian chuẩn hóa
- trường người tạo và người cập nhật cho bảng nhạy cảm

## 11.3 Truy vấn và thao tác dữ liệu

- dùng truy vấn tham số hóa
- không ghép chuỗi trực tiếp với đầu vào người dùng
- phân trang phía máy chủ cho danh sách lớn
- không cho sửa trực tiếp bảng sổ cái bằng chức năng thông thường

## 11.4 Dữ liệu hàng đợi và bộ nhớ đệm

- không lưu dữ liệu nhạy cảm dạng rõ trong khóa bộ nhớ đệm nếu không cần thiết
- đặt thời hạn sống phù hợp
- đặt tiền tố khóa theo môi trường để tránh va chạm
- ghi nhật ký khi xóa sạch bộ nhớ đệm cấu hình theo TL17

---

## 12. Yêu cầu an toàn cho xử lý nền, hàng đợi và đối soát

## 12.1 Nguồn chân lý xử lý sự kiện

- **TL16** là tài liệu chuẩn về ghi nhận sự kiện, tổng hợp và đối soát.
- TL19 tập trung vào yêu cầu an toàn khi triển khai các bước đó.

## 12.2 Yêu cầu an toàn bắt buộc

- Mỗi công việc nền có mã công việc và mã truy vết.
- Công việc nền phải có cơ chế thử lại có giới hạn.
- Công việc lỗi chuyển hàng lỗi để xử lý riêng.
- Chống xử lý trùng ở mức công việc và mức nghiệp vụ.
- Không để một công việc gây ghi sổ cái hai lần.
- Mọi quyết định điều chỉnh sau đối soát phải có nhật ký kiểm toán.

## 12.3 Chốt số liệu và kết chuyển tài chính

- Chỉ dữ liệu đã chốt mới được kết chuyển vào sổ cái.
- Kết chuyển phải có khóa nghiệp vụ duy nhất theo kỳ và đối tượng.
- Điều chỉnh sau chốt phải là bút toán điều chỉnh, không sửa trực tiếp bản ghi sổ cái cũ.
- Có cảnh báo nếu chênh lệch giữa số liệu tạm thời và đã chốt vượt ngưỡng cấu hình theo TL17.

---

## 13. Yêu cầu bảo mật cho vận hành, nhật ký và giám sát

## 13.1 Nguồn chân lý vận hành

- **TL18** là tài liệu chuẩn về nhật ký, giám sát và cảnh báo.
- TL19 bổ sung các ràng buộc bảo mật trong việc thu thập, lưu, truy cập và phản ứng.

## 13.2 Nhật ký kiểm toán bất biến

Bắt buộc áp dụng cho:
- duyệt nạp tiền
- duyệt hoặc từ chối rút tiền
- thay đổi giá theo lượt
- thay đổi ngưỡng rút
- thay đổi cấu hình ngân hàng và ví USDT
- quyết định kiểm tra thủ công sự kiện lượt
- thay đổi quyền người dùng
- mở rộng xem dữ liệu nhạy cảm nếu có chức năng này

### Trường tối thiểu
- thời gian
- người thao tác
- vai trò
- hành động
- thực thể
- mã thực thể
- trạng thái trước
- trạng thái sau
- lý do
- mã yêu cầu
- kết quả thành công hoặc thất bại

## 13.3 Bảo vệ hệ thống nhật ký

- Chỉ nhóm vận hành và quản trị phù hợp mới đọc được nhật ký nhạy cảm.
- Không cho xóa cứng nhật ký kiểm toán qua giao diện.
- Nhật ký xuất ra ngoài phải che dữ liệu nhạy cảm.
- Tất cả truy cập vào nhật ký nhạy cảm phải được ghi lại.

## 13.4 Cảnh báo bảo mật trọng yếu

Phải có cảnh báo ít nhất cho:
- nhiều lần đăng nhập thất bại
- tăng đột biến tạo hóa đơn nạp hoặc yêu cầu rút
- thay đổi cấu hình thanh toán
- tăng đột biến sự kiện lượt bị loại
- chênh lệch đối soát vượt ngưỡng
- lỗi hàng đợi xử lý nền kéo dài
- truy cập trái phép vào đường dẫn quản trị

---

## 14. Yêu cầu bảo mật cấu hình và thay đổi cấu hình

## 14.1 Nguồn chân lý cấu hình

- **TL17** là tài liệu chuẩn về cấu hình hệ thống và tham số vận hành.

## 14.2 Ràng buộc bảo mật khi thay đổi cấu hình

- cấu hình nhạy cảm phải có duyệt trước khi xuất bản
- thay đổi phải lưu lịch sử phiên bản
- ghi nhật ký kiểm toán đầy đủ
- có kiểm tra xung đột và chồng chéo hiệu lực
- có khả năng hoàn tác an toàn
- thông báo cảnh báo sau khi xuất bản cấu hình quan trọng

## 14.3 Cấu hình nhạy cảm ưu tiên cao

- giá theo lượt
- khuyến mãi nạp tiền
- ngưỡng rút tiền
- tài khoản ngân hàng hệ thống
- ví USDT hệ thống
- tham số chống gian lận
- ngưỡng cảnh báo đối soát
- tham số giới hạn tần suất đăng nhập và thao tác nhạy cảm

---

## 15. Sao lưu, khôi phục và liên tục dịch vụ

## 15.1 Mục tiêu

Đảm bảo hệ thống có thể khôi phục dữ liệu và vận hành lại khi xảy ra sự cố mà không phá vỡ tính nhất quán của:

- sổ cái giao dịch
- trạng thái nạp/rút
- sự kiện lượt đã chốt
- doanh thu đã kết chuyển
- nhật ký kiểm toán

## 15.2 Yêu cầu sao lưu

- Sao lưu cơ sở dữ liệu theo lịch định kỳ.
- Sao lưu kho tệp chứng từ theo lịch định kỳ.
- Sao lưu cấu hình hệ thống và tham số theo phiên bản.
- Có kiểm tra tính dùng được của bản sao lưu, không chỉ kiểm tra việc tạo tệp sao lưu.

## 15.3 Yêu cầu khôi phục

- Có quy trình khôi phục thử nghiệm định kỳ.
- Khôi phục phải kiểm tra lại:
  - số dư ví và sổ cái
  - trạng thái giao dịch tài chính
  - tính toàn vẹn khóa nghiệp vụ chống trùng
  - liên kết giữa chứng từ và bản ghi nghiệp vụ
- Sau khôi phục phải ghi nhận sự kiện vận hành và mở cảnh báo giám sát tăng cường theo TL18.

## 15.4 Chế độ suy giảm an toàn

Khi thành phần phụ lỗi:
- Nếu dịch vụ tổng hợp chậm, không được làm sai sổ cái.
- Nếu dịch vụ cảnh báo lỗi, vẫn phải lưu được nhật ký cục bộ hoặc hàng đợi tạm.
- Nếu cổng xác minh truy cập lỗi, cổng chuyển hướng công khai phải có chiến lược xử lý theo cấu hình, không để lộ thông tin nội bộ.

---

## 16. Ứng phó sự cố an toàn thông tin

## 16.1 Phân loại sự cố

### Mức 1 — Thấp
- lỗi cấu hình không ảnh hưởng dữ liệu nhạy cảm
- cảnh báo giả, không ảnh hưởng giao dịch

### Mức 2 — Trung bình
- tăng bất thường đăng nhập thất bại
- lỗi hàng đợi làm chậm xử lý nhưng chưa gây sai lệch tài chính

### Mức 3 — Cao
- truy cập trái phép vào tài khoản quản trị
- thay đổi cấu hình thanh toán trái phép
- nghi ngờ xử lý trùng giao dịch tài chính
- rò rỉ dữ liệu nhạy cảm mức A hoặc B

### Mức 4 — Nghiêm trọng
- mất tính toàn vẹn sổ cái
- mất dữ liệu nhật ký kiểm toán
- xâm nhập diện rộng ảnh hưởng nhiều thành phần

## 16.2 Quy trình ứng phó tối thiểu

1. **Phát hiện**
   - từ cảnh báo TL18 hoặc báo cáo nội bộ

2. **Xác nhận**
   - kiểm tra nhanh phạm vi ảnh hưởng

3. **Cô lập**
   - khóa tài khoản, vô hiệu hóa đường dẫn, tạm dừng cấu hình, giới hạn truy cập, chuyển chế độ chỉ đọc khi cần

4. **Khắc phục tạm thời**
   - ngăn tác động lan rộng

5. **Điều tra**
   - dùng nhật ký, truy vết, đối chiếu sổ cái, đối soát sự kiện

6. **Khôi phục**
   - phục hồi dịch vụ an toàn, xác minh dữ liệu

7. **Hậu kiểm**
   - lập báo cáo sự cố
   - cập nhật cấu hình, cảnh báo, quy trình nếu cần

## 16.3 Ràng buộc quan trọng

- Không xóa hoặc chỉnh sửa nhật ký kiểm toán để “dọn sạch dấu vết”.
- Không sửa tay sổ cái để “chữa nhanh”.
- Mọi điều chỉnh sau sự cố phải đi qua bút toán điều chỉnh và nhật ký.

---

## 17. Yêu cầu bảo mật trong phát triển và triển khai

## 17.1 Yêu cầu trong phát triển

- Phân tách môi trường phát triển, kiểm thử, vận hành.
- Không dùng dữ liệu thật mức nhạy cảm trong môi trường phát triển nếu chưa che dữ liệu.
- Có kiểm tra mã nguồn tự động cho lỗi phổ biến.
- Có kiểm tra phụ thuộc thư viện định kỳ.
- Không ghi khóa bí mật vào kho mã.

## 17.2 Yêu cầu triển khai

- Triển khai bằng quy trình có kiểm soát thay đổi.
- Ghi nhận phiên bản ứng dụng, phiên bản cấu hình được triển khai.
- Có khả năng hoàn tác phiên bản.
- Hạn chế truy cập trực tiếp máy chủ vận hành.
- Mọi thao tác quản trị hạ tầng quan trọng phải có nhật ký.

## 17.3 Kiểm thử an toàn tối thiểu trước phát hành

- kiểm tra phân quyền theo vai trò và phạm vi dữ liệu
- kiểm tra quyền theo trạng thái nghiệp vụ
- kiểm tra chống xử lý trùng nạp/rút
- kiểm tra chống xử lý trùng sự kiện và kết chuyển
- kiểm tra che dữ liệu nhạy cảm trên màn hình hỗ trợ
- kiểm tra nhật ký kiểm toán cho thao tác nhạy cảm
- kiểm tra giới hạn tần suất đăng nhập và đường dẫn công khai

---

## 18. Ma trận truy vết yêu cầu bảo mật với tài liệu trước

## 18.1 Truy vết theo nghiệp vụ

- **TL08, TL09**
  - yêu cầu chống xử lý trùng, khóa tạm số dư, nhật ký kiểm toán tài chính

- **TL10**
  - quyền theo trạng thái chiến dịch, trừ tiền theo lượt hợp lệ an toàn

- **TL11**
  - trạng thái liên kết, doanh thu tạm thời và đã chốt, kết chuyển vào ví

- **TL12**
  - định nghĩa lượt hợp lệ, đánh giá nhiều lớp, kiểm tra thủ công

- **TL16**
  - xử lý nền, tổng hợp, đối soát, chống trùng nhiều lớp

## 18.2 Truy vết theo dữ liệu và mã chuẩn

- **TL13**
  - bảng, cột, khóa, ràng buộc dữ liệu

- **TL14**
  - mã trạng thái, mã lỗi, danh mục mã dùng chung

- **TL15**
  - giao diện lập trình, xác thực, phân quyền, khuôn lỗi

- **TL17**
  - vòng đời cấu hình và tham số vận hành

- **TL18**
  - nhật ký, giám sát, cảnh báo, truy vết

---

## 19. Đề xuất bổ sung dữ liệu hỗ trợ bảo mật (không tự động sửa TL13)

> Mục này là đề xuất để dùng khi làm các tài liệu và triển khai tiếp theo. Không coi là thay thế TL13 nếu chưa cập nhật chính thức.

## 19.1 Bảng sự kiện bảo mật
Mục đích:
- lưu sự kiện bảo mật mức ứng dụng phục vụ điều tra và cảnh báo

Trường đề xuất:
- mã
- thời gian
- loại sự kiện bảo mật
- mức độ
- mã người dùng
- vai trò
- địa chỉ mạng băm
- dấu vết thiết bị
- mã yêu cầu
- thực thể liên quan
- chi tiết đã che
- trạng thái xử lý
- người xử lý
- thời gian xử lý

## 19.2 Bảng lịch sử thay đổi quyền
Mục đích:
- truy vết thay đổi vai trò và quyền theo người dùng

Trường đề xuất:
- mã
- mã người dùng
- thay đổi trước
- thay đổi sau
- lý do
- người thao tác
- thời gian
- mã yêu cầu

## 19.3 Bảng thu hồi phiên
Mục đích:
- quản lý chủ động vô hiệu hóa phiên khi có sự cố

Trường đề xuất:
- mã phiên hoặc dấu vết phiên
- mã người dùng
- lý do thu hồi
- người thao tác hoặc nguồn tự động
- thời gian thu hồi
- thời gian hết hiệu lực

---

## 20. Tiêu chí chấp nhận tài liệu TL19

TL19 được coi là đạt khi thỏa các điều kiện sau:

1. **Nhất quán với TL03**
   - không tạo vai trò mới ngoài bộ đã chốt nếu không ghi rõ là đề xuất
   - không mâu thuẫn phân quyền

2. **Nhất quán với TL08–TL12**
   - không thay đổi luồng nghiệp vụ nạp/rút/chiến dịch/liên kết/lượt hợp lệ
   - chỉ bổ sung ràng buộc bảo mật

3. **Nhất quán với TL13–TL15**
   - không đổi tên bảng, trường, mã trạng thái, mã lỗi đã chốt
   - chỉ quy định cách bảo vệ và sử dụng an toàn

4. **Nhất quán với TL17–TL18**
   - dùng đúng nguyên tắc cấu hình và nhật ký, giám sát, cảnh báo

5. **Có khả năng triển khai**
   - nêu rõ yêu cầu bắt buộc, khuyến nghị, và đề xuất
   - tránh mô tả mơ hồ không kiểm thử được

---

## 21. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không mâu thuẫn vai trò và phân quyền trong TL03
- [x] Không mâu thuẫn trạng thái nghiệp vụ trong TL02 và TL14
- [x] Không mâu thuẫn quy trình nạp/rút trong TL08, TL09
- [x] Không mâu thuẫn khái niệm lượt hợp lệ trong TL12
- [x] Không mâu thuẫn chống trùng và đối soát trong TL16
- [x] Không mâu thuẫn vòng đời cấu hình trong TL17
- [x] Không mâu thuẫn chuẩn nhật ký và cảnh báo trong TL18
- [x] Phân biệt rõ yêu cầu bắt buộc và đề xuất bổ sung

---

## 22. Đầu vào cho tài liệu tiếp theo

TL19 là đầu vào trực tiếp cho các tài liệu ưu tiên tiếp theo:

- **TL20 — Đặc tả màn hình và trải nghiệm người dùng**
  - ràng buộc che dữ liệu nhạy cảm
  - thông báo lỗi an toàn
  - xác thực bổ sung cho thao tác nhạy cảm

- **TL21 — Đặc tả kiểm thử chấp nhận**
  - kịch bản bảo mật, phân quyền, chống trùng, nhật ký kiểm toán

- **TL22 — Đặc tả vận hành, triển khai và ứng cứu sự cố**
  - quy trình vận hành an toàn, sao lưu khôi phục, phản ứng sự cố

- **TL23 — Điều khoản sử dụng, chính sách nội bộ và tuân thủ hiển thị**
  - ràng buộc hiển thị, xử lý dữ liệu, quyền và trách nhiệm người dùng

---

## 23. Ghi chú cuối tài liệu

- TL19 tập trung vào **an toàn hệ thống và bảo mật triển khai** cho nền tảng hợp lệ theo phạm vi đã chốt trong TL01 và TL02.
- TL19 **không** bổ sung hay mô tả các cơ chế nhằm né phát hiện, vượt xác minh hoặc thao túng hệ thống bên thứ ba.
- Mọi thay đổi nghiệp vụ phát sinh sau này phải cập nhật ở tài liệu nghiệp vụ nguồn trước, sau đó mới cập nhật lại TL19 để giữ tính nhất quán toàn bộ bộ tài liệu.
