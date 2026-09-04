<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'nik_karyawan' => 'IT-2026-001',
                'nama' => 'Budi Santoso',
                'department_id' => 3,
                'position_id' => 1,
                'no_telepon' => '081234567890',
                'email' => 'budi.it@saloka.com',
                'tanggal_masuk' => '2024-01-15',
            ],
            [
                'nik_karyawan' => 'MNT-2026-001',
                'nama' => 'Joko Teknisi',
                'department_id' => 1,
                'position_id' => 2,
                'no_telepon' => '089876543210',
                'email' => 'joko.mnt@saloka.com',
                'tanggal_masuk' => '2023-05-10',
            ],
            [
                'nik_karyawan' => 'HR-2026-001',
                'nama' => 'Siti Aminah',
                'department_id' => 2,
                'position_id' => 1,
                'no_telepon' => '085611223344',
                'email' => 'siti.hr@saloka.com',
                'tanggal_masuk' => '2022-03-20',
            ],
            [
                'nik_karyawan' => 'FIN-2026-001',
                'nama' => 'Ahmad Fauzi',
                'department_id' => 4,
                'position_id' => 2,
                'no_telepon' => '087855667788',
                'email' => 'ahmad.fin@saloka.com',
                'tanggal_masuk' => '2023-11-05',
            ],
            [
                'nik_karyawan' => 'MKT-2026-001',
                'nama' => 'Dewi Lestari',
                'department_id' => 5,
                'position_id' => 1,
                'no_telepon' => '081399887766',
                'email' => 'dewi.mkt@saloka.com',
                'tanggal_masuk' => '2024-02-01',
            ],
            [
                'nik_karyawan' => 'IT-2026-002',
                'nama' => 'Rian Pratama',
                'department_id' => 3,
                'position_id' => 2,
                'no_telepon' => '081233445566',
                'email' => 'rian.it@saloka.com',
                'tanggal_masuk' => '2024-04-12',
            ],
            [
                'nik_karyawan' => 'HR-2026-002',
                'nama' => 'Maya Sofa',
                'department_id' => 2,
                'position_id' => 2,
                'no_telepon' => '085677889900',
                'email' => 'maya.hr@saloka.com',
                'tanggal_masuk' => '2023-08-15',
            ],
            [
                'nik_karyawan' => 'MNT-2026-002',
                'nama' => 'Eko Prasetyo',
                'department_id' => 1,
                'position_id' => 1,
                'no_telepon' => '089811223344',
                'email' => 'eko.mnt@saloka.com',
                'tanggal_masuk' => '2022-01-10',
            ],
            [
                'nik_karyawan' => 'FIN-2026-002',
                'nama' => 'Siti Rahma',
                'department_id' => 4,
                'position_id' => 1,
                'no_telepon' => '087811335577',
                'email' => 'rahma.fin@saloka.com',
                'tanggal_masuk' => '2023-06-18',
            ],
            [
                'nik_karyawan' => 'MKT-2026-002',
                'nama' => 'Bayu Kusuma',
                'department_id' => 5,
                'position_id' => 2,
                'no_telepon' => '081322446688',
                'email' => 'bayu.mkt@saloka.com',
                'tanggal_masuk' => '2024-03-25',
            ],
            [
                'nik_karyawan' => 'IT-2026-003',
                'nama' => 'Dian Sastro',
                'department_id' => 3,
                'position_id' => 1,
                'no_telepon' => '081299887766',
                'email' => 'dian.it@saloka.com',
                'tanggal_masuk' => '2021-09-14',
            ],
            [
                'nik_karyawan' => 'HR-2026-003',
                'nama' => 'Hendra Setiawan',
                'department_id' => 2,
                'position_id' => 2,
                'no_telepon' => '085644556677',
                'email' => 'hendra.hr@saloka.com',
                'tanggal_masuk' => '2022-12-01',
            ],
            [
                'nik_karyawan' => 'MNT-2026-003',
                'nama' => 'Agus Handoko',
                'department_id' => 1,
                'position_id' => 2,
                'no_telepon' => '089833445566',
                'email' => 'agus.mnt@saloka.com',
                'tanggal_masuk' => '2023-04-19',
            ],
            [
                'nik_karyawan' => 'FIN-2026-003',
                'nama' => 'Lestari Wulandari',
                'department_id' => 4,
                'position_id' => 1,
                'no_telepon' => '087899001122',
                'email' => 'lestari.fin@saloka.com',
                'tanggal_masuk' => '2024-01-05',
            ],
            [
                'nik_karyawan' => 'MKT-2026-003',
                'nama' => 'Fajar Nugraha',
                'department_id' => 5,
                'position_id' => 1,
                'no_telepon' => '081344556677',
                'email' => 'fajar.mkt@saloka.com',
                'tanggal_masuk' => '2023-10-30',
            ],
            [
                'nik_karyawan' => 'IT-2026-004',
                'nama' => 'Putri Anggraini',
                'department_id' => 3,
                'position_id' => 2,
                'no_telepon' => '081255667788',
                'email' => 'putri.it@saloka.com',
                'tanggal_masuk' => '2024-05-15',
            ],
            [
                'nik_karyawan' => 'HR-2026-004',
                'nama' => 'Reza Rahadian',
                'department_id' => 2,
                'position_id' => 1,
                'no_telepon' => '085688990011',
                'email' => 'reza.hr@saloka.com',
                'tanggal_masuk' => '2022-07-22',
            ],
            [
                'nik_karyawan' => 'MNT-2026-004',
                'nama' => 'Doni Saputra',
                'department_id' => 1,
                'position_id' => 2,
                'no_telepon' => '089855667788',
                'email' => 'doni.mnt@saloka.com',
                'tanggal_masuk' => '2023-02-14',
            ],
            [
                'nik_karyawan' => 'FIN-2026-004',
                'nama' => 'Intan Permata',
                'department_id' => 4,
                'position_id' => 2,
                'no_telepon' => '087822334455',
                'email' => 'intan.fin@saloka.com',
                'tanggal_masuk' => '2024-03-10',
            ],
            [
                'nik_karyawan' => 'MKT-2026-004',
                'nama' => 'Galih Pratama',
                'department_id' => 5,
                'position_id' => 2,
                'no_telepon' => '081377889900',
                'email' => 'galih.mkt@saloka.com',
                'tanggal_masuk' => '2023-12-11',
            ],
        ];

        foreach ($employees as $emp) {
            Employee::create($emp);
        }
    }
}