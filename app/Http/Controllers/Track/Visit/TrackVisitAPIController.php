<?php

namespace App\Http\Controllers\Track\Visit;

use App\Http\Controllers\Controller;
use App\Models\Track;
use App\Models\TrackVisit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TrackVisitAPIController extends Controller
{
    public function match(Track $track, Request $request)
    {
        $follows = Auth::user()->follows()->pluck('id');
        $layouts = $track->layouts()->pluck('id');
        $fromDate = Carbon::createFromFormat('Y-m-d H:i', $request->visit_date)->subMinutes(10);
        $toDate = Carbon::createFromFormat('Y-m-d H:i', $request->visit_date)->addMinutes(10);

        return [
            'suggestions' => TrackVisit::whereIn('track_layout_id', $layouts)
                ->whereIn('user_id', $follows)
                ->where('visit_date', '>=', $fromDate)
                ->where('visit_date', '<=', $toDate)
                ->get()
                ->each(function ($visit) {
                    $visit->load(['driver']);
                })
        ];
    }
}
