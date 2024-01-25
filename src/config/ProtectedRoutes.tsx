import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

interface ProtectedRoutesProps {
  children: ReactNode;
}
// Wrap ProtectedRoutes around links and views to prevent non-Users to use the application
const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className=" h-screen flex flex-col items-center justify-center">
      <p className="animate-ping  ">
      Loading...
        </p> 
      </div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
