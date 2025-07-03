export function MovieSkeleton() {
  return (
    <div className="min-h-screen bg-black animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-6 bg-gray-700 rounded w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-[2/3] rounded-lg bg-gradient-to-br from-gray-800 to-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <div className="h-10 bg-gray-700 rounded w-3/4 mb-3" />
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-700 rounded w-12" />
                  <div className="w-1 h-1 bg-gray-700 rounded-full" />
                  <div className="h-4 bg-gray-700 rounded w-16" />
                  <div className="w-1 h-1 bg-gray-700 rounded-full" />
                  <div className="h-4 bg-gray-700 rounded w-14" />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-700 rounded" />
                  <div>
                    <div className="h-6 bg-gray-700 rounded w-12 mb-1" />
                    <div className="h-3 bg-gray-700 rounded w-8" />
                  </div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-20" />
              </div>

              <div>
                <div className="h-6 bg-gray-700 rounded w-16 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    <div className="h-5 bg-gray-700 rounded w-20 mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-3/4" />
                  </div>
                ))}
              </div>

              <div>
                <div className="h-6 bg-gray-700 rounded w-16 mb-3" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white/5 backdrop-blur-md rounded-lg p-3"
                    >
                      <div className="h-4 bg-gray-700 rounded w-24" />
                      <div className="h-4 bg-gray-700 rounded w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-[2/3] rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      ))}
    </div>
  );
}
