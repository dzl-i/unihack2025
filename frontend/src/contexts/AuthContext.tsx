import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useCookiesNext } from "cookies-next";
// import jwt, { JwtPayload } from "jsonwebtoken";

interface User {
  userId: string;
  name: string;
  email: string;
  profilePic: string;
}

interface AuthContextType {
  user: User | undefined;
  setUser: (u: User | undefined) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
  isLoading: false,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getCookie } = useCookiesNext();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for both tokens - if either exists, try to authenticate
    const accessToken = getCookie("accessToken")?.toString();
    const refreshToken = getCookie("refreshToken")?.toString();
    
    if (accessToken || refreshToken) {
      // Regardless of which token exists, try to fetch the user profile
      // The backend will handle token validation and refresh if needed
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
        credentials: "include", // Important: send cookies with the request
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to fetch user profile");
        })
        .then((userData) => {
          setUser(userData);
        })
        .catch((err) => {
          console.error("Auth error:", err);
          setUser(undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [getCookie]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
