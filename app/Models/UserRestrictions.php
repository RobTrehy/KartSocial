<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserRestrictions extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'restrictor_id',
        'reason',
        'expires_at',
    ];

    /**
     * The User this model belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * This User this model was assigned by.
     */
    public function restrictor(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'restrictor_id');
    }

    /**
     * The appeals for this restriction.
     */
    public function appeals(): HasMany
    {
        return $this->hasMany(UserRestrictionAppeal::class, 'restriction_id')->orderBy('created_at', 'ASC');
    }
}
