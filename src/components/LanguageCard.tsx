
import React from 'react';

interface LanguageCardProps {
  name: string;
  nativeName: string;
  image: string;
  count: number;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ name, nativeName, image, count }) => {
  return (
    <div className="relative flex-shrink-0 w-36 h-20 rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      <div className="absolute inset-0 flex flex-col justify-center px-3">
        <h3 className="text-white font-semibold text-sm">{name}</h3>
        <p className="text-gray-300 text-xs">{nativeName}</p>
        <p className="text-gray-400 text-xs">{count} shows</p>
      </div>
    </div>
  );
};

export default LanguageCard;
