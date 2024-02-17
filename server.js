const express = require('express');
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    });
});

server.listen(50000, () => {
    console.log("Server running on port 50000");
});
