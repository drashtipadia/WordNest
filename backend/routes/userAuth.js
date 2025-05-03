import jwt from "jsonwebtoken";
import { JWT_KEY } from "../constants.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ meassage: "Authentication token required" });
  }
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ meassage: "Token expire please login again" });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
