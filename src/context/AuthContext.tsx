import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';
import { UserProfile, UserRole } from '../types';
import { initialUsers, initialEmployees } from '../utils/seedData';
import { localStore } from '../services/db';

interface AuthContextType {
  user: FirebaseUser | UserProfile | null;
  userProfile: UserProfile | null;
  role: UserRole | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  demoLogin: (role: UserRole) => void;
  logout: () => Promise<void>;
  isLiveAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | UserProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial active user session
  useEffect(() => {
    const initAuth = async () => {
      // 1. Check if Firebase is live and active
      if (isFirebaseConfigured && auth) {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
          if (fbUser) {
            setUser(fbUser);
            // Default role determination or lookup from local users list
            const existingProfile = localStore.users.find(u => u.email === fbUser.email);
            const role: UserRole = fbUser.email?.includes('admin') ? 'HR_ADMIN' : (existingProfile?.role || 'EMPLOYEE');
            const profile: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              role: role,
              employeeId: role === 'HR_ADMIN' ? 'EMP001' : 'EMP00123',
              displayName: fbUser.displayName || (role === 'HR_ADMIN' ? 'Admin User' : 'Rahul Patil'),
              photoURL: fbUser.photoURL || undefined,
            };
            setUserProfile(profile);
          } else {
            // Check local session storage fallback
            checkSavedDemoSession();
          }
          setLoading(false);
        });
        return () => unsubscribe();
      } else {
        checkSavedDemoSession();
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const checkSavedDemoSession = () => {
    try {
      const savedProfile = localStorage.getItem('canarynest_auth_profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUser(profile);
        setUserProfile(profile);
      } else {
        // Default to Demo HR Admin initially for instant review
        const defaultAdmin = initialUsers[0];
        setUser(defaultAdmin);
        setUserProfile(defaultAdmin);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await signInWithEmailAndPassword(auth, email, pass);
      } else {
        // Local validation logic
        const foundUser = localStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
          setUser(foundUser);
          setUserProfile(foundUser);
          localStorage.setItem('canarynest_auth_profile', JSON.stringify(foundUser));
        } else {
          // Auto create session for valid roles
          const isRoleAdmin = email.includes('admin');
          const newProfile: UserProfile = {
            uid: 'usr_' + Date.now(),
            email,
            role: isRoleAdmin ? 'HR_ADMIN' : 'EMPLOYEE',
            employeeId: isRoleAdmin ? 'EMP001' : 'EMP00123',
            displayName: isRoleAdmin ? 'Admin User' : 'Rahul Patil',
            photoURL: isRoleAdmin 
              ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
          };
          setUser(newProfile);
          setUserProfile(newProfile);
          localStorage.setItem('canarynest_auth_profile', JSON.stringify(newProfile));
        }
      }
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = (role: UserRole) => {
    setLoading(true);
    const targetUser = initialUsers.find(u => u.role === role) || (
      role === 'HR_ADMIN' ? initialUsers[0] : initialUsers[1]
    );
    setUser(targetUser);
    setUserProfile(targetUser);
    localStorage.setItem('canarynest_auth_profile', JSON.stringify(targetUser));
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await firebaseSignOut(auth);
      }
      localStorage.removeItem('canarynest_auth_profile');
      setUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        role: userProfile?.role || null,
        loading,
        login,
        demoLogin,
        logout,
        isLiveAuth: isFirebaseConfigured && auth !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
