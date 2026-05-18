import Navbar from "@/app/components/Navbar";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-4 animate-pulse"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-64 mb-3 animate-pulse"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-80 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-64 animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6 mb-auto"></div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mt-6 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3"></div>
                  <div className="h-10 bg-red-100 dark:bg-red-900/30 rounded-xl w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
