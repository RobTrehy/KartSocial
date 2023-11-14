<?php

namespace App\Traits\User;

use App\Models\User;
use App\Models\UserSuggestion;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasFollowing
{
    /**
     * Get list of users this user follows
     */
    public function follows(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_following', 'user_id', 'follows_id');
    }

    /**
     * Get list of users that follow this user
     */
    public function followedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_following', 'follows_id', 'user_id');
    }

    /**
     * Is this user followed by a supplied user?
     *
     * @return bool
     */
    public function isFollowedBy(User $user)
    {
        return $this->followedBy()->where('user_id', $user->id)->exists();
    }

    /**
     * Get list of User Suggestions
     */
    public function suggestions(): HasMany
    {
        return $this->hasMany(UserSuggestion::class);
    }
}
