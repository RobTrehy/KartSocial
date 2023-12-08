<?php

namespace App\Traits\User;

use App\Models\Track;
use App\Models\TrackLayout;
use App\Models\TrackSessionLap;
use Illuminate\Contracts\Database\Eloquent\Builder;

trait HasLaps
{
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

    public function laps(): Builder
    {
        return TrackSessionLap::where('user_id', $this->id);
    }

    /**
     * All TrackVisitSessionLap records for this model, via each Track, TrackLayout, TrackVisit and each TrackVisitSession.
     *
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): Builder
    {
        return $this->laps()->orderBy('lap_time', 'ASC');
    }

    /**
     * All TrackSessionLap records for this model, filtered by TrackLayout
     */
    public function fastestLapsForTrackLayout(TrackLayout $layout): Builder
    {
        return TrackSessionLap::where('track_session_laps.user_id', $this->id)
            ->where('track_events.track_layout_id', $layout->id)
            ->join('track_sessions', 'track_sessions.id', '=', 'track_session_laps.track_session_id')
            ->join('track_events', 'track_events.id', '=', 'track_sessions.track_event_id')
            ->orderBy('lap_time', 'ASC');
    }

    /**
     * All TrackSessionLap records for this model, filtered by Track
     */
    public function fastestLapsForTrack(Track $track): Builder
    {
        $layouts = TrackLayout::where('track_id', $track->id)->pluck('id');
        return TrackSessionLap::where('track_session_laps.user_id', $this->id)
            ->whereIn('track_events.track_layout_id', $layouts)
            ->join('track_sessions', 'track_sessions.id', '=', 'track_session_laps.track_session_id')
            ->join('track_events', 'track_events.id', '=', 'track_sessions.track_event_id')
            ->orderBy('lap_time', 'ASC');
    }
}
