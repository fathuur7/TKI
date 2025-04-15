<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Search\SearchController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('get', function () {
        return Inertia::render('search');
    })->name('get');
});
Route::get('/search', [SearchController::class, 'search']);


Route::get('/', [UserController::class, 'welcome'])->name('welcome');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
