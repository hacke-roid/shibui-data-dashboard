const UserDetails = require("../models/User.js");
const encryptData = require("../utils/encryptData.js");
const generateOtp = require("../utils/generateOtp.js");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    let user = await UserDetails.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }
    console.log("hii")
    let otp = await generateOtp();
    console.log(otp)
    let encOtp =await encryptData(otp)
    console.log(encOtp);
    // console.log(otp);

    let createUser = await UserDetails.create({
      email,
      password,
      cotp: otp,
    });
    res.status(201).json({ message: "OTP sent", createUser });
  } catch (err) {
    next(err);
  }
};

const verifyUserViaOtp = async (req, res, next) => {
  try {
    const { email, cotp } = req.body;
    let user = await UserDetails.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    if (user.cotp === cotp) {
      user.cotp = null;
      user.verified = true;
      user.createdAt = null;
      await user.save();
      return res.status(200).json({ message: "User registered successfully" });
    }
    return res.status(400).json({ error: true, message: "Invalid OTP" });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await UserDetails.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }

    //! jwt Token created
    let token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  verifyUserViaOtp,
  loginUser,
};
