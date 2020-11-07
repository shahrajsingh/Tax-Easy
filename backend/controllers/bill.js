const User = require("../models/user");

exports.getBills = (req, res, next) => {
  User.findOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "data found",
      result: result.Bills,
    });
  });
};

exports.getBill = (req, res, next) => {
  console.log(req.query);
  res.status(200).json({
    message: "ok",
  });
};

exports.issueInvoice = (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { $push: { Bills: req.body } })
    .then((result) => {
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
      console.log(err);
      res.status(500).json({
        message: "error has occurred at 334",
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
        console.log(data);
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
      console.log("error", err);
      res.status(500).json({
        result: err,
      });
    });
};
