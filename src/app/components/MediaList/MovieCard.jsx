import { useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressBar } from "./CircularProgressBar";

export const MovieCard = ({ id, name, startDate, imagePortrait, rate, mediaType }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Link to={mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`}>
      <div className="relative group overflow-hidden rounded-xl shadow-lg bg-black text-white hover:scale-105 transform transition duration-300 ease-in-out">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-800">
            <svg
              className="animate-spin h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        )}

        {/* Actual Image */}
        <img
          src={imagePortrait}
          alt={name}
          className="h-96 w-full object-cover"
          onLoad={() => setLoading(false)} // Hide loading when image loads
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800 to-gray-900 opacity-90">
          {/* Icon badge TV show */}
          {mediaType === "tv" && (
            <div className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132a.506.506 0 00-.79.417v4.265a.506.506 0 00.79.417l3.197-2.132a.506.506 0 000-.835z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.082C21 6.998 16.97 3 12 3S3 6.998 3 12.082c0 5.083 4.03 9.082 9 9.082s9-4.021 9-9.082z"
                />
              </svg>
            </div>
          )}

          <div className="absolute bottom-4 left-4">
            <CircularProgressBar
              percent={Math.round(rate * 10)} // Convert rating to percentage
              strokeColor={rate >= 7 ? "green" : rate >= 5 ? "orange" : "red"}
            />
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-400 text-sm">{startDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};