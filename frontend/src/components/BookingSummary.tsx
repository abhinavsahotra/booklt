import { useState, useEffect } from "react";

interface BookingSummaryProps {
  experience: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  discount?: number;
  onConfirm: () => void;
}

export const BookingSummaryCard = ({
  experience,
  date,
  time,
  quantity,
  subtotal,
  taxes,
  total,
  discount = 0,
  onConfirm,
}: BookingSummaryProps) => {
  const [count, setCount] = useState(quantity);
  const [computedTotal, setComputedTotal] = useState(total);

  // Recalculate whenever count, subtotal, taxes, or discount changes
  useEffect(() => {
    const newTotal = count * (subtotal + taxes) - discount;
    setComputedTotal(newTotal);
  }, [count, subtotal, taxes, discount]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm w-full max-w-sm">
      <div className="space-y-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Experience</span>
          <span>{experience}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Date</span>
          <span>{date}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Time</span>
          <span>{time}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Qty</span>
          <div className="flex gap-2">
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <span className="font-medium">Subtotal</span>
          <span>₹{(count * subtotal).toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Taxes</span>
          <span>₹{(count * taxes).toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="font-medium">Discount</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-4">
        <span className="text-base font-semibold text-gray-800">Total</span>
        <span className="text-lg font-semibold text-gray-900">
          ₹{computedTotal.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onConfirm}
        className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2.5 rounded-lg transition-colors duration-200"
      >
        Pay and Confirm
      </button>
    </div>
  );
};

export default BookingSummaryCard;
