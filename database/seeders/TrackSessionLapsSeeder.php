<?php

namespace Database\Seeders;

use App\Models\TrackEvent;
use App\Models\TrackSessionLap;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TrackSessionLapsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TrackEvent::all()->each(function ($event) {
            $attendees = DB::table('track_event_attendees')->where('track_event_id', $event->id)
                ->whereIn('status_id', [1, 2])->limit(rand(1, 10))->get();

            foreach ($event->sessions as $session) {
                foreach ($attendees as $attendee) {
                    DB::table('track_session_drivers')->insert([
                        'track_session_id' => $session->id,
                        'user_id' => $attendee->user_id,
                        'position' => rand(1, $session->total_drivers)
                    ]);

                    $laps = rand(1, $session->length);
                    TrackSessionLap::factory()->count($laps)
                        ->sequence(fn (Sequence $sequence) => ['lap_number' => $sequence->index % $laps + 1])
                        ->create([
                            'user_id' => $attendee->user_id,
                            'track_session_id' => $session->id,
                        ]);
                }

                // TrackVisitSessionEvent::dispatch(
                //     [
                //         'session' => $session->toArray(),
                //         'updated' => 0,
                //         'added' => $session->laps()->count(),
                //     ],
                //     'addOrUpdateLaps'
                // );
            }
        });
    }
}
