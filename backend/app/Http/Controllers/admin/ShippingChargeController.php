<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\Interfaces\IShippingChargeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ShippingChargeController extends Controller
{
    protected $shippingChargeService;

    public function __construct(IShippingChargeService $shippingChargeService)
    {
        $this->shippingChargeService = $shippingChargeService;
    }

    public function getShipping()
    {
        $shipping = $this->shippingChargeService->getShipping();

        return response()->json([
            'status' => 200,
            'shipping' => $shipping,
        ]);
    }

    public function updateShipping(Request $request)
    {
        $validator = Validator::make($request->all(), ([
            'shipping_charge' => 'required|numeric',
        ]));

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $shipping = $this->shippingChargeService->updateShipping($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Shipping charge save successfully',
            'shipping' => $shipping,
        ]);
    }
}
