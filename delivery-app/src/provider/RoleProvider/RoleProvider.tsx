import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../api/user/role";
import useEffectSkipFirstRender from "../../hooks/useEffectSkipFirstRender";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAuthContext } from "../AuthProvider/AuthProvider";

export interface RoleContextInterface {}

const RoleContext = createContext<RoleContextInterface | null>(null);

interface RoleProviderProps {
  children: ReactNode;
  protectRole?: Array<RoleType>;
}

export type RoleType = "client" | "shipper" | "owner";

const RoleProvider = ({ children, protectRole }: RoleProviderProps) => {
  const value: RoleContextInterface = {};
  const navigate = useNavigate();

  const { set, remove } = useLocalStorage();

  const { isLogin } = useAuthContext();

  useEffectSkipFirstRender(() => {
    if (typeof protectRole === "undefined") return;
    if (!isLogin && typeof protectRole !== "undefined") {
      navigate("/login");
      return;
    }
    getRole()
      .then((res) => {
        const { role } = res.data;

        if (!protectRole.includes(role)) {
          navigate("/role-invalid");
          return;
        }

        set("role", role);
        return;
      })
      .catch(() => remove("role"));
  }, []);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRoleContext = () => {
  const context = useContext(RoleContext);

  if (context === null)
    throw Error("useRoleContext need to using in RoleProvider");

  return context;
};

export default RoleProvider;
