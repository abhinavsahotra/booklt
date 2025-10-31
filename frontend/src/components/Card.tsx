import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface CardProps {
  _id: string; 
  imageUrl: string;
  title: string;
  location: string;
  description: string;
  price: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ExperienceCard = () => {
  const [experiences, setExperiences] = useState<CardProps[]>([]);
  const navigate = useNavigate();

const handleViewDetails = (experience: CardProps) => {
  console.log(experience._id)
    navigate(`/detail/${experience._id}`)
}

const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/user/experiences`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setExperiences(response.data.experiences); 
      })
      .catch((err) => console.error(err));
  }, []);

  if (!experiences) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading experiences details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-wrap ">
      {experiences.map((exp) => (
        <div
          key={exp._id} 
          className="m-4  w-1/2 md:w-1/5 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <img
            src={exp.imageUrl}
            alt={exp.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {exp.title}
              </h3>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                {exp.location}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-snug line-clamp-2">
              {exp.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-gray-900 font-semibold">
                From <span className="text-lg">₹{exp.price}</span>
              </p>
              <button
                onClick={() => handleViewDetails(exp)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceCard;
