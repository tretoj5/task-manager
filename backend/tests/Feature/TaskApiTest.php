<?php

declare(strict_types=1);

use App\Enums\TaskStatus;
use App\Models\Task;

it('returns the standard paginated response and respects per_page', function () {
    Task::factory()->count(12)->create();

    $response = $this->getJson('/api/tasks?per_page=5');

    $response
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'status',
                    'assignee',
                    'due_date',
                    'created_at',
                    'updated_at',
                ],
            ],
            'links',
            'meta' => ['current_page', 'last_page', 'per_page', 'total'],
        ]);

    expect($response->json('data'))->toHaveCount(5)
        ->and($response->json('meta.per_page'))->toBe(5)
        ->and($response->json('meta.total'))->toBe(12);
});

it('filters by status and assignee and searches titles without case sensitivity', function () {
    Task::factory()->create([
        'title' => 'Prepare RELEASE notes',
        'status' => TaskStatus::Done,
        'assignee' => 'Ana Ruiz',
    ]);
    Task::factory()->create([
        'title' => 'Prepare release checklist',
        'status' => TaskStatus::Pending,
        'assignee' => 'Ana Ruiz',
    ]);
    Task::factory()->create([
        'title' => 'Prepare release notes',
        'status' => TaskStatus::Done,
        'assignee' => 'Luis Vega',
    ]);

    $response = $this->getJson('/api/tasks?status=done&assignee=Ana%20Ruiz&q=release');

    $response
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.title', 'Prepare RELEASE notes');
});

it('treats percent and underscore in search terms literally', function () {
    Task::factory()->create(['title' => 'Ship 100%_complete report']);
    Task::factory()->create(['title' => 'Ship 100X-complete report']);
    Task::factory()->create(['title' => 'Ship 100%-complete report']);

    $this->getJson('/api/tasks?q=%25')
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonFragment(['title' => 'Ship 100%_complete report'])
        ->assertJsonFragment(['title' => 'Ship 100%-complete report']);

    $this->getJson('/api/tasks?q=%5F')
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.title', 'Ship 100%_complete report');
});

it('accepts search terms longer than one hundred characters', function () {
    $this->getJson('/api/tasks?q='.str_repeat('x', 101))
        ->assertOk()
        ->assertJsonCount(0, 'data');
});

it('creates a trimmed task with pending status by default', function () {
    $response = $this->postJson('/api/tasks', [
        'title' => '  Review API contract  ',
        'assignee' => '  Ana Ruiz  ',
    ]);

    $response
        ->assertCreated()
        ->assertJsonPath('data.title', 'Review API contract')
        ->assertJsonPath('data.status', 'pending')
        ->assertJsonPath('data.assignee', 'Ana Ruiz')
        ->assertJsonPath('data.due_date', null);

    $this->assertDatabaseHas('tasks', [
        'title' => 'Review API contract',
        'status' => TaskStatus::Pending->value,
        'assignee' => 'Ana Ruiz',
    ]);
});

it('returns field validation errors for invalid task creation', function () {
    $this->postJson('/api/tasks', [
        'title' => ' ',
        'status' => 'blocked',
        'assignee' => 'Ana Ruiz',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['title', 'status']);
});

it('shows and updates tasks and changes only the status through its endpoint', function () {
    $task = Task::factory()->create([
        'title' => 'Initial title',
        'status' => TaskStatus::Pending,
        'assignee' => 'Ana Ruiz',
    ]);

    $this->getJson("/api/tasks/{$task->id}")
        ->assertOk()
        ->assertJsonPath('data.title', 'Initial title');

    $this->putJson("/api/tasks/{$task->id}", ['title' => 'Updated title'])
        ->assertOk()
        ->assertJsonPath('data.title', 'Updated title');

    $this->patchJson("/api/tasks/{$task->id}/status", ['status' => 'done'])
        ->assertOk()
        ->assertJsonPath('data.title', 'Updated title')
        ->assertJsonPath('data.status', 'done')
        ->assertJsonPath('data.assignee', 'Ana Ruiz');

    $this->assertDatabaseHas('tasks', [
        'id' => $task->id,
        'title' => 'Updated title',
        'status' => TaskStatus::Done->value,
        'assignee' => 'Ana Ruiz',
    ]);
});

it('rejects invalid status changes', function () {
    $task = Task::factory()->create();

    $this->patchJson("/api/tasks/{$task->id}/status", ['status' => 'blocked'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('status');
});

it('allows an unchanged past due date but rejects changing it to a past date', function () {
    $task = Task::factory()->create(['due_date' => '2020-01-01']);

    $this->patchJson("/api/tasks/{$task->id}", [
        'title' => 'Updated historical task',
        'due_date' => '2020-01-01',
    ])
        ->assertOk()
        ->assertJsonPath('data.due_date', '2020-01-01');

    $this->patchJson("/api/tasks/{$task->id}", ['due_date' => '2019-01-01'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('due_date');
});

it('returns JSON 404 responses for missing tasks without an Accept header', function () {
    $this->get('/api/tasks/99999999')
        ->assertNotFound()
        ->assertJsonStructure(['message']);

    $this->put('/api/tasks/99999999', ['title' => 'Missing task'])
        ->assertNotFound()
        ->assertJsonStructure(['message']);

    $this->patch('/api/tasks/99999999/status', ['status' => 'done'])
        ->assertNotFound()
        ->assertJsonStructure(['message']);
});

it('rejects invalid list filters and page sizes without requiring an Accept header', function () {
    $this->get('/api/tasks?status=banana')
        ->assertUnprocessable()
        ->assertJsonValidationErrors('status');

    $this->getJson('/api/tasks?per_page=1000')
        ->assertUnprocessable()
        ->assertJsonValidationErrors('per_page');
});
