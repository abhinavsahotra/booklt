import React, { useEffect, useState } from "react";

interface TimeSelectorProps {
  startHour?: number; // earliest slot (e.g., 9 for 9 AM)
  endHour?: number; // latest slot (e.g., 17 for 5 PM)
  interval?: number; // minutes between slots
  onSelectTime: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  startHour = 9,
  endHour = 17,
  interval = 120, // 2-hour interval by default
  onSelectTime,
}) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const times: string[] = [];
    for (let hour = startHour; hour < endHour; hour += interval / 60) {
      const h = Math.floor(hour);
      const m = (hour - h) * 60;
      const timeStr = new Date(0, 0, 0, h, m)
        .toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();
      times.push(timeStr);
    }
    setAvailableTimes(times);
  }, [startHour, endHour, interval]);

  const handleSelect = (time: string) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm mt-4">
      <h3 className="text-gray-800 font-semibold mb-3">Select a Time</h3>

      <div className="flex flex-wrap gap-3">
        {availableTimes.map((time) => (
          <button
            key={time}
            onClick={() => handleSelect(time)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 
              ${
                selectedTime === time
                  ? "bg-yellow-400 text-gray-900 border-yellow-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400"
              }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector
