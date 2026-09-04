import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Index({ payrolls, filters }) {
    const { data, setData, post, processing } = useForm({
        bulan_tahun: filters?.bulan_tahun || new Date().toISOString().slice(0, 7),
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('payrolls.index'), { bulan_tahun: data.bulan_tahun }, { preserveState: true, replace: true });
    };

    const handleGenerate = () => {
        Swal.fire({
            title: 'Generate Gaji Bulanan?',
            text: `Sistem akan menghitung gaji dan potongan absensi otomatis untuk periode ${data.bulan_tahun}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#007AFF',
            cancelButtonColor: '#8E8E93',
            confirmButtonText: 'Ya, Generate',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'rounded-xl px-4 py-2 text-sm font-medium',
                cancelButton: 'rounded-xl px-4 py-2 text-sm font-medium'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('payrolls.generate'), { bulan_tahun: data.bulan_tahun }, {
                    onSuccess: () => {
                        Swal.fire('Berhasil!', 'Data penggajian berhasil digenerate.', 'success');
                    }
                });
            }
        });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
    };

    return (
        <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased p-4 md:p-8">
            <Head title="Manajemen Penggajian" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white/85 backdrop-blur-md sticky top-0 z-20 border-b border-[#E5E5EA] -mx-4 -mt-4 p-4 md:mx-0 md:mt-0 md:rounded-2xl md:border md:shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1C1E]">Manajemen Penggajian (Payroll)</h1>
                        <p className="text-xs text-[#8E8E93] mt-0.5">
                            Keuangan / <span className="text-[#007AFF] font-medium">Penggajian Bulanan</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('employees.index')}
                            className="bg-[#F2F2F7] text-[#3A3A3C] px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#E5E5EA] transition"
                        >
                            Kembali ke Karyawan
                        </Link>
                    </div>
                </div>

                {/* Filter & Action Section */}
                <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#E5E5EA] flex flex-col md:flex-row justify-between items-center gap-4">
                    <form onSubmit={handleFilter} className="flex items-center gap-3 w-full md:w-auto">
                        <div>
                            <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">Periode Bulan</label>
                            <input
                                type="month"
                                value={data.bulan_tahun}
                                onChange={(e) => setData('bulan_tahun', e.target.value)}
                                className="bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                            />
                        </div>
                        <div className="flex items-end h-full pt-5">
                            <button
                                type="submit"
                                className="bg-[#1C1C1E] text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#3A3A3C] transition shadow-xs"
                            >
                                Tampilkan
                            </button>
                        </div>
                    </form>

                    <div className="flex items-end h-full pt-1 md:pt-5 w-full md:w-auto justify-end">
                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={processing}
                            className="bg-[#34C759] text-white px-5 py-2.5 rounded-xl text-xs font-medium hover:bg-[#2fb850] transition shadow-xs flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                            Generate Gaji Bulan Ini
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-xs border border-[#E5E5EA] overflow-hidden">
                    <div className="px-5 py-4 border-b border-[#E5E5EA] text-xs text-[#8E8E93] font-medium flex justify-between items-center bg-white">
                        <span>Total Pegawai Digaji: <span className="text-[#1C1C1E] font-semibold">{payrolls.length}</span> Orang</span>
                        <span className="text-[11px] text-[#8E8E93]">Periode: {data.bulan_tahun}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#E5E5EA]">
                            <thead className="bg-[#F2F2F7]/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider w-16">No</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Nama & Jabatan</th>
                                    <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Gaji Pokok</th>
                                    <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Tunjangan</th>
                                    <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Potongan</th>
                                    <th className="px-6 py-3 text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Gaji Bersih</th>
                                    <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#E5E5EA] text-sm">
                                {payrolls.length > 0 ? (
                                    payrolls.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-[#F2F2F7]/40 transition">
                                            <td className="px-6 py-3.5 whitespace-nowrap text-[#8E8E93] text-xs">{index + 1}</td>
                                            <td className="px-6 py-3.5 whitespace-nowrap">
                                                <div className="font-medium text-[#1C1C1E]">{item.employee?.nama || '-'}</div>
                                                <div className="text-[11px] text-[#8E8E93]">{item.employee?.position?.nama_jabatan || '-'}</div>
                                            </td>
                                            <td className="px-6 py-3.5 whitespace-nowrap text-right text-xs text-[#3A3A3C]">
                                                {formatRupiah(item.gaji_pokok)}
                                            </td>
                                            <td className="px-6 py-3.5 whitespace-nowrap text-right text-xs text-[#3A3A3C]">
                                                {formatRupiah(item.tunjangan)}
                                            </td>
                                            <td className="px-6 py-3.5 whitespace-nowrap text-right text-xs text-[#FF3B30]">
                                                - {formatRupiah(item.potongan)}
                                            </td>
                                            <td className="px-6 py-3.5 whitespace-nowrap text-right text-xs font-semibold text-[#1C1C1E]">
                                                {formatRupiah(item.gaji_bersih)}
                                            </td>
                                            <td className="px-6 py-3.5 whitespace-nowrap text-center">
                                                <span className={`px-2.5 py-1 text-[11px] font-medium rounded-lg ${item.status_pembayaran === 'Dibayar' ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#FF9500]/10 text-[#FF9500]'}`}>
                                                    {item.status_pembayaran}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-[#8E8E93]">
                                            Belum ada data penggajian untuk periode ini. Klik tombol <span className="text-[#007AFF] font-medium">"Generate Gaji Bulan Ini"</span> di atas.
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