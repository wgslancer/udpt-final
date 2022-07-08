import { LoginInterface } from "../../provider/AuthProvider/AuthProvider";
import apiGateway from "../../services/api-services";

export const postLogin = ({ email, password }: LoginInterface) => {
  return apiGateway.post("/login", { email, password });
};

export const postVerify = (token: string) => {
  return apiGateway.post("/login/verify", { token });
};
