const express = require("express");
const dotenv = require("dotenv");
const User = require("./app/models/user"); // Import model User
const userImages = require("./app/models/userImages");
const mongodb = require("./app/database/mongodb"); // Import file mongodb.js
const sign = require("./app/controllers/authController");
const path = require("path");
const { bookPackage } = require('./bookingService');

const app = express();

//CONFIGURE DOTENV
dotenv.config();

// ENDPOINT
const authRouter = require("./app/routes/authRoutes");
const destRouter = require("./app/routes/destinationRoutes");
// const authController = require("./app/controllers/authController");
const uploadHandler = require("./app/controllers/userController");

//CONFIGURE DATABASE
require("./app/database/mongodb");

// PORT AND PATH
const PORT = process.env.PORT || 3000;
const appendUrl = (url) => `${url}`;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER

app.use(appendUrl("/auth"), authRouter);
// app.post(appendUrl("/"),authController.signIn)
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "app/public", "upload.html"));
});
app.post("/upload", uploadHandler);
// app.use("/destinations");

//booking
app.post('/booking', (req, res) => {
  const { userID, tempatArray, kodePembayaran } = req.body;

  bookPackage(userID, tempatArray, kodePembayaran)
    .then(() => {
      res.status(200).json({ message: 'Booking berhasil.' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Terjadi kesalahan saat melakukan booking.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
