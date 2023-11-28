<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new MailMessage)
                ->subject('Confirm your email address')
                ->greeting('Verify Your Email Account')
                ->line('You\'re registered to use Kart Social!')
                ->line('In order complete the sign up process, please click the button below to verify your email address.')
                ->action('Confirm email address', $url)
                ->line('If you didn\'t sign up for Kart Social, you can safely ignore this email.')
                ->line('Thanks,')
                ->salutation('The Kart Social Team');
        });
    }
}
