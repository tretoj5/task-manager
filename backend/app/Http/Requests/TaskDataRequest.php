<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class TaskDataRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $trimmed = [];

        foreach (['title', 'assignee'] as $field) {
            $value = $this->input($field);

            if (is_string($value)) {
                $trimmed[$field] = trim($value);
            }
        }

        $this->merge($trimmed);
    }

    public function authorize(): bool
    {
        return true;
    }
}
