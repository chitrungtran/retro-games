# TASKS — retro-games / 8bitstory

Cập nhật 13/11/2026 (giờ Việt Nam). Checkbox phản ánh thực tế đã kiểm trên repo và feed blog. Việc đánh dấu `[ ]` là chưa làm hoặc cần quyết, không phải việc đang làm trong phiên viết tài liệu này.

## Cần anh Trung quyết (không tự sửa)

- [ ] Có thống nhất câu tiếng Anh hướng dẫn Save/Load State thành một bản (hiện hai biến thể) rồi sửa các bài cũ không?
- [ ] Có sửa các bài cũ vẫn để tab Tiếng Việt trước (Final Fight USA, Super Bomberman 3, và bài nào còn lại) cho khớp “English first” từ 09/11/2026?
- [ ] Trang `index.html` trên GitHub Pages đã cũ (thiếu game, còn placeholder “Another Game”, footer © 2025): cập nhật, thu gọn, hay để nguyên vì mặt tiền là blog?
- [ ] `mame/3wonders`: khác mẫu SNES (`EJS_startOnLoaded = true`, chưa bật lưu trình duyệt), chưa thấy bài 8bitstory tương ứng trên feed 15 bài gần nhất. Có viết bài / chỉnh cho khớp mẫu không?

## Việc UI / nội dung còn dở (đã biết, chưa chốt xong)

- [ ] Chọn bài ghim (pinned post) cho 8bitstory — đã từng để ngỏ.
- [ ] Quảng bá bài TMNT IV và Marvel Super Heroes in War of the Gems (đã lên lịch tạm dừng cùng các routine tới 13:00 ngày 17/11/2026 giờ Việt Nam).
- [ ] Chữ tên game trên slider trang chủ từng khó đọc vì đè lên ảnh sáng; banner riêng từng được đề xuất, *chưa xác minh đã làm xong hết*.
- [ ] `html lang='vi'` trên blog trong khi chính sách nội dung là English-first — *chưa xác minh có phải cố ý*.

## Đã xong (mốc đã kiểm)

- [x] Theme Median UI 1.6 tối ưu: bỏ polyfill.io, dọn menu demo / link chết, ẩn ô quảng cáo mẫu (ẩn, chưa xóa), gắn slider ảnh game (khoảng 03–11/11/2026).
- [x] Thống nhất hai nút đỏ “Chơi toàn màn hình” và “Download now”.
- [x] Chốt chính sách ROM (13/11/2026): giữ nút Download now trỏ romsfun.com và file `.sfc` trên repo.
- [x] Bật lưu Save State trong trình duyệt trên các trang SNES; `EJS_startOnLoaded = false`.
- [x] Áp câu hướng dẫn Save/Load tiếng Việt đã chốt và dòng gamepad; thanh thông báo đầu trang.
- [x] Tab English / Tiếng Việt (Median UI) trên bài; bài mới English trước.
- [x] Nhãn `games` + `games_snes` + nhãn series (Final_Fight, Super_Bomberman, …). Super Bomberman 4 từng mất nhãn, đã gắn lại.
- [x] Bài game hiện có trên feed: Final Fight / 2 / 3 / Guy, Asterix & Obelix, Ghost Chaser Densei, Super Bomberman 3 và 4, TMNT IV, Marvel War of the Gems; thêm bài series/nhân vật Final Fight; bài đối tác Contra và Street Fighter + mục Links.
- [x] Sửa chế độ tối cho chữ trong bài game (CSS `.drK`).
- [x] Ảnh bìa Final Fight bị vỡ đã nhờ xử lý và thay (11/2026).

## Khi thêm game mới (checklist lặp)

- [ ] Anh Trung đã tải `.sfc` lên `Snes/<Tên>/`.
- [ ] Thêm `<Tên>.html` đúng mẫu `ARCHITECTURE.md` / `RULES.md`.
- [ ] Viết bài theo mẫu `DESIGN.md`: bìa tải lên Blogger, bảng thông tin, iframe, hai dòng `.note` đúng chữ, hai nút đỏ, tab English trước, nhãn đúng, permalink Automatic.
- [ ] Không đặt link thẳng tới file `.sfc` trên GitHub. Nút “Download now” trỏ trang tải romsfun.com của game đó (đã chốt 13/11/2026).
- [ ] Kiểm tra bài trên máy tính và điện thoại: nút START GAME, Save State / Load State, chế độ tối.
