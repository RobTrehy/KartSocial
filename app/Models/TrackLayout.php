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
     * All TrackSessionLap records for this model, via each TrackEvent and each TrackSession.
     */
    public function laps(): HasManyThrough
    {
        return $this->hasManyDeep(
            TrackSessionLap::class,
            [
                TrackEvent::class,
                TrackSession::class,
            ],
            [
                null,
                'track_event_id',
                'track_session_id',
            ]
        )->with(['session', 'session.trackEvent', 'driver']);
    }

    /**
     * All TrackSessionLap records for this model, via each TrackEvent and each TrackSession
     * WHERE the TrackSessionLap belongs to the authenticated user.
     */
    public function myLaps(): HasManyThrough
    {
        return $this->hasManyDeep(
            TrackSessionLap::class,
            [
                TrackEvent::class,
                TrackSession::class,
            ],
            [
                null,
                'track_event_id',
                'track_session_id',
            ]
        )->with(['session', 'session.trackEvent', 'driver'])
        ->where('track_session_laps.user_id', Auth::id());
    }

    /**
     * All TrackSessionLap records for this model, via each TrackEvent and each TrackSession.
     *
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): HasManyDeep
    {
        return $this->laps()->orderBy('lap_time', 'ASC');
    }

    /**
     * Get the single most fastest TrackSessionLap for this model.
     */
    public function getFastestLapAttribute(): ?TrackSessionLap
    {
        return $this->fastestLaps()->with('driver')->first();
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
