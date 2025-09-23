<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\IBrandRepository;
use App\Repositories\BrandRepository;
use App\Services\Interfaces\IBrandService;
use App\Services\BrandService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IBrandRepository::class, BrandRepository::class);
        $this->app->bind(IBrandService::class, BrandService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
