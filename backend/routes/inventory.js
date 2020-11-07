const express = require("express");

const checkAuth = require("../middleware/check-auth");
const InventoryController = require("../controllers/inventory");
const router = express.Router();

router.get("", checkAuth, InventoryController.getItemDetails);

router.post("/additem", checkAuth, InventoryController.addItem);

router.get("/getInventory/:id", checkAuth, InventoryController.getInventory);

router.get("/getlowstock/:id", checkAuth, InventoryController.getlowStock);

router.get("/getoutofstock/:id", checkAuth, InventoryController.getoutofStock);

router.get(
  "/getinventoryitem/:id",
  checkAuth,
  InventoryController.getInventoryItem
);

router.put("/updateitem/:id", checkAuth, InventoryController.updateItem);

router.put("/deleteitem", checkAuth, InventoryController.deleteItem);

module.exports = router;
