<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;



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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return Auth::user();
});



Route::resource('/songs', SongController::class);
Route::resource('/users', UserController::class);
Route::post('/users/login', [UserController::class,'login'])->name("users.login");
Route::post('/users/update', [UserController::class,'update'])->name("users.update");

Route::post('/songs', [SongController::class,'getSongs'])->name("songs.getSongs");
Route::post('/songs/update', [SongController::class,'update'])->name("songs.update");
Route::post('/songs/delete', [SongController::class,'deleteSong'])->name("songs.deleteSong");
Route::post('/songs/create', [SongController::class,'store'])->name("songs.store");
Route::post('/songs/getSong', [SongController::class,'getSong'])->name("songs.getSong");

