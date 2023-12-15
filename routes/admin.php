<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\UserRestrictionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AdminController::class, 'dashboard'])->name('index');
Route::get('/tracks/reseed', [AdminController::class, 'reseedTracksAndLayouts'])->name('tracks.reseed');

Route::resource('/users', UserAdminController::class)->only([
    'index',
    'show',
    'update',
    'destroy',
]);
Route::get('/users/{user}/activity', [UserAdminController::class, 'activity'])->name('users.activity');
Route::get('/users/{user}/events', [UserAdminController::class, 'trackEvents'])->name('users.track-events');
Route::get('/users/{user}/restriction', [UserRestrictionController::class, 'adminManageRestriction'])->name('users.restriction.manage');
Route::post('/users/{user}/restrict', [UserRestrictionController::class, 'adminRestrictUser'])->name('user.restrict');
Route::post('/user/restriction/{ban}', [UserRestrictionController::class, 'adminCancelAppeals'])->name('user.restriction.appeal.close');
Route::put('/user/restriction/{ban}', [UserRestrictionController::class, 'adminOpenAppeals'])->name('user.restriction.appeal.open');
Route::post('/user/restriction/{ban}/expiry', [UserRestrictionController::class, 'adminChangeExpiry'])->name('user.restriction.expiry');
Route::delete('/user/{user}/destroy', [UserAdminController::class, 'destroy'])->name('user.admin.destroy.confirmed');
