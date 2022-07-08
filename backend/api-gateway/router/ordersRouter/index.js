const express = require("express");
const axios = require("axios").default;
const { verifyToken } = require("../../middlewares/author");
const {
  getAccountByIds,
  getAccountById,
} = require("../../services/account/account");

const router = express.Router();

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

module.exports = router;
