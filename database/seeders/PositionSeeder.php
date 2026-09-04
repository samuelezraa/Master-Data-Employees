<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            ['nama_jabatan' => 'Manager'],
            ['nama_jabatan' => 'Staff'],
            ['nama_jabatan' => 'Supervisor'],
            ['nama_jabatan' => 'Senior Developer'],
            ['nama_jabatan' => 'Junior Developer'],
        ];

        foreach ($positions as $pos) {
            Position::create($pos);
        }
    }
}