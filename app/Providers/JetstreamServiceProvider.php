<?php

namespace App\Providers;

use App\Actions\Jetstream\DeleteUser;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configurePermissions();

        Jetstream::deleteUsersUsing(DeleteUser::class);

        if (Env::get('APP_INVITATION_ONLY', false)) {
            Fortify::registerView(function (Request $request) {
                $invitation_token = $request->get('invitation_token');
                $invitation = Invitation::where('invitation_token', $invitation_token)->first();

                if ($invitation?->registered_at) {
                    return redirect(route('login'))->with('status', 'This invitation has already been used, please login instead.');
                }

                return Inertia::render('Auth/RegisterByInvite', [
                    'invitation_token' => $invitation_token,
                    'email' => $invitation?->email,
                ]);
            });
        }
    }

    /**
     * Configure the permissions that are available within the application.
     */
    protected function configurePermissions(): void
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::permissions([
            'create',
            'read',
            'update',
            'delete',
        ]);
    }
}
