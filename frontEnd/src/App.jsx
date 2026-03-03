import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';

export default function App() {
  return <RouterProvider router={router} />;
}
