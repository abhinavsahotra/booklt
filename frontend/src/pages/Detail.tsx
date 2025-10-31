import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DynamicDateSelector from "../components/DynamicDateSelector";
import TimeSelector from "../components/TimeSelector";
import BookingSummaryCard from "../components/BookingSummary";
import { Arrow } from "../icon/Arrow";
import { useBooking } from "../context/BookingContext";

export interface CardProps {
  _id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  price:number,
}

export default function Detail() {
  const { _id } = useParams<{ _id: string }>();
  const [experience, setExperience] = useState<CardProps | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const { setBookingData } = useBooking();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
      console.log(_id)
    axios.get(`${API_URL}/api/v1/user/experience/${_id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setExperience(response.data); 
      })
      .catch((err) => console.error("Error fetching experience:", err));
  },[_id]);


  const handleSubmit = () => {
    if(!experience) return;
    const total = experience.price + 59;

    setBookingData({
      _id: experience._id,
      experience: experience.title,
      date: selectedDate,
      time: selectedTime,
      quantity: 1,
      subtotal: experience.price,
      taxes: 59,
      total,
    });
    navigate("/checkout");
  };



  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading experience details...</p>
      </div>
    );
  }

  return ( 
  <>
    <div className="flex p-3 gap-3">
        <div><Link to="/home"> <Arrow/> </Link></div>
        <Link to="/home">Details</Link>
    </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex gap-6 justify-center w-full max-w-5xl">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full md:w-full">
          <div className="">
            <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-lg h-80 object-cover"
          />
          <div className="p-5">
            <h2 className="text-2xl font-bold">{experience.title}</h2>
            <p className="text-gray-600 mt-3">{experience.description}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 min-w-[300px] max-w-[480px]">
          <DynamicDateSelector daysToShow={5} onSelectDate={setSelectedDate} />
          <TimeSelector
            startHour={9}
            endHour={17}
            interval={120}
            onSelectTime={setSelectedTime}
          />
        </div>
          </div>
          <div className="ml-40 w-xs md:w-md">
            <BookingSummaryCard
            experience={experience.title}
            date={selectedDate}
            time={selectedTime}
            quantity={1}
            subtotal={experience.price}
            taxes={59}
            total={999}
            onConfirm={handleSubmit}
            />
            </div>
        </div>
      </div>
    </div>
    </>
  );
}
