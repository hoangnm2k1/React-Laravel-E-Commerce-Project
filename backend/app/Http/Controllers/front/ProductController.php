<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Services\Interfaces\IProductService;
use App\Services\Interfaces\IBrandService;
use App\Services\Interfaces\ICategoryService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;
    protected $brandService;
    protected $categoryService;

    public function __construct(
        IProductService $productService,
        IBrandService $brandService,
        ICategoryService $categoryService
    ) {
        $this->productService = $productService;
        $this->brandService = $brandService;
        $this->categoryService = $categoryService;
    }

    public function getProducts(Request $request)
    {
        $filters = [];
        if ($request->category) $filters['category'] = $request->category;
        if ($request->brand) $filters['brand'] = $request->brand;

        $products = $this->productService->getActiveProducts($filters);

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    public function getLatestProducts()
    {
        $latestProducts = $this->productService->getLatestProducts();

        return response()->json([
            'status' => 200,
            'data' => $latestProducts
        ], 200);
    }

    public function getFeaturedProducts()
    {
        $featuredProducts = $this->productService->getFeaturedProducts();

        return response()->json([
            'status' => 200,
            'data' => $featuredProducts
        ], 200);
    }

    public function getCategories()
    {
        $categories = $this->categoryService->getAllCategories()->where('status', 1);

        return response()->json([
            'status' => 200,
            'data' => $categories->values()
        ], 200);
    }

    public function getBrands()
    {
        $brands = $this->brandService->getAllBrands()->where('status', 1);

        return response()->json([
            'status' => 200,
            'data' => $brands->values()
        ], 200);
    }

    public function getProductDetails($id)
    {
        $result = $this->productService->getProductWithDetails($id);

        if (!$result) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $result['product']
        ], 200);
    }
}
