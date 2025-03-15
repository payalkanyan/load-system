"use client";
import { useState } from "react";

export default function AuthForm({ type, onAuthSuccess }: { type: "login" | "register"; onAuthSuccess: () => void }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "mock-token");
    onAuthSuccess();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-96">
      <h2 className="text-2xl font-bold text-primary mb-4">
        {type === "login" ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-secondary">
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
