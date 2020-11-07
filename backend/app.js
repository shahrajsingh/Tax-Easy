const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./Routes/user");
const inventoryRoutes = require("./routes/inventory");
const billRoutes = require("./routes/bill");
const app = express();

mongoose

  .connect(
    "mongodb+srv://Shahraj:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.9kpzp.gcp.mongodb.net/" +
      "Inventory-billing" +
      "?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.get("", (req, res, next) => {
  res.status(201).send("Server is up and running :)");
});
app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/bill", billRoutes);
module.exports = app;
