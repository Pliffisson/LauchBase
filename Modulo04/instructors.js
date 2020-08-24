const fs = require("fs");
const data = require("./data.json");

// Create
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  // Validação do formulário
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos");
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    birth,
    name,
    services,
    gender,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Error na gravação do arquivo");

    return res.redirect("/instructors");
  });

  //   return res.send(req.body);
};
