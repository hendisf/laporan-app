export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      
      {/* HEADER */}
      <div className="h-8 w-60 bg-gray-300 rounded animate-pulse"></div>

      {/* CARD */}
      <div className="bg-white shadow-md rounded-xl p-5 space-y-4">
        
        <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* LIST SKELETON */}
        <div className="space-y-3 pt-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border p-3 rounded-lg"
            >
              <div className="space-y-2 w-full">
                <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
        }
