<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Track\Driver\TrackDriverController;
use App\Http\Controllers\Track\Event\TrackEventsController;
use App\Http\Controllers\Track\Lap\TrackLapsController;
use App\Http\Controllers\Track\Session\TrackSessionsController;
use App\Http\Controllers\TrackLayoutsController;
use App\Http\Controllers\TracksController;
use App\Http\Controllers\User\UserAccountController;
use App\Http\Controllers\User\UserPhotosController;
use App\Http\Controllers\User\UserProfileController;
use App\Http\Controllers\UserRestrictionController;
use App\Http\Middleware\UserIsNotRestricted;
use App\Http\Middleware\UserIsRestricted;
use App\Models\Track;
use App\Models\UserRestrictions;
use App\Notifications\TestNotification;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

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
})->name('home');

// User Profile Routes
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/follows', [UserProfileController::class, 'showFollows'])->name('profile.show.follows');
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/followers', [UserProfileController::class, 'showFollowers'])->name('profile.show.followers');
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/{item}', [UserProfileController::class, 'showItem'])->name('profile.show.item');
Route::middleware([UserIsNotRestricted::class])->get('/@{alias}/', [UserProfileController::class, 'show'])->name('profile.show');

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

    // Track Events, Visit & Session Routes
    Route::resource('events', TrackEventsController::class);
    Route::resource('events.sessions', TrackSessionsController::class);
    Route::put('/events/{event}/attendees', [TrackEventsController::class, 'updateAttendees'])->name('events.attendees.update');
    Route::post('/events/{event}/drivers', [TrackDriverController::class, 'addDriverToSessions'])->name('events.drivers');
    Route::get('/events/{event}/sessions/{session}/drivers', [TrackDriverController::class, 'index'])->name('events.sessions.drivers');
    Route::put('/events/{event}/sessions/{session}/drivers', [TrackDriverController::class, 'update'])->name('events.sessions.drivers.update');
    Route::get('/events/{event}/laps', [TrackLapsController::class, 'edit'])->name('events.laps');
    Route::put('/events/{event}/laps', [TrackLapsController::class, 'update'])->name('events.laps.update');
    Route::delete('/events/{event}/session/{session}/lap/{lap}', [TrackLapsController::class, 'destroy'])->name('events.laps.destroy');

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
    'verified',
])->group(function () {
    // Search
    Route::post('/search', [SearchController::class, 'search'])->name('search');
    Route::post('/users/search', [SearchController::class, 'users'])->name('users.search');

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
    Route::get('/user/authentication', [UserAccountController::class, 'authenticationLog'])->name('user.authentication-log');

    // User Restrictions and Appeals
    Route::post('/user/restriction/appeal', [UserRestrictionController::class, 'addAppealComment'])->name('user.restriction.appeal.add');
});

/**
 * User must be Authenticated, they don't have to be verified, and they CAN be banned
 */
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
])->group(function () {
    Route::get('/logout', [AuthenticatedSessionController::class, 'destroy']);
});

Route::resource('tracks', TracksController::class)->only(['index', 'show']);

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

Route::get('/notification', function () {
    Auth::user()->notify(new TestNotification("Title", "This is an example notification", route('tracks.show', ['track' => Track::find(1)])));
});
