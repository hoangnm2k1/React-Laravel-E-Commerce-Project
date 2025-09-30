<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    public function store(Request $request)
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
        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('uploads/temp'), $imageName);

        $tempImage = TempImage::create([
            'name' => $imageName
        ]);

        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/' . $imageName));
        $img->coverDown(400, 450);
        $img->save(public_path('uploads/temp/thumbnail/' . $imageName));

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'data' => $tempImage
        ], 200);
    }

    public function delete($image)
    {
        $imageName = $image;
        $deletedImage = TempImage::where('name', $imageName)->first();

        if (!$deletedImage) {
            return response()->json([
                'status' => 404,
                'message' => 'Image not found'
            ], 404);
        }

        $deletedImage->delete();

        $mainImagePath = public_path('uploads/temp/' . $imageName);
        if (file_exists($mainImagePath)) {
            unlink($mainImagePath);
        }

        $thumbnailPath = public_path('uploads/temp/thumbnail/' . $imageName);
        if (file_exists($thumbnailPath)) {
            unlink($thumbnailPath);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Temporary image deleted successfully'
        ], 200);
    }
}
