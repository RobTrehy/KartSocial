<?php

namespace App\Http\Controllers\User;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Laravel\Jetstream\Agent;
use Laravel\Jetstream\Http\Controllers\Inertia\UserProfileController;
use Spatie\PersonalDataExport\Jobs\CreatePersonalDataExportJob;

class UserAccountController extends UserProfileController
{
    /**
     * Create an SAR / Personal Data Export Request
     *
     * Requires: None
     */
    public function requestPersonalData()
    {
        dispatch(new CreatePersonalDataExportJob(Auth::user()));
    }

    public function authenticationLog()
    {
        $authentications = DB::table(config('authentication-log.table_name'))
            ->where('authenticatable_id', Auth::id())
            ->where('authenticatable_type', 'App\Models\User')
            ->paginate(20);
        $authentications->getCollection()->transform(function ($auth) {
            $agent = tap(new Agent, fn ($agent) => $agent->setUserAgent($auth->user_agent));
            $location = json_decode($auth->location, true);
            $auth->agent = [
                'platform' => $agent->platform(),
                'browser' => $agent->browser(),
            ];
            $auth->location_string =
                ($location['state'] === true) ?
                $location['city'] . ', ' . $location['state'] . ', ' . $location['country'] :
                $location['city'] . ', ' . $location['country'];
            return $auth;
        });

        return Inertia::render('Profile/Authentication', [
            'authentications' => $authentications,
        ]);
    }
}
