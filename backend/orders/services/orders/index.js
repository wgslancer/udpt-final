const { query } = require("../db");

const ROLE_ID = {
  shipper: "shipperId",
  owner: "ownerId",
  client: "clientId",
};

const ORDER_STATUS = {
  waitForShipper: "Đang tìm shipper",
  shipperReceiveOrder: "Shipper đã nhan hàng",
  shipperArrivedShop: "Shipper đã đến cửa hàng",
  waitForItems: "Shipper đang lấy hàng",
  shipping: "Shipper đang giao hàng",
  shipped: "Shipper đã giao hàng",
};

const ORDER_SPECIAL_STATUS = {
  clientCancel: "Khách hàng đã huỷ đơn",
};

const ROLE_ARRAY = Object.keys(ROLE_ID);

const getOrdersWithStatus = async (status) => {
  try {
    const result = await query(`SELECT * FROM orders WHERE status = $1`, [
      status,
    ]);

    return result.rows;
  } catch (error) {
    console.log(error);
    throw "getOrdersWithStatus has error";
  }
};

const getOrdersByRoleAndId = async (role, id) => {
  const roleIdStr = ROLE_ID[role];

  try {
    const result = await query(
      `SELECT * FROM orders WHERE ${roleIdStr} = $1 `,
      [id]
    );
    return result.rows;
  } catch (error) {
    throw "getOrdersByShipperId has error";
  }
};

const getCurrentOrdersByRoleAndId = async (role, id) => {
  const roleIdStr = ROLE_ID[role];

  const statusException = [];

  if (role === "client") {
    statusException.push("Shipper đã giao hàng");
  }

  if (role === "shipper") {
    statusException.push("Shipper đã giao hàng", "Đang tìm shipper");
  }

  try {
    const result = await query(
      `SELECT * FROM ORDERS WHERE ${roleIdStr}= $1 AND status NOT IN (${statusException
        .map((status) => `'${status}'`)
        .join(",")});`,
      [id]
    );
    return result.rows;
  } catch (error) {
    throw "getCurrentOrdersByRoleAndId has error";
  }
};

const getOrderById = async (id) => {
  try {
    const result = await query(`SELECT * FROM orders WHERE id = $1`, [id]);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw "getOrderById has error";
  }
};

const createOrder = async ({
  shipperid,
  clientid,
  address,
  status,
  payment_method,
  totalprice,
  phone,
}) => {
  try {
    const result = await query(
      `insert into public.orders (id, shipperid, clientid, address, status, createddate, updateddate, payment_method,
                           totalprice,phone)
values (default,$1,$2,$3,$4,default,default,$5,$6,$7) RETURNING id;`,
      [shipperid, clientid, address, status, payment_method, totalprice, phone]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getOrderItemsByIds = async (id) => {
  try {
    const result = await query(
      `select * FROM order_item where orderid = ANY ($1);`,
      [id]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const updateStatusById = async (id, status) => {
  try {
    const result = await query(`UPDATE orders SET status = $2 WHERE id = $1`, [
      id,
      status,
    ]);
    return result.rows;
  } catch (error) {
    throw "updateStatusById has an error";
  }
};

const updateShipperReceiveOrder = async (orderId, shipperId) => {
  try {
    const result = await query(
      `UPDATE orders SET status = 'Shipper đã nhan hàng', shipperid = $2 WHERE id = $1;`,
      [orderId, shipperId]
    );
    return result.rows;
  } catch (error) {
    throw "updateShipperReceiveOrder has an error";
  }
};

module.exports = {
  getOrdersByRoleAndId,
  getOrderById,
  ROLE_ARRAY,
  createOrder,
  getOrdersWithStatus,
  ORDER_STATUS,
  getOrderItemsByIds,
  updateStatusById,
  ORDER_SPECIAL_STATUS,
  getCurrentOrdersByRoleAndId,
  updateShipperReceiveOrder,
};
