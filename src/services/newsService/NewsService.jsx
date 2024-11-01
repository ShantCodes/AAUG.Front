import React from "react";
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/News`;
const token = localStorage.getItem("jwtToken");

export const getNewsTeaser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/GetNewsTeaser`);
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};

export const getNewsById = async (id) => {
    
    try {
        const response = await axios.get(`${BASE_URL}/GetNewsById/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching news item:", error);
        throw error;
    }
};