const express = require("express");
const router = new express.Router();

const destController = require("../controllers/destinationController");

router.post("/add", destController);

module.exports = router;
