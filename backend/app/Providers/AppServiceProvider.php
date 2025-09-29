<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\IBrandRepository;
use App\Repositories\BrandRepository;
use App\Services\Interfaces\IBrandService;
use App\Services\BrandService;
use App\Repositories\Interfaces\ICategoryRepository;
use App\Repositories\CategoryRepository;
use App\Services\Interfaces\ICategoryService;
use App\Services\CategoryService;
use App\Repositories\Interfaces\IOrderRepository;
use App\Repositories\OrderRepository;
use App\Services\Interfaces\IOrderService;
use App\Services\OrderService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IBrandRepository::class, BrandRepository::class);
        $this->app->bind(IBrandService::class, BrandService::class);
        $this->app->bind(ICategoryRepository::class, CategoryRepository::class);
        $this->app->bind(ICategoryService::class, CategoryService::class);
        $this->app->bind(IOrderRepository::class, OrderRepository::class);
        $this->app->bind(IOrderService::class, OrderService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
