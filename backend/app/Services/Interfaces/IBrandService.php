<?php

namespace App\Services\Interfaces;

interface IBrandService
{
    public function getAllBrands();
    public function getBrandById($id);
    public function createBrand(array $data);
    public function updateBrand($id, array $data);
    public function deleteBrand($id);
}