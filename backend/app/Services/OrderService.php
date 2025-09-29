<?php

namespace App\Services;

use App\Repositories\Interfaces\IOrderRepository;
use App\Services\Interfaces\IOrderService;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class OrderService implements IOrderService
{
    protected $orderRepository;

    public function __construct(IOrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function getAllOrders()
    {
        return $this->orderRepository->getAll();
    }

    public function getOrderById($id)
    {
        return $this->orderRepository->findById($id);
    }

    public function getOrderWithItems($id)
    {
        return $this->orderRepository->findByIdWithItems($id);
    }

    public function createOrder(array $data, array $cartItems = [])
    {
        $order = $this->orderRepository->create($data);
        
        if (!empty($cartItems)) {
            $orderItems = $this->orderRepository->createOrderItems($order->id, $cartItems);
            return ['order' => $order, 'order_items' => $orderItems];
        }
        
        return ['order' => $order];
    }

    public function updateOrder($id, array $data)
    {
        return $this->orderRepository->update($id, $data);
    }

    public function createPaymentIntent($amount)
    {
        if ($amount <= 0) {
            throw new \Exception('Invalid amount');
        }

        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $paymentIntent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'USD',
            'payment_method_types' => ['card'],
        ]);

        return $paymentIntent->client_secret;
    }
}