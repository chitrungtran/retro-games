# PRD — Huyền Cơ Các

Tài liệu viết ngày 13/11/2026 (giờ Việt Nam, UTC+7), bám blog, code trong `/workspace/huyencocac` và asset đang phục vụ trên GitHub Pages. Chỗ chưa chắc ghi *chưa xác minh*.

## Làm gì

Blog tử vi [huyencocac.blogspot.com](https://huyencocac.blogspot.com/) (Blogger, tài khoản trungtvbox2016, URL sửa bài dạng `/u/1/`). Phong cách huyền thuật, đạo gia, phong thủy. Người xem nhập ngày giờ sinh, giới tính và **một** câu hỏi; lá số Tử Vi Đẩu Số được an **ngay trên trình duyệt** (iztro 2.6.5 + lịch pháp trong JS); lời luận do DeepSeek viết qua Cloudflare Worker `huyencocac-luan` (khóa API chỉ nằm trên Worker).

Hai trang chức năng đã lên:

- **Xem Tử Vi** — `/p/xem-tu-vi.html`
- **Xem Hợp Mạng** — `/p/xem-hop-mang.html` (hai bên, dropdown mối quan hệ, đã có trong menu sau Xem Tử Vi)

## Cho ai

Người xem tiếng Việt, muốn hỏi một việc (ngày/tháng/năm, trọn đời, chọn ngày, hoặc hợp mạng hai người). Giọng lời luận: xưng “ta”, gọi “bạn”, ôn hòa, cổ kính, dễ hiểu; nói xu hướng chứ không phán chắc.

Chủ blog: anh Trung. Bot Blog được phép sửa layout và trang, xong thì báo “xong”. Không tạo tài khoản Cloudflare mới; khi cần đăng nhập thì hỏi anh.

## Mục tiêu

- An lá số đúng, deterministic, **không** để AI tự an sao hay tự tính lại can chi / lịch.
- Một lần hỏi, một lần đáp, đúng câu hỏi; ngày đã qua chỉ trả đúng một câu đã chốt.
- Giao diện cổ, huyền bí, chuyên nghiệp; font hỗ trợ đủ dấu tiếng Việt.
- Bảo vệ khóa DeepSeek và giới hạn lượt gọi (rate limit do **code Worker**, không phải hạn mức do DeepSeek đặt).

## Trong phạm vi

- Theme Fletro Pro 6.1 (bản quyền) đã phủ skin cổ kính tối.
- Widget tử vi và hợp mạng (form, lá số 12 cung, hộp thông tin, lời luận, in/PDF).
- Worker proxy: CORS, rate limit, các mode luận, quy tắc lời luận.
- Host JS/CSS nặng trên GitHub Pages (`chitrungtran/retro-games/huyencocac/`); trang Blogger chỉ dán snippet ngắn.
- Kiểm thử trong `/workspace/huyencocac/tests/`.

## Ngoài phạm vi

- Không viết câu miễn trừ “giải trí / tham khảo” (đã chốt bỏ).
- Không đụng site pigpigmyhome.uk.
- Không tạo tài khoản Cloudflare hay Blogger mới.
- Không nhúng khóa API ra client, không luận y tế/pháp lý/tài chính, không khuyên mua lễ giải hạn.
- Không phải blog game 8bitstory (chỉ mượn repo để host file tĩnh).
