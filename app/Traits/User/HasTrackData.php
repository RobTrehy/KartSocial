<?php

namespace App\Traits\User;

use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackSession;
use App\Models\TrackVisit;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait HasTrackData
{
    /**
     * The Track record that is assigned to this model.
     */
    public function homeTrack(): HasOne
    {
        return $this->hasOne(Track::class, 'id', 'home_track_id');
    }

    /**
     * All TrackVisit records belonging to this model.
     */
    public function trackVisits(): HasMany
    {
        return $this->hasMany(TrackVisit::class)->with('trackLayout')->orderBy('visit_date', 'DESC');
    }

    public function trackEvents(): HasMany
    {
        return $this->hasMany(TrackEvent::class)->with('trackLayout')->orderBy('date', 'DESC');
    }

    public function trackSessions(): HasManyThrough
    {
        return $this->hasManyThrough(TrackSession::class, TrackEvent::class);
    }
}
