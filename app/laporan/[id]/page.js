import { supabase } from "@/lib/supabase";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

export default async function DetailLaporan({ params }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 pb-20 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 max-w-2xl mx-auto p-8 rounded-3xl border border-red-200 dark:border-red-800">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Supabase ⚠️</h2>
            <pre className="text-sm text-red-800 dark:text-red-300 whitespace-pre-wrap">{error.message}</pre>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 pb-20 text-center">
          <div className="bg-slate-100 dark:bg-slate-800 max-w-2xl mx-auto p-12 rounded-3xl border border-slate-200 dark:border-slate-700">
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500 dark:text-slate-400">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Data tidak ditemukan 😢</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Laporan yang Anda cari tidak ada atau telah dihapus.</p>
            <Link href="/laporan" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Kembali ke Daftar Laporan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // STATUS COLOR
  const getStatusClasses = (status) => {
    const base = "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide";
    switch (status?.toLowerCase()) {
      case "dikirim":
        return `${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800`;
      case "diproses":
        return `${base} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800`;
      case "selesai":
        return `${base} bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800`;
      default:
        return `${base} bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link href="/laporan" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Kembali ke Daftar Laporan
          </Link>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 shadow-xl shadow-blue-900/5 border border-slate-200 dark:border-slate-700">
            {/* IMAGE */}
            {data.image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
                <img
                  src={data.image_url}
                  alt="Bukti gambar laporan"
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {data.title}
              </h1>
              <span className={getStatusClasses(data.status || 'dikirim')}>
                {data.status || 'dikirim'}
              </span>
            </div>

            {/* CONTENT */}
            <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                {data.content}
              </p>
            </div>

            {/* INFO */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/50">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Detail Laporan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Lokasi</p>
                    <p className="font-medium text-slate-900 dark:text-white">{data.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Tanggal</p>
                    <p className="font-medium text-slate-900 dark:text-white">{data.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}