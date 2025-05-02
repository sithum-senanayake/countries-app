import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { getCountryByCode } from '../services/api';
import { db } from '../firebase/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

const Favourite = () => {
    const { userLoggedIn, currentUser } = useAuth();
    const [favoriteCountries, setFavoriteCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!currentUser) return;
            
            try {
                const favoritesRef = collection(db, 'favorites', currentUser.uid, 'countries');
                const querySnapshot = await getDocs(favoritesRef);
                
                const favoritePromises = querySnapshot.docs.map(async (doc) => {
                    const countryData = await getCountryByCode(doc.id);
                    return countryData[0];
                });
                
                const countriesData = await Promise.all(favoritePromises);
                setFavoriteCountries(countriesData);
            } catch (error) {
                console.error('Error fetching favorite countries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [currentUser]);

    if (!userLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                Favorite Countries
            </h1>
            {loading ? (
                <div className="text-center py-8">Loading favorites...</div>
            ) : favoriteCountries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoriteCountries.map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-600 dark:text-gray-300">
                    No favorite countries yet
                </div>
            )}
        </div>
    );
};

export default Favourite;