<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index()
    {
        $positions = Position::withCount('employees')->get();
        return Inertia::render('Positions/Index', [
            'positions' => $positions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_jabatan' => 'required|string|max:255|unique:positions,nama_jabatan',
            'gaji_pokok'   => 'required|numeric|min:0',
            'tunjangan'    => 'required|numeric|min:0',
        ]);

        Position::create($validated);

        return redirect()->route('positions.index')->with('success', 'Jabatan berhasil ditambahkan.');
    }

    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'nama_jabatan' => 'required|string|max:255|unique:positions,nama_jabatan,' . $position->id,
            'gaji_pokok'   => 'required|numeric|min:0',
            'tunjangan'    => 'required|numeric|min:0',
        ]);

        $position->update($validated);

        return redirect()->route('positions.index')->with('success', 'Data jabatan berhasil diperbarui.');
    }

    public function destroy(Position $position)
    {
        if ($position->employees()->count() > 0) {
            return redirect()->route('positions.index')->with('error', 'Jabatan tidak dapat dihapus karena masih digunakan oleh karyawan.');
        }

        $position->delete();

        return redirect()->route('positions.index')->with('success', 'Jabatan berhasil dihapus.');
    }
}