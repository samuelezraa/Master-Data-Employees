<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = [
        'employee_id',
        'bulan_tahun',
        'gaji_pokok',
        'tunjangan',
        'potongan',
        'gaji_bersih',
        'status_pembayaran',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}