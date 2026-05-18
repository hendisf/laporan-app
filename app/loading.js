export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex items-center justify-center p-6">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 animate-pulse">Memuat...</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm animate-pulse">Harap tunggu sebentar, sedang menyiapkan halaman.</p>
      </div>
    </div>
  );
}
