# WEB TẠO QR VÀ GHÉP VÀO 6 MẪU

Phiên bản web chạy hoàn toàn trên trình duyệt:

- Dán link và tạo QR.
- Chọn 1 trong 6 mẫu.
- Thay mã QR cũ đúng vị trí.
- Có thể thay luôn dòng link chữ.
- Xem trước ảnh độ phân giải gốc.
- Tải ảnh PNG.
- Link và ảnh không được gửi về máy chủ.
- Phù hợp để deploy lên Vercel.

## 1. Chạy trên máy bằng VS Code

Yêu cầu: đã cài Node.js LTS.

Mở Terminal tại thư mục dự án rồi chạy:

```bash
npm install
npm run dev
```

Mở địa chỉ Local mà Terminal hiển thị, thường là:

```text
http://localhost:5173
```

Trên Windows cũng có thể nhấp đúp:

```text
CHAY_LOCAL_WINDOWS.bat
```

## 2. Deploy lên Vercel bằng GitHub

1. Tạo repository mới trên GitHub.
2. Đưa toàn bộ nội dung thư mục dự án lên repository.
3. Đăng nhập Vercel.
4. Chọn **Add New → Project**.
5. Import repository GitHub vừa tạo.
6. Vercel sẽ nhận diện dự án. Các thông số đã có sẵn:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Bấm **Deploy**.
8. Sau khi thành công, bạn nhận link dạng:
   `https://ten-du-an.vercel.app`

Khi đã deploy, bạn có thể tắt VS Code và tắt laptop; website vẫn hoạt động.

## 3. Deploy bằng Vercel CLI

Cài Vercel CLI:

```bash
npm install -g vercel
```

Tại thư mục dự án, chạy:

```bash
vercel
```

Để đưa bản chính thức lên production:

```bash
vercel --prod
```

## 4. Vị trí 6 ảnh mẫu

```text
public/templates/mau-1.png
public/templates/mau-2.png
public/templates/mau-3.png
public/templates/mau-4.png
public/templates/mau-5.png
public/templates/mau-6.png
```

## 5. Tọa độ thay QR

Tọa độ nằm trong file:

```text
src/main.js
```

Phần đầu file có biến:

```js
const TEMPLATES = [...]
```

Mỗi mẫu có:

```js
qr: { x, y, w, h }
pill: { x, y, w, h }
```

- `qr`: vị trí QR.
- `pill`: vị trí thanh chứa link chữ.
- `x`, `y`: vị trí tính từ góc trên bên trái.
- `w`, `h`: chiều rộng và chiều cao.

Nếu thay ảnh mẫu bằng ảnh mới có bố cục khác, cần đo lại các tọa độ này.

## 6. Lưu ý

- QR luôn chứa link đầy đủ.
- Nếu dòng link quá dài, phần chữ trên ảnh sẽ rút gọn bằng dấu `…`.
- Mã QR vẫn không bị rút gọn.
- Website không cần Python, Flask, Django hay cơ sở dữ liệu.
- Ảnh được xử lý ngay trong thiết bị người dùng.
