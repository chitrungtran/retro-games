# PRD — retro-games / 8bitstory

Tài liệu viết ngày 13/11/2026 (giờ Việt Nam, UTC+7), bám trạng thái thật của repo và blog. Chỗ chưa chắc ghi *chưa xác minh*.

## Làm gì

Hai lớp sản phẩm đi cùng nhau:

1. **Blog** [8bitstory.blogspot.com](https://8bitstory.blogspot.com/) (tên hiển thị trên feed: Retro Games). Blog Blogger, tài khoản trungtvbox2016, theme Median UI 1.6 (bản quyền, mua từ Jago Desain). Giới thiệu game retro, chủ yếu SNES, cho đọc giả chơi ngay trên trang.
2. **Repo** [chitrungtran/retro-games](https://github.com/chitrungtran/retro-games) (nhánh `main`), GitHub Pages tại `https://chitrungtran.github.io/retro-games/`. Mỗi game SNES có trang EmulatorJS 4.2.3 dạng `Snes/<Tên game>/<Tên game>.html`, nhúng vào bài blog bằng iframe và nút chơi toàn màn hình.

Cùng repo còn chứa thư mục `huyencocac/` (JS/CSS của blog Huyền Cơ Các). Bộ tài liệu của dự án đó nằm ở `huyencocac/docs/`, không lẫn vào đây.

## Cho ai

- Đọc giả nước ngoài là ưu tiên từ 09/11/2026: bài viết và tab ngôn ngữ để **English** trước, Tiếng Việt là tab phụ.
- Anh Trung là chủ blog và chủ repo; Bot Blog chỉ thêm trang `.html` và soạn/sửa bài theo mẫu đã chốt. Anh Trung tự tải file `.sfc` lên repo.

## Mục tiêu

- Giữ blog ổn định khoảng một năm từ tháng 11/2026, rồi mới tính quảng cáo (AdSense hoặc kênh khác).
- Đánh giá tăng trưởng mỗi quý; lần đầu tháng 02/2027.
- Lớn chậm, an toàn: khoảng 1–2 lượt xem thật mỗi 2–3 ngày; đăng Facebook 1–3 lần/tuần (thường Thứ Ba và Thứ Bảy khoảng 20:00 giờ Việt Nam). Chỉ nhóm retro quốc tế, không spam, không đăng nhóm Facebook tiếng Việt (nguy cơ khóa tài khoản).
- Mỗi bài game chơi được trên trình duyệt, hướng dẫn lưu game đúng câu đã chốt, có ảnh bìa để chia sẻ ra thumbnail.

## Trong phạm vi

- Trang chơi EmulatorJS (SNES; đã có một game MAME trong repo).
- Bài blog theo mẫu: bìa, bảng thông tin, iframe, dòng Save/Load State, dòng gamepad, hai nút đỏ `class="button"`, tab English / Tiếng Việt, nhãn, ảnh trong game.
- Menu, theme, slider, mục Links (site đối tác), bài giới thiệu/review/series/nhân vật (không nhân đôi vào menu Links).
- Quảng bá bài (Facebook) theo lịch và quy tắc đã chốt.

## Ngoài phạm vi

- Tự ý đổi câu hướng dẫn lưu game.
- Tự ý nâng phiên bản EmulatorJS khi chưa kiểm tra lại cấu hình lưu.
- Netplay / chơi online nhiều người (đã bàn, chưa làm).
- Tạo tài khoản GitHub/Blogger mới.
- Sửa hay xóa ROM trên repo khi chưa được anh Trung giao (anh tự tải `.sfc`).
- Dự án Huyền Cơ Các (chỉ cộng trú chung repo).
