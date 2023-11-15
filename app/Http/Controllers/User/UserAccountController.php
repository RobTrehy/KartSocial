<?php

namespace App\Http\Controllers\User;

use Illuminate\Support\Facades\Auth;
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
}
