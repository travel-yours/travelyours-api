const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  tag: {
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

  category: {
    type: String,
    required: true,
  },

  jenis: {
    type: String,
    required: true,
  },
});

const Destination = mongoose.model("Destination", articleSchema);

module.exports = Destination;
