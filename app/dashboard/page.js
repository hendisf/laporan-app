"use client";

import {
  useEffect,
  useState,
  useOptimistic,
  startTransition,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/app/components/Navbar";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState([]);

  // ambil data dari supabase dan cek session
  useEffect(() => {
    const checkSessionAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      fetchReports();
    };
    
    checkSessionAndFetch();
  }, [router]);

  async function fetchReports() {
    const { data: reportsData, error } = await supabase
      .from("reports")
      .select("*")
      .order("id", { ascending: false });

    if (!error && reportsData) {
      setData(reportsData);
    }
  }

  // optimistic UI
  const [optimisticReports, removeOptimistic] = useOptimistic(
    data,
    (state, reportId) => state.filter((report) => report.id !== reportId)
  );

  // hapus laporan
  async function handleDelete(id) {
    // UI langsung berubah
    startTransition(() => {
      removeOptimistic(id);
    });

    // delete di supabase
    const { error } = await supabase.from("reports").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus laporan. Silakan coba lagi.");
      return;
    }

    // update state asli
    setData((prev) => prev.filter((report) => report.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Kembali ke Home
              </Link>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Dashboard <span className="text-blue-600">Admin</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Kelola semua laporan yang masuk ke sistem.
              </p>
            </div>
          </div>

          {optimisticReports?.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Belum Ada Laporan</h3>
              <p className="text-slate-500 dark:text-slate-400">Belum ada laporan yang dikirimkan oleh pengguna.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optimisticReports?.map((report) => (
                <div key={report.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col group">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{report.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed line-clamp-3">
                      {report.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-3 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span className="truncate">{report.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {report.date}
                    </div>
                    
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="mt-3 w-full py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-semibold rounded-xl border border-red-200 dark:border-red-800/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      Hapus Laporan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}