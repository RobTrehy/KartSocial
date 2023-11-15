<?php

namespace Database\Seeders;

use App\Models\Track;
use App\Models\TrackLayout;
use Illuminate\Database\Seeder;

class TrackLayoutsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = fopen(base_path('database/data/layouts.csv'), 'r');

        $firstLine = true;
        while (($data = fgetcsv($csvFile, 2000, ',')) !== false) {
            if (! $firstLine) {
                $track = Track::where('name', $data[0])->first();

                if ($track) {
                    TrackLayout::create([
                        'track_id' => $track->id,
                        'is_default' => $data[1],
                        'name' => ($data[2]) ? $data[2] : null,
                        'length' => ($data[3]) ? $data[3] : null,
                        'retired_at' => ($data[4]) ? $data[4] : null,
                    ]);
                }
            }
            $firstLine = false;
        }

        fclose($csvFile);
    }
}
