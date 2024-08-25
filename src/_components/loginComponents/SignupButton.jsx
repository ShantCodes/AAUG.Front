import React from 'react';

const SignupButton = ({ onClick }) => {
    return (
        <button
            type="submit" // Ensure it submits the form
            onClick={onClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-lime-500"
        >
            Sign up
        </button>
    );
};

export default SignupButton;
