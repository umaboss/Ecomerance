import { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, setToStorage, removeFromStorage } from '../lib/utils';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getFromStorage('user');
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would be an API call
    const mockUser = {
      id: email === 'admin@example.com' ? 1 : 2,
      name: email === 'admin@example.com' ? 'Admin User' : 'John Doe',
      email,
      role: email === 'admin@example.com' ? 'admin' : 'customer',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    };
    
    setUser(mockUser);
    setToStorage('user', mockUser);
    return mockUser;
  };

  const register = async (name, email, password) => {
    // Mock registration
    const newUser = {
      id: Date.now(),
      name,
      email,
      role: 'customer',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    };
    
    setUser(newUser);
    setToStorage('user', newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    removeFromStorage('user');
  };

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    setToStorage('user', updatedUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};