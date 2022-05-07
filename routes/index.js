const { Router } = require("express");

const adminRouter = require("./admin");
const userRouter = require("./user");
const todoRouter = require("./todo");

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({ message: "Hello Tevyat from Router" });
});

router.use(adminRouter);
router.use(userRouter);
router.use(todoRouter);

module.exports = router;
