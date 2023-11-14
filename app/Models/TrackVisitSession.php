<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;

class TrackVisitSession extends Model
{
    use HasFactory;

    protected $appends = ['fastestLap'];

    protected $with = ['laps'];

    protected $fillable = [
        'track_visit_id',
        'session_name',
        'session_type',
        'session_length_type',
        'session_length',
        'session_order',
        'total_drivers',
        'finish_position',
    ];

    /**
     * The TrackVisit this TrackVisitSession is associated to.
     */
    public function trackVisit(): BelongsTo
    {
        return $this->belongsTo(TrackVisit::class)->with('driver');
    }

    /**
     * All TrackVisitSessionLap records that are associated with this model.
     * 
     * Order By: lap_number, ASC
     */
    public function laps(): HasMany
    {
        return $this->hasMany(TrackVisitSessionLap::class, 'session_id')->orderBy('lap_number', 'ASC');
    }

    /**
     * All TrackVisitSessionLap records that are associated with this model.
     * 
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): HasMany
    {
        return $this->laps()->order_by('lap_time', 'ASC');
    }

    /**
     * Get the single most fastest TrackVisitSessionLap for this model.
     */
    public function getFastestLapAttribute(): HasOneOrMany
    {
        return $this->fastestLaps()->first();
    }
}
