<?php

namespace App\Http\Controllers\Track\Driver;

use App\Http\Controllers\Controller;
use App\Models\TrackEvent;
use App\Models\TrackSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackDriverController extends Controller
{
    public function index(TrackEvent $event, TrackSession $session)
    {
        return Inertia::render('Track/Sessions/Drivers', [
            'event' => $event->load(['trackLayout']),
            'session' => $session->load(['drivers']),
        ]);
    }

    public function update(TrackEvent $event, TrackSession $session, Request $request)
    {
        $drivers = [];
        foreach ($request->drivers as $driver) {
            $drivers[$driver['id']] = ['position' => $driver['pivot']['position']];
        }
        $session->drivers()->sync($drivers);

        return redirect(route('events.show', ['event' => $event]));
    }

    public function addDriverToSessions(Request $request)
    {
        foreach ($request->positions as $id => $result) {
            if ($result) {
                $session = TrackSession::where('id', $id)->first();
                $session->drivers()->attach(Auth::user(), ['position' => $result]);
            }
        }
    }
}
