E-commerce Application

Full-stack e-commerce app với Laravel 11 (backend) và React 19 (frontend), tích hợp thanh toán Stripe.

🚀 Tính năng

Backend (Laravel)

RESTful API, Sanctum Auth, Queue jobs

Stripe, SQLite, Image processing (Intervention Image)

Frontend (React)

React + Vite, Bootstrap UI

Stripe, Rich text editor (Jodit), Rating, Carousel, Toasts

📋 Yêu cầu

PHP ≥ 8.2, Composer ≥ 2

Node.js ≥ 18, npm/yarn

🛠️ Cài đặt
git clone <repository-url>
cd ecommerce

Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
php artisan migrate
npm install

Frontend
cd ../frontend
npm install

Cấu hình .env (backend)
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
STRIPE_KEY=your_stripe_publishable_key
STRIPE_SECRET=your_stripe_secret_key

# Email

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

🚀 Chạy ứng dụng

Cách nhanh nhất:

cd backend
composer run dev

Bao gồm: Laravel server, queue worker, log viewer, Vite server.

Thủ công:

Backend: php artisan serve

Queue worker: php artisan queue:work

Frontend: npm run dev (trong thư mục frontend)

📱 Đường dẫn

Frontend: http://localhost:5173

Backend API: http://localhost:8000

🧪 Testing

# Backend

cd backend && php artisan test

# Frontend

cd frontend && npm run test

📦 Build Production

# Backend

cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache route:cache view:cache
npm run build

# Frontend

cd frontend
npm run build

📁 Cấu trúc
ecommerce/
├── backend/ # Laravel app
└── frontend/ # React app

🔐 API Auth

Dùng Sanctum, gửi token trong header:

headers: {
Authorization: "Bearer your-token",
"Content-Type": "application/json"
}

💳 Stripe

Đăng ký tại stripe.com

Lấy publishable + secret keys

Thêm vào .env

📧 Email

**Gmail:**

1. Bật 2-Step Verification
2. Tạo App Password: Google Account → Security → App passwords
3. Dùng App Password làm MAIL_PASSWORD
