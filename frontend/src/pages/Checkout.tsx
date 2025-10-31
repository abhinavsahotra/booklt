import CheckoutForm from "../components/Form";
import BookingSummaryCard from "../components/BookingSummary";
import { Link, useNavigate } from "react-router-dom";
import { Arrow } from "../icon/Arrow";
import { useBooking } from "../context/BookingContext";
import axios from "axios";

export default function Checkout(){
    const { bookingData } = useBooking();
    const navigate = useNavigate();
  
    if (!bookingData) {
    return (
      <div className="bg-white shadow-md p-6 min-w-[300px] max-w-[480px]">
        <p>Loading booking details...</p>
      </div>
    );
}
const handleSubmitted = async () => {
  const userId = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    console.error("User not logged in");
    navigate("/signin");
    return;
  }

  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/user/booking`,
      {
        userId,
        experienceId: bookingData._id,
        date: bookingData.date,
        time: bookingData.time,
        quantity: bookingData.quantity,
        total: bookingData.total,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/result", {
      state: { bookingResult: { success: true, ...res.data } },
    });
  } catch (err: any) {
    console.error("Booking error:", err);

    navigate("/result", {
      state: {
        bookingResult: {
          success: false,
          message:
            err.response?.data?.message ||
            err.message ||
            "Booking request failed.",
        },
      },
    });
  }
};


  
    return <>
    <div className="flex p-3 gap-3">
        <div><Link to="/detail"> <Arrow/> </Link></div>
        <Link to="/detail">Checkout</Link>
    </div>
    <div className="flex gap-4">
    <div className=" min-w-lg p-10 ml-10">
        <CheckoutForm/>
    </div>
    <div className="ml-10 p-10 min-w-md">
        <BookingSummaryCard
        experience={bookingData.experience || "Loading..."}
        date={bookingData.date || "Loading..."}
        time={bookingData.time || "Loading..."}
        quantity={bookingData.quantity ?? 0} 
        subtotal={bookingData.subtotal ?? 0}
        taxes={bookingData.taxes ?? 0}
        total={bookingData.total ?? 0}
        discount={bookingData.discount || 0}
        onConfirm={handleSubmitted}
      />
    </div>
</div>
    </>
}