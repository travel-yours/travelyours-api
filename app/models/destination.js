const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  location: {
    type: String,
  },
  price: {
    type: Number,
  },
  facilities: [String],
});

const Destination = mongoose.model("Destination", articleSchema);

module.exports = Destination;
