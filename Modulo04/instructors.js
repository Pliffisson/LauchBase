const fs = require("fs");
const data = require("./data.json");

//Requisições POST
exports.post = function (req, res) {
  // Validação de dados
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos");
    }
  }

  //Criação da data de nascimento automatica
  req.body.birth = Date.parse(req.body.birth);

  //Criação de uma data automatica no cadastro
  req.body.create_at = Date.now();

  data.instructors.push(req.body);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Arquivo esta com error");
    }

    return res.redirect("/instructors");
  });

  // return res.send(req.body);
};
