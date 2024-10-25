import React from "react";
import ProfileEditForm from "../../_components/userComponents/ProfilePreview"; // Adjust the path as necessary
import NavMenu from "../../_components/NavMenu";
import ProfilePreview from "../../_components/userComponents/ProfilePreview";

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Edit Profile</h1>
            <div className="flex flex-col md:flex-row w-full max-w-6xl px-4">
                {/* Left Side - NavMenu */}
                <div className="md:w-1/4 w-full mb-8 md:mb-0 z-50">
                    <NavMenu />
                </div>

                {/* Right Side - ProfilePreview */}
                <div className="md:w-3/4 w-full md:ml-8">
                    <ProfilePreview />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
