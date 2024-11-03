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

export const insertNews = async (newsData) => {
    const formData = new FormData();
    formData.append("NewsTitle", newsData.NewsTitle);
    formData.append("NewsDetails", newsData.NewsDetails);
    if (newsData.NewsFile) formData.append("NewsFile", newsData.NewsFile);

    try {
        const response = await axios.post(`${BASE_URL}/InsertNews`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to insert news: " + error.message);
    }
};

export const deleteNews = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/DeleteNews/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error deleting news:", error);
        throw error;
    }
};