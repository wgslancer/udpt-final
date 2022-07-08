const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/items", require("./router/items/itemsRouter"));

app.listen(PORT, () => {
  console.log(`Services: Items service`);
  console.log(`Running on ${PORT}`);
});
