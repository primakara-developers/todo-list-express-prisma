const { Router } = require("express");
const ToDoController = require("../controllers/ToDoController");

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({ message: "Hello Tevyat from Router" });
});

router.get("/todo", ToDoController.getToDo);
router.get("/todo/:id", ToDoController.getToDoDetail);
router.post("/todo", ToDoController.createToDo);
router.put("/todo/:id", ToDoController.editToDo);
router.delete("/todo/:id", ToDoController.deleteToDo);

module.exports = router;
