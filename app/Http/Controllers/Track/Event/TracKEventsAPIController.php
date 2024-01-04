<?php

namespace App\Http\Controllers\Track\Event;

use App\Http\Controllers\Controller;
use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackLayout;
use Illuminate\Http\Request;

class TracKEventsAPIController extends Controller
{
    public function load(Track $track, Request $request)
    {
        $layouts = TrackLayout::where('track_id', $track->id)->pluck('id');
        $events = TrackEvent::whereIn('track_layout_id', $layouts)
            ->select([
                'id',
                'date',
                'name as title',
                'slug',
            ])
            ->where('date', '>=', $request->start)
            ->where('date', '<=', $request->end)
            ->orderBy('date', 'ASC')
            ->get();
        $events->each(function ($event) use ($track) {
            $event->url = route('events.show', [
                'track' => $track->slug,
                'event' => $event->slug
            ]);
        });

        return $events;
    }
}
