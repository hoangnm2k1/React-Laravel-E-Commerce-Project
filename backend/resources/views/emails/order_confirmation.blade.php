<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: #007bff;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }

        .content {
            padding: 30px;
        }

        .order-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .info-block {
            flex: 1;
            min-width: 200px;
            margin-bottom: 20px;
        }

        .badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }

        .badge-success {
            background: #28a745;
            color: white;
        }

        .badge-warning {
            background: #ffc107;
            color: black;
        }

        .badge-danger {
            background: #dc3545;
            color: white;
        }

        .customer-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .items-table th,
        .items-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }

        .items-table th {
            background: #f8f9fa;
            font-weight: bold;
        }

        .item-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
        }

        .totals {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
        }

        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        .total-row.grand {
            font-weight: bold;
            font-size: 18px;
            border-top: 2px solid #dee2e6;
            padding-top: 10px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #6c757d;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
        </div>

        <div class="content">
            <div class="order-info">
                <div class="info-block">
                    <h3>Order ID: #{{ $order->id }}</h3>
                    @if($order->status == 'pending')
                    <span class="badge badge-warning">Pending</span>
                    @elseif($order->status == 'shipped')
                    <span class="badge badge-warning">Shipped</span>
                    @elseif($order->status == 'delivered')
                    <span class="badge badge-success">Delivered</span>
                    @elseif($order->status == 'cancelled')
                    <span class="badge badge-danger">Cancelled</span>
                    @endif
                </div>
                <div class="info-block">
                    <div style="color: #6c757d;">Date</div>
                    <h4>{{ $order->created_at->format('M d, Y') }}</h4>
                </div>
                <div class="info-block">
                    <div style="color: #6c757d;">Payment Status</div>
                    <h4>
                        @if($order->payment_status == 'paid')
                        <span class="badge badge-success">Paid</span>
                        @else
                        <span class="badge badge-danger">Not Paid</span>
                        @endif
                    </h4>
                </div>
            </div>

            <div class="customer-info">
                <h3>Shipping Information</h3>
                <strong>{{ $order->name }}</strong><br>
                {{ $order->email }}<br>
                {{ $order->mobile }}<br>
                {{ $order->address }}, {{ $order->city }} {{ $order->state }} {{ $order->zip }}

                <div style="margin-top: 15px;">
                    <strong>Payment Method:</strong>
                    @if($order->payment_method == 'stripe')
                    <span class="badge badge-success">Stripe</span>
                    @else
                    <span class="badge badge-warning">COD</span>
                    @endif
                </div>
            </div>

            <h3>Order Items</h3>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orderItems as $item)
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center;">
                                @if($item->product && $item->product->image)
                                <img src="http://localhost:8000/uploads/products/small/{{ $item->product->image }}"
                                    alt="{{ $item->name }}" class="item-image" style="margin-right: 10px;">
                                @else
                                <div
                                    style="width: 60px; height: 60px; background: #f8f9fa; border-radius: 4px; margin-right: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6c757d;">
                                    No Image</div>
                                @endif
                                <span>{{ $item->name }}</span>
                            </div>
                        </td>
                        <td>{{ $item->size ?? '-' }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>${{ $item->price }}</td>
                        <td>${{ number_format($item->price * $item->quantity, 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="totals">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${{ $order->subtotal }}</span>
                </div>
                <div class="total-row">
                    <span>Shipping:</span>
                    <span>${{ $order->shipping }}</span>
                </div>
                <div class="total-row grand">
                    <span>Grand Total:</span>
                    <span>${{ $order->grand_total }}</span>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, please contact our support team.</p>
        </div>
    </div>
</body>

</html>