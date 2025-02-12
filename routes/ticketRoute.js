const { Router } = require("express");

// Router
const ticketRouter = Router();

const { Ticket } = require("../db");

// user Pannel
const creteTicket = async (req, res) => {
  try {
    const { trxnid, year, scanned } = req.body;

    if (!trxnid || !year || typeof scanned !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    await Ticket.create({ trxnid, year, scanned });

    res.json({ message: " your trxid is " + trxnid });
  } catch (error) {
    res.status(500).json({ error: "this is taken" });
  }
};

// scan
const scannerHandler = async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res
        .status(400)
        .json({ error: "Transadsadaction ID and Year required" });
    }
    var trxnid = qrData;

    const customer = await Ticket.findOne({
      trxnid,
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found!" });
    }

    if (!customer.scanned) {
      customer.scanned = true;
      await customer.save();
      res.json({ message: "Ticket Scanned Successfully" });
    } else {
      res.json({ message: "Hey cheater, you scanned again!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", error });
  }
};

// user routes
ticketRouter.post("/ticket", creteTicket);
ticketRouter.post("/scanner", scannerHandler);

module.exports = {
  ticketRouter,
};
