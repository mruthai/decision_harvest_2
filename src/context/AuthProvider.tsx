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
  handleNewUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
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
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>; // Use the User type here
};

export const AuthContext = createContext<AuthContextValue>({
  email: '',
  setEmail: () => {},
  handleNewUser: async () => {},
  password: '',
  setPassword: () => {},
  user: null,
  setUser: () => {},
  userId: '',
  setUserId: () => {},
  handleSignOut: async () => {},
  logout: async () => {},
  handleSignIn: async () => {},
  signIn: async () => {},
  error: null,
  setError: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); 
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
      setUser(currentUser);
      if (currentUser) {
        navigate('/dashboard')
        setUserId(currentUser.uid);
        setUser(currentUser);
        console.log(currentUser.uid)
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(`Error signing in user: ${error.message}`);
      console.error('Error signing in', error);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error: any) {
      setError(`Error logging out: ${error.message}`);
      console.error('Error logging out', error);
    }
  };

  const handleNewUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("Checking Errors to new user");
    try {
      await createUser(email, password);
      console.log(user)
    } catch (error: any) {
      setError(`Error creating user account: ${error.message}`);
      console.error('Error creating user', error);
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user)
    setError("Login Failed");
    try {
      await signInUser(email, password);
      
    } catch (error: any) {
      setError(`Error signing in returning user: ${error.message}`);
      console.error('Error signing in returning user', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser()
      navigate('/')
    } catch (error) {
      console.error('Error signing out', error)
    }
  }

  const value: AuthContextValue = {
    email,
    setEmail,
    handleNewUser,
    handleSignIn,
    handleSignOut,
    password,
    setPassword,
    error,
    setError,
    user,
    userId,
    setUserId,
    setUser,
    signIn: signInUser,
    logout: logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
