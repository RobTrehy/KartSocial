<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Role as SpatieRole;
use Spatie\Permission\PermissionRegistrar;

class Role extends SpatieRole
{
    /**
     * The attributes that should be cast.
     * 
     * @var array
     */
    protected $casts = [
        'colors' => 'array',
    ];

    /**
     * EXTENDED: Add withPivot()->withTimestamps()
     * 
     * A role belongs to some users of the model associated with its guard.
     */
    public function users(): BelongsToMany
    {
        return $this->morphedByMany(
            getModelForGuard($this->attributes['guard_name'] ?? config('auth.defaults.guard')),
            'model',
            config('permission.table_names.model_has_roles'),
            PermissionRegistrar::$pivotRole,
            config('permission.column_names.model_morph_key')
        )->withPivot(['cost', 'expires_at'])->withTimestamps();
    }
}
