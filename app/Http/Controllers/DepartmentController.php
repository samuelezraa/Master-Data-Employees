<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    // Menampilkan daftar departemen
    public function index()
    {
        $departments = Department::withCount('employees')->get();
        return Inertia::render('Departments/Index', [
            'departments' => $departments
        ]);
    }

    // Menyimpan departemen baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_departemen' => 'required|unique:departments,nama_departemen',
            'status' => 'required',
        ]);

        Department::create($validated);

        return redirect()->route('departments.index')->with('success', 'Departemen berhasil ditambahkan.');
    }

    // Mengupdate departemen
    public function update(Request $request, Department $department)
    {
        $request->validate([
            'nama_departemen' => 'required|unique:departments,nama_departemen,' . $department->id,
            'status'          => 'required',
        ]);

        $department->update($request->all());

        return redirect()->route('departments.index')->with('success', 'Data departemen berhasil diperbarui.');
    }

    // Menghapus departemen
    public function destroy(Department $department)
    {
        // Cek apakah departemen masih dipakai karyawan
        if ($department->employees()->count() > 0) {
            return redirect()->route('departments.index')->with('error', 'Departemen tidak dapat dihapus karena masih memiliki karyawan.');
        }

        $department->delete();

        return redirect()->route('departments.index')->with('success', 'Departemen berhasil dihapus.');
    }

    // Menampilkan detail departemen dan daftar karyawan di dalamnya
    public function show(Department $department)
    {
        $employees = $department->employees()->get();

        return Inertia::render('Departments/Show', [
            'department' => $department,
            'employees' => $employees
        ]);
    }

    public function employees(Department $department)
    {
        $employees = $department->employees()->with(['department', 'position'])->paginate(10);

        return Inertia::render('Departments/Employees', [
            'department' => $department,
            'employees' => $employees,
        ]);
}
}