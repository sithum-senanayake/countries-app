const SkeletonCountryLoader = () => {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-600"></div>
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
        </div>
      </div>
    )
  }
  
  export default SkeletonCountryLoader