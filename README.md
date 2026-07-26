# WEB TẠO QR VÀ GHÉP VÀO 12 MẪU

Bản cập nhật gồm:
- 12 mẫu (6 mẫu cũ + 6 mẫu mới).
- Tất cả template trong app đã xóa QR mặc định.
- Chỉ khi nhập link và bấm tạo thì QR mới xuất hiện.
- Nút tải ảnh bị khóa cho đến khi ảnh đã được tạo xong.
- Có thể thay luôn thanh link trên các mẫu cũ có thanh link.

## Chạy local
Yêu cầu: Node.js LTS

```bash
npm install
npm run dev
```

Hoặc trên Windows: nhấp đúp `CHAY_LOCAL_WINDOWS.bat`

## Deploy lên Vercel
- Upload toàn bộ thư mục này lên GitHub
- Import repository vào Vercel
- Build Command: `npm run build`
- Output Directory: `dist`

## Vị trí ảnh mẫu
`public/templates/mau-1.png` đến `public/templates/mau-12.png`

## Tọa độ QR
Nằm trong file `src/main.js` ở mảng `TEMPLATES`.

## Lưu ý
Các ảnh mẫu được lưu trong app là bản đã xóa QR mặc định để tránh lưu nhầm QR cũ.
