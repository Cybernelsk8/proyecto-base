<?php

use App\Http\Controllers\Auth\LoginController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/csrf-cookie', fn(Request $request) => response(''));


Route::post('/login', [LoginController::class, 'authenticate']);

Route::middleware(['jwt-auth'])->group(function () {
    Route::get('/user', [LoginController::class, 'verifyAuth']);
});


