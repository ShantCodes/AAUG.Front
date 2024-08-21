import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
    return (
        <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-lime-500"
        >
            Login
        </Link>
    );
};

export default LoginButton;
