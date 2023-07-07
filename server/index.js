import { Server as SocketServer } from "socket.io";
import http from "http";

import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import sockets from "./sockets.js";
import app from "./app.js";

// Conexion a base de datos
connectDB();

// Server http
const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log("Server started on port ", PORT);

// Comunicacion por sockets
const io = new SocketServer(httpServer, {
  cors: {
    origin: true,
  },
});
sockets(io);
