import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupButton from "./SignupButton";

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

        const signupData = new FormData();
        signupData.append("Username", formData.username);
        signupData.append("Password", formData.password);
        signupData.append("ConfirmPassword", formData.confirmPassword);
        signupData.append("Name", formData.name);
        signupData.append("LastName", formData.lastName);
        signupData.append("NameArmenian", formData.nameArmenian);
        signupData.append("LastNameArmenian", formData.lastNameArmenian);
        signupData.append("Email", formData.email);

        try {
            // Make the signup request
            await axios.post("http://localhost:37523/api/Authentication/Register", signupData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Automatic login after successful signup
            const loginData = new FormData();
            loginData.append("username", formData.username);
            loginData.append("password", formData.password);

            const loginResponse = await axios.post("http://localhost:37523/api/Authentication/login", loginData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

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
