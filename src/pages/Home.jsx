import CountryCard from '../components/CountryCard'
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../services/api'
import { useState, useEffect } from 'react'
import SkeletonCountryLoader from '../components/common/SkeletonCountryLoader'
import Search from '../components/Search'
import Filter from '../components/Filter'

const Home = () => {

    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchLoading, setSearchLoading] = useState(false)
    const [filterLoading, setFilterLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getAllCountries()
                setCountries(data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCountries()
    }, [])

    if (error) {
        return <div className="text-center py-8">Error: {error}</div>
    }

    const handleSearch = async (searchTerm) => {
        setSearchLoading(true)
        try {
            if (!searchTerm.trim()) {
                const data = await getAllCountries()
                setCountries(data)
                return
            }
            const data = await getCountryByName(searchTerm)
            setCountries(data)
        } catch (err) {
            setCountries([])
        } finally {
            setSearchLoading(false)
        }
    }
    
    const handleFilter = async (region) => {
        setFilterLoading(true)
        try {
            if (!region) {
                const data = await getAllCountries()
                setCountries(data)
                return
            }
            const data = await getCountriesByRegion(region)
            setCountries(data)
        } catch (err) {
            setCountries([])
        } finally {
            setFilterLoading(false)
        }
    }

    return (
        <div>
             <div className="flex flex-col md:flex-row justify-between mb-8">
                <Search onSearch={handleSearch} />
                <Filter onFilter={handleFilter} />
            </div>
            
            {/* Added countries count display */}
            <div className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {(loading || searchLoading || filterLoading) 
                    ? 'Loading countries...' 
                    : `Showing ${countries.length} ${countries.length === 1 ? 'country' : 'countries'}`
                }
            </div>

            {(loading || searchLoading || filterLoading) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <SkeletonCountryLoader key={index} />
                    ))}
                </div>
            ) : (
                <>
                    {countries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {countries.map((country) => (
                                <CountryCard key={country.cca3} country={country} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                            No countries found
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home