<?php

use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\UserRestrictionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/Index');
})->name('index');

Route::resource('/users', UserAdminController::class)->only([
    'index',
    'show',
    'update',
    'destroy',
]);
Route::get('/users/{user}/activity', [UserAdminController::class, 'activity'])->name('users.activity');
Route::get('/users/{user}/track-visits', [UserAdminController::class, 'trackVisits'])->name('users.track-visits');
Route::get('/users/{user}/restriction', [UserRestrictionController::class, 'adminManageRestriction'])->name('users.restriction.manage');
Route::post('/users/{user}/restrict', [UserRestrictionController::class, 'adminRestrictUser'])->name('user.restrict');
Route::post('/user/restriction/{ban}', [UserRestrictionController::class, 'adminCancelAppeals'])->name('user.restriction.appeal.close');
Route::put('/user/restriction/{ban}', [UserRestrictionController::class, 'adminOpenAppeals'])->name('user.restriction.appeal.open');
Route::post('/user/restriction/{ban}/expiry', [UserRestrictionController::class, 'adminChangeExpiry'])->name('user.restriction.expiry');
