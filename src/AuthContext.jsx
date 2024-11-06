import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
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
        navigate("/")
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
