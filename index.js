const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http
  .createServer((req, res) => {
    let filePath = path.join(
      __dirname,
      req.url === "/" ? "index.html" : req.url,
    );

    let extname = path.extname(filePath);

    let contentType = "text/html";

    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
    }
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == "ENOENT") {
          //Page not found
          fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          });
        } else {
          res.writeHead(500);
          res.end(`server error : ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-type": contentType });
        res.end(content, "utf8");
      }
    });
  })
  .listen(8080);
