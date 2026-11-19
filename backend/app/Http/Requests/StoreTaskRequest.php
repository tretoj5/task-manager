<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends TaskDataRequest
{
    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'status' => ['sometimes', Rule::enum(TaskStatus::class)],
            'assignee' => ['required', 'string', 'max:60'],
            'due_date' => ['nullable', 'date', 'after_or_equal:today'],
        ];
    }
}
