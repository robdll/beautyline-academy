import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../constants/routes.constants';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {

    return <Navigate to={`${ROUTES.AUTH}?mode=login&redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
