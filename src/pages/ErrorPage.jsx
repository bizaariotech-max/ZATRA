import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const backFun = () => navigate(-1);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">

            <h1 style={{ color: "red", fontSize: "4rem" }}>404</h1>
            <h2 className="text-2xl font-bold mb-4">PAGE NOT FOUND</h2>
            <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
            <div className="space-x-4">
                <NavLink to="/" className="text-webprimary opacity-90 transition-opacity duration-200 delay-100 ease-in-out hover:opacity-100 underline">
                    Back to Home
                </NavLink>
                <button
                    className="btn mt-4 bg-webprimary opacity-80 text-white px-4 py-2 rounded transition-opacity duration-200 delay-100 ease-in-out hover:opacity-100"
                    onClick={backFun}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
