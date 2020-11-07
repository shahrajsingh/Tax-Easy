const express = require("express");

const checkAuth = require("../middleware/check-auth");
const BillController = require("../controllers/bill");
const router = express.Router();

router.post("/issueinvoice/:id", checkAuth, BillController.issueInvoice);
router.get("", checkAuth, BillController.getItemDetails);
router.get("", checkAuth, BillController.getBill);
router.get("/bills/:id", checkAuth, BillController.getBills);
router.get("/getitemnames/:id", checkAuth, BillController.getItemNames);
module.exports = router;
