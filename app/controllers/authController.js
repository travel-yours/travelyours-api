const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ error: "Invalid Login" });
    }

    // Bandingkan password yang diinputkan dengan password di database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid Login" });
    }

    const token = jwt.sign({ id: user._id }, process.env.MY_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Success",
      data: {
        nama: user.name,
        noHP: user.no_hp,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getUser;
