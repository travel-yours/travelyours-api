const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const userValidator = require("../utils/userValidator");

const signIn = async (req, res) => {
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
      expiresIn: "7d",
    });

    const transformedUser = user.toObject();
    transformedUser.userId = transformedUser._id;
    delete transformedUser._id;

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Success",
      data: {
        nama: transformedUser.name,
        email: transformedUser.email,
        password: transformedUser.password,
        createdAt: transformedUser.createdAt,
        userId: transformedUser.userId,
        token: token,
      },
    });

    console.log(`${user.email} telah login`);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const signUp = async (req, res) => {
  const request = await userValidator.validateAsync(req.body);
  try {
    const userEmail = await User.findOne({ email: request.email });
    if (userEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    // Meng-hash password sebelum menyimpannya
    const saltRounds = 10; // Specify the desired number of salt rounds
    const hashedPassword = await bcrypt.hash(request.password, saltRounds);
    request.password = hashedPassword;

    const newUser = new User(request);
    newUser.imageUrl =
      "https://storage.googleapis.com/travel-storage/default-profile.png";

    const savedUser = await newUser.save();

    const transformedUser = savedUser.toObject();
    transformedUser.userId = transformedUser._id;
    delete transformedUser._id;

    res.status(200).json(transformedUser);
    console.log(`Akun telah ditambahkan: `, transformedUser.email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user" });
  }
};

module.exports = { signIn, signUp };
