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

export const getCurrentUserFull = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/GetCurrentAaugUserFull`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data.');
    }
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




//////////////////////////



export const approveSubscription = async (aaugUserId, isApproved) => {
    try {
        const response = await axios.put(`${BASE_URL}/ApproveSubscribtion/${aaugUserId}/${isApproved}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error approving user:', error);
        throw error;
    }
};

export const approveAaugUser = async (aaugUserId, isApproved) => {
    try {
        const response = await axios.put(`${BASE_URL}/ApproveAaugUser/${aaugUserId}/${isApproved}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error approving user:', error);
        throw error;
    }
};

export const assignRoleToUser = async (userId, roleId) => {
    try {
        await axios.post(
            `${BASE_URL}/AssignRolesToUser/${userId}/${roleId}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        throw new Error('Failed to assign role.');
    }
};

export const unassignRoleFromUser = async (userId, roleId) => {
    try {
        await axios.delete(
            `${BASE_URL}/UnAssignRolesToUser/${userId}/${roleId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        throw new Error('Failed to unassign role.');
    }
};

export const deleteUser = async (aaugUserId) => {
    try {
        await axios.delete(`${BASE_URL}/DeleteUser/${aaugUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error('Failed to delete user.');
    }
};

export const editUserProfile = async (formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/EditAaugUserFull`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update profile.');
    }
};

export const getUserData = async (aaugUserId) => {
    try {
        const response = await axios.get(`${BASE_URL}/GetAaugUserFullByAaugUserId/${aaugUserId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user data.');
    }
};

export const getNotApprovedUsers = async (pageNumber, pageSize = 7) => {
    try {
        const response = await axios.get(`${BASE_URL}/GetNotApprovedUsers/${pageNumber}/${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching not approved users:', error);
        throw error;
    }
};



export const getSubscribedNotSubApprovedUsers = async (pageNumber, pageSize = 7) => {
    try {
        const response = await axios.get(`${BASE_URL}/GetSubscribedNotSubApprovedUsers/${pageNumber}/${pageSize}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching subscribed not sub-approved users:', error);
        throw error;
    }
};


export const getAllRoles = async () => {
    const response = await axios.get(`${BASE_URL}/GetAllRoles`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


export const getOtherUserProfile = async () => {
    const response = await axios.get(`${BASE_URL}/GetUserProfile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};


export const updateSubscription = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${BASE_URL}/UpdateSubscribtion`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to upload the file.');
    }
};

export const updateSubscriptionWithCode = async (code) => {
    try {
        const response = await axios.put(`${BASE_URL}/UpdateSubscribtionWithCode/${code}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update subscription with code:", error);
        throw error;
    }
};


export const getSubscribedUsers = async (pageNumber, pageSize = 7) => {
    try {
        const response = await axios.get(`${BASE_URL}/GetIsSubApprovedUsers/${pageNumber}/${pageSize}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching subscribed users:', error);
        throw error; // Re-throw error to handle it in the component
    }
};


export const getApprovedUsers = async (pageNumber, pageSize = 7) => {
    try {
        const response = await axios.get(`${BASE_URL}/GetApprovedUsers/${pageNumber}/${pageSize}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching approved users:', error);
        throw error; // Re-throw error to handle it in the component
    }
};

export const uploadProfilePicture = async (file, token) => {
    const formData = new FormData();
    formData.append('profilePictureFile', file);

    return await axios.put(`${BASE_URL}/InsertProfilePicture`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
    });
};

