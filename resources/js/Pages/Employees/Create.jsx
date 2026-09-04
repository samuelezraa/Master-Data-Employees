import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ departments, positions }) {
    const { data, setData, post, processing, errors } = useForm({
        nik_karyawan: '',
        nama: '',
        department_id: '',
        position_id: '',
        no_telepon: '',
        email: '',
        tanggal_masuk: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 p-6">
            <Head title="Tambah Karyawan" />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Tambah Data Karyawan</h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Master Data / Karyawan / <span className="text-indigo-600 font-medium">Tambah</span>
                        </p>
                    </div>
                    <Link
                        href={route('employees.index')}
                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                    >
                        Kembali
                    </Link>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">NIK Karyawan</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: IT-2026-001"
                                    value={data.nik_karyawan}
                                    onChange={(e) => setData('nik_karyawan', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.nik_karyawan && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.nik_karyawan}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    placeholder="Nama lengkap karyawan"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.nama && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.nama}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Departemen</label>
                                <select
                                    value={data.department_id}
                                    onChange={(e) => setData('department_id', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-slate-600 bg-white"
                                >
                                    <option value="">-- Pilih Departemen --</option>
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
                                {errors.department_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.department_id}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Jabatan</label>
                                <select
                                    value={data.position_id}
                                    onChange={(e) => setData('position_id', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-slate-600 bg-white"
                                >
                                    <option value="">-- Pilih Jabatan --</option>
                                    {positions && positions.length > 0 ? (
                                        positions.map((pos) => (
                                            <option key={pos.id} value={pos.id}>
                                                {pos.nama_jabatan}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Data jabatan kosong</option>
                                    )}
                                </select>
                                {errors.position_id && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.position_id}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">No. Telepon</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: 081234567890"
                                    value={data.no_telepon}
                                    onChange={(e) => setData('no_telepon', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.no_telepon && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.no_telepon}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="email@saloka.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.email && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tanggal Masuk</label>
                            <input
                                type="date"
                                value={data.tanggal_masuk}
                                onChange={(e) => setData('tanggal_masuk', e.target.value)}
                                className="w-full border-slate-200 rounded-lg text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.tanggal_masuk && <div className="text-rose-500 text-xs mt-1 font-medium">{errors.tanggal_masuk}</div>}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-100 space-x-3">
                            <Link
                                href={route('employees.index')}
                                className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
                            >
                                Simpan Data
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}