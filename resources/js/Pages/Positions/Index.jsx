import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Index({ positions }) {
    const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
        id: '',
        nama_jabatan: '',
        gaji_pokok: '',
        tunjangan: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('positions.update', data.id), {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    Swal.fire('Berhasil!', 'Data jabatan diperbarui.', 'success');
                },
            });
        } else {
            post(route('positions.store'), {
                onSuccess: () => {
                    reset();
                    Swal.fire('Berhasil!', 'Jabatan baru ditambahkan.', 'success');
                },
            });
        }
    };

    const handleEdit = (pos) => {
        setIsEditing(true);
        setData({
            id: pos.id,
            nama_jabatan: pos.nama_jabatan,
            gaji_pokok: pos.gaji_pokok || '',
            tunjangan: pos.tunjangan || '',
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    const confirmDelete = (id, nama) => {
        Swal.fire({
            title: 'Hapus Jabatan?',
            text: `Jabatan ${nama} akan dihapus dari sistem.`,
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
                destroy(route('positions.destroy', id));
            }
        });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
    };

    return (
        <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased p-4 md:p-8">
            <Head title="Kelola Jabatan & Gaji" />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-[#E5E5EA] -mx-4 -mt-4 p-4 md:mx-0 md:mt-0 md:rounded-2xl md:border md:shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1C1E]">Kelola Jabatan & Gaji</h1>
                        <p className="text-xs text-[#8E8E93] mt-0.5">
                            Master Data / <span className="text-[#007AFF] font-medium">Jabatan</span>
                        </p>
                    </div>
                    <Link
                        href={route('employees.index')}
                        className="bg-[#F2F2F7] text-[#3A3A3C] px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#E5E5EA] transition"
                    >
                        Kembali ke Karyawan
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Input / Edit */}
                    <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#E5E5EA] h-fit space-y-4">
                        <h2 className="text-base font-semibold text-[#1C1C1E]">
                            {isEditing ? 'Edit Jabatan' : 'Tambah Jabatan Baru'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Nama Jabatan</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Senior Developer"
                                    value={data.nama_jabatan}
                                    onChange={(e) => setData('nama_jabatan', e.target.value)}
                                    className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                                />
                                {errors.nama_jabatan && <div className="text-[#FF3B30] text-xs mt-1">{errors.nama_jabatan}</div>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Gaji Pokok (Rp)</label>
                                <input
                                    type="number"
                                    placeholder="Contoh: 5000000"
                                    value={data.gaji_pokok}
                                    onChange={(e) => setData('gaji_pokok', e.target.value)}
                                    className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                                />
                                {errors.gaji_pokok && <div className="text-[#FF3B30] text-xs mt-1">{errors.gaji_pokok}</div>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Tunjangan (Rp)</label>
                                <input
                                    type="number"
                                    placeholder="Contoh: 1000000"
                                    value={data.tunjangan}
                                    onChange={(e) => setData('tunjangan', e.target.value)}
                                    className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                                />
                                {errors.tunjangan && <div className="text-[#FF3B30] text-xs mt-1">{errors.tunjangan}</div>}
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#007AFF] text-white px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#0062cc] transition shadow-xs"
                                >
                                    {isEditing ? 'Perbarui' : 'Simpan'}
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-[#F2F2F7] border border-[#E5E5EA] text-[#3A3A3C] px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#E5E5EA] transition"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table List */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-[#E5E5EA] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-[#E5E5EA]">
                                <thead className="bg-[#F2F2F7]/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider w-16">No</th>
                                        <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Jabatan</th>
                                        <th className="px-6 py-3 text-left text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Gaji Pokok & Tunjangan</th>
                                        <th className="px-6 py-3.5 text-center text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">Pegawai</th>
                                        <th className="px-6 py-3 text-center text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider w-24">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-[#E5E5EA] text-sm">
                                    {positions && positions.length > 0 ? (
                                        positions.map((pos, index) => (
                                            <tr key={pos.id} className="hover:bg-[#F2F2F7]/40 transition">
                                                <td className="px-6 py-3.5 whitespace-nowrap text-[#8E8E93] text-xs">{index + 1}</td>
                                                <td className="px-6 py-3.5 whitespace-nowrap font-medium text-[#1C1C1E]">
                                                    {pos.nama_jabatan}
                                                </td>
                                                <td className="px-6 py-3.5 whitespace-nowrap">
                                                    <div className="text-xs font-semibold text-[#1C1C1E]">{formatRupiah(pos.gaji_pokok)}</div>
                                                    <div className="text-[11px] text-[#8E8E93]">Tunjangan: {formatRupiah(pos.tunjangan)}</div>
                                                </td>
                                                <td className="px-6 py-3.5 whitespace-nowrap text-center">
                                                    <span className="px-2.5 py-1 text-[11px] font-medium bg-[#007AFF]/10 text-[#007AFF] rounded-lg">
                                                        {pos.employees_count || 0} Orang
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3.5 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <button
                                                            onClick={() => handleEdit(pos)}
                                                            className="p-1.5 text-[#FF9500] hover:bg-[#FF9500]/10 rounded-lg transition"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(pos.id, pos.nama_jabatan)}
                                                            className="p-1.5 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition"
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
                                            <td colSpan="5" className="px-6 py-12 text-center text-[#8E8E93]">
                                                Belum ada data jabatan.
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