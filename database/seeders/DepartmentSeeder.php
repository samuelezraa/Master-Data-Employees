<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departemen = [
            ['nama_departemen' => 'Maintenance', 'status' => 'Aktif'],
            ['nama_departemen' => 'HR & Legal', 'status' => 'Aktif'],
            ['nama_departemen' => 'IT', 'status' => 'Aktif'],
            ['nama_departemen' => 'Operation', 'status' => 'Aktif'],
            ['nama_departemen' => 'GA & Procurement', 'status' => 'Aktif'],
            ['nama_departemen' => 'Sales', 'status' => 'Aktif'],
            ['nama_departemen' => 'Finance & Accounting', 'status' => 'Aktif'],
        ];

        foreach ($departemen as $dep) {
            Department::create($dep);
        }
    }
}