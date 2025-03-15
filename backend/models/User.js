const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["shipper", "trucker"], required: true },
  truckerDetails: {
    accidents: { type: Number, default: 0 },
    theftComplaints: { type: Number, default: 0 },
    truckAge: { type: Number, default: 0 },
    licenseYears: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
