const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const Destinations = require("./app/models/destination");

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
app.post("/upload", uploadHandler);
app.use("/destinations", destRouter);

app.get("/destination/:id", (req, res) => {
  const { id } = req.params;
  Destinations.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Can't Get the Data" });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
