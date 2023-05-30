const express = require("express");
const app = express();
const bodyParser = require("body-parser");



// config
require("dotenv").config({ path: "./config/config.env" });

app.use("/api/v1/stripe",express.raw({type:"*/*"}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.sendFile("index.html",{root: __dirname});
})

// Route imports
const payment = require("./routes/paymentRoutes");

app.use("/api/v1",payment);



module.exports = app; 