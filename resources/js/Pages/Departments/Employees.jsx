import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function DepartmentEmployees({ department, employees }) {
    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1E] font-sans antialiased p-4 md:p-8">
            <Head title={`Karyawan - ${department.nama_departemen}`} />
            
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white/90 backdrop-blur-xl border border-black/[0.06] rounded-2xl p-5 shadow-xs flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-[#111827]">Karyawan Departemen: {department.nama_departemen}</h1>
                        <p className="text-xs text-[#6B7280] mt-0.5 font-medium">
                            Master Data / Departemen / <span className="text-[#007AFF] font-semibold">Daftar Karyawan</span>
                        </p>
                    </div>
                    <Link
                        href={route('departments.index')}
                        className="bg-[#F3F4F6] text-[#374151] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#E5E7EB] transition-all"
                    >
                        Kembali
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xs border border-black/[0.06] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#F3F4F6]">
                            <thead className="bg-[#F9FAFB]">
                                <tr>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider w-16">No</th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">NIK & Nama Karyawan</th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Kontak</th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Tanggal Masuk</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#F3F4F6] text-xs">
                                {employees.data.length > 0 ? (
                                    employees.data.map((employee, index) => (
                                        <tr key={employee.id} className="hover:bg-[#F9FAFB]/80 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] font-medium">{employees.from + index}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#111827]">
                                                {employee.nama} <span className="text-[#9CA3AF] font-normal">({employee.nik_karyawan})</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">{employee.no_telepon || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[#4B5563]">
                                                {employee.tanggal_masuk ? new Date(employee.tanggal_masuk).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-[#9CA3AF] font-medium">
                                            Belum ada karyawan di departemen ini.
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