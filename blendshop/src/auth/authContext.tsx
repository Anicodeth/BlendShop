// src/auth/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import firebaseApp from './firebase'; // Import your Firebase configuration

// Define a TypeScript interface for the user object
interface AuthContextProps {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (user:any) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
