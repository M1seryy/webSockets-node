const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.emit("chatMessage", "Welcome to chat");
  socket.broadcast.emit("chatMessage", "New user connected to chat");

  socket.on("chatMessage", (message) => {
    const data = JSON.parse(message);

    socket.emit("chatMessage", `You: ${data.message}`);
    socket.broadcast.emit("chatMessage", `${data.name}: ${data.message}`);
  });
});

server.listen(8080, () => {
  console.log("server is running on port 8080");
});

// const { WebSocketServer } = require("ws");
// const wss = new WebSocketServer({ port: 8080 });
// const clients = [];
// wss.on("connection", (socket) => {
//   console.log("Client connected");
//   clients.push(socket);
//   console.log(clients.length);
//   for (const client of clients) {
//     if (client === socket) {
//       client.send("Welcome to chat");
//     } else {
//       client.send("New user alert");
//     }
//   }
//   socket.on("message", (message) => {
//     console.log(message.toString("utf-8"));
//     const data = JSON.parse(message.toString("utf-8"));

//     for (const client of clients) {
//       if (client === socket) {
//         console.log("it me");
//         client.send(`You ${data.message}`);
//       } else {
//         console.log("it not ME");
//         client.send(`${data.name}:${data.message}`);
//       }
//     }
//   });
// });
// console.log("server started on port 8080");
