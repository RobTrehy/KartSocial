<?php

namespace App\Models;

use Carbon\Carbon;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class TrackEvent extends Model
{
    use HasFactory;
    use LogsActivity;
    use Sluggable;

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => ['dateSlug', 'name'],
                'unique' => false,
            ],
        ];
    }

    public function getDateSlugAttribute(): string
    {
        $carbon_date = Carbon::parse($this->date);
        return $carbon_date->year . $carbon_date->month . $carbon_date->day;
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected $appends = ['fastest_lap', 'attending_status'];
    protected $with = ['sessions', 'sessions.drivers'];

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
     * Get the users who have marked attendance with this model.
     */
    public function attendees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'track_event_attendees')
            ->using(TrackEventAttendee::class)
            ->withPivot(['status_id']);
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
        return $this->belongsTo(TrackLayout::class);
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
     * Set the attending status of the event
     */
    public function getAttendingStatusAttribute()
    {
        if ($this->user_id === Auth::id()) {
            return "Organiser";
        }

        return DB::table('track_event_attendees')
            ->where('track_event_id', $this->id)
            ->where('user_id', Auth::id())
            ->join('statuses', 'track_event_attendees.status_id', '=', 'statuses.id')
            ->select('value')
            ->first()?->value;
    }

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
