
import React from 'react';

interface GenreCardProps {
  name: string;
  image: string;
  count: number;
}

const GenreCard: React.FC<GenreCardProps> = ({ name, image, count }) => {
  return (
    <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-4">
        <h3 className="text-white font-semibold text-lg">{name}</h3>
        <p className="text-gray-300 text-sm">{count} titles</p>
      </div>
    </div>
  );
};

export default GenreCard;
