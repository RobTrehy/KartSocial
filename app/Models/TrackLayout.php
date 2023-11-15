<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;

class TrackLayout extends Model
{
    use LogsActivity;
    use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

    protected $appends = ['fastestLap'];

    protected $with = ['track'];

    protected $fillable = [
        'track_id',
        'is_default',
        'name',
        'length',
        'retired_at',
    ];

    /**
     * The Track this model belongs to.
     */
    public function track(): BelongsTo
    {
        return $this->belongsTo(Track::class);
    }

    /**
     * All the TrackVisit records associated with this model.
     */
    public function trackVisits(): HasMany
    {
        return $this->hasMany(TrackVisit::class);
    }

    /**
     * All TrackVisitSessionLap records for this model, via each TrackVisit and each TrackVisitSession.
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
        )->with(['session', 'session.trackVisit', 'session.trackVisit.driver']);
    }

    /**
     * All TrackVisitSessionLap records for this model, via each TrackVisit and each TrackVisitSession
     * WHERE the TrackVisitSessionLap belongs to the authenticated user.
     */
    public function myLaps(): HasManyThrough
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
        )->where('track_visits.user_id', Auth::id());
    }

    /**
     * All TrackVisitSessionLap records for this model, via each TrackVisit and each TrackVisitSession.
     *
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): HasManyDeep
    {
        return $this->laps()->orderBy('lap_time', 'ASC');
    }

    /**
     * Get the single most fastest TrackVisitSessionLap for this model.
     */
    public function getFastestLapAttribute(): ?TrackVisitSessionLap
    {
        return $this->fastestLaps()->first();
    }

    /**
     * Configure the activity logging rules
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'length'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('Track Layout');
    }
}
