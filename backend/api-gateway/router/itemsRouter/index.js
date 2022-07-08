const express = require("express");
const axios = require("axios").default;
const { verifyToken } = require("../../middlewares/author");

const router = express.Router();

router.get("/owner", verifyToken, async (req, res) => {
  const { id, role } = req.decodedData;
  if (role !== "owner") {
    return res.status(401).json({
      status: 401,
      message: `Your account don't have permission`,
    });
  }

  try {
    const response = await axios.get(`http://localhost:3001/items/owner/${id}`);
    return res.json({
      status: 200,
      data: response.data.data,
    });
  } catch (error) {
    return res.json({
      status: 200,
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3001/items`);

    return res.json({
      status: 200,
      data: response.data.data,
    });
  } catch (error) {
    return res.json({
      status: 200,
      message: error,
    });
  }
});

module.exports = router;
