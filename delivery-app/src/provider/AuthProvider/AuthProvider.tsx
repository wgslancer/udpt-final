import { createContext, useContext, useLayoutEffect, useState } from "react";
import { postLogin, postVerify } from "../../api/user/login";

interface AuthProviderProps {
  children: React.ReactNode;
}
export interface LoginInterface {
  email: string;
  password: string;
}
interface AuthContextInterface {
  isLogin: boolean;
  handleOnSubmitLogin: (loginData: LoginInterface) => void;
  handleOnSubmitLogout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleOnSubmitLogin = async ({ email, password }: LoginInterface) => {
    try {
      const response = await postLogin({ email, password });
      setIsLogin(true);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setIsLogin(false);
    }
  };

  const handleOnSubmitLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof token === "string") {
      postVerify(token)
        .then((res) => {
          const { data } = res;
          if (data) {
            setIsLogin(true);
          }
        })
        .catch(() => {
          setIsLogin(false);
        });
    }
  }, []);

  const value: AuthContextInterface = {
    isLogin,
    handleOnSubmitLogin,
    handleOnSubmitLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuthProvider have to use in AuthProvider");
  return context;
};

export default AuthProvider;
