<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = [
        'nama_departemen',
        'status',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}