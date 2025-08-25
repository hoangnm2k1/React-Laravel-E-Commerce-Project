<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'customer',
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'User registered successfully',
            'user' => $user,
        ], 200);
    }

    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors(),
            ], 400);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = User::find(Auth::user()->id);
            $token = $user->createToken('token')->plainTextToken;

            return response()->json(
                [
                    'status' => 200,
                    'token' => $token,
                    'name' => $user->name,
                    'id' => $user->id,
                ], 200
            );
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Incorrect email or password',
            ], 401);
        }
    }

    public function getOrderDetails(Request $request, $id) {
        $order = Order::where(['id' => $id, 'user_id' => $request->user()->id])
        ->with('orderItems')
        ->first();

        if (!$order) {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'order' => $order,
        ], 200);
    }
}