<?php

use App\Http\Controllers\Admin\MenusController;
use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::put('user/reset-password/{user}',[UserController::class,'resetPassword']);
Route::delete('user/disabled/{user}',[UserController::class,'disabledUser']);
Route::apiResource('user',UserController::class)->except(['destroy']);

Route::get('page/get-parents',[PagesController::class,'getParents']);

Route::apiResource('page',PagesController::class);

Route::apiResource('menu',MenusController::class);