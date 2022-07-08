const jwt = require("jsonwebtoken");
const { getAccountByEmail } = require("../../services/account/account");

const express = require("express");
const { verifyToken } = require("../../middlewares/author");

const router = express.Router();

router.get("/role", verifyToken, async (req, res) => {
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

router.post("/verify", (req, res) => {
  const { token } = req.body;
  try {
    if (!token) throw "token is missing";

    const verify = jwt.verify(token, "udpt");
    if (verify?.exp) {
      if (Date.now() < verify?.exp * 1000) {
        return res.json({
          status: 200,
          data: true,
        });
      }
    }

    return res.json({
      status: 200,
      data: false,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password: passwordBody } = req.body;
    const findAccount = await getAccountByEmail(email);
    const { password } = findAccount;

    if (password === passwordBody) {
      const token = await jwt.sign(
        {
          email,
        },
        "udpt",
        {
          expiresIn: "1d",
          algorithm: "HS256",
        }
      );
      return res.json({
        status: 200,
        data: {
          token: token,
        },
      });
    }
    return res.json({
      status: 200,
      data: {},
      message: "Email or password has wrong",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 404,
      message: "Something when wrong",
    });
  }
});

module.exports = router;
