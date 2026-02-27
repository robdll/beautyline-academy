import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import CoursesPage from './pages/CoursesPage';
import ProductsPage from './pages/ProductsPage';
import EquipmentPage from './pages/EquipmentPage';
import PathsPage from './pages/PathsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/autorizzazione",
    element: <AuthPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/corsi",
    element: <CoursesPage />,
  },
  {
    path: "/prodotti",
    element: <ProductsPage />,
  },
  {
    path: "/attrezzature",
    element: <EquipmentPage />,
  },
  {
    path: "/percorsi",
    element: <PathsPage />,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
