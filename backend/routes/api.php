<?php

use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    DB::select('SELECT 1');

    return response()->json(['status' => 'ok']);
});

Route::apiResource('tasks', TaskController::class)->except(['destroy']);
Route::patch('/tasks/{task}/status', [TaskController::class, 'updateStatus']);
