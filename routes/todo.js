const { Router } = require("express");
const TodoController = require("../controllers/TodoController");
const {
  userAuthentication,
  userAuthorization,
  trueUserAuthorization,
} = require("../middlewares/auth");

const router = Router();

router.use(userAuthentication);
router.use(userAuthorization);
router.get("/todo", TodoController.getToDo);
router.post("/todo", TodoController.createToDo);

router.get("/todo/:id", trueUserAuthorization, TodoController.getToDoDetail);
router.put("/todo/:id", trueUserAuthorization, TodoController.editToDo);
router.delete("/todo/:id", trueUserAuthorization, TodoController.deleteToDo);

module.exports = router;
