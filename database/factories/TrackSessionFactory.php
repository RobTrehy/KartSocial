<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrackVisitSession>
 */
class TrackSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'session_type' => fake()->randomElement(['Practice', 'Qualifying', 'Heat', 'Semi Final', 'Grand Final', 'Final', 'Race']),
            'length_type' => fake()->randomElement(['Minutes', 'Laps']),
            'length' => rand(5, 30),
            'total_drivers' => rand(1, 20),
        ];
    }
}
