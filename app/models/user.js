const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: "string", minlength: 3, required: true },
  email: { type: "string", unique: true, required: true },
  password: { type: "string", required: true },
  imageUrl: { type: "string"},
  createdAt: { type: "string", default: () => new Date().toISOString() },
});

const User = mongoose.model("User", personSchema);

module.exports = User;
