<?php

use App\Http\Controllers\Admin\API\RolesController;
use App\Http\Middleware\UserIsRestricted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



/**
 * User must be authenticated, verified, NOT restricted AND and admin.
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    UserIsRestricted::class,
    'can:admin.access'
])->prefix('/admin')->group(function () {
    Route::get('/roles', [RolesController::class, 'index']);
});
