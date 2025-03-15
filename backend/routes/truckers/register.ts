// pages/api/truckers/register.ts
import dbConnect from '../../config/db';
import Trucker from '../../models/Trucker';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  await dbConnect();
  const { name, licenseNumber, accidents, theftComplaints, truckAge, licenseYears } = req.body;

  // Eligibility Check
  if (accidents > 0) return res.status(400).json({ error: 'No accidents allowed' });
  if (theftComplaints > 0) return res.status(400).json({ error: 'No theft complaints allowed' });
  if (truckAge > 5) return res.status(400).json({ error: 'Truck must be less than 5 years old' });
  if (licenseYears < 5) return res.status(400).json({ error: 'Driver must hold a license for more than 5 years' });

  try {
    const newTrucker = new Trucker({ name, licenseNumber, accidents, theftComplaints, truckAge, licenseYears });
    await newTrucker.save();
    return res.status(201).json({ message: 'Trucker Registered Successfully!' });
  } catch (error) {
    return res.status(500).json({ error: 'Error registering trucker' });
  }
}
