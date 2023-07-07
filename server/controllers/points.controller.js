import Point from "../models/point.js";

export const getPoints = async (req, res) => {
  const busId = req.params.id;

  try {
    const points = await Point.find({ busId: busId });
    res.send(points);
  } catch (error) {
    res.sendStatus(500);
  }
};
