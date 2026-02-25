# Tài liệu 16 — Đặc tả ghi nhận sự kiện và tổng hợp thống kê

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL16
- **Tên tài liệu:** Đặc tả ghi nhận sự kiện và tổng hợp thống kê
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL10, TL11, TL12, TL13, TL14, TL15
- **Tài liệu đầu ra phụ thuộc:** TL04, TL05, TL06, TL07, TL17, TL18, TL19, TL20, TL21, TL22, TL23

---

## 2. Ghi chú đồng nhất tên gọi trong bộ tài liệu

Trong **TL01**, TL16 được định nghĩa là **“Đặc tả ghi nhận sự kiện và tổng hợp thống kê”**.  
Trong phần kết của **TL15** có dùng cách gọi rộng hơn là **“kiến trúc kỹ thuật tổng thể và phân rã dịch vụ”**.

Để giữ **nhất quán** và tránh lệch phạm vi:

- **Tên chính thức của TL16** trong bộ tài liệu là: **Đặc tả ghi nhận sự kiện và tổng hợp thống kê**
- TL16 **có bao gồm kiến trúc kỹ thuật cấp hệ thống con** cho lớp ghi nhận sự kiện, hàng đợi xử lý nền, tổng hợp thống kê và đối soát
- TL16 **không thay thế** tài liệu hạ tầng triển khai toàn hệ thống, bảo mật tổng thể, giám sát vận hành tổng thể (thuộc TL17, TL18, TL20)

---

## 3. Mục tiêu tài liệu

TL16 khóa cách hệ thống:

1. **Ghi nhận sự kiện truy cập** từ cổng chuyển hướng và các nguồn liên quan.
2. **Đánh giá sự kiện nhiều lớp** theo nguyên tắc của TL12 để phân loại tạm thời.
3. **Tổng hợp thống kê theo ngày** cho:
   - phía khách hàng mua chiến dịch
   - phía nhà xuất bản
   - phía quản trị
4. **Kết chuyển chi tiêu và doanh thu** theo nguyên tắc:
   - số liệu tạm thời phục vụ hiển thị nhanh
   - số liệu đã chốt phục vụ đối soát và tài chính
5. **Đảm bảo chống xử lý trùng**, chịu được sự kiện đến trễ, và không làm sai lệch số dư.
6. Tạo nền kỹ thuật chắc chắn cho:
   - TL17 cấu hình tham số vận hành
   - TL18 nhật ký, giám sát, cảnh báo
   - TL19 quy trình vận hành và hỗ trợ
   - TL21 kiểm thử chấp nhận
   - TL22 kế hoạch triển khai và nghiệm thu

> TL16 bám chặt các định nghĩa của TL12 về **lượt hợp lệ**, **trạng thái sự kiện lượt**, **lý do loại**, **kiểm tra thủ công**. TL16 không được tự tạo quy tắc phân loại mới trái TL12.

---

## 4. Phạm vi của TL16

### 4.1 Trong phạm vi

- Kiến trúc lớp ghi nhận sự kiện và tổng hợp thống kê
- Luồng dữ liệu sự kiện từ lúc phát sinh đến lúc chốt
- Hàng đợi xử lý nền và các tác vụ xử lý theo lô
- Quy tắc chống xử lý trùng và chống chốt trùng
- Tổng hợp thống kê theo ngày cho chiến dịch, liên kết, người dùng, hệ thống
- Đối soát tạm thời và đối soát cuối kỳ
- Quy tắc dữ liệu đến trễ, xử lý lại, điều chỉnh
- Chỉ tiêu vận hành tối thiểu cho lớp này
- Nhật ký và điểm đo bắt buộc cho giám sát lớp này

### 4.2 Ngoài phạm vi

- Thiết kế giao diện màn hình chi tiết (TL04–TL07)
- Đặc tả giao diện lập trình công khai chi tiết (TL15)
- Chính sách bảo mật tổng thể, kiểm soát truy cập chi tiết toàn hệ thống (TL20)
- Quy trình hỗ trợ khách hàng, xử lý tranh chấp chi tiết (TL19)
- Kế hoạch triển khai môi trường, phát hành, khôi phục sau sự cố ở cấp toàn hệ thống (TL22)

---

## 5. Thuật ngữ và nguyên tắc dùng chung

## 5.1 Thuật ngữ chính trong TL16

- **Sự kiện lượt:** bản ghi mô tả một lần truy cập hoặc tương tác được hệ thống ghi nhận để đánh giá tính hợp lệ
- **Sự kiện thô:** dữ liệu ban đầu vừa ghi nhận, chưa đánh giá đầy đủ
- **Sự kiện đã chuẩn hóa:** sự kiện đã qua bước chuẩn hóa trường dữ liệu
- **Sự kiện tạm thời:** sự kiện đã có quyết định tạm thời
- **Sự kiện đã chốt:** sự kiện đã qua đối soát cuối kỳ hoặc chốt theo quy tắc
- **Tổng hợp theo ngày:** dữ liệu cộng gộp phục vụ báo cáo nhanh theo ngày chốt của hệ thống
- **Bút toán kết chuyển:** bút toán ghi vào sổ cái để phản ánh chi tiêu hoặc doanh thu từ sự kiện đã chốt
- **Dữ liệu đến trễ:** sự kiện phát sinh trước nhưng đến hệ thống sau thời điểm tổng hợp ban đầu

## 5.2 Nguyên tắc đồng nhất bắt buộc

1. **Trạng thái sự kiện lượt** phải dùng đúng bộ mã trong TL14 và đúng ý nghĩa trong TL12.
2. **Trạng thái chiến dịch, liên kết, hóa đơn nạp, yêu cầu rút** không được đặt lại trong TL16; TL16 chỉ tiêu thụ trạng thái từ các tài liệu trước.
3. **Tài chính và số dư** chỉ thay đổi qua **sổ cái** theo nguyên tắc TL08, TL09, TL10, TL11, TL13.
4. **Không sửa tay số liệu tổng hợp** trên giao diện; mọi điều chỉnh phải đi qua tiến trình điều chỉnh có nhật ký.
5. **Tách số liệu hiển thị nhanh và số liệu đã chốt** để tránh sai lệch khi có sự kiện đến trễ hoặc bị gắn cờ lại.

---

## 6. Kiến trúc hệ thống con ghi nhận sự kiện và tổng hợp thống kê

## 6.1 Mục tiêu kiến trúc

Kiến trúc của TL16 phải đạt các mục tiêu sau:

- Ghi nhận sự kiện nhanh, không làm chậm cổng chuyển hướng
- Có khả năng xử lý bất đồng bộ và mở rộng
- Chống xử lý trùng ngay cả khi gửi lại yêu cầu
- Hỗ trợ đánh giá nhiều lớp theo TL12
- Hỗ trợ tổng hợp theo ngày và đối soát cuối kỳ
- Có khả năng xử lý lại theo lô khi thay đổi tham số hoặc phát hiện lỗi

## 6.2 Các thành phần logic chính

### A. Lớp thu nhận sự kiện
- Nhận sự kiện từ cổng chuyển hướng và các nguồn nội bộ
- Kiểm tra tối thiểu dữ liệu đầu vào
- Gắn mã yêu cầu và thời gian máy chủ
- Đưa sự kiện vào hàng đợi ghi nhận

### B. Lớp chuẩn hóa sự kiện
- Chuẩn hóa trường dữ liệu
- Chuẩn hóa quốc gia, thiết bị, trình duyệt, nguồn giới thiệu
- Tạo khóa chống trùng bước đầu
- Ghi bản ghi sự kiện thô và sự kiện chuẩn hóa

### C. Lớp đánh giá tạm thời
- Kiểm tra trạng thái chiến dịch hoặc liên kết
- Kiểm tra dữ liệu bắt buộc
- Kiểm tra tần suất
- Kiểm tra trùng lặp
- Tính điểm rủi ro
- Ra quyết định tạm thời hoặc chuyển kiểm tra thủ công

### D. Lớp tổng hợp thời gian gần thực
- Cập nhật số liệu tạm thời phục vụ bảng điều khiển
- Cập nhật đếm theo chiến dịch, liên kết, ngày, quốc gia, thiết bị
- Không ghi sổ cái tài chính ở lớp này

### E. Lớp chốt và đối soát
- Chốt sự kiện đủ điều kiện
- Kết chuyển chi tiêu chiến dịch
- Kết chuyển doanh thu nhà xuất bản
- Ghi bút toán sổ cái
- Tạo nhật ký đối soát và bảng tổng hợp đã chốt

### F. Lớp điều chỉnh sau chốt
- Xử lý sự kiện đến trễ
- Xử lý quyết định kiểm tra thủ công đến sau
- Xử lý sửa lỗi hệ thống theo quy trình có nhật ký
- Tạo bút toán điều chỉnh, không sửa xóa lịch sử

## 6.3 Sơ đồ luồng tổng quát

1. Cổng chuyển hướng phát sinh sự kiện
2. Lớp thu nhận sự kiện nhận và xếp hàng
3. Lớp chuẩn hóa sự kiện chuẩn hóa và lưu bản ghi
4. Lớp đánh giá tạm thời phân loại theo TL12
5. Lớp tổng hợp gần thực cập nhật báo cáo nhanh
6. Lớp chốt theo lịch thực hiện đối soát và kết chuyển tài chính
7. Lớp điều chỉnh xử lý trường hợp ngoại lệ hoặc dữ liệu đến trễ
8. Bảng điều khiển và báo cáo đọc từ bảng tổng hợp thay vì quét sự kiện thô

---

## 7. Nguồn phát sinh sự kiện và bản đồ sự kiện

## 7.1 Nguồn phát sinh sự kiện trong phạm vi TL16

### Nguồn 1 — Cổng chuyển hướng liên kết ngắn
Nguồn chính tạo sự kiện lượt cho:
- thống kê liên kết rút gọn
- đánh giá lượt hợp lệ
- doanh thu nhà xuất bản
- dữ liệu đầu vào cho đối soát

### Nguồn 2 — Hệ thống chiến dịch tính theo lượt
Nguồn nhận kết quả liên quan chiến dịch để:
- gắn sự kiện với chiến dịch
- ghi nhận lượt hợp lệ phục vụ trừ tiền
- thống kê chiến dịch theo ngày

### Nguồn 3 — Quy trình kiểm tra thủ công chống gian lận
Nguồn cập nhật quyết định thủ công để:
- thay đổi phân loại tạm thời thành đã chốt hoặc bị loại đã chốt
- tạo điều chỉnh thống kê và điều chỉnh bút toán nếu cần

### Nguồn 4 — Tiến trình đối soát theo lịch
Nguồn chốt dữ liệu cuối kỳ:
- kết chuyển doanh thu
- kết chuyển chi tiêu
- đánh dấu sự kiện đã chốt
- ghi nhật ký đối soát

## 7.2 Các loại sự kiện logic cần hỗ trợ

TL16 không tạo bộ mã mới trái TL14. Ở mức logic triển khai, cần hỗ trợ tối thiểu:

- sự kiện truy cập liên kết
- sự kiện xác minh truy cập hoàn tất
- sự kiện chuyển hướng thành công
- sự kiện chuyển hướng lỗi
- sự kiện đánh giá tạm thời hoàn tất
- sự kiện đưa vào kiểm tra thủ công
- sự kiện quyết định kiểm tra thủ công
- sự kiện chốt đối soát
- sự kiện điều chỉnh sau chốt

> Mã loại sự kiện nếu cần lưu riêng phải được quản lý trong danh mục cấu hình và ánh xạ với TL14, không tự phát sinh rời rạc giữa các mô đun.

---

## 8. Đặc tả dữ liệu sự kiện và quy tắc tối thiểu

## 8.1 Trường dữ liệu bắt buộc ở thời điểm ghi nhận

TL16 sử dụng cấu trúc cột chi tiết đã khóa trong TL13. Ở mức xử lý, lớp thu nhận phải đảm bảo có tối thiểu:

- mã định danh yêu cầu
- thời điểm nhận tại máy chủ
- mã liên kết hoặc mã ngắn
- mã chiến dịch nếu đã xác định được
- địa chỉ mạng đã băm hoặc dấu vết theo chuẩn TL13
- dấu vết thiết bị theo chuẩn TL13
- thông tin tác nhân truy cập
- nguồn giới thiệu nếu có
- thông tin quốc gia hoặc thông tin để suy ra quốc gia
- thời lượng hoặc dấu mốc để tính thời lượng
- trạng thái kỹ thuật của tiến trình chuyển hướng
- cờ cho biết có vượt lớp xác minh người dùng hay chưa nếu bật

Nếu thiếu trường bắt buộc, sự kiện vẫn có thể được ghi nhận ở mức kỹ thuật nhưng phải:
- gắn cờ lỗi dữ liệu
- đưa vào nhánh bị loại tạm thời hoặc cần kiểm tra thủ công theo quy tắc TL12
- ghi rõ lý do

## 8.2 Quy tắc chuẩn hóa dữ liệu

- Dùng cùng danh mục mã thiết bị, trình duyệt, ngôn ngữ theo TL14
- Chuẩn hóa thời gian về chuẩn lưu trữ thống nhất của hệ thống
- Chuẩn hóa mã quốc gia về một chuẩn duy nhất
- Tách trường thô và trường chuẩn hóa nếu cần giữ dấu vết
- Mọi bước chuẩn hóa phải có khả năng truy vết khi kiểm tra sự cố

## 8.3 Khóa chống xử lý trùng cho sự kiện

TL16 phải tạo **khóa chống xử lý trùng** ở mức sự kiện để ngăn:
- ghi lặp do gửi lại yêu cầu
- xử lý lặp do hàng đợi chạy lại
- kết chuyển lặp ở lớp chốt

Khóa chống xử lý trùng nên dựa trên tổ hợp ổn định như:
- nguồn sự kiện
- mã liên kết hoặc mã chiến dịch
- mã định danh yêu cầu
- khoảng thời gian chuẩn hóa
- dấu vết thiết bị hoặc dấu vết truy cập

> Công thức chi tiết do đội phát triển chốt trong mã nguồn, nhưng phải thỏa nguyên tắc: **không quá lỏng gây trùng**, **không quá chặt làm gộp nhầm sự kiện hợp lệ**.

---

## 9. Hàng đợi xử lý nền và tác vụ xử lý theo lô

## 9.1 Danh sách hàng đợi tối thiểu

### Hàng đợi 1 — Ghi nhận sự kiện thô
- Nhiệm vụ: nhận sự kiện từ lớp thu nhận và ghi vào kho dữ liệu sự kiện
- Đặc tính: ưu tiên cao, thời gian sống ngắn
- Yêu cầu: chống xử lý trùng, thử lại có giới hạn, ghi nhật ký lỗi

### Hàng đợi 2 — Chuẩn hóa và đánh giá tạm thời
- Nhiệm vụ: chuẩn hóa dữ liệu và phân loại tạm thời theo TL12
- Đặc tính: khối lượng lớn, có thể xử lý song song
- Yêu cầu: khóa bản ghi theo mã sự kiện để tránh đánh giá đồng thời

### Hàng đợi 3 — Tổng hợp gần thực
- Nhiệm vụ: cập nhật bảng tổng hợp hiển thị nhanh
- Đặc tính: ưu tiên trung bình, chấp nhận trễ ngắn
- Yêu cầu: tăng giảm theo bút toán tổng hợp hoặc ghi đè theo khóa ngày

### Hàng đợi 4 — Chốt đối soát cuối kỳ
- Nhiệm vụ: chốt sự kiện, kết chuyển tài chính, đánh dấu đã chốt
- Đặc tính: ưu tiên cao, phải bảo toàn tính đúng đắn
- Yêu cầu: giao dịch dữ liệu chặt chẽ, chống chốt trùng

### Hàng đợi 5 — Điều chỉnh sau chốt
- Nhiệm vụ: xử lý quyết định kiểm tra thủ công đến trễ hoặc sửa lỗi
- Đặc tính: khối lượng thấp, nhạy cảm tài chính
- Yêu cầu: nhật ký đầy đủ, chỉ chạy theo quyền và quy trình vận hành

## 9.2 Quy tắc thử lại và chuyển hàng lỗi

Đối với từng hàng đợi, cần có:

- số lần thử lại tối đa
- thời gian chờ giữa các lần thử
- phân loại lỗi tạm thời và lỗi vĩnh viễn
- hàng lưu lỗi để xử lý thủ công
- nhật ký lý do thất bại cuối cùng

Ví dụ nguyên tắc:
- lỗi kết nối tạm thời: cho thử lại
- lỗi dữ liệu sai cấu trúc: không thử lại vô hạn, chuyển hàng lỗi
- lỗi khóa dữ liệu: thử lại có giới hạn

## 9.3 Quy tắc an toàn khi xử lý lại

Khi chạy lại một tác vụ:
- không được tạo thêm sự kiện mới nếu sự kiện đã tồn tại
- không được cộng dồn thống kê trùng
- không được ghi thêm bút toán tài chính trùng
- phải có cơ chế nhận biết “đã xử lý đến bước nào”

---

## 10. Quy trình đánh giá sự kiện nhiều lớp trong TL16

## 10.1 Bám chuẩn TL12

TL16 **không định nghĩa lại** điều kiện hợp lệ. TL16 chỉ hiện thực hóa quy trình kỹ thuật bám TL12 theo thứ tự nhiều lớp.

## 10.2 Thứ tự lớp đánh giá đề xuất

1. **Kiểm tra tồn tại và trạng thái thực thể**
   - liên kết tồn tại và ở trạng thái cho phép xử lý
   - chiến dịch liên quan ở trạng thái cho phép ghi nhận

2. **Kiểm tra dữ liệu tối thiểu**
   - đủ trường bắt buộc
   - dữ liệu thời gian hợp lệ
   - không sai định dạng nghiêm trọng

3. **Kiểm tra xác minh truy cập**
   - nếu chiến dịch hoặc liên kết bật xác minh, phải có dấu hiệu hoàn tất phù hợp

4. **Kiểm tra giới hạn tần suất**
   - theo địa chỉ mạng băm
   - theo dấu vết thiết bị
   - theo khoảng thời gian cấu hình

5. **Kiểm tra chống trùng**
   - dựa trên khóa chống xử lý trùng
   - đối chiếu bản ghi sự kiện gần nhất

6. **Chấm điểm rủi ro**
   - áp dụng tham số từ TL17
   - đưa ra điểm và cờ rủi ro

7. **Ra quyết định tạm thời**
   - hợp lệ tạm thời
   - bị loại tạm thời
   - cần kiểm tra thủ công

8. **Ghi nhật ký quyết định**
   - lý do chính
   - lớp đánh giá kích hoạt quyết định
   - tham số áp dụng tại thời điểm quyết định

## 10.3 Quy tắc không được làm trong TL16

- Không tự động chuyển “cần kiểm tra thủ công” thành “hợp lệ đã chốt” nếu chưa có tiến trình chốt hoặc quyết định đúng thẩm quyền
- Không ghi sổ cái ở bước đánh giá tạm thời
- Không sửa trực tiếp lịch sử quyết định cũ; chỉ tạo quyết định mới và giữ lịch sử

---

## 11. Tổng hợp thống kê theo ngày

## 11.1 Mục tiêu bảng tổng hợp theo ngày

Bảng tổng hợp theo ngày dùng để:
- tải nhanh cho bảng điều khiển
- hỗ trợ lọc theo chiến dịch, liên kết, quốc gia, thiết bị
- giảm quét bảng sự kiện thô
- tách số liệu tạm thời và đã chốt

## 11.2 Các nhóm bảng tổng hợp tối thiểu

Theo TL13, TL16 cần sử dụng hoặc xây dựng các bảng tổng hợp sau ở mức nghiệp vụ:

### A. Tổng hợp chiến dịch theo ngày
- lượt ghi nhận
- lượt hợp lệ tạm thời
- lượt bị loại tạm thời
- lượt hợp lệ đã chốt
- lượt bị loại đã chốt
- chi tiêu tạm thời
- chi tiêu đã chốt
- phân rã theo quốc gia hoặc thiết bị nếu có bảng phụ

### B. Tổng hợp liên kết theo ngày
- lượt ghi nhận
- lượt hợp lệ tạm thời
- lượt bị loại tạm thời
- lượt hợp lệ đã chốt
- lượt bị loại đã chốt
- doanh thu tạm thời
- doanh thu đã chốt

### C. Tổng hợp người dùng nhà xuất bản theo ngày
- tổng lượt hợp lệ
- tổng doanh thu tạm thời
- tổng doanh thu đã chốt
- tổng điều chỉnh trong kỳ

### D. Tổng hợp hệ thống theo ngày
- tổng số sự kiện
- tổng số sự kiện lỗi dữ liệu
- tổng số sự kiện cần kiểm tra thủ công
- tổng số quyết định thủ công
- tổng số lần chạy đối soát
- tổng số điều chỉnh sau chốt

## 11.3 Quy tắc chốt ngày

Do hệ thống hỗ trợ Việt Nam và quốc tế, TL16 phải chốt rõ:
- **Thời gian lưu trữ:** theo chuẩn lưu trữ thống nhất
- **Ngày tổng hợp mặc định của hệ thống:** theo cấu hình hệ thống
- **Hiển thị cho người dùng:** theo múi giờ người dùng, nhưng có ghi rõ ngày chốt dữ liệu

TL16 không được để giao diện và báo cáo tự suy đoán ngày chốt.

## 11.4 Cập nhật tổng hợp theo hai lớp

### Lớp 1 — Gần thực
- cập nhật liên tục hoặc theo đợt ngắn
- phục vụ hiển thị bảng điều khiển
- chấp nhận điều chỉnh sau

### Lớp 2 — Đã chốt
- cập nhật theo tiến trình đối soát
- dùng cho tài chính, đối soát, tranh chấp
- phải có nhật ký phiên chốt

---

## 12. Đối soát và kết chuyển tài chính từ sự kiện

## 12.1 Nguyên tắc chung

- Chỉ **sự kiện đủ điều kiện chốt** mới được kết chuyển tài chính
- Kết chuyển phải qua **sổ cái** theo TL13
- Mỗi sự kiện được phép tham gia kết chuyển theo đúng số lần quy định
- Mọi điều chỉnh sau chốt phải tạo bút toán điều chỉnh, không sửa số dư trực tiếp

## 12.2 Kết chuyển chi tiêu chiến dịch

Áp dụng cho nửa hệ thống phía khách hàng mua chiến dịch, bám TL10:

- Nguồn đầu vào: sự kiện đã chốt và được xác định là hợp lệ
- Điều kiện:
  - chiến dịch ở trạng thái phù hợp tại thời điểm ghi nhận theo quy tắc TL10
  - sự kiện chưa từng được kết chuyển chi tiêu
- Kết quả:
  - tạo bút toán chi tiêu chiến dịch trong sổ cái
  - cập nhật tổng hợp chi tiêu đã chốt theo ngày
  - đánh dấu cờ đã kết chuyển chi tiêu trên bản ghi sự kiện hoặc bảng đối chiếu

## 12.3 Kết chuyển doanh thu nhà xuất bản

Áp dụng cho nửa hệ thống phía nhà xuất bản, bám TL11:

- Nguồn đầu vào: sự kiện đã chốt và hợp lệ
- Điều kiện:
  - liên kết hoạt động hợp lệ tại thời điểm ghi nhận theo quy tắc TL11
  - sự kiện chưa từng được kết chuyển doanh thu
- Kết quả:
  - tạo bút toán doanh thu vào ví nhà xuất bản
  - cập nhật tổng hợp doanh thu đã chốt theo ngày
  - đánh dấu cờ đã kết chuyển doanh thu

## 12.4 Xử lý sự kiện liên quan cả chi tiêu và doanh thu

Trong một số mô hình triển khai, một sự kiện có thể ảnh hưởng cả:
- chi tiêu phía khách hàng mua
- doanh thu phía nhà xuất bản

TL16 phải tách **hai cờ kết chuyển độc lập**:
- cờ kết chuyển chi tiêu
- cờ kết chuyển doanh thu

Lý do:
- có thể một phía chốt thành công, phía còn lại lỗi tạm thời
- dễ xử lý thử lại từng nhánh
- tránh khóa cứng toàn bộ phiên chốt vì lỗi cục bộ

## 12.5 Chống chốt trùng

Mỗi lần chốt phải có:
- mã phiên chốt
- nhật ký bắt đầu và kết thúc
- số lượng bản ghi dự kiến
- số lượng bản ghi thành công
- số lượng bản ghi bỏ qua do đã chốt
- số lượng bản ghi lỗi

Cần ràng buộc dữ liệu để ngăn:
- cùng sự kiện, cùng loại kết chuyển bị ghi 2 lần
- cùng phiên chốt chạy lại gây cộng trùng

---

## 13. Xử lý sự kiện đến trễ, quyết định đến trễ và điều chỉnh sau chốt

## 13.1 Sự kiện đến trễ

Sự kiện đến trễ là sự kiện có thời điểm phát sinh trước, nhưng được ghi nhận sau khi kỳ hoặc ngày đã tổng hợp.

TL16 phải hỗ trợ một trong hai chiến lược, và cấu hình chiến lược trong TL17:

### Chiến lược A — Điều chỉnh vào ngày phát sinh
- ưu điểm: báo cáo lịch sử sát thực tế phát sinh
- nhược điểm: số liệu ngày cũ có thể thay đổi sau khi đã xem

### Chiến lược B — Điều chỉnh vào ngày xử lý
- ưu điểm: báo cáo ngày đã khóa ít thay đổi
- nhược điểm: lệch với ngày phát sinh thực tế

Khuyến nghị cho phiên bản đầu:
- dùng **chiến lược A** cho bảng đã chốt, nhưng phải ghi **nhật ký điều chỉnh** và hiển thị dấu hiệu có điều chỉnh sau chốt.

## 13.2 Quyết định kiểm tra thủ công đến trễ

Trường hợp phổ biến:
- sự kiện trước đó ở trạng thái “cần kiểm tra thủ công”
- sau đó quản trị hoặc hỗ trợ có thẩm quyền xử lý
- quyết định đến sau khi một số báo cáo tạm thời đã hiển thị

TL16 phải:
- cập nhật trạng thái sự kiện theo TL12 và TL14
- cập nhật tổng hợp tạm thời nếu cần
- nếu đã chốt tài chính sai thì tạo **bút toán điều chỉnh**
- ghi nhật ký quyết định và liên kết đến bản ghi người thao tác

## 13.3 Điều chỉnh do sửa lỗi hệ thống

Mọi điều chỉnh do lỗi kỹ thuật phải:
- có phiếu sự cố hoặc mã tham chiếu vận hành
- do vai trò có thẩm quyền thực hiện
- ghi rõ phạm vi dữ liệu ảnh hưởng
- tạo lịch sử trước và sau
- không xóa cứng dữ liệu sự kiện hoặc bút toán đã ghi

---

## 14. Phân rã tiến trình xử lý nền

## 14.1 Tiến trình đề xuất cho phiên bản đầu

### Tiến trình A — Tiếp nhận sự kiện
- mục tiêu: ghi nhận nhanh, không chặn chuyển hướng
- đặc điểm: nhẹ, ưu tiên cao, ít xử lý logic

### Tiến trình B — Chuẩn hóa và đánh giá tạm thời
- mục tiêu: áp quy tắc TL12, tạo phân loại tạm thời
- đặc điểm: xử lý song song, có khóa chống tranh chấp bản ghi

### Tiến trình C — Tổng hợp gần thực
- mục tiêu: cập nhật bảng điều khiển nhanh
- đặc điểm: xử lý tăng giảm theo gói, chấp nhận trễ ngắn

### Tiến trình D — Chốt và kết chuyển
- mục tiêu: tạo số liệu đã chốt và bút toán tài chính
- đặc điểm: giao dịch dữ liệu chặt chẽ, có mã phiên chốt

### Tiến trình E — Điều chỉnh và xử lý lại
- mục tiêu: xử lý ngoại lệ, dữ liệu đến trễ, quyết định thủ công
- đặc điểm: ưu tiên thấp hơn nhưng yêu cầu nhật ký cao

## 14.2 Lịch chạy tối thiểu

Lịch chạy chi tiết thuộc TL17, nhưng TL16 cần khóa nguyên tắc:

- tiếp nhận sự kiện: liên tục
- chuẩn hóa và đánh giá tạm thời: liên tục hoặc theo nhịp ngắn
- tổng hợp gần thực: theo nhịp ngắn
- chốt và kết chuyển: theo lịch cố định
- điều chỉnh sau chốt: theo sự kiện hoặc theo lịch quét

---

## 15. Yêu cầu hiệu năng và độ tin cậy cho lớp TL16

## 15.1 Mục tiêu chức năng

- Không để cổng chuyển hướng phụ thuộc trực tiếp vào bước chốt dữ liệu
- Lỗi ở lớp tổng hợp không làm mất sự kiện thô
- Có thể xử lý lại từ sự kiện thô khi cần

## 15.2 Mục tiêu độ trễ hiển thị

TL16 không áp số cứng tuyệt đối cho mọi môi trường, nhưng phải có cấu hình mục tiêu và theo dõi:
- độ trễ từ ghi nhận đến phân loại tạm thời
- độ trễ từ phân loại tạm thời đến cập nhật tổng hợp gần thực
- độ trễ từ thời điểm chốt đến hiển thị số liệu đã chốt

Các ngưỡng mục tiêu sẽ cấu hình ở TL17 và giám sát ở TL18.

## 15.3 Mục tiêu độ bền dữ liệu

- Không mất sự kiện khi tiến trình xử lý nền lỗi tạm thời
- Có thể truy vết sự kiện từ lớp hiển thị về bản ghi gốc
- Có cơ chế phát hiện chênh lệch giữa bảng tổng hợp và bảng sự kiện

---

## 16. Nhật ký, giám sát và cảnh báo tối thiểu cho TL16

## 16.1 Nhật ký bắt buộc

### Nhật ký kỹ thuật
- nhận sự kiện
- chuẩn hóa thất bại
- đánh giá thất bại
- lỗi hàng đợi
- lỗi ghi tổng hợp
- lỗi chốt đối soát
- lỗi kết chuyển tài chính

### Nhật ký nghiệp vụ
- quyết định tạm thời của sự kiện
- chuyển sang kiểm tra thủ công
- quyết định kiểm tra thủ công
- phiên chốt đối soát
- điều chỉnh sau chốt

## 16.2 Chỉ số giám sát tối thiểu

- số sự kiện nhận mỗi đơn vị thời gian
- tỷ lệ lỗi ghi nhận
- độ dài hàng đợi theo loại
- tuổi bản ghi lâu nhất chưa xử lý
- tỷ lệ sự kiện cần kiểm tra thủ công
- tỷ lệ hợp lệ tạm thời và bị loại tạm thời
- số lượng kết chuyển thành công và thất bại
- số lượng điều chỉnh sau chốt
- chênh lệch giữa tổng hợp và dữ liệu gốc khi đối chiếu

## 16.3 Cảnh báo tối thiểu

- hàng đợi tăng bất thường
- tiến trình chốt không chạy đúng lịch
- tỷ lệ lỗi đánh giá tăng đột biến
- tỷ lệ sự kiện cần kiểm tra thủ công tăng bất thường
- lỗi kết chuyển tài chính phát sinh
- chênh lệch tổng hợp vượt ngưỡng cấu hình

> Chi tiết ngưỡng cảnh báo và kênh cảnh báo sẽ được khóa trong TL18 và TL17.

---

## 17. Bảo mật và kiểm soát truy cập cho lớp dữ liệu sự kiện

TL20 sẽ đặc tả đầy đủ, nhưng TL16 cần khóa các nguyên tắc tối thiểu:

1. Dữ liệu sự kiện thô chứa dấu vết truy cập phải được bảo vệ theo phân quyền.
2. Vai trò hỗ trợ không được xem toàn bộ dữ liệu nhạy cảm không che.
3. Truy cập bảng sự kiện thô số lượng lớn chỉ dành cho tiến trình nội bộ hoặc vai trò quản trị phù hợp.
4. Mọi thao tác điều chỉnh sau chốt phải có nhật ký người thao tác, thời điểm, lý do.
5. Tệp bằng chứng hoặc nhật ký liên quan sự cố phải liên kết được với mã phiên chốt hoặc mã điều chỉnh.

---

## 18. Ma trận truy vết TL16 với tài liệu trước

## 18.1 Truy vết với TL02

TL16 trực tiếp hiện thực hóa hoặc hỗ trợ các nhóm chức năng:

- **NV16–NV23**: liên kết rút gọn và doanh thu nhà xuất bản
- **NV24–NV31**: chiến dịch tính theo lượt và báo cáo phía khách hàng mua
- **NV41–NV45**: xử lý truy cập liên kết ngắn, xác minh, chuyển hướng, lỗi
- Nhóm báo cáo và quản trị liên quan thống kê, đối soát, cảnh báo

## 18.2 Truy vết với TL03

- **R01**: chỉ xem kết quả thống kê phù hợp vai trò người truy cập công khai ở mức tối thiểu, không truy cập dữ liệu thô
- **R10**: xem thống kê chiến dịch của chính mình
- **R20**: xem thống kê liên kết và doanh thu của chính mình
- **R30**: toàn quyền vận hành đối soát, điều chỉnh, xem dữ liệu thô theo quyền
- **R40**: tra cứu, hỗ trợ, xem dữ liệu đã che, thao tác theo quyền được cấp

## 18.3 Truy vết với TL12

TL16 bắt buộc dùng:
- định nghĩa lượt hợp lệ
- nhóm lý do loại
- nhóm lý do chuyển kiểm tra thủ công
- quy trình quyết định thủ công
- trạng thái sự kiện lượt

## 18.4 Truy vết với TL13

TL16 dùng các nhóm bảng:
- bảng sự kiện lượt
- bảng tổng hợp theo ngày
- bảng doanh thu nhà xuất bản
- bảng sổ cái giao dịch
- bảng cảnh báo gian lận
- bảng nhật ký quản trị và nhật ký hệ thống

## 18.5 Truy vết với TL14

TL16 dùng thống nhất:
- mã trạng thái chiến dịch, liên kết, sự kiện, sổ cái
- mã lỗi lớp ghi nhận và xử lý
- danh mục mã thiết bị, trình duyệt, phương thức, tiền tệ
- mã lý do loại và lý do kiểm tra thủ công

## 18.6 Truy vết với TL15

TL16 là lớp hiện thực kỹ thuật phía sau các nhóm đường dẫn:
- cổng chuyển hướng công khai
- ghi nhận sự kiện nội bộ
- thống kê chiến dịch và liên kết
- báo cáo và đối soát
- quản trị chống gian lận và nhật ký

---

## 19. Tiêu chí chấp nhận cho TL16

TL16 được coi là đủ chất lượng để chuyển sang TL17–TL18–TL21 khi đáp ứng tối thiểu:

1. Có mô tả rõ kiến trúc lớp ghi nhận sự kiện, đánh giá, tổng hợp, chốt, điều chỉnh.
2. Có quy tắc chống xử lý trùng cho:
   - ghi nhận sự kiện
   - tổng hợp
   - kết chuyển tài chính
3. Có phân tách số liệu tạm thời và số liệu đã chốt.
4. Có quy tắc xử lý dữ liệu đến trễ và quyết định thủ công đến trễ.
5. Có nhật ký và chỉ số giám sát tối thiểu cho lớp này.
6. Có truy vết rõ với TL12, TL13, TL14, TL15.
7. Không mâu thuẫn với TL10 và TL11 về quy tắc tính chi tiêu và doanh thu.
8. Không mô tả tính năng vượt rào hoặc thao túng hệ thống tìm kiếm.

---

## 20. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Dùng đúng vai trò R01, R10, R20, R30, R40 theo TL03
- [x] Không đổi tên trạng thái sự kiện lượt trái TL12 và TL14
- [x] Có tách số liệu tạm thời và số liệu đã chốt
- [x] Có chống xử lý trùng ở ba lớp: sự kiện, tổng hợp, kết chuyển
- [x] Có xử lý dữ liệu đến trễ và điều chỉnh sau chốt
- [x] Có yêu cầu nhật ký, giám sát, cảnh báo cho TL18
- [x] Có đầu vào cho TL17, TL19, TL21
- [x] Không thêm chức năng ngoài phạm vi TL16
- [x] Không mô tả hành vi thao túng công cụ tìm kiếm

---

## 21. Đầu vào cho các tài liệu tiếp theo

## 21.1 Đầu vào cho TL17 — Cấu hình hệ thống và tham số vận hành

TL17 cần dùng TL16 để chốt:
- lịch chạy các tiến trình nền
- ngưỡng tần suất
- ngưỡng điểm rủi ro
- ngưỡng cảnh báo chênh lệch tổng hợp
- chiến lược xử lý dữ liệu đến trễ
- ngưỡng độ trễ chấp nhận cho tổng hợp gần thực

## 21.2 Đầu vào cho TL18 — Nhật ký, giám sát và cảnh báo vận hành

TL18 cần dùng TL16 để chốt:
- danh sách nhật ký bắt buộc theo lớp xử lý
- bộ chỉ số giám sát
- điều kiện cảnh báo
- bảng điều khiển vận hành cho hàng đợi và tiến trình chốt
- quy trình xử lý hàng lỗi

## 21.3 Đầu vào cho TL19 — Quy trình vận hành và hỗ trợ khách hàng

TL19 cần dùng TL16 để chốt:
- quy trình kiểm tra chênh lệch số liệu
- quy trình xử lý sự kiện đến trễ ảnh hưởng báo cáo
- quy trình xử lý điều chỉnh sau chốt
- quy trình tra cứu tranh chấp số liệu chiến dịch và doanh thu

## 21.4 Đầu vào cho TL21 — Kế hoạch kiểm thử chấp nhận

TL21 cần dùng TL16 để tạo ca kiểm thử:
- ca chống xử lý trùng
- ca hàng đợi thử lại
- ca dữ liệu đến trễ
- ca quyết định thủ công đến trễ
- ca chốt đối soát và kết chuyển
- ca điều chỉnh sau chốt
- ca chênh lệch tổng hợp và xử lý lại

---

## 22. Kết luận và đề xuất tài liệu ưu tiên tiếp theo

TL16 đã khóa lớp kỹ thuật cốt lõi cho **ghi nhận sự kiện, đánh giá nhiều lớp, tổng hợp thống kê và đối soát kết chuyển** của hệ thống, giữ đồng nhất với:

- TL10 về chi tiêu chiến dịch theo lượt
- TL11 về doanh thu nhà xuất bản theo lượt
- TL12 về định nghĩa lượt hợp lệ và chống gian lận
- TL13 về mô hình dữ liệu
- TL14 về trạng thái, mã lỗi, danh mục mã
- TL15 về giao diện lập trình

### Đề xuất tài liệu ưu tiên tiếp theo

**TL17 — Đặc tả cấu hình hệ thống và tham số vận hành**

Lý do ưu tiên:
- Sau TL16, hệ thống đã có đủ cấu trúc xử lý nhưng chưa khóa tham số vận hành và lịch chạy.
- TL17 sẽ quyết định ngưỡng chống gian lận, lịch chốt, cấu hình thanh toán hiển thị, giá theo lượt, và nhiều tham số ảnh hưởng trực tiếp đến kết quả xử lý trong TL16.
