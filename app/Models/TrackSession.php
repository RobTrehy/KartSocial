<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class TrackSession extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $appends = ['fastestLap', 'driverlaps'];

    protected $fillable = [
        'user_id',
        'track_event_id',
        'name',
        'session_type',
        'length_type',
        'length',
        'order',
        'total_drivers',
    ];

    /**
     * The TrackEvent this model is associated with.
     */
    public function trackEvent(): BelongsTo
    {
        return $this->belongsTo(TrackEvent::class);
    }

    /**
     * Get the drivers associated with this model.
     */
    public function drivers()
    {
        return $this->belongsToMany(User::class, 'track_session_drivers', 'track_session_id', 'user_id')
            ->withPivot(['position'])
            ->orderByPivot('position', 'ASC');
    }

    /**
     * All TrackLap records that are associated with this model.
     *
     * Order By: lap_number, ASC
     */
    public function laps()
    {
        return $this->hasMany(TrackSessionLap::class)
            ->orderBy('lap_number', 'ASC');
    }

    /**
     * All TrackLap records that are associated with this model.
     *
     * Order By: lap_time, ASC
     */
    public function fastestLaps(): HasMany
    {
        return $this->hasMany(TrackSessionLap::class)->with(['driver'])->orderBy('lap_time', 'ASC');
    }

    /**
     * Get the single most fastest TrackLap record for this model.
     */
    public function getFastestLapAttribute(): ?TrackSessionLap
    {
        return $this->fastestLaps()->first();
    }

    public function getDriverLapsAttribute()
    {
        foreach ($this->drivers as $driver) {
            $driver->laps = TrackSessionLap::where('track_session_id', $this->id)->where('user_id', $driver->id)->orderBy('lap_number', 'ASC')->get();
            $driver->fastest_lap = TrackSessionLap::where('track_session_id', $this->id)->where('user_id', $driver->id)->orderBy('lap_time', 'ASC')->first();
        }
    }

    /**
     * Configure the activity logging rules
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'name',
                'session_type',
                'length_type',
                'length',
                'order',
                'total_drivers',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('Track Session');
    }
}
