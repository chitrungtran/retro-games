# DESIGN — Huyền Cơ Các

Cập nhật 13/11/2026 (giờ Việt Nam). Token lấy từ `theme/custom.css` và `ghpages/huyencocac/tuvi.css` (hopmang.css cùng hệ màu/font).

## Phong cách

Skin cổ kính, tối, huyền bí, phủ lên Fletro Pro 6.1. Nền giấy/mực nâu đen, chỉ vàng, điểm son (chu sa). Hoa văn: hero sao/la bàn, ấn son, mây, bát quái, thái cực, viền và góc hoa văn, thanh phân cách — ảnh host trên Blogger, gắn qua biến CSS trong theme. Favicon là ấn son, đã gắn qua Settings.

Không dùng emoji trong lời luận. Widget có dải ký tự thái cực giả cách (escape Unicode trong CSS) ở đầu/cuối khung.

## Font

Tất cả có subset Vietnamese trên Google Fonts (snippet trang chức năng đã nạp):

| Vai trò | Stack |
|---|---|
| Tiêu đề lớn, nhãn form, nút, heading mục | `"Cormorant SC", "Cormorant Garamond", "Lora", Georgia, serif` |
| Tagline, heading phụ, mục lời luận | `"Cormorant Garamond", "Lora", …` |
| Thân bài / ô nhập | `"Lora", "Noto Serif", Georgia, "Times New Roman", serif` |

Theme blog map lại biến Fletro: `--fontH` / `--fontB` / `--fontBa` trỏ các stack trên. Cỡ body theme: 15px, line-height 1.75.

## Bảng màu (biến theme `--hcc-*` và widget `.hcc`)

| Token | Mã | Dùng |
|---|---|---|
| ink / chữ | `#eee2c6` | thân |
| muted | `#c2b08b` | chú thích, dt |
| gold | `#c9a45c` | viền, nhấn |
| gold-soft / gold-hi | `#e8cf94` | heading, nhãn |
| bronze (theme) | `#8a6a35` | phụ |
| nền ink | `#120d0a` / `#1a130e` | nền trang / khung widget |
| paper / panel | `#211810`, `#2a1f15` | form, lá số, lời luận |
| field | `#130e0a` | ô nhập |
| cinnabar | `#a8322b` | nút, gạch mục, cạnh lời luận |
| cinnabar-hi / nút hover | `#c4463c` | nút hover |
| danger | `#f0b3a8` | lỗi, ngày không hợp lệ |
| ok | `#cfe6c4` | trạng thái ổn |
| chữ nút | `#fbecd0` | nút “Thỉnh lời luận” |

Nút `.hcc-btn`: nền gradient `#b33b31` → `#7f231c`, viền gold, chữ `#fbecd0`, font Cormorant SC, letter-spacing rộng.

## Component widget (cả hai trang)

- Khung `.hcc#hcc-root`: max-width 760px, viền kép gold, nền gradient tối.
- Intro: `h1` “Huyền Cơ Các”; tagline tử vi: “Một lá số, một câu hỏi, một lời luận.”; hợp mạng: “Xem Hợp Mạng hai bên.”
- Ngày sinh **ba ô** Ngày / Tháng / Năm (thứ tự dd/mm/yyyy), dòng xác nhận phía dưới (`.hcc-date-confirm`).
- Giờ: chọn canh giờ (có Tý sớm / Tý muộn) hoặc ô `type=time`.
- Câu hỏi tối đa 200 ký tự, bộ đếm `0 / 200`.
- Nút **Thỉnh lời luận**; trạng thái / spinner.
- Hộp thông tin (`.hcc-info`): ngày dương/âm, giờ chi, nạp âm (tên, ví dụ Đại Hải Thủy), cung hoàng đạo, thời điểm hiện tại.
- `<details class="hcc-chart">` lá số 12 cung (trang hợp mạng: hai lá, Bên A / Bên B).
- `.hcc-answer`: lời luận; mode dài có mục lục; việc đã qua dùng kiểu `.hcc-daqua` (câu in nghiêng, cỡ lớn).
- Nút **In / Lưu PDF** (`.hcc-print`) hiện sau khi có lời luận.

Xem Hợp Mạng thêm: khối `.hcc-ben` Bên A / Bên B (tên tùy chọn, giới tính bắt buộc); dropdown mối quan hệ (phu thê, người yêu, cha mẹ với con, anh chị em, bạn bè, đối tác làm ăn); khi chọn cha mẹ thì hỏi bên nào là cha mẹ; hàng gợi ý câu hỏi (`.hcc-goy`); bảng đối chiếu hai mạng.

## Theme blog (bên ngoài widget)

`theme/custom.css` ẩn khối demo/quảng cáo mẫu, thanh thông báo theme, slider, profile, vài link chân trang mặc định của Fletro. Trang chủ và menu dùng cùng palettes. Việc ẩn dòng “Được tạo bởi Blogger” / “Báo cáo vi phạm” **chưa làm** (đã đề xuất, chưa được trả lời).
