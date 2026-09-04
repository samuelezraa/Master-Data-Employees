import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ employee }) {
    const initials = employee.nama ? employee.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 p-6">
            <Head title={`Detail Karyawan - ${employee.nama}`} />

            <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Detail Profil Karyawan</h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Master Data / Karyawan / <span className="text-indigo-600 font-medium">Detail</span>
                        </p>
                    </div>
                    <Link
                        href={route('employees.index')}
                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
                    >
                        Kembali ke Daftar
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
                        <div className="w-16 h-16 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{employee.nama}</h2>
                            <p className="text-xs text-slate-400 mt-0.5">NIK: {employee.nik_karyawan}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Departemen</span>
                            <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                                {employee.department ? employee.department.nama_departemen : '-'}
                            </span>
                        </div>

                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Jabatan</span>
                            <span className="font-semibold text-slate-800 bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md inline-block">
                                {employee.position ? employee.position.nama_jabatan : '-'}
                            </span>
                        </div>

                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">No. Telepon</span>
                            <span className="text-slate-800 font-medium">{employee.no_telepon || '-'}</span>
                        </div>

                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Email</span>
                            <span className="text-slate-800 font-medium">{employee.email || '-'}</span>
                        </div>

                        <div className="md:col-span-2">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Tanggal Masuk</span>
                            <span className="text-slate-800 font-medium">
                                {employee.tanggal_masuk ? new Date(employee.tanggal_masuk).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                        <Link
                            href={route('employees.edit', employee.id)}
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition shadow-sm"
                        >
                            Edit Karyawan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}