/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Terminal, 
  Code2, 
  Award, 
  Send, 
  Download, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  FileCode, 
  Copy, 
  Check, 
  GraduationCap, 
  Sparkles, 
  Laptop, 
  Coffee, 
  BookOpen, 
  Cpu, 
  ArrowUp,
  FileText,
  UserCheck,
  Target,
  Rocket,
  ShieldCheck,
  User
} from 'lucide-react';

export default function App() {
  // State manajemen
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState<'yellow' | 'cyan' | 'pink'>('yellow');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [windowMinimized, setWindowMinimized] = useState(false);
  
  // State Formulir Kontak
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Tanya-tanya Perkuliahan & Maba',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio API 8-Bit Retro Beep Generator
  const play8BitSfx = (freq = 440, type: OscillatorType = 'square', duration = 0.08) => {
    if (!sfxEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  };

  const handleGlobalClick = (freq = 520) => {
    play8BitSfx(freq, 'square', 0.05);
  };

  // Unduh Berkas Standalone web-porto/index.html
  const handleDownloadSingleFile = () => {
    play8BitSfx(620, 'square', 0.12);
    fetch('/web-porto/index.html')
      .then(res => res.text())
      .then(content => {
        const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        window.open('/web-porto/index.html', '_blank');
      });
  };

  // Unduh CV Text Generator (Updated 2026 & SMA Negeri 1 Kauman)
  const handleDownloadCV = () => {
    play8BitSfx(720, 'triangle', 0.15);
    const cvContent = `=====================================================
CURRICULUM VITAE - MAHASISWA BARU TEKNIK INFORMATIKA
=====================================================

1. DATA PRIBADI
- Nama Lengkap    : Bastio Septoaji
- NIM             : 26051204124
- Program Studi   : S1 Teknik Informatika
- Fakultas        : Fakultas Teknik
- Universitas     : Universitas Negeri Surabaya (UNESA)
- Angkatan        : 2026 / 2027
- Email           : 26051204124@mhs.unesa.ac.id
- GitHub          : https://github.com/bastioseptoaji
- LinkedIn        : https://linkedin.com/in/bastioseptoaji

2. RINGKASAN PROFIL
Saya adalah Bastio Septoaji, Mahasiswa Baru S1 Teknik Informatika di
Universitas Negeri Surabaya (UNESA) Angkatan 2026. Memiliki antusiasme
tinggi terhadap rekayasa perangkat lunak, algoritma pemrograman, dan
pengembangan web modern. Siap belajar dengan cepat, beradaptasi dengan
teknologi mutakhir, dan siap berkolaborasi dalam proyek inovatif serta
kompetisi mahasiswa.

3. KEAHLIAN & TEKNOLOGI
- Bahasa Pemrograman : C++, JavaScript (ES6+), Python, HTML5, CSS3
- Framework & Style  : Tailwind CSS, Neo-Brutalism, Responsive Web Design
- Tools & Software   : Git & GitHub, VS Code, Linux (Ubuntu/Bash), Figma, Notion

4. RIWAYAT PENDIDIKAN
- 2026 - Sekarang : S1 Teknik Informatika - Universitas Negeri Surabaya (UNESA)
- 2023 - 2026     : SMA Negeri 1 Kauman (Jurusan MIPA / IPA)

5. TARGET & ROADMAP PENCAPAIAN KAMPUS (2026/2027)
- Mempersiapkan diri untuk Kompetisi Mahasiswa Bidang TIK (Gemastik)
- Mengikuti Hackathon & Lomba Desain Web Nasional
- Mengambil Sertifikasi Kompetensi Internasional Software Engineering
- Berpartisipasi aktif dalam Program Kreativitas Mahasiswa (PKM)

=====================================================
Generated from Retro Revival Portfolio | ${new Date().toLocaleDateString('id-ID')}
=====================================================`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_Bastio_Septoaji_Informatika_UNESA.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Salin Kode Standalone
  const handleCopyStandaloneCode = async () => {
    try {
      const res = await fetch('/web-porto/index.html');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedCode(true);
      play8BitSfx(940, 'triangle', 0.2);
      setTimeout(() => setCopiedCode(false), 3000);
    } catch {
      alert("Gagal menyalin otomatis. Anda dapat mengunduh langsung filenya di folder /web-porto/index.html!");
    }
  };

  // Submit Formulir Kontak
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    play8BitSfx(880, 'sine', 0.15);
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setFormSuccess(true);
      play8BitSfx(1050, 'triangle', 0.25);
      setFormData({
        name: '',
        email: '',
        subject: 'Tanya-tanya Perkuliahan & Maba',
        message: ''
      });
      setTimeout(() => setFormSuccess(false), 6000);
    }, 700);
  };

  // Warna Background berdasarkan Theme Switcher
  const themeBgClasses = {
    yellow: 'bg-[#FEF08A]',
    cyan: 'bg-[#A5F3FC]',
    pink: 'bg-[#FBCFE8]'
  }[themeMode];

  return (
    <div className={`min-h-screen text-black bg-retro-dots ${themeBgClasses} transition-colors duration-200 selection:bg-[#F43F5E] selection:text-white pb-12`}>
      
      {/* FLOATING ACTION STRIP DI ATAS */}
      <div className="bg-black text-white px-4 py-2 border-b-4 border-black text-xs font-mono flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#4ADE80] text-black font-bold px-2 py-0.5">DEV TOOLBOX</span>
          <span className="hidden sm:inline text-gray-300">File Mandiri Siap Digunakan: <code className="text-[#FEF08A]">/web-porto/index.html</code></span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownloadSingleFile}
            className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-2.5 py-1 border border-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Unduh single file index.html mandiri untuk tugas/hosting lokal"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh web-porto/index.html</span>
          </button>
          <button 
            onClick={() => { setShowCodeModal(true); play8BitSfx(600); }}
            className="bg-[#06B6D4] hover:bg-[#0891B2] text-black px-2.5 py-1 border border-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Buka panel kode HTML lengkap untuk di-copy"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Lihat / Salin Kode</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BAGIAN 1: HEADER / FLOATING RETRO NAVBAR                 */}
      {/* ======================================================== */}
      <header className="sticky top-3 z-40 px-4 max-w-6xl mx-auto pt-2">
        <nav className="bg-white border-4 border-black brutal-shadow px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo / Inisial Retro Badge */}
          <a 
            href="#about" 
            onClick={() => handleGlobalClick(600)} 
            className="flex items-center gap-2 group"
          >
            <span className="bg-[#F43F5E] text-white font-mono font-bold px-2.5 py-1 border-2 border-black brutal-shadow-sm text-sm group-hover:rotate-6 transition-transform">
              &gt;_
            </span>
            <span className="font-syne font-black text-xl md:text-2xl tracking-tighter uppercase">
              BASTIO<span className="text-[#F43F5E]">.DEV</span>
            </span>
          </a>

          {/* Menu Navigasi (Smooth Scroll) */}
          <div className="hidden md:flex items-center gap-2 font-mono text-xs md:text-sm font-bold">
            <a 
              href="#about" 
              onClick={() => handleGlobalClick(540)}
              className="px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#6EE7B7] hover:brutal-shadow-sm transition-all"
            >
              01.// TENTANG
            </a>
            <a 
              href="#skills" 
              onClick={() => handleGlobalClick(580)}
              className="px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#06B6D4] hover:brutal-shadow-sm transition-all"
            >
              02.// KEMAMPUAN
            </a>
            <a 
              href="#achievement" 
              onClick={() => handleGlobalClick(620)}
              className="px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#FEF08A] hover:brutal-shadow-sm transition-all"
            >
              03.// ROADMAP 2026
            </a>
            <a 
              href="#contact" 
              onClick={() => handleGlobalClick(660)}
              className="px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#DDD6FE] hover:brutal-shadow-sm transition-all"
            >
              04.// KONTAK
            </a>
          </div>

          {/* Aksesoris & Action Controls */}
          <div className="flex items-center gap-2">
            {/* Retro Theme Switcher Palet */}
            <div className="hidden sm:flex items-center border-2 border-black p-0.5 bg-black gap-1">
              <button 
                onClick={() => { setThemeMode('yellow'); play8BitSfx(480); }}
                className={`w-4 h-4 border border-black ${themeMode === 'yellow' ? 'ring-2 ring-white' : ''} bg-[#FEF08A]`}
                title="Warna Retro Kuning"
              />
              <button 
                onClick={() => { setThemeMode('cyan'); play8BitSfx(520); }}
                className={`w-4 h-4 border border-black ${themeMode === 'cyan' ? 'ring-2 ring-white' : ''} bg-[#A5F3FC]`}
                title="Warna Retro Cyan"
              />
              <button 
                onClick={() => { setThemeMode('pink'); play8BitSfx(560); }}
                className={`w-4 h-4 border border-black ${themeMode === 'pink' ? 'ring-2 ring-white' : ''} bg-[#FBCFE8]`}
                title="Warna Retro Pink"
              />
            </div>

            {/* Tombol Suara Retro (SFX Toggle) */}
            <button 
              onClick={() => {
                setSfxEnabled(!sfxEnabled);
                if (!sfxEnabled) play8BitSfx(660, 'triangle', 0.1);
              }}
              title="Nyalakan/Matikan Efek Suara 8-Bit" 
              className={`brutal-btn border-2 border-black px-2.5 py-1 font-mono text-xs font-bold flex items-center gap-1.5 ${sfxEnabled ? 'bg-[#FEF08A]' : 'bg-gray-300'}`}
            >
              {sfxEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{sfxEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
            </button>

            {/* Tombol CTA Kontak Cepat */}
            <a 
              href="#contact" 
              onClick={() => handleGlobalClick(720)}
              className="brutal-btn bg-black text-white px-3 py-1 font-mono text-xs md:text-sm font-bold border-2 border-black hover:bg-[#F43F5E] hover:text-white transition-colors"
            >
              SAY HI! ✌
            </a>
          </div>
        </nav>

        {/* Mobile Nav Bar */}
        <div className="md:hidden flex justify-around bg-black text-white font-mono text-xs font-bold border-x-4 border-b-4 border-black py-2 mt-1 brutal-shadow">
          <a href="#about" onClick={() => handleGlobalClick(500)} className="hover:text-[#FEF08A]">TENTANG</a>
          <a href="#skills" onClick={() => handleGlobalClick(540)} className="hover:text-[#06B6D4]">SKILLS</a>
          <a href="#achievement" onClick={() => handleGlobalClick(580)} className="hover:text-[#4ADE80]">ROADMAP</a>
          <a href="#contact" onClick={() => handleGlobalClick(620)} className="hover:text-[#F43F5E]">KONTAK</a>
        </div>
      </header>

      {/* ======================================================== */}
      {/* BAGIAN 2: MARQUEE TICKER (TEKS BERJALAN RETRO 2026)      */}
      {/* ======================================================== */}
      <section className="mt-6 overflow-hidden bg-black text-[#FEF08A] border-y-4 border-black py-2.5 font-mono text-xs md:text-sm font-bold tracking-wider select-none brutal-shadow">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4">★ BASTIO SEPTOAJI ★</span>
          <span className="mx-4 text-[#4ADE80]">⚡ INFORMATICS FRESHMAN 2026 UNESA ⚡</span>
          <span className="mx-4 text-[#F43F5E]">★ NIM: 26051204124 ★</span>
          <span className="mx-4 text-[#06B6D4]">💻 EXPLORING WEB DEV &amp; ALGORITHMS 💻</span>
          <span className="mx-4 text-[#DDD6FE]">★ READY TO LEVEL UP IN CAMPUS ★</span>
          <span className="mx-4 text-white">☕ POWERED BY CAFFEINE &amp; PASSION ★</span>
          {/* Loop duplicates */}
          <span className="mx-4">★ BASTIO SEPTOAJI ★</span>
          <span className="mx-4 text-[#4ADE80]">⚡ INFORMATICS FRESHMAN 2026 UNESA ⚡</span>
          <span className="mx-4 text-[#F43F5E]">★ NIM: 26051204124 ★</span>
          <span className="mx-4 text-[#06B6D4]">💻 EXPLORING WEB DEV &amp; ALGORITHMS 💻</span>
          <span className="mx-4 text-[#DDD6FE]">★ READY TO LEVEL UP IN CAMPUS ★</span>
          <span className="mx-4 text-white">☕ POWERED BY CAFFEINE &amp; PASSION ★</span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* HERO BANNER / RETRO OS WINDOW BANNER                     */}
      {/* ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="relative bg-[#6EE7B7] border-4 border-black brutal-shadow-lg p-6 md:p-10 overflow-hidden">
          
          {/* Stiker Pop-Out Pojok Kanan Atas */}
          <div className="absolute -top-3 -right-3 md:top-4 md:right-6 rotate-12 z-10">
            <div className="bg-[#F43F5E] text-white font-syne font-black text-xs md:text-sm px-4 py-1.5 border-3 border-black brutal-shadow uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>FRESHMAN 2026!</span>
            </div>
          </div>

          {/* Window Header Bar Retro */}
          <div className="-mx-6 -mt-6 md:-mx-10 md:-mt-10 mb-6 border-b-4 border-black flex justify-between items-center bg-black text-white px-4 py-2 font-mono text-xs md:text-sm font-bold">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#4ADE80]" />
              <span>C:\USERS\BASTIO\PORTFOLIO.EXE</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { setWindowMinimized(!windowMinimized); play8BitSfx(420); }} 
                className="w-4 h-4 bg-yellow-400 border border-black hover:brightness-110 flex items-center justify-center text-[10px] text-black font-bold"
                title="Minimize / Expand"
              >
                _
              </button>
              <button 
                onClick={() => { setWindowMinimized(false); play8BitSfx(560); }} 
                className="w-4 h-4 bg-green-400 border border-black hover:brightness-110 flex items-center justify-center text-[10px] text-black font-bold"
                title="Expand"
              >
                □
              </button>
              <button 
                onClick={() => { play8BitSfx(250); alert("System will remain open for your exploration! 🚀"); }} 
                className="w-4 h-4 bg-red-500 border border-black hover:brightness-110 flex items-center justify-center text-[10px] text-white font-bold"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {!windowMinimized ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Teks Pengenalan Hero */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#FEF08A] text-black border-2 border-black px-3 py-1 font-mono text-xs font-bold brutal-shadow-sm">
                  <Code2 className="w-3.5 h-3.5 text-[#F43F5E]" />
                  <span>S1 TEKNIK INFORMATIKA • ANGKATAN 2026</span>
                </div>
                
                <h1 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none text-black">
                  HALO! SAYA <br className="hidden sm:inline" />
                  <span className="bg-black text-[#FEF08A] px-2 py-0.5 inline-block brutal-shadow-sm -rotate-1">
                    BASTIO SEPTOAJI
                  </span>
                </h1>

                <p className="font-grotesk text-base md:text-xl font-medium text-black max-w-2xl leading-relaxed">
                  Mahasiswa Baru S1 Teknik Informatika Universitas Negeri Surabaya (UNESA) Angkatan 2026, lulusan SMA Negeri 1 Kauman, yang siap mengasah kemampuan pemrograman, algoritma sistem, dan rekayasa web modern.
                </p>

                {/* Tombol Aksi Cepat */}
                <div className="pt-2 flex flex-wrap gap-4 items-center font-mono">
                  <a 
                    href="#about" 
                    onClick={() => handleGlobalClick(600)}
                    className="brutal-btn bg-[#FEF08A] text-black font-bold px-5 py-3 border-3 border-black text-sm flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>LIHAT KARTU MAHASISWA</span>
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => handleGlobalClick(660)}
                    className="brutal-btn bg-white text-black font-bold px-5 py-3 border-3 border-black text-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#F43F5E]" />
                    <span>AJAK NGOBROL / COLLAB</span>
                  </a>
                </div>
              </div>

              {/* Kolom Kanan: Quick Fun Stats Card */}
              <div className="lg:col-span-4 bg-white border-3 border-black brutal-shadow p-4 space-y-3 font-mono text-xs">
                <div className="bg-[#DDD6FE] border-2 border-black p-2 font-bold flex justify-between items-center">
                  <span>&gt; CURRENT_STATUS</span>
                  <span className="text-[#F43F5E]">LEVEL 1 MABA 2026</span>
                </div>
                <div className="space-y-1.5 text-black">
                  <div className="flex justify-between border-b border-black/20 pb-1">
                    <span className="text-gray-600">Nama:</span>
                    <span className="font-bold">Bastio Septoaji</span>
                  </div>
                  <div className="flex justify-between border-b border-black/20 pb-1">
                    <span className="text-gray-600">NIM:</span>
                    <span className="font-bold text-[#F43F5E]">26051204124</span>
                  </div>
                  <div className="flex justify-between border-b border-black/20 pb-1">
                    <span className="text-gray-600">Kampus:</span>
                    <span className="font-bold">UNESA (Univ. Negeri Surabaya)</span>
                  </div>
                  <div className="flex justify-between border-b border-black/20 pb-1">
                    <span className="text-gray-600">Semester:</span>
                    <span className="font-bold">01 (Ganjil 2026/2027)</span>
                  </div>
                  <div className="flex justify-between border-b border-black/20 pb-1">
                    <span className="text-gray-600">Asal Sekolah:</span>
                    <span className="font-bold">SMA Negeri 1 Kauman</span>
                  </div>
                </div>
                <div className="bg-[#FEF08A] border-2 border-black p-2 text-center font-bold">
                  "Eat, Sleep, Code, Debug, Repeat"
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2 text-center font-mono font-bold text-sm">
              [ Jendela diminimalkan. Klik tombol □ di pojok kanan atas untuk membuka kembali ]
            </div>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 1: ABOUT ME (KARTU PENGENAL RETRO - TANPA FOTO)  */}
      {/* ======================================================== */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-[#F43F5E] text-white font-mono font-bold text-lg px-3 py-1 border-3 border-black brutal-shadow-sm">
            01
          </span>
          <h2 className="font-syne font-black text-3xl md:text-5xl uppercase tracking-tight">
            ABOUT ME // KARTU MAHASISWA
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* KARTU PENGENAL RETRO / STUDENT ID CARD (Kiri) */}
          <div className="lg:col-span-5 bg-[#DDD6FE] border-4 border-black brutal-shadow-lg p-5 md:p-6 relative">
            
            {/* Lubang Gantungan ID Card */}
            <div className="w-16 h-4 bg-black mx-auto mb-4 rounded-full border border-gray-600"></div>

            {/* Badge Stamp */}
            <div className="absolute top-8 right-6 -rotate-12 bg-[#FEF08A] text-black font-mono font-bold text-xs px-2 py-1 border-2 border-black brutal-shadow-sm">
              ★ MABA 2026 ★
            </div>

            <div className="text-center pb-4 border-b-3 border-black">
              <p className="font-mono text-xs font-bold text-gray-700 tracking-widest uppercase">
                REPUBLIC OF INFORMATICS // STUDENT IDENTITY
              </p>
              <h3 className="font-syne font-black text-xl uppercase mt-1">
                FACULTY OF ENGINEERING
              </h3>
            </div>

            {/* Retro Monogram Avatar Box (FOTO DIHAPUS & DIGANTI DENGAN STYLIZED AVATAR FRAME) */}
            <div className="my-5 relative max-w-[220px] mx-auto">
              <div className="border-4 border-black bg-black p-4 brutal-shadow flex flex-col items-center justify-center text-center aspect-square">
                <div className="w-16 h-16 bg-[#FEF08A] border-3 border-white rounded-none flex items-center justify-center text-black font-syne font-black text-2xl brutal-shadow-sm mb-2">
                  BS
                </div>
                <div className="font-mono text-xs text-[#4ADE80] font-bold">
                  // BASTIO SEPTOAJI
                </div>
                <div className="font-mono text-[10px] text-gray-300 mt-1 uppercase">
                  INFORMATICS MABA 2026
                </div>
              </div>
              {/* Stiker Dekorasi di Sudut Frame */}
              <div className="absolute -bottom-3 -right-3 bg-[#F43F5E] text-white font-mono font-bold text-xs px-2 py-0.5 border-2 border-black brutal-shadow-sm rotate-6">
                VERIFIED MABA
              </div>
              <div className="absolute -top-3 -left-3 bg-[#FEF08A] text-black font-mono font-bold text-xs px-2 py-0.5 border-2 border-black brutal-shadow-sm -rotate-6">
                ⚡ CLASS OF 2026
              </div>
            </div>

            {/* Data Pribadi Jelas */}
            <div className="bg-white border-3 border-black p-4 space-y-2.5 font-mono text-xs md:text-sm">
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">NAMA LENGKAP:</span>
                <span className="font-bold text-base text-black font-syne">BASTIO SEPTOAJI</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-1 border-t-2 border-black/15">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">NIM:</span>
                  <span className="font-bold text-black bg-[#FEF08A] px-1.5 py-0.5 border border-black inline-block">26051204124</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">STATUS:</span>
                  <span className="font-bold text-green-700 bg-[#6EE7B7] px-1.5 py-0.5 border border-black inline-block">MAHASISWA AKTIF</span>
                </div>
              </div>

              <div className="pt-1 border-t-2 border-black/15">
                <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">PROGRAM STUDI:</span>
                <span className="font-bold text-black">S1 TEKNIK INFORMATIKA</span>
              </div>

              <div className="pt-1 border-t-2 border-black/15">
                <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">KAMPUS:</span>
                <span className="font-bold text-black">Universitas Negeri Surabaya (UNESA)</span>
              </div>
            </div>

            {/* Barcode Hiasan Retro */}
            <div className="mt-4 pt-2 text-center border-t-2 border-black">
              <div className="font-mono text-xs tracking-widest text-black font-bold">||||| | |||| || |||||| | ||||| ||||</div>
              <p className="font-mono text-[10px] text-gray-700 mt-1">ID NO: TI-UNESA-26051204124</p>
            </div>
          </div>

          {/* DESKRIPSI DIRI & AKTIVITAS & TIMELINE PENDIDIKAN (Kanan) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Box 1: Cerita Diri / Bio */}
            <div className="brutal-card bg-white border-4 border-black p-6 brutal-shadow">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-3 border-black">
                <h3 className="font-syne font-black text-xl uppercase flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-[#F43F5E]" />
                  <span>SIAPA SAYA? // BIO</span>
                </h3>
                <span className="font-mono text-xs bg-[#FEF08A] px-2 py-0.5 border border-black font-bold">STORY.TXT</span>
              </div>
              
              <div className="space-y-3 font-grotesk text-sm md:text-base leading-relaxed text-black">
                <p>
                  Halo semuanya! 👋 Selamat datang di sudut digital saya. Saya adalah <strong>Bastio Septoaji</strong>, Mahasiswa Baru Program Studi <strong>S1 Teknik Informatika di Universitas Negeri Surabaya (UNESA) Angkatan 2026</strong> yang memiliki antusiasme membara terhadap rekayasa perangkat lunak, algoritma pemrograman, dan seni desain web modern.
                </p>
                <p>
                  Sebagai lulusan dari <strong>SMA Negeri 1 Kauman</strong>, perjalanan koding saya didorong rasa penasaran melihat bagaimana baris logika dapat bertransformasi menjadi solusi interaktif yang nyata. Di perkuliahan Teknik Informatika UNESA ini, fokus saya adalah memantapkan fondasi algoritma logika, aktif dalam proyek kolaborasi, dan mempersiapkan diri untuk berbagai ajang kompetisi IT.
                </p>
                <p className="font-mono text-xs bg-[#FFFBEB] border-2 border-black p-2.5 font-bold">
                  💡 <em>"Tidak ada kode yang langsung sempurna pada compile pertama; yang terpenting adalah kegigihan untuk membaca trace error dan terus belajar."</em>
                </p>
              </div>
            </div>

            {/* Box 2: Aktivitas Saat Ini */}
            <div className="brutal-card bg-[#FEF08A] border-4 border-black p-6 brutal-shadow">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-3 border-black">
                <h3 className="font-syne font-black text-xl uppercase flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-black" />
                  <span>AKTIVITAS SAAT INI</span>
                </h3>
                <span className="font-mono text-xs bg-black text-white px-2 py-0.5 font-bold">SEMESTER 1 (2026)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-white border-2 border-black p-3 brutal-shadow-sm">
                  <div className="font-bold text-[#F43F5E] mb-1 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>PEMROGRAMAN DASAR (C++)</span>
                  </div>
                  <p className="text-gray-800 font-grotesk text-xs">
                    Mempelajari logika percabangan, perulangan, fungsi modular, hingga struktur data dasar array dan pointer memori.
                  </p>
                </div>

                <div className="bg-white border-2 border-black p-3 brutal-shadow-sm">
                  <div className="font-bold text-[#06B6D4] mb-1 flex items-center gap-1.5">
                    <Laptop className="w-4 h-4" />
                    <span>MODERN WEB DEVELOPMENT</span>
                  </div>
                  <p className="text-gray-800 font-grotesk text-xs">
                    Memperdalam HTML5 semantik, CSS Tailwind modern, JavaScript DOM, dan eksplorasi antarmuka interaktif responsif.
                  </p>
                </div>

                <div className="bg-white border-2 border-black p-3 brutal-shadow-sm">
                  <div className="font-bold text-green-700 mb-1 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" />
                    <span>LINUX &amp; GIT WORKFLOW</span>
                  </div>
                  <p className="text-gray-800 font-grotesk text-xs">
                    Membiasakan diri dengan Terminal bash, push/pull repository GitHub, manajemen branch, dan instalasi distro Linux.
                  </p>
                </div>

                <div className="bg-white border-2 border-black p-3 brutal-shadow-sm">
                  <div className="font-bold text-[#9333EA] mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>HIMPUNAN &amp; KOMUNITAS</span>
                  </div>
                  <p className="text-gray-800 font-grotesk text-xs">
                    Mengikuti kepanitiaan maba, workshop teknologi kampus, dan forum studi kelompok belajar koding bersama teman seangkatan 2026.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: Riwayat Pendidikan (Updated SMA Negeri 1 Kauman & 2026) */}
            <div className="brutal-card bg-[#6EE7B7] border-4 border-black p-6 brutal-shadow">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-3 border-black">
                <h3 className="font-syne font-black text-xl uppercase flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-black" />
                  <span>RIWAYAT PENDIDIKAN</span>
                </h3>
                <span className="font-mono text-xs bg-white text-black px-2 py-0.5 border border-black font-bold">TIMELINE</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {/* Pendidikan Sekarang: 2026 - Sekarang */}
                <div className="relative pl-6 border-l-4 border-black pb-2">
                  <div className="absolute -left-2.5 top-0 w-4 h-4 bg-[#F43F5E] border-2 border-black"></div>
                  <div className="bg-white border-2 border-black p-3 brutal-shadow-sm">
                    <div className="flex flex-wrap justify-between items-center gap-1 mb-1">
                      <h4 className="font-syne font-bold text-sm text-black">S1 TEKNIK INFORMATIKA</h4>
                      <span className="bg-[#4ADE80] text-black px-2 py-0.5 border border-black font-bold">2026 - SEKARANG</span>
                    </div>
                    <p className="text-gray-700 font-semibold">Universitas Negeri Surabaya (UNESA)</p>
                    <p className="font-grotesk text-xs text-gray-600 mt-1">
                      Fakultas Teknik, Program Studi S1 Teknik Informatika. Mahasiswa Baru Aktif Semester 1 Angkatan 2026.
                    </p>
                  </div>
                </div>

                {/* Pendidikan Menengah Atas: SMA Negeri 1 Kauman (2023 - 2026) */}
                <div className="relative pl-6 border-l-4 border-black">
                  <div className="absolute -left-2.5 top-0 w-4 h-4 bg-yellow-400 border-2 border-black"></div>
                  <div className="bg-white border-2 border-black p-3 brutal-shadow-sm">
                    <div className="flex flex-wrap justify-between items-center gap-1 mb-1">
                      <h4 className="font-syne font-bold text-sm text-black">SMA NEGERI 1 KAUMAN</h4>
                      <span className="bg-gray-200 text-black px-2 py-0.5 border border-black font-bold">2023 - 2026</span>
                    </div>
                    <p className="text-gray-700 font-semibold">Jurusan MIPA (Matematika &amp; Ilmu Pengetahuan Alam)</p>
                    <p className="font-grotesk text-xs text-gray-600 mt-1">
                      Menempuh pendidikan tingkat menengah atas dengan fokus sains dan logika matematika, aktif dalam kegiatan sekolah dan lulus pada tahun 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: WHAT I CAN DO (SKILLS & TOOLS)                */}
      {/* ======================================================== */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-[#06B6D4] text-black font-mono font-bold text-lg px-3 py-1 border-3 border-black brutal-shadow-sm">
            02
          </span>
          <h2 className="font-syne font-black text-3xl md:text-5xl uppercase tracking-tight">
            WHAT I CAN DO // SKILLS &amp; ARSENAL
          </h2>
        </div>

        {/* Bahasa Pemrograman & Web Core */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-black text-[#FEF08A] px-3 py-1 font-mono text-xs font-bold border-2 border-black brutal-shadow-sm mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>BAHASA PEMROGRAMAN &amp; WEB CORE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* HTML5 */}
            <div 
              onMouseEnter={() => play8BitSfx(440, 'square', 0.03)}
              className="brutal-card bg-white border-3 border-black p-4 brutal-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-black text-[#E34F26]">HTML5</span>
                  <span className="font-mono text-[10px] font-bold bg-[#6EE7B7] px-1.5 py-0.5 border border-black">90%</span>
                </div>
                <h4 className="font-syne font-extrabold text-lg uppercase">HTML5</h4>
                <p className="font-grotesk text-xs text-gray-700 mt-1">
                  Semantic tags, Accessibility (a11y), clean DOM structure, modern form elements.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t-2 border-black font-mono text-[10px] text-gray-600 font-bold">
                LEVEL: ADVANCED
              </div>
            </div>

            {/* CSS3 & Tailwind */}
            <div 
              onMouseEnter={() => play8BitSfx(480, 'square', 0.03)}
              className="brutal-card bg-[#FEF08A] border-3 border-black p-4 brutal-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-black text-[#06B6D4]">CSS3</span>
                  <span className="font-mono text-[10px] font-bold bg-[#F43F5E] text-white px-1.5 py-0.5 border border-black">85%</span>
                </div>
                <h4 className="font-syne font-extrabold text-lg uppercase">CSS &amp; TAILWIND</h4>
                <p className="font-grotesk text-xs text-gray-700 mt-1">
                  Neo-Brutalism layout, Flexbox, CSS Grid, keyframes, fluid responsive typography.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t-2 border-black font-mono text-[10px] text-gray-600 font-bold">
                LEVEL: INTERMEDIATE
              </div>
            </div>

            {/* JavaScript */}
            <div 
              onMouseEnter={() => play8BitSfx(520, 'square', 0.03)}
              className="brutal-card bg-[#FFFBEB] border-3 border-black p-4 brutal-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-black text-black bg-yellow-300 px-1 border border-black">JS</span>
                  <span className="font-mono text-[10px] font-bold bg-[#06B6D4] px-1.5 py-0.5 border border-black">80%</span>
                </div>
                <h4 className="font-syne font-extrabold text-lg uppercase">JAVASCRIPT</h4>
                <p className="font-grotesk text-xs text-gray-700 mt-1">
                  ES6+ syntax, asynchronous logic, Fetch API, DOM manipulation, Web Audio API.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t-2 border-black font-mono text-[10px] text-gray-600 font-bold">
                LEVEL: INTERMEDIATE
              </div>
            </div>

            {/* C++ */}
            <div 
              onMouseEnter={() => play8BitSfx(560, 'square', 0.03)}
              className="brutal-card bg-[#DDD6FE] border-3 border-black p-4 brutal-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-black text-black bg-white px-1.5 border border-black">C++</span>
                  <span className="font-mono text-[10px] font-bold bg-yellow-300 px-1.5 py-0.5 border border-black">75%</span>
                </div>
                <h4 className="font-syne font-extrabold text-lg uppercase">C++ LANGUAGE</h4>
                <p className="font-grotesk text-xs text-gray-700 mt-1">
                  Matkul Utama: Pointer, Struct, memory logic, conditional loop, modular functions.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t-2 border-black font-mono text-[10px] text-gray-600 font-bold">
                LEVEL: FUNDAMENTAL
              </div>
            </div>

            {/* Python */}
            <div 
              onMouseEnter={() => play8BitSfx(600, 'square', 0.03)}
              className="brutal-card bg-[#BAE6FD] border-3 border-black p-4 brutal-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-black text-[#3776AB]">PY</span>
                  <span className="font-mono text-[10px] font-bold bg-green-300 px-1.5 py-0.5 border border-black">75%</span>
                </div>
                <h4 className="font-syne font-extrabold text-lg uppercase">PYTHON</h4>
                <p className="font-grotesk text-xs text-gray-700 mt-1">
                  Data structure handling, problem solving, simple automation script, math algorithms.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t-2 border-black font-mono text-[10px] text-gray-600 font-bold">
                LEVEL: INTERMEDIATE
              </div>
            </div>

          </div>
        </div>

        {/* Tools & Workflow */}
        <div>
          <div className="inline-flex items-center gap-2 bg-black text-[#06B6D4] px-3 py-1 font-mono text-xs font-bold border-2 border-black brutal-shadow-sm mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>TOOLS, SOFTWARE &amp; WORKFLOW</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {/* Git & GitHub */}
            <div className="brutal-card bg-white border-3 border-black p-4 brutal-shadow text-center">
              <div className="w-12 h-12 mx-auto bg-[#F43F5E] text-white border-2 border-black flex items-center justify-center text-xl font-bold brutal-shadow-sm mb-2">
                GIT
              </div>
              <h5 className="font-syne font-bold text-sm uppercase">GIT &amp; GITHUB</h5>
              <p className="font-grotesk text-[11px] text-gray-600 mt-1">Version control, branching, repo management.</p>
            </div>

            {/* VS Code */}
            <div className="brutal-card bg-white border-3 border-black p-4 brutal-shadow text-center">
              <div className="w-12 h-12 mx-auto bg-[#06B6D4] text-black border-2 border-black flex items-center justify-center text-xl font-bold brutal-shadow-sm mb-2">
                &gt;_
              </div>
              <h5 className="font-syne font-bold text-sm uppercase">VS CODE</h5>
              <p className="font-grotesk text-[11px] text-gray-600 mt-1">Primary IDE, debugging terminal, extensions.</p>
            </div>

            {/* Linux & Bash */}
            <div className="brutal-card bg-white border-3 border-black p-4 brutal-shadow text-center">
              <div className="w-12 h-12 mx-auto bg-[#FEF08A] text-black border-2 border-black flex items-center justify-center text-xl font-bold brutal-shadow-sm mb-2">
                TUX
              </div>
              <h5 className="font-syne font-bold text-sm uppercase">LINUX &amp; BASH</h5>
              <p className="font-grotesk text-[11px] text-gray-600 mt-1">Ubuntu WSL &amp; command-line navigation dasar.</p>
            </div>

            {/* Figma */}
            <div className="brutal-card bg-white border-3 border-black p-4 brutal-shadow text-center">
              <div className="w-12 h-12 mx-auto bg-[#DDD6FE] text-black border-2 border-black flex items-center justify-center text-xl font-bold brutal-shadow-sm mb-2">
                FIG
              </div>
              <h5 className="font-syne font-bold text-sm uppercase">FIGMA</h5>
              <p className="font-grotesk text-[11px] text-gray-600 mt-1">Wireframing, prototyping, UI/UX asset mockups.</p>
            </div>

            {/* Notion */}
            <div className="brutal-card bg-white border-3 border-black p-4 brutal-shadow text-center col-span-2 sm:col-span-1">
              <div className="w-12 h-12 mx-auto bg-[#6EE7B7] text-black border-2 border-black flex items-center justify-center text-xl font-bold brutal-shadow-sm mb-2">
                DOC
              </div>
              <h5 className="font-syne font-bold text-sm uppercase">NOTION</h5>
              <p className="font-grotesk text-[11px] text-gray-600 mt-1">Catatan kuliah, roadmap koding, task board.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: ROADMAP & TARGET PRESTASI MABA 2026           */}
      {/* (SERTIFIKAT LAMA DIHAPUS, DIGANTI ROADMAP MABA REALISTIS)*/}
      {/* ======================================================== */}
      <section id="achievement" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-[#4ADE80] text-black font-mono font-bold text-lg px-3 py-1 border-3 border-black brutal-shadow-sm">
            03
          </span>
          <h2 className="font-syne font-black text-3xl md:text-5xl uppercase tracking-tight">
            MILESTONES &amp; TARGET PRESTASI 2026
          </h2>
        </div>

        {/* Banner Penjelasan Status Maba */}
        <div className="bg-white border-4 border-black brutal-shadow p-6 mb-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-black pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-[#FEF08A] border-2 border-black flex items-center justify-center text-xl font-bold shadow-brutal-sm">
                🚀
              </span>
              <div>
                <h3 className="font-syne font-black text-lg md:text-xl uppercase">
                  STATUS: INITIATION STAGE // MABA ANGKATAN 2026
                </h3>
                <p className="font-mono text-xs text-gray-600">
                  Sebagai Mahasiswa Baru S1 Teknik Informatika UNESA, sertifikat kejuaraan tingkat perguruan tinggi sedang dalam proses perjuangan &amp; persiapan kompetisi.
                </p>
              </div>
            </div>
            <div className="bg-black text-[#4ADE80] font-mono text-xs px-3 py-1.5 font-bold border border-black whitespace-nowrap">
              ROADMAP: AKTIF 2026/2027
            </div>
          </div>
          <p className="font-grotesk text-sm text-gray-800 leading-relaxed">
            Fokus utama saat ini adalah menguasai fundamental pemrograman C++, arsitektur sistem, dan web development untuk siap bersaing dalam ajang bergengsi mahasiswa nasional. Berikut target pencapaian yang sedang dipersiapkan:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Target 1: Gemastik & Hackathon */}
          <div className="brutal-card bg-white border-4 border-black brutal-shadow flex flex-col justify-between overflow-hidden">
            <div>
              <div className="bg-black text-white px-3 py-1.5 font-mono text-xs font-bold flex justify-between items-center">
                <span>TARGET_01.EXE</span>
                <span className="text-[#FEF08A]">★ KOMPETISI NASIONAL</span>
              </div>

              <div className="p-5 bg-[#FEF08A] border-b-3 border-black text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-black text-[#FEF08A] border-2 border-black flex items-center justify-center text-2xl font-black brutal-shadow-sm">
                  <Rocket className="w-8 h-8 text-[#FEF08A]" />
                </div>
                <h4 className="font-syne font-black text-base uppercase">GEMASTIK &amp; HACKATHON</h4>
                <span className="inline-block bg-black text-white px-2 py-0.5 font-mono text-[10px] font-bold">
                  TARGET: 2026 / 2027
                </span>
              </div>

              <div className="p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="bg-[#6EE7B7] text-black px-2 py-0.5 border border-black font-bold">DIVISI: WEB &amp; UX</span>
                  <span className="text-gray-600 font-bold">PUSPRESNAS</span>
                </div>
                <p className="font-grotesk text-xs text-gray-700 leading-relaxed pt-1">
                  Membentuk tim bersama rekan sesama mahasiswa Teknik Informatika UNESA untuk mengikuti Pagelaran Mahasiswa Nasional Bidang TIK (Gemastik) dan Hackathon kampus.
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="w-full bg-[#6EE7B7] text-black font-mono text-xs font-bold py-2 border-2 border-black flex items-center justify-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>ONGOING PREPARATION</span>
              </div>
            </div>
          </div>

          {/* Target 2: Sertifikasi Kompetensi Internasional */}
          <div className="brutal-card bg-white border-4 border-black brutal-shadow flex flex-col justify-between overflow-hidden">
            <div>
              <div className="bg-black text-white px-3 py-1.5 font-mono text-xs font-bold flex justify-between items-center">
                <span>TARGET_02.EXE</span>
                <span className="text-[#6EE7B7]">★ INDUSTRY SKILL</span>
              </div>

              <div className="p-5 bg-[#DDD6FE] border-b-3 border-black text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-black text-[#DDD6FE] border-2 border-black flex items-center justify-center text-2xl font-black brutal-shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-[#DDD6FE]" />
                </div>
                <h4 className="font-syne font-black text-base uppercase">SERTIFIKASI PROFESIONAL</h4>
                <span className="inline-block bg-black text-white px-2 py-0.5 font-mono text-[10px] font-bold">
                  TARGET: 2026 / 2027
                </span>
              </div>

              <div className="p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="bg-[#FEF08A] text-black px-2 py-0.5 border border-black font-bold">FOKUS: WEB &amp; CLOUD</span>
                  <span className="text-gray-600 font-bold">GLOBAL CERT</span>
                </div>
                <p className="font-grotesk text-xs text-gray-700 leading-relaxed pt-1">
                  Menuntaskan sertifikasi pengembang perangkat lunak resmi dari platform industri (Google Bangkit Foundation, Dicoding, atau AWS) untuk memvalidasi keahlian coding.
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="w-full bg-[#FEF08A] text-black font-mono text-xs font-bold py-2 border-2 border-black flex items-center justify-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>ONGOING PREPARATION</span>
              </div>
            </div>
          </div>

          {/* Target 3: PKM & Riset Mahasiswa */}
          <div className="brutal-card bg-white border-4 border-black brutal-shadow flex flex-col justify-between overflow-hidden">
            <div>
              <div className="bg-black text-white px-3 py-1.5 font-mono text-xs font-bold flex justify-between items-center">
                <span>TARGET_03.EXE</span>
                <span className="text-[#F43F5E]">★ KREATIVITAS MAHASISWA</span>
              </div>

              <div className="p-5 bg-[#6EE7B7] border-b-3 border-black text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-black text-[#6EE7B7] border-2 border-black flex items-center justify-center text-2xl font-black brutal-shadow-sm">
                  <Award className="w-8 h-8 text-[#6EE7B7]" />
                </div>
                <h4 className="font-syne font-black text-base uppercase">PKM KARSA CIPTA (PKM-KC)</h4>
                <span className="inline-block bg-black text-white px-2 py-0.5 font-mono text-[10px] font-bold">
                  TARGET: 2026 / 2027
                </span>
              </div>

              <div className="p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="bg-[#F43F5E] text-white px-2 py-0.5 border border-black font-bold">SIMBELMAWA</span>
                  <span className="text-gray-600 font-bold">KEMENDIKBUD</span>
                </div>
                <p className="font-grotesk text-xs text-gray-700 leading-relaxed pt-1">
                  Menyusun proposal inovasi teknologi terapan bersama dosen pembimbing Teknik Informatika UNESA untuk pendanaan riset prototipe perangkat lunak solutif.
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="w-full bg-[#F43F5E] text-white font-mono text-xs font-bold py-2 border-2 border-black flex items-center justify-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>ONGOING PREPARATION</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: CONTACT (KOTAK PESAN RETRO POP-UP)            */}
      {/* ======================================================== */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-[#F43F5E] text-white font-mono font-bold text-lg px-3 py-1 border-3 border-black brutal-shadow-sm">
            04
          </span>
          <h2 className="font-syne font-black text-3xl md:text-5xl uppercase tracking-tight">
            GET IN TOUCH // KOTAK PESAN RETRO
          </h2>
        </div>

        <div className="bg-white border-4 border-black brutal-shadow-xl overflow-hidden">
          
          {/* OS Window Header Bar */}
          <div className="border-b-4 border-black px-4 py-2 flex justify-between items-center bg-black text-white font-mono text-xs md:text-sm font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#F43F5E] inline-block border border-white"></span>
              <span>MESSAGE_DISPATCHER_V1.EXE — [COMMS ACTIVE]</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="px-2 py-0.5 bg-gray-800 border border-gray-600">_</span>
              <span className="px-2 py-0.5 bg-gray-800 border border-gray-600">□</span>
              <span className="px-2 py-0.5 bg-red-600 text-white border border-gray-600 font-bold">✕</span>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#FFFBEB] bg-retro-grid">
            
            {/* Kolom Kiri: Ajakan, Sosial Media, & Download CV */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="inline-block bg-[#FEF08A] text-black border-2 border-black px-3 py-1 font-mono text-xs font-bold brutal-shadow-sm">
                  📬 MARI BERKOLABORASI
                </div>
                
                <h3 className="font-syne font-black text-2xl md:text-3xl uppercase leading-tight">
                  PUNYA IDE PROJEK ATAU INGIN NGOBROL KODINGAN?
                </h3>
                
                <p className="font-grotesk text-sm text-gray-700 leading-relaxed">
                  Sebagai mahasiswa baru Teknik Informatika UNESA Angkatan 2026, saya selalu terbuka untuk berkenalan, berdiskusi mengenai teknologi, berkolaborasi dalam proyek tugas, maupun membentuk tim kompetisi!
                </p>
              </div>

              {/* Tombol Utama Mencolok: DOWNLOAD CV */}
              <div className="p-4 bg-[#FEF08A] border-3 border-black brutal-shadow space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
                  <FileText className="w-4 h-4 text-[#F43F5E]" />
                  <span>RESUME &amp; CURRICULUM VITAE (2026)</span>
                </div>
                <p className="font-grotesk text-xs text-gray-800">
                  Unduh ringkasan profil, riwayat pendidikan SMA Negeri 1 Kauman &amp; UNESA, serta kontak resmi:
                </p>
                <button 
                  onClick={handleDownloadCV}
                  className="brutal-btn w-full bg-[#F43F5E] text-white font-syne font-black py-3 border-3 border-black uppercase text-sm flex items-center justify-center gap-2 brutal-shadow hover:bg-black transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD CV / RESUME (.TXT)</span>
                </button>
              </div>

              {/* Tombol Sosial Media Tebal */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase text-gray-800">
                  HUBUNGI SAYA VIA SOCIAL NETWORK:
                </h4>
                <div className="flex flex-col gap-2.5 font-mono text-xs font-bold">
                  
                  {/* Email */}
                  <a 
                    href="mailto:26051204124@mhs.unesa.ac.id" 
                    onClick={() => handleGlobalClick(500)}
                    className="brutal-btn bg-white hover:bg-[#6EE7B7] text-black border-2 border-black p-2.5 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[#F43F5E] font-black">@</span>
                      <span>EMAIL: 26051204124@mhs.unesa.ac.id</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/bastioseptoaji" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleGlobalClick(550)}
                    className="brutal-btn bg-white hover:bg-[#06B6D4] text-black border-2 border-black p-2.5 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="bg-black text-white px-1 font-mono text-[10px]">GH</span>
                      <span>GITHUB: github.com/bastioseptoaji</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/bastioseptoaji" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleGlobalClick(600)}
                    className="brutal-btn bg-white hover:bg-[#DDD6FE] text-black border-2 border-black p-2.5 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="bg-[#0A66C2] text-white px-1 font-mono text-[10px]">IN</span>
                      <span>LINKEDIN: linkedin.com/in/bastioseptoaji</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Instagram */}
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => handleGlobalClick(650)}
                    className="brutal-btn bg-white hover:bg-yellow-200 text-black border-2 border-black p-2.5 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="bg-[#F43F5E] text-white px-1 font-mono text-[10px]">IG</span>
                      <span>INSTAGRAM: @bastio.septoaji</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                </div>
              </div>
            </div>

            {/* Kolom Kanan: Formulir Pesan Singkat */}
            <div className="lg:col-span-7 bg-white border-3 border-black p-6 brutal-shadow">
              <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-5">
                <h4 className="font-syne font-black text-lg uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#F43F5E]" />
                  <span>KIRIM PESAN LANGSUNG</span>
                </h4>
                <span className="font-mono text-[10px] bg-[#4ADE80] text-black px-2 py-0.5 border border-black font-bold">DIRECT_SEND</span>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block font-bold text-black uppercase mb-1">
                    NAMA ANDA / PANGGILAN: <span className="text-[#F43F5E]">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-[#FFFBEB] border-2 border-black p-3 font-grotesk text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-black brutal-shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black uppercase mb-1">
                    EMAIL ANDA: <span className="text-[#F43F5E]">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full bg-[#FFFBEB] border-2 border-black p-3 font-grotesk text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-black brutal-shadow-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black uppercase mb-1">
                    SUBJEK / TOPIK:
                  </label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FFFBEB] border-2 border-black p-3 font-grotesk text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-black brutal-shadow-sm"
                  >
                    <option value="Tanya-tanya Perkuliahan & Maba">Tanya-tanya Perkuliahan &amp; Maba</option>
                    <option value="Ajak Kolaborasi Projek Coding">Ajak Kolaborasi Projek Coding</option>
                    <option value="Diskusi Web Dev / C++">Diskusi Web Dev / C++</option>
                    <option value="Ngobrol Santai / Networking">Ngobrol Santai / Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-black uppercase mb-1">
                    ISI PESAN: <span className="text-[#F43F5E]">*</span>
                  </label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis pesan atau sapaan Anda di sini..."
                    className="w-full bg-[#FFFBEB] border-2 border-black p-3 font-grotesk text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-black brutal-shadow-sm resize-y"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isTransmitting}
                  className="brutal-btn w-full bg-black text-[#FEF08A] font-syne font-black text-sm uppercase py-3.5 border-3 border-black brutal-shadow hover:bg-[#4ADE80] hover:text-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTransmitting ? 'TRANSMITTING PACKETS...' : 'TRANSMIT MESSAGE NOW // KIRIM'}</span>
                </button>
              </form>

              {formSuccess && (
                <div className="mt-4 bg-[#4ADE80] border-3 border-black p-4 brutal-shadow font-mono text-xs animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-black mb-1">
                    <Check className="w-4 h-4" />
                    <span>PESAN BERHASIL DIKIRIM (STATUS 200 OK)!</span>
                  </div>
                  <p className="font-grotesk text-xs text-black">
                    Terima kasih sudah menyapa! Notifikasi telah masuk dan saya akan membalas via email sesegera mungkin.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FOOTER RETRO                                             */}
      {/* ======================================================== */}
      <footer className="mt-16 bg-black text-white border-t-4 border-black">
        <div className="h-3 w-full bg-hazard-stripes"></div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-gray-800">
            
            {/* Logo Footer & Identitas */}
            <div className="flex items-center gap-3">
              <span className="bg-[#F43F5E] text-white font-mono font-bold px-2 py-1 border-2 border-white text-sm">
                &gt;_
              </span>
              <div>
                <h4 className="font-syne font-bold text-lg text-white">BASTIO SEPTOAJI</h4>
                <p className="font-mono text-xs text-gray-400">S1 Teknik Informatika • UNESA • NIM: 26051204124 • Angkatan 2026</p>
              </div>
            </div>

            {/* Retro Visitor Counter */}
            <div className="bg-gray-900 border-2 border-white p-2 font-mono text-xs flex items-center gap-3 brutal-shadow-sm">
              <span className="text-[#4ADE80] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> VISITOR COUNT:
              </span>
              <div className="flex gap-1">
                <span className="bg-black text-[#FEF08A] px-1.5 py-0.5 border border-gray-700 font-bold">2</span>
                <span className="bg-black text-[#FEF08A] px-1.5 py-0.5 border border-gray-700 font-bold">6</span>
                <span className="bg-black text-[#FEF08A] px-1.5 py-0.5 border border-gray-700 font-bold">0</span>
                <span className="bg-black text-[#FEF08A] px-1.5 py-0.5 border border-gray-700 font-bold">5</span>
                <span className="bg-black text-[#FEF08A] px-1.5 py-0.5 border border-gray-700 font-bold">1</span>
                <span className="bg-black text-[#FEF08A] px-1.5 py-0.5 border border-gray-700 font-bold">2</span>
              </div>
            </div>

            {/* Back to top */}
            <a 
              href="#" 
              onClick={() => handleGlobalClick(700)}
              className="brutal-btn bg-[#FEF08A] text-black font-mono text-xs font-bold px-3 py-1.5 border-2 border-black flex items-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>BACK TO TOP</span>
            </a>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-400">
            <div>
              &copy; 2026 <span className="text-white font-bold">Bastio Septoaji</span>. All Rights Reserved.
            </div>
            
            <div className="flex items-center gap-2 bg-gray-900 px-3 py-1 border border-gray-700 text-[#6EE7B7]">
              <Coffee className="w-3.5 h-3.5 text-yellow-400" />
              <span>Powered by Caffeine, Stack Overflow, and Ctrl+Z</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* MODAL LIHAT / SALIN KODE HTML STANDALONE                 */}
      {/* ======================================================== */}
      {showCodeModal && (
        <div 
          onClick={() => setShowCodeModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white border-4 border-black brutal-shadow-xl max-w-3xl w-full p-4 flex flex-col max-h-[85vh] animate-in zoom-in-95"
          >
            <div className="-mx-4 -mt-4 mb-3 flex justify-between items-center bg-black text-white px-4 py-2.5 border-b-2 border-black font-mono text-xs font-bold">
              <span className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#06B6D4]" />
                <span>STANDALONE FILE: /web-porto/index.html (Update 2026)</span>
              </span>
              <button 
                onClick={() => setShowCodeModal(false)}
                className="w-6 h-6 bg-red-600 text-white font-bold border border-white hover:bg-red-700 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 mb-3">
              <p className="font-grotesk text-xs text-gray-800">
                File ini berisi seluruh kode utuh dalam SATU file index.html (HTML5, Tailwind via CDN, Google Fonts, Font Awesome CDN, CSS retro, &amp; Vanilla JS).
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopyStandaloneCode}
                  className="brutal-btn bg-[#06B6D4] text-black px-4 py-2 border-2 border-black font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-green-900" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'BERHASIL DISALIN KE CLIPBOARD!' : 'Salin Seluruh Kode HTML'}</span>
                </button>
                <button 
                  onClick={handleDownloadSingleFile}
                  className="brutal-btn bg-[#FEF08A] text-black px-4 py-2 border-2 border-black font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File index.html</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-black border-2 border-black p-3 font-mono text-xs text-[#4ADE80]">
              <pre className="whitespace-pre-wrap leading-relaxed select-all">
                {`<!-- 
============================================================
KODE INI BISA LANGSUNG DIBUKA DI BROWSER TANPA INSTALL APAPUN!
Nama: Bastio Septoaji | NIM: 26051204124
S1 Teknik Informatika UNESA (Angkatan 2026)
Asal Sekolah: SMA Negeri 1 Kauman (2023 - 2026)
============================================================
-->`}
              </pre>
              <div className="text-gray-400 mt-2 text-[11px]">
                Untuk menyalin atau mengunduh kode lengkap siap pakai, klik tombol <strong>"Salin Seluruh Kode HTML"</strong> atau <strong>"Download File index.html"</strong> di atas.
              </div>
            </div>

            <div className="mt-3 text-right">
              <button 
                onClick={() => setShowCodeModal(false)}
                className="brutal-btn bg-black text-white px-4 py-1.5 font-mono text-xs font-bold border-2 border-black cursor-pointer"
              >
                TUTUP JENDELA
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
