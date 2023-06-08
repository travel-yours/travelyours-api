const uploadHandler = require("../controllers/userController");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const processFileMiddleware = require("../middleware/uploadMiddleware");
const Destinations = require("../models/destination");

// Instantiate a storage client with credentials
const keyFile = path.join(__dirname, "gcskey.json");
const storage = new Storage({ keyFilename: keyFile });
const bucket = storage.bucket("travel-storage");

const addDestinations = async (req, res) => {
  const {
    name,
    tag,
    category,
    jenis,
    description,
    location,
    price,
    facilities,
    imageUrl,
  } = req.body;
  //   const upload = new uploadHandler();
  try {
    // const destination = await Destinations.findOne({name: request.name});
    // if (!destination) {
    //   return res.status(403).json({ error: "Destinasi telah ada" });
    // }
    const request = {
      name,
      tag,
      category,
      jenis,
      description,
      location,
      price,
      facilities,
      imageUrl,
    };
    const newDestination = new Destinations(request);
    const savedDestination = await newDestination.save();

    res.status(200).json(savedDestination);

    console.log(`Destinasi : ${savedDestination.name} telah ditambahkan`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error Added Destination" });
  }
};

module.exports = addDestinations;
