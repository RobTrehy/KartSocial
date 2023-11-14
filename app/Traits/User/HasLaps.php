<?php

namespace App\Traits\User;

use App\Models\Track;
use App\Models\TrackLayout;
use App\Models\TrackVisit;
use App\Models\TrackVisitSession;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasLaps
{
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

    /**
     * All TrackVisitSessionLap records belonging to this model.
     */
    public function laps(): HasManyThrough
    {
        return $this->hasManyDeep(
            TrackLap::class,
            [
                Track::class,
                TrackLayout::class,
                TrackVisit::class,
                TrackVisitSession::class,
            ],
            [
                null,
                'track_id',
                'track_layout_id',
                'track_visit_id',
                'session_id',
            ]
        )->where('track_visits.user_id', $this->id);
    }

    /**
     * All TrackVisitSessionLap records for this model, via each Track, TrackLayout, TrackVisit and each TrackVisitSession.
     * 
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): MorphToMany
    {
        return $this->laps()->orderBy('lap_time', 'ASC');
    }

    /**
     * All TrackVisitSessionLap records for this model, filtered by TrackLayout
     */
    public function fastestLapsForTrackLayout(TrackLayout $layout): MorphToMany
    {
        return $this->laps()
            ->where('track_visit.track_layout_id', $layout->id)
            ->orderBy('lap_time', 'ASC');
    }

    /**
     * All TrackVisitSessionLap records for this model, filtered by Track
     */
    public function fastestLapsForTrack(Track $track): MorphToMany
    {
        $ids = [];
        $layouts = $track->allLayouts()->get();
        foreach ($layouts as $layout) {
            $ids[] = $layout->id;
        }

        return $this->laps()
            ->whereIn('track_visit.track_layout_id', $ids)
            ->orderBy('lap_time', 'ASC');
    }
}
