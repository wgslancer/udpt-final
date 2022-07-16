const express = require("express");
const { ORDER_STATUS } = require("../../constants/constants");
const axios = require("axios").default;
const { verifyToken } = require("../../middlewares/author");
const {
  getAccountByIds,
  getAccountById,
} = require("../../services/account/account");

const router = express.Router();

router.post("/shipper/receive", verifyToken, async (req, res) => {
  const { orderId } = req.body;

  const { id: shipperId } = req.decodedData;

  try {
    await axios.post(
      `http://localhost:3002/orders/shipper/receive/${orderId}/${shipperId}`
    );

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

router.get("/current", verifyToken, async (req, res) => {
  try {
    const { role, id } = req.decodedData;
    const {
      data: {
        data: { order, orderItems },
      },
    } = await axios(`http://localhost:3002/orders/current/${role}/${id}`);

    const { shipperid, ownerid, clientid, ...orderWithoutId } = order;

    const ids = [shipperid, ownerid, clientid];

    const users = await getAccountByIds(ids);

    return res.json({
      status: 200,
      data: {
        order: {
          ...orderWithoutId,
          shipper: users.filter((user) => user.id === shipperid),
          owner: users.filter((user) => user.id === ownerid),
          client: users.filter((user) => user.id === clientid),
        },
        orderItems,
      },
    });
  } catch (error) {
    return res.json({
      status: 200,
      message: error,
      data: undefined,
    });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { role } = req.decodedData;
  try {
    const {
      data: {
        data: { order, orderItems },
      },
    } = await axios(`http://localhost:3002/orders/${role}/${id}`);

    const { shipperid, ownerid, clientid, ...orderWithoutId } = order;

    const ids = [shipperid, ownerid, clientid];

    const users = await getAccountByIds(ids);

    return res.json({
      status: 200,
      data: {
        order: {
          ...orderWithoutId,
          shipper: users.filter((user) => user.id === shipperid),
          owner: users.filter((user) => user.id === ownerid),
          client: users.filter((user) => user.id === clientid),
        },
        orderItems,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { id } = req.decodedData;

    const { items, totalPrice, address, phone, payment_method } = req.body;

    const findUser = await getAccountById(id);

    const response = await axios.post("http://localhost:3002/orders/create", {
      clientid: findUser.id,
      shipperid: null,
      items,
      totalPrice,
      address,
      phone,
      payment_method,
    });

    if (response.status === 200) {
      return res.json({ status: 200, message: "Created" });
    }
    throw "Create unsuccessful";
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.get("/status/:orderStatus", verifyToken, async (req, res) => {
  const { orderStatus } = req.params;

  if (typeof ORDER_STATUS[orderStatus] === "undefined") {
    return res.status(404).json({
      status: 404,
      message: "Status not found",
    });
  }
  try {
    const response = await axios.get(
      `http://localhost:3002/orders/status/${orderStatus}`
    );

    const { status } = response;

    if (status === 200) {
      const clientIds = response.data.data.map((order) => order.clientid);

      const clientInfo = await getAccountByIds(clientIds);

      return res.json({
        status: 200,
        data: response.data.data.map((order) => {
          return {
            ...order,
            clientInfo: clientInfo.find(
              (client) => client.id === order.clientid
            ),
          };
        }),
      });
    }

    throw "Not found";
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.post("/change-status/:orderId", verifyToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    await axios.post(`http://localhost:3002/orders/change-status/${orderId}`);

    return res.json({
      status: 200,
      message: "done",
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

module.exports = router;
