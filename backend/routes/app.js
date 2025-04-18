const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const list = require("../models/list");
const isLoggedIn = require("../middlewares/isLoggedIn");
require("dotenv").config();
router.use(cookieParser());
router.use(express.json());

router.delete("/datadelete", async (req, res) => {
  let { id } = req.body;

  const deleted = await list.findOneAndDelete({ _id: id });

  res.json({ success: true, message: "Data deleted" });
});

router.get("/dataget", async (req, res) => {
  let user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  let data = await list.find({ userId: user.id });
  res.send(data);
});

router.get("/", (req, res) => {
  if (!req.cookies.token) {
    return res.json({ success: false, message: "Cookie not found" });
  }

  jwt.verify(
    req.cookies.token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid token" });
      }
      res.json({ success: true, message: "Cookie found", user: decoded });
    }
  );
});

router.post("/dataadd", async (req, res) => {
  const { name, desc, date ,category } = req.body;
  let user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  try {
    const newList = await list.create({
      name,
      desc,
      category,
      userId: user.id,
      deadLineAt: date,
    });

    res.status(201).json({ success: true, message: "Note added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if(!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  } 
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      res.status(500).json("Internal Server Error");
    } else {
      if (result) {
        req.user = user;
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true, secure: false });

        res.json({
          success: true,
          message: "Login Successful",
          token: token,
        });
      } else {
        res.json({ success: false, message: "Invalid credentails" });
      }
    }
  });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        try {
          const user = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
          });
          if (user) {
            const token = generateToken(user); // Generate token
            res.cookie("token", token, { httpOnly: true }); // Set token in a cookie
            return res.status(201).json({
              success: true,
              message: "User created successfully",
              token: token,
            });
          }
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
      });
    });
  }
});

router.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logout successful" });
});

module.exports = router;
