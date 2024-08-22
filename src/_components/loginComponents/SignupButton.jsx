import React from 'react';
import { Link } from 'react-router-dom';

const SignupButton = () => {
    return (
        <Link
            to="/Signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-lime-500"
        >
            Sign up
        </Link>
    );
};

export default SignupButton;
