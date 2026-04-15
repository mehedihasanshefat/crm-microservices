require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { startConsumer } = require("./kafka/consumer");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// store connected clients
let clients = [];

io.on("connection", (socket) => {
  console.log("Client connected");

  clients.push(socket);

  socket.on("disconnect", () => {
    clients = clients.filter((c) => c !== socket);
  });
});

// make io globally accessible
global.io = io;

server.listen(process.env.PORT, () => {
  console.log("Notification service running");
  startConsumer();
});
