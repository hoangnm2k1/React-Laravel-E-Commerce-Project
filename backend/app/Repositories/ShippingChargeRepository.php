<?php

namespace App\Repositories;

use App\Models\ShippingCharge;
use App\Repositories\Interfaces\IShippingChargeRepository;

class ShippingChargeRepository implements IShippingChargeRepository
{
    public function getFirst()
    {
        return ShippingCharge::first();
    }

    public function updateOrCreate(array $attributes, array $values)
    {
        return ShippingCharge::updateOrInsert($attributes, $values);
    }
}