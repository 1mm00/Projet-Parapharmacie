<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'nom',
        'description',
        'duree',
        'prix',
        'disponibilite',
        'image'
    ];
}
