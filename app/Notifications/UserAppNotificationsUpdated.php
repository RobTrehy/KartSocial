<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserAppNotificationsUpdated extends Notification implements ShouldDispatchAfterCommit
{
    use Queueable;

    public $notifications;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->notifications = DatabaseNotification::where('notifiable_id', Auth::id())->get();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return $this->notifications->toArray();
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'notifications' => $this->toArray($notifiable),
            'unread_notifications' => User::find(Auth::id())->unreadNotifications()->count()
        ]);
    }

    public function broadcastType()
    {
        return 'user-notifications-updated';
    }
}
