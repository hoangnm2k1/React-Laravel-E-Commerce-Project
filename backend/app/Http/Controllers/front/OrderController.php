<?php

namespace App\Http\Controllers\front;

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

    public function getOrder($id)
    {
        $order = $this->orderService->getOrderWithItems($id);

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
            $orderData = [
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
            ];

            $result = $this->orderService->createOrder($orderData, $request->cart);

            return response()->json([
                'status' => 200,
                'message' => 'Order placed successfully',
                'order' => $result['order'],
                'order_items' => $result['order_items']
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
            $clientSecret = $this->orderService->createPaymentIntent($request->amount);

            return response()->json([
                'status' => 200,
                'client_secret' => $clientSecret
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => $e->getMessage() === 'Invalid amount' ? 400 : 500,
                'message' => 'Payment processing failed: ' . $e->getMessage()
            ], $e->getMessage() === 'Invalid amount' ? 400 : 500);
        }
    }

}
