# TL27 — Hướng dẫn thao tác theo vai trò cho R30 và R40

## 1. Thông tin tài liệu

- **Mã tài liệu:** TL27
- **Tên tài liệu:** Hướng dẫn thao tác theo vai trò cho R30 và R40
- **Phiên bản:** 1.0
- **Trạng thái:** Hoàn thành vòng hiện tại
- **Tài liệu đầu vào:** TL01, TL02, TL03, TL08, TL09, TL10, TL11, TL12, TL13, TL14, TL15, TL16, TL17, TL18, TL19, TL20, TL21, TL22, TL23, TL24, TL25, TL26, TL28, TL29
- **Tài liệu đầu ra phụ thuộc:** sổ tay vận hành nội bộ, tài liệu đào tạo R30/R40, kịch bản hỗ trợ người dùng, checklist thao tác nhạy cảm, kịch bản diễn tập nội bộ, mẫu phản hồi hỗ trợ bám nội dung hiển thị

---

## 2. Mục tiêu, phạm vi và nguyên tắc

## 2.1 Mục tiêu

TL27 quy định hướng dẫn thao tác theo vai trò **R30 (vận hành quản trị)** và **R40 (hỗ trợ / tra cứu / xử lý theo quyền hạn được cấp)** để:

- chuẩn hóa cách thao tác trên các màn hình đã đặc tả ở TL20 và quy chuẩn ở TL29
- giảm sai sót khi xử lý các luồng nhạy cảm (nạp, rút, chiến dịch, liên kết, đối soát, cấu hình, nội dung tuân thủ)
- bảo đảm tuân thủ phân quyền theo TL03 và an toàn thao tác theo TL19
- đồng bộ nội dung phản hồi, cảnh báo, giải thích theo TL23
- hỗ trợ đào tạo nội bộ, bàn giao vận hành theo TL24
- làm tài liệu tham chiếu thực tế cho dev, trợ lý lập trình khi xây màn hình nghiệp vụ và nhật ký thao tác

## 2.2 Phạm vi TL27

Trong phạm vi:

- vai trò R30 và R40
- thao tác trên các màn hình nội bộ chính
- checklist trước / trong / sau thao tác nhạy cảm
- hướng dẫn xử lý các tình huống thường gặp và lỗi phổ biến
- quy tắc phân biệt tình huống xử lý được ngay và phải chuyển tuyến
- quy tắc ghi chú nội bộ, truy vết, sử dụng mã lỗi / mã truy vết
- quy trình phối hợp R30 ↔ R40 ↔ vận hành kỹ thuật ↔ dev hỗ trợ
- hướng dẫn đào tạo và đánh giá thao tác cơ bản

Ngoài phạm vi:

- hướng dẫn chi tiết cho R10 và R20 (người dùng bên ngoài)
- quy trình ứng cứu hạ tầng chuyên sâu (TL22)
- thuật toán chống gian lận và tiêu chí nội bộ chi tiết (TL12)
- đặc tả giao diện lập trình và cấu trúc dữ liệu (TL15, TL13)
- mã nguồn giao diện / máy chủ (TL26)

## 2.3 Nguyên tắc thao tác vận hành

- **Đúng quyền trước, nhanh sau.**
- **Không suy đoán trạng thái nghiệp vụ; luôn dựa theo trạng thái hiển thị chuẩn TL14.**
- **Mọi thao tác nhạy cảm phải có xác nhận, lý do (nếu yêu cầu), và nhật ký kiểm toán.**
- **Không “xử lý hộ” ngoài quy trình bằng thay đổi dữ liệu thủ công.**
- **Không công khai thông tin nội bộ chống gian lận hoặc chi tiết kỹ thuật nhạy cảm cho người dùng.**
- **Khi nghi ngờ sai lệch tài chính / dữ liệu, dừng thao tác tiếp và chuyển tuyến đúng quy trình.**
- **Ưu tiên truy vết bằng mã thực thể + mã lỗi + mã truy vết thay vì mô tả cảm tính.**

---

## 3. Mối liên hệ TL27 với các tài liệu đã ban hành

## 3.1 Vai trò của TL27 trong bộ tài liệu

- **TL20**: cho biết màn hình, luồng, vị trí thao tác
- **TL29**: cho biết quy chuẩn hiển thị, trạng thái, hộp thoại xác nhận
- **TL03**: xác định vai trò và phân quyền
- **TL14**: chuẩn trạng thái và mã lỗi
- **TL23**: chuẩn nội dung hiển thị, thông báo, chính sách
- **TL22**: vận hành triển khai, ứng cứu sự cố
- **TL28**: dữ liệu đào tạo và kịch bản diễn tập
- **TL27**: tài liệu “cách thao tác thực tế” cho R30, R40 trên giao diện và trong phối hợp xử lý

## 3.2 Quy tắc xử lý mâu thuẫn

Nếu hướng dẫn thao tác trong TL27 mâu thuẫn với tài liệu lõi:

1. Ưu tiên TL03 (phân quyền)
2. Ưu tiên TL08–TL17 (nghiệp vụ, dữ liệu, xử lý nền, cấu hình)
3. Ưu tiên TL14, TL15 (trạng thái, mã lỗi, hợp đồng dữ liệu)
4. Ưu tiên TL20, TL23, TL29 (màn hình, nội dung hiển thị, quy chuẩn giao diện)
5. Ưu tiên TL22 (ứng cứu sự cố)
6. Cập nhật TL27 để đồng bộ lại, không giữ hướng dẫn thao tác sai

---

## 4. Định nghĩa vai trò, ranh giới trách nhiệm và nguyên tắc phân tuyến

## 4.1 Vai trò R30 (vận hành quản trị)

R30 là vai trò vận hành nghiệp vụ có quyền thao tác trên một số luồng nhạy cảm theo phân quyền được cấp. Tùy cấu hình quyền cụ thể (TL03), R30 có thể thực hiện:

- duyệt / từ chối nạp tiền thủ công
- duyệt / từ chối / hoàn trả / hoàn thành rút tiền thủ công
- duyệt / từ chối chiến dịch
- quản lý trạng thái liên kết (khóa / mở trong phạm vi quyền)
- xử lý hàng kiểm tra thủ công (mức quyền phù hợp)
- thực hiện hoặc chuẩn bị thao tác đối soát / kết chuyển
- thay đổi cấu hình hệ thống (phần được cấp quyền)
- xuất bản nội dung tuân thủ (phần được cấp quyền)
- tra cứu nhật ký, cảnh báo, mã truy vết theo quyền

## 4.2 Vai trò R40 (hỗ trợ / tra cứu / xử lý theo quyền hạn được cấp)

R40 là vai trò hỗ trợ vận hành và chăm sóc xử lý nghiệp vụ mức an toàn hơn, thường tập trung:

- tra cứu yêu cầu nạp/rút/chiến dịch/liên kết
- hướng dẫn người dùng theo nội dung chuẩn
- ghi nhận vấn đề, phân loại và chuyển tuyến
- xử lý các tác vụ hỗ trợ được phân quyền (không chạm thao tác tài chính nhạy cảm nếu không có quyền)
- theo dõi tiến độ xử lý và phản hồi lại người dùng
- tổng hợp mã lỗi, mã truy vết, ảnh chụp màn hình, ghi chú nội bộ để bàn giao ca

## 4.3 Nguyên tắc phân tuyến xử lý

### R40 xử lý được ngay (nếu đủ quyền)
- tra cứu trạng thái
- giải thích thông điệp / mã lỗi theo hướng dẫn
- hướng dẫn bổ sung hồ sơ / chứng từ
- chuyển tiếp yêu cầu đúng nhóm
- cập nhật ghi chú hỗ trợ nội bộ
- đóng yêu cầu hỗ trợ khi vấn đề đã rõ và không cần thao tác nhạy cảm

### R40 phải chuyển R30
- yêu cầu duyệt / từ chối / hoàn trả / hoàn thành giao dịch tài chính
- yêu cầu thay đổi trạng thái chiến dịch / liên kết ảnh hưởng phát sinh tiền / lượt
- yêu cầu xử lý hàng kiểm tra thủ công nghiệp vụ nhạy cảm
- yêu cầu chốt đối soát / kết chuyển
- yêu cầu thay đổi cấu hình hoặc nội dung tuân thủ cần quyền cao hơn

### R30 phải chuyển vận hành kỹ thuật / dev hỗ trợ
- lỗi hệ thống lặp lại nhiều lần
- sai lệch số liệu nghi ngờ liên quan ví / sổ cái / đối soát
- hàng đợi kẹt hoặc tác vụ nền lỗi vượt ngưỡng
- lỗi không thể xử lý bằng thao tác giao diện chuẩn
- nghi ngờ lỗi triển khai / cấu hình / dữ liệu nền
- sự cố ảnh hưởng nhiều người dùng hoặc nhiều màn hình

---

## 5. Bảng tóm tắt thao tác theo vai trò và nhóm chức năng

## 5.1 Ma trận thao tác mức cao (không thay thế TL03)

Bảng này là hướng dẫn vận hành, quyền thực tế vẫn phụ thuộc cấu hình phân quyền hệ thống.

### Nhóm nạp tiền thủ công
- **R40:** tra cứu, giải thích trạng thái, yêu cầu bổ sung thông tin/chứng từ, chuyển tuyến
- **R30:** duyệt / từ chối / yêu cầu bổ sung (nếu luồng có), kiểm tra bằng chứng, tra cứu nhật ký

### Nhóm rút tiền thủ công
- **R40:** tra cứu trạng thái, giải thích điều kiện, ghi nhận phản ánh, chuyển tuyến
- **R30:** duyệt / từ chối / hoàn trả / hoàn thành, kiểm tra bằng chứng, xử lý treo theo quyền

### Nhóm chiến dịch
- **R40:** tra cứu, giải thích trạng thái, hướng dẫn chỉnh sửa thông tin
- **R30:** duyệt / từ chối / tạm dừng / xử lý theo quyền, xem cờ rủi ro mức được phép

### Nhóm liên kết rút gọn
- **R40:** tra cứu trạng thái, ghi nhận phản ánh liên kết lỗi
- **R30:** khóa / mở khóa / xử lý trạng thái theo quyền, phối hợp kiểm tra công khai R01

### Nhóm chống gian lận / kiểm tra thủ công
- **R40:** chỉ tra cứu / ghi nhận / chuyển tuyến (nếu không có quyền xử lý)
- **R30:** xử lý hàng kiểm tra thủ công theo quy trình, ghi lý do quyết định

### Nhóm đối soát / kết chuyển
- **R40:** tra cứu trạng thái kỳ, hỗ trợ tổng hợp thông tin
- **R30:** chốt / kiểm tra / kết chuyển theo quyền và checklist chặt

### Nhóm cấu hình / nội dung tuân thủ
- **R40:** tra cứu, đối chiếu phiên bản nội dung
- **R30:** thay đổi cấu hình trong phạm vi, xuất bản nội dung, ghi nhật ký kiểm toán

---

## 6. Hướng dẫn thao tác chung trước khi vào từng nghiệp vụ

## 6.1 Checklist đầu ca làm việc (R30, R40)

- [ ] Đăng nhập đúng tài khoản / đúng vai trò
- [ ] Kiểm tra môi trường đang thao tác (tránh nhầm kiểm thử / vận hành thật)
- [ ] Kiểm tra thông báo hệ thống / cảnh báo nổi bật (nếu có)
- [ ] Kiểm tra thay đổi chính sách / cấu hình liên quan đến ca trực
- [ ] Mở kênh ghi nhận nội bộ (ghi chú ca, danh sách công việc)
- [ ] Xác nhận phân quyền hiện tại (nếu mới cấp quyền hoặc thay đổi quyền)
- [ ] Kiểm tra múi giờ hiển thị và ngôn ngữ giao diện (tránh hiểu sai thời gian)

## 6.2 Quy tắc xác minh thực thể trước thao tác

Trước mọi thao tác trên một yêu cầu / chiến dịch / liên kết / kỳ đối soát, phải xác minh tối thiểu:

- mã thực thể
- trạng thái hiện tại
- chủ thể liên quan (R10 hoặc R20)
- thời điểm tạo / cập nhật gần nhất
- lịch sử xử lý gần nhất (nếu có)
- cảnh báo / cờ đặc biệt hiển thị trên màn hình
- quyền của người đang thao tác có phù hợp hay không

## 6.3 Quy tắc ghi nhận mã truy vết và mã lỗi

Khi gặp lỗi hoặc cần chuyển tuyến, R30/R40 phải ghi lại tối thiểu:
- mã thực thể
- mã lỗi (nếu có)
- mã truy vết (nếu có)
- thời điểm xảy ra
- thao tác vừa thực hiện
- ảnh chụp màn hình / bằng chứng hiển thị (nếu cần)

Không ghi:
- thông tin bí mật hệ thống
- dữ liệu nhạy cảm đầy đủ không cần thiết (theo TL19)

---

## 7. Hướng dẫn cho R40 — tra cứu, hỗ trợ và chuyển tuyến

## 7.1 Quy trình chuẩn R40 khi tiếp nhận yêu cầu hỗ trợ

1. Xác nhận loại vấn đề (nạp / rút / chiến dịch / liên kết / đăng nhập / nội dung / thống kê)
2. Tra cứu thực thể bằng mã phù hợp (không tìm theo thông tin mơ hồ nếu chưa xác thực)
3. Đối chiếu trạng thái hiện tại theo TL14 (hiển thị trên hệ thống)
4. Kiểm tra lịch sử xử lý và ghi chú nội bộ (nếu có quyền)
5. Phân loại:
   - giải thích được ngay
   - cần người dùng bổ sung thông tin
   - cần chuyển R30
   - cần chuyển vận hành kỹ thuật
6. Ghi nhận mã lỗi / mã truy vết nếu có
7. Phản hồi người dùng theo nội dung chuẩn TL23
8. Ghi chú nội bộ và trạng thái yêu cầu hỗ trợ

## 7.2 Quy tắc trả lời của R40

### Được phép
- giải thích trạng thái hiện tại theo ngôn ngữ dễ hiểu
- hướng dẫn bước tiếp theo cho người dùng
- thông báo đang chuyển xử lý cho bộ phận phù hợp
- yêu cầu người dùng cung cấp mã thực thể, bằng chứng, thời điểm lỗi

### Không được phép
- hứa thời gian xử lý chắc chắn khi chưa có xác nhận nội bộ
- suy đoán nguyên nhân kỹ thuật chi tiết
- tiết lộ quy tắc chống gian lận nội bộ
- khẳng định “hệ thống lỗi” khi chưa có xác minh
- tự hướng dẫn người dùng thao tác vượt phạm vi chính sách

## 7.3 Mẫu phân loại xử lý R40 (thực tế vận hành)

### Nhóm A — Giải thích trạng thái
Ví dụ:
- yêu cầu nạp đang chờ duyệt
- yêu cầu rút đang xử lý
- chiến dịch đang chờ duyệt / bị từ chối
- liên kết tạm khóa

Hành động:
- giải thích ngắn gọn trạng thái
- nêu bước tiếp theo hoặc điều kiện cần bổ sung
- không suy luận thêm ngoài trạng thái hiển thị

### Nhóm B — Yêu cầu bổ sung thông tin
Ví dụ:
- thiếu chứng từ
- tệp lỗi định dạng
- thông tin chưa đủ để tra cứu

Hành động:
- yêu cầu bổ sung đúng loại thông tin
- nêu định dạng / phạm vi chấp nhận (bám TL23/TL29)
- ghi chú nội bộ “đang chờ người dùng bổ sung”

### Nhóm C — Cần chuyển R30
Ví dụ:
- yêu cầu duyệt nạp / rút
- xin xem xét lại quyết định từ chối
- cần mở/khóa liên kết
- cần xử lý hàng kiểm tra thủ công

Hành động:
- tổng hợp thông tin gọn và đầy đủ
- gắn mức ưu tiên (nếu có tiêu chí)
- chuyển tuyến và theo dõi

### Nhóm D — Cần chuyển vận hành kỹ thuật
Ví dụ:
- lỗi lặp lại nhiều người dùng
- trang lỗi bất thường hàng loạt
- dữ liệu hiển thị không cập nhật kéo dài
- nghi ngờ sự cố xử lý nền / hàng đợi

Hành động:
- ghi mã truy vết, mã lỗi, ảnh chụp, thời gian
- không yêu cầu người dùng thử quá nhiều lần gây rối
- chuyển tuyến theo quy trình TL22

## 7.4 Checklist bàn giao ca cho R40

- [ ] Danh sách yêu cầu đang mở và trạng thái hiện tại
- [ ] Yêu cầu đã chuyển R30 nhưng chưa phản hồi
- [ ] Yêu cầu đã chuyển vận hành kỹ thuật / dev hỗ trợ
- [ ] Mã lỗi lặp lại đáng chú ý trong ca
- [ ] Người dùng cần gọi lại / phản hồi tiếp
- [ ] Ghi chú cảnh báo hoặc thay đổi chính sách ảnh hưởng hỗ trợ

---

## 8. Hướng dẫn cho R30 — thao tác vận hành nghiệp vụ và kiểm soát rủi ro

## 8.1 Quy trình chuẩn R30 khi xử lý một yêu cầu nhạy cảm

1. Mở chi tiết thực thể cần xử lý
2. Xác minh mã thực thể, trạng thái hiện tại, chủ thể liên quan
3. Kiểm tra điều kiện xử lý theo luồng nghiệp vụ (TL08–TL12, TL16, TL17)
4. Kiểm tra quyền thao tác hiện tại (TL03)
5. Kiểm tra bằng chứng / dữ liệu bổ sung / lịch sử xử lý
6. Kiểm tra cảnh báo / cờ rủi ro / trạng thái hệ thống liên quan
7. Chọn thao tác phù hợp
8. Đọc kỹ hộp thoại xác nhận (TL29), nhập lý do nếu yêu cầu
9. Thực hiện thao tác
10. Xác nhận kết quả phản hồi:
    - trạng thái mới
    - nhật ký / lịch sử xử lý
    - thông báo thành công / mã lỗi / mã truy vết
11. Ghi chú nội bộ nếu cần và phản hồi lại R40 / người dùng qua kênh đúng quy trình

## 8.2 Quy tắc dừng thao tác và chuyển tuyến với R30

R30 phải dừng thao tác ngay và chuyển tuyến khi gặp:
- sai lệch số liệu tài chính không giải thích được từ lịch sử
- trạng thái hiển thị mâu thuẫn giữa nhiều khối dữ liệu
- lỗi thao tác lặp tạo kết quả khó xác định (nghi ngờ xử lý trùng)
- cảnh báo hệ thống liên quan dữ liệu / hàng đợi / đối soát
- hành vi giao diện khác thường khiến không chắc thao tác đã thực thi
- yêu cầu vượt quyền hiện tại hoặc có xung đột quyền

---

## 9. Hướng dẫn nghiệp vụ chi tiết — Nạp tiền thủ công (R40, R30)

## 9.1 Mục tiêu và phạm vi thao tác

Bám TL08, TL14, TL20, TL29:
- tra cứu yêu cầu nạp
- kiểm tra chứng từ
- duyệt / từ chối / yêu cầu bổ sung (nếu luồng có)
- xác nhận cập nhật trạng thái, ví, nhật ký

## 9.2 R40 — Quy trình hỗ trợ nạp tiền thủ công

### Tình huống phổ biến R40 xử lý
- người dùng hỏi trạng thái nạp
- người dùng hỏi vì sao bị từ chối
- người dùng hỏi cần bổ sung gì
- người dùng báo đã nộp nhưng chưa thấy cập nhật

### Bước xử lý chuẩn
1. Tra cứu yêu cầu nạp theo mã
2. Kiểm tra trạng thái hiện tại
3. Kiểm tra ghi chú / lý do từ chối / yêu cầu bổ sung (nếu hiển thị theo quyền)
4. Phản hồi theo mẫu nội dung TL23
5. Nếu cần xử lý nghiệp vụ tiếp, chuyển R30 kèm đủ thông tin

### Checklist R40 khi chuyển R30
- [ ] Mã yêu cầu nạp
- [ ] Trạng thái hiện tại
- [ ] Thời điểm người dùng phản ánh
- [ ] Mã lỗi / mã truy vết (nếu có)
- [ ] Mô tả ngắn vấn đề
- [ ] Ảnh / tệp / bằng chứng người dùng cung cấp (nếu có)

## 9.3 R30 — Quy trình duyệt / từ chối nạp

### Trước thao tác
- [ ] Xác minh trạng thái yêu cầu cho phép duyệt / từ chối
- [ ] Kiểm tra chứng từ hiển thị đầy đủ và đọc được
- [ ] Kiểm tra dấu hiệu trùng / bất thường hiển thị (nếu có)
- [ ] Kiểm tra ghi chú trước đó (nếu đã từng xử lý)
- [ ] Xác minh quyền thao tác

### Duyệt nạp (mẫu luồng)
1. Mở chi tiết yêu cầu nạp
2. Xem chứng từ / thông tin liên quan
3. Chọn thao tác “Duyệt”
4. Xác nhận trên hộp thoại:
   - mã yêu cầu
   - trạng thái hiện tại → trạng thái sau xử lý
   - cảnh báo tác động số dư
5. Nhập ghi chú / lý do (nếu hệ thống yêu cầu)
6. Xác nhận thao tác
7. Kiểm tra kết quả:
   - trạng thái yêu cầu nạp đã cập nhật
   - lịch sử xử lý có thêm bản ghi
   - (nếu màn hình hiển thị) số dư ví / bút toán liên quan đã cập nhật hoặc thông báo sẽ cập nhật
   - thông báo thành công / mã truy vết nếu lỗi

### Từ chối nạp
1. Xác định lý do từ chối theo hướng dẫn nghiệp vụ
2. Chọn thao tác “Từ chối”
3. Bắt buộc nhập lý do (nếu luồng yêu cầu)
4. Xác nhận thao tác và kiểm tra trạng thái mới
5. Kiểm tra lý do hiển thị đúng để R40 có thể tra cứu / phản hồi

## 9.4 Dấu hiệu cần chuyển tuyến kỹ thuật ở luồng nạp

- thao tác duyệt báo thành công nhưng trạng thái không đổi sau làm mới
- trạng thái đã đổi nhưng lịch sử xử lý không ghi nhận
- lỗi lặp lại trên nhiều yêu cầu nạp
- bằng chứng không mở được hàng loạt
- nghi ngờ ghi nhận số dư / sổ cái không nhất quán (theo màn hình hiển thị)

---

## 10. Hướng dẫn nghiệp vụ chi tiết — Rút tiền thủ công (R40, R30)

## 10.1 Mục tiêu và phạm vi thao tác

Bám TL09, TL14, TL20, TL29:
- tra cứu yêu cầu rút
- duyệt / từ chối / hoàn trả / hoàn thành theo trạng thái cho phép
- kiểm tra bằng chứng xử lý
- theo dõi yêu cầu treo và xử lý theo quyền

## 10.2 R40 — Quy trình hỗ trợ rút tiền thủ công

### Tình huống phổ biến
- người dùng hỏi yêu cầu rút đang ở bước nào
- người dùng bị từ chối và hỏi lý do
- người dùng báo đã chờ lâu
- người dùng báo số dư / trạng thái hiển thị chưa khớp kỳ vọng

### Bước xử lý chuẩn
1. Tra cứu yêu cầu rút theo mã
2. Kiểm tra trạng thái và thời điểm cập nhật gần nhất
3. Kiểm tra lý do từ chối / ghi chú xử lý (nếu có quyền)
4. Phản hồi trong phạm vi cho phép
5. Nếu quá ngưỡng thời gian / cần quyết định nghiệp vụ → chuyển R30
6. Nếu nghi ngờ lỗi hệ thống / dữ liệu → chuyển tuyến kỹ thuật theo quy trình

## 10.3 R30 — Quy trình duyệt / xử lý rút tiền

### Checklist trước thao tác
- [ ] Xác minh trạng thái yêu cầu rút cho phép thao tác mục tiêu
- [ ] Xác minh số liệu hiển thị liên quan (khả dụng / khóa tạm) ở mức màn hình cung cấp
- [ ] Xác minh thông tin nhận tiền / phương thức theo luồng
- [ ] Kiểm tra cảnh báo / cờ rủi ro (nếu có và theo quyền)
- [ ] Xác minh quyền thao tác

### Duyệt rút
1. Mở chi tiết yêu cầu rút
2. Kiểm tra thông tin yêu cầu
3. Chọn “Duyệt” (nếu trạng thái phù hợp)
4. Xác nhận hộp thoại và nhập ghi chú nếu yêu cầu
5. Kiểm tra trạng thái sau duyệt (ví dụ chuyển sang đang xử lý theo TL14)

### Hoàn thành rút
1. Kiểm tra yêu cầu đang ở trạng thái cho phép hoàn thành
2. Tải lên / kiểm tra bằng chứng xử lý (nếu luồng yêu cầu)
3. Chọn “Hoàn thành”
4. Xác nhận thao tác
5. Kiểm tra trạng thái cuối, lịch sử xử lý, ghi chú

### Từ chối / hoàn trả rút
1. Xác định lý do rõ ràng
2. Chọn thao tác phù hợp (từ chối hoặc hoàn trả theo trạng thái)
3. Bắt buộc nhập lý do nếu hệ thống yêu cầu
4. Xác nhận và kiểm tra:
   - trạng thái mới
   - lịch sử xử lý
   - số liệu liên quan hiển thị đã phản ánh đúng (nếu màn hình có)

## 10.4 Xử lý yêu cầu rút treo (R30)

Khi gặp yêu cầu treo quá ngưỡng vận hành:
1. Xác minh trạng thái hiện tại và thời điểm cập nhật
2. Kiểm tra lịch sử xử lý và lỗi gần nhất
3. Kiểm tra cảnh báo / mã lỗi / mã truy vết
4. Xử lý theo quyền:
   - thử lại thao tác phù hợp (nếu có)
   - chuyển kiểm tra thủ công
   - hoàn trả / từ chối (nếu đúng điều kiện và quy trình)
5. Nếu không xác định được tác động số dư → dừng và chuyển kỹ thuật

## 10.5 Dấu hiệu rủi ro cao phải dừng thao tác ngay

- trạng thái thay đổi bất thường sau làm mới
- số liệu khả dụng / khóa tạm hiển thị mâu thuẫn
- thao tác trước đó không rõ đã chạy hay chưa
- lỗi xử lý trùng / xung đột lặp nhiều lần
- cảnh báo sai lệch tài chính hoặc cảnh báo hệ thống liên quan ví/sổ cái

---

## 11. Hướng dẫn nghiệp vụ chi tiết — Chiến dịch và liên kết rút gọn (R40, R30)

## 11.1 Phạm vi thao tác

Bám TL10, TL11, TL12, TL20, TL29:
- tra cứu trạng thái chiến dịch / liên kết
- duyệt / từ chối chiến dịch (R30)
- tạm dừng / xử lý trạng thái liên kết theo quyền (R30)
- giải thích trạng thái và phản hồi hỗ trợ (R40)
- phối hợp khi liên kết công khai R01 có vấn đề

## 11.2 R40 — Hỗ trợ chiến dịch / liên kết

### Tình huống thường gặp
- chiến dịch chờ duyệt quá lâu
- chiến dịch bị từ chối cần biết lý do
- liên kết không truy cập được / chuyển hướng lỗi
- số liệu lượt / doanh thu chưa cập nhật như kỳ vọng

### Bước xử lý
1. Tra cứu chiến dịch hoặc liên kết
2. Kiểm tra trạng thái hiện tại
3. Kiểm tra ghi chú / lý do (nếu hiển thị theo quyền)
4. Phân biệt:
   - lỗi trạng thái nghiệp vụ
   - lỗi hiển thị công khai R01
   - số liệu tạm thời / đang tổng hợp (TL16)
5. Phản hồi theo TL23, tránh hứa hẹn ngoài quy trình
6. Chuyển R30 hoặc kỹ thuật khi cần

## 11.3 R30 — Duyệt / từ chối chiến dịch

### Checklist trước thao tác
- [ ] Trạng thái chiến dịch cho phép duyệt / từ chối
- [ ] Thông tin chiến dịch hiển thị đủ để quyết định
- [ ] Cảnh báo / cờ rủi ro (nếu có và được quyền xem)
- [ ] Quyền thao tác của tài khoản hiện tại
- [ ] Ghi chú lịch sử trước đó (nếu tái xét)

### Duyệt chiến dịch
1. Mở chi tiết chiến dịch
2. Đọc tóm tắt + cấu hình chính
3. Chọn “Duyệt”
4. Xác nhận hộp thoại
5. Kiểm tra trạng thái sau duyệt và nhật ký thao tác

### Từ chối chiến dịch
1. Chọn “Từ chối”
2. Nhập lý do theo chuẩn nội bộ / nội dung hiển thị
3. Xác nhận
4. Kiểm tra lý do hiển thị đúng để hỗ trợ sau này

## 11.4 R30 — Quản lý trạng thái liên kết

Áp dụng cho thao tác khóa / mở khóa / xử lý trạng thái theo quyền:
- xác minh mã liên kết và trạng thái hiện tại
- kiểm tra liên kết thuộc chiến dịch nào
- kiểm tra tác động nghiệp vụ dự kiến
- thao tác qua hộp thoại xác nhận có lý do (nếu yêu cầu)
- kiểm tra lại bằng xem trạng thái sau thao tác
- nếu cần, phối hợp kiểm tra hiển thị công khai R01

## 11.5 Phối hợp khi liên kết công khai R01 lỗi

### R40 thực hiện
- ghi mã liên kết, thời điểm lỗi, ảnh chụp, URL công khai (nếu có)
- kiểm tra trạng thái liên kết nội bộ (nếu có quyền)
- chuyển R30 hoặc kỹ thuật theo phân loại

### R30 thực hiện
- kiểm tra trạng thái liên kết / chiến dịch
- kiểm tra có thay đổi gần đây không
- nếu trạng thái nội bộ bình thường nhưng R01 lỗi nhiều trường hợp → chuyển kỹ thuật

---

## 12. Hướng dẫn nghiệp vụ chi tiết — Hàng kiểm tra thủ công và cờ rủi ro (R30, R40)

## 12.1 Nguyên tắc bảo mật thông tin chống gian lận

Bám TL12, TL19, TL23:
- không công khai tiêu chí nội bộ cho người dùng
- R40 chỉ xem / xử lý trong phạm vi quyền
- R30 ghi nhận quyết định xử lý theo lý do nghiệp vụ được phép hiển thị
- nội dung phản hồi ra ngoài chỉ dùng thông điệp được duyệt

## 12.2 R40 — Vai trò trong luồng cờ rủi ro

R40 thường:
- tra cứu trạng thái tổng quát của yêu cầu / chiến dịch / liên kết
- ghi nhận người dùng phản ánh liên quan trạng thái “chờ kiểm tra”
- chuyển tuyến cho R30 nếu cần quyết định
- không tự giải thích chi tiết lý do gắn cờ nội bộ

## 12.3 R30 — Xử lý hàng kiểm tra thủ công (mức vận hành)

### Checklist xử lý một mục kiểm tra
- [ ] Xác minh mã thực thể liên quan
- [ ] Xác minh trạng thái hiện tại và lý do đưa vào hàng kiểm tra (mức hiển thị theo quyền)
- [ ] Kiểm tra dữ liệu hỗ trợ / lịch sử liên quan
- [ ] Kiểm tra quyền xử lý hàng kiểm tra
- [ ] Chọn quyết định phù hợp theo luồng nghiệp vụ
- [ ] Ghi lý do quyết định
- [ ] Xác nhận và kiểm tra trạng thái sau xử lý

### Quy tắc ghi lý do
- rõ ràng, ngắn gọn, có thể truy vết
- không ghi chi tiết tiêu chí chống gian lận nội bộ nếu không cần
- đủ để R40 giải thích theo TL23 trong phạm vi cho phép

## 12.4 Khi nào phải chuyển tuyến kỹ thuật trong luồng này

- hàng kiểm tra không tải / lỗi hệ thống
- thao tác xử lý không cập nhật trạng thái
- cùng lỗi lặp lại trên nhiều mục
- dữ liệu phụ trợ hiển thị không đồng nhất / thiếu bất thường
- nghi ngờ sự cố xử lý nền / hàng đợi liên quan TL16, TL22

---

## 13. Hướng dẫn nghiệp vụ chi tiết — Đối soát và kết chuyển (R30, R40)

## 13.1 Phạm vi và mức độ nhạy cảm

Đây là nhóm thao tác nhạy cảm cao, bám TL16, TL18, TL22, TL29. Mọi thao tác phải có checklist chặt, xác nhận rõ, và nhật ký kiểm toán.

## 13.2 R40 — Vai trò hỗ trợ ở luồng đối soát / kết chuyển

R40 chỉ thực hiện trong phạm vi an toàn:
- tra cứu trạng thái kỳ đối soát
- tổng hợp thông tin yêu cầu từ R30
- theo dõi tiến độ và ghi nhận thông báo
- chuyển cảnh báo / lỗi cho R30 hoặc vận hành kỹ thuật

R40 không tự thực hiện thao tác chốt / kết chuyển nếu không có quyền được cấp rõ ràng.

## 13.3 R30 — Checklist trước thao tác chốt đối soát

- [ ] Xác minh đúng kỳ đối soát (tránh nhầm kỳ)
- [ ] Kiểm tra trạng thái kỳ cho phép chốt
- [ ] Kiểm tra cảnh báo hệ thống / hàng đợi / dữ liệu liên quan
- [ ] Kiểm tra không có sự cố mở ảnh hưởng dữ liệu kỳ
- [ ] Xác minh quyền thao tác chốt đối soát
- [ ] Chuẩn bị mã truy vết / ghi chú ca nếu quy trình yêu cầu
- [ ] Thông báo nội bộ (nếu quy trình yêu cầu thông báo trước)

## 13.4 Quy trình chốt đối soát (R30)

1. Mở màn hình chi tiết kỳ đối soát
2. Kiểm tra số liệu và trạng thái hiển thị
3. Chọn “Chốt đối soát”
4. Đọc kỹ hộp thoại xác nhận:
   - kỳ đối soát
   - trạng thái hiện tại → trạng thái dự kiến
   - cảnh báo tác động
5. Nhập lý do / ghi chú nếu yêu cầu
6. Xác nhận
7. Theo dõi phản hồi:
   - thành công ngay / đang xử lý nền / lỗi
8. Kiểm tra nhật ký / trạng thái kỳ sau thao tác

## 13.5 Quy trình kết chuyển (R30)

- chỉ thực hiện khi kỳ ở trạng thái cho phép
- kiểm tra lại số liệu và cảnh báo
- thao tác qua hộp thoại xác nhận có cảnh báo rõ
- xác nhận trạng thái sau kết chuyển
- kiểm tra nhật ký kiểm toán và lịch sử tác vụ liên quan

## 13.6 Dấu hiệu phải dừng thao tác và chuyển kỹ thuật

- trạng thái kỳ đối soát mâu thuẫn giữa danh sách và chi tiết
- thao tác chốt / kết chuyển báo lỗi xung đột lặp nhiều lần
- nghi ngờ chạy trùng tác vụ
- số liệu hiển thị biến động bất thường ngay trước thao tác
- cảnh báo hệ thống dữ liệu / hàng đợi đang lỗi chưa được xử lý

---

## 14. Hướng dẫn nghiệp vụ chi tiết — Cấu hình hệ thống và nội dung tuân thủ (R30, R40)

## 14.1 Mục tiêu

Bám TL17, TL23, TL29:
- thay đổi cấu hình trong phạm vi quyền
- xuất bản nội dung tuân thủ / chính sách
- tra cứu phiên bản, hiệu lực, lịch sử thay đổi
- bảo đảm nội dung hiển thị đúng và có truy vết

## 14.2 R40 — Vai trò hỗ trợ

- tra cứu phiên bản nội dung và thời điểm hiệu lực
- xác nhận người dùng đã / chưa chấp nhận nội dung (nếu có quyền)
- giải thích cách xem điều khoản / chính sách
- chuyển R30 khi cần thay đổi nội dung hoặc cấu hình

## 14.3 R30 — Quy trình thay đổi cấu hình (mức được cấp quyền)

### Checklist trước thay đổi
- [ ] Xác minh môi trường thao tác
- [ ] Xác minh cấu hình mục tiêu và giá trị hiện tại
- [ ] Xác minh quyền thay đổi cấu hình này
- [ ] Đọc cảnh báo tác động (nếu có)
- [ ] Kiểm tra thời điểm hiệu lực
- [ ] Có kế hoạch quay lui / giá trị trước thay đổi (nếu quy trình yêu cầu)

### Thao tác thay đổi
1. Mở màn hình cấu hình
2. Chỉnh giá trị trong phạm vi được phép
3. Kiểm tra xác thực dữ liệu trên giao diện
4. Chọn lưu / áp dụng
5. Xác nhận trên hộp thoại
6. Kiểm tra:
   - giá trị hiển thị sau lưu
   - thời điểm hiệu lực
   - nhật ký kiểm toán thay đổi

## 14.4 R30 — Quy trình xuất bản nội dung tuân thủ

### Checklist trước xuất bản
- [ ] Đúng phiên bản nội dung (Việt / Anh)
- [ ] Đúng trạng thái nội dung cho phép xuất bản
- [ ] Xem trước nội dung hiển thị
- [ ] Kiểm tra thời điểm hiệu lực
- [ ] Xác minh quyền xuất bản

### Thao tác xuất bản
1. Mở chi tiết nội dung / phiên bản
2. Kiểm tra song ngữ và siêu thông tin
3. Chọn “Xuất bản”
4. Xác nhận hộp thoại
5. Kiểm tra:
   - trạng thái đã xuất bản
   - phiên bản / hiệu lực hiển thị đúng
   - nhật ký kiểm toán

## 14.5 Dấu hiệu cần chuyển tuyến kỹ thuật

- nội dung xuất bản thành công nhưng trang hiển thị vẫn bản cũ kéo dài
- dữ liệu cấu hình lưu thành công nhưng màn hình khác không phản ánh
- lỗi lặp lại khi lưu / xuất bản trên nhiều mục
- bản dịch hiển thị sai khóa nội dung / lộ khóa kỹ thuật

---

## 15. Hướng dẫn tra cứu nhật ký, mã truy vết, cảnh báo và phối hợp sự cố

## 15.1 Mục tiêu

Hỗ trợ R30/R40 làm việc với nhật ký và cảnh báo ở mức giao diện bám TL18, TL22, TL29, không thay thế thao tác vận hành hạ tầng.

## 15.2 Khi nào phải tra cứu mã truy vết

- thao tác thất bại có mã truy vết hiển thị
- người dùng báo lỗi và có mã truy vết / mã lỗi
- cần chuyển tuyến kỹ thuật
- cần đối chiếu nhiều sự kiện liên quan cùng một thao tác

## 15.3 Quy trình tra cứu cơ bản cho R40

1. Thu thập mã truy vết / mã lỗi / mã thực thể
2. Tra cứu màn hình nhật ký / hỗ trợ theo quyền
3. Ghi nhận thông tin cần thiết:
   - thời gian
   - loại lỗi / trạng thái
   - màn hình / thao tác liên quan
4. Không suy luận nguyên nhân kỹ thuật sâu
5. Chuyển R30 hoặc kỹ thuật kèm dữ liệu truy vết

## 15.4 Quy trình tra cứu cơ bản cho R30

1. Tra cứu mã truy vết / cảnh báo
2. Đối chiếu với thực thể nghiệp vụ và lịch sử xử lý
3. Xác định:
   - lỗi thao tác người dùng
   - lỗi trạng thái nghiệp vụ
   - lỗi hệ thống / xử lý nền
4. Nếu là lỗi hệ thống:
   - dừng thao tác tiếp (nếu có rủi ro)
   - chuyển kỹ thuật theo TL22
5. Ghi chú quyết định và hành động đã thực hiện

## 15.5 Quy tắc chuyển tuyến sự cố cho vận hành kỹ thuật / dev hỗ trợ

Gói thông tin chuyển tuyến tối thiểu:
- mô tả ngắn vấn đề
- phạm vi ảnh hưởng (1 người dùng / nhiều người dùng / toàn màn hình)
- mã thực thể (nếu có)
- mã lỗi
- mã truy vết
- thời gian xảy ra
- bước tái hiện ngắn
- ảnh chụp màn hình / video ngắn (nếu cần)
- hành động đã thử và kết quả

---

## 16. Hướng dẫn xử lý lỗi thường gặp theo nhóm (R40, R30)

## 16.1 Nguyên tắc dùng mã lỗi và thông điệp

- Mã lỗi chuẩn theo TL14
- Thông điệp hiển thị / phản hồi theo TL23
- R40/R30 không tự chế thông điệp mâu thuẫn thông báo hệ thống
- Khi không chắc, dùng thông điệp trung tính + chuyển tuyến

## 16.2 Nhóm lỗi dữ liệu vào / biểu mẫu

### Dấu hiệu
- lỗi trường bắt buộc
- sai định dạng
- tệp sai loại / quá dung lượng
- giá trị ngoài miền cho phép

### R40 xử lý
- hướng dẫn người dùng chỉnh lại dữ liệu theo định dạng hiển thị
- giải thích trường nào lỗi, không suy đoán thêm

### R30 xử lý
- tương tự R40 cho thao tác nội bộ
- nếu lỗi xuất hiện dù dữ liệu đúng → ghi mã lỗi và chuyển kỹ thuật

## 16.3 Nhóm lỗi quyền truy cập

### Dấu hiệu
- không thấy nút thao tác
- bị từ chối truy cập màn hình
- thao tác báo không đủ quyền

### R40 xử lý
- xác nhận tài khoản / vai trò
- hướng dẫn chuyển bộ phận phù hợp
- không hứa cấp quyền

### R30 xử lý
- kiểm tra phân quyền hiện tại
- nếu nghi ngờ sai phân quyền sau thay đổi hệ thống → chuyển kỹ thuật / quản trị quyền

## 16.4 Nhóm lỗi trạng thái nghiệp vụ

### Dấu hiệu
- không thể thao tác vì trạng thái không phù hợp
- nút thao tác bị khóa
- thông báo trạng thái đã thay đổi

### Hướng xử lý
- làm mới và tra cứu trạng thái mới nhất
- kiểm tra lịch sử xử lý
- nếu đã có người xử lý trước → ghi chú và đóng vòng xử lý
- nếu trạng thái mâu thuẫn / bất thường → chuyển tuyến

## 16.5 Nhóm lỗi hệ thống / tạm thời

### Dấu hiệu
- lỗi không xác định
- lỗi tải dữ liệu
- lỗi thời gian chờ
- thao tác thất bại lặp lại

### Hướng xử lý
- ghi mã lỗi + mã truy vết
- tránh thao tác lặp với luồng nhạy cảm nếu chưa rõ kết quả
- kiểm tra trạng thái thực thể trước khi thử lại
- chuyển tuyến kỹ thuật nếu lặp lại / ảnh hưởng rộng

## 16.6 Nhóm lỗi dữ liệu chậm cập nhật / số liệu tạm thời

### Dấu hiệu
- số liệu thống kê chưa khớp ngay sau thao tác
- bảng dữ liệu và thẻ thống kê lệch tạm thời
- trạng thái “đang tổng hợp”

### Hướng xử lý
- giải thích khái niệm số liệu tạm thời / đã chốt theo TL16, TL23
- kiểm tra nhãn hiển thị trạng thái dữ liệu
- nếu vượt ngưỡng chậm bất thường → chuyển R30 / kỹ thuật

---

## 17. Mẫu phản hồi hỗ trợ và mẫu ghi chú nội bộ (bám TL23)

## 17.1 Nguyên tắc dùng mẫu phản hồi

- dùng ngôn từ rõ ràng, trung tính
- không đổ lỗi khi chưa xác minh
- không lộ thông tin nội bộ
- thống nhất cách gọi trạng thái / thao tác theo TL14, TL23
- cá nhân hóa ở mức thông tin thực thể và bước tiếp theo, không tự thêm suy đoán

## 17.2 Mẫu phản hồi R40 — tra cứu trạng thái (khung chuẩn)

### Mẫu 1: Đang chờ xử lý
- Xác nhận mã yêu cầu / thực thể
- Thông báo trạng thái hiện tại (theo tên hiển thị chuẩn)
- Nêu bước tiếp theo hoặc chờ xử lý
- Nếu cần, đề nghị người dùng giữ lại mã để tra cứu tiếp

### Mẫu 2: Cần bổ sung thông tin / chứng từ
- Xác nhận hệ thống đang cần bổ sung
- Nêu loại thông tin / tệp cần bổ sung
- Nêu yêu cầu định dạng cơ bản (nếu có)
- Nhắc kiểm tra lại trước khi gửi

### Mẫu 3: Đã chuyển bộ phận xử lý
- Thông báo đã ghi nhận và chuyển bộ phận phù hợp
- Nêu phạm vi vấn đề đang được kiểm tra (không hứa nguyên nhân)
- Nêu cách người dùng theo dõi lại (mã yêu cầu / trạng thái)

## 17.3 Mẫu ghi chú nội bộ R40 khi chuyển R30

Tối thiểu gồm:
- mã thực thể
- loại vấn đề
- trạng thái hiện tại
- người dùng phản ánh gì
- thời điểm phản ánh
- mã lỗi / mã truy vết (nếu có)
- tệp đính kèm / ảnh chụp (nếu có)
- mức ưu tiên (nếu quy trình có)

## 17.4 Mẫu ghi chú nội bộ R30 sau thao tác

Tối thiểu gồm:
- thao tác đã thực hiện
- thời điểm
- kết quả (thành công / lỗi)
- trạng thái sau thao tác
- lý do quyết định (nếu áp dụng)
- mã lỗi / mã truy vết nếu lỗi
- hành động tiếp theo / chuyển tuyến (nếu có)

---

## 18. Checklist thao tác nhạy cảm dùng chung (R30)

## 18.1 Checklist trước thao tác nhạy cảm

Áp dụng cho duyệt nạp, xử lý rút, duyệt chiến dịch, khóa liên kết, chốt đối soát, kết chuyển, thay đổi cấu hình, xuất bản nội dung:

- [ ] Đúng môi trường
- [ ] Đúng thực thể (mã)
- [ ] Đúng trạng thái hiện tại
- [ ] Đúng quyền thao tác
- [ ] Đã xem cảnh báo / cờ rủi ro (nếu có)
- [ ] Đã kiểm tra bằng chứng / dữ liệu hỗ trợ (nếu yêu cầu)
- [ ] Đã hiểu tác động của thao tác
- [ ] Đã sẵn sàng nhập lý do / ghi chú (nếu yêu cầu)

## 18.2 Checklist trong hộp thoại xác nhận

- [ ] Đọc tên thao tác
- [ ] Kiểm tra thực thể hiển thị trong hộp thoại
- [ ] Kiểm tra trạng thái hiện tại → trạng thái dự kiến
- [ ] Kiểm tra cảnh báo tác động
- [ ] Nhập lý do / ghi chú đúng (nếu bắt buộc)
- [ ] Xác nhận không bấm nhầm thao tác khác

## 18.3 Checklist sau thao tác

- [ ] Kiểm tra thông báo kết quả
- [ ] Kiểm tra trạng thái mới
- [ ] Kiểm tra lịch sử xử lý / nhật ký hiển thị
- [ ] Ghi nhận mã lỗi / mã truy vết nếu có lỗi
- [ ] Ghi chú nội bộ / cập nhật cho R40 (nếu cần)
- [ ] Không lặp thao tác nếu kết quả chưa rõ, phải xác minh trước

---

## 19. Đào tạo, thực hành và đánh giá năng lực R30 / R40 (bám TL28)

## 19.1 Mục tiêu đào tạo

- giúp R30/R40 thao tác đúng quy trình trên màn hình thật
- biết dùng mã lỗi / mã truy vết / ghi chú nội bộ
- biết phân tuyến đúng khi vượt phạm vi
- giảm sai sót trong thao tác nhạy cảm

## 19.2 Dữ liệu đào tạo khuyến nghị (tham chiếu TL28)

- `DL-DAO-TAO-R30-R40-001`
- `DL-DAO-TAO-VAN-HANH-001`
- bổ sung các bộ dữ liệu nghiệp vụ:
  - `DL-TAI-CHINH-CHUAN-001`
  - `DL-CHIEN-DICH-LIEN-KET-CHUAN-001`
  - `DL-SU-KIEN-LUOT-CHUAN-001`
  - `DL-CAU-HINH-NOI-DUNG-CHUAN-001`

## 19.3 Kịch bản thực hành tối thiểu cho R40

- tra cứu yêu cầu nạp và trả lời trạng thái
- xử lý yêu cầu bổ sung chứng từ
- tra cứu yêu cầu rút treo và chuyển tuyến R30
- tra cứu chiến dịch bị từ chối và phản hồi theo mẫu
- ghi nhận lỗi có mã truy vết và chuyển tuyến kỹ thuật

## 19.4 Kịch bản thực hành tối thiểu cho R30

- duyệt nạp thành công
- từ chối nạp có lý do
- duyệt rút và hoàn thành rút có bằng chứng
- xử lý yêu cầu rút treo theo quyền
- duyệt / từ chối chiến dịch
- khóa / mở trạng thái liên kết
- chốt đối soát (môi trường đào tạo)
- thay đổi cấu hình an toàn và xuất bản nội dung tuân thủ (môi trường đào tạo)

## 19.5 Tiêu chí đánh giá thao tác đạt

### Với R40
- tra cứu đúng thực thể
- phân loại đúng vấn đề
- phản hồi đúng phạm vi
- ghi chú nội bộ đủ thông tin
- chuyển tuyến đúng và đủ dữ liệu truy vết

### Với R30
- thao tác đúng trạng thái và đúng quyền
- dùng đúng checklist trước/sau thao tác
- xử lý đúng hộp thoại xác nhận và lý do
- kiểm tra kết quả sau thao tác
- biết dừng và chuyển tuyến khi có dấu hiệu rủi ro

---

## 20. Ma trận truy vết TL27 với bộ tài liệu

## 20.1 Truy vết theo chủ đề

- **TL03** → ranh giới quyền R30, R40 và nguyên tắc hiển thị / thao tác theo quyền
- **TL08** → thao tác nạp tiền thủ công, chứng từ, duyệt / từ chối
- **TL09** → thao tác rút tiền thủ công, hoàn thành / hoàn trả / treo
- **TL10** → thao tác duyệt / từ chối chiến dịch
- **TL11** → thao tác liên kết rút gọn, phối hợp sự cố R01
- **TL12** → hàng kiểm tra thủ công và bảo mật thông tin chống gian lận
- **TL13** → nhận diện dữ liệu tài chính / sổ cái ở mức kiểm tra vận hành (không sửa tay dữ liệu)
- **TL14** → trạng thái và mã lỗi chuẩn dùng trong tra cứu / phản hồi
- **TL15** → không tự suy luận ngoài phản hồi hệ thống
- **TL16** → số liệu tạm thời / đã chốt, xử lý nền, đối soát / kết chuyển
- **TL17** → thao tác cấu hình hiệu lực
- **TL18** → cảnh báo, nhật ký, mã truy vết
- **TL19** → che dữ liệu, an toàn thao tác, không lộ nội bộ
- **TL20** → vị trí thao tác, luồng màn hình
- **TL21** → dùng làm tài liệu hướng dẫn cho kiểm thử chấp nhận thao tác vai trò
- **TL22** → phối hợp sự cố, chuyển tuyến vận hành kỹ thuật
- **TL23** → nội dung phản hồi, thông điệp hiển thị, điều khoản / chính sách
- **TL24** → đào tạo, bàn giao theo giai đoạn
- **TL25** → vai trò các thành phần, giới hạn thao tác giao diện so với hạ tầng
- **TL26** → nhật ký kiểm toán, mã truy vết, quy tắc thao tác nhạy cảm trong triển khai
- **TL28** → dữ liệu đào tạo, kịch bản diễn tập
- **TL29** → quy chuẩn giao diện, hộp thoại, trạng thái hiển thị, bảng, biểu mẫu

## 20.2 Truy vết theo nhóm thao tác

- **Hỗ trợ / tra cứu R40** ↔ TL03, TL14, TL18, TL20, TL23, TL29
- **Thao tác tài chính R30** ↔ TL08, TL09, TL13, TL14, TL19, TL29
- **Thao tác chiến dịch / liên kết R30** ↔ TL10, TL11, TL12, TL20, TL29
- **Đối soát / kết chuyển R30** ↔ TL16, TL18, TL22, TL29
- **Cấu hình / nội dung tuân thủ R30** ↔ TL17, TL23, TL29
- **Đào tạo và đánh giá vai trò** ↔ TL24, TL28, TL29

---

## 21. Tiêu chí chấp nhận tài liệu TL27

TL27 được xem là đạt khi:

- Xác định rõ vai trò, ranh giới và nguyên tắc phân tuyến giữa R30, R40, kỹ thuật
- Có hướng dẫn thao tác chung trước khi xử lý nghiệp vụ
- Có hướng dẫn chi tiết cho các luồng trọng yếu:
  - nạp tiền thủ công
  - rút tiền thủ công
  - chiến dịch / liên kết
  - hàng kiểm tra thủ công
  - đối soát / kết chuyển
  - cấu hình / nội dung tuân thủ
- Có checklist thao tác nhạy cảm trước / trong / sau
- Có hướng dẫn tra cứu mã lỗi, mã truy vết, cảnh báo và chuyển tuyến sự cố
- Có mẫu phản hồi hỗ trợ và mẫu ghi chú nội bộ bám TL23
- Có phần đào tạo và tiêu chí đánh giá thao tác cho R30/R40 bám TL28
- Truy vết nhất quán với TL03, TL14, TL20, TL22, TL23, TL29 và các tài liệu nghiệp vụ liên quan

---

## 22. Checklist tự rà soát trước khi chuyển sang tài liệu tiếp theo

- [x] Bám phân quyền và ranh giới vai trò theo TL03
- [x] Không thay đổi nghiệp vụ lõi trong TL08 đến TL17
- [x] Dùng đúng trạng thái / mã lỗi theo TL14
- [x] Bám nội dung hiển thị / phản hồi theo TL23
- [x] Bám luồng màn hình và thao tác theo TL20
- [x] Bám quy chuẩn hộp thoại / bảng / biểu mẫu theo TL29
- [x] Bám nhật ký, mã truy vết, cảnh báo theo TL18
- [x] Bám an toàn thao tác và che dữ liệu theo TL19
- [x] Bám phối hợp ứng cứu sự cố theo TL22
- [x] Bám dữ liệu đào tạo / diễn tập theo TL28
- [x] Hỗ trợ đào tạo và bàn giao theo TL24
- [x] Tương thích nguyên tắc triển khai và tiêu chuẩn mã theo TL25, TL26

---

## 23. Gợi ý tài liệu tiếp theo để tăng tốc triển khai thực tế với trợ lý lập trình

Sau TL27, vòng tài liệu vận hành và giao diện đã khá đầy đủ. Tài liệu nên ưu tiên tiếp theo là:

### TL30 — Mẫu đặc tả nhiệm vụ cho trợ lý lập trình theo từng mô-đun
Mục tiêu:
- chuẩn hóa cách giao việc cho trợ lý lập trình (backend / frontend / xử lý nền)
- giảm lệch giữa các lần sinh mã
- gắn chặt yêu cầu với TL14, TL15, TL26, TL29
- bắt buộc có checklist tự kiểm trước khi trả mã

Nội dung nên gồm:
- mẫu giao việc sinh mô-đun máy chủ
- mẫu giao việc sinh màn hình giao diện
- mẫu giao việc sinh tác vụ nền
- mẫu giao việc sinh kiểm thử
- mẫu rà soát mã do trợ lý lập trình sinh
- mẫu truy vết tài liệu nguồn cho từng nhiệm vụ

---

## 24. Ghi chú cuối tài liệu

- TL27 là tài liệu hướng dẫn thao tác thực tế cho R30 và R40, dùng trực tiếp trong đào tạo, hỗ trợ và vận hành nghiệp vụ hằng ngày.
- TL27 không thay thế quy định phân quyền (TL03), quy trình ứng cứu sự cố (TL22) hay đặc tả nghiệp vụ (TL08–TL17); TL27 chỉ hướng dẫn cách thao tác đúng trên giao diện và cách phối hợp xử lý.
- Khi hệ thống phát hành bản đầu và có dữ liệu vận hành thực tế, nên bổ sung phụ lục “tình huống thường gặp” và “mẫu phản hồi chuẩn hóa” theo thống kê lỗi thực tế để tăng hiệu quả đào tạo R30/R40.
