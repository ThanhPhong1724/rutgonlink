# TL24 — Kế hoạch triển khai phiên bản đầu và lộ trình bàn giao

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL24
- **Tên tài liệu:** Kế hoạch triển khai phiên bản đầu và lộ trình bàn giao
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22, TL23
- **Tài liệu đầu ra phụ thuộc:** kế hoạch thực thi theo tuần, danh sách công việc triển khai chi tiết, lịch đào tạo vận hành, biên bản bàn giao nội bộ, biên bản nghiệm thu phiên bản đầu

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL24 quy định kế hoạch triển khai phiên bản đầu và lộ trình bàn giao ở mức đủ chi tiết để đội phát triển, đội kiểm thử, đội vận hành, đội hỗ trợ và trợ lý lập trình có thể phối hợp thực hiện thống nhất, gồm:

- xác định rõ phạm vi phiên bản đầu cần đưa vào vận hành
- xác định thứ tự triển khai theo giai đoạn và điều kiện mở từng nhóm tính năng
- xác định dữ liệu cần chuẩn bị cho kiểm thử chấp nhận và vận hành thật
- xác định kế hoạch đào tạo và chuyển giao cho R30, R40 và đội vận hành kỹ thuật theo TL22
- xác định tiêu chí nghiệm thu nội bộ và nghiệm thu cuối cho phiên bản đầu
- xác định kế hoạch theo dõi sau mở dịch vụ và xử lý tồn đọng sau phát hành

## 2.2 Phạm vi TL24

Trong phạm vi:

- phạm vi chức năng phiên bản đầu theo TL02, TL08 đến TL12
- điều kiện sẵn sàng môi trường theo TL22
- điều kiện sẵn sàng dữ liệu và cấu hình theo TL13, TL17
- điều kiện sẵn sàng giám sát, cảnh báo, bảo mật theo TL18, TL19
- kế hoạch kiểm thử chấp nhận và mở dịch vụ theo TL21
- kế hoạch đào tạo sử dụng màn hình theo TL20
- kế hoạch bàn giao tài liệu, cấu hình, quy trình, nhật ký và quyền vận hành

Ngoài phạm vi:

- lộ trình sản phẩm dài hạn sau phiên bản đầu ngoài mức định hướng
- kế hoạch mở rộng quy mô hạ tầng lớn
- tích hợp cổng thanh toán tự động và rút tự động
- chính sách pháp lý chi tiết theo từng quốc gia (đã tách ở TL23 ở mức hiển thị và tuân thủ nội dung)

## 2.3 Nguyên tắc triển khai phiên bản đầu

- **Ưu tiên tính đúng nghiệp vụ và an toàn tiền trước khi tối ưu tốc độ hoặc giao diện.**
- **Triển khai theo giai đoạn, có tiêu chí mở và tiêu chí dừng rõ ràng.**
- **Không mở rộng phạm vi giữa chừng nếu chưa kiểm soát được rủi ro của phạm vi đã chốt.**
- **Mọi thay đổi trong giai đoạn triển khai phải truy vết được theo TL17, TL18, TL22.**
- **Phải có phương án quay lui hoặc tạm dừng có kiểm soát cho từng mốc quan trọng.**
- **Bàn giao phải đi kèm kiểm tra thực tế, không chỉ bàn giao tài liệu.**

---

## 3. Chuẩn hóa tên gọi, giả định và mối liên hệ tài liệu

## 3.1 Tên chuẩn TL24

- **TL24:** Kế hoạch triển khai phiên bản đầu và lộ trình bàn giao

TL24 là lớp tài liệu chuyển từ “đặc tả” sang “thực thi có kiểm soát”, kế thừa:

- nghiệp vụ lõi: TL02, TL08 đến TL12
- dữ liệu và giao diện lập trình: TL13, TL15, TL16
- cấu hình, giám sát, an toàn, vận hành: TL17 đến TL19, TL22
- màn hình và kiểm thử chấp nhận: TL20, TL21
- nội dung hiển thị và tuân thủ: TL23

## 3.2 Giả định triển khai phiên bản đầu

TL24 được xây dựng trên các giả định đã chốt với người dùng dự án:

- mô hình hợp lệ theo hướng nền tảng rút gọn liên kết kiếm tiền cho người bán lưu lượng và nền tảng quản lý chiến dịch quảng bá hợp lệ cho người mua lưu lượng
- nạp và rút tiền phiên bản đầu theo quy trình thủ công
- có hỗ trợ hiển thị thông tin ngân hàng và vị trí hiển thị thông tin tài sản số để nạp, rút thủ công
- tính tiền theo lượt hợp lệ
- phạm vi phục vụ gồm Việt Nam và nước ngoài
- giao diện song ngữ Việt và Anh
- mức giống giao diện theo hướng giữ bố cục, luồng và danh sách màn hình tương đương chức năng; chi tiết giao diện có thể điều chỉnh hợp lý

## 3.3 Quy tắc xử lý mâu thuẫn

Nếu có mâu thuẫn giữa TL24 và tài liệu trước:

1. Ưu tiên TL02, TL08 đến TL13 (nghiệp vụ và dữ liệu)
2. Sau đó TL14, TL15, TL16 (chuẩn trạng thái, giao diện lập trình, xử lý nền)
3. Sau đó TL17 đến TL19, TL22 (cấu hình, giám sát, an toàn, vận hành)
4. Sau đó TL20, TL21, TL23 (màn hình, kiểm thử, nội dung hiển thị)
5. TL24 phải được cập nhật lại để phản ánh đúng nguồn gốc

---

## 4. Phạm vi phiên bản đầu và phạm vi chưa mở

## 4.1 Phạm vi phiên bản đầu bắt buộc

Phiên bản đầu phải có đầy đủ và hoạt động ổn định các nhóm chức năng sau:

### Nhóm A — Tài khoản, xác thực, phân quyền
- đăng ký, đăng nhập, đăng xuất
- quản lý hồ sơ cơ bản
- phân quyền theo TL03 cho R10, R20, R30, R40
- nhật ký truy vết thao tác phù hợp theo TL18 và TL19

### Nhóm B — Ví, sổ cái và quy trình nạp thủ công
- tạo hóa đơn nạp
- hiển thị thông tin thanh toán theo hóa đơn
- tải chứng từ
- duyệt, từ chối nạp
- cộng số dư theo quy trình TL08
- truy vết và đối chiếu sau thao tác nhạy cảm

### Nhóm C — Quy trình rút thủ công
- tạo yêu cầu rút
- kiểm tra điều kiện rút
- xử lý chờ duyệt, duyệt, từ chối, hoàn tiền, hoàn thành
- cập nhật số dư, số dư khóa tạm và sổ cái theo TL09
- lưu bằng chứng xử lý theo quyền

### Nhóm D — Chiến dịch quảng bá cho R10
- tạo và chỉnh sửa chiến dịch
- gửi duyệt, duyệt hoặc từ chối chiến dịch
- quản lý ngân sách theo lượt
- xem số liệu tạm thời và đã chốt theo TL16
- ghi nhận trạng thái và lý do theo TL14

### Nhóm E — Liên kết rút gọn và doanh thu cho R20
- tạo liên kết rút gọn
- quản lý trạng thái liên kết
- cổng công khai chuyển hướng R01
- ghi nhận sự kiện truy cập
- hiển thị doanh thu tạm thời và đã chốt theo TL11, TL16

### Nhóm F — Chống gian lận và định nghĩa lượt hợp lệ
- đánh giá lượt hợp lệ theo TL12
- đưa vào hàng kiểm tra thủ công khi cần
- màn hình xử lý kiểm tra thủ công cho R30 (và tra cứu giới hạn cho R40)
- truy vết quyết định và tác động dữ liệu

### Nhóm G — Đối soát, kết chuyển và điều chỉnh sau chốt
- kiểm tra điều kiện trước chốt
- chốt đối soát theo kỳ
- kết chuyển doanh thu
- ghi nhận điều chỉnh sau chốt theo quy trình TL16
- chống xử lý trùng

### Nhóm H — Cấu hình, giám sát, cảnh báo, nhật ký
- cấu hình nghiệp vụ và tham số theo TL17
- bảng giám sát, cảnh báo theo TL18
- nhật ký kiểm toán và truy vết thao tác
- vận hành theo TL22

### Nhóm I — Nội dung tuân thủ và hiển thị
- điều khoản sử dụng, quyền riêng tư
- cảnh báo nạp, rút, số liệu tạm thời, bảo trì
- quản lý phiên bản nội dung hiển thị theo TL23

## 4.2 Phạm vi nên có nếu không làm tăng rủi ro phát hành

- mẫu thông báo bảo trì và sự cố sẵn trong cổng quản trị
- bộ lọc và tra cứu nâng cao ở một số màn hình quản trị
- báo cáo tổng hợp ngày cho R30
- xuất dữ liệu cơ bản có che dữ liệu nhạy cảm theo TL19

## 4.3 Phạm vi chưa mở trong phiên bản đầu

Các hạng mục dưới đây ghi nhận là tồn đọng kế hoạch sau phiên bản đầu, không được chen vào giai đoạn cuối nếu chưa đánh giá:

- nạp tự động và đối soát tự động với cổng thanh toán
- rút tự động
- thuật toán tối ưu nâng cao ngoài phạm vi TL12
- mở rộng vùng dữ liệu lớn và tối ưu hiệu năng quy mô cao
- tích hợp kênh thông báo ngoài nền tảng ở phạm vi rộng
- phân tích nâng cao và báo cáo chuyên sâu cho người dùng cuối

---

## 5. Kế hoạch triển khai theo giai đoạn

## 5.1 Tổng quan các giai đoạn

TL24 chia triển khai phiên bản đầu thành 7 giai đoạn để giảm rủi ro:

- **GĐ0 — Khóa phạm vi và chuẩn bị triển khai**
- **GĐ1 — Hoàn thiện lõi dữ liệu và dịch vụ nền**
- **GĐ2 — Hoàn thiện giao diện và luồng nghiệp vụ đầu cuối**
- **GĐ3 — Kiểm thử tích hợp và kiểm thử chấp nhận**
- **GĐ4 — Chuẩn bị vận hành, đào tạo và diễn tập**
- **GĐ5 — Phát hành giới hạn và theo dõi tăng cường**
- **GĐ6 — Mở rộng sử dụng phiên bản đầu và bàn giao chính thức**

## 5.2 GĐ0 — Khóa phạm vi và chuẩn bị triển khai

### Mục tiêu
Khóa rõ “làm gì” và “không làm gì” cho phiên bản đầu, tránh trượt phạm vi.

### Đầu vào
- TL01 đến TL24
- danh sách tồn đọng chức năng
- quyết định chốt phạm vi phiên bản đầu

### Công việc chính
- chốt danh sách chức năng thuộc phạm vi phiên bản đầu
- chốt danh sách chức năng chưa mở
- chốt thứ tự ưu tiên triển khai
- chốt tiêu chí hoàn thành từng nhóm chức năng
- chốt ma trận người chịu trách nhiệm theo nhóm
- chốt kế hoạch quản lý thay đổi trong giai đoạn triển khai

### Đầu ra
- danh sách phạm vi phiên bản đầu đã khóa
- danh sách tồn đọng sau phiên bản đầu
- bảng kế hoạch giai đoạn và mốc kiểm tra nội bộ

### Điều kiện chuyển giai đoạn
- không còn mục phạm vi mơ hồ ảnh hưởng luồng lõi
- tất cả nhóm đã hiểu thống nhất tiêu chí hoàn thành
- có người phụ trách rõ cho từng nhóm

## 5.3 GĐ1 — Hoàn thiện lõi dữ liệu và dịch vụ nền

### Mục tiêu
Đảm bảo nền dữ liệu, giao diện lập trình và xử lý nền bám đúng TL13, TL15, TL16.

### Công việc chính
- hoàn thiện mô hình dữ liệu, ràng buộc và chỉ mục theo TL13
- hoàn thiện giao diện lập trình phiên bản đầu theo TL15
- hoàn thiện xử lý nền và hàng đợi theo TL16
- cài đặt mã trạng thái, mã lỗi dùng chung theo TL14
- cài đặt cấu hình khởi tạo theo TL17
- cài đặt ghi nhật ký, chỉ số, cảnh báo nền tảng theo TL18
- cài đặt lớp an toàn hệ thống tối thiểu theo TL19

### Đầu ra
- bản triển khai kỹ thuật lõi dùng được trên môi trường kiểm thử tích hợp
- bộ dữ liệu khởi tạo danh mục dùng chung
- nhật ký và chỉ số tối thiểu có dữ liệu

### Điều kiện chuyển giai đoạn
- các đường xử lý lõi khởi chạy được
- tác vụ nền trọng yếu chạy được và có truy vết
- không còn lỗi dữ liệu chặn luồng chính

## 5.4 GĐ2 — Hoàn thiện giao diện và luồng nghiệp vụ đầu cuối

### Mục tiêu
Kết nối giao diện theo TL20 với dịch vụ nền để hình thành luồng đầu cuối cho R10, R20, R30, R40 và R01.

### Công việc chính
- hoàn thiện các màn hình ưu tiên P0 theo TL20
- gắn nội dung tuân thủ, cảnh báo, xác nhận theo TL23
- hoàn thiện luồng nạp tiền thủ công
- hoàn thiện luồng rút tiền thủ công
- hoàn thiện luồng chiến dịch
- hoàn thiện luồng liên kết rút gọn và cổng công khai
- hoàn thiện luồng kiểm tra thủ công và chống gian lận
- hoàn thiện luồng đối soát và kết chuyển ở cổng quản trị
- hoàn thiện luồng cấu hình, nhật ký, giám sát, cảnh báo

### Đầu ra
- phiên bản chức năng đầu cuối chạy được trên môi trường kiểm thử tích hợp
- bộ nội dung hiển thị song ngữ phiên bản đầu
- danh sách chênh lệch giao diện so với bản tham chiếu được chấp nhận

### Điều kiện chuyển giai đoạn
- luồng P0 chạy thông suốt ở mức nghiệp vụ
- không còn lỗi chặn thao tác tài chính, đối soát, cổng công khai
- nội dung cảnh báo bắt buộc đã gắn đúng vị trí

## 5.5 GĐ3 — Kiểm thử tích hợp và kiểm thử chấp nhận

### Mục tiêu
Xác nhận hệ thống đạt tiêu chí theo TL21 trước khi cho phép chuẩn bị phát hành.

### Công việc chính
- chạy kiểm thử tích hợp theo nhóm luồng
- chạy kiểm thử chấp nhận theo TL21
- kiểm thử hồi quy trọng yếu
- kiểm thử quyền và phân quyền theo TL03
- kiểm thử nhật ký, giám sát, cảnh báo theo TL18
- kiểm thử an toàn hiển thị và che dữ liệu theo TL19, TL23
- ghi nhận lỗi và phân loại mức độ
- sửa lỗi và kiểm thử lại theo vòng

### Đầu ra
- kết quả kiểm thử chấp nhận
- danh sách lỗi còn tồn và quyết định xử lý
- biên bản sẵn sàng chuẩn bị phát hành hoặc biên bản chưa đạt

### Điều kiện chuyển giai đoạn
- đạt tiêu chí tối thiểu của TL21 hoặc có phê duyệt ngoại lệ bằng biên bản
- không còn lỗi mức rất cao hoặc cao ảnh hưởng luồng lõi
- có danh sách rủi ro còn lại và cách theo dõi sau phát hành

## 5.6 GĐ4 — Chuẩn bị vận hành, đào tạo và diễn tập

### Mục tiêu
Bảo đảm đội vận hành và hỗ trợ có thể tiếp nhận hệ thống theo TL22 trước khi mở dịch vụ.

### Công việc chính
- cấu hình môi trường phát hành theo TL22
- kiểm tra sao lưu và khôi phục thử theo TL22
- kiểm tra nhật ký, chỉ số, cảnh báo và kênh cảnh báo theo TL18
- kiểm tra bí mật hệ thống, quyền truy cập theo TL19
- đào tạo R30, R40 theo kịch bản màn hình TL20
- đào tạo đội vận hành kỹ thuật theo TL22
- diễn tập ít nhất một kịch bản sự cố trọng yếu
- rà soát nội dung công khai và thông báo bảo trì theo TL23

### Đầu ra
- biên bản sẵn sàng vận hành
- danh sách người được đào tạo và kết quả kiểm tra
- biên bản diễn tập sự cố
- bộ mẫu thông báo bảo trì và sự cố đã sẵn sàng

### Điều kiện chuyển giai đoạn
- đội vận hành thực hiện được tác vụ cơ bản không cần hỗ trợ trực tiếp từ đội phát triển
- sao lưu và khôi phục thử đạt yêu cầu
- cảnh báo và nhật ký hoạt động ổn định
- tài liệu bàn giao tối thiểu đã đầy đủ

## 5.7 GĐ5 — Phát hành giới hạn và theo dõi tăng cường

### Mục tiêu
Mở dịch vụ ở phạm vi kiểm soát được để quan sát dữ liệu thật và hành vi vận hành.

### Phạm vi mở đề xuất
- mở cho nhóm người dùng hạn chế hoặc vận hành nội bộ trước
- giới hạn số lượng chiến dịch hoạt động đồng thời nếu cần
- giới hạn số lượng liên kết hoặc mức ngân sách trong giai đoạn đầu nếu chính sách vận hành yêu cầu

### Công việc chính
- phát hành theo quy trình TL22
- kiểm tra sau phát hành theo bộ ca hồi quy rút gọn TL21
- theo dõi tăng cường:
  - cổng công khai
  - hàng đợi sự kiện
  - nạp, rút thủ công
  - số liệu tạm thời
  - cảnh báo chống gian lận
- ghi nhận phản hồi R30, R40, người dùng thí điểm
- xử lý lỗi và điều chỉnh cấu hình rủi ro thấp hoặc trung bình có kiểm soát

### Đầu ra
- báo cáo theo dõi sau phát hành giới hạn
- danh sách lỗi và cải tiến ưu tiên cao
- quyết định mở rộng hoặc giữ giới hạn

### Điều kiện chuyển giai đoạn
- hệ thống ổn định theo chỉ tiêu đã đặt
- không có sự cố S1, S2 chưa xử lý dứt điểm
- quy trình tài chính thủ công và đối soát vận hành trơn tru trong ít nhất một chu kỳ quan sát phù hợp

## 5.8 GĐ6 — Mở rộng sử dụng phiên bản đầu và bàn giao chính thức

### Mục tiêu
Mở phiên bản đầu theo phạm vi chốt và hoàn tất bàn giao chính thức cho vận hành.

### Công việc chính
- mở rộng phạm vi sử dụng theo quyết định sau GĐ5
- bàn giao chính thức tài liệu, cấu hình, quyền, quy trình
- bàn giao danh sách tồn đọng sau phiên bản đầu
- chốt cơ chế hỗ trợ sau bàn giao
- chốt mốc rà soát sau 1 chu kỳ đối soát đầu tiên

### Đầu ra
- biên bản bàn giao chính thức
- biên bản nghiệm thu phiên bản đầu
- danh sách tồn đọng và kế hoạch xử lý sau phiên bản đầu
- kế hoạch theo dõi sau bàn giao

### Điều kiện hoàn tất TL24
- có nghiệm thu nội bộ và nghiệm thu cuối
- có biên bản bàn giao chính thức
- có danh sách rủi ro tồn đọng và người theo dõi

---

## 6. Tiêu chí mở từng nhóm tính năng và cơ chế mở theo giai đoạn

## 6.1 Nguyên tắc mở tính năng

- Không mở theo “cảm giác đã ổn”.
- Mỗi nhóm tính năng phải có:
  - điều kiện kỹ thuật
  - điều kiện nghiệp vụ
  - điều kiện vận hành
  - điều kiện giám sát
- Nếu chưa đủ điều kiện, giữ trạng thái khóa hoặc giới hạn sử dụng.

## 6.2 Nhóm mở bắt buộc trước tiên

Thứ tự mở đề xuất:

1. đăng nhập, phân quyền, hồ sơ cơ bản
2. cấu hình và danh mục nền
3. nạp tiền thủ công
4. rút tiền thủ công
5. chiến dịch và liên kết rút gọn
6. cổng công khai chuyển hướng + ghi nhận sự kiện
7. chống gian lận và kiểm tra thủ công
8. thống kê gần thực
9. đối soát và kết chuyển
10. mở rộng báo cáo và tiện ích phụ

## 6.3 Tiêu chí mở cho quy trình nạp tiền thủ công

Bắt buộc có:

- luồng tạo hóa đơn hoạt động ổn định
- trạng thái hóa đơn hiển thị đúng TL14
- duyệt, từ chối nạp cập nhật ví và sổ cái đúng TL08, TL13
- nhật ký kiểm toán thao tác duyệt có truy vết
- cảnh báo thanh toán hiển thị đúng TL23
- có hàng chờ quản trị và lọc cơ bản theo TL20
- có ca kiểm thử chấp nhận đạt theo TL21
- có quy trình vận hành hàng chờ theo TL22

## 6.4 Tiêu chí mở cho quy trình rút tiền thủ công

Bắt buộc có:

- kiểm tra điều kiện rút và số dư khóa tạm đúng TL09
- phân biệt rõ trạng thái từ chối, hoàn tiền, hoàn thành
- đối chiếu tác động sổ cái sau thao tác nhạy cảm
- cảnh báo sai thông tin nhận tiền, sai mạng hiển thị đúng TL23
- nhật ký và quyền thao tác đúng TL03, TL18, TL19
- ca kiểm thử chấp nhận đạt theo TL21
- đội vận hành hiểu rõ quy trình xử lý hàng chờ theo TL22

## 6.5 Tiêu chí mở cho cổng công khai chuyển hướng và ghi nhận sự kiện

Bắt buộc có:

- cổng công khai phản hồi ổn định
- ghi nhận sự kiện có truy vết theo TL16
- trạng thái liên kết công khai hiển thị đúng TL14, TL20
- trang lỗi và trang cảnh báo công khai đúng TL23
- giám sát chỉ số cổng công khai và hàng đợi sự kiện theo TL18
- có kịch bản xử lý sự cố cổng công khai theo TL22

## 6.6 Tiêu chí mở cho đối soát và kết chuyển

Bắt buộc có:

- chốt đối soát chạy được trên dữ liệu thử
- chống chạy trùng hoạt động
- kết chuyển tạo bút toán đúng quy tắc
- có biên bản đối soát mẫu và kiểm tra chéo theo TL22
- có quyền thao tác và xác nhận nhiều bước theo TL03, TL20
- có kịch bản quay lui hoặc xử lý lỗi tác vụ theo TL22
- đã diễn tập ít nhất một lần trên môi trường kiểm thử chấp nhận

---

## 7. Kế hoạch chuẩn bị dữ liệu và cấu hình theo giai đoạn

## 7.1 Mục tiêu

Bảo đảm dữ liệu và cấu hình đủ để phát triển, kiểm thử, đào tạo và vận hành mà không làm lẫn dữ liệu giữa các môi trường.

## 7.2 Dữ liệu cần chuẩn bị cho môi trường kiểm thử tích hợp

- dữ liệu danh mục dùng chung
- tài khoản mẫu cho R10, R20, R30, R40
- dữ liệu chiến dịch mẫu
- dữ liệu liên kết mẫu ở nhiều trạng thái
- dữ liệu hóa đơn nạp và yêu cầu rút mẫu
- dữ liệu sự kiện mẫu và tình huống bất thường mẫu
- dữ liệu đối soát mẫu cho ít nhất một chu kỳ
- nội dung hiển thị song ngữ mẫu theo TL23

Yêu cầu:
- không dùng dữ liệu thật
- có thể nạp lại nhiều lần
- có tình huống biên cho kiểm thử

## 7.3 Dữ liệu cần chuẩn bị cho môi trường kiểm thử chấp nhận

- bộ dữ liệu gần thực hơn về cấu trúc và khối lượng
- danh sách ca kiểm thử gắn dữ liệu tương ứng theo TL21
- dữ liệu mô phỏng cho nạp, rút thủ công và bằng chứng tệp
- dữ liệu mô phỏng sự cố và cảnh báo để kiểm tra màn hình vận hành

Yêu cầu:
- dữ liệu phải ổn định theo phiên bản kiểm thử
- thay đổi dữ liệu phải có ghi nhận để tránh sai lệch kết quả kiểm thử

## 7.4 Cấu hình khởi tạo phiên bản đầu

Theo TL17, phải chuẩn bị bộ cấu hình khởi tạo gồm:

- cấu hình phương thức nạp và rút đang mở
- ngưỡng và điều kiện nạp, rút
- cấu hình tham số chống gian lận ở mức phiên bản đầu
- cấu hình chu kỳ đối soát
- cấu hình cảnh báo và ngưỡng giám sát
- cấu hình nội dung tuân thủ, phiên bản, hiệu lực
- cấu hình bật hoặc khóa các nhóm tính năng theo giai đoạn

## 7.5 Quy trình duyệt cấu hình trước mở dịch vụ

1. Chuẩn bị bảng cấu hình dự kiến
2. Rà soát nghiệp vụ và tác động tài chính
3. Rà soát vận hành và giám sát
4. Rà soát bảo mật và quyền truy cập
5. Phê duyệt cấu hình
6. Áp dụng cấu hình
7. Kiểm tra sau áp dụng
8. Lưu dấu cấu hình hiệu lực

---

## 8. Kế hoạch kiểm thử, nghiệm thu nội bộ và nghiệm thu cuối

## 8.1 Mối liên hệ với TL21

TL24 không thay thế TL21. TL24 quy định mốc nào phải chạy bộ kiểm thử nào và tiêu chí để ra quyết định chuyển giai đoạn.

## 8.2 Mốc kiểm thử bắt buộc theo giai đoạn

### Cuối GĐ2
- kiểm thử liên thông luồng P0
- kiểm thử quyền và phân quyền cơ bản
- kiểm thử trạng thái và mã lỗi hiển thị

### Trong GĐ3
- chạy đầy đủ bộ kiểm thử chấp nhận theo TL21
- chạy hồi quy trọng yếu sau mỗi vòng sửa lỗi lớn
- kiểm thử nội dung hiển thị tuân thủ theo TL23
- kiểm thử vận hành màn hình quản trị theo TL20
- kiểm thử nhật ký, cảnh báo, truy vết theo TL18

### Trước GĐ5
- chạy bộ kiểm tra sau phát hành giả lập
- kiểm thử quay lui ở mức phù hợp
- kiểm thử sao lưu và khôi phục thử theo TL22

## 8.3 Tiêu chí nghiệm thu nội bộ

Nghiệm thu nội bộ đạt khi:

- phạm vi phiên bản đầu đã chốt ở TL24 được triển khai đủ
- các ca kiểm thử chấp nhận trọng yếu đạt
- lỗi còn tồn đều được phân loại và có quyết định xử lý rõ
- tài liệu vận hành, bảo trì, ứng cứu sự cố sẵn sàng
- nội dung tuân thủ và cảnh báo hiển thị đúng vị trí và ngôn ngữ
- đội vận hành và hỗ trợ đã được đào tạo tối thiểu

## 8.4 Tiêu chí nghiệm thu cuối phiên bản đầu

Nghiệm thu cuối đạt khi:

- hệ thống đã chạy giai đoạn phát hành giới hạn ổn định
- không còn lỗi chặn luồng lõi chưa xử lý
- ít nhất một chu kỳ đối soát vận hành đúng quy trình hoặc đã có bằng chứng chạy thử đạt yêu cầu nếu chưa đến kỳ thật
- biên bản bàn giao và phân quyền vận hành đã hoàn tất
- kế hoạch hỗ trợ sau bàn giao đã chốt

---

## 9. Kế hoạch đào tạo, chuyển giao kiến thức và thực hành

## 9.1 Mục tiêu

Bảo đảm các vai trò vận hành và hỗ trợ dùng được hệ thống đúng quy trình, hiểu rủi ro và biết cách phối hợp khi có sự cố.

## 9.2 Nhóm đối tượng đào tạo

- **R30**: quản trị nghiệp vụ và xử lý phê duyệt
- **R40**: hỗ trợ, tra cứu và phối hợp xử lý
- **Đội vận hành kỹ thuật** theo TL22
- **Đội kiểm thử và hỗ trợ sau bàn giao** (nếu khác người)

## 9.3 Nội dung đào tạo theo nhóm

### Đào tạo cho R30
- luồng duyệt nạp và rút
- duyệt chiến dịch
- xử lý kiểm tra thủ công sự kiện
- chốt đối soát và kết chuyển
- cấu hình nghiệp vụ và nội dung tuân thủ
- cách đọc cảnh báo, nhật ký, màn hình giám sát
- quy tắc thao tác nhạy cảm và truy vết

### Đào tạo cho R40
- tra cứu hóa đơn nạp, yêu cầu rút, chiến dịch, liên kết
- phân biệt trạng thái và lý do ở mức hỗ trợ
- quy tắc phản hồi người dùng theo TL23
- cách ghi nhận và chuyển sự cố cho R30 hoặc đội vận hành
- giới hạn quyền và thông tin không được công bố

### Đào tạo cho đội vận hành kỹ thuật
- quy trình phát hành và quay lui theo TL22
- giám sát, cảnh báo, nhật ký
- xử lý hàng đợi, tác vụ nền
- sao lưu, khôi phục, diễn tập
- ứng cứu sự cố theo kịch bản
- phối hợp truyền thông tình trạng dịch vụ theo TL22, TL23

## 9.4 Hình thức đào tạo và kiểm tra sau đào tạo

- đào tạo theo kịch bản thao tác thực tế trên môi trường kiểm thử chấp nhận
- có bài thực hành tối thiểu cho từng vai trò
- có danh sách lỗi thao tác thường gặp và cách tránh
- ghi nhận kết quả hoàn thành đào tạo
- đào tạo lại khi có thay đổi trọng yếu sau phát hành

## 9.5 Tài liệu và công cụ phải bàn giao khi đào tạo

- TL20, TL21, TL22, TL23, TL24
- hướng dẫn thao tác theo vai trò
- danh sách mã trạng thái và mã lỗi thường gặp theo TL14
- mẫu biên bản vận hành, biên bản sự cố, biên bản đối soát
- danh sách liên hệ phối hợp khi sự cố

---

## 10. Kế hoạch phát hành giới hạn, theo dõi tăng cường và hỗ trợ sau mở dịch vụ

## 10.1 Mục tiêu

Giảm rủi ro khi đưa dữ liệu thật và người dùng thật vào hệ thống bằng cách theo dõi chặt trong giai đoạn đầu.

## 10.2 Thời gian theo dõi tăng cường

Thời gian cụ thể do đội dự án chốt, nhưng TL24 yêu cầu phải có một giai đoạn theo dõi tăng cường đủ bao phủ:

- hoạt động nạp tiền thủ công
- hoạt động rút tiền thủ công
- ghi nhận sự kiện và xử lý nền
- ít nhất một chu kỳ giám sát vận hành đầy đủ
- chuẩn bị hoặc thực hiện kỳ đối soát gần nhất

## 10.3 Danh mục theo dõi tăng cường bắt buộc

- tỷ lệ lỗi cổng công khai và thời gian phản hồi
- độ trễ hàng đợi ghi nhận sự kiện
- số sự kiện bị gắn cờ tăng bất thường
- hàng chờ nạp và rút bị treo
- sai lệch đối chiếu ví và sổ cái
- lỗi tác vụ đối soát, kết chuyển
- lỗi phân quyền và lỗi thao tác nhạy cảm
- cảnh báo bảo mật và đăng nhập bất thường
- phản hồi người dùng về hiểu nhầm trạng thái và số liệu

## 10.4 Cơ chế phân loại và xử lý vấn đề sau mở dịch vụ

### Vấn đề loại A — Chặn luồng lõi
- xử lý ngay theo quy trình sự cố TL22
- có thể tạm dừng hoặc giới hạn tính năng

### Vấn đề loại B — Sai số liệu hoặc rủi ro tài chính
- ưu tiên điều tra và đối chiếu
- đóng băng thao tác liên quan nếu cần
- không xử lý tắt không có biên bản

### Vấn đề loại C — Sai nội dung hiển thị hoặc gây hiểu nhầm
- ưu tiên cập nhật nội dung theo TL23
- kiểm tra tác động song ngữ
- ghi phiên bản và hiệu lực thay đổi

### Vấn đề loại D — Cải tiến trải nghiệm không chặn
- đưa vào tồn đọng sau phiên bản đầu
- xếp mức ưu tiên theo ảnh hưởng thực tế

## 10.5 Cơ chế hỗ trợ sau bàn giao

- xác định đầu mối hỗ trợ kỹ thuật trong giai đoạn đầu
- xác định thời gian trực tăng cường sau phát hành
- xác định kênh báo lỗi nội bộ
- xác định quy trình chuyển giao từ hỗ trợ sang vận hành sự cố
- xác định mốc kết thúc hỗ trợ tăng cường và chuyển sang vận hành thường kỳ

---

## 11. Kế hoạch bàn giao chính thức

## 11.1 Mục tiêu bàn giao

Chuyển trạng thái từ “đội phát triển giữ chính” sang “đội vận hành và quản trị vận hành theo quy trình”, trong khi vẫn giữ kênh hỗ trợ cần thiết.

## 11.2 Danh mục bàn giao bắt buộc

### A. Bàn giao tài liệu
- TL01 đến TL24
- hướng dẫn thao tác theo vai trò
- sổ tay vận hành chi tiết theo môi trường (nếu đã tách từ TL22)
- mẫu biên bản vận hành, sự cố, đối soát, thay đổi cấu hình
- danh sách tồn đọng và rủi ro đã biết

### B. Bàn giao cấu hình và tham số
- bộ cấu hình hiệu lực phiên bản đầu theo TL17
- lịch sử thay đổi cấu hình trong giai đoạn triển khai
- cấu hình cảnh báo và ngưỡng vận hành
- cấu hình nội dung tuân thủ và phiên bản nội dung

### C. Bàn giao quyền truy cập
- quyền hệ thống cho R30, R40 theo TL03
- quyền vận hành kỹ thuật theo TL22
- ma trận quyền truy cập môi trường và công cụ
- biên bản xác nhận người nhận quyền

### D. Bàn giao vận hành
- lịch tác vụ định kỳ
- lịch đối soát và kết chuyển
- quy trình ứng cứu sự cố
- quy trình bảo trì và phát hành
- quy trình sao lưu và khôi phục

### E. Bàn giao kiểm thử và theo dõi
- bộ ca hồi quy trọng yếu
- danh sách kiểm tra sau phát hành
- danh sách kiểm tra sau khôi phục
- danh sách chỉ số và cảnh báo bắt buộc

## 11.3 Điều kiện bàn giao chính thức

- tài liệu đầy đủ và phiên bản đã khóa
- người nhận bàn giao đã hoàn thành đào tạo tối thiểu
- đã thực hành thao tác trên môi trường phù hợp
- quyền truy cập đã cấp đúng và kiểm tra được
- biên bản bàn giao đã ký xác nhận hoặc được chấp thuận theo quy trình nội bộ

## 11.4 Nội dung biên bản bàn giao chính thức

Biên bản tối thiểu phải có:

- phạm vi bàn giao
- phiên bản hệ thống
- môi trường áp dụng
- danh sách tài liệu bàn giao
- danh sách quyền đã cấp
- danh sách tồn đọng và rủi ro còn lại
- trách nhiệm sau bàn giao của từng bên
- thời gian bắt đầu vận hành chính thức
- đầu mối hỗ trợ sau bàn giao

---

## 12. Ma trận trách nhiệm triển khai và bàn giao

## 12.1 Nhóm vai trò tham gia

TL24 dùng các nhóm vai trò để điều phối công việc (có thể ánh xạ sang người thực tế trong dự án):

- **TR01 — Quản lý dự án**
- **TR02 — Phân tích nghiệp vụ**
- **TR03 — Phát triển máy chủ**
- **TR04 — Phát triển giao diện**
- **TR05 — Phát triển xử lý nền và dữ liệu**
- **TR06 — Kiểm thử**
- **TR07 — Vận hành kỹ thuật**
- **TR08 — Quản trị nghiệp vụ vận hành (R30 đại diện)**
- **TR09 — Hỗ trợ vận hành (R40 đại diện)**
- **TR10 — An toàn hệ thống**
- **TR11 — Quản trị nội dung tuân thủ**

## 12.2 Phân công trách nhiệm theo giai đoạn

### GĐ0
- TR01: chủ trì khóa phạm vi
- TR02: rà soát nghiệp vụ và tiêu chí
- TR08: xác nhận quy trình nghiệp vụ thực thi
- TR07, TR10: nêu điều kiện vận hành tối thiểu

### GĐ1
- TR03, TR05: hoàn thiện dịch vụ nền, dữ liệu, tác vụ nền
- TR10: rà soát an toàn kỹ thuật
- TR07: rà soát vận hành và giám sát
- TR06: chuẩn bị kiểm thử tích hợp

### GĐ2
- TR04: hoàn thiện màn hình
- TR03, TR05: nối luồng và xử lý lỗi
- TR11: rà soát nội dung tuân thủ hiển thị
- TR08, TR09: kiểm tra tính dùng được theo vai trò

### GĐ3
- TR06: chủ trì kiểm thử
- TR03, TR04, TR05: sửa lỗi
- TR08, TR09: kiểm thử chấp nhận nghiệp vụ
- TR07, TR10: kiểm thử vận hành và an toàn

### GĐ4
- TR07: chủ trì chuẩn bị vận hành, diễn tập
- TR10: kiểm tra an toàn hệ thống
- TR08, TR09: tham gia đào tạo và thực hành
- TR11: rà soát nội dung bảo trì, sự cố
- TR01: chốt sẵn sàng phát hành

### GĐ5
- TR07: chủ trì phát hành theo TL22
- TR03, TR05: hỗ trợ kỹ thuật ngay sau phát hành
- TR06: kiểm tra nhanh sau phát hành
- TR08, TR09: vận hành thực tế có giám sát
- TR10: theo dõi cảnh báo an toàn
- TR01: điều phối quyết định mở rộng hay giữ giới hạn

### GĐ6
- TR01: chủ trì nghiệm thu và bàn giao
- TR07: tiếp nhận vận hành chính thức
- TR08, TR09: xác nhận tiếp nhận nghiệp vụ
- TR11: xác nhận nội dung hiển thị và quy trình cập nhật
- TR03, TR04, TR05: bàn giao tồn đọng kỹ thuật và hướng hỗ trợ sau bàn giao

---

## 13. Quản lý thay đổi, kiểm soát phạm vi và xử lý tồn đọng trong giai đoạn triển khai

## 13.1 Nguyên tắc kiểm soát phạm vi

- Mọi yêu cầu mới trong quá trình triển khai phải được phân loại:
  - bắt buộc để không vi phạm nghiệp vụ lõi
  - cần nhưng có thể dời sau phiên bản đầu
  - cải tiến trải nghiệm
- Không thêm yêu cầu mới vào giai đoạn cuối nếu chưa đánh giá ảnh hưởng đến kiểm thử, vận hành và phát hành.

## 13.2 Quy trình xử lý yêu cầu thay đổi trong giai đoạn triển khai

1. Ghi nhận yêu cầu thay đổi
2. Mô tả lý do và lợi ích
3. Đánh giá ảnh hưởng đến:
   - nghiệp vụ
   - dữ liệu
   - giao diện lập trình
   - giao diện
   - kiểm thử
   - vận hành
   - bảo mật
   - thời gian triển khai
4. Phân loại:
   - đưa vào phiên bản đầu
   - đưa vào tồn đọng sau phiên bản đầu
   - từ chối
5. Phê duyệt và cập nhật kế hoạch
6. Cập nhật tài liệu liên quan nếu thay đổi được chấp thuận

## 13.3 Danh sách tồn đọng sau phiên bản đầu

Danh sách tồn đọng phải được ghi và bàn giao, tối thiểu gồm:

- mã hạng mục
- mô tả
- lý do chưa đưa vào phiên bản đầu
- mức ưu tiên
- rủi ro nếu trì hoãn
- phụ thuộc kỹ thuật hoặc nghiệp vụ
- đề xuất giai đoạn xử lý sau phiên bản đầu

---

## 14. Rủi ro triển khai phiên bản đầu và biện pháp giảm thiểu

## 14.1 Nhóm rủi ro trọng yếu

### Rủi ro 1 — Trượt phạm vi
- **Mô tả:** thêm chức năng mới giữa giai đoạn kiểm thử hoặc phát hành
- **Tác động:** chậm tiến độ, giảm chất lượng kiểm thử
- **Giảm thiểu:** khóa phạm vi GĐ0, quy trình thay đổi theo mục 13

### Rủi ro 2 — Luồng tài chính thủ công thiếu ổn định
- **Mô tả:** duyệt nạp, duyệt rút, hoàn tiền xử lý sai trạng thái hoặc sai sổ cái
- **Tác động:** rủi ro tiền và khiếu nại cao
- **Giảm thiểu:** ưu tiên kiểm thử TL08, TL09, TL13; đối chiếu sau thao tác nhạy cảm; phát hành giới hạn

### Rủi ro 3 — Ghi nhận sự kiện và hàng đợi bị kẹt
- **Mô tả:** cổng công khai hoạt động nhưng sự kiện chậm xử lý
- **Tác động:** sai số liệu tạm thời, ảnh hưởng doanh thu và chiến dịch
- **Giảm thiểu:** giám sát theo TL18, quy trình xử lý tác vụ kẹt theo TL22, theo dõi tăng cường GĐ5

### Rủi ro 4 — Thiếu năng lực vận hành sau phát hành
- **Mô tả:** R30, R40 hoặc đội vận hành chưa thành thạo
- **Tác động:** xử lý chậm, thao tác sai, tăng khiếu nại
- **Giảm thiểu:** đào tạo và diễn tập GĐ4, kiểm tra sau đào tạo, tài liệu thao tác rõ ràng

### Rủi ro 5 — Nội dung hiển thị gây hiểu nhầm
- **Mô tả:** cảnh báo nạp, rút, số liệu tạm thời hoặc trạng thái hiển thị không rõ
- **Tác động:** người dùng thao tác sai, tranh chấp
- **Giảm thiểu:** rà soát TL23 theo nhóm màn hình TL20, kiểm thử nội dung song ngữ

### Rủi ro 6 — Thiếu giám sát và cảnh báo vận hành
- **Mô tả:** phát hành xong nhưng không phát hiện sớm lỗi tác vụ nền hoặc sai lệch
- **Tác động:** sự cố kéo dài
- **Giảm thiểu:** khóa điều kiện mở theo TL18, TL22; kiểm tra cảnh báo trước GĐ5

### Rủi ro 7 — Thiếu phương án quay lui thực tế
- **Mô tả:** có quy trình trên giấy nhưng chưa kiểm tra
- **Tác động:** phát hành lỗi khó phục hồi
- **Giảm thiểu:** diễn tập quay lui hoặc kiểm tra giả lập trước GĐ5

## 14.2 Cơ chế theo dõi rủi ro trong triển khai

- duy trì danh sách rủi ro theo giai đoạn
- họp rà soát rủi ro định kỳ trong giai đoạn GĐ3 đến GĐ5
- cập nhật mức rủi ro sau mỗi mốc kiểm thử hoặc phát hành
- gắn người theo dõi và thời hạn xử lý cho rủi ro mở

---

## 15. Chỉ tiêu đánh giá thành công phiên bản đầu sau bàn giao

## 15.1 Chỉ tiêu vận hành

- các luồng lõi hoạt động ổn định trong phạm vi phiên bản đầu
- số sự cố mức S1, S2 trong giai đoạn đầu ở mức chấp nhận theo mục tiêu nội bộ
- thời gian phản ứng sự cố và xử lý tác vụ kẹt đáp ứng quy trình TL22
- đối soát và kết chuyển thực hiện đúng quy trình, không xử lý trùng

## 15.2 Chỉ tiêu nghiệp vụ

- nạp tiền thủ công và rút tiền thủ công xử lý được theo hàng chờ
- trạng thái và số liệu hiển thị nhất quán giữa cổng người dùng và quản trị
- số liệu tạm thời và đã chốt được phân biệt rõ
- khiếu nại do hiểu nhầm trạng thái giảm dần sau khi áp dụng nội dung TL23

## 15.3 Chỉ tiêu bàn giao

- đội vận hành và hỗ trợ xử lý được tác vụ thường ngày mà không cần đội phát triển can thiệp trực tiếp
- tài liệu, biên bản, cấu hình và quyền bàn giao đầy đủ
- danh sách tồn đọng và kế hoạch sau phiên bản đầu được chấp thuận

---

## 16. Ma trận truy vết TL24 với các tài liệu trước

## 16.1 Truy vết theo nhóm nội dung

- **TL01** → tổng quan dự án, mục tiêu và kế hoạch tài liệu
- **TL02** → phạm vi nghiệp vụ phiên bản đầu và các luồng lõi
- **TL03** → vai trò và phân quyền, đối tượng đào tạo và bàn giao
- **TL08** → tiêu chí mở và kiểm thử luồng nạp tiền thủ công
- **TL09** → tiêu chí mở và kiểm thử luồng rút tiền thủ công
- **TL10** → triển khai luồng chiến dịch và số liệu chiến dịch
- **TL11** → triển khai liên kết rút gọn, cổng công khai, doanh thu nhà xuất bản
- **TL12** → chống gian lận, kiểm tra thủ công, giới hạn công bố chi tiết
- **TL13** → dữ liệu, sổ cái, đối chiếu, ràng buộc dữ liệu
- **TL14** → trạng thái, mã lỗi, danh mục mã dùng trong kiểm thử và vận hành
- **TL15** → giao diện lập trình phiên bản đầu và kiểm tra liên thông
- **TL16** → xử lý nền, ghi nhận sự kiện, tổng hợp, đối soát, kết chuyển
- **TL17** → cấu hình, hiệu lực, khóa hoặc mở tính năng, tham số vận hành
- **TL18** → giám sát, cảnh báo, nhật ký dùng trong theo dõi tăng cường
- **TL19** → an toàn hệ thống, che dữ liệu, quyền, bí mật hệ thống
- **TL20** → màn hình ưu tiên P0, đào tạo thao tác và tuân thủ hiển thị
- **TL21** → kế hoạch kiểm thử chấp nhận, hồi quy trọng yếu, tiêu chí chuyển giai đoạn
- **TL22** → phát hành, quay lui, vận hành, sao lưu, khôi phục, ứng cứu sự cố
- **TL23** → nội dung tuân thủ, cảnh báo, thông báo bảo trì và truyền thông người dùng

## 16.2 Truy vết theo mốc triển khai

- GĐ1 ↔ TL13, TL14, TL15, TL16, TL17, TL18, TL19
- GĐ2 ↔ TL08, TL09, TL10, TL11, TL12, TL20, TL23
- GĐ3 ↔ TL21, TL03, TL18, TL19
- GĐ4 ↔ TL22, TL18, TL19, TL20, TL23
- GĐ5 ↔ TL22, TL18, TL21, TL23
- GĐ6 ↔ TL22, TL24 và toàn bộ bộ tài liệu đã khóa

---

## 17. Tiêu chí chấp nhận tài liệu TL24

TL24 được xem là đạt khi:

- Có phạm vi phiên bản đầu rõ ràng và phạm vi chưa mở
- Có kế hoạch triển khai theo giai đoạn với đầu vào, đầu ra, điều kiện chuyển giai đoạn
- Có tiêu chí mở cho các nhóm tính năng lõi
- Có kế hoạch chuẩn bị dữ liệu và cấu hình theo giai đoạn
- Có kế hoạch kiểm thử, nghiệm thu nội bộ, nghiệm thu cuối gắn với TL21
- Có kế hoạch đào tạo và chuyển giao cho R30, R40, đội vận hành kỹ thuật
- Có kế hoạch phát hành giới hạn và theo dõi tăng cường
- Có kế hoạch bàn giao chính thức và danh mục bàn giao bắt buộc
- Có quản lý thay đổi, tồn đọng và rủi ro triển khai
- Truy vết nhất quán với TL01 đến TL23

---

## 18. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không thay đổi định hướng hợp lệ và phạm vi nền tảng đã chốt ở TL01, TL02
- [x] Không mâu thuẫn ma trận vai trò trong TL03
- [x] Ưu tiên đúng các luồng tài chính thủ công theo TL08, TL09
- [x] Bao phủ chiến dịch, liên kết, cổng công khai theo TL10, TL11
- [x] Có chỗ cho chống gian lận và kiểm tra thủ công theo TL12
- [x] Không bỏ qua ràng buộc dữ liệu, sổ cái, đối chiếu theo TL13
- [x] Dùng đúng khái niệm trạng thái và mã lỗi theo TL14
- [x] Bám giao diện lập trình và xử lý nền theo TL15, TL16
- [x] Bám vòng đời cấu hình và tham số theo TL17
- [x] Bám giám sát, nhật ký, cảnh báo theo TL18
- [x] Bám bảo mật, an toàn hệ thống theo TL19
- [x] Bám đặc tả màn hình và trải nghiệm theo TL20
- [x] Bám kế hoạch kiểm thử chấp nhận theo TL21
- [x] Bám quy trình vận hành, phát hành, ứng cứu sự cố theo TL22
- [x] Bám nội dung tuân thủ hiển thị và truyền thông theo TL23

---

## 19. Gợi ý tài liệu tiếp theo để chốt bộ hồ sơ triển khai

Sau TL24, bộ tài liệu đã đủ mạnh để đội phát triển và trợ lý lập trình triển khai phiên bản đầu. Nếu cần chốt sâu hơn cho thực thi, nên ưu tiên một trong các tài liệu sau:

### TL25 — Đặc tả kiến trúc kỹ thuật triển khai thực tế
- chốt lựa chọn công nghệ giao diện, máy chủ, cơ sở dữ liệu
- sơ đồ triển khai theo môi trường
- phân rã dịch vụ và biên giao tiếp
- chiến lược mở rộng phiên bản sau

### TL26 — Hướng dẫn thao tác theo vai trò cho R30 và R40
- quy trình thao tác từng màn hình
- tình huống lỗi thường gặp
- mẫu phản hồi hỗ trợ theo TL23
- danh sách kiểm tra trước và sau thao tác nhạy cảm

### TL27 — Bộ dữ liệu kiểm thử và kịch bản diễn tập vận hành
- dữ liệu mẫu chuẩn hóa
- kịch bản diễn tập sự cố
- kịch bản kiểm tra đối soát, kết chuyển
- kịch bản đào tạo thực hành

---

## 20. Ghi chú cuối tài liệu

- TL24 là kế hoạch triển khai và bàn giao ở mức quản lý thực thi và phối hợp liên nhóm, không thay thế kế hoạch công việc chi tiết theo ngày hoặc theo tuần.
- Khi đội dự án chốt công nghệ cụ thể cho giao diện, máy chủ và cơ sở dữ liệu, TL24 có thể được bổ sung phụ lục lịch thực hiện và phân công theo người thực tế, nhưng không được làm mâu thuẫn các tài liệu TL01 đến TL23.
- Mọi thay đổi làm ảnh hưởng phạm vi phiên bản đầu, tiêu chí mở, kế hoạch vận hành hoặc nội dung bàn giao đều phải cập nhật TL24 và các tài liệu liên quan.
