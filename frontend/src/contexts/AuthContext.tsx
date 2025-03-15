import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useCookiesNext } from "cookies-next";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    const token = getCookie("refreshToken")?.toString();
    if (token != null) {
      // Instead of verifying the token (which requires the secret),
      // just decode it to read the payload
      try {
        // This only decodes the JWT payload without verification
        // const decoded = jwt.decode(token) as JwtPayload;
        jwt.decode(token) as JwtPayload;

        // Alternatively, fetch user profile from backend
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
          credentials: "include",
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
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(undefined);
        setIsLoading(false);
      }
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
