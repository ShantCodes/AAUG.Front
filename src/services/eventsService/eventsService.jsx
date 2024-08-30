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



export const getNotApprovedEvents = async () => {
  try {
    // Retrieve the token from local storage (or from your authentication context)
    const token = localStorage.getItem('jwtToken');

    // Make the request with the token included in the headers
    const response = await axios.get(`${BASE_URL}/GetAllNotApprovedEventsForAdmins`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};



export const getAllEvents = async () => {
  try {
    // Retrieve the token from local storage (or from your authentication context)
    const token = localStorage.getItem('jwtToken');

    // Make the request with the token included in the headers
    const response = await axios.get(`${BASE_URL}/GetAllEventsForAdmins`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};


export const insertEvent = async (formData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    await axios.post(`${BASE_URL}/InsertEvent`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` // Add the token in the Authorization header
      },
    });

    return { success: true };
  } catch (error) {
    console.error('There was an error inserting the event!', error);
    return { success: false, error };
  }
};

export const likeEvent = async (eventId, token) => {
  try {
    await axios.post(
      `${BASE_URL}/api/Events/LikeEvent/${eventId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error('Failed to like the event');
  }
};


export const getEventLikes = async (eventId) => {
  const token = localStorage.getItem('jwtToken');

  try {
    const response = await axios.get(
      `${BASE_URL}/GetEventLikes`,
      {
        params: { eventId },
      }
    );
    return response.data; // Assuming the API returns a list of users
  } catch (error) {
    console.error('Error fetching event likes:', error);
    throw error;
  }
};

export const getCurrentUserInfo = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('No token found');

    try {
        const response = await axios.get('http://localhost:37523/api/AaugUser/GetCurrentUserInfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user info:', error);
        throw error;
    }
};

