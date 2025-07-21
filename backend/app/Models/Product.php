<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'price',
        'compare_price',
        'description',
        'short_description',
        'image',
        'brand_id',
        'category_id',
        'quantity',
        'sku',
        'barcode',
        'status',
        'is_featured'
    ];
}
