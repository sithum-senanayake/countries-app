import React,{ useState } from 'react'
import { FaChevronDown, FaGlobeAmericas } from 'react-icons/fa'

const Filter = ({ onFilter }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const [selectedRegion, setSelectedRegion] = useState('')

  return (
    <div className="relative mb-8 w-full md:w-48">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400">
        <FaGlobeAmericas className="h-4 w-4" />
      </div>
      <select
        value={selectedRegion}
        onChange={(e) => {
          setSelectedRegion(e.target.value)
          onFilter(e.target.value)
        }}
        className="w-full pl-10 pr-8 py-3 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
        <FaChevronDown className="h-4 w-4" />
      </div>
    </div>
  )
}

export default Filter