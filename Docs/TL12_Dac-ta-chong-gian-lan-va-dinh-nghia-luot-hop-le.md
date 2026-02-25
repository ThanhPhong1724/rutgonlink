# Tài liệu 12 — Đặc tả chống gian lận và định nghĩa lượt hợp lệ

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL12
- **Tên tài liệu:** Đặc tả chống gian lận và định nghĩa lượt hợp lệ
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL07, TL13, TL14, TL15, TL16, TL18, TL19, TL20, TL21, TL24

---

## 2. Mục tiêu tài liệu

TL12 là tài liệu khóa chuẩn cho toàn bộ khái niệm **lượt hợp lệ**, **lượt bị loại**, **lượt cần kiểm tra thủ công** và quy trình **chống gian lận phòng thủ** dùng chung cho cả hai phía:

- **khối khách hàng mua chiến dịch** (TL10),
- **khối nhà xuất bản và liên kết rút gọn** (TL11),
- **khối chuyển hướng trung gian** (TL11),
- **khối quản trị và hỗ trợ** (TL03).

Mục tiêu chính:

1. Thống nhất một định nghĩa dùng chung để tránh TL10 và TL11 tự hiểu khác nhau về “lượt hợp lệ”.
2. Khóa quy trình đánh giá sự kiện lượt theo nhiều lớp (kiểm tra dữ liệu, kiểm tra trạng thái, giới hạn tần suất, chống trùng, chấm điểm rủi ro, kiểm tra thủ công, đối soát chốt).
3. Chuẩn hóa các lý do loại lượt và lý do đưa vào kiểm tra thủ công ở mức nghiệp vụ.
4. Quy định rõ trách nhiệm của R30 và R40 trong xử lý cảnh báo gian lận.
5. Tạo đầu vào chắc chắn cho:
   - TL13 (mô hình dữ liệu chi tiết),
   - TL14 (mã trạng thái và mã lỗi chuẩn),
   - TL15 (giao diện lập trình),
   - TL16 (ghi nhận sự kiện và tổng hợp thống kê),
   - TL20 (an toàn kỹ thuật và vận hành).

> TL12 chỉ mô tả **chống gian lận ở góc độ phòng thủ của nền tảng** để bảo vệ số liệu, doanh thu và chi tiêu. Tài liệu này không mô tả hoặc hỗ trợ các cơ chế nhằm né phát hiện của nền tảng bên thứ ba.

---

## 3. Phạm vi của TL12

### 3.1 Trong phạm vi

- Định nghĩa nghiệp vụ chuẩn của lượt hợp lệ cho nền tảng.
- Quy trình đánh giá sự kiện lượt nhiều lớp.
- Trạng thái sự kiện lượt và quy tắc chuyển trạng thái (dùng bộ tên đã khóa ở TL02).
- Quy tắc giới hạn tần suất ở mức nghiệp vụ.
- Quy tắc chống đếm trùng ở mức nghiệp vụ.
- Khung chấm điểm rủi ro và ngưỡng quyết định ở mức nghiệp vụ.
- Danh sách chặn và quy tắc áp dụng.
- Tiêu chí đưa sự kiện vào hàng kiểm tra thủ công.
- Quy trình duyệt lại gian lận bởi R30 và vai trò hỗ trợ của R40.
- Nguyên tắc chốt số liệu cuối kỳ (từ tạm thời sang đã chốt).
- Nhật ký, truy vết và báo cáo tối thiểu cho chống gian lận.

### 3.2 Ngoài phạm vi

- Thiết kế thuật toán chấm điểm rủi ro chi tiết cấp mô hình hoặc học máy.
- Mô tả chi tiết hạ tầng chống tấn công mạng, cân bằng tải, tường lửa lớp mạng (thuộc TL20).
- Đặc tả cấp cột đầy đủ của toàn bộ bảng dữ liệu (thuộc TL13).
- Đặc tả chi tiết giao diện màn hình chống gian lận (thuộc TL06, TL07).
- Mã lỗi chi tiết và quy ước mã hóa chuẩn hệ thống (thuộc TL14).
- Hướng dẫn thao túng nền tảng tìm kiếm hoặc vượt xác minh của bên thứ ba.

---

## 4. Truy vết sang tài liệu trước để đảm bảo nhất quán

## 4.1 Truy vết chức năng nghiệp vụ từ TL02

TL12 chi tiết hóa hoặc khóa quy tắc dùng chung cho các chức năng sau:

- **NV20** — Ghi nhận sự kiện truy cập liên kết
- **NV21** — Phân loại lượt hợp lệ hoặc bị loại
- **NV22** — Tính doanh thu cho nhà xuất bản theo lượt hợp lệ
- **NV23** — Đối soát doanh thu nhà xuất bản
- **NV29** — Ghi nhận lượt cho chiến dịch
- **NV30** — Trừ tiền theo lượt hợp lệ
- **NV31** — Theo dõi thống kê chiến dịch và chi tiêu
- **NV38** — Theo dõi cảnh báo gian lận
- **NV39** — Nhật ký quản trị
- **NV41** — Xử lý truy cập liên kết ngắn
- **NV42** — Xác minh truy cập hợp lệ chống máy tự động
- **NV43** — Chuyển hướng đến liên kết đích hoặc dự phòng

## 4.2 Truy vết trạng thái chuẩn từ TL02 mục 13.6

TL12 sử dụng đúng bộ **trạng thái sự kiện lượt** đã khóa ở TL02:

- mới ghi nhận
- đang đánh giá
- hợp lệ tạm thời
- bị loại tạm thời
- hợp lệ đã chốt
- bị loại đã chốt
- cần kiểm tra thủ công

TL12 không đổi tên trạng thái. Mọi chuẩn hóa mã hiển thị sẽ thực hiện ở TL14.

## 4.3 Truy vết phân quyền từ TL03

TL12 tuân thủ các ràng buộc phân quyền sau:

- **R01**: chỉ tương tác với trang chuyển hướng và xác minh, không thấy logic nội bộ chống gian lận.
- **R10**: xem số liệu chiến dịch và lý do loại lượt ở mức hiển thị phù hợp, không được sửa quyết định gian lận.
- **R20**: xem số liệu liên kết và lý do loại lượt ở mức hiển thị phù hợp, không được sửa quyết định gian lận.
- **R30**: xem cảnh báo gian lận, quyết định duyệt lại, đánh dấu gian lận, cập nhật danh sách chặn theo thẩm quyền.
- **R40**: tra cứu, hỗ trợ, tiếp nhận báo lỗi, xem dữ liệu che bớt; không có quyền quyết định cuối về gian lận nếu chưa có ủy quyền riêng.

## 4.4 Truy vết khái niệm từ TL10 và TL11

TL12 khóa thống nhất các khái niệm mà TL10 và TL11 cùng sử dụng:

- sự kiện lượt
- lượt hợp lệ tạm thời
- lượt bị loại tạm thời
- số liệu đã chốt
- điều chỉnh sau đối soát
- chống đếm trùng
- hàng kiểm tra thủ công

---

## 5. Nguyên tắc chống gian lận áp dụng toàn nền tảng

## 5.1 Nguyên tắc tổng quát

1. **Phòng thủ để bảo vệ số liệu và tiền**
   - Chống gian lận nhằm bảo vệ chi tiêu khách hàng mua chiến dịch, doanh thu nhà xuất bản và độ tin cậy báo cáo.

2. **Đánh giá theo nhiều lớp**
   - Không dựa vào một tín hiệu đơn lẻ.
   - Quyết định phải tổng hợp từ dữ liệu cấu trúc, trạng thái thực thể, tần suất, trùng lặp, rủi ro.

3. **Ưu tiên truy vết và giải thích được**
   - Mỗi quyết định loại hoặc đưa vào kiểm tra thủ công phải lưu được lý do chính.

4. **Tách quyết định tạm thời và quyết định chốt**
   - Số liệu hiển thị thời gian gần thực có thể là tạm thời.
   - Số liệu tài chính cuối cùng dựa trên trạng thái đã chốt.

5. **Không sửa tay trực tiếp vào số liệu kết quả**
   - Điều chỉnh phải thông qua quy trình duyệt lại/đối soát và có nhật ký.

6. **Mặc định bảo thủ khi dữ liệu thiếu**
   - Nếu thiếu trường bắt buộc hoặc không đủ điều kiện đánh giá, không được coi là lượt hợp lệ.

## 5.2 Nguyên tắc minh bạch với người dùng

- R10 và R20 được xem thống kê:
  - số lượt hợp lệ,
  - số lượt bị loại,
  - nhóm lý do loại phổ biến,
  - số lượt đang chờ kiểm tra hoặc chưa chốt (nếu có).
- Không hiển thị chi tiết nội bộ có thể làm lộ ngưỡng rủi ro hoặc luật chống gian lận nhạy cảm.

## 5.3 Nguyên tắc thay đổi chính sách chống gian lận

- Quy tắc chống gian lận phải có **phiên bản hiệu lực**.
- Khi đổi ngưỡng hoặc thêm luật:
  - lưu thời điểm hiệu lực,
  - không hồi tố tùy tiện lên dữ liệu đã chốt nếu không có quyết định quản trị theo quy trình.
- Mọi thay đổi cấu hình chống gian lận là thao tác nhạy cảm, bắt buộc nhật ký quản trị (NV39).

---

## 6. Thuật ngữ và định nghĩa chuẩn trong TL12

## 6.1 Thuật ngữ cốt lõi

### Sự kiện lượt
Bản ghi đại diện cho một lần truy cập hoặc tương tác được hệ thống ghi nhận từ khối chuyển hướng hoặc nguồn ghi nhận chiến dịch, dùng làm đơn vị đánh giá hợp lệ/bị loại.

### Lượt hợp lệ tạm thời
Sự kiện lượt vượt qua các kiểm tra tức thời và được tạm ghi nhận vào số liệu theo dõi trước khi đối soát cuối kỳ.

### Lượt bị loại tạm thời
Sự kiện lượt bị loại trong đánh giá tức thời, nhưng vẫn có thể được duyệt lại hoặc điều chỉnh trong quy trình kiểm tra thủ công/đối soát theo thẩm quyền.

### Lượt hợp lệ đã chốt
Sự kiện lượt đã qua đối soát kỳ và được chốt để dùng cho:
- tính doanh thu đã chốt (TL11),
- tính chi tiêu đã chốt và điều chỉnh bút toán (TL10 nếu áp dụng chốt cuối kỳ),
- báo cáo tài chính và đối soát.

### Lượt bị loại đã chốt
Sự kiện lượt bị xác nhận loại sau khi hoàn tất quy trình đánh giá và đối soát, không được dùng để tính doanh thu/chi tiêu hợp lệ.

### Cần kiểm tra thủ công
Trạng thái dành cho sự kiện có dấu hiệu chưa đủ rõ để tự động kết luận hợp lệ hoặc bị loại ở thời điểm đó.

## 6.2 Thuật ngữ về rủi ro và kiểm soát

### Điểm rủi ro
Giá trị tổng hợp do hệ thống tính từ nhiều tín hiệu để hỗ trợ quyết định tự động hoặc đưa vào kiểm tra thủ công.

### Dấu vết thiết bị
Chuỗi nhận diện phục vụ chống gian lận ở mức nghiệp vụ, dùng để phát hiện mẫu lặp, tần suất bất thường, hoặc liên hệ giữa các sự kiện. Cách tạo cụ thể sẽ chi tiết ở TL20.

### Cửa sổ chống trùng
Khoảng thời gian và điều kiện so khớp dùng để phát hiện sự kiện lặp hoặc gần trùng.

### Giới hạn tần suất
Ngưỡng tối đa cho phép của sự kiện trong một khoảng thời gian xác định theo một tiêu chí (địa chỉ mạng băm, dấu vết thiết bị, liên kết, chiến dịch...).

### Danh sách chặn
Danh sách các thực thể hoặc dấu hiệu bị hạn chế/loại trừ theo chính sách chống gian lận (ví dụ dấu vết thiết bị, nguồn giới thiệu, mẫu địa chỉ mạng), có thời hạn hiệu lực và nhật ký thay đổi.

---

## 7. Tác nhân tham gia quy trình chống gian lận

- **R01** — Khách truy cập liên kết ngắn (nguồn phát sinh sự kiện, không tham gia quyết định nội bộ)
- **R10** — Khách hàng mua chiến dịch (xem kết quả và khiếu nại nếu có kênh hỗ trợ)
- **R20** — Nhà xuất bản (xem kết quả, doanh thu và khiếu nại nếu có)
- **R30** — Quản trị viên (quyết định cuối cho xử lý gian lận và cấu hình chính sách)
- **R40** — Nhân viên hỗ trợ (tra cứu, gom thông tin, tiếp nhận báo lỗi, chuyển xử lý lên R30)
- **Dịch vụ xử lý sự kiện nền** (ghi nhận, đánh giá, phân loại, đối soát; thuộc phạm vi hệ thống nội bộ P6 theo TL03)

---

## 8. Dữ liệu đầu vào tối thiểu cho đánh giá một sự kiện lượt

TL13 sẽ chốt cột cụ thể. TL12 khóa **nhóm dữ liệu tối thiểu** bắt buộc phải có để đánh giá:

## 8.1 Nhóm nhận diện và truy vết

- mã sự kiện
- thời điểm ghi nhận
- nguồn ghi nhận (liên kết / chiến dịch / khối chuyển hướng)
- mã thực thể liên quan (mã liên kết, mã chiến dịch hoặc cả hai nếu có liên kết)
- khóa chống xử lý trùng ở mức giao diện lập trình hoặc hàng đợi

## 8.2 Nhóm tín hiệu truy cập

- địa chỉ mạng dạng băm hoặc chuẩn hóa theo chính sách bảo mật
- dấu vết thiết bị
- trình duyệt
- hệ điều hành
- quốc gia (nếu xác định được)
- nguồn giới thiệu (nếu có)
- thông tin xác minh người dùng thật (thành công/thất bại/không áp dụng)
- thời lượng hoặc tín hiệu hoàn tất bước tối thiểu (nếu có trong luồng)

## 8.3 Nhóm ngữ cảnh nghiệp vụ

- trạng thái liên kết tại thời điểm đánh giá (nếu áp dụng)
- trạng thái chiến dịch tại thời điểm đánh giá (nếu áp dụng)
- cấu hình nhắm mục tiêu/điều kiện chiến dịch áp dụng (nếu là luồng chiến dịch)
- chính sách chống gian lận phiên bản nào đang hiệu lực
- đơn giá và cấu hình tính tiền liên quan (chỉ để nối dữ liệu, không phải mọi bước đều dùng)

## 8.4 Quy tắc dữ liệu thiếu

- Thiếu trường bắt buộc để xác định thực thể hoặc truy vết => **bị loại tạm thời** hoặc **cần kiểm tra thủ công** tùy cấu hình chính sách.
- Không được tự suy diễn để chuyển thành hợp lệ.
- Phải lưu rõ lý do thiếu dữ liệu để phục vụ rà soát.

---

## 9. Định nghĩa lượt hợp lệ dùng chung cho toàn nền tảng

## 9.1 Điều kiện tối thiểu để một sự kiện có thể được xem là lượt hợp lệ

Một sự kiện lượt chỉ có thể được đánh giá là **hợp lệ** khi đồng thời thỏa các điều kiện tối thiểu sau:

1. **Thực thể liên quan hợp lệ**
   - Liên kết và/hoặc chiến dịch tồn tại và ở trạng thái cho phép ghi nhận theo TL10 và TL11.

2. **Dữ liệu sự kiện đủ tối thiểu**
   - Có đủ trường bắt buộc để đánh giá và truy vết.

3. **Không vi phạm giới hạn tần suất**
   - Không vượt ngưỡng theo quy tắc hiện hành.

4. **Không bị xác định là trùng bất thường**
   - Không bị trùng trong cửa sổ chống trùng theo chính sách.

5. **Vượt qua lớp xác minh người dùng thật khi bắt buộc**
   - Nếu luồng hoặc chính sách yêu cầu xác minh.

6. **Điểm rủi ro không vượt ngưỡng loại tự động**
   - Hoặc được đưa vào kiểm tra thủ công và sau đó được duyệt lại.

7. **Không thuộc danh sách chặn đang hiệu lực**
   - Trừ trường hợp có cơ chế ngoại lệ được R30 duyệt và lưu nhật ký.

## 9.2 Phân biệt theo ngữ cảnh áp dụng

### Đối với luồng liên kết rút gọn (TL11)
- Lượt hợp lệ là đầu vào để tính **doanh thu nhà xuất bản**.
- Có thể hiển thị tạm thời trước khi chốt đối soát.

### Đối với luồng chiến dịch (TL10)
- Lượt hợp lệ là đầu vào để **trừ tiền theo lượt** và thống kê chiến dịch.
- Cần liên kết chặt với bút toán hoặc bản ghi chi tiêu để tránh đếm trùng/trừ trùng.

## 9.3 Không đồng nhất “truy cập” với “lượt hợp lệ”

- Mỗi truy cập tới mã ngắn có thể tạo ra **sự kiện lượt**.
- Không phải mọi sự kiện đều là **lượt hợp lệ**.
- Báo cáo phải tách rõ:
  - tổng sự kiện,
  - hợp lệ tạm thời,
  - bị loại tạm thời,
  - cần kiểm tra thủ công,
  - hợp lệ đã chốt,
  - bị loại đã chốt.

---

## 10. Trạng thái sự kiện lượt và quy tắc chuyển trạng thái

## 10.1 Danh sách trạng thái sử dụng (khóa theo TL02)

- mới ghi nhận
- đang đánh giá
- hợp lệ tạm thời
- bị loại tạm thời
- hợp lệ đã chốt
- bị loại đã chốt
- cần kiểm tra thủ công

## 10.2 Ý nghĩa từng trạng thái trong TL12

### mới ghi nhận
Sự kiện vừa được tạo, chưa đi qua đầy đủ các bước đánh giá.

### đang đánh giá
Sự kiện đang được dịch vụ nền xử lý qua các luật và chấm điểm rủi ro.

### hợp lệ tạm thời
Sự kiện đạt điều kiện ở thời điểm đánh giá tức thời; được phép tham gia thống kê tạm thời và các bước nghiệp vụ tương ứng.

### bị loại tạm thời
Sự kiện bị loại ở bước đánh giá tức thời; chưa phải quyết định cuối nếu còn luồng kiểm tra thủ công hoặc đối soát.

### cần kiểm tra thủ công
Sự kiện có dấu hiệu bất thường hoặc xung đột tín hiệu; chưa thể kết luận tự động một cách an toàn.

### hợp lệ đã chốt
Quyết định hợp lệ đã hoàn tất sau đối soát/kỳ chốt; dùng làm nguồn dữ liệu chuẩn cho báo cáo tài chính.

### bị loại đã chốt
Quyết định loại đã được chốt cuối cùng sau quy trình đánh giá/duyệt lại/đối soát.

## 10.3 Ma trận chuyển trạng thái chuẩn

| Trạng thái hiện tại | Trạng thái tiếp theo hợp lệ | Tác nhân chính | Ghi chú |
|---|---|---|---|
| mới ghi nhận | đang đánh giá | hệ thống | Bắt đầu xử lý |
| đang đánh giá | hợp lệ tạm thời | hệ thống | Đạt điều kiện tức thời |
| đang đánh giá | bị loại tạm thời | hệ thống | Loại tự động theo luật/ngưỡng |
| đang đánh giá | cần kiểm tra thủ công | hệ thống | Tín hiệu xung đột hoặc rủi ro trung gian |
| cần kiểm tra thủ công | hợp lệ tạm thời | R30 hoặc hệ thống theo quy tắc duyệt lại | Bắt buộc có lý do |
| cần kiểm tra thủ công | bị loại tạm thời | R30 hoặc hệ thống theo quy tắc duyệt lại | Bắt buộc có lý do |
| hợp lệ tạm thời | hợp lệ đã chốt | hệ thống đối soát | Chốt kỳ |
| hợp lệ tạm thời | bị loại đã chốt | hệ thống đối soát hoặc R30 theo quy trình | Có điều chỉnh hậu kiểm |
| bị loại tạm thời | bị loại đã chốt | hệ thống đối soát | Chốt kỳ |
| bị loại tạm thời | hợp lệ đã chốt | R30/hệ thống duyệt lại + đối soát | Trường hợp sửa loại nhầm |
| cần kiểm tra thủ công | bị loại đã chốt | R30 + đối soát | Nếu chốt trực tiếp theo quy trình kỳ |
| cần kiểm tra thủ công | hợp lệ đã chốt | R30 + đối soát | Nếu chốt trực tiếp theo quy trình kỳ |

## 10.4 Quy tắc chuyển trạng thái bắt buộc

1. Không nhảy trực tiếp từ **mới ghi nhận** sang **hợp lệ đã chốt**.
2. Không cho người dùng R10/R20 tự đổi trạng thái sự kiện.
3. Mọi chuyển trạng thái do R30 phải có:
   - lý do,
   - người thao tác,
   - thời điểm,
   - trạng thái trước/sau.
4. Chỉ quy trình đối soát mới được tạo trạng thái “đã chốt” trong luồng chuẩn, trừ trường hợp có chính sách rút gọn được ban hành riêng và cập nhật TL12.

---

## 11. Quy trình đánh giá sự kiện lượt nhiều lớp (luồng chuẩn)

## 11.1 Tổng quan luồng chuẩn

Mỗi sự kiện lượt được đánh giá theo thứ tự lớp sau (có thể tách thành nhiều dịch vụ nền nhưng phải giữ logic nghiệp vụ):

1. tiếp nhận và tạo bản ghi sự kiện,
2. kiểm tra dữ liệu bắt buộc,
3. kiểm tra trạng thái thực thể nghiệp vụ,
4. kiểm tra xác minh người dùng thật (nếu áp dụng),
5. kiểm tra giới hạn tần suất,
6. kiểm tra trùng lặp bất thường,
7. chấm điểm rủi ro,
8. ra quyết định tạm thời,
9. đưa vào hàng kiểm tra thủ công nếu cần,
10. chốt cuối kỳ trong đối soát.

## 11.2 Bước 1 — Tiếp nhận sự kiện và tạo khóa chống xử lý trùng

- Hệ thống tạo **mã sự kiện** duy nhất.
- Gắn **khóa xử lý trùng** ở mức hệ thống/hàng đợi.
- Đưa sự kiện vào trạng thái **mới ghi nhận**.
- Ghi nhật ký hệ thống tối thiểu.

### Điều kiện loại ngay ở bước này
- bản ghi hoàn toàn lỗi định dạng không thể lưu tối thiểu,
- mã liên kết/mã chiến dịch không xác định được và không có cơ chế truy hồi.

## 11.3 Bước 2 — Kiểm tra dữ liệu bắt buộc

Hệ thống kiểm tra nhóm dữ liệu tối thiểu theo mục 8.

Kết quả:

- đủ dữ liệu => chuyển **đang đánh giá**
- thiếu dữ liệu nhẹ nhưng có thể kiểm tra thủ công => **cần kiểm tra thủ công**
- thiếu dữ liệu nghiêm trọng => **bị loại tạm thời**

## 11.4 Bước 3 — Kiểm tra trạng thái thực thể nghiệp vụ

Hệ thống kiểm tra trạng thái tại thời điểm đánh giá:

- liên kết (TL11)
- chiến dịch (TL10)
- cấu hình hệ thống liên quan

Ví dụ các trường hợp thường bị loại:
- liên kết tạm khóa/hết hạn/lỗi
- chiến dịch đã hủy/hết ngân sách/lỗi cấu hình (tùy loại sự kiện)
- tài khoản liên quan bị khóa theo chính sách ngăn ghi nhận

## 11.5 Bước 4 — Kiểm tra xác minh người dùng thật (nếu áp dụng)

- Nếu chính sách yêu cầu xác minh tại trang chuyển hướng:
  - thất bại xác minh => **bị loại tạm thời**
  - chưa có kết quả nhưng có thể chờ => **cần kiểm tra thủ công** hoặc giữ ở **đang đánh giá** trong thời gian ngắn theo thiết kế kỹ thuật
  - thành công => tiếp tục bước sau
- Nếu luồng không yêu cầu xác minh => tiếp tục bước sau.

> TL12 chỉ chốt logic nghiệp vụ “có/không/đạt/không đạt”. Chi tiết công cụ, cấu hình tích hợp, chống lạm dụng tầng kỹ thuật sẽ nằm ở TL20.

## 11.6 Bước 5 — Kiểm tra giới hạn tần suất

Hệ thống kiểm tra các ngưỡng tần suất theo chính sách hiệu lực (mục 12).

Kết quả:
- không vượt ngưỡng => tiếp tục
- vượt ngưỡng mức chắc chắn => **bị loại tạm thời**
- vượt ngưỡng mức nghi ngờ cần xem thêm => **cần kiểm tra thủ công**

## 11.7 Bước 6 — Kiểm tra trùng lặp bất thường

Hệ thống so khớp theo cửa sổ chống trùng (mục 13):

- trùng chắc chắn => **bị loại tạm thời**
- gần trùng, tín hiệu xung đột => **cần kiểm tra thủ công**
- không trùng => tiếp tục

## 11.8 Bước 7 — Chấm điểm rủi ro

Hệ thống tính điểm rủi ro tổng hợp từ nhiều nhóm tín hiệu (mục 14) và so với ngưỡng:

- dưới ngưỡng an toàn => có thể **hợp lệ tạm thời**
- giữa hai ngưỡng => **cần kiểm tra thủ công**
- trên ngưỡng loại tự động => **bị loại tạm thời**

## 11.9 Bước 8 — Ra quyết định tạm thời và ghi lý do

Khi ra quyết định tạm thời, hệ thống bắt buộc lưu:

- trạng thái sau đánh giá
- lý do chính
- danh sách lý do phụ (nếu có)
- phiên bản chính sách chống gian lận
- điểm rủi ro (nếu dùng)
- thời điểm đánh giá

## 11.10 Bước 9 — Kiểm tra thủ công (nếu có)

- Hệ thống đưa sự kiện vào hàng kiểm tra thủ công.
- R40 có thể:
  - tra cứu,
  - bổ sung ngữ cảnh hỗ trợ,
  - gắn nhãn hỗ trợ,
  - chuyển cho R30.
- R30 quyết định:
  - chuyển thành **hợp lệ tạm thời**
  - hoặc **bị loại tạm thời**
  - hoặc giữ chờ đến kỳ đối soát nếu chính sách cho phép

## 11.11 Bước 10 — Đối soát và chốt

Theo TL10/TL11 và tài liệu đối soát sau này:

- sự kiện tạm thời được đánh giá lại theo quy tắc kỳ
- chuyển sang trạng thái **đã chốt**
- phát sinh điều chỉnh tài chính liên quan (nếu có) thông qua quy trình riêng, không sửa tay số dư

---

## 12. Quy tắc giới hạn tần suất (ở mức nghiệp vụ)

## 12.1 Mục tiêu

- Giảm lượt lặp bất thường trong thời gian ngắn.
- Bảo vệ doanh thu và chi tiêu khỏi các mẫu truy cập dồn cục.
- Tạo điều kiện cho hệ thống phát hiện và chặn sớm thay vì chỉ đối soát cuối kỳ.

## 12.2 Tiêu chí áp dụng giới hạn tần suất

Chính sách có thể áp dụng trên một hoặc nhiều tiêu chí:

- theo **dấu vết thiết bị**
- theo **địa chỉ mạng băm**
- theo **mã liên kết**
- theo **mã chiến dịch**
- theo **tổ hợp dấu vết thiết bị + liên kết**
- theo **tổ hợp dấu vết thiết bị + chiến dịch**
- theo **tổ hợp địa chỉ mạng băm + khoảng thời gian**

## 12.3 Cửa sổ thời gian áp dụng

Phiên bản đầu nên hỗ trợ cấu hình nhiều cửa sổ (do R30 cấu hình) như:

- cửa sổ ngắn
- cửa sổ trung bình
- cửa sổ ngày

TL12 không chốt con số cụ thể để tránh cứng hóa chính sách, nhưng bắt buộc TL13 và TL15 phải hỗ trợ lưu:

- loại cửa sổ,
- độ dài cửa sổ,
- ngưỡng,
- hành động khi vượt,
- thời điểm hiệu lực.

## 12.4 Hành động khi vượt giới hạn tần suất

- **Loại tạm thời ngay** nếu vượt ngưỡng chắc chắn.
- **Đưa kiểm tra thủ công** nếu vượt ngưỡng cảnh báo nhưng chưa đủ chắc chắn.
- **Nâng điểm rủi ro** như một tín hiệu đầu vào, không loại ngay (tùy chính sách).

## 12.5 Ràng buộc nhất quán

- Một sự kiện không được bị loại nhiều lần bởi nhiều luật rồi ghi đè không có thứ tự.
- Hệ thống phải lưu:
  - luật kích hoạt đầu tiên,
  - danh sách luật kích hoạt,
  - quyết định cuối của bước tần suất.

---

## 13. Quy tắc chống đếm trùng và xử lý sự kiện lặp

## 13.1 Mục tiêu

- Tránh:
  - đếm doanh thu trùng cho nhà xuất bản,
  - trừ tiền trùng cho chiến dịch,
  - chênh lệch số liệu giữa thống kê và tài chính.
- Bảo vệ hệ thống khi hàng đợi gửi lại hoặc dịch vụ xử lý lại sự kiện.

## 13.2 Các lớp chống trùng bắt buộc

### Lớp 1 — Khóa xử lý trùng ở mức tiếp nhận
- Dùng khóa xử lý trùng để tránh xử lý cùng một sự kiện nhiều lần do gửi lại.

### Lớp 2 — So khớp nghiệp vụ trong cửa sổ chống trùng
- So khớp theo tổ hợp tín hiệu (dấu vết thiết bị, liên kết/chiến dịch, thời điểm gần nhau, tín hiệu xác minh, ...).

### Lớp 3 — Khóa duy nhất cho bút toán hoặc doanh thu liên quan sự kiện
- Một sự kiện chỉ được gắn tối đa một bản ghi doanh thu tạm thời hợp lệ và một quyết định chốt tương ứng theo quy tắc.
- Một sự kiện chỉ được tạo một nhánh chi tiêu hợp lệ cho chiến dịch theo quy tắc TL10.

## 13.3 Phân loại trùng lặp

- **Trùng kỹ thuật**: do gửi lại cùng yêu cầu hoặc xử lý lại từ hàng đợi.
- **Trùng hành vi rõ ràng**: cùng dấu vết và mẫu lặp trong khoảng rất ngắn.
- **Gần trùng cần xem xét**: tương tự cao nhưng chưa đủ chắc chắn.

## 13.4 Quyết định chuẩn khi phát hiện trùng

- Trùng kỹ thuật => bỏ qua xử lý lặp, giữ bản ghi gốc là nguồn sự thật.
- Trùng hành vi rõ ràng => **bị loại tạm thời**.
- Gần trùng cần xem xét => **cần kiểm tra thủ công**.

---

## 14. Khung chấm điểm rủi ro và ngưỡng quyết định

## 14.1 Mục tiêu của điểm rủi ro

Điểm rủi ro là công cụ hỗ trợ quyết định nhất quán khi có nhiều tín hiệu, không phải thay thế hoàn toàn các luật cứng.

## 14.2 Nhóm tín hiệu đầu vào tối thiểu

Điểm rủi ro có thể tổng hợp từ các nhóm sau:

1. **Tín hiệu dữ liệu**
   - thiếu trường, bất thường định dạng, mâu thuẫn dữ liệu.

2. **Tín hiệu trạng thái nghiệp vụ**
   - truy cập vào thời điểm thực thể chuyển trạng thái bất thường.

3. **Tín hiệu xác minh**
   - thất bại xác minh, lặp xác minh nhiều lần, mẫu xác minh không ổn định.

4. **Tín hiệu tần suất**
   - vượt ngưỡng ở một hoặc nhiều cửa sổ.

5. **Tín hiệu trùng lặp**
   - trùng kỹ thuật, gần trùng, lặp theo mẫu.

6. **Tín hiệu lịch sử**
   - thực thể từng bị gắn cờ, dấu vết thiết bị có lịch sử rủi ro cao, nguồn giới thiệu rủi ro.

## 14.3 Ngưỡng quyết định chuẩn (mức nghiệp vụ)

Phiên bản đầu nên có ít nhất 3 vùng quyết định:

- **Vùng an toàn** => có thể ra quyết định **hợp lệ tạm thời**
- **Vùng cần xem xét** => **cần kiểm tra thủ công**
- **Vùng rủi ro cao** => **bị loại tạm thời**

R30 được cấu hình ngưỡng, nhưng thay đổi phải:
- có phiên bản chính sách,
- có thời điểm hiệu lực,
- có nhật ký quản trị.

## 14.4 Quy tắc giải thích được

Bất kỳ quyết định dựa trên điểm rủi ro nào cũng phải lưu được tối thiểu:

- điểm rủi ro cuối,
- vùng ngưỡng đã rơi vào,
- nhóm tín hiệu đóng góp chính,
- phiên bản chính sách.

TL14 sẽ chuẩn hóa mã lý do và mã luật.

---

## 15. Danh sách chặn và quy tắc áp dụng

## 15.1 Loại danh sách chặn tối thiểu

Phiên bản đầu nên hỗ trợ các loại sau (dạng cấu hình, không nhất thiết mở giao diện quản trị đầy đủ ngay):

- dấu vết thiết bị
- địa chỉ mạng băm hoặc mẫu
- nguồn giới thiệu hoặc miền giới thiệu
- mã liên kết
- mã tài khoản nhà xuất bản (trong trường hợp khóa rộng theo điều tra)
- mã chiến dịch (trong trường hợp tạm dừng xử lý lượt theo quyết định quản trị)
- tổ hợp điều kiện theo chính sách (nếu hỗ trợ ở phiên bản sau)

## 15.2 Phạm vi hiệu lực

Mỗi mục danh sách chặn phải có tối thiểu:

- loại mục chặn
- giá trị hoặc mẫu
- phạm vi áp dụng (toàn hệ thống / theo nhóm / theo thực thể)
- thời điểm hiệu lực
- thời điểm hết hiệu lực (nếu có)
- lý do tạo
- người tạo / người duyệt
- trạng thái hoạt động

## 15.3 Quy tắc áp dụng trong đánh giá sự kiện

- Nếu sự kiện khớp mục chặn đang hiệu lực:
  - mặc định **bị loại tạm thời** hoặc **cần kiểm tra thủ công** tùy loại mục chặn và chính sách.
- Không được bỏ qua danh sách chặn ở bước chấm điểm rủi ro nếu đã có luật chặn cứng, trừ khi có cơ chế ngoại lệ do R30 duyệt.

## 15.4 Quy tắc gỡ chặn

- Gỡ chặn là thao tác nhạy cảm.
- Bắt buộc lưu:
  - lý do gỡ,
  - người gỡ,
  - thời điểm,
  - mục chặn liên quan,
  - phạm vi ảnh hưởng.
- Không tự động hồi tố toàn bộ sự kiện quá khứ đã chốt nếu chưa có quy trình đối soát bổ sung.

---

## 16. Hàng kiểm tra thủ công và quy trình duyệt lại gian lận

## 16.1 Mục tiêu

Cho phép xử lý các trường hợp không đủ chắc chắn để quyết định tự động, đồng thời giữ dấu vết đầy đủ để tránh quyết định cảm tính.

## 16.2 Tiêu chí tối thiểu đưa vào kiểm tra thủ công

Một sự kiện nên được đưa vào trạng thái **cần kiểm tra thủ công** khi thuộc một trong các nhóm sau:

- điểm rủi ro ở vùng trung gian
- tín hiệu xung đột (ví dụ một số luật cho hợp lệ, một số luật gợi ý loại)
- thiếu dữ liệu nhưng vẫn còn khả năng xác minh bổ sung
- trùng gần nhưng chưa đủ chắc chắn
- bị người dùng báo lỗi/khiếu nại và được mở rà soát theo phiếu hỗ trợ
- nằm trong đợt điều tra theo chiến dịch/nhà xuất bản đang theo dõi

## 16.3 Quy trình xử lý hàng kiểm tra thủ công (luồng chuẩn)

1. Hệ thống tạo hồ sơ hàng kiểm tra gắn với mã sự kiện.
2. R40 tiếp nhận, tra cứu ngữ cảnh, bổ sung ghi chú hỗ trợ.
3. Nếu đủ thông tin hỗ trợ nhưng không có quyền quyết định cuối, R40 chuyển cho R30.
4. R30 xem:
   - dữ liệu sự kiện,
   - lịch sử liên quan,
   - lý do hệ thống gắn cờ,
   - ghi chú hỗ trợ.
5. R30 quyết định:
   - hợp lệ tạm thời,
   - bị loại tạm thời,
   - hoặc giữ chờ đối soát nếu chính sách cho phép.
6. Hệ thống ghi nhật ký quyết định và cập nhật trạng thái.

## 16.4 Quy tắc phân quyền trong kiểm tra thủ công

- **R40**:
  - được xem danh sách và chi tiết trong phạm vi hỗ trợ được cấp,
  - được thêm ghi chú, gắn nhãn hỗ trợ, gán xử lý,
  - không được đổi quyết định cuối sang hợp lệ/bị loại đã chốt.
- **R30**:
  - được quyết định duyệt lại ở mức tạm thời,
  - được kích hoạt điều chỉnh đối soát theo quy trình,
  - phải để lại lý do bắt buộc.
- **R10/R20**:
  - không truy cập hàng kiểm tra thủ công nội bộ.

## 16.5 Ràng buộc thời gian xử lý

TL12 không chốt chỉ tiêu dịch vụ cụ thể, nhưng bắt buộc TL18/TL21 phải định nghĩa:

- mức ưu tiên xử lý,
- thời hạn xử lý mục kiểm tra thủ công,
- cơ chế cảnh báo mục tồn đọng.

---

## 17. Quy tắc chốt số liệu và điều chỉnh sau đối soát

## 17.1 Nguyên tắc chốt cuối kỳ

- Chỉ sau bước đối soát, sự kiện mới chuyển từ trạng thái tạm thời sang **đã chốt**.
- Quyết định chốt là nguồn dữ liệu chuẩn cho:
  - báo cáo đối soát,
  - doanh thu đã chốt nhà xuất bản,
  - điều chỉnh chi tiêu chiến dịch nếu có chênh lệch.

## 17.2 Xử lý sự kiện đến trễ

Sự kiện đến trễ (ghi nhận sau thời điểm kỳ đã chốt sơ bộ) phải được xử lý theo một trong các cách, do chính sách quy định:

- đưa vào kỳ kế tiếp,
- mở điều chỉnh kỳ trước bằng lô điều chỉnh,
- giữ chờ kiểm tra thủ công nếu rủi ro cao.

Dù áp dụng cách nào, hệ thống phải lưu:
- kỳ gốc theo thời điểm sự kiện,
- kỳ xử lý thực tế,
- lý do lệch kỳ.

## 17.3 Điều chỉnh sau chốt và liên hệ với tài chính

- Không sửa trực tiếp số dư hoặc tổng thống kê đã công bố bằng cách cập nhật tay.
- Điều chỉnh phải đi qua:
  - bản ghi điều chỉnh đối soát,
  - bút toán điều chỉnh liên quan (nếu tác động tiền),
  - nhật ký quản trị.
- TL10 và TL11 tiếp tục là tài liệu quy trình nghiệp vụ cho chi tiêu và doanh thu; TL12 chỉ khóa **nguồn quyết định hợp lệ/bị loại** và nguyên tắc chốt.

---

## 18. Lý do loại lượt và lý do gắn cờ tối thiểu cần chuẩn hóa

## 18.1 Nhóm lý do loại lượt tối thiểu (khóa ở mức nghiệp vụ)

Mục này kế thừa và mở rộng nhóm lý do TL11 đã nêu, dùng chung cho cả hai phía:

- không vượt qua xác minh truy cập
- vượt giới hạn tần suất
- truy cập trùng bất thường
- trạng thái liên kết không hợp lệ
- trạng thái chiến dịch không hợp lệ
- dữ liệu sự kiện thiếu trường bắt buộc
- rủi ro cao cần loại
- thuộc danh sách chặn đang hiệu lực
- hết hiệu lực theo đối soát
- lỗi kỹ thuật không đủ điều kiện ghi nhận

## 18.2 Nhóm lý do đưa vào kiểm tra thủ công tối thiểu

- điểm rủi ro ở vùng trung gian
- tín hiệu xung đột giữa các luật
- gần trùng nhưng chưa đủ chắc chắn
- dữ liệu thiếu một phần có thể xác minh bổ sung
- trường hợp khiếu nại cần rà soát
- đợt điều tra theo lô đang mở
- ngoại lệ vận hành do R30 yêu cầu

## 18.3 Ràng buộc hiển thị lý do

- R10 và R20 chỉ thấy **nhóm lý do** hoặc lý do đã chuẩn hóa ở mức phù hợp.
- Không hiển thị:
  - ngưỡng cụ thể,
  - trọng số điểm rủi ro,
  - chi tiết luật nội bộ nhạy cảm.
- TL14 sẽ chốt mã lý do hiển thị và mã lý do nội bộ (nếu tách hai lớp).

---

## 19. Nhật ký, truy vết và báo cáo chống gian lận bắt buộc

## 19.1 Nhật ký hệ thống bắt buộc

Đối với mỗi sự kiện lượt, hệ thống phải lưu tối thiểu:

- mã sự kiện
- thời điểm ghi nhận
- trạng thái trước và sau (nếu đổi)
- bước đánh giá
- quyết định tạm thời
- lý do chính
- phiên bản chính sách chống gian lận
- điểm rủi ro (nếu có)
- dấu vết xử lý trùng hoặc đánh dấu đã xử lý

## 19.2 Nhật ký quản trị bắt buộc (R30)

Mọi thao tác sau phải có nhật ký NV39:

- thay đổi ngưỡng chống gian lận
- thay đổi luật hoặc phiên bản chính sách
- thêm, sửa, gỡ mục trong danh sách chặn
- duyệt lại sự kiện từ hàng kiểm tra thủ công
- kích hoạt lô điều chỉnh liên quan đối soát/gian lận

## 19.3 Nhật ký hỗ trợ (R40)

R40 phải có nhật ký khi:

- mở hồ sơ tra cứu chống gian lận
- thêm ghi chú hỗ trợ
- gán xử lý cho R30
- liên kết hồ sơ hỗ trợ với mã sự kiện hoặc lô sự kiện

## 19.4 Báo cáo tối thiểu cho quản trị

- tổng số sự kiện theo trạng thái
- tỷ lệ hợp lệ tạm thời / bị loại tạm thời
- tỷ lệ chuyển vào kiểm tra thủ công
- tỷ lệ duyệt lại thành hợp lệ / bị loại
- top nhóm lý do loại
- top nguồn hoặc mẫu bị gắn cờ
- chênh lệch trước và sau đối soát
- số điều chỉnh ảnh hưởng tài chính

## 19.5 Báo cáo tối thiểu cho người dùng R10 và R20

- tổng sự kiện
- lượt hợp lệ
- lượt bị loại
- nhóm lý do loại phổ biến
- số liệu tạm thời so với đã chốt (nếu có hiển thị chênh lệch)
- thời điểm cập nhật gần nhất

---

## 20. Yêu cầu đầu vào cho TL13, TL14, TL15, TL16 và TL20

## 20.1 Đầu vào cho TL13 (mô hình dữ liệu)

TL13 bắt buộc mô hình hóa được tối thiểu các nhóm bảng hoặc tương đương:

- sự kiện lượt
- lịch sử chuyển trạng thái sự kiện
- kết quả đánh giá chống gian lận
- cấu hình chính sách chống gian lận (phiên bản, hiệu lực)
- luật tần suất và ngưỡng
- luật chống trùng
- danh sách chặn
- hàng kiểm tra thủ công
- quyết định duyệt lại
- lô đối soát/chốt trạng thái sự kiện
- liên kết tới bản ghi doanh thu/chi tiêu liên quan sự kiện

## 20.2 Đầu vào cho TL14 (mã trạng thái và mã lỗi)

TL14 cần chuẩn hóa:

- mã trạng thái sự kiện lượt (tương ứng 7 trạng thái)
- mã nhóm lý do loại
- mã lý do kiểm tra thủ công
- mã luật chống gian lận
- mã nguồn quyết định (hệ thống / duyệt lại / đối soát)

## 20.3 Đầu vào cho TL15 (giao diện lập trình)

TL15 cần có nhóm giao diện lập trình tối thiểu:

- ghi nhận sự kiện lượt
- lấy kết quả đánh giá sự kiện
- danh sách sự kiện theo bộ lọc cho quản trị/hỗ trợ
- xem chi tiết sự kiện
- thao tác hàng kiểm tra thủ công (gắn ghi chú, gán xử lý)
- duyệt lại sự kiện bởi R30
- quản lý danh sách chặn
- quản lý cấu hình chính sách chống gian lận
- thống kê/cảnh báo gian lận

## 20.4 Đầu vào cho TL16 (ghi nhận sự kiện và tổng hợp thống kê)

TL16 phải bám các nguyên tắc của TL12 về:

- khóa xử lý trùng
- thứ tự bước đánh giá
- trạng thái tạm thời và đã chốt
- cập nhật tổng hợp theo sự kiện
- cơ chế đối soát chốt theo lô

## 20.5 Đầu vào cho TL20 (an toàn kỹ thuật và vận hành)

TL20 cần chi tiết hóa các điểm kỹ thuật hỗ trợ TL12:

- cách tạo và bảo vệ dấu vết thiết bị
- bảo vệ dữ liệu nhạy cảm trong nhật ký
- giới hạn tần suất ở tầng hệ thống và tầng nghiệp vụ
- giám sát bất thường và cảnh báo
- bảo vệ giao diện lập trình chống lạm dụng
- phân tách quyền vận hành đối với cấu hình chống gian lận

---

## 21. Tiêu chí chấp nhận cho TL12

Tài liệu TL12 được xem là đạt khi đồng thời thỏa:

1. Dùng đúng bộ trạng thái sự kiện lượt theo TL02, không đổi tên.
2. Không mâu thuẫn với quy trình chiến dịch trong TL10 và quy trình liên kết/doanh thu trong TL11.
3. Chốt rõ định nghĩa lượt hợp lệ dùng chung cho cả hai phía.
4. Chốt rõ quy trình nhiều lớp: dữ liệu → trạng thái → xác minh → tần suất → trùng → rủi ro → quyết định → kiểm tra thủ công → chốt.
5. Có phân quyền rõ cho R30 và R40 trong xử lý gian lận.
6. Có ràng buộc nhật ký và truy vết đủ làm cơ sở cho TL13/TL15/TL20.
7. Không mô tả nội dung vi phạm phạm vi loại trừ (né phát hiện, thao túng nền tảng bên thứ ba).

---

## 22. Danh sách tự rà soát nhất quán (vòng hiện tại)

### 22.1 Đã rà soát với TL02

- [x] Mã chức năng NV20, NV21, NV22, NV23, NV29, NV30, NV38, NV39, NV41, NV42, NV43 được truy vết đúng
- [x] Bộ trạng thái sự kiện lượt 7 trạng thái giữ nguyên tên
- [x] Không mở rộng phạm vi sang mô tả kỹ thuật chi tiết ngoài TL12

### 22.2 Đã rà soát với TL03

- [x] R30 là vai trò quyết định cuối
- [x] R40 chỉ hỗ trợ tra cứu/ghi chú/chuyển xử lý
- [x] R10 và R20 không có quyền sửa quyết định gian lận
- [x] Thao tác nhạy cảm có nhật ký quản trị

### 22.3 Đã rà soát với TL10 và TL11

- [x] Dùng thống nhất khái niệm sự kiện lượt và lượt hợp lệ
- [x] Tách số liệu tạm thời và số liệu đã chốt
- [x] Có quy tắc chống đếm trùng để tránh trừ tiền trùng/cộng doanh thu trùng
- [x] Có nguyên tắc điều chỉnh sau đối soát nhưng không sửa tay số dư

---

## 23. Đề xuất tài liệu tiếp theo (ưu tiên cao)

**TL13 — Mô hình dữ liệu chi tiết cấp cột và ràng buộc dữ liệu**

Lý do ưu tiên:
- TL08, TL09, TL10, TL11, TL12 đã khóa phần lớn logic nghiệp vụ cốt lõi.
- Làm TL13 ngay giúp tránh lệch dữ liệu khi sang TL15 (giao diện lập trình) và TL16 (ghi nhận sự kiện, tổng hợp thống kê).
- TL13 là điểm then chốt để trợ lý lập trình sinh mô hình dữ liệu, chỉ mục, ràng buộc duy nhất và bảng nhật ký một cách nhất quán.

---

## 24. Kết luận

TL12 đã khóa phần **chống gian lận phòng thủ** và **định nghĩa lượt hợp lệ** ở mức nghiệp vụ đủ sâu để làm nền cho thiết kế dữ liệu, giao diện lập trình và vận hành.

Sau TL12, hệ thống tài liệu đã có bộ lõi nhất quán gồm:
- tài chính nạp/rút thủ công (TL08, TL09),
- chiến dịch tính theo lượt (TL10),
- liên kết rút gọn và doanh thu nhà xuất bản (TL11),
- chống gian lận và tiêu chuẩn lượt hợp lệ (TL12).

Điều này giúp giảm mạnh rủi ro “mỗi tài liệu hiểu một kiểu” trước khi đi vào mô hình dữ liệu và giao diện lập trình.
