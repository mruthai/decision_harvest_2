// App.tsx
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import Home from './views/Home'
import ProtectedRoutes from './config/ProtectedRoutes';
import Dashboard from './views/Dashboard'
import CornHistory from './views/CornHistory';


const App: React.FC = () => {
  return (
    
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route 
          path='/dashboard'
          element={<ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
          } />
          <Route path='/cornhistory' 
          element={<ProtectedRoutes> 
            <CornHistory />
          </ProtectedRoutes>} />
        </Routes>
      </AuthProvider>
  );
};

export default App;
