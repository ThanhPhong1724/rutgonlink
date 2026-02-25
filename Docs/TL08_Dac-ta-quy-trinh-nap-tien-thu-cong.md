# Tài liệu 08 — Đặc tả quy trình nạp tiền thủ công

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL08
- **Tên tài liệu:** Đặc tả quy trình nạp tiền thủ công
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03
- **Tài liệu đầu ra phụ thuộc trực tiếp:** TL04, TL06, TL13, TL15, TL17, TL18, TL19, TL21

---

## 2. Mục tiêu tài liệu

Tài liệu này đặc tả chi tiết quy trình nạp tiền thủ công cho **khách hàng mua chiến dịch** trong giai đoạn đầu của dự án, bao gồm:

- tạo hóa đơn nạp tiền,
- hiển thị hướng dẫn thanh toán theo phương thức,
- tải chứng từ thanh toán,
- duyệt hoặc từ chối nạp tiền,
- cộng số dư và ghi sổ cái,
- chống cộng tiền trùng,
- xử lý ngoại lệ và nhật ký bắt buộc.

Tài liệu này là chuẩn nghiệp vụ để đội phát triển và trợ lý lập trình triển khai thống nhất, không mơ hồ về:

- vai trò nào được thao tác,
- trạng thái nào cho phép thao tác,
- khi nào được cộng tiền,
- dữ liệu nào phải lưu dấu vết,
- cách xử lý tình huống lệch chuẩn.

---

## 3. Phạm vi của TL08

### 3.1 Trong phạm vi

- Nạp tiền thủ công bằng **chuyển khoản ngân hàng Việt Nam**
- Nạp tiền thủ công bằng **USDT** qua hiển thị địa chỉ ví và ảnh mã
- Tạo hóa đơn nạp
- Tải chứng từ nạp
- Duyệt hoặc từ chối hóa đơn nạp
- Ghi sổ cái và cập nhật số dư khi duyệt thành công
- Nhật ký quản trị và nhật ký thao tác người dùng liên quan nạp tiền
- Thông báo trạng thái nạp tiền cho người dùng
- Trạng thái hóa đơn nạp theo chuẩn TL02 mục 13.2
- Ràng buộc quyền theo TL03 mục 11.1

### 3.2 Ngoài phạm vi

- Tích hợp tự động với cổng thanh toán ngân hàng
- Tự động quét sao kê ngân hàng
- Tự động xác minh giao dịch trên chuỗi khối
- Quy trình rút tiền thủ công (thuộc TL09)
- Đặc tả giao diện màn hình chi tiết (thuộc TL04 và TL06)
- Đặc tả chi tiết cấu trúc bảng dữ liệu cấp cột (thuộc TL13)
- Mã lỗi và trạng thái hiển thị chuẩn hóa cấp hệ thống (thuộc TL14)

---

## 4. Truy vết sang tài liệu trước

## 4.1 Truy vết chức năng nghiệp vụ TL02

TL08 chi tiết hóa các chức năng sau trong TL02:

- **NV09** — Tạo yêu cầu nạp tiền thủ công
- **NV10** — Tải chứng từ nạp tiền
- **NV11** — Duyệt hoặc từ chối nạp tiền
- **NV15** — Cấu hình phương thức nạp và rút hiển thị cho người dùng (phần tiêu thụ cấu hình tại quy trình nạp)
- **NV34** — Quản lý khuyến mãi nạp tiền (phần áp dụng và chụp cấu hình vào hóa đơn)
- **NV35** — Quản lý tài khoản ngân hàng hiển thị (phần tiêu thụ cấu hình)
- **NV36** — Quản lý ví USDT hiển thị (phần tiêu thụ cấu hình)
- **NV39** — Nhật ký quản trị (phần bắt buộc khi duyệt hoặc từ chối)

## 4.2 Truy vết vai trò và phân quyền TL03

TL08 tuân thủ các ràng buộc chính trong TL03:

- **R10** được tạo hóa đơn nạp và tải chứng từ trên dữ liệu sở hữu
- **R30** được duyệt hoặc từ chối nạp tiền
- **R40** chỉ được xem trạng thái phục vụ hỗ trợ, không duyệt
- Bảng quyền theo trạng thái hóa đơn nạp tham chiếu TL03 mục 11.1
- Duyệt tay ngoại lệ phải có lý do theo TL03 mục 13.2

---

## 5. Tác nhân tham gia quy trình

### 5.1 R10 — Khách hàng mua chiến dịch

Vai trò nghiệp vụ:
- tạo hóa đơn nạp
- xem hướng dẫn thanh toán
- tải chứng từ thanh toán
- theo dõi trạng thái hóa đơn
- hủy hóa đơn trong trạng thái cho phép

### 5.2 R30 — Quản trị viên

Vai trò nghiệp vụ:
- tiếp nhận hồ sơ nạp tiền chờ duyệt
- đối chiếu chứng từ và thông tin thanh toán
- duyệt hoặc từ chối hóa đơn
- ghi chú lý do xử lý, đặc biệt với ngoại lệ
- kích hoạt cộng tiền thông qua nghiệp vụ duyệt thành công

### 5.3 R40 — Nhân viên hỗ trợ

Vai trò nghiệp vụ:
- tra cứu trạng thái hóa đơn nạp để hỗ trợ người dùng
- xem danh sách hóa đơn và thông tin cơ bản theo quyền che dữ liệu
- không được duyệt hoặc từ chối
- không được xem đầy đủ ảnh chứng từ theo mặc định (tham chiếu TL03)

### 5.4 Dịch vụ nền hệ thống

Vai trò kỹ thuật nghiệp vụ:
- sinh mã hóa đơn và nội dung tham chiếu
- kiểm tra hết hạn hóa đơn
- chuyển trạng thái tự động khi hết hạn
- ghi nhật ký hệ thống
- gửi thông báo trạng thái
- ghi sổ cái và cập nhật số dư theo lệnh nghiệp vụ duyệt thành công

---

## 6. Thuật ngữ và định nghĩa dùng trong TL08

### 6.1 Hóa đơn nạp

Bản ghi nghiệp vụ đại diện cho một yêu cầu nạp tiền thủ công của R10. Hóa đơn có mã duy nhất, phương thức, số tiền, trạng thái, thời hạn hiệu lực và dữ liệu chụp cấu hình tại thời điểm tạo.

### 6.2 Chứng từ nạp

Tệp bằng chứng do người dùng tải lên để chứng minh đã thanh toán, có thể là ảnh chụp chuyển khoản hoặc ảnh chụp giao dịch USDT.

### 6.3 Duyệt tay ngoại lệ

Trường hợp quản trị viên duyệt thành công dù thông tin không khớp hoàn toàn theo tiêu chí chuẩn, nhưng đã đối chiếu được bằng nguồn chứng cứ khác. Trường hợp này bắt buộc có lý do và nhật ký rõ ràng.

### 6.4 Chụp cấu hình tại thời điểm tạo hóa đơn

Việc lưu lại bản sao dữ liệu cấu hình hiển thị tại thời điểm tạo hóa đơn, gồm:
- tài khoản ngân hàng hoặc ví USDT hiển thị,
- nội dung tham chiếu,
- quy tắc khuyến mãi áp dụng,
- cảnh báo phương thức.

Mục đích là tránh lệch kết quả khi quản trị thay đổi cấu hình sau đó.

### 6.5 Bút toán cộng tiền nạp

Bản ghi sổ cái phát sinh khi hóa đơn được duyệt thành công, làm tăng số dư khả dụng của ví khách hàng mua chiến dịch.

---

## 7. Phương thức nạp tiền hỗ trợ trong phiên bản đầu

## 7.1 Chuyển khoản ngân hàng Việt Nam

Hệ thống hiển thị cho người dùng:
- tên ngân hàng
- số tài khoản
- tên chủ tài khoản
- nội dung chuyển khoản tham chiếu
- ảnh mã chuyển khoản
- thời hạn hóa đơn
- cảnh báo về nội dung chuyển khoản cần nhập đúng

## 7.2 USDT thủ công

Hệ thống hiển thị cho người dùng:
- tên hiển thị ví
- mạng chuỗi khối
- địa chỉ ví
- ảnh mã ví
- hướng dẫn nhập đúng mạng
- cảnh báo sai mạng có thể mất tài sản
- thời hạn hóa đơn

### 7.2.1 Quy định riêng cho USDT thủ công

- Hệ thống chỉ **hiển thị thông tin ví** và nhận chứng từ thủ công.
- Không coi giao dịch là thành công cho tới khi R30 duyệt.
- Nên cho phép người dùng nhập thêm mã giao dịch để hỗ trợ đối chiếu, nhưng không bắt buộc trong phiên bản đầu nếu chưa ổn định trải nghiệm.

---

## 8. Dữ liệu đầu vào và đầu ra nghiệp vụ

## 8.1 Đầu vào khi tạo hóa đơn nạp (R10)

Bắt buộc:
- số tiền yêu cầu nạp
- phương thức nạp

Khuyến nghị cho phiên bản đầu:
- đơn vị tiền hiển thị theo hệ thống (nếu chỉ một đơn vị thì tự gán)
- ghi chú người dùng (không bắt buộc)

## 8.2 Đầu ra sau khi tạo hóa đơn

- mã hóa đơn nạp
- trạng thái hóa đơn ban đầu
- thời điểm hết hạn
- thông tin thanh toán hiển thị đã chụp cấu hình
- nội dung tham chiếu giao dịch
- thông tin khuyến mãi áp dụng tại thời điểm tạo (nếu có)
- hướng dẫn thao tác tiếp theo

## 8.3 Đầu vào khi tải chứng từ nạp (R10)

Bắt buộc:
- tệp chứng từ

Tùy chọn theo phương thức:
- mã giao dịch do người dùng khai báo (đặc biệt hữu ích cho USDT)
- ghi chú bổ sung

## 8.4 Đầu vào khi R30 duyệt hoặc từ chối

Bắt buộc:
- quyết định xử lý: duyệt hoặc từ chối
- lý do xử lý đối với trường hợp từ chối

Bắt buộc trong một số trường hợp:
- lý do duyệt tay ngoại lệ
- ghi chú đối chiếu
- bằng chứng xử lý nội bộ (nếu quy trình vận hành yêu cầu)

## 8.5 Đầu ra khi duyệt thành công

- hóa đơn chuyển trạng thái **thành công**
- bút toán sổ cái cộng tiền được tạo
- số dư ví được cập nhật
- nhật ký quản trị được ghi
- thông báo gửi cho R10

## 8.6 Đầu ra khi từ chối

- hóa đơn chuyển trạng thái **từ chối**
- lý do từ chối được lưu
- nhật ký quản trị được ghi
- thông báo gửi cho R10
- không tạo bút toán cộng tiền

---

## 9. Trạng thái hóa đơn nạp và chuyển trạng thái

## 9.1 Danh sách trạng thái chuẩn (tham chiếu TL02 mục 13.2)

- mới tạo
- chờ thanh toán
- chờ chứng từ
- chờ duyệt
- đang kiểm tra
- thành công
- từ chối
- hết hạn
- đã hủy

## 9.2 Trạng thái khởi tạo theo quy trình chuẩn hóa của TL08

Để tránh mơ hồ khi triển khai, TL08 chốt luồng mặc định như sau:

- Sau khi R10 tạo hóa đơn thành công, hệ thống đặt trạng thái là **chờ thanh toán**.
- Khi R10 xác nhận đã chuyển tiền hoặc tải chứng từ đầu tiên, hệ thống chuyển sang:
  - **chờ chứng từ** nếu chưa có tệp chứng từ hợp lệ,
  - **chờ duyệt** nếu đã có chứng từ hợp lệ và đủ dữ liệu tối thiểu.

> Ghi chú triển khai: Một số giao diện có thể cho phép tải chứng từ ngay khi còn ở trạng thái **chờ thanh toán**. Điều này vẫn hợp lệ nếu chuyển trạng thái đúng theo bảng chuyển trạng thái bên dưới và phù hợp TL03 mục 11.1.

## 9.3 Bảng chuyển trạng thái chuẩn

| Trạng thái hiện tại | Tác nhân | Sự kiện | Trạng thái kế tiếp | Bắt buộc ghi chú | Ghi chú triển khai |
|---|---|---|---|---:|---|
| mới tạo | Hệ thống | Hoàn tất sinh hướng dẫn thanh toán | chờ thanh toán | ✖ | Có thể bỏ qua trạng thái này nếu hệ thống tạo rất nhanh, nhưng vẫn nên lưu để truy vết |
| chờ thanh toán | R10 | Tải chứng từ hợp lệ | chờ duyệt | ✖ | Trường hợp giao diện cho tải trực tiếp |
| chờ thanh toán | R10 | Xác nhận đã thanh toán nhưng chưa tải chứng từ | chờ chứng từ | ✖ | Nếu giao diện có nút xác nhận riêng |
| chờ thanh toán | R10 | Hủy hóa đơn | đã hủy | ✖ | Chỉ trong thời hạn và chưa vào xử lý |
| chờ thanh toán | Hệ thống | Hết thời hạn | hết hạn | ✖ | Tác vụ nền quét định kỳ |
| chờ chứng từ | R10 | Tải chứng từ hợp lệ | chờ duyệt | ✖ | |
| chờ chứng từ | R10 | Hủy hóa đơn | đã hủy | ✖ | Chỉ khi chưa vào xử lý |
| chờ chứng từ | Hệ thống | Hết thời hạn | hết hạn | ✖ | |
| chờ duyệt | R30 | Nhận xử lý hồ sơ | đang kiểm tra | ✖ | Nên dùng để tránh hai quản trị xử lý cùng lúc |
| chờ duyệt | R10 | Cập nhật lại chứng từ (nếu cấu hình cho phép) | chờ duyệt | ✖ | Lưu lịch sử chứng từ |
| chờ duyệt | R30 | Duyệt thành công | thành công | △ | Bắt buộc lý do nếu duyệt tay ngoại lệ |
| chờ duyệt | R30 | Từ chối | từ chối | ✔ | |
| đang kiểm tra | R30 | Duyệt thành công | thành công | △ | Bắt buộc lý do nếu duyệt tay ngoại lệ |
| đang kiểm tra | R30 | Trả về chờ duyệt để bổ sung chứng từ | chờ duyệt | ✔ | Ghi rõ yêu cầu bổ sung |
| đang kiểm tra | R30 | Từ chối | từ chối | ✔ | |
| thành công | Bất kỳ | Mọi thao tác sửa | thành công | ✖ | Trạng thái chốt, cấm sửa nội dung tài chính |
| từ chối | Bất kỳ | Mọi thao tác sửa | từ chối | ✖ | Người dùng tạo hóa đơn mới nếu cần |
| hết hạn | Bất kỳ | Mọi thao tác xử lý chính | hết hạn | ✖ | Chỉ cho phép tra cứu |
| đã hủy | Bất kỳ | Mọi thao tác xử lý chính | đã hủy | ✖ | Chỉ cho phép tra cứu |

## 9.4 Quyền theo trạng thái (tóm tắt, bám TL03 mục 11.1)

| Trạng thái | R10 tạo/chỉnh | R10 tải chứng từ | R10 hủy | R30 duyệt/từ chối |
|---|---:|---:|---:|---:|
| mới tạo | ✔ | ✖ | ✔ | ✖ |
| chờ thanh toán | ✖ | △ | ✔ | ✖ |
| chờ chứng từ | ✖ | ✔ | ✔ | ✖ |
| chờ duyệt | ✖ | △ | ✖ | ✔ |
| đang kiểm tra | ✖ | ✖ | ✖ | ✔ |
| thành công | ✖ | ✖ | ✖ | ✖ |
| từ chối | ✖ | ✖ | ✖ | ✖ |
| hết hạn | ✖ | ✖ | ✖ | ✖ |
| đã hủy | ✖ | ✖ | ✖ | ✖ |

---

## 10. Quy trình nghiệp vụ chi tiết

## 10.1 Quy trình QN01 — Tạo hóa đơn nạp tiền

### Mục tiêu
Cho phép R10 tạo một hóa đơn nạp tiền hợp lệ để nhận hướng dẫn thanh toán và tiếp tục tải chứng từ.

### Tác nhân
- Chính: R10
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Tài khoản R10 đang hoạt động
- R10 đã đăng nhập
- Phương thức nạp tương ứng đang được bật trong cấu hình hệ thống

### Hậu điều kiện thành công
- Tạo được hóa đơn nạp có mã duy nhất
- Hóa đơn ở trạng thái **chờ thanh toán** (hoặc **mới tạo** rồi chuyển ngay sang **chờ thanh toán**)
- Dữ liệu cấu hình hiển thị và khuyến mãi được chụp vào hóa đơn
- Nhật ký tạo hóa đơn được ghi

### Luồng chuẩn
1. R10 mở màn hình nạp tiền.
2. Hệ thống tải danh sách phương thức đang bật từ cấu hình (ngân hàng, USDT).
3. R10 chọn phương thức và nhập số tiền muốn nạp.
4. Hệ thống kiểm tra hợp lệ đầu vào.
5. Hệ thống xác định khuyến mãi áp dụng (nếu có) theo cấu hình hiện hành.
6. Hệ thống sinh mã hóa đơn duy nhất.
7. Hệ thống sinh nội dung tham chiếu giao dịch.
8. Hệ thống chụp cấu hình phương thức thanh toán hiển thị tại thời điểm tạo.
9. Hệ thống đặt thời điểm hết hạn cho hóa đơn.
10. Hệ thống lưu hóa đơn nạp và bản chụp cấu hình.
11. Hệ thống trả thông tin hướng dẫn thanh toán cho R10.
12. Hệ thống ghi nhật ký tạo hóa đơn.

### Kiểm tra hợp lệ bắt buộc
- số tiền nạp phải lớn hơn 0
- số tiền nạp nằm trong khoảng cho phép theo cấu hình (nếu có giới hạn)
- phương thức nạp phải đang bật
- cấu hình phương thức phải đủ dữ liệu hiển thị (ví dụ thiếu số tài khoản hoặc địa chỉ ví thì không cho tạo)

### Ngoại lệ
- Cấu hình phương thức bị tắt ngay trước lúc tạo: từ chối tạo và yêu cầu tải lại màn hình.
- Thiếu cấu hình hiển thị của phương thức: từ chối tạo, ghi cảnh báo vận hành.
- Sinh mã hóa đơn trùng: hệ thống sinh lại mã, nếu vẫn lỗi thì từ chối tạo và ghi nhật ký lỗi.

---

## 10.2 Quy trình QN02 — Tải chứng từ nạp tiền

### Mục tiêu
Cho phép R10 tải bằng chứng thanh toán cho hóa đơn nạp đang ở trạng thái cho phép.

### Tác nhân
- Chính: R10
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Hóa đơn thuộc quyền sở hữu của R10
- Hóa đơn đang ở trạng thái cho phép tải chứng từ theo TL03 mục 11.1
- Hóa đơn chưa hết hạn hoặc chưa ở trạng thái chốt

### Hậu điều kiện thành công
- Chứng từ được lưu thành công
- Hóa đơn chuyển đúng trạng thái kế tiếp theo bảng chuyển trạng thái
- Lưu lịch sử tải chứng từ
- Gửi thông báo nội bộ cho hàng chờ duyệt nếu cần

### Luồng chuẩn
1. R10 mở chi tiết hóa đơn nạp.
2. Hệ thống kiểm tra quyền và trạng thái hóa đơn.
3. R10 tải tệp chứng từ và nhập dữ liệu bổ sung (nếu có).
4. Hệ thống kiểm tra loại tệp và kích thước.
5. Hệ thống lưu tệp vào kho tệp bảo vệ.
6. Hệ thống tạo bản ghi chứng từ nạp.
7. Hệ thống ghi nhật ký tải chứng từ.
8. Hệ thống cập nhật trạng thái hóa đơn:
   - từ **chờ thanh toán** sang **chờ duyệt**, hoặc
   - từ **chờ chứng từ** sang **chờ duyệt**.
9. Hệ thống hiển thị trạng thái cập nhật cho R10.

### Quy tắc nghiệp vụ bổ sung
- Có thể cho phép tải nhiều chứng từ trước khi duyệt theo cấu hình.
- Nếu cho phép thay chứng từ ở trạng thái **chờ duyệt**, phải lưu lịch sử bản cũ và không ghi đè mất dấu vết.
- Không cho phép xóa vật lý chứng từ đã tải; chỉ đánh dấu bản mới nhất để sử dụng khi duyệt.

### Ngoại lệ
- Tệp không hợp lệ: từ chối và hiển thị lý do.
- Hóa đơn vừa chuyển sang **đang kiểm tra** trong lúc tải: từ chối cập nhật, yêu cầu tải lại.
- Hóa đơn hết hạn trong lúc tải: từ chối, giữ trạng thái **hết hạn**.

---

## 10.3 Quy trình QN03 — Quản trị viên nhận xử lý hồ sơ nạp

### Mục tiêu
Đưa hóa đơn từ hàng chờ duyệt vào trạng thái xử lý để tránh nhiều quản trị viên xử lý trùng.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Hóa đơn ở trạng thái **chờ duyệt**
- R30 có quyền duyệt nạp tiền

### Hậu điều kiện thành công
- Hóa đơn chuyển sang **đang kiểm tra**
- Ghi nhận người nhận xử lý và thời điểm nhận xử lý
- Ghi nhật ký quản trị

### Luồng chuẩn
1. R30 mở danh sách hóa đơn chờ duyệt.
2. R30 chọn một hóa đơn để xử lý.
3. Hệ thống khóa bản ghi ở mức giao dịch xử lý.
4. Hệ thống kiểm tra trạng thái hiện tại vẫn là **chờ duyệt**.
5. Hệ thống cập nhật sang **đang kiểm tra**.
6. Hệ thống lưu người nhận xử lý, thời điểm nhận xử lý.
7. Hệ thống ghi nhật ký quản trị.

### Ngoại lệ
- Hóa đơn đã được quản trị khác nhận xử lý trước: báo trạng thái mới và tải lại danh sách.
- Hóa đơn chuyển trạng thái khác trong lúc bấm xử lý: không cập nhật.

---

## 10.4 Quy trình QN04 — Duyệt nạp tiền thành công

### Mục tiêu
Cộng số dư cho R10 đúng một lần khi R30 xác minh thanh toán hợp lệ.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Hóa đơn ở trạng thái **chờ duyệt** hoặc **đang kiểm tra**
- R30 có quyền duyệt nạp tiền
- Hóa đơn chưa từng được duyệt thành công
- Chưa tồn tại bút toán cộng tiền thành công cho hóa đơn này

### Hậu điều kiện thành công
- Hóa đơn ở trạng thái **thành công**
- Tạo đúng một bút toán sổ cái cộng tiền
- Cập nhật số dư khả dụng ví của R10
- Ghi nhật ký quản trị và nhật ký hệ thống
- Gửi thông báo cho R10

### Luồng chuẩn
1. R30 mở chi tiết hóa đơn nạp.
2. Hệ thống kiểm tra quyền và trạng thái cho phép duyệt.
3. R30 đối chiếu chứng từ với dữ liệu hóa đơn và thông tin thanh toán.
4. R30 chọn thao tác duyệt thành công.
5. Hệ thống bắt đầu giao dịch nghiệp vụ nguyên tử.
6. Hệ thống khóa bản ghi hóa đơn nạp và ví người dùng.
7. Hệ thống kiểm tra lại điều kiện chống cộng trùng:
   - hóa đơn chưa ở trạng thái **thành công**,
   - chưa có bút toán sổ cái loại nạp tiền thành công tham chiếu hóa đơn này.
8. Hệ thống tính số tiền cộng vào ví:
   - số tiền cơ sở của hóa đơn,
   - cộng phần khuyến mãi chụp tại thời điểm tạo (nếu thỏa điều kiện và cấu hình áp dụng tại hóa đơn).
9. Hệ thống tạo bút toán sổ cái cộng tiền.
10. Hệ thống cập nhật số dư ví.
11. Hệ thống cập nhật trạng thái hóa đơn thành **thành công**.
12. Hệ thống lưu người duyệt, thời điểm duyệt, ghi chú xử lý.
13. Hệ thống ghi nhật ký quản trị.
14. Hệ thống hoàn tất giao dịch nghiệp vụ.
15. Hệ thống gửi thông báo thành công cho R10.

### Quy tắc nghiệp vụ bắt buộc
- Không duyệt hai lần cho cùng hóa đơn.
- Không cộng tiền trước khi duyệt.
- Bút toán và cập nhật trạng thái phải cùng một giao dịch nghiệp vụ để tránh lệch số dư.
- Nếu là duyệt tay ngoại lệ, bắt buộc có lý do.

### Ngoại lệ
- Phát hiện đã có bút toán trước đó: dừng xử lý, cảnh báo nguy cơ cộng trùng, ghi nhật ký.
- Lỗi khi ghi sổ cái hoặc cập nhật ví: hủy toàn bộ giao dịch nghiệp vụ, hóa đơn giữ trạng thái cũ, ghi lỗi vận hành.
- Hóa đơn đổi trạng thái trong lúc xử lý: dừng và yêu cầu tải lại.

---

## 10.5 Quy trình QN05 — Từ chối nạp tiền

### Mục tiêu
Đóng hóa đơn không hợp lệ mà không cộng số dư, đồng thời lưu lý do để người dùng và vận hành tra cứu.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Hóa đơn ở trạng thái **chờ duyệt** hoặc **đang kiểm tra**
- R30 có quyền từ chối nạp tiền

### Hậu điều kiện thành công
- Hóa đơn ở trạng thái **từ chối**
- Lý do từ chối được lưu
- Ghi nhật ký quản trị
- Gửi thông báo cho R10
- Không phát sinh bút toán cộng tiền

### Luồng chuẩn
1. R30 mở chi tiết hóa đơn nạp.
2. R30 chọn thao tác từ chối.
3. R30 nhập lý do từ chối.
4. Hệ thống kiểm tra lý do không rỗng.
5. Hệ thống cập nhật trạng thái hóa đơn thành **từ chối**.
6. Hệ thống lưu lý do, người xử lý, thời điểm xử lý.
7. Hệ thống ghi nhật ký quản trị.
8. Hệ thống gửi thông báo cho R10.

### Các nhóm lý do từ chối chuẩn hóa (khuyến nghị)
- chứng từ không rõ hoặc không đọc được
- số tiền trên chứng từ không khớp
- chứng từ không thuộc hóa đơn này
- quá hạn xử lý theo chính sách
- nghi ngờ gian lận
- phương thức hoặc mạng USDT không đúng theo hướng dẫn
- lý do khác (bắt buộc nhập mô tả)

---

## 10.6 Quy trình QN06 — Hủy hóa đơn nạp bởi R10

### Mục tiêu
Cho phép R10 đóng hóa đơn không còn nhu cầu trước khi vào xử lý.

### Tác nhân
- Chính: R10
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Hóa đơn thuộc R10
- Trạng thái thuộc nhóm cho phép hủy theo TL03 mục 11.1 (thường là **mới tạo**, **chờ thanh toán**, **chờ chứng từ**)

### Hậu điều kiện thành công
- Hóa đơn chuyển trạng thái **đã hủy**
- Ghi nhật ký thao tác người dùng
- Không phát sinh bút toán tài chính

### Luồng chuẩn
1. R10 mở chi tiết hóa đơn.
2. R10 chọn hủy hóa đơn.
3. Hệ thống kiểm tra quyền sở hữu và trạng thái.
4. Hệ thống cập nhật trạng thái **đã hủy**.
5. Hệ thống ghi nhật ký thao tác.
6. Hệ thống cập nhật giao diện danh sách.

---

## 10.7 Quy trình QN07 — Hết hạn hóa đơn nạp tự động

### Mục tiêu
Ngăn hóa đơn tồn đọng kéo dài gây nhầm lẫn đối soát và gian lận.

### Tác nhân
- Chính: Dịch vụ nền hệ thống

### Tiền điều kiện
- Hóa đơn chưa ở trạng thái chốt
- Đã vượt thời điểm hết hạn
- Trạng thái hiện tại thuộc nhóm cho phép hết hạn (thường là **chờ thanh toán**, **chờ chứng từ**)

### Hậu điều kiện thành công
- Hóa đơn chuyển trạng thái **hết hạn**
- Ghi nhật ký hệ thống
- Có thể gửi thông báo cho R10 theo cấu hình

### Luồng chuẩn
1. Tác vụ nền chạy theo chu kỳ.
2. Tìm các hóa đơn quá hạn ở trạng thái cho phép chuyển hết hạn.
3. Cập nhật trạng thái **hết hạn**.
4. Ghi nhật ký hệ thống và số lượng bản ghi đã xử lý.
5. Tùy cấu hình, gửi thông báo nhắc người dùng tạo hóa đơn mới nếu vẫn muốn nạp.

---

## 11. Quy tắc tính tiền và khuyến mãi nạp tiền

## 11.1 Nguyên tắc áp dụng khuyến mãi

- Khuyến mãi (nếu có) phải được **chụp tại thời điểm tạo hóa đơn**.
- Khi duyệt thành công, hệ thống tính khuyến mãi theo bản chụp của hóa đơn, không dùng cấu hình hiện hành nếu đã thay đổi.
- Nếu hóa đơn hết hạn hoặc bị hủy, không giữ hiệu lực khuyến mãi cho hóa đơn mới tạo sau đó.

## 11.2 Mô hình tính tiền cộng vào ví (chuẩn nghiệp vụ)

Số tiền cộng vào ví khi duyệt thành công gồm:

- **Tiền nạp cơ sở**: số tiền yêu cầu nạp trên hóa đơn
- **Tiền khuyến mãi**: tính theo bản chụp khuyến mãi của hóa đơn (nếu có và hóa đơn thỏa điều kiện)

Tổng tiền cộng = tiền nạp cơ sở + tiền khuyến mãi

> Ghi chú: Công thức chi tiết từng kiểu khuyến mãi và quy tắc làm tròn sẽ được khóa ở TL17 và TL14. TL08 chỉ chốt nguyên tắc áp dụng theo bản chụp hóa đơn.

## 11.3 Ràng buộc quan trọng

- Không cho khuyến mãi âm.
- Không cho cộng vượt quy tắc tối đa nếu cấu hình khuyến mãi có trần.
- Không áp dụng lại khuyến mãi khi xử lý điều chỉnh do lỗi vận hành; điều chỉnh phải theo quy trình riêng có nhật ký và bút toán bù.

---

## 12. Chống cộng tiền trùng và tính nguyên tử tài chính

Đây là mục bắt buộc ưu tiên cao vì liên quan trực tiếp đến tiền.

## 12.1 Rủi ro cần phòng ngừa

- Hai quản trị viên cùng duyệt một hóa đơn gần như đồng thời
- Bấm duyệt nhiều lần do mạng chậm
- Lỗi sau khi ghi sổ cái nhưng trước khi cập nhật giao diện
- Tác vụ lặp lại yêu cầu do trình duyệt gửi lại
- Xử lý ngoại lệ sai quy trình rồi cộng bù nhiều lần

## 12.2 Biện pháp nghiệp vụ và kỹ thuật bắt buộc

1. **Khóa bản ghi hóa đơn khi duyệt**
   - Khi R30 thực hiện duyệt, hệ thống phải khóa bản ghi hóa đơn trong giao dịch xử lý.

2. **Kiểm tra trạng thái lần cuối trong giao dịch**
   - Chỉ tiếp tục nếu trạng thái vẫn là **chờ duyệt** hoặc **đang kiểm tra**.

3. **Kiểm tra tồn tại bút toán tham chiếu hóa đơn**
   - Nếu đã có bút toán nạp thành công tham chiếu đúng mã hóa đơn thì dừng xử lý.

4. **Bút toán và cập nhật trạng thái phải cùng giao dịch**
   - Tạo bút toán, cập nhật số dư, cập nhật trạng thái hóa đơn phải thành một khối xử lý nguyên tử.

5. **Nhật ký quản trị bắt buộc**
   - Ghi rõ người duyệt, thời điểm, quyết định, lý do ngoại lệ nếu có.

6. **Điều chỉnh sai sót dùng bút toán bù**
   - Không sửa trực tiếp bút toán cũ, không sửa trực tiếp số dư.

## 12.3 Quy tắc phát hiện và cảnh báo nguy cơ cộng trùng

Hệ thống nên cảnh báo mạnh cho R30 nếu phát hiện một trong các dấu hiệu sau:

- hóa đơn đã ở trạng thái **thành công**
- đã có bút toán cộng tiền tham chiếu mã hóa đơn
- cùng chứng từ xuất hiện trên nhiều hóa đơn gần thời điểm nhau (phục vụ chống gian lận, không tự động kết luận)

---

## 13. Dữ liệu nghiệp vụ phải lưu để phục vụ đối soát và kiểm toán

## 13.1 Dữ liệu tối thiểu của hóa đơn nạp

- mã hóa đơn
- mã người dùng R10
- số tiền yêu cầu nạp
- đơn vị tiền
- phương thức nạp
- trạng thái hiện tại
- thời điểm tạo
- thời điểm hết hạn
- nội dung tham chiếu
- bản chụp cấu hình phương thức hiển thị
- bản chụp khuyến mãi áp dụng
- người duyệt (nếu có)
- thời điểm duyệt hoặc từ chối (nếu có)
- lý do từ chối hoặc ghi chú xử lý (nếu có)

## 13.2 Dữ liệu tối thiểu của chứng từ nạp

- mã chứng từ
- mã hóa đơn
- đường dẫn tệp
- loại tệp
- người tải
- thời điểm tải
- trạng thái hiệu lực của chứng từ trong hồ sơ (bản mới nhất hoặc lưu lịch sử)
- dữ liệu khai báo thêm của người dùng (nếu có, ví dụ mã giao dịch)

## 13.3 Dữ liệu tối thiểu của bút toán nạp thành công

- mã bút toán
- mã ví
- loại giao dịch nạp tiền
- mã tham chiếu hóa đơn nạp
- số tiền trước
- số tiền thay đổi
- số tiền sau
- tiền khuyến mãi tách riêng hoặc chi tiết thành phần (theo mô hình sổ cái chọn ở TL13)
- người tạo hoặc dịch vụ tạo
- thời điểm tạo

## 13.4 Dữ liệu nhật ký quản trị bắt buộc

- mã nhật ký
- người thao tác (R30)
- hành động (nhận xử lý, duyệt, từ chối, trả về chờ duyệt)
- đối tượng (hóa đơn nạp)
- mã đối tượng
- trạng thái trước
- trạng thái sau
- lý do hoặc ghi chú
- thời điểm thao tác
- địa chỉ truy cập hoặc dấu vết phiên (nếu có trong khung nhật ký hệ thống)

---

## 14. Che dữ liệu và quyền xem trong quy trình nạp tiền

## 14.1 Nguyên tắc chung

- R10 chỉ xem hóa đơn của chính mình.
- R30 xem đầy đủ để xử lý nghiệp vụ.
- R40 chỉ xem theo phạm vi hỗ trợ và bị che dữ liệu nhạy cảm theo TL03.

## 14.2 Dữ liệu cần che với R40 (mặc định)

- ảnh chứng từ nạp tiền: che hoặc không cho mở trực tiếp
- số tài khoản ngân hàng của người dùng nếu xuất hiện trong chứng từ
- thông tin nhạy cảm không cần thiết cho hỗ trợ

## 14.3 Dữ liệu hiển thị đủ cho R40 để hỗ trợ

- mã hóa đơn
- thời điểm tạo
- số tiền yêu cầu nạp
- phương thức nạp
- trạng thái hiện tại
- lý do từ chối (nếu có)
- thời điểm xử lý gần nhất

---

## 15. Thông báo và nhật ký trong quy trình nạp tiền

## 15.1 Sự kiện thông báo cho người dùng R10

Tối thiểu cần có các thông báo sau:

1. Tạo hóa đơn nạp thành công
2. Hóa đơn sắp hết hạn (tùy cấu hình)
3. Hóa đơn đã hết hạn
4. Chứng từ đã nhận và đang chờ duyệt
5. Hóa đơn được duyệt thành công, số dư đã cập nhật
6. Hóa đơn bị từ chối kèm lý do

## 15.2 Sự kiện nhật ký quản trị bắt buộc

- R30 nhận xử lý hồ sơ nạp
- R30 duyệt thành công hóa đơn nạp
- R30 từ chối hóa đơn nạp
- R30 duyệt tay ngoại lệ
- R30 trả hồ sơ về chờ duyệt để yêu cầu bổ sung (nếu dùng)

## 15.3 Sự kiện nhật ký hệ thống nên có

- tạo hóa đơn nạp
- tải chứng từ
- chuyển trạng thái tự động hết hạn
- phát hiện nguy cơ cộng trùng và chặn xử lý
- lỗi giao dịch tài chính khi duyệt

---

## 16. Ngoại lệ và tình huống vận hành đặc biệt (chi tiết hóa TL02 mục 14.2)

## 16.1 Chuyển khoản đúng tiền nhưng sai nội dung tham chiếu

### Hướng xử lý
- R30 có thể duyệt tay nếu đối chiếu được bằng chứng đáng tin cậy.
- Bắt buộc nhập **lý do duyệt tay ngoại lệ**.
- Ghi nhật ký quản trị với nhãn ngoại lệ.

### Ràng buộc
- Không bỏ qua kiểm tra chống cộng trùng.
- Không duyệt nếu còn nghi ngờ hóa đơn khác đã nhận giao dịch này.

## 16.2 Người dùng tải nhầm chứng từ cho hóa đơn khác

### Hướng xử lý
- Nếu hóa đơn chưa vào **đang kiểm tra** hoặc cấu hình cho phép thay chứng từ ở **chờ duyệt**, R10 được tải lại chứng từ.
- Hệ thống phải lưu lịch sử chứng từ cũ.

### Ràng buộc
- Không xóa mất dấu vết chứng từ cũ.
- Nếu R30 đã nhận xử lý, ưu tiên trả hồ sơ về **chờ duyệt** kèm ghi chú yêu cầu bổ sung hoặc từ chối theo chính sách vận hành.

## 16.3 Hóa đơn hết hạn nhưng người dùng vừa chuyển khoản

### Hướng xử lý
- R30 xử lý theo quy trình vận hành nội bộ:
  - duyệt tay cho hóa đơn cũ nếu đối chiếu được và chính sách cho phép, hoặc
  - hướng dẫn tạo hóa đơn mới rồi xử lý điều chỉnh có dấu vết.

### Ràng buộc
- Bắt buộc có nhật ký và tham chiếu rõ.
- Không cộng tiền thủ công ngoài sổ cái.

## 16.4 Hóa đơn đã duyệt thành công nhưng người dùng báo chưa thấy số dư cập nhật

### Hướng kiểm tra
1. Kiểm tra trạng thái hóa đơn.
2. Kiểm tra bút toán sổ cái tham chiếu hóa đơn.
3. Kiểm tra số dư ví hiện tại.
4. Kiểm tra lỗi hiển thị hoặc dữ liệu tổng hợp chậm.

### Ràng buộc
- Nếu bút toán đã tồn tại và số dư đúng, xử lý theo hướng đồng bộ hiển thị, không cộng thêm tiền.
- Nếu phát hiện lệch hiếm gặp, xử lý theo bút toán bù có phê duyệt và nhật ký.

## 16.5 Nghi ngờ gian lận chứng từ

### Hướng xử lý
- R30 có thể từ chối với lý do nghi ngờ gian lận.
- Đồng thời tạo cảnh báo để TL12 và quy trình vận hành TL19 xử lý tiếp.

### Ràng buộc
- Không khóa vĩnh viễn tài khoản trực tiếp trong quy trình nạp tiền nếu chưa theo quy trình xử lý gian lận tổng thể.

---

## 17. Yêu cầu giao diện liên quan (để chuyển sang TL04 và TL06)

## 17.1 Màn hình phía R10 (TL04 sẽ chi tiết hóa)

1. Màn hình nạp tiền tạo hóa đơn
2. Màn hình chi tiết hóa đơn nạp
3. Màn hình lịch sử hóa đơn nạp
4. Hộp thoại hủy hóa đơn
5. Khu tải chứng từ và lịch sử chứng từ

### Trường hiển thị cốt lõi cần có
- mã hóa đơn
- số tiền nạp
- phương thức nạp
- trạng thái
- thời hạn hóa đơn
- thông tin thanh toán chụp tại thời điểm tạo
- nội dung tham chiếu
- chứng từ đã tải
- lý do từ chối (nếu có)

## 17.2 Màn hình phía R30 (TL06 sẽ chi tiết hóa)

1. Danh sách hóa đơn chờ duyệt
2. Chi tiết hồ sơ nạp tiền
3. Hành động nhận xử lý
4. Hành động duyệt thành công
5. Hành động từ chối
6. Lịch sử xử lý và nhật ký liên quan

### Bộ lọc ưu tiên trên danh sách duyệt
- trạng thái
- phương thức nạp
- khoảng thời gian tạo
- khoảng thời gian hết hạn
- người dùng
- số tiền
- cờ ngoại lệ

---

## 18. Yêu cầu giao diện lập trình và dữ liệu liên quan (đầu vào cho TL13 và TL15)

## 18.1 Nhóm giao diện lập trình cần có trong TL15

### Cho R10
- tạo hóa đơn nạp
- lấy danh sách hóa đơn nạp
- lấy chi tiết hóa đơn nạp
- tải chứng từ nạp
- hủy hóa đơn nạp

### Cho R30
- lấy danh sách hóa đơn chờ duyệt
- nhận xử lý hồ sơ nạp
- duyệt hóa đơn nạp
- từ chối hóa đơn nạp
- xem lịch sử xử lý hóa đơn nạp

### Cho R40
- tra cứu danh sách và chi tiết hóa đơn nạp theo quyền hỗ trợ (chỉ đọc, dữ liệu đã che)

## 18.2 Nhóm bảng dữ liệu và nhật ký liên quan trong TL13

- hóa đơn nạp tiền
- chứng từ nạp
- sổ cái giao dịch
- ví người dùng
- nhật ký quản trị
- nhật ký hệ thống
- cấu hình tài khoản ngân hàng hiển thị
- cấu hình ví USDT hiển thị
- cấu hình khuyến mãi nạp tiền
- bản chụp cấu hình áp dụng cho hóa đơn

---

## 19. Tiêu chí chấp nhận tài liệu TL08

TL08 được xem là đạt khi đáp ứng toàn bộ các tiêu chí sau:

1. **Nhất quán với TL02 và TL03**
   - dùng đúng tên trạng thái hóa đơn nạp theo TL02 mục 13.2
   - không vượt quyền đã chốt trong TL03

2. **Chốt rõ điều kiện cộng tiền**
   - chỉ cộng tiền sau duyệt thành công
   - có cơ chế chống cộng trùng
   - có yêu cầu sổ cái và nhật ký

3. **Có luồng đầy đủ cho nạp tiền thủ công**
   - tạo hóa đơn
   - tải chứng từ
   - nhận xử lý
   - duyệt hoặc từ chối
   - hủy và hết hạn

4. **Có xử lý ngoại lệ thực tế**
   - sai nội dung tham chiếu
   - nhầm chứng từ
   - hóa đơn hết hạn nhưng đã chuyển tiền
   - tranh chấp hiển thị số dư

5. **Có đầu ra rõ cho tài liệu sau**
   - đủ dữ liệu để tách tiếp sang TL04, TL06, TL13, TL15

---

## 20. Tự rà soát nhất quán (vòng hiện tại)

### 20.1 Kiểm tra tên trạng thái
- Đã dùng đúng bộ trạng thái hóa đơn nạp của TL02 mục 13.2
- Không tự tạo trạng thái mới ngoài bộ đã chốt

### 20.2 Kiểm tra vai trò
- R10 tạo hóa đơn và tải chứng từ
- R30 duyệt hoặc từ chối
- R40 chỉ hỗ trợ tra cứu, không duyệt

### 20.3 Kiểm tra nguyên tắc tài chính
- Không cộng tiền trước duyệt
- Không cộng trùng
- Không sửa số dư trực tiếp
- Điều chỉnh sai sót bằng bút toán bù

### 20.4 Kiểm tra truy vết tài liệu
- Có liên kết truy vết về TL02 và TL03
- Có đầu ra chuyển tiếp cho TL04, TL06, TL13, TL15, TL17, TL18, TL19, TL21

---

## 21. Đề xuất tài liệu tiếp theo (ưu tiên cao)

### TL09 — Đặc tả quy trình rút tiền thủ công

Lý do ưu tiên tiếp theo:
- cùng nhóm tài chính với TL08
- dùng chung nhiều nguyên tắc sổ cái, nhật ký, phân quyền
- cần khóa sớm trước khi thiết kế dữ liệu chi tiết TL13 và giao diện lập trình TL15

