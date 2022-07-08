const { query } = require("../db");

const getOrderItemByOrderId = async (orderId) => {
  try {
    const result = await query(`SELECT * FROM order_item WHERE orderId = $1`, [
      orderId,
    ]);

    return result.rows;
  } catch (error) {
    throw "getOrderItemByOrderId has error";
  }
};

const createOrderItem = async ({ orderid, itemid, amount }) => {
  try {
    const res = await query(
      `insert into order_item (orderid, itemid, amount)
values ($1,$2,$3);`,
      [orderid, itemid, amount]
    );
  } catch (error) {
    throw "createOrderItem has error";
  }
};

module.exports = {
  getOrderItemByOrderId,
  createOrderItem,
};
