import driver from "../models/driver.js";
import bus from "../models/bus.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const signIn = async (req, res) => {
  console.log(req.body);
  const driverFound = await driver.findOne({ ci: req.body.ci });
  if (!driverFound) return res.status(400).json({ message: "driverNotFound" });

  const matchPassword = driverFound.password == req.body.password;
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "invalid password" });

  const token = jwt.sign({ id: driverFound.ci }, SECRET, {
    expiresIn: 43200, //12 hs
  });

  await driver.findOneAndUpdate({ ci: driverFound.ci }, { token: token });
  await bus.findOneAndUpdate(
    { _id: driverFound.busId },
    { actualDriver: driverFound.name }
  );
  res.json({ token: token, busId: driverFound.busId });
};
