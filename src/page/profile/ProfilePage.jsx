import React from "react";
import ProfileEditForm from "../../_components/userComponents/ProfileEditForm"; // Adjust the path as necessary
import NavMenu from "../../_components/NavMenu";

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Edit Profile</h1>
            <div className="flex flex-col md:flex-row w-full max-w-6xl px-4">
                <div className="md:w-1/4 w-full mb-8 md:mb-0">
                    <NavMenu />
                </div>
                <div className="md:ml-8 w-full">
                    <ProfileEditForm />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
