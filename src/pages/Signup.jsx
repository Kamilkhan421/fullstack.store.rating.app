import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, address } = form;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        name, email, password, address
      });
      alert("Signup successful! Check email to verify.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6 bg-gray-100 rounded-xl shadow">
        <h2 className="text-2xl font-bold">Signup</h2>
        {["name", "email", "address", "password"].map((field) => (
          <input key={field} type={field === "email" ? "email" : field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-2 border rounded" required />
        ))}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
