import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentOrder } from "../../../api/orders/orders";

const CurrentOrder = () => {
  const [currentOrder, setCurrentOrder] = useState<any>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentOrder()
        .then((res: any) => {
          if (typeof res?.message === "object") {
            navigate("/");
          } else {
            setCurrentOrder(res.data);
          }
        })
        .catch((err) => console.log(err));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex-center-center min-h-screen">
      <div className="bg-white rounded-lg p-20 flex flex-col justify-between">
        <div>
          <h1>Current order</h1>
        </div>
        <br />
        <p>Status: {currentOrder?.order.status}</p>
        <div className="divider"></div>
        <ul>
          {currentOrder?.orderItems.map(({ name, price, orderAmount }: any) => (
            <li key={`order-item-current-${name}`}>
              <p>Name: {name}</p>
              <p>Price: {price}</p>
              <p>Amount: {orderAmount}</p>
              <div className="divider-horizontal"></div>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrentOrder;
