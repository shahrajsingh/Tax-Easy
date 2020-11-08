const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
  Inventory: { type: [mongoose.Schema.Types.ObjectId] },
  Bills: { type: [mongoose.Schema.Types.ObjectId] },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
