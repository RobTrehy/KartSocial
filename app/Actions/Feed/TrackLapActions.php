<?php

namespace App\Actions\Feed;

use App\Events\TrackVisitSessionEvent;
use App\Models\Track;
use App\Models\TrackLayout;
use App\Models\TrackVisit;
use App\Models\TrackVisitSession;
use App\Models\TrackVisitSessionLap;
use App\Models\User;

class TrackLapActions
{
    /**
     * Update fastest lap records if required
     */
    public static function IsFastestLap(TrackVisitSessionLap $lap)
    {
        $session = TrackVisitSession::where('id', $lap->session_id)->first();
        $visit = TrackVisit::where('id', $session->track_visit_id)->first();
        $layout = TrackLayout::where('id', $visit->track_layout_id)->first();
        $track = Track::where('id', $layout->track_id)->first();

        $records = [
            'track' => false,
            'layout' => false,
            'personal' => false,
        ];

        // Check and Set the track record
        if ($track->fastestLap) {
            if ($lap->lap_time < $track->fastestLap->lap_time) {
                $records['track'] = true;
                activity('Track')
                    ->performedOn($track)
                    ->withProperties([
                        'old' => ['lap_time' => $track->fastestLap->lap_time],
                        'attributes' => ['lap_time' => $lap->lap_time],
                    ])
                    ->event('- New Record!')
                    ->log('- New Record!');
                $track->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            }
        } else {
            $records['track'] = true;
            $track->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            activity('Track')
                ->performedOn($track)
                ->withProperties([
                    'attributes' => ['lap_time' => $lap->lap_time],
                ])
                ->event('- First Record!')
                ->log('- First Record!');
        }

        // Check and Set the track layout record
        if ($layout->fastestLap) {
            if ($lap->lap_time < $layout->fastestLap->lap_time) {
                $records['layout'] = true;
                activity('Track Layout')
                    ->performedOn($layout)
                    ->withProperties([
                        'old' => ['lap_time' => $layout->fastestLap->lap_time],
                        'attributes' => ['lap_time' => $lap->lap_time],
                    ])
                    ->event('- New Record!')
                    ->log('- New Record!');
                $layout->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            }
        } else {
            $records['layout'] = true;
            $layout->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            activity('Track Layout')
                ->performedOn($layout)
                ->withProperties([
                    'attributes' => ['lap_time' => $lap->lap_time],
                ])
                ->event('- First Record!')
                ->log('- First Record!');
        }

        // Check and Set the track visit record
        if ($visit->fastestLap) {
            if ($lap->lap_time < $visit->fastestLap->lap_time) {
                $visit->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            }
        } else {
            $visit->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
        }

        // Check and Set the track session record
        if ($session->fastestLap) {
            if ($lap->lap_time < $session->fastestLap->lap_time) {
                $session->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            }
        } else {
            $session->fastestLaps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
        }

        // Check and Set the User's Track & Track Layout Record
        $userLayoutFastestLap = User::find($visit->user_id)->fastestLapsForTrackLayout($layout)->first();
        if ($userLayoutFastestLap) {
            if ($lap->lap_time < $userLayoutFastestLap->lap_time) {
                $records['personal'] = true;
                // Remove the previous record
                User::find($visit->user_id)->fastestLapsForTrackLayout($layout)->detach();
                // Add the new record
                User::find($visit->user_id)->fastestLaps()->attach($lap, ['track_layout_id' => $layout->id]);
                activity('Track Layout')
                    ->performedOn($layout)
                    ->withProperties([
                        'old' => ['lap_time' => ($layout->fastestLap) ? $layout->fastestLap->lap_time : null],
                        'attributes' => ['lap_time' => $lap->lap_time],
                    ])
                    ->event('- New Personal Record!')
                    ->log('- New Personal Record!');
            }
        } else {
            $records['personal'] = true;
            User::find($visit->user_id)->fastestLaps()->attach($lap, ['track_layout_id' => $layout->id]);
            activity('Track Layout')
                ->performedOn($layout)
                ->withProperties([
                    'attributes' => ['lap_time' => $lap->lap_time],
                ])
                ->event('- First Personal Record!')
                ->log('- First Personal Record!');
        }

        if (
            $records['track'] ||
            $records['layout'] ||
            $records['personal']
        ) {
            TrackVisitSessionEvent::dispatch([
                'lap' => $lap,
                'session' => $session,
                'records' => $records,
            ], 'records');
        }
    }
}
