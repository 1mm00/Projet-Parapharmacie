<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

// Product.php
protected $fillable = [
    'name',
    'description',
    'price',
    'image',
    'stock',
    'promotion_percentage',
    'promotion_start',
    'promotion_end',
];
// app/Models/Product.php
public function getImageUrlAttribute()
{
    return $this->image ? asset('storage/' . $this->image) : null;
}

}
