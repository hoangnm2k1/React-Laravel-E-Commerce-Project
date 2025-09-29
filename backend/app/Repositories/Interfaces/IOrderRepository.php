<?php

namespace App\Repositories\Interfaces;

interface IOrderRepository
{
    public function getAll();
    public function findById($id);
    public function findByIdWithItems($id);
    public function create(array $data);
    public function update($id, array $data);
    public function createOrderItems($orderId, array $items);
}