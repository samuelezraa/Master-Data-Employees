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
        <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased p-4 md:p-8">
            <Head title="Data Karyawan" />
            
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section (iOS Navigation Bar Style) */}
                <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-[#E5E5EA] -mx-4 -mt-4 p-4 md:mx-0 md:mt-0 md:rounded-2xl md:border md:shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1C1E]">Data Karyawan</h1>
                        <p className="text-xs text-[#8E8E93] mt-0.5">
                            Master Data / <span className="text-[#007AFF] font-medium">Karyawan</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href={route('departments.index')}
                            className="bg-[#F2F2F7] text-[#3A3A3C] px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-[#E5E5EA] transition"
                        >
                            Departemen
                        </Link>
                        <Link
                            href={route('positions.index')}
                            className="bg-[#F2F2F7] text-[#3A3A3C] px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-[#E5E5EA] transition"
                        >
                            Jabatan
                        </Link>
                        <Link
                            href={route('attendances.index')}
                            className="bg-[#34C759] text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-[#2fb850] transition shadow-xs"
                        >
                            Absensi
                        </Link>
                        {/* Tombol Akses Payroll / Penggajian */}
                        <Link
                            href={route('payrolls.index')}
                            className="bg-[#FF9500] text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-[#e08400] transition shadow-xs"
                        >
                            Gaji
                        </Link>
                        <Link
                            href={route('employees.create')}
                            className="bg-[#007AFF] text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#0062cc] shadow-xs transition"
                        >
                            + Tambah Data
                        </Link>
                        {/* Tombol Keluar Sistem / Logout */}
                        <button
                            onClick={handleLogout}
                            className="bg-[#FF3B30]/10 text-[#FF3B30] px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-[#FF3B30]/20 transition"
                        >
                            Keluar
                        </button>
                    </div>
                </div>

                {/* Filter & Search Section (iOS Grouped Form Style) */}
                <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5E5EA] space-y-4">
                    <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5">
                            <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Cari Karyawan</label>
                            <input
                                type="text"
                                placeholder="Nama atau NIK..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                            />
                        </div>
                        <div className="md:col-span-4">
                            <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Filter Departemen</label>
                            <select
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                                className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
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
                                className="flex-1 bg-[#1C1C1E] text-white px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#3A3A3C] transition shadow-xs"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="bg-[#F2F2F7] border border-[#E5E5EA] text-[#3A3A3C] px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#E5E5EA]/80 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section (Clean White Card Style) */}
                <div className="bg-white rounded-2xl shadow-xs border border-[#E5E5EA] overflow-hidden">
                    <div className="px-5 py-4 border-b border-[#E5E5EA] text-xs text-[#8E8E93] font-medium flex justify-between items-center bg-white">
                        <span>Total Karyawan: <span className="text-[#1C1C1E] font-semibold">{employees.total || employees.data.length}</span></span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#E5E5EA]">
                            <thead className="bg-[#F2F2F7]/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider w-16">No</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">NIK & Nama Karyawan</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Departemen</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Kontak</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Tanggal Masuk</th>
                                    <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#E5E5EA] text-sm">
                                {employees.data.length > 0 ? (
                                    employees.data.map((employee, index) => {
                                        const initials = employee.nama ? employee.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
                                        return (
                                            <tr key={employee.id} className="hover:bg-[#F2F2F7]/40 transition">
                                                <td className="px-6 py-3.5 whitespace-nowrap text-[#8E8E93] text-xs">{employees.from ? employees.from + index : index + 1}</td>
                                                <td className="px-6 py-3.5 whitespace-nowrap">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center font-semibold text-xs">
                                                            {initials}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-[#1C1C1E]">{employee.nama}</div>
                                                            <div className="text-[11px] text-[#8E8E93]">{employee.nik_karyawan}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3.5 whitespace-nowrap">
                                                    <span className="px-2.5 py-1 text-[11px] font-medium bg-[#F2F2F7] text-[#3A3A3C] rounded-lg">
                                                        {employee.department ? employee.department.nama_departemen : '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3.5 whitespace-nowrap">
                                                    <div className="text-[#1C1C1E] text-xs">{employee.no_telepon || '-'}</div>
                                                    <div className="text-[#8E8E93] text-[11px]">{employee.email || '-'}</div>
                                                </td>
                                                <td className="px-6 py-3.5 whitespace-nowrap text-[#3A3A3C] text-xs">
                                                    {employee.tanggal_masuk ? new Date(employee.tanggal_masuk).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                                </td>
                                                <td className="px-6 py-3.5 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <Link
                                                            href={route('employees.show', employee.id)}
                                                            className="p-1.5 text-[#007AFF] hover:bg-[#007AFF]/10 rounded-lg transition"
                                                            title="Detail"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                        </Link>
                                                        <Link
                                                            href={route('employees.edit', employee.id)}
                                                            className="p-1.5 text-[#FF9500] hover:bg-[#FF9500]/10 rounded-lg transition"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                        </Link>
                                                        <button
                                                            onClick={() => confirmDelete(employee.id, employee.nama)}
                                                            className="p-1.5 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition"
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
                                        <td colSpan="6" className="px-6 py-12 text-center text-[#8E8E93]">
                                            Tidak ada data karyawan ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Section */}
                    {employees.links && employees.links.length > 3 && (
                        <div className="px-5 py-3.5 border-t border-[#E5E5EA] flex items-center justify-between bg-white">
                            <div className="text-xs text-[#8E8E93]">
                                Halaman <span className="font-medium text-[#1C1C1E]">{employees.current_page}</span> dari <span className="font-medium text-[#1C1C1E]">{employees.last_page}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {employees.links.map((link, key) => (
                                    link.url === null ? (
                                        <span
                                            key={key}
                                            className="px-3 py-1.5 text-xs font-medium text-[#8E8E93] bg-[#F2F2F7] border border-[#E5E5EA] rounded-lg cursor-not-allowed opacity-60"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <Link
                                            key={key}
                                            href={link.url}
                                            className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition ${
                                                link.active
                                                    ? 'bg-[#007AFF] text-white border-[#007AFF]'
                                                    : 'bg-white text-[#3A3A3C] border-[#E5E5EA] hover:bg-[#F2F2F7]'
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