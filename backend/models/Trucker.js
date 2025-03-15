// models/Trucker.ts
import mongoose from 'mongoose';

const TruckerSchema = new mongoose.Schema({
  name: String,
  licenseNumber: String,
  accidents: { type: Number, default: 0 },
  theftComplaints: { type: Number, default: 0 },
  truckAge: Number,
  licenseYears: Number,
});

export default mongoose.models.Trucker || mongoose.model('Trucker', TruckerSchema);
