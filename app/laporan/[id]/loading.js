import Navbar from "@/app/components/Navbar";

export default function LaporanDetailLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mb-6 animate-pulse"></div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-700 animate-pulse">
            <div className="w-full h-64 md:h-96 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-8"></div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-24"></div>
            </div>

            <div className="space-y-3 mb-10">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/50">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
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
