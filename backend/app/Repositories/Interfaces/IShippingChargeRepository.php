<?php

namespace App\Repositories\Interfaces;

interface IShippingChargeRepository
{
    public function getFirst();
    public function updateOrCreate(array $attributes, array $values);
}