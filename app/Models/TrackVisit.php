<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;

class TrackVisit extends Model
{
    use HasFactory;

    protected $appends = ['fastestLap'];

    protected $fillable = [
        'user_id',
        'visit_date',
        'track_layout_id',
        'title',
        'notes',
    ];

    /**
     * The User this model belongs to.
     */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The TrackLayout this model belongs to.
     */
    public function trackLayout(): BelongsTo
    {
        return $this->belongsTo(TrackLayout::class)->with('track');
    }

    /**
     * All TrackVisitSessions associated with this model.
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(TrackVisitSession::class)->orderBy('session_order', 'ASC');
    }

    /**
     * All TrackVisitSessionLaps assocaited with this model, through each TrackVisitSession.
     */
    public function laps(): HasManyThrough
    {
        return $this->hasManyThrough(TrackVisitSessionLap::class, TrackVisitSession::class, 'track_visit_id', 'session_id');
    }

    /**
     * All TrackVisitSessionLap records that are associated with this model, through each TrackVisitSession.
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