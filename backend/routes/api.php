<?php

use App\Http\Controllers\NftController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

use Web3p\EthereumUtil\Util;
// use Kornrunner\Ethereum\Util;
use App\Models\User;
use Illuminate\Support\Facades\Log;
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

Route::post('/uploadnft', [NftController::class, 'uploadNFT']);
Route::get('/load-nft', [NftController::class, 'loadNFT']);
Route::get('/total', [NftController::class, 'nftTotal']);

Route::get('/auth/nonce', [UserController::class, 'userAuthGetNonce']);
Route::post('/auth/verify', [UserController::class, 'userAuth']);
