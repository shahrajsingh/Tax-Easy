const mongoose = require("mongoose");
const Inventory = mongoose.Schema({
  UserIdSystem_Id: { type: String },
  SellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ItemName: { type: String, required: true },
  TaxPercent: { type: Number, required: true },
  Hsn: { type: Number },
  Qty: { type: Number, required: true },
  Rate: { type: Number, required: true },
});
module.exports = mongoose.model("Inventory", Inventory);
