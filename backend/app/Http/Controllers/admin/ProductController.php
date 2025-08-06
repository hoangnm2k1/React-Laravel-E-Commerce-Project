<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('productImages', 'productSizes')->orderBy('created_at', 'DESC')->get();
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

        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->image = $request->image;
        $product->brand_id = $request->brand_id;
        $product->category_id = $request->category_id;
        $product->quantity = $request->quantity;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        // $product = Product::create($request->all());

    if (!empty($request->sizes)) {
        foreach ($request->sizes as $sizeId) {
            ProductSize::create([
                'product_id' => $product->id,
                'size_id' => $sizeId
            ]);
        }
    }

    if ($request->gallery) {
        foreach ($request->gallery as $key => $tempImageId) {
            $tempImage = TempImage::find($tempImageId);

            $extArray = explode('.', $tempImage->name);
            $ext = end($extArray);
            $rand = rand(1000, 9999);
            $imageName = $product->id. '-'. $rand . time() . '.' . $ext;

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

            ProductImage::create([
                'image' => $imageName,
                'product_id' => $product->id
            ]);

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
        $product = Product::with('productImages', 'productSizes')->find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
                'data' => []
            ], 404);
        }

        $productSizes = $product->productSizes()->pluck('size_id');

        return response()->json([
            'status' => 200,
            'data' => $product,
            'productSizes' => $productSizes
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

        // $product->update($request->all());
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        // $product->image = $request->image;
        $product->brand_id = $request->brand_id;
        $product->category_id = $request->category_id;
        $product->quantity = $request->quantity;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        if (!empty($request->sizes)) {
            ProductSize::where('product_id', $product->id)->delete();
            foreach ($request->sizes as $sizeId) {
                ProductSize::create([
                    'product_id' => $product->id,
                    'size_id' => $sizeId
                ]);
            }
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
        $product = Product::with('productImages')->find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        if ($product->productImages) {
            foreach ($product->productImages as $image) {
                File::delete(public_path('uploads/products/large/' . $image->image));
                File::delete(public_path('uploads/products/small/' . $image->image));
            }
        }

        $product->delete();

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

        $image = $request->file('image');
        $imageName = $request->product_id . '-' . time() . '.' . $image->extension();

        //large thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));

        //small thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));

        //create product image
        $productImage = ProductImage::create([
            'image' => $imageName,
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'data' => $productImage
        ], 200);
    }

    public function updateDefaultImage(Request $request)
    {
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Default image updated successfully',
            'data' => $product
        ], 200);
    }

    public function deleteProductImage(Request $request)
    {
        $productImage = ProductImage::find($request->id);

        if (!$productImage) {
            return response()->json([
                'status' => 404,
                'message' => 'Product image not found',
            ], 404);
        }

        // Delete the image files
        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        // Delete the product image record
        $productImage->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product image deleted successfully'
        ], 200);
    }
}
