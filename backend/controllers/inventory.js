const Inventory = require("../models/inventory");
const User = require("../models/user");

exports.addItem = (req, res, next) => {
  const item = new Inventory({
    SellerId: req.body.SellerId,
    ItemName: req.body.ItemName,
    TaxPercent: req.body.TaxPercent,
    Hsn: req.body.Hsn,
    Qty: req.body.Qty,
    Rate: req.body.Rate,
  });

  item
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Item Added Successfully.",
        result: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Item could not be created",
        result: error,
      });
    });
};

exports.getInventory = (req, res, next) => {
  const id = req.params.id;
  Inventory.find({ SellerId: id })
    .then((result) => {
      res.status(200).json({
        message: "data Found",
        result: result,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "No Data Found!",
        result: err,
      });
    });
};

exports.getlowStock = (req, res, next) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((result) => {
      const alertQty = result.AlertQty;
      Inventory.find({ SellerId: id, Qty: { $lte: alertQty } })
        .then((result) => {
          return res.status(200).json({
            message: "data found",
            result: result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Error!",
            result: err,
          });
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
      const alertQty = 0;
      Inventory.find({ SellerId: id, Qty: { $lte: alertQty } })
        .then((result) => {
          res.status(200).json({
            message: "data found",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error!",
            result: err,
          });
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
      res.status(201).json({ message: "Data Updated.", result: result });
    })
    .catch((err) => {
      res.status(500).json({
        result: err,
        mesage: "server error has occurred",
      });
    });
};

exports.deleteItem = (req, res, next) => {
  const userId = req.body.userId;
  const id = req.body.itemid;

  Inventory.findOneAndDelete({ _id: id })
    .then((result) => {
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
    })
    .catch((err) => {
      res.status(500).json({
        message: "error has occurred while delting",
        result: err,
      });
    });
};

exports.getItemDetails = (req, res, next) => {
  Inventory.findOne({
    SellerId: req.query.userid,
    _id: req.query.itemid,
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "item found",
          result: result,
        });
      } else {
        res.status(401).json({
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
