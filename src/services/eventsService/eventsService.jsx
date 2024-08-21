import BASE_API_URL from "../baseApi";
import React from "react";


const BASE_URL = `${BASE_API_URL}/Events`;


export const fetchEvents = async () => {
    const response = await fetch(`${BASE_URL}/GetAllEvents`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  };

