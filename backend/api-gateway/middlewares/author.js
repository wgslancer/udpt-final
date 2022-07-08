const jwt = require("jsonwebtoken");
const { getAccountByEmail } = require("../services/account/account");

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw "Token is not provide";
    const token = authorization.split(" ")[1];

    const verify = await jwt.verify(token, "udpt");
    const { email } = verify;

    const { id, role } = await getAccountByEmail(email);

    req.decodedData = { email, id, role };

    return next();
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error,
    });
  }
};

module.exports = {
  verifyToken,
};
