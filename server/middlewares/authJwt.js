import { SECRET } from "../config.js";
import Driver from "../models/driver.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.ci = decoded.id;

    const driver = await Driver.findOne({ ci: req.ci });
    if (!driver) return res.status(404).json({ message: "No driver found" });

    if (driver.token === token) {
      return res.status(200).json({ busId: driver.busId });
    }

    return res.status(401).json({ message: "Token is no longer valid" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
