const express = require("express");

const axios = require("axios").default;

const {
  ROLE_ARRAY,
  getOrdersByRoleAndId,
  createOrder,
  getOrdersWithStatus,
  ORDER_STATUS,
  getOrderItemsByIds,
  updateStatusById,
  getOrderById,
  getCurrentOrdersByRoleAndId,
  updateShipperReceiveOrder,
} = require("../../services/orders");
const {
  getOrderItemByOrderId,
  createOrderItem,
} = require("../../services/order_item");

const router = express.Router();

router.get("/:orderId", (req, res) => {
  const { orderId } = req.params;
});

router.post("/shipper/receive/:orderId/:shipperId", async (req, res) => {
  try {
    const { orderId, shipperId } = req.params;
    await updateShipperReceiveOrder(orderId, shipperId);

    return res.json({
      status: 200,
      message: "Done",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.get("/current/:role/:id", async (req, res) => {
  const { role, id } = req.params;

  if (!ROLE_ARRAY.includes(role)) {
    throw "Role not existed";
  }
  try {
    const orderResult = await (await getCurrentOrdersByRoleAndId(role, id))[0];
    if (typeof orderResult === "undefined") {
      return res.json({
        status: 200,
        data: undefined,
        message: "Finish",
      });
    }
    const { id: orderId } = orderResult;

    const orderItemsResult = await getOrderItemByOrderId(orderId);

    const itemIds = orderItemsResult.map(({ itemid }) => itemid);

    const {
      data: { data: items },
    } = await axios.get(`http://localhost:3001/items/ids`, {
      data: {
        itemIds,
      },
    });

    return res.json({
      status: 200,
      data: {
        order: orderResult,
        orderItems: orderItemsResult.map((orderItem) => {
          const {
            itemid,
            orderid,
            amount: orderAmount,
            ...orderItemWithoutId
          } = orderItem;

          const { owner, amount, ...findItem } = items.filter(
            (item) => item.id === itemid
          )[0];

          return {
            ...orderItemWithoutId,
            ...findItem,
            orderAmount,
          };
        }),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.get("/order-items/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
  } catch (error) {}
});
router.get("/status/:orderStatus", async (req, res) => {
  const { orderStatus } = req.params;
  try {
    const orders = await getOrdersWithStatus(ORDER_STATUS[orderStatus]);

    const orderIds = orders.map((order) => order.id);

    const orderItemsResult = await getOrderItemsByIds(orderIds);

    const items = await axios.get("http://localhost:3001/items/ids", {
      data: {
        itemIds: orderItemsResult.map((orderItem) => orderItem.itemid),
      },
    });

    return res.json({
      status: 200,
      data: orders.map((order) => {
        return {
          ...order,
          orderItem: orderItemsResult
            .filter((orderItem) => orderItem.orderid === order.id)
            .map((orderItem) => {
              return {
                ...orderItem,
                ...items.data.data.find((item) => item.id === orderItem.itemid),
                amount: orderItem.amount,
              };
            }),
        };
      }),
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.get("/:role/:id", async (req, res) => {
  const { role, id } = req.params;
  if (!ROLE_ARRAY.includes(role)) {
    throw "Role not existed";
  }
  try {
    const orderResult = await (await getOrdersByRoleAndId(role, id))[0];
    const { id: orderId } = orderResult;

    const orderItemsResult = await getOrderItemByOrderId(orderId);

    const itemIds = orderItemsResult.map(({ itemid }) => itemid);

    const {
      data: { data: items },
    } = await axios.get(`http://localhost:3001/items/ids`, {
      data: {
        itemIds,
      },
    });

    return res.json({
      status: 200,
      data: {
        order: orderResult,
        orderItems: orderItemsResult.map((orderItem) => {
          const {
            itemid,
            orderid,
            amount: orderAmount,
            ...orderItemWithoutId
          } = orderItem;

          const { owner, amount, ...findItem } = items.filter(
            (item) => item.id === itemid
          )[0];

          return {
            ...orderItemWithoutId,
            ...findItem,
            orderAmount,
          };
        }),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.post("/create", async (req, res) => {
  const {
    clientid,
    shipperid,
    items,
    totalPrice,
    address,
    phone,
    payment_method,
  } = req.body;
  try {
    const { id } = await createOrder({
      shipperid,
      clientid,
      address,
      status: "Đang tìm shipper",
      payment_method,
      totalprice: totalPrice,
      phone,
    });

    await items.forEach(async (item) => {
      await createOrderItem({
        orderid: id,
        itemid: item.id,
        amount: item.amount,
      });
    });

    return res.json({
      status: 200,
      data: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.post("/change-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const getCurrentStatus = await getOrderById(orderId);
    const { status } = getCurrentStatus[0];

    const findIndexOfStatusValue = Object.values(ORDER_STATUS).findIndex(
      (order) => {
        return status === order;
      }
    );
    const orderStatusKeys = Object.keys(ORDER_STATUS);

    if (findIndexOfStatusValue < orderStatusKeys.length - 1) {
      await updateStatusById(
        orderId,
        ORDER_STATUS[orderStatusKeys[findIndexOfStatusValue + 1]]
      );

      return res.json({
        status: 200,
        message: "Done",
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The index is end",
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Has something wrong",
    });
  }
});

module.exports = router;
