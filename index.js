const formElement = document.getElementById("form");
const chat = document.getElementById("message-box");
// const socket = new WebSocket("ws://localhost:8080");
const socket = io(`http://localhost:8080`);

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const message = e.target.message.value.trim();

  if (name === "" && message === "") {
    return;
  }
  socket.emit("chatMessage", JSON.stringify({ name, message }));
});

const writeMessage = (text) => {
  const line = document.createElement("p");
  line.innerText = text;
  chat.appendChild(line);
};

socket.on("chatMessage", (message) => {
  writeMessage(message);
});
