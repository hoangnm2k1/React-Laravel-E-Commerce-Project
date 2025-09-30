<?php

namespace App\Services\Interfaces;

interface IShippingChargeService
{
    public function getShipping();
    public function updateShipping(array $data);
}