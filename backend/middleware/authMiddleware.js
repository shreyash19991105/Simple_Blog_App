import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import { ENV_VARS } from "../config/envVars.js";

export const authMiddleware = async (request, response, next) => {
  try {
    const { JWT_SECRET } = process.env;

    const isTokenIncluded =
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer");
    if (!isTokenIncluded) {
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized -  Token Not found" });
    }
    const authorization = request.headers.authorization;
    const accessToken = authorization.split(" ")[1];

    const decoded = jwt.verify(accessToken, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized - User not found " });
    }

    request.user = user;

    next();
  } catch (error) {
    console.log("Error in authMiddleware  :", error.message);
    response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
