# TL26 — Quy ước mã nguồn, cấu trúc kho mã và tiêu chuẩn lập trình

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL26
- **Tên tài liệu:** Quy ước mã nguồn, cấu trúc kho mã và tiêu chuẩn lập trình
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22, TL23, TL24, TL25
- **Tài liệu đầu ra phụ thuộc:** bộ khởi tạo kho mã, quy tắc kiểm tra tự động, mẫu mô-đun, mẫu giao diện lập trình, mẫu ghi nhật ký, mẫu kiểm thử, hướng dẫn cho trợ lý lập trình và đội phát triển

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL26 quy định thống nhất cách tổ chức mã nguồn, quy ước đặt tên, tiêu chuẩn lập trình, tiêu chuẩn kiểm thử và tiêu chuẩn ghi nhật ký để:

- đội phát triển giao diện, máy chủ, cổng công khai, xử lý nền triển khai đồng nhất
- trợ lý lập trình sinh mã đúng cấu trúc, giảm lệch giữa các mô-đun
- giảm rủi ro sai khác về trạng thái, mã lỗi, hợp đồng giao diện lập trình
- tăng khả năng đọc hiểu, rà soát, sửa lỗi và bàn giao theo TL24, TL25
- bảo đảm các yêu cầu an toàn, truy vết, kiểm soát thao tác nhạy cảm bám TL19 và TL22

## 2.2 Phạm vi TL26

Trong phạm vi:

- cấu trúc kho mã theo thành phần và mô-đun
- quy ước thư mục, tệp, tên mô-đun, tên lớp, tên hàm, tên biến
- tiêu chuẩn mã cho giao diện, máy chủ, cổng công khai, xử lý nền
- quy ước dữ liệu vào, dữ liệu ra, mã lỗi, trạng thái theo TL14, TL15
- quy tắc ghi nhật ký, mã truy vết theo TL18
- tiêu chuẩn kiểm thử đơn vị, kiểm thử tích hợp, kiểm tra hồi quy kỹ thuật
- tiêu chuẩn cập nhật cấu trúc dữ liệu và dữ liệu danh mục
- tiêu chuẩn bảo mật trong mã nguồn và cấu hình
- quy trình rà soát mã và chấp nhận thay đổi
- quy tắc bắt buộc cho trợ lý lập trình khi sinh mã

Ngoài phạm vi:

- quy trình quản lý dự án theo tuần (đã có ở TL24)
- kiến trúc hạ tầng chi tiết theo nhà cung cấp (TL25, TL22)
- đặc tả nghiệp vụ chi tiết từng luồng (TL08 đến TL12)
- đặc tả dữ liệu cấp cột chi tiết (TL13)
- đặc tả giao diện lập trình đầy đủ endpoint (TL15)

## 2.3 Nguyên tắc lập trình chung

- **Đúng nghiệp vụ trước, tối ưu sau.**
- **Mã phải truy vết được tới tài liệu nguồn.**
- **Một chỗ một trách nhiệm, tránh nhồi logic nhiều lớp.**
- **Không viết tắt mơ hồ trong tên mô-đun, hàm, biến quan trọng.**
- **Mọi thao tác nhạy cảm phải có kiểm tra quyền và nhật ký kiểm toán.**
- **Không để trợ lý lập trình tự phát sinh trạng thái, mã lỗi, trường dữ liệu ngoài tài liệu chuẩn.**
- **Ưu tiên mã dễ đọc, dễ kiểm thử, dễ bàn giao hơn là quá “khéo” nhưng khó bảo trì.**

---

## 3. Mối liên hệ TL26 với TL25 và bộ tài liệu trước

## 3.1 Vai trò của TL26 trong bộ tài liệu

- **TL25** chốt kiến trúc kỹ thuật triển khai thực tế
- **TL26** chốt “cách viết mã” và “cách tổ chức kho mã” để hiện thực hóa TL25

TL26 là lớp tiêu chuẩn thực thi giúp:

- dev mới vào dự án có thể theo đúng quy ước ngay
- trợ lý lập trình sinh mã theo khuôn mẫu thống nhất
- giảm lỗi do lệch tên gọi, lệch luồng xử lý, lệch cấu trúc dữ liệu

## 3.2 Quy tắc xử lý mâu thuẫn

Nếu có mâu thuẫn giữa TL26 và tài liệu trước:

1. Ưu tiên TL02, TL08 đến TL13 (nghiệp vụ và dữ liệu)
2. Ưu tiên TL14, TL15 (trạng thái, mã lỗi, giao diện lập trình)
3. Ưu tiên TL17 đến TL19, TL22 (cấu hình, giám sát, an toàn, vận hành)
4. Ưu tiên TL20, TL23 (màn hình, nội dung hiển thị)
5. TL25 (kiến trúc triển khai)
6. TL26 phải cập nhật để phản ánh lại, không tự giữ quy ước sai

---

## 4. Cấu trúc kho mã chuẩn cho phiên bản đầu

## 4.1 Mô hình kho mã được chốt

Theo TL25, TL26 chốt mô hình **một kho mã chính nhiều gói** để đồng bộ kiểu dữ liệu, mã lỗi, thư viện chung và quy tắc phát hành.

## 4.2 Cấu trúc thư mục mức cao

```text
du-an-nen-tang/
├─ ung-dung-giao-dien/
├─ may-chu-nghiep-vu/
├─ cong-khai-chuyen-huong/
├─ xu-ly-nen/
├─ goi-dung-chung/
│  ├─ kieu-du-lieu-chung/
│  ├─ ma-trang-thai-va-ma-loi/
│  ├─ ghi-nhat-ky-va-truy-vet/
│  ├─ xac-thuc-va-phan-quyen-dung-chung/
│  ├─ kiem-tra-du-lieu-dau-vao/
│  └─ tien-ich-chung/
├─ tap-lenh-cap-nhat-du-lieu/
├─ du-lieu-khoi-tao/
├─ kiem-thu-tich-hop/
├─ tai-lieu-ky-thuat/
├─ cau-hinh-trien-khai/
├─ cong-cu-noi-bo/
└─ tep-mau-phat-trien/
```

## 4.3 Mục đích từng thư mục chính

### `ung-dung-giao-dien`
- giao diện cho R10, R20, R30, R40
- thành phần giao diện theo màn hình TL20
- lớp gọi giao diện lập trình bám TL15
- xử lý nội dung song ngữ theo TL23

### `may-chu-nghiep-vu`
- toàn bộ mô-đun nghiệp vụ theo TL08 đến TL17
- xác thực, phân quyền, ví, sổ cái, nạp, rút, chiến dịch, liên kết, đối soát, cấu hình, nội dung tuân thủ
- giao diện lập trình cho giao diện web và quản trị

### `cong-khai-chuyen-huong`
- dịch vụ R01
- xử lý mã liên kết, chuyển hướng, trang công khai, ghi nhận sự kiện nhẹ
- giới hạn tần suất cơ bản, trang lỗi công khai

### `xu-ly-nen`
- tiêu thụ sự kiện, đánh giá hợp lệ, tổng hợp, đối soát, kết chuyển, tác vụ định kỳ
- công cụ xử lý tác vụ kẹt và ghi nhật ký nền

### `goi-dung-chung`
- nơi chứa chuẩn dùng chung bắt buộc cho mọi gói
- tránh lặp mã trạng thái, mã lỗi, kiểu dữ liệu, công cụ truy vết

### `tap-lenh-cap-nhat-du-lieu`
- tập lệnh cập nhật cấu trúc dữ liệu có phiên bản
- dữ liệu chuyển đổi
- quy tắc chạy trước/sau phát hành theo TL22

### `du-lieu-khoi-tao`
- danh mục chuẩn dùng chung theo TL14, TL17
- dữ liệu mẫu phát triển và kiểm thử nội bộ (không chứa dữ liệu thật)

### `kiem-thu-tich-hop`
- kịch bản kiểm thử liên thông giữa các gói
- dữ liệu kiểm thử kỹ thuật
- tiện ích khởi tạo và dọn dẹp dữ liệu kiểm thử

### `tai-lieu-ky-thuat`
- ghi chú kỹ thuật theo mô-đun
- quyết định kỹ thuật và thay đổi quan trọng
- tài liệu phục vụ trợ lý lập trình và dev mới

### `cau-hinh-trien-khai`
- tệp cấu hình triển khai theo môi trường
- mẫu biến môi trường
- tệp cấu hình giám sát, cảnh báo mẫu

---

## 5. Quy ước thư mục và tổ chức mô-đun trong từng thành phần

## 5.1 Quy tắc chung cho mô-đun

Mỗi mô-đun nghiệp vụ trong `may-chu-nghiep-vu` và `xu-ly-nen` phải được tổ chức theo cùng cấu trúc logic để dễ đọc và dễ sinh mã tự động.

### Cấu trúc mô-đun khuyến nghị

```text
mo-dun-vi-du/
├─ giao-tiep-vao/
├─ dich-vu-nghiep-vu/
├─ truy-cap-du-lieu/
├─ mo-hinh-du-lieu/
├─ chuyen-doi-du-lieu/
├─ kiem-tra-quyen/
├─ ghi-nhat-ky-kiem-toan/
├─ hang-doi-hoac-su-kien-noi-bo/
├─ kiem-thu-don-vi/
└─ kiem-thu-tich-hop-mo-dun/
```

## 5.2 Quy tắc không trộn trách nhiệm

- **Không đặt truy vấn dữ liệu trực tiếp trong lớp tiếp nhận yêu cầu.**
- **Không đặt logic nghiệp vụ chính trong lớp chuyển đổi dữ liệu hiển thị.**
- **Không xử lý quyền chỉ ở giao diện; máy chủ phải tự kiểm tra.**
- **Không ghi trực tiếp số dư tài chính từ nhiều nơi; mọi thay đổi số dư phải đi qua mô-đun ví và sổ cái.**
- **Không để mô-đun giao diện tự định nghĩa trạng thái khác TL14.**

## 5.3 Quy tắc tái sử dụng mã dùng chung

Chỉ đưa vào `goi-dung-chung` khi đáp ứng đủ:

- dùng từ 2 gói trở lên
- có hành vi ổn định, không phụ thuộc quá sâu một mô-đun cụ thể
- không làm rối ranh giới nghiệp vụ
- có kiểm thử riêng tối thiểu

Không đưa vào `goi-dung-chung`:
- logic nghiệp vụ đặc thù nạp, rút, đối soát
- quy tắc chống gian lận đặc thù
- truy vấn dữ liệu đặc thù một mô-đun

---

## 6. Quy ước đặt tên

## 6.1 Nguyên tắc đặt tên chung

- Tên phải thể hiện ý nghĩa nghiệp vụ hoặc kỹ thuật rõ ràng
- Ưu tiên tên đầy đủ, tránh viết tắt khó hiểu
- Cùng khái niệm phải dùng cùng một tên ở mọi gói
- Bám đúng thuật ngữ đã khóa trong TL02, TL13, TL14, TL15, TL23

## 6.2 Quy ước tên thư mục và tệp

- Dùng chữ thường và dấu gạch nối
- Tên thư mục theo nhóm chức năng hoặc trách nhiệm
- Tên tệp phản ánh nội dung chính, không đặt kiểu `temp`, `test2`, `new-file`

Ví dụ đúng:
- `mo-dun-nap-tien-thu-cong`
- `kiem-tra-dieu-kien-rut`
- `anh-xa-ma-loi-vi`

Ví dụ không nên dùng:
- `utils2`
- `helper-new`
- `abc`
- `xuly`

## 6.3 Quy ước tên lớp, hàm, biến, hằng số

### Tên lớp
- dùng danh từ hoặc cụm danh từ thể hiện vai trò
- ví dụ: lớp dịch vụ nạp tiền, lớp bộ lọc quyền, lớp kho dữ liệu yêu cầu rút

### Tên hàm
- bắt đầu bằng động từ
- thể hiện rõ hành động và đối tượng
- ví dụ: tạo hóa đơn nạp, duyệt yêu cầu rút, ghi nhật ký kiểm toán thao tác

### Tên biến
- tên ngắn vừa đủ nhưng rõ nghĩa
- biến vòng lặp ngắn được phép dùng ngắn nếu ngữ cảnh rõ
- không dùng tên gây nhầm nghĩa như `data`, `item`, `obj` ở đoạn dài

### Tên hằng số
- thể hiện rõ mục đích
- nhóm hằng số theo mô-đun hoặc nhóm nghiệp vụ
- không nhúng “số thần bí” trực tiếp trong mã

## 6.4 Quy ước tên theo tài liệu chuẩn

### Trạng thái và mã lỗi
- Không tự gõ chuỗi trạng thái ở nhiều nơi
- Phải lấy từ thư viện `ma-trang-thai-va-ma-loi` theo TL14

### Mã màn hình, mã sự kiện, mã cảnh báo
- Dùng hằng số tập trung theo TL18, TL20
- Cấm dùng chuỗi rời rạc trong nhiều tệp

### Tên trường dữ liệu giao diện lập trình
- Bám TL15
- Khi cần đổi tên ở giao diện hiển thị, dùng lớp chuyển đổi dữ liệu, không sửa hợp đồng dữ liệu đầu ra tùy tiện

---

## 7. Tiêu chuẩn mã cho máy chủ nghiệp vụ

## 7.1 Cấu trúc lớp xử lý chuẩn

Mỗi luồng xử lý đồng bộ nên đi theo thứ tự sau:

1. Nhận yêu cầu
2. Kiểm tra dữ liệu vào
3. Kiểm tra xác thực và quyền
4. Tạo mã truy vết hoặc lấy mã truy vết hiện có
5. Gọi dịch vụ nghiệp vụ
6. Ghi nhật ký phù hợp
7. Chuyển đổi dữ liệu đầu ra theo TL15
8. Trả phản hồi theo chuẩn mã trạng thái và mã lỗi

## 7.2 Tách logic nghiệp vụ khỏi giao tiếp vào

- Lớp tiếp nhận yêu cầu chỉ làm:
  - nhận dữ liệu
  - gọi kiểm tra dữ liệu vào
  - gọi kiểm tra quyền
  - gọi dịch vụ
  - trả phản hồi
- Logic nghiệp vụ phải nằm ở lớp dịch vụ
- Truy vấn và ghi dữ liệu nằm ở lớp truy cập dữ liệu hoặc lớp giao dịch dữ liệu

## 7.3 Quản lý giao dịch dữ liệu

Đối với luồng tài chính và thao tác nhạy cảm:

- Phải dùng giao dịch dữ liệu ở phạm vi phù hợp
- Trong cùng một giao dịch phải đảm bảo:
  - cập nhật thực thể chính
  - ghi bút toán sổ cái
  - ghi nhật ký kiểm toán (hoặc ghi nhiệm vụ nhật ký tin cậy)
- Không gọi dịch vụ bên ngoài không ổn định trong giao dịch dài
- Không giữ giao dịch quá lâu do xử lý nặng hoặc chờ hàng đợi

## 7.4 Xử lý lỗi trong máy chủ nghiệp vụ

- Mọi lỗi phải được ánh xạ về chuẩn lỗi theo TL14
- Không trả lỗi thô từ thư viện hoặc cơ sở dữ liệu ra ngoài
- Phân biệt rõ:
  - lỗi dữ liệu vào
  - lỗi quyền
  - lỗi trạng thái nghiệp vụ
  - lỗi xung đột dữ liệu
  - lỗi hạ tầng
  - lỗi không xác định
- Với lỗi tài chính, phải ghi nhật ký có mã truy vết và ngữ cảnh tối thiểu để điều tra

## 7.5 Quy tắc đối với thao tác nhạy cảm

Thao tác nhạy cảm gồm (không giới hạn):

- duyệt nạp
- duyệt rút
- hoàn tiền
- chốt đối soát
- kết chuyển doanh thu
- thay đổi cấu hình hiệu lực
- thay đổi quyền
- xuất bản nội dung tuân thủ

Bắt buộc:
- kiểm tra quyền chi tiết
- kiểm tra trạng thái trước khi xử lý
- chống bấm lặp hoặc gọi lặp gây xử lý trùng
- ghi nhật ký kiểm toán
- ghi lý do nếu quy trình yêu cầu
- phản hồi rõ trạng thái sau xử lý theo TL14

---

## 8. Tiêu chuẩn mã cho cổng công khai chuyển hướng R01

## 8.1 Mục tiêu của mã R01

- ngắn gọn
- phản hồi nhanh
- dễ theo dõi lỗi
- ít phụ thuộc chéo
- không lộ thông tin nội bộ

## 8.2 Quy tắc bắt buộc cho R01

- Không nhúng logic chống gian lận chi tiết trong luồng trả phản hồi công khai
- Không ghi tính toán nặng trực tiếp trong yêu cầu công khai
- Không trả thông tin chi tiết nội bộ khi liên kết lỗi hoặc bị khóa
- Mọi ghi nhận sự kiện phải có cơ chế chống trùng ngắn hạn phù hợp
- Có mã truy vết cho yêu cầu công khai
- Có phân loại trang lỗi công khai theo TL20, TL23

## 8.3 Tổ chức mã R01

Các nhóm mã tối thiểu:

- xử lý định tuyến mã liên kết
- tra cứu liên kết
- ghi nhận sự kiện nhẹ
- chuyển hướng hoặc hiển thị trang trung gian
- giới hạn tần suất
- nhật ký truy cập
- ánh xạ trang lỗi công khai
- chỉ số và theo dõi hiệu năng

## 8.4 Tiêu chuẩn hiệu năng trong mã R01

- tránh truy vấn dư thừa trong một yêu cầu
- ưu tiên đọc dữ liệu cần thiết tối thiểu
- tách phần không bắt buộc sang xử lý nền
- tránh tạo chuỗi lớn hoặc ghi nhật ký quá nhiều ở mức thông thường
- có điểm đo thời gian xử lý cho các bước chính

---

## 9. Tiêu chuẩn mã cho xử lý nền và hàng đợi

## 9.1 Cấu trúc tác vụ nền chuẩn

Mỗi loại tác vụ nền phải có tối thiểu:

- bộ định nghĩa loại tác vụ
- dữ liệu đầu vào của tác vụ
- bộ kiểm tra dữ liệu tác vụ
- bộ xử lý chính
- bộ ánh xạ lỗi và chiến lược thử lại
- ghi nhật ký theo mã truy vết
- ghi chỉ số thành công, thất bại, thời gian chạy

## 9.2 Quy tắc thử lại

- Tác vụ không nhạy cảm tài chính có thể thử lại theo ngưỡng cấu hình
- Tác vụ tài chính, đối soát, kết chuyển phải có kiểm tra chống xử lý trùng trước khi thử lại
- Không thử lại vô hạn
- Khi vượt ngưỡng thử lại phải chuyển trạng thái lỗi cần xử lý thủ công
- Ghi rõ lần thử, lý do lỗi cuối cùng, hành động tiếp theo

## 9.3 Quy tắc idempotent cho tác vụ nhạy cảm

Đối với tác vụ có thể tạo tác động dữ liệu tài chính hoặc thay đổi trạng thái quan trọng:

- phải có khóa idempotent ở mức nghiệp vụ
- phải kiểm tra dấu vết đã xử lý
- phải tách rõ “đã xử lý xong”, “đang xử lý”, “xử lý thất bại”
- không dựa vào thời gian chờ đơn thuần để suy ra kết quả

## 9.4 Quy tắc vận hành hóa tác vụ kẹt

Mã phải hỗ trợ vận hành:

- tra cứu tác vụ theo mã tác vụ, loại, trạng thái, thời gian
- xem lý do lỗi
- thử lại có kiểm soát
- đánh dấu chuyển kiểm tra thủ công
- ghi nhật ký thao tác quản trị tác vụ kẹt

---

## 10. Tiêu chuẩn mã cho giao diện

## 10.1 Nguyên tắc chung

- Bám danh sách màn hình và luồng thao tác theo TL20
- Tách rõ:
  - thành phần trình bày
  - lớp quản lý trạng thái giao diện
  - lớp gọi giao diện lập trình
  - lớp chuyển đổi dữ liệu hiển thị
- Không để giao diện tự suy luận trạng thái nghiệp vụ khác TL14

## 10.2 Tổ chức thư mục giao diện khuyến nghị

```text
ung-dung-giao-dien/
├─ trang/
├─ thanh-phan/
├─ tinh-nang/
│  ├─ nap-tien/
│  ├─ rut-tien/
│  ├─ chien-dich/
│  ├─ lien-ket/
│  ├─ doi-soat/
│  ├─ cau-hinh/
│  └─ noi-dung-tuan-thu/
├─ lop-goi-giao-dien-lap-trinh/
├─ bo-chuyen-doi-du-lieu/
├─ quan-ly-ngon-ngu/
├─ bao-ve-duong-dan-theo-quyen/
├─ hang-so-trang-thai-va-ma-loi/
├─ ghi-nhat-ky-giao-dien/
└─ kiem-thu-giao-dien/
```

## 10.3 Quy tắc gọi giao diện lập trình

- Tất cả gọi máy chủ đi qua lớp gọi tập trung
- Không gọi trực tiếp phân tán trong nhiều thành phần giao diện
- Phản hồi được chuẩn hóa theo TL15
- Ánh xạ mã lỗi theo TL14 sang thông báo hiển thị theo TL23
- Với thao tác nhạy cảm phải có xác nhận giao diện theo TL20

## 10.4 Quản lý trạng thái giao diện

- Trạng thái tải, thành công, lỗi, trống dữ liệu phải rõ ràng
- Không che lỗi quan trọng thành “thành công giả”
- Phân biệt số liệu tạm thời và đã chốt đúng TL16, TL23
- Nội dung hiển thị song ngữ phải đi qua lớp quản lý nội dung, không rải chuỗi cứng khắp nơi

## 10.5 Quy tắc bảo mật phía giao diện

- Không lưu bí mật hệ thống phía giao diện
- Không tin dữ liệu quyền chỉ từ giao diện; máy chủ phải xác minh lại
- Che dữ liệu nhạy cảm theo quyền hiển thị
- Không ghi nhật ký giao diện chứa dữ liệu nhạy cảm đầy đủ

---

## 11. Chuẩn dữ liệu vào, dữ liệu ra, trạng thái và mã lỗi trong mã nguồn

## 11.1 Quy tắc kiểm tra dữ liệu vào

- Kiểm tra dữ liệu vào ở mọi đường vào:
  - giao diện lập trình
  - tác vụ nền
  - tập lệnh quản trị nội bộ
- Phân tách:
  - kiểm tra kiểu dữ liệu
  - kiểm tra bắt buộc
  - kiểm tra định dạng
  - kiểm tra miền giá trị
  - kiểm tra ràng buộc nghiệp vụ
- Thông báo lỗi kỹ thuật nội bộ và lỗi trả ra người dùng phải đi qua lớp ánh xạ lỗi

## 11.2 Chuẩn phản hồi dữ liệu ra

- Phản hồi bám TL15
- Không tự thêm trường không có trong hợp đồng giao diện lập trình nếu chưa cập nhật TL15
- Trường dữ liệu nhạy cảm phải che hoặc lược bỏ theo TL19
- Tên trường và cấu trúc phản hồi phải ổn định để giảm vỡ giao diện

## 11.3 Trạng thái và mã lỗi

- Dùng thư viện trạng thái và mã lỗi dùng chung theo TL14
- Không dùng chuỗi trạng thái “tự chế” trong mô-đun
- Khi thêm mã lỗi mới (nếu được phê duyệt):
  - cập nhật TL14 trước
  - cập nhật thư viện dùng chung
  - cập nhật ánh xạ thông báo giao diện
  - cập nhật kiểm thử liên quan

---

## 12. Tiêu chuẩn ghi nhật ký, kiểm toán và mã truy vết

## 12.1 Mục tiêu

Bám TL18, TL19, TL22:
- hỗ trợ điều tra lỗi nhanh
- hỗ trợ truy vết thao tác nhạy cảm
- hỗ trợ vận hành và ứng cứu sự cố
- không làm lộ dữ liệu nhạy cảm

## 12.2 Phân loại nhật ký trong mã

### Nhật ký kỹ thuật
- lỗi hệ thống
- cảnh báo hệ thống
- thông tin vận hành tối thiểu
- đo thời gian xử lý

### Nhật ký nghiệp vụ
- thay đổi trạng thái nạp, rút, chiến dịch, liên kết
- tạo hoặc xử lý tác vụ nền quan trọng
- thay đổi cấu hình hiệu lực

### Nhật ký kiểm toán
- thao tác nhạy cảm bởi R30, R40 (nếu có quyền), quản trị kỹ thuật
- thay đổi quyền, thay đổi nội dung tuân thủ
- chốt đối soát, kết chuyển, điều chỉnh sau chốt

## 12.3 Trường nhật ký tối thiểu

Mỗi bản ghi nhật ký quan trọng cần có tối thiểu:

- thời gian
- mức nhật ký
- tên dịch vụ hoặc gói
- tên mô-đun
- mã truy vết
- mã người dùng hoặc vai trò (nếu có)
- mã thao tác hoặc mã sự kiện
- kết quả
- thông điệp ngắn gọn
- ngữ cảnh tối thiểu an toàn để điều tra

## 12.4 Quy tắc che dữ liệu nhạy cảm

- Không ghi toàn bộ số tài khoản, địa chỉ ví, mã phiên, mật khẩu, bí mật hệ thống
- Chỉ ghi phần cần thiết để đối chiếu
- Dùng hàm che dữ liệu dùng chung, không mỗi nơi che một kiểu
- Kiểm tra lại nhật ký của thao tác nhạy cảm trong kiểm thử tích hợp

## 12.5 Mã truy vết xuyên thành phần

- Mọi yêu cầu vào máy chủ và R01 đều phải có mã truy vết
- Mọi tác vụ nền sinh ra từ yêu cầu phải mang mã truy vết gốc hoặc mã truy vết cha-con
- Mã truy vết phải được truyền qua:
  - nhật ký
  - thông điệp hàng đợi
  - cảnh báo
- Không tạo lại mã truy vết tùy tiện làm đứt chuỗi điều tra

---

## 13. Tiêu chuẩn cập nhật cấu trúc dữ liệu và dữ liệu danh mục

## 13.1 Quy tắc chung

- Mọi thay đổi cấu trúc dữ liệu phải đi qua `tap-lenh-cap-nhat-du-lieu`
- Không sửa thủ công trực tiếp trên môi trường phát hành rồi mới “nhớ” cập nhật mã
- Tập lệnh phải có khả năng truy vết phiên bản và trạng thái chạy

## 13.2 Nội dung tối thiểu của một tập lệnh cập nhật cấu trúc dữ liệu

- mã phiên bản cập nhật
- mô tả thay đổi
- bước áp dụng
- bước quay lui hoặc hướng xử lý khi không thể quay lui hoàn toàn
- kiểm tra sau áp dụng
- ghi nhận thời gian chạy và kết quả

## 13.3 Quy tắc dữ liệu danh mục và dữ liệu khởi tạo

- Dữ liệu danh mục chuẩn theo TL14, TL17 phải được khai báo dạng có phiên bản
- Không để mỗi môi trường tự nhập tay gây lệch
- Dữ liệu mẫu phát triển phải tách khỏi dữ liệu danh mục chuẩn
- Dữ liệu khởi tạo không chứa thông tin thật hoặc bí mật

---

## 14. Tiêu chuẩn cấu hình, biến môi trường và bí mật hệ thống trong mã

## 14.1 Quy tắc tổ chức cấu hình

- Cấu hình theo lớp:
  - cấu hình hệ thống chung
  - cấu hình dịch vụ
  - cấu hình môi trường
  - cấu hình tính năng
- Có lớp nạp cấu hình tập trung cho từng dịch vụ
- Có kiểm tra cấu hình khi khởi động
- Không để dịch vụ chạy khi thiếu cấu hình bắt buộc

## 14.2 Quy tắc biến môi trường

- Tên biến thống nhất giữa các môi trường, chỉ khác giá trị
- Có tệp mẫu biến môi trường cho từng dịch vụ
- Tệp mẫu không chứa giá trị bí mật thật
- Có mô tả từng biến: mục đích, bắt buộc hay không, giá trị mặc định nếu có

## 14.3 Quy tắc bí mật hệ thống

- Không ghi bí mật vào kho mã nguồn
- Không in bí mật đầy đủ ra nhật ký khởi động
- Không truyền bí mật qua lỗi trả về người dùng
- Dùng lớp truy cập bí mật tập trung nếu có
- Thay đổi bí mật phải ghi biên bản vận hành theo TL22 (không ghi giá trị)

---

## 15. Tiêu chuẩn kiểm thử và chất lượng mã

## 15.1 Mục tiêu kiểm thử trong TL26

TL26 quy định cách tổ chức kiểm thử ở tầng mã nguồn để hỗ trợ TL21 và TL24, không thay thế kế hoạch kiểm thử chấp nhận.

## 15.2 Phân tầng kiểm thử bắt buộc

### Kiểm thử đơn vị
Áp dụng cho:
- hàm xử lý nghiệp vụ thuần
- bộ kiểm tra dữ liệu vào
- bộ ánh xạ mã lỗi
- bộ chuyển đổi dữ liệu
- quy tắc tính toán không phụ thuộc hạ tầng

Yêu cầu:
- kiểm thử trường hợp đúng
- kiểm thử trường hợp lỗi
- kiểm thử giá trị biên quan trọng

### Kiểm thử tích hợp mô-đun
Áp dụng cho:
- mô-đun nạp, rút, ví, sổ cái
- mô-đun chiến dịch, liên kết
- mô-đun xử lý nền
- mô-đun đối soát, kết chuyển

Yêu cầu:
- kiểm thử tương tác với cơ sở dữ liệu
- kiểm thử trạng thái theo TL14
- kiểm thử tác động dữ liệu chính
- kiểm thử nhật ký kiểm toán ở thao tác nhạy cảm

### Kiểm thử liên thông nhiều gói
Áp dụng cho:
- giao diện ↔ máy chủ nghiệp vụ
- cổng công khai ↔ hàng đợi ↔ xử lý nền ↔ thống kê
- luồng nạp/rút ↔ ví/sổ cái ↔ đối chiếu
- đối soát ↔ kết chuyển ↔ báo cáo quản trị

Yêu cầu:
- bám ca kỹ thuật trọng yếu trong TL21
- có dữ liệu mẫu rõ ràng, dọn dẹp được

## 15.3 Quy tắc đặt tên kiểm thử

- Tên kiểm thử phải mô tả hành vi, không đặt chung chung
- Một kiểm thử chỉ kiểm một mục tiêu chính
- Nhóm kiểm thử theo mô-đun và luồng nghiệp vụ

## 15.4 Quy tắc dữ liệu kiểm thử

- Dữ liệu kiểm thử phải tự tạo được hoặc dùng bộ dữ liệu mẫu có phiên bản
- Không phụ thuộc dữ liệu còn sót từ lần chạy trước
- Không dùng dữ liệu thật
- Với kiểm thử tài chính phải có kiểm tra cân bằng trước-sau

## 15.5 Tiêu chuẩn tối thiểu trước khi hợp nhất mã

Trước khi hợp nhất mã thay đổi vào nhánh chính:

- kiểm thử đơn vị liên quan phải chạy đạt
- kiểm thử tích hợp liên quan phải chạy đạt (ít nhất bộ tối thiểu)
- không có lỗi phân tích tĩnh mức nghiêm trọng chưa xử lý
- không có vi phạm quy tắc trạng thái, mã lỗi, nhật ký bắt buộc
- có cập nhật kiểm thử khi thay đổi hành vi nghiệp vụ

---

## 16. Tiêu chuẩn xử lý lỗi và phản hồi cho người dùng

## 16.1 Nguyên tắc chung

- Lỗi phải rõ cho dev và vận hành nhưng không lộ thông tin nhạy cảm cho người dùng
- Phản hồi người dùng phải nhất quán, bám TL14 và TL23
- Mọi lỗi không xác định phải có mã truy vết để hỗ trợ tra cứu

## 16.2 Phân lớp lỗi trong mã

- **Lỗi dữ liệu vào**
- **Lỗi quyền truy cập**
- **Lỗi trạng thái nghiệp vụ**
- **Lỗi xung đột hoặc xử lý trùng**
- **Lỗi giới hạn tần suất**
- **Lỗi hạ tầng tạm thời**
- **Lỗi không xác định**

Mỗi lớp lỗi phải có:
- mã lỗi chuẩn
- mức nhật ký
- thông điệp nội bộ
- thông điệp hiển thị (qua ánh xạ nội dung)
- hướng xử lý khuyến nghị nếu có

## 16.3 Quy tắc hiển thị lỗi theo nhóm vai trò

- **R10, R20:** thông điệp rõ ràng, không lộ nội bộ
- **R30, R40:** có thể hiển thị mã lỗi và gợi ý thao tác theo quyền
- **Đội vận hành kỹ thuật:** tra cứu chi tiết qua nhật ký và màn hình vận hành, không qua lỗi công khai

## 16.4 Quy tắc xử lý lỗi trong giao dịch tài chính

- Nếu giao dịch dữ liệu thất bại, phải bảo đảm không để trạng thái nửa chừng không truy vết
- Ghi nhật ký lỗi với mã truy vết và thực thể liên quan
- Không trả “thành công” khi chưa xác nhận cập nhật sổ cái thành công
- Nếu có nghi ngờ xử lý lặp, ưu tiên trả trạng thái cần kiểm tra thay vì tiếp tục ghi dữ liệu mù

---

## 17. Tiêu chuẩn bảo mật trong mã và rà soát an toàn trước hợp nhất

## 17.1 Quy tắc an toàn bắt buộc khi lập trình

- kiểm tra dữ liệu vào đầy đủ
- dùng truy vấn có tham số, tránh ghép chuỗi truy vấn
- kiểm soát tải tệp: loại, kích thước, quyền xem
- che dữ liệu nhạy cảm trong nhật ký
- kiểm soát phân quyền ở máy chủ
- giới hạn tần suất cho các đường dễ bị lạm dụng
- không để thông tin lỗi nội bộ lộ ra công khai

## 17.2 Danh sách kiểm tra an toàn khi rà soát mã

Người rà soát phải kiểm tra tối thiểu:

- có đường nào bỏ qua kiểm tra quyền không
- có ghi trực tiếp số dư mà không qua sổ cái không
- có lộ dữ liệu nhạy cảm trong phản hồi hoặc nhật ký không
- có tạo trạng thái hoặc mã lỗi ngoài TL14 không
- có thao tác nhạy cảm thiếu nhật ký kiểm toán không
- có gọi xử lý nặng trong đường công khai R01 không
- có cơ chế chống xử lý trùng cho thao tác nhạy cảm không

## 17.3 Rà soát mã cho nội dung hiển thị và song ngữ

- nội dung cảnh báo, điều khoản, thông báo phải lấy từ nguồn nội dung theo TL23
- không nhúng chuỗi cứng rải rác vào mã
- kiểm tra hiển thị đúng ngôn ngữ theo lựa chọn người dùng
- kiểm tra không hiển thị chi tiết chống gian lận nội bộ

---

## 18. Quy trình làm việc với trợ lý lập trình và quy tắc sinh mã

## 18.1 Vai trò của trợ lý lập trình trong dự án

Trợ lý lập trình được dùng để:
- sinh khung mô-đun
- sinh kiểm thử mẫu
- sinh lớp chuyển đổi dữ liệu
- sinh lớp gọi giao diện lập trình
- sinh mã lặp lại có quy tắc rõ

Trợ lý lập trình **không được** tự quyết:
- trạng thái mới
- mã lỗi mới
- thay đổi cấu trúc dữ liệu ngoài TL13
- thay đổi hợp đồng giao diện lập trình ngoài TL15
- thay đổi luồng nghiệp vụ tài chính lõi ngoài TL08, TL09, TL16

## 18.2 Mẫu chỉ dẫn bắt buộc khi giao việc cho trợ lý lập trình

Mỗi yêu cầu sinh mã nên có đủ:

1. Mã tài liệu nguồn liên quan (ví dụ TL08, TL14, TL15, TL19, TL26)
2. Mục tiêu mô-đun hoặc màn hình
3. Phạm vi được phép thay đổi
4. Trạng thái và mã lỗi được phép dùng
5. Yêu cầu nhật ký và kiểm toán
6. Yêu cầu kiểm thử cần sinh kèm
7. Điều cấm (không thêm trạng thái, không bỏ qua quyền, không ghi số dư trực tiếp…)

## 18.3 Tiêu chí chấp nhận mã do trợ lý lập trình sinh

- đúng cấu trúc thư mục TL26
- đúng hợp đồng dữ liệu TL15
- dùng mã trạng thái và mã lỗi từ TL14
- có kiểm tra quyền theo TL03
- có nhật ký kiểm toán nếu là thao tác nhạy cảm
- có kiểm thử tối thiểu
- không lộ dữ liệu nhạy cảm theo TL19
- không mâu thuẫn kiến trúc TL25

## 18.4 Quy trình rà soát mã do trợ lý lập trình sinh

1. Rà soát cấu trúc và quy ước tên
2. Rà soát logic nghiệp vụ đối chiếu tài liệu nguồn
3. Rà soát bảo mật và quyền
4. Rà soát nhật ký và mã truy vết
5. Chạy kiểm thử
6. Sửa tay và ghi chú lại mẫu chỉ dẫn nếu thấy lỗi lặp

---

## 19. Quy trình rà soát mã, hợp nhất mã và quản lý thay đổi kỹ thuật

## 19.1 Nguyên tắc hợp nhất mã

- Không hợp nhất mã chỉ vì “đã chạy được”
- Mọi thay đổi liên quan luồng lõi phải có người rà soát hiểu tài liệu nghiệp vụ
- Thay đổi ảnh hưởng tài chính, đối soát, phân quyền, nội dung tuân thủ phải có rà soát tăng cường

## 19.2 Checklist rà soát mã chung

- [ ] Đúng phạm vi công việc
- [ ] Đúng quy ước tên và cấu trúc thư mục
- [ ] Không lặp logic có thể tái sử dụng
- [ ] Có kiểm tra dữ liệu vào
- [ ] Có kiểm tra quyền phù hợp
- [ ] Dùng đúng trạng thái, mã lỗi theo TL14
- [ ] Bám hợp đồng dữ liệu TL15
- [ ] Có nhật ký kỹ thuật và nhật ký kiểm toán khi cần
- [ ] Không lộ dữ liệu nhạy cảm
- [ ] Có kiểm thử liên quan
- [ ] Cập nhật tài liệu nếu thay đổi hành vi

## 19.3 Quy trình thay đổi kỹ thuật ảnh hưởng kiến trúc hoặc chuẩn dùng chung

Nếu thay đổi tác động:
- `goi-dung-chung`
- cấu trúc kho mã
- mã trạng thái/mã lỗi
- hợp đồng dữ liệu dùng chung
- cách truyền mã truy vết
- chuẩn nhật ký

thì phải:
1. lập ghi chú quyết định kỹ thuật
2. đối chiếu TL25 và TL26
3. đánh giá tác động các gói
4. cập nhật kiểm thử
5. cập nhật tài liệu liên quan nếu được chấp thuận

---

## 20. Mẫu cấu trúc tối thiểu cho một mô-đun nghiệp vụ trọng yếu

## 20.1 Mẫu áp dụng

Áp dụng cho mô-đun như:
- nạp tiền thủ công
- rút tiền thủ công
- đối soát
- kết chuyển
- cấu hình hiệu lực
- nội dung tuân thủ

## 20.2 Danh sách thành phần bắt buộc trong mô-đun

- lớp tiếp nhận yêu cầu
- lớp kiểm tra dữ liệu vào
- lớp kiểm tra quyền
- lớp dịch vụ nghiệp vụ
- lớp truy cập dữ liệu
- lớp giao dịch dữ liệu (nếu có)
- lớp ánh xạ phản hồi theo TL15
- lớp ánh xạ mã lỗi theo TL14
- lớp ghi nhật ký kỹ thuật
- lớp ghi nhật ký kiểm toán
- kiểm thử đơn vị
- kiểm thử tích hợp mô-đun

## 20.3 Thành phần khuyến nghị thêm

- lớp chống gọi lặp
- lớp tạo mã idempotent
- lớp đo thời gian xử lý
- bộ sự kiện nội bộ để đẩy tác vụ nền
- bộ kiểm tra tính nhất quán sau xử lý

---

## 21. Ma trận truy vết TL26 với các tài liệu đã có

## 21.1 Truy vết theo nhóm chủ đề

- **TL02** → ranh giới nghiệp vụ và thuật ngữ dùng trong đặt tên mô-đun
- **TL03** → kiểm tra quyền, bảo vệ đường dẫn, thao tác theo vai trò
- **TL08** → chuẩn mô-đun nạp tiền, nhật ký duyệt nạp, cập nhật ví/sổ cái
- **TL09** → chuẩn mô-đun rút tiền, khóa số dư tạm, hoàn tiền, hoàn thành
- **TL10** → mô-đun chiến dịch, trạng thái, kiểm thử nghiệp vụ
- **TL11** → mô-đun liên kết, cổng công khai, doanh thu nhà xuất bản
- **TL12** → xử lý nền chống gian lận, kiểm tra thủ công, giới hạn công bố chi tiết
- **TL13** → quy tắc cập nhật dữ liệu, giao dịch dữ liệu, sổ cái, đối chiếu
- **TL14** → thư viện trạng thái/mã lỗi dùng chung, quy tắc không tự chế
- **TL15** → chuẩn phản hồi và hợp đồng giao diện lập trình
- **TL16** → cấu trúc tác vụ nền, hàng đợi, thử lại, chống xử lý trùng
- **TL17** → quản lý cấu hình, khóa mở tính năng, dữ liệu danh mục
- **TL18** → ghi nhật ký, mã truy vết, chỉ số, cảnh báo
- **TL19** → bảo mật mã nguồn, che dữ liệu, kiểm tra an toàn khi rà soát mã
- **TL20** → tổ chức giao diện theo màn hình và xác nhận thao tác
- **TL21** → phân tầng kiểm thử và bộ kiểm thử liên thông
- **TL22** → cập nhật cấu trúc dữ liệu, phát hành, quay lui, vận hành
- **TL23** → nội dung hiển thị song ngữ, thông báo và cảnh báo
- **TL24** → lộ trình triển khai và tiêu chí bàn giao
- **TL25** → kiến trúc kỹ thuật, phân rã dịch vụ, cấu trúc kho mã nền

## 21.2 Truy vết theo thành phần kỹ thuật

- **Giao diện** ↔ TL20, TL23, TL15, TL14, TL19
- **Máy chủ nghiệp vụ** ↔ TL08 đến TL17, TL18, TL19
- **Cổng công khai R01** ↔ TL11, TL12, TL18, TL23, TL25
- **Xử lý nền** ↔ TL12, TL16, TL18, TL22, TL25
- **Cấu trúc dữ liệu và cập nhật dữ liệu** ↔ TL13, TL22
- **Kiểm thử kỹ thuật** ↔ TL21, TL24
- **Bàn giao và vận hành mã** ↔ TL22, TL24, TL25

---

## 22. Tiêu chí chấp nhận tài liệu TL26

TL26 được xem là đạt khi:

- Chốt được cấu trúc kho mã và thư mục chính cho phiên bản đầu
- Có quy ước thống nhất cho mô-đun, tên gọi, tệp, thư mục
- Có tiêu chuẩn mã cho máy chủ nghiệp vụ, cổng công khai, xử lý nền, giao diện
- Có chuẩn dữ liệu vào/ra, trạng thái, mã lỗi bám TL14, TL15
- Có chuẩn ghi nhật ký, kiểm toán, mã truy vết bám TL18, TL19
- Có chuẩn cập nhật cấu trúc dữ liệu và dữ liệu danh mục bám TL13, TL22
- Có chuẩn cấu hình, biến môi trường, bí mật hệ thống
- Có tiêu chuẩn kiểm thử và chất lượng mã hỗ trợ TL21
- Có tiêu chuẩn xử lý lỗi và hiển thị lỗi bám TL14, TL23
- Có quy trình làm việc rõ với trợ lý lập trình để sinh mã nhất quán
- Có checklist rà soát mã và cơ chế thay đổi chuẩn dùng chung
- Truy vết nhất quán với TL01 đến TL25

---

## 23. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Bám kiến trúc kỹ thuật đã chốt trong TL25
- [x] Không thay đổi nghiệp vụ lõi của TL08 đến TL12
- [x] Bảo toàn nguyên tắc dữ liệu, sổ cái và đối chiếu theo TL13
- [x] Dùng đúng chuẩn trạng thái, mã lỗi theo TL14
- [x] Bám hợp đồng giao diện lập trình theo TL15
- [x] Bám xử lý nền và hàng đợi theo TL16
- [x] Bám cấu hình và khóa mở tính năng theo TL17
- [x] Bám ghi nhật ký, mã truy vết, cảnh báo theo TL18
- [x] Bám an toàn hệ thống và che dữ liệu theo TL19
- [x] Bám màn hình và nội dung hiển thị theo TL20, TL23
- [x] Hỗ trợ kiểm thử chấp nhận và lộ trình triển khai theo TL21, TL24
- [x] Tương thích quy trình phát hành và vận hành theo TL22

---

## 24. Gợi ý tài liệu tiếp theo để tăng tốc triển khai thực tế

Sau TL26, bộ tài liệu kỹ thuật đã đủ mạnh để bắt đầu sinh mã tương đối an toàn. Để đẩy nhanh hơn mà vẫn giảm lệch, nên ưu tiên:

### TL27 — Hướng dẫn thao tác theo vai trò cho R30 và R40
- thao tác theo màn hình
- xử lý tình huống thường gặp
- checklist trước/sau thao tác nhạy cảm
- mẫu phản hồi hỗ trợ bám TL23

### TL28 — Bộ dữ liệu kiểm thử và kịch bản diễn tập kỹ thuật
- dữ liệu mẫu chuẩn hóa cho các luồng lõi
- kịch bản kẹt hàng đợi, sai lệch số liệu, quay lui
- dữ liệu và kịch bản phục vụ đào tạo vận hành

### TL29 — Quy chuẩn giao diện chi tiết và thư viện thành phần dùng chung
- chuẩn lưới, biểu mẫu, bảng dữ liệu, trạng thái hiển thị
- chuẩn thông báo lỗi/cảnh báo/xác nhận
- chuẩn song ngữ và hiển thị nội dung tuân thủ theo TL23

---

## 25. Ghi chú cuối tài liệu

- TL26 là tài liệu tiêu chuẩn lập trình và tổ chức mã nguồn để hiện thực hóa TL25, không thay thế tài liệu nghiệp vụ hay dữ liệu.
- Mọi thay đổi chuẩn dùng chung ảnh hưởng nhiều gói phải được rà soát chéo với TL14, TL15, TL18, TL19, TL25 trước khi áp dụng.
- Khi đội dự án có số liệu thực tế sau giai đoạn phát hành giới hạn, TL26 có thể bổ sung phụ lục về tối ưu quy ước kiểm thử hiệu năng và chuẩn ghi nhật ký theo tải thực.
