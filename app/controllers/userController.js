const bcrypt = require("bcrypt");
const User = require("../models/user");
const userImages = require("../models/userImages");
// const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const processFileMiddleware = require("../middleware/uploadMiddleware");

// Instantiate a storage client with credentials
const keyFile = path.join(__dirname, "gcskey.json");
const storage = new Storage({ keyFilename: keyFile });
const bucket = storage.bucket("travel-storage");



// Create a new handler for the upload route
const uploadHandler = async (req, res) => {
  try {
    await processFileMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("NotFoundError", (err) => {
      res.status(500).send({ message: err.message });
    });
    blobStream.on("InvalidRequestError", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = new URL(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        // Make the file public
        await bucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }

      res.status(200).send({
        message: "File uploaded successfully",
        image: req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getUser = async (req, res) => {}

module.exports = uploadHandler;
