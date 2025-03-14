import React, { useState } from 'react';

const combos = [
  {
    id: 1,
    name: "Combo 1 - Popcorn & Drink Small",
    description: "A small popcorn and drink combo",
    price: 50,
    image: "https://example.com/small-combo.jpg",
  },
  {
    id: 2,
    name: "Combo 2 - Popcorn & Drink Medium",
    description: "A medium popcorn and drink combo",
    price: 70,
    image: "https://example.com/medium-combo.jpg",
  },
  {
    id: 3,
    name: "Combo 3 - Popcorn & Drink Large",
    description: "A large popcorn and drink combo",
    price: 90,
    image: "https://example.com/large-combo.jpg",
  },
];

export default function Offer() {
  const [quantities, setQuantities] = useState({
    1: 0,
    2: 0,
    3: 0,
  });

  const handleQuantityChange = (comboId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[comboId] + change;
      if (newQuantity >= 0) {
        return { ...prevQuantities, [comboId]: newQuantity };
      }
      return prevQuantities; // Prevent negative quantity
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chọn Combo</h1>

      {/* Display combos as a list */}
      <div className="space-y-4">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="border p-4 flex items-center space-x-4 rounded-md bg-white shadow-md"
          >
            <img src={combo.image} alt={combo.name} className="w-32 h-32 object-cover rounded-md" />
            <div className="flex-grow">
              <h3 className="font-semibold text-xl">{combo.name}</h3>
              <p className="text-gray-500 text-sm">{combo.description}</p>
              <p className="font-bold text-lg">{combo.price} VND</p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(combo.id, -1)}
                className="px-3 py-1 bg-gray-300 rounded-full"
              >
                -
              </button>
              <span>{quantities[combo.id]}</span>
              <button
                onClick={() => handleQuantityChange(combo.id, 1)}
                className="px-3 py-1 bg-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Đây là component hiển thị ra các combo bắp nước 💕