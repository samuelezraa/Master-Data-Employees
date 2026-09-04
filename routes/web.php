<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\PayrollController;
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

// Hapus duplikasi /dashboard, cukup gunakan yang ber-middleware auth dan verified
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Master Data & Modul Utama
Route::resource('employees', EmployeeController::class);
Route::resource('departments', DepartmentController::class);
Route::resource('positions', PositionController::class);

// Rute Absensi & Kehadiran
Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendances.index');
Route::post('/attendances', [AttendanceController::class, 'storeOrUpdate'])->name('attendances.storeOrUpdate');

// Route Payroll
Route::get('/payrolls', [PayrollController::class, 'index'])->name('payrolls.index');
Route::post('/payrolls/generate', [PayrollController::class, 'generate'])->name('payrolls.generate');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('departments/{department}/employees', [DepartmentController::class, 'employees'])->name('departments.employees');

require __DIR__.'/auth.php';