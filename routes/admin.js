const { Router } = require("express");
const AdminController = require("../controllers/AdminController");

const router = Router();

router.get("/admin", AdminController.getAdminAll);
router.post("/admin", AdminController.registerAdmin);
router.post("/login-admin", AdminController.loginAdmin);

module.exports = router;
