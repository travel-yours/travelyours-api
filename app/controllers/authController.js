const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ error: "Invalid Login"});
    }

    // Bandingkan password yang diinputkan dengan password di database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid Login" });
    }

    const token = jwt.sign({ id: user._id }, process.env.MY_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json(`${email} telah login`)
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getUser;
