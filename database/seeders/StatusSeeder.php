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
        Status::create([
            'value' => 'Attending'
        ]);
        Status::create([
            'value' => 'Interested'
        ]);
        Status::create([
            'value' => 'Not Going'
        ]);
    }
}
