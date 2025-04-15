<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('search', function () {
        return Inertia::render('search');
    })->name('search');
});

Route::get('/', [UserController::class, 'welcome'])->name('welcome');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
