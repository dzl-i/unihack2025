import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User {
  userId: string;
  name: string;
  email: string;
  profilePic: string;
}

interface AuthContextType {
  user: Partial<User> | undefined;
  setUser: (u: Partial<User> | undefined) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<User>>();

  useEffect(() => {
    const getToken = async () => {
      const cookieStore = await cookies();
      const token = cookieStore.get("refreshToken")?.value;
      if (token != null) {
        const user = jwt.verify(
          token,
          process.env.REFRESH_JWT_SECRET as string
        ) as JwtPayload;
        setUser(user as Partial<User>);
      }
    };

    getToken();
  }, []);

  const value = {
    user,
    setUser,
    isLoading: !!user,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
