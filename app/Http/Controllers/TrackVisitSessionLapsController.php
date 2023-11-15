<?php

namespace App\Http\Controllers;

use App\Events\TrackVisitSessionEvent;
use App\Models\TrackVisitSession;
use App\Models\TrackVisitSessionLap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackVisitSessionLapsController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     * 
     * Requires: visits.sessions.laps.update
     */
    public function edit(TrackVisitSession $session)
    {
        if (Auth::user()->cannot('visits.sessions.laps.update')) {
            abort(403);
        }

        return Inertia::render('Visits/Sessions/Lap', [
            'session' => $session,
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

        $session = TrackVisitSession::where('id', $request->session_id)->with('trackVisit')->first();
        $laps = $request->laps;

        $updated = 0;
        $added = 0;

        foreach ($laps as $lap) {
            $_lap = (array_key_exists('id', $lap)) ? TrackVisitSessionLap::find($lap['id']) : null;
            if ($_lap) {
                $_lap->lap_number = $lap['lap_number'];
                $_lap->lap_time = $lap['lap_time'];
                $_lap->lap_diff = $lap['lap_diff'];
                $_lap->save();
                if ($_lap->wasChanged()) {
                    $updated++;
                }
            } else {
                $_lap = TrackVisitSessionLap::create([
                    'session_id' => $session->id,
                    'lap_number' => $lap['lap_number'],
                    'lap_time' => $lap['lap_time'],
                    'lap_diff' => ($lap['lap_number'] === '1') ? null : $lap['lap_diff'],
                ]);
                $added++;
            }
        }

        if ($updated > 0 || $added > 0) {
            TrackVisitSessionEvent::dispatch(
                [
                    'session' => $session->toArray(),
                    'updated' => $updated,
                    'added' => $added,
                ],
                'addOrUpdateLaps'
            );
        }

        return redirect(route('visits.show', ['visit' => $session->track_visit_id]));
    }

    /**
     * Remove the specified resource from storage.
     * 
     * Requires: visits.sessions.laps.update
     */
    public function destroy(TrackVisitSession $session, TrackVisitSessionLap $lap)
    {
        if (Auth::user()->cannot('visits.sessions.laps.update')) {
            abort(403);
        }

        if ($lap->session_id === $session->id) {
            $lap->delete();
            activity('Session Laps')
                ->performedOn($session)
                ->event('deleted')
                ->log('deleted');
        }
    }
}
