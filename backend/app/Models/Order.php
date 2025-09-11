<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'subtotal',
        'grand_total',
        'shipping',
        'discount',
        'payment_status',
        'payment_method',
        'status',
        'name',
        'email',
        'mobile',
        'address',
        'city',
        'state',
        'zip',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:d M, Y',
        ];
    }
}