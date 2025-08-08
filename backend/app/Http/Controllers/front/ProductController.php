<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts(Request $request)
    {
        $products = Product::latest()->where('status', 1);

        if (!empty($request->category)) {
            $categoryIdArray = explode(',', $request->category);
            $products = $products->whereIn('category_id', $categoryIdArray);
        }

        if (!empty($request->brand)) {
            $brandIdArray = explode(',', $request->brand);
            $products = $products->whereIn('brand_id', $brandIdArray);
        }


        $products = $products->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    public function getLatestProducts()
    {
        $latestProducts = Product::latest()->where('status', 1)->take(8)->get();

        return response()->json([
            'status' => 200,
            'data' => $latestProducts
        ], 200);
    }

    public function getFeaturedProducts()
    {
        $featuredProducts = Product::latest()->where('status', 1)->where('is_featured', 'yes')->take(8)->get();

        return response()->json([
            'status' => 200,
            'data' => $featuredProducts
        ], 200);
    }

    public function getCategories()
    {
        $categories = Category::orderBy('name', 'asc')->where('status', 1)->get();

        return response()->json([
            'status' => 200,
            'data' => $categories
        ], 200);
    }

    public function getBrands()
    {
        $brands = Brand::orderBy('name', 'asc')->where('status', 1)->get();

        return response()->json([
            'status' => 200,
            'data' => $brands
        ], 200);
    }
}
