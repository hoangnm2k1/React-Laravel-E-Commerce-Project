<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
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

            if ($user->role === 'admin') {
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
                    'status' => 403,
                    'message' => 'Forbidden: You do not have admin access',
                ], 403);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Incorrect email or password',
            ], 401);
        }


    }
}
