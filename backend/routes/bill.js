const express = require("express");

const checkAuth = require("../middleware/check-auth");
const BillController = require("../controllers/bill");
const router = express.Router();

router.get("", checkAuth, BillController.getBill);

router.post("/issueinvoice", checkAuth, BillController.issueInvoice);

router.get("/bills/:id", checkAuth, BillController.getBills);

router.get("/getitemnames/:id", checkAuth, BillController.getItemNames);

module.exports = router;
