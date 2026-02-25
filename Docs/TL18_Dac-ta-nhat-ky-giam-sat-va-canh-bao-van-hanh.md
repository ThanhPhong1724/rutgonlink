# TL18 — Đặc tả nhật ký, giám sát và cảnh báo vận hành

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL18
- **Tên tài liệu:** Đặc tả nhật ký, giám sát và cảnh báo vận hành
- **Phiên bản:** 1.0
- **Trạng thái:** Bản dùng cho phân tích, thiết kế, triển khai và kiểm thử
- **Phạm vi áp dụng:** Toàn hệ thống nền tảng hai phía (khách hàng mua chiến dịch, nhà xuất bản, quản trị, cổng chuyển hướng, các dịch vụ xử lý nền)
- **Tài liệu liên quan (đầu vào bắt buộc để đối chiếu):**
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

## 2. Mục tiêu tài liệu

Tài liệu này khóa chuẩn triển khai và vận hành cho ba lớp bắt buộc:

1. **Nhật ký**
   - Ghi nhận đầy đủ các sự kiện hệ thống, nghiệp vụ, bảo mật, tài chính, quản trị.
   - Hỗ trợ truy vết lỗi, đối soát, kiểm toán và điều tra gian lận.

2. **Giám sát**
   - Theo dõi tình trạng dịch vụ, hàng đợi, cơ sở dữ liệu, bộ nhớ đệm, xử lý nền, cổng chuyển hướng, giao diện lập trình, luồng tài chính, luồng tính lượt.
   - Phát hiện sớm suy giảm chất lượng trước khi ảnh hưởng số liệu và tiền.

3. **Cảnh báo vận hành**
   - Cảnh báo kịp thời theo mức độ nghiêm trọng.
   - Có quy tắc chuyển giao, xác nhận, theo dõi xử lý và đóng cảnh báo.
   - Có truy vết người thao tác theo vai trò bám TL03.

## 3. Nguyên tắc nhất quán với bộ tài liệu trước

### 3.1 Nguyên tắc tên gọi và mã hóa
- **Không đổi tên** trạng thái nghiệp vụ đã chốt ở TL02 và mã trạng thái ở TL14.
- **Không tự phát minh** vai trò ngoài bộ vai trò đã chốt ở TL03 (R01, R10, R20, R30, R40).
- **Không thay đổi** định nghĩa lượt hợp lệ và quy trình đánh giá nhiều lớp đã chốt ở TL12.
- **Không thay đổi** quy tắc số liệu tạm thời / số liệu đã chốt đã chốt ở TL10, TL11, TL16.
- **Mã lỗi**, **mã trạng thái**, **danh mục mã** phải dùng đúng TL14 khi ghi nhật ký và cảnh báo.

### 3.2 Nguyên tắc truy vết
Mọi lỗi hoặc cảnh báo liên quan nghiệp vụ phải truy được ít nhất đến:
- mã người dùng (nếu có),
- mã vai trò thực hiện,
- mã thực thể nghiệp vụ (hóa đơn nạp, yêu cầu rút, chiến dịch, liên kết, sự kiện lượt),
- mã yêu cầu hệ thống,
- thời điểm,
- nguồn phát sinh (giao diện, giao diện lập trình, xử lý nền, quản trị).

### 3.3 Nguyên tắc phân tách dữ liệu
- **Nhật ký ứng dụng** khác **nhật ký kiểm toán**.
- **Số liệu giám sát kỹ thuật** khác **số liệu nghiệp vụ**.
- **Cảnh báo vận hành** khác **thông báo người dùng**.
- **Nhật ký thô** khác **dữ liệu tổng hợp báo cáo**.

## 4. Phạm vi áp dụng

## 4.1 Thành phần trong phạm vi giám sát
1. Cổng người dùng (khách hàng mua chiến dịch)
2. Cổng nhà xuất bản
3. Cổng quản trị
4. Cổng chuyển hướng liên kết ngắn
5. Dịch vụ xác thực và phân quyền
6. Dịch vụ ví và sổ cái
7. Dịch vụ nạp tiền thủ công
8. Dịch vụ rút tiền thủ công
9. Dịch vụ quản lý chiến dịch
10. Dịch vụ liên kết rút gọn
11. Dịch vụ ghi nhận sự kiện và đánh giá lượt
12. Dịch vụ tổng hợp thống kê và đối soát (TL16)
13. Bộ nhớ đệm
14. Hàng đợi và tiến trình xử lý nền
15. Cơ sở dữ liệu quan hệ
16. Kho tệp chứng từ / tệp cấu hình ảnh
17. Dịch vụ gửi thư, gửi thông báo, kênh cảnh báo nội bộ
18. Hạ tầng mạng, cân bằng tải (nếu có)

## 4.2 Phạm vi loại trừ
- Nội dung triển khai chi tiết của nhà cung cấp hạ tầng bên thứ ba.
- Thiết kế giao diện màn hình giám sát chi tiết (sẽ được tách ở tài liệu màn hình/triển khai nếu cần).
- Kịch bản ứng cứu sự cố chi tiết theo từng loại (sẽ được làm sâu ở tài liệu vận hành sau).

## 5. Vai trò và trách nhiệm vận hành (bám TL03)

## 5.1 Vai trò sử dụng dữ liệu nhật ký và giám sát
### R30 — Quản trị viên
- Xem toàn bộ nhật ký hệ thống, nhật ký kiểm toán, cảnh báo.
- Cấu hình ngưỡng cảnh báo (thông qua quy trình cấu hình ở TL17).
- Xác nhận, phân công, đóng cảnh báo.
- Thực hiện điều tra, gắn nhãn sự cố, mở hồ sơ xử lý.
- Thao tác truy xuất dữ liệu nhạy cảm phải có nhật ký kiểm toán.

### R40 — Nhân viên hỗ trợ
- Xem bảng theo dõi trạng thái hệ thống ở mức vận hành hỗ trợ.
- Xem cảnh báo và nhật ký theo phạm vi cho phép.
- Ghi chú xử lý, chuyển cấp.
- **Không được** thay đổi ngưỡng cảnh báo, **không được** xóa nhật ký, **không được** truy cập trường nhạy cảm không cần thiết.

### R10 — Khách hàng mua chiến dịch
- Chỉ xem nhật ký hoạt động và trạng thái trong phạm vi tài khoản của mình (ví dụ: lịch sử chiến dịch, trạng thái hóa đơn nạp, lỗi thao tác).
- Không xem nhật ký hệ thống hạ tầng.

### R20 — Nhà xuất bản
- Chỉ xem nhật ký hoạt động và trạng thái trong phạm vi tài khoản của mình (ví dụ: liên kết bị khóa, yêu cầu rút tiền, đối soát doanh thu).
- Không xem nhật ký hệ thống hạ tầng.

### R01 — Người truy cập công khai
- Không có quyền xem dữ liệu nhật ký.
- Chỉ nhận thông báo lỗi công khai đã chuẩn hóa (theo TL14).

## 5.2 Trách nhiệm xử lý cảnh báo theo mức độ
- **Mức khẩn cấp:** R30 trực tiếp chịu trách nhiệm xác nhận và chỉ đạo xử lý.
- **Mức cao:** R40 tiếp nhận ban đầu, chuyển R30 nếu vượt phạm vi; R30 quyết định cuối.
- **Mức trung bình/thấp:** R40 xử lý theo kịch bản chuẩn, escalte khi có dấu hiệu lan rộng.

## 6. Phân loại nhật ký

## 6.1 Nhật ký truy cập và yêu cầu hệ thống
Mục đích:
- truy vết đường đi yêu cầu,
- đo độ trễ,
- xác định lỗi theo đường dẫn,
- hỗ trợ phân tích tải.

Nội dung tối thiểu:
- mã yêu cầu hệ thống
- thời điểm nhận
- dịch vụ nhận
- đường dẫn / điểm vào
- phương thức
- mã trạng thái phản hồi
- mã lỗi (nếu có)
- thời gian xử lý
- mã người dùng (nếu đã xác thực)
- vai trò
- địa chỉ mạng (dạng băm hoặc che bớt theo chính sách)
- tác nhân người dùng (dạng rút gọn)
- dấu vết truy vết xuyên dịch vụ (nếu có)

## 6.2 Nhật ký ứng dụng nghiệp vụ
Mục đích:
- ghi nhận diễn biến xử lý nghiệp vụ để điều tra lỗi và đối soát.

Áp dụng cho các quy trình:
- nạp tiền (TL08)
- rút tiền (TL09)
- chiến dịch tính theo lượt (TL10)
- liên kết rút gọn và doanh thu (TL11)
- đánh giá lượt và chống gian lận (TL12)
- tổng hợp, đối soát (TL16)
- cấu hình hệ thống (TL17)

Mỗi bản ghi nên có:
- mã sự kiện nghiệp vụ
- nhóm mô đun
- mã chức năng nghiệp vụ (truy vết NVxx theo TL02)
- hành động
- mã thực thể và loại thực thể
- trạng thái trước / sau (nếu có)
- kết quả xử lý
- mã lỗi (nếu có)
- người hoặc tiến trình thực hiện
- mã yêu cầu hệ thống liên quan
- dữ liệu tóm tắt an toàn (không chứa bí mật)

## 6.3 Nhật ký kiểm toán (nhật ký bất biến)
Mục đích:
- phục vụ kiểm toán nội bộ, điều tra tranh chấp, truy vết thao tác nhạy cảm.

Bắt buộc áp dụng cho:
- duyệt / từ chối nạp tiền
- duyệt / từ chối rút tiền
- điều chỉnh sổ cái
- thay đổi cấu hình giá theo lượt
- thay đổi ngưỡng rút, khuyến mãi nạp
- thay đổi cấu hình ngân hàng / ví USDT
- thao tác trên cảnh báo gian lận
- khóa / mở khóa tài khoản, liên kết, chiến dịch
- đổi phân quyền vai trò
- thao tác xem dữ liệu nhạy cảm ở chế độ đầy đủ (nếu có)

Yêu cầu:
- ghi nhận lý do thao tác
- ghi nhận giá trị trước / sau (có thể chụp tóm tắt)
- không cho phép sửa / xóa trực tiếp
- mọi truy cập đọc nhật ký kiểm toán cũng phải có nhật ký (ít nhất ở mức đọc ai, lúc nào, xem phạm vi nào)

## 6.4 Nhật ký bảo mật
Gồm:
- đăng nhập thành công / thất bại
- khóa tài khoản do thử sai nhiều lần
- sự kiện xác thực hai lớp (nếu bật)
- thay đổi mật khẩu
- thay đổi thông tin nhận tiền
- thay đổi khóa truy cập khu nhà phát triển
- phát hiện truy cập bất thường
- cảnh báo chèn lệnh / tấn công / giới hạn tần suất bị chạm ngưỡng

## 6.5 Nhật ký hạ tầng và hệ thống nền
Gồm:
- nhật ký dịch vụ chạy / dừng / khởi động lại
- nhật ký hàng đợi
- nhật ký cơ sở dữ liệu (lỗi kết nối, khóa lâu, truy vấn chậm)
- nhật ký bộ nhớ đệm (mất kết nối, lỗi ghi/đọc)
- nhật ký kho tệp
- nhật ký lịch chạy tác vụ nền
- nhật ký gửi thư / gửi thông báo thất bại

## 6.6 Nhật ký giám sát chất lượng dữ liệu
Mục đích:
- phát hiện sai lệch dữ liệu ảnh hưởng báo cáo, đối soát, tài chính.

Ví dụ:
- tỉ lệ sự kiện thiếu trường bắt buộc tăng đột biến
- lệch tổng số lượt giữa lớp ghi nhận và lớp tổng hợp
- lệch số tiền kết chuyển so với doanh thu đã chốt
- số lượng bút toán bù tăng bất thường

## 7. Chuẩn định dạng nhật ký

## 7.1 Nguyên tắc chung
- Dùng **định dạng có cấu trúc** (khuyến nghị bản ghi dạng khóa-giá trị).
- Thời gian theo chuẩn thống nhất (lưu một chuẩn duy nhất trong hệ thống).
- Không ghi chuỗi tự do thiếu ngữ cảnh.
- Có trường nhận diện mô đun, môi trường chạy, phiên bản ứng dụng.

## 7.2 Trường chuẩn tối thiểu cho mọi bản ghi
- `thoi_diem`
- `muc_do` (ghi nhận, cảnh báo, lỗi, nghiêm trọng)
- `moi_truong`
- `ten_dich_vu`
- `ma_yeu_cau_he_thong`
- `ma_truy_vet` (nếu khác mã yêu cầu)
- `nhom_su_kien`
- `ma_su_kien`
- `noi_dung_tom_tat`
- `ma_nguoi_dung` (nếu có)
- `ma_vai_tro` (nếu có, theo TL14)
- `ma_loi` (nếu có, theo TL14)
- `du_lieu_bo_sung` (đối tượng tóm tắt, đã che dữ liệu nhạy cảm)

## 7.3 Trường bắt buộc bổ sung cho nhật ký nghiệp vụ
- `ma_chuc_nang_nghiep_vu` (NVxx theo TL02)
- `loai_thuc_the`
- `ma_thuc_the`
- `trang_thai_truoc` (nếu có)
- `trang_thai_sau` (nếu có)
- `ket_qua_xu_ly`
- `nguon_thao_tac` (giao diện, giao diện lập trình, xử lý nền, hệ thống)

## 7.4 Trường bắt buộc bổ sung cho nhật ký kiểm toán
- `ly_do_thao_tac`
- `nguoi_thuc_hien`
- `vai_tro_thuc_hien`
- `noi_dung_truoc`
- `noi_dung_sau`
- `kenh_xac_thuc_bo_sung` (nếu có)
- `ma_phien_dang_nhap` hoặc `ma_phien_quan_tri`
- `dau_vet_thiet_bi_quan_tri` (dạng an toàn)

## 7.5 Chuẩn che dữ liệu trong nhật ký
Không ghi trực tiếp hoặc chỉ ghi dạng che bớt đối với:
- mật khẩu, mã xác thực, khóa truy cập
- số tài khoản đầy đủ
- địa chỉ ví đầy đủ (nếu không cần)
- thông tin cá nhân nhạy cảm
- nội dung chứng từ ảnh
- địa chỉ mạng đầy đủ (nếu chính sách yêu cầu băm/che)
- dữ liệu tải lên

Quy tắc ví dụ:
- số tài khoản ngân hàng: chỉ hiện 4 số cuối
- địa chỉ ví: hiện đầu + cuối
- thư điện tử: che phần tên
- số điện thoại: che giữa
- địa chỉ mạng: băm hoặc rút gọn theo cấu hình TL17

## 8. Chuẩn giám sát kỹ thuật

## 8.1 Mục tiêu giám sát
1. **Phát hiện sớm sự cố**
2. **Khoanh vùng nhanh**
3. **Đánh giá ảnh hưởng**
4. **Theo dõi phục hồi**
5. **Phục vụ cải tiến hệ thống**

## 8.2 Nhóm chỉ số giám sát bắt buộc

### A. Chỉ số dịch vụ giao diện và giao diện lập trình
- số yêu cầu theo thời gian
- độ trễ trung vị / phần trăm cao
- tỉ lệ lỗi theo mã trạng thái
- tỉ lệ lỗi theo mã lỗi TL14
- số yêu cầu bị giới hạn tần suất
- tỉ lệ thất bại xác thực
- số phiên đăng nhập đang hoạt động

### B. Chỉ số cổng chuyển hướng
- tổng số truy cập liên kết ngắn
- tỉ lệ chuyển hướng thành công
- tỉ lệ lỗi liên kết (không tồn tại, bị khóa, hết hạn)
- độ trễ xử lý trước chuyển hướng
- tỉ lệ thất bại xác minh truy cập
- tỉ lệ sự kiện đến lớp đánh giá thành công

### C. Chỉ số xử lý sự kiện và chống gian lận (TL12, TL16)
- số sự kiện ghi nhận mỗi phút
- tỉ lệ sự kiện thiếu trường
- tỉ lệ sự kiện trùng bị loại
- tỉ lệ sự kiện vào kiểm tra thủ công
- phân bố trạng thái sự kiện lượt (7 trạng thái TL14)
- thời gian đánh giá tạm thời
- độ trễ từ ghi nhận đến chốt số liệu
- số lượng sự kiện đến trễ
- số lượng điều chỉnh sau chốt

### D. Chỉ số chiến dịch và tính tiền (TL10)
- số chiến dịch đang chạy
- số chiến dịch tạm dừng / lỗi cấu hình
- tốc độ tiêu tiền theo lượt
- số lượt hợp lệ tạm thời / đã chốt
- số bút toán trừ tiền theo lượt
- số bút toán bù điều chỉnh

### E. Chỉ số doanh thu nhà xuất bản (TL11)
- số lượt hợp lệ tạm thời / đã chốt
- doanh thu tạm thời / đã chốt
- số phiên kết chuyển doanh thu
- số bản ghi kết chuyển thất bại / thử lại
- lệch đối soát doanh thu

### F. Chỉ số tài chính thủ công (TL08, TL09)
- số hóa đơn nạp theo trạng thái
- thời gian chờ duyệt trung bình
- tỉ lệ bị từ chối
- số yêu cầu rút theo trạng thái
- thời gian xử lý rút trung bình
- số giao dịch nghi ngờ trùng
- số thao tác tài chính phải sửa sau khi duyệt

### G. Chỉ số hạ tầng
- tài nguyên máy chủ
- kết nối cơ sở dữ liệu
- độ trễ truy vấn
- truy vấn chậm
- độ dài hàng đợi
- tuổi bản ghi tồn đọng trong hàng đợi
- lỗi đọc/ghi bộ nhớ đệm
- dung lượng kho tệp
- tỉ lệ lỗi gửi thư / gửi thông báo

## 8.3 Chỉ số chất lượng dữ liệu và đối soát
Bắt buộc theo dõi riêng:
- lệch giữa số lượt ghi nhận và số lượt tổng hợp theo khung thời gian
- lệch giữa doanh thu đã chốt và bút toán kết chuyển
- lệch giữa chi tiêu chiến dịch đã chốt và bút toán trừ tiền
- số lượng bản ghi kẹt trạng thái trung gian quá ngưỡng
- số lượng cảnh báo đối soát mở chưa đóng

## 9. Chuẩn cảnh báo vận hành

## 9.1 Mục tiêu cảnh báo
- Cảnh báo đúng người, đúng thời điểm, đúng mức độ.
- Tránh quá nhiều cảnh báo lặp gây “mù cảnh báo”.
- Gắn được cảnh báo với tác động nghiệp vụ (tiền, lượt, báo cáo, khả dụng hệ thống).

## 9.2 Mức độ cảnh báo
### Mức 1 — Thông tin
- chỉ để theo dõi xu hướng
- không yêu cầu xử lý ngay

### Mức 2 — Cảnh báo thấp
- có dấu hiệu bất thường nhẹ
- cần theo dõi và ghi chú

### Mức 3 — Cảnh báo trung bình
- bắt đầu ảnh hưởng một phần chức năng hoặc dữ liệu
- cần xác nhận và xử lý trong khung thời gian quy định

### Mức 4 — Cảnh báo cao
- ảnh hưởng rõ tới người dùng hoặc nghiệp vụ tài chính / thống kê
- cần chuyển cấp và xử lý gấp

### Mức 5 — Cảnh báo khẩn cấp
- mất dịch vụ diện rộng, nguy cơ sai số tài chính lớn, nguy cơ bảo mật nghiêm trọng
- cần kích hoạt quy trình ứng cứu

## 9.3 Thành phần một cảnh báo chuẩn
- mã cảnh báo
- thời điểm phát hiện
- nguồn phát hiện (tự động / thủ công)
- mô đun / dịch vụ
- loại cảnh báo
- mức độ
- mô tả ngắn
- điều kiện kích hoạt
- dấu hiệu đo được (chỉ số, ngưỡng)
- phạm vi ảnh hưởng ước tính
- liên kết tới nhật ký / biểu đồ / truy vấn liên quan
- trạng thái cảnh báo
- người phụ trách
- thời điểm xác nhận
- thời điểm đóng
- nguyên nhân gốc (khi đã điều tra xong)
- hành động khắc phục
- hành động phòng ngừa

## 9.4 Trạng thái cảnh báo
Bộ trạng thái chuẩn (đề xuất áp dụng thống nhất):
- `MOI_TAO`
- `DA_XAC_NHAN`
- `DANG_XU_LY`
- `TAM_GIAM_SAT`
- `DA_KHAC_PHUC_CHO_XAC_MINH`
- `DA_DONG`
- `BO_QUA_HOP_LE`

> Ghi chú: Bộ trạng thái cảnh báo này là **trạng thái vận hành**, không thay thế các trạng thái nghiệp vụ trong TL14. Nếu TL14 chưa có danh mục trạng thái cảnh báo, bổ sung ở đợt cập nhật TL14 sau khi thống nhất.

## 9.5 Quy tắc chống cảnh báo trùng và chống nhiễu
- Gom nhóm cảnh báo cùng nguồn, cùng điều kiện, cùng khoảng thời gian.
- Không tạo nhiều cảnh báo mở cho cùng một điều kiện chưa đóng.
- Có cơ chế “giảm tần suất” gửi lặp cho cùng cảnh báo.
- Phân biệt rõ:
  - cảnh báo mới
  - cập nhật cảnh báo đang mở
  - cảnh báo tái diễn sau khi đã đóng

## 9.6 Quy tắc xác nhận và chuyển cấp
- Cảnh báo mức trung bình trở lên phải có người xác nhận.
- Cảnh báo mức cao / khẩn cấp phải có:
  - người phụ trách chính,
  - thời điểm xác nhận,
  - nhật ký hành động xử lý,
  - kết luận sau sự cố.
- Nếu quá thời gian xác nhận theo ngưỡng cấu hình TL17, hệ thống tự động chuyển cấp.

## 10. Bản đồ chỉ số và cảnh báo theo mô đun (ưu tiên triển khai)

## 10.1 Mô đun nạp tiền thủ công (TL08)
### Chỉ số ưu tiên
- số hóa đơn ở trạng thái chờ duyệt
- thời gian chờ duyệt trung bình
- tỉ lệ hóa đơn hết hạn
- tỉ lệ hóa đơn bị từ chối
- số lần phát hiện nguy cơ cộng tiền trùng

### Cảnh báo ưu tiên
- tăng đột biến hóa đơn chờ duyệt
- tăng đột biến hóa đơn bị từ chối
- phát hiện khả năng cộng tiền trùng
- lỗi ghi sổ cái sau khi duyệt thành công
- không gửi được thông báo kết quả nạp

## 10.2 Mô đun rút tiền thủ công (TL09)
### Chỉ số ưu tiên
- số yêu cầu rút chờ duyệt
- thời gian xử lý rút trung bình
- tỉ lệ từ chối
- số trường hợp khóa tạm số dư lệch
- số yêu cầu rút bị xử lý lặp

### Cảnh báo ưu tiên
- số dư khóa tạm không khớp yêu cầu rút
- yêu cầu rút ở trạng thái trung gian quá lâu
- lỗi hoàn số dư khi từ chối
- trùng xử lý yêu cầu rút
- tăng đột biến yêu cầu rút từ cùng nhóm rủi ro

## 10.3 Mô đun chiến dịch tính theo lượt (TL10)
### Chỉ số ưu tiên
- số chiến dịch đang chạy
- tốc độ trừ tiền theo lượt
- số chiến dịch hết ngân sách
- số chiến dịch lỗi cấu hình
- lệch chi tiêu tạm thời và chi tiêu đã chốt

### Cảnh báo ưu tiên
- trừ tiền vượt ngân sách
- phát hiện nguy cơ trừ tiền trùng cùng sự kiện
- chiến dịch đang chạy nhưng không phát sinh sự kiện trong thời gian dài bất thường
- chiến dịch lỗi cấu hình hàng loạt
- lệch lớn giữa số liệu tạm thời và đã chốt

## 10.4 Mô đun liên kết rút gọn và doanh thu nhà xuất bản (TL11)
### Chỉ số ưu tiên
- tổng truy cập liên kết ngắn
- tỉ lệ chuyển hướng thành công
- tỉ lệ liên kết lỗi / bị khóa / hết hạn
- doanh thu tạm thời và đã chốt
- số lần kết chuyển doanh thu lỗi

### Cảnh báo ưu tiên
- tăng đột biến lỗi chuyển hướng
- tỉ lệ xác minh truy cập thất bại tăng bất thường
- kết chuyển doanh thu thất bại liên tiếp
- lệch doanh thu đã chốt và bút toán kết chuyển
- liên kết bị đánh dấu rủi ro tăng đột biến

## 10.5 Mô đun chống gian lận và đánh giá lượt (TL12)
### Chỉ số ưu tiên
- tỉ lệ sự kiện vào kiểm tra thủ công
- phân bố lý do loại lượt
- thời gian đánh giá trung bình
- số lượng quyết định thủ công đến trễ
- số lượng điều chỉnh sau chốt do gian lận

### Cảnh báo ưu tiên
- tỉ lệ sự kiện thiếu dữ liệu tăng đột biến
- hàng đợi đánh giá tăng quá ngưỡng
- tỉ lệ sự kiện bị loại vì cùng một lý do tăng bất thường
- số lượng lượt cần kiểm tra thủ công tồn đọng quá ngưỡng
- lỗi đồng bộ danh sách chặn / tham số gian lận

## 10.6 Mô đun tổng hợp và đối soát (TL16)
### Chỉ số ưu tiên
- độ trễ tổng hợp gần thực
- độ trễ chốt số liệu
- số phiên đối soát thất bại / thử lại
- số bản ghi đến trễ
- số điều chỉnh sau chốt

### Cảnh báo ưu tiên
- đối soát thất bại liên tiếp
- lệch đối soát vượt ngưỡng cấu hình
- tiến trình tổng hợp bị dừng
- hàng lỗi tăng đột biến
- độ trễ chốt số liệu vượt ngưỡng

## 10.7 Mô đun cấu hình hệ thống (TL17)
### Chỉ số ưu tiên
- số thay đổi cấu hình chờ duyệt
- số cấu hình sắp hết hiệu lực
- số lần hoàn tác cấu hình
- số lỗi tải nóng cấu hình
- độ trễ phát tán cấu hình

### Cảnh báo ưu tiên
- cấu hình giá theo lượt chồng chéo hiệu lực
- cấu hình ngưỡng rút không hợp lệ
- lỗi xuất bản cấu hình
- không đồng bộ cấu hình giữa tiến trình
- thay đổi cấu hình nhạy cảm ngoài khung thời gian cho phép (nếu có chính sách)

## 11. Quy trình vận hành cảnh báo

## 11.1 Luồng chuẩn xử lý cảnh báo tự động
1. Hệ thống giám sát phát hiện điều kiện vượt ngưỡng.
2. Tạo hoặc cập nhật cảnh báo (theo quy tắc gom nhóm).
3. Ghi nhật ký cảnh báo vào hệ thống nhật ký / bảng cảnh báo.
4. Gửi thông báo theo mức độ (kênh cấu hình ở TL17).
5. Người trực vận hành xác nhận.
6. Ghi chú nhận định ban đầu.
7. Xử lý hoặc chuyển cấp.
8. Theo dõi chỉ số phục hồi.
9. Đóng cảnh báo khi đủ điều kiện.
10. Ghi nhận nguyên nhân gốc và hành động phòng ngừa (đối với cảnh báo mức cao trở lên).

## 11.2 Luồng cảnh báo thủ công
Áp dụng khi R30 hoặc R40 phát hiện bất thường từ:
- báo cáo,
- phản ánh người dùng,
- đối soát,
- nhật ký không có cảnh báo tự động.

Quy trình:
1. Tạo cảnh báo thủ công.
2. Gắn nguồn bằng chứng (nhật ký, ảnh màn hình, mã thực thể).
3. Chọn mức độ ban đầu.
4. Theo dõi xử lý như cảnh báo tự động.

## 11.3 Quy tắc đóng cảnh báo
Chỉ đóng khi:
- điều kiện đo đã trở về bình thường hoặc đã được cách ly,
- đã ghi nhật ký hành động xử lý,
- đối với cảnh báo mức cao / khẩn cấp: có kết luận nguyên nhân và biện pháp phòng ngừa.

Không đóng chỉ vì “hết thời gian” nếu điều kiện bất thường vẫn còn.

## 12. Nhật ký và giám sát cho dữ liệu tài chính (ưu tiên cao)

## 12.1 Yêu cầu bắt buộc
Mọi xử lý liên quan:
- ví,
- sổ cái,
- nạp tiền,
- rút tiền,
- kết chuyển doanh thu,
- trừ tiền chiến dịch,
- bút toán bù điều chỉnh

phải có đủ ba lớp:
1. **Nhật ký ứng dụng nghiệp vụ**
2. **Nhật ký kiểm toán**
3. **Chỉ số giám sát và cảnh báo**

## 12.2 Truy vết tối thiểu cho bút toán
Mỗi bút toán phải truy được:
- mã bút toán
- loại bút toán (theo TL14)
- thực thể nguồn và mã nguồn
- mã người dùng ví
- số tiền
- số dư trước / sau
- thời điểm
- tiến trình / người thực hiện
- mã yêu cầu hoặc mã xử lý nền
- trạng thái bút toán

## 12.3 Cảnh báo tài chính bắt buộc
- bút toán trùng tham chiếu
- chênh lệch số dư ví và tổng sổ cái (nếu có kiểm tra)
- bút toán thất bại sau khi nghiệp vụ đã chuyển trạng thái thành công
- số lượng điều chỉnh bút toán tăng bất thường
- thao tác quản trị tài chính ngoài chính sách thời gian / phạm vi

## 13. Nhật ký và giám sát cho chống gian lận (ưu tiên cao)

## 13.1 Nhật ký quyết định đánh giá lượt
Bắt buộc ghi:
- mã sự kiện lượt
- trạng thái sự kiện trước / sau
- điểm rủi ro
- tập lý do loại / lý do kiểm tra thủ công
- lớp nào ra quyết định (tự động / thủ công / đối soát)
- tham số phiên bản áp dụng (tham chiếu cấu hình TL17)
- mã người xử lý thủ công (nếu có)

## 13.2 Chỉ số vận hành chống gian lận
- tỉ lệ loại lượt theo từng nhóm lý do
- tỉ lệ cần kiểm tra thủ công theo quốc gia / thiết bị / kênh
- thời gian tồn đọng kiểm tra thủ công
- tỉ lệ đảo quyết định sau kiểm tra thủ công
- tỉ lệ điều chỉnh sau chốt do quyết định đến trễ

## 13.3 Cảnh báo chống gian lận
- tỉ lệ một nhóm lý do loại tăng đột biến
- tỉ lệ vượt xác minh giảm mạnh bất thường
- số lượng truy cập từ một cụm dấu vết tăng đột biến
- hàng đợi kiểm tra thủ công tăng quá ngưỡng
- tỷ lệ đảo quyết định tăng bất thường (gợi ý sai tham số hoặc sai quy tắc)

## 14. Bảng theo dõi vận hành đề xuất

## 14.1 Bảng theo dõi tổng quan hệ thống (R30, R40)
Nên có:
- trạng thái dịch vụ
- lưu lượng yêu cầu
- tỉ lệ lỗi
- độ trễ
- hàng đợi
- cảnh báo đang mở theo mức độ
- số sự kiện lượt đang xử lý
- độ trễ tổng hợp và đối soát
- tình trạng cơ sở dữ liệu, bộ nhớ đệm, kho tệp

## 14.2 Bảng theo dõi tài chính (R30)
Nên có:
- hóa đơn nạp theo trạng thái
- yêu cầu rút theo trạng thái
- thời gian chờ duyệt
- số bút toán theo loại
- cảnh báo tài chính đang mở
- lệch đối soát tài chính (nếu có)

## 14.3 Bảng theo dõi sự kiện lượt và chống gian lận (R30, R40 có giới hạn)
Nên có:
- phân bố 7 trạng thái sự kiện lượt
- tỉ lệ hợp lệ / bị loại / kiểm tra thủ công
- lý do loại hàng đầu
- hàng đợi đánh giá / hàng đợi kiểm tra thủ công
- độ trễ đánh giá / độ trễ chốt
- cảnh báo chống gian lận

## 14.4 Bảng theo dõi chiến dịch và doanh thu nhà xuất bản (R30, R40 có giới hạn)
Nên có:
- số chiến dịch đang chạy
- chi tiêu tạm thời / đã chốt
- doanh thu nhà xuất bản tạm thời / đã chốt
- kết chuyển doanh thu
- các cảnh báo lệch số liệu

## 15. Lưu trữ, thời hạn giữ và xoay vòng dữ liệu nhật ký

## 15.1 Nguyên tắc chung
- Thời hạn giữ dữ liệu phải đủ cho:
  - điều tra vận hành,
  - khiếu nại,
  - đối soát,
  - kiểm toán nội bộ.
- Tách lớp lưu trữ:
  - dữ liệu nóng (tra cứu nhanh)
  - dữ liệu ấm (truy xuất chậm hơn)
  - dữ liệu lưu trữ lâu dài

## 15.2 Phân nhóm thời hạn giữ (khuyến nghị, cấu hình tại TL17)
### Nhật ký truy cập / ứng dụng thông thường
- giữ nóng: ngắn hạn
- giữ tổng hợp: trung hạn
- lưu trữ nén: theo chính sách

### Nhật ký kiểm toán và tài chính
- giữ lâu hơn nhóm thông thường
- không được xóa mềm khi chưa hết thời hạn chính sách
- truy cập phải có kiểm soát và nhật ký đọc

### Chỉ số giám sát thô
- giữ ngắn hơn nhật ký kiểm toán
- tổng hợp theo khoảng thời gian để phục vụ xem xu hướng dài hạn

> Giá trị thời gian cụ thể được cấu hình tại TL17, không chốt cứng trong TL18 để tránh lệch môi trường triển khai.

## 15.3 Xoay vòng và dọn dẹp
- Có tiến trình dọn dữ liệu cũ theo lịch.
- Dọn dữ liệu không được làm gián đoạn truy vấn đang chạy.
- Mọi dọn dẹp dữ liệu nhạy cảm phải có nhật ký kiểm toán.
- Có cơ chế kiểm tra sau dọn (đếm bản ghi trước/sau, kiểm tra lỗi).

## 16. Bảo mật dữ liệu nhật ký và giám sát

## 16.1 Nguyên tắc truy cập tối thiểu
- Chỉ vai trò cần thiết mới xem được đúng phạm vi.
- Dữ liệu nhạy cảm phải che theo vai trò.
- R40 không xem đầy đủ trường nhạy cảm khi không có yêu cầu xử lý hợp lệ.

## 16.2 Nguyên tắc toàn vẹn
- Nhật ký kiểm toán không cho sửa/xóa trực tiếp.
- Bản ghi nhật ký phải có cơ chế phát hiện sửa đổi trái phép (ở mức hạ tầng hoặc ứng dụng).
- Sao lưu dữ liệu nhật ký quan trọng theo lịch.

## 16.3 Nguyên tắc phân tách môi trường
- Không trộn nhật ký môi trường phát triển với môi trường vận hành thật.
- Không sao chép dữ liệu nhạy cảm thật sang môi trường thử nghiệm khi chưa ẩn danh.

## 16.4 Nhật ký truy cập vào hệ thống giám sát
- Ai xem gì, khi nào, phạm vi nào.
- Ai thay đổi bảng theo dõi, ngưỡng cảnh báo, luật cảnh báo.
- Ai tắt cảnh báo / bỏ qua cảnh báo.

## 17. Tích hợp với TL17 (cấu hình hệ thống và tham số vận hành)

## 17.1 Nhóm tham số cần quản trị qua TL17
1. Ngưỡng cảnh báo từng chỉ số
2. Khoảng lấy mẫu chỉ số
3. Thời gian gom nhóm cảnh báo
4. Quy tắc chuyển cấp theo thời gian
5. Danh sách kênh nhận cảnh báo
6. Quy tắc giảm tần suất gửi lặp
7. Chính sách che dữ liệu trong nhật ký
8. Thời hạn giữ từng nhóm nhật ký
9. Bật / tắt chỉ số hoặc cảnh báo theo môi trường
10. Danh sách mô đun bắt buộc gửi nhật ký kiểm toán

## 17.2 Quy tắc thay đổi tham số vận hành
- Các thay đổi ngưỡng ảnh hưởng tài chính / chống gian lận phải theo quy trình duyệt cấu hình (TL17).
- Không thay đổi trực tiếp trên máy chủ.
- Mọi thay đổi tham số phải có nhật ký kiểm toán và chụp cấu hình áp dụng.

## 18. Đề xuất mô hình dữ liệu hỗ trợ TL18 (nếu TL13 chưa chi tiết đủ)

> Phần này là **đề xuất bổ sung**. Không tự động thay đổi TL13 nếu chưa cập nhật chính thức.

## 18.1 Bảng nhật ký ứng dụng tập trung
- `nhat_ky_ung_dung`
- mục đích: tra cứu nhanh các sự kiện nghiệp vụ và kỹ thuật có cấu trúc

Trường gợi ý:
- mã
- thời điểm
- môi trường
- tên dịch vụ
- mức độ
- nhóm sự kiện
- mã sự kiện
- mã yêu cầu hệ thống
- mã truy vết
- mã người dùng
- mã vai trò
- mã chức năng nghiệp vụ
- loại thực thể
- mã thực thể
- mã lỗi
- nội dung tóm tắt
- dữ liệu bổ sung dạng cấu trúc
- thời điểm tạo

## 18.2 Bảng nhật ký kiểm toán
- `nhat_ky_kiem_toan`
- mục đích: lưu bất biến các thao tác nhạy cảm

Trường gợi ý:
- mã
- thời điểm
- mã người thực hiện
- mã vai trò
- hành động
- loại thực thể
- mã thực thể
- nội dung trước
- nội dung sau
- lý do thao tác
- mã phiên
- mã yêu cầu hệ thống
- nguồn thao tác
- kết quả
- thời điểm tạo

## 18.3 Bảng cảnh báo vận hành
- `canh_bao_van_hanh`

Trường gợi ý:
- mã cảnh báo
- loại cảnh báo
- mức độ
- trạng thái cảnh báo
- nguồn phát hiện
- dịch vụ / mô đun
- điều kiện kích hoạt
- giá trị đo
- ngưỡng
- thời điểm phát hiện đầu
- thời điểm cập nhật cuối
- số lần tái diễn
- mã người phụ trách
- thời điểm xác nhận
- thời điểm đóng
- nguyên nhân gốc
- hành động khắc phục
- hành động phòng ngừa
- dữ liệu liên kết (mã sự kiện, mã chiến dịch, mã liên kết…)

## 18.4 Bảng lịch sử xử lý cảnh báo
- `lich_su_xu_ly_canh_bao`

Trường gợi ý:
- mã
- mã cảnh báo
- thời điểm
- mã người thao tác
- vai trò
- hành động
- ghi chú
- trạng thái trước
- trạng thái sau
- dữ liệu bổ sung

## 18.5 Bảng chỉ số tổng hợp vận hành
- `chi_so_van_hanh_tong_hop`
- dùng lưu theo khoảng thời gian cho bảng theo dõi và báo cáo vận hành dài hạn

Trường gợi ý:
- mã
- khoảng thời gian
- tên chỉ số
- mô đun
- giá trị
- đơn vị
- nhãn phân loại
- môi trường
- thời điểm tạo

## 19. Tiêu chí chấp nhận (nghiệm thu TL18)

Một phiên bản triển khai được xem là đáp ứng TL18 khi thỏa tối thiểu:

## 19.1 Về nhật ký
- Có nhật ký cấu trúc cho tất cả mô đun lõi nêu trong TL18.
- Có nhật ký kiểm toán cho mọi thao tác nhạy cảm nêu ở mục 6.3.
- Có che dữ liệu nhạy cảm đúng chính sách.
- Có trường truy vết đủ để nối lỗi về thực thể nghiệp vụ và người thao tác.

## 19.2 Về giám sát
- Có bảng theo dõi tổng quan hệ thống.
- Có chỉ số bắt buộc cho tài chính, chiến dịch, liên kết, đánh giá lượt, tổng hợp.
- Theo dõi được hàng đợi và độ trễ xử lý nền.
- Phát hiện được lệch số liệu đối soát cơ bản.

## 19.3 Về cảnh báo
- Cảnh báo tạo được theo ngưỡng cấu hình.
- Có cơ chế gom nhóm / chống lặp.
- Có quy trình xác nhận, chuyển cấp, đóng.
- Có lịch sử xử lý cảnh báo.
- Có ít nhất một kênh gửi cảnh báo hoạt động ổn định.

## 19.4 Về phân quyền và kiểm toán
- R30 xem được đầy đủ theo phạm vi hệ thống.
- R40 bị giới hạn đúng phạm vi và dữ liệu nhạy cảm.
- R10, R20 chỉ xem được dữ liệu thuộc sở hữu.
- Mọi thay đổi ngưỡng và cảnh báo quan trọng có nhật ký kiểm toán.

## 20. Kịch bản kiểm thử trọng điểm cho TL18 (đầu vào cho tài liệu kiểm thử sau)

## 20.1 Kịch bản nhật ký tài chính
1. Duyệt một hóa đơn nạp hợp lệ.
2. Kiểm tra có đủ:
   - nhật ký ứng dụng,
   - nhật ký kiểm toán,
   - bút toán sổ cái,
   - nhật ký gửi thông báo.
3. Kiểm tra dữ liệu nhạy cảm đã che.

## 20.2 Kịch bản cảnh báo hàng đợi xử lý sự kiện
1. Tạo tải khiến hàng đợi đánh giá tăng cao.
2. Kiểm tra cảnh báo mức trung bình/cao được tạo.
3. Kiểm tra gom nhóm cảnh báo.
4. Xác nhận và đóng cảnh báo sau khi tải giảm.

## 20.3 Kịch bản lệch đối soát
1. Mô phỏng lỗi kết chuyển doanh thu.
2. Kiểm tra chỉ số lệch tăng.
3. Kiểm tra cảnh báo đối soát tạo đúng.
4. Sau khi sửa, cảnh báo chuyển trạng thái và đóng.

## 20.4 Kịch bản phân quyền xem nhật ký
1. R40 truy cập chi tiết nhật ký tài chính.
2. Xác nhận trường nhạy cảm bị che.
3. R30 truy cập cùng bản ghi và xem được đầy đủ hơn (theo chính sách).
4. Có nhật ký ghi nhận hành vi truy cập nhật ký.

## 20.5 Kịch bản thay đổi ngưỡng cảnh báo
1. R30 thay đổi ngưỡng cảnh báo qua quy trình TL17.
2. Kiểm tra có nhật ký kiểm toán.
3. Kiểm tra tham số mới được tải vào hệ thống.
4. Kiểm tra cảnh báo dùng ngưỡng mới.

## 21. Rủi ro triển khai và khuyến nghị

## 21.1 Rủi ro thường gặp
- Ghi nhật ký quá nhiều gây tăng tải và tăng chi phí lưu trữ.
- Ghi nhật ký thiếu chuẩn, khó truy vấn khi có sự cố.
- Cảnh báo quá nhạy gây nhiễu, đội vận hành bỏ qua cảnh báo.
- Cảnh báo quá lỏng dẫn đến phát hiện muộn.
- Không tách số liệu kỹ thuật và số liệu nghiệp vụ gây hiểu nhầm.
- Không che dữ liệu nhạy cảm trong nhật ký.
- Thiếu nhật ký kiểm toán cho thao tác tài chính / cấu hình.

## 21.2 Khuyến nghị triển khai theo giai đoạn
### Giai đoạn đầu (bắt buộc)
- Nhật ký cấu trúc cho mô đun lõi
- Nhật ký kiểm toán cho tài chính và cấu hình
- Chỉ số cơ bản cho dịch vụ, hàng đợi, cơ sở dữ liệu
- Cảnh báo cho lỗi hệ thống, hàng đợi, đối soát, tài chính

### Giai đoạn sau (mở rộng)
- Bảng theo dõi theo vai trò
- Cảnh báo thông minh theo xu hướng
- Báo cáo chất lượng vận hành dài hạn
- Liên kết cảnh báo với hồ sơ sự cố và bài học sau sự cố

## 22. Đầu ra và phụ thuộc cho tài liệu tiếp theo

TL18 cung cấp đầu vào trực tiếp cho:
- **TL19 — Đặc tả bảo mật và an toàn hệ thống**
  - dùng phần nhật ký bảo mật, kiểm toán, phân quyền xem nhật ký
- **TL20 — Đặc tả kiểm thử và tiêu chí nghiệm thu**
  - dùng các kịch bản kiểm thử trọng điểm của TL18
- **TL21 — Đặc tả triển khai, vận hành và khôi phục**
  - dùng phần cảnh báo, giám sát, lưu trữ, sao lưu, quy trình xử lý cảnh báo
- **TL22 — Đặc tả màn hình quản trị và bảng theo dõi**
  - dùng phần bảng theo dõi vận hành, trạng thái cảnh báo, phân quyền vai trò

## 23. Checklist tự rà soát nhất quán (đã áp dụng cho TL18)

- [x] Không đổi tên trạng thái chiến dịch, nạp tiền, rút tiền, liên kết, sự kiện lượt đã chốt ở TL02/TL14
- [x] Bám đúng vai trò R01, R10, R20, R30, R40 theo TL03
- [x] Không thay đổi định nghĩa lượt hợp lệ và quy trình đánh giá nhiều lớp của TL12
- [x] Có liên hệ rõ với số liệu tạm thời / đã chốt theo TL10, TL11, TL16
- [x] Có phân biệt nhật ký ứng dụng, nhật ký kiểm toán, chỉ số, cảnh báo
- [x] Có ràng buộc che dữ liệu nhạy cảm và truy cập tối thiểu
- [x] Có tiêu chí chấp nhận và kịch bản kiểm thử trọng điểm
- [x] Có ghi chú rõ phần đề xuất bổ sung dữ liệu, không tự ý sửa TL13
