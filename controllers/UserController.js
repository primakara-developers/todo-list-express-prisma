const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateHash, decodeHash } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async getUserAll(_, res) {
    const result = await prisma.user.findMany();
    const resultWithoutPassword = result.map((item) => {
      const { password, ...sisanya } = item;
      return sisanya;
    });
    res.status(200).json(resultWithoutPassword);
  }

  static async registerUser(req, res) {
    try {
      const { email, password } = req.body;
      const result = await prisma.user.create({
        data: {
          email,
          password: generateHash(password),
        },
      });
      res.status(201).json({ message: "Data succesfuly created", result });
    } catch (err) {
      res.status(400).json({ err });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const result = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (result) {
        const isPasswordValid = decodeHash(password, result.password);
        if (isPasswordValid) {
          const { id } = result;
          res.status(200).json({ token: generateToken(id) });
        } else {
          res.status(400).json({ message: "Password is invalid" });
        }
      } else {
        res.status(400).json({ message: "Invalid email or password" });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  }
}

module.exports = UserController;
