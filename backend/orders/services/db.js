const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "orders",
  port: "6003",
});

client.connect();

const query = async (query, params) => {
  try {
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  client,
  query,
};
