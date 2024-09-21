const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashPassword });
    await newUser.save();

    res.json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "28d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = { register, login };
