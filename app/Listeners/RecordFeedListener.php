<?php

namespace App\Listeners;

use App\Actions\Feed\TrackVisitActions;
use App\Actions\Feed\TrackVisitSessionActions;
use App\Events\TrackVisitEvent;
use App\Events\TrackVisitSessionEvent;
use Illuminate\Events\Dispatcher;

class RecordFeedListener
{
    public function TrackVisit($event): void
    {
        (new TrackVisitActions())->{$event->method}($event);
    }

    public function TrackVisitSession($event): void
    {
        (new TrackVisitSessionActions())->{$event->method}($event);
    }

    /**
     * Register the listeners for the subscriber.
     */
    public function subscribe(Dispatcher $events): array
    {
        return [
            TrackVisitEvent::class => 'TrackVisit',
            TrackVisitSessionEvent::class => 'TrackVisitSession',
        ];
    }
}
