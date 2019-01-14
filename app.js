const http = require("http");
const fs = require("fs");

const rqListener = (req, res) => {
  const { method, url } = req;

  if (url === "/") {
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

const server = http.createServer(rqListener);

server.listen(3000);
