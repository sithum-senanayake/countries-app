import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaUsers, FaGlobeAmericas } from 'react-icons/fa'

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
      aria-label={`View details for ${country.name.common}`}
    >
      {/* Flag */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Flag+Not+Available'
          }}
        />
      </div>

      {/* Country Details */}
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white line-clamp-2">
          {country.name.common}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center text-base text-gray-600 dark:text-gray-300">
            <FaUsers className="mr-3 text-gray-500 dark:text-gray-400 text-xl" />
            <span className="font-medium">Population:</span>
            <span className="ml-2">{country.population.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center text-base text-gray-600 dark:text-gray-300">
            <FaGlobeAmericas className="mr-3 text-gray-500 dark:text-gray-400 text-xl" />
            <span className="font-medium">Region:</span>
            <span className="ml-2">{country.region}</span>
          </div>
          
          <div className="flex items-center text-base text-gray-600 dark:text-gray-300">
            <FaMapMarkerAlt className="mr-3 text-gray-500 dark:text-gray-400 text-xl" />
            <span className="font-medium">Capital:</span>
            <span className="ml-2">{country.capital?.[0] || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard