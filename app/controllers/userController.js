const bcrypt = require("bcrypt");
const User = require("../models/user");
const userImages = require("../models/userImages");
const processFiles = require("../middleware/uploadMiddleware");
const { format } = require("util");

const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "service-bucket-travel.json" });
const bucket = storage.bucket("travel-storage");

const addUser = async (req, res) => {
  const { name, no_hp, email, password } = req.body;

  try {
    // Meng-hash password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      no_hp,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    console.log(`Akun telah ditambahkan: `, savedUser.email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user" });
  }
};

module.exports = addUser;
