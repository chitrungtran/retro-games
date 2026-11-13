# DESIGN — retro-games / 8bitstory

Cập nhật 13/11/2026 (giờ Việt Nam). Màu/font lấy từ HTML theme đang chạy và từ bài/feed thật, không đoán.

## Phong cách

Blog retro 8-bit, giao diện Median UI 1.6. Tiêu đề bài và heading trong bài dùng font **VT323** (Google Fonts), fallback `'Noto Sans', monospace`. Font chữ chạy của theme (body) *chưa xác minh tên cụ thể trong tài liệu này* — chỉ chốt được VT323 cho tiêu đề.

Chuẩn ảnh bìa đã giao: tỉ lệ **4:3**, phong cách màn hình CRT (ví dụ 1200×900), nét, bám bìa SNES thật, nền mờ bao quanh bìa khi cần khung ngang trang chủ. Ảnh bìa **tải lên Blogger**. Các bài cũ không phải tấm nào cũng đúng chuẩn này (có bìa nguồn nhỏ, bị vỡ khi phóng khung ngang — đã xử lý từng bài).

## Màu và nút (blog)

Từ CSS đang chạy trên trang chủ:

```css
.button {
  background: #e74c3c;
  color: #fff !important;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 10px 5px 0 0;
}
```

Hai nút trong bài game phải cùng kiểu `class="button"` (đỏ), nằm cạnh nhau: “Chơi toàn màn hình” / “Play full screen” và “Download now”. Một số bài đối tác ghi đè màu bằng `style="background:#d32f2f;color:#fff"` — gần đỏ, không phải token chuẩn của theme.

Có CSS chế độ tối (`.drK`) cho chữ trong bài game, khung bìa, link (trừ `.button`).

Màu khung giả lập trên GitHub Pages: `EJS_color = "#0064ff"`. Trang `index.html` gốc repo dùng palettes riêng (#ff0000 header, #0000ff ô tìm, #0064ff nút) — trang này cũ, không đại diện blog.

## Component bài game (mẫu đang sống)

Khối đầu bài (trước tab ngôn ngữ):

- `.game-container` > `.game-cover` (ảnh bìa, comment `<!--COVER-->`) + `.game-details`
- Bảng thông tin: Console / Publisher / Genre / Region / Released (và Players khi có)
- `iframe` trỏ trang GitHub Pages, `aspect-ratio: 4/3`, `border-radius: 8px`, `border: 2px solid #ddd`, `max-width: 800px`, `allowfullscreen`
- `p.note` — hướng dẫn Save/Load State (xem `RULES.md`, trích nguyên văn)
- `p.note` — dòng gamepad
- Hai `a.button` như trên
- `.scrollImage` — ảnh chụp trong game (một số bài đang lấy ảnh từ romsfun.com)

Sau `<!--more-->`: tab có sẵn của Median UI (English trước với bài từ 09/11/2026):

```html
<!--[ Tabs: English first (blog English-first since 09/11/2026) / Tiếng Việt – Median UI built-in tabs ]-->
<input class="tbIn hidden" id="fTabs-1" type="radio" name="postTabs" checked="checked"/>
<input class="tbIn hidden" id="fTabs-2" type="radio" name="postTabs"/>
<div class="tbHd scrlH">
  <label for="fTabs-1" data-text="English"></label>
  <label for="fTabs-2" data-text="Tiếng Việt"></label>
</div>
<div class="tbCn">
  <div class="tbText-1">…English…</div>
  <div class="tbText-2">…Tiếng Việt…</div>
</div>
```

Không xếp chồng hai ngôn ngữ trong phần nội dung tab. Riêng hai dòng `.note` phía trên tab, các bài game hiện đang để bản Anh rồi bản Việt in nghiêng trong cùng một khối (khác với phần thân bài).

Bài cũ *Final Fight (USA)* và *Super Bomberman 3 (English)* vẫn để tab **Tiếng Việt trước** (nhãn `data-text` đảo so với mẫu mới).

## Thanh thông báo đầu trang

Widget thông báo Median UI (`#notif-widget`), câu đang chạy:

> Lưu ý để chơi game trên trang: 🎮 Nên dùng Gamepad, joypad hoặc tay cầm (controller) để trải nghiệm tốt hơn. | Tip: Use a gamepad or controller for the best experience.

## Menu (lấy từ trang chủ 13/11/2026)

Mục lục; Games Snes (`games_snes`); Lịch sử SNES; Series game; Nhân vật game; Mẹo & hướng dẫn; Links (đối tác); và liên kết Contra Online (`contragame.dev`), Street Fighter II Android (`streetfightgame.com`).

Chân trang theme vẫn còn dòng “Developed by Jago Desain” (theme trả phí, đã từng lưu ý nên cân nhắc giữ).
