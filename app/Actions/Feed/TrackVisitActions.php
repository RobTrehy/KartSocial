<?php

namespace App\Actions\Feed;

use App\Events\TrackVisitEvent;
use App\Models\DashboardFeed;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TrackVisitActions
{
    public function create(TrackVisitEvent $event)
    {
        DashboardFeed::create([
            'user_id' => (Auth::check()) ? Auth::id() : $event->visit->user_id, // Hack to get around seeding?
            'object_type' => get_class($event->visit),
            'object_id' => $event->visit->id,
            'card_type' => 'TrackVisit',
            'event' => 'created',
            'description' => 'recorded a new Track Visit',
        ]);
    }

    public function update(TrackVisitEvent $event)
    {
        $user_id = (Auth::check()) ? Auth::id() : $event->visit->user_id; // Hack to get around seeding?
        $record = DashboardFeed::where('user_id', $user_id)
            ->where('object_type', get_class($event->visit))
            ->where('object_id', $event->visit->id)
            ->where('event', 'updated')
            ->where('updated_at', '>=', Carbon::now()->subHours(5))
            ->first();

        if ($record) {
            $record->touch();
        } else {
            DashboardFeed::create([
                'user_id' => $user_id,
                'object_type' => get_class($event->visit),
                'object_id' => $event->visit->id,
                'card_type' => 'TrackVisit',
                'event' => 'updated',
                'description' => 'updated a Track Visit',
            ]);
        }
    }
}
