import React from 'react';
import './LanguageCard.css';

const LanguageCard = ({ name, nativeName, image, count }) => {
  return (
    <div className="langcard-root">
      <img
        src={image}
        alt={name}
        className="langcard-img"
        loading="lazy"
      />
      <div className="langcard-gradient" />
      <div className="langcard-content">
        <h3 className="langcard-title">{name}</h3>
        <p className="langcard-native">{nativeName}</p>
        <p className="langcard-count">{count} shows</p>
      </div>
    </div>
  );
};

export default LanguageCard; 