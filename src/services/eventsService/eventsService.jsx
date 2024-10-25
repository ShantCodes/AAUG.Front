import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/Events`;

export const getEvents = async (pageNumber, pageSize = 4) => {
  try {
    const response = await axios.get(`${BASE_URL}/GetAllEvents/${pageNumber}/${pageSize}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const searchEvents = async (keyWord) => {
  try {
    const response = await axios.get(`${BASE_URL}/SearchEvent/${keyWord}`);
    return response.data;
  }
  catch (error) {
    throw new Error('Failed to search the event');
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


// export const insertEvent = async (formData) => {
//   try {
//     const token = localStorage.getItem('token'); // Retrieve the token from local storage

//     await axios.post(`${BASE_URL}/InsertEvent`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${token}` // Add the token in the Authorization header
//       },
//     });

//     return { success: true };
//   } catch (error) {
//     console.error('There was an error inserting the event!', error);
//     return { success: false, error };
//   }
// };



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

  // If no token, return null or a default value instead of throwing an error
  if (!token) {
    console.warn('No token found, user is not logged in.');
    return null; // or return a default user object if needed
  }

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

export const deleteEvent = async (eventId) => {
  const token = localStorage.getItem('jwtToken');
  return axios.delete(
    `${BASE_URL}/DeleteEvent/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const likeEvent = async (eventId) => {
  const token = localStorage.getItem('jwtToken');
  return axios.post(
    `${BASE_URL}/LikeEvent/${eventId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateEvent = async (formData) => {
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await axios.put(`${BASE_URL}/EditEventAsync`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('There was an error updating the event!', error);
    throw error;
  }
};


export const fetchUserProfile = async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  try {
    const response = await axios.get(`${BASE_URL}/AaugUser/GetCurrentUserInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const fetchReservedDates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Events/GetReservedEventDates`);
    return response.data.map(date => new Date(date));
  } catch (error) {
    console.error('Error fetching reserved dates:', error);
    return [];
  }
};

export const insertEvent = async (eventData) => {
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await axios.post(`${BASE_URL}/Events/InsertEvent`, eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error inserting event:', error);
    throw error;
  }
};

