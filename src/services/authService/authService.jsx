// src/services/authService.js
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/AaugUser`;

const getUserInfo = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/GetCurrentUserInfo`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

export { getUserInfo };
