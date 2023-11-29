import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
    const user = localStorage.getItem('user');
    const location = useLocation();

    return <>{user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />}</>;
}

export default RequireAuth;
