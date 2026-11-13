# TASKS — Huyền Cơ Các

Cập nhật 13/11/2026 (giờ Việt Nam). Việc `[ ]` là còn mở hoặc cần quyết; không làm trong phiên viết tài liệu này.

## Cần anh Trung quyết

- [ ] **Rate limit** (hẹn 15:00 ngày 17/11/2026 giờ Việt Nam): giữ nguyên 5/10 phút, 20/IP/ngày, 300/ngày toàn trang; tăng hạn mức; hay thêm khóa test riêng? **Không sửa Worker trước khi có câu trả lời.**
- [ ] Ẩn dòng “Được tạo bởi Blogger” và “Báo cáo vi phạm” trên trang (đã đề xuất 11/11/2026, chưa có trả lời).
- [ ] `wrangler.toml` vẫn trỏ `main = "worker.js"` trong khi bản chạy là `worker-v2.js`: có chỉnh file cho khớp (không deploy nhầm bản cũ) không?
- [ ] README `v2/README.md` còn ghi worker-v2 chưa deploy — cập nhật cho đúng?

## Việc còn dở (đã biết)

- [ ] **Test live lời luận** trên cả Xem Tử Vi và Xem Hợp Mạng (lá số đã xem trên trang thật; lời luận chưa test live vì IP máy bot hết 20 lượt/ngày). Lịch: **15:00 ngày 17/11/2026** (giờ Việt Nam), kèm ảnh chụp, rồi mới hỏi mục rate limit ở trên.
- [ ] 13:00 ngày 17/11/2026: routine “Bật lại lịch chạy” (ba routine đã tạm dừng — không thuộc code tử vi, nhưng cùng mốc ngày).
- [ ] Đồng bộ tài liệu nội bộ lỗi thời: `theme/README.md` còn hướng dẫn dán `widget.txt` (trước khi chuyển sang snippet GitHub Pages).

## Việc UI / sản phẩm đã xong

- [x] Tạo blog, cài Fletro Pro 6.1, phủ theme cổ kính tối, favicon, trang Xem Tử Vi (11/11/2026).
- [x] Form ba ô ngày sinh, xác nhận ngày, canh giờ / ô giờ, giới tính, một câu hỏi, nút Thỉnh lời luận.
- [x] Lá số iztro 2.6.5 trên trang, hộp thông tin, in/PDF.
- [x] Worker huyencocac-luan: secret DeepSeek, CORS, rate limit, `/api/time`, các mode gồm `hop-mang`.
- [x] Quy tắc lời luận trong system prompt (việc đã qua, can chi, tháng âm, tách trực / thần hoàng đạo, an toàn, không disclaimer).
- [x] Chuyển JS/CSS nặng lên GitHub Pages + snippet ngắn, vì editor Blogger treo khi dán ~109k ký tự (12/11/2026).
- [x] Trang Xem Hợp Mạng xuất bản, có trong menu, gợi ý từ mode tử vi khi câu hỏi hợp mạng/cưới hỏi.
- [x] Bộ test 12/11/2026: 339/339 đạt (không chạy lại lúc viết tài liệu).

## Checklist khi sửa widget / Worker

- [ ] Sửa nguồn trong `/workspace/huyencocac` (`v2/` hoặc `hopmang/`, hoặc `worker-v2.js`).
- [ ] Chạy test liên quan; không dựa vào `npm test` trong package.json (script này chưa gọi đủ bộ test).
- [ ] `python3 ghpages/build.py` — kiểm tra hash mới trong snippet.
- [ ] Đưa 4 asset lên `huyencocac/` của repo (khi được giao); dán snippet mới vào trang Blogger `/u/1/`.
- [ ] Worker: hỏi anh trước khi đăng nhập dashboard; không commit secret; không đổi `RATE` khi mục đầu còn mở.
- [ ] Escape non-ASCII trong style/script. Không dán bản minify khổng lồ vào editor Blogger.
- [ ] Không đụng pigpigmyhome.uk, không tạo tài khoản Cloudflare mới.
