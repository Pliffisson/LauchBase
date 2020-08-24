const fs = require("fs");
const data = require("./data.json");

// Create
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Preencha todos os campos");
    }
  }

  data.instructors.push(req.body);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Error na gravação do arquivo");

    return res.redirect("/instructors");
  });

  //   return res.send(req.body);
};
