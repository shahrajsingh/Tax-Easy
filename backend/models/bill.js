const mongoose = require("mongoose");
const items = mongoose.Schema({
  SellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  ItemName: { type: String, required: true },
  Qty: { type: Number, required: true },
  Rate: { type: Number, required: true },
  Discount: { type: Number, required: false },
  TaxPercent: { type: Number, required: true },
  Tax: { type: Number, required: true },
  Amt: { type: Number, required: true },
  UserIdSystem_Id: { type: String },
});
const BillSchema = mongoose.Schema({
  UserIdSystem_Id: { type: String },
  IssuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  IssuedTo: { type: String, required: true },
  IssueDate: { type: String, required: true },
  Items: { type: [items], required: true },
  Total: { type: Number, required: true },
});
module.exports = mongoose.model("Bill", BillSchema);
