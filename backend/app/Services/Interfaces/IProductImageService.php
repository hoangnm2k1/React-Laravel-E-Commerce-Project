<?php

namespace App\Services\Interfaces;

interface IProductImageService
{
    public function processGalleryImages($productId, array $gallery);
    public function saveProductImage($productId, $imageFile);
    public function updateDefaultImage($productId, $imageName);
    public function deleteProductImage($imageId);
}