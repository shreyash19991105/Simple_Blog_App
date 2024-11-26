import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  return token;
};
