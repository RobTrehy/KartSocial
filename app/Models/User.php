<?php

namespace App\Models;

use App\Traits\User\HasCoverPhoto;
use App\Traits\User\HasExportableData;
use App\Traits\User\HasFollowing;
use App\Traits\User\HasLaps;
use App\Traits\User\HasTrackData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable implements \Spatie\PersonalDataExport\ExportsPersonalData
{
    use CausesActivity;
    use HasApiTokens;
    use HasCoverPhoto;
    use HasExportableData;
    use HasFactory;
    use HasFollowing;
    use HasLaps;
    use HasProfilePhoto;
    use HasRoles;
    use HasTrackData;
    use LogsActivity;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'dob',
        'alias',
        'bio',
        'weight',
        'home_track_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'dob',
        'password',
        'remember_token',
        'email_verified_at',
        'two_factor_recovery_codes',
        'two_factor_secret',
        'two_factor_confirmed_at',
        'profile_photo_path',
        'cover_photo_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
        'cover_photo_url',
    ];

    /**
     * The relationship counts to append to the model
     * 
     * @var array<int string>
     */
    protected $withCount = [
        'invited',
    ];

    /**
     * The User may be restricted!
     */
    public function restriction(): HasOne
    {
        return $this->hasOne(UserRestrictions::class);
    }

    /**
     * Can send invites
     */
    public function invited(): HasMany
    {
        return $this->hasMany(Invitation::class, 'invited_by');
    }

    /**
     * EXTENDED: Add withPivot()->withTimestamps()
     *
     * A model may have multiple roles.
     */
    public function roles(): BelongsToMany
    {
        $relation = $this->morphToMany(
            config('permission.models.role'),
            'model',
            config('permission.table_names.model_has_roles'),
            config('permission.column_names.model_morph_key'),
            PermissionRegistrar::$pivotRole
        )->withPivot(['cost', 'expires_at'])->withTimestamps();

        if (!PermissionRegistrar::$teams) {
            return $relation;
        }

        return $relation->wherePivot(PermissionRegistrar::$teamsKey, getPermissionsTeamId())
            ->where(function ($q) {
                $teamField = config('permission.table_names.roles') . '.' . PermissionRegistrar::$teamsKey;
                $q->whereNull($teamField)->orWhere($teamField, getPermissionsTeamId());
            });
    }

    /**
     * Set the expiry of the role.
     *
     * @param  string|int|\Spatie\Permission\Contracts\Role  $role
     * @param  string  $expires
     * @return $this
     */
    public function setRoleExpiry($role, $expires): User
    {
        $pivot = $this->roles()->wherePivot('role_id', $this->getStoredRole($role)->id)->first()->pivot;
        $pivot->expires_at = $expires;
        $pivot->save();

        return $this;
    }

    /**
     * Set the default activity logging options for this model
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->logExcept(['password'])
            ->dontSubmitEmptyLogs()
            ->useLogName('User');
    }
}
