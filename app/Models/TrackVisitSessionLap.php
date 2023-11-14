<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrackVisitSessionLap extends Model
{
    use HasFactory;
    use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;

    protected $fillable = [
        'session_id',
        'lap_number',
        'lap_time',
        'lap_diff',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(TrackVisitSession::class);
    }
}
