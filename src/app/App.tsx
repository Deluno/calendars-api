import { Spin } from 'antd';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import AppLayout from './presentation/components/AppLayout/AppLayout';
import LoginPage from './presentation/pages/LoginPage';

import './App.css';
import RegistrationPage from './presentation/pages/RegistrationPage';
import CalendarPage from './presentation/pages/CalendarPage';
import RequireAuth from '@/app/presentation/views/auth/RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Navigate to='/dashboard' /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegistrationPage />,
      },
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <CalendarPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<Spin />} />;
}

export default App;
