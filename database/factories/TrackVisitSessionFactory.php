<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrackVisitSession>
 */
class TrackVisitSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $total = rand(1, 20);
        return [
            'session_name' => fake()->word(),
            'session_type' => fake()->randomElement(['Practice', 'Qualifying', 'Heat', 'Semi Final', 'Grand Final', 'Final', 'Race']),
            'session_length_type' => fake()->randomElement(['Minutes', 'Laps']),
            'session_length' => rand(5, 30),
            'total_drivers' => $total,
            'finish_position' => rand(1, $total),
        ];
    }
}
