import React from "react";
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/Events`;
const token = localStorage.getItem('jwtToken');

export const searchEvents = async (searchTerm) => {
    try {
        const url = `${BASE_URL}/SearchEvent/${encodeURIComponent(searchTerm)}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Failed to search the event:', error);
        throw error; // Rethrow the error to be handled in the component if needed
    }
};