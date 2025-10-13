import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage?.getItem("token") || "");
    const [userDetails, setUserDetails] = useState(() => {
        const storedUser = localStorage?.getItem("userDetails");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // ✅ Save token & userDetails in localStorage when they change
    useEffect(() => {
        if (token) {
            localStorage?.setItem("token", token);
        } else {
            localStorage?.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (userDetails) {
            localStorage?.setItem("userDetails", JSON.stringify(userDetails));
        } else {
            localStorage?.removeItem("userDetails");
        }
    }, [userDetails]);

    // ✅ Functions you can use in components
    const login = (newToken, userData) => {
        setToken(newToken);
        setUserDetails(userData);
    };

    const logout = () => {
        setToken("");
        setUserDetails(null);
        localStorage?.removeItem("token");
        localStorage?.removeItem("userDetails");
    };

    const getToken = () => token;
    const getUserDetails = () => userDetails;

    return (
        <AuthContext.Provider
            value={{ token, userDetails, setToken, setUserDetails, getToken, getUserDetails, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Hook for easier use
export const useAuth = () => useContext(AuthContext);
