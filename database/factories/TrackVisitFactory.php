<?php

namespace Database\Factories;

use App\Models\Track;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrackVisit>
 */
class TrackVisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::all()->random()->id,
            'track_layout_id' => Track::all()->random()->id,
            'visit_date' => fake()->dateTimeBetween('-2 years'),
            'title' => fake()->word(),
        ];
    }
}
