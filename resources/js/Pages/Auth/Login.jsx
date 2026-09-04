import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased flex items-center justify-center p-4">
            <Head title="Login Admin" />

            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xs border border-[#E5E5EA] space-y-6">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight text-[#1C1C1E]">Admin Login</h1>
                    <p className="text-xs text-[#8E8E93]">Sistem Manajemen Karyawan & Penggajian</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="admin@saloka.com"
                            className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                        />
                        {errors.email && <div className="text-[#FF3B30] text-xs mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm px-3.5 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                        />
                        {errors.password && <div className="text-[#FF3B30] text-xs mt-1">{errors.password}</div>}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-[#E5E5EA] text-[#007AFF] focus:ring-[#007AFF]"
                            />
                            <span className="text-[#3A3A3C]">Ingat Saya</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#007AFF] text-white py-3 rounded-xl text-xs font-medium hover:bg-[#0062cc] transition shadow-xs mt-2"
                    >
                        Masuk ke Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}