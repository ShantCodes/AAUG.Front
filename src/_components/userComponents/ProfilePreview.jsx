import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResetPasswordModal from '../loginComponents/ResetPasswordModal';
import defaultProfilePic from '../../assets/polyforms-pfp.webp';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import { getCurrentUserFull } from '../../services/userService/userSerice';


const ProfilePreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [isResetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUserFull();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const getProfilePictureUrl = (fileId) => {
        return fileId ? downloadFile(fileId) : defaultProfilePic;
    };

    const getFileUrl = (fileId) => {
        return fileId ? downloadFile(fileId) : '';
    };

    const openImageFullScreen = (imageUrl) => {
        setFullScreenImage(imageUrl);
    };

    const closeFullScreenImage = () => {
        setFullScreenImage(null);
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading user profile...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    if (!user) {
        return <p className="text-center text-gray-600">No user data found.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 bg-white text-black min-h-screen ">
            <div className="flex flex-col items-center mb-6">
                <img
                    src={getProfilePictureUrl(user.profilePictureFileId)}
                    alt={`${user.name} ${user.lastName}`}
                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 mb-4"
                />
                <h1 className="text-4xl font-bold mb-2">{`${user.name} ${user.lastName}`}</h1>
                <p className="text-lg text-gray-900 mb-4">User ID: {user.id}</p>

                <p className="text-center max-w-2xl text-lg text-gray-950 mb-4">
                    {user.email} <br />
                    {user.lastNameArmenian} <br />
                    {user.nameArmenian} <br />
                    Phone: +98 912 345 6789
                </p>
            </div>

            <button
                onClick={() => setResetPasswordModalOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-red-700 mb-4"
            >
                Reset Password
            </button>

            <button
                onClick={() => navigate('/EditProfile', { state: { user, jwtToken } })}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Edit Profile
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                    <p className="text-lg font-semibold mb-2">National Card:</p>
                    {user.nationalCardFileId ? (
                        <img
                            src={getFileUrl(user.nationalCardFileId)}
                            alt="National Card"
                            className="w-full h-auto border border-gray-500 rounded cursor-pointer"
                            onClick={() => openImageFullScreen(getFileUrl(user.nationalCardFileId))}
                        />
                    ) : (
                        <p className="text-gray-500">N/A</p>
                    )}
                </div>

                <div>
                    <p className="text-lg font-semibold mb-2">University Card:</p>
                    {user.universityCardFileId ? (
                        <img
                            src={getFileUrl(user.universityCardFileId)}
                            alt="University Card"
                            className="w-full h-auto border border-gray-500 rounded cursor-pointer"
                            onClick={() => openImageFullScreen(getFileUrl(user.universityCardFileId))}
                        />
                    ) : (
                        <p className="text-gray-500">N/A</p>
                    )}
                </div>

                <div>
                    <p className="text-lg font-semibold mb-2">Receipt:</p>
                    {user.receiptFileId ? (
                        <img
                            src={getFileUrl(user.receiptFileId)}
                            alt="Receipt"
                            className="w-full h-auto border border-gray-500 rounded cursor-pointer"
                            onClick={() => openImageFullScreen(getFileUrl(user.receiptFileId))}
                        />
                    ) : (
                        <p className="text-gray-500">N/A</p>
                    )}
                </div>
            </div>

            {fullScreenImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeFullScreenImage}
                >
                    <img
                        src={fullScreenImage}
                        alt="Full Screen Preview"
                        className="max-w-full max-h-full"
                    />
                </div>
            )}

            <ResetPasswordModal
                isOpen={isResetPasswordModalOpen}
                onClose={() => setResetPasswordModalOpen(false)}
                jwtToken={jwtToken}
            />
        </div>
    );
};

export default ProfilePreview;
