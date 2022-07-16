const jwt = require("jsonwebtoken");
const { getAccountByEmail } = require("../../services/account/account");

const express = require("express");
const { verifyToken } = require("../../middlewares/author");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const { email } = req.decodedData;

    const { role } = await getAccountByEmail(email);

    return res.json({
      status: 200,
      data: {
        role,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

module.exports = router;
