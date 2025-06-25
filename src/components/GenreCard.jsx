import React from 'react';
import './GenreCard.css';

const GenreCard = ({ name, image, count }) => {
  return (
    <div className="genrecard-root">
      <img
        src={image}
        alt={name}
        className="genrecard-img"
        loading="lazy"
      />
      <div className="genrecard-gradient" />
      <div className="genrecard-content">
        <h3 className="genrecard-title">{name}</h3>
        <p className="genrecard-count">{count} titles</p>
      </div>
    </div>
  );
};

export default GenreCard; 