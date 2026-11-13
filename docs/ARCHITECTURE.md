# ARCHITECTURE — retro-games / 8bitstory

Cập nhật 13/11/2026 (giờ Việt Nam). Cây thư mục lấy từ GitHub API `git/trees/main?recursive=1` (SHA `441d59b4…`, 102 mục, không bị cắt).

## Công nghệ

| Lớp | Thực tế hiện tại |
|---|---|
| Blog | Blogger, theme Median UI 1.6, `html lang='vi'` (dù nội dung bài ưu tiên English từ 09/11/2026) |
| Host game | GitHub Pages của repo `chitrungtran/retro-games`, nhánh `main` |
| Giả lập | EmulatorJS **4.2.3** (`data/version.json` → `"version": "4.2.3"`) |
| Core SNES | `snes9x` (file trong `data/cores/`) |
| Core MAME | có trong `data/cores/` (mame2003 / mame2003_plus); dùng ở `mame/3wonders` |

Tài khoản GitHub `trungtvbox2016` là Collaborator trên repo. `gh` CLI trên máy bot *chưa xác minh còn đăng nhập*; lần đưa file Huyền Cơ Các lên repo là tải qua trang web GitHub.

## Cây thư mục thật (rút gọn)

```
README.md
index.html
data/                  # EmulatorJS: loader.js, emulator.min.js/.css, version.json
  cores/               # snes9x-*.data, mame2003-*.data, …
  compression/         # extractzip.js, extract7z.js, libunrar.*
  localization/        # en-US.json, vi-VN.json, …
  src/                 # emulator.js, GameManager.js, storage.js, …
Snes/<Tên game>/
  <Tên game>.html
  <Tên game>.sfc
mame/3wonders/         # 3wonders.html + 3wonders.zip
huyencocac/            # tuvi.js/css, hopmang.js/css (dự án khác)
```

Mười game SNES hiện có: Asterix & Obelix (Europe) (En,Fr,De,Es); Final Fight / 2 / 3 / Guy (USA); Ghost Chaser Densei (English v1.0); Marvel Super Heroes in War of the Gems (USA); Super Bomberman 3 (Europe); Super Bomberman 4 (English v1.0); Teenage Mutant Ninja Turtles IV - Turtles in Time (USA).

## Cấu hình trang chơi SNES (mẫu thật)

Mọi trang `Snes/<Game>/<Game>.html` đang thống nhất:

- `EJS_player = "#game"`
- `EJS_core = "snes"`
- `EJS_color = "#0064ff"`
- `EJS_startOnLoaded = false` (hiện nút START GAME, bấm mới chạy)
- `EJS_defaultOptions = {"save-state-location": "browser", "save-save-interval": "60"}`
- `EJS_pathtodata = "/retro-games/data/"`
- `EJS_gameUrl = "<Tên game>.sfc"` (cùng thư mục)
- Nạp ` /retro-games/data/loader.js `

Ngoại lệ: `mame/3wonders/3wonders.html` dùng `EJS_core = "mame"`, `EJS_startOnLoaded = true`, **không** có `EJS_defaultOptions` lưu trình duyệt, `EJS_gameUrl = "3wonders.zip"`.

## Luồng dữ liệu

1. Đọc giả mở bài trên 8bitstory.
2. Bài nhúng iframe (và nút “Chơi toàn màn hình” / “Play full screen”) trỏ tới URL GitHub Pages của file `.html` tương ứng.
3. Trang `.html` nạp EmulatorJS; ROM được trình giả lập lấy trực tiếp từ file `.sfc` / `.zip` cùng thư mục (file này **công khai** trên repo và trên GitHub Pages).
4. Save State ghi vào lưu trữ của trình duyệt (`save-state-location: browser`). Đổi máy, tab ẩn danh, hoặc xóa dữ liệu duyệt web thì mất bản lưu. Tùy chọn `save-save-interval: 60` có trong code; **lời hướng dẫn trên bài không được nói là game tự lưu** — người chơi phải bấm Save State / Load State.

`index.html` ở gốc repo là trang danh sách cũ (header đỏ, chỉ liệt kê Final Fight, Super Bomberman 3, và một mục placeholder “Another Game” **không có** trong repo; footer ghi © 2025). Đây không phải mặt tiền chính — mặt tiền là blog.

## Cách thêm game mới

1. Anh Trung tải file `.sfc` lên `Snes/<Tên game>/`.
2. Bot/cộng sự thêm `<Tên game>.html` đúng mẫu trên, rồi viết bài Blogger theo `DESIGN.md` và `RULES.md`.
3. Ảnh bìa tải lên Blogger (để có thumbnail), không chỉ trỏ URL ngoài.
