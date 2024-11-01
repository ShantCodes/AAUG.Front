// SignupForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupButton from "./SignupButton";
import { signup, login } from "../../services/authService/authService"; // Import the service functions

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        lastName: "",
        nameArmenian: "",
        lastNameArmenian: "",
        email: "",
    });

    const [error, setError] = useState(""); // Error state for signup
    const navigate = useNavigate(); // For navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the signup service function
            await signup(formData);

            // Automatic login after successful signup
            const loginResponse = await login(formData.username, formData.password);

            const token = loginResponse.data; // Retrieve the token from the response
            localStorage.setItem("jwtToken", token); // Store the token in localStorage
            console.log("Login after signup successful!");

            navigate('/', { replace: true }); // Redirect to home page after login
            window.location.reload(); // Reload to update the page with the logged-in state

        } catch (error) {
            setError("Signup failed. Please try again.");
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-10 w-80 h-auto">
                <h2 className="text-2xl font-bold text-center mb-8">Signup</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm Password"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Last Name"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="nameArmenian"
                        value={formData.nameArmenian}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name (Armenian)"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="lastNameArmenian"
                        value={formData.lastNameArmenian}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Last Name (Armenian)"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                    />
                </div>
                <div className="flex justify-center mb-6">
                    <SignupButton />
                </div>
                <div className="text-center mt-4">
                    <a href="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login
                    </a>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
