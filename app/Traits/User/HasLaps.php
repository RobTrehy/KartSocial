<?php

namespace App\Traits\User;

use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackLayout;
use App\Models\TrackSession;
use App\Models\TrackSessionLap;
use App\Models\TrackVisit;
use App\Models\TrackVisitSession;
use App\Models\TrackVisitSessionLap;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;

trait HasLaps
{
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

    public function newLaps()
    {
        return $this->hasManyDeep(
            TrackSessionLap::class,
            [
                'track_session_drivers',
                TrackSession::class,
            ],
            [
                'user_id',
                'id',
            ],
        );
    }

    /**
     * All TrackVisitSessionLap records belonging to this model.
     */
    public function laps(): HasManyThrough
    {
        return $this->hasManyDeep(
            TrackVisitSessionLap::class,
            [
                TrackVisit::class,
                TrackVisitSession::class,
            ],
            [
                null,
                'track_visit_id',
                'session_id',
            ]
        );
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
    public function fastestLapsForTrackLayout(TrackLayout $layout): HasManyDeep
    {
        return $this->laps()
            ->where('track_visits.track_layout_id', $layout->id)
            ->orderBy('lap_time', 'ASC');
    }

    /**
     * All TrackVisitSessionLap records for this model, filtered by Track
     */
    public function fastestLapsForTrack(Track $track): HasManyDeep
    {
        $ids = [];
        $layouts = $track->allLayouts()->get();
        foreach ($layouts as $layout) {
            $ids[] = $layout->id;
        }

        return $this->laps()
            ->whereIn('track_visits.track_layout_id', $ids)
            ->orderBy('lap_time', 'ASC');
    }
}
