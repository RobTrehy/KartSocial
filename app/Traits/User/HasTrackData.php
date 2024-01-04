<?php

namespace App\Traits\User;

use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackSession;
use Illuminate\Database\Eloquent\Collection;
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

    public function myTrackEvents(): HasMany
    {
        return $this->hasMany(TrackEvent::class)->with('trackLayout')->orderBy('date', 'DESC');
    }

    public function attendeeTrackEvents(): Collection
    {
        return TrackEvent::whereHas('attendees', function ($q) {
            $q->where('user_id', $this->id)
                ->where('status_id', '!=', 3);
        })->get();
    }

    /**
     * All TrackEvent records belonging to this model.
     */
    public function TrackEvents(): Collection
    {
        $collect = new Collection($this->myTrackEvents);
        return $collect->merge($this->attendeeTrackEvents());
    }

    /**
     * All TrackSession records belonging to this model.
     */
    public function trackSessions(): HasManyThrough
    {
        return $this->hasManyThrough(TrackSession::class, TrackEvent::class);
    }
}
