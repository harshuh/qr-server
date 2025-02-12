// Mongoose
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://gbusoict:hkEYqO4IxZyDFpQk@cluster.wum2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster/"
);

const Schema = mongoose.Schema;
const ObjId = mongoose.ObjectId;

// Ticket Schema
const TicketSchema = new Schema(
  {
    trxnid: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
    },
    scanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//scanner for admins
const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // role: { type: String, required: true, unique: true },
});

const Ticket = mongoose.model("Ticket", TicketSchema);
const adminModel = mongoose.model("admins", adminSchema);

module.exports = { Ticket, adminModel };
