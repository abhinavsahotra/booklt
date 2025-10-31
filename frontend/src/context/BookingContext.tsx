import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookingData {
  _id: string,
  experience: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  discount?:number;
}

interface BookingContextType {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData) => void;
  clearBookingData: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingDataState] = useState<BookingData | null>(null);

  const setBookingData = (data: BookingData) => {
    setBookingDataState(data);
    localStorage.setItem("bookingData", JSON.stringify(data));
  };

  const clearBookingData = () => {
    setBookingDataState(null);
    localStorage.removeItem("bookingData");
  };

  // Restore data from localStorage on first load (optional)
  React.useEffect(() => {
    const stored = localStorage.getItem("bookingData");
    if (stored) setBookingDataState(JSON.parse(stored));
  }, []);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, clearBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
