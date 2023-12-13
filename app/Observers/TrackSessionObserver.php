<?php

namespace App\Observers;

use App\Models\DashboardFeed;
use App\Models\TrackSession;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Support\Facades\Auth;

class TrackSessionObserver implements ShouldHandleEventsAfterCommit
{
    /**
     * Handle the TrackSession "created" event.
     */
    public function created(TrackSession $session): void
    {
        DashboardFeed::create([
            'user_id' => Auth::check() ? Auth::id() : $session->user_id,
            'object_type' => get_class($session),
            'object_id' => $session->id,
            'card_type' => 'TrackSession',
            'event' => 'updated',
            'description' => 'updated an Event with new Sessions',
            'parent_type' => get_class($session->trackEvent),
            'parent_id' => $session->track_event_id,
        ]);
    }

    /**
     * Handle the TrackSession "updated" event.
     */
    public function updated(TrackSession $session): void
    {
        DashboardFeed::updateOrCreate([
            'user_id' => Auth::check() ? Auth::id() : $session->user_id,
            'object_type' => get_class($session),
            'object_id' => $session->id,
            'card_type' => 'TrackSession',
        ],
        [
            'event' => 'updated',
            'description' => 'updated Sessions of an Event',
            'parent_type' => get_class($session->trackEvent),
            'parent_id' => $session->track_event_id,
        ]);
    }

    /**
     * Handle the TrackSession "deleted" event.
     */
    public function deleted(TrackSession $session): void
    {
        //
    }

    /**
     * Handle the TrackSession "restored" event.
     */
    public function restored(TrackSession $session): void
    {
        //
    }

    /**
     * Handle the TrackSession "force deleted" event.
     */
    public function forceDeleted(TrackSession $session): void
    {
        //
    }
}
