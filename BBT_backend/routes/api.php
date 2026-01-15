<?php

use App\Http\Controllers\BefizController;
use App\Http\Controllers\UgyfelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/users', [UgyfelController::class, 'index']);
Route::post('/newUser', [UgyfelController::class, 'store']);
Route::post('/newBefiz', [BefizController::class, 'store']);
Route::delete('/deleteBefiz', [BefizController::class, 'destroy']);
Route::get('/customerBefiz', [UgyfelController::class, 'show']);
Route::put('/updateBefiz', [UgyfelController::class, 'update']);
