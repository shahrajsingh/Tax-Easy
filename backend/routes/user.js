const express = require("express");

const checkAuth = require("../middleware/check-auth");
const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/:id", checkAuth, UserController.getUser);

router.post("/additem", checkAuth, UserController.addItem);

router.get("/getInventory/:id", checkAuth, UserController.getInventory);

router.get("/getlowstock/:id", checkAuth, UserController.getlowStock);

router.get("/getoutofstock/:id", checkAuth, UserController.getoutofStock);

router.get("/getinventoryitem/:id", checkAuth, UserController.getInventoryItem);

router.put("/updateitem/:id", checkAuth, UserController.updateItem);

router.put("/deleteitem", checkAuth, UserController.deleteItem);
router.post("/issueinvoice/:id", checkAuth, UserController.issueInvoice);
module.exports = router;
