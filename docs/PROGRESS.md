# PROGRESS — retro-games / 8bitstory

Ghi chép theo ngày đã có trong bộ nhớ/công việc và trạng thái kiểm lại ngày 13/11/2026 (giờ Việt Nam). Không bịa mốc không có nguồn.

## Đã xong

- **Trước 05/2025–08/2026:** Blog đã có bài Super Bomberman 3 (English) và Final Fight (USA) (ngày đăng feed: 27/05/2025); Super Bomberman 4 (29/08/2026). Repo đã host trang EmulatorJS.
- **Đầu 11/2026:** Rà theme Median UI 1.6, bỏ polyfill.io và nội dung demo nguy hiểm/link chết, lưu theme tối ưu lên Blogger. Ẩn 9 ô quảng cáo mẫu (chưa xóa). Slider trang chủ gắn ảnh game thật (ô thứ 4 trống thì ẩn).
- **11/2026:** Thống nhất nút “Chơi toàn màn hình” với “Download now” (cùng `class="button"`). Gỡ dòng sai “game tự lưu”. Sau khi có quyền sửa repo: đặt `save-state-location: browser`, `save-save-interval: 60`, `EJS_startOnLoaded = false` cho các trang SNES (EmulatorJS 4.2.3).
- **11/2026:** Anh Trung chốt câu hướng dẫn Save/Load tiếng Việt; thêm dòng gamepad; điền thanh thông báo đầu trang. Gắn nhãn series. Xử lý ảnh bìa Final Fight bị vỡ.
- **09/11/2026 trở đi:** Chính sách English-first; tab Median UI English / Tiếng Việt. Bài đối tác Contra và Street Fighter (11/11/2026), mục Links. Tạm dừng routine quảng bá / kiểm góp ý tới **13:00 ngày 17/11/2026** (giờ Việt Nam).

## Lỗi đã gặp và cách sửa

| Lỗi | Cách đã xử lý |
|---|---|
| Hai nút “toàn màn hình” và “Download now” lệch kiểu | Đổi thành cùng nút đỏ `class="button"`, đặt cạnh nhau. |
| Bài viết nói game tự lưu trên trình duyệt, nhưng lúc đó trang GitHub chưa bật | Gỡ dòng sai trên bài; sau đó sửa `EJS_defaultOptions` trên repo và viết lại đúng câu đã chốt (phải bấm Save State). |
| Theme gọi script polyfill.io (tên miền từng bị chiếm) | Gỡ khỏi theme. |
| Menu/link demo, ô “Quảng cáo hiển thị ở đây”, slider xám | Dọn menu demo; ẩn ô quảng cáo mẫu; thay slider bằng ảnh game. |
| Ảnh bìa Final Fight nhỏ, bìa dọc, vỡ/mất logo khi phóng khung ngang trang chủ | Nhờ làm bản nét hơn, có bản ngang nền mờ; thay vào bài. |
| Chữ bài game xám khi bật chế độ tối (màu inline) | Thêm CSS `.drK` cho chữ, heading, link, khung game. |
| Super Bomberman 4 mất nhãn | Gắn lại `games`, `games_snes`, giữ `Super_Bomberman`. |

## Lệch / nợ kỹ thuật đang thấy (13/11/2026)

- Nút “Download now” → romsfun.com, đồng thời repo host ROM công khai: mâu thuẫn với quy tắc không đặt link tải ROM (`RULES.md`, cần anh Trung quyết).
- Câu Save/Load tiếng Anh chưa thống nhất; một số bài cũ tab Tiếng Việt trước.
- `index.html` GitHub Pages cũ, còn placeholder.
- `mame/3wonders` lệch mẫu SNES, chưa thấy bài blog tương ứng trên feed đã lấy.
- Tiêu đề bài Super Bomberman 3 ghi “(English)” trong khi thư mục/ROM là “(Europe)”.
- README repo chỉ hai dòng, chưa mô tả kiến trúc.

## Bước tiếp

1. Chờ 13:00 ngày 17/11/2026 (giờ Việt Nam) bật lại các routine đã tạm dừng (kiểm góp ý, quảng bá Facebook).
2. Hỏi anh Trung các mục “cần quyết” trong `TASKS.md`, nhất là chính sách ROM / nút Download now — **không tự sửa trước khi có câu trả lời**.
3. Khi thêm game: bám `RULES.md` và checklist cuối `TASKS.md`.
4. (Tùy chọn, sau khi được giao) Cập nhật `index.html` hoặc README repo cho khớp danh sách game thật.

Bộ tài liệu này chưa commit/upload; dự kiến nằm ở `docs/` gốc repo `chitrungtran/retro-games`.
