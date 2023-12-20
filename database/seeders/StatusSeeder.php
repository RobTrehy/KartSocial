<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::updateOrCreate([
            'value' => 'Attending'
        ]);
        Status::updateOrCreate([
            'value' => 'Interested'
        ]);
        Status::updateOrCreate([
            'value' => 'Not Going'
        ]);
    }
}
