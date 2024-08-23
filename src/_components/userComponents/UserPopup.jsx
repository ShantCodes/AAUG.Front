import React from 'react';

const UserPopUp = ({ userInfo }) => {
    return (
        <div className="absolute left-0 mt-2 p-4 bg-white rounded shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p>{`${userInfo.name} ${userInfo.lastName}`}</p>
            <p>{`${userInfo.nameArmenian} ${userInfo.lastNameArmenian}`}</p>
            <button
                onClick={() => {
                    localStorage.removeItem('jwtToken'); // Remove token on logout
                    window.location.href = '/login'; // Redirect to login page
                }}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default UserPopUp;
