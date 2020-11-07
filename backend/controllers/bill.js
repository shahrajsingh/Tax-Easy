const User = require("../models/user");

exports.getBills = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "data found",
        result: result.Bills,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        result: err,
      });
    });
};

exports.getBill = (req, res, next) => {
  User.findOne({ _id: req.query.userid })
    .then((result) => {
      res.status(200).json({
        message: "data found",
        result: result.Bills[req.query.billid],
        CompanyName: result.CompanyName,
        Address: result.Address,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        result: err,
      });
    });
};

exports.issueInvoice = (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { $push: { Bills: req.body } })
    .then((result) => {
      User.findById({ _id: req.params.id })
        .then((result) => {
          let arr = result.Inventory;
          let items = req.body.Items;
          for (let a = 0; a < items.length; a++) {
            for (let b = 0; b < arr.length; b++) {
              if (
                items[a].ItemName === arr[b].ItemName &&
                items[a].Rate === arr[b].Rate
              ) {
                arr[b].Qty -= items[a].Qty;
                break;
              }
            }
          }
          User.findByIdAndUpdate({ _id: req.params.id }, { Inventory: arr })
            .then((result) => {
              res.status(201).json({
                message: "update successfull",
                result: "success",
              });
            })
            .catch((err) => {
              res.status(500).json({ message: "error has occurred at 61" });
            });
        })
        .catch((err) => {
          res.status(500).json({ message: "error has occurred at 64" });
        });
      res.status(201).json({
        message: "update successfull",
        result: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        result: err,
      });
    });
};
exports.getItemNames = (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then((result) => {
      let arr = [];
      for (let i = 0; i < result.Inventory.length; i++) {
        arr.push(result.Inventory[i].ItemName);
      }
      res.status(200).json({
        message: "item found",
        result: arr,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error has occurred at 334",
        result: err,
      });
    });
};
