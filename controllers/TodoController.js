const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const todo = ["makan", "minum", "ngegacha"];

class ToDoController {
  static async getToDo(req, res) {
    const result = await prisma.todo.findMany({
      where: {
        userId: req.loggedUser.id,
      },
    });
    res.status(200).json(result);
  }

  static async getToDoDetail(req, res) {
    const { id } = req.params;
    const result = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(result);
  }

  static async createToDo(req, res) {
    const { title, description } = req.body;
    const result = await prisma.todo.create({
      data: {
        title,
        description,
        userId: req.loggedUser.id,
      },
    });
    res.status(201).json({ message: "Data succesfuly created", result });
  }

  static async editToDo(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const result = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          title,
          description,
        },
      });
      res.status(200).json({ message: "Data succesfuly updated", result });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  static async deleteToDo(req, res) {
    try {
      const { id } = req.params;
      await prisma.todo.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ message: "Delete success" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = ToDoController;
