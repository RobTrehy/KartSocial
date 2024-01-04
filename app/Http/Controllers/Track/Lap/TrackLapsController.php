<?php

namespace App\Http\Controllers\Track\Lap;

use App\Events\TrackLapsProcessed;
use App\Http\Controllers\Controller;
use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackSession;
use App\Models\TrackSessionLap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackLapsController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     * 
     * Requires: visits.sessions.laps.update
     */
    public function edit(Track $track, string $event_slug)
    {
        if (Auth::user()->cannot('visits.sessions.laps.update')) {
            abort(403);
        }

        $event = TrackEvent::where('slug', $event_slug)->whereIn('track_layout_id', $track->allLayouts()->pluck('id'))->first();
        $_sessions = TrackSession::where('track_event_id', $event->id)->with(['drivers'])->get();

        foreach ($_sessions as $session) {
            foreach ($session->drivers as $driver) {
                $driver->laps = TrackSessionLap::where('track_session_id', $session->id)->where('user_id', $driver->id)->orderBy('lap_number', 'ASC')->get();
                $driver->fastest_lap = TrackSessionLap::where('track_session_id', $session->id)->where('user_id', $driver->id)->orderBy('lap_time', 'ASC')->first();
            }
        }

        return Inertia::render('Track/Laps/Edit', [
            'event' => $event->load(['trackLayout']),
            'event.sessions' => $_sessions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: visits.sessions.laps.update
     */
    public function update(Request $request)
    {
        if (Auth::user()->cannot('visits.sessions.laps.update')) {
            abort(403);
        }

        $session = TrackSession::where('id', $request->session_id)->first();
        $laps = $request->laps;

        $updated = 0;
        $added = 0;

        foreach ($laps as $lap) {
            $_lap = (array_key_exists('id', $lap)) ? TrackSessionLap::find($lap['id']) : null;
            if ($_lap) {
                $_lap->lap_number = $lap['lap_number'];
                $_lap->lap_time = $lap['lap_time'];
                $_lap->lap_diff = $lap['lap_diff'];
                $_lap->save();
                if ($_lap->wasChanged()) {
                    $updated++;
                }
            } else {
                $_lap = TrackSessionLap::create([
                    'user_id' => Auth::id(),
                    'track_session_id' => $session->id,
                    'lap_number' => $lap['lap_number'],
                    'lap_time' => $lap['lap_time'],
                    'lap_diff' => ($lap['lap_number'] == '1') ? null : $lap['lap_diff'],
                ]);
                $added++;
            }
        }

        if ($updated > 0 || $added > 0) {
            TrackLapsProcessed::dispatch($session);
        }

        session()->flash('flash.banner', 'Session Laps Saved!');
        session()->flash('flash.bannerStyle', 'success');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * Requires: visits.sessions.laps.update
     */
    public function destroy(TrackEvent $event, TrackSession $session, TrackSessionLap $lap)
    {
        if (Auth::user()->cannot('visits.sessions.laps.update')) {
            abort(403);
        }

        $lap->delete();
        activity('Session Laps')
            ->performedOn($session)
            ->event('deleted')
            ->log('deleted');
    }
}
