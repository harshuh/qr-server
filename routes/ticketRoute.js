const { Router } = require("express");

// Router
const ticketRouter = Router();

const { Ticket } = require("../db");

// Create Ticket
const createTicket = async (req, res) => {
  try {
    const { trxnid, year, scanned } = req.body;

    if (!trxnid || !year || typeof scanned !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    await Ticket.create({ trxnid, year, scanned });

    return res.json({ message: "Your trxid is " + trxnid });
  } catch (error) {
    console.error("Error in createTicket:", error);
    return res
      .status(500)
      .json({ error: "Transaction ID already taken or Server Error" });
  }
};

// Scan Ticket
const scannerHandler = async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({ error: "Transaction ID required" });
    }

    const customer = await Ticket.findOne({ trxnid: qrData, scanned: false });

    if (!customer) {
      return res
        .status(404)
        .json({ error: "Customer not found or already scanned!" });
    }

    customer.scanned = true;
    await customer.save();
    return res.json({ message: "Ticket Scanned Successfully" });
  } catch (error) {
    console.error("Error in scannerHandler:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
// User routes
ticketRouter.post("/ticket", createTicket);
ticketRouter.post("/scanner", scannerHandler);

module.exports = {
  ticketRouter,
};
