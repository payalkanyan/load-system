"use client";
import { useState } from "react";
import API from "@/utils/api";

interface LoadFormData {
  title: string;
  pickupLocation: string;
  dropoffLocation: string;
  weight: number;
}

const PostLoad = () => {
  const [formData, setFormData] = useState<LoadFormData>({
    title: "",
    pickupLocation: "",
    dropoffLocation: "",
    weight: 0,
  });

  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/loads", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Load posted successfully!");
    } catch (error: any) {
      setMessage("❌ " + (error.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Post a Load</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full p-2 border rounded"
          value={formData.pickupLocation}
          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          className="w-full p-2 border rounded"
          value={formData.dropoffLocation}
          onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          className="w-full p-2 border rounded"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">Post Load</button>
      </form>
      {message && <p className="text-red-500 mt-3">{message}</p>}
    </div>
  );
};

export default PostLoad;
