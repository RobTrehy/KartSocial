<?php

namespace Database\Factories;

use App\Models\TrackLayout;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrackVisit>
 */
class TrackEventFactory extends Factory
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
            'track_layout_id' => TrackLayout::all()->random()->id,
            'date' => fake()->dateTimeBetween('-2 years', '+3 months'),
            'name' => fake()->word(),
            'description' => fake()->paragraph(),
        ];
    }
}
