const express = require("express");
const {
  getAllItemsByOwnerId,
  getAllItems,
  getItemsByIds,
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

module.exports = router;
