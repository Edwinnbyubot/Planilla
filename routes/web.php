<?php

use App\Http\Controllers\ControllerAusencia;
use App\Http\Controllers\ControllerBonificacione;
use App\Http\Controllers\ControllerDevolucione;
use App\Http\Controllers\ControllerEmpleado;
use App\Http\Controllers\ControllerSueldo;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

Route::prefix('dashboard')->group(function(){
    Route::resource('empleados',ControllerEmpleado::class);
    Route::resource('sueldos',ControllerSueldo::class);
    Route::resource('ausencias',ControllerAusencia::class);
    Route::resource('bonificaciones',ControllerBonificacione::class);
    Route::resource('devoluciones',ControllerDevolucione::class);
});

Route::post('/empleado/store', [ControllerEmpleado::class, 'store'])->name('empleado.store');

require __DIR__.'/auth.php';
