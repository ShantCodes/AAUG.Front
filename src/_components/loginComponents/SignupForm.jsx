import React, { useState } from "react";
import axios from "axios";
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object
        const form = new FormData();
        form.append("Username", formData.username);
        form.append("Password", formData.password);
        form.append("ConfirmPassword", formData.confirmPassword);
        form.append("Name", formData.name);
        form.append("LastName", formData.lastName);
        form.append("NameArmenian", formData.nameArmenian);
        form.append("LastNameArmenian", formData.lastNameArmenian);
        form.append("Email", formData.email);

        try {
            const response = await axios.post("http://localhost:37523/api/Authentication/Register", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // Handle success (e.g., redirect to login or display a success message)
            console.log(response.data);
        } catch (error) {
            // Handle error (e.g., display an error message)
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-10 w-80 h-auto mt-32 w-1/4">
                <h2 className="text-2xl font-bold text-center mb-8">Signup</h2>
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
                <div className="mb-6">
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
