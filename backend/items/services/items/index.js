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

const deleteItemById = async (id) => {
  try {
    const res = await query(`DELETE FROM items WHERE id = $1`, [id]);
    return res.rows;
  } catch (error) {
    throw "deleteItemById has error";
  }
};

const createItem = async ({ name, price, amount }, ownerId) => {
  try {
    const res = await query(
      `insert into public.items (id, name, amount, price, createddate, updateddate, owner)
values (default,$1,$3,$2,default,default,$4);`,
      [name, price, amount, ownerId]
    );
  } catch (error) {
    throw "createItem has error";
  }
};

module.exports = {
  getAllItems,
  getAllItemsByOwnerId,
  getItemsByIds,
  deleteItemById,
  createItem,
};
