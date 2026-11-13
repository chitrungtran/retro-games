# RULES — retro-games / 8bitstory

Cập nhật 13/11/2026 (giờ Việt Nam). Quy tắc code và nội dung đã chốt. Điểm đang mâu thuẫn với thực tế được ghi rõ, không tự sửa.

## Chữ lưu game (nguyên văn đã chốt)

Anh Trung gửi câu tiếng Việt ngày soạn bài, áp dụng cho các bài game. **Không viết là game tự lưu.** Không rút ngắn, không diễn lại.

Tiếng Việt (bắt buộc, nguyên văn):

> 💾 Muốn lưu game: bấm nút Save State trên thanh công cụ của trình giả lập, lần sau bấm Load State để chơi tiếp. Save nằm trong trình duyệt này, đổi máy, dùng tab ẩn danh hoặc xóa dữ liệu duyệt web dữ liệu lưu game sẽ mất.

Bản tiếng Anh **chưa được anh Trung chốt một câu duy nhất**. Hiện có hai biến thể trên blog:

- Bài mới hơn (Marvel, TMNT, …): “💾 To save: press Save State on the emulator toolbar; next time press Load State to continue. Saves stay in this browser — if you switch devices, use a private tab, or clear browsing data, your saves will be lost.”
- Một số bài cũ hơn: “💾 To save: press Save State on the emulator toolbar; next time press Load State to continue. Clearing browser data will delete your saves.”

## Dòng gamepad

Trong bài (nguyên văn đang dùng):

> 🎮 Nên dùng Gamepad, joypad hoặc tay cầm (controller) để trải nghiệm tốt hơn.

> 🎮 Use a gamepad or controller for the best experience.

Thanh thông báo đầu trang: xem `DESIGN.md`.

## Mẫu trang chơi (repo)

- Đường dẫn: `Snes/<Tên game>/<Tên game>.html`
- EmulatorJS 4.2.3; `EJS_startOnLoaded = false`; `EJS_defaultOptions` phải có `"save-state-location": "browser"` và `"save-save-interval": "60"`; `EJS_color = "#0064ff"`; `EJS_pathtodata = "/retro-games/data/"`.
- Anh Trung tải `.sfc`; bot chỉ thêm/sửa file HTML theo mẫu này.
- Không tự ý nâng bản EmulatorJS khi chưa kiểm tra lại lưu game và nút START GAME.

## Mẫu bài blog

- Nút đỏ `class="button"`: “Chơi toàn màn hình” / “Play full screen” (trỏ trang GitHub Pages) và “Download now” (xem mục mâu thuẫn dưới đây).
- Tab Median UI: bài mới để **English** là tab 1 (đã chốt từ 09/11/2026), không xếp chồng hai ngôn ngữ trong thân bài.
- Nhãn bài game: `games`, `games_snes`, cộng nhãn series khi thuộc chuỗi (đã dùng: `Final_Fight`, `Super_Bomberman`, `Teenage_Mutant_Ninja_Turtles`, `Marvel`). Gắn thêm, không thay/xóa nhãn cũ.
- Ảnh bìa tải lên Blogger để có thumbnail. Tiêu đề gõ trước, để permalink Automatic.
- Bài đối tác (Contra, Street Fighter, …) vào mục/bài riêng; không copy bài intro vào menu Links. Nút của bài đối tác trỏ về site họ (“Play now”, “Visit site / Download”), không trỏ ROM trong repo này.
- Quảng bá: chậm, không spam, không đăng nhóm Facebook tiếng Việt; bài Facebook tiếng Anh ngắn, kèm ảnh bìa, không dán nguyên bài.

## TUYỆT ĐỐI KHÔNG

- Không lộ API key, token, mật khẩu, email cá nhân, hay bí mật khác (repo công khai).
- Không viết trên bài rằng game tự lưu hoàn toàn / không cần bấm Save State.
- Không đổi câu hướng dẫn lưu tiếng Việt đã chốt.
- Không cho đọc giả tải ROM từ repo (không đặt link thẳng tới file `.sfc` / `.zip` trên GitHub hay GitHub Pages như nút “tải game”).
- Không spam, không đăng nhóm Facebook tiếng Việt để quảng bá.
- Không đụng vào dự án khác (Huyền Cơ Các chỉ cộng trú thư mục `huyencocac/`; không xóa hay sửa asset đó khi làm việc game, trừ khi được giao).

## Mâu thuẫn cần ghi nhận (không tự sửa)

Quy tắc “không đặt link tải ROM” **đang không khớp** với blog đang chạy:

- Nút **Download now** ở các bài game SNES hiện trỏ tới trang tải trên **romsfun.com** (ví dụ Final Fight → `https://romsfun.com/download/final-fight-7576`). Không trỏ file `.sfc` trong repo.
- Chính repo **đang host công khai** các file `.sfc` / `3wonders.zip`; trang EmulatorJS nạp ROM từ đó, nên URL file đoán được.
- Một số ảnh chụp trong game cũng đang lấy từ `romsfun.com/wp-content/uploads/`.

Việc giữ, gỡ, hay đổi nút/ảnh/ROM host là quyết định của anh Trung — xem `TASKS.md`.
