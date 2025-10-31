import React, { useState } from "react";
import axios from "axios";
import { useBooking } from "../context/BookingContext";

const CheckoutForm: React.FC = () => {
  const { bookingData, setBookingData } = useBooking();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    promo: "",
    agree: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Promo code apply handler
  const handleApplyPromo = async () => {
    if (!formData.promo.trim()) {
      setMessage("Please enter a promo code.");
      return;
    }

    if (!bookingData) {
      setMessage("Booking data not found.");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/v1/user/promo/validate`, {
        code: formData.promo,
        subtotal: bookingData.subtotal,
      });

      if (res.data.success) {
        const { discountAmount, newTotal } = res.data.data;

        // Update booking total in context
        setBookingData({
          ...bookingData,
          discount: discountAmount,
          total: newTotal,
        });

        setMessage(`Promo applied! You saved ₹${discountAmount}`);
      } else {
        setMessage(res.data.message || "Invalid promo code.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error validating promo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Row 2: Promo code + Apply button */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          name="promo"
          placeholder="Promo code"
          value={formData.promo}
          onChange={handleChange}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleApplyPromo}
          disabled={loading}
          className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>

      {/* Row 3: Terms checkbox */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="w-4 h-4 accent-black cursor-pointer"
        />
        <label className="text-sm text-gray-700">
          I agree to the{" "}
          <span className="underline cursor-pointer">terms</span> and{" "}
          <span className="underline cursor-pointer">safety policy</span>
        </label>
      </div>

      {/* Status message */}
      {message && (
        <p
          className={`text-sm text-center ${
            message.includes("saved") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
