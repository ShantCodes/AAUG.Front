import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/Events`;

export const getEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetAllEvents`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const insertEvent = async (formData) => {
  try {
    await axios.post(`${BASE_URL}/InsertEvent`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true };
  } catch (error) {
    console.error('There was an error inserting the event!', error);
    return { success: false, error };
  }
};
