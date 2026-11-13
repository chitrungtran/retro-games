# RULES — Huyền Cơ Các

Cập nhật 13/11/2026 (giờ Việt Nam). Đây là quy tắc đã chốt; sửa code phải bám đúng, không diễn giải lại cho nhẹ đi.

## Lời luận và lịch pháp

- Lá số / lịch / can chi / nạp âm do JS tính sẵn. Worker/AI **không** tự an sao, không tự tính lại. Thiếu thì nói chưa có.
- Ngày đã qua (so với “Hôm nay” phía server theo múi giờ người hỏi): chỉ trả đúng một câu, không viết gì thêm:

  > Việc đã qua sao còn hỏi.

  Widget cũng chặn sẵn, không gọi Worker trong trường hợp này.
- Dùng múi giờ máy người xem; không biết thì Việt Nam UTC+7. Nhãn: “Việt Nam (UTC+7)”, không hiện tên IANA thô.
- Gọi tuổi bằng **can chi** (“Tuổi Quý Hợi”, “tuổi Ngọ”), **không** gọi tên con vật (Lợn, …).
- Tháng âm: luôn viết chữ “âm lịch” và kèm khoảng ngày dương lịch. Không viết tháng âm như “tháng 8/2026”.
- Tách **12 trực** (Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế) khỏi **12 thần hoàng/hắc đạo** (Thanh Long, Minh Đường, …). Dùng đúng tên như trong dữ liệu.
- Ngày sinh nhập **ba ô** Ngày / Tháng / Năm (dd/mm/yyyy), có dòng xác nhận.
- Một lần hỏi một việc; câu hỏi tối đa 200 ký tự. Không hỏi lại người dùng.
- Không emoji trong lời luận. Văn phong trang trọng, dễ hiểu; mặt xấu nói thẳng kèm cách hóa giải thực tế; không hứa chắc giàu / đỗ / cưới được ai.
- An toàn: không phán tuổi thọ, năm mất, bệnh nặng, tai nạn, “hạn chết”, tuyệt tự, ly hôn/phá sản chắc chắn; không thay tư vấn y tế/pháp lý/tài chính; không khuyên mua lễ giải hạn. Người hỏi có dấu hiệu tự hại thì gác luận sao, khuyên tìm trợ giúp (không bịa thêm số điện thoại ngoài những gì system prompt đã có).
- Không nhận mình là AI, không nhắc JSON / iztro / tên trường dữ liệu.
- **Không** có câu miễn trừ “giải trí / tham khảo”.

## Code và deploy

- Escape ký tự non-ASCII trong `<style>` / `<script>` (Blogger làm hỏng ký tự thô). File CSS theme cũng ASCII-only, chữ Việt dùng `\XXXX`.
- Khóa DeepSeek chỉ ở secret Worker `DEEPSEEK_API_KEY`, không nhúng ra trang, snippet, hay repo công khai.
- Trang Blogger chỉ giữ snippet ngắn; JS/CSS nặng đặt trên GitHub Pages, có `?v=hash`. Đổi code thì chạy `python3 ghpages/build.py` rồi mới đưa file và cập nhật snippet (hash đổi).
- Không ghi đè `widget-v2.txt` / `widget-v2-next.txt` / `hopmang-widget.txt` khi build Pages (script đã thiết kế vậy).
- Không tạo tài khoản Cloudflare mới. Khi cần đăng nhập Cloudflare hoặc Blogger, hỏi anh Trung. Dùng URL Blogger `/u/1/`.
- Rate limit chỉ sửa khi anh Trung đã trả lời (lịch hỏi: 15:00 ngày 17/11/2026 giờ Việt Nam). Thông số hiện tại xem `ARCHITECTURE.md`.

## TUYỆT ĐỐI KHÔNG

- Không lộ API key, token, mật khẩu, email cá nhân, ID bí mật (KV, tài khoản Cloudflare, …) trên repo công khai hay trong chat công khai.
- Không đưa khóa ra client.
- Không viết disclaimer “giải trí/tham khảo”.
- Không đụng pigpigmyhome.uk.
- Không tạo tài khoản Cloudflare / Blogger mới.
- Không tự tăng/hạ rate limit, không thêm “cửa sau” test key, trước khi anh Trung quyết.
- Không để AI tự an sao hay bịa ngày/giờ trong chế độ chọn ngày (chỉ luận đúng dữ liệu `chonNgay`).
- Không dán widget ~109k ký tự vào trình sửa HTML Blogger (đã làm treo editor). Luôn dùng snippet + GitHub Pages.
- Không commit file có secret; không đưa `wrangler` secret vào markdown.
