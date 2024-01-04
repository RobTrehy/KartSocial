<?php

namespace App\Observers;

use App\Models\DashboardFeed;
use App\Models\TrackEvent;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Support\Facades\Auth;

class TrackEventObserver implements ShouldHandleEventsAfterCommit
{
    /**
     * Handle the TrackEvent "created" event.
     */
    public function created(TrackEvent $event): void
    {
        DashboardFeed::create([
            'user_id' => Auth::check() ? Auth::id() : $event->user_id,
            'object_type' => get_class($event),
            'object_id' => $event->id,
            'properties' => [
                'track_layout' => $event->trackLayout->pluck('name')->toArray(),
                'track' => $event->trackLayout->track->pluck('slug', 'name')->toArray(),
            ],
            'card_type' => 'TrackEvent',
            'event' => 'created',
            'description' => 'created an Event',
        ]);
    }

    /**
     * Handle the TrackEvent "updated" event.
     */
    public function updated(TrackEvent $event): void
    {
        DashboardFeed::updateOrCreate(
            [
                'user_id' => Auth::check() ? Auth::id() : $event->user_id,
                'object_type' => get_class($event),
                'object_id' => $event->id,
                'card_type' => 'TrackEvent',
            ],
            [
                'properties' => [
                    'track_layout' => [
                        'name' => $event->trackLayout->name,
                    ],
                    'track' => [
                        'slug' => $event->trackLayout->track->slug,
                        'name' => $event->trackLayout->track->name,
                    ],
                ],
                'event' => 'updated',
                'description' => 'updated an Event',
            ]
        );
    }

    /**
     * Handle the TrackEvent "deleted" event.
     */
    public function deleted(TrackEvent $event): void
    {
        //
    }

    /**
     * Handle the TrackEvent "restored" event.
     */
    public function restored(TrackEvent $event): void
    {
        //
    }

    /**
     * Handle the TrackEvent "force deleted" event.
     */
    public function forceDeleted(TrackEvent $event): void
    {
        //
    }
}
