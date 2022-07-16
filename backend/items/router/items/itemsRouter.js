const express = require("express");
const {
  getAllItemsByOwnerId,
  getAllItems,
  getItemsByIds,
  deleteItemById,
  createItem,
} = require("../../services/items");

const router = express.Router();

router.get("/owner/:ownerId", async (req, res) => {
  const { ownerId } = req.params;
  try {
    const items = await getAllItemsByOwnerId(ownerId);
    return res.json({
      status: 200,
      data: items,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await getAllItems();
    return res.json({
      status: 200,
      data: items,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.get("/ids", async (req, res) => {
  const { itemIds } = req.body;

  try {
    if (typeof itemIds === "undefined") throw "itemIds is empty";
    const items = await getItemsByIds(itemIds);
    return res.json({
      status: 200,
      data: items,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteItemById(id);

    return res.json({
      status: 200,
      message: "Done",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, amount, ownerId } = req.body;

    await createItem({ name, price, amount }, ownerId);

    return res.json({
      status: 200,
      message: "Done",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

module.exports = router;
