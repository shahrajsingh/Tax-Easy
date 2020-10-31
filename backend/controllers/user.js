const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../Models/user");

const User = require("../Models/user");

exports.createUser = (req, res, next) => {
  console.log(req.body);
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
  console.log(req.body);
  User.findOne({ Email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log();
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
  user
    .findById({ _id: id })
    .then((result) => {
      if (result) {
        const data = {
          companyName: result.companyName,
          address: result.address,
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
        result: error,
      });
    });
};
