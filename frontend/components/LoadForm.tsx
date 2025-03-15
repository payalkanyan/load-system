import { useState } from "react";

interface LoadFormProps {
  refreshLoads: () => void; // ✅ Define the function type
}

export default function LoadForm({ refreshLoads }: LoadFormProps) {  // ✅ Use the interface
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    weight: "",
    pickupTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const newLoad = {
      id: Date.now().toString(), // Unique ID
      origin: formData.origin,
      destination: formData.destination,
      weight: formData.weight,
      pickupTime: formData.pickupTime,
    };
  
    // Get existing loads from local storage
    const existingLoads = JSON.parse(localStorage.getItem("loads") || "[]");
    const updatedLoads = [...existingLoads, newLoad];
  
    // Save to local storage
    localStorage.setItem("loads", JSON.stringify(updatedLoads));
  
    alert("Load posted successfully!");
    refreshLoads(); // Update UI
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded">
      <input name="origin" placeholder="Origin" onChange={handleChange} required />
      <input name="destination" placeholder="Destination" onChange={handleChange} required />
      <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} required />
      <input name="pickupTime" type="datetime-local" onChange={handleChange} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">Post Load</button>
    </form>
  );
}
