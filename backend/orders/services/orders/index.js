const { query } = require("../db");

const ROLE_ID = {
  shipper: "shipperId",
  owner: "ownerId",
  client: "clientId",
};

const ROLE_ARRAY = Object.keys(ROLE_ID);

const getOrdersByRoleAndId = async (role, id) => {
  const roleIdStr = ROLE_ID[role];

  try {
    const result = await query(`SELECT * FROM orders WHERE ${roleIdStr} = $1`, [
      id,
    ]);
    return result.rows;
  } catch (error) {
    throw "getOrdersByShipperId has error";
  }
};

const getOrderById = async (id) => {
  try {
    const result = await query(`SELECT * FROM order WHERE id = $1`, [id]);
    return result.rows;
  } catch (error) {
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

module.exports = {
  getOrdersByRoleAndId,
  getOrderById,
  ROLE_ARRAY,
  createOrder,
};
