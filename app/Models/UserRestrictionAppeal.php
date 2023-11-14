<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserRestrictionAppeal extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'restriction_id',
        'commenter_id',
        'appeal',
        'allow_reply',
    ];

    /**
     * The UserRestriction this model belongs to.
     */
    public function restriction(): BelongsTo
    {
        return $this->belongsTo(UserRestrion::class, 'id', 'restriction_id');
    }

    /**
     * The User this model belongs to.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commenter_id', 'id');
    }
}
