import { useLocation, useNavigate } from "react-router-dom";
import { Success } from "../icon/Success";
import { Failed } from "../icon/Failed";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingResult = location.state?.bookingResult;

  if (!bookingResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-700 mb-4 text-lg">
          No booking data found. Please make a booking again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const isSuccess = bookingResult.success;
  console.log(isSuccess)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      {/* Icon */}
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isSuccess ? (
        <Success />
        ) : (
        <Failed />
        )}
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {isSuccess ? "Booking Confirmed" : "Booking Failed"}
      </h2>
      <p className="text-gray-600 mb-6">
        {isSuccess
          ? `Ref ID: ${bookingResult.refId || "N/A"}`
          : bookingResult.message || "Something went wrong."}
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
