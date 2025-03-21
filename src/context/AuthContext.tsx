import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  username: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setUsername(token);
    }
  }, []);

  const login = (name: string) => {
    setUsername(name);
    Cookies.set("accessToken", name, {
      expires: 1,
      // secure: true,
      // sameSite: "Strict",
    });
  };

  const logout = () => {
    setUsername(null);
    Cookies.remove("accessToken");
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
