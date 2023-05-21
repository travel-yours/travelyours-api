const mongoose = require("mongoose");
const { Schema } = mongoose;
const uploadSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
