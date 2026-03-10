import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import AuthPage from '../pages/AuthPage';
import AccountPage from '../pages/AccountPage';
import CartPage from '../pages/CartPage';
import CoursesPage from '../pages/CoursesPage';
import ProductsPage from '../pages/ProductsPage';
import EquipmentPage from '../pages/EquipmentPage';
import PathsPage from '../pages/PathsPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../constants/routes.constants';

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Home />,
    },
    {
        path: ROUTES.AUTH,
        element: <AuthPage />,
    },
    {
        path: ROUTES.ACCOUNT,
        element: (
            <ProtectedRoute>
                <AccountPage />
            </ProtectedRoute>
        ),
    },
    {
        path: ROUTES.COURSES,
        element: <CoursesPage />,
    },
    {
        path: ROUTES.PRODUCTS,
        element: <ProductsPage />,
    },
    {
        path: ROUTES.CART,
        element: (
            <ProtectedRoute>
                <CartPage />
            </ProtectedRoute>
        ),
    },
    {
        path: ROUTES.EQUIPMENT,
        element: <EquipmentPage />,
    },
    {
        path: ROUTES.PATHS,
        element: <PathsPage />,
    }
]);
