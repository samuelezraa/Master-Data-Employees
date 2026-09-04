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
        Schema::create('departments', function (Blueprint $table) {
            $table->id(); // ID departemen
            $table->string('nama_departemen'); // Nama departemen
            $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif'); // Status Aktif / Nonaktif
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
