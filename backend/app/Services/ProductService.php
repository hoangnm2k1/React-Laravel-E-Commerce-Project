<?php

namespace App\Services;

use App\Models\ProductSize;
use App\Repositories\Interfaces\IProductRepository;
use App\Services\Interfaces\IProductService;
use App\Services\Interfaces\IProductImageService;

class ProductService implements IProductService
{
    protected $productRepository;
    protected $imageService;

    public function __construct(IProductRepository $productRepository, IProductImageService $imageService)
    {
        $this->productRepository = $productRepository;
        $this->imageService = $imageService;
    }

    public function getAllProducts()
    {
        return $this->productRepository->getAll();
    }

    public function getProductById($id)
    {
        return $this->productRepository->findByIdWithRelations($id, ['productImages', 'productSizes']);
    }

    public function getProductWithDetails($id)
    {
        $product = $this->productRepository->findByIdWithRelations($id, ['productSizes.size', 'productImages']);
        if ($product) {
            $productSizes = $product->productSizes()->pluck('size_id');
            return ['product' => $product, 'productSizes' => $productSizes];
        }
        return null;
    }

    public function createProduct(array $data, array $sizes = [], array $gallery = [])
    {
        $product = $this->productRepository->create($data);

        if (!empty($sizes)) {
            $this->syncProductSizes($product->id, $sizes);
        }

        if (!empty($gallery)) {
            $this->imageService->processGalleryImages($product->id, $gallery);
        }

        return $product;
    }

    public function updateProduct($id, array $data, array $sizes = [])
    {
        $product = $this->productRepository->update($id, $data);
        
        if ($product && !empty($sizes)) {
            $this->syncProductSizes($id, $sizes);
        }

        return $product;
    }

    public function deleteProduct($id)
    {
        $product = $this->productRepository->findByIdWithRelations($id, ['productImages']);
        
        if ($product && $product->productImages) {
            foreach ($product->productImages as $image) {
                $this->imageService->deleteProductImage($image->id);
            }
        }

        return $this->productRepository->delete($id);
    }

    public function getActiveProducts(array $filters = [])
    {
        return $this->productRepository->getActiveProducts($filters);
    }

    public function getLatestProducts($limit = 8)
    {
        return $this->productRepository->getLatestProducts($limit);
    }

    public function getFeaturedProducts($limit = 8)
    {
        return $this->productRepository->getFeaturedProducts($limit);
    }

    private function syncProductSizes($productId, array $sizes)
    {
        ProductSize::where('product_id', $productId)->delete();
        foreach ($sizes as $sizeId) {
            ProductSize::create([
                'product_id' => $productId,
                'size_id' => $sizeId
            ]);
        }
    }
}