import React, { useState, useEffect, createContext, ReactNode, FormEvent } from 'react';
import { auth } from '../../Firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  Auth,
  
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type User = Auth['currentUser'];

export type AuthContextValue = {
  handleSubmitNewUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSubmitSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signIn: (email: string, password: string,) => Promise<void>;
  handleSignOut: () => Promise<void>;
  logout: () => Promise<void>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  user: User | null; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Use the User type here
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextValue>({
  email: '',
  setEmail: () => {},
  handleSubmitNewUser: async () => {},
  password: '',
  setPassword: () => {},
  user: null,
  setUser: () => {},
  handleSignOut: async () => {},
  logout: async () => {},
  handleSubmitSignIn: async () => {},
  signIn: async () => {},
  error: null,
  setError: () => {},
  loading: true,
  setLoading: () => {},

});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Current user: " + currentUser)
      if (currentUser) {
        navigate(process.env.VITE_REACT_APP_DASHBOARD_PATH || '/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  console.log("Pathway",import.meta.env.VITE_REACT_APP_DASHBOARD_PATH)

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email: string, password: string) => {
    setError(null); 
    console.log(`Attempting to sign in user with email: ${email}`); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful'); 
      navigate('/dashboard');
    } catch (error: unknown) { 
      if (error instanceof Error) {
        setError(`Error signing in user: ${error.message}`);
        console.error('Error signing in', error.message); 
      } else {
        setError('An unexpected error occurred during sign in.');
        console.error('An unexpected error occurred during sign in', error);
      }
    }
  };
  

  const logoutUser = async () => {
    try {
      await signOut(auth);
      navigate(process.env.VITE_REACT_APP_HOME_PATH || '/');
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error logging out: ${error.message}`);
        console.error('Error logging out', error);
      }
    }
  };

  const handleSubmitNewUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error creating new user account: ${error.message}`);
        console.error('Error creating user', error);
      }
    }
  };

  const handleSubmitSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error signing in returning user: ${error.message}`);
        console.error('Error signing in returning user', error);
      }
    }
  };

  const handleSignOut = async () => {
    await logoutUser();
  };

  const value: AuthContextValue = {
    handleSubmitNewUser,
    handleSubmitSignIn,
    signIn: signInUser,
    handleSignOut,
    logout: logoutUser,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    user,
    setUser,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
