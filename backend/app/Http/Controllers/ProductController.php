<?php

// namespace App\Http\Controllers;

// use App\Models\Product;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;

// class ProductController extends Controller
// {
//     public function index()
//     {
//         return Product::all();
//     }

//     public function store(Request $request)
//     {
//         $data = $request->validate([
//             'name' => 'required',
//             'description' => 'nullable',
//             'price' => 'required|numeric',
//             'image' => 'nullable|image',
//             'active' => 'boolean'
//         ]);

//         if ($request->hasFile('image')) {
//             $data['image'] = $request->file('image')->store('products', 'public');
//         }

//         return Product::create($data);
//     }

//     public function show(Product $product)
//     {
//         return $product;
//     }

//     public function update(Request $request, Product $product)
//     {
//         $data = $request->validate([
//             'name' => 'sometimes',
//             'description' => 'nullable',
//             'price' => 'sometimes|numeric',
//             'image' => 'nullable|image',
//             'active' => 'boolean'
//         ]);

//         if ($request->hasFile('image')) {
//             // Delete old image
//             if ($product->image) {
//                 Storage::disk('public')->delete($product->image);
//             }
//             $data['image'] = $request->file('image')->store('products', 'public');
//         }

//         $product->update($data);
//         return $product;
//     }

//     public function destroy(Product $product)
//     {
//         if ($product->image) {
//             Storage::disk('public')->delete($product->image);
//         }
//         $product->delete();
//         return response()->noContent();
//     }
// }


namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        // return Product::all();
        return Product::all()->map(function ($product) {
            $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
            return $product;
        });
        
    }

    public function store(Request $request)
    {
        // $data = $request->validate([
        //     'name' => 'required',
        //     'description' => 'nullable',
        //     'price' => 'required|numeric',
        //     'image' => 'nullable|image',
        //     'stock' => 'nullable|integer',
        //     'promotion_percentage'=> 'nullable|integer|min:0|max:100',
        //     'promotion_start' => 'nullable|date',
        //     'promotion_end' => 'nullable|date|after_or_equal:promotion_start',
        // ]);
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image',
            'stock' => 'nullable|integer',
            'promotion_percentage'=> 'nullable|integer|min:0|max:100',
            'promotion_start' => 'nullable|date',
            'promotion_end' => 'nullable|date|after_or_equal:promotion_start',
        ]);
        

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        return Product::create($data);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'sometimes',
            'description' => 'nullable',
            'price' => 'sometimes|numeric',
            'image' => 'nullable|image',
            'stock' => 'nullable|integer',
            'promotion_percentage'=> 'nullable|integer|min:0|max:100',
            'promotion_start' => 'nullable|date',
            'promotion_end' => 'nullable|date|after_or_equal:promotion_start',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);
        // return $product;
        return $product->fresh()->append('image_url');

    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return response()->noContent();
    }
}
