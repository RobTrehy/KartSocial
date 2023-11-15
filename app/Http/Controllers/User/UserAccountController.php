<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\PersonalDataExport\Jobs\CreatePersonalDataExportJob;

class UserAccountController extends Controller
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
