# TL23 — Điều khoản sử dụng, chính sách nội bộ và tuân thủ hiển thị

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL23
- **Tên tài liệu:** Điều khoản sử dụng, chính sách nội bộ và tuân thủ hiển thị
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22
- **Tài liệu đầu ra phụ thuộc:** bộ nội dung hiển thị song ngữ cho giao diện, trang điều khoản công khai, trang quyền riêng tư, mẫu thông báo bảo trì, mẫu cảnh báo thanh toán, quy trình cập nhật nội dung tuân thủ

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL23 quy định thống nhất:

- điều khoản sử dụng nền tảng cho các nhóm người dùng
- chính sách nội bộ liên quan đến vận hành nội dung hiển thị và truyền thông tình trạng dịch vụ
- yêu cầu tuân thủ hiển thị trên các màn hình đã đặc tả trong TL20
- nguyên tắc công bố thông tin cho nạp tiền, rút tiền, liên kết rút gọn, chiến dịch, dữ liệu và bảo mật
- quy trình quản trị nội dung tuân thủ theo vòng đời cấu hình và vận hành trong TL17, TL22

Mục tiêu của TL23 là giúp đội phát triển, đội giao diện, đội vận hành, quản trị và trợ lý lập trình triển khai nội dung hiển thị nhất quán, rõ ràng, giảm khiếu nại và giảm rủi ro hiểu sai nghiệp vụ.

## 2.2 Phạm vi

Trong phạm vi TL23:

- điều khoản sử dụng cho R10, R20 và người truy cập công khai R01
- chính sách quyền riêng tư và dữ liệu ở mức hiển thị và truyền thông
- chính sách thanh toán thủ công, nạp tiền, rút tiền
- chính sách liên kết rút gọn, nội dung bị cấm, xử lý vi phạm
- chính sách hiển thị số liệu tạm thời và đã chốt
- chính sách thông báo bảo trì, gián đoạn dịch vụ, sự cố
- yêu cầu hiển thị cảnh báo và xác nhận trên giao diện
- quy trình phê duyệt và xuất bản nội dung tuân thủ song ngữ

Ngoài phạm vi TL23:

- tư vấn pháp lý theo luật của từng quốc gia
- hợp đồng thương mại chi tiết ngoài nền tảng
- chính sách thuế chi tiết theo từng khu vực
- chính sách pháp lý của nhà cung cấp hạ tầng bên ngoài
- quy trình pháp lý xử lý tranh chấp ngoài kênh nền tảng

## 2.3 Nguyên tắc xuyên suốt

- **Nội dung hiển thị phải trung thực, rõ ràng, không gây hiểu nhầm.**
- **Không che giấu rủi ro quan trọng về tiền, dữ liệu, trạng thái xử lý, gián đoạn dịch vụ.**
- **Không công bố chi tiết nhạy cảm về chống gian lận, bảo mật và vận hành nội bộ.**
- **Mọi nội dung tuân thủ phải có bản Việt và bản Anh, quản lý theo phiên bản.**
- **Không mâu thuẫn với TL08 đến TL19, TL20, TL21, TL22.**
- **Khi có mâu thuẫn, ưu tiên nghiệp vụ và an toàn hệ thống trước.**

---

## 3. Đối tượng áp dụng và thuật ngữ vận hành nội dung

## 3.1 Đối tượng áp dụng

### Người truy cập công khai
- **R01**: truy cập liên kết rút gọn, trang trung gian, trang lỗi, trang báo lỗi liên kết

### Người dùng đăng nhập
- **R10**: khách hàng mua chiến dịch
- **R20**: nhà xuất bản tạo liên kết rút gọn và nhận doanh thu

### Người dùng quản trị và hỗ trợ
- **R30**: quản trị nghiệp vụ và hệ thống ở phạm vi theo TL03
- **R40**: hỗ trợ, tra cứu, xử lý theo phạm vi cho phép

### Đội vận hành kỹ thuật
Theo TL22:
- nhóm vai trò vận hành kỹ thuật tham gia phát hành, xử lý sự cố, bảo trì, truyền thông tình trạng dịch vụ

## 3.2 Nhóm nội dung trong TL23

TL23 chia nội dung thành ba nhóm để quản lý:

- **Nội dung công khai bắt buộc**
  - điều khoản sử dụng
  - quyền riêng tư
  - cảnh báo thanh toán
  - cảnh báo liên kết
  - thông báo bảo trì và gián đoạn
- **Nội dung nghiệp vụ hiển thị trong cổng**
  - trạng thái, cảnh báo, xác nhận, hướng dẫn thao tác
- **Nội dung nội bộ**
  - mẫu truyền thông nội bộ sự cố
  - quy tắc duyệt và xuất bản nội dung tuân thủ
  - hướng dẫn phân loại mức độ công bố

## 3.3 Nguyên tắc dùng thuật ngữ

- Thuật ngữ hiển thị phải nhất quán với mã trạng thái và danh mục mã trong TL14.
- Thuật ngữ nghiệp vụ phải nhất quán với TL08 đến TL12.
- Thuật ngữ vận hành phải nhất quán với TL18 và TL22.
- Không tự tạo thêm tên trạng thái gây hiểu sai.
- Nếu cần rút gọn trên giao diện, phải có phần giải thích ở màn hình chi tiết hoặc tài liệu trợ giúp.

---

## 4. Khung tài liệu và trang nội dung tuân thủ bắt buộc của nền tảng

## 4.1 Danh mục trang và khối nội dung công khai bắt buộc

Phiên bản đầu tối thiểu phải có các trang hoặc khối nội dung hiển thị sau:

1. **Điều khoản sử dụng**
2. **Chính sách quyền riêng tư**
3. **Cảnh báo thanh toán thủ công**
4. **Cảnh báo nạp và rút bằng tài sản số dạng thủ công**
5. **Thông báo gián đoạn dịch vụ và bảo trì**
6. **Thông tin liên hệ hỗ trợ**
7. **Thông báo về dữ liệu thống kê tạm thời và dữ liệu đã chốt**
8. **Chính sách nội dung liên kết và xử lý vi phạm**
9. **Thông báo về chống lạm dụng và chống gian lận ở mức tổng quát**
10. **Cơ chế báo lỗi liên kết trên cổng công khai**

## 4.2 Vị trí hiển thị tối thiểu theo TL20

- **Cổng công khai R01**
  - chân trang hoặc liên kết rõ tới điều khoản sử dụng và quyền riêng tư
  - hiển thị cảnh báo liên kết và bước trung gian phù hợp tại M01-01, M01-02, M01-04, M01-05, M01-06
- **Cổng R10**
  - khối hướng dẫn nạp tiền và cảnh báo thanh toán tại M20-20, M20-21
  - nhãn số liệu tạm thời và đã chốt tại M20-10, M20-32, M20-35
- **Cổng R20**
  - cảnh báo rút tiền và thông tin nhận tiền tại M21-30, M21-32
  - nhãn doanh thu tạm thời và đã chốt tại M21-10, M21-22, M21-24
  - điều khoản liên quan nội dung liên kết tại M21-21, M21-23
- **Cổng quản trị R30, R40**
  - khối cảnh báo thao tác nhạy cảm và xác nhận hành động tại các màn hình duyệt tài chính, duyệt chiến dịch, chống gian lận, đối soát, kết chuyển, cấu hình, vận hành

## 4.3 Yêu cầu truy cập và lưu dấu phiên bản nội dung

- Mỗi trang nội dung tuân thủ phải có:
  - mã nội dung
  - phiên bản nội dung
  - thời điểm hiệu lực
  - ngôn ngữ
- Với nội dung cần người dùng chấp nhận, hệ thống phải có khả năng ghi nhận:
  - người dùng
  - thời điểm chấp nhận
  - phiên bản nội dung được chấp nhận
  - nguồn chấp nhận
- Với nội dung chỉ để tham chiếu, vẫn phải lưu phiên bản để truy vết khi có tranh chấp hoặc khiếu nại.

---

## 5. Điều khoản sử dụng nền tảng — khung chuẩn

## 5.1 Mục đích điều khoản sử dụng

Điều khoản sử dụng xác định quy tắc tham gia và sử dụng nền tảng cho R10, R20 và người truy cập công khai ở mức phù hợp, trong đó nêu rõ:

- vai trò của nền tảng là nền tảng trung gian quản lý liên kết rút gọn và chiến dịch quảng bá hợp lệ
- phạm vi chức năng phiên bản đầu
- quyền và nghĩa vụ của người dùng
- các hành vi bị cấm
- quy trình xử lý vi phạm
- giới hạn trách nhiệm ở mức hợp lý
- cơ chế cập nhật điều khoản

## 5.2 Nội dung cốt lõi bắt buộc của điều khoản sử dụng

### A. Thông tin chung
- tên nền tảng
- mô tả dịch vụ ở mức tổng quát
- phạm vi quốc gia phục vụ
- ngôn ngữ sử dụng và quy tắc áp dụng khi có khác biệt bản dịch

### B. Đăng ký tài khoản và xác thực
- điều kiện tạo tài khoản
- trách nhiệm bảo mật thông tin đăng nhập
- trách nhiệm cập nhật thông tin hồ sơ và thông tin nhận tiền
- quyền tạm khóa hoặc khóa tài khoản khi có dấu hiệu vi phạm

### C. Quyền và nghĩa vụ của khách hàng mua chiến dịch R10
- cung cấp thông tin chiến dịch chính xác
- tuân thủ chính sách nội dung chiến dịch và trang đích
- chấp nhận quy tắc số liệu tạm thời và số liệu đã chốt
- tuân thủ quy trình nạp tiền thủ công và thời gian xử lý

### D. Quyền và nghĩa vụ của nhà xuất bản R20
- chỉ sử dụng liên kết rút gọn cho nội dung hợp lệ
- không cố ý tạo lượt giả, lượt lặp, lượt lạm dụng
- chấp nhận cơ chế kiểm tra, đánh giá lượt hợp lệ theo TL12 ở mức công bố tổng quát
- chấp nhận quy trình rút tiền, đối soát, điều chỉnh sau chốt nếu có

### E. Hành vi bị cấm
- nội dung bất hợp pháp hoặc vi phạm quyền của bên khác
- hành vi lạm dụng hệ thống, gây quá tải, phá hoại dịch vụ
- gian lận lượt, gian lận doanh thu, gian lận thanh toán
- giả mạo chứng từ nạp tiền hoặc thông tin nhận tiền
- sử dụng nền tảng cho mục đích gây hại hoặc phát tán nội dung nguy hiểm
- tìm cách truy cập trái phép dữ liệu hoặc chức năng không được cấp quyền

### F. Trạng thái xử lý và số liệu
- nêu rõ một số trạng thái là tạm thời
- nêu rõ số liệu có thể thay đổi sau kiểm tra hoặc đối soát
- nêu rõ dữ liệu đã chốt là căn cứ chính cho thanh toán và đối soát theo kỳ

### G. Thanh toán, nạp tiền, rút tiền
- phiên bản đầu áp dụng quy trình thủ công
- thời gian xử lý phụ thuộc xác minh và vận hành
- có thể yêu cầu bổ sung thông tin hoặc chứng từ
- có thể từ chối hoặc trì hoãn xử lý khi có dấu hiệu bất thường hợp lý

### H. Tạm dừng, giới hạn hoặc chấm dứt dịch vụ
- trường hợp bảo trì, sự cố, cập nhật hệ thống
- trường hợp vi phạm điều khoản
- trường hợp yêu cầu từ cơ quan có thẩm quyền hoặc rủi ro an toàn hệ thống

### I. Giới hạn trách nhiệm
- nêu rõ phạm vi trách nhiệm của nền tảng với dịch vụ trung gian
- nêu rõ nền tảng không bảo đảm tuyệt đối về tính liên tục không gián đoạn
- nêu rõ xử lý theo khả năng hợp lý trong sự cố và bảo trì

### J. Thay đổi điều khoản
- cơ chế cập nhật
- thời điểm hiệu lực
- cách thông báo cho người dùng
- nghĩa vụ xem và chấp nhận lại nếu cần

## 5.3 Quy tắc hiển thị chấp nhận điều khoản

- Khi đăng ký tài khoản mới, phải hiển thị:
  - liên kết điều khoản sử dụng
  - liên kết chính sách quyền riêng tư
  - ô xác nhận chấp nhận
- Không đánh dấu sẵn ô xác nhận.
- Phải ghi nhận phiên bản nội dung người dùng đã chấp nhận.
- Nếu điều khoản thay đổi ở mức trọng yếu, phải yêu cầu chấp nhận lại ở lần đăng nhập tiếp theo hoặc trước khi thực hiện thao tác nghiệp vụ mới.

---

## 6. Chính sách quyền riêng tư và dữ liệu hiển thị

## 6.1 Mục tiêu

Trình bày rõ cho người dùng biết nền tảng thu thập và sử dụng những loại dữ liệu nào, phục vụ mục đích gì, hiển thị ra sao, lưu trong bao lâu theo chính sách nội bộ và ràng buộc vận hành, đồng thời tránh công bố chi tiết nhạy cảm gây rủi ro an toàn.

## 6.2 Nhóm dữ liệu thu thập ở mức công bố tổng quát

Chính sách quyền riêng tư phải nêu theo nhóm:

- dữ liệu tài khoản và hồ sơ
- dữ liệu liên hệ hỗ trợ
- dữ liệu giao dịch nạp và rút cùng chứng từ do người dùng cung cấp
- dữ liệu cấu hình chiến dịch và liên kết
- dữ liệu truy cập, nhật ký hệ thống ở mức cần thiết cho vận hành và an toàn
- dữ liệu sự kiện liên quan truy cập liên kết và đánh giá hợp lệ ở mức tổng quát
- dữ liệu tương tác trên giao diện

## 6.3 Mục đích sử dụng dữ liệu ở mức công bố

Phải nêu rõ các mục đích chính:

- cung cấp và vận hành dịch vụ
- xác minh giao dịch thủ công và xử lý thanh toán
- ghi nhận và tính toán số liệu thống kê, doanh thu, chi tiêu
- phát hiện lạm dụng và bảo vệ hệ thống
- hỗ trợ người dùng, xử lý khiếu nại
- tuân thủ chính sách nội bộ, kiểm toán nội bộ và yêu cầu hợp lệ của cơ quan có thẩm quyền
- cải thiện trải nghiệm và độ ổn định hệ thống

## 6.4 Nguyên tắc hiển thị và chia sẻ dữ liệu

- Chỉ hiển thị dữ liệu theo đúng vai trò trong TL03.
- Không hiển thị dữ liệu nhạy cảm nội bộ về chống gian lận cho R10, R20, R01.
- Dữ liệu vận hành, nhật ký, chỉ số kỹ thuật chỉ hiển thị cho vai trò phù hợp.
- Nếu cung cấp tệp xuất dữ liệu, phải che hoặc loại bỏ trường nhạy cảm theo TL19 và TL20.

## 6.5 Quyền của người dùng về dữ liệu ở mức nền tảng hỗ trợ

Tùy chính sách triển khai thực tế, trang quyền riêng tư tối thiểu phải nêu:

- quyền xem và cập nhật dữ liệu hồ sơ
- quyền yêu cầu hỗ trợ chỉnh sửa thông tin trong phạm vi cho phép
- quyền liên hệ hỗ trợ khi nghi ngờ truy cập trái phép tài khoản
- quyền được thông báo khi có thay đổi chính sách quyền riêng tư ở mức trọng yếu

## 6.6 Dữ liệu sự kiện và chống gian lận

Chính sách quyền riêng tư và điều khoản chỉ công bố ở mức tổng quát:

- nền tảng có thể thu thập dữ liệu kỹ thuật và hành vi truy cập ở mức cần thiết
- dữ liệu này phục vụ bảo vệ hệ thống và đánh giá hợp lệ
- nền tảng không công bố chi tiết quy tắc phát hiện gian lận để tránh lạm dụng

## 6.7 Lưu trữ, bảo vệ và xóa dữ liệu ở mức truyền thông

- Nêu rõ dữ liệu được bảo vệ theo chính sách nội bộ và ràng buộc bảo mật trong TL19.
- Nêu rõ thời gian lưu trữ phụ thuộc loại dữ liệu, nhu cầu vận hành, kiểm toán nội bộ và giải quyết tranh chấp.
- Không hứa xóa ngay tức thì mọi dữ liệu nếu còn nghĩa vụ lưu trữ vận hành hoặc an toàn.
- Với chứng từ và nhật ký liên quan giao dịch, thời gian lưu trữ có thể dài hơn dữ liệu hiển thị thông thường.

---

## 7. Chính sách nạp tiền thủ công và hiển thị cảnh báo thanh toán

## 7.1 Mục tiêu

Bảo đảm người dùng hiểu đúng quy trình nạp tiền thủ công theo TL08, giảm nhầm lẫn, giảm sai sót chuyển khoản và giảm khiếu nại về thời gian xử lý.

## 7.2 Nội dung hiển thị bắt buộc tại màn hình nạp tiền

Áp dụng cho M20-20 và M20-21, tối thiểu phải hiển thị:

- nền tảng áp dụng nạp tiền thủ công trong phiên bản đầu
- thông tin thanh toán do hệ thống cung cấp cho từng hóa đơn
- yêu cầu nhập đúng nội dung tham chiếu hoặc mã hóa đơn theo hướng dẫn
- yêu cầu tải chứng từ theo quy định nếu quy trình yêu cầu
- trạng thái hóa đơn và ý nghĩa từng trạng thái
- cảnh báo hết hạn hóa đơn
- thời gian xử lý mang tính tham chiếu, có thể thay đổi nếu cần xác minh

## 7.3 Cảnh báo bắt buộc cho chuyển khoản ngân hàng

- Chỉ chuyển khoản theo đúng thông tin hiển thị tại hóa đơn hiện tại.
- Không sử dụng thông tin cũ của hóa đơn đã hết hạn hoặc đã xử lý.
- Chuyển sai nội dung tham chiếu có thể làm chậm xác minh.
- Nền tảng có thể yêu cầu bổ sung chứng từ nếu thông tin không đủ rõ.
- Không chuyển nhiều hóa đơn gộp chung nếu quy trình không cho phép.
- Nền tảng không chịu trách nhiệm cho sai sót do người dùng nhập sai thông tin thanh toán.

## 7.4 Cảnh báo bắt buộc cho nạp thủ công bằng tài sản số

- Chỉ chuyển đúng địa chỉ và đúng mạng đang hiển thị cho hóa đơn.
- Chuyển sai mạng hoặc sai địa chỉ có thể dẫn đến mất tiền và không thể khôi phục.
- Phải kiểm tra kỹ ký hiệu mạng trước khi xác nhận chuyển.
- Hệ thống có thể yêu cầu tải chứng từ hoặc mã giao dịch để xác minh.
- Thời gian xử lý phụ thuộc xác minh thủ công và điều kiện vận hành.

## 7.5 Quy tắc hiển thị trạng thái nạp tiền

- Trạng thái phải theo TL14.
- Giao diện phải hiển thị:
  - nhãn trạng thái
  - mô tả ngắn
  - hành động cho phép theo trạng thái
- Khi từ chối hoặc thất bại, phải hiển thị lý do ở mức phù hợp, không lộ thông tin nhạy cảm nội bộ.
- Khi thành công, phải hiển thị xác nhận đã cộng số dư và liên kết xem giao dịch nếu có.

---

## 8. Chính sách rút tiền thủ công và hiển thị cảnh báo rút tiền

## 8.1 Mục tiêu

Bảo đảm R20 hiểu đúng quy trình rút tiền theo TL09, biết trạng thái xử lý, tránh nhầm lẫn giữa từ chối, hoàn tiền, chờ xử lý và hoàn thành.

## 8.2 Nội dung hiển thị bắt buộc tại màn hình rút tiền

Áp dụng cho M21-30, M21-31, M21-32:

- phương thức rút khả dụng theo cấu hình
- ngưỡng rút tối thiểu và các điều kiện áp dụng
- số dư khả dụng và số dư khóa tạm
- thông tin nhận tiền đang áp dụng
- cảnh báo kiểm tra kỹ thông tin nhận tiền trước khi tạo yêu cầu
- trạng thái yêu cầu rút và ý nghĩa từng trạng thái
- lưu ý về thời gian xử lý là thời gian tham chiếu, có thể thay đổi khi cần xác minh

## 8.3 Cảnh báo bắt buộc cho rút về ngân hàng

- Người dùng chịu trách nhiệm bảo đảm thông tin nhận tiền chính xác.
- Nếu thông tin nhận tiền sai, yêu cầu có thể bị từ chối hoặc chậm xử lý.
- Nền tảng có thể yêu cầu xác minh bổ sung khi phát hiện bất thường.
- Một số yêu cầu có thể được tạm giữ để kiểm tra theo chính sách an toàn và chống gian lận.

## 8.4 Cảnh báo bắt buộc cho rút thủ công bằng tài sản số

- Phải kiểm tra đúng địa chỉ nhận và đúng mạng trước khi gửi yêu cầu.
- Rút sai mạng hoặc sai địa chỉ có thể dẫn đến mất tài sản và không thể khôi phục.
- Nền tảng chỉ xử lý theo thông tin nhận tiền người dùng đã xác nhận.
- Yêu cầu có thể bị trì hoãn để kiểm tra an toàn nếu phát hiện dấu hiệu bất thường.

## 8.5 Quy tắc hiển thị trạng thái rút tiền

- Trạng thái phải theo TL14 và quy trình theo TL09.
- Giao diện phải phân biệt rõ:
  - bị từ chối
  - hoàn tiền
  - hoàn thành
- Khi trạng thái làm thay đổi số dư, giao diện phải hiển thị tác động hoặc giải thích tương ứng.
- Nếu có bằng chứng xử lý được phép hiển thị, phải hiển thị theo đúng quyền và che dữ liệu nhạy cảm.

---

## 9. Chính sách số liệu, doanh thu, chi tiêu và đối soát

## 9.1 Mục tiêu

Giảm hiểu nhầm về số liệu hiển thị bằng cách phân biệt rõ số liệu tạm thời và số liệu đã chốt theo TL16, đồng thời bảo đảm nội dung hiển thị nhất quán trên các cổng.

## 9.2 Nguyên tắc hiển thị số liệu

- Mọi số liệu có khả năng thay đổi trước khi đối soát phải gắn nhãn **tạm thời**.
- Mọi số liệu dùng làm căn cứ thanh toán, kết chuyển, đối chiếu sau kỳ phải gắn nhãn **đã chốt** hoặc nhãn tương đương đã chuẩn hóa.
- Nếu màn hình hiển thị đồng thời cả hai loại số liệu, phải có chú giải rõ ràng.
- Không được dùng nhãn gây hiểu nhầm như “cuối cùng” khi chưa qua đối soát.

## 9.3 Nội dung cảnh báo bắt buộc với R10 và R20

- Số liệu tạm thời có thể thay đổi do kiểm tra hợp lệ, xử lý ngoại lệ, chốt đối soát hoặc điều chỉnh sau chốt theo quy trình.
- Doanh thu và chi tiêu hiển thị trong ngày hoặc theo thời gian gần thực có thể khác số liệu đã chốt.
- Khi có điều chỉnh sau chốt, hệ thống sẽ hiển thị ghi chú hoặc lịch sử điều chỉnh theo mức quyền phù hợp.

## 9.4 Chính sách khi có sai lệch hoặc khiếu nại số liệu

- Người dùng gửi yêu cầu hỗ trợ qua phiếu hỗ trợ hoặc kênh hỗ trợ chính thức.
- Nền tảng tra cứu theo mã thực thể, mã giao dịch, kỳ đối soát và phiên bản cấu hình áp dụng.
- Kết quả phản hồi phải dựa trên dữ liệu truy vết và quy trình trong TL16, TL18, TL22.
- Không cam kết xử lý ngoài quy trình hoặc chỉnh sửa số liệu thủ công trái quy định.

---

## 10. Chính sách nội dung liên kết, trang đích và chiến dịch

## 10.1 Mục tiêu

Xác định phạm vi nội dung hợp lệ và các hành vi bị cấm đối với liên kết rút gọn, trang đích và chiến dịch quảng bá để bảo vệ người dùng, giảm rủi ro vận hành và bảo mật.

## 10.2 Nguyên tắc chung

- Nội dung phải hợp lệ, không gây hại và không vi phạm quyền của bên khác.
- Nền tảng có quyền xem xét, tạm dừng, khóa hoặc từ chối khi phát hiện dấu hiệu vi phạm hợp lý.
- Nền tảng không công bố chi tiết toàn bộ tiêu chí phát hiện để tránh lạm dụng.
- Quyết định xử lý vi phạm phải có ghi nhận lý do và trạng thái theo TL14.

## 10.3 Nhóm nội dung và hành vi bị cấm tối thiểu

Trang điều khoản và chính sách nội dung phải nêu tối thiểu:

- nội dung bất hợp pháp hoặc bị cấm theo khu vực áp dụng
- nội dung lừa đảo, mạo danh, gây hiểu nhầm nghiêm trọng
- nội dung phát tán phần mềm độc hại hoặc hành vi gây hại hệ thống
- hành vi tự động hóa trái phép gây tải bất thường
- gian lận lượt, gian lận doanh thu, thao túng số liệu
- sử dụng trang đích hoặc liên kết nhằm thu thập trái phép thông tin nhạy cảm của người khác
- nội dung hoặc hành vi vi phạm chính sách an toàn nội bộ của nền tảng

## 10.4 Quy trình hiển thị và truyền thông khi liên kết hoặc chiến dịch bị xử lý

### Với R20 khi liên kết bị khóa hoặc hạn chế
- hiển thị trạng thái theo TL14
- hiển thị lý do ở mức tóm tắt
- hiển thị hướng dẫn liên hệ hỗ trợ hoặc quy trình khiếu nại nếu có
- không hiển thị chi tiết quy tắc chống gian lận hoặc danh sách chặn nội bộ

### Với R10 khi chiến dịch bị từ chối hoặc lỗi cấu hình
- hiển thị trạng thái theo TL14
- hiển thị lý do ở mức đủ để người dùng chỉnh sửa hoặc liên hệ hỗ trợ
- phân biệt lỗi do cấu hình người dùng và lỗi do hệ thống

### Với R01 trên cổng công khai
- hiển thị trang lỗi hoặc trang liên kết bị khóa, hết hạn theo TL20
- không công bố chi tiết nội bộ về quyết định xử lý

## 10.5 Cơ chế khiếu nại hoặc yêu cầu xem xét lại

- Người dùng sử dụng phiếu hỗ trợ tại cổng tương ứng.
- Yêu cầu phải nêu rõ mã liên kết hoặc mã chiến dịch, thời điểm, mô tả vấn đề.
- Nền tảng có quyền yêu cầu thông tin bổ sung.
- Kết quả phản hồi dựa trên dữ liệu truy vết, trạng thái, nhật ký và quy trình nội bộ.

---

## 11. Chính sách chống lạm dụng, chống gian lận và công bố ở mức tổng quát

## 11.1 Mục tiêu

Công bố vừa đủ để người dùng biết nền tảng có cơ chế bảo vệ hệ thống và đánh giá hợp lệ, nhưng không lộ chi tiết giúp lách quy trình.

## 11.2 Nội dung công bố được phép

Có thể công bố ở mức tổng quát:

- nền tảng ghi nhận và phân tích dữ liệu truy cập ở mức cần thiết
- có cơ chế phát hiện bất thường và kiểm tra thủ công
- số liệu và doanh thu có thể điều chỉnh theo kết quả kiểm tra và đối soát
- nền tảng có quyền tạm giữ hoặc trì hoãn xử lý khi phát hiện dấu hiệu rủi ro hợp lý
- một số hành vi có thể dẫn đến giới hạn tính lượt hoặc khóa tài khoản, khóa liên kết, tạm dừng chiến dịch

## 11.3 Nội dung không được công bố công khai

Không đưa vào nội dung công khai hoặc giao diện người dùng thông tin như:

- tiêu chí chi tiết chấm điểm rủi ro
- quy tắc phân loại chính xác và ngưỡng cụ thể
- mô hình nội bộ, chỉ số nội bộ, danh sách tín hiệu nội bộ
- cấu trúc kỹ thuật chi tiết chống gian lận
- quy trình phản ứng bảo mật nội bộ chi tiết

## 11.4 Thông báo xử lý dựa trên chống gian lận

Khi hệ thống áp dụng biện pháp dựa trên đánh giá rủi ro, nội dung hiển thị cần:

- nêu rõ hành động đang áp dụng
- nêu rõ ảnh hưởng hiện tại đến thao tác hoặc số liệu
- nêu rõ bước tiếp theo
- tránh kết luận buộc tội tuyệt đối khi chưa có xác nhận cuối
- không tiết lộ lý do kỹ thuật chi tiết

---

## 12. Chính sách bảo trì, gián đoạn dịch vụ và truyền thông tình trạng hệ thống

## 12.1 Mục tiêu

Chuẩn hóa cách hiển thị và truyền thông khi bảo trì hoặc có sự cố theo TL22, giảm hoang mang và giảm thông tin mâu thuẫn giữa các cổng.

## 12.2 Phân loại tình trạng công bố

- **Bảo trì có kế hoạch**
- **Gián đoạn dịch vụ ngoài kế hoạch**
- **Suy giảm hiệu năng**
- **Gián đoạn cục bộ một phân hệ**
- **Khôi phục tạm thời và đang theo dõi**
- **Khôi phục hoàn toàn**

## 12.3 Nội dung thông báo công khai tối thiểu

Mọi thông báo công khai về bảo trì hoặc gián đoạn phải có tối thiểu:

- phạm vi ảnh hưởng
- thời điểm bắt đầu
- trạng thái hiện tại
- hành động khuyến nghị cho người dùng
- kênh hỗ trợ hoặc nơi cập nhật tiếp theo
- thời gian dự kiến tiếp theo để cập nhật tình hình nếu chưa có thời gian khôi phục chính xác

## 12.4 Quy tắc hiển thị theo cổng

### Cổng R01
- Ưu tiên hiển thị thông báo ngắn, rõ ràng nếu ảnh hưởng cổng công khai.
- Không hiển thị chi tiết kỹ thuật nội bộ.
- Cung cấp nút thử lại hoặc hướng dẫn quay lại khi phù hợp.

### Cổng R10 và R20
- Hiển thị thanh thông báo hoặc khối cảnh báo nổi bật khi ảnh hưởng nạp, rút, chiến dịch, liên kết, thống kê.
- Nếu ảnh hưởng số liệu tạm thời, phải cảnh báo số liệu có thể chậm cập nhật.
- Nếu ảnh hưởng thao tác tài chính, phải nêu rõ tạm dừng hay chỉ chậm xử lý.

### Cổng quản trị R30, R40
- Hiển thị thông tin chi tiết hơn về phạm vi phân hệ bị ảnh hưởng
- Hiển thị mã sự cố hoặc mã cảnh báo để phối hợp vận hành
- Không hiển thị bí mật hệ thống hoặc thông tin nhạy cảm vượt vai trò

## 12.5 Quy tắc truyền thông trong sự cố

- Bám quy trình truyền thông của TL22.
- Không công bố nguyên nhân khi chưa xác thực.
- Thông báo phải nhất quán giữa các kênh và các cổng.
- Cập nhật tình trạng theo mốc thời gian hợp lý cho đến khi khôi phục.
- Sau khi khôi phục, có thể hiển thị thông báo tóm tắt và lưu ý nếu còn độ trễ xử lý nền hoặc đồng bộ số liệu.

---

## 13. Yêu cầu tuân thủ hiển thị theo nhóm màn hình trong TL20

## 13.1 Nhóm xác thực và đăng ký

Áp dụng cho M20-01, M20-02, M21-01, M21-02 và màn hình liên quan:

- phải có liên kết tới điều khoản sử dụng và chính sách quyền riêng tư
- phải có ô xác nhận chấp nhận điều khoản khi đăng ký
- phải có thông báo trách nhiệm bảo mật tài khoản ở mức ngắn
- thông báo lỗi xác thực không được lộ chi tiết nhạy cảm

## 13.2 Nhóm nạp tiền

Áp dụng cho M20-20, M20-21, M20-22, M20-23 và màn hình quản trị M30-20, M30-21, M30-22:

### Cổng người dùng R10
- hiển thị hướng dẫn thanh toán đúng hóa đơn
- hiển thị cảnh báo sai thông tin thanh toán
- hiển thị cảnh báo sai mạng đối với tài sản số
- hiển thị ý nghĩa trạng thái hóa đơn và thời hạn hóa đơn
- hiển thị cảnh báo thời gian xử lý là tham chiếu

### Cổng quản trị R30, R40
- hiển thị cảnh báo thao tác nhạy cảm
- hiển thị tác động khi duyệt hoặc từ chối
- yêu cầu nhập lý do với thao tác theo quy trình
- không cho phép nội dung mô tả từ chối mơ hồ nếu chính sách yêu cầu mã lý do chuẩn

## 13.3 Nhóm rút tiền

Áp dụng cho M21-30, M21-31, M21-32 và M30-30, M30-31, M30-32:

### Cổng R20
- hiển thị số dư khả dụng, số dư khóa tạm
- hiển thị điều kiện và cảnh báo rút
- hiển thị cảnh báo kiểm tra thông tin nhận tiền
- phân biệt rõ trạng thái bị từ chối và hoàn tiền

### Cổng R30, R40
- hiển thị cảnh báo thao tác ảnh hưởng số dư
- yêu cầu xác nhận thao tác nhạy cảm
- yêu cầu lý do bắt buộc cho từ chối hoặc hoàn tiền theo quy trình

## 13.4 Nhóm chiến dịch và số liệu chiến dịch

Áp dụng cho M20-30 đến M20-35, M30-40 đến M30-44:

- hiển thị nhãn trạng thái theo TL14
- hiển thị nhãn số liệu tạm thời và đã chốt
- hiển thị lý do từ chối hoặc lỗi cấu hình ở mức phù hợp
- không hiển thị thông tin nội bộ chống gian lận vượt quyền
- với duyệt chiến dịch, phải hiển thị cảnh báo xác nhận hành động ở cổng quản trị

## 13.5 Nhóm liên kết rút gọn và doanh thu

Áp dụng cho M21-20 đến M21-25, M30-50 đến M30-53, M01-01 đến M01-06:

- hiển thị trạng thái liên kết theo TL14
- hiển thị nhãn doanh thu tạm thời và đã chốt
- hiển thị cơ chế báo lỗi liên kết ở cổng công khai
- hiển thị cảnh báo bước trung gian minh bạch tại cổng công khai
- không hiển thị chi tiết kỹ thuật chống gian lận

## 13.6 Nhóm chống gian lận, sự kiện lượt và kiểm tra thủ công

Áp dụng cho M30-60 đến M30-64:

- hiển thị cảnh báo về tác động tài chính khi ra quyết định
- hiển thị nhãn trạng thái sự kiện theo TL14
- hiển thị quyền hạn khác nhau giữa R30 và R40
- không cho R40 thao tác quyết định cuối nếu không có quyền
- nội dung ghi chú và lý do quyết định phải phục vụ truy vết, không dùng từ ngữ mơ hồ

## 13.7 Nhóm đối soát, kết chuyển và điều chỉnh sau chốt

Áp dụng cho M30-70 đến M30-74:

- hiển thị cảnh báo tác vụ nặng
- hiển thị xác nhận chống chạy trùng
- hiển thị cảnh báo ảnh hưởng đến số liệu đã chốt
- hiển thị mã tác vụ và trạng thái tác vụ để truy vết
- nội dung xác nhận phải nêu rõ kỳ đối soát đang thao tác

## 13.8 Nhóm cấu hình hệ thống và nội dung tuân thủ

Áp dụng cho M30-80 đến M30-89:

- hiển thị vòng đời cấu hình theo TL17
- hiển thị hiệu lực và phạm vi áp dụng
- hiển thị cảnh báo chồng chéo hiệu lực
- với nội dung tuân thủ song ngữ, phải hiển thị trạng thái thiếu bản dịch nếu có
- không cho xuất bản nội dung trọng yếu nếu thiếu trường bắt buộc theo chính sách

## 13.9 Nhóm nhật ký, giám sát, cảnh báo và vận hành

Áp dụng cho M30-90 đến M30-95:

- hiển thị thông tin vận hành theo đúng quyền
- che dữ liệu nhạy cảm theo TL19
- thông báo sự cố và cảnh báo phải dùng ngôn ngữ rõ ràng, không kết luận khi chưa xác thực
- hỗ trợ truy vết bằng mã cảnh báo, mã yêu cầu, mã sự cố

---

## 14. Chuẩn nội dung cảnh báo, xác nhận và thông báo

## 14.1 Phân loại nội dung hiển thị

### Cảnh báo trước thao tác
Dùng để ngăn sai sót trước khi người dùng xác nhận hành động.

### Xác nhận hành động nhạy cảm
Dùng cho các thao tác có ảnh hưởng tiền, trạng thái hoặc dữ liệu.

### Thông báo kết quả thao tác
Dùng sau khi thao tác thành công, thất bại hoặc đang xử lý.

### Thông báo tình trạng dịch vụ
Dùng cho bảo trì, sự cố, suy giảm hiệu năng.

## 14.2 Quy tắc soạn nội dung

- Ngắn gọn, rõ đối tượng, rõ hành động.
- Nêu ảnh hưởng và bước tiếp theo khi cần.
- Không dùng ngôn ngữ đổ lỗi hoặc mơ hồ.
- Không dùng từ ngữ tuyệt đối nếu trạng thái còn tạm thời.
- Với nội dung tài chính, phải nêu đúng thực thể và trạng thái.

## 14.3 Thành phần bắt buộc của thông báo quan trọng

Áp dụng cho thông báo quan trọng liên quan tiền, số liệu hoặc sự cố:

- tiêu đề
- mô tả ngắn
- mã tham chiếu hoặc mã lỗi nếu phù hợp
- hành động tiếp theo hoặc liên kết tới màn hình liên quan
- thời điểm cập nhật

## 14.4 Ví dụ nhóm thông báo cần chuẩn hóa trong bộ nội dung

- cảnh báo nạp sai thông tin
- cảnh báo rút sai mạng hoặc sai địa chỉ
- thông báo số liệu tạm thời
- thông báo đối soát đã chốt
- thông báo gián đoạn cổng công khai
- thông báo chậm cập nhật thống kê
- xác nhận duyệt nạp, duyệt rút, hoàn tiền
- xác nhận chốt đối soát, kết chuyển
- thông báo liên kết bị khóa hoặc hết hạn ở cổng công khai

---

## 15. Quy trình quản trị nội dung tuân thủ và xuất bản nội dung

## 15.1 Mục tiêu

Bảo đảm nội dung điều khoản, cảnh báo, thông báo và chính sách được tạo, rà soát, phê duyệt, xuất bản và truy vết theo vòng đời cấu hình trong TL17 và quy trình vận hành trong TL22.

## 15.2 Vai trò trong quản trị nội dung tuân thủ

- **Người soạn nội dung**
- **Người rà soát nghiệp vụ**
- **Người rà soát bảo mật và an toàn hiển thị**
- **Người rà soát ngôn ngữ song ngữ**
- **Người phê duyệt xuất bản**
- **Người vận hành triển khai nội dung**
- **Người kiểm tra sau xuất bản**

Một người có thể kiêm nhiều vai trò ở đội nhỏ, nhưng với nội dung rủi ro cao nên có phân tách tối thiểu giữa người soạn và người phê duyệt.

## 15.3 Phân loại nội dung theo rủi ro

### Rủi ro thấp
- chỉnh sửa câu chữ không đổi nghĩa
- sửa lỗi chính tả
- cập nhật liên kết hỗ trợ không đổi quy trình

### Rủi ro trung bình
- thay đổi hướng dẫn thao tác nạp, rút
- thay đổi nội dung cảnh báo có thể ảnh hưởng hành vi người dùng
- thay đổi mô tả trạng thái

### Rủi ro cao
- thay đổi điều khoản sử dụng
- thay đổi chính sách quyền riêng tư
- thay đổi nội dung cảnh báo thanh toán và tài sản số
- thay đổi thông báo ảnh hưởng quyền lợi, số liệu, quy trình đối soát
- thay đổi nội dung công bố trong sự cố liên quan dữ liệu hoặc tiền

## 15.4 Quy trình xuất bản nội dung tuân thủ

1. Tạo bản nháp nội dung song ngữ
2. Rà soát nghiệp vụ và đối chiếu TL08 đến TL19, TL20, TL22
3. Rà soát ngôn ngữ và tính nhất quán thuật ngữ
4. Rà soát tuân thủ hiển thị theo màn hình áp dụng
5. Phê duyệt xuất bản
6. Xuất bản theo cơ chế cấu hình nội dung
7. Kiểm tra sau xuất bản trên các cổng liên quan
8. Ghi nhật ký phiên bản và hiệu lực nội dung

## 15.5 Quy tắc cập nhật khẩn

Áp dụng cho nội dung cần cập nhật nhanh trong bảo trì hoặc sự cố:

- cho phép quy trình rút gọn nhưng vẫn phải có:
  - người phê duyệt
  - ghi nhật ký thay đổi
  - phiên bản nội dung
  - kiểm tra sau xuất bản
- sau khi tình huống ổn định, phải hoàn tất rà soát hậu kiểm và chuẩn hóa lại nội dung nếu cần

## 15.6 Kiểm tra sau xuất bản nội dung

Tối thiểu kiểm tra:

- hiển thị đúng ngôn ngữ Việt và Anh
- hiển thị đúng màn hình mục tiêu
- không lỗi định dạng
- không thiếu liên kết quan trọng
- nội dung không vượt quyền hiển thị
- nội dung không mâu thuẫn với trạng thái hoặc quy trình hiện hành

---

## 16. Chính sách hỗ trợ người dùng, khiếu nại và phản hồi nội dung

## 16.1 Kênh hỗ trợ chính thức

TL23 yêu cầu nêu rõ trên giao diện:

- kênh phiếu hỗ trợ trong hệ thống
- thời gian phản hồi tham chiếu
- phạm vi vấn đề hỗ trợ qua từng kênh
- cách gửi mã tham chiếu, mã hóa đơn, mã yêu cầu rút, mã chiến dịch, mã liên kết để tra cứu nhanh

## 16.2 Quy tắc xử lý khiếu nại liên quan số liệu và thanh toán

- Người dùng phải cung cấp thông tin nhận diện thực thể liên quan.
- Nền tảng tra cứu dựa trên dữ liệu truy vết và trạng thái đã lưu.
- Trả lời phải phân biệt rõ:
  - số liệu tạm thời
  - số liệu đã chốt
  - trạng thái đang xử lý
  - trạng thái đã hoàn tất
- Không hứa hẹn kết quả trái quy trình TL08, TL09, TL16 và TL22.

## 16.3 Khiếu nại về liên kết bị khóa hoặc chiến dịch bị từ chối

- Phản hồi theo lý do ở mức phù hợp.
- Có thể yêu cầu người dùng cung cấp thông tin bổ sung.
- Không công bố chi tiết quy tắc nội bộ chống lạm dụng.
- Nếu quyết định được giữ nguyên, phản hồi phải nêu căn cứ ở mức chính sách, không chỉ trả lời chung chung.

## 16.4 Phản hồi trong sự cố hoặc bảo trì

- Phản hồi phải thống nhất với thông báo tình trạng dịch vụ hiện hành.
- Không cung cấp mốc khôi phục chắc chắn khi chưa xác thực.
- Nếu có ảnh hưởng số liệu, phải nêu rõ số liệu có thể chậm cập nhật hoặc đang được kiểm tra.

---

## 17. Yêu cầu song ngữ Việt và Anh cho nội dung tuân thủ

## 17.1 Nguyên tắc chung

- Mọi nội dung thuộc nhóm tuân thủ và cảnh báo quan trọng phải có bản Việt và bản Anh.
- Hai bản phải tương đương nghĩa, không được mâu thuẫn.
- Khi chưa có bản dịch hoàn chỉnh cho nội dung rủi ro cao, không xuất bản chính thức.
- Nếu thiếu bản dịch ở nội dung rủi ro thấp, có thể dùng ngôn ngữ dự phòng theo cấu hình nhưng phải ghi nhận để hoàn thiện.

## 17.2 Quản lý khóa nội dung và phiên bản

- Mỗi khối nội dung dùng mã nội dung duy nhất.
- Quản lý theo:
  - mã nội dung
  - ngôn ngữ
  - phiên bản
  - trạng thái nội dung
  - hiệu lực
- Không chỉnh sửa trực tiếp nội dung đã xuất bản mà không tăng phiên bản hoặc ghi nhật ký.

## 17.3 Kiểm tra chất lượng song ngữ trước phát hành

Tối thiểu kiểm tra:

- thuật ngữ trạng thái đúng TL14
- thuật ngữ nghiệp vụ đúng TL08 đến TL12
- cảnh báo tài chính và tài sản số không bị sai nghĩa
- liên kết nội dung công khai đúng ngôn ngữ
- nội dung thông báo sự cố không gây hiểu sai

---

## 18. Kiểm soát thay đổi nội dung tuân thủ khi phát hành, bảo trì và sự cố

## 18.1 Liên hệ với TL22

TL23 phải vận hành cùng TL22 trong các tình huống:

- phát hành phiên bản
- thay đổi cấu hình nội dung
- bảo trì có kế hoạch
- sự cố ngoài kế hoạch
- khôi phục dịch vụ

## 18.2 Gói nội dung phải chuẩn bị trước phát hành

Trước mỗi phát hành quan trọng, nên kiểm tra gói nội dung:

- điều khoản và quyền riêng tư còn hiệu lực, không mâu thuẫn tính năng mới
- cảnh báo nạp, rút, tài sản số đúng quy trình hiện tại
- thông báo số liệu tạm thời và đã chốt vẫn đúng
- nội dung thông báo bảo trì và sự cố mẫu sẵn sàng dùng
- nội dung hỗ trợ và liên hệ còn đúng

## 18.3 Nội dung trong bảo trì có kế hoạch

Cần chuẩn bị sẵn mẫu theo mức ảnh hưởng:

- bảo trì chỉ ảnh hưởng thống kê
- bảo trì ảnh hưởng nạp và rút
- bảo trì ảnh hưởng cổng công khai chuyển hướng
- bảo trì ảnh hưởng toàn hệ thống

Mỗi mẫu tối thiểu phải có:
- phạm vi
- thời gian dự kiến
- hành động khuyến nghị
- lưu ý số liệu hoặc thao tác có thể chậm

## 18.4 Nội dung trong sự cố ngoài kế hoạch

- Dùng mẫu thông báo theo TL22 nhưng phải cập nhật thông tin đã xác thực.
- Không nêu nguyên nhân chưa xác thực.
- Ghi phiên bản và thời điểm cập nhật của thông báo.
- Sau khi khôi phục, cập nhật thông báo kết thúc sự cố và lưu ý tồn đọng nếu có.

---

## 19. Mẫu khung nội dung chuẩn hóa cho triển khai giao diện

## 19.1 Mẫu khung cảnh báo thanh toán thủ công

### Mục tiêu
Dùng cho màn hình nạp tiền và các khối hướng dẫn liên quan.

### Trường nội dung chuẩn
- mã nội dung
- tiêu đề
- mô tả ngắn
- danh sách lưu ý bắt buộc
- danh sách hành vi cần tránh
- liên kết hỗ trợ
- phiên bản
- ngôn ngữ
- hiệu lực

## 19.2 Mẫu khung cảnh báo rút tiền thủ công

### Trường nội dung chuẩn
- mã nội dung
- tiêu đề
- điều kiện áp dụng
- cảnh báo kiểm tra thông tin nhận tiền
- cảnh báo sai mạng và sai địa chỉ đối với tài sản số
- thời gian xử lý tham chiếu
- liên kết hỗ trợ
- phiên bản, ngôn ngữ, hiệu lực

## 19.3 Mẫu khung thông báo bảo trì và sự cố

### Trường nội dung chuẩn
- mã nội dung
- loại thông báo
- mức ảnh hưởng
- phân hệ ảnh hưởng
- mô tả hiện trạng
- thời điểm bắt đầu
- thời điểm cập nhật
- hành động khuyến nghị
- kênh hỗ trợ
- phiên bản và ngôn ngữ

## 19.4 Mẫu khung thông báo số liệu tạm thời và đã chốt

### Trường nội dung chuẩn
- mã nội dung
- phạm vi áp dụng
- định nghĩa ngắn số liệu tạm thời
- định nghĩa ngắn số liệu đã chốt
- lưu ý có thể điều chỉnh
- liên kết xem thêm
- phiên bản và ngôn ngữ

## 19.5 Mẫu khung điều khoản hiển thị trên màn hình thao tác nhạy cảm

Áp dụng cho các hộp thoại xác nhận ở cổng quản trị:

- tiêu đề xác nhận
- mô tả tác động
- cảnh báo không thể hoàn tác hoặc cần đối chiếu
- trường nhập lý do nếu bắt buộc
- nhãn nút hành động rõ ràng
- mã tham chiếu hoặc mã thực thể

---

## 20. Ma trận truy vết TL23 với các tài liệu trước

## 20.1 Truy vết nghiệp vụ

- **TL02** → khung dịch vụ, phạm vi nghiệp vụ cần mô tả trung thực
- **TL08** → chính sách nạp tiền thủ công, trạng thái nạp, cảnh báo thanh toán
- **TL09** → chính sách rút tiền thủ công, trạng thái rút, cảnh báo rút
- **TL10** → hiển thị trạng thái chiến dịch, lý do từ chối, cảnh báo số liệu
- **TL11** → hiển thị trạng thái liên kết, cổng công khai, chính sách nội dung liên kết
- **TL12** → công bố tổng quát về chống gian lận và hợp lệ, giới hạn nội dung công bố
- **TL13** → nguyên tắc truy vết dữ liệu, phiên bản nội dung và ghi nhận chấp nhận nội dung
- **TL14** → chuẩn trạng thái, mã lỗi, danh mục mã dùng cho hiển thị
- **TL15** → khuôn thông báo lỗi và phản hồi giao diện lập trình nếu có hiển thị cho người dùng
- **TL16** → phân biệt số liệu tạm thời và đã chốt, đối soát và điều chỉnh
- **TL17** → vòng đời cấu hình nội dung, hiệu lực, phiên bản, song ngữ
- **TL18** → cảnh báo, sự cố, nhật ký và nội dung thông báo tình trạng hệ thống
- **TL19** → che dữ liệu, giới hạn công bố, an toàn nội dung hiển thị
- **TL20** → vị trí hiển thị và quy tắc hiển thị theo màn hình
- **TL21** → ca kiểm thử chấp nhận liên quan thông báo, cảnh báo, trạng thái, điều khoản
- **TL22** → bảo trì, gián đoạn, ứng cứu sự cố và truyền thông tình trạng

## 20.2 Truy vết theo vai trò

- **R01** ↔ trang công khai, trang lỗi, trang báo lỗi, điều khoản công khai, quyền riêng tư, thông báo cổng công khai
- **R10** ↔ điều khoản khách hàng mua chiến dịch, chính sách nạp tiền, chính sách số liệu và chiến dịch
- **R20** ↔ điều khoản nhà xuất bản, chính sách rút tiền, chính sách liên kết, chính sách doanh thu
- **R30** ↔ nội dung quản trị, xác nhận thao tác nhạy cảm, nội dung phê duyệt và vận hành
- **R40** ↔ nội dung hỗ trợ tra cứu, giới hạn hiển thị, truyền thông hỗ trợ theo quyền

---

## 21. Tiêu chí chấp nhận tài liệu TL23

TL23 được xem là đạt khi:

- Có khung điều khoản sử dụng đầy đủ cho R10, R20 và bối cảnh R01
- Có chính sách quyền riêng tư và dữ liệu ở mức hiển thị, không lộ chi tiết nhạy cảm
- Có chính sách nạp, rút thủ công và cảnh báo thanh toán, cảnh báo tài sản số
- Có chính sách số liệu tạm thời và đã chốt
- Có chính sách nội dung liên kết, chiến dịch và xử lý vi phạm
- Có chính sách công bố tổng quát về chống lạm dụng và chống gian lận
- Có quy định bảo trì, gián đoạn dịch vụ và thông báo sự cố
- Có yêu cầu tuân thủ hiển thị theo nhóm màn hình TL20
- Có quy trình quản trị nội dung tuân thủ và xuất bản nội dung theo TL17 và TL22
- Có truy vết chéo nhất quán với TL08 đến TL22

---

## 22. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Không mâu thuẫn phạm vi hợp lệ của dự án trong TL01 và TL02
- [x] Không thay đổi ma trận vai trò và quyền của TL03
- [x] Bám quy trình nạp tiền thủ công TL08
- [x] Bám quy trình rút tiền thủ công TL09
- [x] Bám vòng đời chiến dịch và trạng thái chiến dịch TL10
- [x] Bám liên kết rút gọn, cổng công khai và doanh thu nhà xuất bản TL11
- [x] Công bố chống gian lận ở mức tổng quát, không lộ chi tiết TL12
- [x] Phù hợp nguyên tắc dữ liệu và truy vết TL13
- [x] Dùng đúng trạng thái và mã lỗi theo TL14
- [x] Tương thích khuôn phản hồi giao diện lập trình TL15
- [x] Phân biệt số liệu tạm thời và đã chốt theo TL16
- [x] Bám vòng đời cấu hình nội dung và hiệu lực theo TL17
- [x] Bám nhật ký, cảnh báo, sự cố và truyền thông theo TL18
- [x] Bám ràng buộc bảo mật và che dữ liệu theo TL19
- [x] Bám vị trí hiển thị và luồng màn hình theo TL20
- [x] Hỗ trợ kiểm thử chấp nhận thông báo và cảnh báo theo TL21
- [x] Đồng bộ với quy trình vận hành, bảo trì, ứng cứu sự cố trong TL22

---

## 23. Gợi ý sử dụng TL23 trong triển khai thực tế

- Đội giao diện dùng TL23 để dựng:
  - trang điều khoản sử dụng
  - trang quyền riêng tư
  - khối cảnh báo nạp và rút
  - khối thông báo số liệu tạm thời và đã chốt
  - khối thông báo bảo trì và sự cố
- Đội máy chủ dùng TL23 để:
  - quản lý phiên bản nội dung tuân thủ
  - ghi nhận chấp nhận điều khoản
  - phân phối nội dung theo ngôn ngữ và hiệu lực
- Đội kiểm thử dùng TL23 để bổ sung ca kiểm thử:
  - hiển thị đúng nội dung theo vai trò
  - hiển thị đúng ngôn ngữ
  - hiển thị đúng phiên bản nội dung
  - không lộ dữ liệu hoặc thông tin nội bộ nhạy cảm

---

## 24. Ghi chú cuối tài liệu

- TL23 là tài liệu chuẩn hóa nội dung tuân thủ và hiển thị ở mức đủ để triển khai, kiểm thử và vận hành nhất quán.
- TL23 không thay thế tư vấn pháp lý chuyên biệt; khi cần áp dụng tại khu vực cụ thể, đội dự án có thể bổ sung phụ lục pháp lý nhưng không được làm mâu thuẫn TL08 đến TL22.
- Khi thay đổi quy trình nghiệp vụ, trạng thái, cấu hình hiệu lực hoặc quy trình vận hành, phải rà soát cập nhật TL23 tương ứng.
