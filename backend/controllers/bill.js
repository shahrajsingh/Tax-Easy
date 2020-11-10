const User = require("../models/user");
const Inventory = require("../models/inventory");
const Bill = require("../models/bill");

exports.getBills = (req, res, next) => {
  Bill.find({ IssuedBy: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "data found",
        result: result,
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
      const CompanyName = result.CompanyName;
      const Address = result.Address;
      Bill.findById({ _id: req.query.billid })
        .then((result) => {
          res.status(200).json({
            message: "data found",
            result: result,
            CompanyName: CompanyName,
            Address: Address,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "server error",
            result: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "server error",
        result: err,
      });
    });
};

exports.issueInvoice = (req, res, next) => {
  const bill = new Bill({
    IssuedBy: req.body.IssuedBy,
    IssuedTo: req.body.IssuedTo,
    IssueDate: req.body.IssueDate,
    Items: req.body.Items,
    Total: req.body.Total,
  });
  bill
    .save()
    .then((result) => {
      bulkUpdateOperations = [];
      const mongoose = require("mongoose");
      for (let a = 0; a < req.body.Items.length; a++) {
        const value = -req.body.Items[a].Qty;
        bulkUpdateOperations.push({
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(req.body.Items[a]._id) },
            update: {
              $inc: { Qty: value },
            },
          },
        });
      }
      Inventory.collection
        .bulkWrite(bulkUpdateOperations)
        .then((result) => {
          console.log(result);
          if (result) {
            res.status(201).json({
              message: "Bill Issued Successfully",
              result: "success",
            });
          } else {
            //console.log(result);
            res.status(500).json({
              message: "error occurred while saving",
              result: result,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            message: "error has occurred at 90",
            result: error,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "server error has occured",
        result: err,
      });
    });
};

exports.getItemNames = (req, res, next) => {
  Inventory.find({ SellerId: req.params.id })
    .then((result) => {
      let arr = [];
      for (let i = 0; i < result.length; i++) {
        arr.push({ id: result[i]._id, name: result[i].ItemName });
      }
      res.status(200).json({
        message: "item found",
        result: arr,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error has occurred at 334",
        result: err,
      });
    });
};
