<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/tracks', [TracksController::class, 'index'])->name('tracks.index');
Route::get('/tracks/{track}', [TracksController::class, 'show'])->name('tracks.show');

/**
 * User must be authenticated, verified and NOT restricted.
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'feed'])->name('dashboard');

    // Track / Layout Routes
    Route::resource('tracks', TracksController::class)->except(['index', 'show']);

    // Admin Routes
    Route::prefix('/admin')->middleware(['can:admin.access'])->name('admin:')->group(function () {
        include 'admin.php';
    });
});
