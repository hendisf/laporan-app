export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="h-8 w-40 bg-gray-300 rounded animate-pulse"></div>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="p-4 border rounded-lg space-y-2"
        >
          <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>

          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>

          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}

