<?php

namespace App\Http\Controllers\Notifications\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\UserAppNotificationsUpdated;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationsAPIController extends Controller
{
    public function markAsRead(DatabaseNotification $notification, Request $request)
    {
        $notification->read_at = $request->read_at;
        $notification->save();

        User::find($notification->notifiable_id)->notify(new UserAppNotificationsUpdated());
    }
}
