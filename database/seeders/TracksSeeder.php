<?php

namespace Database\Seeders;

use App\Models\Track;
use Illuminate\Database\Seeder;

class TracksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = fopen(base_path('database/data/tracks.csv'), 'r');

        $firstLine = true;
        while (($data = fgetcsv($csvFile, 2000, ',')) !== false) {
            if (!$firstLine) {
                Track::create([
                    'name' => $data[0],
                    'address_1' => $data[1],
                    'address_2' => $data[2],
                    'address_3' => $data[3],
                    'town' => $data[4],
                    'county' => $data[5],
                    'postal_code' => $data[6],
                    'lat' => $data[7],
                    'lng' => $data[8],
                    'type' => $data[9],
                    'url' => $data[10],
                    'number' => $data[11],
                ]);
            }
            $firstLine = false;
        }

        fclose($csvFile);
    }
}
