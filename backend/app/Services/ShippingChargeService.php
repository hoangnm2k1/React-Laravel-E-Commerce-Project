<?php

namespace App\Services;

use App\Repositories\Interfaces\IShippingChargeRepository;
use App\Services\Interfaces\IShippingChargeService;

class ShippingChargeService implements IShippingChargeService
{
    protected $shippingChargeRepository;

    public function __construct(IShippingChargeRepository $shippingChargeRepository)
    {
        $this->shippingChargeRepository = $shippingChargeRepository;
    }

    public function getShipping()
    {
        return $this->shippingChargeRepository->getFirst();
    }

    public function updateShipping(array $data)
    {
        return $this->shippingChargeRepository->updateOrCreate(
            ['id' => 1],
            ['shipping_charge' => $data['shipping_charge']]
        );
    }
}