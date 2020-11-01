const express = require("express");

const checkAuth = require("../middleware/check-auth");
const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/:id", checkAuth, UserController.getUser);

router.post("/additem", checkAuth, UserController.addItem);

router.get("/getInventory/:id", checkAuth, UserController.getInventory);

module.exports = router;
