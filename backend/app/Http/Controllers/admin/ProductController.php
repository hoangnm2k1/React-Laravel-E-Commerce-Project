<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category', 'brand')->orderBy('created_at', 'DESC')->get();
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

            $product = Product::create($request->all());

        if ($request->gallery) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);
                $imageName = $product->id. '-'. time() . '.' . $ext;

                //large thumbnail
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));

                //small thumbnail
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/' . $imageName));

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

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
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $product
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
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'sku' => 'required|unique:products,sku,' . $id,
            'status' => 'required',
            'is_featured' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $product->update($request->all());

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
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully'
        ], 200);
    }
}