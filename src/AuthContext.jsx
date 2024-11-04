import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token); // Assuming jwt_decode correctly decodes your token
            setUser(decoded);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validate "children" prop using PropTypes
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
