const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Inventory = require("../models/inventory");
const user = require("../models/user");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.Password, 10).then((hash) => {
    const user = new User({
      Name: req.body.Name,
      CompanyName: req.body.CompanyName,
      Address: req.body.Address,
      Email: req.body.Email,
      Password: hash,
      AlertQty: req.body.AlertQty,
      IdSys: req.body.IdSys,
      Product_ID_Initial: req.body.Product_ID_Initial,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!",
          result: err,
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;

  User.findOne({ Email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.Password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "8h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600 * 8,
        userId: fetchedUser._id,
        Ls: fetchedUser.AlertQty,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
        result: err,
      });
    });
};

exports.getUser = (req, res, next) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((result) => {
      if (result) {
        const data = {
          companyName: result.CompanyName,
          address: result.Address,
        };
        res.status(200).json({
          message: "data found!",
          result: data,
        });
      } else {
        res.status(401).json({
          message: "no data found!",
          result: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error occured at 93",
        result: err,
      });
    });
};

exports.addItem = (req, res, next) => {
  const item = new Inventory({
    ItemName: req.body.ItemName,
    Hsn: req.body.Hsn,
    Qty: req.body.Qty,
    Rate: req.body.Rate,
  });

  item
    .save()
    .then((result) => {
      const item = result;
      User.findByIdAndUpdate(
        { _id: req.body.id },
        { $push: { Inventory: item } },
        { new: true }
      )
        .then((result) => {
          res.status(201).json({
            message: "Item Added Successfully",
            result: result.Inventory,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Item could not be added",
            result: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Item could not be created",
        result: error,
      });
    });
  res.status(400);
};

exports.getInventory = (req, res, next) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "data found",
          result: result.Inventory,
        });
      } else {
        res.status(401).json({
          message: "user not found",
          result: "no data",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "error has occured",
        result: err,
      });
    });
};

exports.getlowStock = (req, res, next) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((result) => {
      const alertQty = result.AlertQty;
      let arr = [];
      for (let i = 0; i < result.Inventory.length; i++) {
        if (result.Inventory[i].Qty < alertQty) {
          arr.push(result.Inventory[i]);
        }
      }
      res.status(200).json({
        message: "data found",
        result: arr,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error has occured",
        result: err,
      });
    });
};

exports.getoutofStock = (req, res, next) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((result) => {
      let arr = [];
      for (let i = 0; i < result.Inventory.length; i++) {
        if (result.Inventory[i].Qty <= 0) {
          arr.push(result.Inventory[i]);
        }
      }
      res.status(200).json({
        message: "data found",
        result: arr,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error has occured",
        result: err,
      });
    });
};

exports.getInventoryItem = (req, res, next) => {
  const id = req.params.id;
  Inventory.findById({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "data found",
          result: result,
        });
      } else {
        res.status(401).json({
          message: "data not found",
          result: "data not located",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "an error has occured",
        result: err,
      });
    });
};

exports.updateItem = (req, res, next) => {
  const userId = req.params.id;
  Inventory.findByIdAndUpdate(
    { _id: req.body._id },
    {
      itemName: req.body.itemName,
      Qty: req.body.Qty,
      Rate: req.body.Rate,
      Hsn: req.body.Hsn,
    }
  )
    .then((result) => {
      console.log("updated", result);
      //User.findOneAndUpdate({});
      /*continue from here*/
      res.status(201).json({
        message: "update Successfull",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error occured",
        result: err,
      });
    });
};
