const Inventory = require("../models/inventory");
const User = require("../models/user");

exports.addItem = (req, res, next) => {
  const item = new Inventory({
    ItemName: req.body.ItemName,
    TaxPercent: req.body.TaxPercent,
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
      ItemName: req.body.ItemName,
      TaxPercent: req.body.TaxPercent,
      Qty: req.body.Qty,
      Rate: req.body.Rate,
      Hsn: req.body.Hsn,
    }
  )
    .then((result) => {
      User.findOneAndUpdate(
        { _id: userId, "Inventory._id": req.body._id },
        {
          $set: {
            "Inventory.$.ItemName": req.body.ItemName,
            "Inventory.$.TaxPercent": req.body.TaxPercent,
            "Inventory.$.Qty": req.body.Qty,
            "Inventory.$.Hsn": req.body.Hsn,
            "Inventory.$.Rate": req.body.Rate,
          },
        }
      )
        .then((result) => {
          res.status(201).json({
            message: "update Successfull",
            result: result,
          });
        })
        .catch((err) => {
          res.status(201).json({
            message: "error occurred",
            result: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error occured",
        result: err,
      });
    });
};

exports.deleteItem = (req, res, next) => {
  const userId = req.body.userId;

  const id = req.body.itemid;

  User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { Inventory: { _id: id } } },
    { safe: true, upsert: true }
  )
    .then((result) => {
      res.status(201).json({
        message: "item deleted",
        result: result.Inventory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "delete error",
        result: err,
      });
    });
};

exports.getItemDetails = (req, res, next) => {
  let data;
  User.findOne({
    _id: req.query.userid,
  })
    .then((result) => {
      if (result) {
        for (let i = 0; i < result.Inventory.length; i++) {
          if (result.Inventory[i].ItemName === req.query.itemname) {
            data = result.Inventory[i];
            break;
          }
        }

        res.status(200).json({
          message: "item found",
          result: data,
        });
      } else {
        res.status(500).json({
          message: "no data",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        result: err,
      });
    });
};
