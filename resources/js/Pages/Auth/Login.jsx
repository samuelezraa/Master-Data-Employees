import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

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
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#F2F2F7] border border-transparent rounded-xl text-sm pl-3.5 pr-10 py-2.5 text-[#1C1C1E] focus:bg-white focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1C1C1E] transition"
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
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