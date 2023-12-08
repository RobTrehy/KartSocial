<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class TrackEvent extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $appends = ['fastestLap'];

    protected $fillable = [
        'user_id',
        'track_layout_id',
        'date',
        'name',
        'description',
    ];

    /**
     * The User that created this model.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the drivers associated with this model.
     */
    public function drivers(): HasManyThrough
    {
        return $this->hasManyThrough(User::class, TrackSession::class);
    }

    /**
     * The TrackLayout this model belongs to.
     */
    public function trackLayout(): BelongsTo
    {
        return $this->belongsTo(TrackLayout::class)->with('track');
    }

    /**
     * All TrackSessions associated with this model.
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(TrackSession::class)->orderBy('order', 'ASC');
    }

    /**
     * All TrackVisitSessionLaps associated with this model, through each TrackVisitSession.
     */
    public function laps(): HasManyThrough
    {
        return $this->hasManyThrough(TrackSessionLap::class, TrackSession::class, 'track_event_id', 'track_session_id');
    }

    /**
     * All TrackSessionLap records that are associated with this model, through each TrackSession.
     * 
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): HasManyThrough
    {
        return $this->laps()->orderBy('lap_time', 'ASC');
    }

    /**
     * Get the single most fastest TrackSessionLap for this model.
     */
    public function getFastestLapAttribute(): ?TrackSessionLap
    {
        $lap = $this->fastestLaps()->first()?->load('driver');
        return ($lap) ? $lap->load(['session']) : null;
    }

    /**
     * DEPRECATED? Get other TrackVisit's that this TrackVisit is linked to
     */
    // public function linkedVisits(): BelongsToMany
    // {
    //     return $this->belongsToMany(TrackVisit::class, 'track_visit_links', 'track_visit_id', 'linked_visit_id');
    // }

    /**
     * Configure the activity logging rules
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['date', 'track_layout_id', 'name', 'description'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('Track Event');
    }
}
