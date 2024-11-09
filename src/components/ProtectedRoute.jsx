import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuth();


    if (!user) {
        return <Navigate to="/login" />;
    }

    if (Array.isArray(user.roles)) {
        const hasAccess = user.roles.some(role => roles.includes(role));
        if (!hasAccess) {
            return <Navigate to="/forbidden" />;
        }
    } else {
        console.error("Roles are not in the expected format.");
        return <Navigate to="/forbidden" />;
    }

    return children;
};

export default ProtectedRoute;
