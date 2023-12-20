<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Env;
use NotificationChannels\WebPush\WebPushChannel;
use NotificationChannels\WebPush\WebPushMessage;

class UserAppNotification extends Notification
{
    use Queueable;

    public $title;
    public $message;
    public $url;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $title, string $message, string $url)
    {
        $this->title = $title;
        $this->message = $message;
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['broadcast', 'database', WebPushChannel::class];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => $this->title,
            'message' => $this->message,
            'url' => $this->url,
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'data' => $this->toArray($notifiable)
        ]);
    }

    public function broadcastType()
    {
        return 'user-notification';
    }

    public function toWebPush($notifiable, $notification)
    {
        return (new WebPushMessage)
            ->title($this->title)
            ->body($this->message)
            ->action('View Event', str_replace(Env::get('APP_URL'), '', $this->url))
            ->action('Dismiss', 'dismiss')
            ->options([
                'TTL' => 1000,
                'topic' => $this->url
            ])
            ->icon('/icons/icon-512x512.png')
            ->data([
                'id' => $this->id,
                'data' => $this->toArray($notifiable)
            ]);
    }
}
