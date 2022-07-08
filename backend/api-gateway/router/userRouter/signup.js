const express = require("express");
const { createAccount } = require("../../services/account/account");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { ...account } = req.body;

    const result = await createAccount(account);

    return res.json({
      status: 200,
      data: result,
      message: "Success",
    });
  } catch (error) {
    console.log(`Signup`, error);
    return res.status(404).json({
      status: 404,
      message: "Something when wrongF",
    });
  }
});

module.exports = router;
