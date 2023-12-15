<?php

namespace App\Http\Controllers\Notifications\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationsAPIController extends Controller
{
    public function markAsRead(DatabaseNotification $notification, Request $request)
    {
        $notification->read_at = $request->read_at;
        $notification->save();
    }
}
