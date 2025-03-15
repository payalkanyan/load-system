import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Load & Shipment App",
  description: "Manage and track your shipments easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
