const express = require("express");

const axios = require("axios").default;

const {
  ROLE_ARRAY,
  getOrdersByRoleAndId,
  createOrder,
} = require("../../services/orders");
const {
  getOrderItemByOrderId,
  createOrderItem,
} = require("../../services/order_item");

const router = express.Router();

router.get("/:orderId", (req, res) => {
  const { orderId } = req.params;
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
  console.log(req.body);
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

module.exports = router;
