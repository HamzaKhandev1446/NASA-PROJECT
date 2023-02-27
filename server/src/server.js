const http = require("http");

const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen((req, res) => {
  console.log(`Server is listening on Port: ${PORT}`);
});
