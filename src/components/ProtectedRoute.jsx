import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { user, isLoading } = useAuth();


    if (isLoading) {
        return <div>Loading...</div>;
    }


    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (roles && !roles.some(role => user.roles.includes(role))) {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default ProtectedRoute;
