<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Colors\Rgb\Channels\Red;

class ReviewController extends Controller
{
    public function getReviews($id) {
        $reviews = Review::ProductId($id)
            ->with('user')
            ->orderBy('created_at', 'DESC')
            ->get();
            // ->paginate(5);

        $avgRating = Review::ProductId($id)
            ->avg('rating');

        $totalReviews = Review::ProductId($id)
            ->count();

        return response()->json([
            'status' => 200,
            'reviews' => $reviews,
            'totalReviews' => $totalReviews,
            'avgRating' => round($avgRating, 1)
        ]);
    }

    public function postReviews(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $review = Review::updateOrCreate(
            ['product_id' => $id, 'user_id' => Auth::user()->id],
            ['rating' => $request->rating, 'comment' => $request->comment]);

        return response()->json([
            'status' => 200,
            'review' => $review
        ]);
    }

}
