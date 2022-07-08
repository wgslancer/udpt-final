const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/login", require("./router/userRouter/index"));
app.use("/signup", require("./router/userRouter/signup"));
app.use("/items", require("./router/itemsRouter/index"));
app.use("/orders", require("./router/ordersRouter/index"));

app.listen(PORT, () => {
  console.log(`Services: API Gateway`);
  console.log(`Running on ${PORT}`);
});
