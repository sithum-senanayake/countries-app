import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaGlobe, FaCrown, FaUsers, FaMoneyBillWave, FaLanguage, FaGlobeAmericas, FaMapMarked, FaHeart } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { getCountryByCode } from '../services/api'
import { useAuth } from '../context/authContext'
import { db } from '../firebase/firebase'
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore'

const CountryDetails = ({ country }) => {
  const { userLoggedIn, currentUser } = useAuth();
  const [borderCountries, setBorderCountries] = useState([])
  const [loadingBorders, setLoadingBorders] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (userLoggedIn && currentUser) {
      const checkFavorite = async () => {
        const favoriteRef = doc(db, 'favorites', currentUser.uid, 'countries', country.cca3);
        const docSnap = await getDoc(favoriteRef);
        setIsFavorite(docSnap.exists());
      };
      checkFavorite();
    }
    
    if (country.borders?.length > 0) {
      const fetchBorderCountries = async () => {
        setLoadingBorders(true)
        try {
          const borderPromises = country.borders.map(code => getCountryByCode(code))
          const borderData = await Promise.all(borderPromises)
          const bordersWithNames = borderData.map(country => ({
            code: country[0].cca3,
            name: country[0].name.common
          }))
          setBorderCountries(bordersWithNames)
        } catch (error) {
          // if names can't be fetched, show the codes
          setBorderCountries(country.borders.map(code => ({ code, name: code })))
        } finally {
          setLoadingBorders(false)
        }
      }
      
      fetchBorderCountries()
    }
  }, [country.borders, country.cca3, userLoggedIn, currentUser])

  const toggleFavorite = async () => {
    if (!userLoggedIn || !currentUser) return;
    
    const favoriteRef = doc(db, 'favorites', currentUser.uid, 'countries', country.cca3);
    
    try {
      if (isFavorite) {
        await deleteDoc(favoriteRef);
      } else {
        await setDoc(favoriteRef, {
          countryCode: country.cca3,
          timestamp: new Date().toISOString()
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl max-w-7xl mx-auto">
      {/* Country Name Section */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {country.name.common}
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm md:text-base mt-1">
            {country.name.official}
          </p>
        </div>
        {userLoggedIn && (
          <button
            onClick={toggleFavorite}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg 
              ${isFavorite 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/30' 
                : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500'
              } 
              transition-all duration-200 transform hover:scale-105
              sm:min-w-[120px] justify-center
            `}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FaHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'stroke-current'}`} />
            <span className="hidden sm:inline">
              {isFavorite ? 'Favorited' : 'Favorite'}
            </span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6">
        {/* Flag Section */}
        <div className="flex items-center justify-center p-6 sm:p-8 bg-gray-100 dark:bg-gray-700/50 min-h-64 sm:min-h-80">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="max-w-full max-h-64 sm:max-h-80 object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Flag+Not+Available'
              }}
            />
          </div>
        </div>

        {/* Country Details */}
        <div className="p-5 sm:p-8 flex flex-col">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="flex flex-col items-center text-center">
              <FaUsers className="text-blue-500 text-2xl mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
              <p className="font-semibold text-gray-800 dark:text-white">{country.population.toLocaleString()}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <FaGlobeAmericas className="text-green-500 text-2xl mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Region</p>
              <p className="font-semibold text-gray-800 dark:text-white">{country.region}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <FaCrown className="text-amber-500 text-2xl mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Capital</p>
              <p className="font-semibold text-gray-800 dark:text-white">{country.capital?.[0] || 'N/A'}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <FaMoneyBillWave className="text-purple-500 text-2xl mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {country.currencies
                  ? Object.keys(country.currencies)[0]
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg border-b border-gray-200 dark:border-gray-700 pb-2">General Info
              </h3>
              
              <div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                  <span className="w-8"><FaGlobe className="text-blue-500" /></span>
                  <span className="font-medium">Native Name</span>
                </div>
                <p className="pl-8 text-gray-600 dark:text-gray-400">
                  {Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}
                </p>
              </div>
              
              <div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                  <span className="w-8"><FaMapMarkerAlt className="text-red-500" /></span>
                  <span className="font-medium">Sub Region</span>
                </div>
                <p className="pl-8 text-gray-600 dark:text-gray-400">
                  {country.subregion || 'N/A'}
                </p>
              </div>
              
              <div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                  <span className="w-8"><FaGlobe className="text-green-500" /></span>
                  <span className="font-medium">Top Level Domain</span>
                </div>
                <p className="pl-8 text-gray-600 dark:text-gray-400">
                  {country.tld?.join(', ') || 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg border-b border-gray-200 dark:border-gray-700 pb-2">Cultural Info</h3>
              
              <div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                  <span className="w-8"><FaMoneyBillWave className="text-yellow-500" /></span>
                  <span className="font-medium">Currencies</span>
                </div>
                <p className="pl-8 text-gray-600 dark:text-gray-400">
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((c) => `${c.name} (${c.symbol || ''})`)
                        .join(', ')
                    : 'N/A'}
                </p>
              </div>
              
              <div>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                  <span className="w-8"><FaLanguage className="text-purple-500" /></span>
                  <span className="font-medium">Languages</span>
                </div>
                <p className="pl-8 text-gray-600 dark:text-gray-400">
                  {country.languages
                    ? Object.values(country.languages).join(', ')
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Maps Section */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
              Maps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {country.maps?.googleMaps && (
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <FaGlobe className="mr-2 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Google Maps</span>
                </a>
              )}

              {country.maps?.openStreetMaps && (
                <a
                  href={country.maps.openStreetMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                > 
                  <FaMapMarked className="mr-2 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Open Street Maps</span>
                </a>
              )}
            </div>
          </div>

          {/* Border Countries */}
          {country.borders?.length > 0 && (
            <div className="mt-auto">
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-3">Border Countries</h3>
              {loadingBorders ? (
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((code) => (
                    <div 
                      key={code} 
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-md shadow-sm animate-pulse"
                      style={{ width: '80px', height: '36px' }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((border) => (
                    <Link
                      key={border.code}
                      to={`/country/${border.code}`}
                      className="px-4 py-2 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:shadow-md"
                      title={border.name}
                    >
                      {border.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryDetails