const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

// index
exports.index = function (req, res) {
  return res.render("members/index", { members: data.members });
};

exports.create = function (req, res) {
  return res.render("members/create");
};

// Create
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  // Validação do formulário
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos");
    }
  }

  birth = Date.parse(req.body.birth);

  let id = 1
  const lastMember = data.members[data.members.length - 1];

  if(lastMember){
    id = lastMember.id + 1
  }

  data.members.push({
    id,
    ...req.body,
    birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Error na gravação do arquivo");

    return res.redirect("/members");
  });

  //   return res.send(req.body);
};

// show
exports.show = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.send("Instrutor não encontrado");

  const member = {
    ...foundMember,
    age: age(foundMember.birth),
  };

  return res.render("members/show", { member });
};

// Edit
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.send("Instrutor não encontrado");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
  };

  return res.render("members/edit", { member });
};

// Put
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function (member, foundIndex) {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send("Instrutor não encontrado");

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Erro ao salvar os dados do formulario");

    return res.redirect(`/members/${id}`);
  });
};

// Delete
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredMembers = data.members.filter(function (member) {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Erro na gravação do arquivo");

    return res.redirect("/members");
  });
};