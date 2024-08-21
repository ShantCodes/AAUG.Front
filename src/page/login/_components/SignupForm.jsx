import React from "react";
import SignupButton from "./SignupButton";

const SignupForm = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-md rounded-lg p-10 w-80 h-auto">
                <h2 className="text-2xl font-bold text-center mb-8">Signup</h2>
                <div className="mb-6">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm Password"
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