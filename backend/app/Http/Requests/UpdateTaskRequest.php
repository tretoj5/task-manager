<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends TaskDataRequest
{
    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $dueDateRules = ['sometimes', 'nullable', 'date'];
        $task = $this->route('task');
        $dueDate = $this->input('due_date');

        if (
            $task instanceof Task
            && is_string($dueDate)
            && $dueDate !== $task->due_date?->toDateString()
        ) {
            $dueDateRules[] = 'after_or_equal:today';
        }

        return [
            'title' => ['sometimes', 'required', 'string', 'max:120'],
            'status' => ['sometimes', Rule::enum(TaskStatus::class)],
            'assignee' => ['sometimes', 'required', 'string', 'max:60'],
            'due_date' => $dueDateRules,
        ];
    }
}
