<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Store</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            padding: 20px;
            margin: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }

        .header-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .header-subtitle {
            color: #585D6A;
        }

        .divider {
            height: 3px;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
            margin: 0;
        }

        .welcome-section {
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            display: table;
        }

        .welcome-text {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            font-size: 48px;
            color: white;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
        }

        .features {
            margin: 30px 0;
        }

        .feature {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            margin-bottom: 15px;
        }

        .feature:last-child {
            margin-bottom: 0;
        }

        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .feature-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .feature-desc {
            font-size: 14px;
            color: #666;
        }

        .cta-container {
            text-align: center;
            color: #fff;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin: 20px 0;
        }

        .footer {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }

        .footer-title {
            color: #585D6A;
        }

        .footer-contact {
            color: #fff;
        }

        .phone-icon {
            color: #dc3545;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: white;
            text-decoration: none;
            font-size: 18px;
        }

        .copyright {
            font-size: 12px;
            margin-top: 20px;
            opacity: 0.8;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-title">
                🛍️ E-Commerce Store
            </div>
            <p class="header-subtitle">Your Premium Shopping Destination</p>
        </div>

        <div class="divider"></div>
        <div class="welcome-section">
            <div class="welcome-text">
                🎉 Welcome! 🎉
            </div>
        </div>

        <!-- Content -->
        <div class="content">
            <h1 class="greeting">
                Chào mừng {{ $user->name }}!
            </h1>

            <p class="message">
                Cảm ơn bạn đã đăng ký tài khoản tại cửa hàng của chúng tôi! Chúng tôi rất vui mừng được chào đón bạn
                vào cộng đồng khách hàng thân thiết.
            </p>

            <p class="message">
                Với tài khoản mới của mình, bạn có thể:
            </p>

            <div class="features">
                <div class="feature">
                    <div class="feature-icon">🛒</div>
                    <div class="feature-title">
                        Mua sắm dễ dàng
                    </div>
                    <div class="feature-desc">
                        Hàng ngàn sản phẩm chất lượng
                    </div>
                </div>

                <div class="feature">
                    <div class="feature-icon">💳</div>
                    <div class="feature-title">
                        Thanh toán an toàn
                    </div>
                    <div class="feature-desc">
                        Bảo mật thông tin 100%
                    </div>
                </div>

                <div class="feature">
                    <div class="feature-icon">🎁</div>
                    <div class="feature-title">
                        Ưu đãi độc quyền
                    </div>
                    <div class="feature-desc">
                        Khuyến mãi dành riêng cho bạn
                    </div>
                </div>
            </div>

            <div class="cta-container">
                <a href="{{ config('app.frontend_url', 'http://localhost:5173') }}" class="cta-button">
                    Bắt đầu mua sắm ngay! 🛍️
                </a>
            </div>

            <p class="message">
                Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi. Đội ngũ hỗ trợ khách hàng luôn
                sẵn sàng giúp đỡ bạn 24/7.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-title"><strong>E-Commerce Store</strong></p>
            <p class="footer-contact">📧 support@ecommerce.com | <span class="phone-icon">📞</span> 1900-xxxx</p>

            <div class="social-links">
                <a href="#" class="social-link">📘 Facebook</a>
                <a href="#" class="social-link">📷 Instagram</a>
                <a href="#" class="social-link">🐦 Twitter</a>
            </div>

            <p class="copyright">
                © {{ date('Y') }} E-Commerce Store. All rights reserved.
            </p>
        </div>
    </div>
</body>

</html>