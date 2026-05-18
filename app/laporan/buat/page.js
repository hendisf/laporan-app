"use client";

import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { useState, useActionState } from "react";
import { createReport } from "../../actions/reportAction";

export default function BuatLaporan() {
  const router = useRouter();

  // ✅ Zod form state
  const [state, formAction] = useActionState(createReport, null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Sampaikan <span className="text-blue-600">Laporan</span> Anda
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Bantu kami menciptakan lingkungan yang lebih baik dengan melaporkan hal yang perlu diperhatikan.
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Judul Laporan</label>
              <input
                name="title"
                placeholder="Contoh: Lampu Jalan Mati di Jl. Merdeka"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {state?.errors?.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.title[0]}</p>
              )}
            </div>

            {/* CONTENT */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Isi Laporan</label>
              <textarea
                name="content"
                rows="4"
                placeholder="Deskripsikan dengan jelas masalah yang Anda temui..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {state?.errors?.content && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.content[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DATE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tanggal Kejadian</label>
                <input
                  name="date"
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {state?.errors?.date && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.date[0]}</p>
                )}
              </div>

              {/* LOCATION */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Lokasi</label>
                <input
                  name="location"
                  placeholder="Contoh: Jl. Merdeka Barat"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {state?.errors?.location && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.location[0]}</p>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Pelapor (Rahasia)</label>
              <input
                name="email"
                type="email"
                placeholder="email@anda.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {state?.errors?.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Upload gambar */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bukti Foto (Opsional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none">
                      <span>Pilih gambar</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          setFile(selectedFile);
                          if (selectedFile) {
                            setPreview(URL.createObjectURL(selectedFile));
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">atau seret dan lepas</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF maksimal 10MB</p>
                </div>
              </div>
              
              {/* Preview gambar */}
              {preview && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative group">
                  <img src={preview} alt="preview" className="w-full h-auto object-cover max-h-64" />
                  <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="absolute top-2 right-2 bg-slate-900/60 hover:bg-slate-900/80 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              )}
            </div>

            {/* MESSAGES */}
            {state?.message && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                {state.message}
              </div>
            )}

            {state?.success && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Laporan berhasil dikirim! Tim kami akan segera meninjaunya.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:-translate-y-0.5 mt-4"
            >
              KIRIM LAPORAN
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}