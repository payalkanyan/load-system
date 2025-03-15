import { NextResponse } from "next/server";

// ✅ Define a type for loads
interface Load {
  origin: string;
  destination: string;
  weight: number;
}

let loads: Load[] = []; // ✅ Explicitly typed array

export async function GET() {
  return NextResponse.json(loads);
}

export async function POST(req: Request) {
  const newLoad: Load = await req.json(); // ✅ Ensure request body matches type
  loads.push(newLoad);
  return NextResponse.json({ message: "Load added successfully!", loads });
}
