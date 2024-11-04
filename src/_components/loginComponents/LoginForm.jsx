import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService/authService"; // Adjust the path as needed
import LoginButton from "./LoginButton";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const token = await login(username, password);
            localStorage.setItem("jwtToken", token);
            console.log("Login successful!");

            navigate("/", { replace: true });
            window.location.reload();

        } catch (error) {
            setError("Login failed. Please check your username and password.");
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
            <form className="bg-white shadow-md rounded-lg p-10 w-80 h-auto" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-center mb-6">
                    <LoginButton />
                </div>
                <div className="text-center mt-4 space-y-2">
                    <a href="/signup" className="text-blue-500 hover:underline underline-offset-2">
                        Don't have an account? Sign up
                    </a>
                </div>
                <div className="text-center mt-4 space-y-2">
                    <a href="/ForgotPassword" className="text-orange-500 hover:underline underline-offset-2">
                        Forgot Password? Click here!
                    </a>
                </div>

            </form>
        </div>
    );
};

export default LoginForm;
