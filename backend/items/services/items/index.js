const { query } = require("../db");

const getAllItems = async () => {
  try {
    const res = await query("SELECT * FROM items");

    return res.rows;
  } catch (error) {
    throw "getAllItems has error";
  }
};

const getAllItemsByOwnerId = async (ownerId) => {
  try {
    const res = await query("SELECT * FROM items WHERE owner = $1", [ownerId]);

    return res.rows;
  } catch (error) {
    throw "getAllItemsByOwnerId has error";
  }
};

const getItemsByIds = async (ids) => {
  try {
    const res = await query(`SELECT * FROM items WHERE id = ANY ($1)`, [ids]);
    return res.rows;
  } catch (error) {
    throw "getItemsByIds has error";
  }
};

module.exports = {
  getAllItems,
  getAllItemsByOwnerId,
  getItemsByIds,
};
