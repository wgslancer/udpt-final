import apiGateway from "../../services/api-services";

export const postCreateOrder = ({
  items,
  totalPrice,
  address,
  phone,
  payment_method,
}: {
  items: any;
  totalPrice: string;
  address: string;
  phone: string;
  payment_method: string;
}) => {
  return apiGateway.post("/orders/create", {
    items,
    totalPrice,
    address,
    phone,
    payment_method,
  });
};
