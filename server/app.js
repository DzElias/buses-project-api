import express from "express";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "../client/build")));

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);

export default app;
