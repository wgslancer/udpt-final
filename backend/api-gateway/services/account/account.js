const { query } = require("../db");

const getAllAccounts = async () => {
  try {
    const res = await query("SELECT * FROM account");
    return res;
  } catch (error) {
    throw Error(error);
  }
};

const getAccountByEmail = async (email) => {
  try {
    const res = await query(`SELECT * FROM account WHERE email = $1`, [email]);
    return res.rows[0];
  } catch (error) {
    throw Error(error);
  }
};

const createAccount = async (account) => {
  const { username, email, password, address, role, phone } = account;

  try {
    const res = await query(
      `insert into account (id, username, password, email, address, role, phone)
values (default, $1, $2, $3, $4, $5, $6);`,
      [username, password, email, address, role, phone]
    );
    return res.rows;
  } catch (error) {
    throw Error(error);
  }
};

const getAccountByIds = async (ids) => {
  try {
    const res = await query(`SELECT * FROM account WHERE id = ANY ($1)`, [ids]);

    return res.rows;
  } catch (error) {
    throw "getAccountByIds has error";
  }
};

const getAccountById = async (id) => {
  try {
    const res = await query(`SELECT * FROM account WHERE id = $1`, [id]);

    return res.rows[0];
  } catch (error) {
    throw "getAccountByIds has error";
  }
};
module.exports = {
  getAllAccounts,
  getAccountByEmail,
  createAccount,
  getAccountByIds,
  getAccountById,
};
