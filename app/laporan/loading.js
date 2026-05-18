import Navbar from "@/app/components/Navbar";

export default function LaporanLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2 mx-auto animate-pulse"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full animate-pulse shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
              <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-5"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6 mb-6"></div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
