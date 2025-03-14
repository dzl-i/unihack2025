import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

// User type based on the response from backend
interface User {
  userId: string;
  name: string;
  email: string;
  profilePic: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    username?: string,
    profilePic?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Get user profile data on mount
  const { data: userData, error: userError } = useRequest("/user/profile");

  // Use effect to handle user authentication state
  useEffect(() => {
    if (userData && !userError) {
      setUser(userData);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [userData, userError]);

  const refreshUserData = async () => {
    try {
      // Use SWR's mutate to revalidate the user profile data
      await mutate("user/profile");
      if (userData) {
        setUser(userData);
        return userData;
      }
      throw new Error("Failed to refresh user data");
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For POST requests with body, we need to manually fetch instead of using the hook
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const loginData = await response.json();
      setUser(loginData);

      // Revalidate the user profile data
      await mutate("user/profile");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    username?: string,
    profilePic?: string
  ) => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, username, profilePic }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const registerData = await response.json();
      setUser(registerData);

      // Revalidate the user profile data
      await mutate("user/profile");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);

      // Revalidate the user profile data (which should now fail and return null)
      await mutate("user/profile");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
