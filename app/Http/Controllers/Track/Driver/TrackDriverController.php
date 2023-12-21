<?php

namespace App\Http\Controllers\Track\Driver;

use App\Http\Controllers\Controller;
use App\Models\TrackEvent;
use App\Models\TrackSession;
use App\Models\User;
use App\Notifications\UserAppNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use NumberFormatter;

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
        $original = $session->drivers->toBase()->toArray();
        $drivers = [];
        foreach ($request->drivers as $driver) {
            $drivers[$driver['id']] = ['position' => $driver['pivot']['position']];
        }
        $result = $session->drivers()->sync($drivers);

        foreach ($result['attached'] as $attached_id) {
            $nf = new NumberFormatter("en_GB", NumberFormatter::ORDINAL);
            $position = $nf->format(DB::table('track_session_drivers')
                ->where('user_id', $attached_id)
                ->where('track_session_id', $session->id)
                ->first()->position);
            if (Auth::id() <> $attached_id) {
                User::find($attached_id)
                    ->notify(
                        new UserAppNotification(
                            Auth::user()->alias . " added you to a session!",
                            "Congratulations for finishing in " . $position . " place! Click here to add your laps!",
                            route('events.show', ['event' => $event])
                        )
                    );
            }
        }

        foreach ($result['detached'] as $detached_id) {
            if (Auth::id() <> $detached_id) {
                User::find($detached_id)
                    ->notify(
                        new UserAppNotification(
                            Auth::user()->alias . " removed you from a session!",
                            "Click here to visit the event.",
                            route('events.show', ['event' => $event])
                        )
                    );
            }
        }

        foreach ($result['updated'] as $updated_id) {
            if (Auth::id() <> $updated_id) {
                $original_position = $original[array_search(1, array_column($original, 'id'))]['pivot']['position'];
                $new_position = DB::table('track_session_drivers')
                    ->where('user_id', $updated_id)
                    ->where('track_session_id', $session->id)
                    ->first()->position;

                if ($original_position !== $new_position) {
                    $nf = new NumberFormatter("en_GB", NumberFormatter::ORDINAL);
                    $position = $nf->format($new_position);
                    User::find($updated_id)
                        ->notify(
                            new UserAppNotification(
                                Auth::user()->alias . " updated your result on a session!",
                                "Your " . $nf->format($original_position) . " place is now " . $position . " place. Click here to view the event.",
                                route('events.show', ['event' => $event])
                            )
                        );
                }
            }
        }

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
