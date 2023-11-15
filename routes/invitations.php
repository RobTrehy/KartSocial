<?php

use App\Http\Controllers\Invitational\InvitationController;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/user/invitations', [InvitationController::class, 'show'])->name('user-invitations.show');
    Route::post('/user/invitations', [InvitationController::class, 'store'])->name('user-invitations.invite');
});
