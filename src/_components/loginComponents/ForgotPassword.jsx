import React, { useState } from "react";
import { forgotPassword } from "../../services/authService/authService"; // Adjust the path as necessary

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setError(""); // Clear previous errors

        try {
            await forgotPassword(email); // Call the service
            setMessage("Password reset instructions have been sent to your email.");
        } catch (err) {
            setError(err); // Set the error message
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
            <form className="bg-white shadow-md rounded-lg p-10 w-80 h-auto" onSubmit={handleForgotPassword}>
                <h2 className="text-2xl font-bold text-center mb-8">Forgot Password</h2>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Send new password via email
                    </button>
                </div>
                <div className="text-center mt-4 space-y-2">
                    <a href="/login" className="text-blue-500 hover:underline underline-offset-2">
                        Back to Login
                    </a>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
