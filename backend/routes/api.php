<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\ProductController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('products', ProductController::class);
});



use Illuminate\Support\Facades\Auth;
use App\Models\User;

Route::post('/login', function(Request $request) {
    $credentials = $request->only('email', 'password');
    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    $user = Auth::user();
    $token = $user->createToken('token')->plainTextToken;
    return response()->json(['token' => $token, 'user' => $user]);
});

Route::get('/debug-products', function () {
    try {
        return \App\Models\Product::all();
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});


use App\Http\Controllers\Api\ServiceController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('services', ServiceController::class);
});

Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout(); // pour session
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Déconnecté']);
});




