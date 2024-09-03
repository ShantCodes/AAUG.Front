import React from "react";
import ProfileEditForm from "../../_components/userComponents/ProfileEditForm"; // Adjust the path as necessary

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Edit Profile</h1>
            <ProfileEditForm />
        </div>
    );
};

export default ProfilePage;
