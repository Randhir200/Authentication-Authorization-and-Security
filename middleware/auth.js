const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  const token = req.header("Token");
  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "token is not found for authorization",
      statusCode: 401,
    });
  }

  const decode = jwt.decode(token);
  console.log(decode);
  next();
};
