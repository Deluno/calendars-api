import { RootState } from '@/app/data/store';
import { logout } from '@/app/data/store/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjustedExpirationTime - currentTime;

  return remainingDuration;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userState);

  //Auto logout
  useEffect(() => {
    const remainingTime = calculateRemainingTime(user.expires);
    const timeout = setTimeout(() => {
      dispatch(logout());
      navigate('/login');
    }, remainingTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, navigate, user.expires]);

  if (user.token) {
    return <>{children}</>;
  }

  return <Navigate to='/login' />;
};

export default RequireAuth;
