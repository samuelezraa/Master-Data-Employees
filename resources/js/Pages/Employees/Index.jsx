import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Index({ employees, departments, filters }) {
    const { delete: destroy, post: postLogout } = useForm();
    
    const [search, setSearch] = useState(filters?.search || '');
    const [departmentId, setDepartmentId] = useState(filters?.department_id || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('employees.index'), { search, department_id: departmentId }, { preserveState: true, replace: true });
    };

    const handleReset = () => {
        setSearch('');
        setDepartmentId('');
        router.get(route('employees.index'), {}, { preserveState: true, replace: true });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        postLogout(route('logout'));
    };

    const confirmDelete = (id, nama) => {
        Swal.fire({
            title: 'Hapus Karyawan?',
            text: `Data ${nama} akan dihapus secara permanen dari sistem.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007AFF',
            cancelButtonColor: '#8E8E93',
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'rounded-xl px-4 py-2 text-sm font-medium',
                cancelButton: 'rounded-xl px-4 py-2 text-sm font-medium'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('employees.destroy', id));
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1E] font-sans antialiased p-4 md:p-8">
            <Head title="Data Karyawan" />
            
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section (Refined Minimalist & Sleek Style) */}
                <div className="bg-white/90 backdrop-blur-xl sticky top-4 z-20 border border-black/[0.06] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-[#111827]">Data Karyawan</h1>
                        <p className="text-xs text-[#6B7280] mt-0.5 font-medium">
                            Master Data / <span className="text-[#007AFF] font-semibold">Karyawan</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href={route('departments.index')}
                            className="bg-[#F3F4F6] text-[#374151] px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-[#E5E7EB] hover:text-[#111827] transition-all duration-200"
                        >
                            Departemen
                        </Link>
                        <Link
                            href={route('positions.index')}
                            className="bg-[#F3F4F6] text-[#374151] px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-[#E5E7EB] hover:text-[#111827] transition-all duration-200"
                        >
                            Jabatan
                        </Link>
                        <Link
                            href={route('attendances.index')}
                            className="bg-emerald-50 text-emerald-600 border border-emerald-200/60 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200"
                        >
                            Absensi
                        </Link>
                        <Link
                            href={route('payrolls.index')}
                            className="bg-amber-50 text-amber-600 border border-amber-200/60 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-amber-100 hover:text-amber-700 transition-all duration-200"
                        >
                            Gaji
                        </Link>
                        <Link
                            href={route('employees.create')}
                            className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#0062cc] shadow-sm shadow-blue-500/20 transition-all duration-200"
                        >
                            + Tambah Data
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-rose-50 text-rose-600 border border-rose-200/60 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-rose-100 transition-all duration-200"
                        >
                            Keluar
                        </button>
                    </div>
                </div>

                {/* Filter & Search Section */}
                <div className="bg-white rounded-2xl p-5 shadow-xs border border-black/[0.06] space-y-4">
                    <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5">
                            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Cari Karyawan</label>
                            <input
                                type="text"
                                placeholder="Cari berdasarkan Nama atau NIK..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs px-3.5 py-3 text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all outline-none"
                            />
                        </div>
                        <div className="md:col-span-4">
                            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Filter Departemen</label>
                            <select
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs px-3.5 py-3 text-[#111827] focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all outline-none"
                            >
                                <option value="">-- Semua Departemen --</option>
                                {departments && departments.length > 0 ? (
                                    departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.nama_departemen}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>Data departemen kosong</option>
                                )}
                            </select>
                        </div>
                        <div className="md:col-span-3 flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-[#111827] text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-black transition-all shadow-sm"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="bg-[#F3F4F6] border border-[#E5E7EB] text-[#374151] px-4 py-3 rounded-xl text-xs font-semibold hover:bg-[#E5E7EB] transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-xs border border-black/[0.06] overflow-hidden">
                    <div className="px-5 py-4 border-b border-[#F3F4F6] text-xs text-[#6B7280] font-semibold flex justify-between items-center bg-white">
                        <span>Total Karyawan: <span className="text-[#111827] font-bold">{employees.total || employees.data.length}</span></span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#F3F4F6]">
                            <thead className="bg-[#F9FAFB]">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider w-16">No</th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">NIK & Nama Karyawan</th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Departemen</th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Kontak</th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Tanggal Masuk</th>
                                    <th className="px-6 py-3.5 text-center text-[11px] font-bold text-[#6B7280] uppercase tracking-wider w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#F3F4F6] text-xs">
                                {employees.data.length > 0 ? (
                                    employees.data.map((employee, index) => {
                                        const initials = employee.nama ? employee.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
                                        return (
                                            <tr key={employee.id} className="hover:bg-[#F9FAFB]/80 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] font-medium">{employees.from ? employees.from + index : index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#007AFF] flex items-center justify-center font-bold text-xs ring-1 ring-blue-500/10">
                                                            {initials}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-[#111827]">{employee.nama}</div>
                                                            <div className="text-[11px] text-[#9CA3AF] font-medium">{employee.nik_karyawan}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2.5 py-1 text-[11px] font-medium bg-[#F3F4F6] text-[#4B5563] rounded-lg">
                                                        {employee.department ? employee.department.nama_departemen : '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[#111827] font-medium">{employee.no_telepon || '-'}</div>
                                                    <div className="text-[#9CA3AF] text-[11px]">{employee.email || '-'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#4B5563] font-medium">
                                                    {employee.tanggal_masuk ? new Date(employee.tanggal_masuk).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center space-x-1.5">
                                                        <Link
                                                            href={route('employees.show', employee.id)}
                                                            className="p-1.5 text-[#007AFF] hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Detail"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                        </Link>
                                                        <Link
                                                            href={route('employees.edit', employee.id)}
                                                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                        </Link>
                                                        <button
                                                            onClick={() => confirmDelete(employee.id, employee.nama)}
                                                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-[#9CA3AF] font-medium">
                                            Tidak ada data karyawan ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Section */}
                    {employees.links && employees.links.length > 3 && (
                        <div className="px-5 py-4 border-t border-[#F3F4F6] flex items-center justify-between bg-white">
                            <div className="text-xs text-[#6B7280] font-medium">
                                Halaman <span className="font-bold text-[#111827]">{employees.current_page}</span> dari <span className="font-bold text-[#111827]">{employees.last_page}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {employees.links.map((link, key) => (
                                    link.url === null ? (
                                        <span
                                            key={key}
                                            className="px-3 py-1.5 text-xs font-medium text-[#9CA3AF] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-not-allowed opacity-60"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <Link
                                            key={key}
                                            href={link.url}
                                            className={`px-3 py-1.5 text-xs font-semibold border rounded-lg transition-all ${
                                                link.active
                                                    ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-xs'
                                                    : 'bg-white text-[#374151] border-[#E5E7EB] hover:bg-[#F9FAFB]'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}