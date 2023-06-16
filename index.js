const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const Destinations = require("./app/models/destination");
const { bookPackage } = require('./bookingService');
const morgan = require("morgan"); // Library untuk logging

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

// Logging
app.use(morgan("dev")); // Gunakan format logging "dev" untuk mencetak ke terminal


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

// Get Data By Id - Destinasi
app.get("/destination/:id", (req, res) => {
  const { id } = req.params;
  Destinations.findById(id)
    .then((data) => {
      // Mengatur indentasi menjadi 2 spasi
      const jsonData = JSON.stringify(data, null, 2);
      res.type("application/json").send(jsonData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Can't Get the Data" });
    });
});


// Get All Data - Destinasi
app.get("/destinations", (req, res) => {
  Destinations.find({})
    .exec()
    .then((data) => {
      // Mengatur indentasi menjadi 2 spasi
      const jsonData = JSON.stringify(data, null, 2);
      res.type("application/json").send(jsonData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error retrieving data" });
    });
});


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

// Endpoint health check
app.get('/', (req, res) => {
  res.sendStatus(200);
});

// Self-ping logic
setInterval(() => {
  app.get('https://travelyours-api-4zcm2uhcpq-as.a.run.app/', (resp) => {
    // Lakukan apa pun dengan respons jika diperlukan
  });
}, 600000); // Kirim permintaan setiap 10 menit (600000 milidetik)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
