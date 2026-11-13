# ARCHITECTURE — Huyền Cơ Các

Cập nhật 13/11/2026 (giờ Việt Nam).

## Công nghệ

| Lớp | Thực tế |
|---|---|
| Blog | Blogger, blog ID `306363014920686317`, theme gốc Fletro Pro 6.1 (không AMP), tiếng Việt, múi giờ Hồ Chí Minh; đã phủ skin cổ kính tối |
| An lá số | iztro **2.6.5** chạy trên trình duyệt (bundle trong `tuvi.js` / `hopmang.js`) |
| Lịch pháp | `v2/lich.js` (âm lịch theo thuật toán Hồ Ngọc Đức, can chi, nạp âm, …), `v2/chart-helpers.js` |
| Lời luận | DeepSeek `deepseek-chat`, gọi từ Worker; nhiệt độ 0.7 |
| Proxy | Cloudflare Worker `huyencocac-luan`, endpoint `https://huyencocac-luan.huyencocac.workers.dev/api/luan` (POST) và `/api/time` (GET, không tính rate limit) |
| Asset nặng | GitHub Pages: `https://chitrungtran.github.io/retro-games/huyencocac/` |
| Mã nguồn làm việc | `/workspace/huyencocac` trên máy bot (repo GitHub **chỉ** có 4 file build: `tuvi.js/css`, `hopmang.js/css`) |

Khóa API nằm ở secret Worker tên `DEEPSEEK_API_KEY` (không ghi giá trị). Rate limit lưu ở KV binding `RATE_KV`. Biến `ALLOWED_ORIGINS` trên Worker (file `wrangler.toml` đang để origin blog). Code còn `DEFAULT_ORIGINS` gồm blog và localhost — nếu biến môi trường được set thì danh sách trong code bị thay bằng biến đó.

`wrangler.toml` vẫn khai `main = "worker.js"` (bản cũ). Bản đang chạy trên dashboard là logic của `worker-v2.js` (deploy khoảng 12/11/2026, version ngắn `8074218d…`). File `v2/README.md` còn dòng “worker-v2.js (chưa deploy)” — **lỗi thời**.

## Cây thư mục nguồn (máy bot, rút gọn)

```
/workspace/huyencocac
  v2/                 app.js, lich.js, chart-helpers.js, build.py
  hopmang/            app.js, compat.js, form.html, build.py
  ghpages/            build.py, tuvi-snippet.html, hopmang-snippet.html,
                      tuvi-local.html, hopmang-local.html,
                      huyencocac/{tuvi,hopmang}.{js,css}
  worker-v2.js        Worker đang dùng (nguồn)
  worker.js           bản cũ
  wrangler.toml
  tests/              worker-v2, lich-v2, hopmang, laso-layout, chon-ngay, …
  theme/              huyencocac-theme.xml, custom.css, backup-old-theme.xml
  widget-v2.txt, widget-v2-next.txt, hopmang-widget.txt   # bản cũ, build Pages không ghi đè
```

Trên repo `chitrungtran/retro-games` (nhánh `main`): chỉ `huyencocac/tuvi.js`, `tuvi.css`, `hopmang.js`, `hopmang.css`. Bộ tài liệu này dự kiến thêm vào `huyencocac/docs/`.

## Luồng dữ liệu

1. Trang Blogger nạp font Google, CSS/JS GitHub Pages (có `?v=<8 ký tự sha256>`), HTML form ngắn.
2. JS an lá số / đối chiếu hợp mạng **trên máy người xem**. Múi giờ lấy từ đồng hồ máy khách (nếu không có thì Việt Nam UTC+7); nhãn hiện “Việt Nam (UTC+7)”, không hiện `Asia/Saigon` hay `Etc/GMT-7`.
3. Nếu câu hỏi là việc đã qua: widget **không gọi** Worker, chỉ hiện “Việc đã qua sao còn hỏi.”
4. Các trường hợp khác: POST JSON `{ question, chartSummary, mode, gender, timeZone, zoneLabel, … }` tới `/api/luan`. Worker kiểm CORS, độ dài câu hỏi (tối đa 200 ký tự), độ dài tóm tắt lá số (12.000 ký tự với `cau-hoi`; 30.000 với `tron-doi` / `nam` / `chon-ngay` / `hop-mang`), rồi rate limit, rồi gọi DeepSeek.
5. GET `/api/time` trả `{ now: <epoch UTC> }` để thống nhất “hôm nay” phía server, đổi sang múi giờ khách trong prompt.

### Mode và trần token (worker-v2.js)

- `cau-hoi` — 350–500 chữ, `max_tokens` 1500
- `tron-doi` — không giới hạn chữ, 8192 token
- `nam` — không giới hạn chữ, 8192 token
- `chon-ngay` — 500–800 chữ, 2500 token
- `hop-mang` — 2500 token; tóm tắt tối đa 30.000 ký tự

### Rate limit (code Worker, khóa theo IP `CF-Connecting-IP`, lưu `RATE_KV`)

```
RATE = { windowMs: 10*60*1000, windowMax: 5, dayMax: 20, globalDayMax: 300 }
```

- 5 lần / 10 phút / IP → “Quá số lần hỏi trong 10 phút. Hãy thử lại sau.”
- 20 lần / ngày / IP, mốc ngày theo `currentVnDate` (UTC+7, khóa `ip:<ip>:d:YYYY-MM-DD`) → “Hôm nay bạn đã hỏi đủ số lần. Hẹn gặp lại ngày mai.”
- 300 lần / ngày cho cả trang (khóa `global:d:YYYY-MM-DD`) → “Hôm nay điện đã hết lượt luận. Hãy quay lại vào ngày mai.”
- Ngày đổi lúc 0h giờ Việt Nam (tính bằng offset +7 trên timestamp).

## Build và deploy

```bash
python3 /workspace/huyencocac/ghpages/build.py
```

Script gọi `v2/build.py --out` và `hopmang/build.py --out`, ghép iztro.min.js, ghi 4 asset + snippet (có `?v=hash`) + bản local preview. **Không** tự đẩy GitHub hay Blogger. Sau khi build: copy 4 file vào repo `huyencocac/`; dán `tuvi-snippet.html` / `hopmang-snippet.html` vào HTML trang Blogger. Hash hiện đang phục vụ (12/11/2026): tuvi.js `466c3245`, tuvi.css `b1db5f22`, hopmang.js `c1afa767`, hopmang.css `dde5b76e`. Đổi JS/CSS thì build lại để đổi hash.

Deploy Worker: qua dashboard Cloudflare đã đăng nhập (không tạo tài khoản mới). Hỏi anh trước khi đăng nhập.

Tests: nhiều file trong `tests/`. Lần chạy 12/11/2026 ghi nhận **339/339 đạt**. `package.json` → `npm test` hiện chỉ gọi `sample-chart.js` và `worker.test.js` (lỗi thời so với bộ test đầy đủ). Phiên viết tài liệu này **không chạy lại** test.
