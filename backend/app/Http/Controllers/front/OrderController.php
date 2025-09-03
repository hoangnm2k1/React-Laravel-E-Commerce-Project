<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

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
}
