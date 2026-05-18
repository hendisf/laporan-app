import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default async function LaporanPage({
  searchParams,
}) {
  // Await searchParams in Next.js 15+
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";

  // filter data dari Supabase
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .ilike("title", `%${query}%`)
    .order("id", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Daftar <span className="text-blue-600">Laporan</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Pantau laporan yang telah dikirimkan oleh masyarakat.
              </p>
            </div>
            <Link href="/laporan/buat">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:-translate-y-0.5 font-semibold flex items-center gap-2 whitespace-nowrap">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Buat Laporan
              </button>
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
            <SearchBar />
          </div>

          {/* JIKA TIDAK ADA DATA */}
          {reports?.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Belum Ada Laporan</h3>
              <p className="text-slate-500 dark:text-slate-400">Tidak ada laporan yang sesuai dengan pencarian Anda.</p>
            </div>
          )}

          {/* LIST DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports?.map((report) => (
              <Link
                key={report.id}
                href={`/laporan/${report.id}`}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1 group-hover:border-blue-200 dark:group-hover:border-blue-800 h-full flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                      {report.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span className="truncate">{report.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {report.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}