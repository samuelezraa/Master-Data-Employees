import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ employees, selectedDate }) {
    const { data, setData, post, processing } = useForm({
        tanggal: selectedDate,
        employee_id: '',
        jam_masuk: '08:00',
        jam_keluar: '17:00',
        status: 'Hadir',
        keterangan: '',
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter tanggal berubah
    const handleDateChange = (e) => {
        const date = e.target.value;
        window.location.href = route('attendances.index', { tanggal: date });
    };

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        const existingAttendance = employee.attendances && employee.attendances.length > 0 ? employee.attendances[0] : null;
        
        setData({
            tanggal: selectedDate,
            employee_id: employee.id,
            jam_masuk: existingAttendance ? existingAttendance.jam_masuk || '08:00' : '08:00',
            jam_keluar: existingAttendance ? existingAttendance.jam_keluar || '17:00' : '17:00',
            status: existingAttendance ? existingAttendance.status : 'Hadir',
            keterangan: existingAttendance ? existingAttendance.keterangan || '' : '',
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('attendances.storeOrUpdate'), {
            onSuccess: () => {
                setIsModalOpen(false);
            },
        });
    };

    // Hitung statistik ringkas untuk kartu statistik di atas
    const totalKaryawan = employees ? employees.length : 0;
    const totalHadir = employees ? employees.filter(emp => emp.attendances?.[0]?.status === 'Hadir').length : 0;
    const totalTerlambat = employees ? employees.filter(emp => emp.attendances?.[0]?.status === 'Terlambat').length : 0;
    const totalIzinSakit = employees ? employees.filter(emp => ['Izin', 'Sakit'].includes(emp.attendances?.[0]?.status)).length : 0;
    const totalAlpha = totalKaryawan - (totalHadir + totalTerlambat + totalIzinSakit);

    const getStatusBadge = (attendances) => {
        if (!attendances || attendances.length === 0) {
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">Alpha</span>;
        }
        const status = attendances[0].status;
        const badges = {
            Hadir: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
            Terlambat: 'bg-amber-50 text-amber-600 border border-amber-200',
            Izin: 'bg-blue-50 text-blue-600 border border-blue-200',
            Sakit: 'bg-purple-50 text-purple-600 border border-purple-200',
            Alpha: 'bg-rose-50 text-rose-600 border border-rose-200',
        };
        return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badges[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 p-6">
            <Head title="Rekapitulasi Absensi Karyawan" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Absensi & Kehadiran Karyawan</h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Jam Kerja: <span className="font-semibold text-slate-700">08:00 - 17:00</span> (Toleransi Keterlambatan s/d <span className="font-semibold text-amber-600">08:15</span>)
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="border-slate-200 rounded-xl text-sm shadow-xs focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 px-3 py-2"
                        />
                        <Link
                            href={route('employees.index')}
                            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition shadow-xs"
                        >
                            Data Karyawan
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Karyawan</span>
                        <span className="text-xl font-bold text-slate-800 mt-2">{totalKaryawan}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Hadir Tepat Waktu</span>
                        <span className="text-xl font-bold text-emerald-700 mt-2">{totalHadir}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Terlambat</span>
                        <span className="text-xl font-bold text-amber-700 mt-2">{totalTerlambat}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Izin / Sakit</span>
                        <span className="text-xl font-bold text-blue-700 mt-2">{totalIzinSakit}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between col-span-2 md:col-span-1">
                        <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Alpha / Tanpa Ket.</span>
                        <span className="text-xl font-bold text-rose-700 mt-2">{totalAlpha}</span>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/75 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="p-4 pl-6">No</th>
                                    <th className="p-4">Karyawan</th>
                                    <th className="p-4">Departemen & Jabatan</th>
                                    <th className="p-4">Jam Masuk</th>
                                    <th className="p-4">Jam Keluar</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Keterangan</th>
                                    <th className="p-4 pr-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {employees && employees.length > 0 ? (
                                    employees.map((emp, index) => {
                                        const att = emp.attendances && emp.attendances.length > 0 ? emp.attendances[0] : null;
                                        return (
                                            <tr key={emp.id} className="hover:bg-slate-50/50 transition">
                                                <td className="p-4 pl-6 text-slate-500 font-medium">{index + 1}</td>
                                                <td className="p-4">
                                                    <div className="font-semibold text-slate-900">{emp.nama}</div>
                                                    <div className="text-xs text-slate-400">NIK: {emp.nik_karyawan}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-slate-700 font-medium">{emp.department ? emp.department.nama_departemen : '-'}</div>
                                                    <div className="text-xs text-indigo-600 font-medium">{emp.position ? emp.position.nama_jabatan : '-'}</div>
                                                </td>
                                                <td className="p-4 font-mono text-xs text-slate-600 bg-slate-50/30 rounded">{att ? att.jam_masuk || '-' : '-'}</td>
                                                <td className="p-4 font-mono text-xs text-slate-600 bg-slate-50/30 rounded">{att ? att.jam_keluar || '-' : '-'}</td>
                                                <td className="p-4">{getStatusBadge(emp.attendances)}</td>
                                                <td className="p-4 text-slate-500 italic max-w-xs truncate">{att ? att.keterangan || '-' : '-'}</td>
                                                <td className="p-4 pr-6 text-center">
                                                    <button
                                                        onClick={() => openModal(emp)}
                                                        className="bg-indigo-50 text-indigo-600 px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition shadow-xs"
                                                    >
                                                        Kelola Absen
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="p-12 text-center text-slate-400">
                                            Belum ada data karyawan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Input/Update Absen */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5 border border-slate-100">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Form Absensi Harian</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{selectedEmployee?.nama} • {selectedDate}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Jam Masuk</label>
                                    <input
                                        type="time"
                                        value={data.jam_masuk}
                                        onChange={(e) => setData('jam_masuk', e.target.value)}
                                        className="w-full border-slate-200 rounded-xl text-sm shadow-xs focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Jam Keluar</label>
                                    <input
                                        type="time"
                                        value={data.jam_keluar}
                                        onChange={(e) => setData('jam_keluar', e.target.value)}
                                        className="w-full border-slate-200 rounded-xl text-sm shadow-xs focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50"
                                    />
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400">Masuk &gt; 08:15 otomatis tercatat <span className="text-amber-600 font-semibold">Terlambat</span>.</p>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status Kehadiran</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border-slate-200 rounded-xl text-sm shadow-xs focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50"
                                >
                                    <option value="Hadir">Hadir</option>
                                    <option value="Terlambat">Terlambat</option>
                                    <option value="Izin">Izin</option>
                                    <option value="Sakit">Sakit</option>
                                    <option value="Alpha">Alpha</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Keterangan (Opsional)</label>
                                <textarea
                                    rows="2"
                                    placeholder="Contoh: Terjebak macet / Surat dokter terlampir"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    className="w-full border-slate-200 rounded-xl text-sm shadow-xs focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50"
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
                                >
                                    Simpan Absen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}