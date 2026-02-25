# TL28 — Bộ dữ liệu kiểm thử và kịch bản diễn tập kỹ thuật

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL28
- **Tên tài liệu:** Bộ dữ liệu kiểm thử và kịch bản diễn tập kỹ thuật
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22, TL23, TL24, TL25, TL26
- **Tài liệu đầu ra phụ thuộc:** dữ liệu mẫu dùng cho kiểm thử đơn vị / tích hợp / liên thông, dữ liệu diễn tập vận hành, dữ liệu đào tạo nội bộ, bộ ca diễn tập sự cố và phục hồi

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL28 quy định bộ dữ liệu kiểm thử và kịch bản diễn tập kỹ thuật thống nhất để:

- hỗ trợ đội phát triển kiểm thử đúng và đủ theo TL21
- hỗ trợ đội vận hành diễn tập tình huống theo TL22
- hỗ trợ triển khai từng giai đoạn theo TL24 mà không dùng dữ liệu thật
- hỗ trợ trợ lý lập trình sinh dữ liệu mẫu, ca kiểm thử và mã kiểm thử bám chuẩn TL26
- giảm sai lệch khi nhiều nhóm cùng kiểm thử các luồng lõi (nạp, rút, chiến dịch, liên kết, lượt hợp lệ, đối soát, kết chuyển)

## 2.2 Phạm vi TL28

Trong phạm vi:

- bộ dữ liệu mẫu chuẩn hóa cho các luồng nghiệp vụ lõi
- nguyên tắc tạo dữ liệu kiểm thử và làm sạch dữ liệu sau kiểm thử
- bộ kịch bản kiểm thử liên thông kỹ thuật
- bộ kịch bản diễn tập sự cố, suy giảm, hàng đợi kẹt, sai lệch số liệu, quay lui
- bộ dữ liệu phục vụ đào tạo R30, R40 và đội vận hành kỹ thuật
- quy tắc phiên bản hóa dữ liệu kiểm thử
- ma trận ánh xạ dữ liệu ↔ ca kiểm thử ↔ tài liệu nguồn

Ngoài phạm vi:

- thay thế toàn bộ kế hoạch kiểm thử chấp nhận (TL21)
- thay thế quy trình ứng cứu sự cố chính thức (TL22)
- thay thế đặc tả dữ liệu cấp cột chi tiết (TL13)
- thay thế đặc tả nghiệp vụ chi tiết (TL08 đến TL12)

## 2.3 Nguyên tắc chung

- **Không dùng dữ liệu thật.**
- **Dữ liệu mẫu phải truy vết được nguồn yêu cầu từ tài liệu nào.**
- **Một bộ dữ liệu phải tái tạo được, không phụ thuộc dữ liệu còn sót.**
- **Mọi ca kiểm thử tài chính phải kiểm được cân bằng ví và sổ cái.**
- **Phân tách rõ dữ liệu cho kiểm thử chức năng, kiểm thử lỗi, kiểm thử gian lận, diễn tập vận hành.**
- **Dữ liệu mẫu phải đủ phong phú để bắt lỗi biên, không chỉ “đi đường đẹp”.**

---

## 3. Mối liên hệ TL28 với TL21, TL22, TL24, TL25, TL26

## 3.1 Vai trò của TL28 trong bộ tài liệu

- **TL21** xác định mục tiêu và kế hoạch kiểm thử chấp nhận
- **TL22** xác định vận hành, triển khai, ứng cứu sự cố
- **TL24** xác định lộ trình triển khai và bàn giao theo giai đoạn
- **TL25** xác định kiến trúc kỹ thuật và thành phần
- **TL26** xác định quy ước mã, kiểm thử và tiêu chuẩn lập trình
- **TL28** cung cấp “nguyên liệu kiểm thử và diễn tập” dùng chung cho các tài liệu trên

## 3.2 Nguyên tắc xử lý mâu thuẫn

Nếu dữ liệu mẫu hoặc ca diễn tập trong TL28 mâu thuẫn tài liệu nghiệp vụ / dữ liệu / trạng thái:

1. Ưu tiên TL08 đến TL13
2. Ưu tiên TL14, TL15
3. Ưu tiên TL16, TL17, TL18, TL19
4. Ưu tiên TL21, TL22, TL24, TL25, TL26
5. Cập nhật TL28 để đồng bộ lại, không giữ dữ liệu mẫu sai

---

## 4. Phân loại bộ dữ liệu kiểm thử và phạm vi sử dụng

## 4.1 Nhóm bộ dữ liệu chuẩn

TL28 chia bộ dữ liệu thành 8 nhóm:

1. **Dữ liệu nền hệ thống**
2. **Dữ liệu người dùng, vai trò, quyền**
3. **Dữ liệu ví, sổ cái, nạp tiền, rút tiền**
4. **Dữ liệu chiến dịch và liên kết**
5. **Dữ liệu sự kiện truy cập và kết quả lượt hợp lệ**
6. **Dữ liệu đối soát, kết chuyển, điều chỉnh**
7. **Dữ liệu cấu hình, nội dung tuân thủ, mã dùng chung**
8. **Dữ liệu sự cố và dữ liệu diễn tập vận hành**

## 4.2 Mức độ dữ liệu theo mục đích kiểm thử

### Bộ dữ liệu mức nhỏ (nhanh)
- dùng cho kiểm thử đơn vị và tích hợp mô-đun
- ít bản ghi
- dễ đọc tay, dễ đối chiếu

### Bộ dữ liệu mức vừa (chuẩn)
- dùng cho kiểm thử liên thông
- có đủ trường hợp đúng / sai / biên / bất thường
- dùng cho diễn tập quy trình vận hành cơ bản

### Bộ dữ liệu mức diễn tập kỹ thuật (phức tạp)
- dùng cho kịch bản hàng đợi kẹt, sai lệch số liệu, lỗi đồng thời, quay lui
- số lượng bản ghi đủ lớn để bộc lộ điểm nghẽn
- có dữ liệu “cài bẫy” để kiểm tra giám sát và cảnh báo

## 4.3 Quy ước mã bộ dữ liệu

Mỗi bộ dữ liệu có mã:

`DL-<nhom>-<cap>-<so-thu-tu>`

Ví dụ:
- `DL-NEN-NHO-001`
- `DL-TAI-CHINH-CHUAN-003`
- `DL-SU-KIEN-DIEN-TAP-002`

Mỗi kịch bản diễn tập có mã:

`DT-<nhom>-<so-thu-tu>`

Ví dụ:
- `DT-HANG-DOI-001`
- `DT-DOI-SOAT-002`
- `DT-QUAY-LUI-001`

---

## 5. Nguyên tắc thiết kế dữ liệu kiểm thử

## 5.1 Tiêu chí bắt buộc cho dữ liệu mẫu

Dữ liệu mẫu phải thỏa các tiêu chí sau:

- **Đúng cấu trúc dữ liệu** theo TL13
- **Đúng trạng thái và mã lỗi** theo TL14
- **Đúng hợp đồng dữ liệu trao đổi** theo TL15 (nếu dùng trong kiểm thử giao diện lập trình)
- **Đúng ranh giới vai trò** theo TL03
- **Đúng quy tắc nghiệp vụ** theo TL08 đến TL12, TL16
- **Có khả năng tái tạo** bằng tập lệnh hoặc tệp mẫu có phiên bản
- **Không chứa dữ liệu nhạy cảm thật** theo TL19

## 5.2 Phủ trường hợp kiểm thử

Mỗi nhóm dữ liệu phải có ít nhất:

- trường hợp đúng chuẩn
- trường hợp thiếu dữ liệu bắt buộc
- trường hợp sai định dạng
- trường hợp sai trạng thái nghiệp vụ
- trường hợp xử lý lặp
- trường hợp xung đột / đồng thời
- trường hợp cần kiểm tra thủ công (nếu áp dụng)
- trường hợp biên (giá trị nhỏ nhất, lớn nhất hợp lệ, sát ngưỡng)

## 5.3 Quy tắc đặt tên thực thể mẫu

Để dễ truy vết, dùng quy ước thống nhất:

- người dùng: `nguoi-dung-mau-<vai-tro>-<so>`
- chiến dịch: `chien-dich-mau-<muc-dich>-<so>`
- liên kết: `lien-ket-mau-<trang-thai>-<so>`
- hóa đơn nạp: `nap-mau-<trang-thai>-<so>`
- yêu cầu rút: `rut-mau-<trang-thai>-<so>`
- kỳ đối soát: `ky-doi-soat-mau-<thang-nam>-<so>`

## 5.4 Quy tắc thời gian trong dữ liệu mẫu

- Dùng mốc thời gian tương đối có thể tái tạo theo ngày chạy kiểm thử, hoặc mốc tuyệt đối được mô tả rõ
- Phải có dữ liệu ở nhiều khung thời gian:
  - cùng ngày
  - khác ngày
  - khác kỳ đối soát
- Với ca diễn tập, mô tả rõ thứ tự thời gian để tái hiện lỗi

---

## 6. Cấu trúc lưu trữ bộ dữ liệu kiểm thử trong kho mã

## 6.1 Vị trí lưu trữ khuyến nghị

Theo TL26, TL28 chốt cấu trúc lưu trữ trong kho mã như sau:

```text
du-an-nen-tang/
├─ du-lieu-khoi-tao/
│  ├─ danh-muc-chuan/
│  ├─ du-lieu-mau-phat-trien/
│  └─ du-lieu-mau-song-ngu/
├─ kiem-thu-tich-hop/
│  ├─ bo-du-lieu/
│  │  ├─ dl-nen/
│  │  ├─ dl-nguoi-dung-va-quyen/
│  │  ├─ dl-tai-chinh/
│  │  ├─ dl-chien-dich-va-lien-ket/
│  │  ├─ dl-su-kien-va-luot/
│  │  ├─ dl-doi-soat-va-ket-chuyen/
│  │  ├─ dl-cau-hinh-va-noi-dung/
│  │  └─ dl-dien-tap-su-co/
│  ├─ kich-ban-lien-thong/
│  ├─ kich-ban-dien-tap/
│  ├─ tap-lenh-khoi-tao/
│  └─ tap-lenh-don-dep/
└─ tai-lieu-ky-thuat/
   └─ phu-luc-bo-du-lieu-va-ca-kiem-thu/
```

## 6.2 Thành phần bắt buộc của mỗi bộ dữ liệu

Mỗi bộ dữ liệu phải có tối thiểu:

- tệp mô tả bộ dữ liệu
- tệp dữ liệu mẫu (hoặc tập lệnh sinh dữ liệu)
- tệp ánh xạ ca kiểm thử áp dụng
- tệp kỳ vọng kết quả chính
- tệp dọn dẹp (nếu dữ liệu không tự hủy)

## 6.3 Nội dung tệp mô tả bộ dữ liệu

Tệp mô tả phải có:

- mã bộ dữ liệu
- mục tiêu sử dụng
- tài liệu nguồn tham chiếu
- phạm vi mô-đun áp dụng
- dữ liệu đầu vào chính
- trạng thái dữ liệu sau khởi tạo
- ca kiểm thử liên quan
- rủi ro / lưu ý khi dùng
- cách dọn dẹp

---

## 7. Bộ dữ liệu nền hệ thống và dữ liệu danh mục

## 7.1 Mục tiêu

Cung cấp nền dữ liệu tối thiểu để hệ thống chạy được kiểm thử mà không phải nhập tay lặp lại.

## 7.2 Thành phần dữ liệu nền bắt buộc

### Dữ liệu danh mục và mã dùng chung
- mã trạng thái hệ thống theo TL14
- mã lỗi chuẩn theo TL14
- mã cảnh báo, mã sự kiện giám sát theo TL18
- danh mục loại thao tác nhạy cảm
- danh mục loại tác vụ nền
- danh mục trạng thái liên kết, chiến dịch, nạp, rút, đối soát, kết chuyển

### Dữ liệu cấu hình khởi tạo
- cấu hình giới hạn tần suất cơ bản
- cấu hình ngưỡng đánh dấu bất thường mức kiểm thử
- cấu hình bật / tắt tính năng theo giai đoạn (bám TL17, TL24)
- cấu hình thời gian sống phiên đăng nhập mức kiểm thử
- cấu hình ngưỡng cảnh báo mô phỏng để dễ kích hoạt trong diễn tập

### Dữ liệu nội dung hiển thị cơ bản
- nội dung song ngữ cho:
  - thông báo lỗi phổ biến
  - cảnh báo xác nhận thao tác nhạy cảm
  - điều khoản / chính sách nội bộ bản mẫu (không dùng bản phát hành thật)

## 7.3 Bộ dữ liệu đề xuất

- `DL-NEN-NHO-001`: bộ nền tối thiểu cho kiểm thử đơn vị / tích hợp
- `DL-NEN-CHUAN-001`: bộ nền chuẩn cho kiểm thử liên thông
- `DL-NEN-DIEN-TAP-001`: bộ nền có ngưỡng cảnh báo thấp để diễn tập dễ kích hoạt

---

## 8. Bộ dữ liệu người dùng, vai trò và phân quyền

## 8.1 Mục tiêu

Kiểm thử xác thực, phân quyền, thao tác theo vai trò bám TL03, TL19, TL20.

## 8.2 Nhóm người dùng mẫu bắt buộc

### Nhóm vai trò chính
- **R10** người mua traffic
- **R20** nhà xuất bản
- **R30** vận hành quản trị
- **R40** hỗ trợ / kiểm tra theo quyền hạn được cấp
- tài khoản kỹ thuật nội bộ chỉ dùng cho kiểm thử tích hợp và diễn tập vận hành

### Nhóm trạng thái tài khoản
- hoạt động
- tạm khóa
- chờ kích hoạt (nếu phiên bản đầu có)
- giới hạn một phần quyền
- bị buộc đăng xuất

## 8.3 Trường hợp phân quyền cần có trong dữ liệu

- R30 có quyền duyệt nạp nhưng không có quyền chốt đối soát
- R30 có quyền duyệt rút nhưng không có quyền thay đổi cấu hình nhạy cảm
- R40 có quyền tra cứu nhưng không có quyền duyệt tài chính
- R20 chỉ xem dữ liệu của chính mình
- R10 chỉ thao tác chiến dịch của chính mình
- tài khoản bị khóa không thể đăng nhập nhưng vẫn còn dữ liệu lịch sử

## 8.4 Bộ dữ liệu đề xuất

- `DL-NGUOI-DUNG-QUYEN-NHO-001`: đủ vai trò cơ bản
- `DL-NGUOI-DUNG-QUYEN-CHUAN-001`: gồm nhiều tổ hợp quyền để bắt lỗi lọc dữ liệu
- `DL-NGUOI-DUNG-QUYEN-DIEN-TAP-001`: có tài khoản bị khóa, đăng nhập sai nhiều lần, phiên bị thu hồi để diễn tập hỗ trợ

---

## 9. Bộ dữ liệu ví, sổ cái, nạp tiền thủ công và rút tiền thủ công

## 9.1 Mục tiêu

Hỗ trợ kiểm thử các luồng theo TL08, TL09, TL13:
- tạo yêu cầu
- duyệt / từ chối / hoàn / hoàn thành
- ghi bút toán sổ cái
- kiểm tra cân bằng dữ liệu
- xử lý lỗi và xử lý lặp

## 9.2 Nhóm dữ liệu ví và sổ cái bắt buộc

### Ví mẫu
- ví R10 có số dư 0
- ví R10 có số dư vừa đủ cho một chiến dịch nhỏ
- ví R10 có số dư lớn để chạy nhiều chiến dịch
- ví R20 có doanh thu chờ chốt
- ví R20 có số dư khả dụng cho rút
- ví có số dư khóa tạm để kiểm thử rút đang xử lý

### Bút toán sổ cái mẫu
- nạp thành công
- nạp bị từ chối
- rút yêu cầu (khóa tạm)
- rút hoàn thành
- rút từ chối / hoàn trả
- kết chuyển doanh thu
- điều chỉnh sau chốt (mẫu kiểm thử có kiểm soát)

## 9.3 Bộ dữ liệu nạp tiền thủ công

### Trường hợp cần có
- hóa đơn nạp mới tạo, chưa gửi chứng từ
- đã gửi chứng từ, chờ duyệt
- duyệt thành công
- từ chối do chứng từ không hợp lệ
- từ chối do trùng chứng từ
- yêu cầu sửa bổ sung chứng từ (nếu luồng có)
- xử lý lặp thao tác duyệt trên cùng hóa đơn
- thao tác bởi người không đủ quyền

### Dữ liệu tệp kèm theo (mẫu)
- tệp chứng từ ảnh hợp lệ
- tệp sai loại
- tệp vượt kích thước
- tệp tên chứa ký tự đặc biệt
- tệp bị trùng nội dung mẫu để kiểm thử kiểm tra trùng cơ bản (nếu có áp dụng)

## 9.4 Bộ dữ liệu rút tiền thủ công

### Trường hợp cần có
- yêu cầu rút mới tạo
- yêu cầu rút chờ duyệt
- yêu cầu rút được duyệt và đang xử lý
- yêu cầu rút hoàn thành (có bằng chứng xử lý)
- yêu cầu rút bị từ chối
- yêu cầu rút bị hoàn trả do lỗi xử lý
- yêu cầu rút vượt số dư khả dụng
- yêu cầu rút bị gọi lặp / bấm lặp
- thay đổi trạng thái trái thứ tự (ca lỗi)

### Dữ liệu bằng chứng xử lý rút
- ảnh / tệp mẫu hợp lệ
- dữ liệu siêu mô tả bằng chứng
- tình huống bằng chứng thiếu trường bắt buộc

## 9.5 Bộ dữ liệu đề xuất

- `DL-TAI-CHINH-NHO-001`: ví + sổ cái + nạp/rút cơ bản
- `DL-TAI-CHINH-CHUAN-001`: phủ đủ trạng thái nạp/rút và lỗi phổ biến
- `DL-TAI-CHINH-CHUAN-002`: tập trung kiểm thử xử lý lặp / xung đột / khóa tạm
- `DL-TAI-CHINH-DIEN-TAP-001`: dữ liệu kích hoạt diễn tập sai lệch ví-sổ cái có kiểm soát
- `DL-TAI-CHINH-DIEN-TAP-002`: dữ liệu cho diễn tập yêu cầu rút treo và ứng cứu vận hành

## 9.6 Kiểm tra bắt buộc khi dùng dữ liệu tài chính

Mỗi lần chạy kiểm thử liên quan tài chính phải có bước kiểm tra:

- tổng số dư ví theo loại có khớp logic dữ liệu kỳ vọng
- số dư khả dụng + số dư khóa tạm đúng theo trạng thái rút
- bút toán sổ cái phát sinh đúng số lượng và đúng chiều
- không có bút toán trùng do gọi lặp
- nhật ký kiểm toán có đủ cho thao tác nhạy cảm

---

## 10. Bộ dữ liệu chiến dịch và liên kết rút gọn

## 10.1 Mục tiêu

Hỗ trợ kiểm thử theo TL10, TL11:
- tạo / sửa / duyệt chiến dịch
- quản lý ngân sách theo lượt
- tạo và quản lý liên kết rút gọn
- trạng thái liên kết và hiển thị công khai
- đối chiếu thống kê chiến dịch ↔ sự kiện truy cập ↔ lượt hợp lệ

## 10.2 Dữ liệu chiến dịch mẫu bắt buộc

### Trạng thái chiến dịch
- nháp
- chờ duyệt
- hoạt động
- tạm dừng
- hết ngân sách / đạt giới hạn lượt
- từ chối
- kết thúc

### Trường hợp nghiệp vụ
- chiến dịch ngân sách nhỏ dễ đạt ngưỡng
- chiến dịch đang hoạt động với nhiều liên kết
- chiến dịch có cấu hình nhắm mục tiêu đơn giản (nếu có trong phạm vi)
- chiến dịch bị tạm dừng trong lúc có sự kiện đến
- chiến dịch thay đổi cấu hình hợp lệ
- chiến dịch thay đổi trái trạng thái (ca lỗi)

## 10.3 Dữ liệu liên kết rút gọn mẫu bắt buộc

### Trạng thái liên kết
- hoạt động
- tạm khóa
- hết hiệu lực
- không tồn tại (mã giả)
- liên kết thuộc chiến dịch không hoạt động

### Luồng hiển thị / chuyển hướng
- liên kết hiển thị trang trung gian
- liên kết chuyển hướng trực tiếp (nếu cấu hình cho phép)
- liên kết bị lỗi công khai
- liên kết cần trả trang thông báo bảo trì / tạm khóa

## 10.4 Bộ dữ liệu đề xuất

- `DL-CHIEN-DICH-LIEN-KET-NHO-001`
- `DL-CHIEN-DICH-LIEN-KET-CHUAN-001`
- `DL-CHIEN-DICH-LIEN-KET-CHUAN-002` (nhiều liên kết trên một chiến dịch)
- `DL-CHIEN-DICH-LIEN-KET-DIEN-TAP-001` (chiến dịch tạm dừng, liên kết còn truy cập tới)

---

## 11. Bộ dữ liệu sự kiện truy cập, lượt hợp lệ và chống gian lận

## 11.1 Mục tiêu

Hỗ trợ kiểm thử TL11, TL12, TL16:
- ghi nhận sự kiện từ cổng công khai R01
- chống trùng ngắn hạn
- đánh giá lượt hợp lệ
- gắn cờ rủi ro
- tạo hàng kiểm tra thủ công
- tổng hợp số liệu gần thực

## 11.2 Nhóm sự kiện mẫu bắt buộc

### Nhóm sự kiện hợp lệ
- truy cập đơn lẻ hợp lệ
- chuỗi truy cập hợp lệ theo thời gian phân tán
- truy cập dẫn tới lượt hợp lệ cho chiến dịch đang hoạt động

### Nhóm sự kiện bị loại / bị gắn cờ
- truy cập lặp trong khoảng thời gian ngắn
- truy cập từ liên kết bị khóa
- truy cập vào chiến dịch đã hết ngân sách
- truy cập thiếu dữ liệu bắt buộc (ca lỗi kỹ thuật)
- truy cập gây vượt ngưỡng tần suất
- truy cập mẫu bất thường để gắn cờ kiểm tra thủ công

### Nhóm sự kiện lỗi xử lý nền
- thông điệp sự kiện thiếu trường
- thông điệp sai phiên bản
- sự kiện trùng mã định danh
- sự kiện bị xử lý lại sau lỗi tạm thời

## 11.3 Bộ dữ liệu chống gian lận mức kiểm thử

TL28 không đặc tả thuật toán chống gian lận chi tiết (thuộc TL12), nhưng quy định dữ liệu mẫu phải có đủ để kiểm được:

- ngưỡng tần suất
- chống trùng ngắn hạn
- phân loại “hợp lệ / không hợp lệ / cần kiểm tra”
- luồng chuyển hàng kiểm tra thủ công
- quyết định kiểm tra thủ công làm thay đổi số liệu tạm thời / số liệu chốt (nếu áp dụng theo luồng)

## 11.4 Bộ dữ liệu đề xuất

- `DL-SU-KIEN-LUOT-NHO-001`: dữ liệu sự kiện ít bản ghi, dễ đọc tay
- `DL-SU-KIEN-LUOT-CHUAN-001`: đủ hợp lệ / không hợp lệ / cần kiểm tra
- `DL-SU-KIEN-LUOT-CHUAN-002`: tập trung kiểm thử chống trùng và thử lại tác vụ nền
- `DL-SU-KIEN-LUOT-DIEN-TAP-001`: hàng đợi tăng dần, có sự kiện lỗi định dạng
- `DL-SU-KIEN-LUOT-DIEN-TAP-002`: dữ liệu kích hoạt cảnh báo độ trễ xử lý nền

---

## 12. Bộ dữ liệu đối soát, kết chuyển và điều chỉnh sau chốt

## 12.1 Mục tiêu

Hỗ trợ kiểm thử TL16:
- tạo kỳ đối soát
- tổng hợp dữ liệu kỳ
- chốt đối soát
- kết chuyển doanh thu
- điều chỉnh sau chốt có kiểm soát
- chống chạy trùng
- truy vết biên bản dữ liệu

## 12.2 Dữ liệu bắt buộc cho đối soát

- dữ liệu giao dịch nạp/rút thuộc nhiều kỳ
- dữ liệu lượt hợp lệ và doanh thu thuộc nhiều chiến dịch
- dữ liệu có trường hợp chờ xử lý cuối kỳ
- dữ liệu có trường hợp điều chỉnh sau chốt
- dữ liệu để kiểm thử chạy lại tác vụ đối soát cùng kỳ
- dữ liệu sai lệch có chủ đích để diễn tập điều tra

## 12.3 Kỳ đối soát mẫu tối thiểu

- kỳ chưa chốt
- kỳ chốt thành công
- kỳ chốt lỗi giữa chừng (ca diễn tập)
- kỳ đã kết chuyển
- kỳ có điều chỉnh sau chốt

## 12.4 Bộ dữ liệu đề xuất

- `DL-DOI-SOAT-KET-CHUYEN-NHO-001`
- `DL-DOI-SOAT-KET-CHUYEN-CHUAN-001`
- `DL-DOI-SOAT-KET-CHUYEN-CHUAN-002` (nhiều kỳ liên tiếp)
- `DL-DOI-SOAT-KET-CHUYEN-DIEN-TAP-001` (chạy trùng tác vụ đối soát)
- `DL-DOI-SOAT-KET-CHUYEN-DIEN-TAP-002` (sai lệch kỳ vọng để kiểm tra cảnh báo)

## 12.5 Kiểm tra bắt buộc sau chạy ca đối soát

- trạng thái kỳ đối soát đúng theo TL14
- biên bản dữ liệu / nhật ký tác vụ có mã truy vết
- không tạo bút toán trùng khi chạy lại
- số liệu kết chuyển khớp kỳ vọng dữ liệu mẫu
- nhật ký kiểm toán có đủ cho thao tác chốt và kết chuyển

---

## 13. Bộ dữ liệu cấu hình, nội dung tuân thủ và mã dùng chung

## 13.1 Mục tiêu

Kiểm thử TL17, TL23:
- hiệu lực cấu hình
- khóa mở tính năng theo giai đoạn
- xuất bản nội dung tuân thủ song ngữ
- ghi nhận chấp nhận điều khoản
- thay đổi cấu hình có nhật ký kiểm toán

## 13.2 Dữ liệu cấu hình mẫu cần có

- cấu hình hiệu lực hiện tại
- cấu hình sắp hiệu lực
- cấu hình đã hết hiệu lực
- cấu hình giá trị biên (ngưỡng thấp / cao)
- cấu hình sai định dạng để kiểm thử chặn nhập
- cấu hình mâu thuẫn để kiểm thử xác thực nghiệp vụ

## 13.3 Dữ liệu nội dung tuân thủ mẫu cần có

- nội dung tiếng Việt / tiếng Anh cùng phiên bản
- nội dung khác phiên bản đang chờ xuất bản
- nội dung đã xuất bản và ghi nhận người xuất bản
- dữ liệu chấp nhận điều khoản của người dùng theo thời điểm
- dữ liệu từ chối / chưa chấp nhận để kiểm thử chặn thao tác

## 13.4 Bộ dữ liệu đề xuất

- `DL-CAU-HINH-NOI-DUNG-NHO-001`
- `DL-CAU-HINH-NOI-DUNG-CHUAN-001`
- `DL-CAU-HINH-NOI-DUNG-DIEN-TAP-001` (kích hoạt cảnh báo thay đổi cấu hình sai phạm vi)

---

## 14. Bộ dữ liệu sự cố và dữ liệu diễn tập vận hành

## 14.1 Mục tiêu

Hỗ trợ diễn tập kỹ thuật bám TL18, TL22, TL24:
- phát hiện
- phân loại
- ứng cứu
- khôi phục
- xác nhận sau khôi phục
- ghi biên bản

## 14.2 Nguyên tắc tạo dữ liệu diễn tập

- Có chủ đích rõ ràng, không làm hỏng dữ liệu chuẩn dùng chung
- Mọi dữ liệu phá lệ phải nằm trong bộ dữ liệu diễn tập riêng
- Có tập lệnh khởi tạo và tập lệnh hoàn nguyên / dọn dẹp
- Mô tả chính xác kỳ vọng cảnh báo nào phải xuất hiện
- Mô tả chính xác chỉ số / nhật ký nào dùng để xác nhận thành công diễn tập

## 14.3 Nhóm dữ liệu diễn tập bắt buộc

- dữ liệu hàng đợi tăng cao / tác vụ treo
- dữ liệu sự kiện lỗi định dạng / phiên bản
- dữ liệu sai lệch ví-sổ cái có kiểm soát
- dữ liệu yêu cầu rút treo quá ngưỡng
- dữ liệu đối soát chạy trùng hoặc xung đột khóa
- dữ liệu cho diễn tập quay lui bản phát hành (trước / sau cập nhật cấu trúc dữ liệu)
- dữ liệu kiểm thử khôi phục từ sao lưu (mốc trước sự cố, mốc sau sự cố)

## 14.4 Bộ dữ liệu đề xuất

- `DL-DIEN-TAP-SU-CO-001` hàng đợi sự kiện kẹt
- `DL-DIEN-TAP-SU-CO-002` sai lệch ví-sổ cái cần cảnh báo
- `DL-DIEN-TAP-SU-CO-003` yêu cầu rút treo và can thiệp vận hành
- `DL-DIEN-TAP-SU-CO-004` đối soát chạy trùng
- `DL-DIEN-TAP-SU-CO-005` dữ liệu thử khôi phục và kiểm tra toàn vẹn

---

## 15. Bộ kịch bản kiểm thử liên thông kỹ thuật

## 15.1 Mục tiêu

Bộ kịch bản này phục vụ kiểm thử liên thông nhiều thành phần theo TL21, TL25, TL26:

- giao diện ↔ máy chủ nghiệp vụ
- cổng công khai R01 ↔ hàng đợi ↔ xử lý nền ↔ thống kê
- nạp/rút ↔ ví/sổ cái ↔ đối chiếu
- đối soát ↔ kết chuyển ↔ báo cáo quản trị

## 15.2 Cấu trúc một kịch bản liên thông chuẩn

Mỗi kịch bản phải có:

- mã kịch bản
- mục tiêu
- tài liệu nguồn tham chiếu
- bộ dữ liệu đầu vào
- điều kiện trước khi chạy
- các bước thực hiện
- điểm kiểm tra trong quá trình chạy
- kết quả kỳ vọng
- nhật ký / chỉ số cần kiểm tra
- cách dọn dẹp

## 15.3 Danh mục kịch bản liên thông tối thiểu

### Kịch bản LT-001: Nạp tiền thủ công thành công → cập nhật ví → ghi sổ cái
- dùng dữ liệu `DL-TAI-CHINH-CHUAN-001`
- kiểm tra:
  - trạng thái hóa đơn nạp
  - số dư ví
  - bút toán sổ cái
  - nhật ký kiểm toán duyệt nạp

### Kịch bản LT-002: Rút tiền thủ công → khóa tạm → duyệt → hoàn thành
- dùng dữ liệu `DL-TAI-CHINH-CHUAN-001`
- kiểm tra:
  - số dư khả dụng / khóa tạm
  - bằng chứng xử lý
  - bút toán sổ cái
  - nhật ký kiểm toán

### Kịch bản LT-003: Tạo chiến dịch → duyệt → tạo liên kết → truy cập công khai → ghi nhận sự kiện
- dùng `DL-CHIEN-DICH-LIEN-KET-CHUAN-001` + `DL-SU-KIEN-LUOT-CHUAN-001`
- kiểm tra:
  - trạng thái chiến dịch / liên kết
  - phản hồi cổng công khai
  - thông điệp vào hàng đợi
  - nhật ký R01 có mã truy vết

### Kịch bản LT-004: Sự kiện hợp lệ / không hợp lệ → tổng hợp số liệu gần thực
- dùng `DL-SU-KIEN-LUOT-CHUAN-001`
- kiểm tra:
  - phân loại lượt
  - số liệu tạm thời
  - cờ rủi ro
  - hàng kiểm tra thủ công

### Kịch bản LT-005: Chốt đối soát kỳ → kết chuyển doanh thu → cập nhật số liệu quản trị
- dùng `DL-DOI-SOAT-KET-CHUYEN-CHUAN-001`
- kiểm tra:
  - trạng thái kỳ
  - kết quả kết chuyển
  - chống chạy trùng
  - nhật ký kiểm toán và nhật ký tác vụ nền

### Kịch bản LT-006: Thay đổi cấu hình hiệu lực + xuất bản nội dung tuân thủ
- dùng `DL-CAU-HINH-NOI-DUNG-CHUAN-001`
- kiểm tra:
  - hiệu lực cấu hình
  - nội dung hiển thị song ngữ
  - ghi nhận thay đổi và kiểm toán
  - quyền thao tác của R30 / R40

---

## 16. Bộ kịch bản diễn tập kỹ thuật và ứng cứu sự cố

## 16.1 Mục tiêu

Bộ kịch bản diễn tập phục vụ đội vận hành và đội phát triển phối hợp theo TL22:
- phát hiện sớm
- khoanh vùng đúng
- can thiệp có kiểm soát
- xác minh khôi phục
- ghi biên bản bài học kinh nghiệm

## 16.2 Cấu trúc một kịch bản diễn tập chuẩn

Mỗi kịch bản diễn tập phải có:

- mã diễn tập
- mục tiêu diễn tập
- vai trò tham gia (R30, R40, vận hành kỹ thuật, dev hỗ trợ)
- môi trường áp dụng
- bộ dữ liệu diễn tập
- cách gây tình huống (được phép)
- dấu hiệu nhận biết
- chỉ số / nhật ký / cảnh báo phải kiểm
- bước ứng cứu
- tiêu chí kết thúc
- bước hoàn nguyên
- biểu mẫu ghi biên bản

## 16.3 Danh mục kịch bản diễn tập ưu tiên

### DT-HANG-DOI-001: Hàng đợi sự kiện tăng cao, độ trễ xử lý tăng
- dữ liệu: `DL-DIEN-TAP-SU-CO-001`, `DL-SU-KIEN-LUOT-DIEN-TAP-002`
- mục tiêu:
  - phát hiện cảnh báo độ trễ
  - xác định hàng đợi nào tăng
  - tăng tiến trình xử lý nền hoặc giảm tải có kiểm soát
  - xác nhận số liệu không bị mất / không xử lý trùng

### DT-HANG-DOI-002: Tác vụ nền kẹt do dữ liệu lỗi định dạng
- dữ liệu: `DL-SU-KIEN-LUOT-DIEN-TAP-001`
- mục tiêu:
  - phân loại lỗi dữ liệu / lỗi hạ tầng
  - chuyển tác vụ lỗi sang xử lý thủ công
  - đảm bảo hàng khỏe vẫn chạy

### DT-TAI-CHINH-001: Sai lệch ví và sổ cái có cảnh báo
- dữ liệu: `DL-TAI-CHINH-DIEN-TAP-001`, `DL-DIEN-TAP-SU-CO-002`
- mục tiêu:
  - phát hiện cảnh báo sai lệch
  - khóa thao tác rủi ro (nếu quy trình quy định)
  - đối chiếu và khoanh vùng giao dịch lỗi
  - ghi biên bản điều tra và hoàn nguyên dữ liệu diễn tập

### DT-RUT-TIEN-001: Yêu cầu rút treo quá ngưỡng vận hành
- dữ liệu: `DL-TAI-CHINH-DIEN-TAP-002`, `DL-DIEN-TAP-SU-CO-003`
- mục tiêu:
  - phát hiện danh sách yêu cầu treo
  - phân loại nguyên nhân
  - thao tác thử lại / hủy / chuyển kiểm tra thủ công đúng quyền
  - xác nhận nhật ký kiểm toán đầy đủ

### DT-DOI-SOAT-001: Chạy trùng tác vụ đối soát cùng kỳ
- dữ liệu: `DL-DOI-SOAT-KET-CHUYEN-DIEN-TAP-001`, `DL-DIEN-TAP-SU-CO-004`
- mục tiêu:
  - kiểm tra khóa chống chạy trùng
  - xác nhận không phát sinh bút toán trùng
  - đánh giá nhật ký và cảnh báo

### DT-PHAT-HANH-001: Cập nhật cấu trúc dữ liệu lỗi, cần quay lui
- dữ liệu: bộ dữ liệu môi trường diễn tập phát hành + `DL-DIEN-TAP-SU-CO-005`
- mục tiêu:
  - thực hiện danh sách kiểm tra quay lui theo TL22
  - xác nhận tương thích mã và dữ liệu sau quay lui
  - khôi phục dịch vụ và kiểm thử rút gọn sau quay lui

### DT-KHOI-PHUC-001: Khôi phục từ sao lưu và kiểm tra toàn vẹn
- dữ liệu: `DL-DIEN-TAP-SU-CO-005`
- mục tiêu:
  - khôi phục cơ sở dữ liệu và kho tệp ở môi trường diễn tập
  - kiểm tra dữ liệu tài chính, đối soát, nội dung tuân thủ
  - kiểm tra dịch vụ khởi động lại và chạy được kịch bản liên thông tối thiểu

## 16.4 Tiêu chí đạt cho một buổi diễn tập

- phát hiện đúng tín hiệu trong thời gian cho phép
- xác định đúng phạm vi ảnh hưởng
- thao tác ứng cứu theo đúng quyền và đúng quy trình
- không phát sinh lỗi phụ nghiêm trọng
- xác nhận khôi phục bằng kiểm tra kỹ thuật và kiểm tra nghiệp vụ rút gọn
- có biên bản đầy đủ bài học kinh nghiệm và hành động cải tiến

---

## 17. Bộ dữ liệu phục vụ đào tạo R30, R40 và đội vận hành

## 17.1 Mục tiêu

Cung cấp dữ liệu an toàn để đào tạo thao tác thật trên môi trường đào tạo / kiểm thử chấp nhận, bám TL24 và TL27 (khi ban hành).

## 17.2 Nguyên tắc dữ liệu đào tạo

- Không quá “sạch”; phải có cả trường hợp lỗi để học xử lý
- Dễ hiểu, dễ truy vết bằng mã thực thể mẫu
- Có sẵn danh sách bài tập thao tác theo vai trò
- Sau đào tạo có thể đặt lại dữ liệu nhanh

## 17.3 Nhóm bài tập dữ liệu đào tạo đề xuất

### Cho R30
- duyệt nạp / từ chối nạp
- duyệt rút / từ chối / hoàn trả
- duyệt chiến dịch
- tạm khóa liên kết
- thay đổi cấu hình an toàn (mức không nhạy cảm)
- tra cứu nhật ký thao tác

### Cho R40
- tra cứu yêu cầu nạp, rút, chiến dịch, liên kết
- đọc nhật ký hỗ trợ theo quyền
- xử lý tình huống hỗ trợ cơ bản
- chuyển tiếp sự cố đúng tuyến

### Cho đội vận hành kỹ thuật
- tra cứu hàng đợi
- kiểm tra cảnh báo
- xem nhật ký theo mã truy vết
- thử lại tác vụ nền an toàn
- chạy kiểm tra sau phát hành rút gọn

## 17.4 Bộ dữ liệu đề xuất

- `DL-DAO-TAO-R30-R40-001`
- `DL-DAO-TAO-VAN-HANH-001`

---

## 18. Phiên bản hóa dữ liệu kiểm thử và quy tắc bảo trì

## 18.1 Phiên bản hóa bộ dữ liệu

Mỗi bộ dữ liệu phải có:
- mã bộ dữ liệu
- phiên bản bộ dữ liệu
- ngày cập nhật
- người cập nhật
- lý do cập nhật
- tài liệu bị ảnh hưởng

Ví dụ phiên bản:
- `DL-TAI-CHINH-CHUAN-001 v1.0`
- `DL-TAI-CHINH-CHUAN-001 v1.1` (bổ sung ca xử lý lặp duyệt rút)

## 18.2 Khi nào phải cập nhật dữ liệu mẫu

Bắt buộc cập nhật khi:

- TL13 thay đổi cấu trúc dữ liệu
- TL14 thêm / đổi trạng thái, mã lỗi
- TL15 thay đổi hợp đồng dữ liệu
- TL16 thay đổi luồng xử lý nền / đối soát / kết chuyển
- TL17 thay đổi cấu hình hiệu lực quan trọng
- TL23 thay đổi nội dung hiển thị / điều khoản bắt buộc
- phát hiện bộ dữ liệu không còn phủ đủ lỗi thực tế

## 18.3 Quy tắc không phá vỡ kiểm thử hàng loạt

- Không sửa đè bộ dữ liệu đang dùng rộng nếu chưa tạo phiên bản mới
- Đánh dấu bộ dữ liệu cũ là “không khuyến nghị” trước khi ngừng dùng
- Cập nhật ánh xạ ca kiểm thử tương ứng
- Ghi chú thay đổi để trợ lý lập trình và dev cập nhật mã kiểm thử

---

## 19. Ma trận ánh xạ bộ dữ liệu với ca kiểm thử và tài liệu nguồn

## 19.1 Ma trận ánh xạ tóm tắt

### Nhóm tài chính
- `DL-TAI-CHINH-*` ↔ LT-001, LT-002, DT-TAI-CHINH-001, DT-RUT-TIEN-001 ↔ TL08, TL09, TL13, TL14, TL16, TL18, TL19

### Nhóm chiến dịch / liên kết
- `DL-CHIEN-DICH-LIEN-KET-*` ↔ LT-003, LT-004 ↔ TL10, TL11, TL12, TL14, TL20, TL23

### Nhóm sự kiện / lượt
- `DL-SU-KIEN-LUOT-*` ↔ LT-003, LT-004, DT-HANG-DOI-001, DT-HANG-DOI-002 ↔ TL11, TL12, TL16, TL18, TL25

### Nhóm đối soát / kết chuyển
- `DL-DOI-SOAT-KET-CHUYEN-*` ↔ LT-005, DT-DOI-SOAT-001 ↔ TL13, TL16, TL18, TL22

### Nhóm cấu hình / nội dung
- `DL-CAU-HINH-NOI-DUNG-*` ↔ LT-006 ↔ TL17, TL18, TL19, TL23

### Nhóm diễn tập sự cố
- `DL-DIEN-TAP-SU-CO-*` ↔ DT-* ↔ TL18, TL22, TL24, TL25

## 19.2 Yêu cầu truy vết chi tiết trong triển khai thực tế

Trong kho mã, cần có tệp ánh xạ chi tiết để mỗi kịch bản biết chính xác:
- dùng bộ dữ liệu nào
- chạy ở môi trường nào
- cần tập lệnh khởi tạo / dọn dẹp nào
- kỳ vọng nhật ký / cảnh báo nào

---

## 20. Tiêu chí chấp nhận dữ liệu kiểm thử và kịch bản diễn tập

## 20.1 Tiêu chí chấp nhận bộ dữ liệu

Một bộ dữ liệu được chấp nhận khi:

- đúng cấu trúc và ràng buộc theo TL13
- dùng đúng trạng thái, mã lỗi theo TL14
- không chứa dữ liệu thật
- có tài liệu mô tả đầy đủ
- có cách khởi tạo và dọn dẹp rõ ràng
- có ca kiểm thử áp dụng và kỳ vọng kết quả
- tái tạo được trên môi trường kiểm thử chuẩn

## 20.2 Tiêu chí chấp nhận kịch bản liên thông / diễn tập

Một kịch bản được chấp nhận khi:

- mục tiêu rõ ràng
- bước chạy cụ thể, không mơ hồ
- có dữ liệu đầu vào xác định
- có điểm kiểm tra kỹ thuật (nhật ký, chỉ số, cảnh báo)
- có tiêu chí kết quả đạt / không đạt
- có bước dọn dẹp / hoàn nguyên
- bám vai trò và quyền theo TL03, TL22

## 20.3 Tiêu chí chấp nhận tổng thể TL28

TL28 đạt khi:

- có phân loại đầy đủ các nhóm dữ liệu kiểm thử chính
- có bộ dữ liệu đề xuất cho các luồng lõi (nạp, rút, chiến dịch, liên kết, lượt, đối soát)
- có bộ dữ liệu và kịch bản diễn tập sự cố trọng yếu
- có quy tắc phiên bản hóa và bảo trì dữ liệu kiểm thử
- có ma trận ánh xạ dữ liệu ↔ kịch bản ↔ tài liệu nguồn
- đồng nhất với TL21, TL22, TL24, TL25, TL26

---

## 21. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không thay đổi nghiệp vụ lõi TL08 đến TL12
- [x] Bám cấu trúc dữ liệu và nguyên tắc sổ cái theo TL13
- [x] Bám trạng thái / mã lỗi theo TL14
- [x] Tương thích hợp đồng dữ liệu kiểm thử với TL15
- [x] Bám xử lý nền, đối soát, kết chuyển theo TL16
- [x] Bám cấu hình hiệu lực theo TL17
- [x] Bám nhật ký, cảnh báo, mã truy vết theo TL18
- [x] Bám yêu cầu an toàn dữ liệu kiểm thử theo TL19
- [x] Bám màn hình và nội dung hiển thị theo TL20, TL23
- [x] Hỗ trợ kế hoạch kiểm thử chấp nhận TL21
- [x] Hỗ trợ vận hành, ứng cứu sự cố theo TL22
- [x] Hỗ trợ lộ trình triển khai và bàn giao theo TL24
- [x] Tương thích kiến trúc và tiêu chuẩn mã theo TL25, TL26

---

## 22. Gợi ý tài liệu tiếp theo để khóa nốt vòng hướng dẫn triển khai

Sau TL28, nên ưu tiên một trong hai tài liệu sau tùy mục tiêu triển khai:

### TL27 — Hướng dẫn thao tác theo vai trò cho R30 và R40
Phù hợp nếu sắp đào tạo vận hành / hỗ trợ:
- thao tác theo màn hình
- checklist trước / sau thao tác nhạy cảm
- mẫu phản hồi hỗ trợ bám TL23
- xử lý lỗi thường gặp theo mã lỗi TL14

### TL29 — Quy chuẩn giao diện chi tiết và thư viện thành phần dùng chung
Phù hợp nếu bắt đầu làm giao diện đồng loạt:
- chuẩn lưới, biểu mẫu, bảng, trạng thái hiển thị
- chuẩn hộp thoại xác nhận, cảnh báo, lỗi
- chuẩn song ngữ và hiển thị nội dung tuân thủ

---

## 23. Ghi chú cuối tài liệu

- TL28 là tài liệu cung cấp bộ dữ liệu kiểm thử và kịch bản diễn tập kỹ thuật, dùng để triển khai kiểm thử và vận hành an toàn trước khi dùng dữ liệu thật.
- TL28 phải được bảo trì cùng nhịp với thay đổi của TL13, TL14, TL15, TL16, TL17 và TL22.
- Khi có kết quả kiểm thử và diễn tập thực tế, nên bổ sung phụ lục “lỗi thực tế đã gặp” để tăng độ phủ dữ liệu mẫu và kịch bản diễn tập cho các vòng sau.
