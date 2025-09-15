# E-commerce Application

A full-stack e-commerce application built with Laravel (backend) and React (frontend), featuring Stripe payment integration.

## 🚀 Features

- **Backend (Laravel 11)**

  - RESTful API
  - Authentication with Laravel Sanctum
  - Image processing with Intervention Image
  - Stripe payment integration
  - SQLite database (default)
  - Queue system for background jobs

- **Frontend (React 19)**
  - Modern React with Vite
  - Bootstrap UI components
  - Stripe payment integration
  - Rich text editor (Jodit)
  - Star rating system
  - Toast notifications
  - Swiper carousel

## 📋 Prerequisites

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **npm** or **yarn**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce
```

### 2. Backend Setup (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database (if not exists)
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"

# Run database migrations
php artisan migrate

# Install Node.js dependencies for asset compilation
npm install
```

### 3. Frontend Setup (React)

```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. Environment Configuration

Edit `backend/.env` file and configure the following:

```env
APP_NAME="Your E-commerce App"
APP_URL=http://localhost:8000

# Database (SQLite is pre-configured)
DB_CONNECTION=sqlite

# Stripe Configuration (add your keys)
STRIPE_KEY=your_stripe_publishable_key
STRIPE_SECRET=your_stripe_secret_key

# Mail Configuration (optional)
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
```

## 🚀 Running the Application

### Option 1: Development Mode (Recommended)

Run both backend and frontend simultaneously:

```bash
# In the backend directory
cd backend
composer run dev
```

This command will start:

- Laravel development server (http://localhost:8000)
- Queue worker
- Log viewer (Pail)
- Vite development server

### Option 2: Manual Setup

**Terminal 1 - Backend:**

```bash
cd backend
php artisan serve
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

## 📱 Access Points

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api

## 🗄️ Database

The application uses SQLite by default. The database file is located at `backend/database/database.sqlite`.

### Running Migrations

```bash
cd backend
php artisan migrate
```

## 📦 Building for Production

### Backend

```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
ecommerce/
├── backend/                 # Laravel application
│   ├── app/                # Application logic
│   ├── config/             # Configuration files
│   ├── database/           # Migrations, seeders, factories
│   ├── public/             # Public assets
│   ├── resources/          # Views, CSS, JS
│   ├── routes/             # Route definitions
│   └── storage/            # File storage
├── frontend/               # React application
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   └── assets/         # Static assets
│   └── public/             # Public files
└── README.md              # This file
```

## 🔐 API Authentication

The API uses Laravel Sanctum for authentication. Include the token in your requests:

```javascript
headers: {
  'Authorization': 'Bearer your-token-here',
  'Content-Type': 'application/json'
}
```

## 💳 Stripe Integration

1. Create a Stripe account at https://stripe.com
2. Get your publishable and secret keys
3. Add them to your `.env` file
4. Test with Stripe's test card numbers
