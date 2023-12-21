<?php

namespace App\Http\Middleware;

use App\Models\TrackSessionLap;
use App\Models\TrackVisitSessionLap;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     */
    public function share(Request $request): array
    {
        $stats = [];

        if (Auth::check()) {
            $perms = User::find(Auth::id())->getAllPermissions()->pluck('name');
            $notifications = User::find(Auth::id())->notifications()->limit(5)->get();
            $unread_notifications = User::find(Auth::id())->unreadNotifications()->count();
        }
        if (!Auth::check() || Route::currentRouteName() === 'verification.notice') {
            $formatter = new \NumberFormatter('en_GB', \NumberFormatter::PADDING_POSITION);
            $stats['users'] = $formatter->format(floor(User::count() / 10) * 10); // To the nearest 10
            $stats['laps'] = $formatter->format(floor(TrackSessionLap::count() / 10) * 10); // To the nearest 10
        }

        return array_merge(
            parent::share($request),
            [
                'app_name' => Env::get('APP_NAME'),
                'app_feedback_label' => Env::get('APP_FEEDBACK_LABEL', 'Feedback'),
                'app_version' => Env::get('APP_VERSION', 'v0.0.0'),
                'max_invites' => Env::get('APP_MAX_INVITES', 1),
            ],
            Auth::check() ? [
                'auth.permissions' => isset($perms) ? $perms : null,
                'auth.user.notifications' => isset($notifications) ? $notifications : null,
                'auth.user.unread_notifications' => isset($unread_notifications) ? $unread_notifications : 0,
            ] : [],
            $stats
        );
    }
}
