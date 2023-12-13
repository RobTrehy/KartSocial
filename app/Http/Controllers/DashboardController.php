<?php

namespace App\Http\Controllers;

use App\Models\DashboardFeed;
use App\Models\Track;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard feed
     *
     * Requires: dashboard.view
     */
    public function feed()
    {
        if (Auth::user()->cannot('dashboard.view')) {
            abort(403);
        }

        return Inertia::render('Dashboard/Dashboard', [
            'feed' => DashboardFeed::whereIn(
                'user_id',
                User::find(Auth::id())
                    ->follows()
                    ->pluck('id')
            )->orderBy('updated_at', 'DESC')
            ->orderBy('id', 'DESC')->get(),
            'suggestions' => User::find(Auth::id())
                ->load(['suggestions' => function ($query) {
                    $query->inRandomOrder()->take('5');
                }, 'suggestions.suggested', 'suggestions.via'])->suggestions,
            'tracks' => Track::whereNotIn(
                'id',
                User::find(Auth::id())
                    ->load('trackEvents')
                    ->pluck('track_events.track_layout.track.id')
            )->inRandomOrder()->take(5)->get(),
        ]);
    }
}
