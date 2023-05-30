const express = require("express");
const {processPayment} = require("../controllers/paymentcontroller.js");
const router = express.Router();

router.route("/pay").post(processPayment);



module.exports = router;
