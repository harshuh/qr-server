//dotEnV
require("dotenv").config();

//Express
const express = require("express");
const app = express();

//use
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://gbusoict:hkEYqO4IxZyDFpQk@cluster.wum2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster/"
);

// Routes
const { ticketRouter } = require("./routes/ticketRoute");
const { adminRouter } = require("./routes/adminRoute");

// Routers
app.get("/", (req, res) => {
  res.send({
    message: "hello",
  });
});
app.use("/customer", ticketRouter);
app.use("/api", adminRouter);

// Server Port & Listen
app.listen(8080);
