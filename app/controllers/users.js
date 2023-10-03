const User = require("../models/users");
const bcrypt = require("../helpers/handleCrypt");
const code = require("../helpers/handleCodeVerify");
const { generateToken } = require("../helpers/handleToken");

module.exports.getAllUsers = (req, res) => {
  User.find({}).exec(function (err, result) {
    try {
      if (err) {
        res.send({ message: "Error generate in DB" });
      }
      res.send({ data: result });
    } catch (error) {
      console.log("Error generate in data base");
    }
  });
};

module.exports.getUser = (req, res) => {
  User.find({ _id: req.body.id }).exec(function (err, result) {
    try {
      if (result[0]) {
        res.send({ success: true, data: result[0] });
      }
    } catch (err) {
      res.send({ message: "User not found" });
    }
  });
};

module.exports.createUser = (req, res) => {
  try {
    //search user if exists
    User.find({ email: req.body.email }).exec(function (err, result) {
      if (result[0]) {
        res.status(200);
        res.json({
          success: false,
          message: "The user already exists in BD",
        });
      } else {
        //instantiation of a new user and encryptation password
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          cellphone: req.body.phoneNumber,
          password: bcrypt.cryptPassword(req.body.password),
          verifyCode: code.generateCode(5),
        });
        //save the user create into the DB
        user.save(function (err, usuarioDB) {
          if (err) {
            console.log(err);
          }
          res.status(201).json({
            success: true,
            _id: usuarioDB._id,
            message: "User create sucessfull",
          });
        });
      }
    });
  } catch (error) {
    //handle errors
    console.log(error);
  }
};

module.exports.login = (req, res) => {
  User.find({ email: req.body.email }).exec(function (err, result) {
    if (err) {
      res.send({ message: "something wrong" });
    }
    if (result[0]) {
      if (bcrypt.comparePassword(req.body.password, result[0].password)) {
        res.status(200).send({
          success: true,
          message: "sucessfully",
          _id: result[0]._id,
          name: `${result[0].name} ${result[0].lastName}`,
          email: result[0].email,
          role: result[0].role,
          img: result[0].image,
          area: result[0].area,
          date: moment(new Date()).format("YYYY-MM-DD"),
          time: moment(new Date()).format("HH:mm:ss"),
          token: generateToken(result[0]),
        });
        return;
      } else {
        res.send({ success: false, message: "user o password wrong" });
      }
    } else {
      res.send({ success: false, message: "User not register" });
    }
  });
};

module.exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.user.name,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        numberPhone: req.body.user.numberPhone,
      },
    }
  ).exec(function (err, result) {
    try {
      if (err) {
        res.json({ success: false, message: "User not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "User updated successfully" });
      }
    } catch (error) {
      console.log("Error generate:", error);
    }
  });
};

module.exports.deleteUser = function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }).exec(function (err, doc) {
    if (err) {
      res.json({
        success: false,
        message: "something happened in the database",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    }
  });
};

module.exports.forgotPassword = (req, res) => {
  User.find({ email: req.params.email }).exec(function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0]) {
      res.status(200).json({ 
        success: true,
        message: "User found in BD" 
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
  });
};
