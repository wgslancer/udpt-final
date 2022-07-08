const express = require("express");

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/orders", require("./router/ordersRouter/ordersRouter"));

app.listen(PORT, () => {
  console.log(`Services: Orders service`);
  console.log(`Running on ${PORT}`);
});
