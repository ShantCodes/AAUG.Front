import React from "react";
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/AaugUser`;
const token = localStorage.getItem('jwtToken');

export const getUserProfile = async () => {

    const response = await axios.get(`${BASE_URL}/GetCurrentUserInfo`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchUserRole = async () => {
    if (!token) return null;

    try {
        const response = await axios.get(`${BASE_URL}/GetCurrentUserInfo`, getHeaders());
        return response.data.role;
    } catch (error) {
        console.error("Error fetching user role:", error);
        throw error;
    }
};

export const getHeaders = () => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};


