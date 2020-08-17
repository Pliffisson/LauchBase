const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");

const server = express();

server.use(express.static("public")); // uso de middlewares
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

// ======== Servidor ===========
server.listen(5000, function () {
  console.log("server is running");
});
