<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TrackLayoutsController;
use App\Http\Controllers\TracksController;
use App\Http\Controllers\TrackVisitsController;
use App\Http\Controllers\TrackVisitSessionsController;
use App\Http\Controllers\UserRestrictionController;
use App\Http\Middleware\UserIsNotRestricted;
use App\Http\Middleware\UserIsRestricted;
use App\Models\UserRestrictions;
use Illuminate\Foundation\Application;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
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
    return redirect(route('tracks.index'));
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
})->name('home');

// User Profile Routes
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/follows', [UserProfileController::class, 'showFollows'])->name('profile.show.follows');
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/followers', [UserProfileController::class, 'showFollowers'])->name('profile.show.followers');
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/{item}', [UserProfileController::class, 'showItem'])->name('profile.show.item');
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/', [UserProfileController::class, 'show'])->name('profile.show');


Route::get('/tracks', [TracksController::class, 'index'])->name('tracks.index');
Route::get('/tracks/{track}', [TracksController::class, 'show'])->name('tracks.show');

/**
 * User must be authenticated, verified and NOT restricted.
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    UserIsRestricted::class,
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'feed'])->name('dashboard');

    // Follower Routes
    Route::put('/user/{user}/follow', [UserProfileController::class, 'follow'])->name('user.follow');
    Route::delete('/user/{user}/follow', [UserProfileController::class, 'unfollow'])->name('user.unfollow');

    // Track / Layout Routes
    Route::resource('tracks', TracksController::class)->except(['index', 'show']);
    Route::resource('tracks.layout', TrackLayoutsController::class)->except(['index', 'show']);
    Route::post('/tracks/{track}/layout/{layout}/reinstate', [TrackLayoutsController::class, 'reinstate'])->withTrashed()->name('tracks.layout.reinstate');
    Route::post('/tracks/{track}/layout/{layout}/set_default', [TrackLayoutsController::class, 'makeDefault'])->withTrashed()->name('tracks.layout.set_default');

    // Track Visit & Session Routes
    Route::resource('visits', TrackVisitsController::class);
    Route::resource('visits.sessions', TrackVisitSessionsController::class)->except(['index', 'show']);
    Route::get('/session/{session}/laps', [TrackLapController::class, 'edit'])->name('session.laps');
    Route::put('/session/{session}/laps', [TrackLapController::class, 'update'])->name('session.laps.update');
    Route::delete('/session/{session}/lap/{lap}', [TrackLapController::class, 'destroy'])->name('session.lap.destroy');

    // Admin Routes
    Route::prefix('/admin')->middleware(['can:admin.access'])->name('admin:')->group(function () {
        include 'admin.php';
    });
});

/**
 * User must be Authenticated and verified, but they CAN be banned
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    // App Search
    Route::post('/search', [SearchController::class, 'search'])->name('search');

    // User Profile Routes
    Route::get('/user/profile', [UserProfileController::class, 'edit'])->name('user-profile.edit');
    Route::put('/user/profile', [UserProfileController::class, 'update'])->name('user-profile.update');
    Route::put('/user/profile-photos', [UserPhotosController::class, 'update'])
        ->middleware([config('fortify.auth_middleware', 'auth') . ':' . config('fortify.guard')])
        ->name('user-profile-photos.update');
    Route::delete('/user/profile-photo', [UserPhotosController::class, 'destroyPhoto'])
        ->name('current-user-photo.destroy');
    Route::delete('/user/cover-photo', [UserPhotosController::class, 'destroyCover'])
        ->name('current-user-cover.destroy');
    Route::post('/user/data/request', [UserAccountController::class, 'requestPersonalData'])->name('user.personal-data-request');
    Route::personalDataExports('personal-data-exports');

    // User Restrictions and Appeals
    Route::post('/user/restriction/appeal', [UserRestrictionController::class, 'addAppealComment'])->name('user.restriction.appeal.add');
});

Route::get('/restricted', function () {
    $restriction = UserRestrictions::where('user_id', Auth::id())->with(['user', 'restictor', 'appeals', 'appeals.user'])->first();
    if ($restriction) {
        return Inertia::render('Restricted/Index', [
            'restriction' => $restriction,
        ]);
    }
    return redirect('/dashboard');
})->name('restricted.access');

if (Env::get('APP_INVITATION_ONLY', false)) {
    include 'invitations.php';
}
