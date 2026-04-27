# 🚀 Developer Portfolio

Một trang web Portfolio cá nhân dành cho Lập trình viên (Developer) được thiết kế hiện đại, lấy cảm hứng từ giao diện Terminal/IDE (VS Code). Dự án tập trung vào việc tự động hoá hiển thị dự án thông qua GitHub API, mang lại trải nghiệm chuyên nghiệp và độc đáo.

## ✨ Tính năng nổi bật

- **🎨 Thiết kế phong cách Dev**: Giao diện mang đậm chất lập trình viên với cảm hứng từ Terminal và VS Code, tích hợp chế độ Light/Dark Mode mượt mà.
- **🔗 Tích hợp GitHub API**:
  - Tự động lấy danh sách dự án (Repositories) từ GitHub.
  - Hiển thị thanh tỷ lệ ngôn ngữ lập trình (Language Progress Bar) chi tiết cho từng dự án.
  - Hỗ trợ cache dữ liệu (`sessionStorage`) và sử dụng Personal Access Token (PAT) để tối ưu hoá hiệu suất và tránh giới hạn API (Rate Limit 403).
- **📂 Trình duyệt Code (Code Explorer) 3D Modal**: Cho phép xem cấu trúc thư mục và nội dung file source code của từng dự án trực tiếp trên web với syntax highlighting như một IDE thực thụ.
- **📄 Trình đọc README (README Modal)**: Xem trực tiếp file `README.md` của các dự án ngay trên portfolio với popup modal gọn gàng, hỗ trợ đầy đủ GitHub Flavored Markdown (bảng, code block, hình ảnh...).
- **🐱 Hoạt ảnh tương tác**: Tích hợp các chi tiết nhỏ sống động như chú mèo 3D (ẩn hiện tương tác) và hiệu ứng cuộn mượt (smooth scrolling) tạo chiều sâu (parallax).
- **📱 Responsive Layout**: Hiển thị hoàn hảo trên cả máy tính, tablet và thiết bị di động.

## 🛠 Công nghệ sử dụng

- **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS Modules với CSS Variables (hỗ trợ Light/Dark theme native)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Markdown Rendering**: `react-markdown`, `remark-gfm`
- **Syntax Highlighting**: `react-syntax-highlighter`
- **Icons**: `react-icons`

## 🚀 Cài đặt và Chạy cục bộ

### 1. Yêu cầu hệ thống

- Node.js (phiên bản 18+ khuyến nghị)
- npm hoặc yarn

### 2. Cài đặt

Clone dự án về máy:

```bash
git clone https://github.com/Ntiendat-2k3/Portfolio.git
cd terminal-portfolio
```

Cài đặt các thư viện phụ thuộc:

```bash
npm install
# hoặc
yarn install
```

### 3. Cấu hình biến môi trường

Dự án sử dụng GitHub API để lấy thông tin repository. Để tránh giới hạn 60 requests/giờ của GitHub, bạn cần tạo một **Personal Access Token (PAT)**.

1. Truy cập [GitHub Token Settings](https://github.com/settings/tokens).
2. Tạo token mới (Fine-grained token hoặc Classic token) với quyền `public_repo` (read-only).
3. Tạo file `.env` ở thư mục gốc của dự án và thêm token của bạn vào:

```env
VITE_GITHUB_TOKEN=ghp_your_github_personal_access_token_here
```

### 4. Chạy dự án

```bash
npm run dev
# hoặc
yarn dev
```

Mở trình duyệt và truy cập `http://localhost:5173/` để xem kết quả.

## 📁 Cấu trúc thư mục chính

```text
src/
├── assets/        # Hình ảnh, font chữ, icon...
├── components/    # Các UI component (Projects, ReadmePreview, CodeExplorer...)
├── hooks/         # Các custom React hooks
├── services/      # Các hàm gọi API (ví dụ: github.ts)
├── styles/        # CSS toàn cục (index.css, theme.css)
├── App.tsx        # Component gốc
└── main.tsx       # Entry point
```

## 📝 Tùy chỉnh

Để biến portfolio này thành của riêng bạn:

1. **Thông tin cá nhân**: Tìm và thay thế các thông tin (Tên, Giới thiệu, Link mạng xã hội) trong các component tương ứng.
2. **GitHub Username**: Mở file `src/services/github.ts` và đổi giá trị hằng số `GITHUB_USER` thành username GitHub của bạn.
