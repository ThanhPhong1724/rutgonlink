# Tài liệu 09 — Đặc tả quy trình rút tiền thủ công

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL09
- **Tên tài liệu:** Đặc tả quy trình rút tiền thủ công
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL13, TL15, TL18, TL19, TL21

---

## 2. Mục tiêu tài liệu

Tài liệu này đặc tả chi tiết quy trình rút tiền thủ công cho **nhà xuất bản** từ thời điểm tạo yêu cầu rút tới khi hoàn thành chi trả hoặc hoàn số dư, bảo đảm:

1. Nhất quán với trạng thái và quy tắc nghiệp vụ đã chốt trong TL02.
2. Tuân thủ ma trận phân quyền trong TL03.
3. Bảo toàn tiền và sổ cái theo nguyên tắc tài chính đã dùng ở TL08.
4. Có thể triển khai được ngay cho đội phát triển và trợ lý lập trình.
5. Hạn chế mơ hồ trong các tình huống lỗi vận hành như chuyển khoản thất bại, duyệt nhầm, thông tin nhận tiền sai.

Tài liệu này tập trung vào **rút tiền thủ công** ở giai đoạn đầu, bao gồm:

- phương thức ngân hàng Việt Nam,
- phương thức USDT thủ công,
- khóa tạm số dư,
- duyệt hoặc từ chối,
- cập nhật trạng thái đã gửi,
- xác nhận hoàn thành,
- hoàn số dư khi lỗi hoặc khi hủy trước xử lý.

---

## 3. Phạm vi của TL09

### 3.1 Trong phạm vi

- Tạo yêu cầu rút tiền bởi R20.
- Kiểm tra ngưỡng rút tối thiểu và số dư khả dụng.
- Khóa tạm số dư khi tạo yêu cầu rút.
- Duyệt hoặc từ chối yêu cầu rút bởi R30.
- Cập nhật tiến độ xử lý rút tiền thủ công.
- Ghi nhận bằng chứng xử lý rút tiền.
- Xác nhận hoàn thành chi trả.
- Hoàn số dư khóa tạm khi từ chối, hủy, hoặc lỗi vận hành.
- Nhật ký quản trị, thông báo người dùng, dữ liệu phục vụ đối soát.
- Che dữ liệu nhạy cảm trong quy trình rút tiền theo TL03.

### 3.2 Ngoài phạm vi

- Tự động chi trả qua cổng thanh toán ngân hàng.
- Tự động đối chiếu chuỗi khối cho USDT.
- Đối soát doanh thu nhà xuất bản cấp cuối kỳ chi tiết (thuộc TL11 và TL16).
- Màn hình chi tiết từng thành phần giao diện (thuộc TL05 và TL06).
- Đặc tả cấp cột toàn bộ bảng dữ liệu (thuộc TL13).
- Đặc tả đầy đủ giao diện lập trình (thuộc TL15).

---

## 4. Truy vết sang tài liệu trước

## 4.1 Truy vết chức năng nghiệp vụ TL02

TL09 hiện thực hóa và chi tiết hóa các chức năng trong TL02:

- **NV07** — Quản lý thông tin nhận tiền của nhà xuất bản (phần dữ liệu đầu vào của quy trình rút)
- **NV08** — Xem số dư và lịch sử giao dịch (phần hiển thị số dư khả dụng và số dư khóa tạm)
- **NV12** — Tạo yêu cầu rút tiền
- **NV13** — Duyệt hoặc từ chối rút tiền
- **NV14** — Khóa tạm và hoàn số dư theo trạng thái rút tiền
- **NV15** — Cấu hình phương thức nạp và rút hiển thị cho người dùng (phần tiêu thụ cấu hình phương thức)
- **NV39** — Nhật ký quản trị (phần bắt buộc với duyệt, từ chối, hoàn tiền, cập nhật tiến độ)
- **NV40** — Báo cáo đối soát tổng quan (phần dữ liệu đầu vào cho báo cáo)

## 4.2 Truy vết vai trò và phân quyền TL03

TL09 tuân thủ các ràng buộc chính trong TL03:

- **R20** được tạo yêu cầu rút trên dữ liệu sở hữu và theo điều kiện ngưỡng, số dư.
- **R30** là vai trò duy nhất được duyệt hoặc từ chối rút tiền.
- **R30** là vai trò duy nhất được tải lên bằng chứng xử lý rút tiền.
- **R40** chỉ được tra cứu trạng thái và dữ liệu đã che theo chính sách.
- Bảng quyền theo trạng thái yêu cầu rút tiền bám TL03 mục 11.2.
- Thao tác nhạy cảm trong tài chính phải có nhật ký và lý do theo TL03 mục 13.

## 4.3 Truy vết nguyên tắc tài chính từ TL08

TL09 giữ nguyên các nguyên tắc đã chốt ở TL08 để tránh lệch cách làm tài chính:

- Mọi thay đổi số dư phải đi qua sổ cái.
- Không cập nhật số dư trực tiếp không có dấu vết.
- Nghiệp vụ tài chính phải có tính nguyên tử ở mức giao dịch xử lý.
- Thao tác nhạy cảm phải có nhật ký quản trị và khả năng đối soát.

---

## 5. Tác nhân tham gia quy trình

### 5.1 R20 — Nhà xuất bản

Vai trò nghiệp vụ:
- cấu hình thông tin nhận tiền,
- tạo yêu cầu rút tiền,
- theo dõi trạng thái xử lý,
- xem lịch sử rút tiền,
- hủy yêu cầu trong trạng thái cho phép theo chính sách phiên bản đầu.

### 5.2 R30 — Quản trị viên

Vai trò nghiệp vụ:
- tiếp nhận hàng chờ yêu cầu rút,
- kiểm tra điều kiện và chứng cứ liên quan,
- duyệt hoặc từ chối yêu cầu rút,
- cập nhật trạng thái đã gửi và hoàn thành,
- tải lên bằng chứng xử lý,
- xử lý lỗi vận hành và hoàn số dư khi cần.

### 5.3 R40 — Nhân viên hỗ trợ

Vai trò nghiệp vụ:
- tra cứu trạng thái yêu cầu rút,
- hỗ trợ giải thích tiến độ cho R20,
- xem dữ liệu đã che theo quyền,
- không được duyệt, từ chối, cập nhật chi trả hoặc tải bằng chứng xử lý.

### 5.4 Dịch vụ nền hệ thống

Vai trò kỹ thuật nghiệp vụ:
- kiểm tra điều kiện tạo yêu cầu rút,
- khóa tạm số dư và ghi sổ cái,
- mở khóa số dư khi từ chối, hủy, hoàn tiền,
- ghi nhật ký hệ thống,
- gửi thông báo,
- hỗ trợ chống xử lý trùng,
- tạo dữ liệu phục vụ đối soát và báo cáo.

---

## 6. Thuật ngữ và định nghĩa dùng trong TL09

### 6.1 Yêu cầu rút tiền

Bản ghi nghiệp vụ đại diện cho một đề nghị chi trả từ số dư nhà xuất bản. Mỗi yêu cầu rút có mã duy nhất, phương thức rút, số tiền, trạng thái, thông tin nhận tiền chụp nhanh và lịch sử xử lý.

### 6.2 Số dư khả dụng

Phần số dư nhà xuất bản có thể dùng để tạo yêu cầu rút hoặc phục vụ nghiệp vụ khác theo chính sách.

### 6.3 Số dư khóa tạm

Phần số dư đã được giữ lại cho một yêu cầu rút đang xử lý. Số tiền này chưa được chi trả thành công nhưng cũng không còn khả dụng để tạo yêu cầu khác.

### 6.4 Thông tin nhận tiền chụp nhanh

Bản sao dữ liệu thông tin nhận tiền của R20 tại thời điểm tạo yêu cầu rút, dùng để bảo toàn đối soát khi người dùng thay đổi thông tin nhận tiền sau đó.

### 6.5 Bằng chứng xử lý rút tiền

Tệp hoặc dữ liệu minh chứng do R30 tải lên trong quá trình xử lý, ví dụ ảnh giao dịch chuyển khoản, mã giao dịch nội bộ, ảnh xác nhận chi trả.

### 6.6 Hoàn số dư

Nghiệp vụ chuyển số tiền từ **số dư khóa tạm** về **số dư khả dụng** khi yêu cầu rút bị từ chối, bị hủy trước xử lý, hoặc phát sinh lỗi vận hành không thể hoàn tất chi trả.

### 6.7 Duyệt rút tiền

Quyết định nghiệp vụ của R30 xác nhận yêu cầu rút được phép đi tiếp sang bước xử lý chi trả. Trạng thái duyệt **không đồng nghĩa** đã chi trả thành công.

---

## 7. Phương thức rút tiền hỗ trợ trong phiên bản đầu

## 7.1 Rút tiền qua ngân hàng Việt Nam thủ công

Hệ thống hỗ trợ nhà xuất bản khai báo và sử dụng thông tin nhận tiền dạng ngân hàng Việt Nam:

- tên ngân hàng,
- số tài khoản,
- tên chủ tài khoản,
- chi nhánh hoặc ghi chú nếu có.

Đặc điểm xử lý:
- quản trị viên chuyển tiền thủ công ngoài hệ thống,
- hệ thống chỉ quản lý trạng thái, nhật ký và bằng chứng xử lý.

## 7.2 Rút tiền USDT thủ công

Hệ thống hỗ trợ cấu hình thông tin nhận tiền dạng USDT:

- địa chỉ ví,
- mạng chuỗi khối,
- ghi chú cảnh báo mạng,
- tên hiển thị phương thức.

Đặc điểm xử lý:
- quản trị viên thực hiện chi trả thủ công ngoài hệ thống,
- hệ thống lưu tiến độ, bằng chứng và trạng thái,
- bắt buộc hiển thị cảnh báo rủi ro gửi sai mạng.

### 7.2.1 Quy định riêng cho USDT thủ công

- R20 phải chọn đúng mạng chuỗi khối trong thông tin nhận tiền.
- R30 phải kiểm tra mạng chuỗi khối trước khi cập nhật trạng thái **đã gửi**.
- Hệ thống nên hỗ trợ trường ghi chú mã giao dịch để phục vụ tra cứu, dù không bắt buộc trong phiên bản đầu.

---

## 8. Dữ liệu đầu vào và đầu ra nghiệp vụ

## 8.1 Đầu vào khi tạo yêu cầu rút tiền (R20)

Bắt buộc:
- số tiền rút,
- phương thức rút,
- bản ghi thông tin nhận tiền hợp lệ của chính R20.

Tùy chọn:
- ghi chú cho quản trị viên,
- lựa chọn ưu tiên xử lý nếu sau này có chính sách mức ưu tiên.

## 8.2 Đầu ra sau khi tạo yêu cầu rút tiền

- mã yêu cầu rút,
- trạng thái yêu cầu ban đầu,
- số dư khả dụng sau khóa tạm,
- số dư khóa tạm sau khóa,
- thông tin nhận tiền chụp nhanh,
- số tiền khóa tạm,
- thông báo trạng thái tạo thành công.

## 8.3 Đầu vào khi R30 duyệt hoặc từ chối

Bắt buộc:
- quyết định xử lý,
- lý do nếu từ chối,
- ghi chú nghiệp vụ tối thiểu.

Bắt buộc trong một số trường hợp:
- lý do duyệt ngoại lệ,
- bằng chứng kiểm tra nội bộ,
- xác nhận lại thông tin nhận tiền nếu phát hiện khác thường.

## 8.4 Đầu vào khi R30 cập nhật trạng thái đã gửi

Bắt buộc:
- xác nhận đã thực hiện chi trả ngoài hệ thống,
- số tiền thực chi,
- thời điểm chi trả,
- phương thức chi trả thực tế.

Khuyến nghị:
- tệp bằng chứng xử lý,
- mã giao dịch tham chiếu,
- ghi chú xử lý.

## 8.5 Đầu vào khi R30 xác nhận hoàn thành

Bắt buộc:
- xác nhận kết quả chi trả thành công,
- thời điểm hoàn thành.

Khuyến nghị:
- ghi chú xác nhận cuối,
- tham chiếu bằng chứng đã tải trước đó.

## 8.6 Đầu vào khi hoàn số dư do lỗi hoặc hủy

Bắt buộc:
- lý do hoàn số dư,
- căn cứ xử lý,
- tác nhân thực hiện.

Bắt buộc trong lỗi vận hành:
- bằng chứng lỗi hoặc ghi chú sự cố.

## 8.7 Đầu ra khi yêu cầu rút hoàn tất thành công

- yêu cầu rút ở trạng thái **hoàn thành**,
- sổ cái phản ánh chi rút thành công,
- số dư khóa tạm giảm tương ứng,
- nhật ký quản trị được ghi,
- thông báo gửi cho R20.

## 8.8 Đầu ra khi từ chối hoặc hoàn tiền

- yêu cầu rút ở trạng thái **từ chối** hoặc **hoàn tiền**,
- số dư khóa tạm được mở khóa về số dư khả dụng theo quy tắc,
- sổ cái phản ánh nghiệp vụ mở khóa,
- nhật ký quản trị được ghi,
- thông báo gửi cho R20.

---

## 9. Trạng thái yêu cầu rút tiền và chuyển trạng thái

## 9.1 Danh sách trạng thái chuẩn (tham chiếu TL02 mục 13.3)

- mới tạo
- chờ duyệt
- đang xử lý
- đã duyệt
- đã gửi
- hoàn thành
- từ chối
- hoàn tiền

## 9.2 Trạng thái khởi tạo theo quy trình chuẩn hóa của TL09

Để tránh mơ hồ, TL09 chốt luồng mặc định như sau:

- Khi R20 tạo yêu cầu rút thành công, hệ thống **khóa tạm số dư ngay** và đặt trạng thái là **chờ duyệt**.
- Trạng thái **mới tạo** là trạng thái kỹ thuật ngắn hạn, có thể xuất hiện trong nhật ký nội bộ nếu hệ thống tách bước tạo bản ghi và khóa số dư. Trên giao diện người dùng có thể không hiển thị trạng thái này. Nếu khóa tạm thất bại thì phải hủy giao dịch tạo yêu cầu hoặc đánh dấu lỗi nội bộ, không coi là yêu cầu rút hợp lệ.
- Khi R30 nhận xử lý hồ sơ, chuyển sang **đang xử lý** để tránh nhiều quản trị viên thao tác đồng thời.
- Khi R30 đồng ý cho phép chi trả, chuyển sang **đã duyệt**.
- Khi R30 đã thực hiện chi trả ngoài hệ thống và cập nhật lại, chuyển sang **đã gửi**.
- Khi xác nhận chi trả xong, chuyển sang **hoàn thành**.

## 9.3 Quy ước dùng trạng thái từ chối và hoàn tiền

Để thống nhất với TL02 và TL03, TL09 chốt như sau:

- **từ chối** dùng cho trường hợp R30 quyết định không xử lý yêu cầu rút ở bước duyệt hoặc đang xử lý.
- **hoàn tiền** dùng cho các trường hợp đã cần mở khóa số dư vì lỗi vận hành hoặc hủy trước xử lý, gồm:
  - R20 hủy yêu cầu khi còn cho phép,
  - R30 xử lý lỗi sau đã duyệt hoặc đã gửi nhưng không thể hoàn tất,
  - các tình huống phải trả lại số dư khóa tạm theo quy trình.

> Ghi chú: Cả hai trạng thái **từ chối** và **hoàn tiền** đều là trạng thái chốt trong TL09. Điểm khác nhau là ngữ nghĩa nghiệp vụ và dữ liệu đối soát.

## 9.4 Bảng chuyển trạng thái chuẩn

| Trạng thái hiện tại | Tác nhân | Sự kiện | Trạng thái kế tiếp | Bắt buộc ghi chú | Ghi chú triển khai |
|---|---|---|---|---:|---|
| mới tạo | Hệ thống | Khóa tạm số dư thành công | chờ duyệt | ✖ | Có thể ẩn trên giao diện người dùng |
| chờ duyệt | R20 | Hủy yêu cầu (nếu bật chính sách) | hoàn tiền | ✔ | Hệ thống mở khóa số dư và ghi rõ lý do là người dùng hủy |
| chờ duyệt | R30 | Nhận xử lý hồ sơ | đang xử lý | ✖ | Khuyến nghị khóa xử lý để tránh trùng người xử lý |
| chờ duyệt | R30 | Từ chối | từ chối | ✔ | Hệ thống mở khóa số dư |
| đang xử lý | R30 | Duyệt | đã duyệt | ✖ | Có thể yêu cầu xác thực bổ sung cho thao tác nhạy cảm |
| đang xử lý | R30 | Từ chối | từ chối | ✔ | Hệ thống mở khóa số dư |
| đang xử lý | R30 | Yêu cầu bổ sung thông tin qua hỗ trợ | đang xử lý | ✔ | Không đổi trạng thái, ghi nhật ký |
| đã duyệt | R30 | Cập nhật đã thực hiện chi trả | đã gửi | ✔ | Khuyến nghị tải bằng chứng xử lý cùng lúc |
| đã duyệt | R30 | Hoàn tác do lỗi trước chi trả | hoàn tiền | ✔ | Hệ thống mở khóa số dư |
| đã gửi | R30 | Xác nhận chi trả thành công | hoàn thành | ✔ | Chốt bút toán chi rút |
| đã gửi | R30 | Chi trả lỗi, không thể hoàn tất | hoàn tiền | ✔ | Cần bằng chứng lỗi, mở khóa số dư |
| hoàn thành | Bất kỳ | Mọi thao tác sửa | hoàn thành | ✖ | Trạng thái chốt, cấm sửa dữ liệu tài chính |
| từ chối | Bất kỳ | Mọi thao tác xử lý chính | từ chối | ✖ | Trạng thái chốt |
| hoàn tiền | Bất kỳ | Mọi thao tác xử lý chính | hoàn tiền | ✖ | Trạng thái chốt |

## 9.5 Quyền theo trạng thái (tóm tắt, bám TL03 mục 11.2)

| Trạng thái rút tiền | R20 tạo | R20 hủy yêu cầu | R30 duyệt | R30 từ chối | R30 cập nhật xử lý |
|---|---:|---:|---:|---:|---:|
| mới tạo | ✔ | △ | ✖ | ✖ | ✖ |
| chờ duyệt | ✖ | △ | ✔ | ✔ | ✖ |
| đang xử lý | ✖ | ✖ | △ | ✔ | ✔ |
| đã duyệt | ✖ | ✖ | ✖ | △ | ✔ |
| đã gửi | ✖ | ✖ | ✖ | ✖ | ✔ |
| hoàn thành | ✖ | ✖ | ✖ | ✖ | ✖ |
| từ chối | ✖ | ✖ | ✖ | ✖ | ✖ |
| hoàn tiền | ✖ | ✖ | ✖ | ✖ | ✖ |

---

## 10. Quy trình nghiệp vụ chi tiết

## 10.1 Quy trình QR01 — Tạo yêu cầu rút tiền

### Mục tiêu
Cho phép R20 tạo yêu cầu rút tiền hợp lệ và khóa tạm số dư tương ứng.

### Tác nhân
- Chính: R20
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Tài khoản R20 đang hoạt động.
- R20 đã đăng nhập.
- R20 đã có thông tin nhận tiền hợp lệ cho phương thức đã chọn.
- Số dư khả dụng đủ để rút.
- Đạt ngưỡng rút tối thiểu theo cấu hình hệ thống.

### Hậu điều kiện thành công
- Yêu cầu rút được tạo với mã duy nhất.
- Số tiền yêu cầu được chuyển từ số dư khả dụng sang số dư khóa tạm.
- Trạng thái yêu cầu là **chờ duyệt**.
- Có bản chụp thông tin nhận tiền tại thời điểm tạo.
- Có nhật ký hệ thống và sổ cái phục vụ đối soát.

### Luồng chuẩn
1. R20 mở màn hình rút tiền.
2. Hệ thống hiển thị số dư khả dụng, số dư khóa tạm, ngưỡng rút và phương thức rút hỗ trợ.
3. R20 chọn phương thức rút và nhập số tiền rút.
4. Hệ thống kiểm tra điều kiện hợp lệ đầu vào.
5. Hệ thống nạp thông tin nhận tiền hiện hành của R20.
6. Hệ thống chụp nhanh thông tin nhận tiền vào yêu cầu rút.
7. Hệ thống sinh mã yêu cầu rút duy nhất.
8. Hệ thống thực hiện nghiệp vụ khóa tạm số dư.
9. Hệ thống tạo bản ghi yêu cầu rút ở trạng thái **chờ duyệt**.
10. Hệ thống ghi sổ cái cho nghiệp vụ khóa tạm.
11. Hệ thống ghi nhật ký tạo yêu cầu rút.
12. Hệ thống trả kết quả cho R20.

### Kiểm tra hợp lệ bắt buộc
- số tiền rút lớn hơn 0,
- số tiền rút không vượt số dư khả dụng,
- số tiền rút đáp ứng ngưỡng tối thiểu,
- phương thức rút đang được bật,
- thông tin nhận tiền đủ trường bắt buộc,
- tài khoản không bị khóa theo chính sách an toàn.

### Ngoại lệ
- Thiếu thông tin nhận tiền: từ chối tạo và yêu cầu R20 cập nhật hồ sơ nhận tiền.
- Số dư vừa thay đổi do yêu cầu rút khác: báo lỗi và yêu cầu tải lại số dư.
- Khóa tạm số dư thất bại: không tạo yêu cầu rút thành công, ghi nhật ký lỗi.

## 10.2 Quy trình QR02 — Quản trị viên nhận xử lý yêu cầu rút

### Mục tiêu
Đưa yêu cầu rút từ hàng chờ vào trạng thái đang xử lý và gán người xử lý để tránh thao tác trùng.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Yêu cầu rút ở trạng thái **chờ duyệt**.
- R30 có quyền xử lý rút tiền.

### Hậu điều kiện thành công
- Yêu cầu rút chuyển sang **đang xử lý**.
- Ghi nhận người xử lý và thời điểm nhận xử lý.
- Nhật ký quản trị được ghi.

### Luồng chuẩn
1. R30 mở danh sách yêu cầu rút chờ duyệt.
2. R30 chọn một yêu cầu rút.
3. Hệ thống kiểm tra trạng thái hiện tại còn hợp lệ để nhận xử lý.
4. Hệ thống ghi nhận người xử lý.
5. Hệ thống chuyển trạng thái sang **đang xử lý**.
6. Hệ thống ghi nhật ký quản trị.

### Ngoại lệ
- Yêu cầu đã được R30 khác nhận xử lý: thông báo trạng thái thay đổi, không cho ghi đè.
- Yêu cầu đã bị hủy hoặc từ chối: chỉ cho phép tra cứu.

## 10.3 Quy trình QR03 — Duyệt yêu cầu rút tiền

### Mục tiêu
Cho phép R30 phê duyệt yêu cầu rút để bước sang giai đoạn thực hiện chi trả thủ công.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Yêu cầu rút ở trạng thái **đang xử lý**.
- Số tiền vẫn đang ở số dư khóa tạm.
- R30 đã kiểm tra thông tin nhận tiền và điều kiện liên quan theo quy trình vận hành.

### Hậu điều kiện thành công
- Yêu cầu rút chuyển sang trạng thái **đã duyệt**.
- Không thay đổi tổng số dư, không mở khóa số dư.
- Ghi nhật ký quản trị đầy đủ.

### Luồng chuẩn
1. R30 mở chi tiết yêu cầu rút đang xử lý.
2. R30 kiểm tra thông tin nhận tiền chụp nhanh, số tiền, lịch sử tài khoản, cảnh báo rủi ro nếu có.
3. R30 xác nhận duyệt.
4. Hệ thống kiểm tra trạng thái và điều kiện khóa tạm còn hợp lệ.
5. Hệ thống chuyển trạng thái sang **đã duyệt**.
6. Hệ thống ghi nhật ký quản trị.
7. Hệ thống gửi thông báo cho R20 rằng yêu cầu đã được duyệt và đang chờ chi trả.

### Quy tắc nghiệp vụ bắt buộc
- Duyệt không đồng nghĩa hoàn thành chi trả.
- Không được thay đổi số tiền yêu cầu rút ở bước duyệt.
- Nếu cần thay đổi số tiền, phải từ chối hoặc hoàn tiền yêu cầu hiện tại và tạo yêu cầu mới.

### Ngoại lệ
- Phát hiện thông tin nhận tiền nghi ngờ sai: không duyệt, chuyển sang từ chối hoặc giữ trạng thái đang xử lý để xác minh thêm.
- Yêu cầu không còn đủ điều kiện do phát hiện rủi ro: xử lý theo quy trình từ chối hoặc hoàn tiền tùy thời điểm.

## 10.4 Quy trình QR04 — Cập nhật đã gửi sau khi chi trả thủ công

### Mục tiêu
Ghi nhận việc R30 đã thực hiện chi trả ngoài hệ thống và chuyển yêu cầu sang trạng thái **đã gửi**.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Yêu cầu rút ở trạng thái **đã duyệt**.
- R30 đã thực hiện thao tác chi trả ngoài hệ thống.

### Hậu điều kiện thành công
- Yêu cầu rút chuyển sang trạng thái **đã gửi**.
- Bằng chứng xử lý và dữ liệu tham chiếu được lưu nếu có.
- Nhật ký quản trị được ghi.

### Luồng chuẩn
1. R30 thực hiện chi trả ngoài hệ thống theo phương thức tương ứng.
2. R30 mở lại yêu cầu rút trên hệ thống.
3. R30 nhập thông tin cập nhật đã gửi: số tiền thực chi, thời điểm chi trả, mã tham chiếu nếu có.
4. R30 tải bằng chứng xử lý nếu quy trình yêu cầu.
5. Hệ thống kiểm tra trạng thái hiện tại và quyền của R30.
6. Hệ thống lưu dữ liệu cập nhật xử lý.
7. Hệ thống chuyển trạng thái sang **đã gửi**.
8. Hệ thống ghi nhật ký quản trị.
9. Hệ thống gửi thông báo cho R20 rằng yêu cầu đã được gửi xử lý.

### Ngoại lệ
- R30 phát hiện chưa chi trả thực tế nhưng bấm cập nhật: hệ thống cho phép hủy thao tác trước khi xác nhận cuối.
- Tệp bằng chứng không hợp lệ: từ chối tải lên, giữ nguyên trạng thái.

## 10.5 Quy trình QR05 — Xác nhận hoàn thành chi trả

### Mục tiêu
Chốt yêu cầu rút ở trạng thái **hoàn thành** và ghi nhận bút toán chi rút chính thức.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Yêu cầu rút ở trạng thái **đã gửi**.
- Có căn cứ xác nhận chi trả thành công theo quy trình vận hành.
- Số tiền vẫn đang ở số dư khóa tạm.

### Hậu điều kiện thành công
- Yêu cầu rút chuyển sang **hoàn thành**.
- Số dư khóa tạm giảm tương ứng.
- Sổ cái ghi nhận bút toán chi rút thành công.
- Nhật ký quản trị được ghi.
- Thông báo hoàn thành gửi cho R20.

### Luồng chuẩn
1. R30 mở yêu cầu rút ở trạng thái **đã gửi**.
2. R30 xác nhận kết quả chi trả thành công.
3. Hệ thống kiểm tra trạng thái và đối chiếu số tiền khóa tạm.
4. Hệ thống thực hiện bút toán chốt chi rút:
   - giảm số dư khóa tạm,
   - ghi nhận chi rút thành công trong sổ cái.
5. Hệ thống chuyển trạng thái sang **hoàn thành**.
6. Hệ thống ghi nhật ký quản trị.
7. Hệ thống gửi thông báo cho R20.

### Quy tắc nghiệp vụ bắt buộc
- Bút toán chốt chi rút và chuyển trạng thái **hoàn thành** phải nằm trong cùng một giao dịch xử lý.
- Không cho sửa số tiền sau khi đã hoàn thành.

### Ngoại lệ
- Không tìm thấy số dư khóa tạm đủ để chốt: dừng xử lý, báo lỗi nghiêm trọng, ghi cảnh báo vận hành.

## 10.6 Quy trình QR06 — Từ chối yêu cầu rút tiền

### Mục tiêu
Cho phép R30 từ chối yêu cầu rút ở bước chờ duyệt hoặc đang xử lý, đồng thời hoàn số dư khóa tạm về số dư khả dụng.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Yêu cầu rút ở trạng thái **chờ duyệt** hoặc **đang xử lý**.
- Yêu cầu đang có số dư khóa tạm tương ứng.

### Hậu điều kiện thành công
- Yêu cầu rút chuyển sang **từ chối**.
- Số dư khóa tạm được hoàn về số dư khả dụng.
- Sổ cái ghi bút toán mở khóa hoặc hoàn số dư.
- Nhật ký quản trị được ghi.
- Thông báo từ chối gửi cho R20.

### Luồng chuẩn
1. R30 mở yêu cầu rút ở trạng thái cho phép.
2. R30 chọn thao tác từ chối.
3. R30 nhập lý do từ chối.
4. Hệ thống kiểm tra trạng thái và quyền.
5. Hệ thống thực hiện nghiệp vụ hoàn số dư khóa tạm.
6. Hệ thống ghi sổ cái mở khóa số dư.
7. Hệ thống chuyển trạng thái yêu cầu sang **từ chối**.
8. Hệ thống ghi nhật ký quản trị.
9. Hệ thống gửi thông báo cho R20.

### Các nhóm lý do từ chối chuẩn hóa (khuyến nghị)
- thông tin nhận tiền không hợp lệ,
- nghi ngờ gian lận hoặc rủi ro cao,
- tài khoản bị khóa theo chính sách,
- sai phương thức rút so với thông tin nhận tiền,
- yêu cầu trùng hoặc bất thường,
- lý do vận hành khác.

## 10.7 Quy trình QR07 — Hoàn số dư do lỗi vận hành sau đã duyệt hoặc đã gửi

### Mục tiêu
Xử lý các trường hợp không thể hoàn tất chi trả sau khi yêu cầu đã đi qua bước duyệt hoặc đã gửi, đồng thời trả lại số dư khóa tạm.

### Tác nhân
- Chính: R30
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Yêu cầu rút ở trạng thái **đã duyệt** hoặc **đã gửi**.
- Chưa ở trạng thái **hoàn thành**.
- Có căn cứ lỗi vận hành hoặc sự cố chi trả.

### Hậu điều kiện thành công
- Yêu cầu rút chuyển sang **hoàn tiền**.
- Số dư khóa tạm được hoàn về số dư khả dụng.
- Sổ cái ghi bút toán hoàn số dư.
- Bằng chứng lỗi được lưu.
- Nhật ký quản trị được ghi.
- Thông báo gửi cho R20.

### Luồng chuẩn
1. R30 xác định yêu cầu rút không thể hoàn tất chi trả.
2. R30 mở chi tiết yêu cầu rút.
3. R30 chọn thao tác hoàn số dư.
4. R30 nhập lý do và tải bằng chứng lỗi.
5. Hệ thống kiểm tra trạng thái hiện tại hợp lệ.
6. Hệ thống thực hiện nghiệp vụ mở khóa số dư.
7. Hệ thống ghi sổ cái hoàn số dư.
8. Hệ thống chuyển trạng thái sang **hoàn tiền**.
9. Hệ thống ghi nhật ký quản trị.
10. Hệ thống gửi thông báo cho R20.

### Ràng buộc
- Không dùng trạng thái **từ chối** cho lỗi xảy ra sau bước **đã duyệt** nếu đã có dấu vết xử lý chi trả.
- Bắt buộc có lý do và bằng chứng lỗi.

## 10.8 Quy trình QR08 — R20 hủy yêu cầu rút trước khi quản trị nhận xử lý

### Mục tiêu
Cho phép R20 hủy yêu cầu rút trong trạng thái cho phép và nhận lại số dư khả dụng.

### Tác nhân
- Chính: R20
- Phụ: Dịch vụ nền hệ thống

### Tiền điều kiện
- Chính sách hệ thống cho phép R20 hủy.
- Yêu cầu rút ở trạng thái **chờ duyệt**.
- Chưa được R30 nhận xử lý.

### Hậu điều kiện thành công
- Yêu cầu rút chuyển sang **hoàn tiền**.
- Số dư khóa tạm được hoàn về số dư khả dụng.
- Ghi sổ cái hoàn số dư và nhật ký hệ thống.
- Gửi thông báo xác nhận hủy cho R20.

### Luồng chuẩn
1. R20 mở danh sách yêu cầu rút của mình.
2. R20 chọn yêu cầu ở trạng thái **chờ duyệt**.
3. R20 chọn hủy yêu cầu.
4. Hệ thống kiểm tra trạng thái hiện tại và điều kiện cho phép hủy.
5. Hệ thống thực hiện hoàn số dư khóa tạm.
6. Hệ thống ghi sổ cái hoàn số dư.
7. Hệ thống chuyển trạng thái sang **hoàn tiền**.
8. Hệ thống ghi nhật ký hệ thống và lịch sử người dùng.
9. Hệ thống trả kết quả cho R20.

### Ngoại lệ
- Yêu cầu vừa được R30 nhận xử lý: báo lỗi trạng thái thay đổi, không cho hủy.
- Chính sách tắt quyền tự hủy: hệ thống ẩn nút hủy và hướng dẫn liên hệ hỗ trợ.

---

## 11. Quy tắc khóa tạm số dư, chi rút và hoàn số dư

## 11.1 Nguyên tắc tài chính cốt lõi

- Không cho phép số dư khả dụng âm.
- Không cho phép số dư khóa tạm âm.
- Mọi thay đổi số dư phải có bút toán sổ cái tương ứng.
- Không được vừa **hoàn thành** vừa **hoàn tiền** cho cùng một yêu cầu rút.
- Một yêu cầu rút chỉ được chốt ở một trong ba trạng thái cuối:
  - **hoàn thành**,
  - **từ chối**,
  - **hoàn tiền**.

## 11.2 Mô hình số dư chuẩn nghiệp vụ

Khi tạo yêu cầu rút thành công:
- giảm **số dư khả dụng**,
- tăng **số dư khóa tạm**,
- tổng số dư không đổi.

Khi từ chối hoặc hoàn tiền:
- giảm **số dư khóa tạm**,
- tăng **số dư khả dụng**,
- tổng số dư không đổi.

Khi hoàn thành chi rút:
- giảm **số dư khóa tạm**,
- ghi nhận chi rút thành công,
- tổng số dư của ví giảm tương ứng.

## 11.3 Ràng buộc số tiền xử lý

- Số tiền hoàn thành không được vượt số tiền khóa tạm của yêu cầu.
- Nếu cho phép phí rút ở giai đoạn sau, phải có trường riêng và bút toán riêng; phiên bản đầu **không trộn** phí vào số tiền rút gốc.
- Không cho sửa số tiền yêu cầu sau khi đã tạo; nếu sai phải tạo yêu cầu mới.

## 11.4 Ràng buộc phương thức nhận tiền

- Bản chụp thông tin nhận tiền tại thời điểm tạo là nguồn đối chiếu chính cho yêu cầu đó.
- Việc R20 cập nhật thông tin nhận tiền sau khi tạo yêu cầu **không làm thay đổi** yêu cầu đang chờ hoặc đang xử lý.
- Nếu cần đổi thông tin nhận tiền cho yêu cầu hiện tại, phải xử lý theo quy trình từ chối hoặc hoàn tiền rồi tạo lại yêu cầu.

---

## 12. Chống chi trả trùng và tính nguyên tử tài chính

## 12.1 Rủi ro cần phòng ngừa

- R30 bấm xác nhận **đã gửi** hoặc **hoàn thành** nhiều lần.
- Hai R30 cùng xử lý một yêu cầu do không khóa trạng thái khi nhận xử lý.
- Hệ thống ghi trạng thái thành công nhưng không ghi được bút toán sổ cái.
- Hệ thống mở khóa số dư nhiều lần cho cùng một yêu cầu rút.
- Tải lại trang gây gửi lại thao tác nhạy cảm.

## 12.2 Biện pháp nghiệp vụ và kỹ thuật bắt buộc

- Dùng khóa xử lý khi chuyển sang trạng thái **đang xử lý**.
- Mỗi thao tác nhạy cảm phải kiểm tra trạng thái hiện tại trước khi ghi.
- Các nghiệp vụ sau phải thực hiện trong cùng một giao dịch xử lý:
  - từ chối + hoàn số dư + ghi sổ cái + đổi trạng thái,
  - hoàn tiền + hoàn số dư + ghi sổ cái + đổi trạng thái,
  - hoàn thành + chốt chi rút + ghi sổ cái + đổi trạng thái.
- Lưu mã tham chiếu thao tác nhạy cảm để phát hiện gửi lặp.
- Ghi nhật ký quản trị trước hoặc cùng thời điểm thao tác chính, không ghi muộn.

## 12.3 Quy tắc phát hiện và cảnh báo nguy cơ chi trả trùng

Hệ thống nên cảnh báo R30 khi phát hiện một trong các dấu hiệu:

- cùng người dùng có nhiều yêu cầu rút cùng số tiền trong khoảng thời gian ngắn,
- yêu cầu đã ở trạng thái **đã gửi** nhưng lại nhận thêm thao tác **đã gửi**,
- yêu cầu đã **hoàn thành** nhưng có thao tác cập nhật xử lý mới,
- cùng mã tham chiếu chi trả được dùng cho nhiều yêu cầu khác nhau.

---

## 13. Dữ liệu nghiệp vụ phải lưu để phục vụ đối soát và kiểm toán

## 13.1 Dữ liệu tối thiểu của yêu cầu rút tiền

- mã yêu cầu rút
- mã người dùng R20
- số tiền yêu cầu
- đơn vị tiền
- phương thức rút
- thông tin nhận tiền chụp nhanh
- trạng thái hiện tại
- lý do từ chối hoặc hoàn tiền (nếu có)
- người xử lý hiện tại (nếu có)
- thời điểm tạo
- thời điểm cập nhật cuối
- thời điểm duyệt
- thời điểm đã gửi
- thời điểm hoàn thành
- mã quản trị viên xử lý cuối

## 13.2 Dữ liệu tối thiểu của bằng chứng xử lý rút tiền

- mã bằng chứng
- mã yêu cầu rút
- loại bằng chứng
- đường dẫn tệp
- mã tham chiếu giao dịch (nếu có)
- ghi chú
- người tải lên
- thời điểm tải lên

## 13.3 Dữ liệu tối thiểu của bút toán liên quan rút tiền

Nhóm bút toán cần phân biệt rõ:

- bút toán khóa tạm số dư khi tạo yêu cầu rút,
- bút toán mở khóa số dư khi từ chối hoặc hoàn tiền,
- bút toán chi rút thành công khi hoàn thành.

Mỗi bút toán tối thiểu phải có:
- mã bút toán,
- mã ví,
- loại bút toán,
- số tiền,
- số dư trước,
- số dư sau,
- mã tham chiếu yêu cầu rút,
- trạng thái bút toán,
- người hoặc dịch vụ tạo,
- thời điểm tạo.

## 13.4 Dữ liệu nhật ký quản trị bắt buộc

- mã nhật ký
- mã quản trị viên
- hành động
- mã yêu cầu rút
- trạng thái trước
- trạng thái sau
- lý do thao tác
- dữ liệu tóm tắt thay đổi
- địa chỉ mạng hoặc dấu vết phiên làm việc theo chính sách bảo mật
- thời điểm thao tác

---

## 14. Che dữ liệu và quyền xem trong quy trình rút tiền

## 14.1 Nguyên tắc chung

- R20 chỉ xem yêu cầu rút của chính mình.
- R30 xem đầy đủ dữ liệu phục vụ xử lý.
- R40 chỉ xem dữ liệu đủ để hỗ trợ, có che thông tin nhạy cảm.
- Ảnh bằng chứng xử lý mặc định không cho R40 xem đầy đủ nếu không có quyền riêng.

## 14.2 Dữ liệu cần che với R40 (mặc định)

- số tài khoản ngân hàng nhận tiền: chỉ hiển thị đầu và cuối,
- tên chủ tài khoản: che một phần,
- địa chỉ ví USDT: chỉ hiển thị đầu và cuối,
- ảnh bằng chứng xử lý rút: ẩn hoặc chỉ cho xem bản rút gọn theo chính sách,
- mã tham chiếu chi trả: che một phần nếu có rủi ro lộ dữ liệu.

## 14.3 Dữ liệu hiển thị đủ cho R40 để hỗ trợ

- mã yêu cầu rút,
- trạng thái hiện tại,
- số tiền yêu cầu,
- phương thức rút,
- thời điểm tạo,
- thời điểm cập nhật,
- lý do từ chối hoặc hoàn tiền ở mức mô tả hỗ trợ,
- ghi chú hướng dẫn người dùng tiếp theo.

---

## 15. Thông báo và nhật ký trong quy trình rút tiền

## 15.1 Sự kiện thông báo cho người dùng R20

Các thời điểm nên phát thông báo:

- tạo yêu cầu rút thành công,
- yêu cầu được quản trị viên duyệt,
- yêu cầu bị từ chối,
- yêu cầu đã được gửi xử lý,
- yêu cầu hoàn thành,
- yêu cầu hoàn tiền,
- yêu cầu bị hủy thành công (nếu bật quyền tự hủy).

## 15.2 Sự kiện nhật ký quản trị bắt buộc

Bắt buộc ghi nhật ký quản trị cho các thao tác của R30:

- nhận xử lý yêu cầu rút,
- duyệt yêu cầu rút,
- từ chối yêu cầu rút,
- cập nhật đã gửi,
- xác nhận hoàn thành,
- hoàn tiền do lỗi,
- tải lên hoặc thay đổi bằng chứng xử lý.

## 15.3 Sự kiện nhật ký hệ thống nên có

- tạo yêu cầu rút và khóa tạm số dư,
- mở khóa số dư tự động theo thao tác từ chối hoặc hủy,
- lỗi giao dịch tài chính,
- lỗi tải tệp bằng chứng,
- phát hiện thao tác lặp hoặc trạng thái không hợp lệ.

---

## 16. Ngoại lệ và tình huống vận hành đặc biệt (chi tiết hóa TL02 mục 14.3)

## 16.1 Rút tiền bị từ chối sau khi đã khóa số dư

### Hướng xử lý
- Thực hiện quy trình QR06.
- Mở khóa số dư về số dư khả dụng.
- Ghi sổ cái và nhật ký quản trị.

### Ràng buộc
- Không được chỉ đổi trạng thái mà quên mở khóa số dư.

## 16.2 Quản trị viên đã duyệt nhưng chưa chi trả và phát hiện sai thông tin nhận tiền

### Hướng xử lý
- Không sửa trực tiếp thông tin nhận tiền chụp nhanh của yêu cầu.
- Thực hiện quy trình QR07 để hoàn số dư.
- Hướng dẫn R20 cập nhật thông tin nhận tiền và tạo yêu cầu mới.

### Ràng buộc
- Bắt buộc ghi rõ lý do hoàn tiền để phục vụ đối soát.

## 16.3 Quản trị viên đã gửi nhưng chuyển khoản thất bại

### Hướng xử lý
- Thu thập bằng chứng lỗi.
- Thực hiện quy trình QR07.
- Chuyển trạng thái **hoàn tiền** và mở khóa số dư.

### Ràng buộc
- Không chuyển về **chờ duyệt** để tránh mơ hồ lịch sử.

## 16.4 Nhà xuất bản tạo nhiều yêu cầu rút liên tiếp gây thiếu số dư cho yêu cầu sau

### Hướng xử lý
- Hệ thống chỉ cho phép tạo yêu cầu khi còn **số dư khả dụng** đủ.
- Các yêu cầu trước đã khóa tạm phải được tính vào kiểm tra số dư.

### Ràng buộc
- Không kiểm tra trên tổng số dư nếu có số dư khóa tạm.

## 16.5 R20 cập nhật thông tin nhận tiền sau khi đã tạo yêu cầu rút

### Hướng xử lý
- Giữ nguyên thông tin nhận tiền chụp nhanh trong yêu cầu cũ.
- Thông tin mới chỉ áp dụng cho yêu cầu tạo sau.

### Ràng buộc
- Màn hình phải hiển thị rõ điều này để tránh hiểu nhầm.

## 16.6 Tài khoản R20 bị khóa khi đang có yêu cầu rút chờ xử lý

### Hướng xử lý
- Không cho tạo yêu cầu mới.
- R30 xem xét yêu cầu đang chờ xử lý theo quy trình vận hành và chính sách rủi ro.
- Mọi quyết định đều phải có nhật ký và lý do.

### Ràng buộc
- Không tự động hoàn thành chi trả chỉ vì yêu cầu đã ở trạng thái **đã duyệt**.

---

## 17. Yêu cầu giao diện liên quan (để chuyển sang TL05 và TL06)

## 17.1 Màn hình phía R20 (TL05 sẽ chi tiết hóa)

Các màn hình hoặc khu chức năng cần có:

- Màn hình cấu hình thông tin nhận tiền
- Màn hình tạo yêu cầu rút tiền
- Danh sách yêu cầu rút tiền
- Chi tiết yêu cầu rút tiền
- Lịch sử trạng thái và thông báo liên quan

### Trường hiển thị cốt lõi cần có

- số dư khả dụng
- số dư khóa tạm
- ngưỡng rút tối thiểu
- phương thức rút hỗ trợ
- thông tin nhận tiền hiện hành
- số tiền yêu cầu
- trạng thái yêu cầu
- lý do từ chối hoặc hoàn tiền (nếu có)
- thời điểm tạo và cập nhật

## 17.2 Màn hình phía R30 (TL06 sẽ chi tiết hóa)

Các màn hình hoặc khu chức năng cần có:

- Danh sách duyệt rút tiền
- Chi tiết yêu cầu rút tiền
- Khu nhập quyết định duyệt hoặc từ chối
- Khu cập nhật đã gửi
- Khu xác nhận hoàn thành
- Khu hoàn tiền do lỗi
- Khu tải và xem bằng chứng xử lý

### Bộ lọc ưu tiên trên danh sách duyệt

- trạng thái yêu cầu
- phương thức rút
- khoảng thời gian tạo
- người dùng
- số tiền
- người xử lý
- cờ rủi ro hoặc cảnh báo

---

## 18. Yêu cầu giao diện lập trình và dữ liệu liên quan (đầu vào cho TL13 và TL15)

## 18.1 Nhóm giao diện lập trình cần có trong TL15

### Cho R20
- tạo yêu cầu rút tiền
- lấy danh sách yêu cầu rút của tôi
- lấy chi tiết yêu cầu rút của tôi
- hủy yêu cầu rút trong trạng thái cho phép
- lấy thông tin số dư và điều kiện rút

### Cho R30
- lấy danh sách yêu cầu rút chờ xử lý
- nhận xử lý yêu cầu rút
- duyệt yêu cầu rút
- từ chối yêu cầu rút
- cập nhật đã gửi
- xác nhận hoàn thành
- hoàn tiền do lỗi
- tải bằng chứng xử lý rút

### Cho R40
- tra cứu danh sách yêu cầu rút theo phạm vi hỗ trợ
- xem chi tiết yêu cầu rút đã che dữ liệu

## 18.2 Nhóm bảng dữ liệu và nhật ký liên quan trong TL13

- bảng yêu cầu rút tiền
- bảng thông tin nhận tiền nhà xuất bản
- bảng ví và số dư
- bảng sổ cái giao dịch
- bảng bằng chứng xử lý rút tiền
- bảng nhật ký quản trị
- bảng nhật ký hệ thống liên quan tài chính

---

## 19. Tiêu chí chấp nhận tài liệu TL09

TL09 được xem là đạt yêu cầu trong vòng hiện tại khi thỏa đồng thời:

1. **Nhất quán trạng thái**
   - dùng đúng tập trạng thái rút tiền theo TL02 mục 13.3,
   - không phát sinh trạng thái ngoài danh sách chuẩn.

2. **Nhất quán phân quyền**
   - chỉ R30 được duyệt hoặc từ chối,
   - quyền R20 hủy yêu cầu chỉ trong trạng thái và điều kiện cho phép,
   - R40 không có quyền xử lý tài chính.

3. **Bảo toàn tiền**
   - mô tả rõ khóa tạm, hoàn số dư, chốt chi rút,
   - mọi thao tác đổi số dư có sổ cái,
   - có ràng buộc chống xử lý trùng.

4. **Có thể triển khai**
   - có luồng chi tiết theo quy trình,
   - có điều kiện trước và sau,
   - có ngoại lệ và tình huống vận hành đặc biệt.

5. **Có khả năng chuyển giao sang tài liệu sau**
   - đã xác định rõ đầu vào cho TL05, TL06, TL13, TL15.

---

## 20. Tự rà soát nhất quán (vòng hiện tại)

### 20.1 Kiểm tra tên trạng thái

- Đã dùng đúng các trạng thái của TL02 mục 13.3:
  - mới tạo, chờ duyệt, đang xử lý, đã duyệt, đã gửi, hoàn thành, từ chối, hoàn tiền.
- Không thêm trạng thái mới ngoài danh sách chuẩn.

### 20.2 Kiểm tra vai trò

- R20 là nhà xuất bản và là người tạo yêu cầu rút.
- R30 là vai trò duy nhất xử lý quyết định tài chính.
- R40 chỉ tra cứu hỗ trợ, không xử lý tiền.

### 20.3 Kiểm tra nguyên tắc tài chính

- Có mô tả khóa tạm khi tạo yêu cầu rút.
- Có mô tả mở khóa khi từ chối hoặc hoàn tiền.
- Có mô tả chốt chi rút khi hoàn thành.
- Có yêu cầu giao dịch xử lý nguyên tử cho thao tác nhạy cảm.

### 20.4 Kiểm tra truy vết tài liệu

- Có truy vết về TL02 cho NV07, NV08, NV12, NV13, NV14, NV15, NV39, NV40.
- Có truy vết về TL03 cho quyền theo vai trò và theo trạng thái.
- Có truy vết nguyên tắc tài chính sang TL08 để đồng nhất cách xử lý tiền.

---

## 21. Đề xuất tài liệu tiếp theo (ưu tiên cao)

### TL10 — Đặc tả quy trình quản lý chiến dịch tính theo lượt

Lý do ưu tiên tiếp theo:
- Đây là lõi phía **khách hàng mua chiến dịch**.
- Ảnh hưởng trực tiếp tới trừ tiền theo lượt và báo cáo chi tiêu.
- Cần chốt sớm để các tài liệu màn hình và giao diện lập trình không bị lệch luồng trạng thái chiến dịch.

