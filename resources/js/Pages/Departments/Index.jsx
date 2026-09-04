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
                    Swal.fire('Berhasil!', 'Data departemen diperbarui.', 'success');
                },
            });
        } else {
            post(route('departments.store'), {
                onSuccess: () => {
                    reset();
                    Swal.fire('Berhasil!', 'Departemen baru ditambahkan.', 'success');
                },
            });
        }
    };

    const handleEdit = (dept) => {
        setIsEditing(true);
        setData({
            id: dept.id,
            nama_departemen: dept.nama_departemen,
            status: dept.status,
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    const confirmDelete = (id, nama) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Departemen ${nama} akan dihapus!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('departments.destroy', id), {
                    onError: (err) => Swal.fire('Gagal!', err.error || 'Terjadi kesalahan.', 'error'),
                    onSuccess: () => Swal.fire('Terhapus!', 'Departemen berhasil dihapus.', 'success'),
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 p-6">
            <Head title="Kelola Departemen" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Kelola Departemen</h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Master Data / <span className="text-indigo-600 font-medium">Departemen</span>
                        </p>
                    </div>
                    <Link
                        href={route('employees.index')}
                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                    >
                        Kembali ke Karyawan
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Input / Edit */}
                    <div className="bg-white p-6 rounded-xl shadow-sm h-fit space-y-4">
                        <h2 className="text-lg font-bold text-slate-800">
                            {isEditing ? 'Edit Departemen' : 'Tambah Departemen'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nama Departemen</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: HR & Legal"
                                    value={data.nama_departemen}
                                    onChange={(e) => setData('nama_departemen', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.nama_departemen && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.nama_departemen}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-slate-600"
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                                {errors.status && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.status}</div>}
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
                                >
                                    {isEditing ? 'Perbarui' : 'Simpan'}
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table List */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">No</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Nama Departemen</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Jumlah Karyawan</th>
                                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 text-sm">
                                {departments && departments.length > 0 ? (
                                    departments.map((dept, index) => (
                                        <tr key={dept.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-500">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">
                                                {dept.nama_departemen}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                                <span className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-md">
                                                    {dept.employees_count || 0} Orang
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${dept.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                    {dept.status || 'Aktif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center space-x-1.5">
                                                    <button
                                                        onClick={() => handleEdit(dept)}
                                                        className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDelete(dept.id, dept.nama_departemen)}
                                                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
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
                                        <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
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
    );
}