const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const User = require("../travelyours-api/app/models/user"); // Import model User
const userImages = require("../travelyours-api/app/models/userImages");
const mongodb = require("../travelyours-api/app/database/mongodb"); // Import file mongodb.js

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.post("/users", async (req, res) => {
  try {
    const { name, no_hp, email, password, age, imageUrl } = req.body;

    // Buat objek user baru dengan data yang diterima dari request
    const newUser = new User({
      name,
      no_hp,
      email,
      password,
      age,
      imageUrl,
    });

    // Simpan user ke MongoDB
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/userImage", async (req, res) => {
  try {
    const { userId, email, imageUrl, createdAt } = req.body;

    const newImage = new userImages({
      userId,
      email,
      imageUrl,
      createdAt,
    });

    const savedUserImage = await newImage.save();

    res.status(201).json(savedUserImage);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
