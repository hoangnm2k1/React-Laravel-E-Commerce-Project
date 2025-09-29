<?php

namespace App\Services\Interfaces;

interface IOrderService
{
    public function getAllOrders();
    public function getOrderById($id);
    public function getOrderWithItems($id);
    public function createOrder(array $data, array $cartItems = []);
    public function updateOrder($id, array $data);
    public function createPaymentIntent($amount);
}