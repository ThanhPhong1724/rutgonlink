# Tài liệu 10 — Đặc tả quy trình quản lý chiến dịch tính theo lượt

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL10
- **Tên tài liệu:** Đặc tả quy trình quản lý chiến dịch tính theo lượt
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09
- **Tài liệu đầu ra phụ thuộc:** TL04, TL06, TL13, TL14, TL15, TL16, TL18, TL19, TL21

---

## 2. Mục tiêu tài liệu

Tài liệu này đặc tả chi tiết quy trình nghiệp vụ cho **khối khách hàng mua chiến dịch** với mô hình tính tiền **theo lượt hợp lệ**, bao gồm:

- tạo chiến dịch,
- cập nhật cấu hình,
- gửi duyệt,
- duyệt hoặc từ chối,
- chuyển sang sẵn sàng chạy và đang chạy,
- ghi nhận lượt,
- trừ tiền theo lượt hợp lệ,
- tạm dừng hoặc tiếp tục,
- hết ngân sách, hoàn thành, hủy, lỗi cấu hình,
- xử lý ngoại lệ và đối soát số liệu.

Mục tiêu của TL10 là:

1. Khóa chặt vòng đời chiến dịch và quy tắc chuyển trạng thái, tránh mơ hồ giữa các tài liệu sau.
2. Thống nhất cách hiểu giữa đội phát triển, trợ lý lập trình và người vận hành về **lượt hợp lệ**, **trừ tiền**, **ngân sách**, **phiên bản cấu hình**.
3. Đảm bảo nhất quán với:
   - TL02 về mã chức năng và trạng thái chuẩn,
   - TL03 về phân quyền theo trạng thái chiến dịch,
   - TL08 và TL09 về nguyên tắc số dư, sổ cái, nhật ký tài chính.
4. Tạo nền cho:
   - TL04 và TL06 mô tả màn hình,
   - TL13 mô hình dữ liệu chi tiết,
   - TL15 giao diện lập trình,
   - TL16 báo cáo và đối soát.

---

## 3. Phạm vi của TL10

### 3.1 Trong phạm vi

- Quy trình tạo và quản lý chiến dịch tính theo lượt cho **R10**.
- Quy trình duyệt chiến dịch bởi **R30**.
- Vòng đời trạng thái chiến dịch theo TL02 mục 13.5.
- Quy tắc ghi nhận lượt cho chiến dịch và phân loại hợp lệ hoặc bị loại ở mức nghiệp vụ.
- Quy tắc trừ tiền theo lượt hợp lệ và bảo toàn số dư.
- Quy tắc phiên bản cấu hình chiến dịch khi cập nhật.
- Xử lý tạm dừng, tiếp tục, hủy, lỗi cấu hình, hết ngân sách.
- Ngoại lệ nghiệp vụ và xử lý thủ công cấp quản trị.
- Nhật ký, thông báo và dữ liệu đầu vào cho báo cáo.

### 3.2 Ngoài phạm vi

- Đặc tả chi tiết từng màn hình và tương tác giao diện của khối khách hàng mua chiến dịch.
- Đặc tả chi tiết cấp cột cho mọi bảng dữ liệu.
- Đặc tả chi tiết giao diện lập trình, mã lỗi, cấu trúc đầu vào đầu ra.
- Chi tiết thuật toán chấm điểm rủi ro chống gian lận.
- Cơ chế kỹ thuật hạ tầng xử lý sự kiện thời gian thực.
- Mô tả hành vi thao túng nền tảng tìm kiếm hoặc hướng dẫn tác động kết quả tìm kiếm.

---

## 4. Truy vết sang tài liệu trước để đảm bảo nhất quán

## 4.1 Truy vết chức năng từ TL02

TL10 chi tiết hóa các chức năng nghiệp vụ sau trong TL02:

- **NV24** — Tạo chiến dịch quảng bá hợp lệ tính theo lượt
- **NV25** — Cập nhật chiến dịch trước khi chạy hoặc theo quy tắc cho phép
- **NV26** — Gửi duyệt chiến dịch
- **NV27** — Tạm dừng hoặc tiếp tục chiến dịch
- **NV28** — Hủy chiến dịch theo điều kiện cho phép
- **NV29** — Ghi nhận lượt cho chiến dịch
- **NV30** — Trừ tiền theo lượt hợp lệ
- **NV31** — Theo dõi thống kê chiến dịch và chi tiêu

Các chức năng hỗ trợ có liên quan:

- **NV08** — Xem số dư và lịch sử giao dịch
- **NV33** — Quản lý giá theo lượt
- **NV38** — Theo dõi cảnh báo gian lận
- **NV39** — Nhật ký quản trị
- **NV40** — Báo cáo đối soát tổng quan

## 4.2 Truy vết phân quyền từ TL03

TL10 tuân thủ các ràng buộc trọng yếu trong TL03:

- Chỉ **R10** được tạo, cập nhật, gửi duyệt, tạm dừng, tiếp tục, hủy chiến dịch **của chính mình** theo điều kiện trạng thái.
- **R30** có quyền duyệt hoặc từ chối chiến dịch, xử lý ngoại lệ trạng thái, khóa vận hành khi rủi ro.
- **R40** chỉ tra cứu thông tin hỗ trợ, không được thay đổi trạng thái chiến dịch.
- Quyền thao tác phụ thuộc **trạng thái chiến dịch** phải bám bảng tại TL03 mục 11.4.

## 4.3 Truy vết nguyên tắc số dư từ TL08 và TL09

TL10 sử dụng thống nhất các nguyên tắc tài chính đã chốt:

- Không cho phép số dư âm.
- Mọi thay đổi số dư phải qua sổ cái.
- Không trừ tiền trực tiếp không có bút toán.
- Bút toán đã ghi là bất biến, điều chỉnh dùng bút toán bù.
- Thao tác tài chính ngoại lệ phải có nhật ký quản trị và lý do.

---

## 5. Tác nhân tham gia quy trình chiến dịch

### 5.1 R10 — Khách hàng mua chiến dịch

Vai trò nghiệp vụ:

- tạo chiến dịch,
- cấu hình nhắm mục tiêu hợp lệ,
- gửi duyệt,
- theo dõi trạng thái và số liệu,
- tạm dừng, tiếp tục, hủy theo điều kiện,
- nạp tiền khi thiếu số dư,
- xem chi tiêu theo lượt.

### 5.2 R30 — Quản trị viên

Vai trò nghiệp vụ:

- duyệt hoặc từ chối chiến dịch khi chính sách yêu cầu duyệt,
- xử lý ngoại lệ chiến dịch,
- can thiệp trạng thái có kiểm soát trong trường hợp lỗi hoặc rủi ro,
- kiểm tra và xử lý cảnh báo gian lận ảnh hưởng tới chiến dịch.

### 5.3 R40 — Nhân viên hỗ trợ

Vai trò nghiệp vụ:

- tra cứu trạng thái chiến dịch,
- giải thích tiến độ xử lý cho R10,
- tiếp nhận phản ánh lỗi cấu hình hoặc chênh lệch số liệu để chuyển R30,
- không được thay đổi cấu hình hoặc trạng thái.

### 5.4 Dịch vụ nền hệ thống

Vai trò kỹ thuật nghiệp vụ:

- kiểm tra tính hợp lệ cấu hình chiến dịch,
- ghi nhận sự kiện lượt,
- phân loại hợp lệ tạm thời hoặc bị loại tạm thời,
- trừ tiền tạm thời theo lượt hợp lệ,
- đối soát và điều chỉnh số liệu,
- tạo cảnh báo gian lận,
- cập nhật trạng thái chiến dịch tự động theo điều kiện.

---

## 6. Thuật ngữ và định nghĩa dùng riêng cho TL10

### 6.1 Chiến dịch tính theo lượt

Cấu hình quảng bá hợp lệ của R10 có ngân sách, giới hạn lượt và điều kiện nhắm mục tiêu. Hệ thống tính chi tiêu theo **lượt hợp lệ** ghi nhận cho chiến dịch.

### 6.2 Ngân sách tổng chiến dịch

Mức tiền tối đa chiến dịch được phép sử dụng trong vòng đời của chiến dịch. Hệ thống không được trừ vượt ngân sách tổng.

### 6.3 Giới hạn lượt theo ngày

Số lượt hợp lệ tối đa chiến dịch được tính trong một ngày theo quy tắc ngày thống kê của hệ thống.

### 6.4 Đơn giá theo lượt

Mức giá áp dụng cho một lượt hợp lệ. Đơn giá có thể lấy từ cấu hình hệ thống hoặc chính sách giá áp tại thời điểm chiến dịch tạo hoặc thời điểm hiệu lực.

### 6.5 Phiên bản cấu hình chiến dịch

Bản chụp cấu hình chiến dịch tại một thời điểm. Mỗi thay đổi quan trọng phải tạo phiên bản mới để phục vụ truy vết, đối soát và giải thích số liệu.

### 6.6 Lượt gắn với chiến dịch

Sự kiện truy cập được hệ thống ánh xạ vào một chiến dịch cụ thể để đánh giá hợp lệ và tính tiền.

### 6.7 Trừ tiền tạm thời

Bút toán trừ tiền ở thời điểm hệ thống xác định lượt **hợp lệ tạm thời** nhằm phục vụ hiển thị gần thời gian thực. Có thể phát sinh bút toán bù nếu đối soát sau đó loại lượt.

### 6.8 Chi tiêu đã chốt

Chi tiêu sau khi đối soát, dùng cho báo cáo chốt kỳ và xử lý tranh chấp nội bộ.

---

## 7. Tiền điều kiện để chiến dịch có thể vận hành

Trước khi chiến dịch chuyển sang trạng thái vận hành, hệ thống phải kiểm tra các điều kiện sau:

1. **Tài khoản R10 hợp lệ**
   - không bị khóa,
   - có quyền khối khách hàng mua chiến dịch.

2. **Chiến dịch hợp lệ về cấu hình**
   - có tên chiến dịch,
   - có liên kết đích hoặc danh sách đích hợp lệ theo chính sách,
   - có ngân sách tổng lớn hơn 0,
   - có giới hạn lượt theo ngày lớn hơn 0,
   - có đơn giá theo lượt hợp lệ,
   - không vi phạm chính sách nội dung.

3. **Điều kiện tài chính**
   - số dư khả dụng của ví R10 đủ theo ngưỡng vận hành tối thiểu do hệ thống quy định,
   - không có cờ chặn tài chính trên tài khoản.

4. **Điều kiện trạng thái**
   - chiến dịch đã được duyệt nếu chính sách yêu cầu duyệt,
   - không ở trạng thái kết thúc hoặc lỗi chưa xử lý.

5. **Điều kiện vận hành khác**
   - cấu hình nhắm mục tiêu không rỗng sai cách,
   - khung giờ và múi giờ hợp lệ,
   - cấu hình không mâu thuẫn nội bộ.

---

## 8. Dữ liệu đầu vào và đầu ra nghiệp vụ của chiến dịch

## 8.1 Đầu vào tối thiểu khi tạo chiến dịch

Bắt buộc:

- tên chiến dịch
- liên kết đích hoặc nhóm liên kết đích
- ngân sách tổng
- giới hạn lượt theo ngày
- đơn giá theo lượt hoặc khóa giá áp dụng
- điều kiện nhắm mục tiêu hợp lệ tối thiểu theo chính sách
- múi giờ áp dụng cho thống kê và lịch chạy nếu hệ thống cho phép chọn

Tùy chọn:

- mô tả nội bộ
- ngày bắt đầu
- ngày kết thúc
- ghi chú cho quản trị viên khi gửi duyệt
- bật hoặc tắt một số lớp kiểm tra bổ sung nếu chính sách hệ thống hỗ trợ

## 8.2 Đầu ra sau khi tạo chiến dịch

- mã chiến dịch
- trạng thái ban đầu
- phiên bản cấu hình đầu tiên
- số liệu ngân sách khởi tạo
- thông tin cảnh báo cấu hình nếu có
- danh sách bước còn thiếu trước khi gửi duyệt hoặc chạy

## 8.3 Đầu vào khi cập nhật chiến dịch

Tùy theo trạng thái, các trường được phép cập nhật khác nhau. Nhóm trường chính:

- tên chiến dịch
- liên kết đích hoặc nhóm đích
- ngân sách tổng
- giới hạn lượt theo ngày
- điều kiện nhắm mục tiêu
- lịch chạy
- mô tả nội bộ
- cờ tạm dừng theo chủ tài khoản

**Ràng buộc:** thay đổi quan trọng phải tạo phiên bản cấu hình mới.

## 8.4 Đầu vào khi gửi duyệt

Bắt buộc:

- xác nhận cấu hình cuối
- chiến dịch ở trạng thái cho phép gửi duyệt
- chiến dịch vượt các kiểm tra hợp lệ cơ bản

Tùy chọn:

- ghi chú gửi duyệt

## 8.5 Đầu ra khi gửi duyệt

- chiến dịch chuyển trạng thái **chờ duyệt**
- tạo bản ghi yêu cầu duyệt
- ghi nhật ký hành động
- thông báo cho R30 nếu có hàng chờ duyệt

## 8.6 Đầu vào khi R30 duyệt hoặc từ chối

Bắt buộc:

- quyết định xử lý
- lý do khi từ chối
- ghi chú xử lý tối thiểu
- xác nhận đã xem các cảnh báo cấu hình hoặc rủi ro nếu có

Tùy chọn:

- yêu cầu chỉnh sửa trước khi gửi duyệt lại
- gắn nhãn rủi ro hoặc mức ưu tiên

## 8.7 Đầu ra khi duyệt thành công

- chiến dịch chuyển sang **sẵn sàng chạy**
- lưu dấu vết quyết định duyệt
- thông báo cho R10
- hệ thống có thể tự chuyển **đang chạy** nếu đủ điều kiện vận hành tại thời điểm đó

## 8.8 Đầu ra khi từ chối

- chiến dịch chuyển sang **bị từ chối**
- lưu lý do từ chối
- thông báo cho R10
- cho phép R10 cập nhật và gửi duyệt lại theo quy tắc

## 8.9 Đầu vào và đầu ra khi ghi nhận lượt

Đầu vào nghiệp vụ tối thiểu từ dịch vụ nền:

- mã chiến dịch hoặc khóa ánh xạ chiến dịch
- mã sự kiện lượt
- thời điểm sự kiện
- kết quả đánh giá lượt ở mức hiện tại
- thời lượng hoặc tiêu chí hoàn tất tối thiểu nếu áp dụng
- điểm rủi ro
- dữ liệu nhắm mục tiêu đối chiếu

Đầu ra nghiệp vụ:

- trạng thái sự kiện lượt
- quyết định có tính cho chiến dịch hay không
- quyết định trừ tiền tạm thời hay không
- lý do loại nếu bị loại
- dữ liệu thống kê tổng hợp cập nhật

## 8.10 Đầu ra khi trừ tiền thành công

- bút toán sổ cái từ ví R10
- cập nhật ngân sách đã dùng
- cập nhật chi tiêu theo ngày
- cập nhật số liệu chiến dịch gần thời gian thực
- nhật ký sự kiện tài chính liên kết tới sự kiện lượt

---

## 9. Vòng đời chiến dịch và trạng thái chuẩn

## 9.1 Danh sách trạng thái chiến dịch chuẩn hóa

Theo TL02 mục 13.5, TL10 sử dụng đúng các trạng thái sau:

- nháp
- chờ duyệt
- bị từ chối
- sẵn sàng chạy
- đang chạy
- tạm dừng
- hết ngân sách
- hoàn thành
- đã hủy
- lỗi cấu hình

**Lưu ý nhất quán:**
- TL10 **không** dùng trạng thái `mới tạo` cho chiến dịch ở mức hiển thị người dùng.
- Nếu hệ thống có trạng thái kỹ thuật nội bộ trong bước tạo bản ghi, trạng thái đó không được lộ ra giao diện và không thay thế danh sách trạng thái chuẩn.

## 9.2 Mô tả ý nghĩa từng trạng thái

### nháp
Chiến dịch đã được tạo nhưng chưa gửi duyệt. R10 có thể chỉnh sửa toàn bộ nhóm trường cho phép.

### chờ duyệt
Chiến dịch đã gửi duyệt, chờ R30 xử lý. R10 không được sửa trực tiếp trừ thao tác hủy nếu chính sách cho phép.

### bị từ chối
R30 đã từ chối chiến dịch. R10 được chỉnh sửa và gửi duyệt lại.

### sẵn sàng chạy
Chiến dịch đã đạt điều kiện duyệt và cấu hình hợp lệ, nhưng chưa bắt đầu tiêu thụ lượt tại thời điểm hiện tại vì một hoặc nhiều lý do:
- chưa tới lịch chạy,
- chưa đủ số dư tối thiểu vận hành,
- đang chờ kích hoạt từ hệ thống,
- đang chờ hàng đợi phân bổ.

### đang chạy
Chiến dịch đang nhận lượt và có thể phát sinh trừ tiền theo lượt hợp lệ.

### tạm dừng
Chiến dịch bị tạm dừng bởi R10 hoặc R30, hoặc do điều kiện hệ thống nhưng còn khả năng tiếp tục sau khi thỏa điều kiện.

### hết ngân sách
Chiến dịch dừng do ngân sách tổng hoặc hạn mức chi tiêu đã tới ngưỡng. Có thể quay lại vận hành nếu được cập nhật ngân sách và đủ điều kiện theo quy tắc.

### hoàn thành
Chiến dịch kết thúc theo lịch hoặc đạt mục tiêu kết thúc do cấu hình hệ thống quy định.

### đã hủy
Chiến dịch bị hủy theo yêu cầu R10 hoặc quyết định R30 trong phạm vi cho phép. Đây là trạng thái kết thúc.

### lỗi cấu hình
Chiến dịch phát hiện lỗi cấu hình làm không thể vận hành hoặc không nên tiếp tục vận hành cho đến khi sửa.

## 9.3 Ma trận chuyển trạng thái chiến dịch

Bảng này chốt ở mức nghiệp vụ để TL14 mã hóa trạng thái và TL15 đặc tả giao diện lập trình.

| Trạng thái hiện tại | Tác nhân | Hành động | Trạng thái kế tiếp | Điều kiện chính |
|---|---|---|---|---|
| nháp | R10 | gửi duyệt | chờ duyệt | Cấu hình đạt kiểm tra cơ bản |
| nháp | R10 | hủy | đã hủy | Theo chính sách cho phép |
| chờ duyệt | R30 | duyệt | sẵn sàng chạy | Hợp lệ nội dung, cấu hình, tài khoản |
| chờ duyệt | R30 | từ chối | bị từ chối | Có lý do |
| chờ duyệt | R10 | hủy | đã hủy | Nếu chính sách cho phép R10 hủy khi chờ duyệt |
| bị từ chối | R10 | cập nhật và gửi duyệt | chờ duyệt | Sau khi sửa lỗi theo yêu cầu |
| bị từ chối | R10 | hủy | đã hủy | Theo chính sách |
| sẵn sàng chạy | Hệ thống | kích hoạt vận hành | đang chạy | Đủ số dư, đúng lịch, không lỗi |
| sẵn sàng chạy | R10 | hủy | đã hủy | Theo chính sách |
| sẵn sàng chạy | R30 | từ chối hoặc khóa vận hành ngoại lệ | bị từ chối hoặc tạm dừng | Có lý do và nhật ký |
| đang chạy | R10 | tạm dừng | tạm dừng | Theo quyền |
| đang chạy | R30 | tạm dừng | tạm dừng | Lỗi, rủi ro, vận hành |
| đang chạy | Hệ thống | cạn ngân sách | hết ngân sách | Chạm ngưỡng ngân sách |
| đang chạy | Hệ thống | đạt điều kiện kết thúc | hoàn thành | Hết thời gian hoặc đạt mục tiêu |
| đang chạy | Hệ thống hoặc R30 | phát hiện lỗi cấu hình | lỗi cấu hình | Có lỗi ngăn vận hành |
| tạm dừng | R10 | tiếp tục | đang chạy hoặc sẵn sàng chạy | Đủ điều kiện vận hành |
| tạm dừng | R10 | hủy | đã hủy | Theo chính sách |
| tạm dừng | R30 | tiếp tục | đang chạy hoặc sẵn sàng chạy | Sau khi xử lý ngoại lệ |
| hết ngân sách | R10 | tăng ngân sách hoặc nạp tiền và tiếp tục | sẵn sàng chạy hoặc đang chạy | Đủ điều kiện |
| hết ngân sách | R10 | hủy | đã hủy | Theo chính sách |
| lỗi cấu hình | R10 | sửa cấu hình và gửi duyệt | chờ duyệt | Tạo phiên bản cấu hình mới |
| lỗi cấu hình | R30 | xử lý ngoại lệ vận hành | tạm dừng hoặc bị từ chối | Có lý do và nhật ký |
| hoàn thành | R30 | xử lý ngoại lệ | hoàn thành | Mặc định không đổi trạng thái |
| đã hủy | R30 | xử lý ngoại lệ | đã hủy | Mặc định không khôi phục ở phiên bản đầu |

---

## 10. Quyền thao tác theo trạng thái chiến dịch

Phần này bám TL03 mục 11.4 và chỉ diễn giải thêm để dev triển khai nút và điều kiện xử lý nhất quán.

## 10.1 R10 theo trạng thái

### nháp
- được cập nhật
- được gửi duyệt
- được hủy
- không được tiếp tục hoặc tạm dừng

### chờ duyệt
- mặc định không được cập nhật
- không được gửi duyệt lại
- được hủy nếu chính sách cho phép
- không được tạm dừng hoặc tiếp tục

### bị từ chối
- được cập nhật
- được gửi duyệt lại
- được hủy

### sẵn sàng chạy
- được cập nhật một phần theo chính sách
- không gửi duyệt
- có thể tiếp tục hoặc kích hoạt gián tiếp tùy thiết kế
- có thể hủy nếu chính sách cho phép

### đang chạy
- được cập nhật rất hạn chế nếu hệ thống hỗ trợ
- được tạm dừng
- không được hủy trực tiếp mặc định
- không được gửi duyệt

### tạm dừng
- được tiếp tục
- được cập nhật một phần theo chính sách
- được hủy

### hết ngân sách
- được cập nhật ngân sách hoặc điều kiện cho phép
- được tiếp tục sau khi đủ điều kiện
- được hủy

### hoàn thành và đã hủy
- không cho thao tác vận hành
- chỉ tra cứu

### lỗi cấu hình
- được cập nhật
- được gửi duyệt lại
- được hủy

## 10.2 R30 theo trạng thái

- **chờ duyệt:** duyệt hoặc từ chối
- **đang chạy:** tạm dừng ngoại lệ, xử lý rủi ro
- **tạm dừng:** tiếp tục sau xử lý ngoại lệ
- **hết ngân sách:** hỗ trợ xử lý ngoại lệ khi có tranh chấp số liệu hoặc cấu hình
- **lỗi cấu hình:** chuyển xử lý ngoại lệ hoặc yêu cầu sửa
- mọi can thiệp trạng thái ngoài luồng chuẩn phải có lý do và nhật ký quản trị

## 10.3 R40 theo trạng thái

- chỉ được đọc trạng thái, số liệu tổng quan và ghi chú hỗ trợ theo quyền
- không được thay đổi trạng thái hoặc cấu hình

---

## 11. Luồng nghiệp vụ chi tiết của quy trình chiến dịch

## 11.1 Luồng chuẩn A — Tạo chiến dịch ở trạng thái nháp

1. **R10 mở chức năng tạo chiến dịch.**
2. Hệ thống hiển thị biểu mẫu và cấu hình giá hiện hành có hiệu lực.
3. R10 nhập dữ liệu chiến dịch.
4. Hệ thống kiểm tra hợp lệ dữ liệu đầu vào:
   - trường bắt buộc,
   - giá trị số hợp lệ,
   - liên kết đích hợp lệ theo chính sách,
   - điều kiện nhắm mục tiêu không mâu thuẫn.
5. Nếu hợp lệ, hệ thống:
   - tạo bản ghi chiến dịch ở trạng thái **nháp**,
   - tạo **phiên bản cấu hình đầu tiên**,
   - khởi tạo số liệu ngân sách đã dùng bằng 0,
   - ghi nhật ký hành động.
6. Hệ thống trả về mã chiến dịch và trạng thái **nháp**.

### Kết quả
- chiến dịch tồn tại ở trạng thái **nháp**
- chưa phát sinh trừ tiền
- chưa vào hàng chờ duyệt

## 11.2 Luồng chuẩn B — Cập nhật chiến dịch trước khi gửi duyệt

1. R10 mở chiến dịch ở trạng thái cho phép cập nhật.
2. Hệ thống xác định các trường được phép sửa theo trạng thái.
3. R10 chỉnh sửa dữ liệu.
4. Hệ thống so sánh với phiên bản cấu hình hiện hành:
   - nếu chỉ là thay đổi mô tả hoặc ghi chú không quan trọng, có thể cập nhật cùng phiên bản theo chính sách,
   - nếu là thay đổi quan trọng, phải tạo **phiên bản cấu hình mới**.
5. Hệ thống chạy kiểm tra hợp lệ lại.
6. Nếu hợp lệ, lưu thay đổi và ghi nhật ký.
7. Nếu không hợp lệ, giữ nguyên dữ liệu cũ và trả lỗi rõ ràng.

### Nhóm thay đổi quan trọng tối thiểu phải tạo phiên bản mới
- liên kết đích hoặc nhóm đích
- ngân sách tổng
- đơn giá áp dụng
- giới hạn lượt theo ngày
- điều kiện nhắm mục tiêu
- lịch chạy hoặc thời gian kết thúc
- cấu hình ảnh hưởng điều kiện tính lượt hợp lệ

## 11.3 Luồng chuẩn C — Gửi duyệt chiến dịch

1. R10 chọn hành động **gửi duyệt** từ trạng thái **nháp**, **bị từ chối** hoặc **lỗi cấu hình** theo quy tắc.
2. Hệ thống kiểm tra:
   - chiến dịch ở trạng thái cho phép,
   - dữ liệu chiến dịch hợp lệ,
   - không có cảnh báo chặn bắt buộc phải xử lý trước,
   - tài khoản R10 không bị khóa.
3. Hệ thống chuyển trạng thái chiến dịch sang **chờ duyệt**.
4. Hệ thống tạo bản ghi yêu cầu duyệt và ghi nhận thời điểm.
5. Hệ thống gửi thông báo:
   - cho R10 biết đã gửi duyệt thành công,
   - cho R30 nếu hệ thống hỗ trợ hàng chờ duyệt.
6. Ghi nhật ký hệ thống và nhật ký người dùng.

### Trường hợp đặc biệt
Nếu hệ thống vận hành ở chế độ **không cần duyệt thủ công** cho một nhóm chiến dịch, bước này có thể được hệ thống tự xử lý theo chính sách và chuyển trực tiếp sang **sẵn sàng chạy**. Tuy nhiên trạng thái và nhật ký vẫn phải nhất quán.

## 11.4 Luồng chuẩn D — R30 duyệt chiến dịch

1. R30 mở hàng chờ duyệt.
2. Chọn một chiến dịch trạng thái **chờ duyệt**.
3. Hệ thống hiển thị:
   - cấu hình hiện hành,
   - lịch sử phiên bản gần nhất,
   - cảnh báo rủi ro nếu có,
   - thông tin tài khoản R10 ở mức cần thiết.
4. R30 thực hiện kiểm tra nghiệp vụ.
5. Nếu duyệt:
   - ghi ghi chú xử lý,
   - cập nhật quyết định duyệt,
   - chuyển trạng thái chiến dịch sang **sẵn sàng chạy**,
   - ghi nhật ký quản trị,
   - gửi thông báo cho R10.
6. Hệ thống đánh giá điều kiện vận hành ngay sau duyệt:
   - nếu đủ điều kiện, có thể chuyển **đang chạy**,
   - nếu chưa đủ, giữ ở **sẵn sàng chạy**.

## 11.5 Luồng chuẩn E — R30 từ chối chiến dịch

1. R30 mở chiến dịch trạng thái **chờ duyệt**.
2. Chọn hành động **từ chối**.
3. Nhập lý do từ chối bắt buộc.
4. Hệ thống:
   - lưu lý do,
   - chuyển trạng thái sang **bị từ chối**,
   - ghi nhật ký quản trị,
   - gửi thông báo cho R10.
5. R10 chỉnh sửa và gửi duyệt lại nếu muốn.

## 11.6 Luồng chuẩn F — Kích hoạt vận hành và chuyển sang đang chạy

Luồng này có thể do hệ thống kích hoạt định kỳ hoặc tại thời điểm phát sinh điều kiện.

1. Hệ thống quét các chiến dịch trạng thái **sẵn sàng chạy**.
2. Với từng chiến dịch, kiểm tra:
   - tài khoản còn hoạt động,
   - số dư đủ điều kiện,
   - trong khung giờ chạy,
   - chưa hết ngày hoặc hết thời gian chiến dịch,
   - không có cờ chặn vận hành,
   - cấu hình không lỗi.
3. Nếu đủ điều kiện, chuyển trạng thái sang **đang chạy**.
4. Ghi nhật ký hệ thống.
5. Cập nhật dấu mốc bắt đầu vận hành hoặc tiếp tục vận hành.

## 11.7 Luồng chuẩn G — Ghi nhận lượt và trừ tiền theo lượt hợp lệ

Đây là luồng lõi của chiến dịch tính theo lượt và phải được làm chặt chẽ để tránh trừ trùng hoặc trừ vượt ngân sách.

### Bước 1 — Nhận sự kiện lượt
Dịch vụ nền nhận một sự kiện có thể gắn với chiến dịch.

### Bước 2 — Kiểm tra điều kiện chiến dịch
- chiến dịch phải ở trạng thái **đang chạy**
- chưa vượt giới hạn lượt ngày
- chưa vượt ngân sách tổng
- tài khoản không bị khóa
- không có cờ chặn vận hành

Nếu không đạt, sự kiện vẫn có thể được ghi nhận để phân tích nhưng **không tính cho chiến dịch**.

### Bước 3 — Đánh giá lượt
Hệ thống đánh giá theo quy tắc hiện hành:
- nhắm mục tiêu phù hợp
- điều kiện hợp lệ cơ bản
- kết quả chống gian lận ở mức hiện tại
- điều kiện hoàn tất tối thiểu nếu có

Kết quả ở thời điểm này có thể là:
- hợp lệ tạm thời
- bị loại tạm thời
- cần kiểm tra thủ công

### Bước 4 — Phòng chống trừ trùng
Trước khi trừ tiền, hệ thống phải kiểm tra khóa duy nhất nghiệp vụ cho sự kiện tính tiền. Nếu phát hiện sự kiện đã được tính trước đó thì:
- không trừ tiền lần nữa,
- ghi nhật ký chống trùng,
- cập nhật trạng thái xử lý phù hợp.

### Bước 5 — Trừ tiền tạm thời nếu lượt hợp lệ tạm thời
Nếu sự kiện là **hợp lệ tạm thời**, hệ thống thực hiện trong một giao dịch xử lý:

1. tính số tiền trừ theo đơn giá áp dụng,
2. kiểm tra lại số dư và ngân sách ngay trước khi ghi sổ,
3. ghi bút toán sổ cái trừ tiền từ ví R10,
4. cập nhật ngân sách đã dùng chiến dịch,
5. cập nhật bộ đếm lượt hợp lệ tạm thời và chi tiêu tạm thời,
6. đánh dấu sự kiện đã được tính tiền.

Nếu bất kỳ bước nào thất bại, toàn bộ giao dịch phải hoàn tác để tránh lệch số liệu.

### Bước 6 — Cập nhật trạng thái chiến dịch tự động nếu chạm ngưỡng
Sau khi trừ tiền:
- nếu hết ngân sách, chuyển **hết ngân sách**
- nếu đạt điều kiện kết thúc, chuyển **hoàn thành**
- nếu phát hiện lỗi cấu hình mới, chuyển **lỗi cấu hình**

## 11.8 Luồng chuẩn H — Tạm dừng chiến dịch

### H1 — R10 tạm dừng
1. R10 chọn chiến dịch trạng thái **đang chạy**.
2. Hệ thống kiểm tra quyền.
3. Chuyển trạng thái sang **tạm dừng**.
4. Ghi nhật ký người dùng và hệ thống.
5. Không tiếp nhận thêm lượt mới cho chiến dịch từ thời điểm có hiệu lực tạm dừng.

### H2 — R30 tạm dừng ngoại lệ
Áp dụng khi có rủi ro hoặc sự cố vận hành.
- Bắt buộc ghi lý do
- Ghi nhật ký quản trị
- Thông báo cho R10

## 11.9 Luồng chuẩn I — Tiếp tục chiến dịch

1. R10 hoặc R30 thực hiện hành động **tiếp tục** từ trạng thái **tạm dừng** hoặc **hết ngân sách** theo điều kiện.
2. Hệ thống kiểm tra lại:
   - số dư,
   - ngân sách,
   - lịch chạy,
   - trạng thái tài khoản,
   - cờ rủi ro hoặc khóa vận hành.
3. Nếu đủ điều kiện:
   - chuyển **đang chạy** nếu tới thời điểm vận hành,
   - hoặc **sẵn sàng chạy** nếu chưa tới khung giờ.
4. Ghi nhật ký hành động.

## 11.10 Luồng chuẩn J — Hủy chiến dịch

1. R10 chọn hủy ở trạng thái cho phép.
2. Hệ thống kiểm tra trạng thái theo TL03.
3. Hệ thống yêu cầu xác nhận.
4. Nếu xác nhận thành công:
   - chuyển trạng thái **đã hủy**,
   - ngừng vận hành chiến dịch,
   - ghi nhật ký.
5. Không tự động hoàn chi tiêu đã phát sinh trước đó.

**Lưu ý:** Nếu có sự kiện đang xử lý ở thời điểm hủy, hệ thống phải áp dụng quy tắc cắt thời điểm hiệu lực để tránh tiếp tục tính tiền sau khi hủy.

## 11.11 Luồng chuẩn K — Chiến dịch hết ngân sách và nạp tiền bổ sung

1. Chiến dịch chuyển **hết ngân sách** do hệ thống.
2. R10 thấy cảnh báo trên bảng điều khiển.
3. R10 có thể:
   - nạp tiền vào ví theo TL08,
   - tăng ngân sách chiến dịch,
   - giảm giới hạn hoặc chỉnh cấu hình theo chính sách,
   - hủy chiến dịch.
4. Khi đủ điều kiện, R10 chọn tiếp tục và hệ thống chuyển về **sẵn sàng chạy** hoặc **đang chạy**.

## 11.12 Luồng chuẩn L — Chiến dịch lỗi cấu hình

Chiến dịch có thể rơi vào **lỗi cấu hình** khi:
- liên kết đích không còn hợp lệ,
- cấu hình nhắm mục tiêu mâu thuẫn,
- cấu hình lịch chạy sai,
- chính sách hệ thống thay đổi làm cấu hình cũ không còn hợp lệ,
- dữ liệu bắt buộc bị thiếu do lỗi hệ thống hoặc di trú dữ liệu.

Quy trình xử lý:
1. Hệ thống hoặc R30 phát hiện lỗi.
2. Chuyển trạng thái **lỗi cấu hình** và ghi rõ mã lỗi hoặc lý do.
3. Thông báo cho R10.
4. R10 cập nhật cấu hình và tạo phiên bản mới.
5. R10 gửi duyệt lại nếu quy trình yêu cầu duyệt.

---

## 12. Quy tắc nghiệp vụ chi tiết về tính tiền theo lượt

## 12.1 Quy tắc đơn giá áp dụng

1. Mỗi lượt hợp lệ được trừ theo **đơn giá áp dụng** của chiến dịch.
2. Đơn giá áp dụng phải được chụp lại trong phiên bản cấu hình hoặc bản ghi tính tiền để tránh mơ hồ khi giá hệ thống thay đổi sau này.
3. Thay đổi giá hệ thống không hồi tố các lượt đã chốt.

## 12.2 Quy tắc ngân sách và số dư

1. Không trừ tiền nếu số dư khả dụng không đủ tại thời điểm kiểm tra cuối trước khi ghi sổ.
2. Không trừ vượt ngân sách tổng của chiến dịch.
3. Nếu còn ngân sách nhỏ hơn mức trừ một lượt, hệ thống phải xử lý theo một trong hai chính sách và chốt thống nhất:
   - không nhận thêm lượt,
   - hoặc cho phép lượt cuối nếu trong giới hạn sai số do cấu hình đặc biệt.

**TL10 chốt mặc định phiên bản đầu:** **không nhận thêm lượt** nếu ngân sách còn lại nhỏ hơn mức trừ một lượt.

## 12.3 Quy tắc giới hạn lượt theo ngày

1. Chỉ tính tối đa tới giới hạn lượt hợp lệ trong ngày.
2. Lượt vượt giới hạn ngày có thể được ghi nhận thống kê nhưng không tính tiền.
3. Ranh giới ngày phải thống nhất theo múi giờ chiến dịch hoặc múi giờ hệ thống đã cấu hình.

## 12.4 Quy tắc tránh trừ trùng

1. Mỗi sự kiện tính tiền phải có khóa nhận diện duy nhất ở mức nghiệp vụ.
2. Trước khi ghi bút toán trừ tiền, hệ thống phải kiểm tra sự kiện đã được tính chưa.
3. Xử lý lặp lại do gửi lại yêu cầu hoặc xử lý hàng đợi lặp phải đảm bảo không tạo bút toán trùng.

## 12.5 Quy tắc phân biệt số liệu tạm thời và số liệu đã chốt

1. Số liệu bảng điều khiển có thể hiển thị **tạm thời** gần thời gian thực.
2. Đối soát có quyền:
   - chuyển hợp lệ tạm thời thành bị loại đã chốt,
   - hoặc ngược lại theo quy tắc.
3. Mọi điều chỉnh chi tiêu sau đối soát phải dùng bút toán bù và có lý do.

## 12.6 Quy tắc liên kết giữa sự kiện lượt và bút toán tài chính

1. Mỗi bút toán trừ tiền theo lượt phải tham chiếu được tới:
   - mã chiến dịch,
   - mã sự kiện lượt,
   - phiên bản cấu hình hoặc đơn giá áp dụng.
2. Dữ liệu này là bắt buộc để phục vụ tranh chấp và đối soát.

---

## 13. Quy tắc cập nhật cấu hình và phiên bản chiến dịch

## 13.1 Nguyên tắc chung

- Không ghi đè mù cấu hình đang chạy mà không để lại dấu vết.
- Mọi thay đổi quan trọng phải tạo phiên bản mới.
- Phải lưu thời điểm hiệu lực của phiên bản.

## 13.2 Chính sách cập nhật theo trạng thái

### nháp
Cho phép cập nhật đầy đủ hầu hết trường.

### chờ duyệt
Mặc định không cho cập nhật. Nếu muốn sửa phải:
- hủy yêu cầu duyệt theo chính sách sau này, hoặc
- chờ bị từ chối rồi sửa, hoặc
- quản trị xử lý ngoại lệ.

### bị từ chối
Cho phép cập nhật để sửa theo lý do từ chối.

### sẵn sàng chạy
Cho phép cập nhật có kiểm soát. Thay đổi quan trọng có thể yêu cầu duyệt lại.

### đang chạy
Chỉ cho sửa nhóm trường an toàn nếu có chính sách hỗ trợ.
Các thay đổi ảnh hưởng cách tính tiền hoặc nhắm mục tiêu thường phải:
- chuyển tạm dừng,
- tạo phiên bản mới,
- duyệt lại,
- sau đó mới tiếp tục.

### tạm dừng
Cho phép cập nhật có kiểm soát; tùy loại thay đổi có thể yêu cầu duyệt lại.

### hết ngân sách
Cho phép cập nhật ngân sách và một số trường; thay đổi lớn có thể yêu cầu duyệt lại.

### hoàn thành, đã hủy
Mặc định không cho cập nhật cấu hình vận hành.

### lỗi cấu hình
Cho phép sửa để khắc phục và gửi duyệt lại.

## 13.3 Bảng phân loại thay đổi quan trọng và thay đổi không quan trọng

| Nhóm thay đổi | Ví dụ | Có tạo phiên bản mới | Có thể yêu cầu duyệt lại |
|---|---|---:|---:|
| Mô tả nội bộ | ghi chú, mô tả nội bộ | Không bắt buộc | Không |
| Tên chiến dịch | đổi tên hiển thị | Khuyến nghị | Không |
| Ngân sách tổng | tăng hoặc giảm ngân sách | Có | Có thể |
| Giới hạn lượt ngày | tăng hoặc giảm giới hạn | Có | Có thể |
| Đơn giá áp dụng | đổi đơn giá | Có | Có |
| Liên kết đích | đổi đích hoặc nhóm đích | Có | Có |
| Nhắm mục tiêu | đổi quốc gia, thiết bị, khung giờ | Có | Có |
| Thời gian chạy | đổi ngày bắt đầu hoặc kết thúc | Có | Có thể |
| Cờ vận hành | bật lớp kiểm tra bổ sung | Có | Có |

---

## 14. Ngoại lệ nghiệp vụ và cách xử lý

## 14.1 R10 thiếu số dư khi chiến dịch đang chạy

**Hiện tượng:** chiến dịch đang chạy nhưng số dư khả dụng không đủ cho lượt kế tiếp.

**Xử lý:**
1. Hệ thống ngừng tính thêm lượt cho chiến dịch.
2. Chuyển trạng thái về **hết ngân sách** hoặc **sẵn sàng chạy** tùy nguyên nhân:
   - nếu do ngân sách chiến dịch cạn: **hết ngân sách**
   - nếu ngân sách chiến dịch còn nhưng ví thiếu tiền: TL10 chốt mặc định là **hết ngân sách** ở góc nhìn vận hành chiến dịch để đơn giản trải nghiệm.
3. Ghi nhật ký hệ thống.
4. Thông báo cho R10 nạp tiền theo TL08.

## 14.2 Hai quản trị viên cùng xử lý duyệt chiến dịch

**Rủi ro:** quyết định trùng hoặc ghi đè trạng thái.

**Xử lý bắt buộc:**
- dùng khóa xử lý hoặc kiểm tra phiên bản trạng thái trước khi ghi
- chỉ chấp nhận một quyết định đầu tiên
- quyết định sau nhận thông báo trạng thái đã thay đổi
- ghi nhật ký xung đột xử lý

## 14.3 Sự kiện lượt đến trễ sau khi chiến dịch đã hủy

**Rủi ro:** bị tính tiền sau thời điểm hủy.

**Xử lý:**
- so sánh thời điểm sự kiện với thời điểm hiệu lực trạng thái **đã hủy**
- nếu sự kiện đến sau thời điểm hiệu lực hủy, không tính tiền
- vẫn có thể lưu sự kiện cho mục đích phân tích lỗi đồng bộ

## 14.4 Sự kiện lặp do xử lý hàng đợi gửi lại

**Xử lý:**
- khóa duy nhất sự kiện tính tiền
- kiểm tra chống lặp an toàn trước khi ghi sổ
- không tạo bút toán trừ tiền lần hai

## 14.5 Chiến dịch đang chạy bị phát hiện lỗi cấu hình

**Xử lý:**
1. Hệ thống hoặc R30 chuyển trạng thái **lỗi cấu hình** hoặc **tạm dừng** tùy mức độ.
2. Ghi lý do lỗi.
3. Ngừng nhận lượt tính tiền.
4. Thông báo R10 sửa và gửi duyệt lại.

## 14.6 Chênh lệch giữa số liệu tạm thời và số liệu đã chốt

**Hiện tượng:** số lượt hoặc chi tiêu trên bảng điều khiển giảm sau đối soát.

**Xử lý:**
- hiển thị rõ nhãn số liệu tạm thời hoặc đã chốt
- lưu lịch sử điều chỉnh
- tạo bút toán bù nếu chi tiêu bị giảm
- cho phép R40 tra cứu giải thích ở mức hỗ trợ

## 14.7 R10 chỉnh cấu hình trong trạng thái không cho phép

**Xử lý:**
- từ chối cập nhật
- trả về lý do rõ ràng theo trạng thái hiện tại
- gợi ý hành động hợp lệ như tạm dừng hoặc gửi duyệt lại

---

## 15. Nhật ký, thông báo và truy vết bắt buộc

## 15.1 Nhật ký người dùng R10

Bắt buộc ghi cho các hành động:
- tạo chiến dịch
- cập nhật chiến dịch
- gửi duyệt
- tạm dừng
- tiếp tục
- hủy
- tăng ngân sách hoặc sửa cấu hình quan trọng

Trường tối thiểu:
- người thực hiện
- mã chiến dịch
- hành động
- trạng thái trước và sau
- thời điểm
- ghi chú hoặc lý do nếu có

## 15.2 Nhật ký quản trị R30

Bắt buộc ghi cho:
- duyệt chiến dịch
- từ chối chiến dịch
- can thiệp trạng thái ngoại lệ
- tạm dừng hoặc tiếp tục do rủi ro
- điều chỉnh số liệu hoặc bút toán bù do xử lý tranh chấp

Theo TL03, thao tác nhạy cảm phải có lý do và ghi dữ liệu trước sau ở mức cần thiết.

## 15.3 Nhật ký hệ thống

Bắt buộc cho:
- chuyển trạng thái tự động
- ghi nhận sự kiện lượt
- quyết định hợp lệ hoặc bị loại
- chống trừ trùng
- bút toán trừ tiền tạm thời
- bút toán bù đối soát
- phát hiện lỗi cấu hình
- phát hiện hết ngân sách

## 15.4 Thông báo cho R10

Các sự kiện cần thông báo:
- chiến dịch gửi duyệt thành công
- chiến dịch được duyệt
- chiến dịch bị từ chối kèm lý do
- chiến dịch bắt đầu chạy
- chiến dịch tạm dừng
- chiến dịch hết ngân sách
- chiến dịch lỗi cấu hình
- chiến dịch hoàn thành

Yêu cầu:
- hỗ trợ Việt và Anh
- nội dung dùng khóa từ điển theo TL02

---

## 16. Báo cáo và số liệu đầu ra từ quy trình chiến dịch

## 16.1 Số liệu tối thiểu cho R10

Theo chiến dịch và theo ngày:

- trạng thái chiến dịch
- ngân sách tổng
- ngân sách đã dùng tạm thời
- ngân sách đã dùng đã chốt
- số lượt hợp lệ tạm thời
- số lượt bị loại tạm thời
- số lượt hợp lệ đã chốt
- số lượt bị loại đã chốt
- chi tiêu tạm thời
- chi tiêu đã chốt
- thời điểm cập nhật gần nhất

## 16.2 Số liệu tối thiểu cho R30

- hàng chờ duyệt chiến dịch
- chiến dịch bị từ chối theo lý do
- chiến dịch lỗi cấu hình
- chiến dịch hết ngân sách
- tỷ lệ lượt bị loại bất thường theo chiến dịch
- chênh lệch tạm thời và đã chốt
- danh sách chiến dịch cần kiểm tra thủ công

## 16.3 Ràng buộc hiển thị số liệu

- phải phân biệt rõ **tạm thời** và **đã chốt**
- không dùng cùng một nhãn cho hai loại số liệu
- phải có mốc thời gian cập nhật
- số liệu tài chính phải khớp sổ cái sau đối soát

---

## 17. Yêu cầu dữ liệu cho TL13 và giao diện lập trình cho TL15

## 17.1 Đầu vào cho TL13

TL13 cần mô hình hóa đầy đủ các thực thể liên quan từ TL10, tối thiểu gồm:

- chiến dịch
- phiên bản cấu hình chiến dịch
- yêu cầu duyệt chiến dịch
- nhật ký trạng thái chiến dịch
- sự kiện lượt gắn chiến dịch
- bút toán tính tiền theo lượt
- số liệu tổng hợp chiến dịch theo ngày
- bản ghi điều chỉnh đối soát chiến dịch
- hàng chờ kiểm tra thủ công liên quan chiến dịch

## 17.2 Đầu vào cho TL15

TL15 cần đặc tả các nhóm giao diện lập trình từ TL10, tối thiểu gồm:

- tạo chiến dịch
- cập nhật chiến dịch
- gửi duyệt
- duyệt hoặc từ chối
- tạm dừng hoặc tiếp tục
- hủy chiến dịch
- lấy danh sách chiến dịch
- lấy chi tiết chiến dịch
- lấy lịch sử trạng thái và phiên bản cấu hình
- lấy thống kê theo ngày
- ghi nhận sự kiện lượt và xử lý tính tiền nội bộ
- điều chỉnh đối soát nội bộ

---

## 18. Tiêu chí chấp nhận cho TL10

TL10 được xem là đạt khi thỏa toàn bộ điều kiện sau:

1. **Nhất quán trạng thái**
   - Chỉ dùng các trạng thái chiến dịch chuẩn từ TL02 mục 13.5.
   - Không mâu thuẫn với bảng quyền theo trạng thái trong TL03 mục 11.4.

2. **Nhất quán tài chính**
   - Có quy tắc trừ tiền theo lượt hợp lệ.
   - Có quy tắc không trừ trùng, không trừ vượt ngân sách hoặc số dư.
   - Có quy tắc dùng bút toán bù khi điều chỉnh.

3. **Luồng nghiệp vụ đầy đủ**
   - Bao phủ tạo, cập nhật, gửi duyệt, duyệt hoặc từ chối, vận hành, tạm dừng, tiếp tục, hủy, hết ngân sách, lỗi cấu hình, hoàn thành.

4. **Ngoại lệ đủ dùng cho triển khai**
   - Có xử lý thiếu số dư, sự kiện lặp, sự kiện đến trễ, xung đột duyệt, lỗi cấu hình.

5. **Đầu ra rõ cho tài liệu sau**
   - Có danh sách đầu vào cho TL13 và TL15.
   - Có yêu cầu nhật ký và báo cáo cho TL16 và TL19.

---

## 19. Checklist tự rà soát nhất quán trước khi chuyển sang tài liệu tiếp theo

### 19.1 Kiểm tra thuật ngữ
- Dùng thống nhất các thuật ngữ: lượt hợp lệ, lượt bị loại, ngân sách, phiên bản cấu hình, trừ tiền tạm thời, số liệu đã chốt.
- Không dùng thuật ngữ mơ hồ thay thế gây hiểu sai.

### 19.2 Kiểm tra trạng thái
- Đúng 10 trạng thái chiến dịch chuẩn.
- Không đưa thêm trạng thái ngoài TL02 vào giao diện nghiệp vụ.
- Bị từ chối dùng đúng tên `bị từ chối`, không dùng `từ chối` để chỉ trạng thái chiến dịch.

### 19.3 Kiểm tra phân quyền
- R10, R30, R40 đúng vai trò.
- Không cấp quyền chỉnh trạng thái cho R40.
- Mọi can thiệp ngoại lệ của R30 có lý do và nhật ký.

### 19.4 Kiểm tra tài chính
- Có chốt nguyên tắc chống lặp an toàn cho trừ tiền.
- Có chốt không trừ vượt ngân sách.
- Có chốt số liệu tạm thời và đã chốt.

### 19.5 Kiểm tra liên kết tài liệu
- Truy vết đủ NV24 đến NV31.
- Nêu rõ đầu vào cho TL13 và TL15.
- Không mâu thuẫn với TL08 và TL09 về nguyên tắc sổ cái.

---

## 20. Kết luận và đề xuất tài liệu ưu tiên tiếp theo

TL10 đã khóa **vòng đời chiến dịch tính theo lượt** và **quy tắc trừ tiền theo lượt hợp lệ** ở mức nghiệp vụ đủ chi tiết để làm nền cho mô hình dữ liệu, giao diện lập trình và màn hình.

### Đề xuất tài liệu ưu tiên tiếp theo

**TL11 — Đặc tả quy trình rút gọn liên kết và tính doanh thu nhà xuất bản**

Lý do ưu tiên:
- Hoàn thiện nửa còn lại của lõi tính tiền theo lượt ở phía nhà xuất bản.
- Tạo cặp quy trình đối xứng với TL10 để chuẩn bị làm TL13 và TL15 đồng bộ.
- Giảm rủi ro mâu thuẫn định nghĩa sự kiện lượt, trạng thái hợp lệ và bút toán đối soát giữa hai phía.

