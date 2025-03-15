"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
  <h1 className="text-xl font-bold">🚛 Load & Shipment</h1>
  <div>
    <button onClick={() => router.push("/dashboard")} 
      className="mx-2 px-4 py-2 bg-[#E87E04] text-white rounded-md hover:bg-[#cf6d03] transition">
      Dashboard
    </button>
    <button onClick={handleLogout} 
      className="px-4 py-2 bg-[#E87E04] text-white rounded-md hover:bg-[#cf6d03] transition">
      Logout
    </button>
  </div>
</nav>
  );
}
