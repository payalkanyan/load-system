const mongoose = require("mongoose");

const LoadSchema = new mongoose.Schema({
  shipperId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  truckerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  weight: { type: Number, required: true },
  bids: [{ truckerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, amount: Number }],
  status: { type: String, enum: ["open", "assigned", "completed"], default: "open" },
}, { timestamps: true });

module.exports = mongoose.model("Load", LoadSchema);
