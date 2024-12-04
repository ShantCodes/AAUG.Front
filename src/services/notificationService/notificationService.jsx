import axios from 'axios';
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/Notifiation`;
const token = localStorage.getItem('jwtToken');

export const sendNotification = async (notification) => {
    try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.post(
            `${BASE_URL}/SendNotification`,
            notification,
            { headers }
        );
        return response.data; // Optional: return the response for further use
    } catch (error) {
        console.error('Failed to send notification:', error);
        throw error; // Re-throw the error for handling in the calling component
    }
};

export const savePushSubscription = async (subscriptionData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/SaveSubscription`,
            subscriptionData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error saving push subscription:", error);
        throw error;
    }
};