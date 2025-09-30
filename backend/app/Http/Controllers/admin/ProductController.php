<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\Interfaces\IProductService;
use App\Services\Interfaces\IProductImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    protected $productService;
    protected $imageService;

    public function __construct(IProductService $productService, IProductImageService $imageService)
    {
        $this->productService = $productService;
        $this->imageService = $imageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->productService->getAllProducts();
        return response()->json([
            'status' => 200,
            'data' => $products,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'status' => 'required',
            'is_featured' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $productData = [
            'title' => $request->title,
            'price' => $request->price,
            'compare_price' => $request->compare_price,
            'description' => $request->description,
            'short_description' => $request->short_description,
            'brand_id' => $request->brand_id,
            'category_id' => $request->category_id,
            'quantity' => $request->quantity,
            'sku' => $request->sku,
            'barcode' => $request->barcode,
            'status' => $request->status,
            'is_featured' => $request->is_featured,
        ];

        $product = $this->productService->createProduct(
            $productData,
            $request->sizes ?? [],
            $request->gallery ?? []
        );

        return response()->json([
            'status' => 200,
            'message' => 'Product created successfully',
            'data' => $product
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->productService->getProductWithDetails($id);

        if (!$result) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $result['product'],
            'productSizes' => $result['productSizes']
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'sku' => [
                'required',
                Rule::unique('products', 'sku')->ignore($id)
            ],
            'status' => 'required',
            'is_featured' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $productData = [
            'title' => $request->title,
            'price' => $request->price,
            'compare_price' => $request->compare_price,
            'description' => $request->description,
            'short_description' => $request->short_description,
            'brand_id' => $request->brand_id,
            'category_id' => $request->category_id,
            'quantity' => $request->quantity,
            'sku' => $request->sku,
            'barcode' => $request->barcode,
            'status' => $request->status,
            'is_featured' => $request->is_featured,
        ];

        $product = $this->productService->updateProduct($id, $productData, $request->sizes ?? []);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully',
            'data' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = $this->productService->deleteProduct($id);

        if (!$deleted) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully'
        ], 200);
    }

    public function saveProductImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        $productImage = $this->imageService->saveProductImage(
            $request->product_id,
            $request->file('image')
        );

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'data' => $productImage
        ], 200);
    }

    public function updateDefaultImage(Request $request)
    {
        $this->imageService->updateDefaultImage($request->product_id, $request->image);

        return response()->json([
            'status' => 200,
            'message' => 'Default image updated successfully'
        ], 200);
    }

    public function deleteProductImage(Request $request)
    {
        $deleted = $this->imageService->deleteProductImage($request->id);

        if (!$deleted) {
            return response()->json([
                'status' => 404,
                'message' => 'Product image not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product image deleted successfully'
        ], 200);
    }
}