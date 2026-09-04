import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Index({ departments }) {
    const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
        id: '',
        nama_departemen: '',
        status: 'Aktif',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('departments.update', data.id), {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Data departemen diperbarui.',
                        icon: 'success',
                        confirmButtonColor: '#007AFF',
                        customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl px-4 py-2 text-sm font-medium' }
                    });
                },
            });
        } else {
            post(route('departments.store'), {
                onSuccess: () => {
                    reset();
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Departemen baru ditambahkan.',
                        icon: 'success',
                        confirmButtonColor: '#007AFF',
                        customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl px-4 py-2 text-sm font-medium' }
                    });
                },
            });
        }
    };

    const handleEdit = (dept) => {
        setIsEditing(true);
        setData({
            id: dept.id,
            nama_departemen: dept.nama_departemen,
            status: dept.status || 'Aktif',
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    const confirmDelete = (id, nama) => {
        Swal.fire({
            title: 'Hapus Departemen?',
            text: `Departemen ${nama} akan dihapus secara permanen dari sistem.`,
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
                destroy(route('departments.destroy', id), {
                    onError: (err) => Swal.fire({
                        title: 'Gagal!',
                        text: err.error || 'Terjadi kesalahan.',
                        icon: 'error',
                        confirmButtonColor: '#007AFF',
                        customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl px-4 py-2 text-sm font-medium' }
                    }),
                    onSuccess: () => Swal.fire({
                        title: 'Terhapus!',
                        text: 'Departemen berhasil dihapus.',
                        icon: 'success',
                        confirmButtonColor: '#007AFF',
                        customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl px-4 py-2 text-sm font-medium' }
                    }),
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1E] font-sans antialiased p-4 md:p-8">
            <Head title="Kelola Departemen" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white/95 backdrop-blur-xl border border-black/[0.06] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-[#111827]">Kelola Departemen</h1>
                        <p className="text-xs text-[#6B7280] mt-0.5 font-medium">
                            Master Data / <span className="text-[#007AFF] font-semibold">Departemen</span>
                        </p>
                    </div>
                    <Link
                        href={route('employees.index')}
                        className="bg-[#F3F4F6] text-[#374151] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#E5E7EB] hover:text-[#111827] transition-all"
                    >
                        Kembali ke Karyawan
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Input / Edit */}
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-black/[0.06] h-fit space-y-4">
                        <h2 className="text-base font-bold text-[#111827]">
                            {isEditing ? 'Edit Departemen' : 'Tambah Departemen'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Nama Departemen</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: HR & Legal"
                                    value={data.nama_departemen}
                                    onChange={(e) => setData('nama_departemen', e.target.value)}
                                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs px-3.5 py-3 text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all outline-none"
                                />
                                {errors.nama_departemen && <div className="text-rose-600 text-xs mt-1.5 font-medium">{errors.nama_departemen}</div>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs px-3.5 py-3 text-[#111827] focus:bg-white focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all outline-none"
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                                {errors.status && <div className="text-rose-600 text-xs mt-1.5 font-medium">{errors.status}</div>}
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#007AFF] text-white px-4 py-3 rounded-xl text-xs font-semibold hover:bg-[#0062cc] shadow-sm shadow-blue-500/20 transition-all"
                                >
                                    {isEditing ? 'Perbarui' : 'Simpan'}
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-[#F3F4F6] border border-[#E5E7EB] text-[#374151] px-4 py-3 rounded-xl text-xs font-semibold hover:bg-[#E5E7EB] transition-all"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table List */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-black/[0.06] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-[#F3F4F6]">
                                <thead className="bg-[#F9FAFB]">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider w-16">No</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Nama Departemen</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Jumlah Karyawan</th>
                                        <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3.5 text-center text-[11px] font-bold text-[#6B7280] uppercase tracking-wider w-24">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-[#F3F4F6] text-xs">
                                    {departments && departments.length > 0 ? (
                                        departments.map((dept, index) => (
                                            <tr key={dept.id} className="hover:bg-[#F9FAFB]/80 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] font-medium">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link 
                                                        href={route('departments.employees', dept.id)} 
                                                        className="font-semibold text-[#111827] hover:text-[#007AFF] transition-colors"
                                                    >
                                                        {dept.nama_departemen}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link 
                                                        href={route('departments.employees', dept.id)}
                                                        className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-[#007AFF] hover:bg-blue-100 rounded-lg transition-colors inline-block"
                                                    >
                                                        {dept.employees_count || 0} Orang
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 text-[11px] font-medium rounded-lg ${dept.status === 'Aktif' || !dept.status ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                        {dept.status || 'Aktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center space-x-1.5">
                                                        <button
                                                            onClick={() => handleEdit(dept)}
                                                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(dept.id, dept.nama_departemen)}
                                                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-[#9CA3AF] font-medium">
                                                Belum ada data departemen.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}