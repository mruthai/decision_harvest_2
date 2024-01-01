import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

interface ProtectedRoutesProps {
  children: ReactNode;
}
// Wrap ProtectedRoutes round links and views to prevent non-Users to use the application
const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
