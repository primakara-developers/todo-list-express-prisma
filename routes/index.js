const { Router } = require("express");
const TodoController = require("../controllers/TodoController");
const UserController = require("../controllers/UserController");

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({ message: "Hello Tevyat from Router" });
});

router.get("/todo", TodoController.getToDo);
router.get("/todo/:id", TodoController.getToDoDetail);
router.post("/todo", TodoController.createToDo);
router.put("/todo/:id", TodoController.editToDo);
router.delete("/todo/:id", TodoController.deleteToDo);

router.get("/user", UserController.getUserAll);
router.post("/user", UserController.registerUser);
router.post("/login", UserController.loginUser);

module.exports = router;
