<?php

namespace App\Providers;

use App\Repositories\Interfaces\IShippingChargeRepository;
use App\Repositories\ShippingChargeRepository;
use App\Services\Interfaces\IShippingChargeService;
use App\Services\ShippingChargeService;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(IShippingChargeRepository::class, ShippingChargeRepository::class);
        $this->app->bind(IShippingChargeService::class, ShippingChargeService::class);
    }

    public function boot()
    {
        //
    }
}