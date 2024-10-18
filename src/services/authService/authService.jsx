// src/services/authService.js
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/AaugUser`;

const getUserInfo = async (token) => {
    if (!token) {
        console.warn('No token provided. Skipping user info API call.');
        return null; // Return null or an empty object to signify no user data
    }

    try {
        const response = await axios.get(`${BASE_URL}/GetCurrentUserInfo`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info: blaaah blah blah', error);
        throw error;
    }
};

export { getUserInfo };
