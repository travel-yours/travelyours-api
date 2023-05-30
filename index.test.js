const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

//CONFIGURE DOTENV
dotenv.config();

// ENDPOINT
const authRouter = require("./app/routes/authRoutes");
// const authController = require("./app/controllers/authController");

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
