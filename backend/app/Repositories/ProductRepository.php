<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Interfaces\IProductRepository;

class ProductRepository implements IProductRepository
{
    public function getAll()
    {
        return Product::with('productImages', 'productSizes')->orderBy('created_at', 'DESC')->get();
    }

    public function findById($id)
    {
        return Product::find($id);
    }

    public function findByIdWithRelations($id, array $relations = [])
    {
        return Product::with($relations)->find($id);
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update($id, array $data)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update($data);
            return $product;
        }
        return null;
    }

    public function delete($id)
    {
        $product = Product::with('productImages')->find($id);
        if ($product) {
            return $product->delete();
        }
        return false;
    }

    public function getActiveProducts(array $filters = [])
    {
        $query = Product::latest()->where('status', 1);

        if (!empty($filters['category'])) {
            $categoryIds = explode(',', $filters['category']);
            $query->whereIn('category_id', $categoryIds);
        }

        if (!empty($filters['brand'])) {
            $brandIds = explode(',', $filters['brand']);
            $query->whereIn('brand_id', $brandIds);
        }

        return $query->get();
    }

    public function getLatestProducts($limit = 8)
    {
        return Product::latest()->where('status', 1)->take($limit)->get();
    }

    public function getFeaturedProducts($limit = 8)
    {
        return Product::latest()->where('status', 1)->where('is_featured', 'yes')->take($limit)->get();
    }
}