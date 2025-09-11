<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class OrderController extends Controller
{
    public function getOrder($id)
    {
        $order = Order::with('orderItems')->where('id', $id)->first();

        if ($order) {
            return response()->json([
                'status' => 200,
                'order' => $order
            ], 200);
        }

        return response()->json([
            'status' => 404,
            'message' => 'Order not found'
        ], 404);
    }

    public function saveOrder(Request $request)
    {
        if (!empty($request->cart)) {
            $order = Order::create([
                'user_id' => $request->user()->id,
                'subtotal' => $request->subtotal,
                'grand_total' => $request->grand_total,
                'shipping' => $request->shipping,
                'discount' => $request->discount,
                'payment_status' => $request->payment_status,
                'payment_method' => $request->payment_method,
                'status' => $request->status,
                'name' => $request->name,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zip' => $request->zip
            ]);

            $orderItems = [];
            foreach ($request->cart as $item) {
                $orderItems[] = OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['productId'],
                    'name' => $item['title'],
                    'size' => $item['size'],
                    'price' => $item['quantity'] * $item['price'],
                    'unit_price' => $item['price'],
                    'quantity' => $item['quantity']
                ]);
            }

            return response()->json([
                'status' => 200,
                'message' => 'Order placed successfully',
                'order' => $order,
                'order_items' => $orderItems
            ], 200);
        }

        return response()->json([
            'status' => 400,
            'message' => 'No items in cart'
        ], 400);
    }


    public function createPaymentIntent(Request $request)
    {
        try {
            if ($request->amount > 0) {
                Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

                $paymentIntent = PaymentIntent::create([
                    'amount' => $request->amount,
                    'currency' => 'USD',
                    'payment_method_types' => ['card'],
                ]);

                $clientSecret = $paymentIntent->client_secret;

                return response()->json([
                    'status' => 200,
                    'client_secret' => $clientSecret
                ], 200);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Invalid amount'
                ], 400);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'message' => 'Payment processing failed: ' . $th->getMessage()
            ], 500);
        }
    }

}
