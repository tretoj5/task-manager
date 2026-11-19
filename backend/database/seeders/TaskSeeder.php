<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        if (Task::query()->exists()) {
            return;
        }

        Task::factory()->count(25)->create();
    }
}
