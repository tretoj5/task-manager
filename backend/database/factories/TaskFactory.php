<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->sentence(4),
            'status' => fake()->randomElement(TaskStatus::cases()),
            'assignee' => fake()->name(),
            'due_date' => fake()->optional()->dateTimeBetween('today', '+30 days'),
        ];
    }
}
