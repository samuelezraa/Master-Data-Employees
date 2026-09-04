<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Models\Employee;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class PayrollController extends Controller
{
    // Menampilkan daftar rekap gaji per bulan
    public function index(Request $request)
    {
        $bulanTahun = $request->input('bulan_tahun', Carbon::now()->format('Y-m'));

        $payrolls = Payroll::with('employee.department', 'employee.position')
            ->where('bulan_tahun', $bulanTahun)
            ->get();

        return Inertia::render('Payrolls/Index', [
            'payrolls' => $payrolls,
            'filters' => [
                'bulan_tahun' => $bulanTahun
            ]
        ]);
    }

    // Proses generate gaji otomatis untuk satu bulan tertentu
    public function generate(Request $request)
    {
        $request->validate([
            'bulan_tahun' => 'required', // Format: 'YYYY-MM'
        ]);

        $bulanTahun = $request->input('bulan_tahun');
        list($year, $month) = explode('-', $bulanTahun);

        $employees = Employee::with('position')->get();

        foreach ($employees as $employee) {
            // Ambil gaji pokok dan tunjangan dari relasi position
            $gajiPokok = $employee->position->gaji_pokok ?? 0;
            $tunjangan = $employee->position->tunjangan ?? 0;

            // Hitung akumulasi Alpha atau Terlambat di bulan tersebut
            $alphaCount = Attendance::where('employee_id', $employee->id)
                ->whereYear('tanggal', $year)
                ->whereMonth('tanggal', $month)
                ->where('status', 'Alpha')
                ->count();

            // Contoh aturan potongan: misal denda Rp 50.000 per Alpha
            $potonganPerAlpha = 50000;
            $totalPotongan = $alphaCount * $potonganPerAlpha;

            // Hitung gaji bersih
            $gajiBersih = ($gajiPokok + $tunjangan) - $totalPotongan;

            // Simpan atau perbarui data payroll per karyawan per bulan
            Payroll::updateOrCreate(
                [
                    'employee_id' => $employee->id,
                    'bulan_tahun' => $bulanTahun,
                ],
                [
                    'gaji_pokok' => $gajiPokok,
                    'tunjangan' => $tunjangan,
                    'potongan' => $totalPotongan,
                    'gaji_bersih' => $gajiBersih,
                    'status_pembayaran' => 'Pending',
                ]
            );
        }

        return redirect()->route('payrolls.index', ['bulan_tahun' => $bulanTahun])
            ->with('success', 'Data penggajian bulan ' . $bulanTahun . ' berhasil digenerate.');
    }
}