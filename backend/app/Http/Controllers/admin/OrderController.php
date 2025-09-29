<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\Interfaces\IOrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(IOrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index() {
        $orders = $this->orderService->getAllOrders();

        return response()->json([
            'orders' => $orders,
            'status' => 200
        ], 200);
    }

    public function show($id) {
        $order = $this->orderService->getOrderWithItems($id);

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
        $order = $this->orderService->updateOrder($id, [
            'status' => $request->status,
            'payment_status' => $request->payment_status
        ]);

        if (!$order) {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $order,
            'message' => 'Order updated successfully'
        ], 200);
    }
}