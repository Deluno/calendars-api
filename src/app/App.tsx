import { Spin } from 'antd';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import AppLayout from './presentation/components/AppLayout';
import LoginPage from './presentation/pages/LoginPage';

import './App.css';
import RegistrationPage from './presentation/pages/RegistrationPage';
import CalendarPage from './presentation/pages/CalendarPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Navigate to='/login' /> },
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
        element: <CalendarPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<Spin />} />;
}

export default App;
