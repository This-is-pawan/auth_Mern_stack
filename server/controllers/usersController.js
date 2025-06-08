require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { user_models } = require("../models/userModels");
const { transporter } = require("../config/nodemailer");

exports.register = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.json({ success: false, message: "missing something" });
  }

  try {
    const user_check = await user_models.findOne({ email });
    if (user_check) {
      return res.json({ success: false, message: "user is invalid" });
    }

    const hash_password = await bcrypt.hash(password, 10);
    const user_save = new user_models({ name, password: hash_password, email });
    await user_save.save();

    const token = jwt.sign({ id: user_save._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Authentication",
      text: `Welcome to my website. Your account has been created with email: ${email}`,
    };

    await transporter.sendMail(mailOption);

    res.json({ success: true, message: "register successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Email and password are required" });
  }

  try {
    const user = await user_models.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, msg: "Invalid email" });
    }

    // Convert password to string before comparing
    const isMatch = await bcrypt.compare(String(password), user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 12 * 24 * 60 * 60 * 1000, // 12 days
    });

    return res.status(200).json({ success: true, msg: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Server error. Try again later." });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, msg: "Logged out" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
