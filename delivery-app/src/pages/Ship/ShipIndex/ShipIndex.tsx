import { useEffect, useState } from "react";
import {
  getCurrentOrder,
  getOrderByStatus,
  postOrderStatus,
  postShipperReceiveOrder,
} from "../../../api/orders/orders";
import CurrentOrderModal from "../../../components/pages/Ship/CurrentOrderModal";
import useEffectSkipFirstRender from "../../../hooks/useEffectSkipFirstRender";

const ShipIndex = () => {
  const [orders, setOrders] = useState<Array<any>>([]);

  const [currentOrder, setCurrentOrder] = useState<any>(undefined);

  const [currentOrderModalOpen, setCurrentOrderModalOpen] =
    useState<boolean>(false);

  const handleModalOpen = () => {
    setCurrentOrderModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrentOrderModalOpen(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getOrderByStatus("waitForShipper").then((res) => setOrders(res.data));
      getCurrentOrder()
        .then((res) => {
          if (typeof res.data === "undefined") {
            handleModalClose();
          } else {
            handleModalOpen();
            setCurrentOrder(res.data);
          }
        })
        .catch((error) => handleModalClose());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleOnClickContinue = (id: string | number) => {
    postOrderStatus(id);
  };

  const handleOnClickReceive = (id: string | number) => {
    postShipperReceiveOrder(id);
  };

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Client</th>
              <th>Items</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/images/shipper-table-avatar.avif"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{order.clientInfo.name}</div>
                        <div className="text-sm opacity-50">
                          Address: {order.address}
                        </div>
                        <div className="text-sm opacity-50">
                          Phone: {order.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <ul>
                      {order.orderItem.map((item: any) => {
                        return (
                          <li className="divider" key={`order-item-${item.id}`}>
                            <p>
                              <b>Name:</b> {item.name}
                            </p>
                            <p>
                              <b>Amount:</b> {item.amount}
                            </p>
                            <p>
                              <b>Price:</b> {item.price}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td>{order.status}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleOnClickReceive(order.id)}
                    >
                      Receive
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CurrentOrderModal
        onClickContinue={() => handleOnClickContinue(currentOrder?.order.id)}
        address={currentOrder?.order.address}
        items={currentOrder?.orderItems}
        status={currentOrder?.order.status}
        handleClose={handleModalClose}
        handleOpen={handleModalOpen}
        open={currentOrderModalOpen}
      />
    </div>
  );
};

export default ShipIndex;
