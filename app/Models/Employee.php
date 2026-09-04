<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'nik_karyawan',
        'nama',
        'department_id',
        'position_id',
        'no_telepon',
        'email',
        'tanggal_masuk',
    ];

    // Tambahkan method relasi ini
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function attendances()
{
    return $this->hasMany(Attendance::class);
}
}