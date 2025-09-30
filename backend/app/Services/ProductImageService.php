<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\TempImage;
use App\Services\Interfaces\IProductImageService;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductImageService implements IProductImageService
{
    public function processGalleryImages($productId, array $gallery)
    {
        foreach ($gallery as $key => $tempImageId) {
            $tempImage = TempImage::find($tempImageId);
            if (!$tempImage) continue;

            $imageName = $this->generateImageName($productId, $tempImage->name);
            $this->createThumbnails($tempImage->name, $imageName);

            ProductImage::create([
                'image' => $imageName,
                'product_id' => $productId
            ]);

            if ($key == 0) {
                $this->updateDefaultImage($productId, $imageName);
            }
        }
    }

    public function saveProductImage($productId, $imageFile)
    {
        $imageName = $productId . '-' . time() . '.' . $imageFile->extension();
        $this->createThumbnailsFromFile($imageFile, $imageName);

        return ProductImage::create([
            'image' => $imageName,
            'product_id' => $productId
        ]);
    }

    public function updateDefaultImage($productId, $imageName)
    {
        $product = Product::find($productId);
        if ($product) {
            $product->image = $imageName;
            $product->save();
        }
    }

    public function deleteProductImage($imageId)
    {
        $productImage = ProductImage::find($imageId);
        if (!$productImage) return false;

        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        return $productImage->delete();
    }

    private function generateImageName($productId, $originalName)
    {
        $extArray = explode('.', $originalName);
        $ext = end($extArray);
        $rand = rand(1000, 9999);
        return $productId . '-' . $rand . time() . '.' . $ext;
    }

    private function createThumbnails($tempImageName, $imageName)
    {
        $manager = new ImageManager(Driver::class);
        
        // Large thumbnail
        $img = $manager->read(public_path('uploads/temp/' . $tempImageName));
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));

        // Small thumbnail
        $img = $manager->read(public_path('uploads/temp/' . $tempImageName));
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));
    }

    private function createThumbnailsFromFile($imageFile, $imageName)
    {
        $manager = new ImageManager(Driver::class);
        
        // Large thumbnail
        $img = $manager->read($imageFile->getPathname());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));

        // Small thumbnail
        $img = $manager->read($imageFile->getPathname());
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));
    }
}