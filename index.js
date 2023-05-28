const express = require("express");
const dotenv = require("dotenv");
const User = require("./app/models/user"); // Import model User
const userImages = require("./app/models/userImages");
const mongodb = require("./app/database/mongodb"); // Import file mongodb.js
const sign = require("./app/controllers/authController");
const path = require("path");
const uploadHandler = require("./app/controllers/userController");

dotenv.config();
const app = express();

app.use(express.json());

// ENDPOINT

app.post("/login", sign.signIn);
app.get("/register", async (req, res) => {
  res.sendFile(path.join(__dirname, "app/public", "register.html"));
});
app.post("/register", sign.signUp);

// STILL DEVELOP
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app/public", "app.html"));
});
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "app/public", "upload.html"));
});
// UPLAOD IMAGE STILL DEVELOP
app.post("/upload", uploadHandler);

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
