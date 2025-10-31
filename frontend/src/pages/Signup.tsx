import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${API_URL}/api/v1/user/auth/signup`, formData);

      if (res.data.success) {
        localStorage.setItem("token", "Bearer " +res.data.token);
        localStorage.setItem("_id", res.data.user.id);
        localStorage.setItem("role", res.data.user.role);

        setMessage("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setMessage(res.data.message || "Signup failed");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-2 ${
                message.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="text-sm text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <span
            className="text-yellow-500 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
