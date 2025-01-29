import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let loggedInUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user login event
  socket.on("user-login", (userId) => {
    loggedInUsers.push({ userId, socketId: socket.id });
    console.log(`User logged in: ${userId}`);
    io.emit("update-user-list", loggedInUsers); // Emit updated user list to admin
  });

  // Handle user logout event
  socket.on("disconnect", () => {
    loggedInUsers = loggedInUsers.filter((user) => user.socketId !== socket.id);
    console.log(`User disconnected: ${socket.id}`);
    io.emit("update-user-list", loggedInUsers); // Emit updated user list to admin
  });
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
