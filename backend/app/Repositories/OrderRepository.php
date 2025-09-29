<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderItem;
use App\Repositories\Interfaces\IOrderRepository;

class OrderRepository implements IOrderRepository
{
    public function getAll()
    {
        return Order::orderBy('created_at', 'desc')->get();
    }

    public function findById($id)
    {
        return Order::find($id);
    }

    public function findByIdWithItems($id)
    {
        return Order::with('orderItems', 'orderItems.product')->find($id);
    }

    public function create(array $data)
    {
        return Order::create($data);
    }

    public function update($id, array $data)
    {
        $order = Order::find($id);
        if ($order) {
            $order->update($data);
            return $order;
        }
        return null;
    }

    public function createOrderItems($orderId, array $items)
    {
        $orderItems = [];
        foreach ($items as $item) {
            $orderItems[] = OrderItem::create([
                'order_id' => $orderId,
                'product_id' => $item['productId'],
                'name' => $item['title'],
                'size' => $item['size'],
                'price' => $item['quantity'] * $item['price'],
                'unit_price' => $item['price'],
                'quantity' => $item['quantity']
            ]);
        }
        return $orderItems;
    }
}