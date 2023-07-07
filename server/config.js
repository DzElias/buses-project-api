import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const SECRET = "buses_project_api_secret";
