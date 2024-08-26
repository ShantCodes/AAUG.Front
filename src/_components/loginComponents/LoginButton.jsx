import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FingerPrintIcon } from '@heroicons/react/24/outline';

const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-lime-500 transition-colors duration-300"
        >
            <span className="mr-2">Login</span>
            <FingerPrintIcon className="h-6 w-6 text-white" />
        </button>
    );
};

export default LoginButton;
