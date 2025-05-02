import axios from 'axios';

const API_URI = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
    try {
        const response = await axios.get(`${API_URI}/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
}

export const getCountryByName = async (name) => {
    try {
        const response = await axios.get(`${API_URI}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country ${name}:`, error);
        throw error;
    }
}

export const getCountryByCode = async (code) => {
    try {
        const response = await axios.get(`${API_URI}/alpha/${code}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching country with code ${code}:`, error);
        throw error;
    }
}

export const getCountriesByRegion = async (region) => {
    try {
        const response = await axios.get(`${API_URI}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries in region ${region}:`, error);
        throw error;
    }
}

export const getCountriesByLanguage = async (language) => {
    try {
        const response = await axios.get(`${API_URI}/lang/${language}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries with language ${language}:`, error);
        throw error;
    }
}

