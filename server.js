const express = require("express");

const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server);

const messages = [
    {
        text :"Hello I'm a message",
        author: "Antonio Ruiz"
    },
];

app.use(express.static("public"));
io.on("connection", function (socket){

    console.log("Someone has connected with Sockets");
    socket.emit("messages", messages);
    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("messages", messages);
    });
});

server.listen(8080, function() {
    console.log("Server running on http://localhost:8080");
})