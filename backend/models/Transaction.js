const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  shipperId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  truckerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  loadId: { type: mongoose.Schema.Types.ObjectId, ref: "Load", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
