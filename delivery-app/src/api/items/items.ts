import apiGateway from "../../services/api-services";

export const getAllItems = () => {
  return apiGateway.get("/items");
};
