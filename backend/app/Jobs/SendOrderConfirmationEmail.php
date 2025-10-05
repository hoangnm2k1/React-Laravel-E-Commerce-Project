<?php

namespace App\Jobs;

use App\Mail\OrderConfirmationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendOrderConfirmationEmail implements ShouldQueue
{
    use Queueable;

    public $order;
    public $orderItems;
    public $email;

    public function __construct($order, $orderItems, $email)
    {
        $this->order = $order;
        $this->orderItems = $orderItems;
        $this->email = $email;
    }

    public function handle(): void
    {
        Mail::to($this->email)->send(new OrderConfirmationMail($this->order, $this->orderItems));
    }
}
