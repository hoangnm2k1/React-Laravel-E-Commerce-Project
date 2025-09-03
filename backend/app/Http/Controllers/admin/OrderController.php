<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        $orders = Order::orderBy('created_at', 'desc')->get();

        return response()->json([
            'orders' => $orders,
            'status' => 200
        ], 200);
    }

    public function show($id) {
        $order = Order::with('orderItems', 'orderItems.product')->find($id);

        if (!$order) {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'order' => $order,
            'status' => 200
        ], 200);
    }

    public function updateOrder(Request $request, $id) {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found'
            ], 404);
        }

        $order->status = $request->status;
        $order->payment_status = $request->payment_status;
        $order->save();

        return response()->json([
            'status' => 200,
            'data' => $order,
            'message' => 'Order updated successfully'
        ], 200);
    }
}