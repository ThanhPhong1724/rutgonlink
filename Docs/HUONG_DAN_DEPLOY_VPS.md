# Hướng Dẫn Deploy Traffict SEO lên VPS

## 1. Thông Tin Máy Chủ

| Thông số | Giá trị |
|---|---|
| **IP** | `68.178.161.123` |
| **User** | `mufpt` |
| **Password** | `rjN#th#R6fvw` |
| **CPU** | 2 vCPU AMD EPYC |
| **RAM** | ~4 GB |
| **Ổ cứng** | 97 GB SSD (95 GB trống) |
| **OS** | Ubuntu/Debian (Linux x86_64) |

> [!TIP]
> VPS hoàn toàn đủ khả năng chạy toàn bộ project (PostgreSQL + Redis + 3 services Node.js chỉ cần khoảng 1.5–2 GB RAM).

### Kiến trúc khi deploy

```
Internet → Nginx (:80/:443)
              ├── /           → Next.js Frontend  (:3000)
              ├── /api/v1/*   → NestJS Backend     (:3001)
              ├── /uploads/*  → NestJS Static      (:3001)
              └── /go/*       → Next.js Redirect   (:3002)
           PostgreSQL (:5432)  ← Docker
           Redis      (:6379)  ← Docker
```

---

## 2. Kết Nối VPS

Từ máy Windows, mở PowerShell hoặc Terminal:

```bash
ssh mufpt@68.178.161.123
rjN#th#R6fvw
```

> Ngoài ra có thể dùng **PuTTY**, **MobaXterm**, hoặc **Termius** để SSH.

---

## 3. Cài Đặt Môi Trường

Chạy lần lượt các lệnh sau trên VPS:

### 3.1 Cập nhật hệ thống

```bash
sudo apt update && sudo apt upgrade -y
```

### 3.2 Cài Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # → v20.x
npm -v    # → 10.x
```

### 3.3 Cài Docker & Docker Compose

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker mufpt

# ⚠️ Quan trọng: đăng xuất rồi SSH vào lại
exit
ssh mufpt@68.178.161.123
rjN#th#R6fvw


# Kiểm tra
docker --version
docker compose version
```

### 3.4 Cài Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
```

### 3.5 Cài PM2 (quản lý process)

```bash
sudo npm install -g pm2
```

### 3.6 Cài Git

```bash
sudo apt install -y git
```

---

## 4. Clone Mã Nguồn & Cài Dependencies

```bash
cd ~
git clone https://github.com/ThanhPhong1724/rutgonlink.git 
cd rutgonlink
npm install
```

---

```bash
# Tất cả biến môi trường của toàn bộ project CHỈ CẦN để ở đây
nano ~/rutgonlink/.env
```

Dán nội dung sau (chỉnh sửa giá trị phù hợp):

```env
# ═══════════ DATABASE ═══════════
DATABASE_URL="postgresql://admin:password123@localhost:5432/rutgonlink_dev?schema=public"

# ═══════════ REDIS ═══════════
REDIS_HOST=localhost
REDIS_PORT=6379

# ═══════════ BACKEND ═══════════
PORT=3001
JWT_SECRET=THAY_BANG_CHUOI_NGAU_NHIEN_DAI
JWT_EXPIRES_IN=7d

# ═══════════ FRONTEND ═══════════
NEXT_PUBLIC_API_URL=https://trafficuser.live
NEXT_PUBLIC_SITE_URL=https://trafficuser.live

# ═══════════ GOOGLE AUTH ═══════════
GOOGLE_CLIENT_ID=298818615984-jnb56bh25gnq297e7bnlonbtqmcht2ij.apps.googleusercontent.com

# ═══════════ CLOUDFLARE TURNSTILE ═══════════
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

> [!IMPORTANT]
> - Tạo `JWT_SECRET` bằng lệnh: `openssl rand -base64 48` rồi dán vào.
> - Nếu sau này trỏ domain, thay `http://68.178.161.123` bằng `https://trafficseo.online`.
> - **Lấy Key Cloudflare Turnstile thật (Chống Bot):**
>   1. Đăng nhập Cloudflare → Nhìn menu bên trái chọn **Turnstile**.
>   2. Bấm **Add Site** (Thêm trang web) → Đặt tên: `Traffict SEO` → Nhập domain: `trafficseo.online`.
>   3. Nhấn Create.
>   4. Copy **Site Key** dán vào `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
>   5. Copy **Secret Key** dán vào `TURNSTILE_SECRET_KEY`.
>   _(Lưu ý: Key `1x000...` trong mẫu chỉ là key dùng tạm để lập trình, trên màn hình sẽ luôn hiện chữ "Chỉ để kiểm tra...". Khi lên production bắt buộc phải thay key thật ở bước này thì dòng chữ đỏ đó mới biến mất)._

---

## 6. Khởi Động Database

```bash
cd ~/rutgonlink

# Khởi động PostgreSQL + Redis
docker compose up -d

# Kiểm tra (cả 2 phải "running" + "healthy")
docker compose ps

# Generate Prisma Client
npm run db:generate

# Chạy Prisma db push để tạo bảng
npm run db:push

# Tạo tài khoản Admin mặc định (admin@trafficseo.online / Admin@123)
npm run db:seed


### Xóa toàn bộ dữ liệu làm lại từ đầu (Nếu cần thiết)
Nếu bạn chuyển sang VPS mới hoặc muốn xóa trắng app:
```bash
cd ~/rutgonlink
# Cài đặt gói dotenv-cli nếu chưa có
npm i -D dotenv-cli

# Reset toàn bộ data (thêm --skip-seed để không chạy mặc định seed.ts mà chạy tay seed-admin.ts)
npx dotenv-cli -e .env -- npx prisma migrate reset --force --skip-seed --schema=tap-lenh-cap-nhat-du-lieu/prisma/schema.prisma

# Tạo lại tài khoản Admin mặc định
npm run db:seed
```

---

## 7. Build Ứng Dụng Production

```bash
cd ~/rutgonlink

# Build packages dùng chung (BẮT BUỘC chạy trước)
npm run build -w goi-dung-chung/core-constants

# Build backend
npm run build -w may-chu-nghiep-vu

# Build frontend (Sử dụng root .env để nhúng SiteKey và Domain)
npx dotenv-cli -e .env -- npm run build -w ung-dung-giao-dien

# Build redirect service
npx dotenv-cli -e .env -- npm run build -w cong-khai-chuyen-huong
```

> [!CAUTION]
> **Lưu ý quan trọng về Layout:** Đảm bảo trong thư mục `ung-dung-giao-dien/app/` **KHÔNG** tồn tại song song cả `layout.js` và `layout.tsx`. Nếu có cả hai, Next.js sẽ ưu tiên file `.js` và bỏ qua file `.tsx` (nơi chứa AuthProvider), dẫn đến lỗi "useAuth must be used within AuthProvider". Luôn luôn xóa `layout.js` nếu dùng TypeScript.

> Build frontend sẽ mất khoảng 1–2 phút trên VPS.

---

## 8. Tạo File PM2 & Khởi Động

```bash
nano ~/rutgonlink/ecosystem.config.js
```

Dán nội dung:

```js
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: './may-chu-nghiep-vu',
      script: 'dist/main.js',
      env: { NODE_ENV: 'production', PORT: 3001 },
    },
    {
      name: 'frontend',
      cwd: './ung-dung-giao-dien',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: { NODE_ENV: 'production' },
    },
    {
      name: 'redirect',
      cwd: './cong-khai-chuyen-huong',
      script: 'node_modules/.bin/next',
      args: 'start -p 3002',
      env: { NODE_ENV: 'production' },
    },
  ],
};
```

Khởi động:

```bash
cd ~/rutgonlink
pm2 start ecosystem.config.js

# Kiểm tra
pm2 status

# Tự khởi động khi VPS restart
pm2 save
pm2 startup
# ⚠️ PM2 sẽ in ra 1 dòng lệnh sudo → copy và chạy dòng đó
```

---

## 9. Cấu Hình Nginx

```bash
sudo nano /etc/nginx/sites-available/trafficseo
```

Dán nội dung:

```nginx
server {
    listen 80;
    server_name 68.178.161.123;

    client_max_body_size 10M;

    # API Backend
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Upload files
    location /uploads/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Redirect service
    location /go/ {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend (mặc định)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Kích hoạt:

```bash
sudo ln -s /etc/nginx/sites-available/trafficseo /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

**Xong!** Truy cập `http://68.178.161.123` để kiểm tra.

---

## 10. Trỏ Domain & Cài SSL với Cloudflare

> [!TIP]
> Rất nên dùng Cloudflare: ẩn IP thật, chống DDoS, SSL miễn phí, hoàn toàn miễn phí cho các tính năng cơ bản.

### Bước 1 — Đăng ký & thêm domain vào Cloudflare
1. Vào [cloudflare.com](https://cloudflare.com) → Đăng ký/Đăng nhập.
2. Click **"Add a Site"** → Nhập tên miền của bạn (VD: `trafficseo.online`).
3. Chọn plan **Free** → Next.
4. Cloudflare sẽ scan DNS cũ và hiện danh sách record. Xác nhận và Next.
5. Cloudflare cấp cho bạn **2 nameserver** (VD: `aida.ns.cloudflare.com`, `brad.ns.cloudflare.com`).
6. Đăng nhập vào nhà cung cấp domain của bạn (Namesilo, Namecheap, GoDaddy, PA Vietnam...) → Tìm phần **"Nameservers"** → Xóa nameserver cũ và **dán 2 nameserver Cloudflare vào**.
7. Sau 5–30 phút, Cloudflare sẽ xác nhận domain đã active.

### Bước 2 — Thêm DNS record trỏ về VPS
1. Vào dashboard Cloudflare → chọn domain → tab **DNS**.
2. Click **"Add record"**:
   - Type: `A`
   - Name: `@` (tượng trưng cho domain gốc `trafficseo.online`)
   - IPv4 address: `68.178.161.123`
   - Proxy status: **Bật đám mây cam** (Proxied) ✅
3. Thêm record cho www:
   - Type: `CNAME`, Name: `www`, Target: `@`, Proxied ✅
4. Save.

### Bước 3 — Bật SSL trên Cloudflare
1. Vào tab **SSL/TLS** của domain.
2. Chọn chế độ: **Full** (khuyến nghị, Nginx dùng HTTP, Cloudflare tự bọc HTTPS).
3. Tab **Edge Certificates** → Bật **"Always Use HTTPS"** ✅
4. Bật **"Automatic HTTPS Rewrites"** ✅

> [!NOTE]
> Với Proxied + Full SSL của Cloudflare, bạn **không cần cài Certbot** trên VPS nữa. Nginx chỉ cần lắng nghe cổng 80 là đủ.

### Bước 4 — Cập nhật Nginx trên VPS
Mở lại file Nginx (đã tạo ở Bước 9) và chỉnh `server_name`:
```bash
sudo nano /etc/nginx/sites-available/trafficseo
```
Thêm domain vào dòng `server_name`:
```nginx
server_name 68.178.161.123 trafficseo.online www.trafficseo.online;
```
Lưu lại và reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Bước 5 — Cập nhật biến môi trường Frontend
Sửa file `.env` trên VPS:
```bash
nano ~/rutgonlink/.env
```
Đổi 2 dòng này:
```env
NEXT_PUBLIC_API_URL=https://trafficseo.online
NEXT_PUBLIC_SITE_URL=https://trafficseo.online
```

Build lại frontend và restart:
```bash
npm run build -w ung-dung-giao-dien
pm2 restart all
```

> [!IMPORTANT]
> **Đừng quên cập nhật** Google OAuth Redirect URI tại [Google Cloud Console](https://console.cloud.google.com) → APIs → Credentials → Thêm `https://trafficseo.online` vào danh sách **Authorized JavaScript origins**.

---

## 11. Script Cập Nhật Nhanh (Mỗi Lần Deploy)

Tạo file:

```bash
nano ~/rutgonlink/deploy.sh
```

Nội dung:

```bash
#!/bin/bash
set -e
cd ~/rutgonlink
echo "📥 Pulling latest code..."
git pull
echo "📦 Installing dependencies..."
npm install
echo "🔧 Generating Prisma..."
npm run prisma:generate
cd tap-lenh-cap-nhat-du-lieu && npx prisma db push && cd ..
echo "🏗️ Building..."
npm run build -w may-chu-nghiep-vu
npm run build -w ung-dung-giao-dien
npm run build -w cong-khai-chuyen-huong
echo "🔄 Restarting services..."
pm2 restart all
echo "✅ Deploy thành công!"
pm2 status
```

Cấp quyền chạy:

```bash
chmod +x ~/rutgonlink/deploy.sh
```

Từ nay mỗi lần có code mới, chỉ cần:

```bash
~/rutgonlink/deploy.sh
```

---

## 12. Các Lệnh Hay Dùng

| Lệnh | Mục đích |
|---|---|
| `pm2 status` | Xem trạng thái services |
| `pm2 logs` | Xem log tất cả |
| `pm2 logs backend --lines 100` | Xem 100 dòng log backend |
| `pm2 restart all` | Restart tất cả |
| `pm2 restart backend` | Restart chỉ backend |
| `docker compose ps` | Kiểm tra DB + Redis |
| `docker compose restart` | Restart DB + Redis |
| `sudo nginx -t` | Kiểm tra config Nginx |
| `sudo systemctl restart nginx` | Restart Nginx |
| `df -h` | Kiểm tra dung lượng ổ cứng |
| `free -h` | Kiểm tra RAM |
| `htop` | Monitor CPU/RAM real-time |

---

## 13. Xử Lý Sự Cố

| Lỗi | Cách xử lý |
|---|---|
| Trang trắng | `pm2 logs frontend` → build lại → `pm2 restart frontend` |
| 502 Bad Gateway | `pm2 status` → restart process lỗi |
| `useAuth must be used within AuthProvider` | **QUAN TRỌNG:** Xóa file `app/layout.js` nếu đang dùng `app/layout.tsx`. Next.js bị xung đột script layout cũ. |
| **Error 521 (Cloudflare)** | Xem mục **16. Lưu ý về SSL Cloudflare** bên dưới. |
| Database connection refused | `docker compose up -d` |
| Lỗi upload ảnh | `mkdir -p ~/rutgonlink/may-chu-nghiep-vu/uploads && chmod 755 ~/rutgonlink/may-chu-nghiep-vu/uploads` |
| Port bị chiếm | `sudo lsof -i :3000` → `kill -9 <PID>` |

---

## 16. Lưu ý về SSL Cloudflare & Lỗi 521

Lỗi **521 (Web server is down)** xảy ra khi Cloudflare không thể kết nối tới máy chủ gốc của bạn qua cổng HTTPS (443).

### Chế độ SSL/TLS trong Cloudflare:

1.  **Flexible**: Người dùng truy cập HTTPS qua Cloudflare, nhưng Cloudflare gọi về VPS qua HTTP (Cổng 80). Đây là cách **DỄ NHẤT** nếu bạn chưa cài chứng chỉ SSL trực tiếp trên VPS.
2.  **Full**: Cloudflare gọi về VPS qua HTTPS (Cổng 443). Nếu bạn chọn chế độ này mà VPS chưa mở cổng 443 hoặc chưa cài SSL, bạn sẽ gặp lỗi **521**.
3.  **Full (Strict)**: Yêu cầu chứng chỉ SSL trên VPS phải là chứng chỉ xịn, không được là chứng chỉ tự ký (Self-signed).

### Khuyên dùng:
- Nếu bạn muốn nhanh gọn, hãy chọn **Flexible** trong tab SSL/TLS của Cloudflare.
- Nếu muốn bảo mật cao hơn (Full), bạn cần cài Certbot (Let's Encrypt) trên VPS để mở cổng 443.

### Lỗi Turnstile SiteKey trống:
Nếu bạn thấy lỗi `Invalid input for parameter "sitekey"`, đó là do Next.js không đọc được biến môi trường `NEXT_PUBLIC_TURNSTILE_SITE_KEY` lúc build. 

Vì chúng ta để file `.env` ở thư mục gốc (root), bạn cần dùng `dotenv-cli` để truyền biến vào lệnh build:
```bash
npx dotenv-cli -e .env -- npm run build -w ung-dung-giao-dien
```
*(Nếu chưa cài dotenv-cli, hãy chạy: `npm install -g dotenv-cli`)*

---

## 14. Sao Lưu (Backup) Cơ Sở Dữ Liệu

Vì data của dự án Traffict SEO (thông tin user, link, giao dịch chiến dịch) là cực kỳ quan trọng, việc mất data do VPS hỏng có thể gây hậu quả nghiêm trọng.

> **Trả lời câu hỏi:** RẤT CẦN thiết phải đưa file backup ra ngoài VPS (dùng dịch vụ bên ngoài như Google Drive, AWS S3, Dropbox...). Tránh trường hợp cháy/hỏng máy chủ mất luôn cả database lẫn file backup nội bộ.

### 14.1 Lệnh Backup Thủ Công (Lưu trên VPS)

Tùy vì chúng ta dùng PostgreSQL qua Docker, lệnh export file SQL là:

```bash
docker exec -t rutgonlink-postgres-1 pg_dump -U admin -d rutgonlink_dev -F c > ~/rutgonlink/backup_db_$(date +%Y%m%d_%H%M%S).dump
```

_Thay `admin` và `rutgonlink_dev` bằng user/db name thật trong `.env` nếu có thay đổi._

### 14.2 Lệnh Khôi Phục (Restore) Thủ Công

```bash
# Xóa db hiện tại (cẩn thận)
docker exec -it <container_name> dropdb -U admin rutgonlink_dev
docker exec -it <container_name> createdb -U admin rutgonlink_dev

# Phục hồi
docker exec -i <container_name> pg_restore -U admin -d rutgonlink_dev < backup_db_xxx.dump
```

### 14.3 Tự Động Backup Hàng Đêm với rclone (Khuyên dùng)

**rclone** là công cụ dòng lệnh miễn phí, hỗ trợ tải lên hơn 70 loại cloud storage khác nhau (Google Drive, OneDrive, S3, Cloudflare R2...).

**Bước 1 — Cài đặt rclone trên VPS**
```bash
curl https://rclone.org/install.sh | sudo bash
rclone version   # Kiểm tra cài thành công
```

**Bước 2 — Cấu hình rỳ (VD: Google Drive)**
```bash
rclone config
```
Theo lưu trình lần lượt:
- Press `n` → New remote
- Name: `gdrive` (tên tùy chọn)
- Storage: chọn số tương ứng với **Google Drive** (thường là 15 hoặc 18, xem liệt kê trong terminal)
- Client ID / Secret: để trống (dùng Public API của rclone, OK cho cá nhân)
- Scope: `1` (Full access)
- Root folder: để trống (lưu gốc Drive)
- Advanced config: `n`
- Use auto config: `n` (vì đang dùng MobaXterm/PuTTY không có trình duyệt)
- Rồi CLI in ra 1 URL dài → **Copy URL đó, dán vào trình duyệt trên máy Windows của bạn**, cấp quyền cho Google Account, copy mã xác nhận dán lại vào SSH.
- Configure as a Shared Drive: `n`
- Press `y` → lưu
- Press `q` → thoát

**Bước 3 — Kiểm tra kết nối**
```bash
rclone lsd gdrive:     # Liệt kê thư mục gốc Google Drive
```
Nếu hiện ra danh sách thư mục là thành công! ✔️

**Bước 4 — Tạo thư mục backup trên Drive**
```bash
rclone mkdir gdrive:rutgonlink-Backups
```

**Bước 5 — Tạo script backup tự động**
```bash
nano ~/backup_rutgonlink.sh
```
Dán nội dung:
```bash
#!/bin/bash
DATETIME=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/tmp/db_rutgonlink_${DATETIME}.dump"

echo "[${DATETIME}] Bắt đầu backup..."

# 1. Xuất database ra file .dump
docker exec -t rutgonlink-postgres-1 pg_dump -U admin -d rutgonlink_dev -F c > "$BACKUP_FILE"

# 2. Upload lên Google Drive
rclone copy "$BACKUP_FILE" gdrive:rutgonlink-Backups/ --log-level INFO

# 3. Xóa file tạm trên VPS (tiết kiệm ổ cứng)
rm "$BACKUP_FILE"

# 4. Giữ lại tối đa 30 ngày backup trên Drive
rclone delete gdrive:rutgonlink-Backups/ --min-age 30d

echo "Backup hoàn tất: db_rutgonlink_${DATETIME}.dump → Google Drive"
```
Cấp quyền chạy:
```bash
chmod +x ~/backup_rutgonlink.sh
```

**Bước 6 — Test thử ngay**
```bash
~/backup_rutgonlink.sh
```
Kiểm tra xem file đã lên Drive chưa:
```bash
rclone ls gdrive:rutgonlink-Backups/
```
Nếu hiện ra tên file `.dump` là thành công! ✔️

**Bước 7 — Đặt lịch tự động chạy mỗi đêm lúc 2h sáng**
```bash
crontab -e
```
Thêm dòng sau vào cuối file (nhấn `a` để insert nếu dùng vi):
```
0 2 * * * /bin/bash ~/backup_rutgonlink.sh >> ~/backup.log 2>&1
```
Giải thích: `0 2 * * *` = mỗi ngày vào lúc 02:00 sáng máy chủ (Asia/Bangkok = UTC+7, vậy tính theo UTC là 19h tối hôm trước).

Kiểm tra cauron đã được cài:
```bash
crontab -l   # Phải hiện ra dòng bạn vừa thêm
```

Xem log sau khi chạy:
```bash
tail -20 ~/backup.log
```

---

## 15. Tích Hợp Cloudflare R2 Lưu Ảnh (Tham khảo cho tương lai)

Nếu sau này lượng ảnh tăng lên khiến VPS đầy bộ nhớ, hoặc bạn muốn tối ưu tốc độ load ảnh, hãy chuyển tính năng upload từ **lưu trực tiếp trên VPS** sang **Cloudflare R2** (tương tự Amazon S3 nhưng miễn phí 10 GB/tháng và không thu phí tải xuống).

### 15.1 Chuẩn bị Cloudflare R2
1. Vào mục **R2** trên bảng điều khiển Cloudflare.
2. Bật dịch vụ R2 (yêu cầu thêm thẻ tín dụng để chống spam, nhưng không trừ tiền nếu dưới 10GB/tháng).
3. Tạo một bucket mới, đặt tên: `trafficseo-images`.
4. Trong Settings của bucket, phần **Public Access**, kết nối một Custom Domain (VD: `cdn.trafficseo.online`).
5. Vào trang chính của R2, chọn **Manage R2 API Tokens**, bấm Create API Token.
6. Quyền: **Object Read & Write**.
7. Lưu lại **Access Key ID** và **Secret Access Key**.

### 15.2 Đổi cấu hình trên VPS
Trong tương lai nếu bạn yêu cầu, dev sẽ cấu hình lại file `./may-chu-nghiep-vu/src/upload/upload.module.ts` từ `diskStorage` sang `@aws-sdk/client-s3`. Lúc đó bạn chỉ cần vào VPS mở file `.env` và thêm:

```env
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_END_POINT=https://<account-id>.r2.cloudflarestorage.com
R2_BUCKET_NAME=trafficseo-images
NEXT_PUBLIC_CDN_URL=https://cdn.trafficseo.online
```

Lúc đó VPS của bạn sẽ chỉ chạy xử lý logic 100%, không còn lo đầy ổ cứng do ảnh rác nữa. Mọi ảnh hiển thị trên app sẽ tải trực tiếp từ máy chủ vật lý của Cloudflare.
