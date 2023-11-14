<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

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
     * All TrackVisitSessionLap records for this model, via each TrackLayout, each TrackVisit and each TrackVisitSession.
     */
    public function laps()
    {
        return $this->hasManyDeep(
            TrackLap::class,
            [
                TrackLayout::class,
                TrackVisit::class,
                TrackVisitSession::class,
            ],
            [
                null,
                'track_layout_id',
                'track_visit_id',
                'session_id',
            ]
        );
    }

    /**
     * All TrackVisitSessionLap records for this model, via each TrackLayout, each TrackVisit and each TrackVisitSession
     * WHERE the TrackVisitSessionLap belongs to the authenticated user.
     */
    public function myLaps(): HasManyThrough
    {
        return $this->hasManyDeep(
            TrackLap::class,
            [
                TrackLayout::class,
                TrackVisit::class,
                TrackVisitSession::class,
            ],
            [
                null,
                'track_layout_id',
                'track_visit_id',
                'session_id',
            ]
        )->where('track_visits.user_id', Auth::id());
    }

    /**
     * All TrackVisitSessionLap records for this model, via each TrackLayout, each TrackVisit and each TrackVisitSession.
     *
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): MorphToMany
    {
        return $this->laps()->orderBy('lap_time', 'ASC');
    }

    /**
     * Get the single most fastest TrackVisitSessionLap for this model.
     */
    public function getFastestLapAttribute()
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
