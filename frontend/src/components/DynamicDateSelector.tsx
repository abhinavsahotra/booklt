import React, { useEffect, useState } from "react";

interface DateSelectorProps {
  daysToShow?: number; // how many future days to show (default 4)
  onSelectDate: (date: string) => void;
}

const DynamicDateSelector: React.FC<DateSelectorProps> = ({
  daysToShow = 4,
  onSelectDate,
}) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Generate dynamic dates starting from today
  useEffect(() => {
    const today = new Date();
    const dates: string[] = [];

    for (let i = 0; i < daysToShow; i++) {
      const next = new Date(today);
      next.setDate(today.getDate() + i);
      dates.push(next.toISOString().split("T")[0]); // format: YYYY-MM-DD
    }

    setAvailableDates(dates);
  }, [daysToShow]);

  const handleSelect = (date: string) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
      <h3 className="text-gray-800 font-semibold mb-3">Select a Date</h3>

      <div className="flex flex-wrap gap-3">
        {availableDates.map((date) => (
          <button
            key={date}
            onClick={() => handleSelect(date)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 
              ${
                selectedDate === date
                  ? "bg-yellow-400 text-gray-900 border-yellow-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
              }`}
          >
            {new Date(date).toLocaleDateString("en-IN", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DynamicDateSelector;
