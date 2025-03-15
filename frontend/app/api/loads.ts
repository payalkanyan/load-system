import { NextApiRequest, NextApiResponse } from "next";

// ✅ Define a type for loads
interface Load {
  origin: string;
  destination: string;
  weight: number;
}

let loads: Load[] = []; // ✅ Explicitly typed array

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(loads);
  } else if (req.method === "POST") {
    const newLoad: Load = req.body; // ✅ Ensure request body matches type
    loads.push(newLoad);
    res.status(200).json({ message: "Load added successfully!", loads });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
