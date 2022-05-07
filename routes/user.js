const { Router } = require("express");
const UserController = require("../controllers/UserController");

const router = Router();

router.get("/user", UserController.getUserAll);
router.post("/user", UserController.registerUser);
router.post("/login", UserController.loginUser);

module.exports = router;
