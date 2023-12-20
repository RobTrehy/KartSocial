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
        Permission::updateOrCreate(['name' => 'admin.access']);
        Permission::updateOrCreate(['name' => 'dashboard.view']);

        Permission::updateOrCreate(['name' => 'tracks.create']);
        Permission::updateOrCreate(['name' => 'tracks.update']);
        Permission::updateOrCreate(['name' => 'tracks.destroy']);
        Permission::updateOrCreate(['name' => 'tracks.layouts.create']);
        Permission::updateOrCreate(['name' => 'tracks.layouts.update']);
        Permission::updateOrCreate(['name' => 'tracks.layouts.destroy']);
        Permission::updateOrCreate(['name' => 'tracks.layouts.restore']);
        Permission::updateOrCreate(['name' => 'tracks.layouts.set_default']);

        // Perform visits actions against OWN visits
        Permission::updateOrCreate(['name' => 'visits.view']);
        Permission::updateOrCreate(['name' => 'visits.create']);
        Permission::updateOrCreate(['name' => 'visits.update']);
        Permission::updateOrCreate(['name' => 'visits.destroy']);
        Permission::updateOrCreate(['name' => 'visits.sessions.create']);
        Permission::updateOrCreate(['name' => 'visits.sessions.update']);
        Permission::updateOrCreate(['name' => 'visits.sessions.destroy']);
        Permission::updateOrCreate(['name' => 'visits.sessions.laps.view']);
        Permission::updateOrCreate(['name' => 'visits.sessions.laps.update']);

        // Perform visits actions against ANY user's vistis
        Permission::updateOrCreate(['name' => 'visits.view.any']);
        Permission::updateOrCreate(['name' => 'visits.update.any']);
        Permission::updateOrCreate(['name' => 'visits.destroy.any']);
        Permission::updateOrCreate(['name' => 'visits.sessions.view.any']);
        Permission::updateOrCreate(['name' => 'visits.sessions.update.any']);
        Permission::updateOrCreate(['name' => 'visits.sessions.destroy.any']);
        Permission::updateOrCreate(['name' => 'visits.sessions.laps.view.any']);
        Permission::updateOrCreate(['name' => 'visits.sessions.laps.update.any']);

        // OWN User Profile
        Permission::updateOrCreate(['name' => 'user-profile.update']);
        Permission::updateOrCreate(['name' => 'user-profile.photos.update']);

        // ANY User Profile
        Permission::updateOrCreate(['name' => 'user-profile.update.any']);
        Permission::updateOrCreate(['name' => 'user-profile.photos.update.any']);

        // Create Administrator and allow all
        $role = Role::updateOrCreate([
            'name' => 'Administrator',
        ], [
            'colors' => [
                'border' => 'border-red-300 dark:border-red-700',
                'background' => 'bg-red-50 dark:bg-red-900',
            ],
        ]);
        $role->givePermissionTo(Permission::all());

        // Create Basic Role and assign permissions
        $role = Role::updateOrCreate([
            'name' => 'Basic',
        ], [
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
