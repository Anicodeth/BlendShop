// components/CardComponent.tsx
import React from 'react';

interface CardProps {
  title: string;
  price: string;
  imageUrl: string;
  children: React.ReactNode;
}

const CardComponent: React.FC<CardProps> = ({ title, price, imageUrl, children }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{price}</p>
      {children}
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
        Add to Cart
      </button>
    </div>
  );
};

export default CardComponent;
