// src/services/authService.js
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/Authentication`;

// const getUserInfo = async (token) => {
//     if (!token) {
//         console.warn('No token provided. Skipping user info API call.');
//         return null; // Return null or an empty object to signify no user data
//     }

//     try {
//         const response = await axios.get(`${BASE_URL}/GetCurrentUserInfo`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching user info: blaaah blah blah', error);
//         throw error;
//     }
// };

// export { getUserInfo };

export const login = async (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response.data;
};

export const resetPassword = async (jwtToken, currentPassword, newPassword, confirmPassword) => {
    const response = await axios.post(
        `${BASE_URL}/resetpassword`,
        {
            currentPassword,
            password: newPassword,
            confirmPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

export const signup = async (formData) => {
    const signupData = new FormData();
    signupData.append("Username", formData.username);
    signupData.append("Password", formData.password);
    signupData.append("ConfirmPassword", formData.confirmPassword);
    signupData.append("Name", formData.name);
    signupData.append("LastName", formData.lastName);
    signupData.append("NameArmenian", formData.nameArmenian);
    signupData.append("LastNameArmenian", formData.lastNameArmenian);
    signupData.append("Email", formData.email);

    return await axios.post(`${BASE_URL}/Register`, signupData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
