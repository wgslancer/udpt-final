import apiGateway from "../../services/api-services";

export const getAllItems = () => {
  return apiGateway.get("/items");
};

export const getAllItemsOwner = () => {
  return apiGateway.get("/items/owner");
};

export const deleteItemById = (id: string | number) => {
  return apiGateway.delete(`/items/${id}`);
};

export const postCreateItem = ({ name, amount, price }: any) => {
  return apiGateway.post("/items", { name, amount, price });
};
