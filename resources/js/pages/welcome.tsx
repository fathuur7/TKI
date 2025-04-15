import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth  } = usePage<SharedData>().props;
    const userCount = usePage().props.userCount || 0;
    
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-[#1b1b18] dark:text-[#EDEDEC]">
                                        {auth.user.name}
                                    </span>
                                    <span className="text-[#1b1b18] dark:text-[#EDEDEC]">|</span>   
                                    <span className="text-[#1b1b18] dark:text-[#EDEDEC]">
                                        {auth.user.email}
                                    </span>
                                </div>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
                    <div className="w-full max-w-3xl px-4">
                        {/* Hero Section */}
                        <div className="mb-12">
                            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600 dark:bg-gray-800 dark:text-blue-400">
                                    SK
                                </div>
                            </div>
                            <h1 className="mb-4 text-5xl font-bold tracking-tight">SkripsiKu</h1>
                            <p className="mx-auto mb-8 max-w-lg text-xl text-gray-600 dark:text-gray-300">
                                Selamat datang di portal referensi skripsi terlengkap untuk mahasiswa Indonesia
                            </p>

                            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Mulai Pencarian
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Tentang Kami
                                </Link>
                            </div>
                        </div>
                        
                        {/* Features Section */}
                        <div className="mt-16">
                            <h2 className="mb-8 text-2xl font-semibold">Fitur Unggulan</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium">Pencarian Cepat</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Temukan skripsi yang relevan dalam hitungan detik</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium">Koleksi Lengkap</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Ribuan skripsi dari berbagai universitas di Indonesia</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium">Akses Terjamin</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Dokumen asli dengan sumber yang terpercaya</p>
                                </div>
                            </div>
                        </div>

                        {/* Statistics Section */}
                        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-3 text-4xl font-bold text-blue-600 dark:text-blue-400">5,000+</div>
                                <div className="text-gray-600 dark:text-gray-300">Skripsi</div>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-3 text-4xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                                <div className="text-gray-600 dark:text-gray-300">Universitas</div>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-3 text-4xl font-bold text-blue-600 dark:text-blue-400">
                                {String(userCount)}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">Pengguna</div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-16 w-full max-w-3xl text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} SkripsiKu. All rights reserved.</p>
                    <div className="mt-3">
                        <a href="#" className="mx-2 hover:text-gray-700 dark:hover:text-gray-300">Tentang</a>
                        <a href="#" className="mx-2 hover:text-gray-700 dark:hover:text-gray-300">Kontak</a>
                        <a href="#" className="mx-2 hover:text-gray-700 dark:hover:text-gray-300">Bantuan</a>
                        <a href="#" className="mx-2 hover:text-gray-700 dark:hover:text-gray-300">Kebijakan Privasi</a>
                    </div>
                </footer>
            </div>
        </>
    );
}