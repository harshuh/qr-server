const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CORS Configuration

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://gbusoict:hkEYqO4IxZyDFpQk@cluster.wum2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster/"
);

// Routes
const { ticketRouter } = require("./routes/ticketRoute");
const { adminRouter } = require("./routes/adminRoute");

// API Routes
app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});
app.use("/customer", ticketRouter);
app.use("/api", adminRouter);

// Start Server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
