import { Schema, model } from "mongoose";

const busSchema = Schema(
  {
    company: String,
    line: String,
    stops: Array,
    nextStop: String,
    latitude: Number,
    longitude: Number,
    ruta: String,
    num: String,
    actualDriver: String,
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);
export default model("Bus", busSchema);
