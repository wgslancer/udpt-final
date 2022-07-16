import apiGateway from "../../services/api-services";

export const getRole = () => {
  return apiGateway.get("/role");
};
