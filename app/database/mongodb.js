const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config()
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
