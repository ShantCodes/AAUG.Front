import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileEditForm = () => {
    const [formData, setFormData] = useState({
        Name: "",
        LastName: "",
        NameArmenian: "",
        LastNameArmenian: "",

        Email: "",
        CanGetNotfiedByMail: false,
        ProfilePictureFile: null,
        NationalCardFile: null,
        UniversityCardFile: null,
        ReceiptFile: null
    });

    const [files, setFiles] = useState({
        profilePicture: null,
        nationalCard: null,
        universityCard: null
    });

    const [expandedImage, setExpandedImage] = useState(null);

    useEffect(() => {
        // Fetch user data on component mount
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("jwtToken"); // or retrieve it from your state management
                const response = await axios.get("http://localhost:37523/api/AaugUser/GetCurrentAaugUserFull", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const userData = response.data;
                setFormData({
                    Name: userData.name || "",
                    LastName: userData.lastName || "",
                    NameArmenian: userData.nameArmenian || "",
                    LastNameArmenian: userData.lastNameArmenian || "",
                    Email: userData.email || "",
                    CanGetNotfiedByMail: userData.canGetNotfiedByMail || false,
                    ProfilePictureFile: null, // Will be handled separately
                    NationalCardFile: null, // Will be handled separately
                    UniversityCardFile: null, // Will be handled separately
                    ReceiptFile: null // Will be handled separately
                });

                // Fetch files if available
                const profilePicture = userData.profilePictureFileId
                    ? await axios.get(`http://localhost:37523/api/Media/DownloadFile/${userData.profilePictureFileId}`, {
                        responseType: "blob",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    : null;

                const nationalCard = userData.nationalCardFileId
                    ? await axios.get(`http://localhost:37523/api/Media/DownloadFile/${userData.nationalCardFileId}`, {
                        responseType: "blob",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    : null;

                const universityCard = userData.universityCardFileId
                    ? await axios.get(`http://localhost:37523/api/Media/DownloadFile/${userData.universityCardFileId}`, {
                        responseType: "blob",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    : null;

                const receipt = userData.receiptFileId
                    ? await axios.get(`http://localhost:37523/api/Media/DownloadFile/${userData.receiptFileId}`, {
                        responseType: "blob",
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    : null;

                setFiles({
                    profilePicture: profilePicture ? URL.createObjectURL(profilePicture.data) : null,
                    nationalCard: nationalCard ? URL.createObjectURL(nationalCard.data) : null,
                    universityCard: universityCard ? URL.createObjectURL(universityCard.data) : null
                });

            } catch (error) {
                console.error("Error fetching user data", error);
                // Handle error (e.g., display an error message)
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("jwtToken"); // or retrieve it from your state management

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.put("http://localhost:37523/api/AaugUser/EditAaugUserFull", data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            // Handle success (e.g., display a success message or redirect the user)
        } catch (error) {
            console.error("Error updating profile", error);
            // Handle error (e.g., display an error message)
        }
    };

    const handleImageClick = (imageUrl) => {
        setExpandedImage(imageUrl);
    };

    const closeModal = () => {
        setExpandedImage(null);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side: Text Inputs */}
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">Name:</label>
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">Last Name:</label>
                        <input
                            type="text"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">Name Armenian:</label>
                        <input
                            type="text"
                            name="NameArmenian"
                            value={formData.NameArmenian}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">Last Name Armenian:</label>
                        <input
                            type="text"
                            name="LastNameArmenian"
                            value={formData.LastNameArmenian}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">Email:</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="inline-flex items-center text-gray-700 font-semibold">
                            <input
                                type="checkbox"
                                name="CanGetNotfiedByMail"
                                checked={formData.CanGetNotfiedByMail}
                                onChange={handleChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">Can Get Notified By Mail</span>
                        </label>
                    </div>
                </div>

                {/* Right Side: File Inputs and Image Previews */}
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">Profile Picture:</label>
                        {files.profilePicture && (
                            <img
                                src={files.profilePicture}
                                alt="Profile Picture"
                                className="max-w-xs cursor-pointer hover:opacity-75"
                                onClick={() => handleImageClick(files.profilePicture)}
                            />
                        )}
                        <input
                            type="file"
                            name="ProfilePictureFile"
                            onChange={handleFileChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">National Card:</label>
                        {files.nationalCard && (
                            <img
                                src={files.nationalCard}
                                alt="National Card"
                                className="max-w-xs cursor-pointer hover:opacity-75"
                                onClick={() => handleImageClick(files.nationalCard)}
                            />
                        )}
                        <input
                            type="file"
                            name="NationalCardFile"
                            onChange={handleFileChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">University Card:</label>
                        {files.universityCard && (
                            <img
                                src={files.universityCard}
                                alt="University Card"
                                className="max-w-xs cursor-pointer hover:opacity-75"
                                onClick={() => handleImageClick(files.universityCard)}
                            />
                        )}
                        <input
                            type="file"
                            name="UniversityCardFile"
                            onChange={handleFileChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 font-semibold">Receipt:</label>
                        {files.ReceiptFile && (
                            <img
                                src={files.receipt}
                                alt="Receipt"
                                className="max-w-xs cursor-pointer hover:opacity-75"
                                onClick={() => handleImageClick(files.ReceiptFile)}
                            />
                        )}
                        <input
                            type="file"
                            name="ReceiptFile"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Update Profile
                </button>
            </div>

            {expandedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <img src={expandedImage} alt="Expanded" className="max-w-full max-h-full" />
                </div>
            )}
        </form>
    );
};

export default ProfileEditForm;
