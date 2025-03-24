import { createContext, useContext, useEffect, useState } from "react";
import { getStorage, setStorage, removeStorage } from "../utils/storageUtils";
import { toast } from "react-toastify";
// Create AuthContext
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Check localStorage for auth token when app loads
    useEffect(() => {
        const token = getStorage("token");
        if (token) {
            setIsAuthenticated(true);
            setUser(getStorage("userData")); // Fetch actual user data from API if needed
        }
    }, []);

    // Login function
    const login = (token, userData) => {
        setStorage('userData', userData);
        setStorage('token', token);
        setIsAuthenticated(true);
        setUser(userData);
    };

    // Logout function
    const logout = () => {
        removeStorage('userData');
        removeStorage('token');
        setIsAuthenticated(false);
        setUser(null);
        toast.success("Logged out successfully!");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
