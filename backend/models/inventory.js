const mongoose = require("mongoose");
const Inventory = mongoose.Schema({
  ItemName: { type: String, required: true },
  HSN: { type: Number, required: true },
  Qty: { type: Number, required: true },
  Rate: { type: Number, required: true },
});
module.exports = mongoose.model("Inventory", Inventory);
