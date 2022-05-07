const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { decodeToken } = require("../helpers/jwt");

function userAuthentication(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    req.loggedUser = decodeToken(token);
    next();
  } else {
    res.status(401).json({ message: "Invalid login" });
  }
}

async function userAuthorization(req, res, next) {
  if (req.loggedUser.role === "user") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden access" });
  }
}

async function trueUserAuthorization(req, res, next) {
  // idUser di todo = idUser yang login

  const { id } = req.params;
  console.log(id);
  const result = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  console.log(result);

  if (result) {
    const idUserYANGlogin = req.loggedUser.id;

    if (result.userId === idUserYANGlogin) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden access" });
    }
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

module.exports = {
  userAuthentication,
  userAuthorization,
  trueUserAuthorization,
};
