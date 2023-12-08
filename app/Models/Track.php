<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;

class Track extends Model
{
    use HasFactory;
    use LogsActivity;
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

    protected $appends = ['fastestLap'];

    protected $fillable = [
        'name',
        'address_1',
        'address_2',
        'address_3',
        'town',
        'county',
        'postal_code',
        'lat',
        'lng',
        'type',
        'url',
        'number',
    ];

    /**
     * Get the different track layouts
     */
    public function layouts(): HasMany
    {
        return $this->hasMany(TrackLayout::class)->whereNull('retired_at');
    }

    /**
     * Get all the track layouts, despite if retired or not
     */
    public function allLayouts(): HasMany
    {
        return $this->hasMany(TrackLayout::class);
    }

    /**
     * Get the retired track layouts
     */
    public function retiredLayouts(): HasMany
    {
        return $this->hasMany(TrackLayout::class)->whereNotNull('retired_at');
    }

    /**
     * Gets the default track layout only
     */
    public function defaultLayout(): HasOneOrMany
    {
        return $this->layouts()->one()->ofMany('is_default', 'max');
    }

    /**
     * All TrackVisit records associated with this model.
     */
    public function trackVisits(): HasManyThrough
    {
        return $this->hasManyThrough(TrackVisit::class, TrackLayout::class);
    }

    /**
     * All TrackSessionLap records for this model, on any TrackLayout.
     */
    public function laps()
    {
        return $this->hasManyDeep(
            TrackSessionLap::class,
            [
                TrackLayout::class,
                TrackEvent::class,
                TrackSession::class,
            ],
            [
                null,
                'track_layout_id',
                'track_event_id',
                'track_session_id',
            ]
        );
    }

    /**
     * All TrackSessionLap records for this model, on any TrackLayout
     * WHERE the TrackSessionLap belongs to the authenticated user.
     */
    public function myLaps(): HasManyThrough
    {
        return $this->hasManyDeep(
            TrackSessionLap::class,
            [
                TrackLayout::class,
                TrackEvent::class,
                TrackSession::class,
            ],
            [
                null,
                'track_layout_id',
                'track_event_id',
                'track_session_id',
            ]
        )->where('track_session_laps.user_id', Auth::id());
    }

    /**
     * All TrackSessionLap records for this model, on any TrackLayout.
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
        return $this->fastestLaps()->first();
    }

    /**
     * Configure the activity logging rules
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('Track');
    }
}
