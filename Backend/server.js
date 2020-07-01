const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

// ============ Carregando a estilização da pagina ===============
server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
});

// ======= Fazendo a rota do servidor ========
server.get("/", function (req, res) {
  return res.render("about");
});
server.get("/portfolio", function (req, res) {
  return res.render("portfolio");
});

// ======== Servidor ===========
server.listen(3000, function () {
  console.log("server is running");
});
