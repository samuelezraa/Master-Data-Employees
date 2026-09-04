<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id(); // ID karyawan
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade'); // Relasi dengan tabel Master Departemen
            $table->string('nik_karyawan')->unique(); // Nomor induk karyawan
            $table->string('nama'); // Nama karyawan
            $table->string('no_telepon')->nullable(); // Nomor telepon karyawan
            $table->string('email')->unique(); // Email karyawan
            $table->date('tanggal_masuk'); // Tanggal mulai bekerja
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
