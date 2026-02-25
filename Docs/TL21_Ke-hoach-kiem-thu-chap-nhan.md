# TL21 — Kế hoạch kiểm thử chấp nhận

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL21
- **Tên tài liệu:** Kế hoạch kiểm thử chấp nhận
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19
- **Tài liệu đầu ra phụ thuộc:** TL20, TL22, TL23 và biên bản nghiệm thu phiên bản đầu

---

## 2. Mục tiêu và nguyên tắc

## 2.1 Mục tiêu

TL21 xác định cách kiểm thử chấp nhận cho toàn bộ nền tảng hai phía, bảo đảm trước khi phát hành phiên bản đầu:

- nghiệp vụ lõi chạy đúng theo TL02
- phân quyền đúng theo TL03
- tài chính nạp rút và sổ cái không sai lệch
- chiến dịch tính theo lượt và doanh thu nhà xuất bản vận hành nhất quán
- định nghĩa lượt hợp lệ và chống gian lận bám TL12
- giao diện lập trình bám TL15, mã trạng thái và mã lỗi bám TL14
- ghi nhận sự kiện, tổng hợp và đối soát bám TL16
- cấu hình hệ thống vận hành đúng vòng đời bám TL17
- nhật ký, giám sát, cảnh báo bám TL18
- yêu cầu bảo mật tối thiểu bám TL19

## 2.2 Nguyên tắc xuyên suốt

- Kiểm thử chấp nhận ưu tiên **rủi ro nghiệp vụ và rủi ro tiền** trước.
- Mọi ca kiểm thử phải truy vết được về:
  - mã chức năng nghiệp vụ trong TL02
  - vai trò trong TL03
  - đường dẫn giao diện lập trình trong TL15 khi có liên quan
- Không chấp nhận kết quả “đúng giao diện nhưng sai sổ cái”.
- Không chấp nhận kết quả “đúng tạm thời nhưng sai số liệu chốt”.
- Tách rõ:
  - kết quả tạm thời
  - kết quả đã chốt đối soát
- Không dùng dữ liệu thật của khách hàng trong môi trường kiểm thử chấp nhận.

---

## 3. Chuẩn hóa mã tài liệu và xử lý lệch tham chiếu

Trong các tài liệu trước có xuất hiện lệch tên TL21 ở một số chỗ. TL21 này chốt chuẩn như sau:

- **Mã TL21:** Kế hoạch kiểm thử chấp nhận
- Nội dung TL21 bao gồm:
  - kế hoạch
  - phạm vi
  - kịch bản
  - tiêu chí chấp nhận
  - mẫu báo cáo kết quả

Nếu tài liệu khác tham chiếu TL21 với tên gọi khác, áp dụng tên chuẩn trong TL21 này để tránh hiểu sai.

---

## 4. Phạm vi kiểm thử chấp nhận

## 4.1 Trong phạm vi

- Cổng khách hàng mua chiến dịch
- Cổng nhà xuất bản
- Cổng quản trị
- Cổng chuyển hướng công khai
- Giao diện lập trình phiên bản đầu
- Quy trình nạp tiền thủ công
- Quy trình rút tiền thủ công
- Quản lý chiến dịch tính theo lượt
- Rút gọn liên kết và tính doanh thu nhà xuất bản
- Chống gian lận và đánh giá lượt hợp lệ
- Ghi nhận sự kiện và tổng hợp thống kê
- Cấu hình hệ thống và tham số vận hành
- Nhật ký, giám sát, cảnh báo
- Kiểm soát bảo mật tối thiểu

## 4.2 Ngoài phạm vi của TL21

- Kiểm thử hiệu năng tải lớn cuối cùng ở quy mô sản xuất
- Kiểm thử xâm nhập chuyên sâu bởi đơn vị độc lập
- Kiểm thử tuân thủ pháp lý chi tiết theo từng quốc gia ngoài phạm vi tài liệu kỹ thuật hiện tại
- Kiểm thử tích hợp với cổng thanh toán tự động (vì phiên bản đầu là thủ công)

## 4.3 Phạm vi thiết bị và trình duyệt tối thiểu

- Máy tính để bàn:
  - trình duyệt phổ biến bản mới
- Điện thoại:
  - trình duyệt phổ biến trên hệ điều hành di động
- Kiểm thử giao diện đáp ứng tối thiểu cho các màn hình lõi:
  - đăng nhập
  - nạp tiền
  - tạo chiến dịch
  - tạo liên kết
  - rút tiền
  - bảng điều khiển
  - trang chuyển hướng công khai

---

## 5. Vai trò tham gia kiểm thử chấp nhận

## 5.1 Vai trò nghiệp vụ và tài khoản kiểm thử

- **R10 — Khách hàng mua chiến dịch**
- **R20 — Nhà xuất bản**
- **R30 — Quản trị viên**
- **R40 — Nhân viên hỗ trợ**
- **R01 — Người truy cập liên kết ngắn** (vai trò công khai, không đăng nhập)

## 5.2 Vai trò thực hiện kiểm thử

- Người kiểm thử nghiệp vụ
- Người kiểm thử giao diện lập trình
- Người kiểm thử vận hành
- Người kiểm thử an toàn hệ thống cơ bản
- Người xác nhận nghiệp vụ cuối
- Người phê duyệt phát hành

## 5.3 Nguyên tắc phân tách nhiệm vụ trong kiểm thử

- Người tạo dữ liệu kiểm thử tài chính không đồng thời là người duyệt toàn bộ kết quả đối soát cuối.
- Các ca kiểm thử thao tác nhạy cảm phải có nhật ký người thực hiện và người xác nhận.
- Các ca kiểm thử bảo mật tối thiểu phải được chạy sau khi khóa cấu hình phiên bản dự kiến phát hành.

---

## 6. Điều kiện vào và điều kiện ra của giai đoạn kiểm thử chấp nhận

## 6.1 Điều kiện vào

Bắt buộc thỏa mãn tất cả:

- Có phiên bản ứng dụng triển khai trên môi trường kiểm thử chấp nhận ổn định.
- Có tài liệu TL01 đến TL19 phiên bản hiện hành.
- Có bộ mã trạng thái và mã lỗi theo TL14 đã nạp vào hệ thống.
- Có dữ liệu cấu hình cơ bản theo TL17:
  - giá theo lượt
  - ngưỡng rút
  - cấu hình ngân hàng
  - cấu hình ví USDT
  - tham số chống gian lận tối thiểu
- Có bộ tài khoản kiểm thử theo vai trò R10, R20, R30, R40.
- Có công cụ xem nhật ký và giám sát theo TL18.
- Có cơ chế sao lưu và khôi phục tối thiểu sẵn sàng theo TL19.
- Có danh sách ca kiểm thử được phê duyệt.

## 6.2 Điều kiện ra

Hoàn tất giai đoạn kiểm thử chấp nhận khi đồng thời thỏa mãn:

- Tất cả ca kiểm thử mức nghiêm trọng rất cao và cao đều đạt.
- Không còn lỗi mở mức nghiêm trọng rất cao hoặc cao.
- Lỗi mức trung bình còn lại có phương án xử lý và được chấp thuận bằng văn bản nội bộ.
- Đối soát thử nghiệm tài chính và số liệu lượt không có sai lệch chưa giải thích.
- Nhật ký kiểm toán cho các thao tác nhạy cảm tồn tại đầy đủ theo mẫu.
- Biên bản nghiệm thu vòng kiểm thử chấp nhận được ký xác nhận.

---

## 7. Chiến lược kiểm thử chấp nhận

## 7.1 Thứ tự ưu tiên kiểm thử

Thực hiện theo thứ tự để giảm rủi ro phát hiện muộn:

1. Tài khoản, phân quyền, bảo mật cơ bản
2. Nạp tiền thủ công và sổ cái
3. Rút tiền thủ công và sổ cái
4. Tạo liên kết rút gọn và ghi nhận sự kiện công khai
5. Tạo chiến dịch tính theo lượt
6. Định nghĩa lượt hợp lệ và chống gian lận
7. Tổng hợp thống kê, đối soát, kết chuyển doanh thu
8. Cấu hình và thay đổi cấu hình
9. Nhật ký, giám sát, cảnh báo
10. Kịch bản liên thông đầu cuối
11. Hồi quy trọng yếu trước phát hành

## 7.2 Tầng kiểm thử trong giai đoạn chấp nhận

- **Kiểm thử chức năng**
- **Kiểm thử liên thông**
- **Kiểm thử dữ liệu và đối soát**
- **Kiểm thử phân quyền**
- **Kiểm thử ngoại lệ**
- **Kiểm thử vận hành tối thiểu**
- **Kiểm thử an toàn tối thiểu**
- **Kiểm thử hồi quy trọng yếu**

## 7.3 Nguyên tắc truy vết ca kiểm thử

Mỗi ca kiểm thử phải có:

- mã ca kiểm thử
- mô tả mục tiêu
- tài liệu nguồn tham chiếu
- mã chức năng NV trong TL02
- vai trò thực hiện
- dữ liệu đầu vào
- bước thực hiện
- kết quả mong đợi
- trạng thái đạt hoặc không đạt
- bằng chứng
- người thực hiện
- thời gian thực hiện

---

## 8. Quy ước mã ca kiểm thử

## 8.1 Cấu trúc mã

Dùng cấu trúc:

`TC-<nhóm>-<số thứ tự 3 chữ số>`

Ví dụ:

- `TC-AUTH-001`
- `TC-NAP-012`
- `TC-RUT-007`
- `TC-CD-021`
- `TC-LK-014`
- `TC-GL-009`
- `TC-DOISOAT-005`
- `TC-CFG-006`
- `TC-LOG-004`
- `TC-BM-003`
- `TC-E2E-002`
- `TC-HQ-010`

## 8.2 Nhóm mã ca kiểm thử

- `AUTH` — tài khoản, xác thực, phân quyền
- `NAP` — nạp tiền thủ công
- `RUT` — rút tiền thủ công
- `LK` — liên kết rút gọn và truy cập công khai
- `CD` — chiến dịch tính theo lượt
- `GL` — chống gian lận và lượt hợp lệ
- `THONGKE` — tổng hợp, báo cáo
- `DOISOAT` — đối soát, kết chuyển
- `CFG` — cấu hình hệ thống
- `LOG` — nhật ký, giám sát, cảnh báo
- `BM` — bảo mật tối thiểu
- `E2E` — liên thông đầu cuối
- `HQ` — hồi quy trọng yếu

---

## 9. Môi trường kiểm thử và dữ liệu kiểm thử

## 9.1 Môi trường kiểm thử chấp nhận

Môi trường kiểm thử chấp nhận phải có các thành phần sau:

- giao diện người dùng
- máy chủ giao diện lập trình
- cơ sở dữ liệu
- bộ nhớ đệm
- hàng đợi xử lý nền
- kho tệp cho chứng từ và ảnh cấu hình
- hệ thống nhật ký tập trung
- hệ thống giám sát và cảnh báo tối thiểu

Yêu cầu:

- Cấu hình phải gần giống môi trường phát hành dự kiến ở mức kiến trúc.
- Có thể xóa và nạp lại dữ liệu kiểm thử theo lô.
- Có đồng hồ hệ thống đồng bộ thời gian giữa các thành phần.

## 9.2 Bộ dữ liệu kiểm thử chuẩn

### Dữ liệu tài khoản

- 02 tài khoản R10 hoạt động
- 02 tài khoản R20 hoạt động
- 01 tài khoản R30
- 01 tài khoản R40
- 01 tài khoản mỗi vai trò bị khóa để kiểm thử ngoại lệ
- 01 tài khoản có ngôn ngữ mặc định tiếng Việt
- 01 tài khoản có ngôn ngữ mặc định tiếng Anh

### Dữ liệu cấu hình

- ít nhất 01 cấu hình giá theo lượt đang hiệu lực
- ít nhất 01 cấu hình ngưỡng rút đang hiệu lực
- ít nhất 01 cấu hình ngân hàng bật
- ít nhất 01 cấu hình ví USDT bật
- tham số chống gian lận ở mức kiểm thử rõ ràng, dễ tái lập

### Dữ liệu liên kết và chiến dịch

- 03 liên kết rút gọn hoạt động
- 01 liên kết tạm khóa
- 01 liên kết lỗi hoặc đích không hợp lệ để kiểm thử ngoại lệ
- 03 chiến dịch ở trạng thái khác nhau:
  - nháp
  - chờ duyệt
  - đang chạy
- 01 chiến dịch hết ngân sách
- 01 chiến dịch bị từ chối

### Dữ liệu tài chính

- hóa đơn nạp đủ các trạng thái trọng yếu
- yêu cầu rút đủ các trạng thái trọng yếu
- ví có số dư đủ và ví không đủ số dư
- dữ liệu sổ cái có các giao dịch nạp, khóa tạm, mở khóa, chi rút, kết chuyển doanh thu

## 9.3 Quy tắc làm mới dữ liệu

- Làm mới dữ liệu trước mỗi vòng kiểm thử hồi quy trọng yếu.
- Với ca kiểm thử tài chính, phải ghi rõ bộ dữ liệu gốc và số dư trước khi chạy.
- Không tái sử dụng hóa đơn nạp và yêu cầu rút đã dùng trong ca kiểm thử trước nếu có thể gây nhầm kết quả.

---

## 10. Danh mục kiểm thử chấp nhận theo nhóm chức năng

## 10.1 Nhóm AUTH — tài khoản, xác thực, phân quyền

### Mục tiêu

Bảo đảm:

- đăng ký, đăng nhập, đổi mật khẩu chạy đúng
- phân quyền đúng theo TL03
- vai trò không truy cập vượt quyền
- nhật ký và cảnh báo bảo mật cơ bản được tạo khi cần

### Ca kiểm thử trọng yếu tối thiểu

- `TC-AUTH-001` Đăng nhập thành công đúng vai trò và điều hướng đúng cổng
- `TC-AUTH-002` Từ chối đăng nhập sai mật khẩu
- `TC-AUTH-003` Khóa tạm sau nhiều lần sai theo cấu hình
- `TC-AUTH-004` R10 không truy cập được màn hình quản trị
- `TC-AUTH-005` R40 chỉ xem được phần hỗ trợ được phép, không thấy dữ liệu nhạy cảm đầy đủ
- `TC-AUTH-006` R30 thao tác nhạy cảm yêu cầu xác thực bổ sung nếu cấu hình bật
- `TC-AUTH-007` Đổi mật khẩu thành công làm vô hiệu phiên cũ theo chính sách
- `TC-AUTH-008` Chuyển ngôn ngữ hiển thị Việt/Anh và phản hồi giao diện lập trình theo chuẩn

### Kết quả mong đợi chung

- Mã lỗi và thông báo bám TL14
- Không rò dữ liệu nhạy cảm
- Có nhật ký phù hợp theo TL18
- Chính sách phiên và bảo mật bám TL19

---

## 10.2 Nhóm NAP — nạp tiền thủ công

### Mục tiêu

Bảo đảm quy trình theo TL08 chạy đúng, không cộng tiền trùng, sổ cái chính xác.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-NAP-001` Tạo hóa đơn nạp thành công và sinh nội dung tham chiếu
- `TC-NAP-002` Tải chứng từ hợp lệ thành công
- `TC-NAP-003` Từ chối tệp chứng từ sai định dạng hoặc vượt kích thước
- `TC-NAP-004` Quản trị duyệt hóa đơn và cộng số dư đúng
- `TC-NAP-005` Quản trị từ chối hóa đơn, không cộng số dư
- `TC-NAP-006` Hóa đơn hết hạn không cho duyệt theo luồng chuẩn nếu không qua ngoại lệ có ghi lý do
- `TC-NAP-007` Chống duyệt trùng cùng hóa đơn
- `TC-NAP-008` Thử nhận lại yêu cầu duyệt trùng từ giao diện lập trình, số dư không đổi lần hai
- `TC-NAP-009` Nhật ký kiểm toán đầy đủ cho thao tác duyệt/từ chối
- `TC-NAP-010` Hiển thị trạng thái hóa đơn đúng theo TL14 ở cả giao diện và giao diện lập trình

### Kiểm tra chéo bắt buộc

- so sánh hóa đơn nạp
- so sánh số dư ví
- so sánh sổ cái giao dịch
- so sánh nhật ký kiểm toán

---

## 10.3 Nhóm RUT — rút tiền thủ công

### Mục tiêu

Bảo đảm quy trình theo TL09 chạy đúng, khóa tạm số dư chính xác, phân biệt rõ từ chối và hoàn tiền.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-RUT-001` Tạo yêu cầu rút thành công khi đủ số dư khả dụng
- `TC-RUT-002` Từ chối tạo yêu cầu rút khi dưới ngưỡng
- `TC-RUT-003` Từ chối tạo yêu cầu rút khi số dư khả dụng không đủ
- `TC-RUT-004` Tạo yêu cầu rút thành công làm tăng số dư khóa tạm và giảm số dư khả dụng đúng
- `TC-RUT-005` Quản trị duyệt yêu cầu rút, chuyển trạng thái đúng
- `TC-RUT-006` Quản trị từ chối yêu cầu rút, mở khóa số dư đúng
- `TC-RUT-007` Hoàn tiền sau trạng thái đã gửi theo quy trình ngoại lệ, sổ cái đúng
- `TC-RUT-008` Chống xử lý trùng yêu cầu rút
- `TC-RUT-009` Nhân viên hỗ trợ không được duyệt nhưng có thể xem thông tin che bớt
- `TC-RUT-010` Nhật ký kiểm toán và bằng chứng xử lý rút được ghi đầy đủ

### Kiểm tra chéo bắt buộc

- số dư khả dụng
- số dư khóa tạm
- sổ cái
- trạng thái yêu cầu rút
- nhật ký kiểm toán

---

## 10.4 Nhóm LK — liên kết rút gọn và truy cập công khai

### Mục tiêu

Bảo đảm quy trình TL11 và phần công khai TL15 chạy đúng, trạng thái liên kết đúng, sự kiện truy cập được ghi nhận.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-LK-001` R20 tạo liên kết rút gọn thành công
- `TC-LK-002` Từ chối bí danh trùng
- `TC-LK-003` Từ chối liên kết đích không hợp lệ theo chính sách
- `TC-LK-004` Tạm khóa liên kết và không cho chuyển hướng công khai
- `TC-LK-005` Liên kết hoạt động chuyển hướng thành công sau bước xác minh hợp lệ
- `TC-LK-006` Liên kết lỗi hoặc đích lỗi chuyển sang đường dẫn dự phòng nếu có
- `TC-LK-007` Người truy cập gửi báo lỗi liên kết và hệ thống ghi nhận
- `TC-LK-008` R20 xem thống kê liên kết của chính mình, không xem được liên kết của R20 khác
- `TC-LK-009` Ghi nhận sự kiện truy cập tạo bản ghi sự kiện lượt với trạng thái ban đầu đúng
- `TC-LK-010` Trạng thái liên kết hiển thị đúng mã trạng thái theo TL14

---

## 10.5 Nhóm CD — chiến dịch tính theo lượt

### Mục tiêu

Bảo đảm vòng đời chiến dịch theo TL10, phân quyền theo TL03, trừ tiền theo lượt hợp lệ đúng logic.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-CD-001` R10 tạo chiến dịch nháp thành công
- `TC-CD-002` Cập nhật chiến dịch nháp thành công
- `TC-CD-003` Gửi duyệt chiến dịch hợp lệ thành công
- `TC-CD-004` Quản trị duyệt chiến dịch và chuyển trạng thái đúng
- `TC-CD-005` Quản trị từ chối chiến dịch và ghi lý do
- `TC-CD-006` Không cho sửa trường khóa khi chiến dịch đang chạy nếu TL10 cấm
- `TC-CD-007` Tạm dừng và tiếp tục chiến dịch đúng quyền
- `TC-CD-008` Tự dừng khi hết ngân sách
- `TC-CD-009` Không trừ tiền khi sự kiện bị loại
- `TC-CD-010` Trừ tiền đúng một lần khi sự kiện hợp lệ tạm thời
- `TC-CD-011` Điều chỉnh đối soát sau chốt tạo bút toán bù đúng
- `TC-CD-012` Chiến dịch bị hủy không nhận thêm trừ tiền cho sự kiện đến trễ
- `TC-CD-013` R10 chỉ xem được chiến dịch của mình
- `TC-CD-014` Trạng thái chiến dịch đủ 10 trạng thái hiển thị và chuyển đổi đúng theo TL02/TL14

---

## 10.6 Nhóm GL — chống gian lận và định nghĩa lượt hợp lệ

### Mục tiêu

Bảo đảm TL12 được áp dụng thống nhất cho cả chiến dịch và doanh thu nhà xuất bản.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-GL-001` Sự kiện thiếu dữ liệu bắt buộc bị loại tạm thời đúng lý do
- `TC-GL-002` Sự kiện vượt giới hạn tần suất bị loại hoặc gắn cờ đúng theo cấu hình
- `TC-GL-003` Sự kiện trùng bị phát hiện và không tính hai lần
- `TC-GL-004` Sự kiện điểm rủi ro cao chuyển kiểm tra thủ công
- `TC-GL-005` Quản trị quyết định kiểm tra thủ công và cập nhật trạng thái đúng
- `TC-GL-006` Nhân viên hỗ trợ chỉ tra cứu và ghi chú, không quyết định cuối
- `TC-GL-007` Lý do loại lượt và lý do kiểm tra thủ công dùng đúng danh mục mã TL14
- `TC-GL-008` Sự kiện hợp lệ dùng được đồng thời cho:
  - trừ tiền chiến dịch
  - doanh thu nhà xuất bản
  theo quy trình liên quan
- `TC-GL-009` Sự kiện đến trễ sau chốt được xử lý theo chính sách TL16/TL17
- `TC-GL-010` Nhật ký quyết định chống gian lận đầy đủ, truy vết được người thao tác

---

## 10.7 Nhóm THONGKE và DOISOAT — tổng hợp, báo cáo, đối soát, kết chuyển

### Mục tiêu

Bảo đảm TL16 chạy đúng, tách số liệu tạm thời và đã chốt, chống kết chuyển trùng.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-THONGKE-001` Tổng hợp gần thực cập nhật số liệu tạm thời đúng
- `TC-THONGKE-002` Báo cáo theo ngày hiển thị đúng múi giờ người dùng theo cấu hình
- `TC-THONGKE-003` Bộ lọc theo vai trò không rò dữ liệu ngoài phạm vi
- `TC-DOISOAT-001` Chốt kỳ đối soát tạo số liệu đã chốt đúng
- `TC-DOISOAT-002` Kết chuyển doanh thu nhà xuất bản vào ví đúng một lần
- `TC-DOISOAT-003` Chống chạy lại kết chuyển trùng cùng kỳ
- `TC-DOISOAT-004` Điều chỉnh sau chốt tạo bản ghi điều chỉnh và sổ cái đúng
- `TC-DOISOAT-005` Sự kiện đến trễ sau chốt xử lý theo cấu hình và được ghi nhật ký
- `TC-DOISOAT-006` Đối chiếu báo cáo, sổ cái, doanh thu nhà xuất bản không sai lệch không giải thích được

### Kiểm tra chéo bắt buộc

- bảng sự kiện lượt
- bảng tổng hợp theo ngày
- bảng doanh thu nhà xuất bản
- ví và sổ cái
- nhật ký đối soát
- cảnh báo nếu có

---

## 10.8 Nhóm CFG — cấu hình hệ thống và tham số vận hành

### Mục tiêu

Bảo đảm vòng đời cấu hình theo TL17 hoạt động đúng, có chụp cấu hình áp dụng.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-CFG-001` Tạo cấu hình nháp thành công
- `TC-CFG-002` Từ chối cấu hình thiếu trường bắt buộc hoặc chồng chéo hiệu lực
- `TC-CFG-003` Duyệt và xuất bản cấu hình đúng quyền R30
- `TC-CFG-004` R40 không được xuất bản cấu hình
- `TC-CFG-005` Cấu hình mới có hiệu lực đúng thời điểm
- `TC-CFG-006` Hoàn tác cấu hình theo quy trình và ghi nhật ký đầy đủ
- `TC-CFG-007` Chụp cấu hình áp dụng cho giao dịch tài chính và sự kiện được lưu đúng
- `TC-CFG-008` Bộ nhớ đệm cấu hình làm mới đúng sau xuất bản
- `TC-CFG-009` Thông báo song ngữ lấy đúng nội dung theo ngôn ngữ người dùng

---

## 10.9 Nhóm LOG — nhật ký, giám sát, cảnh báo vận hành

### Mục tiêu

Bảo đảm TL18 hoạt động đủ mức tối thiểu để hỗ trợ vận hành và điều tra sự cố.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-LOG-001` Mọi yêu cầu giao diện lập trình trọng yếu có mã yêu cầu và truy vết được
- `TC-LOG-002` Thao tác duyệt nạp/rút sinh nhật ký kiểm toán bất biến
- `TC-LOG-003` Dữ liệu nhạy cảm trong nhật ký được che đúng quy tắc
- `TC-LOG-004` Cảnh báo được tạo khi lỗi hàng đợi xử lý nền vượt ngưỡng
- `TC-LOG-005` Cảnh báo chống trùng và chống nhiễu hoạt động đúng
- `TC-LOG-006` Quy trình xác nhận và đóng cảnh báo ghi nhận người thao tác
- `TC-LOG-007` Chỉ số giám sát lõi hiển thị được cho:
  - nạp/rút
  - chiến dịch
  - liên kết/doanh thu
  - chống gian lận
  - đối soát

---

## 10.10 Nhóm BM — bảo mật và an toàn hệ thống tối thiểu

### Mục tiêu

Xác nhận các yêu cầu tối thiểu trong TL19 đã được áp dụng trước phát hành phiên bản đầu.

### Ca kiểm thử trọng yếu tối thiểu

- `TC-BM-001` Kiểm tra kiểm soát truy cập theo vai trò trên các đường dẫn nhạy cảm
- `TC-BM-002` Kiểm tra phiên hết hiệu lực và đăng xuất khỏi phiên cũ theo chính sách
- `TC-BM-003` Kiểm tra tải tệp chứng từ chặn định dạng không cho phép
- `TC-BM-004` Kiểm tra giới hạn kích thước tệp và quét an toàn đầu vào theo quy định hệ thống
- `TC-BM-005` Kiểm tra mã lỗi không lộ thông tin nội bộ nhạy cảm
- `TC-BM-006` Kiểm tra bí mật hệ thống không xuất hiện trong nhật ký ứng dụng
- `TC-BM-007` Kiểm tra sao lưu thử và khôi phục thử trên tập dữ liệu nhỏ thành công
- `TC-BM-008` Kiểm tra cảnh báo bảo mật cơ bản khi đăng nhập bất thường theo cấu hình

---

## 11. Kịch bản liên thông đầu cuối trọng yếu

## 11.1 Kịch bản E2E-001 — luồng nhà xuất bản đầy đủ

### Mục tiêu

Kiểm tra chuỗi nghiệp vụ đầy đủ của R20 từ tạo liên kết đến doanh thu và rút tiền.

### Bước chính

1. R20 tạo liên kết rút gọn
2. R01 truy cập liên kết, hoàn thành bước xác minh hợp lệ
3. Hệ thống ghi nhận sự kiện lượt
4. Hệ thống đánh giá sự kiện theo TL12
5. Hệ thống tổng hợp số liệu tạm thời
6. Chốt đối soát theo kỳ
7. Kết chuyển doanh thu vào ví R20
8. R20 tạo yêu cầu rút
9. R30 duyệt hoặc từ chối
10. Kiểm tra sổ cái, trạng thái, nhật ký, cảnh báo

### Kết quả mong đợi

- Không có bước nào bị tính trùng
- Doanh thu chỉ vào ví sau chốt đối soát
- Rút tiền chỉ xử lý trên số dư khả dụng
- Nhật ký đầy đủ theo TL18 và TL19

## 11.2 Kịch bản E2E-002 — luồng khách hàng mua chiến dịch đầy đủ

### Mục tiêu

Kiểm tra chuỗi nghiệp vụ đầy đủ của R10 từ nạp tiền đến tạo chiến dịch và trừ tiền theo lượt hợp lệ.

### Bước chính

1. R10 tạo hóa đơn nạp và tải chứng từ
2. R30 duyệt hóa đơn, cộng số dư
3. R10 tạo chiến dịch và gửi duyệt
4. R30 duyệt chiến dịch
5. Hệ thống nhận sự kiện lượt hợp lệ
6. Hệ thống trừ tiền chiến dịch đúng một lần
7. Hệ thống tổng hợp số liệu tạm thời
8. Chốt đối soát và điều chỉnh nếu có
9. Kiểm tra báo cáo, ví, sổ cái, nhật ký

### Kết quả mong đợi

- Số dư và sổ cái khớp
- Chiến dịch không vượt ngân sách
- Số liệu tạm thời và số liệu đã chốt phân tách rõ
- Mã trạng thái và mã lỗi đúng TL14

## 11.3 Kịch bản E2E-003 — liên thông có gian lận và xử lý thủ công

### Mục tiêu

Kiểm tra luồng sự kiện bị gắn cờ và quyết định thủ công ảnh hưởng đúng đến tài chính.

### Bước chính

1. Tạo sự kiện bị gắn cờ theo tham số chống gian lận
2. Hệ thống chuyển trạng thái cần kiểm tra thủ công
3. R40 tra cứu và ghi chú
4. R30 đưa quyết định cuối
5. Chạy tổng hợp và đối soát
6. Kiểm tra chi tiêu chiến dịch và doanh thu nhà xuất bản phản ánh đúng quyết định

### Kết quả mong đợi

- Quyền hạn đúng TL03
- Trạng thái sự kiện đúng TL02/TL14
- Nhật ký quyết định đầy đủ
- Không có kết chuyển hoặc trừ tiền sai trước hoặc sau quyết định

---

## 12. Kịch bản lỗi và ngoại lệ trọng yếu

## 12.1 Nhóm ngoại lệ tài chính

- Duyệt nạp trùng yêu cầu
- Duyệt rút trùng yêu cầu
- Hóa đơn đã hết hạn nhưng có yêu cầu xử lý ngoại lệ
- Yêu cầu rút đã gửi nhưng cần hoàn tiền
- Mất kết nối giữa cập nhật trạng thái và ghi sổ cái
- Chênh lệch số dư do chạy lại tác vụ nền

## 12.2 Nhóm ngoại lệ sự kiện và đối soát

- Sự kiện đến trễ sau khi chiến dịch đã hủy
- Sự kiện đến trễ sau khi kỳ đối soát đã chốt
- Chạy lại tổng hợp cùng khoảng thời gian
- Chạy lại kết chuyển doanh thu cùng kỳ
- Quyết định kiểm tra thủ công đến sau thời điểm chốt

## 12.3 Nhóm ngoại lệ cấu hình

- Thay đổi giá theo lượt giữa kỳ
- Thay đổi ngưỡng rút trong khi có yêu cầu rút đang chờ xử lý
- Tắt cấu hình ngân hàng đang được dùng bởi hóa đơn chưa xử lý
- Tắt cấu hình ví USDT đang được dùng bởi yêu cầu rút chưa xử lý

## 12.4 Yêu cầu xác nhận cho mọi ngoại lệ

Mỗi ca ngoại lệ phải xác nhận đủ:

- trạng thái thực thể
- số dư và sổ cái
- nhật ký kiểm toán
- cảnh báo nếu có
- khả năng truy vết mã yêu cầu

---

## 13. Kiểm thử giao diện lập trình chấp nhận

## 13.1 Mục tiêu

Xác nhận giao diện lập trình phiên bản đầu triển khai đúng TL15 và TL14.

## 13.2 Nội dung bắt buộc

- đúng phương thức và đường dẫn
- đúng xác thực và phân quyền
- đúng khuôn phản hồi thành công
- đúng khuôn phản hồi lỗi
- đúng mã lỗi
- đúng phân trang, lọc, sắp xếp
- đúng chuẩn thời gian
- đúng chuẩn tiền tệ
- đúng chống xử lý trùng cho tác vụ nhạy cảm
- đúng mã yêu cầu và truy vết nhật ký

## 13.3 Ca kiểm thử trọng yếu mẫu

- `TC-AUTH-008` phản hồi đa ngôn ngữ
- `TC-NAP-008` chống duyệt trùng
- `TC-RUT-008` chống xử lý trùng
- `TC-CD-010` trừ tiền đúng một lần
- `TC-DOISOAT-003` chống kết chuyển trùng
- `TC-LOG-001` mã yêu cầu truy vết được

---

## 14. Kiểm thử giao diện người dùng chấp nhận

## 14.1 Mục tiêu

Xác nhận các màn hình lõi sử dụng được và phản ánh đúng trạng thái nghiệp vụ.

## 14.2 Tiêu chí tối thiểu

- Điều hướng đúng theo vai trò
- Hiển thị đúng trạng thái theo TL14
- Hiển thị đúng thông báo lỗi theo nhóm lỗi
- Không hiển thị thao tác vượt quyền
- Dữ liệu tiền và số liệu hiển thị nhất quán với giao diện lập trình
- Song ngữ hoạt động trên các màn hình lõi
- Tải tệp chứng từ hoạt động ổn định ở luồng nạp/rút
- Trang chuyển hướng công khai hiển thị đúng các trạng thái lỗi và thành công

---

## 15. Kiểm thử dữ liệu, đối chiếu và số liệu

## 15.1 Nguyên tắc đối chiếu

Sau mỗi nhóm ca kiểm thử có phát sinh tiền hoặc số liệu lượt, phải đối chiếu ít nhất:

- trạng thái nghiệp vụ
- bảng sự kiện
- bảng tổng hợp
- bảng doanh thu hoặc chi tiêu
- ví
- sổ cái
- nhật ký kiểm toán

## 15.2 Quy tắc chấp nhận sai lệch

- **Không chấp nhận** sai lệch tiền dù nhỏ nếu không có bút toán điều chỉnh hợp lệ.
- **Không chấp nhận** sai lệch số lượt đã chốt nếu không có nhật ký điều chỉnh hợp lệ.
- Sai lệch số liệu tạm thời chỉ chấp nhận khi:
  - có ghi nhận đang xử lý nền
  - và sau thời gian chờ theo cấu hình phải hội tụ đúng

## 15.3 Mẫu đối chiếu tối thiểu

Mỗi ca trọng yếu cần lưu:

- mã ca kiểm thử
- thời gian chạy
- số liệu trước
- số liệu sau
- bảng đối chiếu
- kết luận
- bằng chứng màn hình và bằng chứng truy vấn

---

## 16. Quản lý lỗi trong giai đoạn kiểm thử chấp nhận

## 16.1 Mức độ nghiêm trọng

### Rất cao

- sai tiền, sai sổ cái, sai đối soát
- rò dữ liệu nhạy cảm
- vượt quyền nhạy cảm
- không thể thực hiện luồng lõi

### Cao

- trạng thái nghiệp vụ sai làm ảnh hưởng xử lý
- mã lỗi hoặc xử lý lỗi sai gây thao tác nhầm
- chống trùng không hoạt động ở tác vụ tài chính
- ghi nhận sự kiện sai làm lệch doanh thu hoặc chi tiêu

### Trung bình

- báo cáo phụ sai
- giao diện hiển thị sai nhưng không ảnh hưởng sổ cái
- cảnh báo chưa đầy đủ nhưng không mất truy vết

### Thấp

- lỗi hiển thị nhỏ
- nội dung thông báo chưa chuẩn câu chữ
- vấn đề trình bày không ảnh hưởng nghiệp vụ

## 16.2 Quy tắc xử lý lỗi trước phát hành

- Lỗi rất cao và cao: bắt buộc sửa và kiểm thử lại.
- Lỗi trung bình: quyết định bởi hội đồng nghiệm thu nội bộ, phải có kế hoạch sửa.
- Lỗi thấp: cho phép ghi nhận và xử lý sau nếu không ảnh hưởng vận hành.

## 16.3 Kiểm thử lại và hồi quy

Mọi lỗi sửa ở nhóm tài chính, chống gian lận, đối soát, phân quyền phải kèm:

- kiểm thử lại ca lỗi
- hồi quy tối thiểu các ca liên quan
- cập nhật biên bản kết quả

---

## 17. Hồi quy trọng yếu trước phát hành

## 17.1 Danh sách hồi quy tối thiểu bắt buộc

- `TC-AUTH-004`, `TC-AUTH-005`
- `TC-NAP-004`, `TC-NAP-007`, `TC-NAP-008`
- `TC-RUT-004`, `TC-RUT-006`, `TC-RUT-008`
- `TC-LK-005`, `TC-LK-009`
- `TC-CD-004`, `TC-CD-008`, `TC-CD-010`, `TC-CD-012`
- `TC-GL-003`, `TC-GL-004`, `TC-GL-005`
- `TC-DOISOAT-002`, `TC-DOISOAT-003`, `TC-DOISOAT-004`
- `TC-CFG-003`, `TC-CFG-007`
- `TC-LOG-002`, `TC-LOG-003`
- `TC-BM-001`, `TC-BM-005`
- `TC-E2E-001`, `TC-E2E-002`

## 17.2 Thời điểm chạy hồi quy

- Sau khi sửa lỗi rất cao hoặc cao
- Trước khóa phiên bản phát hành
- Sau thay đổi cấu hình quan trọng ngay trước phát hành nếu có

---

## 18. Mẫu biểu và đầu ra bắt buộc của giai đoạn kiểm thử chấp nhận

## 18.1 Danh sách đầu ra bắt buộc

- Kế hoạch kiểm thử chấp nhận đã phê duyệt
- Danh sách ca kiểm thử và trạng thái thực hiện
- Biên bản lỗi
- Biên bản đối chiếu tài chính và số liệu
- Biên bản hồi quy
- Biên bản nghiệm thu giai đoạn kiểm thử chấp nhận
- Danh sách rủi ro còn tồn tại và phương án xử lý

## 18.2 Mẫu bản ghi kết quả ca kiểm thử

Các trường tối thiểu:

- mã ca kiểm thử
- tên ca kiểm thử
- tài liệu tham chiếu
- phiên bản ứng dụng
- môi trường
- người thực hiện
- thời gian
- dữ liệu đầu vào
- bước thực hiện
- kết quả mong đợi
- kết quả thực tế
- đạt hoặc không đạt
- mã lỗi phát sinh nếu có
- bằng chứng đính kèm
- ghi chú

## 18.3 Mẫu biên bản đối chiếu tài chính và số liệu

Các mục tối thiểu:

- phạm vi ca kiểm thử
- danh sách thực thể liên quan
- số dư trước và sau
- sổ cái liên quan
- trạng thái nghiệp vụ liên quan
- số liệu lượt tạm thời và đã chốt
- kết luận khớp hoặc không khớp
- nguyên nhân và hướng xử lý nếu không khớp

---

## 19. Ma trận truy vết tối thiểu giữa tài liệu và nhóm kiểm thử

## 19.1 Truy vết theo tài liệu nghiệp vụ

- **TL02** → tất cả nhóm ca kiểm thử chức năng và liên thông
- **TL03** → AUTH, NAP, RUT, CD, GL, CFG, BM
- **TL08** → NAP
- **TL09** → RUT
- **TL10** → CD
- **TL11** → LK, DOISOAT, E2E
- **TL12** → GL, DOISOAT, E2E
- **TL13** → kiểm thử dữ liệu, đối chiếu, truy vấn xác nhận
- **TL14** → mã trạng thái, mã lỗi, danh mục mã trong tất cả nhóm
- **TL15** → kiểm thử giao diện lập trình
- **TL16** → THONGKE, DOISOAT, E2E
- **TL17** → CFG, GL, DOISOAT
- **TL18** → LOG
- **TL19** → BM, AUTH, LOG

## 19.2 Truy vết theo mã chức năng NV

TL21 không liệt kê lại toàn bộ chi tiết NV01–NV45 vì đã có ma trận trong TL15. Quy định bắt buộc:

- Mỗi ca kiểm thử khi lập danh sách thực thi phải gắn ít nhất 01 mã NV trong TL02.
- Các ca liên thông phải gắn nhiều mã NV theo chuỗi nghiệp vụ thực tế.
- Không để trống truy vết mã NV đối với ca kiểm thử chấp nhận.

---

## 20. Tiêu chí chấp nhận tài liệu TL21

TL21 được xem là đạt khi:

- Bao phủ đầy đủ nhóm nghiệp vụ lõi của phiên bản đầu
- Có điều kiện vào và điều kiện ra rõ ràng
- Có tiêu chí chấp nhận phát hành rõ ràng
- Có kịch bản liên thông đầu cuối
- Có yêu cầu đối chiếu tài chính và số liệu
- Có yêu cầu kiểm thử phân quyền, nhật ký, bảo mật tối thiểu
- Truy vết được tới TL02, TL03, TL08–TL19
- Không mâu thuẫn với TL14 và TL15 về mã trạng thái, mã lỗi, giao diện lập trình

---

## 21. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Giữ đúng tên chuẩn TL21 theo TL01
- [x] Không mâu thuẫn quy trình nạp tiền trong TL08
- [x] Không mâu thuẫn quy trình rút tiền trong TL09
- [x] Không mâu thuẫn vòng đời chiến dịch trong TL10
- [x] Không mâu thuẫn quy trình liên kết và doanh thu trong TL11
- [x] Không mâu thuẫn định nghĩa lượt hợp lệ và chống gian lận trong TL12
- [x] Không mâu thuẫn mô hình dữ liệu và sổ cái trong TL13
- [x] Không mâu thuẫn mã trạng thái, mã lỗi, danh mục mã trong TL14
- [x] Không mâu thuẫn quy ước giao diện lập trình trong TL15
- [x] Không mâu thuẫn tổng hợp và đối soát trong TL16
- [x] Không mâu thuẫn vòng đời cấu hình trong TL17
- [x] Không mâu thuẫn nhật ký, giám sát, cảnh báo trong TL18
- [x] Không mâu thuẫn yêu cầu bảo mật tối thiểu trong TL19
- [x] Phân biệt rõ ca kiểm thử chức năng, liên thông, dữ liệu, bảo mật, vận hành

---

## 22. Đầu vào cho tài liệu tiếp theo

- **TL20 — Đặc tả màn hình và trải nghiệm người dùng**
  - sử dụng TL21 để xác định màn hình nào phải ưu tiên kiểm thử thủ công chi tiết
- **TL22 — Đặc tả vận hành, triển khai và ứng cứu sự cố**
  - sử dụng TL21 để xác định tiêu chí sẵn sàng vận hành sau khi kiểm thử chấp nhận
- **TL23 — Điều khoản sử dụng, chính sách nội bộ và tuân thủ hiển thị**
  - sử dụng TL21 để kiểm tra hiện diện các thông báo và nội dung bắt buộc trên giao diện

---

## 23. Ghi chú cuối tài liệu

- TL21 là kế hoạch kiểm thử chấp nhận cho **phiên bản đầu** của nền tảng hợp lệ đã chốt phạm vi trong TL01 và TL02.
- Nếu có thay đổi nghiệp vụ, dữ liệu, trạng thái, mã lỗi hoặc giao diện lập trình sau TL21, phải cập nhật lại:
  - TL21
  - danh sách ca kiểm thử
  - ma trận truy vết
- TL21 không mô tả hay kiểm thử các tính năng nằm ngoài phạm vi hợp lệ đã loại trừ trong TL01 và TL02.
