import React from "react";
import axios from "axios";
import BASE_API_URL from "../baseApi";

const BASE_URL = `${BASE_API_URL}/Media`;

export const getProfilePictureUrl = (fileId) => {
    return `${BASE_URL}/DownloadFile/${fileId}`;
};

export const downloadFile = (fileId) => {
    return `${BASE_URL}/DownloadFile/${fileId}`;
};