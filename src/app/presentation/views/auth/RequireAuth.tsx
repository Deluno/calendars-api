import { RootState } from '@/app/data/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = (props: RequireAuthProps) => {
  const { children } = props;

  const user = useSelector((state: RootState) => state.userState);

  if (user.isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to='/login' />;
};

export default RequireAuth;
