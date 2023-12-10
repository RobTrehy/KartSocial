<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class DashboardFeed extends Model
{
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'properties' => 'json',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'object_type',
        'object_id',
        'card_type',
        'event',
        'description',
        'properties',
        'parent_type',
        'parent_id',
    ];

    /**
     * The relationships to append to the model
     *
     * @var array<int string>
     */
    protected $with = [
        'user',
        'object',
        'parent',
    ];

    /**
     * The User this model belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The object this model morphs to.
     */
    public function object(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * The parent this model morphs to.
     */
    public function parent(): MorphTo
    {
        return $this->morphTo();
    }
}
