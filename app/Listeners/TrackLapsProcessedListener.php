<?php

namespace App\Listeners;

use App\Events\TrackLapsProcessed;
use App\Models\DashboardFeed;
use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackLayout;
use App\Models\TrackSession;
use App\Models\TrackSessionLap;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TrackLapsProcessedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TrackLapsProcessed $event): void
    {
        $lap = TrackSessionLap::where('user_id', Auth::id())->where('track_session_id', $event->session->id)->orderBy('lap_time', 'ASC')->first();
        DashboardFeed::updateOrCreate(
            [
                'user_id' => $lap->user_id,
                'object_type' => get_class($lap->session),
                'object_id' => $lap->session->id,
                'card_type' => 'TrackSession',
            ],
            [
                'event' => 'updated',
                'description' => 'updated a Session with their Laps',
                'parent_type' => get_class($lap->session->trackEvent),
                'parent_id' => $lap->session->track_event_id,
                'properties' => [
                    'track_layout' => [
                        'name' => $lap->session->trackEvent->trackLayout->name,
                    ],
                    'track' => [
                        'id' => $lap->session->trackEvent->trackLayout->track->id,
                        'name' => $lap->session->trackEvent->trackLayout->track->name,
                    ],
                ],
            ]
        );

        activity('Session Laps')
            ->performedOn(TrackSession::find($lap->track_session_id))
            ->event('Added a lap time')
            ->log('created');

        $records = $this->checkRecords($lap);

        if ($records['track'] === true) {
            DashboardFeed::updateOrCreate(
                [
                    'user_id' => $lap->user_id,
                    'object_type' => get_class($lap->session),
                    'object_id' => $lap->session->id,
                    'card_type' => 'TrackRecord',
                ],
                [
                    'event' => 'track_record',
                    'description' => 'set a new Track Record!',
                    'parent_type' => get_class($lap->session->trackEvent),
                    'parent_id' => $lap->session->track_event_id,
                    'properties' => [
                        'lap' => [
                            'lap_time' => $lap->lap_time,
                            'lap_number' => $lap->lap_number,
                        ],
                        'track' => [
                            'id' => $lap->session->trackEvent->trackLayout->track->id,
                            'name' => $lap->session->trackEvent->trackLayout->track->name,
                        ]
                    ],
                ]
            );
        } elseif ($records['layout'] === true) {
            DashboardFeed::updateOrCreate(
                [
                    'user_id' => $lap->user_id,
                    'object_type' => get_class($lap->session),
                    'object_id' => $lap->session->id,
                    'card_type' => 'TrackRecord',
                ],
                [
                    'event' => 'layout_record',
                    'description' => 'set a new Track Layout Record!',
                    'parent_type' => get_class($lap->session->trackEvent),
                    'parent_id' => $lap->session->track_event_id,
                    'properties' => [
                        'lap' => [
                            'lap_time' => $lap->lap_time,
                            'lap_number' => $lap->lap_number,
                        ],
                        'track' => [
                            'id' => $lap->session->trackEvent->trackLayout->track->id,
                            'name' => $lap->session->trackEvent->trackLayout->track->name,
                        ],
                        'layout' => [
                            'name' => $lap->session->trackEvent->trackLayout->name,
                        ],
                    ],
                ]
            );
        } elseif ($records['personal'] === true) {
            DashboardFeed::updateOrCreate(
                [
                    'user_id' => $lap->user_id,
                    'object_type' => get_class($lap->session),
                    'object_id' => $lap->session->id,
                    'card_type' => 'TrackRecord',
                ],
                [
                    'event' => 'personal_record',
                    'description' => 'set a new Personal Record!',
                    'properties' => [
                        'lap' => [
                            'lap_time' => $lap->lap_time,
                            'lap_number' => $lap->lap_number,
                        ],
                        'track' => [
                            'id' => $lap->session->trackEvent->trackLayout->track->id,
                            'name' => $lap->session->trackEvent->trackLayout->track->name,
                        ],
                        'layout' => [
                            'name' => $lap->session->trackEvent->trackLayout->name,
                        ],
                    ],
                ]
            );
        }
    }

    private function checkRecords(TrackSessionLap $lap): array
    {
        $session = TrackSession::where('id', $lap->track_session_id)->first();
        $event = TrackEvent::where('id', $session->track_event_id)->first();
        $layout = TrackLayout::where('id', $event->track_layout_id)->first();
        $track = Track::where('id', $layout->track_id)->first();

        $records = [
            'track' => false,
            'layout' => false,
            'personal' => false,
        ];

        // Check and Set the track record
        if ($track->fastest_lap) {
            if ($lap->id === $track->fastest_lap->id) {
                $records['track'] = true;
                activity('Track')
                    ->performedOn($track)
                    ->withProperties([
                        'old' => ['lap_time' => $track->fastest_lap->lap_time],
                        'attributes' => ['lap_time' => $lap->lap_time],
                    ])
                    ->event('- New Record!')
                    ->log('- New Record!');
            }
        } else {
            $records['track'] = true;
            activity('Track')
                ->performedOn($track)
                ->withProperties([
                    'attributes' => ['lap_time' => $lap->lap_time],
                ])
                ->event('- First Record!')
                ->log('- First Record!');
        }

        // Check and Set the track layout record
        if ($layout->fastest_lap) {
            if ($lap->id === $layout->fastest_lap->id) {
                $records['layout'] = true;
                activity('Track Layout')
                    ->performedOn($layout)
                    ->withProperties([
                        'old' => ['lap_time' => $layout->fastest_lap->lap_time],
                        'attributes' => ['lap_time' => $lap->lap_time],
                    ])
                    ->event('- New Record!')
                    ->log('- New Record!');
            }
        } else {
            $records['layout'] = true;
            activity('Track Layout')
                ->performedOn($layout)
                ->withProperties([
                    'attributes' => ['lap_time' => $lap->lap_time],
                ])
                ->event('- First Record!')
                ->log('- First Record!');
        }

        // Check and Set the track event record
        if ($event->fastest_lap) {
            if ($lap->id === $event->fastest_lap->id) {
                // $event->fastest_laps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            }
        } else {
            // $event->fastest_laps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
        }

        // Check and Set the track session record
        if ($session->fastest_lap) {
            if ($lap->id === $session->fastest_lap->id) {
                // $session->fastest_laps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
            }
        } else {
            // $session->fastest_laps()->syncWithPivotValues($lap, ['track_layout_id' => $layout->id]);
        }

        // Check and Set the User's Track & Track Layout Record
        $userLayoutFastestLap = User::find($lap->user_id)->fastestLapsForTrackLayout($layout)->first();
        if ($userLayoutFastestLap) {
            if ($lap->id === $userLayoutFastestLap->id) {
                $records['personal'] = true;
                activity('Track Layout')
                    ->performedOn($layout)
                    ->withProperties([
                        'old' => ['lap_time' => ($layout->fastest_lap) ? $layout->fastest_lap->lap_time : null],
                        'attributes' => ['lap_time' => $lap->lap_time],
                    ])
                    ->event('- New Personal Record!')
                    ->log('- New Personal Record!');
            }
        } else {
            $records['personal'] = true;
            activity('Track Layout')
                ->performedOn($layout)
                ->withProperties([
                    'attributes' => ['lap_time' => $lap->lap_time],
                ])
                ->event('- First Personal Record!')
                ->log('- First Personal Record!');
        }

        // if (
        //     $records['track'] ||
        //     $records['layout'] ||
        //     $records['personal']
        // ) {
        //     TrackVisitSessionEvent::dispatch([
        //         'lap' => $lap,
        //         'session' => $session,
        //         'records' => $records,
        //     ], 'records');
        // }

        return $records;
    }
}
