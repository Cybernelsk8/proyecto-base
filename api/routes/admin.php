<?php

use App\Http\Controllers\Admin\PagesController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('user',UserController::class);

Route::get('page/get-parents',[PagesController::class,'getParents']);
Route::apiResource('page',PagesController::class);