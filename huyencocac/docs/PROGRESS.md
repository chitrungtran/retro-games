# PROGRESS — Huyền Cơ Các

Mốc theo bộ nhớ công việc và kiểm lại ngày 13/11/2026 (giờ Việt Nam).

## Đã xong

- **11/11/2026 ~17:00:** Tạo https://huyencocac.blogspot.com/ trên trungtvbox2016, Fletro Pro 6.1 (không AMP), tiếng Việt, múi giờ Hồ Chí Minh.
- **11/11/2026 chiều–tối:** Demo `/p/xem-tu-vi.html`: iztro 2.6.5 an lá số trên trang, Worker proxy DeepSeek. Một lần thử live lúc đó có trả lời. Anh Trung chốt bỏ câu “giải trí/tham khảo”.
- **11/11/2026 ~18:14:** Theme cổ kính tối lên sống (font Cormorant SC / Garamond / Lora, palettes vàng–chu sa, ảnh trang trí). Backup theme cũ: `theme/backup-old-theme.xml`. Còn nợ: dòng “Được tạo bởi Blogger” / “Báo cáo vi phạm”.
- **11–12/11/2026:** Widget v2 (lịch pháp, mode trọn đời / năm / chọn ngày, hộp thông tin, in PDF, ba ô ngày sinh, quy tắc can chi / tháng âm / trực).
- **12/11/2026:** Editor Blogger treo khi dán widget ~109k ký tự, **không lưu được** sau vài lần thử. Chuyển JS/CSS sang GitHub Pages `chitrungtran/retro-games/huyencocac/`, trang chỉ còn snippet. Build: `python3 ghpages/build.py`.
- **12/11/2026:** Trang Xem Hợp Mạng `/p/xem-hop-mang.html` lên sống và vào menu. Worker (logic `worker-v2.js`, version `8074218d…`) thêm mode `hop-mang` (trần 30.000 ký tự / 2500 token) và câu gợi ý sang trang hợp mạng. Test ghi nhận 339/339 đạt. Rate limit đang: 5/10 phút, 20/IP/ngày, 300/ngày toàn trang, reset 0h giờ VN.

## Lỗi đã gặp và cách sửa

| Lỗi | Cách đã xử lý |
|---|---|
| Trình sửa HTML Blogger (CodeMirror) đơ / không lưu khi dán widget ~109k ký tự | Tách CSS/JS (có bundle iztro) lên GitHub Pages; Blogger chỉ dán snippet vài nghìn ký tự, cache-bust `?v=hash`. |
| Blogger làm hỏng ký tự non-ASCII trong style/script | Escape `\XXXX` / chỉ ASCII trong khối đó. |
| Lời luận live sau 12/11 chưa thử được từ IP máy bot (hết 20 lượt/ngày) | Để lịch test 15:00 ngày 17/11/2026; anh có thể thử từ máy/điện thoại khác. Không tự nới hạn mức. |
| `wrangler.toml` / `v2/README.md` lệch với bản Worker đang chạy | Chưa sửa; ghi vào `TASKS.md` để anh quyết / cập nhật tài liệu nội bộ. |

## Bước tiếp

1. **13:00 ngày 17/11/2026** (giờ Việt Nam): bật lại các routine đã tạm dừng (việc vận hành blog khác, không phải deploy tử vi).
2. **15:00 ngày 17/11/2026:** test live lời luận cả hai trang, chụp ảnh; **hỏi** anh về rate limit (tăng, thêm khóa test, hay giữ). Chỉ sửa Worker sau khi anh trả lời.
3. Chờ quyết về việc ẩn “Được tạo bởi Blogger” / “Báo cáo vi phạm”.
4. Các lần sửa sau: bám `RULES.md` và checklist trong `TASKS.md`.

Bộ tài liệu này chưa commit/upload; dự kiến nằm ở `huyencocac/docs/` trong repo `chitrungtran/retro-games` (cùng chỗ host asset Pages). Không chứa khóa, token, hay email.
