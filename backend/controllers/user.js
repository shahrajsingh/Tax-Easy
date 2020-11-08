const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      console.log("error at " + err);
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
