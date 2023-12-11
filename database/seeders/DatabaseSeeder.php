<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            StatusSeeder::class,
            TracksSeeder::class,
            TrackLayoutsSeeder::class,
        ]);

        if (app()->environment('local')) {
            \App\Models\User::factory()->create([
                'name' => 'Administrator',
                'alias' => 'Administrator',
                'email' => 'admin@local',
                'password' => Hash::make('password'),
            ])->assignRole('Administrator');
            \App\Models\User::factory(10)->create();
            \App\Models\User::where('name', 'Administrator')->first()->setRoleExpiry('Administrator', Carbon::yesterday()->endOfDay()->addYear());

            $users = \App\Models\User::all();
            foreach ($users as $user) {
                $user->assignRole('Basic');
            }

            $this->call([
                TrackVisitsSeeder::class,
            ]);
        }
    }
}
