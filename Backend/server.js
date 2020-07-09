const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

// Exportando o modulo de data.js
const videos = require("./data");

// ============ Carregando a estilização da pagina ===============
server.use(express.static("public")); // uso de middlewares

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

// ======= Fazendo a rota do servidor ========
server.get("/", function (req, res) {
  const about = {
    avatar_url:
      "https://avatars0.githubusercontent.com/u/8752955?s=460&u=1b7d0e9bd1ca441996d9e3734942dd6119db0e6e&v=4",
    name: "Pliffisson Gomes",
    role: "Frontend Developer",
    description:
      "Developer Frontend focusing on web and mobile development using, html, css, javascript, node, react and react native technologies.",
    links: [
      { name: "Github", url: "https://github.com/pliffisson" },
      {
        name: "Linkedin",
        url: "https://linkedin.com/in/pliffisson-gomes-622b3551",
      },
    ],
  };

  return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;

  const video = videos.find(function (video) {
    if (video.id == id) {
      return true;
    }
  });

  if (!video) {
    return res.send("Video not found");
  }

  return res.render("video", { video });
});

// ======== Servidor ===========
server.listen(3000, function () {
  console.log("server is running");
});
