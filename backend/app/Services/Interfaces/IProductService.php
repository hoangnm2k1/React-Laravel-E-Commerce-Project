<?php

namespace App\Services\Interfaces;

interface IProductService
{
    public function getAllProducts();
    public function getProductById($id);
    public function getProductWithDetails($id);
    public function createProduct(array $data, array $sizes = [], array $gallery = []);
    public function updateProduct($id, array $data, array $sizes = []);
    public function deleteProduct($id);
    public function getActiveProducts(array $filters = []);
    public function getLatestProducts($limit = 8);
    public function getFeaturedProducts($limit = 8);
}