<?php

namespace Database\Seeders;

use App\Events\TrackVisitSessionEvent;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TrackVisitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('track_visits')->truncate();
        DB::table('track_visit_sessions')->truncate();
        DB::table('track_visit_session_laps')->truncate();
        DB::table('dashboard_feeds')->truncate();

        for ($i = 0; $i < 160; $i++) {
            $visit = \App\Models\TrackVisit::factory()
                ->has(
                    \App\Models\TrackVisitSession::factory(rand(1, 5))
                        ->sequence(fn (Sequence $sequence) => ['session_order' => $sequence->index])
                        ->has(
                            \App\Models\TrackVisitSessionLap::factory($laps = rand(5, 30))
                                ->sequence(fn (Sequence $sequence) => ['lap_number' => $sequence->index % $laps + 1]),
                            'laps'
                        ),
                    'sessions',
                )
                ->create();
        }
        foreach ($visit->sessions() as $session) {
            TrackVisitSessionEvent::dispatch(
                [
                    'session' => $session->toArray(),
                    'updated' => 0,
                    'added' => $session->laps()->count(),
                ],
                'addOrUpdateLaps'
            );
        }
    }
}
