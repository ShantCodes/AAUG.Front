import React from "react";
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/SlideShow`;
const token = localStorage.getItem('jwtToken');

const getHeaders = () => {
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    };
};

export const saveSelectedSlides = async (selectedSlideIds) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await axios.put(`${BASE_URL}/SelectSlides`, selectedSlideIds, config);
      console.log('Slides saved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving slides:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export const deleteSlide = async (slideId) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios.delete(`${BASE_URL}/DeleteSlide/${slideId}`, config);
};

export const insertSlideShow = async (file, description, token) => {
    const formData = new FormData();
    formData.append('MediaFile', file);
    formData.append('Description', description);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };

    return await axios.post(`${BASE_URL}/InsertSlideShows`, formData, config);
};

export const getSlidesForAdmin = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.get(`${BASE_URL}/GetSlideShowsFrAdmins`, config);
};


export const fetchSlidesWithTitle = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/GetSlideShowWithTitle`);
        return response.data;
    } catch (error) {
        console.error("Error fetching slideshow data:", error);
        throw error;
    }
};

export const saveSlideShowTitle = async (title) => {
    const formData = new FormData();
    formData.append("Description", title);

    try {
        const response = await axios.post(
            `${BASE_URL}/InsertSlideShowTitle`,
            formData,
            { headers: getHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error("Error saving SlideShow title:", error.response?.data || error.message);
        throw error;
    }
};