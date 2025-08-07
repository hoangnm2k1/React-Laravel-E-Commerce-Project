<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getLatestProducts(Request $request)
    {
        $latestProducts = Product::latest()->where('status', 1)->take(8)->get();

        return response()->json([
            'status' => 200,
            'data' => $latestProducts
        ], 200);
    }

    public function getFeaturedProducts(Request $request)
    {
        $featuredProducts = Product::latest()->where('status', 1)->where('is_featured', 'yes')->take(8)->get();

        return response()->json([
            'status' => 200,
            'data' => $featuredProducts
        ], 200);
    }
}
