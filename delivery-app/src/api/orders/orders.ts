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
export const ORDER_STATUS = {
  waitForShipper: "Đang tìm shipper",
  shipperArrivedShop: "Shipper đã đến cửa hàng",
  waitForItems: "Shipper đang lấy hàng",
  shipping: "Shipper đang giao hàng",
  shipped: "Shipper đã giao hàng",
  shipperCancel: "Shipper đã huỷ đơn",
  clientCancel: "Khách hàng đã huỷ đơn",
};

type OrderStatus = keyof typeof ORDER_STATUS;

export const getOrderByStatus = (status: OrderStatus) => {
  return apiGateway.get(`orders/status/${status}`);
};

export const postOrderStatus = (id: string | number) => {
  return apiGateway.post(`orders/change-status/${id}`);
};

export const getCurrentOrder = () => {
  return apiGateway.get("orders/current");
};

export const postShipperReceiveOrder = (orderId: string | number) => {
  return apiGateway.post(`orders/shipper/receive`, { orderId });
};
