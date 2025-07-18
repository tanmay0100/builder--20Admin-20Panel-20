import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app start
    const checkAuth = () => {
      const stored = localStorage.getItem("authUser");
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem("authUser");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call - replace with actual authentication
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Demo admin credentials
    if (email === "admin@sattamatka.com" && password === "admin123") {
      const userData: User = {
        id: "1",
        email: "admin@sattamatka.com",
        role: "admin",
        name: "Super Admin",
      };

      setUser(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    sessionStorage.clear();
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
