<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $tanggal = $request->input('tanggal', Carbon::now()->format('Y-m-d'));

        // Ambil semua karyawan beserta absensi pada tanggal tersebut
        $employees = Employee::with(['department', 'position', 'attendances' => function ($query) use ($tanggal) {
            $query->where('tanggal', $tanggal);
        }])->get();

        return Inertia::render('Attendances/Index', [
            'employees' => $employees,
            'selectedDate' => $tanggal,
        ]);
    }

    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'tanggal' => 'required|date',
            'jam_masuk' => 'nullable|date_format:H:i',
            'jam_keluar' => 'nullable|date_format:H:i', // Tambahan validasi jam keluar
            'status' => 'required|in:Hadir,Terlambat,Izin,Sakit,Alpha',
            'keterangan' => 'nullable|string',
        ]);

        $jamMasuk = $request->jam_masuk;
        $status = $request->status;

        if ($jamMasuk && $status !== 'Izin' && $status !== 'Sakit') {
            $batasTerlambat = Carbon::createFromTime(8, 15, 0);
            $waktuMasuk = Carbon::createFromFormat('H:i', $jamMasuk);

            $status = $waktuMasuk->greaterThan($batasTerlambat) ? 'Terlambat' : 'Hadir';
        }

        Attendance::updateOrCreate(
            [
                'employee_id' => $request->employee_id,
                'tanggal' => $request->tanggal,
            ],
            [
                'jam_masuk' => $jamMasuk,
                'jam_keluar' => $request->jam_keluar, // Simpan jam keluar
                'status' => $status,
                'keterangan' => $request->keterangan,
            ]
        );

        return redirect()->back()->with('success', 'Data absensi berhasil diperbarui.');
    }


    


}