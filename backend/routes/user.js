const express = require("express");

const checkAuth = require("../middleware/check-auth");
const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/:id", checkAuth, UserController.getUser);

module.exports = router;
