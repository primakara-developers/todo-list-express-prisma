const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateHash, decodeHash } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class AdminController {
  static async getAdminAll(_, res) {
    const result = await prisma.admin.findMany();
    const resultWithoutPassword = result.map((item) => {
      const { password, ...sisanya } = item;
      return sisanya;
    });
    res.status(200).json(resultWithoutPassword);
  }

  static async registerAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const result = await prisma.admin.create({
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

  static async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      console.log(email, password);

      const result = await prisma.admin.findUnique({
        where: {
          email,
        },
      });

      if (result) {
        const isPasswordValid = decodeHash(password, result.password);
        if (isPasswordValid) {
          const { id } = result;
          res.status(200).json({ token: generateToken({ id, role: "admin" }) });
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

module.exports = AdminController;
