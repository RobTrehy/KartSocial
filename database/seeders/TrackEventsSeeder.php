<?php

namespace Database\Seeders;

// use App\Events\TrackVisitSessionEvent;

use App\Models\TrackEventAttendee;
use App\Models\TrackSessionLap;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TrackEventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('track_events')->truncate();
        DB::table('track_event_attendees')->truncate();
        DB::table('track_sessions')->truncate();
        DB::table('track_session_laps')->truncate();
        DB::table('track_session_drivers')->truncate();
        DB::table('dashboard_feeds')->truncate();

        for ($i = 0; $i < 160; $i++) {
            $event = \App\Models\TrackEvent::factory()
                ->has(
                    \App\Models\TrackSession::factory()->count(rand(1, 5))
                        ->sequence(fn (Sequence $sequence) => ['order' => $sequence->index]),
                    'sessions',
                )
                ->create();

            User::all()->random(rand(0, 10))->each(function ($user) use ($event) {
                TrackEventAttendee::create([
                    'user_id' => $user->id,
                    'track_event_id' => $event->id,
                    'status_id' => rand(1, 3),
                ]);
            });
        }
    }
}
