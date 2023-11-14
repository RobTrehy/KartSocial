<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserSuggestion extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'suggested_id',
    ];

    /**
     * The User this model belongs to
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The User this model suggests
     */
    public function suggested(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'suggested_id');
    }

    /**
     * The model this model suggests via
     */
    public function via(): MorphTo
    {
        return $this->morphTo();
    }
}
