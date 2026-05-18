import Navbar from "../components/Navbar";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Tentang <span className="text-blue-600">Kami</span>
            </h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
              LaporAja adalah platform pelaporan online inovatif yang dirancang untuk menjembatani komunikasi antara masyarakat dan pihak berwenang.
            </p>
            
            <p>
              Visi kami adalah menciptakan lingkungan yang lebih baik, aman, dan transparan melalui partisipasi aktif masyarakat. Kami percaya bahwa setiap suara sangat berharga dan berpotensi membawa perubahan yang berarti bagi lingkungan kita.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50 my-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Mengapa Menggunakan LaporAja?
              </h3>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span><strong>Mudah & Cepat:</strong> Proses pelaporan yang sederhana tanpa birokrasi yang rumit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span><strong>Transparan:</strong> Pantau status laporan Anda kapan saja dan dari mana saja.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span><strong>Aman & Rahasia:</strong> Identitas Anda terlindungi dengan sistem keamanan tingkat tinggi.</span>
                </li>
              </ul>
            </div>

            <p>
              Dengan teknologi yang terus berkembang, kami berkomitmen untuk selalu memberikan layanan terbaik dan menjadikan proses pelaporan semudah mengirim pesan teks.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link href="/laporan/buat">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300">
                Mulai Buat Laporan
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
