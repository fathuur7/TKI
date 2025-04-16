import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Ringkasan' },
        { id: 'facilities', label: 'Fasilitas' },
        { id: 'labs', label: 'Laboratorium' },
        { id: 'academics', label: 'Akademik' },
        { id: 'research', label: 'Penelitian' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* First UNESA Library Image */}
                        <img 
                            src="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/1061/2024/05/15/IMG-20240515-WA0006-2623029425.jpg" 
                            alt="Perpustakaan UNESA" 
                            className="absolute inset-0 size-full object-cover"
                        />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* Second UNESA rapat Image */}
                        <img 
                            src="https://www.uksw.edu/wp-content/uploads/2024/09/Suasana-kunjungan-benchmarking-UKSW-ke-Universitas-Negeri-Surabaya-Unesa-Senin-23-09-2024.-6-1024x576.jpg"
                            alt="Koleksi Digital UNESA" 
                            className="absolute inset-0 size-full object-cover"
                        />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* UNESA Campus Image */}
                        <img 
                            src="https://www.unesa.ac.id/images/foto-07-07-2022-01-13-58-1019.png" 
                            alt="Kampus UNESA" 
                            className="absolute inset-0 size-full object-cover"
                        />
                    </div>
                </div>                
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="border-b border-gray-200 px-4">
                        <nav className="flex -mb-px space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 text-sm font-medium ${
                                        activeTab === tab.id
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Selamat Datang di Universitas Negeri Surabaya (UNESA)</h2>
                                <p className="text-gray-700">
                                    UNESA, yang secara resmi dikenal sebagai Universitas Negeri Surabaya, adalah salah satu universitas negeri terkemuka di Indonesia yang berlokasi di Surabaya, Jawa Timur. Didirikan pada tahun 1964, UNESA telah berkembang menjadi institusi terkemuka dalam pendidikan, penelitian, dan pengabdian masyarakat.
                                </p>
                                
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-lg text-blue-800">12 Fakultas</h3>
                                        <p className="text-blue-600">Menawarkan berbagai program sarjana dan pascasarjana</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-lg text-green-800">Fasilitas Modern</h3>
                                        <p className="text-green-600">Laboratorium dan ruang belajar berteknologi tinggi</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-lg text-purple-800">Keunggulan Penelitian</h3>
                                        <p className="text-purple-600">Penelitian terdepan di bidang pendidikan dan ilmu terapan</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-lg">Acara Mendatang</h3>
                                    <ul className="mt-2 space-y-2">
                                        <li className="flex justify-between">
                                            <span>Simposium Penelitian Tahunan</span>
                                            <span className="text-gray-500">20 Mei 2025</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Konferensi Pendidikan Internasional</span>
                                            <span className="text-gray-500">5-7 Juni 2025</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Pameran Inovasi Mahasiswa</span>
                                            <span className="text-gray-500">15 Juni 2025</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'facilities' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Fasilitas Kampus</h2>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-blue-50 p-4">
                                            <h3 className="text-xl font-bold text-blue-800">Perpustakaan Pusat</h3>
                                        </div>
                                        <div className="p-4">
                                            <p>Perpustakaan Pusat UNESA menyimpan lebih dari 500.000 volume fisik dan menyediakan akses ke berbagai koleksi digital dan jurnal. Gedung enam lantai ini dilengkapi dengan ruang belajar kolaboratif, ruang belajar individu, laboratorium komputer, dan sumber daya multimedia.</p>
                                            <div className="mt-3 flex items-center text-sm text-blue-600">
                                                <span>Jam Operasional: 08:00 - 21:00 (Senin-Jumat)</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-green-50 p-4">
                                            <h3 className="text-xl font-bold text-green-800">Kompleks Olahraga</h3>
                                        </div>
                                        <div className="p-4">
                                            <p>Kompleks olahraga mencakup kolam renang berukuran olimpiade, gimnasium indoor, beberapa lapangan outdoor, lapangan sepak bola, dan pusat kebugaran lengkap. Fasilitas ini mendukung program akademik pendidikan jasmani dan kegiatan rekreasi.</p>
                                            <div className="mt-3 flex items-center text-sm text-green-600">
                                                <span>Tersedia untuk penggunaan mahasiswa dengan ID yang valid</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-purple-50 p-4">
                                            <h3 className="text-xl font-bold text-purple-800">Pusat Mahasiswa</h3>
                                        </div>
                                        <div className="p-4">
                                            <p>Pusat Mahasiswa UNESA berfungsi sebagai pusat kegiatan organisasi mahasiswa. Gedung ini memiliki ruang pertemuan, ruang pertunjukan, food court, dan kantor untuk pemerintahan mahasiswa dan organisasi kampus.</p>
                                            <div className="mt-3 flex items-center text-sm text-purple-600">
                                                <span>Rumah bagi lebih dari 50 organisasi mahasiswa</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-amber-50 p-4">
                                            <h3 className="text-xl font-bold text-amber-800">Pusat Teknologi</h3>
                                        </div>
                                        <div className="p-4">
                                            <p>Pusat Teknologi UNESA menyediakan layanan TI komprehensif untuk seluruh komunitas kampus. Pusat ini dilengkapi dengan internet kecepatan tinggi, perangkat lunak khusus, dukungan teknis, dan ruang inovasi digital.</p>
                                            <div className="mt-3 flex items-center text-sm text-amber-600">
                                                <span>Akses 24/7 ke sumber daya komputasi</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'labs' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Laboratorium Penelitian</h2>
                                <p className="text-gray-700">
                                    UNESA memiliki fasilitas laboratorium canggih yang mendukung penelitian terdepan dan pembelajaran praktis di berbagai disiplin ilmu.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-xl text-blue-800">Laboratorium Teknik</h3>
                                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Material Canggih</h4>
                                                <p className="text-sm text-gray-600 mt-1">Penelitian tentang material baru, komposit, dan teknik karakterisasi material.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung A, Ruang 301</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Robotika & Otomasi</h4>
                                                <p className="text-sm text-gray-600 mt-1">Pengembangan sistem cerdas, robotika, dan teknologi otomasi.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung A, Ruang 305</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Teknik Lingkungan</h4>
                                                <p className="text-sm text-gray-600 mt-1">Penelitian tentang pengolahan air, kualitas udara, dan teknologi berkelanjutan.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung B, Ruang 201</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Teknik Struktur</h4>
                                                <p className="text-sm text-gray-600 mt-1">Pengujian dan analisis material konstruksi dan sistem struktural.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung C, Ruang 110</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-xl text-green-800">Laboratorium Sains</h3>
                                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Biologi Molekuler</h4>
                                                <p className="text-sm text-gray-600 mt-1">Analisis DNA, studi ekspresi gen, dan penelitian bioteknologi.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung Sains, Ruang 205</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Kimia Analitik</h4>
                                                <p className="text-sm text-gray-600 mt-1">Analisis kimia menggunakan instrumentasi dan teknik canggih.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung Sains, Ruang 215</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Penelitian Fisika</h4>
                                                <p className="text-sm text-gray-600 mt-1">Penelitian di bidang optik, fisika material, dan fisika teoritis.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung Sains, Ruang 310</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Ilmu Bumi</h4>
                                                <p className="text-sm text-gray-600 mt-1">Studi geologi, penelitian iklim, dan pemantauan lingkungan.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung Sains, Ruang 320</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-xl text-purple-800">Lab Komputer & Digital</h3>
                                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab AI & Machine Learning</h4>
                                                <p className="text-sm text-gray-600 mt-1">Penelitian tentang kecerdasan buatan, deep learning, dan data science.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung ICT, Ruang 401</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Jaringan Komputer</h4>
                                                <p className="text-sm text-gray-600 mt-1">Arsitektur jaringan, keamanan, dan sistem komunikasi canggih.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung ICT, Ruang 405</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Studio Media Digital</h4>
                                                <p className="text-sm text-gray-600 mt-1">Produksi multimedia, animasi, dan pembuatan konten digital.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung ICT, Ruang 410</p>
                                            </div>
                                            <div className="border p-3 rounded bg-white">
                                                <h4 className="font-semibold">Lab Rekayasa Perangkat Lunak</h4>
                                                <p className="text-sm text-gray-600 mt-1">Pengembangan perangkat lunak, pengujian, dan penelitian jaminan kualitas.</p>
                                                <p className="text-xs text-gray-500 mt-2">Gedung ICT, Ruang 415</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'academics' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Program Akademik</h2>
                                <p className="text-gray-700">
                                    UNESA menawarkan program akademik komprehensif di berbagai disiplin ilmu pada tingkat sarjana, pascasarjana, dan doktoral.
                                </p>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-blue-50 p-4">
                                            <h3 className="text-xl font-bold text-blue-800">Fakultas Pendidikan</h3>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-2">
                                                <li>Pendidikan Dasar</li>
                                                <li>Pendidikan Menengah</li>
                                                <li>Pendidikan Khusus</li>
                                                <li>Psikologi Pendidikan</li>
                                                <li>Kurikulum & Pengajaran</li>
                                                <li>Kepemimpinan Pendidikan</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-green-50 p-4">
                                            <h3 className="text-xl font-bold text-green-800">Fakultas Teknik</h3>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-2">
                                                <li>Teknik Sipil</li>
                                                <li>Teknik Elektro</li>
                                                <li>Teknik Mesin</li>
                                                <li>Teknik Kimia</li>
                                                <li>Teknik Industri</li>
                                                <li>Teknik Informatika</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-purple-50 p-4">
                                            <h3 className="text-xl font-bold text-purple-800">Fakultas Ilmu Pengetahuan Alam</h3>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-2">
                                                <li>Matematika</li>
                                                <li>Fisika</li>
                                                <li>Kimia</li>
                                                <li>Biologi</li>
                                                <li>Statistika</li>
                                                <li>Ilmu Komputer</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-amber-50 p-4">
                                            <h3 className="text-xl font-bold text-amber-800">Fakultas Ekonomi & Bisnis</h3>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-2">
                                                <li>Ekonomi</li>
                                                <li>Manajemen</li>
                                                <li>Akuntansi</li>
                                                <li>Administrasi Bisnis</li>
                                                <li>Bisnis Digital</li>
                                                <li>Bisnis Internasional</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-lg">Kalender Akademik 2025</h3>
                                    <div className="mt-2 grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium">Semester Genap</h4>
                                            <ul className="mt-1 text-sm space-y-1">
                                                <li>Mulai Perkuliahan: 3 Februari 2025</li>
                                                <li>Libur Tengah Semester: 17-21 Maret 2025</li>
                                                <li>Ujian Akhir: 26 Mei-6 Juni 2025</li>
                                                <li>Akhir Semester: 13 Juni 2025</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Semester Ganjil</h4>
                                            <ul className="mt-1 text-sm space-y-1">
                                                <li>Mulai Perkuliahan: 1 September 2025</li>
                                                <li>Libur Tengah Semester: 20-24 Oktober 2025</li>
                                                <li>Ujian Akhir: 8-19 Desember 2025</li>
                                                <li>Akhir Semester: 23 Desember 2025</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'research' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Penelitian & Inovasi</h2>
                                <p className="text-gray-700">
                                    UNESA berkomitmen untuk mengembangkan pengetahuan melalui penelitian inovatif di berbagai disiplin ilmu.
                                </p>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-blue-50 p-4">
                                            <h3 className="text-xl font-bold text-blue-800">Pusat Penelitian</h3>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div>
                                                <h4 className="font-medium">Pusat Inovasi Pendidikan</h4>
                                                <p className="text-sm text-gray-600">Perintisan pendekatan baru dalam pengajaran dan pembelajaran</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Pusat Pembangunan Berkelanjutan</h4>
                                                <p className="text-sm text-gray-600">Penelitian tentang konservasi lingkungan dan keberlanjutan</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Pusat Teknologi Digital</h4>
                                                <p className="text-sm text-gray-600">Memajukan transformasi digital dan integrasi teknologi</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Pusat Kebijakan Publik</h4>
                                                <p className="text-sm text-gray-600">Penelitian berbasis bukti untuk pengembangan kebijakan</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg overflow-hidden">
                                        <div className="bg-green-50 p-4">
                                            <h3 className="text-xl font-bold text-green-800">Pencapaian Penelitian</h3>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div>
                                                <h4 className="font-medium">215+ Publikasi Internasional</h4>
                                                <p className="text-sm text-gray-600">Di jurnal terkemuka selama tahun 2024</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">45 Paten Terdaftar</h4>
                                                <p className="text-sm text-gray-600">Inovasi di berbagai disiplin ilmu</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">30+ Kolaborasi Penelitian</h4>
                                                <p className="text-sm text-gray-600">Dengan universitas dan institusi internasional</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">12 Penghargaan Penelitian</h4>
                                                <p className="text-sm text-gray-600">Pengakuan nasional dan internasional</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-lg">Proyek Penelitian Unggulan</h3>
                                    <div className="mt-4 space-y-4">
                                        <div className="bg-white p-3 border rounded">
                                            <h4 className="font-medium text-blue-800">Teknologi Pendidikan Inovatif</h4>
                                            <p className="text-sm mt-1">Mengembangkan dan menguji alat digital baru untuk meningkatkan pengalaman belajar di berbagai tingkat pendidikan.</p>
                                            <div className="mt-2 flex items-center text-xs text-gray-500">
                                                <span>Peneliti Utama: Dr. Surya Wijaya • Fakultas Pendidikan</span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-3 border rounded">
                                            <h4 className="font-medium text-green-800">Pembangunan Perkotaan Berkelanjutan</h4>
                                            <p className="text-sm mt-1">Meneliti praktik berkelanjutan untuk pembangunan perkotaan di Jawa Timur.</p>
                                            <div className="mt-2 flex items-center text-xs text-gray-500">
                                                <span>Peneliti Utama: Dr. Bambang Sutrisno • Fakultas Teknik</span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-3 border rounded">
                                            <h4 className="font-medium text-purple-800">Material Canggih untuk Penyimpanan Energi</h4>
                                            <p className="text-sm mt-1">Pengembangan material baru untuk teknologi baterai generasi mendatang.</p>
                                            <div className="mt-2 flex items-center text-xs text-gray-500">
                                                <span>Peneliti Utama: Dr. Ratna Dewi • Fakultas Ilmu Pengetahuan Alam</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}