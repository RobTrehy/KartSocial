<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    { // Reset cached Roles and Permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::create(['name' => 'admin.access']);
        Permission::create(['name' => 'dashboard.view']);

        Permission::create(['name' => 'tracks.create']);
        Permission::create(['name' => 'tracks.update']);
        Permission::create(['name' => 'tracks.destroy']);
        Permission::create(['name' => 'tracks.layouts.create']);
        Permission::create(['name' => 'tracks.layouts.update']);
        Permission::create(['name' => 'tracks.layouts.destroy']);
        Permission::create(['name' => 'tracks.layouts.restore']);
        Permission::create(['name' => 'tracks.layouts.set_default']);

        // Perform visits actions against OWN visits
        Permission::create(['name' => 'visits.view']);
        Permission::create(['name' => 'visits.create']);
        Permission::create(['name' => 'visits.update']);
        Permission::create(['name' => 'visits.destroy']);
        Permission::create(['name' => 'visits.sessions.create']);
        Permission::create(['name' => 'visits.sessions.update']);
        Permission::create(['name' => 'visits.sessions.destroy']);
        Permission::create(['name' => 'visits.sessions.laps.view']);
        Permission::create(['name' => 'visits.sessions.laps.update']);

        // Perform visits actions against ANY user's vistis
        Permission::create(['name' => 'visits.view.any']);
        Permission::create(['name' => 'visits.update.any']);
        Permission::create(['name' => 'visits.destroy.any']);
        Permission::create(['name' => 'visits.sessions.view.any']);
        Permission::create(['name' => 'visits.sessions.update.any']);
        Permission::create(['name' => 'visits.sessions.destroy.any']);
        Permission::create(['name' => 'visits.sessions.laps.view.any']);
        Permission::create(['name' => 'visits.sessions.laps.update.any']);

        // OWN User Profile
        Permission::create(['name' => 'user-profile.update']);
        Permission::create(['name' => 'user-profile.photos.update']);

        // ANY User Profile
        Permission::create(['name' => 'user-profile.update.any']);
        Permission::create(['name' => 'user-profile.photos.update.any']);

        // Create Administrator and allow all
        $role = Role::create([
            'name' => 'Administrator',
            'colors' => [
                'border' => 'border-red-300 dark:border-red-700',
                'background' => 'bg-red-50 dark:bg-red-900',
            ],
        ]);
        $role->givePermissionTo(Permission::all());

        // Create Basic Role and assign permissions
        $role = Role::create([
            'name' => 'Basic',
            'colors' => [
                'border' => 'border-gray-300 dark:border-gray-700',
                'background' => 'bg-gray-50 dark:bg-gray-900',
            ],
        ]);
        $role->givePermissionTo([
            'dashboard.view',
            'visits.view',
            'visits.create',
            'visits.update',
            'visits.destroy',
            'visits.sessions.create',
            'visits.sessions.update',
            'visits.sessions.destroy',
            'visits.sessions.laps.view',
            'visits.sessions.laps.update',
            'user-profile.update',
            'user-profile.photos.update',
        ]);
    }
}
