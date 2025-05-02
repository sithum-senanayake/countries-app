import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCountryByCode } from '../services/api'
import CountryDetails from '../components/CountryDetails'
import { FaArrowLeft } from 'react-icons/fa'

const CountryPage = () => {
    const { code } = useParams()
    const navigate = useNavigate()
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const data = await getCountryByCode(code)
                setCountry(data[0])
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchCountry()
    }, [code])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-20 h-20">
                        {/* Globe loading animation */}
                        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-400 border-b-blue-300 border-l-blue-200 animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-transparent animate-spin-reverse"></div>
                    </div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        Loading country data...
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center max-w-6xl">
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto">
                    <h3 className="font-bold text-lg mb-2">Error</h3>
                    <p>{error}</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                    <FaArrowLeft /> Back to Home
                </button>
            </div>
        )
    }

    if (!country) {
        return (
            <div className="container mx-auto px-4 py-12 text-center max-w-6xl">
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto">
                    <h3 className="font-bold text-lg mb-2">Error</h3>
                    <p>Country not found.</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                    <FaArrowLeft /> Back to Home
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <button
                onClick={() => navigate(-1)}
                className="mb-12 px-6 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
            >
                <FaArrowLeft /> Back
            </button>
            
            <CountryDetails country={country} />
        </div>
    )
}

export default CountryPage