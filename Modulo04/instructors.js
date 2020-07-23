const fs = require("fs");
const data = require("./data.json");

// Show
exports.show = function (req, res) {
  // req.params
  const { id } = req.params;

  const fondInstructor = data.instructors.find(function (instructor) {
    return id == instructor.id;
  });

  if (!fondInstructor) return res.send("Instrutor não foi encontrado");

  const instructor = {
    ...fondInstructor,
    birth: "",
    services: fondInstructor.services.split(","),
    create_at: "",
  };

  return res.render("instructors/show", { instructor });
};

// Create
exports.post = function (req, res) {
  // Validação de dados
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos");
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const create_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    create_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Arquivo esta com error");
    }

    return res.redirect("/instructors");
  });

  // return res.send(req.body);
};
