import React from "react";
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/AaugUser`;

export const getUserProfile = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.get(`${BASE_URL}/GetCurrentUserInfo`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


