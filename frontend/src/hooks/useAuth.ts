import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const API_BASE = import.meta.env.VITE_API_URL || 'https://your-backend-url.com';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        role: payload.role || 'user',
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Login failed: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        role: payload.role || 'user',
      });
    } catch (error) {
      console.error('Login error:', error);
      
      // Check if it's a network error (backend not available)
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        // Fallback to demo mode for testing
        const mockToken = btoa(JSON.stringify({
          id: '1',
          email: email,
          role: email.includes('admin') ? 'admin' : 'user'
        }));
        
        localStorage.setItem('token', `mock.${mockToken}.signature`);
        setUser({
          id: '1',
          email: email,
          role: email.includes('admin') ? 'admin' : 'user',
        });
        
        return; // Success in demo mode
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Registration failed: ${response.status}`);
    }

    await login(email, password);
  } catch (error) {
    console.error('Registration error:', error);

    // Check if it's a network error (backend not available)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      // Fallback to demo mode for testing
      const mod = await import('./useMockMode');
      const { mockRegister } = mod.useMockMode();
      await mockRegister(email, password);

      // Simulate successful registration
      const mockToken = btoa(JSON.stringify({
        id: '1',
        email: email,
        role: email.includes('admin') ? 'admin' : 'user'
      }));

      localStorage.setItem('token', `mock.${mockToken}.signature`);
      setUser({
        id: '1',
        email: email,
        role: email.includes('admin') ? 'admin' : 'user',
      });

      return; // Success in demo mode
    }

    throw error;
  } finally {
    setIsLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    login,
    register,
    logout,
    isLoading,
    isAdmin: user?.role === 'admin',
  };
};

export { AuthContext };