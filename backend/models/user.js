const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Inventory = mongoose.Schema({
  _id: { type: String, required: true },
  ItemName: { type: String, required: true },
  Hsn: { type: Number, required: true },
  Qty: { type: Number, required: true },
  Rate: { type: Number, required: true },
});
const items = mongoose.Schema({
  _id: { type: String },
  ItemName: { type: String, required: true },
  Qty: { type: Number, required: true },
  Rate: { type: Number, required: true },
  Discount: { type: Number, required: false },
  TaxPercent: { type: Number, required: true },
  Tax: { type: Number, required: true },
  Amt: { type: Number, required: true },
});
const Bills = mongoose.Schema({
  _id: { type: String },
  IssuedTo: { type: String, required: true },
  IssueDate: { type: String, required: true },
  Items: { type: [items], required: true },
  Total: { type: Number, required: true },
});

//heavy changes database model and schema changes needed to make it more efficient a nd private;
const userSchema = mongoose.Schema({
  Name: { type: String, required: true },
  CompanyName: { type: String, required: true },
  Address: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  AlertQty: { type: Number, required: true },
  IdSys: { type: String, required: true },
  Product_ID_Previous: { type: Number, required: false },
  Inventory: { type: [Inventory] },
  Bills: { type: [Bills] },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
