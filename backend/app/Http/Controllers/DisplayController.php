<?php

namespace App\Http\Controllers;

use App\Models\Product;

class DisplayController extends Controller
{
    public function index()
    {
        $products = Product::where('active', true)->get();
        return view('display', compact('products'));
    }
}

