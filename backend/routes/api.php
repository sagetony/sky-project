<?php

use App\Http\Controllers\NftController;
use App\Http\Controllers\UserController;
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



Route::get('/auth/nonce', [UserController::class, 'userAuthGetNonce']);
Route::post('/auth/verify', [UserController::class, 'userAuth']);


Route::middleware(['auth:sanctum'])->group(function () {
    // User

    Route::get('/user', [UserController::class, 'viewUser'])->name('viewUser');
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');
    Route::post('/profile', [UserController::class, 'editUser'])->name('editUser');

    // NFT
    Route::post('/buy', [NftController::class, 'buyNFT'])->name('editbuyNFTUser');
    Route::get('/loadsoldnft', [NftController::class, 'loadBoughtNFT'])->name('loadBoughtNFT');

    Route::post('/uploadnft', [NftController::class, 'uploadNFT']);
    Route::get('/load-nft', [NftController::class, 'loadNFT']);
    Route::get('/total', [NftController::class, 'nftTotal']);
});
