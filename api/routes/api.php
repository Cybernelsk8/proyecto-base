<?php

use App\Http\Controllers\Auth\LoginController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

    Route::get('/nelson/csrf-cookie', function (Request $request) {
        return response('');
    });


Route::post('/login', [LoginController::class, 'authenticate']);

Route::middleware(['jwt-auth'])->group(function () {
    Route::get('/user', [LoginController::class, 'verifyAuth']);
    Route::get('/test',function() {
        return response(Auth::user());
    });
});


