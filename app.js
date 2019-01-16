const http = require("http");
const fs = require("fs");

const rqListener = (req, res) => {
  const { method, url } = req;

  if (url === "/") {
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", chunk => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      fs.writeFileSync("message.txt", "DUMMY");
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

const server = http.createServer(rqListener);

server.listen(3000);
